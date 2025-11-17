import express from 'express';
import { 
  createPost, 
  getPosts, 
  getPostById, 
  updatePost, 
  deletePost 
} from '../controllers/postController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// CRUD Routes
router.post('/', authMiddleware, createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

export default router;
