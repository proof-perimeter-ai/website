import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { FadeIn } from "@/components/FadeIn";
import { Eyebrow } from "@/components/Eyebrow";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BtnSolid } from "@/components/Button";

export const metadata: Metadata = {
  title: "Document AI for Enterprise",
  description:
    "Vertical-tuned document AI, deployed hosted, in a private cloud, or fully on-premises with zero egress. Fine-tuned on your documents, with the governance and controls your regulator asks to see.",
  alternates: { canonical: "/enterprise" },
};

const pills = ["Vertical-tuned models", "Zero egress AI", "AI Governance & Controls"];

const painPoints = [
  {
    title: "Generic models weren't trained for your documents",
    description:
      "Off-the-shelf LLMs guess at a KYC form or a claims packet the same way they'd guess at a news article — accuracy suffers exactly where it matters most.",
  },
  {
    title: "Zero egress isn't a checkbox most AI vendors can tick",
    description:
      "Most document AI runs through someone else's cloud, which is a non-starter the moment data residency or regulatory scope enters the conversation.",
  },
  {
    title: "Point solutions don't survive contact with legacy infrastructure",
    description: "A model without core-system connectors, maker-checker review, and admin controls is a pilot.",
  },
];

const features = [
  {
    num: "VERTICAL-TUNED MODELS",
    title: "Vertical-Tuned Document AI",
    description:
      "Proprietary models fine-tuned on your document types outperform generic frontier models on the fields that actually matter.",
  },
  {
    num: "DEPLOYMENT",
    title: "Deploy Anywhere — Including Nowhere Online",
    description:
      "Hosted, private cloud, or fully on-premises and air-gapped — zero egress whenever that's the requirement, not the exception.",
  },
  {
    num: "FINE-TUNING",
    title: "Fine-Tuned on Your Documents",
    description:
      "Every correction your team makes feeds back into the model, so accuracy improves on your document mix, not someone else's benchmark.",
  },
  {
    num: "INTEGRATION",
    title: "Integrates With What You Already Run",
    description:
      "Custom workflows, legacy core system connectors, and system-of-record integration, so results land where your operations team already works.",
  },
  {
    num: "GOVERNANCE",
    title: "Enterprise Governance & Controls",
    description:
      "SSO, RBAC, maker-checker review, and a governance dashboard with a residency map and exportable conformity pack — backed by deployment support and an SLA.",
  },
];

const personas = [
  {
    title: "CISOs",
    description: "Deciding where model inference happens and what data leaves the perimeter.",
  },
  {
    title: "MLROs and Chief Compliance Officers",
    description: "Need extraction decisions they can walk through, field by field.",
  },
  {
    title: "Chief Risk Officers",
    description: "Weighing model risk against the operational risk of staying manual.",
  },
  {
    title: "CDOs",
    description: "Governing where and how document data moves across jurisdictions.",
  },
];

const comparisonRows: [string, string, string][] = [
  ["Cost", "Free — pay your model provider directly", "Enterprise license"],
  [
    "Model",
    "Your choice: OpenAI, Anthropic, Google, and other supported providers",
    "Proof Perimeter's proprietary Document AI, fine-tuned for regulated documents",
  ],
  ["Deployment", "Cloud, via your provider's API", "Cloud-hosted, private cloud, or fully on-premises, air-gappable"],
  ["Data egress", "Governed by your model provider's terms", "Zero egress available (on-premise)"],
  ["Fine-tuning", "Not available", "Fine-tuned on your corrections and your documents"],
  ["Integration", "API access", "Custom workflows, legacy core connectors, system-of-record integration"],
  ["Admin & governance", "Standard workspace controls", "SSO, RBAC, maker-checker review, governance dashboard, conformity pack"],
  ["Support", "Community / standard support", "Deployment support and an SLA"],
];

const complianceBullets = [
  "Zero egress — nothing leaves your chosen boundary",
  "SSO, RBAC & maker-checker on every workflow",
  "Independently assessed, not self-reported",
];

const faqs = [
  {
    question: "What's the difference between Document AI and a general-purpose LLM?",
    answer:
      "Document AI is fine-tuned specifically on the regulated document types you process — KYC, claims, LC, loan, and policy documents — rather than adapted from a general-purpose model. That specificity is what drives the accuracy gain on document-extraction tasks.",
  },
  {
    question: "Can we deploy fully on-premises, air-gapped from the internet?",
    answer:
      "Yes. Enterprise deploys hosted, in your private cloud, or fully on-premises — air-gapped, with zero egress, when your compliance requirements call for it.",
  },
  {
    question: "Who owns the improvements from our corrections?",
    answer:
      "Fine-tuning runs on your corrections and your documents, and the resulting model improvements stay scoped to your deployment — they aren't shared across other customers.",
  },
  {
    question: "How does this integrate with our existing core banking or claims systems?",
    answer:
      "Enterprise ships with legacy core connectors and system-of-record integration, plus custom workflow support, so extraction results land directly in the systems your operations team already uses — not a separate silo to reconcile.",
  },
  {
    question: "What admin and access controls are available?",
    answer:
      "SSO, role-based access control, and maker-checker review are built in, alongside a governance dashboard that provides a residency map and an exportable conformity pack for audit and examiner requests.",
  },
  {
    question: "Is there a service-level agreement?",
    answer: "Yes. Enterprise deployments include deployment support and an SLA.",
  },
  {
    question: "How is Enterprise priced?",
    answer: "Enterprise runs on a license scoped to your deployment model — hosted, private cloud, or on-premises.",
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

export default function DocumentAiEnterprise() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <SiteNav />
      <main className="flex-1">
        {/* Hero — centered */}
        <section className="pt-24 pb-20">
          <div className="mx-auto max-w-[820px] px-7 text-center">
            <div className="hero-animate-badge flex justify-center">
              <Eyebrow>Enterprise Document AI</Eyebrow>
            </div>
            <h1 className="hero-animate-h1 mx-auto mt-5 max-w-[18ch] text-[clamp(34px,5vw,54px)] font-bold tracking-[-0.022em] text-ink">
              Document AI deployed inside your perimeter.
            </h1>

            <div className="hero-animate-cta mt-8 flex flex-wrap justify-center gap-2.5">
              {pills.map((pill, i) => (
                <span
                  key={pill}
                  style={{ transitionDelay: `${i * 60}ms` }}
                  className="inline-flex items-center rounded-full border border-line-2 bg-panel px-3.5 py-1.5 font-mono text-[13px] text-signal transition-all duration-200 hover:-translate-y-0.5 hover:border-signal hover:shadow-[0_0_0_3px_rgba(20,70,124,0.08)]"
                >
                  {pill}
                </span>
              ))}
            </div>

            <div className="hero-animate-trust mt-9 flex justify-center">
              <BtnSolid href="/book-demo">Book a demo</BtnSolid>
            </div>
          </div>
        </section>

        {/* Pain points */}
        <section className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>The problem</Eyebrow>
            <h2 className=" mt-4.5 max-w-[26ch] text-[clamp(28px,3.6vw,38px)] font-bold tracking-[-0.022em] text-ink">
              Generic AI wasn&rsquo;t built for what your regulator asks to see.
            </h2>

            <div className="mt-10.5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {painPoints.map((point, i) => (
                <FadeIn
                  key={point.title}
                  delay={i * 90}
                  className="rounded-md border border-line bg-panel p-6.5 transition-all duration-200 hover:-translate-y-1 hover:border-signal/40 hover:shadow-[0_16px_40px_-24px_rgba(20,70,124,0.35)]"
                >
                  <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">{point.title}</h3>
                  <p className="mt-2.5 text-sm text-ink-2">{point.description}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section id="product" className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>The platform</Eyebrow>
            <h2 className="mt-4.5 max-w-[28ch] text-[clamp(28px,3.6vw,38px)] font-bold tracking-[-0.022em] text-ink">
              Enterprise-grade Intelligent Document Processing Platform.
            </h2>

            <div className="mt-10.5 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
              {features.map((feature, i) => (
                <FadeIn
                  key={feature.num}
                  delay={i * 80}
                  className={`group bg-panel p-6.5 transition-colors duration-200 hover:bg-paper-2 ${
                    i === features.length - 1 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="font-mono text-[11px] tracking-[0.1em] text-signal">{feature.num}</div>
                  <h3 className="mt-3.5 text-[17px] font-semibold tracking-[-0.01em] text-ink transition-transform duration-200 group-hover:translate-x-0.5">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-ink-2">{feature.description}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Who is it for */}
        <section className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>Who uses it</Eyebrow>
            <h2 className="mt-4.5 max-w-[24ch] text-[clamp(28px,3.6vw,38px)] font-bold tracking-[-0.022em] text-ink">
              Built for your Risk & Compliance Teams.
            </h2>
            <p className="mt-5.5 max-w-[70ch] text-[19px] text-ink-2">
              Proof Perimeter Enterprise is used by the roles closest to regulatory exposure — not just the analysts running documents
              through the queue, but the people who have to explain the outcome afterward.
            </p>

            <div className="mt-10.5 border-t border-line">
              {personas.map((persona, i) => (
                <FadeIn
                  key={persona.title}
                  delay={i * 60}
                  className="grid gap-1 border-b border-line py-6 transition-colors duration-200 hover:bg-paper-2 md:grid-cols-[minmax(0,30ch)_1fr] md:items-baseline md:gap-10 md:px-2"
                >
                  <div className="text-[17.5px] font-semibold text-ink">{persona.title}</div>
                  <p className="m-0 text-[14.7px] text-ink-2">{persona.description}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Path comparison */}
        <section id="compare" className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>Choose your path</Eyebrow>
            <h2 className="mt-4.5 max-w-[24ch] text-[clamp(28px,3.6vw,38px)] font-bold tracking-[-0.022em] text-ink">
              Which path fits how you already work?
            </h2>

            <FadeIn className="mt-10.5 overflow-x-auto rounded-md border border-line">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr>
                    <th className="border-b border-line bg-paper-2 p-4.5 text-[13px] font-semibold text-ink-2" />
                    <th className="border-b border-line border-l border-line bg-paper-2 p-4.5 text-[15px] font-semibold text-ink">
                      Bring Your Own Key
                    </th>
                    <th className="border-b border-line border-l border-signal/30 bg-paper-2 p-4.5 text-[15px] font-semibold text-signal">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map(([label, byok, enterprise]) => (
                    <tr key={label} className="group transition-colors duration-150 hover:bg-paper-2">
                      <td className="border-b border-line p-4.5 font-mono text-[12.5px] tracking-[0.03em] text-ink-2 uppercase">
                        {label}
                      </td>
                      <td className="border-b border-line border-l border-line p-4.5 text-[14.5px] text-ink-2">{byok}</td>
                      <td className="border-b border-line border-l border-signal/30 bg-signal/[0.03] p-4.5 text-[14.5px] text-ink transition-colors duration-150 group-hover:bg-signal/[0.06]">
                        {enterprise}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="p-4.5" />
                    <td className="border-l border-line p-4.5">
                      <Link href="/#choose-your-path" className="text-[14.5px] font-semibold text-signal hover:text-signal-deep">
                        Start free with your API key →
                      </Link>
                    </td>
                    <td className="border-l border-signal/30 bg-signal/[0.03] p-4.5">
                      <Link href="/book-demo" className="text-[14.5px] font-semibold text-signal hover:text-signal-deep">
                        Book Demo →
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </FadeIn>
          </div>
        </section>

        {/* Trust & compliance */}
        <section id="regulators" className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
              <div>
                <Eyebrow>Trust & compliance</Eyebrow>
                <h2 className="mt-4.5 max-w-[20ch] text-[clamp(28px,3.6vw,38px)] font-bold tracking-[-0.022em] text-ink">
                  Built for institutions that get audited.
                </h2>
                <ul className="mt-7 list-none p-0">
                  {complianceBullets.map((b) => (
                    <li key={b} className="flex items-center gap-3 py-2 text-[15px] whitespace-nowrap text-ink-2">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-live" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <FadeIn className="flex items-center justify-center ">
                <img
                  src="/assets/compliance/banner.png"
                  alt="HIPAA, AICPA SOC, GDPR and ISO 27001 compliance certifications"
                  className="h-auto w-full max-w-[420px] object-contain"
                />
              </FadeIn>
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
          <div className="mx-auto max-w-[1120px]">
            <h2 className="mx-auto max-w-[20ch] text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.022em] text-ink">
              Frontier AI for regulated document processing
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3.5">
              <BtnSolid href="/book-demo">Book a demo</BtnSolid>
            </div>
            
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
