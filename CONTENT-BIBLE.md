# BigBet.Energy Content Bible

> Paste this at the start of any Claude chat for full project context.

---

## Quick Start

1. Copy the Post Template (Section 2)
2. Fill in metadata + blocks
3. Create images (Section 5)
4. Add to `content/posts/YYYY/MM/DD/slug.json`
5. Test on localhost
6. Push to deploy

---

## 1. Project Overview

**Site:** bigbet.energy  
**Stack:** Next.js, TypeScript, Tailwind CSS  
**Theme:** Dark (black/neutral-900), gold accents (amber-400)  
**Container:** max-w-[1104px]  
**Deployment:** Vercel (auto-deploys on git push)

**URL Structure:** `/{year}/{month}/{day}/{slug}`  
**Content Location:** `content/posts/YYYY/MM/DD/slug.json`

---

## 2. Post Template

Copy this for every new post:

```json
{
  "slug": "post-slug-here",
  "title": "Post Title Here",
  "subtitle": "One sentence hook.",
  "category": "Premier League",
  "date": "2026-01-21",
  "thumbnail": "/images/post-slug/thumbnail.png",
  "image": "/images/post-slug/hero-bg.png",
  "videoSequence": [0, 2, 3, 4, 6, 7, 8],
  "blocks": []
}
```

### Metadata Fields

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| slug | ✅ | string | URL-safe identifier, must match filename |
| title | ✅ | string | Main headline |
| subtitle | ✅ | string | One sentence, shown on cards and header |
| category | ✅ | string | Exact match: "Premier League", "Champions League", "NFL", "NBA", "Politics", "Entertainment" |
| date | ✅ | string | ISO format: "2026-01-21" (must match folder path) |
| thumbnail | ✅ | string | Card image (portrait/logo), 400×400px |
| image | ✅ | string | Hero background, 1080×1080px |
| videoSequence | ❌ | array | Block indices for Remotion video |
| blocks | ✅ | array | Content blocks |

---

## 3. Component Schemas

### OddsBar
Primary odds display. Use `variant: "light"` for gold background.

```json
{
  "type": "OddsBar",
  "props": {
    "market": "Win Probability",
    "variant": "light",
    "odds": [
      { "label": "Team A", "value": 65, "highlight": true },
      { "label": "Team B", "value": 25 },
      { "label": "Draw", "value": 10 }
    ],
    "portrait": "/images/post-slug/oddsbar.png",
    "source": "Bet365",
    "date": "Jan 2026"
  }
}
```

| Prop | Required | Type | Notes |
|------|----------|------|-------|
| market | ✅ | string | Header text (e.g., "Win Probability") |
| variant | ❌ | "light" | Gold background. Omit for dark. |
| odds | ✅ | array | Min 2, max 5 items |
| odds[].label | ✅ | string | Team/option name |
| odds[].value | ✅ | number | Percentage (0-100) |
| odds[].highlight | ❌ | boolean | Gold highlight |
| portrait | ❌ | string | Image path |
| source | ✅ | string | Data source |
| date | ✅ | string | "Jan 2026" format |

**Remotion:** ✅ Has scene

---

### Quote
Expert or newsworthy quote with portrait.

```json
{
  "type": "Quote",
  "props": {
    "quote": "The quote text here.",
    "author": "Person Name",
    "role": "Job Title",
    "portrait": "/images/post-slug/author.png",
    "source": "Publication",
    "date": "Jan 2026"
  }
}
```

| Prop | Required | Type | Notes |
|------|----------|------|-------|
| quote | ✅ | string | The quote text |
| author | ✅ | string | Speaker name |
| role | ✅ | string | Title/position |
| portrait | ✅ | string | Cartoon portrait |
| source | ✅ | string | Where quote is from |
| date | ✅ | string | "Jan 2026" format |

**Remotion:** ✅ Has scene

---

### Context
Explanatory text block. Use `[[double brackets]]` for highlights.

```json
{
  "type": "Context",
  "props": {
    "label": "Why This Matters",
    "title": "Section Title",
    "body": "Main text with [[highlighted phrases]] using double brackets.",
    "source": "Source Name",
    "date": "Jan 2026"
  }
}
```

| Prop | Required | Type | Notes |
|------|----------|------|-------|
| label | ✅ | string | Small gold label |
| title | ✅ | string | Section heading |
| body | ✅ | string | 1-2 sentences max. Use [[brackets]] for highlights |
| source | ✅ | string | Data source |
| date | ✅ | string | "Jan 2026" format |

**Remotion:** ✅ Has scene

---

### ProgressRing
Circular progress indicator with portrait inside.

```json
{
  "type": "ProgressRing",
  "props": {
    "category": "Win Probability",
    "label": "The Favorite",
    "subtitle": "One short sentence.",
    "value": 65,
    "portrait": "/images/post-slug/ring.png",
    "source": "Bet365",
    "date": "Jan 2026"
  }
}
```

| Prop | Required | Type | Notes |
|------|----------|------|-------|
| category | ✅ | string | Top label |
| label | ✅ | string | Name/title |
| subtitle | ✅ | string | Context line |
| value | ✅ | number | Percentage (0-100) |
| portrait | ✅ | string | Image inside ring |
| source | ✅ | string | Data source |
| date | ✅ | string | "Jan 2026" format |

**⚠️ Common mistake:** Using `percentage` instead of `value`

**Remotion:** ✅ Has scene

---

### Gauge
Half-circle gauge with needle. Good for longshots.

```json
{
  "type": "Gauge",
  "props": {
    "label": "The Longshot",
    "title": "Short Title",
    "subtitle": "One sentence explanation.",
    "value": 15,
    "portrait": "/images/post-slug/gauge.png",
    "source": "Source",
    "date": "Jan 2026"
  }
}
```

| Prop | Required | Type | Notes |
|------|----------|------|-------|
| label | ✅ | string | Gold label |
| title | ✅ | string | Name |
| subtitle | ✅ | string | Context |
| value | ✅ | number | Percentage (0-100) |
| portrait | ✅ | string | Image path |
| source | ✅ | string | Data source |
| date | ✅ | string | "Jan 2026" format |

**Remotion:** ✅ Has scene

---

### StatCard
Big stat with optional quote.

```json
{
  "type": "StatCard",
  "props": {
    "stat": "15",
    "statLabel": "Goals",
    "label": "Player Name",
    "subtitle": "Context for the stat.",
    "portrait": "/images/post-slug/statcard.png",
    "quote": "Optional quote here.",
    "quoteAuthor": "Quote Author",
    "source": "Source",
    "date": "Jan 2026"
  }
}
```

| Prop | Required | Type | Notes |
|------|----------|------|-------|
| stat | ✅ | string | Big number (as string) |
| statLabel | ❌ | string | Label below stat |
| label | ✅ | string | Name/title |
| subtitle | ❌ | string | Context |
| portrait | ❌ | string | Image path |
| quote | ❌ | string | Optional quote |
| quoteAuthor | ❌ | string | Quote attribution |
| source | ✅ | string | Data source |
| date | ✅ | string | "Jan 2026" format |

**Remotion:** ✅ Has scene

---

### Milestone
Historical stat or achievement.

```json
{
  "type": "Milestone",
  "props": {
    "label": "Historic Season",
    "title": "Person Name",
    "subtitle": "What makes this significant.",
    "stat": "46",
    "statLabel": "Passing TDs",
    "portrait": "/images/post-slug/milestone.png",
    "source": "Source",
    "date": "Jan 2026"
  }
}
```

| Prop | Required | Type | Notes |
|------|----------|------|-------|
| label | ✅ | string | Gold label |
| title | ✅ | string | Name |
| subtitle | ✅ | string | Context |
| stat | ✅ | string | Big number |
| statLabel | ✅ | string | Label below stat |
| portrait | ✅ | string | Image path |
| source | ✅ | string | Data source |
| date | ✅ | string | "Jan 2026" format |

**Remotion:** ✅ Has scene

---

### VerticalBar
Vertical bar chart for comparisons.

```json
{
  "type": "VerticalBar",
  "props": {
    "title": "Chart Title",
    "subtitle": "What we're comparing.",
    "items": [
      { "label": "Item 1", "value": 97, "highlight": true },
      { "label": "Item 2", "value": 81 },
      { "label": "Item 3", "value": 73 }
    ],
    "unit": "%",
    "source": "Source",
    "date": "Jan 2026"
  }
}
```

| Prop | Required | Type | Notes |
|------|----------|------|-------|
| title | ✅ | string | Chart title |
| subtitle | ✅ | string | Explanation |
| items | ✅ | array | 2-5 items |
| items[].label | ✅ | string | Bar label |
| items[].value | ✅ | number | Bar value |
| items[].highlight | ❌ | boolean | Gold highlight |
| unit | ❌ | string | "%" or "M" etc |
| source | ✅ | string | Data source |
| date | ✅ | string | "Jan 2026" format |

**⚠️ Common mistake:** Using `name` instead of `label` in items

**Remotion:** ✅ Has scene

---

### HeadToHead
Team vs team comparison.

```json
{
  "type": "HeadToHead",
  "props": {
    "label": "The Rivalry",
    "title": "245 Meetings",
    "subtitle": "Historical context.",
    "leftTeam": {
      "name": "Team A",
      "image": "/images/post-slug/team-a-crest.png",
      "wins": 83
    },
    "rightTeam": {
      "name": "Team B",
      "image": "/images/post-slug/team-b-crest.png",
      "wins": 96
    },
    "draws": 66,
    "source": "Source",
    "date": "Jan 2026"
  }
}
```

| Prop | Required | Type | Notes |
|------|----------|------|-------|
| label | ✅ | string | Gold label |
| title | ✅ | string | Main title |
| subtitle | ✅ | string | Context |
| leftTeam.name | ✅ | string | Team name |
| leftTeam.image | ✅ | string | Crest/logo |
| leftTeam.wins | ✅ | number | Win count |
| rightTeam.name | ✅ | string | Team name |
| rightTeam.image | ✅ | string | Crest/logo |
| rightTeam.wins | ✅ | number | Win count |
| draws | ✅ | number | Draw count |
| source | ✅ | string | Data source |
| date | ✅ | string | "Jan 2026" format |

**Remotion:** ❌ No scene yet

---

### MoneyChart
Currency-based bar chart.

```json
{
  "type": "MoneyChart",
  "props": {
    "title": "Squad Values",
    "subtitle": "Transfer market estimates.",
    "currency": "€",
    "items": [
      { "label": "Team A", "value": 1.35, "unit": "bn", "highlight": true },
      { "label": "Team B", "value": 1.21, "unit": "bn" }
    ],
    "source": "Transfermarkt",
    "date": "Jan 2026"
  }
}
```

| Prop | Required | Type | Notes |
|------|----------|------|-------|
| title | ✅ | string | Chart title |
| subtitle | ✅ | string | Context |
| currency | ✅ | string | "€", "$", "£" |
| items | ✅ | array | 2-5 items |
| items[].label | ✅ | string | Label |
| items[].value | ✅ | number | Amount |
| items[].unit | ❌ | string | "bn", "M" etc |
| items[].highlight | ❌ | boolean | Gold highlight |
| source | ✅ | string | Data source |
| date | ✅ | string | "Jan 2026" format |

**Remotion:** ❌ No scene yet

---

### ProgressBar
Simple horizontal progress bar.

```json
{
  "type": "ProgressBar",
  "props": {
    "label": "Label Text",
    "subtitle": "Explanation.",
    "value": 32,
    "source": "Source",
    "date": "Jan 2026"
  }
}
```

| Prop | Required | Type | Notes |
|------|----------|------|-------|
| label | ✅ | string | Title |
| subtitle | ✅ | string | Context |
| value | ✅ | number | Percentage (0-100) |
| source | ✅ | string | Data source |
| date | ✅ | string | "Jan 2026" format |

**Remotion:** ❌ No scene yet

---

### InteractiveCTA
User engagement slider. **Web only, not for video.**

```json
{
  "type": "InteractiveCTA",
  "props": {
    "question": "What chance do you give Arsenal?",
    "marketOdds": 65,
    "candidate": "Arsenal"
  }
}
```

| Prop | Required | Type | Notes |
|------|----------|------|-------|
| question | ✅ | string | Question text |
| marketOdds | ✅ | number | Market percentage |
| candidate | ✅ | string | Subject name |

**Remotion:** ❌ Skip in videoSequence

---

### PreferenceCTA
Two-choice sportsbook picker. **Web only, not for video.**

```json
{
  "type": "PreferenceCTA",
  "props": {
    "question": "What matters more?",
    "options": ["bonusValue", "payoutSpeed"]
  }
}
```

| Prop | Required | Type | Notes |
|------|----------|------|-------|
| question | ✅ | string | Question text |
| options | ✅ | array | Exactly 2 values from: "bonusValue", "payoutSpeed", "oddsQuality", "appExperience" |

**Remotion:** ❌ Skip in videoSequence

---

### Sources
Collapsible attribution footer. **Web only, always last block.**

```json
{
  "type": "Sources",
  "props": {
    "items": [
      { "label": "Quote source – Publication", "url": "https://..." },
      { "label": "Odds – Bet365", "url": "https://..." }
    ]
  }
}
```

| Prop | Required | Type | Notes |
|------|----------|------|-------|
| items | ✅ | array | Source list |
| items[].label | ✅ | string | Description |
| items[].url | ✅ | string | Link |

**Remotion:** ❌ Skip in videoSequence

---

## 4. Recommended Block Order

| # | Block | Purpose |
|---|-------|---------|
| 0 | OddsBar (light) | Hook: main odds |
| 1 | InteractiveCTA | Engagement |
| 2 | Quote | Key voice |
| 3 | Context | Explain the story |
| 4 | ProgressRing | Favorite/protagonist |
| 5 | Gauge OR HeadToHead | Wildcard/comparison |
| 6 | PreferenceCTA | CTA #1 |
| 7 | StatCard OR Milestone | Secondary angle |
| 8 | VerticalBar | Broader comparison |
| 9 | MoneyChart OR ProgressBar | Supporting data |
| 10 | OddsBar (light) | Fun/absurd closer |
| 11 | PreferenceCTA | CTA #2 |
| 12 | Sources | Attribution (always last) |

---

## 5. Image Specifications

### Folder Structure
```
public/images/
└── {post-slug}/
    ├── hero-bg.png         # 1080×1080, cartoon-filtered background
    ├── thumbnail.png       # 400×400, portrait or league logo
    ├── oddsbar.png         # 400×400, portrait
    ├── quote-author.png    # 400×400, cartoon portrait
    ├── ring.png            # 400×400, portrait
    ├── gauge.png           # 400×400, portrait
    ├── statcard.png        # 400×400, portrait
    ├── milestone.png       # 400×400, portrait
    └── team-crest.png      # 200×200, logo
```

### Size Reference

| Image Type | Size | Format |
|------------|------|--------|
| Hero background | 1080×1080px | PNG (cartoon filter) |
| Thumbnail (cards) | 400×400px | PNG |
| Portraits (all blocks) | 400×400px | PNG (cartoon filter, no bg) |
| Team crests/logos | 200×200px | PNG (transparent bg) |
| League logos | 200×200px | PNG (transparent bg) |

### Cartoon Filter Workflow
1. Find source image
2. Run through Canva cartoon filter
3. Remove background (Canva BG remover)
4. Export PNG
5. For circles: add gradient background
6. For corner overlays: add drop shadow

### Image Naming
- One unique image per block, even if same person
- Name by usage: `arteta-quote.png`, `arteta-ring.png`
- Lowercase, hyphens, no spaces

---

## 6. Remotion Video

### Setup
Videos are in `remotion/` folder. Images must be copied to `remotion/public/images/`.

### videoSequence
Array of block indices to include in video. Skip CTAs and Sources.

**Example:**
```json
"videoSequence": [0, 2, 3, 4, 7, 8, 10]
```

### Scenes Available
| Component | Has Scene |
|-----------|-----------|
| OddsBar | ✅ |
| Quote | ✅ |
| Context | ✅ |
| ProgressRing | ✅ |
| Gauge | ✅ |
| StatCard | ✅ |
| Milestone | ✅ |
| VerticalBar | ✅ |
| HeadToHead | ❌ |
| MoneyChart | ❌ |
| ProgressBar | ❌ |
| InteractiveCTA | ❌ |
| PreferenceCTA | ❌ |
| Sources | ❌ |

### Render Commands
```bash
# Copy images first
cp -r public/images/{post-slug}/* remotion/public/images/{post-slug}/

# Add to remotion/src/posts.ts
import postName from "../../../content/posts/YYYY/MM/DD/post-slug.json";
export const posts = [
  // ... existing
  { id: "post-slug", data: postName },
];

# Render video
cd remotion
npx remotion render post-slug out/post-slug.mp4

# Render thumbnail
npx remotion still post-slug out/post-slug-thumb.png --frame=0
```

### Safe Zones (TODO)
Instagram/TikTok overlay UI on videos:
- Top: 150px
- Bottom: 250px

Text should stay within safe area.

---

## 7. Publishing Checklist

### Pre-publish
- [ ] JSON validates (no trailing commas, all fields present)
- [ ] `slug` matches filename
- [ ] `date` matches folder path (YYYY/MM/DD)
- [ ] `thumbnail` image exists
- [ ] `image` (hero bg) exists
- [ ] All block images exist
- [ ] Sources block is last
- [ ] No CTA blocks adjacent to each other

### Test
- [ ] `npm run dev` — no errors
- [ ] Post renders at correct URL
- [ ] Homepage card shows thumbnail
- [ ] /stories page shows post
- [ ] Mobile looks correct

### Deploy
```bash
git add .
git commit -m "Add post: [title]"
git push
```

### Post-publish
- [ ] Verify on bigbet.energy
- [ ] Copy images to `remotion/public/images/`
- [ ] Add to `remotion/src/posts.ts`
- [ ] Render video
- [ ] Post to: TikTok, IG, YouTube Shorts
- [ ] Post to: X, Threads
- [ ] Post to: Telegram channel

---

## 8. Social Accounts

| Platform | Handle | URL |
|----------|--------|-----|
| Telegram | bigbetenergy | t.me/bigbetenergy |
| Instagram | bigbet.energy | instagram.com/bigbet.energy |
| TikTok | bigbet.energy | tiktok.com/@bigbet.energy |
| YouTube | bigbet.energy | youtube.com/@bigbet.energy |
| X | bigbet_energy | x.com/bigbet_energy |
| Threads | bigbet.energy | threads.com/@bigbet.energy |

---

## 9. Common Mistakes

| Mistake | Fix |
|---------|-----|
| `name` in OddsBar/VerticalBar items | Use `label` |
| `percentage` in ProgressRing/Gauge | Use `value` |
| `text` in Context | Use `body` |
| `label` at OddsBar top level | Use `market` |
| Date mismatch | Folder path must match JSON `date` |
| Missing thumbnail | Breaks homepage cards |
| Adjacent CTAs | Put content blocks between |
| HeadToHead in videoSequence | No scene exists |
| Images in wrong folder | Copy to `remotion/public/` for video |

---

## 10. Categories

Use exact strings:
- `"Premier League"`
- `"Champions League"`
- `"NFL"`
- `"NBA"`
- `"NHL"`
- `"Politics"`
- `"Entertainment"`

---

## 11. File Locations

```
bigbet-energy/
├── app/
│   ├── components/          # All UI components
│   ├── [year]/[month]/[day]/[slug]/page.tsx  # Post renderer
│   ├── stories/page.tsx     # /stories page
│   └── page.tsx             # Homepage
├── content/
│   └── posts/
│       └── YYYY/MM/DD/      # Post JSON files
├── public/
│   └── images/
│       ├── organisations/   # League logos
│       └── {post-slug}/     # Post-specific images
├── remotion/
│   ├── public/images/       # Copy images here for video
│   └── src/
│       ├── posts.ts         # Register posts for video
│       └── components/      # Video scene components
└── CONTENT-BIBLE.md         # This file
```

---

*Last updated: January 21, 2026*
