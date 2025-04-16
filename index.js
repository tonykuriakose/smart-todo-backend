import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.routes.js';
import { getTodos } from './src/controllers/todo.controller.js';
import aiRoutes from './src/routes/ai.routes.js';
import todoRoutes from './src/routes/todo.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api/todos",todoRoutes);
app.use('/api/ai', aiRoutes)

app.get('/', (req, res) => res.send('SmartToDo API running!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
