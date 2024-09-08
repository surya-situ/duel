import { Router, Request, Response} from "express";

import prisma from "../config/database";

const router = Router();

router.get("/verify-email", async(req: Request, res: Response) => {
    const { email, emailVerifyToken } = req.query;

    if( email && emailVerifyToken ) {
        const user = await prisma.user.findUnique({
            where: {
                email: email as string
            }
        });

        if(user) {
            if(emailVerifyToken === user.email_verified_token) {
                await prisma.user.update({
                    where:{
                        email: email as string
                    },
                    data: {
                        email_verified_token: null,
                        email_verified_at: new Date().toISOString()
                    }
                })

                return res.redirect(`${process.env.CLIENT_APP_URL}/login`)
            }
        }

        return res.redirect("/verify-error");
    }
});

router.get("/verify-error", async(req: Request, res: Response) => {
    res.render("../views/auth/emailVerifyerror.ejs");
});

export default router;