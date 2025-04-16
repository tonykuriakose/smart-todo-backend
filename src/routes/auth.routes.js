import express from 'express';
import { signup, login } from '../controllers/auth.controller.js';
import authMiddleware from "../middleware/auth.middleware.js"

const router = express.Router();
router.use(authMiddleware);

router.post('/signup', signup);
router.post('/login', login);

export default router;
