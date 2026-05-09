# RockIsland Rimini

Website for **RockIsland** — restaurant and bar on the pier (Molo di Levante) in Rimini. Dark, cinematic UI (navy, black, amber/gold), focused on the evening experience: aperitivo, sunset, dinner, events, and bookings.

**Version:** `0.1.0` — full multi-page front end with optional email delivery for lead forms (no CMS).

## Tech stack

- **Next.js 14** (App Router), **React 18**, **TypeScript**
- **Tailwind CSS** (+ `tailwindcss-animate`, `class-variance-authority`, `clsx`, `tailwind-merge`)
- **Radix UI** (label, popover, select, slot) and shared primitives under `components/ui/`
- **lucide-react** (icons)
- **framer-motion** (motion)
- **date-fns** + **react-day-picker** (booking date UI)

Fonts (Google, via `next/font`): **Cormorant Garamond** (headings), **Inter** (body).

**Email:** outbound mail uses the [Resend](https://resend.com) HTTP API from `lib/email/resend.ts` (no `resend` npm package — plain `fetch`).

**Analytics (optional):** Google Analytics 4 when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set (`app/layout.tsx`).

## Features

- **Bilingual UI:** Italian (default) and English via navbar toggle (IT | EN). Copy lives in `lib/translations.ts` with extras in `lib/i18n/` (no locale segments in URLs).
- **Responsive:** Mobile-first; drawer navigation, bottom bar on small screens (`MobileBottomBar`).
- **SEO:** Metadata (title template, description, Open Graph, Twitter), `robots.ts`, `sitemap.ts`, JSON-LD `Restaurant` schema in `app/layout.tsx`.
- **Forms:** `/prenota` and `/convention` POST to App Router API routes; server validates input and can email leads when Resend env vars are configured.

## Routes

| Path | Purpose |
|------|---------|
| `/` | Home: hero, about, experience, menu teaser, events ticker, convention CTA, footer |
| `/menu` | Full menu |
| `/eventi` | Events listing |
| `/prenota` | Table booking (form → `POST /api/prenota`) |
| `/convention` | Convention / private events (form → `POST /api/convention`) |

## Project structure

```
├── app/
│   ├── layout.tsx          # Fonts, metadata, JSON-LD, optional GA4, LocaleProvider, AppShell
│   ├── page.tsx            # Home sections
│   ├── globals.css
│   ├── menu/page.tsx
│   ├── eventi/page.tsx
│   ├── prenota/page.tsx
│   ├── convention/page.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   └── api/
│       ├── prenota/route.ts
│       └── convention/route.ts
├── components/
│   ├── layout/             # AppShell, SiteNav, SiteFooter, MobileBottomBar, LanguageSwitcher, DocumentLang
│   ├── home/               # Home page sections
│   ├── menu/, eventi/, prenota/, convention/
│   ├── motion/             # e.g. FadeUp, HeroStagger
│   └── ui/                 # Button, Input, Calendar, Select, etc.
├── contexts/
│   └── LocaleContext.tsx   # Locale + translations
├── lib/
│   ├── site.ts             # SITE_URL, contacts, WhatsApp, maps
│   ├── translations.ts
│   ├── i18n/
│   ├── menu-data.ts, events-data.ts, eventi-data.ts
│   ├── images.ts
│   ├── html.ts             # HTML escaping for emails
│   ├── utils.ts
│   └── email/resend.ts
├── tailwind.config.ts
└── next.config.mjs         # remotePatterns for next/image hosts
```

## Environment variables

Copy `.env.example` to `.env.local` for local development.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata (default in code: `https://rockislandrimini.it`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional GA4 measurement ID |
| `RESEND_API_KEY` | Resend API key |
| `RESEND_FROM` | Verified sender, e.g. `RockIsland <bookings@your-domain.it>` |
| `RESEND_TO` | Inbox for lead notifications |

If Resend variables are missing, `POST /api/prenota` and `POST /api/convention` respond with **503** (service not configured).

## Scripts

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build && npm start    # production
npm run lint
npm run dev:fresh             # clean .next then dev
```

## Content and assets

- **Contacts** and map links are centralized in `lib/site.ts` (phone, email, WhatsApp, Google Maps).
- **Images** use `next/image`; allowed hosts are listed in `next.config.mjs` (e.g. Unsplash, Tripadvisor, Wix static, Restaurant Guru).

## Notes

- No headless CMS: menu and events data are in `lib/*.ts` files.
- Production deploy: set `NEXT_PUBLIC_SITE_URL`, configure Resend for working forms, and allow your image domains if you add new remote hosts.
