import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import { v4 as uuid4} from "uuid";

import prisma from "../config/database";
import { authLimiter } from "../config/rateLimit";
import { forgetPasswordSchema, resetPasswordSchema } from "../validation/passwordValidation";
import { checkDateMinutesDiff, formatError, renderEmailEjs } from "../helper";
import { emailQueue, emailQueueName } from "../jobs/emailJobs";

const router = Router();


// - Forget password
router.post("/forget-password", authLimiter, async (req: Request, res: Response) => {

    try {
        const body = req.body;
        const payload = forgetPasswordSchema.safeParse(body);

        if (!payload.success) {
            return res.status(422).json({
                message: "Invalid input",
                errors: formatError(payload.error),
            });
        }

        const { email } = payload.data;

        // - Checking user with email:
        let existingUser = await prisma.user.findUnique({
            where: {
                email: email 
            }
        });

        if( !existingUser || existingUser === null ) {
            return res.status(422).json({
                message: "Invalid data",
                errors: {
                    email: "No user found with this email"
                }
            })
        };

        const salt = await bcrypt.genSalt(10);
        const token = await bcrypt.hash(uuid4(), salt);

        await prisma.user.update({
            data: {
                password_reset_token: token,
                token_send_at: new Date().toISOString()
            },
            where: {
                email: email
            }
        });

        // - Sending url to user
        const url = `${process.env.CLIENT_APP_URL}/reset-password?email=${email}&token=${token}`;
        const html = await renderEmailEjs("forget-Password", { url: url });
        await emailQueue.add(emailQueueName, {
            to: email,
            subject: "Reset your password",
            body: html
        });


        return res.status(200).json({
            message: "Password link send successfully to your email.",
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

// - Reset password
router.post("/reset-password", authLimiter, async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const payload = resetPasswordSchema.safeParse(body);

        if (!payload.success) {
            return res.status(422).json({
                message: "Invalid inputs",
                errors: formatError(payload.error),
            });
        }

        const { email, token, password, confirmPassword } = payload.data;

        // - Checking user with email:
        let existingUser = await prisma.user.findUnique({
            where: {
                email: email 
            }
        });

        if( !existingUser || existingUser === null ) {
            return res.status(422).json({
                errors: {
                    email: "Link is not correct make sure you copied correct link."
                }
            });
        };

        // - Verifying token
        if(existingUser.password_reset_token !== token) {
            return res.status(422).json({
                errors: {
                    email: "Link is not correct make sure you copied correct link."
                }
            });
        };

        // - Checking 30 minutes time frame:
       const timeDiff = checkDateMinutesDiff(existingUser.token_send_at!);

        if(timeDiff > 31 ) {
            return res.status(422).json({
                message: "Invalid data",
                errors: {
                    email: "Password reset token got expired. please try again"
                }
            })
        };

        // - Update password:
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(password, salt);

        await prisma.user.update({
            data: {
                password: newPassword,
                password_reset_token: null,
                token_send_at: null
            },
            where: {
                email: email
            }
        })

        return res.status(200).json({
            message: "Password update successful",
            data: {}
        });

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

export default router