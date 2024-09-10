import { Router } from "express";
import AuthRoute from "./auth.routes";
import VerifyRoute from "./verify.routes";
import PasswordRoute from "./password.routes";
import DuelRoute from "./duel.routes";
import authMiddleware from "../middleware/authMiddleware";

const router = Router()

// - user router
router.use("/api/auth", AuthRoute); // - user crud routes
router.use("/api/auth", PasswordRoute); // - user password reset route
router.use("/", VerifyRoute); // - user verify route

// - duel router *Private routes
router.use("/api/duel", authMiddleware, DuelRoute)

export default router;