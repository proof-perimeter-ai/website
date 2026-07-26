import type { Metadata } from "next";
import { FileWarning, Layers, FileDiff } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { FadeIn } from "@/components/FadeIn";
import { Eyebrow } from "@/components/Eyebrow";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BtnSolid, BtnGhost } from "@/components/Button";
import { CustomerLogoMarquee } from "@/components/CustomerLogoMarquee";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";

export const metadata: Metadata = {
  title: "Document AI for Legal | Proof Perimeter",
  description: "Extract clauses, separate document productions, and redact at scale — without losing meaning-critical formatting.",
  alternates: { canonical: "/solutions/legal" },
};

const cardHover =
  "transition-all duration-300 hover:-translate-y-1 hover:border-signal/40 hover:shadow-[0_20px_40px_-30px_rgba(20,70,124,0.45)]";

const painPoints = [
  {
    icon: FileWarning,
    title: "Risk terms hide in exhibits and schedules",
    description:
      "Critical obligations and risk terms are buried deep inside definitions, exhibits, and schedules within dense M&A agreements, MSAs, and DPAs.",
  },
  {
    icon: Layers,
    title: "Document dumps need manual separation",
    description:
      "Large due diligence and discovery productions contain thousands of pages that must be manually separated into discrete, reviewable documents.",
  },
  {
    icon: FileDiff,
    title: "Clause wording never matches a template",
    description:
      "Clause wording varies by counterparty, industry, deal size, and jurisdiction, so template-based extraction tools miss non-standard language.",
  },
];

const benefits = [
  {
    title: "Non-standard clause detection",
    description: "Non-standard clause language is flagged against approved playbook wording, with suggested redrafts, instead of manual comparison.",
  },
  {
    title: "Structured clause extraction",
    description: "Key terms, obligations, and clauses are extracted from contracts and leases, structured for review rather than buried in text.",
  },
  {
    title: "Automated document separation",
    description: "Large document productions are automatically separated into discrete, correctly classified documents, accelerating due diligence and discovery.",
  },
  {
    title: "Scales through workload spikes",
    description: "New matters, accelerating deals, and large batch submissions are handled reliably without added headcount.",
  },
  {
    title: "Consistent, irreversible redaction",
    description: "Privileged and sensitive information is redacted consistently across large document sets.",
  },
];

const regions = [
  {
    flag: "🇪🇺",
    name: "European Union",
    description: "GDPR governs how client and case data can be processed and stored. Guidance on AI use in legal practice varies by member state, fragmenting cross-border compliance.",
  },
  {
    flag: "🇦🇪",
    name: "United Arab Emirates(UAE)",
    description: "UAE data localization requirements apply to legal and government-related documents. Bilingual Arabic/English contract review is common but poorly served by generic tools.",
  },
  {
    flag: "🇮🇳",
    name: "India",
    description: "Litigation and contract volumes are digitizing quickly, but no unified national standard exists yet on AI use in legal practice.",
  },
  {
    flag: "🇸🇬",
    name: "Singapore",
    description: "As a hub for arbitration and cross-border M&A, due diligence sets span multiple jurisdictions and legal systems within a single deal.",
  },
];

const faqs = [
  {
    question: "What does Proof Perimeter do for legal document review?",
    answer:
      "It extracts key terms, obligations, and clauses from contracts and leases, separates large due diligence and discovery productions into discrete documents, and flags non-standard clause language against your playbook.",
  },
  {
    question: "Can Document AI detect non-standard clause language automatically?",
    answer:
      "Yes. Clause language is compared against approved playbook wording, with suggested redrafts, instead of manual comparison across counterparties, deal sizes, and jurisdictions.",
  },
  {
    question: "How much more accurate is Document AI than a general-purpose LLM for legal documents?",
    answer:
      "Per internal benchmarks, Proof Perimeter's fine-tuned Document AI delivers 20% higher accuracy and 50% lower token consumption than general frontier models on document-extraction tasks like clause extraction and document classification.",
  },
  {
    question: "Can privileged or confidential documents be processed with zero data egress?",
    answer:
      "Yes. Enterprise deployments support zero-egress options — cloud-hosted, within your infrastructure, or fully on-premises — so privileged and confidential documents never leave your chosen boundary.",
  },
  {
    question: "Is Bring Your Own Key free for legal teams?",
    answer:
      "Yes. The full workspace — templates, workflows, batch processing, review, and export — is free with your own model key. You pay your model provider directly, with no platform fee or document limit.",
  },
  {
    question: "How does Proof Perimeter handle regional legal compliance requirements?",
    answer:
      "Deployment adapts to where you operate — GDPR controls in the EU, data localization for legal and government documents in the UAE, and support for the multi-jurisdiction document sets common in Indian litigation and Singapore-based arbitration and cross-border M&A.",
  },
  {
    question: "How does this integrate with our existing contract lifecycle or DMS systems?",
    answer:
      "Enterprise ships with system-of-record integration and custom workflow support, so extracted clauses and classified documents land directly in the CLM or document management system your team already uses.",
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

export default function LegalSolutionPage() {
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
                <Eyebrow>Legal</Eyebrow>
              </div>
              <h1 className="hero-animate-h1 mt-4.5 max-w-[16ch] text-[clamp(32px,4.6vw,50px)] font-bold tracking-[-0.022em] text-ink">
                Document AI for legal teams.
              </h1>
              <p className="hero-animate-p mt-5 max-w-[52ch] text-[18px] text-ink-2">
                Extract clauses, separate document productions, and redact at scale — without losing meaning-critical
                formatting.
              </p>
              <div className="hero-animate-cta mt-8 flex flex-wrap gap-3.5">
                <BtnSolid href="/book-demo">Book a demo</BtnSolid>
                <BtnGhost href="/book-demo">Get started free</BtnGhost>
              </div>
            </div>
            <div className="hero-animate-image aspect-[728/680]">
              <img
                src="/assets/solutions/legal.svg"
                alt="Animated illustration of Proof Perimeter AI parsing contracts, court filings, and agreements"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <CustomerLogoMarquee />

        {/* Pain points */}
        <section className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <FadeIn>
              <Eyebrow>The problem</Eyebrow>
              <h2 className="mt-4.5 max-w-[26ch] text-[clamp(28px,3.6vw,38px)] font-bold tracking-[-0.022em] text-ink">
                Risk hides in the pages nobody has time to read.
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

        {/* Testimonials */}
        <section className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7 text-center">
            <Eyebrow>Proof in production</Eyebrow>
            <h2 className="mx-auto mt-4.5 max-w-[22ch] text-[clamp(28px,3.6vw,38px)] font-bold tracking-[-0.022em] text-ink">
              Trusted by the GRC & Tech leaders.
            </h2>

            <FadeIn className="mt-10.5">
              <TestimonialCarousel />
            </FadeIn>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <FadeIn>
              <Eyebrow>How Proof Perimeter helps</Eyebrow>
              <h2 className="mt-4.5 max-w-[26ch] text-[clamp(28px,3.6vw,38px)] font-bold tracking-[-0.022em] text-ink">
                Built for contract and case document review.
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
              Document AI built for legal document review at scale.
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
