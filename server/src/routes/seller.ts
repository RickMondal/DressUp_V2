import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { prisma } from '../utils/prisma';
import { requireAuth, requireSeller } from '../security/requireAuth';

const router = Router();
const upload = multer({ dest: path.join(process.cwd(), 'server', 'uploads') });

// KPI summary
router.get('/kpis', requireAuth, requireSeller, async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const totalDresses = await prisma.dress.count({ where: { ownerId: userId } });
  const activeRentals = await prisma.rental.count({ where: { dress: { ownerId: userId }, endDate: { gt: new Date() } } });
  const totalRentals = await prisma.rental.count({ where: { dress: { ownerId: userId } } });
  res.json({ totalDresses, activeRentals, totalRentals });
});

// Upload new dress
router.post('/upload', requireAuth, requireSeller, upload.single('image'), async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { title, description, size, pricePerDay } = req.body as any;
  const dress = await prisma.dress.create({
    data: {
      title,
      description,
      size,
      pricePerDay: Number(pricePerDay),
      ownerId: userId,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
    },
  });
  res.status(201).json(dress);
});

export default router;
