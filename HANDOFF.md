# Handoff to Claude Code — chaivoot.com

This package contains everything Claude Code needs to scaffold the chaivoot.com Astro site, push it to GitHub, and deploy it to Vercel. The user (chaivoot) wants to **avoid command line as much as possible** and write posts via GitHub web editor or Obsidian — your job is the one-time setup.

## Context

The user has an existing **design system project** at this URL (your origin):
- `README.md` — full system docs
- `colors_and_type.css` — token contract (this is the single source of truth)
- `assets/logo-mark-{light,dark}.svg`, `favicon.svg` — brand marks
- `ui_kits/chaivoot-web/` — React+Babel prototype that proves the layout works
- `guides/astro-walkthrough.html` — what the user already read; sets shared vocabulary
- `scaffold/` — **this is your starting point** — already-written Astro files ready to copy into a real Astro project

The user already owns the `chaivoot.com` domain. Hosting target is **Vercel** (free tier).

## What to do — execution checklist

### 1. Bootstrap the Astro project (in your sandbox)

```bash
npm create astro@latest chaivoot.com -- --template minimal --typescript strict --no-install --no-git --yes
cd chaivoot.com
```

Then **delete** the default starter content that came with the template:
- `src/pages/index.astro` (default)
- `src/components/Welcome.astro` if present
- any default `src/assets/` folder
- any default `public/*` files (you'll replace favicon)

### 2. Copy the scaffold files

The `scaffold/` folder in the design system project is laid out exactly to match the Astro project root. Copy its contents over the bootstrapped project:

```
scaffold/package.json              → chaivoot.com/package.json     (replace)
scaffold/astro.config.mjs          → chaivoot.com/astro.config.mjs (replace)
scaffold/README.md                 → chaivoot.com/README.md        (replace)
scaffold/src/                      → chaivoot.com/src/             (merge)
scaffold/public/                   → chaivoot.com/public/          (merge)
```

After copy, project tree should look like:

```
chaivoot.com/
├── astro.config.mjs
├── package.json
├── README.md
├── public/
│   ├── favicon.svg
│   ├── logo-mark-light.svg
│   └── logo-mark-dark.svg
└── src/
    ├── components/   (Nav, Footer, PillarBadge, PostCard)
    ├── content/
    │   ├── config.ts
    │   └── blog/     (3 sample posts)
    ├── layouts/      (BaseLayout, PostLayout)
    ├── lib/          (pillars.ts)
    ├── pages/
    │   ├── index.astro
    │   ├── about.astro
    │   ├── blog/[slug].astro
    │   └── pillars/[pillar].astro
    └── styles/       (tokens.css, global.css)
```

### 3. Install + verify locally

```bash
npm install
npm run build
npm run dev
```

Verify in the sandbox preview:
- `/` → home with hero + 3 sample post cards (1 article + 1 note + 1 article, mixed feed sorted by date)
- `/about` → about page
- `/pillars/amway` → 1 post (the "เริ่มเล็กๆ" note)
- `/pillars/longevity` → 1 post (Zone 2)
- `/pillars/dogs` → 1 post (BARF)
- `/blog/2026-02-05-barf-diet` → article view with PostLayout

If TypeScript or content-collection schema errors fire, fix them before pushing — the user should not see a red build on first visit.

### 4. Initialize git + push to GitHub

Repo target: **`chaivoot/chaivoot.com`** (new public repo).

```bash
cd chaivoot.com
git init -b main
git add -A
git commit -m "Initial scaffold from chaivoot design system"
gh repo create chaivoot/chaivoot.com --public --source=. --push
```

(If `gh` CLI is unavailable in sandbox, create the repo via the GitHub MCP / API equivalent and push.)

### 5. Connect Vercel

Two options — prefer (a):

**(a) Vercel CLI in sandbox:**
```bash
npx vercel link --yes
npx vercel --prod
```
Then in Vercel dashboard, attach `chaivoot.com` and `www.chaivoot.com` as production domains.

**(b) Hand off to user:** post a step-by-step in chat:
1. Go to vercel.com/new
2. Import `chaivoot/chaivoot.com`
3. Framework preset auto-detects Astro — click Deploy
4. Settings → Domains → add `chaivoot.com` + `www.chaivoot.com`
5. Vercel will show DNS records — user updates nameservers at registrar

### 6. Verify production

- `https://chaivoot.com` returns 200 + renders
- `https://chaivoot.com/blog/2026-02-05-barf-diet` returns 200
- Lighthouse: aim for performance > 95, accessibility > 95
- Favicon + Thai font load cleanly (no flash of unstyled text)

### 7. Confirm publish workflow with the user

Post in chat:

> ✓ chaivoot.com is live.
> 
> To publish a new post, go to:
> https://github.com/chaivoot/chaivoot.com/tree/main/src/content/blog
> 
> Click "Add file → Create new file", name it `YYYY-MM-DD-your-slug.md`, paste this template:
> 
> ```
> ---
> title: "..."
> date: YYYY-MM-DD
> pillar: amway | longevity | dogs
> format: note | article
> excerpt: "..."
> ---
> 
> Your content here.
> ```
> 
> Commit. Vercel rebuilds in ~30s. Live.

## Design fidelity checklist

The user cares about visual fidelity. Before declaring done, eyeball-check:

- [ ] Font is **IBM Plex Sans Thai** (not system fallback) — open DevTools → Computed → `font-family` on body should resolve to Plex
- [ ] Pillar dots use the exact ink colors: amway `#5E5C82`, longevity `#647C66`, dogs `#9F6147`
- [ ] Body text is `#111111` on `#FFFFFF`, body line-height **1.75** (Thai readability)
- [ ] Logo mark renders crisp at 24px in nav (it's an SVG path — no rasterization)
- [ ] Note cards have warm off-white bg `#F7F6F2`, articles flow with thin border separators
- [ ] No emoji anywhere. No gradient backgrounds. No shadow flourishes.

## What NOT to do

- **Don't add Tailwind.** The token CSS is final. Adding Tailwind would duplicate the system.
- **Don't add MDX.** Plain Markdown is enough; user is not React-fluent.
- **Don't add a CMS** (Decap, Tina, Sanity). The "GitHub web editor" workflow IS the CMS.
- **Don't add icon fonts or sprite sheets.** The system is deliberately icon-light.
- **Don't add image-optimization plugins** (`@astrojs/image`, sharp) unless the user asks. Photos are not in scope yet — they don't have any to upload.
- **Don't change the visual design.** If something looks off, ask first. The design system was iterated on.
- **Don't add Google Analytics or any tracker.** User has not requested it.

## Future roadmap (don't do now, just be aware)

- RSS feed (`@astrojs/rss`)
- Sitemap (`@astrojs/sitemap`)
- Photo support — when the user uploads to `public/photos/`
- LINE OA integration (form on /about) — the prototype has a LINE button that's currently inert
- Search — when post count > ~30
- Related posts on PostLayout footer (the prototype has this; not yet ported)

## If something breaks

If you hit an error you can't resolve, **don't half-ship**. Push the partial work to a branch (not main) and report back to the user with:
- What worked
- What didn't, exact error
- Your hypothesis

The user is technical enough to read a stack trace but not deep into Astro yet — explain in plain language.

---

**Files referenced:**
- Origin design system: this project (read-only from your perspective)
- Scaffold source: `scaffold/` in this project — copy its contents 1:1 into the new Astro project
- Walkthrough the user already read: `guides/astro-walkthrough.html` — use its vocabulary
