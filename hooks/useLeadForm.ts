"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import posthog from "posthog-js";
import { leadFormSchema, getLeadFormFieldErrors, type LeadFormFieldErrors } from "@/lib/validation/lead";
import {
  LEAD_FORM_STARTED_EVENT,
  LEAD_FORM_EMAIL_BLURRED_EVENT,
  LEAD_HUBSPOT_REQUEST_STARTED_EVENT,
  LEAD_HUBSPOT_RESPONSE_RECEIVED_EVENT,
} from "@/lib/analytics";

const STORAGE_KEY = "pp_lead_form_state";
const GENERIC_ERROR = "Unable to continue. Please try again.";

export type LeadFormValues = {
  firstName: string;
  lastName: string;
  email: string;
};

type LeadFormStatus = "idle" | "submitting" | "success" | "error";

type StoredLeadState = LeadFormValues & { contactId: string };

const EMPTY_VALUES: LeadFormValues = { firstName: "", lastName: "", email: "" };

function readStoredState(): StoredLeadState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredLeadState;
  } catch {
    return null;
  }
}

function writeStoredState(state: StoredLeadState) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // sessionStorage unavailable (private browsing, quota) — non-fatal, persistence is best-effort.
  }
}

export function useLeadForm() {
  const [values, setValues] = useState<LeadFormValues>(EMPTY_VALUES);
  const [fieldErrors, setFieldErrors] = useState<LeadFormFieldErrors>({});
  const [status, setStatus] = useState<LeadFormStatus>("idle");
  const [apiError, setApiError] = useState<string | null>(null);
  const [contactId, setContactId] = useState<string | null>(null);
  const [restoredFromStorage, setRestoredFromStorage] = useState(false);
  const submittingRef = useRef(false);
  const hasStartedRef = useRef(false);

  // Deliberately reading sessionStorage post-mount rather than via a lazy
  // useState initializer: the page is server-rendered, and sessionStorage
  // isn't available server-side, so hydrating state from it during the
  // initial render would produce a client/server mismatch.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const stored = readStoredState();
    if (stored) {
      setValues({
        firstName: stored.firstName,
        lastName: stored.lastName,
        email: stored.email,
      });
      setContactId(stored.contactId);
      setStatus("success");
      setRestoredFromStorage(true);
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const updateField = useCallback((field: keyof LeadFormValues, value: string) => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      posthog.capture(LEAD_FORM_STARTED_EVENT);
    }
    setValues((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }, []);

  const handleEmailBlur = useCallback(() => {
    posthog.capture(LEAD_FORM_EMAIL_BLURRED_EVENT, {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
    });
  }, [values.firstName, values.lastName, values.email]);

  const submit = useCallback(
    async (recaptchaToken: string | null = null): Promise<{ ok: boolean; contactId?: string }> => {
      if (submittingRef.current) return { ok: false };

      const parsed = leadFormSchema.safeParse({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      });

      if (!parsed.success) {
        setFieldErrors(getLeadFormFieldErrors(parsed.error));
        return { ok: false };
      }

      submittingRef.current = true;
      setStatus("submitting");
      setApiError(null);
      setFieldErrors({});

      try {
        posthog.capture(LEAD_HUBSPOT_REQUEST_STARTED_EVENT, { payload: parsed.data });

        const response = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...parsed.data, ...(recaptchaToken && { recaptchaToken }) }),
        });
        const data = await response.json().catch(() => null);

        posthog.capture(LEAD_HUBSPOT_RESPONSE_RECEIVED_EVENT, { response: data, status: response.status });

        if (!response.ok || !data?.success) {
          setStatus("error");
          setApiError(GENERIC_ERROR);
          return { ok: false };
        }

        posthog.identify(parsed.data.email, {
          email: parsed.data.email,
          first_name: parsed.data.firstName,
          last_name: parsed.data.lastName,
          full_name: `${parsed.data.firstName} ${parsed.data.lastName}`,
          hubspot_contact_id: data.contactId,
        });

        setContactId(data.contactId);
        setStatus("success");
        writeStoredState({ ...values, contactId: data.contactId });
        return { ok: true, contactId: data.contactId as string };
      } catch {
        setStatus("error");
        setApiError(GENERIC_ERROR);
        return { ok: false };
      } finally {
        submittingRef.current = false;
      }
    },
    [values],
  );

  return {
    values,
    updateField,
    handleEmailBlur,
    fieldErrors,
    status,
    apiError,
    contactId,
    restoredFromStorage,
    submit,
  };
}
