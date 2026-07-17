"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import posthog from "posthog-js";

export function BookDemoCal() {
  const router = useRouter();

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
      cal("on", {
        action: "bookingSuccessfulV2",
        callback: () => {
          posthog.capture("demo_booking_completed");
          router.push("/book-demo/thank-you");
        },
      });
    })();
  }, [router]);

  return (
    <Cal
      namespace="30min"
      calLink="gaurav-bu/30min"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
    />
  );
}
