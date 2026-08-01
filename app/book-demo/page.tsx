import type { Metadata } from "next";
import { BookDemoFlow } from "@/components/BookDemoFlow";
import { BookDemoIntro } from "@/components/BookDemoIntro";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

const DEFAULT_CAL_LINK = "gaurav-bu/30min";

export const metadata: Metadata = {
  title: "Get Started: Book a Demo or Start Free",
  description:
    "Get started for free with your own LLM key, or move to Enterprise for Proof Perimeter's proprietary models with zero-egress deployment and governance controls.",
  alternates: { canonical: "/book-demo" },
};

export default function BookDemo() {
  const calLink = process.env.CAL_LINK || DEFAULT_CAL_LINK;

  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="py-22">
          <div className="mx-auto grid max-w-[1160px] grid-cols-1 gap-14 px-7 md:grid-cols-2 md:items-center md:gap-16 lg:gap-20">
            <div className="hidden md:block">
              <BookDemoIntro />
            </div>

            <div>
              <h1 className="mb-6 text-[clamp(30px,3.6vw,40px)] font-bold tracking-[-0.022em] text-ink md:hidden">
                Book a Free Product Demo
              </h1>

              <div className="w-full max-w-[640px] rounded-lg border border-line bg-panel p-8 text-left">
                <BookDemoFlow calLink={calLink} />
              </div>
              {/* <p className="mt-6 max-w-[640px] text-sm text-ink-2">
                Prefer email? Reach us directly at{" "}
                <a href="mailto:admin@proofperimeter.com" className="text-signal hover:underline">
                  admin@proofperimeter.com
                </a>
                .
              </p> */}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
