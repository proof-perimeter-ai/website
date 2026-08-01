import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { verifyRecaptchaToken } from "./recaptcha";

const originalSecret = process.env.RECAPTCHA_SECRET_KEY;

function jsonResponse(body: unknown, ok = true) {
  return { ok, json: async () => body } as Response;
}

describe("verifyRecaptchaToken", () => {
  afterEach(() => {
    process.env.RECAPTCHA_SECRET_KEY = originalSecret;
    vi.unstubAllGlobals();
  });

  it("reports not_configured without calling Google when no secret is set", async () => {
    delete process.env.RECAPTCHA_SECRET_KEY;
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const result = await verifyRecaptchaToken("some-token");

    expect(result).toEqual({ ok: false, reason: "not_configured" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  describe("with a secret configured", () => {
    beforeEach(() => {
      process.env.RECAPTCHA_SECRET_KEY = "test-secret";
    });

    it("returns ok with the score when verification succeeds above the threshold", async () => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce(jsonResponse({ success: true, score: 0.9 })));

      const result = await verifyRecaptchaToken("good-token");

      expect(result).toEqual({ ok: true, score: 0.9 });
    });

    it("rejects with low_score when the score is below the threshold", async () => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce(jsonResponse({ success: true, score: 0.2 })));

      const result = await verifyRecaptchaToken("suspicious-token");

      expect(result).toEqual({ ok: false, reason: "low_score", score: 0.2 });
    });

    it("rejects with verification_failed when Google reports success: false", async () => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce(jsonResponse({ success: false })));

      const result = await verifyRecaptchaToken("bad-token");

      expect(result).toEqual({ ok: false, reason: "verification_failed" });
    });

    it("rejects with request_failed when the network call throws", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockRejectedValueOnce(new Error("network down")),
      );

      const result = await verifyRecaptchaToken("any-token");

      expect(result).toEqual({ ok: false, reason: "request_failed" });
    });

    it("rejects with request_failed when Google returns a non-2xx status", async () => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce(jsonResponse({}, false)));

      const result = await verifyRecaptchaToken("any-token");

      expect(result).toEqual({ ok: false, reason: "request_failed" });
    });
  });
});
