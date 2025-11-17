import express from 'express';
import {
  createComment,
  getCommentsByPost,
  getAllComments,
  approveComment,
  rejectComment,
  deleteComment
} from '../controllers/commentController.js';

import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMidddleware.js';

const router = express.Router();

// Reader/User
router.post('/', authMiddleware, createComment);
router.get('/post/:postId', getCommentsByPost);

// Admin
router.get('/', authMiddleware, adminMiddleware, getAllComments);
router.put('/approve/:id', authMiddleware, adminMiddleware, approveComment);
router.put('/reject/:id', authMiddleware, adminMiddleware, rejectComment);
router.delete('/:id', authMiddleware, adminMiddleware, deleteComment);

export default router;
