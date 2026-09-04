import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseServer";

// GET: read the current view count without incrementing.
// POST: atomically increment (via the increment_views() SQL function —
// see supabase/schema.sql) and return the new total.
// Both return 200 with views: null when Supabase isn't configured yet,
// so the frontend badge just stays hidden instead of erroring.

export async function GET() {
  const admin = getSupabaseAdmin();
  if (!admin) return NextResponse.json({ views: null });

  const { data, error } = await admin.from("stats").select("views").eq("id", "global").maybeSingle();
  if (error) return NextResponse.json({ views: null });
  return NextResponse.json({ views: data?.views ?? 0 });
}

export async function POST() {
  const admin = getSupabaseAdmin();
  if (!admin) return NextResponse.json({ views: null });

  const { data, error } = await admin.rpc("increment_views");
  if (error) {
    console.error("increment_views failed:", error.message);
    return NextResponse.json({ views: null });
  }
  return NextResponse.json({ views: data ?? 0 });
}
