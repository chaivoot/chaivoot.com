// Server-only Supabase client.
// Uses service_role key — bypasses RLS. Never import from client components.
//
// Usage (from .astro frontmatter or src/pages/**/api/*.ts):
//   import { supabaseAdmin } from '../../lib/supabase';
//   const { data, error } = await supabaseAdmin.from('course_registrations').insert(...);

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    'Missing Supabase env vars. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY ' +
    'in .env (local) and Vercel project settings (prod/preview).'
  );
}

export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});
