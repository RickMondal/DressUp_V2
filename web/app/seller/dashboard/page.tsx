'use client';
import { useEffect, useState } from 'react';

const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

export default function SellerDashboard() {
  const [kpis, setKpis] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/proxy/seller/kpis`).then(r => r.json()).then(setKpis).catch(() => setKpis(null));
  }, []);

  return (
    <div>
      <h1>Seller Dashboard</h1>
      {kpis && (
        <ul>
          <li>Total dresses: {kpis.totalDresses}</li>
          <li>Active rentals: {kpis.activeRentals}</li>
          <li>Total rentals: {kpis.totalRentals}</li>
        </ul>
      )}
      <h2>Upload a new dress</h2>
  <form action={`/api/proxy/seller/upload`} method="post" encType="multipart/form-data">
        <label>Title <input name="title" required /></label><br />
        <label>Description <input name="description" /></label><br />
        <label>Size <input name="size" /></label><br />
        <label>Price per day <input name="pricePerDay" type="number" min={1} required /></label><br />
        <label>Image <input name="image" type="file" /></label><br />
        <button type="submit">Upload</button>
      </form>
      <p style={{ marginTop: 12 }}><em>Note: auth headers not wired in demo form yet.</em></p>
    </div>
  );
}
