

# Proof Perimeter — proofperimeter.com
Proof Perimeter is an frontier document AI platform for processing highly regulated, high-risk documents — KYC packets, insurance claims files, letters of credit, loan applications, and policies. Start free with your own model key (Bring Your Own Key), or license Proof Perimeter's proprietary, fine-tuned Document AI model on the Enterprise tier for higher accuracy, lower token cost, and zero-egress deployment.

Proof Perimeter provides one workspace for the full document lifecycle: classification, extraction, human-in-the-loop review, and structured export. Pre-built templates cover recurring fields, standard clauses, complex tables, and form-based layouts common to regulated industries. Every extracted field carries provenance — what the model saw, what it decided, and why — so a reviewer or auditor can trace any value back to its source.

This repo is the marketing site only — no product code lives here.

## Product

Proof Perimeter is an frontier AI platform for processing highly regulated, high-risk documents — KYC packets, insurance claims files, letters of credit, loan applications, policies.

**Core workspace & capabilities**
- End-to-end workflow: document classification → data extraction → human-in-the-loop review queues → structured export.
- Pre-built templates for recurring fields, standard clauses, complex tables, and form-based layouts common in regulated industries.
- Field-level data lineage/provenance on extracted values — what the model saw, what it decided, and why.

**Pricing paths**
1. **Bring Your Own Key (BYOK)** — free tier for the platform workspace itself; customer supplies their own API keys (OpenAI, Anthropic, Google, etc.) and pays those providers directly at standard rates.
2. **Enterprise License** — paid tier using Proof Perimeter's proprietary, fine-tuned Document AI model. Per internal benchmarks: 20% higher accuracy and 50% lower token consumption than general frontier models on document-extraction tasks.

**Security & compliance (Enterprise tier)**
- Zero-egress deployment options: cloud-hosted, within customer infrastructure, or fully on-premise.
- Built-in SSO, RBAC, and maker-checker validation workflows.

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

`next/og`-generated assets (`app/icon.tsx`, `app/opengraph-image.tsx`) can't read CSS custom properties (Satori, the renderer behind `ImageResponse`, has no access to the page's CSS), so they import the same values from `lib/colors.ts` instead. If you change the brand color palette, update both `app/globals.css` and `lib/colors.ts`.

### Site config

`lib/metadata.ts` exports `siteConfig` — single source of truth for brand name, tagline, description, canonical URL, and OG/Twitter metadata. Update this file when any brand detail changes.

### SEO / AEO

- `app/robots.ts`, `app/sitemap.ts`, `app/opengraph-image.tsx`, `app/icon.tsx` — Next.js metadata file conventions; OG image and favicon are generated at build time via `next/og`, not static assets.
- `public/llms.txt` — summary for AI/answer-engine crawlers, per the `llms.txt` convention.
- `robots.ts` explicitly allows known AI crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `CCBot`) in addition to the wildcard rule — don't remove these without a reason.
- Structured data (`Organization`, `WebSite`, `FAQPage`) is injected via `components/JsonLd.tsx`. The `FAQPage` schema is generated from the same `faqs` array that renders the FAQ section in `app/page.tsx` — keep them in sync by construction, don't hand-write a second copy.

### `/book-demo`

Placeholder page — the actual lead-capture form has not been built yet. Don't assume a form submission handler exists.

### Analytics

Client-side analytics (autocapture for clicks/pageviews/pageleaves, session replay) initializes via `instrumentation-client.ts` at the project root — Next.js loads this automatically before hydration; don't import it manually or re-init PostHog elsewhere. GA/GTM/HubSpot remain wired separately in `app/layout.tsx`. Two manual conversion events fire alongside the existing GA conversion pixel: `demo_booking_completed` in `components/BookDemoCal.tsx`'s Cal.com `bookingSuccessfulV2` callback, and `book_demo_thank_you_viewed` in `components/BookDemoConversion.tsx`'s mount effect. PostHog credentials live in `.env.local` (gitignored, local-only — not yet set in Vercel).

## Repo layout

```
website/
├── instrumentation-client.ts — PostHog client init (autocapture + session replay)
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
