# BBE Video Rendering (Remotion)

## Setup

```bash
cd remotion
npm install
```

## Usage

### Preview in Remotion Studio
```bash
npm run studio
```
Opens browser at localhost:3000 with live preview.

### Render from post JSON
```bash
npx ts-node src/render-hero.ts ../content/posts/2026/01/11/trump-greenland-acquisition.json
```

Outputs:
- `public/videos/trump-greenland-acquisition/hero-thumbnail.png` (1080x1920)
- `public/videos/trump-greenland-acquisition/hero.mp4` (3 sec, 1080x1920)

## HeroScene Component

Props:
- `headline` — The question or claim (e.g., "TRUMP BUYS GREENLAND?")
- `odds` — The market odds as a number (e.g., 22)
- `face` — Path to protagonist image
- `category` — Category label (e.g., "POLITICS")

Layout (1080x1920):
```
┌─────────────────────────┐
│                         │  ← 420px padding
│                         │
├─────────────────────────┤
│                         │
│    TRUMP BUYS           │  ← Headline
│    GREENLAND?           │
│                         │
│      ┌─────────┐        │
│      │         │        │  ← Face (350x450)
│      │  FACE   │        │
│      │         │        │
│      └─────────┘        │
│                         │
│         22%             │  ← Odds (big)
│     MARKET ODDS         │
│                         │
│      [POLITICS]         │  ← Category badge
│                         │
├─────────────────────────┤
│                         │  ← 420px padding
│                         │
└─────────────────────────┘
```

## Animation Timeline (90 frames @ 30fps = 3 sec)

| Frame | What happens |
|-------|--------------|
| 0-15  | Headline fades in + slides up |
| 10-40 | Face springs in |
| 30-60 | Odds counter: 0% → 22% |
| 50-60 | Category badge fades in |
| 60-90 | Hold |

## Next Steps

1. Add more scenes (OddsBar, Quote, etc.)
2. Create full story composition that sequences all blocks
3. Add background music/sound effects
4. Batch render script for all posts
