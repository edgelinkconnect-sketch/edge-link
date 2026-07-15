import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Clock, Mountain, ArrowRight, Filter } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TOURS, type Tour } from "@/lib/tours-data";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/tours")({
  head: () => ({
    meta: [
      { title: "All Tours — RWIZA Travel & Tour" },
      { name: "description", content: "Browse gorilla trekking, Big Five safari, hiking and cultural tours across Rwanda." },
    ],
  }),
  component: ToursListing,
});

const ACTIVITIES: Tour["activity"][] = ["Gorilla Trekking", "Safari", "Hiking", "Cultural"];

function ToursListing() {
  const { t } = useI18n();
  const [activities, setActivities] = useState<Set<string>>(new Set());
  const [maxPrice, setMaxPrice] = useState(4000);
  const [maxDuration, setMaxDuration] = useState(10);

  const filtered = useMemo(
    () =>
      TOURS.filter(
        (tt) =>
          (activities.size === 0 || activities.has(tt.activity)) &&
          tt.price <= maxPrice &&
          tt.duration <= maxDuration,
      ),
    [activities, maxPrice, maxDuration],
  );

  const toggleAct = (a: string) => {
    setActivities((s) => {
      const n = new Set(s);
      if (n.has(a)) n.delete(a); else n.add(a);
      return n;
    });
  };

  return (
    <AppShell>
      <section className="border-b border-border bg-forest-deep py-14 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Tours</p>
          <h1 className="font-display text-4xl font-bold md:text-5xl">Curated Rwandan Journeys</h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:px-6 lg:grid-cols-[280px_1fr]">
        {/* FILTERS */}
        <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-sm lg:sticky lg:top-24">
          <div className="mb-5 flex items-center gap-2">
            <Filter className="h-4 w-4 text-gold" />
            <h3 className="font-display text-lg font-bold">Filters</h3>
          </div>

          <div className="mb-6">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Activity</div>
            <div className="space-y-2">
              {ACTIVITIES.map((a) => (
                <div key={a} className="flex items-center gap-2">
                  <Checkbox id={a} checked={activities.has(a)} onCheckedChange={() => toggleAct(a)} />
                  <Label htmlFor={a} className="cursor-pointer text-sm font-normal">{a}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Max Price</span>
              <span className="text-gold">${maxPrice}</span>
            </div>
            <Slider value={[maxPrice]} onValueChange={(v) => setMaxPrice(v[0])} min={400} max={4000} step={100} />
          </div>

          <div className="mb-2">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Max Duration</span>
              <span className="text-gold">{maxDuration} {t("days")}</span>
            </div>
            <Slider value={[maxDuration]} onValueChange={(v) => setMaxDuration(v[0])} min={1} max={10} step={1} />
          </div>
        </aside>

        {/* GRID */}
        <div>
          <div className="mb-4 text-sm text-muted-foreground">{filtered.length} tours found</div>
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((tour) => (
              <Link
                key={tour.id}
                to="/tours/$tourId"
                params={{ tourId: tour.id }}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-luxe"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={tour.image} alt={tour.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  {tour.tag && (
                    <div className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-foreground">{tour.tag}</div>
                  )}
                  <div className="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">{tour.activity}</div>
                </div>
                <div className="p-5">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">{tour.region}</div>
                  <h3 className="mt-1 font-display text-xl font-bold">{tour.name}</h3>
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{tour.duration} {t("days")}</span>
                    <span className="inline-flex items-center gap-1"><Mountain className="h-3.5 w-3.5" />{tour.difficulty}</span>
                  </div>
                  <div className="mt-4 flex items-end justify-between border-t border-border pt-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("from")}</div>
                      <div className="font-display text-xl font-bold text-forest">${tour.price.toLocaleString()}</div>
                    </div>
                    <Button size="sm" className="bg-gold text-gold-foreground hover:brightness-95">{t("book_now")}<ArrowRight className="ml-1 h-3.5 w-3.5" /></Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
