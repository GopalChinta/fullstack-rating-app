// routes/userRoutes.js
import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', protect, authorizeRoles('user'), (req, res) => {
  res.json({ message: 'Welcome to User Dashboard', user: req.user });
});

export default router;

