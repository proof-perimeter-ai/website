import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Eyebrow } from "@/components/Eyebrow";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { siteConfig } from "@/lib/metadata";
import { getAllTerms, getTermBySlug, getRelatedTerms } from "@/lib/glossary";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTerms().map((term) => ({ slug: term.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const term = getTermBySlug(slug)!;
  return {
    title: term.title,
    description: term.description,
    alternates: { canonical: `/glossary/${term.slug}` },
    openGraph: {
      title: `${term.title} | ${siteConfig.name}`,
      description: term.description,
      url: `${siteConfig.url}/glossary/${term.slug}`,
      type: "article",
    },
  };
}

export default async function GlossaryTermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const term = getTermBySlug(slug)!;
  const related = getRelatedTerms(term);
  const { default: Body } = await import(`@/content/glossary/${slug}.mdx`);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      name: term.title,
      description: term.description,
      url: `${siteConfig.url}/glossary/${term.slug}`,
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        name: "AI Document Processing Glossary",
        url: `${siteConfig.url}/glossary`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Glossary", item: `${siteConfig.url}/glossary` },
        { "@type": "ListItem", position: 2, name: term.title, item: `${siteConfig.url}/glossary/${term.slug}` },
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
              <Link href="/glossary" className="transition-colors hover:text-signal">
                Glossary
              </Link>
              <span className="mx-2 text-line-2">/</span>
              <span className="text-ink">{term.title}</span>
            </nav>

            <div className="mt-9 max-w-[720px]">
              <Eyebrow>{term.category}</Eyebrow>
              <h1 className="mt-4.5 text-[clamp(30px,4vw,44px)] font-bold tracking-[-0.022em] text-ink">
                {term.title}
              </h1>
              <p className="mt-4.5 border-l-2 border-signal/40 pl-4 text-[17px] italic text-ink-2">{term.tagline}</p>

              <div className="mt-2">
                <Body />
              </div>
            </div>

            {/* Related terms */}
            {related.length > 0 && (
              <div className="mt-16 border-t border-line pt-10">
                <Eyebrow>Related terms</Eyebrow>
                <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-3">
                  {related.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/glossary/${rel.slug}`}
                      className="group bg-panel p-6 transition-colors hover:bg-paper-2"
                    >
                      <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-signal">{rel.category}</div>
                      <div className="mt-3 text-[16.5px] font-semibold tracking-[-0.01em] text-ink transition-colors group-hover:text-signal">
                        {rel.title}
                      </div>
                      <p className="mt-2 text-sm text-ink-2">{rel.tagline}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

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
