import { Router, Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { z } from 'zod';

const router = Router();

// Upsert user (called after OAuth from frontend)
router.post('/upsert', async (req: Request, res: Response) => {
  const schema = z.object({ email: z.string().email(), name: z.string().optional(), image: z.string().optional(), role: z.enum(['ADMIN','BUYER','SELLER']).optional() });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { email, name, image, role } = parsed.data;
  const user = await prisma.user.upsert({
    where: { email },
    update: { name, image, role: role || undefined },
    create: { email, name, image, role: role || 'BUYER' },
  });
  res.json(user);
});

export default router;
