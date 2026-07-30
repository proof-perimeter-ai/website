"use client";

import Link from "next/link";
import posthog from "posthog-js";

export function BtnSolid({
  href,
  children,
  trackEvent,
  hidden,
}: {
  href: string;
  children: React.ReactNode;
  trackEvent?: string;
  hidden?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={trackEvent ? () => posthog.capture(trackEvent) : undefined}
      className={
        hidden
          ? "hidden"
          : "inline-flex items-center justify-center gap-2 rounded-[5px] bg-signal px-4.5 py-2.75 text-[15px] font-semibold text-white transition-colors hover:bg-signal-deep"
      }
    >
      {children}
    </Link>
  );
}

export function BtnGhost({
  href,
  children,
  trackEvent,
  hidden,
}: {
  href: string;
  children: React.ReactNode;
  trackEvent?: string;
  hidden?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={trackEvent ? () => posthog.capture(trackEvent) : undefined}
      className={
        hidden
          ? "hidden"
          : "inline-flex items-center justify-center gap-2 rounded-[5px] border border-line-2 bg-transparent px-4.5 py-2.75 text-[15px] font-semibold text-ink transition-colors hover:border-ink"
      }
    >
      {children}
    </Link>
  );
}
