import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import dressesRouter from './routes/dresses';
import cartRouter from './routes/cart';
import sellerRouter from './routes/seller';
import rentalsRouter from './routes/rentals';
import authRouter from './routes/auth';

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(process.cwd(), 'server', 'uploads')));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/auth', authRouter);
app.use('/dresses', dressesRouter);
app.use('/cart', cartRouter);
app.use('/seller', sellerRouter);
app.use('/rentals', rentalsRouter);

export default app;
