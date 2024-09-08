import { z } from "zod";

// - Forget password schema
export const forgetPasswordSchema = z.object({
    email: z.string({ message: "Email is required" }).email({ message: "Invalid email type" })
});

// - Reset password schema
export const resetPasswordSchema = z.object({
    email: z.string({ message: "Email is required." })
        .email({ message: "Invalid email address." }),
    token: z.string({ message: "Token is required." }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long." })
        .max(100, { message: "Password must be no more than 100 characters long." }),
    confirmPassword: z.string()
        .min(6, { message: "Password must be at least 6 characters long." })
        .max(100, { message: "Password must be no more than 100 characters long." })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
});