// Strips ASCII control characters and trims surrounding whitespace. Run before
// Zod validation so length checks apply to the value that actually gets sent to HubSpot.
const CONTROL_CHARS_PATTERN = "[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]";
const CONTROL_CHARS = new RegExp(CONTROL_CHARS_PATTERN, "g");

export function sanitizeText(value: string): string {
  return value.replace(CONTROL_CHARS, "").trim();
}

export function sanitizeSingleLine(value: string): string {
  return sanitizeText(value).replace(/[\r\n]+/g, " ");
}
