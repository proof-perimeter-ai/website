"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import { useEffect } from "react";
import { capturePosthogEvent } from "@/lib/posthog";

export function BookDemoConversion() {
  useEffect(() => {
    sendGTMEvent({
      event: "book_demo_conversion",
      value: 10.0,
      currency: "INR",
    });
    capturePosthogEvent("book_demo_thank_you_viewed");
  }, []);

  return null;
}
