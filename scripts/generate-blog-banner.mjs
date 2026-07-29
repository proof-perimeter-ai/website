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

  // A landscape government-ID / passport card: photo + chip + field lines on
  // top, an MRZ-style dashed strip and a seal watermark below. Distinct from
  // id-scan's vertical mid-scan card — this one is a literal, at-rest ID.
  "gov-id": () => {
    const mrzRow = (n) =>
      rect({
        style: { flexDirection: "row", gap: 3 },
        children: Array.from({ length: n }, (_, i) =>
          rect({ key: i, style: { width: 8, height: 4, background: brandColors.inkMuted, borderRadius: 1 } })
        ),
      });
    return rect({
      style: {
        position: "relative",
        flexDirection: "column",
        width: 340,
        height: 220,
        background: brandColors.paper,
        border: `2px solid ${brandColors.ink}`,
        borderRadius: 14,
        padding: 20,
        gap: 16,
      },
      children: [
        rect({
          style: { flexDirection: "row", gap: 18, alignItems: "flex-start" },
          children: [
            rect({ style: { width: 76, height: 96, background: brandColors.lineMuted, borderRadius: 6 } }),
            rect({
              style: { flexDirection: "column", gap: 10, flex: 1, marginTop: 6 },
              children: [
                rect({ style: { width: "75%", height: 9, background: brandColors.lineMuted, borderRadius: 2 } }),
                rect({ style: { width: "55%", height: 9, background: brandColors.lineMuted, borderRadius: 2 } }),
                rect({ style: { width: "62%", height: 9, background: brandColors.lineMuted, borderRadius: 2 } }),
                rect({ style: { width: "40%", height: 9, background: brandColors.lineMuted, borderRadius: 2 } }),
              ],
            }),
            rect({ style: { width: 32, height: 22, background: brandColors.signal, borderRadius: 4 } }),
          ],
        }),
        rect({ style: { flexDirection: "column", gap: 6 }, children: [mrzRow(26), mrzRow(26)] }),
        rect({
          style: {
            position: "absolute",
            bottom: 16,
            left: 20,
            width: 26,
            height: 26,
            borderRadius: 13,
            border: `2px solid ${brandColors.signal}`,
            alignItems: "center",
            justifyContent: "center",
          },
          children: [rect({ style: { width: 8, height: 8, borderRadius: 4, background: brandColors.signal } })],
        }),
      ],
    });
  },

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

  // A document with a table/grid — generic finance-document extraction
  // topics not covered by the more literal bank-statement/invoice motifs below.
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

  // A literal bank statement: letterhead + account-balance strip + a
  // 4-column transaction ledger (date, description, amount, running balance)
  // — banking-industry topics distinct from the generic line-item-table.
  "bank-statement": () =>
    rect({
      style: {
        flexDirection: "column",
        width: 320,
        height: 380,
        background: brandColors.paper,
        border: `2px solid ${brandColors.ink}`,
        borderRadius: 10,
        padding: 26,
        gap: 14,
      },
      children: [
        rect({
          style: { flexDirection: "row", alignItems: "center", gap: 10 },
          children: [
            rect({ style: { width: 26, height: 26, background: brandColors.signal, borderRadius: 6 } }),
            rect({ style: { width: "55%", height: 12, background: brandColors.ink, borderRadius: 2 } }),
          ],
        }),
        rect({
          style: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 12,
            borderBottom: `1px solid ${brandColors.lineMuted}`,
          },
          children: [
            rect({ style: { width: "35%", height: 8, background: brandColors.lineMuted, borderRadius: 2 } }),
            rect({ style: { width: 70, height: 14, background: brandColors.signal, borderRadius: 2 } }),
          ],
        }),
        rect({
          style: { flexDirection: "column", gap: 12, flex: 1 },
          children: [0, 1, 2, 3].map((i) =>
            rect({
              key: i,
              style: { flexDirection: "row", alignItems: "center", gap: 10 },
              children: [
                rect({ style: { width: 34, height: 8, background: brandColors.lineMuted, borderRadius: 2 } }),
                rect({ style: { flex: 1, height: 8, background: brandColors.lineMuted, borderRadius: 2 } }),
                rect({ style: { width: 30, height: 8, background: brandColors.inkMuted, borderRadius: 2 } }),
                rect({ style: { width: 44, height: 8, background: brandColors.signal, borderRadius: 2 } }),
              ],
            })
          ),
        }),
      ],
    }),

  // A literal invoice: title bar + invoice-number/date field pair + itemized
  // rows + a highlighted "total due" strip — insurance/billing topics.
  invoice: () =>
    rect({
      style: {
        flexDirection: "column",
        width: 300,
        height: 380,
        background: brandColors.paper,
        border: `2px solid ${brandColors.ink}`,
        borderRadius: 10,
        padding: 28,
        gap: 18,
      },
      children: [
        rect({ style: { width: "45%", height: 14, background: brandColors.ink, borderRadius: 2 } }),
        rect({
          style: { flexDirection: "row", gap: 24 },
          children: [
            rect({
              style: { flexDirection: "column", gap: 6 },
              children: [
                rect({ style: { width: 60, height: 6, background: brandColors.lineMuted, borderRadius: 2 } }),
                rect({ style: { width: 80, height: 8, background: brandColors.inkMuted, borderRadius: 2 } }),
              ],
            }),
            rect({
              style: { flexDirection: "column", gap: 6 },
              children: [
                rect({ style: { width: 60, height: 6, background: brandColors.lineMuted, borderRadius: 2 } }),
                rect({ style: { width: 70, height: 8, background: brandColors.inkMuted, borderRadius: 2 } }),
              ],
            }),
          ],
        }),
        rect({
          style: {
            flexDirection: "column",
            gap: 12,
            borderTop: `1px solid ${brandColors.lineMuted}`,
            paddingTop: 16,
            flex: 1,
          },
          children: [0, 1, 2].map((i) =>
            rect({
              key: i,
              style: { flexDirection: "row", justifyContent: "space-between" },
              children: [
                rect({ style: { width: "60%", height: 8, background: brandColors.lineMuted, borderRadius: 2 } }),
                rect({ style: { width: 46, height: 8, background: brandColors.inkMuted, borderRadius: 2 } }),
              ],
            })
          ),
        }),
        rect({
          style: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            background: `${brandColors.signal}12`,
            border: `2px solid ${brandColors.signal}`,
            borderRadius: 8,
            padding: "10px 16px",
          },
          children: [
            rect({ style: { width: 70, height: 9, background: brandColors.signal, borderRadius: 2 } }),
            rect({ style: { width: 60, height: 14, background: brandColors.signal, borderRadius: 2 } }),
          ],
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

  // A flagpole flying a flag panel with "AI" centered and a ring of stars
  // around it, evoking national/EU flag iconography. Used for sovereignty,
  // data-residency, and jurisdiction-framed topics.
  "flag-stars": () => {
    const panelW = 300;
    const panelH = 210;
    const cx = panelW / 2;
    const cy = panelH / 2;
    const starCount = 12;
    const rx = 108;
    const ry = 78;
    const starPath =
      "M12 2 L14.35 8.76 L21.51 8.91 L15.8 13.24 L17.88 20.09 L12 16 L6.12 20.09 L8.2 13.24 L2.49 8.91 L9.65 8.76 Z";

    const stars = Array.from({ length: starCount }, (_, i) => {
      const angle = (i * (360 / starCount) - 90) * (Math.PI / 180);
      const x = cx + rx * Math.cos(angle);
      const y = cy + ry * Math.sin(angle);
      return rect({
        key: i,
        style: { position: "absolute", left: x - 9, top: y - 9 },
        children: h(
          "svg",
          { width: 18, height: 18, viewBox: "0 0 24 24" },
          h("path", { d: starPath, fill: brandColors.paper })
        ),
      });
    });

    return rect({
      style: { position: "relative", width: 340, height: 280 },
      children: [
        rect({
          style: {
            position: "absolute",
            left: 10,
            top: 0,
            bottom: 0,
            width: 8,
            background: brandColors.ink,
            borderRadius: 4,
          },
        }),
        rect({
          style: {
            position: "absolute",
            left: 4,
            top: -6,
            width: 20,
            height: 20,
            borderRadius: 10,
            background: brandColors.ink,
          },
        }),
        rect({
          style: {
            position: "absolute",
            left: 18,
            top: 20,
            width: panelW,
            height: panelH,
            background: brandColors.signal,
            borderRadius: "4px 14px 14px 4px",
            alignItems: "center",
            justifyContent: "center",
          },
          children: [
            ...stars,
            rect({
              style: {
                fontSize: 64,
                fontWeight: 800,
                color: brandColors.paper,
                letterSpacing: 2,
              },
              children: "AI",
            }),
          ],
        }),
      ],
    });
  },

  // A document card with two field-lines called out via a highlighter tint —
  // confidence-scored fields, or a document's sections/fields being identified.
  "field-highlight": () =>
    rect({
      style: {
        flexDirection: "column",
        width: 300,
        height: 380,
        background: brandColors.paper,
        border: `2px solid ${brandColors.ink}`,
        borderRadius: 10,
        padding: 28,
        gap: 16,
      },
      children: [
        rect({ style: { width: "60%", height: 14, background: brandColors.signal, borderRadius: 2 } }),
        rect({ style: { width: "85%", height: 9, background: brandColors.lineMuted, borderRadius: 2 } }),
        rect({
          style: { position: "relative", width: "78%", height: 9 },
          children: [
            rect({
              style: {
                position: "absolute",
                top: -5,
                left: -8,
                right: -8,
                bottom: -5,
                background: `${brandColors.signal}22`,
                borderRadius: 4,
              },
            }),
            rect({ style: { width: "100%", height: 9, background: brandColors.signal, borderRadius: 2 } }),
          ],
        }),
        rect({ style: { width: "65%", height: 9, background: brandColors.lineMuted, borderRadius: 2 } }),
        rect({
          style: { position: "relative", width: "70%", height: 9 },
          children: [
            rect({
              style: {
                position: "absolute",
                top: -5,
                left: -8,
                right: -8,
                bottom: -5,
                background: `${brandColors.signal}22`,
                borderRadius: 4,
              },
            }),
            rect({ style: { width: "100%", height: 9, background: brandColors.signal, borderRadius: 2 } }),
          ],
        }),
        rect({ style: { width: "50%", height: 9, background: brandColors.lineMuted, borderRadius: 2 } }),
      ],
    }),

  // A plain document framed by 4 viewfinder corner brackets — generic OCR /
  // document-scanning topics. Distinct from id-scan's horizontal scan bar,
  // which stays reserved for identity documents.
  "document-scan": () => {
    const cardTop = 60;
    const cardLeft = 60;
    const cardW = 220;
    const cardH = 260;
    const bracket = (top, left, w, h) =>
      rect({ style: { position: "absolute", top, left, width: w, height: h, background: brandColors.signal, borderRadius: 2 } });
    return rect({
      style: { position: "relative", width: 340, height: 380 },
      children: [
        rect({
          style: {
            position: "absolute",
            top: cardTop,
            left: cardLeft,
            width: cardW,
            height: cardH,
            background: brandColors.paper,
            border: `2px solid ${brandColors.ink}`,
            borderRadius: 10,
            flexDirection: "column",
            padding: 24,
            gap: 14,
          },
          children: [
            rect({ style: { width: "55%", height: 12, background: brandColors.signal, borderRadius: 2 } }),
            rect({ style: { width: "90%", height: 8, background: brandColors.lineMuted, borderRadius: 2 } }),
            rect({ style: { width: "70%", height: 8, background: brandColors.lineMuted, borderRadius: 2 } }),
            rect({ style: { width: "85%", height: 8, background: brandColors.lineMuted, borderRadius: 2 } }),
            rect({ style: { width: "55%", height: 8, background: brandColors.lineMuted, borderRadius: 2 } }),
          ],
        }),
        bracket(cardTop - 18, cardLeft - 18, 34, 4),
        bracket(cardTop - 18, cardLeft - 18, 4, 34),
        bracket(cardTop - 18, cardLeft + cardW - 16, 34, 4),
        bracket(cardTop - 18, cardLeft + cardW + 14, 4, 34),
        bracket(cardTop + cardH + 14, cardLeft - 18, 34, 4),
        bracket(cardTop + cardH - 16, cardLeft - 18, 4, 34),
        bracket(cardTop + cardH + 14, cardLeft + cardW - 16, 34, 4),
        bracket(cardTop + cardH - 16, cardLeft + cardW + 14, 4, 34),
      ],
    });
  },

  // A claim folder (back tab + field lines) with a rotated adjudication stamp
  // overlapping its corner — insurance claims / FNOL / adjudication topics.
  "claims-file": () => {
    const stampSize = 108;
    const ringSize = stampSize - 24;
    return rect({
      style: { position: "relative", width: 320, height: 400 },
      children: [
        rect({
          style: {
            position: "absolute",
            top: 38,
            left: 18,
            width: 100,
            height: 26,
            background: brandColors.paper,
            border: `2px solid ${brandColors.ink}`,
            borderRadius: "8px 8px 0 0",
          },
        }),
        rect({
          style: {
            position: "absolute",
            top: 58,
            left: 10,
            width: 280,
            height: 300,
            background: brandColors.paper,
            border: `2px solid ${brandColors.ink}`,
            borderRadius: 10,
            flexDirection: "column",
            padding: 28,
            gap: 14,
          },
          children: [
            rect({ style: { width: "55%", height: 13, background: brandColors.signal, borderRadius: 2 } }),
            rect({ style: { width: "80%", height: 8, background: brandColors.lineMuted, borderRadius: 2 } }),
            rect({ style: { width: "65%", height: 8, background: brandColors.lineMuted, borderRadius: 2 } }),
            rect({ style: { width: "72%", height: 8, background: brandColors.lineMuted, borderRadius: 2 } }),
            rect({ style: { width: "50%", height: 8, background: brandColors.lineMuted, borderRadius: 2 } }),
          ],
        }),
        rect({
          style: {
            position: "absolute",
            top: 268,
            left: 186,
            width: stampSize,
            height: stampSize,
            borderRadius: stampSize / 2,
            border: `4px solid ${brandColors.signal}`,
            background: brandColors.paper,
            alignItems: "center",
            justifyContent: "center",
            transform: "rotate(-14deg)",
          },
          children: [
            rect({
              style: {
                width: ringSize,
                height: ringSize,
                borderRadius: ringSize / 2,
                border: `2px solid ${brandColors.signal}`,
                alignItems: "center",
                justifyContent: "center",
              },
              children: [
                rect({
                  style: {
                    width: 20,
                    height: 34,
                    borderRight: `4px solid ${brandColors.signal}`,
                    borderBottom: `4px solid ${brandColors.signal}`,
                    transform: "rotate(35deg)",
                    marginTop: -6,
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    });
  },

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

  // A card of "key": value rows (JSON object shape) with a nested, indented
  // repeating group beneath it, flanked by large brace glyphs — schema-based
  // extraction / structured JSON / API-output topics.
  "json-schema": () => {
    const kvRow = (keyW, valW) =>
      rect({
        style: { flexDirection: "row", alignItems: "center", gap: 10 },
        children: [
          rect({ style: { width: keyW, height: 9, background: brandColors.inkMuted, borderRadius: 2 } }),
          rect({ style: { width: valW, height: 9, background: brandColors.signal, borderRadius: 2 } }),
        ],
      });
    return rect({
      style: { position: "relative", width: 380, height: 360, alignItems: "center" },
      children: [
        rect({
          style: { position: "absolute", left: -34, top: -10, fontSize: 96, fontWeight: 300, color: brandColors.signal },
          children: "{",
        }),
        rect({
          style: {
            flexDirection: "column",
            width: 290,
            background: brandColors.paper,
            border: `2px solid ${brandColors.ink}`,
            borderRadius: 10,
            padding: 26,
            gap: 16,
          },
          children: [
            kvRow(90, 130),
            kvRow(70, 100),
            kvRow(100, 70),
            rect({
              style: {
                flexDirection: "column",
                gap: 10,
                marginTop: 4,
                paddingLeft: 20,
                borderLeft: `2px solid ${brandColors.lineMuted}`,
              },
              children: [kvRow(60, 90), kvRow(60, 60)],
            }),
          ],
        }),
        rect({
          style: { position: "absolute", right: -34, bottom: -34, fontSize: 96, fontWeight: 300, color: brandColors.signal },
          children: "}",
        }),
      ],
    });
  },
};

function pickMotif() {
  if (forcedMotif && MOTIFS[forcedMotif]) return forcedMotif;
  const haystack = [category, ...(tags || []), title].join(" ").toLowerCase();
  // Checked ahead of the generic rules below: "compliance" and "regulated" show up
  // as filler tags/phrasing across nearly every post in this niche, so a bare
  // complian/regulat match used to swallow unrelated posts into shield-check.
  if (/confidence scor|human.in.the.loop|human review|document classification|\bclassif/.test(haystack))
    return "field-highlight";
  if (/schema|json|structured (data|json|output)/.test(haystack)) return "json-schema";
  if (/shallow ocr|deep extraction/.test(haystack) || /^what is ocr\b/.test(title.toLowerCase()))
    return "document-scan";
  if (/government id|driver.s licen[sc]e|national id/.test(haystack)) return "gov-id";
  if (/\bkyc\b|\bkyb\b|identity|onboard|passport|customer verification/.test(haystack)) return "id-scan";
  if (/invoice|billing/.test(haystack)) return "invoice";
  if (/\bbanking\b|checking account|savings account|routing number/.test(haystack)) return "bank-statement";
  if (/bank statement|financial statement|payment|line.?item|accounts payable/.test(haystack)) return "line-item-table";
  if (/sovereign|jurisdiction|residency/.test(haystack)) return "flag-stars";
  if (/\baudit\b|sanction|\baml\b|governance|\bdora\b|\bgdpr\b|\bhipaa\b|soc ?2/.test(haystack)) return "shield-check";
  if (/claims? processing|claims? adjudication|\bfnol\b|insurance claims?/.test(haystack)) return "claims-file";
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
        background: `${brandColors.signal}12`,
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
