import { Router } from "express";
import { login, signup } from "../controllers/auth";
import { errorHandling } from "../error-handler";

const router = Router();

router.post("/login", errorHandling(login));
router.post("/signup", errorHandling(signup));

export const authRouter = router;
