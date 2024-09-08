import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuid4} from "uuid";
import { ZodError } from "zod";
import jwt  from "jsonwebtoken";

import { loginSchema, registerSchema } from "../validation/authValidation";
import { formatError, renderEmailEjs } from "../helper";
import { PrismaClient } from "@prisma/client";
import { emailQueue, emailQueueName } from "../jobs/emailJobs";
import authMiddleware from "../middleware/authMiddleware";
import { authLimiter } from "../config/rateLimit";

const router = Router();
const prisma = new PrismaClient();

// - Register route
router.post("/register", authLimiter, async ( req: Request, res: Response ) => {
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
                errors: {
                    email: "Email already exists. Please try another one"
                }
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
        if(error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({
                message: "Invalid Data",
                errors
            })
        };

        return res.status(500).json({
            message: "Something went wrong",
            data: error
        })
    }
});


// - Log in route
router.post("/login", authLimiter, async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const payload = loginSchema.safeParse(body);

        if (!payload.success) {
            return res.status(422).json({
                message: "Validation failed",
                errors: formatError(payload.error),
            });
        }

        const { email, password } = payload.data;

        // - Checking user with email:
        let existingUser = await prisma.user.findUnique({
            where: {
                email: email 
            }
        });

        if( !existingUser || existingUser === null ) {
            return res.status(422).json({
                errors: {
                    email: "No user found with this email"
                }
            })
        };

        // - Verifying password:
        const comparePassword = await bcrypt.compare( password, existingUser.password );

        if( !comparePassword ) {
            return res.status(422).json({
                errors: {
                    email: "Invalid Email or Password"
                }
            })
        };


        // - JWT payload
        const jwtPayload = {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name
        };

        // - Generating JWT token
        const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
            expiresIn: "10d"
        });

        // - Sending the response with JWT token
        return res.status(200).json({
            message: "login successful",
            data: {
                ...jwtPayload,
                token: `Bearer ${token}`
            }
        })

    } catch (error) {

        if(error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({
                message: "Invalid Data",
                errors
            })
        };

        return res.status(500).json({
            message: "Something went wrong",
            data: error
        });
    }
});

// - Log in check route
router.post("/check/credentials", authLimiter, async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const payload = loginSchema.safeParse(body);

        if (!payload.success) {
            return res.status(422).json({
                message: "Validation failed",
                errors: formatError(payload.error),
            });
        }

        const { email, password } = payload.data;

        // - Checking user with email:
        let existingUser = await prisma.user.findUnique({
            where: {
                email: email 
            }
        });

        if( !existingUser || existingUser === null ) {
            return res.status(422).json({
                errors: {
                    email: "No user found with this email"
                }
            })
        };

        // - Verifying password:
        const comparePassword = await bcrypt.compare( password, existingUser.password );

        if( !comparePassword ) {
            return res.status(422).json({
                errors: {
                    email: "Invalid Email or Password"
                }
            })
        };

        return res.status(200).json({
            message: "login successful",
            data: {}
        })

    } catch (error) {

        if(error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({
                message: "Invalid Data",
                errors
            })
        };

        return res.status(500).json({
            message: "Something went wrong",
            data: error
        });
    }
});


// - Get user
router.get("/user", authMiddleware, async ( req: Request, res: Response ) => {
    const user = req.user;

    return res.status(200).json({
        data: user
    })
});


// - Log out route

export default router;