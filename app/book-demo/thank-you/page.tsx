import type { Metadata } from "next";
import { Check } from "lucide-react";
import { BookDemoConversion } from "@/components/BookDemoConversion";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "You're Booked",
  description: "Your meeting with the Proof Perimeter team is confirmed.",
  alternates: { canonical: "/book-demo/thank-you" },
  robots: { index: false, follow: true },
};

export default function BookDemoThankYou() {
  return (
    <>
      <BookDemoConversion />
      <SiteNav />
      <main className="flex-1">
        <section className="py-22">
          <div className="mx-auto max-w-[600px] px-7 text-center">
            <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full bg-live/15">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-live">
                <Check className="h-9 w-9 text-white" strokeWidth={3} aria-hidden="true" />
              </div>
            </div>
            <h1 className="mt-4.5 text-[clamp(30px,4.4vw,44px)] font-bold tracking-[-0.022em] text-ink">
              We&rsquo;re looking forward to talking with you.
            </h1>
            <p className="mt-4 text-[15.5px] leading-[1.62] text-ink-2">
              We can&rsquo;t wait to understand your document-processing requirements and show you how Proof
              Perimeter fits into your environment.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
