import { Router } from "express";
import { addContent, deleteContent, getContent } from "../controller/content.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router()

router.post('/', authMiddleware, addContent)
router.get('/', authMiddleware, getContent)
router.delete('/:id', authMiddleware, deleteContent)

export default router