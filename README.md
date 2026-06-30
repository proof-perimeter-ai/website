# Proof Perimeter

Marketing site for **Proof Perimeter** ([proofperimeter.com](https://proofperimeter.com)) — an on-device document-processing AI inference platform built for regulated BFSI (banking, financial services, insurance) institutions, targeted primarily at the **EU and Asia**.

Proof Perimeter runs small, fine-tuned models inside a customer's own VPC or sovereign cloud, on commodity CPU hardware, so document inference (KYC packs, loan files, claims) never leaves their perimeter — and ships per-document provenance evidence for regulators (EU DORA / AI Act, Gulf SAMA / CBUAE, Singapore MAS, India RBI / DPDP, ISO 42001 / SOC 2).

This repository is the marketing site only; no product/inference code lives here.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command         | Description                  |
| --------------- | ----------------------------- |
| `npm run dev`   | Dev server (Turbopack)        |
| `npm run build` | Production build              |
| `npm run lint`  | ESLint                        |
| `npm run start` | Serve the production build    |

No test suite exists.

## Stack

- [Next.js 16](https://nextjs.org/docs) (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- IBM Plex Sans / IBM Plex Mono ([next/font](https://nextjs.org/docs/app/getting-started/fonts))
- Statically rendered (SSG) — deployed on Vercel, no database/API routes/auth

## Project structure

```
app/
├── page.tsx              — homepage
├── book-demo/page.tsx    — demo request page (placeholder, form not yet implemented)
├── layout.tsx            — root layout, metadata, fonts, structured data
├── globals.css           — Tailwind v4 + design tokens + animations
├── robots.ts             — robots.txt (incl. AI-crawler allow rules)
├── sitemap.ts            — sitemap.xml
├── icon.tsx               — generated favicon
└── opengraph-image.tsx   — generated OG/social preview image

components/                — SiteNav, SiteFooter, FadeIn, JsonLd, Eyebrow, BrandMark
hooks/useInView.ts          — IntersectionObserver hook
lib/metadata.ts             — site-wide brand/SEO config (siteConfig)
public/llms.txt              — site summary for AI/answer-engine crawlers
```

See [AGENTS.md](./AGENTS.md) for more detailed architecture notes (animation patterns, design tokens, SEO/AEO conventions) aimed at coding agents working in this repo.

## Deployment

Deploys to Vercel as static-rendered (SSG) pages — no `output: 'export'`, so `next/image` optimization and future server features (Server Actions, ISR) stay available if needed.
