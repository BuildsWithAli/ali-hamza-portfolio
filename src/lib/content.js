import { getSupabaseAdmin } from "./supabaseServer";
import defaultContent from "./content.default";

const CONTENT_TABLE = "content";
const CONTENT_ROW_ID = "main";

/**
 * Server-side content loader. Reads the editable-from-/admin content row
 * from Supabase; falls back to the bundled defaults when Supabase isn't
 * configured yet, the row doesn't exist yet, or the read fails for any
 * reason — the public site should never break because of this.
 */
export async function getContent() {
  const admin = getSupabaseAdmin();
  if (!admin) return defaultContent;

  try {
    const { data, error } = await admin
      .from(CONTENT_TABLE)
      .select("data")
      .eq("id", CONTENT_ROW_ID)
      .maybeSingle();

    if (error || !data?.data) return defaultContent;
    // Shallow-merge over defaults so a partially-filled row (or a field
    // added to the schema later) never leaves the page missing content.
    return { ...defaultContent, ...data.data };
  } catch {
    return defaultContent;
  }
}

export async function saveContent(nextContent) {
  const admin = getSupabaseAdmin();
  if (!admin) throw new Error("Supabase is not configured");

  const { error } = await admin
    .from(CONTENT_TABLE)
    .upsert({ id: CONTENT_ROW_ID, data: nextContent, updated_at: new Date().toISOString() });

  if (error) throw error;
}

export { defaultContent };
