# Chaivoot Design System

Personal digital garden for **ชัยวุฒิ (Chaivoot)** — a 50-year-old Thai man whose life centers on three intertwined pursuits, all bound by a single thread: *การดูแลคุณภาพชีวิตให้ยืนยาวอย่างมีความหมาย* (caring for the long, meaningful quality of life).

## The 3 Pillars

| # | Pillar | Color | Topic |
|---|---|---|---|
| 01 | **ธุรกิจ Amway** | Purple `#534AB7` | Opportunity, perspective, people met along the way |
| 02 | **Longevity** | Green `#1D9E75` | Nutrition, supplements, lifestyle, mindset |
| 03 | **หมาและมอมแมม** | Orange `#D85A30` | Choice-based dog training, canine nutrition |

All three pillars sit at equal weight. Amway is not hidden, but it is also not pushed.

## What this site is

Not a blog. A **digital garden** — a permanent home for thought, mixing two content formats in a single feed:

- **บันทึกสั้น** (Short notes): 1–3 sentences, no title, no image. Written in 2 minutes.
- **บทความ** (Articles): full-length pieces with title, excerpt, read time.

Both formats share the same feed; they're separated only by a small badge.

The site does what social media cannot:
- **Permanent home for ideas** (social posts vanish in 3 days; web articles live 10 years)
- **Findable on Google** (long-tail SEO like "ฝึกหมา choice based")
- **A deep business card** when someone meets Chaivoot via social and wants to know him properly
- **Authority builder** for inviting people into the Amway business

## Sources

- **Design Brief** — pasted by user, version 1.1 (Pillar 02 changed from "Nutrition" to "Longevity"). Stored at `brief.md`.
- **Repo `chaivoot/chaivoot-garden`** — empty at time of build.
- **Reference repos in the same org** — read for visual vocabulary, not copied:
  - `chaivoot/fundamental-landing` — single-page landing for Chaivoot's Amway funnel (cream/navy/gold palette, Noto Serif Thai + Sarabun, hairline borders, flat blocks). Different brand from chaivoot.com but same author's hand.
  - `chaivoot/dogevity-food` — pet-nutrition product (teal/gold, Prompt font, rounded). Will be linked from Pillar 03.
  - `chaivoot/fundamental-tracker`, `chaivoot/pawsmom` — private, not read.

The chaivoot.com brand defined here is **its own thing**. It is intentionally more austere than either reference site — closer to Substack reading layouts and Derek Sivers' personal site than to the Fundamental funnel.

---

## Index — what's in this folder

```
README.md                       this file
brief.md                        original design brief (Thai)
SKILL.md                        skill manifest for Claude Code reuse
colors_and_type.css             low-level CSS vars (color, type, spacing)
fonts/                          (web fonts loaded from Google CDN — see note)
assets/                         logos, illustrations, photos
preview/                        small HTML cards used in the Design System tab
ui_kits/
  chaivoot-web/                 the chaivoot.com UI kit (the main product)
    README.md
    index.html                  click-thru prototype: home → post → about
    *.jsx                       reusable components
```

There are no slide templates in this system — none were provided.

---

## CONTENT FUNDAMENTALS

How copy is written for chaivoot.com.

### Voice

- **First-person singular: "ผม"** — never "เรา" (we). This is one man's garden.
- **Second-person: "คุณ"** is fine but used sparingly. Prefer naming the reader as a peer rather than addressing them as audience.
- Tone: **เป็นกันเอง แต่ไม่กระแดะ** — friendly but never cutesy or over-familiar. Like telling a story to a friend.
- Never sales-y. Phrases to avoid: "คุณรู้หรือไม่ว่า…", "พิเศษวันนี้เท่านั้น", "อย่าพลาดโอกาส".

### Casing

- **Sentence case only.** No Title Case. No ALL CAPS. This applies to headings, buttons, navigation — everywhere.
- This is a hard rule and is enforced in CSS (no `text-transform: uppercase` on Thai content).
- Eyebrow labels in Latin (e.g. "READ" / "NEW") may use uppercase + letter-spacing, but only as a typographic accent and only sparingly.

### Pronouns and identity

- "ผม" (I — the author): for personal opinion, story, position
- "คุณ" (you): used softly, as in conversation, not in instruction
- Names: real names of dogs ("มอมแมม"), people ("น้องคนนึงที่กำลังตัดสินใจ"), products ("Amway") are written naturally, in the body, never bolded for emphasis

### Emoji

- **Effectively never** in body content. Emoji are not part of the visual vocabulary.
- The `dogevity-food` reference site uses emoji liberally (🐾 🎓); chaivoot.com does NOT inherit that.
- Exception: a single small Thai paw `🐾` may appear on the Pillar 03 illustration token at small sizes, as a last-resort fallback only.

### Vibe — three example openings

> "เช้านี้คุยกับน้องคนนึงที่กำลังตัดสินใจเรื่องอาชีพที่สอง สิ่งที่ผมบอกเขาคือ…"
> *(short note — Amway pillar)*

> "โภชนาการหมา: ทำไมผมเลือก BARF ให้มอมแมม"
> *(article title — Dog pillar; sentence case, colon-separated)*

> "บันทึกของชายวัย 50 กับหมา 1 ตัว ที่สนใจ Longevity และธุรกิจ Amway"
> *(home tagline — three pillars in one breath, no oxford comma in Thai)*

### Phrasing patterns

- **Lead with a moment**, not a thesis. ("เช้านี้คุยกับ…", "สัปดาห์ที่แล้วผมลอง…")
- **One idea per paragraph.** Paragraphs are short (2–4 sentences) for mobile readability — Thais read on phones.
- **End with a question or a small offering**, never a hard CTA. The footer says "มีอะไรอยากคุย? ทักมาทาง LINE ได้เลยครับ ผมตอบเอง" — that's the maximum-warmth tone.

### Forbidden

- ❌ "Click here", "อ่านเพิ่ม >>", aggressive arrows
- ❌ Stock-photo Asians smiling
- ❌ Anything that could be mistaken for an MLM landing page
- ❌ Gradients in body text (no `-webkit-background-clip: text`)
- ❌ "พิเศษวันนี้", urgency language

---

## VISUAL FOUNDATIONS

### Colors

White-and-grey first; pillar color is an **accent only** — used in badges, dots, and one or two places per page. Never in large fills, never in hero gradients.

```
Surface           bg         #FFFFFF
Surface alt       bg-alt     #F7F6F2     (warm off-white, paper feel)
Text primary      fg         #111111
Text secondary    fg-muted   #6B6B6B
Text tertiary     fg-faint   #9A9A9A
Border            border     #E8E6E1     (about 15% opacity black, warm)
Border faint      border-faint  #F0EDE7

Pillar 01 Amway    purple-ink   #534AB7
Pillar 01 wash     purple-wash  #ECEAFB
Pillar 02 Longev.  green-ink    #1D9E75
Pillar 02 wash     green-wash   #E2F4EC
Pillar 03 Dogs     orange-ink   #D85A30
Pillar 03 wash     orange-wash  #FBE9DF
```

The wash colors are used as badge backgrounds; the ink color is used for the badge text and (rarely) as a 1px underline accent. Pillar color **never** appears in body text or in headings.

### Typography

- **Thai (primary):** `IBM Plex Sans Thai` — Google Fonts, weights 300 / 400 / 500. Designed for screens, neutral, professional.
- **Latin fallback:** `IBM Plex Sans` (matched metrics).
- **Optional accent:** `IBM Plex Serif` (Latin only) for the wordmark and the rare pull-quote. Thai pull-quotes stay sans.
- **Mono:** `IBM Plex Mono` for read-time, dates, and tiny meta labels.

> **Substitution flag.** The brief listed `IBM Plex Sans Thai` *or* `LINE Seed Sans TH`. We picked Plex because it is on Google Fonts (LINE Seed is too, but inconsistently). If Chaivoot prefers LINE Seed, swap the `--font-sans` var and reload — no other change needed. **No proprietary font files needed for this system; both options are CDN-hosted.**

Body sits at **15–16px**, line-height **1.7–1.8** (the brief mandates this for Thai readability). Headings stay at **weight 500**, never 700+ — heaviness reads as marketing.

### Spacing

A 4-based scale, tight at small steps and generous at large:
`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128`

The page lives at **max-width 720px** for the feed and **max-width 580px** for post body — both deliberately narrow, in service of the brief's "อ่านสบาย ไม่ยาวเกินไป" directive.

### Backgrounds

- **No gradients.** Anywhere. (Hard rule from the brief.)
- **No glassmorphism, no glow, no blur stacks.**
- **No full-bleed photography.** Photos appear inline at column-width or smaller, with a 1px border.
- **Optional warm off-white** (`#F7F6F2`) for the pillar-page hero band and for inline `<aside>`-style callouts.
- **No repeating patterns or textures.**

### Animation

- Subtle only. Page reveal is `opacity 0 → 1` over `400ms`, ease-out. Nothing else moves.
- No bounces, no parallax, no marquees on chaivoot.com (the marquee on `fundamental-landing` is for *that* product, not this one).
- Hover transitions: 150–200ms, ease.
- Press: no shrink. Color shift only.

### Hover states

- Links: underline appears (or thickens from `text-decoration-thickness: 1px` to `2px`).
- Buttons (outline): background fades to `#111` at 100% with white text.
- Cards / post rows: `border-top` color deepens by one step (`border` → `fg-faint`). Background stays white.
- No translateY, no shadow growth.

### Press states

- Buttons: background goes from `#111` to `#000`. No transform.
- Links: opacity drops to `0.7` for 80ms, then returns. (Mobile tap feedback only.)

### Borders

- **0.5px hairlines** wherever possible (uses `border-width: 1px` plus `transform: scaleY(0.5)` trick on horizontal rules; `1px` is acceptable on cards).
- Color: `--border` (`#E8E6E1`).
- Border-radius scale: `0` for posts (full-bleed feed rows), `8px` for inline pills/badges, `12px` for buttons, `999px` for filter pills only.

### Shadows

- **None on chaivoot.com.** Flat design is mandatory.
- The `dogevity-food` reference uses generous teal shadows; **do not inherit them here**.

### Cards

There are no "cards" in the conventional sense on chaivoot.com. The feed is a list of rows separated by a hairline `border-top`. The visual structure is the *list*, not the *card*.

The 3 Pillar cards on the home page are the one exception: they have a `1px` border, no shadow, `12px` radius, 24–32px padding, and the pillar color appears only as a 2px-tall stripe at the top of the card.

### Transparency & Blur

- Used **only** for the sticky nav background: `rgba(255,255,255,0.92)` + `backdrop-filter: blur(10px)`.
- Nowhere else.

### Layout rules

- **Single-column mobile**, two-column desktop only on About and the home Hero+Pillars block.
- Nav is sticky, 56px tall on mobile, 64px on desktop.
- The feed never exceeds 720px; the post body never exceeds 580px.
- Page padding: `24px` mobile → `48px` desktop.
- Footer is two short lines, centered, in `--fg-muted`.

### Imagery vibe

- Photos are warm-leaning (slight yellow cast). Never desaturated, never b&w (would feel funereal in this context), never high-contrast.
- The author's own photos of his dog (มอมแมม) and of himself are the gold standard — **never stock photography**, especially never stock photos of smiling Asians (explicit "don't" from the brief).

### Corner radii (consolidated)

| element | radius |
|---|---|
| Filter pills | `999px` |
| Badges (post type) | `4px` |
| Buttons | `12px` |
| Pillar cards | `12px` |
| Inputs | `10px` |
| Author avatar | `999px` |
| Inline images | `8px` |
| Quote blocks | `0` (border-left only) |
| Feed post rows | `0` (no card; border-top only) |

---

## ICONOGRAPHY

The chaivoot.com brand is **deliberately icon-light**. Where icons appear, they are:

1. **Lucide** (CDN: `https://unpkg.com/lucide-static@0.453.0/`) — clean, 1.5px-stroke, geometric. Used only in two places: the nav (LINE chat bubble), and the "external link" arrow on outbound CTAs (`arrow-up-right` / `↗`).
2. **Unicode arrows** (`→`, `↗`, `←`) for inline navigation accents — preferred over icon glyphs because they pick up the body font's weight and color naturally.
3. **No icon font.** No SVG sprite. No PNG icon set.
4. **No emoji.** Even though `dogevity-food` uses 🐾 / 🎓 / 🐕 prominently, chaivoot.com does not.

Substitution flag: Lucide is used as a CDN dependency rather than copied locally to keep this system small — and because Lucide is the codebase-agnostic choice that best matches the brief's "minimal, professional" direction. If Chaivoot prefers another set (Phosphor, Heroicons), it's a one-line swap.

### Pillar dots

Each pillar has a 6px solid circle in its ink color, used as a leading dot in feed metadata (`● Amway · 5 ก.พ. 2026 · อ่าน 4 นาที`). This is the *only* place pillar color appears outside of badges. The dots are pure CSS — `border-radius: 50%; width: 6px; height: 6px; background: var(--p1-ink)`.

### Logo

A custom glyph mark: an interlocking **C / V** monogram. The C is a heavy ring with sliced terminals; the V is a slim italic stroke that crosses through the C's lower terminal. The mark is rendered as a single closed path (works at any size, single color).

- `assets/logo-mark.svg` — `currentColor`, drop-in for any background
- `assets/logo-mark-dark.svg` — pre-rendered ivory glyph on `#111` rounded square
- `assets/logo-mark-light.svg` — pre-rendered black glyph on `#FAFAF8` rounded square
- `assets/favicon.svg` — same as dark, browser tab use

Beside the mark, the wordmark `chaivoot` is set in IBM Plex Sans, weight 500, letter-spacing `-0.02em`. Mark + wordmark is the standard nav/footer lockup; the mark stands alone at favicon and avatar sizes.

---

## How to use this system

Read `colors_and_type.css` for the token surface. Open `ui_kits/chaivoot-web/index.html` for the click-thru prototype. The Design System tab (preview cards in `preview/`) shows everything at a glance.

Production handoff is straightforward: the `:root` vars in `colors_and_type.css` are the entire token contract. Any component built against those vars will look correct.
