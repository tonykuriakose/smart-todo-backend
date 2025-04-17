import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { suggestTasks, weeklySummary} from '../controllers/ai.controller.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/suggest-tasks', suggestTasks);
router.post('/weekly-summary', weeklySummary);

export default router;
