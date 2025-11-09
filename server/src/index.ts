import app from './app';
import { prisma } from './utils/prisma';

const port = Number(process.env.PORT || 4000);

async function start() {
  try {
    await prisma.$connect();
    app.listen(port, () => console.log(`API listening on :${port}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
