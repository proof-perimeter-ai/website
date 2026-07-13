import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { FadeIn } from "@/components/FadeIn";
import { Eyebrow } from "@/components/Eyebrow";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Free Document AI Platform",
  description:
    "Frontier AI for regulated document processing. Free with your own API key — templates, workflows, batch, API, review, export, and provenance on every document. No document limit.",
  alternates: { canonical: "/document-ai-v2" },
};

const cardHover =
  "transition-all duration-300 hover:-translate-y-1 hover:border-signal/40 hover:shadow-[0_20px_40px_-30px_rgba(20,70,124,0.45)]";

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

const heroPills = ["Free with your own API key", "Higher accuracy, lesser tokens", "Unlimited documents"];

const painPoints = [
  {
    title: "AI not optimized for your documents",
    description:
      "Generic AI tools can read a document, but they don't come with templates for KYC packets or claims files, review queues for exceptions.",
  },
  {
    title: "Manual review doesn't scale with volume",
    description: "Every document that falls out of automation becomes a queue, a reviewer, and a delay you don't get back.",
  },
  {
    title: "Legacy IDP wasn't built for this decade",
    description:
      "Rule-based extraction breaks on the exception — and the exception is most of what a regulated document actually contains.",
  },
];

const capabilities = [
  { name: "Templates", description: "Pre-built and custom extraction templates for KYC, claims, LC, loan, and policy documents" },
  { name: "Workflows", description: "Multi-step pipelines — classification → extraction → review → export" },
  { name: "Batch processing", description: "Run thousands of documents in a single job, with no per-document ceiling" },
  { name: "API", description: "Full programmatic access, for integration into your CBS, LOS, or claims system" },
  { name: "Review", description: "Human-in-the-loop correction queues, with confidence scoring to route only what needs a person" },
  { name: "Export", description: "Structured output to the formats your downstream systems already expect" },
  { name: "Provenance", description: "Field-level lineage on every extracted value — what the model saw, what it decided, and why" },
];

const deepDive = [
  {
    num: "AI INFERENCE",
    description:
      "Every extraction call runs on models tuned for regulated document structures like KYC fields, claims tables, policy clauses.",
  },
  {
    num: "AI HARNESS",
    description:
      "Prompt orchestration, context windowing, and confidence-based routing wrap every inference call, keeping extraction accurate across templates, edge cases, and multi-page documents.",
  },
  {
    num: "COMPLETE SOLUTION",
    description:
      "Full platform handling caching, batching, scale, and concurrency to handle enterprise volume.",
  },
];

const personas = [
  { title: "Customer & Vendor Onboarding", description: "Every stalled application is a customer waiting on a document someone still has to read by hand." },
  { title: "KYC / AML Teams", description: "One missed field in a beneficial ownership document is a compliance gap." },
  { title: "Accounts Payable", description: "Invoice line items that don't match the PO get caught in a spreadsheet, days after the payment should've gone out." },
  { title: "Claims Examiners", description: "A claims file with an inconsistency buried on page 40 is the one that gets approved anyway, until an audit finds it." },
];

const comparisonRows: [string, string, string][] = [
  ["Cost", "Free — pay your model provider directly", "Enterprise license"],
  ["Model", "Your choice: OpenAI, Anthropic, Google, and other supported providers", "Proof Perimeter's proprietary Document AI, fine-tuned for regulated documents"],
  ["Deployment", "Cloud, via your provider's API", "Cloud-hosted, your infrastructure, or fully on-premise"],
  ["Data egress", "Governed by your model provider's terms", "Zero egress available (on-premise)"],
  ["Document limit", "None", "None"],
  ["Workspace", "Full — templates, workflows, batch, API, review, export, provenance", "Full — same workspace"],
  ["Best fit", "An already-approved model vendor, and a team that wants to move fast", "A purpose-built model, deployment control, or a zero-egress requirement"],
];

const faqs = [
  {
    question: "Is Bring Your Own Key actually free?",
    answer:
      "Yes. The full workspace — templates, workflows, batch processing, API, review, export, provenance — has no document limit and no platform fee. You pay your model provider directly, at their published rates.",
  },
  {
    question: "What happens to my documents on the Bring Your Own Key path?",
    answer:
      "They're processed under your model provider's data handling terms — the same terms already governing any other use of that API key inside your organization. Where that boundary isn't acceptable for a given document type, that's what the Enterprise on-premise option is for.",
  },
  {
    question: "Can we move from Bring Your Own Key to Enterprise later?",
    answer: "Yes. Templates, workflows, and review configurations carry over — you're swapping the model underneath the workspace, not rebuilding it.",
  },
  {
    question: "What's actually different about Document AI versus a general-purpose model?",
    answer:
      "It's fine-tuned specifically on regulated document types — KYC, claims, LC, loan, and policy documents — rather than adapted from a general-purpose model. In our benchmarking on standard document-extraction tasks, that delivers 20% higher accuracy and 50% lower token consumption than general-purpose frontier models on the same task.",
  },
  {
    question: "Which Enterprise deployment should we pick?",
    answer:
      "Cloud-hosted if speed to production matters most. Your-infrastructure if you need the model inside your own tenancy for governance reasons. On-premise if the data cannot leave the building under any circumstance.",
  },
  {
    question: "Which model providers work with Bring Your Own Key?",
    answer: "OpenAI, Anthropic, and Google at launch, with more being added.",
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

export default function DocumentAiV2() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <SiteNav />
      <main className="flex-1">
        {/* Hero — centered */}
        <section className="relative overflow-hidden pt-24 pb-20">
          <div aria-hidden className="docai-v2-hero-bg pointer-events-none absolute inset-0" />
          <div
            aria-hidden
            className="docai-v2-hero-glow pointer-events-none absolute top-[-160px] left-1/2 h-[520px] w-[820px] -translate-x-1/2"
          />
          <div className="relative mx-auto max-w-[820px] px-7 text-center">
            <Eyebrow className="hero-animate-badge justify-center">Frontier AI for regulated document processing</Eyebrow>
            <h1 className="hero-animate-h1 mx-auto mt-5.5 max-w-[18ch] text-[clamp(34px,5.4vw,56px)] font-bold tracking-[-0.022em] text-ink">
              Document AI platform, built for outcomes.
            </h1>
            <div className="hero-animate-pills mt-7 flex flex-wrap justify-center gap-2.5">
              {heroPills.map((pill) => (
                <span
                  key={pill}
                  className="inline-block rounded-full border border-line-2 bg-panel px-3.5 py-1 font-mono text-[13px] whitespace-nowrap text-signal transition-colors hover:border-signal hover:bg-paper-2"
                >
                  {pill}
                </span>
              ))}
            </div>
            <div className="hero-animate-cta mt-9 flex flex-wrap justify-center gap-3.5">
              <BtnSolid href="/book-demo">Get started for free</BtnSolid>
              <BtnGhost href="/book-demo">Book a demo</BtnGhost>
            </div>
          </div>
          <div className="hero-animate-image relative mx-auto mt-13 max-w-[960px] px-7">
            <video
              className="w-full rounded-lg border border-line-2 bg-panel shadow-[0_24px_60px_-38px_rgba(20,70,124,0.55)]"
              src="/assets/videos/document-ai-v3.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </section>

        {/* Pain points */}
        <section className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>The problem</Eyebrow>
            <h2 className="mt-4.5 max-w-[24ch] text-[clamp(28px,3.6vw,38px)] font-bold tracking-[-0.022em] text-ink">
              Generic AI wasn&rsquo;t built to read regulated documents
            </h2>

            <div className="mt-10.5 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {painPoints.map((point, i) => (
                <FadeIn key={point.title} delay={i * 90} className={`rounded-md border border-line bg-panel p-6.5 ${cardHover}`}>
                  <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">{point.title}</h3>
                  <p className="mt-2.5 text-sm text-ink-2">{point.description}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>The workspace</Eyebrow>
            <h2 className="mt-4.5 max-w-[24ch] text-[clamp(28px,3.6vw,38px)] font-bold tracking-[-0.022em] text-ink">
              One workspace for your high-risk documents
            </h2>
            <p className="mt-5.5 max-w-[70ch] text-[19px] text-ink-2">
              Get access to an end-to-end platform to run intelligent document processing workflows.
            </p>

            <div className="mt-10.5 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((cap, i) => (
                <FadeIn
                  key={cap.name}
                  delay={i * 70}
                  className={`bg-panel p-6.5 transition-colors duration-300 hover:bg-paper-2 ${
                    i === capabilities.length - 1 ? "sm:col-span-2 lg:col-span-3" : ""
                  }`}
                >
                  <div className="font-mono text-[11px] tracking-[0.1em] text-signal">{cap.name.toUpperCase()}</div>
                  <p className="mt-2.5 text-sm text-ink-2">{cap.description}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Document AI deep-dive */}
        <section className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>Document AI</Eyebrow>
            <h2 className="mt-4.5 max-w-[26ch] text-[clamp(28px,3.6vw,38px)] font-bold tracking-[-0.022em] text-ink">
              Get <span className="text-signal">20%</span> more accurate results with <span className="text-signal">50%</span> fewer
              tokens.
            </h2>
            <p className="mt-5.5 max-w-[70ch] text-[19px] text-ink-2">
              Document AI inference is built for regulated document structures like recurring fields, standard clauses, complex tables, form-based layouts.
            </p>

            <div className="mt-10.5 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {deepDive.map((cell, i) => (
                <FadeIn key={cell.num} delay={i * 90} className={`rounded-md border border-line bg-panel p-6.5 ${cardHover}`}>
                  <div className="font-mono text-[11px] tracking-[0.1em] text-signal">{cell.num}</div>
                  <p className="mt-2.5 text-sm text-ink-2">{cell.description}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Who is it for */}
        <section className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>Who it&rsquo;s for</Eyebrow>
            <h2 className="mt-4.5 max-w-[24ch] text-[clamp(28px,3.6vw,38px)] font-bold tracking-[-0.022em] text-ink">
              Built for teams handling high-risk documents.
            </h2>

            <div className="mt-10.5 border-t border-line">
              {personas.map((persona) => (
                <div
                  key={persona.title}
                  className="grid gap-1 border-b border-line py-6 transition-colors duration-300 hover:bg-paper-2 md:grid-cols-[minmax(0,30ch)_1fr] md:items-baseline md:gap-10"
                >
                  <div className="text-[17.5px] font-semibold text-ink">{persona.title}</div>
                  <p className="m-0 text-[14.7px] text-ink-2">{persona.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Path comparison */}
        <section className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>Choose your path</Eyebrow>
            <h2 className="mt-4.5 max-w-[24ch] text-[clamp(28px,3.6vw,38px)] font-bold tracking-[-0.022em] text-ink">
              Which path fits how you already work?
            </h2>

            <FadeIn className="mt-10.5 overflow-hidden rounded-md border border-line">
              <div className="grid grid-cols-[1fr_1.3fr_1.3fr] bg-paper-2">
                <div className="p-4.5" />
                <div className="p-4.5 text-[15px] font-semibold text-ink">Bring Your Own Key</div>
                <div className="p-4.5 text-[15px] font-semibold text-ink">Enterprise</div>
              </div>
              {comparisonRows.map(([label, byok, enterprise]) => (
                <div
                  key={label}
                  className="grid grid-cols-[1fr_1.3fr_1.3fr] border-t border-line transition-colors duration-300 hover:bg-paper-2"
                >
                  <div className="p-4.5 text-[13.5px] font-semibold text-ink-2">{label}</div>
                  <div className="p-4.5 text-[14.5px] text-ink">{byok}</div>
                  <div className="p-4.5 text-[14.5px] text-ink">{enterprise}</div>
                </div>
              ))}
              <div className="grid grid-cols-[1fr_1.3fr_1.3fr] items-center border-t border-line">
                <div className="p-4.5 text-[13.5px] font-semibold text-ink-2">Get started</div>
                <div className="p-4.5">
                  <BtnSolid href="/book-demo">Start free with your API key</BtnSolid>
                </div>
                <div className="p-4.5">
                  <BtnGhost href="/book-demo">Book Demo</BtnGhost>
                </div>
              </div>
            </FadeIn>

            
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mt-4.5 text-[clamp(28px,3.6vw,38px)] font-bold tracking-[-0.022em] text-ink">Common questions</h2>

            <div className="mt-9 border-t border-line">
              {faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5.5 text-[17.5px] font-semibold text-ink transition-colors marker:content-none hover:text-signal [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="flex-none font-mono text-xl text-signal transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
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
            <h2 className="mx-auto max-w-[20ch] text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.022em] text-ink">
              Free document AI platform, built for outcomes.
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3.5">
              <BtnSolid href="/book-demo">Start free with your API key</BtnSolid>
              <BtnGhost href="/book-demo">Book a demo</BtnGhost>
            </div>
            
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
