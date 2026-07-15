import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle, Utensils, ShieldCheck, MapPin, Users } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/guide")({
  head: () => ({ meta: [{ title: "Tour Guide Panel — RWIZA" }, { name: "robots", content: "noindex" }] }),
  component: GuidePanel,
});

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SCHEDULE: Record<number, { tour: string; time: string; pickup: string; color: string }> = {
  1: { tour: "Gorilla Trek", time: "06:30", pickup: "Mountain View Lodge", color: "bg-forest text-primary-foreground" },
  3: { tour: "Golden Monkey", time: "07:00", pickup: "Kinigi Guest House", color: "bg-gold text-gold-foreground" },
  4: { tour: "Twin Lakes Hike", time: "08:00", pickup: "Musanze Town", color: "bg-forest text-primary-foreground" },
  6: { tour: "Gorilla Trek", time: "06:30", pickup: "Bisate Lodge", color: "bg-forest text-primary-foreground" },
};

const MANIFEST = [
  { name: "Aisha Uwimana", country: "🇷🇼 RW", diet: "Vegetarian", medical: "None", permit: "GT-2026-441" },
  { name: "Michael Chen", country: "🇸🇬 SG", diet: "None", medical: "Mild asthma", permit: "GT-2026-442" },
  { name: "Sophie Laurent", country: "🇫🇷 FR", diet: "Gluten-free", medical: "None", permit: "GT-2026-443" },
  { name: "Kwame Boateng", country: "🇬🇭 GH", diet: "None", medical: "None", permit: "GT-2026-444" },
];

function GuidePanel() {
  const [today] = useState(3); // Wed

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Guide Panel</p>
          <h1 className="mt-1 font-display text-3xl font-bold md:text-4xl">Muraho, Emmanuel.</h1>
          <p className="mt-2 text-muted-foreground">Head Guide · Volcanoes NP · 4 assigned trips this week.</p>
        </div>

        {/* Calendar */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">This Week</h2>
            <Button variant="outline" size="sm">Full month</Button>
          </div>
          <div className="grid grid-cols-7 gap-3">
            {WEEK.map((d, i) => {
              const s = SCHEDULE[i];
              return (
                <div key={d} className={`rounded-xl border p-3 min-h-32 ${i === today ? "border-gold bg-gold/5" : "border-border"}`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold">{d}</span>
                    <span className="text-muted-foreground">{i + 14}</span>
                  </div>
                  {s && (
                    <div className={`mt-2 rounded-lg p-2 text-[11px] font-semibold ${s.color}`}>
                      <div>{s.time}</div>
                      <div className="mt-0.5">{s.tour}</div>
                      <div className="mt-1 flex items-center gap-1 text-[10px] font-normal opacity-80"><MapPin className="h-2.5 w-2.5" />{s.pickup}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Manifest */}
        <div className="mt-8 rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border p-6">
            <div>
              <h2 className="font-display text-xl font-bold">Active Trip Manifest</h2>
              <p className="mt-1 text-sm text-muted-foreground">Gorilla Trek · 28 Jul · Group of 4</p>
            </div>
            <div className="rounded-full bg-forest px-3 py-1 text-xs font-bold text-primary-foreground"><Users className="mr-1 inline h-3 w-3" />4 guests</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-3">Guest</th>
                  <th className="px-6 py-3">Country</th>
                  <th className="px-6 py-3">Diet</th>
                  <th className="px-6 py-3">Medical</th>
                  <th className="px-6 py-3">Permit</th>
                </tr>
              </thead>
              <tbody>
                {MANIFEST.map((m) => (
                  <tr key={m.permit} className="border-t border-border">
                    <td className="px-6 py-4 font-semibold">{m.name}</td>
                    <td className="px-6 py-4">{m.country}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-forest/10 px-2 py-0.5 text-[10px] font-semibold text-forest"><Utensils className="h-3 w-3" />{m.diet}</span>
                    </td>
                    <td className="px-6 py-4">
                      {m.medical === "None" ? <span className="text-muted-foreground">—</span> : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-semibold text-destructive"><AlertCircle className="h-3 w-3" />{m.medical}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">
                      <span className="inline-flex items-center gap-1 text-forest"><ShieldCheck className="h-3.5 w-3.5 text-gold" />{m.permit}</span>
                    </td>
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
