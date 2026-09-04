import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client using the service-role key — full read/write
// access, used only inside API routes / server components. NEVER import
// this from a "use client" file or expose SUPABASE_SERVICE_ROLE_KEY to
// the browser.
//
// Returns null when Supabase hasn't been configured yet, so every caller
// degrades gracefully instead of crashing the page during initial setup
// (see README.md for how to create the project and set the env vars).
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
