import { z } from "zod";

// - Register schema
export const registerSchema = z.object({
    email: z.string({ message: "Email is required." })
        .email({ message: "Invalid email address." }),
    name: z.string({ message: "Name is required." })
        .min(3, { message: "Name must be at least 3 characters long." })
        .max(50, { message: "Name must be less than 50 characters long." }),
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


// - Login schema
export const loginSchema = z.object({
    email: z.string({ message: "Email is required."})
    .email({ message: "Invalid email address" }),
    password: z.string({ message: "Password is required." })
})