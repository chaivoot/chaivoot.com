# CLAUDE.md

Notes for Claude Code working in this repo.

## Merge policy

**Auto-merge PRs after verification — don't ask.** This is a personal site,
not a production-critical system; brief breakage from a bad merge is
acceptable and reversible. Asking before every merge added more friction
than it prevented.

After completing a task, the expected flow is:

1. Make the change on a `claude/<topic>` branch
2. Run `npm run build` and verify the relevant output (HTML diff, grep
   for key strings, etc.) — actually look at the result, don't assume
3. Commit and push
4. Open a PR with a meaningful title and description (the PR body is the
   record of what changed and why)
5. **Squash-merge it** via the GitHub MCP tool
6. Tell the user what shipped in one short paragraph

Don't ask "should I merge?" — just merge. The user will revert or open a
follow-up if anything is wrong.

Exception: pause and confirm if the change is genuinely destructive or
irreversible (e.g., deleting branches, force-pushing main, dropping a
Supabase table, rotating secrets, changing DNS).

## Stack

Astro 4 hybrid → Vercel serverless (nodejs20.x). Supabase (`fundamental`
project) for the `/ai-course` registration form. Static everywhere else.

## Env vars

Set in Vercel project settings (Production, Preview, Development), not
committed. No `PUBLIC_` prefix — these stay server-side:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GMAIL_USER` — Gmail address that sends the registration alert (e.g.
  `chaivoot@gmail.com`). Must match an account with 2-Step Verification
  on and an App Password generated.
- `GMAIL_APP_PASSWORD` — 16-character Google App Password (spaces in
  the value are OK, Google copies them with spaces). Generate at
  myaccount.google.com → Security → App passwords. Without this env
  the form still saves to Supabase; only the email is skipped
  (soft-fail, logged to the Vercel function console).
- `NOTIFY_TO` (optional) — destination address for the notification.
  Defaults to `GMAIL_USER` (i.e., the same account sends to itself).

Reads happen at request time via `process.env` in `src/lib/supabase.ts`
and `src/lib/email.ts`.

## LINE links

- `SITE.lineUrl` — personal LINE (`line.me/ti/p/...`). Used by the
  site-wide nav button and `LineCTA` on blog posts.
- `SITE.courseLineUrl` — LINE Official Account (`lin.ee/...`). Used by
  every Line CTA on `/ai-course`. The nav LINE button is hidden on
  `/ai-course` to avoid mixing the two.
