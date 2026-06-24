import { Router } from "express";
import { logOut, signIn, signUp } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router()

router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
router.post('/logout', authMiddleware, logOut)

export default router