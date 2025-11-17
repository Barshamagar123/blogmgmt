import prisma from '../prisma/client.js';

export const adminMiddleware = async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId }
  });

  if (!user || user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admin only." });
  }

  next();
};
