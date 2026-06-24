import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { generateLinkToken, linkData } from "../controller/share.contoller.js";

const router = Router()

router.post("/share", authMiddleware, generateLinkToken)
router.get('/share/:token', linkData)

export default router