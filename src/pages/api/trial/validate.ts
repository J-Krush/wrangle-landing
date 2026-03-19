import type { APIRoute } from 'astro';
import { kv } from '@vercel/kv';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let body: { hardware_id?: string };

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { hardware_id } = body;

  if (!hardware_id) {
    return new Response(
      JSON.stringify({ error: 'Missing hardware_id' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const record = await kv.get<{ email: string; activated_at: string; expires_at: string }>(
    `trial:hw:${hardware_id}`,
  );

  if (!record) {
    return new Response(JSON.stringify({ error: 'Trial not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const now = new Date();
  const expiresAt = new Date(record.expires_at);

  if (expiresAt > now) {
    return new Response(
      JSON.stringify({ active: true, expires_at: record.expires_at }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  }

  return new Response(
    JSON.stringify({ active: false, expired: true }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  );
};
