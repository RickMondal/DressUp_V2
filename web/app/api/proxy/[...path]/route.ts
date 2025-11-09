import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

async function forward(req: NextRequest, path: string[]) {
  const url = new URL(`${API_BASE}/${path.join('/')}${req.nextUrl.search}`);
  const rawToken = await getToken({ req, raw: true });
  const headers: Record<string, string> = {};
  // Forward content type only if present; node-fetch will set boundary for multipart automatically
  const ct = req.headers.get('content-type');
  if (ct && !ct.startsWith('multipart/form-data')) headers['content-type'] = ct;
  if (rawToken) headers['authorization'] = `Bearer ${rawToken}`;

  const init: RequestInit = {
    method: req.method,
    headers,
    body: req.body ? (req.method !== 'GET' && req.method !== 'HEAD' ? (await req.text()) : undefined) : undefined,
    redirect: 'manual',
  };

  const resp = await fetch(url, init);
  const text = await resp.text();
  const out = new NextResponse(text, { status: resp.status });
  resp.headers.forEach((v, k) => out.headers.set(k, v));
  return out;
}

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  return forward(req, params.path);
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  return forward(req, params.path);
}

export async function PUT(req: NextRequest, { params }: { params: { path: string[] } }) {
  return forward(req, params.path);
}

export async function DELETE(req: NextRequest, { params }: { params: { path: string[] } }) {
  return forward(req, params.path);
}
