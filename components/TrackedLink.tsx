"use client";

import Link from "next/link";
import { capturePosthogEvent } from "@/lib/posthog";

export function TrackedLink({
  href,
  trackEvent,
  className,
  children,
}: {
  href: string;
  trackEvent: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={className} onClick={() => capturePosthogEvent(trackEvent)}>
      {children}
    </Link>
  );
}
