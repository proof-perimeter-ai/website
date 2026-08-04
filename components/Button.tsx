"use client";

import Link from "next/link";
import { capturePosthogEvent } from "@/lib/posthog";

export function BtnSolid({
  href,
  children,
  trackEvent,
}: {
  href: string;
  children: React.ReactNode;
  trackEvent?: string;
}) {
  return (
    <Link
      href={href}
      onClick={trackEvent ? () => capturePosthogEvent(trackEvent) : undefined}
      className="inline-flex items-center justify-center gap-2 rounded-[5px] bg-signal px-4.5 py-2.75 text-[15px] font-semibold text-white transition-colors hover:bg-signal-deep"
    >
      {children}
    </Link>
  );
}

export function BtnGhost({
  href,
  children,
  trackEvent,
}: {
  href: string;
  children: React.ReactNode;
  trackEvent?: string;
}) {
  return (
    <Link
      href={href}
      onClick={trackEvent ? () => capturePosthogEvent(trackEvent) : undefined}
      className="inline-flex items-center justify-center gap-2 rounded-[5px] border border-line-2 bg-transparent px-4.5 py-2.75 text-[15px] font-semibold text-ink transition-colors hover:border-ink"
    >
      {children}
    </Link>
  );
}
