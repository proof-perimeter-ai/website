import type { Metadata } from "next";
import { FileStack, Building2, ShieldAlert } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { FadeIn } from "@/components/FadeIn";
import { Eyebrow } from "@/components/Eyebrow";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BtnSolid, BtnGhost } from "@/components/Button";

export const metadata: Metadata = {
  title: "Document AI for Banking | Proof Perimeter",
  description:
    "Automate KYC, loan-closing, and compliance document processing across every branch, channel, and partner network.",
  alternates: { canonical: "/solutions/banking" },
};

const cardHover =
  "transition-all duration-300 hover:-translate-y-1 hover:border-signal/40 hover:shadow-[0_20px_40px_-30px_rgba(20,70,124,0.45)]";

const painPoints = [
  {
    icon: FileStack,
    title: "Loan documents don't cross-check themselves",
    description:
      "Dozens of documents and 50+ data fields must be manually cross-checked against each other before a loan can close.",
  },
  {
    icon: Building2,
    title: "Variety of KYC formats & documents",
    description:
      "Onboarding documents arrive inconsistently across branches, digital channels, and partner/DSA networks, slowing account opening.",
  },
  {
    icon: ShieldAlert,
    title: "Compliance alerts drown in supporting documents",
    description:
      "Financial crime teams manually review alerts alongside identity, transaction, and media documents just to clear false positives.",
  },
];

const benefits = [
  {
    title: "Automated data extraction",
    description: "Field-by-field data extraction from loan origination and closing documents.",
  },
  {
    title: "Consistent KYC extraction",
    description: "Consistent extraction across onboarding and KYC documents regardless of the format.",
  },
  {
    title: "Faster compliance clearance",
    description: "Structured, document-backed decisions with a built-in audit trail speed up compliance alert clearance.",
  },
  {
    title: "Automated evidence assembly",
    description: "Evidence for fraud and dispute cases is assembled automatically, cutting manual investigation time.",
  },
  {
    title: "Straight-through loan processing",
    description: "Standard loan and mortgage files move straight through, with only genuine exceptions routed to human review.",
  },
];

const regions = [
  {
    flag: "🇪🇺",
    name: "European Union",
    description:
      "Cross-border transfer rules complicate centralized KYC and onboarding. DORA extends resilience and audit requirements to AI vendors touching customer documents.",
  },
  {
    flag: "🇦🇪",
    name: "United Arab Emirates(UAE)",
    description:
      "CBUAE data residency rules require in-country KYC and loan processing. Bilingual Arabic/English documentation adds extraction complexity.",
  },
  {
    flag: "🇮🇳",
    name: "India",
    description:
      "High-volume Aadhaar/PAN KYC meets RBI's Digital Lending Guidelines. New document types and retention rules must be processed at very low per-document cost.",
  },
  {
    flag: "🇸🇬",
    name: "Singapore",
    description:
      "As a trade and correspondent banking hub, document sets arrive in varied Southeast Asian formats. MAS technology risk guidance sets a high explainability bar.",
  },
];

const faqs = [
  {
    question: "What does Proof Perimeter do for banking document processing?",
    answer:
      "Proof Perimeter classifies, extracts, and reviews the documents banking teams handle most — loan-closing packages, KYC and onboarding files, compliance alerts, and trade finance documents — with field-level provenance so every extracted value can be traced back to its source.",
  },
  {
    question: "Can Document AI cross-check loan-closing packages automatically?",
    answer:
      "Yes. Field-by-field cross-checking flags discrepancies across the dozens of documents and 50+ data fields in a loan-closing package instead of relying on manual side-by-side review.",
  },
  {
    question: "How much more accurate is Document AI than a general-purpose LLM for banking documents?",
    answer:
      "Per internal benchmarks, Proof Perimeter's fine-tuned Document AI delivers 20% higher accuracy and 50% lower token consumption than general frontier models on document-extraction tasks like KYC and loan document processing.",
  },
  {
    question: "Can banking documents be processed with zero data egress?",
    answer:
      "Yes. Enterprise deployments support zero-egress options — cloud-hosted, within your infrastructure, or fully on-premises — so KYC, loan, and compliance documents never need to leave your chosen boundary.",
  },
  {
    question: "Is Bring Your Own Key free for banking teams?",
    answer:
      "Yes. The full workspace — templates, workflows, batch processing, review, and export — is free with your own model key (OpenAI, Anthropic, Google). You pay your provider directly, with no platform fee or document limit.",
  },
  {
    question: "How does Proof Perimeter handle regional banking compliance requirements?",
    answer:
      "Deployment and processing adapt to where you operate — in-country processing for CBUAE (UAE) and RBI (India) requirements, cross-border controls for DORA and GDPR (EU), and explainable decisioning aligned with MAS (Singapore) guidelines.",
  },
  {
    question: "How does this integrate with our core banking or loan origination systems?",
    answer:
      "Enterprise ships with legacy core system connectors and system-of-record integration, so extraction results land directly in the CBS, LOS, or compliance systems your team already uses.",
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

export default function BankingSolutionPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <SiteNav />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden pt-24 pb-20">
          <div aria-hidden className="docai-v2-hero-bg pointer-events-none absolute inset-0" />
          <div
            aria-hidden
            className="docai-v2-hero-glow pointer-events-none absolute top-[-160px] left-1/2 h-[520px] w-[820px] -translate-x-1/2"
          />
          <div className="relative mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-10 px-7 lg:grid-cols-2">
            <div>
              <div className="hero-animate-badge">
                <Eyebrow>Banking</Eyebrow>
              </div>
              <h1 className="hero-animate-h1 mt-4.5 max-w-[16ch] text-[clamp(32px,4.6vw,50px)] font-bold tracking-[-0.022em] text-ink">
                Document AI for banking operations.
              </h1>
              <p className="hero-animate-p mt-5 max-w-[52ch] text-[18px] text-ink-2">
                Automate KYC, loan-closing, and compliance document processing across every branch, channel, and partner
                network.
              </p>
              <div className="hero-animate-cta mt-8 flex flex-wrap gap-3.5">
                <BtnSolid href="/book-demo">Book a demo</BtnSolid>
                <BtnGhost href="/book-demo">Get started free</BtnGhost>
              </div>
            </div>
            <div className="hero-animate-image aspect-[728/680]">
              <img
                src="/assets/solutions/banking.svg"
                alt="Animated illustration of Proof Perimeter AI parsing KYC documents, account opening forms, and government IDs"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Pain points */}
        <section className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <FadeIn>
              <Eyebrow>The problem</Eyebrow>
              <h2 className="mt-4.5 max-w-[26ch] text-[clamp(28px,3.6vw,38px)] font-bold tracking-[-0.022em] text-ink">
                Banking documents don&rsquo;t stay inside one format.
              </h2>
            </FadeIn>

            <div className="mt-10.5 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {painPoints.map((point, i) => (
                <FadeIn key={point.title} delay={i * 90} className={`group rounded-md border border-line bg-panel p-6.5 ${cardHover}`}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-signal/10 text-signal transition-all duration-300 group-hover:scale-110 group-hover:bg-signal/15">
                    <point.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.01em] text-ink">{point.title}</h3>
                  <p className="mt-2.5 text-sm text-ink-2">{point.description}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <FadeIn>
              <Eyebrow>How Proof Perimeter helps</Eyebrow>
              <h2 className="mt-4.5 max-w-[26ch] text-[clamp(28px,3.6vw,38px)] font-bold tracking-[-0.022em] text-ink">
                Built for the documents banking runs on.
              </h2>
            </FadeIn>

            <div className="mt-10.5 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, i) => (
                <FadeIn
                  key={benefit.title}
                  delay={i * 70}
                  className={`group bg-panel p-6.5 transition-colors duration-300 hover:bg-paper-2 ${
                    i === benefits.length - 1 ? "sm:col-span-2" : ""
                  }`}
                >
                  <h3 className="text-[15.5px] font-semibold tracking-[-0.01em] text-ink transition-transform duration-200 group-hover:translate-x-0.5">
                    {benefit.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-ink-2">{benefit.description}</p>
                </FadeIn>
              ))}
            </div>

            <div className="mt-10.5 flex justify-center">
              <BtnSolid href="/book-demo">Book a demo</BtnSolid>
            </div>
          </div>
        </section>

        {/* Regions */}
        <section className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <FadeIn>
              <Eyebrow>Where you operate</Eyebrow>
              <h2 className="mt-4.5 max-w-[24ch] text-[clamp(28px,3.6vw,38px)] font-bold tracking-[-0.022em] text-ink">
                Regional pain points, handled.
              </h2>
            </FadeIn>

            <div className="mt-10.5 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {regions.map((region, i) => (
                <FadeIn key={region.name} delay={i * 90} className={`group rounded-md border border-line bg-panel p-8 ${cardHover}`}>
                  <span className="inline-block text-6xl transition-transform duration-300 group-hover:scale-110">{region.flag}</span>
                  <h3 className="mt-4 text-[19px] font-semibold tracking-[-0.01em] text-ink">{region.name}</h3>
                  <p className="mt-2.5 text-[15px] text-ink-2">{region.description}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <FadeIn>
              <Eyebrow>Questions</Eyebrow>
              <h2 className="mt-4.5 text-[clamp(28px,3.6vw,38px)] font-bold tracking-[-0.022em] text-ink">Common questions</h2>
            </FadeIn>

            <div className="mt-9 border-t border-line">
              {faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5.5 text-[17.5px] font-semibold text-ink transition-colors duration-150 marker:content-none hover:text-signal [&::-webkit-details-marker]:hidden">
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
          <FadeIn className="mx-auto max-w-[1120px]">
            <h2 className="mx-auto max-w-[22ch] text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.022em] text-ink">
              Document AI built for regulated banking operations.
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3.5">
              <BtnSolid href="/book-demo">Book a demo</BtnSolid>
              <BtnGhost href="/book-demo">Get started free</BtnGhost>
            </div>
          </FadeIn>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
