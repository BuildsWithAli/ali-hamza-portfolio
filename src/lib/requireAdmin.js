import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "./auth";

/** True when the current request carries a valid admin session cookie. */
export function isAdminRequest() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}
