"use client";

import Link from "next/link";
import posthog from "posthog-js";

export function TrackedLink({
  href,
  trackEvent,
  className,
  hidden,
  children,
}: {
  href: string;
  trackEvent: string;
  className?: string;
  hidden?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={hidden ? "hidden" : className} onClick={() => posthog.capture(trackEvent)}>
      {children}
    </Link>
  );
}
