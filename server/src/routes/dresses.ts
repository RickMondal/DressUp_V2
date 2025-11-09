import { Router } from 'express';
import { prisma } from '../utils/prisma.js';

const router = Router();

// List dresses
router.get('/', async (_req, res) => {
  const dresses = await prisma.dress.findMany({ include: { owner: true } });
  res.json(dresses);
});

// Get single
router.get('/:id', async (req, res) => {
  const dress = await prisma.dress.findUnique({ where: { id: req.params.id } });
  if (!dress) return res.status(404).json({ error: 'Not found' });
  res.json(dress);
});

export default router;
