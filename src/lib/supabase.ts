// Server-only Supabase client.
// Uses service_role key — bypasses RLS. Never import from client components.
//
// Why this file is more than a one-liner:
//
// 1. Reads env at request time via `process.env`. `import.meta.env` for
//    non-PUBLIC_ vars can get inlined at build time, baking values in when
//    the build ran without secrets present. process.env is always runtime.
//
// 2. Lazy init — a missing env var or bad config surfaces as a JSON error
//    from the API handler instead of crashing the function at module load
//    (which on Vercel returns an empty 500 with no diagnostic info).
//
// 3. `ws` is passed as the realtime transport. supabase-js v2.45+ requires
//    a WebSocket constructor for the Realtime client even when realtime
//    isn't used, and Node.js < 22 has no native WebSocket. Without this,
//    `createClient` throws at module load on Vercel's nodejs20.x runtime.

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { WebSocket as NodeWebSocket } from 'ws';

let _client: SupabaseClient | null = null;

export class SupabaseConfigError extends Error {
  missing: string[];
  constructor(missing: string[]) {
    super(`Missing Supabase env vars: ${missing.join(', ')}`);
    this.name = 'SupabaseConfigError';
    this.missing = missing;
  }
}

export function getSupabaseAdmin(): SupabaseClient {
  if (_client) return _client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const missing: string[] = [];
  if (!url) missing.push('SUPABASE_URL');
  if (!key) missing.push('SUPABASE_SERVICE_ROLE_KEY');
  if (missing.length > 0) throw new SupabaseConfigError(missing);

  _client = createClient(url!, key!, {
    auth: { persistSession: false, autoRefreshToken: false },
    realtime: {
      transport: NodeWebSocket as unknown as typeof WebSocket,
    },
  });
  return _client;
}
