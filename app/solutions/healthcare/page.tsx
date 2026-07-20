import type { Metadata } from "next";
import { HeartPulse, ClipboardCheck, FileX } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { FadeIn } from "@/components/FadeIn";
import { Eyebrow } from "@/components/Eyebrow";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BtnSolid, BtnGhost } from "@/components/Button";

export const metadata: Metadata = {
  title: "Document AI for Healthcare | Proof Perimeter",
  description: "Unify patient history, accelerate prior authorization, and catch denials before they happen.",
  alternates: { canonical: "/solutions/healthcare" },
};

const cardHover =
  "transition-all duration-300 hover:-translate-y-1 hover:border-signal/40 hover:shadow-[0_20px_40px_-30px_rgba(20,70,124,0.45)]";

const painPoints = [
  {
    icon: HeartPulse,
    title: "Patient history is scattered across systems",
    description: "EHR notes, lab reports, imaging results, and physician narratives leave no unified view for clinical or administrative staff.",
  },
  {
    icon: ClipboardCheck,
    title: "Prior authorization is a manual scramble",
    description: "Clinical evidence must be manually gathered and validated against payer-specific policy rules before submission.",
  },
  {
    icon: FileX,
    title: "Denials trace back to missed details",
    description: "Incomplete patient information, credentialing gaps, or missing pre-authorizations often aren't caught until after submission.",
  },
];

const benefits = [
  {
    title: "Unified patient history",
    description: "A structured view of patient history is assembled automatically from EHR notes, labs, and imaging reports.",
  },
  {
    title: "Faster prior authorization",
    description: "Automated clinical evidence gathering and payer policy-rule validation bundles documentation for submission.",
  },
  {
    title: "Denials caught before submission",
    description: "Incomplete information, credentialing gaps, or missing pre-authorizations are flagged before claims go out.",
  },
  {
    title: "Automated ICD/CPT coding",
    description: "Medical codes are extracted automatically from clinical documentation, speeding reimbursement and reducing errors.",
  },
  {
    title: "One pipeline, any source format",
    description: "Scanned images, PDFs, faxes, and digital forms are all processed consistently, regardless of source EHR system.",
  },
];

const regions = [
  {
    flag: "🇪🇺",
    name: "European Union",
    description: "Patient records fall under GDPR's special category data rules. Cross-border transfer of health data between member states is tightly restricted.",
  },
  {
    flag: "🇦🇪",
    name: "United Arab Emirates(UAE)",
    description: "UAE health authorities generally mandate in-country processing of patient records. Clinical documentation is frequently bilingual with inconsistent formatting.",
  },
  {
    flag: "🇮🇳",
    name: "India",
    description: "ABDM is pushing digital health standardization, but hospital-level documentation practices remain highly inconsistent at high volume.",
  },
  {
    flag: "🇸🇬",
    name: "Singapore",
    description: "As a regional medical hub, patient documents arrive from multiple countries in varying formats under strict data governance requirements.",
  },
];

const faqs = [
  {
    question: "What does Proof Perimeter do for healthcare documentation?",
    answer:
      "It assembles a unified view of patient history from EHR notes, labs, and imaging reports, automates prior authorization evidence gathering, and extracts ICD/CPT codes from clinical documentation.",
  },
  {
    question: "Can Document AI catch claim denial risks before submission?",
    answer:
      "Yes. Incomplete patient information, credentialing gaps, and missing pre-authorizations are flagged before claims go out, instead of surfacing only after a denial.",
  },
  {
    question: "How much more accurate is Document AI than a general-purpose LLM for clinical documents?",
    answer:
      "Per internal benchmarks, Proof Perimeter's fine-tuned Document AI delivers 20% higher accuracy and 50% lower token consumption than general frontier models on document-extraction tasks like patient history assembly and medical coding.",
  },
  {
    question: "Can patient records be processed with zero data egress?",
    answer:
      "Yes. Enterprise deployments support zero-egress options — cloud-hosted, within your infrastructure, or fully on-premises — so patient records never leave your chosen boundary, which matters under GDPR special-category rules and similar health data regimes.",
  },
  {
    question: "Is Bring Your Own Key free for healthcare teams?",
    answer:
      "Yes. The full workspace — templates, workflows, batch processing, review, and export — is free with your own model key. You pay your model provider directly, with no platform fee or document limit.",
  },
  {
    question: "How does Proof Perimeter handle regional healthcare compliance requirements?",
    answer:
      "Deployment adapts to where you operate — GDPR special-category controls in the EU, in-country processing mandated by UAE health authorities, alignment with India's ABDM standardization push, and strict data governance for cross-border patient documents in Singapore.",
  },
  {
    question: "How does this integrate with our existing EHR or practice management systems?",
    answer:
      "Enterprise ships with system-of-record integration and custom workflow support, so unified patient history and coded claims data land directly in the EHR or practice management system your team already uses.",
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

export default function HealthcareSolutionPage() {
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
                <Eyebrow>Healthcare</Eyebrow>
              </div>
              <h1 className="hero-animate-h1 mt-4.5 max-w-[16ch] text-[clamp(32px,4.6vw,50px)] font-bold tracking-[-0.022em] text-ink">
                Document AI for healthcare documentation.
              </h1>
              <p className="hero-animate-p mt-5 max-w-[52ch] text-[18px] text-ink-2">
                Unify patient history, accelerate prior authorization, and catch denials before they happen.
              </p>
              <div className="hero-animate-cta mt-8 flex flex-wrap gap-3.5">
                <BtnSolid href="/book-demo">Book a demo</BtnSolid>
                <BtnGhost href="/book-demo">Get started free</BtnGhost>
              </div>
            </div>
            <div className="hero-animate-image aspect-[728/680]">
              <img
                src="/assets/solutions/healthcare.svg"
                alt="Animated illustration of Proof Perimeter AI parsing medical records, prescriptions, and lab reports"
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
                Patient documentation doesn&rsquo;t arrive as one file.
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
                Built for clinical and claims documentation.
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
              Document AI built for clinical and claims documentation.
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
