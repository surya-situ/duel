import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS
    }
});

export const sendEmail = async (to: string, subject: string, body: string) => {
    await transporter.sendMail({
        from: process.env.ADMIN_EMAIL, 
        to: to, 
        subject: subject,
        html: body
    });
}