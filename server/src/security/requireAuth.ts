import type { Request, Response, NextFunction } from 'express';
import { createSecretKey } from 'crypto';
import { jwtVerify } from 'jose';
import { prisma } from '../utils/prisma.js';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string; role: 'ADMIN' | 'BUYER' | 'SELLER' };
    }
  }
}

const secret = process.env.NEXTAUTH_SECRET || 'change-me';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
    const token = header.slice(7);
    const { payload } = await jwtVerify(token, createSecretKey(Buffer.from(secret)));
    const email = String(payload.email || '');
    if (!email) return res.status(401).json({ error: 'Invalid token' });
    // Ensure user exists
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) user = await prisma.user.create({ data: { email, name: typeof payload.name === 'string' ? payload.name : null, image: typeof payload.picture === 'string' ? payload.picture : null } });
    req.user = { id: user.id, email: user.email, role: user.role };
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

export function requireSeller(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role !== 'SELLER' && req.user?.role !== 'ADMIN') return res.status(403).json({ error: 'Seller only' });
  next();
}
