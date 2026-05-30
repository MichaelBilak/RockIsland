# RockIsland Rimini

Website for **RockIsland** — restaurant and bar on the pier (Molo di Levante) in Rimini. Dark, cinematic UI (navy, black, amber/gold), focused on the evening experience: aperitivo, sunset, dinner, events, and bookings.

**Version:** `0.1.0` — full multi-page front end with optional email delivery for lead forms (no CMS). Optional **Supabase** wiring exists for future data (menu schema + health check); the public menu is still driven from TypeScript data files.

## Tech stack

- **Next.js 14** (App Router), **React 18**, **TypeScript**
- **Tailwind CSS** (+ `tailwindcss-animate`, `class-variance-authority`, `clsx`, `tailwind-merge`)
- **Radix UI** (label, popover, select, slot) and shared primitives under `components/ui/`
- **lucide-react** (icons)
- **framer-motion** (motion)
- **date-fns** + **react-day-picker** (booking date UI)
- **@supabase/supabase-js** — server client in `lib/supabase/server.ts` (optional; used by diagnostics route)

Fonts (Google, via `next/font`): **Cormorant Garamond** (headings), **Inter** (body).

**Email:** outbound mail uses the [Resend](https://resend.com) HTTP API from `lib/email/resend.ts` (no `resend` npm package — plain `fetch`).

**Media:** official venue imagery is referenced via `lib/wix-media.ts` (Wix static CDN URLs aligned with the public site).

**Analytics (optional):** Google Analytics 4 when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set (`app/layout.tsx`).

## Features

- **Bilingual UI:** Italian (default) and English via navbar toggle (IT | EN). Strings live in `lib/i18n/messages.ts` with locale helpers in `lib/i18n/locales.ts` and page-specific copy in `lib/i18n/page-additions.ts` (no locale segments in URLs).
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

## API routes

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/prenota` | Booking lead; emails via Resend when configured |
| `POST` | `/api/convention` | Convention lead; emails via Resend when configured |
| `GET` | `/api/test-supabase` | Connectivity check for Supabase (503 if env missing; optional `SUPABASE_TEST_TABLE` for a simple `select` probe) |

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
│       ├── convention/route.ts
│       └── test-supabase/route.ts
├── components/
│   ├── layout/             # AppShell, SiteNav, SiteFooter, MobileBottomBar, LanguageSwitcher, DocumentLang
│   ├── home/               # Home page sections
│   ├── menu/, eventi/, prenota/, convention/
│   ├── motion/             # e.g. FadeUp, HeroStagger
│   └── ui/                 # Button, Input, Calendar, Select, etc.
├── contexts/
│   └── LocaleContext.tsx   # Locale + `t()` from i18n bundles
├── lib/
│   ├── site.ts             # SITE_URL, contacts, WhatsApp, maps
│   ├── i18n/               # messages.ts, locales.ts, page-additions.ts
│   ├── menu-data.ts, events-data.ts, eventi-data.ts
│   ├── wix-media.ts        # Wix CDN URL helpers + asset IDs
│   ├── images.ts
│   ├── html.ts             # HTML escaping for emails
│   ├── utils.ts
│   ├── supabase/server.ts  # createServerSupabaseClient() (server-only)
│   └── email/resend.ts
├── supabase/migrations/    # e.g. public.menu table + RLS (apply in Supabase SQL or CLI)
├── tailwind.config.ts
└── next.config.mjs         # remotePatterns for next/image hosts
```

## Supabase (optional)

- **Env:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and preferably `SUPABASE_SERVICE_ROLE_KEY` on the server (see `.env.example`).
- **Client:** `createServerSupabaseClient()` returns `null` if URL/key are missing — the rest of the site does not require Supabase to run.
- **Schema:** `supabase/migrations/20250504000000_create_menu.sql` defines a `public.menu` table with RLS for public read of active rows; the Next.js menu UI still reads from `lib/menu-data.ts` until you wire a data fetch.
- **Health check:** `GET /api/test-supabase` verifies configuration; set `SUPABASE_TEST_TABLE` to a real table name to run a lightweight `select` in addition to the auth reachability check.

## Environment variables

Copy `.env.example` to `.env.local` for local development.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata (production default in code: `https://rockislandrimini.it`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional GA4 measurement ID |
| `RESEND_API_KEY` | Resend API key |
| `RESEND_FROM` | Verified sender, e.g. `RockIsland <bookings@your-domain.it>` |
| `RESEND_TO` | Inbox for lead notifications |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon (public) key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only service role (preferred over anon for server routes) |
| `SUPABASE_TEST_TABLE` | Optional: table name for `/api/test-supabase` query probe |
| `ADMIN_PANEL_SLUG` | Reserved placeholder in `.env.example` (not used by app routes yet) |

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

(`dev:fresh` runs `npm run clean` then `npm run dev`.)

## Content and assets

- **Contacts** and map links are centralized in `lib/site.ts` (phone, email, WhatsApp, Google Maps).
- **Images** use `next/image`; allowed hosts are listed in `next.config.mjs` (e.g. Unsplash, Tripadvisor, Wix static, Restaurant Guru).

## Notes

- No headless CMS: menu and events content for the UI live in `lib/menu-data.ts`, `lib/events-data.ts`, and `lib/eventi-data.ts`.
- **Production deploy:** set `NEXT_PUBLIC_SITE_URL`, configure Resend for working forms, configure Supabase if you use server features or future menu sync, and allow your image domains if you add new remote hosts.
