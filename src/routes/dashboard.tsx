import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Calendar, MapPin, Phone, Download, Check, Clock } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Client Dashboard — RWIZA" }, { name: "robots", content: "noindex" }] }),
  component: Dashboard,
});

const PAYMENTS = [
  { id: "INV-2026-001", tour: "Gorilla Trekking", amount: 3450, status: "Paid" as const, date: "2026-06-01" },
  { id: "INV-2026-002", tour: "Akagera Safari", amount: 1090, status: "Deposit" as const, date: "2026-06-20" },
  { id: "INV-2026-003", tour: "Kivu Retreat", amount: 1250, status: "Pending" as const, date: "2026-07-10" },
];

const ITINERARY = [
  { day: "Day 1", title: "Arrive Kigali", body: "Airport pickup 14:30 · Driver: Emmanuel", done: true },
  { day: "Day 2", title: "Transfer to Musanze", body: "Departure 08:00 · Land Cruiser R-JV23", done: true },
  { day: "Day 3", title: "Gorilla Trek", body: "Park HQ 06:30 · Group of 8", done: false },
  { day: "Day 4", title: "Return to Kigali", body: "Departure after breakfast", done: false },
];

function Dashboard() {
  const { user, cart } = useApp();
  const [countdown, setCountdown] = useState({ d: 12, h: 5, m: 30 });
  useEffect(() => {
    const id = setInterval(() => setCountdown((c) => ({ ...c, m: (c.m + 1) % 60 })), 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Client Dashboard</p>
            <h1 className="mt-1 font-display text-3xl font-bold md:text-4xl">Karibu, {user.name === "Guest" ? "Traveller" : user.name.split(" ")[0]}.</h1>
          </div>
          <Button asChild className="bg-gold text-gold-foreground"><Link to="/tours">Book another journey</Link></Button>
        </div>

        {/* Upcoming */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-forest-deep p-6 text-primary-foreground shadow-luxe lg:col-span-2">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Next Departure</div>
            <h2 className="font-display text-3xl font-bold">Gorilla Trekking Expedition</h2>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-primary-foreground/80">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-gold" />Volcanoes NP</span>
              <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4 text-gold" />28 Jul 2026</span>
              <span className="inline-flex items-center gap-1.5"><Phone className="h-4 w-4 text-gold" />+250 788 111 222</span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[["d", "Days"], ["h", "Hrs"], ["m", "Min"]].map(([k, l]) => (
                <div key={k} className="rounded-xl bg-white/10 p-4 text-center">
                  <div className="font-display text-3xl font-bold text-gold">{countdown[k as "d" | "h" | "m"]}</div>
                  <div className="text-[10px] uppercase tracking-wider">{l}</div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <div className="mb-2 flex justify-between text-xs"><span>Trip preparation</span><span>60%</span></div>
              <Progress value={60} className="h-2" />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 font-display text-lg font-bold">Active bookings</h3>
            {cart.length === 0 ? (
              <p className="text-sm text-muted-foreground">No draft bookings. Explore the <Link to="/tours" className="text-gold underline">tours catalogue</Link>.</p>
            ) : (
              <ul className="space-y-3">
                {cart.map((c, i) => (
                  <li key={i} className="rounded-xl border border-border p-3 text-sm">
                    <div className="font-semibold">{c.tourName}</div>
                    <div className="text-xs text-muted-foreground">{c.date} · {c.groupSize} pax · ${c.pricePerPerson * c.groupSize}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Itinerary */}
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-6 font-display text-xl font-bold">Interactive Itinerary</h3>
          <div className="relative space-y-4 pl-8">
            <div className="absolute left-3 top-2 h-full w-0.5 bg-border" />
            {ITINERARY.map((it) => (
              <div key={it.day} className="relative">
                <div className={`absolute -left-6 top-1 grid h-6 w-6 place-items-center rounded-full ring-4 ring-background ${it.done ? "bg-gold text-gold-foreground" : "bg-muted"}`}>
                  {it.done ? <Check className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                </div>
                <div className={`rounded-xl border border-border p-4 ${it.done ? "bg-muted/30" : "bg-background"}`}>
                  <div className="text-xs font-semibold text-gold">{it.day}</div>
                  <div className="font-display text-lg font-bold">{it.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{it.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payments */}
        <div className="mt-8 rounded-2xl border border-border bg-card shadow-sm">
          <div className="border-b border-border p-6"><h3 className="font-display text-xl font-bold">Payments & Invoices</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-3">Invoice</th>
                  <th className="px-6 py-3">Tour</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {PAYMENTS.map((p) => (
                  <tr key={p.id} className="border-t border-border">
                    <td className="px-6 py-3 font-mono text-xs">{p.id}</td>
                    <td className="px-6 py-3 font-semibold">{p.tour}</td>
                    <td className="px-6 py-3">${p.amount.toLocaleString()}</td>
                    <td className="px-6 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        p.status === "Paid" ? "bg-forest/15 text-forest" : p.status === "Deposit" ? "bg-gold/20 text-gold" : "bg-destructive/15 text-destructive"
                      }`}>{p.status}</span>
                    </td>
                    <td className="px-6 py-3 text-muted-foreground">{p.date}</td>
                    <td className="px-6 py-3"><Button size="sm" variant="ghost" onClick={() => alert("Downloading PDF simulation…")}><Download className="mr-1 h-3.5 w-3.5" />PDF</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
