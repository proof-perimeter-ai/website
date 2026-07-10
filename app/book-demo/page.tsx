import type { Metadata } from "next";
import Script from "next/script";
import { Eyebrow } from "@/components/Eyebrow";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

const HUBSPOT_FORM_ID = "6a13a408-2df7-4adb-9267-7882e29c1082";
const HUBSPOT_PORTAL_ID = "246627877";
const HUBSPOT_REGION = "na2";

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
          <div className="mx-auto max-w-[760px] px-7 text-center">
            <Eyebrow className="justify-center">Get started</Eyebrow>
            <h1 className="mt-4.5 text-[clamp(30px,4.4vw,44px)] font-bold tracking-[-0.022em] text-ink">
              Start free with your own model key — or go Enterprise with ours.
            </h1>
            <p className="mx-auto mt-5.5 max-w-[56ch] text-lg text-ink-2">
              Use Proof Perimeter for free with your own LLM API key — no cost beyond what you pay your model
              provider. Or move to the Enterprise tier for Proof Perimeter&rsquo;s proprietary document-processing
              models, hosted or on-premises, with enterprise-grade security, deployment and support. Tell us a bit
              about what you&rsquo;re processing and we&rsquo;ll get you set up.
            </p>

            <div className="mx-auto mt-12 max-w-[560px] rounded-lg border border-line bg-panel p-8 text-left">
              <div
                className="hs-form-frame"
                data-region={HUBSPOT_REGION}
                data-form-id={HUBSPOT_FORM_ID}
                data-portal-id={HUBSPOT_PORTAL_ID}
              />
            </div>
            <p className="mt-6 text-sm text-ink-2">
              Prefer email? Reach us directly at{" "}
              <a href="mailto:gaurav@proofperimeter.com" className="text-signal hover:underline">
                gaurav@proofperimeter.com
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
      <Script src={`https://js-${HUBSPOT_REGION}.hsforms.net/forms/embed/${HUBSPOT_PORTAL_ID}.js`} strategy="afterInteractive" />
    </>
  );
}
