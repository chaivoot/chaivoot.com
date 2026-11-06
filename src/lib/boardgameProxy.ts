import type { APIRoute } from 'astro';

const UPSTREAM = 'https://boardgame-five-psi.vercel.app';

// Forwards an incoming request to the boardgame Next.js project while keeping
// /boardgame in the path (that project pins basePath="/boardgame"). Only
// content-type and x-token request headers are forwarded; x-token identifies
// the player and is required by the upstream API. The host header is dropped
// so the upstream sees its own host.
export const proxy: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const target = UPSTREAM + url.pathname + url.search;

  const fwdHeaders = new Headers();
  const ct = request.headers.get('content-type');
  if (ct) fwdHeaders.set('content-type', ct);
  const xToken = request.headers.get('x-token');
  if (xToken) fwdHeaders.set('x-token', xToken);

  const init: RequestInit = {
    method: request.method,
    headers: fwdHeaders,
    redirect: 'manual',
    cache: 'no-store',
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = await request.arrayBuffer();
  }

  const upstream = await fetch(target, init);

  const respHeaders = new Headers();
  const upCT = upstream.headers.get('content-type');
  if (upCT) respHeaders.set('content-type', upCT);
  const upCC = upstream.headers.get('cache-control');
  if (upCC) respHeaders.set('cache-control', upCC);

  return new Response(upstream.body, {
    status: upstream.status,
    headers: respHeaders,
  });
};
