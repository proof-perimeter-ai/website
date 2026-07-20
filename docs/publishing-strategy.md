# Proof Perimeter — SEO Publishing Strategy

*A phased, keyword-grouped content plan for building domain authority for Proof Perimeter is a document AI platform for processing highly regulated, high-risk documents — KYC packets, insurance claims files, letters of credit, loan applications, and policies. Start free with your own model key (Bring Your Own Key), or license Proof Perimeter's proprietary, fine-tuned Document AI model on the Enterprise tier for higher accuracy, lower token cost, and zero-egress deployment.

Proof Perimeter provides one workspace for the full document lifecycle: classification, extraction, human-in-the-loop review, and structured export. Pre-built templates cover recurring fields, standard clauses, complex tables, and form-based layouts common to regulated industries. Every extracted field carries provenance — what the model saw, what it decided, and why — so a reviewer or auditor can trace any value back to its source.*

---

## 1. Where the site stands today

| Asset | State |
|---|---|
| `/glossary` | **376 published MDX terms** (of 778 defined in `docs/seo-content/glossary.md`) — a large definitional/programmatic-SEO base already live, covering everything from "Agentic OCR" to "Zonal OCR" |
| `/blog` | **Live**, MDX-powered, built and shipped since this strategy was first drafted (see §4 for the implementation). **2 published posts** so far: "What Is OCR AI?" (`content/blog/what-is-ocr-ai.mdx`) — an educational explainer sitting in Cluster A/G territory (head-term "document ai"/"ocr ai" education, OCR-fundamentals framing) — and "KYC Document Automation: From Manual Review to AI-Assisted Onboarding" (`content/blog/kyc-document-automation.mdx`) — the first Phase 1 pillar page (Cluster A/E), anchoring "KYC & Onboarding Document AI". Both fold the Proof Perimeter pitch into a body section rather than a bolted-on close. 3 of 4 Phase 1 pillars and all comparison/regulatory content remain unpublished. |
| Technical SEO | Strong groundwork: `Organization`/`WebSite`/`FAQPage`/`BlogPosting`/`Blog`/`BreadcrumbList` JSON-LD, `llms.txt`, AI-crawler-friendly `robots.ts` (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot explicitly allowed), sitemap auto-generated from both glossary terms and blog posts (`app/sitemap.ts` now wires in `getAllPosts()` alongside `getAllTerms()`) |
| Known technical gaps | Per `docs/seo-content/seo-audit.md`: canonical host inconsistency (`www.` vs bare domain), missing `SoftwareApplication` schema, thin regional-regulator content, no dedicated per-region landing pages (DORA, MAS, RBI, SAMA) |
| Positioning | Proof Perimeter is a document AI platform for processing highly regulated, high-risk documents. Proof Perimeter's proprietary, fine-tuned Document AI model. Per internal benchmarks: 20% higher accuracy and 50% lower token consumption than general frontier models on document-extraction tasks  — targeting UK/EU (DORA, EU AI Act), Gulf (SAMA, CBUAE), India (RBI, DPDP), Singapore (MAS) |

**The gap this strategy closes:** Proof Perimeter has definitional depth (glossary), a working blog engine, and a strong differentiator (fine-tuned/zero-egress) but still lacks the content volume that targets a buyer mid-search — no pillar pages yet, no comparison content, no use-case narratives, no regulatory deep-dives. One educational post is live; everything else in the phased roadmap (§5) is still to be written. This document is the plan to build that layer, and to do it in an order that compounds authority rather than spreading thin.

**Scope decision:** This plan is **BFSI-first**. Legal and Healthcare verticals — both covered in `docs/messaging.md` and `docs/use-cases.md` — are sequenced into Phase 5, once the BFSI content cluster has established topical authority. Publishing all four verticals in parallel from day one would dilute the entity Google (and AI answer engines) associate with the domain: right now, that entity should be unambiguously "sovereign document AI for regulated finance."

---

## 2. Keyword clusters

The 39 rows in `docs/seo-content/eu-keywords.md` are a **seed sample**, not a ceiling. Each cluster below starts from the measured keywords and is extended with adjacent terms pulled from two other signals already in the repo:

- **`docs/seo-content/topics.md`** — what LlamaIndex (a document-parsing competitor) publishes and evidently finds worth ranking for
- **`docs/seo-content/glossary.md`** — the site's own 778-term vocabulary, i.e., topics Proof Perimeter has already decided are relevant enough to define

Where a cluster term has no measured UK/DE volume, that's noted — it's still worth targeting for topical authority or AEO citation, just not for near-term traffic.

### Cluster A — Category / head terms
*High KD, long-game targets. Own these last, after cluster authority is built.*

| Keyword | Vol (UK) | KD | CPC |
|---|---|---|---|
| document ai | 320 | 71 | $3.94 |
| ai document processing | 140 | 60 | $20.13 |
| ai document | 110 | 68 | $2.46 |
| ai document analysis | 90 | 45 | $3.72 |
| ai document reader | 90 | 57 | $2.05 |

**Extend with (unmeasured, from glossary/topics.md):** intelligent document processing, IDP software, document AI platform, AI document copilots, document understanding.

### Cluster B — Cloud-alternative / comparison intent
*Directly reinforces the "sovereign vs. cloud API" differentiator — this is Proof Perimeter's strongest wedge into head-term competition.*

| Keyword | Vol (UK) | KD | CPC |
|---|---|---|---|
| ocr ai | 260 | 51 | $3.59 |
| google document ai | 260 | 28 | $3.13 |
| azure ai document intelligence | 170 | 46 | $4.50 |

**Extend with (from glossary.md):** Amazon Textract, ABBYY FineReader, Docling, EasyOCR, PaddleOCR, "open source OCR model" — each is a legitimate "Proof Perimeter vs. X" or "X alternative for regulated data" comparison page. This cluster is unusually valuable for a sovereignty-positioned vendor: every comparison page is an opportunity to make the egress/compliance argument concrete against a named cloud incumbent.

### Cluster C — Agentic & LLM-based extraction
*Low/zero KD, low volume individually, but this is exactly where LlamaIndex is investing content (see topics.md: "Advanced Extraction Techniques," "agentic document processing, visual grounding, self-correction, deep extraction"). Fast-win cluster with real competitive signal behind it.*

| Keyword | Country | Vol | KD |
|---|---|---|---|
| agentic document extraction | DE | 70 | 16 |
| agentic document extraction | UK | 70 | 0 |
| ai document extraction | UK | 70 | 0 |
| document extraction ai | UK | 40 | 0 |
| document extraction ai | DE | 20 | 0 |
| ai document extraction | DE | 20 | 0 |
| document data extraction ai | DE | 20 | 0 |
| document extraction llm | DE | 20 | 0 |
| best llm for document extraction | DE | 20 | 0 |
| document extraction | UK/DE | 40 | 0 |
| data extraction from documents | UK | 50 | 0 |
| ai document scanning | UK | 50 | 0 |

**Extend with (from topics.md themes):** visual grounding document extraction, self-correcting OCR, deep extraction vs single-pass OCR, agentic document workflows, document classification AI, repeating-entity/table extraction.

### Cluster D — Finance-document operational (core BFSI fit)
*Highest buyer-intent cluster for the actual ICP — these map directly to lending, onboarding, and claims use cases in `docs/use-cases.md`.*

| Keyword | Vol (UK) | KD | CPC | Density |
|---|---|---|---|---|
| ocr invoice processing | 110 | 17 | $26.56 | 0.76 |
| vendor invoice processing | 110 | 14 | $0 | 0.01 |
| bank statement analyser | 50 | 0 | $8.52 | 0.77 |
| document extraction for finance | 40 | 0 | $0 | — |

**Extend with (from use-cases.md + glossary.md):** loan origination AI, mortgage document AI, income verification automation, financial statement extraction, tax document automation, trade finance document processing, letter of credit digitization, invoice data extraction API, accounts payable automation. This is the cluster most worth over-serving relative to raw search volume — CPC on "ocr invoice processing" ($26.56) signals real buyer commercial intent even though volume is modest.

### Cluster E — Compliance & regulated-workflow (no measured volume, core to positioning)
*Sourced from glossary.md and use-cases.md rather than eu-keywords.md — these terms carry the regulatory vocabulary (KYC, AML, DORA, SAMA) that IS the product's actual differentiator, and are exactly the kind of specific, answerable queries AEO/answer-engine citation rewards even at low measured search volume.*

KYC (Know Your Customer), KYB (Know Your Business), AML (Anti-Money Laundering), sanctions screening, watchlist screening, adverse media screening, suspicious activity report (SAR) automation, document audit trail, compliance automation, audit-ready document workflows, transaction monitoring, GDPR data extraction compliance, HIPAA-compliant document processing (Phase 5 relevance), SOC 2 document controls, data residency in document AI.

### Cluster F — Document workflow / management
*Decent volume, low-mid KD, adjacent to but not identical to the product (Proof Perimeter is an inference layer, not a full DMS) — target with a "workflow automation for regulated documents" framing rather than generic DMS copy, so it doesn't cannibalize positioning.*

| Keyword | Vol (UK) | KD | CPC |
|---|---|---|---|
| document management workflow | 260 | 23 | $43.21 |
| document workflow automation | 260 | 25 | $0 |
| document management workflow software | 210 | 20 | $0 |
| document management software with workflow | 210 | 19 | $0 |

Note the outlier CPC ($43.21) on "document management workflow" — high commercial value if it can be earned without drifting into generic DMS-vendor territory.

### Cluster G — OCR/extraction fundamentals & comparisons
*Top/mid-funnel education content, mirrors topics.md's "Production-Grade OCR & Pipelines" and "Developer OCR Tooling" themes. Builds topical breadth and internal-links heavily into the glossary.*

| Keyword | Vol (UK) | KD |
|---|---|---|
| document parsing | 20 | 0 |
| document parsing ai | 20 | 0 |
| document parsing software | 20 | 0 |
| ai document parsing | 10 | 0 |

**Extend with (from topics.md):** best OCR libraries for developers, multilingual OCR / global document accuracy, OCR document classification pipelines, extracting data from charts, table parsing for Word/.docx documents, why parsing PDFs is hard, OCR evaluation/benchmarking.

### Cluster H — Legal AI *(Phase 5 — out of initial scope)*

| Keyword | Vol (UK) | KD | CPC |
|---|---|---|---|
| ai for legal documents | 90 | 0 | $9.27 |
| ai legal document analysis | 90 | 41 | $0 |
| ai for legal document review | 50 | 0 | $0 |

**Extend with:** contract clause extraction, legal document OCR accuracy, legal due diligence AI, litigation document review, e-discovery document processing. Held back per the confirmed vertical-scope decision — revisit once BFSI cluster authority is established (see Phase 5).

### Cluster I — Healthcare AI *(Phase 5 — out of initial scope)*

`ai medical documentation` (UK, 50 vol, KD 0) plus glossary terms: clinical notes analysis, HIPAA-compliant document processing, medical coding automation (ICD-10), discharge summary extraction, EHR data extraction. Same Phase-5 treatment as Cluster H.

### Explicitly excluded

**"pdf to word ocr"** — 720 volume (UK), by far the highest-volume term in the entire dataset — is deliberately **not** targeted. Search intent here is a consumer/prosumer file-conversion tool ("convert my PDF to an editable Word doc"), not enterprise regulated-document processing. Ranking for it would pull in the wrong audience, do nothing for buyer-intent conversion, and actively dilute the topical entity a B2B compliance-focused domain needs to build with Google and AI answer engines. Chasing this number would be a vanity-metric mistake.

---

## 3. Content-gap analysis vs. the competitive landscape (topics.md)

LlamaIndex's blog (summarized in `docs/seo-content/topics.md`) is the clearest evidence of what a well-resourced document-AI content program looks like. Reading it against Proof Perimeter's clusters:

| LlamaIndex theme | Proof Perimeter's angle should differ by... |
|---|---|
| Agentic extraction, visual grounding, self-correction, "deep extraction" (Cluster C) | LlamaIndex writes *how the technology works* (developer/technical audience). Proof Perimeter should write *why this can't happen in a cloud API for a regulated document* — the compliance officer's version of the same technical story. Same keyword, different buyer. |
| KYC/AML compliance workflows, mortgage/loan pipelines (their "Building a Financial Document Pipeline with LlamaParse", "Build Automated Loan Income Verification") | Direct overlap with Cluster D/E. LlamaIndex covers this as a *toolkit capability*; Proof Perimeter should cover it as an *operating model decision* — where the inference physically runs is the whole story, not a footnote. |
| Insurance claims OCR, healthcare OCR/HIPAA | Overlaps Phase 5 (Cluster I) content. Not a Phase 1–3 priority, but confirms these are real, publishable topics once the vertical opens. |
| OCR benchmarking (ParseBench, Kaggle leaderboard) | LlamaIndex is building a citable, linkable research asset. Proof Perimeter's equivalent — the "Sovereign AI Gap" benchmark data already referenced in `docs/seo-content/seo-audit.md` (accuracy stats, latency, cost-per-check) — should be published as its own standalone, citable page, not buried in homepage stats. This is a backlink magnet (see §6). |
| Legal discovery, contract metadata extraction | Directly maps to Cluster H — confirms it's a real, competitively contested topic, reinforcing the decision to hold it for Phase 5 rather than compete under-resourced now. |
| Developer-facing tooling (MCP, self-hosting, open-source parsing) | Not a fit for Proof Perimeter's enterprise/compliance buyer — skip. Diverging from a competitor's content isn't automatically a gap; know which of their topics target a different ICP. |

**The throughline:** wherever Proof Perimeter and LlamaIndex would compete for the same keyword, Proof Perimeter should win on the compliance/sovereignty framing, not the technical-tutorial framing. That's the differentiation a "sovereign AI platform" needs — not different topics, but a different angle on the same topics.

---

## 4. Site architecture (as implemented)

The content hub shipped as **`/blog`**, not `/resources` — earlier drafts of this strategy recommended `/resources`, but the team built `/blog` instead, and this document now defers to the actual implementation. The architecture mirrors the glossary's MDX + frontmatter + `content/` pattern exactly, as originally intended:

| Layer | File(s) |
|---|---|
| Content | `content/blog/*.mdx` — one file per post, filename must match frontmatter `slug` |
| Loader | `lib/blog.ts` — `getAllPosts()`, `getPostBySlug()`, `getRelatedPosts()`, plus `extractToc()` and `readingTime()` helpers run automatically at load time |
| Routes | `app/blog/page.tsx` (index/grid), `app/blog/[slug]/page.tsx` (article), `app/blog/[slug]/opengraph-image.tsx` (per-post social-share image, generated) |
| Authors | `lib/authors.ts` — a small keyed record (`authorId` → `Author`); currently one author, `"gaurav"` (Founder) |
| Components | `BlogCard` (index grid tile), `BlogHeader` (article header + banner), `TableOfContents` (sticky sidebar, auto-populated), `RelatedPosts`, `AuthorSection` |

**Frontmatter schema** (`BlogPostFrontmatter` in `lib/blog.ts`):

```yaml
title: string
slug: string                # must match filename
description: string         # doubles as meta description
banner:
  src: string                # /assets/blog/<slug>/banner.png
  alt: string
  width: number               # 1600
  height: number              # 900 (16:9 — matches both card and header aspect ratio)
category: string             # free-text eyebrow label, e.g. "Document AI"
tags: string[]
authorId: string             # must exist in lib/authors.ts
createdAt: string            # ISO date, set once
updatedAt: string             # ISO date, bump on substantive edits
relatedPosts: string[]        # explicit slugs; getRelatedPosts() backfills to 3 via shared-tag overlap if fewer are listed
status: "published" | "draft"
```

Two fields worth noting are **derived, not authored**: `readingTimeMinutes` (word count ÷ 225 wpm) and `toc` (auto-extracted from every `##`/`###` heading via `github-slugger`, rendered by `TableOfContents`). Neither should be hand-written into frontmatter or the MDX body.

**Cluster/phase tracking is not yet in the schema.** The strategy's keyword clusters (A–I) and phases (§5) have no dedicated frontmatter field today — `category` and `tags` are free text. Until the schema is extended, track cluster/phase progress by reading each post's `category`/`tags`/body against the cluster tables in §2 (that's exactly what `docs/daily-content-routine-prompt.md` Step 1 does before picking the next topic). Adding optional `primaryKeyword: string` and `cluster: "A" | ... | "I"` fields to `BlogPostFrontmatter` would make this exact instead of inferred, and is safe to do non-destructively — `lib/blog.ts`'s required-field check only validates the fixed list above, so extra frontmatter keys don't break existing posts.

**Interlinking model — pillar → cluster → glossary**, using the mechanisms that already exist:
- **Pillar pages** (Phase 1, §5) target Cluster A/D head terms — e.g. "KYC Document AI," "Sovereign AI for Lending Document Processing."
- **Cluster articles** (Phase 2–4) target the long-tail rows in Clusters B/C/D/G, list their parent pillar's slug in `relatedPosts`, and get pulled onto sibling posts automatically once tags overlap (`getRelatedPosts()`'s tag-backfill).
- **Glossary terms** (already live, 376 of them) link up into whichever blog post they support via plain in-body Markdown links (there's no automatic glossary↔blog link resolution — `getRelatedTerms()` in `lib/glossary.ts` only resolves glossary-to-glossary `relatedTerms`), and posts link down to glossary terms the same way, as `what-is-ocr-ai.mdx` already does with its `/glossary` link.

---

## 5. Phased roadmap

### Phase 0 — Technical foundation (weeks 0–2, prerequisite)
Content published before indexability/trust signals are fixed underperforms. Before Phase 1 goes live:
- Resolve the canonical host mismatch (`www.` vs bare domain) flagged in `seo-audit.md` §2/§7.
- Add the `SoftwareApplication`/`Organization` schema gaps from `seo-audit.md` §3.
- Confirm `llms.txt` (already live) stays in sync as new pages ship — update it in the same PR as any new pillar page, per the existing warning in `seo-audit.md` §10.

### Phase 1 — BFSI pillar content (months 1–3)
3–4 pillar pages, one per core use case, each anchored to a Cluster A/D head term and heavily internal-linked to existing glossary terms:
1. **"KYC & Onboarding Document AI"** — anchors Cluster A + E (document ai, KYC, AML)
2. **"Sovereign AI for Lending Document Processing"** — anchors Cluster D (bank statement analyser, income verification, loan origination)
3. **"Claims Processing Document AI"** — anchors Cluster D/G, sets up Phase 5 insurance-adjacent content
4. **"The Sovereign AI Gap"** — a positioning/explainer pillar, not keyword-first, that every other page links back to (this is the entity-defining page for the whole domain)

### Phase 2 — Fast-win long-tail cluster articles (months 2–4, overlapping Phase 1)
Target the zero/low-KD terms in Cluster C first — these are the fastest realistic ranking wins and the clearest head-to-head opportunity against LlamaIndex's own content investment: "agentic document extraction," "document extraction llm," "best llm for document extraction," "ai document extraction." Pair each with a Cluster D operational term (bank statement analyser, vendor invoice processing) as a supporting post under the relevant Phase 1 pillar.

### Phase 3 — Comparison/alternative content (months 3–5)
"Proof Perimeter vs. Azure AI Document Intelligence," "... vs. Google Document AI," "... vs. Amazon Textract," "on-premise alternatives to [cloud OCR vendor] for regulated data." This is Cluster B — directly reinforces the sovereignty differentiator, captures switcher intent, and is realistically winnable because these comparison queries reward specificity (a named, credible alternative) over raw domain authority.

### Phase 4 — Regional regulatory landing content (months 4–6)
Dedicated pages for **DORA** (EU/UK), **MAS** (Singapore), **RBI/DPDP** (India), **SAMA/CBUAE** (Gulf) — already identified as a content gap in `seo-audit.md` §4/§11 ("thin one-liners under 'Built for your regulators' currently under-serve this opportunity"). These carry little-to-no measured search volume in the current dataset but are high commercial intent and strong AEO material — exactly the kind of specific, answerable query ("DORA third-party AI vendor evidence requirements") an answer engine surfaces verbatim, and the audience (CISOs, MLROs, compliance heads) searches by regulator name, not generic category terms.

### Phase 5 — Vertical expansion: Legal & Healthcare (months 6+)
Once the BFSI cluster shows measurable ranking/topical authority, open Cluster H (Legal AI) and Cluster I (Healthcare AI), drawing directly on the already-written vertical detail in `docs/messaging.md` and `docs/use-cases.md`. Sequence Legal before Healthcare — Legal has higher measured CPC ($9.27 on "ai for legal documents") and closer buyer-persona overlap with existing BFSI compliance content (privilege, discovery, regulatory review are conceptually adjacent to KYC/AML).

### Ongoing — Domain-authority / off-page tactics
Content alone doesn't build domain authority; it needs to be earned externally:
- **Publish the benchmark as a standalone linkable asset** (see §3) — Proof Perimeter's own accuracy/latency/cost data, framed like LlamaIndex's ParseBench/Kaggle leaderboard play, is the single strongest backlink magnet available given what's already in `seo-audit.md`'s stats block.
- **Analyst/directory listings** — G2, Gartner Peer Insights, Capterra category pages for "Intelligent Document Processing" and "AML software" — these are high-authority backlinks specific to the ICP, not generic directory spam.
- **Regulatory/RegTech guest content** — bylined commentary on DORA, EU AI Act, or MAS AI-governance requirements placed on compliance/RegTech trade publications; this is both a backlink and a direct E-E-A-T signal for a compliance-positioned vendor.
- **Digital PR around the "Sovereign AI Gap" framing** — the phrase itself is brandable and citable; pitching it as a named concept (the way "shadow IT" or "shadow AI" became a citable term) is a realistic path to unlinked-mention-to-backlink conversion.

---

## 6. Editorial cadence & prioritization

Within any phase, rank candidate keywords with a simple score:

```
priority = (volume × intent_fit) / (1 + KD/10)
```

Where `intent_fit` is a 1–3 multiplier (1 = generic/educational, 2 = category/comparison, 3 = direct BFSI operational term) — this keeps Cluster D/E terms prioritized over Cluster A/G terms even when raw volume is lower, since buyer-intent fit matters more than traffic for a platform this specialized.

**Cadence:** 2–4 published pieces/month is sustainable and realistic — this is a specialized B2B topic where depth beats frequency; a shallow twice-weekly cadence would compete poorly against LlamaIndex's clearly well-resourced program. Pillar pages (Phase 1) warrant more editorial investment per piece than cluster/supporting articles (Phase 2–4) — treat pillars as living documents updated as the regulatory landscape shifts (DORA/EU AI Act enforcement dates, new SAMA/MAS guidance), not one-and-done posts.

---

## 7. Measurement

Track per phase, not just in aggregate:

| Metric | What it tells you |
|---|---|
| Indexed pages (`/blog/*`) vs. published count | Whether Phase 0's technical fixes are holding — a growing gap signals a crawl/indexation problem, not a content problem |
| Ranking position, tracked keyword set (all clusters above) | Direct measure of whether the clustering strategy is working; track by cluster, not just overall, since Cluster C/D should move faster than Cluster A |
| Organic sessions to `/blog` and `/glossary` | Whether the pillar→cluster→glossary interlinking (§4) is actually distributing authority, not just adding pages |
| Assisted conversions to `/book-demo` from organic content | The metric that matters commercially — content ranking without demo-request lift means intent-fit is off, not that the content strategy failed |
| Citations/mentions in AI answer engines (ChatGPT, Perplexity, Google AI Overviews, Claude) | Given the existing `llms.txt`/AEO investment, this is a legitimate parallel KPI to classic SERP rank — spot-check by querying regulator-specific questions (e.g., "what evidence does DORA require for third-party AI vendors") and checking whether Proof Perimeter is cited |
| Backlinks to the benchmark/research asset (§3, §5) | Leading indicator for domain authority growth independent of content volume |

---

## 8. Exhaustive keyword/topic backlog by cluster

§2 established the clusters and gave a handful of representative "Extend with..." examples per cluster. This section is the actual working backlog — every keyword or topic candidate currently identified for each cluster, checkbox-formatted so it can be tracked directly. **This is the list to pick from, not §2's shorter examples** — `docs/seo-content/daily-content-routine-prompt.md` Step 2 draws from here.

How to use it:
- Check off an item once a post covering it is published (or note the post's slug next to it) — this is the single source of truth for "already covered" alongside the live inventory scan in the routine's Step 1.
- Items are a mix of directly measured keywords (lowercase, matching `eu-keywords.md`'s casing) and topic/title candidates (title case) derived from `topics.md`, `glossary.md`, `messaging.md`, and `use-cases.md` — both are valid targets; a topic candidate's "primary keyword" for SEO purposes is whatever head phrase it most naturally targets (state it when drafting, per the routine's Step 2).
- This list is not fixed — add to it as new keyword research or competitor content surfaces something worth covering; don't treat 100% coverage as a finish line that closes the cluster.
- Within a cluster, use the §6 priority formula to break ties on order; across clusters, follow the §5 phase gating (don't reach into Cluster H/I candidates before Phase 5 unlocks).

### Cluster A — Category / head terms

- [ ] document ai
- [ ] ai document processing
- [ ] ai document
- [ ] ai document analysis
- [ ] ai document reader
- [ ] What Is Intelligent Document Processing (IDP)? A Complete Guide(2026)
- [ ] Document AI Platforms Compared: How to Choose One for Regulated Data
- [ ] AI Document Copilots: What They Are and Where They Fall Short for Compliance Teams
- [ ] The State of Document AI in Banking, Insurance, and Lending (2026)
- [ ] Document Understanding vs. OCR: What's Actually Different
- [ ] How AI Document Readers Work: A Technical Primer
- [ ] AI Document Analysis: Use Cases, Accuracy Benchmarks, and Limits
- [ ] A Document AI Buyer's Guide for Regulated Industries
- [ ] Document AI ROI: How to Calculate Cost Savings from Automated Extraction
- [ ] What Is an AI Document Processing Pipeline? Stages Explained
- [ ] Document AI Case Studies: What Production Deployments Actually Look Like
- [ ] Top Open Source document ai tools

### Cluster B — Cloud-alternative / comparison intent

- [ ] ocr ai
- [ ] google document ai
- [ ] azure ai document intelligence
- [ ] Proof Perimeter vs. Google Document AI: Which Fits Regulated BFSI Workflows?
- [ ] Proof Perimeter vs. Azure AI Document Intelligence for Banking Documents
- [ ] Proof Perimeter vs. Amazon Textract: Data Residency and Cost Compared
- [ ] On-Premise Alternatives to Cloud OCR APIs for Regulated Data
- [ ] ABBYY FineReader vs. Modern AI Document Platforms: Is Legacy OCR Still Worth It?
- [ ] Open-Source OCR Models (Docling, EasyOCR, PaddleOCR) vs. Fine-Tuned Document AI
- [ ] Why Cloud Document AI APIs Are a Compliance Risk for Banks and Insurers
- [ ] Tesseract OCR in Production: Where It Breaks Down for Regulated Documents
- [ ] Choosing Between Cloud, VPC, and On-Premise Document AI Deployment
- [ ] Open Vision-Language Models (Qwen-VL and Peers) for Document Extraction: Enterprise-Ready or Not?

### Cluster C — Agentic & LLM-based extraction

- [ ] agentic document extraction (DE)
- [ ] agentic document extraction (UK)
- [ ] ai document extraction
- [ ] document extraction ai
- [ ] document data extraction ai
- [ ] document extraction llm
- [ ] best llm for document extraction
- [ ] document extraction
- [ ] data extraction from documents
- [ ] ai document scanning
- [ ] What Is Agentic Document Extraction? How It Differs from Single-Pass OCR
- [ ] Best LLMs for Document Extraction in 2026: A Practical Comparison
- [ ] Visual Grounding in Document AI: Why It Matters for Auditability
- [ ] Self-Correcting Extraction Models: How AI Catches Its Own Mistakes
- [ ] Deep Extraction vs. Shallow OCR: What Regulated Industries Need to Know
- [ ] How to Extract Repeating Line Items and Tables from Documents with AI
- [ ] Document Classification AI: Automatically Sorting KYC Packets, Claims, and Loan Files
- [ ] Zero-Shot vs. Fine-Tuned Document Extraction: Which Wins for Financial Documents?
- [ ] Confidence Scoring in Document Extraction: How Human-in-the-Loop Actually Works
- [ ] Agentic Document Workflows: Orchestrating Extraction, Validation, and Routing
- [ ] Vision-Language Models for Document Understanding: A Non-Technical Explainer
- [ ] Schema-Based Extraction: Turning Documents into Structured JSON

### Cluster D — Finance-document operational

- [ ] ocr invoice processing
- [ ] vendor invoice processing
- [ ] bank statement analyser
- [ ] document extraction for finance
- [ ] How AI Bank Statement Analysis Works for Loan Underwriting
- [ ] Automating Income Verification from Pay Stubs and Bank Statements
- [ ] AI-Powered Invoice Processing: OCR vs. Full Extraction vs. Agentic Approaches
- [ ] Vendor Invoice Processing at Scale: What Breaks in Manual AP Workflows
- [ ] Mortgage Document AI: Automating Loan File Review End to End
- [ ] Trade Finance Document Processing: Letters of Credit, Bills of Lading, and AI
- [ ] Financial Statement Extraction: Turning 10-Ks and Audited Statements into Structured Data
- [ ] Tax Document Automation for Lenders: W-2s, 1099s, and Tax Returns
- [ ] Accounts Payable Automation: Where AI Extraction Fits in the AP Stack
- [ ] Broker Statement Parsing for Wealth Management Onboarding
- [ ] Underwriting Automation: How Document AI Speeds Up Credit Decisions
- [ ] Letter of Credit Digitization: Automating Trade Finance Paperwork
- [ ] Loan Origination AI: Where Extraction Fits in the Origination Stack

### Cluster E — Compliance & regulated-workflow

- [x] KYC Document Automation: From Manual Review to AI-Assisted Onboarding — published as `kyc-document-automation` (2026-07-19), Phase 1 pillar #1 ("KYC & Onboarding Document AI")
- [ ] KYB (Know Your Business) Document Verification: What AI Can and Can't Automate
- [ ] AML Document Screening: How AI Flags Suspicious Patterns Across KYC Packets
- [ ] Sanctions and Watchlist Screening: Where Document AI Fits the AML Stack
- [ ] Adverse Media Screening Automation for Onboarding Teams
- [ ] Building an Audit-Ready Document Trail for AI-Assisted Compliance Decisions
- [ ] Compliance Automation for Document-Heavy Regulated Workflows
- [ ] Data Residency in Document AI: What "In-Region" Actually Means (and Doesn't)
- [ ] SOC 2 and Document AI: What Controls Actually Matter for Vendor Due Diligence
- [ ] GDPR-Compliant Document Extraction: Data Minimization in Practice
- [ ] Provenance and Explainability in AI Document Decisions: What Regulators Ask For
- [ ] The Sovereign AI Gap: Why Data Residency Doesn't Guarantee Inference Residency *(flagship/pillar anchor — see Phase 1)*
- [ ] Transaction Monitoring and Document AI: Where the Two Systems Meet
- [ ] Suspicious Activity Report (SAR) Prep: What Can and Can't Be Automated

### Cluster F — Document workflow / management

- [ ] document management workflow
- [ ] document workflow automation
- [ ] document management workflow software
- [ ] document management software with workflow
- [ ] Document Workflow Automation for Regulated Financial Services
- [ ] What to Look for in Document Management Software for Banks and Insurers
- [ ] Document Review Queues: Building a Human-in-the-Loop Workflow Around AI Extraction
- [ ] Straight-Through Processing: When Documents Can Skip Human Review Entirely
- [ ] Exception Handling in Document Workflows: Designing for the Cases AI Gets Wrong
- [ ] Document Routing Automation: From Intake to the Right Reviewer
- [ ] Maker-Checker Workflows for AI-Assisted Document Decisions
- [ ] Document Lifecycle Management for Regulated Industries: Retention, Audit, Disposal

### Cluster G — OCR/extraction fundamentals & comparisons

- [ ] document parsing
- [ ] document parsing ai
- [ ] document parsing software
- [ ] ai document parsing
- [ ] Why Parsing PDFs Is Still Hard in 2026
- [ ] Multilingual OCR: Handling Non-Latin Scripts and Mixed-Language Documents
- [ ] Table Extraction from PDFs: Nested Tables, Merged Cells, and Spanning Columns
- [ ] Extracting Data from Charts and Graphs: Beyond Text-Only OCR
- [ ] How to Benchmark an OCR/Document AI Vendor Before You Buy
- [ ] Handwriting Recognition in Document AI: How Far Has It Come?
- [ ] Document Parsing Accuracy: How to Measure It Properly (Character, Word, Field-Level)
- [ ] Low-Quality Scans and Faxes: Why They Still Break Most OCR Pipelines
- [ ] Passport and ID Document OCR: MRZ Validation and Fraud Detection Basics
- [ ] Document Preprocessing (Deskewing, Denoising): Does It Still Matter for AI-Based Extraction?
- [ ] Best OCR Libraries for Developers in 2026

### Cluster H — Legal AI *(Phase 5 — gated, do not draft before unlock condition in §5)*

- [ ] ai for legal documents
- [ ] ai legal document analysis
- [ ] ai for legal document review
- [ ] AI Contract Review: Clause Extraction for M&A Due Diligence
- [ ] Legal Document OCR: Accuracy and Compliance Requirements for Law Firms
- [ ] AI for Legal Due Diligence: Automating Document Review in Deal Rooms
- [ ] E-Discovery Document Processing: Where AI Extraction Fits the Litigation Workflow
- [ ] Privilege Review and AI: What Law Firms Need to Know Before Sending Documents to a Cloud API
- [ ] Lease Abstraction with AI: Extracting Key Terms from Commercial Leases

### Cluster I — Healthcare AI *(Phase 5 — gated, do not draft before unlock condition in §5)*

- [ ] ai medical documentation
- [ ] HIPAA-Compliant Document AI: What "Compliant" Actually Requires
- [ ] Medical Coding Automation: ICD-10 Extraction from Clinical Notes
- [ ] Discharge Summary Extraction: Automating Patient Handoff Documentation
- [ ] Prior Authorization Automation: Matching Clinical Notes to Payer Criteria
- [ ] EHR Data Extraction: Turning Unstructured Clinical Notes into Structured Records
