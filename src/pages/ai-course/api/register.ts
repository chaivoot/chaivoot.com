// POST /ai-course/api/register
// Accepts form submission, validates, inserts into course_registrations.

import type { APIRoute } from 'astro';
import { getSupabaseAdmin, SupabaseConfigError } from '../../../lib/supabase';

export const prerender = false;

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
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

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

  try {
    const { error: dbError } = await getSupabaseAdmin()
      .from('course_registrations')
      .insert({ name, phone, line_id, business, want, plan, user_agent, source: 'landing' });

    if (dbError) {
      console.error('[register] supabase insert failed:', dbError);
      return json({ ok: false, error: 'db_error', detail: dbError.message }, 500);
    }
  } catch (e) {
    if (e instanceof SupabaseConfigError) {
      console.error('[register] supabase config error:', e.message);
      return json({ ok: false, error: 'config_error', missing: e.missing }, 500);
    }
    console.error('[register] unexpected error:', e);
    return json(
      { ok: false, error: 'unknown', message: e instanceof Error ? e.message : String(e) },
      500,
    );
  }

  return json({ ok: true });
};

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
