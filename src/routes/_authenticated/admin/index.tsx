import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Map, Image as ImageIcon, Calendar, Star, MessageSquare, Users } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({ meta: [{ title: "Admin overview — RWIZA" }, { name: "robots", content: "noindex" }] }),
  component: AdminOverview,
});

function AdminOverview() {
  const stats = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [tours, gallery, bookings, experiences, chats, users] = await Promise.all([
        supabase.from("tours").select("id", { count: "exact", head: true }),
        supabase.from("gallery").select("id", { count: "exact", head: true }),
        supabase.from("bookings").select("id, status", { count: "exact" }),
        supabase.from("experiences").select("id, status", { count: "exact" }),
        supabase.from("chats").select("id, status", { count: "exact" }),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
      ]);
      return {
        tours: tours.count ?? 0,
        gallery: gallery.count ?? 0,
        bookings: bookings.count ?? 0,
        pendingBookings: (bookings.data ?? []).filter((b: any) => b.status === "pending").length,
        experiences: experiences.count ?? 0,
        pendingExperiences: (experiences.data ?? []).filter((e: any) => e.status === "pending").length,
        chats: chats.count ?? 0,
        activeChats: (chats.data ?? []).filter((c: any) => c.status === "active").length,
        users: users.count ?? 0,
      };
    },
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-forest">Overview</h1>
      <p className="mt-1 text-sm text-muted-foreground">Real-time snapshot of the RWIZA platform.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stat icon={Map} label="Tours" value={stats.data?.tours ?? 0} />
        <Stat icon={ImageIcon} label="Gallery images" value={stats.data?.gallery ?? 0} />
        <Stat icon={Users} label="Registered users" value={stats.data?.users ?? 0} />
        <Stat icon={Calendar} label="Bookings" value={stats.data?.bookings ?? 0} sub={`${stats.data?.pendingBookings ?? 0} pending`} />
        <Stat icon={Star} label="Experiences" value={stats.data?.experiences ?? 0} sub={`${stats.data?.pendingExperiences ?? 0} to review`} />
        <Stat icon={MessageSquare} label="Chats" value={stats.data?.chats ?? 0} sub={`${stats.data?.activeChats ?? 0} active`} />
      </div>
      <Card className="mt-8 p-6">
        <h2 className="font-display text-lg font-semibold text-forest">Welcome to Phase 1</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Foundation is live: authentication, roles, database schema, admin gate. Tours, gallery, bookings, experiences, and chat management pages will populate in the next phase.
        </p>
      </Card>
    </div>
  );
}

function Stat({ icon: Icon, label, value, sub }: { icon: React.ElementType; label: string; value: number | string; sub?: string }) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
          <div className="mt-2 font-display text-3xl font-bold text-forest">{value}</div>
          {sub && <div className="mt-1 text-xs text-gold-foreground/60">{sub}</div>}
        </div>
        <div className="rounded-full bg-gold/20 p-3 text-forest">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}
