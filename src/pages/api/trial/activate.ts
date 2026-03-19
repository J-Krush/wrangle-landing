import type { APIRoute } from 'astro';
import { kv } from '@vercel/kv';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let body: { email?: string; hardware_id?: string };

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { email, hardware_id } = body;

  if (!email || !hardware_id) {
    return new Response(
      JSON.stringify({ error: 'Missing email or hardware_id' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email format' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Check if email already used
  const existingEmail = await kv.get(`trial:email:${email}`);
  if (existingEmail) {
    return new Response(JSON.stringify({ error: 'Email already used' }), {
      status: 409,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Check if hardware already used
  const existingHw = await kv.get(`trial:hw:${hardware_id}`);
  if (existingHw) {
    return new Response(JSON.stringify({ error: 'Machine already used' }), {
      status: 409,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const activated_at = new Date().toISOString();
  const expires_at = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
  const TTL_SECONDS = 7776000; // 90 days

  await kv.set(
    `trial:email:${email}`,
    { hardware_id, activated_at, expires_at },
    { ex: TTL_SECONDS },
  );

  await kv.set(
    `trial:hw:${hardware_id}`,
    { email, activated_at, expires_at },
    { ex: TTL_SECONDS },
  );

  return new Response(JSON.stringify({ success: true, expires_at }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
