// src/controllers/dashboardController.js
import prisma from '../prisma/client.js';

// Get total users
export const getUsersCount = async (req, res) => {
  try {
    const count = await prisma.user.count();
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching users count' });
  }
};

// Get total posts + latest 5 posts
export const getPostsStats = async (req, res) => {
  try {
    const count = await prisma.post.count();
    const latestPosts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { author: true },
    });
    res.json({ count, latestPosts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching posts stats' });
  }
};

// Get total comments
export const getCommentsCount = async (req, res) => {
  try {
    const count = await prisma.comment.count();
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching comments count' });
  }
};
