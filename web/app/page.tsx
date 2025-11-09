async function fetchDresses() {
  const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
  const res = await fetch(`${base}/dresses`);
  return res.json();
}

export default async function HomePage() {
  const dresses: any[] = await fetchDresses();
  return (
    <div>
      <h1>Available Dresses</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {dresses.map((d) => (
          <li key={d.id} style={{ border: '1px solid #ddd', margin: '8px 0', padding: 12 }}>
            <strong>{d.title}</strong>{' '}
            <span>${'{'}d.pricePerDay{'}'} / day</span>{' '}
            <a href={`/dress/${d.id}`}>View</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
