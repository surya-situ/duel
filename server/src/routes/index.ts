import { Router } from "express";
import AuthRoute from "./auth.routes";
import VerifyRoute from "./verify.routes"

const router = Router()

router.use("/api/auth", AuthRoute);
router.use("/", VerifyRoute);

export default router;