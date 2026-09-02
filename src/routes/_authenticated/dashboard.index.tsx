import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  MessageSquare,
  Star,
  User as UserIcon,
  MapPin,
  ArrowRight,
  Plane,
  Camera,
  Settings,
} from "lucide-react";
import { format, differenceInCalendarDays } from "date-fns";
import { StatusBadge } from "@/components/status-badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  head: () => ({
    meta: [
      { title: "My Dashboard — EDGELINK Tours" },
      { name: "description", content: "Track your safari bookings, chat with your travel designer and share your EDGELINK Tours experiences." },
      { property: "og:title", content: "My Dashboard — EDGELINK Tours" },
      { property: "og:description", content: "Track your safari bookings, chat with your travel designer and share your experiences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuth();

  const { data: bookings, isLoading: loadingBookings } = useQuery({
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

  const { data: experienceCount } = useQuery({
    queryKey: ["my-experience-count", user?.id],
    queryFn: async () => {
      const { count } = await supabase
        .from("experiences")
        .select("id", { count: "exact", head: true })
        .eq("client_id", user!.id);
      return count ?? 0;
    },
    enabled: !!user,
  });

  const { data: openChats } = useQuery({
    queryKey: ["my-open-chats", user?.id],
    queryFn: async () => {
      const { count } = await supabase
        .from("chats")
        .select("id", { count: "exact", head: true })
        .eq("client_id", user!.id)
        .eq("status", "active");
      return count ?? 0;
    },
    enabled: !!user,
  });

  const upcoming = (bookings ?? [])
    .filter((b) => b.travel_start && b.status !== "cancelled" && new Date(b.travel_start) >= new Date())
    .sort((a, b) => (a.travel_start! < b.travel_start! ? -1 : 1))[0];
  const daysToGo = upcoming?.travel_start
    ? differenceInCalendarDays(new Date(upcoming.travel_start), new Date())
    : null;

  const firstName = (profile?.full_name || user?.email || "").split(/[ @]/)[0];

  return (
    <DashboardShell
      title={`Karibu, ${firstName}`}
      description="Everything about your East African journey — bookings, conversations and memories — in one place."
      actions={
        <Button asChild size="sm" variant="outline">
          <Link to="/tours">Browse journeys</Link>
        </Button>
      }
    >
      <section className="relative overflow-hidden rounded-2xl gradient-forest p-6 text-cream">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)", backgroundSize: "26px 26px" }}
        />
        <div className="relative flex flex-wrap items-center gap-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold text-gold-foreground">
            <Plane className="h-6 w-6" />
          </div>
          {upcoming ? (
            <>
              <div className="min-w-[12rem] flex-1">
                <div className="text-xs uppercase tracking-widest text-cream/60">Next departure</div>
                <div className="font-display text-xl">{(upcoming as any).tours?.name ?? "Your tour"}</div>
                <div className="text-xs text-cream/70">
                  {(upcoming as any).tours?.location} · {format(new Date(upcoming.travel_start!), "PPP")}
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-4xl text-gold">{daysToGo}</div>
                <div className="text-xs uppercase tracking-widest text-cream/60">days to go</div>
              </div>
            </>
          ) : (
            <div className="min-w-[12rem] flex-1">
              <div className="text-xs uppercase tracking-widest text-cream/60">Next departure</div>
              <div className="font-display text-xl">Nothing on the calendar yet</div>
              <div className="text-xs text-cream/70">Pick a journey and we'll count down the days with you.</div>
            </div>
          )}
        </div>
      </section>

      <section className="py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Calendar} label="Bookings" value={bookings?.length ?? 0} to="/dashboard/bookings" />
          <StatCard icon={Star} label="Experiences shared" value={experienceCount ?? 0} to="/dashboard/experiences" />
          <StatCard icon={MessageSquare} label="Open chats" value={openChats ?? 0} to="/dashboard/chat" />
          <StatCard
            icon={UserIcon}
            label="Member since"
            value={profile?.created_at ? format(new Date(profile.created_at), "MMM yyyy") : "—"}
            to="/dashboard/profile"
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-semibold text-forest">Your bookings</h2>
                <p className="text-xs text-muted-foreground">Latest first</p>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link to="/tours">Book another</Link>
              </Button>
            </div>

            <div className="mt-5 space-y-3">
              {loadingBookings &&
                [0, 1].map((i) => <div key={i} className="h-20 animate-pulse rounded-xl bg-muted" />)}

              {!loadingBookings && (bookings?.length ?? 0) === 0 && (
                <div className="rounded-xl border border-dashed border-border p-10 text-center">
                  <MapPin className="mx-auto h-6 w-6 text-muted-foreground" />
                  <p className="mt-3 text-sm font-semibold text-forest">No bookings yet</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Your next adventure starts with a single itinerary.
                  </p>
                  <Button asChild size="sm" className="mt-4 bg-gold text-gold-foreground hover:brightness-95">
                    <Link to="/tours">Explore itineraries</Link>
                  </Button>
                </div>
              )}

              {bookings?.slice(0, 5).map((b) => (
                <Link
                  key={b.id}
                  to="/dashboard/bookings"
                  className="group flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border p-4 transition hover:border-gold hover:shadow-sm"
                >
                  <div className="min-w-0">
                    <div className="font-mono text-[11px] text-muted-foreground">{b.booking_number}</div>
                    <div className="truncate font-semibold text-forest">{(b as any).tours?.name ?? "Tour"}</div>
                    <div className="text-xs text-muted-foreground">
                      {(b as any).tours?.location} · {b.adults} adults{b.children ? `, ${b.children} kids` : ""}
                      {b.travel_start ? ` · ${format(new Date(b.travel_start), "PP")}` : ""}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={b.status} />
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-gold" />
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="font-display text-xl font-semibold text-forest">Quick actions</h2>
              <div className="mt-4 space-y-2">
                <QuickLink to="/dashboard/bookings" icon={Calendar} title="All bookings" desc="Track and manage trips" />
                <QuickLink to="/dashboard/chat" icon={MessageSquare} title="Support chat" desc="Talk to your designer" />
                <QuickLink to="/dashboard/experiences" icon={Camera} title="Share an experience" desc="Photos and reviews" />
                <QuickLink to="/dashboard/profile" icon={Settings} title="Profile settings" desc="Details and preferences" />
              </div>
            </Card>

            <Card className="gradient-forest p-6 text-cream">
              <h3 className="font-display text-lg">Need a hand?</h3>
              <p className="mt-1 text-sm text-cream/70">
                Our travel designers are on WhatsApp and live chat every day.
              </p>
              <Button asChild className="mt-4 w-full bg-gold text-gold-foreground hover:brightness-95">
                <Link to="/dashboard/chat">Start a conversation</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  to,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  to: string;
}) {
  return (
    <Link to={to as any} className="group block">
      <Card className={cn("p-5 transition hover:border-gold hover:shadow-md")}>
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-forest/10 p-3 text-forest transition group-hover:bg-gold/20">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
            <div className="font-display text-2xl font-semibold text-forest">{value}</div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

function QuickLink({
  to,
  icon: Icon,
  title,
  desc,
}: {
  to: string;
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <Link
      to={to as any}
      className="group flex items-center gap-3 rounded-xl border border-border px-3 py-2.5 transition hover:border-gold hover:bg-muted/50"
    >
      <Icon className="h-4 w-4 text-forest" />
      <div className="flex-1">
        <div className="text-sm font-medium text-forest">{title}</div>
        <div className="text-[11px] text-muted-foreground">{desc}</div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-gold" />
    </Link>
  );
}
