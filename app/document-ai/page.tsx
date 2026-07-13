import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { FadeIn } from "@/components/FadeIn";
import { Eyebrow } from "@/components/Eyebrow";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { DeploymentTierTabs } from "@/components/DeploymentTierTabs";

export const metadata: Metadata = {
  title: "Document AI",
  description:
    "Free document AI with your own model key — templates, workflows, confidence gates, human review, batch and API. Every extraction carries a provenance record. On-prem when you need it.",
  alternates: { canonical: "/document-ai" },
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

const heroRecord: [string, string, boolean?][] = [
  ["document", "doc_8fa2c91 · kyc_individual_v3"],
  ["field", "date_of_birth → 1974-03-11"],
  ["model", "gpt-4o-mini (2026-05-13)"],
  ["inference", "openai · eu-west-1 · customer key ····4f2a", true],
  ["confidence", "0.982"],
  ["timestamp", "2026-07-10T09:14:22Z"],
  ["integrity", "sha256:1f3c9b7e…"],
];

const capabilities = [
  "Interactive upload",
  "Templates",
  "Extraction schemas",
  "Workflows",
  "Confidence gates",
  "Human review",
  "Batch processing",
  "REST API & webhooks",
  "JSON / CSV / XLSX / DB",
  "Provenance log",
];

const productCells = [
  {
    num: "TEMPLATES",
    title: "Set the rules once",
    description:
      "Define the fields, the types, the validation rules and the failure conditions once. A passport template knows an MRZ checksum should pass. A bank statement template knows the balances should reconcile. The model isn't guessing what you wanted. You've told it.",
  },
  {
    num: "WORKFLOWS",
    title: "A confidence gate in the middle",
    description:
      "Classify → extract → validate → route. Set a threshold per field, not per document. High-confidence fields go straight through; anything under the line lands in a review queue with the source region highlighted. Straight-through processing, with a record of why each field went through.",
  },
  {
    num: "HUMAN REVIEW",
    title: "Built into the workflow",
    description:
      "A reviewer sees the field, the bounding box, the model's confidence and the provenance record side by side. Corrections are saved. They become evaluation data, and on the enterprise tier, fine-tuning data.",
  },
  {
    num: "INTERFACES",
    title: "Interactive, batch, or headless",
    description:
      "Drag a file in. Drop 40,000 into a batch. Or never open the app at all and POST to the API with a webhook on the other side. Same templates, same workflows, same audit trail in all three.",
  },
  {
    num: "EXPORT",
    title: "Export where you need it",
    description:
      "JSON, CSV, XLSX, or straight into a database. The schema stays the same across runs, so your downstream code doesn't break when a model version changes.",
  },
];

const byokArgs = [
  {
    title: "We've already tuned the prompts.",
    description:
      "Field-scoped prompts, schema-constrained output and per-document-type instruction sets, tuned against a benchmark suite, and measured. Fewer retries, less malformed JSON, higher first-pass field accuracy.",
  },
  {
    title: "We only send the model the pages it needs.",
    description:
      "Page routing, region cropping and layout-aware chunking mean a 40-page loan file doesn't become 40 pages of tokens. Cost per document falls because the token count falls.",
  },
  {
    title: "Small models where a small model is enough.",
    description:
      "Structured, high-confidence fields go to a small model; genuinely ambiguous ones escalate. Per-field routing, not per-document.",
  },
  {
    title: "Caching, batching and concurrency you don't have to build.",
    description:
      "Repeated layouts hit cache. Batch jobs use the provider's batch pricing. Rate limits are handled once, correctly, instead of once per team.",
  },
  {
    title: "A way to test before you trust it.",
    description:
      "Run a new model version against your own labelled documents before you trust it. Watch accuracy per field, per document type, over time. Most teams don't build one. Then someone asks how accurate it is.",
  },
];

const tiers = [
  {
    name: "Individual",
    price: "FREE — WITH YOUR OWN KEY",
    sub: "The full workspace, running on your model provider.",
    features: [
      "Unlimited documents, templates and workflows",
      "Bring your own key: OpenAI, Anthropic, Google, Bedrock, or any compatible endpoint",
      "Interactive upload, batch and API access",
      "Human-in-the-loop review and all export formats",
      "Full provenance log on every document",
      "Community support",
    ],
    cta: "Start free",
    feature: false,
  },
  {
    name: "Enterprise",
    price: "CONTACT US",
    sub: "Proof Perimeter's proprietary document processing models — hosted or on-premises.",
    features: [
      "Proof Perimeter's proprietary, tuned models",
      "Deploy hosted, in a private cloud, or fully on-premises; air-gappable when required",
      "Fine-tuning on your corrections and your documents",
      "Custom workflows, legacy core connectors, system-of-record integration",
      "SSO, RBAC, maker-checker review, admin controls",
      "Governance dashboard: residency map, exportable conformity pack",
      "Deployment support and an SLA",
    ],
    cta: "Get in touch",
    feature: true,
  },
];

const personas = [
  {
    title: "The engineer building this in-house",
    description: "You have a Textract call, a prompt, and a growing folder of edge cases. Start free with your own key.",
  },
  {
    title: "The onboarding operations lead",
    description:
      "You automated the easy documents two years ago. The hard ones — the faxes, the bilingual IDs, the handwriting — still go through people. Confidence gates and review queues move them.",
  },
  {
    title: "The MLRO and the compliance officer",
    description:
      "You're accountable for decisions made on documents you can't trace. Every extraction here carries a record of the model that produced it.",
  },
  {
    title: "The CISO",
    description:
      "In the free tier: your key, your provider, your region, nothing retained. On-prem: nothing leaves. Both are in the record.",
  },
  {
    title: "The Head of Model Risk",
    description: "You can test it yourself: accuracy per field, per document type, on your own worst files, before you commit to anything.",
  },
];

const faqs = [
  {
    question: "Is it really free?",
    answer:
      "Yes, with your own LLM API key. The full workspace — templates, workflows, batch, API, review, export, provenance — with no document limit. You pay your model provider directly, at their rates. We don't charge anything. If you'd rather not manage a key, the Enterprise tier runs on Proof Perimeter's own proprietary document processing models.",
  },
  {
    question: "Do my documents pass through your servers?",
    answer:
      "On the hosted tiers, yes — that's what makes it a web app. Your files are processed and then dropped; we don't retain document content or extracted values beyond the run, and the provenance record states exactly which provider and region handled the inference. If your regulator, your risk function, or your own judgement says that isn't good enough for a given workload, that's what the enterprise deployment is for: the same product, running inside your network, with no egress at all.",
  },
  {
    question: "Why is it better than calling the API myself?",
    answer:
      "Field-scoped prompts and schema-constrained output tuned against a benchmark set; layout-aware chunking so you don't pay for tokens the model doesn't need; per-field model routing; caching, batching and retry logic you'd otherwise build twice. And a way to test model changes, which almost nobody builds for themselves. The result is fewer tokens per document, fewer retries, and a first-pass accuracy number you can show someone.",
  },
  {
    question: "Which models can I use?",
    answer:
      "OpenAI, Anthropic, Google, Amazon Bedrock, and any OpenAI-compatible endpoint, with your own key, on the Individual tier. On Enterprise, Proof Perimeter's own proprietary extraction models — hosted or running locally on your hardware, optionally fine-tuned on your documents.",
  },
  {
    question: "Do I need to be technical?",
    answer: "To upload a document, define a template and export a spreadsheet: no. To wire the API into a pipeline: about an afternoon.",
  },
  {
    question: "How accurate is it?",
    answer:
      "That depends on your documents. Anyone who gives you a single number is guessing. Bring your worst files — the faxes, the handwriting, the bilingual IDs — and see the numbers before you commit to anything.",
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

export default function DocumentAi() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <SiteNav />
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-21 pb-19">
          <div className="mx-auto max-w-[1120px] px-7">
            <div className="max-w-[640px]">
              <h1 className="hero-animate-h1 max-w-[16ch] text-[clamp(34px,4.6vw,52px)] font-bold tracking-[-0.022em] text-ink">
                Document AI you can start using in a minute.
              </h1>
              <p className="hero-animate-p mt-6 max-w-[54ch] text-[19px] text-ink-2">
                Free with your own model key. Templates, workflows, confidence gates, human review, batch and API.
              </p>
              <div className="hero-animate-cta mt-8 flex flex-wrap gap-3.5">
                <BtnSolid href="/book-demo">Start free</BtnSolid>
                <BtnGhost href="/book-demo">Book an enterprise walkthrough</BtnGhost>
              </div>
              <div className="hero-animate-trust mt-8.5 flex flex-wrap gap-x-5 gap-y-2.5 pt-6">
                {["Free with your LLM Model key", "No document retention", "On-prem when you need it"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 font-mono text-[12.5px] text-ink-2">
                    <span className="h-[5px] w-[5px] rounded-[1px] bg-signal" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="hero-animate-image mt-11 max-w-[640px] overflow-hidden rounded-lg border border-line-2 bg-panel shadow-[0_24px_60px_-38px_rgba(20,70,124,0.55)]">
              <div className="flex items-center gap-2.25 border-b border-line bg-paper-2 px-4.5 py-3.5">
                <span className="h-[7px] w-[7px] rounded-full bg-signal" />
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-2">Provenance record</span>
              </div>
              <div className="p-4.5 font-mono text-[13px] leading-[1.9]">
                {heroRecord.map(([k, v, hl]) => (
                  <div key={k} className="grid grid-cols-[110px_1fr] gap-3">
                    <span className="text-ink-2">{k}</span>
                    <span className={hl ? "font-semibold text-live" : "text-ink"}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Capability strip */}
        <section className="border-t border-line bg-paper-2 py-6">
          <div className="mx-auto max-w-[1120px] px-7">
            <div className="flex flex-wrap gap-2">
              {capabilities.map((item) => (
                <span
                  key={item}
                  className="inline-block rounded-full border border-line-2 bg-panel px-2.5 py-0.5 font-mono text-[13px] whitespace-nowrap text-signal"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Product */}
        <section id="product" className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>The product</Eyebrow>
            <h2 className="mt-4.5 max-w-[26ch] text-[clamp(28px,3.6vw,38px)] font-bold tracking-[-0.022em] text-ink">
              Parsing a document is the easy part. Everything after it is the work.
            </h2>
            <p className="mt-5.5 max-w-[70ch] text-[19px] text-ink-2">
              Most document AI is an API that just hands you a JSON. What you actually need is: a definition of what &ldquo;correct&rdquo;
              looks like, a way to catch the 4% that&rsquo;s wrong, a person to look at it, a path into your system of record, and a way
              to explain any of it six months later.
            </p>
            <p className="max-w-[70ch] text-[19px] text-ink-2">
              Proof Perimeter does that part. It works the same way whether the model is OpenAI&rsquo;s, yours, or one running inside
              your own network.
            </p>

            <div className="mt-10.5 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
              {productCells.map((cell, i) => (
                <FadeIn
                  key={cell.num}
                  delay={i * 80}
                  className={`bg-panel p-6.5 ${i === productCells.length - 1 ? "sm:col-span-2" : ""}`}
                >
                  <div className="font-mono text-[11px] tracking-[0.1em] text-signal">{cell.num}</div>
                  <h3 className="mt-3.5 text-[17px] font-semibold tracking-[-0.01em] text-ink">{cell.title}</h3>
                  <p className="mt-2.5 text-sm text-ink-2">{cell.description}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* BYO key */}
        <section className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>Bring your own key</Eyebrow>
            <h2 className="mt-4.5 max-w-[20ch] text-[clamp(28px,3.6vw,38px)] font-bold tracking-[-0.022em] text-ink">
              Bring your own model. It works better here.
            </h2>
            <p className="mt-5.5 max-w-[70ch] text-[19px] text-ink-2">
              You can call OpenAI or Anthropic yourself. Most teams who do end up with a prompt nobody wants to touch, a JSON parser
              wrapped in three try/catch blocks, no evaluation set, and a bill that grows with the length of the document rather than
              what&rsquo;s in it.
            </p>

            <div className="mt-10.5 border-t border-line">
              {byokArgs.map((arg) => (
                <div key={arg.title} className="grid gap-1.5 border-b border-line py-6.5 md:grid-cols-[minmax(0,34ch)_1fr] md:items-baseline md:gap-10">
                  <div className="text-[18px] font-semibold tracking-[-0.01em] text-ink">{arg.title}</div>
                  <p className="m-0 text-[14.7px] text-ink-2">{arg.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Provenance / deployment tiers */}
        <section id="record" className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <FadeIn className="rounded-lg bg-signal p-8 text-white md:p-13.5">
              <Eyebrow tone="band">Provenance</Eyebrow>
              <h2 className="mt-4.5 max-w-[22ch] text-[clamp(26px,3.2vw,36px)] font-bold tracking-[-0.022em] text-white">
                Every document comes with a record of where it was processed.
              </h2>
              <p className="mt-4.5 max-w-[60ch] text-base text-[#D2E2F2]">
                Ask where your document AI runs and you&rsquo;ll get an architecture diagram. Ask where one specific KYC pack was
                processed, on which model version, under whose key — and usually nobody knows.
              </p>

              <div className="mt-9 grid gap-11 md:grid-cols-[1fr_1fr] md:items-start">
                <DeploymentTierTabs />
                <p className="border-l-2 border-[#7ED4A6]/70 pl-4 text-[14.5px] text-[#D2E2F2]">
                  Every tier has the audit trail. What you&rsquo;re paying for is what it says.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="mt-4.5 text-[clamp(28px,3.6vw,38px)] font-bold tracking-[-0.022em] text-ink">Pricing</h2>

            <div className="mx-auto mt-10.5 grid max-w-[860px] grid-cols-1 gap-6 sm:grid-cols-2">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`flex flex-col rounded-md border p-7 ${tier.feature ? "border-signal bg-paper-2" : "border-line bg-panel"}`}
                >
                  <div className="text-xl font-semibold tracking-[-0.01em] text-ink">{tier.name}</div>
                  <div className="mt-1 font-mono text-[12.5px] tracking-[0.05em] text-signal">{tier.price}</div>
                  <p className="mt-4.5 text-[14.5px] text-ink-2">{tier.sub}</p>
                  <ul className="m-0 mt-1 flex-1 list-none p-0">
                    {tier.features.map((f) => (
                      <li key={f} className="relative py-1.75 pl-6.5 text-sm text-ink-2">
                        <span className="absolute top-2.25 left-0 h-2.75 w-2.75 -rotate-45 border-b-2 border-l-2 border-live" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    {tier.feature ? (
                      <BtnSolid href="/book-demo">{tier.cta}</BtnSolid>
                    ) : (
                      <BtnGhost href="/book-demo">{tier.cta}</BtnGhost>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who uses it */}
        <section className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>Who uses it</Eyebrow>
            <h2 className="mt-4.5 text-[clamp(28px,3.6vw,38px)] font-bold tracking-[-0.022em] text-ink">Who uses Proof Perimeter</h2>

            <div className="mt-10.5 border-t border-line">
              {personas.map((persona) => (
                <div key={persona.title} className="grid gap-1 border-b border-line py-6 md:grid-cols-[minmax(0,30ch)_1fr] md:items-baseline md:gap-10">
                  <div className="text-[17.5px] font-semibold text-ink">{persona.title}</div>
                  <p className="m-0 text-[14.7px] text-ink-2">{persona.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mt-4.5 text-[clamp(28px,3.6vw,38px)] font-bold tracking-[-0.022em] text-ink">Common questions</h2>

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
            <h2 className="mx-auto max-w-[20ch] text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.022em] text-ink">
              Know where every document was processed.
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3.5">
              <BtnSolid href="/book-demo">Start free with your own key</BtnSolid>
              <BtnGhost href="/book-demo">Talk to us about enterprise</BtnGhost>
            </div>
            <div className="mt-6.5 flex flex-wrap justify-center gap-x-5 gap-y-2.5">
              {["Free with your LLM Model key", "No document retention", "On-prem when you need it"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 font-mono text-[12.5px] text-ink-2">
                  <span className="h-[5px] w-[5px] rounded-[1px] bg-signal" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
