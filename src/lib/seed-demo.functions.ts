import { createServerFn } from "@tanstack/react-start";

export const seedDemoAccounts = createServerFn({ method: "POST" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const accounts = [
    { email: "admin.demo@edgelinktours.com", password: "EdgelinkDemo2026!", full_name: "Demo Admin", role: "admin" as const },
    { email: "super.demo@edgelinktours.com", password: "EdgelinkSuper2026!", full_name: "Super Demo", role: "admin" as const },
    { email: "traveller.demo@edgelinktours.com", password: "EdgelinkTravel2026!", full_name: "Demo Traveller", role: "client" as const },
  ];

  const out: string[] = [];
  for (const a of accounts) {
    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email: a.email,
      password: a.password,
      email_confirm: true,
      user_metadata: { full_name: a.full_name, phone: "+250791900016" },
    });
    let userId = created?.user?.id;
    if (error) {
      const { data: list } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
      userId = list?.users.find((u) => u.email === a.email)?.id;
      if (userId) {
        await supabaseAdmin.auth.admin.updateUserById(userId, { password: a.password, email_confirm: true });
      }
    }
    if (!userId) { out.push(`${a.email}: FAILED ${error?.message}`); continue; }
    await supabaseAdmin.from("profiles").upsert({ id: userId, full_name: a.full_name, phone: "+250791900016" });
    await supabaseAdmin.from("user_roles").upsert({ user_id: userId, role: a.role }, { onConflict: "user_id,role" });
    out.push(`${a.email}: ok (${a.role})`);
  }
  return out;
});
