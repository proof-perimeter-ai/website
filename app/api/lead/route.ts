import { leadFormSchema, getLeadFormFieldErrors } from "@/lib/validation/lead";
import { sanitizeSingleLine } from "@/lib/sanitize";
import { upsertContact, HubspotError } from "@/lib/hubspot";
import { verifyRecaptchaToken } from "@/lib/recaptcha";

type LeadApiSuccess = { success: true; contactId: string };
type LeadApiFailure = {
  success: false;
  error: { code: string; message: string; fieldErrors?: Record<string, string> };
};

function failure(code: string, message: string, status: number, fieldErrors?: Record<string, string>) {
  const body: LeadApiFailure = { success: false, error: { code, message, ...(fieldErrors && { fieldErrors }) } };
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return failure("INVALID_JSON", "Request body must be valid JSON", 400);
  }

  if (typeof rawBody !== "object" || rawBody === null) {
    return failure("INVALID_JSON", "Request body must be a JSON object", 400);
  }

  const raw = rawBody as Record<string, unknown>;
  const sanitized = {
    firstName: typeof raw.firstName === "string" ? sanitizeSingleLine(raw.firstName) : raw.firstName,
    lastName: typeof raw.lastName === "string" ? sanitizeSingleLine(raw.lastName) : raw.lastName,
    email: typeof raw.email === "string" ? sanitizeSingleLine(raw.email) : raw.email,
  };

  const parsed = leadFormSchema.safeParse(sanitized);
  if (!parsed.success) {
    return failure(
      "VALIDATION_ERROR",
      "One or more fields are invalid",
      400,
      getLeadFormFieldErrors(parsed.error),
    );
  }

  // If no token was sent (e.g. the reCAPTCHA script itself was blocked
  // client-side by an ad-blocker), we let the submission through rather than
  // penalizing legitimate users for that — see hooks/useRecaptcha.ts. A token
  // that *was* sent but fails verification is always rejected.
  const recaptchaToken = typeof raw.recaptchaToken === "string" ? raw.recaptchaToken : null;
  if (recaptchaToken) {
    const verification = await verifyRecaptchaToken(recaptchaToken);
    if (!verification.ok && verification.reason !== "not_configured") {
      console.error("[api/lead] reCAPTCHA verification failed:", verification.reason);
      return failure("RECAPTCHA_FAILED", "Unable to verify this submission. Please try again.", 400);
    }
  }

  try {
    const { contactId } = await upsertContact(parsed.data);
    const body: LeadApiSuccess = { success: true, contactId };
    return Response.json(body, { status: 200 });
  } catch (error) {
    if (error instanceof HubspotError) {
      if (error.code === "HUBSPOT_NOT_CONFIGURED") {
        console.error("[api/lead] HubSpot is not configured:", error.message);
        return failure("HUBSPOT_NOT_CONFIGURED", "Unexpected error while creating your booking", 500);
      }
      console.error("[api/lead] HubSpot request failed:", error.code, error.message);
      return failure("HUBSPOT_ERROR", error.message, 502);
    }
    console.error("[api/lead] Unexpected error:", error);
    return failure("INTERNAL_ERROR", "Unexpected error while creating your booking", 500);
  }
}
