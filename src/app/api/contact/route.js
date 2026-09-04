import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseServer";
import { sendContactNotification, isEmailConfigured } from "@/lib/mailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body?.name || "").trim().slice(0, 120);
  const email = String(body?.email || "").trim().slice(0, 200);
  const message = String(body?.message || "").trim().slice(0, 5000);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email and message are all required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "That email address doesn't look valid." }, { status: 400 });
  }

  const admin = getSupabaseAdmin();
  const emailReady = isEmailConfigured();

  if (!admin && !emailReady) {
    return NextResponse.json(
      {
        error:
          "The contact form isn't wired up yet — add your Supabase and/or email environment variables (see README.md) and redeploy.",
      },
      { status: 503 }
    );
  }

  let stored = false;
  let storeError = null;
  if (admin) {
    const { error } = await admin.from("messages").insert({ name, email, message });
    if (error) storeError = error.message;
    else stored = true;
  }

  let emailed = false;
  let emailError = null;
  if (emailReady) {
    try {
      const result = await sendContactNotification({ name, email, message });
      emailed = result.sent;
    } catch (err) {
      emailError = err?.message || "Failed to send email.";
    }
  }

  if (!stored && !emailed) {
    console.error("Contact form failed on every channel:", { storeError, emailError });
    return NextResponse.json(
      { error: "Sorry — that couldn't be delivered right now. Please try again shortly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, stored, emailed });
}
