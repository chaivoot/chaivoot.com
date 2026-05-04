# chaivoot.com

Personal digital garden — บันทึกของชายวัย 50 กับหมา 1 ตัว ที่สนใจ Longevity และธุรกิจ Amway

## Stack

- **Astro** 4 — static site generator
- **Vercel** — hosting + auto-deploy
- **GitHub** — content storage + version control

## Content structure

โพสต์ทุกอันเป็นไฟล์ `.md` ใน `src/content/blog/`. ทุกอันมี frontmatter:

```yaml
---
title:   string
date:    YYYY-MM-DD
pillar:  amway | longevity | dogs
format:  note | article
excerpt: string (optional)
tags:    array of strings (optional)
draft:   boolean (default false)
---
```

## Adding a new post

### Option A — GitHub web (เลี่ยง command line ได้)
1. ไปที่ `github.com/chaivoot/chaivoot.com/tree/main/src/content/blog`
2. กด "Add file" → "Create new file"
3. ตั้งชื่อตาม pattern: `YYYY-MM-DD-slug.md`
4. กรอก frontmatter + เนื้อหา markdown
5. กด "Commit changes" → Vercel auto-build, live ใน 1–2 นาที

### Option B — Local dev
```bash
npm install
npm run dev   # → http://localhost:4321
```

## Pillars

- `amway` — slate indigo
- `longevity` — sage
- `dogs` — terracotta

แก้ pillar metadata ที่ `src/lib/pillars.ts`. แก้สีที่ `src/styles/tokens.css`

## Routing

| Path | Source |
|------|--------|
| `/` | `src/pages/index.astro` |
| `/about` | `src/pages/about.astro` |
| `/pillars/{id}` | `src/pages/pillars/[pillar].astro` |
| `/blog/{slug}` | `src/pages/blog/[slug].astro` |
