import { z } from "zod";

// Assumes input has already been trimmed/sanitized (see lib/sanitize.ts) — this
// schema only checks shape, length, and format, not whitespace.
export const leadFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(100, "First name must be 100 characters or fewer"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(100, "Last name must be 100 characters or fewer"),
  email: z
    .email("Enter a valid work email address")
    .max(255, "Email must be 255 characters or fewer"),
});

export type LeadFormInput = z.infer<typeof leadFormSchema>;

export type LeadFormFieldErrors = Partial<Record<keyof LeadFormInput, string>>;

export function getLeadFormFieldErrors(error: z.ZodError<LeadFormInput>): LeadFormFieldErrors {
  const fieldErrors: LeadFormFieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as keyof LeadFormInput | undefined;
    if (field && !fieldErrors[field]) {
      fieldErrors[field] = issue.message;
    }
  }
  return fieldErrors;
}
