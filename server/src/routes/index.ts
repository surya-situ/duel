import { Router } from "express";
import AuthRoute from "./auth.routes";
import VerifyRoute from "./verify.routes";
import PasswordRoute from "./password.routes"

const router = Router()

router.use("/api/auth", AuthRoute); // - user crud routes
router.use("/api/auth", PasswordRoute); // - user password reset route
router.use("/", VerifyRoute); // - user verify route

export default router;