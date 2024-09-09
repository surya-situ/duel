import { z } from "zod";

// - Duel schema
export const duelSchema = z.object({
    title: z.string({ message: "Title is required." })
        .min(3, { message: "Title must be at least 3 characters long." })
        .max(50, { message: "Title must be less than 50 characters long." }),
    description: z.string({ message: "Description is required." })
        .min(20, { message: "Description must be at least 20 characters long." })
        .max(500, { message: "Description must be less than 500 characters long." }),
    expire_at: z.string({ message: "Expire time is required" })
        .min(5, { message: "Please pass correct date" }),
    image: z.string().optional()
});