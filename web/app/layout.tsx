import './globals.css';
import Link from 'next/link';
import { ReactNode } from 'react';
import Providers from '../components/Providers';
import AuthButtons from '../components/AuthButtons';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <header style={{ display: 'flex', gap: 16, padding: 12, borderBottom: '1px solid #eee', alignItems: 'center' }}>
            <Link href="/">Home</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/seller/dashboard">Seller Dashboard</Link>
            <AuthButtons />
          </header>
          <main style={{ padding: 16 }}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
