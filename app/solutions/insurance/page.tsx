import type { Metadata } from "next";
import { FolderOpen, History, ScanLine } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { FadeIn } from "@/components/FadeIn";
import { Eyebrow } from "@/components/Eyebrow";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BtnSolid, BtnGhost } from "@/components/Button";
import { CustomerLogoMarquee } from "@/components/CustomerLogoMarquee";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";

export const metadata: Metadata = {
  title: "Document AI for Insurance | Proof Perimeter",
  description: "Classify, extract, and reconcile claims packets automatically — from FNOL to settlement.",
  alternates: { canonical: "/solutions/insurance" },
};

const cardHover =
  "transition-all duration-300 hover:-translate-y-1 hover:border-signal/40 hover:shadow-[0_20px_40px_-30px_rgba(20,70,124,0.45)]";

const painPoints = [
  {
    icon: FolderOpen,
    title: "Claims packets arrive as mixed-format chaos",
    description:
      "FNOL forms, medical records, photos, estimates, and correspondence must be manually triaged and sorted into component documents.",
  },
  {
    icon: History,
    title: "Evidence trickles in with no unified view",
    description:
      "Claims evidence arrives over weeks from multiple sources, forcing manual reconciliation of scattered, sometimes conflicting files.",
  },
  {
    icon: ScanLine,
    title: "Low-quality scans break standard extraction",
    description:
      "Faxes, photos, and handwritten forms create inconsistent structure that breaks standard extraction methods, even on standardized forms like ACORD.",
  },
];

const benefits = [
  {
    title: "Automatic claims classification",
    description: "Large, mixed-format claims packets are automatically classified into their component documents, replacing manual sorting.",
  },
  {
    title: "Consistent extraction from any input",
    description: "Low-quality scans, faxes, handwritten forms, and standard forms like ACORD are all handled without custom templates per format.",
  },
  {
    title: "Unified claims timeline",
    description: "A chronologically organized view of claims evidence as it arrives, instead of scattered files across systems.",
  },
  {
    title: "Earlier fraud signals",
    description: "Automated cross-document consistency checks surface date mismatches, duplicated evidence, and conflicting statements sooner.",
  },
  {
    title: "Full field-level traceability",
    description: "Every extracted field traces back to its exact source location, supporting claims audit and dispute defense.",
  },
];

const regions = [
  {
    flag: "🇪🇺",
    name: "European Union",
    description:
      "Health-related claims data falls under GDPR's special category rules. Solvency II reporting ties claims data quality directly to regulatory accuracy.",
  },
  {
    flag: "🇦🇪",
    name: "United Arab Emirates(UAE)",
    description: "CBUAE is tightening documentation and reporting standards. Claims paperwork, especially medical, often arrives in mixed Arabic/English formats.",
  },
  {
    flag: "🇮🇳",
    name: "India",
    description: "IRDAI's push for faster claim settlement collides with highly inconsistent hospital and provider documentation at very high claims volume.",
  },
  {
    flag: "🇸🇬",
    name: "Singapore",
    description: "As a reinsurance and specialty hub, claims and treaty documents span multiple jurisdictions, currencies, and languages under MAS governance requirements.",
  },
];

const faqs = [
  {
    question: "What does Proof Perimeter do for insurance claims processing?",
    answer:
      "It classifies mixed-format claims packets, extracts data from FNOL forms, medical records, and ACORD forms, and builds a unified, chronologically organized view of claims evidence as it arrives.",
  },
  {
    question: "Can Document AI process low-quality scans, faxes, and handwritten claims forms?",
    answer:
      "Yes. Extraction is consistent across low-quality scans, faxes, photos, and handwritten forms — including standard forms like ACORD — without needing a custom template per format.",
  },
  {
    question: "How much more accurate is Document AI than a general-purpose LLM for claims documents?",
    answer:
      "Per internal benchmarks, Proof Perimeter's fine-tuned Document AI delivers 20% higher accuracy and 50% lower token consumption than general frontier models on document-extraction tasks like claims classification and evidence extraction.",
  },
  {
    question: "Can claims and policy documents be processed with zero data egress?",
    answer:
      "Yes. Enterprise deployments support zero-egress options — cloud-hosted, within your infrastructure, or fully on-premises — so health-related and other sensitive claims data never leaves your chosen boundary.",
  },
  {
    question: "Is Bring Your Own Key free for insurance teams?",
    answer:
      "Yes. The full workspace — templates, workflows, batch processing, review, and export — is free with your own model key. You pay your model provider directly, with no platform fee or document limit.",
  },
  {
    question: "How does Proof Perimeter handle regional insurance compliance?",
    answer:
      "Deployment adapts to where you operate — GDPR special-category and Solvency II controls in the EU, in-country processing under CBUAE in the UAE, IRDAI-aligned turnaround in India, and MAS governance for reinsurance and specialty business in Singapore.",
  },
  {
    question: "How does this integrate with our existing claims or policy administration systems?",
    answer:
      "Enterprise ships with system-of-record integration and custom workflow support, so classified documents and extracted claims data land directly in the claims and policy admin systems your team already uses.",
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

export default function InsuranceSolutionPage() {
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
                <Eyebrow>Insurance</Eyebrow>
              </div>
              <h1 className="hero-animate-h1 mt-4.5 max-w-[16ch] text-[clamp(32px,4.6vw,50px)] font-bold tracking-[-0.022em] text-ink">
                Document AI for insurance claims.
              </h1>
              <p className="hero-animate-p mt-5 max-w-[52ch] text-[18px] text-ink-2">
                Classify, extract, and reconcile claims packets automatically — from FNOL to settlement.
              </p>
              <div className="hero-animate-cta mt-8 flex flex-wrap gap-3.5">
                <BtnSolid href="/book-demo">Book a demo</BtnSolid>
                <BtnGhost href="/book-demo">Get started free</BtnGhost>
              </div>
            </div>
            <div className="hero-animate-image aspect-[728/680]">
              <img
                src="/assets/solutions/insurance.svg"
                alt="Animated illustration of Proof Perimeter AI parsing claims forms, medical reports, and accident reports"
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
                Claims files arrive as chaos, not structure.
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
                Built for claims, from intake to settlement.
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
              Document AI built for faster, more defensible claims.
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
