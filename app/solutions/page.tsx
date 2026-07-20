import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { Eyebrow } from "@/components/Eyebrow";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Solutions | Proof Perimeter",
  description:
    "Document AI for regulated, high-risk document workflows across banking, financial services, insurance, legal, and healthcare.",
  alternates: { canonical: "/solutions" },
};

const cardHover =
  "transition-all duration-300 hover:-translate-y-1 hover:border-signal/40 hover:shadow-[0_20px_40px_-30px_rgba(20,70,124,0.45)]";

const industries = [
  {
    slug: "banking",
    name: "Banking",
    description: "Automate KYC, loan-closing, and compliance document processing across every branch, channel, and partner network.",
  },
  {
    slug: "financial-services",
    name: "Financial Services",
    description: "Automate underwriting, credit agreement, and research extraction — with every figure traced back to its source.",
  },
  {
    slug: "insurance",
    name: "Insurance",
    description: "Classify, extract, and reconcile claims packets automatically — from FNOL to settlement.",
  },
  {
    slug: "legal",
    name: "Legal",
    description: "Extract clauses, separate document productions, and redact at scale — without losing meaning-critical formatting.",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    description: "Unify patient history, accelerate prior authorization, and catch denials before they happen.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-24 pb-20">
          <div className="mx-auto max-w-[820px] px-7 text-center">
            <div className="flex justify-center">
              <Eyebrow>Solutions</Eyebrow>
            </div>
            <h1 className="mx-auto mt-5 max-w-[18ch] text-[clamp(34px,5vw,54px)] font-bold tracking-[-0.022em] text-ink">
              Document AI for every regulated document workflow.
            </h1>
            <p className="mx-auto mt-5.5 max-w-[56ch] text-[18px] text-ink-2">
              Pick your industry to see how Proof Perimeter handles the documents your regulator, auditor, and customers
              actually ask about.
            </p>
          </div>
        </section>

        {/* Industry grid */}
        <section className="border-t border-line py-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry, i) => (
                <FadeIn key={industry.slug} delay={i * 80}>
                  <Link
                    href={`/solutions/${industry.slug}`}
                    className={`block h-full rounded-md border border-line bg-panel p-6.5 ${cardHover}`}
                  >
                    <h2 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">{industry.name}</h2>
                    <p className="mt-2.5 text-sm text-ink-2">{industry.description}</p>
                    <span className="mt-4 inline-block text-[14.5px] font-semibold text-signal">Explore {industry.name} →</span>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
