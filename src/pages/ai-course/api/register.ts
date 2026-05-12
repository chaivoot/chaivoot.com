// POST /ai-course/api/register
// Accepts form submission, validates, inserts into course_registrations.

import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../lib/supabase';

export const prerender = false; // SSR — needed for API route

interface RegisterBody {
  name?: string;
  phone?: string;
  line_id?: string;
  business?: string;
  want?: string;
  plan?: 'group' | 'private';
}

export const POST: APIRoute = async ({ request }) => {
  let body: RegisterBody;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  // Validation
  const errors: Record<string, string> = {};
  const name = (body.name || '').trim();
  const phone = (body.phone || '').trim() || null;
  const line_id = (body.line_id || '').trim() || null;
  const business = (body.business || '').trim() || null;
  const want = (body.want || '').trim() || null;
  const plan = body.plan;

  if (!name) errors.name = 'กรุณากรอกชื่อ';
  if (!phone && !line_id) errors.contact = 'กรอกอย่างน้อย 1 ช่อง (เบอร์โทร หรือ Line ID)';
  if (plan !== 'group' && plan !== 'private') errors.plan = 'invalid_plan';

  if (Object.keys(errors).length > 0) {
    return json({ ok: false, errors }, 400);
  }

  const user_agent = request.headers.get('user-agent') || null;

  const { error } = await supabaseAdmin
    .from('course_registrations')
    .insert({ name, phone, line_id, business, want, plan, user_agent, source: 'landing' });

  if (error) {
    console.error('[register] supabase insert failed:', error);
    return json({ ok: false, error: 'db_error' }, 500);
  }

  return json({ ok: true });
};

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
