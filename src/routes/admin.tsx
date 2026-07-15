import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, Ticket, Users, Truck, TrendingUp, Activity } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { AppShell } from "@/components/layout/app-shell";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — RWIZA" }, { name: "robots", content: "noindex" }] }),
  component: Admin,
});

const REVENUE = [
  { m: "Jan", r: 82 }, { m: "Feb", r: 96 }, { m: "Mar", r: 128 }, { m: "Apr", r: 142 },
  { m: "May", r: 168 }, { m: "Jun", r: 196 }, { m: "Jul", r: 186 }, { m: "Aug", r: 172 },
];
const BOOKINGS = [
  { t: "Gorilla", v: 42 }, { t: "Akagera", v: 38 }, { t: "Nyungwe", v: 24 }, { t: "Kivu", v: 18 }, { t: "Kigali", v: 12 },
];
const LOGS = [
  { who: "Blessing Okafor", action: "booked Akagera Big Five Safari", when: "2 min ago" },
  { who: "Sophie Laurent", action: "paid deposit for Gorilla Trekking", when: "17 min ago" },
  { who: "Emmanuel N.", action: "confirmed guide manifest for Trip #R-2419", when: "42 min ago" },
  { who: "Aditi Sharma", action: "requested Nyungwe reschedule", when: "1 hr ago" },
  { who: "Kwame Boateng", action: "left a 5-star review", when: "3 hrs ago" },
];

function Admin() {
  return (
    <AppShell>
      <div className="min-h-screen bg-forest-deep text-primary-foreground">
        <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Admin</p>
              <h1 className="mt-1 font-display text-3xl font-bold md:text-4xl">Operations Overview</h1>
            </div>
            <div className="rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold">Live · Auto-refresh 30s</div>
          </div>

          {/* KPI cards */}
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { icon: DollarSign, label: "Monthly Revenue", val: "$196k", delta: "+18%" },
              { icon: Ticket, label: "Active Permits", val: "43", delta: "+6" },
              { icon: Users, label: "Client Count", val: "312", delta: "+24" },
              { icon: Truck, label: "Fleet Status", val: "12 / 14", delta: "2 in service" },
            ].map((k, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="flex items-center justify-between">
                  <k.icon className="h-5 w-5 text-gold" />
                  <span className="text-[10px] font-semibold text-gold">{k.delta}</span>
                </div>
                <div className="mt-4 font-display text-3xl font-bold">{k.val}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-primary-foreground/60">{k.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:col-span-2">
              <div className="mb-4 flex items-center gap-2"><TrendingUp className="h-4 w-4 text-gold" /><h3 className="font-display text-lg font-bold">Seasonal Revenue ($k)</h3></div>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={REVENUE}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#1a221c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                  <Line type="monotone" dataKey="r" stroke="oklch(0.82 0.12 85)" strokeWidth={3} dot={{ r: 4, fill: "oklch(0.82 0.12 85)" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="mb-4 flex items-center gap-2"><Activity className="h-4 w-4 text-gold" /><h3 className="font-display text-lg font-bold">Bookings by Park</h3></div>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={BOOKINGS}>
                  <XAxis dataKey="t" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#1a221c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                  <Bar dataKey="v" fill="oklch(0.55 0.11 145)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Logs */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="mb-4 font-display text-lg font-bold">Operational Logs</h3>
            <ul className="space-y-3">
              {LOGS.map((l, i) => (
                <li key={i} className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/5 p-3 text-sm">
                  <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                  <div className="flex-1">
                    <div><span className="font-semibold text-gold">{l.who}</span> {l.action}</div>
                    <div className="text-xs text-primary-foreground/50">{l.when}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
