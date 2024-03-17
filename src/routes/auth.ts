import { Router } from "express";
import { login, me, signup } from "../controllers/auth";
import { errorHandling } from "../error-handler";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post("/login", errorHandling(login));
router.post("/signup", errorHandling(signup));
router.get("/me", authMiddleware, errorHandling(me));

export const authRouter = router;
