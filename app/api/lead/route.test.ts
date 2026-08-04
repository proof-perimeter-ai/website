import { afterEach, describe, expect, it, vi } from "vitest";

const { upsertContactMock, verifyRecaptchaTokenMock, shouldBypassRecaptchaMock } = vi.hoisted(() => ({
  upsertContactMock: vi.fn(),
  verifyRecaptchaTokenMock: vi.fn(),
  shouldBypassRecaptchaMock: vi.fn(),
}));

vi.mock("@/lib/hubspot", () => ({
  HubspotError: class HubspotError extends Error {
    code: string;
    status: number;

    constructor(message: string, code: string, status: number) {
      super(message);
      this.name = "HubspotError";
      this.code = code;
      this.status = status;
    }
  },
  upsertContact: upsertContactMock,
}));

vi.mock("@/lib/recaptcha", () => ({
  shouldBypassRecaptcha: shouldBypassRecaptchaMock,
  verifyRecaptchaToken: verifyRecaptchaTokenMock,
}));

import { POST } from "./route";

describe("POST /api/lead", () => {
  afterEach(() => {
    upsertContactMock.mockReset();
    verifyRecaptchaTokenMock.mockReset();
    shouldBypassRecaptchaMock.mockReset();
    vi.restoreAllMocks();
  });

  it("submits successfully without reCAPTCHA when no token is sent", async () => {
    upsertContactMock.mockResolvedValueOnce({ contactId: "123", operation: "created" });

    const request = new Request("http://example.com/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "Akshay",
        lastName: "Sharma",
        email: "akshay@example.com",
      }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ success: true, contactId: "123" });
    expect(verifyRecaptchaTokenMock).not.toHaveBeenCalled();
    expect(shouldBypassRecaptchaMock).not.toHaveBeenCalled();
    expect(upsertContactMock).toHaveBeenCalledWith({
      firstName: "Akshay",
      lastName: "Sharma",
      email: "akshay@example.com",
    });
  });

  it("submits successfully on localhost without verifying a provided reCAPTCHA token", async () => {
    shouldBypassRecaptchaMock.mockReturnValueOnce(true);
    upsertContactMock.mockResolvedValueOnce({ contactId: "123", operation: "created" });

    const request = new Request("http://localhost:3000/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "Akshay",
        lastName: "Sharma",
        email: "akshay@example.com",
        recaptchaToken: "bad-local-token",
      }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ success: true, contactId: "123" });
    expect(shouldBypassRecaptchaMock).toHaveBeenCalledWith("localhost");
    expect(verifyRecaptchaTokenMock).not.toHaveBeenCalled();
  });
});
