const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const SCORE_THRESHOLD = 0.5;

export type RecaptchaVerification =
  | { ok: true; score: number }
  | {
      ok: false;
      reason: "not_configured" | "request_failed" | "verification_failed" | "low_score";
      score?: number;
    };

export function shouldBypassRecaptcha(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1";
}

// v3 is score-based and never blocks a legitimate user with a challenge, so a
// failure here always means "reject the submission" — never "ask the user to
// prove they're human." If RECAPTCHA_SECRET_KEY isn't set yet, verification is
// treated as not-yet-enabled (ok: false, reason: "not_configured") rather than
// blocking every submission — the caller decides whether that's a hard block.
export async function verifyRecaptchaToken(token: string): Promise<RecaptchaVerification> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    return { ok: false, reason: "not_configured" };
  }

  let response: Response;
  try {
    response = await fetch(RECAPTCHA_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
  } catch {
    return { ok: false, reason: "request_failed" };
  }

  if (!response.ok) {
    return { ok: false, reason: "request_failed" };
  }

  const data = (await response.json().catch(() => null)) as { success: boolean; score?: number } | null;

  if (!data || !data.success) {
    return { ok: false, reason: "verification_failed" };
  }

  const score = data.score ?? 0;
  if (score < SCORE_THRESHOLD) {
    return { ok: false, reason: "low_score", score };
  }

  return { ok: true, score };
}
