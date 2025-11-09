interface Props { params: { id: string } }

async function fetchDress(id: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
  const res = await fetch(`${base}/dresses/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function DressDetail({ params }: Props) {
  const dress: any = await fetchDress(params.id);
  if (!dress) return <div>Not found</div>;
  return (
    <div>
      <h2>{dress.title}</h2>
      {dress.imageUrl && <img src={dress.imageUrl} alt={dress.title} style={{ maxWidth: 300 }} />}
      <p>{dress.description}</p>
      <p>Price per day: ${dress.pricePerDay}</p>
      <form action="/cart" method="POST">
        <input type="hidden" name="dressId" value={dress.id} />
        <label>Days: <input type="number" name="days" defaultValue={1} min={1} /></label>
        <button>Add to cart</button>
      </form>
    </div>
  );
}
