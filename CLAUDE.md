# Wong Term Parking — Claude Code Instructions

## What Is This?

Wong Term Parking is a destination wedding guest app for Albert's wedding in Bali, August 2026. It's a web app (not a native iOS app) so it works on any phone — guests just open a link or scan a QR code.

**You don't need to know how to code.** Just tell Claude what you want in plain English.

---

## Project Overview

| Thing | What it is |
|-------|-----------|
| Framework | Next.js (React-based web framework) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (when connected) |
| Hosting | Vercel (with custom domain) |
| Target | Mobile browsers (iPhone & Android) |

---

## Project Structure

```
src/
├── app/                    # Pages (each folder = a screen)
│   ├── page.tsx            # Home / Landing page with countdown
│   ├── itinerary/          # Day-by-day schedule
│   ├── announcements/      # Updates feed
│   ├── travel/             # Travel guide & logistics
│   └── guests/             # Guest directory
├── components/             # Reusable UI pieces
│   ├── Navigation.tsx      # Bottom nav bar
│   └── CountdownTimer.tsx  # Wedding countdown
├── lib/                    # Utilities
│   ├── supabase.ts         # Database client
│   └── types.ts            # TypeScript types
└── data/                   # Static wedding data
    └── wedding.ts          # Events, announcements, travel info
```

---

## Design Theme

Tropical Bali-inspired with these CSS variables:
- **Gold** (#c9a84c) — accents, highlights
- **Cream** (#faf7f0) — backgrounds
- **Charcoal** (#2d2d2d) — text
- **Forest** (#2d5016) — nature accents
- **Coral** (#e07a5f) — warm highlights
- **Ocean** (#3d85c6) — water/travel elements

---

## Development

```bash
npm run dev     # Start development server (localhost:3000)
npm run build   # Build for production
npm run lint    # Check for code issues
```

---

## Git Workflow

Same as Forge — work on `dev`, push to `main` when stable.

| Branch | Purpose |
|--------|---------|
| `main` | Stable (deployed to Vercel) |
| `dev` | Working branch |

---

## For Gustavo (Collaborator Notes)

- This is a Next.js web app, not Swift/iOS
- Uses Tailwind CSS for styling
- Wedding data is in `src/data/wedding.ts` — edit events/schedule there
- Supabase integration is stubbed but not yet connected
