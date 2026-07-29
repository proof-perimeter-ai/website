import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { CaseStudyHeader } from "@/components/CaseStudyHeader";
import { TableOfContents } from "@/components/TableOfContents";
import { siteConfig } from "@/lib/metadata";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/case-studies";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCaseStudies().map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug)!;
  return {
    title: `${caseStudy.title} | Case Study`,
    description: caseStudy.description,
    alternates: { canonical: `/case-studies/${caseStudy.slug}` },
    openGraph: {
      title: `${caseStudy.title} | ${siteConfig.name}`,
      description: caseStudy.description,
      url: `${siteConfig.url}/case-studies/${caseStudy.slug}`,
      type: "article",
      publishedTime: caseStudy.createdAt,
      modifiedTime: caseStudy.updatedAt,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug)!;
  const { default: Body } = await import(`@/content/case-studies/${slug}.mdx`);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: caseStudy.title,
      description: caseStudy.description,
      image: `${siteConfig.url}${caseStudy.banner.src}`,
      datePublished: caseStudy.createdAt,
      dateModified: caseStudy.updatedAt,
      about: { "@type": "Organization", name: caseStudy.company.name },
      publisher: { "@type": "Organization", name: siteConfig.name },
      mainEntityOfPage: `${siteConfig.url}/case-studies/${caseStudy.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Case Studies", item: `${siteConfig.url}/case-studies` },
        { "@type": "ListItem", position: 2, name: caseStudy.title, item: `${siteConfig.url}/case-studies/${caseStudy.slug}` },
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
        <article className="pt-16 pb-22">
          <div className="mx-auto max-w-[1120px] px-7">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="font-mono text-[12.5px] text-ink-2">
              <Link href="/case-studies" className="transition-colors hover:text-signal">
                Case Studies
              </Link>
              <span className="mx-2 text-line-2">/</span>
              <span className="text-ink">{caseStudy.title}</span>
            </nav>

            <div className="mt-9 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_260px]">
              <div className="max-w-[720px]">
                <CaseStudyHeader caseStudy={caseStudy} />
                <div className="mt-2">
                  <Body metrics={caseStudy.metrics} quote={caseStudy.quote} />
                </div>
              </div>

              {caseStudy.toc.length > 0 && (
                <aside className="hidden lg:block">
                  <div className="sticky top-24">
                    <TableOfContents items={caseStudy.toc} />
                  </div>
                </aside>
              )}
            </div>

            {/* CTA */}
            <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-md border border-line bg-paper-2 px-7 py-6">
              <p className="m-0 text-[15.5px] text-ink-2">
                Proof Perimeter runs document AI inside your own perimeter — with a provenance record on every field.
              </p>
              <Link
                href="/book-demo"
                className="inline-flex items-center justify-center gap-2 rounded-[5px] bg-signal px-4.5 py-2.75 text-[15px] font-semibold text-white transition-colors hover:bg-signal-deep"
              >
                Book a demo
              </Link>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
