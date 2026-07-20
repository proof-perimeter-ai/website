import type { Metadata } from "next";
import { Calculator, FileSignature, LineChart } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { FadeIn } from "@/components/FadeIn";
import { Eyebrow } from "@/components/Eyebrow";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BtnSolid, BtnGhost } from "@/components/Button";

export const metadata: Metadata = {
  title: "Document AI for Financial Services | Proof Perimeter",
  description: "Automate underwriting, credit agreement, and research extraction — with every figure traced back to its source.",
  alternates: { canonical: "/solutions/financial-services" },
};

const cardHover =
  "transition-all duration-300 hover:-translate-y-1 hover:border-signal/40 hover:shadow-[0_20px_40px_-30px_rgba(20,70,124,0.45)]";

const painPoints = [
  {
    icon: Calculator,
    title: "Underwriting means manually spreading financials",
    description: "Teams manually spread financial statements and multi-tab spreadsheet models to extract ratios and cash flow data.",
  },
  {
    icon: FileSignature,
    title: "Credit terms are extracted by hand",
    description:
      "Credit agreements, term sheets, and loan documents require manual extraction of covenants, rates, and collateral terms before they can feed decisioning systems.",
  },
  {
    icon: LineChart,
    title: "Research data hides in tables and footnotes",
    description:
      "Analyst teams spend hours scanning filings, earnings reports, and research decks for data buried in tables, charts, and footnotes.",
  },
];

const benefits = [
  {
    title: "Structured covenant extraction",
    description: "Covenants, rates, and collateral terms are extracted from credit agreements and loan documents, structured for direct use in decisioning.",
  },
  {
    title: "Faster underwriting",
    description: "Automated financial statement and multi-tab spreadsheet extraction speeds up underwriting.",
  },
  {
    title: "Traceable research extraction",
    description: "Chart-, table-, and footnote-level extraction from filings and reports, with every figure traced back to its exact source.",
  },
  {
    title: "Automated holdings ingestion",
    description: "Holdings and account data from brokerage/policy statements flow directly into risk and advisory systems.",
  },
  {
    title: "Audit-ready output",
    description: "Every extracted figure is linked to its source document, page, and location.",
  },
];

const regions = [
  {
    flag: "🇪🇺",
    name: "European Union",
    description:
      "GDPR constrains automated decision-making built on extracted data in credit workflows. DORA requires operational resilience assurances from any AI vendor in the pipeline.",
  },
  {
    flag: "🇦🇪",
    name: "United Arab Emirates(UAE)",
    description:
      "In-country processing requirements under CBUAE apply to lending and investment documentation. Islamic finance contract structures need handling most generic tools aren't built for.",
  },
  {
    flag: "🇮🇳",
    name: "India",
    description:
      "NBFC and MSME lending volume means financial statements and GST documents arrive in highly inconsistent formats, straining manual underwriting at scale.",
  },
  {
    flag: "🇸🇬",
    name: "Singapore",
    description:
      "Cross-border wealth and asset management documents span multiple jurisdictions and currencies, while MAS oversight raises the governance bar.",
  },
];

const faqs = [
  {
    question: "What does Proof Perimeter do for financial services document processing?",
    answer:
      "It automates extraction from the documents lending, markets, and advisory teams handle — credit agreements, financial statements, research filings, and brokerage/policy statements — with every figure traced back to its source document, page, and location.",
  },
  {
    question: "Can Document AI extract covenants and collateral terms from credit agreements?",
    answer:
      "Yes. Covenants, rates, and collateral terms are extracted from credit agreements, term sheets, and loan documents and structured for direct use in decisioning systems, instead of manual extraction.",
  },
  {
    question: "How much more accurate is Document AI than a general-purpose LLM for financial documents?",
    answer:
      "Per internal benchmarks, Proof Perimeter's fine-tuned Document AI delivers 20% higher accuracy and 50% lower token consumption than general frontier models on document-extraction tasks like spreading financials and extracting research data.",
  },
  {
    question: "Can financial services documents be processed with zero data egress?",
    answer:
      "Yes. Enterprise deployments support zero-egress options — cloud-hosted, within your infrastructure, or fully on-premises — so credit, investment, and advisory documents never leave your chosen boundary.",
  },
  {
    question: "Is Bring Your Own Key free for financial services teams?",
    answer:
      "Yes. The full workspace — templates, workflows, batch processing, review, and export — is free with your own model key. You pay your model provider directly, with no platform fee or document limit.",
  },
  {
    question: "How does Proof Perimeter handle regional financial services compliance?",
    answer:
      "Deployment adapts to where you operate — GDPR and DORA controls in the EU, in-country processing under CBUAE in the UAE, and governance aligned with MAS oversight in Singapore.",
  },
  {
    question: "How does this integrate with our existing underwriting or portfolio systems?",
    answer:
      "Enterprise ships with system-of-record integration and custom workflow support, so extracted covenants, holdings, and research data land directly in the risk, advisory, or decisioning systems your team already runs.",
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

export default function FinancialServicesSolutionPage() {
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
                <Eyebrow>Financial Services</Eyebrow>
              </div>
              <h1 className="hero-animate-h1 mt-4.5 max-w-[16ch] text-[clamp(32px,4.6vw,50px)] font-bold tracking-[-0.022em] text-ink">
                Document AI for financial services.
              </h1>
              <p className="hero-animate-p mt-5 max-w-[52ch] text-[18px] text-ink-2">
                Automate underwriting, credit agreement, and research extraction — with every figure traced back to its
                source.
              </p>
              <div className="hero-animate-cta mt-8 flex flex-wrap gap-3.5">
                <BtnSolid href="/book-demo">Book a demo</BtnSolid>
                <BtnGhost href="/book-demo">Get started free</BtnGhost>
              </div>
            </div>
            <div className="hero-animate-image aspect-[728/680]">
              <img
                src="/assets/solutions/financial-services.svg"
                alt="Animated illustration of Proof Perimeter AI parsing bank statements, tax forms, and contracts"
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
                Deal documents don&rsquo;t come in one format.
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
                Built for lending, markets, and advisory documents.
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
              Document AI built for lending, markets, and advisory teams.
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
