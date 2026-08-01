"use client";

import type { LeadFormValues } from "@/hooks/useLeadForm";
import type { LeadFormFieldErrors } from "@/lib/validation/lead";

const inputClass =
  "w-full rounded-[5px] border border-line bg-paper px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink-2/60 transition-colors focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/30 disabled:cursor-not-allowed disabled:opacity-60";

const errorInputClass = "border-red-400 focus:border-red-500 focus:ring-red-400/30";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function LeadForm({
  values,
  fieldErrors,
  apiError,
  isSubmitting,
  disabled,
  onChange,
  onEmailBlur,
  onSubmit,
}: {
  values: LeadFormValues;
  fieldErrors: LeadFormFieldErrors;
  apiError: string | null;
  isSubmitting: boolean;
  disabled: boolean;
  onChange: (field: keyof LeadFormValues, value: string) => void;
  onEmailBlur: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <fieldset disabled={disabled} className="grid gap-5">
        <legend className="sr-only">Book a demo</legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="lead-first-name" label="First Name" error={fieldErrors.firstName}>
            <input
              id="lead-first-name"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              maxLength={100}
              value={values.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
              aria-invalid={!!fieldErrors.firstName}
              aria-describedby={fieldErrors.firstName ? "lead-first-name-error" : undefined}
              className={`${inputClass} ${fieldErrors.firstName ? errorInputClass : ""}`}
            />
          </Field>

          <Field id="lead-last-name" label="Last Name" error={fieldErrors.lastName}>
            <input
              id="lead-last-name"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              maxLength={100}
              value={values.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
              aria-invalid={!!fieldErrors.lastName}
              aria-describedby={fieldErrors.lastName ? "lead-last-name-error" : undefined}
              className={`${inputClass} ${fieldErrors.lastName ? errorInputClass : ""}`}
            />
          </Field>
        </div>

        <Field id="lead-email" label="Work Email" error={fieldErrors.email}>
          <input
            id="lead-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={255}
            value={values.email}
            onChange={(e) => onChange("email", e.target.value)}
            onBlur={onEmailBlur}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "lead-email-error" : undefined}
            className={`${inputClass} ${fieldErrors.email ? errorInputClass : ""}`}
          />
        </Field>

        {apiError && (
          <div role="alert" aria-live="assertive" className="rounded-[5px] border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            {apiError}
          </div>
        )}

        <button
          type="submit"
          disabled={disabled}
          aria-busy={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-[5px] bg-signal px-4.5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-signal-deep disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {isSubmitting ? "Creating your booking…" : "Next"}
        </button>
      </fieldset>
    </form>
  );
}
