"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import Script from "next/script";
import { useLeadForm } from "@/hooks/useLeadForm";
import { useCalPopup } from "@/hooks/useCalPopup";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { LeadForm } from "@/components/LeadForm";
import { capturePosthogEvent } from "@/lib/posthog";

const CAL_NAMESPACE = "book-demo";
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const RECAPTCHA_ACTION = "lead_form_submit";

export function BookDemoFlow({ calLink }: { calLink: string }) {
  const router = useRouter();
  const { values, updateField, handleEmailBlur, fieldErrors, status, apiError, submit, restoredFromStorage } =
    useLeadForm();
  const { getToken } = useRecaptcha(RECAPTCHA_SITE_KEY);

  const { openModal } = useCalPopup({
    namespace: CAL_NAMESPACE,
    calLink,
    onBookingSuccess: () => {
      capturePosthogEvent("demo_booking_completed");
      router.push("/book-demo/thank-you");
    },
    onAbandoned: () => {
      router.push("/book-demo/thank-you");
    },
  });

  const handleContinueToBooking = useCallback(() => {
    openModal({ firstName: values.firstName, lastName: values.lastName, email: values.email });
  }, [openModal, values.firstName, values.lastName, values.email]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const recaptchaToken = await getToken(RECAPTCHA_ACTION);
      const result = await submit(recaptchaToken);
      if (result.ok) {
        openModal({ firstName: values.firstName, lastName: values.lastName, email: values.email });
      }
    },
    [submit, openModal, getToken, values.firstName, values.lastName, values.email],
  );

  const isSubmitting = status === "submitting";
  const isDisabled = isSubmitting || status === "success";

  return (
    <div className="grid gap-6">
      {RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}

      {status === "success" && (
        <div className="rounded-[5px] border border-line bg-paper-2 px-4 py-3 text-sm text-ink-2">
          {restoredFromStorage ? (
            <>
              Thanks, {values.firstName}. Pick up where you left off —{" "}
              <button
                type="button"
                onClick={handleContinueToBooking}
                className="font-semibold text-signal hover:underline"
              >
                Continue to booking
              </button>
            </>
          ) : (
            <>Thanks, {values.firstName}! Opening the booking calendar…</>
          )}
        </div>
      )}

      <LeadForm
        values={values}
        fieldErrors={fieldErrors}
        apiError={apiError}
        isSubmitting={isSubmitting}
        disabled={isDisabled}
        onChange={updateField}
        onEmailBlur={handleEmailBlur}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
