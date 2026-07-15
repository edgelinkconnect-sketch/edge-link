import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Cloud, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { DESTINATIONS } from "@/lib/tours-data";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Destinations — RWIZA Travel & Tour" },
      { name: "description", content: "Explore Rwanda's most iconic regions: Kigali, Musanze, Lake Kivu, Akagera and Nyungwe." },
    ],
  }),
  component: Destinations,
});

function Destinations() {
  const [active, setActive] = useState(DESTINATIONS[0]);

  return (
    <AppShell>
      <section className="border-b border-border bg-forest-deep py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Explore</p>
          <h1 className="font-display text-4xl font-bold md:text-5xl">Destinations of Rwanda</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">
            Tap a pin on the interactive map to unfold each region's story.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:px-6 lg:grid-cols-[1.3fr_1fr]">
        {/* MAP */}
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-secondary to-muted p-6 shadow-luxe">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            {/* Stylised Rwanda outline */}
            <path
              d="M15,35 Q10,25 20,18 Q35,10 50,12 Q65,10 80,18 Q92,25 88,40 Q90,55 82,68 Q75,82 60,88 Q45,92 30,86 Q15,80 10,65 Q8,50 15,35 Z"
              fill="oklch(0.35 0.08 145)"
              fillOpacity="0.15"
              stroke="var(--gold)"
              strokeWidth="0.4"
              strokeDasharray="1.5 1"
            />
            {DESTINATIONS.map((d) => (
              <g key={d.id} onClick={() => setActive(d)} className="cursor-pointer">
                <circle
                  cx={d.x} cy={d.y} r={active.id === d.id ? 3 : 2}
                  fill={active.id === d.id ? "var(--gold)" : "var(--forest)"}
                  className="transition-all"
                />
                <circle cx={d.x} cy={d.y} r={active.id === d.id ? 5 : 3.5} fill="var(--gold)" fillOpacity="0.25">
                  <animate attributeName="r" values={`${active.id === d.id ? 5 : 3.5};${active.id === d.id ? 8 : 6};${active.id === d.id ? 5 : 3.5}`} dur="2s" repeatCount="indefinite" />
                </circle>
                <text x={d.x + 4} y={d.y + 1} fontSize="2.6" fill="currentColor" className="pointer-events-none font-semibold">
                  {d.name}
                </text>
              </g>
            ))}
          </svg>
          <div className="absolute bottom-4 left-4 rounded-lg bg-background/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
            Republic of Rwanda
          </div>
        </div>

        {/* Sidebar */}
        <div key={active.id} className="animate-fade-in overflow-hidden rounded-3xl border border-border bg-card shadow-luxe">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img src={active.image} alt={active.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-foreground">
                <MapPin className="h-3 w-3" /> {active.name}
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-white">
                <Cloud className="h-3.5 w-3.5" /> {active.weather}
              </div>
            </div>
          </div>
          <div className="p-6">
            <h2 className="font-display text-2xl font-bold">{active.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{active.blurb}</p>
            <div className="mt-4 rounded-xl border border-gold/40 bg-gold/10 p-3 text-xs">
              <strong className="text-gold">Weather alert:</strong> Light rains expected in the coming days — bring a shell.
            </div>
            <Button asChild className="mt-5 w-full bg-forest text-primary-foreground hover:bg-forest-deep">
              <Link to="/tours">
                View Available Tours <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
