import express from 'express';
import jwt from 'jsonwebtoken';
import { createTask, listTasks, updateTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

// simple auth middleware
const auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'Missing token' });
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

router.use(auth);

router.post('/', createTask);
router.get('/', listTasks);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
