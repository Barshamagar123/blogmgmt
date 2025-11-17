import prisma from '../prisma/client.js';

// ================= CREATE POST =================
export const createPost = async (req, res) => {
  const { title, content, published } = req.body;
  const authorId = req.userId; // from authMiddleware

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: published || false,
        authorId,
      },
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= GET ALL POSTS =================
export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        comments: true,
      },
    });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= GET POST BY ID =================
export const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: {
        author: true,
        comments: true,
      },
    });

    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= UPDATE POST =================
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, published } = req.body;

  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content, published },
    });

    res.json({
      message: "Post updated successfully",
      post,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= DELETE POST =================
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    // 1️⃣ Delete all comments associated with the post first
    await prisma.comment.deleteMany({
      where: { postId: Number(id) },
    });

    // 2️⃣ Then delete the post itself
    await prisma.post.delete({
      where: { id: Number(id) },
    });

    res.json({ message: 'Post and its comments deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
