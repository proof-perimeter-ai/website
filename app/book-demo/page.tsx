import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Book a Demo",
  description:
    "Run a free Sovereign-AI-Gap Audit and blind benchmark on your own documents, in your own environment — no file ever leaves it.",
  alternates: { canonical: "/book-demo" },
};

export default function BookDemo() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="py-22">
          <div className="mx-auto max-w-[760px] px-7 text-center">
            <Eyebrow className="justify-center">Run a free audit</Eyebrow>
            <h1 className="mt-4.5 text-[clamp(30px,4.4vw,44px)] font-bold tracking-[-0.022em] text-ink">
              Run a free Sovereign-AI-Gap Audit
            </h1>
            <p className="mx-auto mt-5.5 max-w-[56ch] text-lg text-ink-2">
              Two numbers, on your data, before you commit. The audit shows what share of your regulated inference
              leaves the perimeter today; the blind benchmark shows field-level accuracy on your worst documents.
              Both run on your data, in your environment, at no cost.
            </p>

            <div className="mx-auto mt-12 max-w-[560px] rounded-lg border border-dashed border-line-2 bg-panel p-10">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-signal">Demo request form</p>
              <h2 className="mt-3 text-xl font-semibold text-ink">Coming soon</h2>
              <p className="mt-3 text-[15.5px] text-ink-2">
                The request form for this page is being built. In the meantime, email us directly and we&rsquo;ll scope
                your Sovereign-AI-Gap Audit and blind benchmark.
              </p>
              <a
                href="mailto:hello@proofperimeter.com"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-[5px] bg-signal px-4.5 py-2.75 text-[15px] font-semibold text-white transition-colors hover:bg-signal-deep"
              >
                Email hello@proofperimeter.com
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
