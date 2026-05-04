# chaivoot.com UI Kit

The single product UI kit for the Chaivoot Design System: a personal digital garden that mixes short notes and full articles in one feed across three pillars (Amway, Longevity, Dogs).

## Structure

```
index.html         click-thru prototype (Home → Post → About → Pillar)
app.jsx            page router + entry point
Nav.jsx            sticky top nav with mobile drawer
Hero.jsx           tagline + dual CTAs + "what this is"
PillarCards.jsx    three equal-weight pillar tiles
Feed.jsx           filter pills + mixed feed of notes/articles
PostRow.jsx        single feed row (handles both formats)
PillarPage.jsx     filtered feed for one pillar
PostDetail.jsx     full article reading layout
AboutPage.jsx      bio + photos + LINE CTA
AuthorCard.jsx     reused below post + on home
LineCTA.jsx        warm footer CTA
data.js            sample notes & articles
```

## Screens

- `home` — hero, three pillars, mixed feed, footer LINE CTA
- `post` — back link, meta, title, body, tags, author card, related
- `about` — extended bio, real photos placeholder, LINE
- `pillar:01|02|03` — hero band + filtered feed

## What's faithful to the brief

- Mixed feed (notes + articles in one stream, separated only by badge)
- Filter pills (active = solid black)
- 3 pillars at equal weight, no Amway emphasis
- Sentence case throughout
- No gradients, no shadows, no glassmorphism
- IBM Plex Sans Thai for Thai body
- "ผม" pronouns; warm-but-spare voice in copy
- Border-top hairlines between feed posts (no card per post)
- Read-time, date, pillar badge in mono
- Body max-width 580px, feed max-width 720px

## What's faked

- Real photos of Chaivoot/Mom-Maem (uses neutral placeholders that read as "photo")
- LINE deep-link (button is wired but goes nowhere)
- Search and tag pages (out of scope for the prototype)
- Newsletter (Phase 2 in brief)
