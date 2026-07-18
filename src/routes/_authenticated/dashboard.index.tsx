import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Calendar, MessageSquare, Star, User as UserIcon, LogOut } from "lucide-react";
import { format } from "date-fns";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  head: () => ({
    meta: [
      { title: "My Dashboard — RWIZA" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { user, isAdmin, signOut } = useAuth();

  const { data: bookings } = useQuery({
    queryKey: ["my-bookings", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("id, booking_number, status, travel_start, adults, children, tours(name, location)")
        .eq("client_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!user,
  });

  const { data: profile } = useQuery({
    queryKey: ["my-profile", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", user!.id).maybeSingle();
      return data;
    },
    enabled: !!user,
  });

  return (
    <AppShell>
      <section className="bg-forest py-12 text-cream">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gold">Your dashboard</p>
              <h1 className="mt-2 font-display text-3xl md:text-4xl">
                Karibu, {profile?.full_name || user?.email}
              </h1>
            </div>
            <div className="flex gap-2">
              {isAdmin && (
                <Button asChild className="bg-gold text-gold-foreground">
                  <Link to="/admin">Open admin</Link>
                </Button>
              )}
              <Button variant="outline" onClick={() => void signOut()} className="border-cream/40 bg-transparent text-cream hover:bg-cream/10">
                <LogOut className="mr-2 h-4 w-4" /> Sign out
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard icon={Calendar} label="Bookings" value={bookings?.length ?? 0} />
          <StatCard icon={Star} label="Experiences shared" value={0} />
          <StatCard icon={MessageSquare} label="Open chats" value={0} />
          <StatCard icon={UserIcon} label="Member since" value={profile?.created_at ? format(new Date(profile.created_at), "MMM yyyy") : "—"} />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-forest">Your bookings</h2>
              <Button asChild size="sm" variant="outline">
                <Link to="/packages">Book another</Link>
              </Button>
            </div>
            <div className="mt-4 space-y-3">
              {(!bookings || bookings.length === 0) && (
                <p className="rounded-md bg-muted p-6 text-center text-sm text-muted-foreground">
                  No bookings yet. Explore our <Link to="/packages" className="underline">itineraries</Link>.
                </p>
              )}
              {bookings?.map((b) => (
                <div key={b.id} className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border p-4">
                  <div>
                    <div className="text-xs font-mono text-muted-foreground">{b.booking_number}</div>
                    <div className="font-semibold text-forest">{(b as any).tours?.name ?? "Tour"}</div>
                    <div className="text-xs text-muted-foreground">
                      {(b as any).tours?.location} · {b.adults} adults{b.children ? `, ${b.children} kids` : ""}
                      {b.travel_start ? ` · ${format(new Date(b.travel_start), "PP")}` : ""}
                    </div>
                  </div>
                  <StatusBadge status={b.status} />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-xl font-semibold text-forest">Quick links</h2>
            <div className="mt-4 space-y-2">
              <QuickLink to="/dashboard/bookings">All bookings</QuickLink>
              <QuickLink to="/dashboard/chat">Support chat</QuickLink>
              <QuickLink to="/dashboard/experiences">Share an experience</QuickLink>
              <QuickLink to="/dashboard/profile">Edit profile</QuickLink>
            </div>
          </Card>
        </div>
      </section>
    </AppShell>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | number }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-forest/10 p-2 text-forest">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="text-xl font-semibold text-forest">{value}</div>
        </div>
      </div>
    </Card>
  );
}

function QuickLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to as any} className="block rounded-md border border-border px-3 py-2 text-sm hover:bg-muted">
      {children} →
    </Link>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    under_review: "bg-blue-100 text-blue-800",
    available: "bg-emerald-100 text-emerald-800",
    confirmed: "bg-forest text-cream",
    completed: "bg-gold/30 text-forest",
    cancelled: "bg-red-100 text-red-800",
  };
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${styles[status] ?? "bg-muted text-foreground"}`}>
      {status.replace("_", " ")}
    </span>
  );
}
