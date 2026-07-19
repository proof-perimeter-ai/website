import type { Metadata } from "next";
import { BtnGhost, BtnSolid } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { FadeIn } from "@/components/FadeIn";
import { JsonLd } from "@/components/JsonLd";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Document AI Pricing: BYOK vs Enterprise",
  description:
    "Compare Proof Perimeter's Bring Your Own Key and Enterprise plans feature by feature — deployment, data egress, workflows, audit logging, connectors, and support.",
  alternates: { canonical: "/pricing" },
};

const priceRow: [string, string, string] = ["Cost", "Free — pay your LLM token costs", "Enterprise license"];

const fitRow: [string, string, string] = [
  "Best fit",
  "Small to mid-size teams processing documents who want to move fast.",
  "Large teams adopting fine-tuned Document AI with deployment, integration, and governance requirements.",
];

const featureRows: [string, string, string][] = [
  [
    "Model",
    "Your choice: OpenAI, Anthropic, Google, and other supported providers",
    "Proof Perimeter's proprietary Document AI, fine-tuned for regulated documents",
  ],
  ["Deployment", "Cloud, via your provider's API", "Multi-tenant cloud, private-cloud, or fully on-premise"],
  ["Data egress", "Governed by your model provider's terms", "Zero egress available (on-premise)"],
  ["Document limit", "None", "None"],
  ["Templates & workflows", "Included", "Included"],
  ["Batch processing", "Included", "Included"],
  ["API access", "Included", "Included"],
  ["Review & export", "Included", "Included"],
  ["Provenance records", "Included", "Included"],
  // Placeholder — no existing site copy for this row yet; confirm actual value before shipping.
  ["Audit logging", "Not available", "Full audit trail, exportable, retained per your compliance policy"],
  // Placeholder — no existing site copy for this row yet; confirm actual value before shipping.
  ["Connectors", "Standard", "Custom connectors on request (SFTP, SharePoint, core banking/claims systems)"],
  // Placeholder — no existing site copy for this row yet; confirm actual value before shipping.
  ["Support", "Community", "Dedicated support with SLA"],
];

const plans = [
  {
    name: "Bring Your Own Key",
    price: priceRow[1],
    fit: fitRow[1],
    ctaLabel: "Get started for free",
    highlight: false,
  },
  {
    name: "Enterprise",
    price: priceRow[2],
    fit: fitRow[2],
    ctaLabel: "Book Demo",
    highlight: true,
  },
] as const;

const faqs = [
  {
    question: "Is there a subscription or seat fee on Bring Your Own Key?",
    answer:
      "No. Bring Your Own Key has no fixed subscription and no per-seat pricing. You only pay for the documents you actually process on the platform.",
  },
  {
    question: "How exactly is Bring Your Own Key priced?",
    answer:
      "The only cost is the LLM tokens consumed while processing your documents, billed by your model provider at their published rates. There's no platform fee on top.",
  },
  {
    question: "Why would this cost less than calling the model provider directly ourselves?",
    answer:
      "Our platform is optimized to deliver higher extraction accuracy while consuming fewer tokens per document. In practice that means fewer retries and re-processing runs, so routing documents through Proof Perimeter typically ends up costing less than calling the same model directly.",
  },
  {
    question: "Does higher document volume change the per-document price on Bring Your Own Key?",
    answer:
      "No. Pricing is purely usage-based — token consumption per document — so there's no volume tier, contract, or minimum commitment to unlock lower rates.",
  },
  {
    question: "Is there a free trial for Bring Your Own Key?",
    answer:
      "The full workspace is free to use from day one — you're only ever billed by your model provider for the tokens you consume, so there's no separate trial period needed.",
  },
  {
    question: "How is Enterprise priced?",
    answer:
      "Enterprise runs on a license scoped to your business. We start by understanding your document processing needs, volumes, and customization requirements, then offer a best estimate based on that — rather than a one-size-fits-all rate card.",
  },
  {
    question: "What determines our Enterprise price estimate?",
    answer:
      "Primarily your document volumes, the complexity and number of document types you need covered, and any deployment or customization requirements specific to your business.",
  },
  {
    question: "How should we think about the return on an Enterprise license?",
    answer:
      "The license is priced against the mistakes and errors it helps you avoid. Undetected errors in document processing — a misread KYC field, a missed clause, a misrouted claim — routinely cause monetary losses far larger than the cost of adopting frontier AI to catch them.",
  },
  {
    question: "Can we start on Bring Your Own Key and move to Enterprise later?",
    answer:
      "Yes. Running on Bring Your Own Key first is a good way to establish your real document volumes and customization needs, which is exactly the information we use to put together your Enterprise estimate.",
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

export default function Pricing() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <SiteNav />
      <main className="flex-1">
        <section className="py-22">
          <div className="mx-auto max-w-[1120px] px-7 text-center">
            <Eyebrow className="justify-center">Pricing</Eyebrow>
            <h1 className="mx-auto mt-4.5 max-w-[24ch] text-[clamp(30px,4.4vw,44px)] font-bold tracking-[-0.022em] text-ink">
              Pay for documents that you process
            </h1>

            <div className="mt-12 grid gap-6 text-left md:grid-cols-2">
              {plans.map((plan, i) => (
                <FadeIn
                  key={plan.name}
                  delay={i * 80}
                  className={`rounded-lg border p-8 ${
                    plan.highlight ? "border-signal/30 bg-signal/[0.03]" : "border-line bg-panel"
                  }`}
                >
                  <div
                    className={`font-mono text-xs font-medium uppercase tracking-[0.16em] ${
                      plan.highlight ? "text-signal" : "text-ink-2"
                    }`}
                  >
                    {plan.name}
                  </div>
                  <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-2">{plan.fit}</p>
                  <div className="mt-6 text-[26px] font-bold tracking-[-0.02em] text-ink">{plan.price}</div>

                  <div className="mt-6">
                    {plan.highlight ? (
                      <BtnSolid href="/book-demo">{plan.ctaLabel}</BtnSolid>
                    ) : (
                      <BtnGhost href="/book-demo">{plan.ctaLabel}</BtnGhost>
                    )}
                  </div>

                  <div className="mt-8 divide-y divide-line border-t border-line">
                    {featureRows.map(([label, byok, enterprise]) => (
                      <div key={label} className="py-3.5">
                        <div className="font-mono text-[11px] font-medium tracking-[0.1em] text-ink-2 uppercase">
                          {label}
                        </div>
                        <div className="mt-1 text-[14.5px] text-ink">{i === 0 ? byok : enterprise}</div>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mt-4.5 text-[clamp(28px,3.6vw,38px)] font-bold tracking-[-0.022em] text-ink">
              Pricing questions
            </h2>

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
              Pay for outcomes, not seats.
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3.5">
              <BtnSolid href="/book-demo">Get started for free</BtnSolid>
              <BtnGhost href="/book-demo">Book a demo</BtnGhost>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
