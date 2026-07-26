import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Eyebrow } from "@/components/Eyebrow";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { siteConfig } from "@/lib/metadata";
import { getAllTerms, getTermsByLetter } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "AI Document Processing Glossary",
  description:
    "Plain-language definitions of AI document processing terms — OCR, intelligent document processing, extraction, document AI agents, compliance and more.",
  alternates: { canonical: "/glossary" },
};

export default function GlossaryIndex() {
  const groups = getTermsByLetter();

  const definedTermSetJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "AI Document Processing Glossary",
    description:
      "Definitions of AI document processing, OCR and document intelligence terms, from Proof Perimeter.",
    url: `${siteConfig.url}/glossary`,
    hasDefinedTerm: getAllTerms().map((term) => ({
      "@type": "DefinedTerm",
      name: term.title,
      description: term.description,
      url: `${siteConfig.url}/glossary/${term.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={definedTermSetJsonLd} />
      <SiteNav />
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-21 pb-14">
          <div className="mx-auto max-w-[1120px] px-7">
            <Eyebrow>Glossary</Eyebrow>
            <h1 className="mt-4.5 max-w-[22ch] text-[clamp(34px,4.6vw,52px)] font-bold tracking-[-0.022em] text-ink">
              AI document processing, defined term by term.
            </h1>
            <p className="mt-6 max-w-[62ch] text-[19px] text-ink-2">
              Every term you&rsquo;ll meet when you put AI to work on documents — OCR and extraction, agents and
              workflows, compliance and evaluation — explained in plain language.
            </p>
          </div>
        </section>

        {/* A–Z quick nav */}
        <nav
          aria-label="Glossary letters"
          className="sticky top-0 z-10 border-y border-line bg-paper-2/95 py-3.5 backdrop-blur"
        >
          <div className="mx-auto flex max-w-[1120px] flex-wrap gap-x-3.5 gap-y-1.5 px-7 font-mono text-[13px]">
            {groups.map(({ letter }) => (
              <a key={letter} href={`#${letter}`} className="text-ink-2 transition-colors hover:text-signal">
                {letter}
              </a>
            ))}
          </div>
        </nav>

        {/* Terms by letter */}
        <section className="py-14">
          <div className="mx-auto max-w-[1120px] px-7">
            {groups.map(({ letter, terms }) => (
              <div key={letter} id={letter} className="scroll-mt-20 border-b border-line py-9 first:pt-0">
                <div className="grid gap-6 md:grid-cols-[80px_1fr]">
                  <h2 className="font-mono text-[28px] font-medium text-signal">{letter}</h2>
                  <ul className="m-0 grid list-none gap-x-8 gap-y-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
                    {terms.map((term) => (
                      <li key={term.slug}>
                        <Link
                          href={`/glossary/${term.slug}`}
                          className="text-[15.5px] font-medium text-ink transition-colors hover:text-signal"
                        >
                          {term.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
