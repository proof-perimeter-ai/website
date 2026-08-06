"use client";

import { getCalApi } from "@calcom/embed-react";
import { useCallback, useEffect, useRef } from "react";
import {
  CAL_POPUP_OPEN_INITIATED_EVENT,
  CAL_POPUP_OPENED_EVENT,
  CAL_POPUP_OPEN_FAILED_EVENT,
} from "@/lib/analytics";
import { capturePosthogEvent } from "@/lib/posthog";

// If the user doesn't pick a slot within this window, treat the popup as
// abandoned and move on (see plan: lead capture itself is the tracked
// conversion, not necessarily a completed booking).
const ABANDON_TIMEOUT_MS = 60_000;

type OpenModalInput = {
  firstName: string;
  lastName: string;
  email: string;
};

type UseCalPopupOptions = {
  namespace: string;
  calLink: string;
  onBookingSuccess: () => void;
  onAbandoned: () => void;
};

export function useCalPopup({ namespace, calLink, onBookingSuccess, onAbandoned }: UseCalPopupOptions) {
  const calApiRef = useRef<Awaited<ReturnType<typeof getCalApi>> | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasResolvedRef = useRef(false);
  const onBookingSuccessRef = useRef(onBookingSuccess);
  const onAbandonedRef = useRef(onAbandoned);

  useEffect(() => {
    onBookingSuccessRef.current = onBookingSuccess;
    onAbandonedRef.current = onAbandoned;
  }, [onBookingSuccess, onAbandoned]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resolveOnce = useCallback(
    (action: () => void) => {
      if (hasResolvedRef.current) return;
      hasResolvedRef.current = true;
      clearTimer();
      action();
    },
    [clearTimer],
  );

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const cal = await getCalApi({ namespace });
      if (cancelled) return;
      calApiRef.current = cal;

      // bookingSuccessfulV2 is the current (non-deprecated) booking-completed event.
      cal("on", {
        action: "bookingSuccessfulV2",
        callback: () => resolveOnce(() => onBookingSuccessRef.current()),
      });
      // __closeIframe fires when the user dismisses the modal (backdrop / close
      // button / Escape) — the same signal the embed SDK's own modal-close state
      // handling listens for.
      cal("on", {
        action: "__closeIframe",
        callback: () => resolveOnce(() => onAbandonedRef.current()),
      });
      // linkReady / linkFailed are the same events the SDK's own ModalBox uses
      // internally to track "loaded" vs "failed" state (confirmed in
      // node_modules/@calcom/embed-core/dist/embed/embed.js) — the right signal
      // for whether the popup actually opened.
      cal("on", {
        action: "linkReady",
        callback: () => capturePosthogEvent(CAL_POPUP_OPENED_EVENT),
      });
      cal("on", {
        action: "linkFailed",
        callback: (event) =>
          capturePosthogEvent(CAL_POPUP_OPEN_FAILED_EVENT, {
            code: event.detail.data.code,
            message: event.detail.data.msg,
          }),
      });
    })();

    return () => {
      cancelled = true;
      clearTimer();
    };
  }, [namespace, resolveOnce, clearTimer]);

  const openModal = useCallback(
    ({ firstName, lastName, email }: OpenModalInput) => {
      const cal = calApiRef.current;
      if (!cal) return;

      hasResolvedRef.current = false;
      clearTimer();

      // Hide event-type details on small screens so the popup isn't cramped —
      // same breakpoint/behavior the old inline BookDemoCal embed used.
      const isSmallScreen = window.matchMedia("(max-width: 639px)").matches;
      cal("ui", { hideEventTypeDetails: isSmallScreen, layout: "month_view" });

      capturePosthogEvent(CAL_POPUP_OPEN_INITIATED_EVENT, { email, cal_link: calLink });

      const name = `${firstName} ${lastName}`.trim();
      cal("modal", { calLink, config: { name, email, layout: "month_view" } });

      timerRef.current = setTimeout(() => {
        resolveOnce(() => onAbandonedRef.current());
      }, ABANDON_TIMEOUT_MS);
    },
    [calLink, clearTimer, resolveOnce],
  );

  return { openModal };
}
