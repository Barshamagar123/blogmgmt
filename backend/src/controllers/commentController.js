import prisma from '../prisma/client.js';

export const createComment = async (req, res) => {
  const { postId, content } = req.body;

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        postId: Number(postId),
        authorId: req.userId,
        status: "pending"
      }
    });

    res.status(201).json({
      message: "Comment submitted. Awaiting admin approval.",
      comment
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================== GET COMMENTS FOR A POST ==================
export const getCommentsByPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await prisma.comment.findMany({
      where: { 
        postId: Number(postId),
        status: "approved"     // Only show approved comments publicly
      },
      include: { author: true }
    });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================== GET ALL COMMENTS (Admin) ==================
export const getAllComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      include: { author: true, post: true }
    });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================== APPROVE COMMENT ==================
export const approveComment = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await prisma.comment.update({
      where: { id: Number(id) },
      data: { status: "approved" }
    });

    res.json({ message: "Comment approved", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================== REJECT COMMENT ==================
export const rejectComment = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await prisma.comment.update({
      where: { id: Number(id) },
      data: { status: "rejected" }
    });

    res.json({ message: "Comment rejected", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================== DELETE COMMENT ==================
export const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.comment.delete({
      where: { id: Number(id) }
    });

    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
