"use client";

import { useCallback } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

// v3 is invisible — no widget, no user interaction. If the script never loads
// (ad-blocker, third-party-script-blocking browser), this resolves null rather
// than rejecting; callers submit anyway in that case (see BookDemoFlow) rather
// than turning an ad-blocker into a lost lead.
export function useRecaptcha(siteKey: string | undefined) {
  const getToken = useCallback(
    (action: string): Promise<string | null> => {
      if (!siteKey || typeof window === "undefined" || !window.grecaptcha) {
        return Promise.resolve(null);
      }
      const grecaptcha = window.grecaptcha;
      return new Promise((resolve) => {
        grecaptcha.ready(() => {
          grecaptcha.execute(siteKey, { action }).then(resolve).catch(() => resolve(null));
        });
      });
    },
    [siteKey],
  );

  return { getToken };
}
