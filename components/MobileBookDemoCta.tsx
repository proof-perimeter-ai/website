"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import posthog from "posthog-js";

export function MobileBookDemoCta() {
  const pathname = usePathname();
  const [isPastFold, setIsPastFold] = useState(false);

  useEffect(() => {
    let ticking = false;
    const check = () => {
      ticking = false;
      setIsPastFold(window.scrollY > window.innerHeight);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    check();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/book-demo") || pathname.startsWith("/mockup")) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-sm transition-transform duration-300 ease-out md:hidden ${
        isPastFold ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
      aria-hidden={!isPastFold}
    >
      <Link
        href="/book-demo"
        onClick={() => posthog.capture("mobile_sticky_cta_clicked")}
        className="mobile-cta-shine relative isolate flex w-full items-center justify-center overflow-hidden rounded-[5px] bg-signal px-4.5 py-3 text-[15px] font-semibold text-white shadow-[0_-4px_20px_-6px_rgba(20,70,124,0.35)] transition-colors hover:bg-signal-deep"
      >
        <span className="relative z-10">Get started for free</span>
      </Link>
    </div>
  );
}
