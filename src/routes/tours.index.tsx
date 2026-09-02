import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin, Mountain } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AskSpecialistButton } from "@/components/ask-specialist";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useMediaUrls } from "@/lib/media";

export const Route = createFileRoute("/tours/")({
  head: () => ({
    meta: [
      { title: "Tours — EDGELINK Tours" },
      { name: "description", content: "Browse every EDGELINK Tours expedition: gorilla trekking, Big Five safaris, rainforest canopy walks and Lake Kivu retreats." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Tours — EDGELINK Tours" },
      { property: "og:description", content: "Browse every EDGELINK Tours expedition across Rwanda's parks and lakes." },
    ],
  }),
  component: ToursIndex,
});

export type TourRow = {
  id: string;
  slug: string | null;
  name: string;
  location: string;
  region: string | null;
  activity: string | null;
  duration: string;
  difficulty: string | null;
  price: string;
  featured_image_url: string;
  description: string;
  highlights: string[] | null;
};

export function useTours() {
  return useQuery({
    queryKey: ["public-tours"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tours")
        .select("id, slug, name, location, region, activity, duration, difficulty, price, featured_image_url, description, highlights")
        .eq("status", "active")
        .order("created_at");
      if (error) throw error;
      return (data ?? []) as TourRow[];
    },
  });
}

function ToursIndex() {
  const { t: tr } = useTranslation();
  const { data: tours, isLoading } = useTours();
  const [region, setRegion] = useState("All");
  const [activity, setActivity] = useState("All");
  const [duration, setDuration] = useState("All");
  const media = useMediaUrls("tours", (tours ?? []).map((t) => t.featured_image_url));

  const regions = useMemo(() => ["All", ...new Set((tours ?? []).map((t) => t.region || t.location).filter(Boolean))], [tours]);
  const durations = useMemo(() => ["All", ...new Set((tours ?? []).map((t) => t.duration).filter(Boolean))], [tours]);
  const activities = useMemo(() => ["All", ...new Set((tours ?? []).map((t) => t.activity).filter(Boolean) as string[])], [tours]);

  const items = (tours ?? []).filter(
    (t) =>
      (region === "All" || (t.region || t.location) === region) &&
      (activity === "All" || t.activity === activity) &&
      (duration === "All" || t.duration === duration),
  );

  return (
    <AppShell>
      <section className="border-b border-border bg-forest-deep py-16 text-primary-foreground md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">{tr("hub.eyebrow")}</p>
          <h1 className="font-display text-4xl font-bold md:text-5xl">{tr("hub.title")}</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">{tr("hub.subtitle")}</p>
          <AskSpecialistButton className="mt-6 bg-gold text-gold-foreground hover:brightness-95" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="mb-8 space-y-3">
          <FilterRow label={tr("hub.region")} options={regions as string[]} value={region} onChange={setRegion} />
          <FilterRow label={tr("hub.activity")} options={activities} value={activity} onChange={setActivity} />
          <FilterRow label={tr("hub.duration")} options={durations} value={duration} onChange={setDuration} />
          <p className="pt-1 text-xs text-muted-foreground">{tr("hub.results", { count: items.length })}</p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => <Skeleton key={i} className="h-80 rounded-2xl" />)}
          </div>
        ) : items.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
            {tr("hub.empty")}
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((t, i) => (
              <motion.article
                key={t.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-luxe"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  {media(t.featured_image_url) ? (
                    <img src={media(t.featured_image_url)} alt={t.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="grid h-full w-full place-items-center text-muted-foreground"><Mountain className="h-8 w-8" /></div>
                  )}
                  <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                    <Clock className="h-3 w-3" /> {t.duration}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                    <MapPin className="h-3 w-3" /> {t.region || t.location}
                  </div>
                  <h2 className="mt-1 font-display text-xl font-bold">{t.name}</h2>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{t.description}</p>
                  <div className="mt-auto flex items-end justify-between border-t border-border pt-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{tr("hub.from")}</div>
                      <div className="font-display text-2xl font-bold text-forest">${Number(t.price).toLocaleString()}</div>
                    </div>
                    <Button asChild size="sm" className="bg-forest text-primary-foreground hover:bg-forest-deep">
                      <Link to="/tours/$slug" params={{ slug: t.slug ?? t.id }}>
                        {tr("hub.view")} <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </AppShell>
  );
}

function FilterRow({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  const { t } = useTranslation();
  const allLabel = t("hub.all");
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
            value === o ? "border-forest bg-forest text-primary-foreground" : "border-border hover:border-forest/50"
          }`}
        >
          {o === "All" ? allLabel : o}
        </button>
      ))}
    </div>
  );
}
