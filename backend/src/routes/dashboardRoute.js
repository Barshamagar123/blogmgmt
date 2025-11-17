// src/routes/dashboardRoutes.js
import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMidddleware.js';
import {
  getUsersCount,
  getPostsStats,
  getCommentsCount
} from '../controllers/dashboardContoller.js';

const router = express.Router();

// Apply middlewares: only admin can access
router.use(authMiddleware, adminMiddleware);

// Routes
router.get('/users', getUsersCount);
router.get('/posts', getPostsStats);
router.get('/comments', getCommentsCount);

export default router;
