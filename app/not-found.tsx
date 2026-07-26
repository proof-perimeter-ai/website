import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BtnSolid, BtnGhost } from "@/components/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="py-22">
          <div className="mx-auto max-w-[600px] px-7 text-center">
            <Eyebrow className="justify-center">404</Eyebrow>
            <h1 className="mt-4.5 text-[clamp(30px,4.4vw,44px)] font-bold tracking-[-0.022em] text-ink">
              We couldn&rsquo;t find that page.
            </h1>
            <p className="mt-4 text-[15.5px] leading-[1.62] text-ink-2">
              The page you&rsquo;re looking for may have moved or no longer exists. Here are a few places to pick
              back up.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3.5">
              <BtnSolid href="/">Go to homepage</BtnSolid>
              <BtnGhost href="/glossary">Browse the glossary</BtnGhost>
              <BtnGhost href="/blog">Read the blog</BtnGhost>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
