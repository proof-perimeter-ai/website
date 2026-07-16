"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useEffect } from "react";

export function BookDemoConversion() {
  useEffect(() => {
    sendGAEvent("event", "conversion", {
      send_to: "AW-18327393246/CheQCMCutdEcEN6nl6NE",
      value: 10.0,
      currency: "INR",
    });
  }, []);

  return null;
}
