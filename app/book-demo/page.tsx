import type { Metadata } from "next";
import { BookDemoCal } from "@/components/BookDemoCal";
import { Eyebrow } from "@/components/Eyebrow";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Get started for free with your own LLM model key, or move to the Enterprise tier for Proof Perimeter's proprietary document-processing models with enterprise-grade security, deployment and support.",
  alternates: { canonical: "/book-demo" },
};

export default function BookDemo() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="py-22">
          <div className="mx-auto max-w-[1100px] px-7 text-center">
            <div className="mx-auto max-w-[760px]">
              <Eyebrow className="justify-center">Book a live demo</Eyebrow>
            </div>

            <div className="mx-auto mt-12 h-[550px] w-full rounded-lg border border-line bg-panel p-8 text-left sm:h-[650px]">
              <BookDemoCal />
            </div>
            <p className="mt-6 text-sm text-ink-2">
              Prefer email? Reach us directly at{" "}
              <a href="mailto:admin@proofperimeter.com" className="text-signal hover:underline">
                admin@proofperimeter.com
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
