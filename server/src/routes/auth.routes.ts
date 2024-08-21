import { Router, Request, Response } from "express";
import { registerSchema } from "../validation/authValidation";

const router = Router();

// - Register route
router.post("/", async ( req: Request, res: Response ) => {
    const body = req.body;
    const payload = registerSchema.parse(body);
});

export default router;