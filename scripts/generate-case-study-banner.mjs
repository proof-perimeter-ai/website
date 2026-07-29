// Generates the 1600x900 case-study banner image for a given slug.
// Usage: node --experimental-strip-types scripts/generate-case-study-banner.mjs <slug>
//
// Composition: "Proof Perimeter" / "for" / <industry> centered over a
// brand-blue gradient, rendered via next/og's ImageResponse (the same
// Satori-based renderer used by app/opengraph-image.tsx and
// scripts/generate-blog-banner.mjs) invoked standalone instead of through a
// route handler.
//
// Text is rendered in the site's brand font (IBM Plex Serif, see
// app/layout.tsx) rather than Satori's default fallback — Satori needs actual
// font bytes, so this fetches the latin subset of each weight from Google
// Fonts' CSS2 API at generation time and registers it with ImageResponse.
// If that fetch fails (no network), the script logs a warning and falls back
// to Satori's default font rather than silently failing.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import React from "react";
import { ImageResponse } from "next/og.js";
import { brandColors } from "../lib/colors.ts";

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node --experimental-strip-types scripts/generate-case-study-banner.mjs <slug>");
  process.exit(1);
}

const ROOT = path.join(import.meta.dirname, "..");
const mdxPath = path.join(ROOT, "content", "case-studies", `${slug}.mdx`);
const raw = fs.readFileSync(mdxPath, "utf8");
const { data: frontmatter } = matter(raw);
const industry = frontmatter.company?.industry;
if (!industry) {
  console.error(`Case study "${slug}" is missing company.industry in its frontmatter.`);
  process.exit(1);
}

const WIDTH = 1600;
const HEIGHT = 900;
const h = React.createElement;

// A lighter tint of the brand blue, used only here for gradient depth — not
// a reusable design token, so it doesn't belong in lib/colors.ts.
const SIGNAL_LIGHT = "#2E6FB4";

// Old-browser User-Agent so Google's CSS2 API serves .woff (Satori supports
// TTF/OTF/WOFF, not WOFF2) instead of the modern woff2-only stylesheet.
const LEGACY_UA =
  "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36";

async function loadGoogleFontLatin(family, weight) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`;
  const css = await (await fetch(cssUrl, { headers: { "User-Agent": LEGACY_UA } })).text();
  const re = new RegExp(`/\\* latin \\*/\\s*@font-face\\s*\\{[^}]*font-weight:\\s*${weight};[^}]*src:\\s*url\\(([^)]+)\\)`, "s");
  const match = css.match(re);
  if (!match) throw new Error(`Could not find latin subset for ${family} ${weight}`);
  const fontRes = await fetch(match[1]);
  return await fontRes.arrayBuffer();
}

async function loadFonts() {
  try {
    const [regular, semibold, bold] = await Promise.all([
      loadGoogleFontLatin("IBM+Plex+Serif", 400),
      loadGoogleFontLatin("IBM+Plex+Serif", 600),
      loadGoogleFontLatin("IBM+Plex+Serif", 700),
    ]);
    return [
      { name: "IBM Plex Serif", data: regular, weight: 400, style: "normal" },
      { name: "IBM Plex Serif", data: semibold, weight: 600, style: "normal" },
      { name: "IBM Plex Serif", data: bold, weight: 700, style: "normal" },
    ];
  } catch (err) {
    console.warn(`[case-study-banner] Could not fetch brand font, falling back to default: ${err.message}`);
    return [];
  }
}

const fonts = await loadFonts();
if (fonts.length === 0) {
  console.warn("[case-study-banner] Rendering WITHOUT the brand font (IBM Plex Serif) — network fetch failed.");
}

const element = h(
  "div",
  {
    style: {
      position: "relative",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: `linear-gradient(160deg, ${brandColors.signalDeep} 0%, ${brandColors.signal} 55%, ${SIGNAL_LIGHT} 100%)`,
    },
  },
  // Soft radial highlight for depth
  h("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      backgroundImage: "radial-gradient(ellipse 60% 55% at 50% 18%, rgba(255,255,255,0.16), transparent 70%)",
    },
  }),
  // Subtle dot-grid texture, consistent with the site's other generated assets
  h("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.14) 2px, transparent 2px)",
      backgroundSize: "40px 40px",
    },
  }),
  h(
    "div",
    {
      style: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
    },
    h(
      "div",
      {
        style: {
          display: "flex",
          fontFamily: "IBM Plex Serif",
          fontSize: 40,
          fontWeight: 600,
          color: brandColors.paper,
          letterSpacing: -0.5,
        },
      },
      "Proof Perimeter"
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          marginTop: 14,
          fontFamily: "IBM Plex Serif",
          fontSize: 20,
          fontWeight: 400,
          color: "rgba(247,250,251,0.75)",
        },
      },
      "for"
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          marginTop: 30,
          fontFamily: "IBM Plex Serif",
          fontSize: 86,
          fontWeight: 700,
          color: brandColors.paper,
          textAlign: "center",
          maxWidth: 1200,
        },
      },
      industry
    )
  )
);

const response = new ImageResponse(element, { width: WIDTH, height: HEIGHT, fonts });
const buffer = Buffer.from(await response.arrayBuffer());

const outDir = path.join(ROOT, "public", "assets", "case-studies", slug);
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "banner.png");
fs.writeFileSync(outPath, buffer);
console.log(`Wrote ${path.relative(ROOT, outPath)}`);
