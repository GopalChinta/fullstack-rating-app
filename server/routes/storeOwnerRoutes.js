// routes/storeOwnerRoutes.js
import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', protect, authorizeRoles('storeowner'), (req, res) => {
  res.json({ message: 'Welcome to Store Owner Dashboard', user: req.user });
});

export default router;
