import { Router, Request, Response } from 'express';
import { prisma } from '../utils/prisma.js';
import { requireAuth } from '../security/requireAuth.js';

const router = Router();

// Get cart for current user
router.get('/', requireAuth, async (req: Request, res: Response) => {
  const userId = req.user!.id;
  let cart = await prisma.cart.findUnique({ where: { userId }, include: { items: { include: { dress: true } } } });
  if (!cart) {
    await prisma.cart.create({ data: { userId } });
    cart = await prisma.cart.findUnique({ where: { userId }, include: { items: { include: { dress: true } } } });
  }
  res.json(cart);
});

// Add item
router.post('/items', requireAuth, async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { dressId, days = 1 } = req.body as { dressId: string; days?: number };
  let cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) cart = await prisma.cart.create({ data: { userId } });
  const item = await prisma.cartItem.create({ data: { cartId: cart.id, dressId, days } });
  res.status(201).json(item);
});

// Remove item
router.delete('/items/:id', requireAuth, async (req: Request, res: Response) => {
  await prisma.cartItem.delete({ where: { id: req.params.id } });
  res.status(204).end();
});

export default router;
