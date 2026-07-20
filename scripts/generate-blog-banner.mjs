// Generates the 1600x900 blog banner image for a given post slug.
// Usage: node --experimental-strip-types scripts/generate-blog-banner.mjs <slug> [motif]
//
// Two-zone layout: an abstract, geometric visual on the left (dot-grid
// texture + perimeter accent frame + a topic motif built from shapes, never
// a blank frame), category eyebrow + title on the right. Renders via
// next/og's ImageResponse (the same Satori-based renderer used by
// app/opengraph-image.tsx and app/blog/[slug]/opengraph-image.tsx) invoked
// standalone instead of through a route handler.
//
// The left zone previously rendered as an empty bordered rectangle — visually
// blank and disconnected from the post's topic. It now always renders one of
// the MOTIFS below: picked automatically from the post's category/tags/title
// (see pickMotif), or forced with the optional CLI `motif` argument. Every
// motif is built from plain shapes (rects, lines, circles) using only
// lib/colors.ts values — no icons, clip art, or photographic imagery — so it
// stays consistent with the site's abstract/geometric visual identity while
// never leaving the left zone empty. Add a new topic by adding a MOTIFS entry
// and a pickMotif() rule; don't fall back to the blank frame.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import React from "react";
import { ImageResponse } from "next/og.js";
import { brandColors } from "../lib/colors.ts";

const slug = process.argv[2];
const forcedMotif = process.argv[3];
if (!slug) {
  console.error("Usage: node --experimental-strip-types scripts/generate-blog-banner.mjs <slug> [motif]");
  process.exit(1);
}

const ROOT = path.join(import.meta.dirname, "..");
const mdxPath = path.join(ROOT, "content", "blog", `${slug}.mdx`);
const raw = fs.readFileSync(mdxPath, "utf8");
const { data: frontmatter } = matter(raw);
const { title, category, tags = [] } = frontmatter;

const WIDTH = 1600;
const HEIGHT = 900;
const h = React.createElement;

function titleFontSize(text) {
  if (text.length <= 30) return 64;
  if (text.length <= 50) return 52;
  if (text.length <= 70) return 44;
  return 36;
}

// --- Shape primitives (plain rects/lines, no icon fonts or images) ---

function rect({ style = {}, ...rest } = {}) {
  return h("div", { style: { display: "flex", ...style }, ...rest });
}

// --- Motifs: each returns a Satori element tree for the left zone's ---
// --- centerpiece. Keep them abstract/geometric and brandColors-only. ---

const MOTIFS = {
  // Identity document mid-scan: a card with a photo block and field lines,
  // crossed by a horizontal scan bar. Used for KYC/identity/onboarding topics.
  "id-scan": () =>
    rect({
      style: {
        position: "relative",
        flexDirection: "column",
        width: 300,
        height: 380,
        background: brandColors.paper,
        border: `2px solid ${brandColors.ink}`,
        borderRadius: 14,
        padding: 28,
      },
      children: [
        rect({
          style: { width: 84, height: 100, background: brandColors.lineMuted, borderRadius: 6 },
        }),
        rect({
          style: { flexDirection: "column", marginTop: 28, gap: 14 },
          children: [
            rect({ style: { width: "80%", height: 10, background: brandColors.lineMuted, borderRadius: 2 } }),
            rect({ style: { width: "55%", height: 10, background: brandColors.lineMuted, borderRadius: 2 } }),
            rect({ style: { width: "68%", height: 10, background: brandColors.lineMuted, borderRadius: 2 } }),
            rect({ style: { width: "40%", height: 10, background: brandColors.lineMuted, borderRadius: 2 } }),
          ],
        }),
        rect({
          style: {
            position: "absolute",
            left: -10,
            right: -10,
            top: 190,
            height: 6,
            background: brandColors.signal,
            borderRadius: 3,
          },
        }),
        rect({
          style: {
            position: "absolute",
            left: -10,
            right: -10,
            top: 0,
            bottom: 190,
            background: `${brandColors.signal}1A`,
          },
        }),
      ],
    }),

  // A stack of slightly rotated documents — generic document AI / OCR /
  // extraction fallback.
  "document-stack": () =>
    rect({
      style: { position: "relative", width: 320, height: 380 },
      children: [
        rect({
          style: {
            position: "absolute",
            width: 260,
            height: 340,
            top: 30,
            left: 40,
            background: brandColors.paper,
            border: `2px solid ${brandColors.lineMuted}`,
            borderRadius: 10,
            transform: "rotate(-8deg)",
          },
        }),
        rect({
          style: {
            position: "absolute",
            width: 260,
            height: 340,
            top: 10,
            left: 20,
            background: brandColors.paper,
            border: `2px solid ${brandColors.lineMuted}`,
            borderRadius: 10,
            transform: "rotate(4deg)",
          },
        }),
        rect({
          style: {
            position: "absolute",
            width: 260,
            height: 340,
            top: 0,
            left: 30,
            flexDirection: "column",
            background: brandColors.paper,
            border: `2px solid ${brandColors.ink}`,
            borderRadius: 10,
            padding: 30,
            gap: 16,
          },
          children: [
            rect({ style: { width: "70%", height: 14, background: brandColors.signal, borderRadius: 2 } }),
            rect({ style: { width: "90%", height: 8, background: brandColors.lineMuted, borderRadius: 2 } }),
            rect({ style: { width: "60%", height: 8, background: brandColors.lineMuted, borderRadius: 2 } }),
            rect({ style: { width: "80%", height: 8, background: brandColors.lineMuted, borderRadius: 2 } }),
            rect({ style: { width: "45%", height: 8, background: brandColors.lineMuted, borderRadius: 2 } }),
          ],
        }),
      ],
    }),

  // A document with a table/grid — invoice, bank statement, and other
  // finance-document extraction topics.
  "line-item-table": () =>
    rect({
      style: {
        flexDirection: "column",
        width: 300,
        height: 380,
        background: brandColors.paper,
        border: `2px solid ${brandColors.ink}`,
        borderRadius: 10,
        padding: 28,
        gap: 10,
      },
      children: [
        rect({ style: { width: "60%", height: 14, background: brandColors.signal, borderRadius: 2 } }),
        rect({
          style: { marginTop: 14, flexDirection: "column", flex: 1, border: `1px solid ${brandColors.lineMuted}` },
          children: [0, 1, 2, 3].map((i) =>
            rect({
              key: i,
              style: {
                flex: 1,
                borderBottom: i < 3 ? `1px solid ${brandColors.lineMuted}` : "none",
                alignItems: "center",
                padding: "0 12px",
                gap: 10,
              },
              children: [
                rect({ style: { width: 16, height: 16, background: brandColors.lineMuted, borderRadius: 3 } }),
                rect({ style: { flex: 1, height: 8, background: brandColors.lineMuted, borderRadius: 2 } }),
                rect({ style: { width: 40, height: 8, background: brandColors.signal, borderRadius: 2 } }),
              ],
            })
          ),
        }),
      ],
    }),

  // A rounded shield outline with a checkmark — compliance/regulatory/audit
  // topics.
  "shield-check": () =>
    rect({
      style: { position: "relative", width: 260, height: 320, alignItems: "center", justifyContent: "center" },
      children: [
        rect({
          style: {
            position: "absolute",
            width: 260,
            height: 320,
            background: brandColors.paper,
            border: `3px solid ${brandColors.ink}`,
            borderRadius: "16px 16px 90px 90px",
          },
        }),
        rect({
          style: {
            position: "absolute",
            top: 130,
            left: 68,
            width: 60,
            height: 110,
            borderRight: `10px solid ${brandColors.signal}`,
            borderBottom: `10px solid ${brandColors.signal}`,
            transform: "rotate(35deg)",
          },
        }),
      ],
    }),

  // Three connected nodes — workflow/pipeline/automation topics.
  pipeline: () =>
    rect({
      style: { alignItems: "center", gap: 0 },
      children: [0, 1, 2].map((i) =>
        h(
          React.Fragment,
          { key: i },
          rect({
            style: {
              width: 88,
              height: 88,
              borderRadius: 12,
              background: i === 1 ? brandColors.signal : brandColors.paper,
              border: `2px solid ${brandColors.ink}`,
            },
          }),
          i < 2
            ? rect({ style: { width: 44, height: 3, background: brandColors.lineMuted, margin: "0 6px" } })
            : null
        )
      ),
    }),
};

function pickMotif() {
  if (forcedMotif && MOTIFS[forcedMotif]) return forcedMotif;
  const haystack = [category, ...(tags || []), title].join(" ").toLowerCase();
  if (/\bkyc\b|\bkyb\b|identity|onboard|passport|customer verification/.test(haystack)) return "id-scan";
  if (/invoice|bank statement|financial statement|payment|line.?item|accounts payable/.test(haystack)) return "line-item-table";
  if (/complian|audit|regulat|sanction|\baml\b|governance|dora|gdpr|hipaa|soc ?2/.test(haystack)) return "shield-check";
  if (/workflow|pipeline|automation|routing|orchestrat/.test(haystack)) return "pipeline";
  return "document-stack";
}

const motifKey = pickMotif();
console.log(`Using motif "${motifKey}" for "${title}"`);

const element = h(
  "div",
  {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      background: brandColors.paper,
    },
  },
  h(
    "div",
    {
      style: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40%",
        height: "100%",
        background: brandColors.paper,
        backgroundImage: `radial-gradient(circle, ${brandColors.lineMuted} 2px, transparent 2px)`,
        backgroundSize: "36px 36px",
      },
    },
    rect({
      style: {
        position: "absolute",
        top: 90,
        left: 70,
        right: 70,
        bottom: 90,
        border: `2px solid ${brandColors.signal}`,
        borderRadius: 4,
      },
    }),
    MOTIFS[motifKey]()
  ),
  h(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "60%",
        height: "100%",
        padding: "0 84px",
      },
    },
    h(
      "div",
      {
        style: {
          display: "flex",
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: brandColors.signal,
        },
      },
      category
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          marginTop: 26,
          fontSize: titleFontSize(title),
          fontWeight: 700,
          lineHeight: 1.2,
          color: brandColors.ink,
        },
      },
      title
    )
  )
);

const response = new ImageResponse(element, { width: WIDTH, height: HEIGHT });
const buffer = Buffer.from(await response.arrayBuffer());

const outDir = path.join(ROOT, "public", "assets", "blog", slug);
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "banner.png");
fs.writeFileSync(outPath, buffer);
console.log(`Wrote ${path.relative(ROOT, outPath)}`);
