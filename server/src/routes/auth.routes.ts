import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuid4} from "uuid";

import { registerSchema } from "../validation/authValidation";
import { formatError, renderEmailEjs } from "../helper";
import { PrismaClient } from "@prisma/client";
import { emailQueue, emailQueueName } from "../jobs/emailJobs";

const router = Router();

const prisma = new PrismaClient();

// - Register route
router.post("/register", async ( req: Request, res: Response ) => {
    const body = req.body;
    const payload = registerSchema.safeParse(body);

    if (!payload.success) {
        // Validation failed
        return res.status(422).json({
            message: "Validation failed",
            errors: formatError(payload.error)
        });
    }

    try {

        const { name, email, password } = payload.data

        let user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(user) {
            return res.status(422).json({
                message: "Failed",
                errors: "Email already exists. Please try another one"
            })
        };

        // - Encrypt password
        const hashPassword = await bcrypt.hash( password, 10 );

        // - Email verify token
        const emailVerifyToken = await bcrypt.hash(uuid4(), 10);
        const url = `${process.env.APP_URL}/verify-email?email=${email}&emailVerifyToken=${emailVerifyToken}`

        const emailBody = await renderEmailEjs("email-verify", {name: name, url: url});

        // - Send email to verify
        await emailQueue.add(emailQueueName, {to: email, subject: "Duel email verification", body: emailBody})

        // - Create new user 
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword,
                email_verified_token: emailVerifyToken
            }
        });

        console.log(newUser);
        

        return res.json({
            status: "Success",
            message: "User registered successfully",
            data: newUser
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message: "Something went wrong",
            data: error
        })
    }
});

export default router;