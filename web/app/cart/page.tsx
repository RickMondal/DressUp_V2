"use client";
import { useEffect, useState } from 'react';

interface CartItem {
  id: string;
  days: number;
  dress: { id: string; title: string; pricePerDay: number };
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/proxy/cart')
      .then(r => r.json())
      .then(data => setItems(data?.items || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const total = items.reduce((sum, it) => sum + it.dress.pricePerDay * it.days, 0);

  return (
    <div>
      <h1>Your Cart</h1>
      {loading && <p>Loading...</p>}
      {!loading && items.length === 0 && <p>Empty cart.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(it => (
          <li key={it.id} style={{ border: '1px solid #ddd', margin: '8px 0', padding: 12 }}>
            {it.dress.title} – {it.days} day(s) – ${it.dress.pricePerDay * it.days}
            <form method="POST" action={`/api/proxy/cart/items/${it.id}?_method=DELETE`} style={{ display: 'inline', marginLeft: 8 }}>
              <button type="submit">Remove</button>
            </form>
          </li>
        ))}
      </ul>
      {items.length > 0 && (
        <form method="POST" action="/api/proxy/rentals/checkout">
          <button type="submit">Checkout (${total})</button>
        </form>
      )}
    </div>
  );
}
