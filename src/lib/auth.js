import crypto from "crypto";

const COOKIE_NAME = "admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not set — add it to your environment variables.");
  }
  return secret;
}

// A simple signed, expiring token: base64("expiresAt.signature") where
// signature = HMAC-SHA256(SESSION_SECRET, expiresAt), hex-encoded.
// Not a full session-store — appropriate for a single-admin personal
// dashboard, not a multi-user product. Documented as such in README.md.
function signature(expiresAt) {
  const secret = getSecret();
  return crypto.createHmac("sha256", secret).update(String(expiresAt)).digest("hex");
}

export function createSessionToken() {
  const expiresAt = Date.now() + MAX_AGE_SECONDS * 1000;
  const token = Buffer.from(`${expiresAt}.${signature(expiresAt)}`).toString("base64url");
  return { token, maxAge: MAX_AGE_SECONDS };
}

export function verifySessionToken(token) {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const [expiresAtStr, sig] = decoded.split(".");
    const expiresAt = Number(expiresAtStr);
    if (!expiresAt || !sig) return false;
    if (Date.now() > expiresAt) return false;
    const expected = signature(expiresAt);
    // constant-time compare
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function checkPassword(candidate) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(String(candidate || ""));
  const b = Buffer.from(String(expected));
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
