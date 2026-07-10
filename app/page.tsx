import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { FadeIn } from "@/components/FadeIn";
import { Eyebrow } from "@/components/Eyebrow";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  title: siteConfig.tagline,
  alternates: { canonical: "/" },
};

function BtnSolid({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-[5px] bg-signal px-4.5 py-2.75 text-[15px] font-semibold text-white transition-colors hover:bg-signal-deep"
    >
      {children}
    </Link>
  );
}

function BtnGhost({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-[5px] border border-line-2 bg-transparent px-4.5 py-2.75 text-[15px] font-semibold text-ink transition-colors hover:border-ink"
    >
      {children}
    </Link>
  );
}

const steps = [
  {
    num: "01 · DEPLOY",
    title: "Inside your environment",
    description:
      "A self-contained pipeline installs in your VPC or co-locates on your sovereign cloud. Air-gappable, no outbound calls. The document never has anywhere external to go.",
  },
  {
    num: "02 · RUN",
    title: "Ingest, classify, extract on-device",
    description:
      "Small, fine-tuned models run the full flow on commodity CPU hardware. Built for KYC packs, IDs, statements, payslips, tax docs and claims — including the messy ones.",
  },
  {
    num: "03 · PROVE",
    title: "Accuracy before you commit",
    description:
      "Send your hardest documents — faxes, handwriting, bilingual and Arabic IDs, complex tables. We fine-tune and show field-level accuracy on a blind benchmark before you sign.",
  },
  {
    num: "04 · ATTEST",
    title: "Evidence, automatically",
    description:
      "Every field carries a provenance record — model version, timestamp, where inference ran. Low-confidence fields route to a reviewer. STP where safe, audit trail for all of it.",
  },
];

const diffs = [
  {
    vs: "vs · cloud Document AI APIs",
    description:
      "They route your documents through external infrastructure — the exact thing your regulators restrict and your resilience rules flag as third-party concentration risk. For residency-bound workloads, they aren't a cheaper option; they're a non-compliant one.",
  },
  {
    vs: "vs · heavyweight on-prem suites",
    description:
      "On-prem from the incumbents means multi-month, professional-services-heavy projects on expensive hardware — and they still don't hand you per-document proof of where inference ran. Proof Perimeter deploys in weeks, runs CPU-first, and generates the evidence they don't.",
  },
  {
    vs: "vs · staying manual",
    description:
      "Most sensitive-tier volume is still processed by hand — not because automation failed, but because the cloud was off-limits and on-prem was too heavy. This is net-new automation, not a rip-and-replace.",
  },
];

const cases = [
  {
    title: "KYC & onboarding",
    badge: "Start here",
    description:
      "Corporate and retail KYC packs, identity documents, proof of address. The most sovereignty-bound, highest-volume flow you run — and the one where slow, manual processing costs you customers. Clears the field-accuracy gate on multilingual and low-quality IDs, with the audit trail a sanctions or PEP match will be questioned on.",
  },
  {
    title: "Lending & credit files",
    description:
      "Bank statements, payslips, tax returns feeding creditworthiness decisions. High-volume, high-stakes, and squarely inside high-risk AI governance scope — with the data lineage and lifecycle logging that scope demands, generated in-perimeter.",
  },
  {
    title: "Insurance underwriting & claims",
    description:
      "Diverse, messy, multimodal document sets. The hardest accuracy problem in the category — and where in-perimeter pricing and claims governance matters most.",
  },
];

const regulators = [
  {
    region: "Europe & UK",
    detail:
      "DORA third-party-concentration evidence, supervisory AI inventory, EU AI Act lineage / logging / human-oversight records.",
  },
  {
    region: "Gulf · KSA/UAE",
    detail:
      "SAMA in-Kingdom and CBUAE residency, cross-border-inference attestation, Arabic-first extraction, sovereign-cloud co-location.",
  },
  {
    region: "Singapore",
    detail: "MAS AI inventory, board-oversight and third-party-AI governance evidence.",
  },
  {
    region: "India",
    detail: "RBI data-localisation-compliant in-perimeter inference, DPDP-aligned audit trails, legacy-core connectors.",
  },
  {
    region: "Everywhere",
    detail: "ISO 42001 / SOC 2 readiness, per-document inference provenance.",
    everywhere: true,
  },
];

const personas = [
  {
    title: "Heads of KYC / Onboarding Ops",
    description: "Close the hard manual cases at ~$0.14 vs $5+, faster cycle time, audit trail included.",
  },
  {
    title: "MLROs & Heads of Financial Crime",
    description: "Keep the sanctions/PEP inference in-house and clear the 99.9% accuracy gate, proven blind before you commit.",
  },
  {
    title: "CISOs & Heads of ICT Security",
    description: "“The data never left” as an attestable control, on a CPU-first deploy that's live in weeks.",
  },
  {
    title: "CDOs & Heads of AI Governance",
    description: "The board's AI inventory and residency answer, from a system automating the document mill as it reports.",
  },
  {
    title: "Chief Risk Officers",
    description: "Collapse third-party AI concentration risk, with confidence scoring and human-in-the-loop on every decision.",
  },
  {
    title: "Chief Compliance Officers",
    description: "Prove where inference happens, and ship the straight-through processing and audit trail in the same pipeline.",
  },
];

const stats = [
  { big: "~73%", label: "lower inference cost vs a comparable third-party large-model API" },
  { big: "4–11 wks", label: "to production for a focused use case in cited deployments" },
  { big: "<100ms", label: "latency on commodity CPU hardware" },
  { big: "$0.14", label: "per automated check vs $5+ manual at scale" },
];

const faqs = [
  {
    question: "Does our data ever leave our environment?",
    answer:
      "No. The pipeline runs entirely inside your VPC or co-located on your sovereign cloud, with no outbound calls. It's air-gappable.",
  },
  {
    question: "Do we need GPUs?",
    answer:
      "No. Proof Perimeter is designed to run on commodity CPU hardware, which is a large part of why deployment is fast and per-document cost is predictable.",
  },
  {
    question: "Will it clear our accuracy bar on difficult documents?",
    answer:
      "That's exactly what the blind benchmark is for. We fine-tune on your hardest cases — faxes, handwriting, bilingual and Arabic IDs, complex tables — and show field-level accuracy before you commit.",
  },
  {
    question: "How does this fit our existing core banking systems?",
    answer:
      "Connectors for the major legacy cores (Finacle, Flexcube, BaNCS) move documents and extracted data in and out of production, so this runs as part of your operation, not beside it.",
  },
  {
    question: "Isn't keeping data in-region already enough?",
    answer:
      "Residency governs where the document sits, not where the model ran. Proof Perimeter closes the second gap — and proves it per document. That's the part storage alone can't cover.",
  },
  {
    question: "How long until we're live?",
    answer: "Focused use cases reach production in weeks. We scope a single high-value workflow first, prove it, then expand.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <SiteNav />
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-21 pb-19">
          <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-13.5 px-7 md:grid-cols-[1.02fr_0.98fr]">
            <div>
              {/* <Eyebrow className="hero-animate-badge">On-device AI · KYC · lending · claims</Eyebrow> */}
              <h1 className="hero-animate-h1 mt-5.5 max-w-[15ch] text-[clamp(34px,5vw,55px)] font-bold tracking-[-0.022em] text-ink">
                When your regulator asks where your AI runs, have an answer.
              </h1>
              <p className="hero-animate-p mt-6 max-w-[54ch] text-[19px] text-ink-2">
                Proof Perimeter runs small, fine-tuned models on your most sensitive financial documents — entirely inside your environment, on commodity CPUs, live in weeks. 
              </p>
              <div className="hero-animate-cta mt-8 flex flex-wrap gap-3.5">
                <BtnSolid href="/book-demo">Request a demo</BtnSolid>
                {/* <BtnGhost href="#how">Free POC on your hardest documents</BtnGhost> */}
              </div>
              <div className="hero-animate-trust mt-8.5 flex flex-wrap gap-x-5 gap-y-2.5 pt-6">
                {["CPU-feasible", "Zero data egress", "Sovereign cloud"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 font-mono text-[12.5px] text-ink-2">
                    <span className="h-[5px] w-[5px] rounded-[1px] bg-signal" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Pipeline console illustration */}
            <div className="hero-animate-image overflow-hidden rounded-lg border border-line-2 bg-panel shadow-[0_24px_60px_-38px_rgba(20,70,124,0.55)]">
              <div className="flex items-center justify-between border-b border-line bg-paper-2 px-4.5 py-3.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-2">perimeter · pipeline</span>
                <span className="inline-flex items-center gap-1.75 font-mono text-[11.5px] font-medium text-live">
                  <span className="h-[7px] w-[7px] rounded-full bg-live" />
                  running · in-perimeter
                </span>
              </div>
              <div className="flex items-stretch gap-2.5 border-b border-dashed border-line-2 px-4.5 py-5.5">
                {[
                  { s: "Ingest", m: "in-vpc" },
                  { s: "Classify", m: "slm" },
                  { s: "Extract", m: "cpu" },
                  { s: "Prove", m: "attest" },
                ].map((stage, i) => (
                  <span key={stage.s} className="flex flex-1 items-stretch gap-2.5">
                    {i > 0 && <span className="flex items-center font-mono text-line-2">&rarr;</span>}
                    <span className="flex-1 rounded-[5px] border border-line bg-paper px-1.5 py-3 text-center">
                      <span className="block font-mono text-[11.5px] font-semibold text-ink">{stage.s}</span>
                      <span className="mt-0.75 block font-mono text-[9.5px] tracking-[0.04em] text-ink-2">{stage.m}</span>
                    </span>
                  </span>
                ))}
              </div>
              <div className="p-4.5">
                <div className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-signal">
                  {"// inference provenance · per field"}
                </div>
                <div className="font-mono text-[13px] leading-[2]">
                  {[
                    ["document", "kyc_pack_0291.pdf"],
                    ["model", "perimeter-slm · v1.4"],
                    ["ran_on", "in-perimeter · vpc-eu-1", true],
                    ["egress", "none", true],
                    ["latency", "82ms"],
                    ["status", "✓ attested", true],
                  ].map(([k, v, ok]) => (
                    <div key={k as string} className="grid grid-cols-[86px_1fr] gap-3">
                      <span className="text-ink-2">{k}</span>
                      <span className={ok ? "font-semibold text-live" : "text-ink"}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[0.85fr_1.15fr]">
              <div>
                <Eyebrow>The problem</Eyebrow>
                <h2 className="mt-4.5 max-w-[20ch] text-[clamp(28px,3.6vw,40px)] font-bold tracking-[-0.022em] text-ink">
                  Most teams can&rsquo;t say where their document AI actually runs.
                </h2>
              </div>
              <div className="pt-2 [&>p+p]:mt-4.5 text-[17px] leading-[1.62] text-ink-2">
                <p>
                  Your KYC packs, loan files and claims move through a chain of OCR, extraction and AI services. For a growing share of that work, the inference happens <strong className="font-semibold text-ink">outside</strong> your controlled perimeter — on a third-party API or a model you cannot audit. That share is your{" "}
                  <span className="inline-block rounded-full border border-line-2 bg-paper-2 px-2.5 py-0.5 font-mono text-[13px] text-signal">Sovereign-AI Gap</span>, and almost no one can put a number on it.
                </p>
                <p>
                  Proof Perimeter starts by making it visible: a per-workload map of where every model runs, what data each one touches, and what share of regulated inference leaves the perimeter — then it keeps that share at zero by running the inference on-device. You move from &ldquo;we think it&rsquo;s compliant&rdquo; to a figure you can take to the board.
                </p>
              </div>
            </div>
            <div className="mt-10">
              <BtnSolid href="/book-demo">Request a demo</BtnSolid>
            </div>
          </div>
        </section>

        {/* Why now */}
        <section className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[0.85fr_1.15fr]">
              <div>
                <Eyebrow>Why now</Eyebrow>
                <h2 className="mt-4.5 max-w-[20ch] text-[clamp(28px,3.6vw,40px)] font-bold tracking-[-0.022em] text-ink">
                  Residency tells you where the file is. It can&rsquo;t tell you where the model ran.
                </h2>
              </div>
              <div className="pt-2 [&>p+p]:mt-4.5 text-[17px] leading-[1.62] text-ink-2">
                <p>
                  Sovereign cloud and in-region hosting solve the storage half of the problem — and regulators now assume it. The unsolved half is inference: the moment a document is read by an external model, its contents and your decisioning leave your control, invisibly.
                </p>
                <p>
                  Proof Perimeter runs the read inside your perimeter — small models on hardware you control — and turns &ldquo;the inference never left&rdquo; from a claim into a logged, exportable fact.
                </p>
              </div>
            </div>
            <div className="mt-10">
              <BtnSolid href="/book-demo">Request a demo</BtnSolid>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-4.5 max-w-[20ch] text-[clamp(28px,3.6vw,40px)] font-bold tracking-[-0.022em] text-ink">
              Compliant inference on your worst documents, inside your perimeter — with the evidence.
            </h2>
            <div className="mt-10.5 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => (
                <FadeIn key={step.title} delay={i * 80} className="bg-panel p-6.5">
                  <div className="font-mono text-[11.5px] font-semibold tracking-[0.06em] text-signal">{step.num}</div>
                  <h3 className="mt-3.5 text-[17px] font-semibold tracking-[-0.01em] text-ink">{step.title}</h3>
                  <p className="mt-2.5 text-sm text-ink-2">{step.description}</p>
                </FadeIn>
              ))}
            </div>
            <div className="mt-10">
              <BtnSolid href="/book-demo">Request a demo</BtnSolid>
            </div>
          </div>
        </section>

        {/* Differentiators */}
        <section className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>What makes it different</Eyebrow>
            <h2 className="mt-4.5 max-w-[20ch] text-[clamp(28px,3.6vw,40px)] font-bold tracking-[-0.022em] text-ink">
              Why not just use what&rsquo;s already in the building?
            </h2>
            <div className="mt-10.5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {diffs.map((diff, i) => (
                <FadeIn key={diff.vs} delay={i * 80} className="rounded-md border border-line bg-panel p-6.5">
                  <div className="font-mono text-xs uppercase tracking-[0.06em] text-ink-2">{diff.vs}</div>
                  <p className="mt-3.5 text-[15px] text-ink-2">{diff.description}</p>
                </FadeIn>
              ))}
            </div>
            <blockquote className="mt-10 max-w-[42ch] border-l-[3px] border-signal py-1.5 pl-6.5 text-[23px] font-semibold leading-[1.4] tracking-[-0.015em] text-ink">
              Extraction accuracy is the price of entry. Proving where the model ran is the reason to buy.
            </blockquote>
            <div className="mt-10">
              <BtnSolid href="/book-demo">Request a demo</BtnSolid>
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section id="cases" className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>Use cases</Eyebrow>
            <h2 className="mt-4.5 max-w-[20ch] text-[clamp(28px,3.6vw,40px)] font-bold tracking-[-0.022em] text-ink">
              Built for your highest-volume regulated document flows.
            </h2>
            <div className="mt-10.5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cases.map((c, i) => (
                <FadeIn key={c.title} delay={i * 80} className="border-t-2 border-signal pt-5">
                  <h3 className="flex flex-wrap items-baseline gap-2.5 text-xl font-semibold tracking-[-0.01em] text-ink">
                    {c.title}
                    {c.badge && (
                      <span className="rounded-[3px] bg-signal px-1.75 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-white">
                        {c.badge}
                      </span>
                    )}
                  </h3>
                  <p className="mt-3 text-[15px] text-ink-2">{c.description}</p>
                </FadeIn>
              ))}
            </div>
            <div className="mt-10">
              <BtnSolid href="/book-demo">Request a demo</BtnSolid>
            </div>
          </div>
        </section>

        {/* Regulators */}
        <section id="regulators" className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>Built for your regulators</Eyebrow>
            <h2 className="mt-4.5 max-w-[20ch] text-[clamp(28px,3.6vw,40px)] font-bold tracking-[-0.022em] text-ink">
              One architecture, every supervisor&rsquo;s question answered.
            </h2>
            <p className="mt-5.5 max-w-[60ch] text-[19px] text-ink-2">
              Wherever you&rsquo;re regulated, the question is the same — where does the model run, and can you prove it? Proof Perimeter answers it once, for all of them.
            </p>
            <div className="mt-10 overflow-hidden rounded-md border border-line bg-panel">
              {regulators.map((row) => (
                <div
                  key={row.region}
                  className={`grid grid-cols-1 gap-2 border-b border-line px-6.5 py-5.5 last:border-b-0 md:grid-cols-[200px_1fr] md:gap-6 ${row.everywhere ? "bg-paper-2" : ""}`}
                >
                  <div className={`font-mono text-[13px] font-semibold tracking-[0.04em] ${row.everywhere ? "text-live" : "text-signal"}`}>
                    {row.region}
                  </div>
                  <div className="text-[15.5px] text-ink-2">{row.detail}</div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <BtnSolid href="/book-demo">Request a demo</BtnSolid>
            </div>
          </div>
        </section>

        {/* Personas */}
        <section className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>Who it&rsquo;s for</Eyebrow>
            <h2 className="mt-4.5 max-w-[20ch] text-[clamp(28px,3.6vw,40px)] font-bold tracking-[-0.022em] text-ink">
              The people who own the gap.
            </h2>
            <div className="mt-10.5 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {personas.map((persona, i) => (
                <FadeIn key={persona.title} delay={i * 60} className="bg-panel p-6.5">
                  <h3 className="text-base font-semibold text-ink">{persona.title}</h3>
                  <p className="mt-2.25 text-[14.5px] text-ink-2">{persona.description}</p>
                </FadeIn>
              ))}
            </div>
            <div className="mt-10">
              <BtnSolid href="/book-demo">Request a demo</BtnSolid>
            </div>
          </div>
        </section>

        {/* Proof & economics */}
        <section className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>Proof &amp; economics</Eyebrow>
            <h2 className="mt-4.5 max-w-[20ch] text-[clamp(28px,3.6vw,40px)] font-bold tracking-[-0.022em] text-ink">
              Fast to deploy, predictable to run.
            </h2>
            <div className="mt-4.5 grid grid-cols-2 gap-6 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-[38px] font-bold tracking-[-0.03em] text-ink">{stat.big}</div>
                  <div className="mt-1.5 text-sm text-ink-2">{stat.label}</div>
                </div>
              ))}
            </div>
            <p className="mt-6.5 rounded-[5px] border border-line-2 bg-paper-2 px-4 py-3 font-mono text-xs text-ink-2">
              Reference benchmarks from comparable on-prem small-model deployments (incl. a third-party Fortune-500 case) — not Proof Perimeter&rsquo;s own customer results. Replaced with design-partner figures as they land.
            </p>
            <div className="mt-8.5 grid grid-cols-1 gap-x-10 gap-y-3.5 sm:grid-cols-2">
              <h3 className="col-span-full text-lg font-semibold text-ink">What we&rsquo;ll prove on your documents — before you commit</h3>
              <ul className="m-0 list-none p-0">
                <li className="relative mt-3 pl-6.5 text-[15.5px] text-ink-2">
                  <span className="absolute top-2.25 left-0 h-2.75 w-2.75 -rotate-45 border-b-2 border-l-2 border-live" />
                  Field-level accuracy on <em className="not-italic font-semibold text-ink">your</em> worst documents via a blind benchmark.
                </li>
                <li className="relative mt-3 pl-6.5 text-[15.5px] text-ink-2">
                  <span className="absolute top-2.25 left-0 h-2.75 w-2.75 -rotate-45 border-b-2 border-l-2 border-live" />
                  Your actual Sovereign-AI-Gap number — the % of regulated inference leaving your perimeter today.
                </li>
              </ul>
              <ul className="m-0 list-none p-0">
                <li className="relative mt-3 pl-6.5 text-[15.5px] text-ink-2">
                  <span className="absolute top-2.25 left-0 h-2.75 w-2.75 -rotate-45 border-b-2 border-l-2 border-live" />
                  A per-account cost-at-volume comparison: projected cloud spend vs amortized on-prem.
                </li>
              </ul>
            </div>
            <div className="mt-10">
              <BtnSolid href="/book-demo">Request a demo</BtnSolid>
            </div>
          </div>
        </section>

        {/* Diagnostic band */}
        <section id="audit" className="border-t border-line py-16">
          <div className="mx-auto max-w-[1120px] px-7">
            <FadeIn className="grid grid-cols-1 items-center gap-11 rounded-lg bg-signal p-8 text-white md:grid-cols-[1.2fr_1fr] md:p-13.5">
              <div>
                <Eyebrow tone="band">The diagnostic</Eyebrow>
                <h2 className="mt-4.5 max-w-[18ch] text-[clamp(26px,3.2vw,36px)] font-bold tracking-[-0.022em] text-white">
                  Two numbers, on your data, before you commit.
                </h2>
                <p className="mt-4.5 max-w-[52ch] text-base text-[#D2E2F2]">
                  Most vendors show you a demo on <em className="not-italic font-semibold">their</em> documents. We start with yours. The Sovereign-AI-Gap Audit gives you the figure no one can currently produce. The free blind benchmark shows we can close it. Neither requires moving a single document outside your environment.
                </p>
                <div className="mt-7 flex flex-wrap gap-3.5">
                  <Link
                    href="/book-demo"
                    className="inline-flex items-center justify-center gap-2 rounded-[5px] bg-white px-4.5 py-2.75 text-[15px] font-semibold text-signal transition-colors hover:bg-[#E7F0F8]"
                  >
                    Request a demo
                  </Link>
                </div>
                <p className="mt-4.5 font-mono text-xs text-[#A9C6E5]">
                  Both run on your data, in your environment, at no cost. A diagnostic, not a demo.
                </p>
              </div>
              <div className="grid gap-3.5">
                <div className="rounded-md border border-white/20 bg-white/8 px-5.5 py-5">
                  <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#9DC3EC]">Number 1 · the exposure</div>
                  <div className="mt-2 text-[15px] text-[#EAF2FA]">
                    What share of your regulated inference leaves the perimeter today — by workflow and sensitivity tier.
                  </div>
                </div>
                <div className="rounded-md border border-white/20 bg-white/8 px-5.5 py-5">
                  <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#9DC3EC]">Number 2 · the fix</div>
                  <div className="mt-2 text-[15px] text-[#EAF2FA]">
                    Field-level accuracy on your worst documents, fine-tuned to your cases on a blind benchmark.
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-4.5 max-w-[20ch] text-[clamp(28px,3.6vw,40px)] font-bold tracking-[-0.022em] text-ink">
              The questions buyers ask first.
            </h2>
            <div className="mt-9 border-t border-line">
              {faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5.5 text-[17.5px] font-semibold text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="flex-none font-mono text-xl text-signal transition-transform duration-200 group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-[74ch] pb-6 text-[15.5px] text-ink-2">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Close */}
        <section className="border-t border-line px-7 py-24 text-center">
          <div className="mx-auto max-w-[1120px]">
            <Eyebrow className="justify-center">We&rsquo;ll prove it on your documents</Eyebrow>
            <h2 className="mx-auto mt-4.5 max-w-[22ch] text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.022em] text-ink">
              The cloud can&rsquo;t keep your inference in-perimeter. We can — and we&rsquo;ll prove it on your documents.
            </h2>
            {/* <p className="mx-auto mt-5.5 max-w-[56ch] text-lg text-ink-2">
              Run the Sovereign-AI-Gap Audit, see your number, and watch a blind benchmark clear the accuracy bar on your worst documents — all without a single file leaving your environment. Then keep the inference where it belongs: on-device, with proof per document.
            </p> */}
            <div className="mt-8 flex flex-wrap justify-center gap-3.5">
              <BtnSolid href="/book-demo">Request a demo</BtnSolid>
              {/* <BtnGhost href="#how">Free POC on your hardest documents</BtnGhost> */}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
