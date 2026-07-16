import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { DESTINATIONS } from "@/lib/site-data";

const ACTIVITIES = ["All", "Trekking", "Safari", "Canopy Walk"] as const;

export const Route = createFileRoute("/destinations/")({
  head: () => ({
    meta: [
      { title: "Destinations — RWIZA Travel & Tour" },
      { name: "description", content: "Volcanoes, Akagera, Nyungwe — three national parks, three unforgettable Rwandan expeditions." },
      { property: "og:url", content: "https://rwiza.lovable.app/destinations" },
      { property: "og:title", content: "Destinations — RWIZA Travel & Tour" },
      { property: "og:description", content: "Volcanoes, Akagera, Nyungwe — three national parks, three unforgettable Rwandan expeditions." },
    ],
    links: [{ rel: "canonical", href: "https://rwiza.lovable.app/destinations" }],
  }),
  component: DestinationsList,
});

function DestinationsList() {
  const [filter, setFilter] = useState<typeof ACTIVITIES[number]>("All");
  const list = DESTINATIONS.filter((d) => filter === "All" || d.activity === filter);

  return (
    <AppShell>
      <section className="border-b border-border bg-forest-deep py-16 text-primary-foreground md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Destinations</p>
          <h1 className="font-display text-4xl font-bold md:text-5xl">Choose your Rwandan chapter</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">From misty gorilla forest to open savannah, three journeys await.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="mb-8 flex flex-wrap gap-2">
          {ACTIVITIES.map((a) => (
            <Button
              key={a}
              variant={filter === a ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(a)}
              className={filter === a ? "bg-forest text-primary-foreground hover:bg-forest-deep" : ""}
            >
              {a}
            </Button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((d, i) => (
            <motion.div
              key={d.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link
                to="/destinations/$slug"
                params={{ slug: d.slug }}
                className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-luxe"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">{d.activity}</div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-bold">{d.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{d.tagline}</p>
                  <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">From</div>
                      <div className="font-display text-xl font-bold text-forest">${d.priceFrom.toLocaleString()}</div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold">
                      Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
