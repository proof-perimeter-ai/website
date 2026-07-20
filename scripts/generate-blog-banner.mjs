// Generates the 1600x900 blog banner image for a given post slug.
// Usage: node --experimental-strip-types scripts/generate-blog-banner.mjs <slug>
//
// Two-zone layout: an abstract dot-grid/perimeter-line zone on the left,
// category eyebrow + title on the right. Renders via next/og's ImageResponse
// (the same Satori-based renderer used by app/opengraph-image.tsx and
// app/blog/[slug]/opengraph-image.tsx) invoked standalone instead of through
// a route handler.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import React from "react";
import { ImageResponse } from "next/og.js";
import { brandColors } from "../lib/colors.ts";

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node --experimental-strip-types scripts/generate-blog-banner.mjs <slug>");
  process.exit(1);
}

const ROOT = path.join(import.meta.dirname, "..");
const mdxPath = path.join(ROOT, "content", "blog", `${slug}.mdx`);
const raw = fs.readFileSync(mdxPath, "utf8");
const { data: frontmatter } = matter(raw);
const { title, category } = frontmatter;

const WIDTH = 1600;
const HEIGHT = 900;

function titleFontSize(text) {
  if (text.length <= 30) return 64;
  if (text.length <= 50) return 52;
  if (text.length <= 70) return 44;
  return 36;
}

const h = React.createElement;

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
        width: "40%",
        height: "100%",
        background: brandColors.paper,
        backgroundImage: `radial-gradient(circle, ${brandColors.lineMuted} 2px, transparent 2px)`,
        backgroundSize: "36px 36px",
      },
    },
    h("div", {
      style: {
        position: "absolute",
        top: 90,
        left: 70,
        right: 70,
        bottom: 90,
        display: "flex",
        border: `2px solid ${brandColors.signal}`,
        borderRadius: 4,
      },
    })
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
