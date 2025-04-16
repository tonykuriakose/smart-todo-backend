import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import {getTodos,createTodo,updateTodo,deleteTodo} from '../controllers/todo.controller.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/',getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;
