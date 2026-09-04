import { redirect } from "next/navigation";
import { isAdminRequest } from "@/lib/requireAdmin";
import { getContent } from "@/lib/content";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseServer";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAdmin = await isAdminRequest();
  if (!isAdmin) {
    redirect("/admin/login");
  }

  const content = await getContent();

  let messages = [];
  let views = null;
  const admin = getSupabaseAdmin();
  if (admin) {
    const [{ data: msgData }, { data: statsData }] = await Promise.all([
      admin.from("messages").select("*").order("created_at", { ascending: false }).limit(200),
      admin.from("stats").select("views").eq("id", "global").maybeSingle(),
    ]);
    messages = msgData || [];
    views = statsData?.views ?? 0;
  }

  return (
    <AdminDashboard
      initialContent={content}
      initialMessages={messages}
      initialViews={views}
      supabaseConfigured={isSupabaseConfigured()}
    />
  );
}