# Brand guide — Proof Perimeter marketing site

This documents the design system exactly as implemented in repo — every value below is pulled directly from the source files cited, not from a separate design spec. 

## 1. Overview

From `lib/metadata.ts` (`siteConfig`) — the single source of truth for brand name/tagline/description:

| Field | Value |
|---|---|
| Name | `Proof Perimeter` |
| Tagline | `Frontier AI for regulated document processing` |
| Description | `Proof Perimeter is a document AI platform for regulated documents — KYC, claims, and lending. Start free with your own model key, or go Enterprise.` |
| Website | `www.proofperimeter.com` |

## 2. Color palette

Every color is a `:root` CSS custom property in `app/globals.css:3-21`, re-exposed as Tailwind utilities via the `@theme inline` block (`globals.css:23-36`). **Never hardcode a hex value in a component** — use the Tailwind utility so the palette stays centralized.

| Token | Hex | Tailwind utility | Role |
|---|---|---|---|
| `--paper` | `#F7FAFB` | `bg-paper` | Page background |
| `--paper-2` | `#EAF0F3` | `bg-paper-2` | Secondary/alt-section background, hover fill |
| `--panel` | `#FFFFFF` | `bg-panel` | Card/panel background |
| `--ink` | `#12161A` | `text-ink` | Primary text |
| `--ink-2` | `#52606A` | `text-ink-2` | Secondary/muted text |
| `--line` | `#DCE4E9` | `border-line` | Default hairline border (171 uses — the default separator) |
| `--line-2` | `#C6D1D8` | `border-line-2` | Stronger border — pill/badge borders, hover states |
| `--signal` | `#14467C` | `bg-signal` / `text-signal` / `border-signal` | Brand blue — primary accent, links, CTAs, shadow tint |
| `--signal-deep` | `#0E3460` | `bg-signal-deep` | `signal` hover/active state |
| `--live` | `#1E9E6A` | `bg-live` / `text-live` | Green "status/live" indicator dot |

Opacity-modifier variants are used throughout (`border-signal/40`, `bg-signal/10`, `ring-live/20`, `bg-live/15`) rather than separate lighter tokens.

**Naming quirk:** `--font-sans: var(--font-plex-serif)` (`globals.css:19,34`) — despite the name, this points at the **serif** font, not a sans-serif. See §3.

**One non-token hex in use:** `#9DC3EC`, hardcoded in `components/Eyebrow.tsx:10` for the `tone="band"` variant (a lighter blue for use on dark/signal-colored bands). This is the only intentional exception to the "no hardcoded hex" rule — everything else routes through the tokens above.

### Satori/OG duplication (`lib/colors.ts`)

`next/og`'s `ImageResponse` renderer (Satori) can't read CSS custom properties, so `lib/colors.ts` duplicates a subset of the palette for image generation:

```ts
export const brandColors = {
  signal: "#14467C",
  signalDeep: "#0E3460",
  paper: "#F7FAFB",
  ink: "#12161A",
  inkMuted: "#52606A",
  lineMuted: "#C6D1D8",
};
```

Currently in sync with `globals.css` (`signal`, `signalDeep`→`signal-deep`, `paper`, `ink`, `inkMuted`→`ink-2`, `lineMuted`→`line-2` all match exactly). It's a reduced subset — no `paper-2`, `panel`, `line`, or `live` equivalents, since OG/icon rendering doesn't need them.

**Known gap:** `app/opengraph-image.tsx` does **not** actually import `lib/colors.ts` — it hardcodes its own literal hex strings inline instead (`#F7FAFB`, `#C6D1D8`, `#12161A`, `#52606A`). The values happen to still match today, but the "change it in one place" guarantee doesn't actually hold for this file — see §11.

## 3. Typography

Loaded in `app/layout.tsx:3,13-25` via `next/font/google`:

```ts
const plexSerif = IBM_Plex_Serif({
  variable: "--font-plex-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});
```

- **IBM Plex Serif** — body/display face (`font-sans` utility, confusingly — see §2). `body { font-family: var(--font-plex-serif), Georgia, serif; }` (`globals.css:42-48`) confirms serif is intentional, not a leftover.
- **IBM Plex Mono** — reserved for eyebrows/labels/badges/pill chips, never body copy.

### Scale (exact classNames in use, from `app/page.tsx` and mirrored on other pages)

| Element | Classes |
|---|---|
| H1 (homepage hero) | `text-[clamp(34px,5.4vw,56px)] font-bold tracking-[-0.022em] text-ink` |
| H1 (secondary pages — enterprise, solutions) | `text-[clamp(34px,5vw,54px)] font-bold tracking-[-0.022em] text-ink` |
| H2 (section heading) | `text-[clamp(28px,3.6vw,38px)] font-bold tracking-[-0.022em] text-ink` |
| H2 (closing CTA, larger) | `text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.022em] text-ink` |
| H3 (card title) | `text-[17px] font-semibold tracking-[-0.01em] text-ink` |
| Body / lede | `text-[19px] text-ink-2` |
| Card description | `text-sm text-ink-2` (also seen at `text-[14.5px]`/`text-[15px]`/`text-[15.5px]` contextually) |
| Eyebrow / mono label | `font-mono text-xs font-medium uppercase tracking-[0.16em]` |
| Mono inline tag | `font-mono text-[11px] tracking-[0.1em] text-signal` |
| Hero pill / mono badge | `font-mono text-[13px] text-signal` |

Conventions:
- Headings use **fluid `clamp()` sizing**, not fixed breakpoint classes — scales continuously with viewport width instead of jumping at `sm`/`md`/`lg`.
- Headings carry **negative tracking**: `tracking-[-0.022em]` for large headings, `tracking-[-0.01em]` for card-level H3.
- Mono/label text carries **positive tracking** and is always uppercase: `tracking-[0.16em]`, `tracking-[0.1em]`, `tracking-[0.12em]`, `tracking-[0.03em]` seen across the codebase.
- `font-bold` (700) for all headings, `font-semibold` (600) for card titles/labels/buttons, default weight (400) for body copy.

## 4. Spacing & layout

- **Page container**: `mx-auto max-w-[1120px] px-7` — the dominant width sitewide (nav, footer, and every homepage section match this exactly).
- **Narrower containers**: `max-w-[820px]` (hero copy), `max-w-[960px]` (hero media), and `max-w-[760px]`/`[720px]`/`[640px]`/`[600px]` for narrower copy blocks elsewhere.
- **`ch`-unit width caps** bound line length on text rather than pixel widths: `max-w-[18ch]` (H1), `max-w-[24ch]`/`[22ch]`/`[26ch]`/`[20ch]` (H2 variants), `max-w-[70ch]`/`[74ch]` (lede/paragraph), `max-w-[34ch]` (footer blurb), `max-w-[46ch]` (compliance note).
- **Section rhythm**: `border-t border-line py-22` on every homepage section below the hero (66 occurrences sitewide); closing/CTA sections use `py-24`. Hero section itself: `pt-24 pb-20`.
- **Internal spacing cadence**, repeated verbatim across every section: `mt-4.5` (heading after eyebrow) → `mt-5.5` (subhead/paragraph after heading) → `mt-10.5` (content grid after intro copy).
- **Card padding**: `p-6.5` standard for feature/pain-point cards.
- **Grid patterns**: `grid grid-cols-1 gap-6 sm:grid-cols-3` (3-up card grids); hairline capability grid using `gap-px` over a `bg-line` background so 1px lines show through between cells; `md:grid-cols-[minmax(0,30ch)_1fr]` (persona two-column layout); `grid-cols-[1fr_1.3fr_1.3fr]` (pricing/comparison table).
- **Nav**: fixed `h-[68px]`, `sticky top-0 z-50`, `bg-paper/85 backdrop-blur-sm`. **Footer**: `py-13`.

## 5. Components

### Buttons — `components/Button.tsx`

Two variants, both client components wrapping `next/link` with built-in PostHog click tracking:

```tsx
// BtnSolid
"inline-flex items-center justify-center gap-2 rounded-[5px] bg-signal px-4.5 py-2.75 text-[15px] font-semibold text-white transition-colors hover:bg-signal-deep"

// BtnGhost
"inline-flex items-center justify-center gap-2 rounded-[5px] border border-line-2 bg-transparent px-4.5 py-2.75 text-[15px] font-semibold text-ink transition-colors hover:border-ink"
```

- `rounded-[5px]` is the canonical button radius — reused directly on the nav's inline "Book Demo" link too.
- `hidden?: boolean` prop: when `true`, swaps the whole className to `"hidden"`. Used sitewide to A/B-suppress "Get started for free" CTAs while keeping their JSX and `trackEvent` wiring live (removing `hidden` brings a CTA back with zero tracking changes — see `website/docs/re-enable-get-started-cta.md`).
- `trackEvent?: string`: fires `posthog.capture(trackEvent)` on click.

### Eyebrow / kicker — `components/Eyebrow.tsx`

```tsx
const toneClass = tone === "band" ? "text-[#9DC3EC]" : "text-signal";

<span className={`inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.16em] ${toneClass}`}>
  <span className="h-[7px] w-[7px] rounded-full bg-live ring-3 ring-live/20" />
  {children}
</span>
```

Every eyebrow is prefixed with a small green "live" status dot (7×7px, `bg-live`, with a soft `ring-3 ring-live/20` halo). Two tones: `default` (brand blue `text-signal`) and `band` (lighter `#9DC3EC`, for dark/signal-colored bands).

### Wordmark — `components/BrandMark.tsx`

Currently a **text-only wordmark**, not an image logo:

```tsx
<span className="inline-flex items-center gap-2.5 text-xl font-bold tracking-tight text-ink">
  {/* <Image src="/assets/brand/logo.png" .../> — commented out */}
  {siteConfig.name}
</span>
```

The image logo exists on disk (see §9) but isn't rendered — the `<Image>` line is commented out in the component.

### Cards, pills, panels (inline utility patterns, not standalone components)

- **Card hover lift** (`cardHover` const, `app/page.tsx:23-24`): `transition-all duration-300 hover:-translate-y-1 hover:border-signal/40 hover:shadow-[0_20px_40px_-30px_rgba(20,70,124,0.45)]`, applied on top of the base card `rounded-md border border-line bg-panel p-6.5`.
- **Pill / mono chip**: `rounded-full border border-line-2 bg-panel px-3.5 py-1 font-mono text-[13px] text-signal`.
- **Status dot** (standalone, e.g. compliance bullets, success states): `bg-live` circle, sizes ranging `h-2 w-2` up to a large `h-24 w-24` success-state circle (`bg-live/15` outer ring + solid inner circle).
- **Dropdown/menu panel** (`SiteNav.tsx`): `rounded-md border border-line bg-panel p-2 shadow-[0_20px_40px_-24px_rgba(20,70,124,0.35)]`.

## 6. Motion

Two deliberate, distinct approaches — **do not merge them or switch the hero to JS-driven animation** (per `AGENTS.md`).

### Hero — CSS-only keyframes (`app/globals.css:50-61`)

```css
@keyframes hero-fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.hero-animate-badge  { animation: hero-fade-up 0.7s ease-out 0ms   both; }
.hero-animate-h1     { animation: hero-fade-up 0.7s ease-out 100ms both; }
.hero-animate-p      { animation: hero-fade-up 0.7s ease-out 200ms both; }
.hero-animate-pills  { animation: hero-fade-up 0.7s ease-out 260ms both; }
.hero-animate-cta    { animation: hero-fade-up 0.7s ease-out 320ms both; }
.hero-animate-trust  { animation: hero-fade-up 0.7s ease-out 400ms both; }
.hero-animate-image  { animation: hero-fade-up 0.7s ease-out 200ms both; }
```

No JS, no `IntersectionObserver` — avoids hydration flash on above-fold content. A fixed cascade: badge → h1 → paragraph/image (concurrent, both at 200ms) → pills → CTA → trust row.

### Below-fold — `FadeIn` + `useInView`

`components/FadeIn.tsx` + `hooks/useInView.ts`: `IntersectionObserver`-driven, `threshold: 0.15` by default, disconnects after first intersection (one-shot, no re-trigger on scroll-out). Transition: `transition-[opacity,transform] duration-700 ease-out` — same 700ms/ease-out timing as the hero, kept consistent even though the mechanism differs. Direction variants `up` (default, `translate-y-6`→`0`), `left`, `right`, `none`. Optional `delay` prop for staggered grids, e.g. `delay={i * 90}`.

### Other motion

- **Mobile sticky CTA shine**: `mobile-cta-shine` keyframes, `4.5s ease-in-out infinite`, GPU-friendly `transform: translateX(...)` sweep (explicitly not `background-position`).
- **Customer logo marquee**: `logo-marquee-scroll`, `32s linear infinite`, list duplicated so `translateX(-50%)` loops seamlessly; edges faded via `mask-image`.
- **Micro-interactions**: chevron rotate on nav dropdown hover (`group-hover:rotate-180`), FAQ `+`→`×` rotate on open (`group-open:rotate-45`), card hover lift (`hover:-translate-y-1` / `hover:-translate-y-0.5`), icon scale (`group-hover/item:scale-110`).
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` (`globals.css:116-140`) disables every animation above — hero keyframes, `[data-fadein]` transitions, CTA shine, logo marquee — snapping all to their final visible state (`opacity: 1`, `transform: none`).

## 7. Borders, radius, shadows

| Radius | Usage |
|---|---|
| `rounded-md` | Dominant "content block" radius — cards, panels, table containers (51 uses) |
| `rounded-lg` | Media/video wrapper, nav icon swatches (15 uses) |
| `rounded-full` | Pills, dots, badges, avatars (15 uses) |
| `rounded-[5px]` | Buttons only — canonical, never used elsewhere (14 uses) |

**Shadows** are always custom arbitrary values tinted with the brand blue (`rgba(20,70,124,…)`, matching `--signal`) — the default Tailwind `shadow-md`/`shadow-lg` utilities are not used anywhere:

- `shadow-[0_20px_40px_-30px_rgba(20,70,124,0.45)]` — card hover (`cardHover`)
- `shadow-[0_24px_60px_-38px_rgba(20,70,124,0.55)]` — hero video/media
- `shadow-[0_20px_40px_-24px_rgba(20,70,124,0.35)]` — nav dropdown panel
- `shadow-[0_0_0_3px_rgba(20,70,124,0.08)]` — pill focus/hover ring

**Borders**: `border-line` is the default hairline (171 uses — section dividers, card borders, table rows); `border-line-2` for stronger borders (pill/badge borders, hover states); `border-signal`/`border-signal/40`/`/30` for accent-on-hover. Standard width is the Tailwind default `1px` — no `border-2`+ or dashed/dotted borders anywhere.

## 8. Iconography

Library: **`lucide-react`** (`package.json`). Industry-vertical icons are mapped 1:1 in `components/SiteNav.tsx`:

| Vertical | Icon |
|---|---|
| Banking | `Landmark` |
| Financial Services | `Briefcase` |
| Insurance | `ShieldCheck` |
| Legal | `Scale` |
| Healthcare | `HeartPulse` |

Sizing: small utility icons at `h-3.5 w-3.5` (e.g. nav chevron) up to `h-4.5 w-4.5` inside a `h-9 w-9` circular `bg-signal/10 text-signal` chip (brand-blue-tinted at 10% opacity) for industry icons.

Non-lucide inline glyphs used as plain text/characters rather than icon components: `+` rotating to `×` for FAQ expand/collapse, `→` for link arrows.

`app/mockup/_components/icons.tsx` has its own custom SVGs but is scoped to the deprioritized `/mockup` route — not part of the live brand system.

## 9. Logo & generated assets

- **Nav wordmark**: text-only (§5) — the image logo is not currently rendered anywhere visually.
- **Image logo file**: `public/assets/brand/logo.png`, 512×512px. Only used as the `logo` field in the `Organization` JSON-LD schema (`app/layout.tsx`), not displayed on-page.
- **Favicons — static files**, not generated: `app/favicon.ico` (multi-res, 16×16 + 32×32), `app/icon1.png` (16×16), `app/icon2.png` (32×32), `app/apple-icon.png` (180×180). There is **no `app/icon.tsx`** in the repo (see §11).
- **OG image — `next/og`-generated**: `app/opengraph-image.tsx`, 1200×630px via `ImageResponse`. Background `#F7FAFB`, dot-grid pattern (`radial-gradient(circle, #C6D1D8 2px, transparent 2px)` at `40px 40px`), title `siteConfig.name` at `fontSize: 72, fontWeight: 700, color: "#12161A"`, tagline `siteConfig.tagline` at `fontSize: 32, color: "#52606A"`. These hex values are hardcoded inline in this file, not imported (see §11).
