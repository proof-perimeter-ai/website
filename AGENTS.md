<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Perimeter — proofperimeter.com

On-device document-processing AI inference platform for regulated BFSI (banking, financial services, insurance) institutions, targeted primarily at the EU and Asia. Perimeter runs small, fine-tuned models inside a customer's own VPC or sovereign cloud — on commodity CPUs — so document inference (KYC packs, loan files, claims) never leaves their perimeter, and ships per-document provenance evidence for regulators (EU DORA / AI Act, Gulf SAMA / CBUAE, Singapore MAS, India RBI / DPDP, ISO 42001 / SOC 2).

This repo is the marketing site only — no product code lives here.

## Commands

```bash
npm run dev      # dev server (Turbopack)
npm run build    # production build
npm run lint     # ESLint
npm run start    # serve production build
```

No test suite exists.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — `@import "tailwindcss"` in `globals.css`, not legacy `@tailwind` directives
- **IBM Plex Sans** + **IBM Plex Mono** via `next/font/google`
- No database, no API routes, no auth — static marketing site, deployed as Vercel-native SSG (no `output: 'export'`)

## Architecture

### Site structure

A single-page marketing site (`app/page.tsx`) plus a `/book-demo` page. All pages are Server Components — the only client components are `FadeIn`/`useInView` (IntersectionObserver-driven scroll reveal).

### Animation pattern

Two distinct approaches, used intentionally:

- **Hero**: CSS-only keyframes (`.hero-animate-*` classes in `globals.css`). No JS — avoids hydration flash on above-fold content.
- **Below-fold sections**: `FadeIn` (`components/FadeIn.tsx`) + `useInView` (`hooks/useInView.ts`).

Do not switch the hero animation to JS-based.

### Design tokens

`app/globals.css` defines the brand palette (`paper`, `ink`, `signal`, `live`, etc.) as CSS variables, mapped into Tailwind via `@theme inline` so they're available as utilities (`bg-signal`, `text-ink-2`, `border-line`, `font-mono`, ...). Don't hardcode hex colors in components — use these utilities so the palette stays centralized in one place.

### Site config

`lib/metadata.ts` exports `siteConfig` — single source of truth for brand name, tagline, description, canonical URL, and OG/Twitter metadata. Update this file when any brand detail changes.

### SEO / AEO

- `app/robots.ts`, `app/sitemap.ts`, `app/opengraph-image.tsx`, `app/icon.tsx` — Next.js metadata file conventions; OG image and favicon are generated at build time via `next/og`, not static assets.
- `public/llms.txt` — summary for AI/answer-engine crawlers, per the `llms.txt` convention.
- `robots.ts` explicitly allows known AI crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `CCBot`) in addition to the wildcard rule — don't remove these without a reason.
- Structured data (`Organization`, `WebSite`, `FAQPage`) is injected via `components/JsonLd.tsx`. The `FAQPage` schema is generated from the same `faqs` array that renders the FAQ section in `app/page.tsx` — keep them in sync by construction, don't hand-write a second copy.

### `/book-demo`

Placeholder page — the actual lead-capture form has not been built yet. Don't assume a form submission handler exists.

## Repo layout

```
website/
├── app/
│   ├── page.tsx              — homepage (all sections)
│   ├── book-demo/page.tsx    — demo request placeholder (form not yet implemented)
│   ├── layout.tsx            — root metadata, fonts, Organization/WebSite JSON-LD
│   ├── globals.css           — Tailwind v4 import + design tokens + hero animation
│   ├── robots.ts, sitemap.ts, icon.tsx, opengraph-image.tsx
├── components/                — SiteNav, SiteFooter, FadeIn, JsonLd, Eyebrow, BrandMark
├── hooks/useInView.ts          — IntersectionObserver hook used by FadeIn
├── lib/metadata.ts             — site-wide brand/SEO config
└── public/llms.txt             — AEO summary for AI crawlers
```
