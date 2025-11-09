import { Router, Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { requireAuth } from '../security/requireAuth';

const router = Router();

router.post('/checkout', requireAuth, async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const cart = await prisma.cart.findUnique({ where: { userId }, include: { items: true } });
  if (!cart || cart.items.length === 0) return res.status(400).json({ error: 'Cart empty' });

  const now = new Date();
  const rentals = await Promise.all(
    cart.items.map((it) =>
      prisma.rental.create({
        data: {
          userId,
          dressId: it.dressId,
          startDate: now,
          endDate: new Date(now.getTime() + it.days * 86400000),
        },
      })
    )
  );

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  res.json({ success: true, rentals });
});

export default router;
