import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Eyebrow } from "@/components/Eyebrow";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { FadeIn } from "@/components/FadeIn";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { siteConfig } from "@/lib/metadata";
import { getAllCaseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Case Studies: Proof Perimeter in Regulated Industries",
  description:
    "How banks, insurers, and lenders use Proof Perimeter to automate document classification, extraction, and review — with field-level provenance on every value.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesIndex() {
  const caseStudies = getAllCaseStudies();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${siteConfig.name} Case Studies`,
      url: `${siteConfig.url}/case-studies`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Case Studies", item: `${siteConfig.url}/case-studies` },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}
      <SiteNav />
      <main className="flex-1">
        <section className="pt-21 pb-14">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>Customers</Eyebrow>
            <h1 className="mt-4.5 max-w-[22ch] text-[clamp(34px,4.6vw,52px)] font-bold tracking-[-0.022em] text-ink">
              How regulated teams put Proof Perimeter to work.
            </h1>
          </div>
        </section>

        <section className="pb-22">
          <div className="mx-auto max-w-[1120px] px-7">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((caseStudy, i) => (
                <FadeIn key={caseStudy.slug} delay={i * 60}>
                  <CaseStudyCard caseStudy={caseStudy} />
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
