import { NextResponse } from "next/server";
import { checkPassword, createSessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST(req) {
  let password = "";
  try {
    const form = await req.formData();
    password = form.get("password") || "";
  } catch {
    try {
      const body = await req.json();
      password = body?.password || "";
    } catch {}
  }

  const url = new URL(req.url);

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.redirect(new URL("/admin/login?error=not_configured", url), { status: 303 });
  }

  if (!checkPassword(password)) {
    return NextResponse.redirect(new URL("/admin/login?error=1", url), { status: 303 });
  }

  const { token, maxAge } = createSessionToken();
  const res = NextResponse.redirect(new URL("/admin", url), { status: 303 });
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
  return res;
}
