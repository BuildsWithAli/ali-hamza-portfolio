import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/requireAdmin";
import { saveContent } from "@/lib/content";

export async function PUT(req) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Content must be an object." }, { status: 400 });
  }

  try {
    await saveContent(body);
  } catch (err) {
    return NextResponse.json({ error: err?.message || "Failed to save." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
