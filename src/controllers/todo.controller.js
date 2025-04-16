import prisma from '../lib/prisma.js';


export const getTodos = async (req, res) => {
  const userId = req.user.userId;

  try {
    const todos = await prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};



export const createTodo = async (req, res) => {
  const userId = req.user.userId;
  const { title, status = 'To Do', priority = 'Medium', dueDate } = req.body;

  try {
    const todo = await prisma.todo.create({
      data: {
        title,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        userId
      }
    });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
};



export const updateTodo = async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;
  const { title, status, priority, dueDate } = req.body;

  try {
    const updated = await prisma.todo.updateMany({
      where: { id, userId },
      data: { title, status, priority, dueDate: dueDate ? new Date(dueDate) : null }
    });
    if (updated.count === 0) return res.status(404).json({ message: 'Todo not found' });

    res.json({ message: 'Todo updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
};



export const deleteTodo = async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;

  try {
    const deleted = await prisma.todo.deleteMany({
      where: { id, userId }
    });
    if (deleted.count === 0) return res.status(404).json({ message: 'Todo not found' });

    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};
