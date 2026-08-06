"use client";

import posthog from "posthog-js";

type EventProperties = Record<string, unknown> | undefined;
type IdentifyProperties = Record<string, string | number | boolean | null | undefined> | undefined;

const isBrowser = typeof window !== "undefined";
const isLocalhost =
  isBrowser && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
const isProductionVercel = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

export function capturePosthogEvent(event: string, properties?: EventProperties) {
  if (isLocalhost) {
    console.log("[PostHog][localhost] capture", { event, properties });
    return;
  }

  if (!isProductionVercel) return;

  posthog.capture(event, properties);
}

export function identifyPosthogUser(distinctId: string, properties?: IdentifyProperties) {
  if (isLocalhost) {
    console.log("[PostHog][localhost] identify", { distinctId, properties });
    return;
  }

  if (!isProductionVercel) return;

  posthog.identify(distinctId, properties);
}
