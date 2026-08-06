"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import { useEffect } from "react";
import posthog from "posthog-js";

export function BookDemoConversion() {
  useEffect(() => {
    sendGTMEvent({
      event: "book_demo_conversion",
      value: 10.0,
      currency: "INR",
    });
    posthog.capture("book_demo_thank_you_viewed");
  }, []);

  return null;
}
