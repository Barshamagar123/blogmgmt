// backend/src/index.js

import 'dotenv/config'; // automatically loads .env
import express from 'express';
import cors from 'cors';

import authRoutes from './src/routes/authRoutes.js';
import postRoutes from './src/routes/postRoutes.js';
import commentRoutes from './src/routes/commentRoutes.js';
import dashboardRoutes from './src/routes/dashboardRoute.js';
import { authMiddleware } from './src/middleware/authMiddleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/dashboard', dashboardRoutes); // optional, can use authMiddleware inside routes

// Protected example
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: `Hello user ${req.userId}, you are authenticated!` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});