import { describe, expect, it } from "vitest";
import { getLeadFormFieldErrors, leadFormSchema } from "./lead";

const validInput = {
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ada@example.com",
};

describe("leadFormSchema", () => {
  it("accepts valid input", () => {
    const result = leadFormSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("rejects an empty first name", () => {
    const result = leadFormSchema.safeParse({ ...validInput, firstName: "" });
    expect(result.success).toBe(false);
  });

  it("rejects a first name over 100 characters", () => {
    const result = leadFormSchema.safeParse({ ...validInput, firstName: "a".repeat(101) });
    expect(result.success).toBe(false);
  });

  it("accepts a first name at exactly 100 characters", () => {
    const result = leadFormSchema.safeParse({ ...validInput, firstName: "a".repeat(100) });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = leadFormSchema.safeParse({ ...validInput, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects an email over 255 characters", () => {
    const longEmail = `${"a".repeat(250)}@ex.com`;
    expect(longEmail.length).toBeGreaterThan(255);
    const result = leadFormSchema.safeParse({ ...validInput, email: longEmail });
    expect(result.success).toBe(false);
  });
});

describe("getLeadFormFieldErrors", () => {
  it("maps each failing field to its first error message", () => {
    const result = leadFormSchema.safeParse({ firstName: "", lastName: "", email: "bad" });
    expect(result.success).toBe(false);
    if (result.success) return;

    const fieldErrors = getLeadFormFieldErrors(result.error);
    expect(fieldErrors.firstName).toBeTruthy();
    expect(fieldErrors.lastName).toBeTruthy();
    expect(fieldErrors.email).toBeTruthy();
  });
});
