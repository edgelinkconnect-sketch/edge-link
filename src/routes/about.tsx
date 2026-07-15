import { createFileRoute } from "@tanstack/react-router";
import { Leaf, HeartHandshake, Award, Globe2 } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { GUIDES } from "@/lib/tours-data";
import logo from "@/assets/rwiza-logo.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About RWIZA — Sustainable Rwandan Luxury Tourism" },
      { name: "description", content: "The story of RWIZA Travel & Tour: sustainable luxury tourism and community empowerment across Rwanda." },
    ],
  }),
  component: About,
});

const MILESTONES = [
  { year: "2014", title: "Founded in Musanze", body: "Two local guides start with one Land Cruiser and a mission." },
  { year: "2017", title: "First eco-lodge partnership", body: "Community-owned lodge network launches in Volcanoes NP." },
  { year: "2020", title: "Carbon-negative operations", body: "Every safari tree-planted; local reforestation exceeds 40k trees." },
  { year: "2023", title: "500th silverback trek", body: "Reached 500 gorilla trekking clients with 100% success rate." },
  { year: "2026", title: "Land of a Thousand Hills", body: "Now serving 40+ countries with 25 local guides on payroll." },
];



function About() {
  return (
    <AppShell>
      <section className="relative isolate overflow-hidden bg-forest-deep py-24 text-primary-foreground">
        <div className="absolute inset-0 -z-10 opacity-10" style={{ backgroundImage: `url(${logo.url})`, backgroundPosition: "center", backgroundSize: "600px", backgroundRepeat: "no-repeat" }} />
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">Our Story</p>
          <h1 className="font-display text-4xl font-bold md:text-6xl">Rwanda, through the eyes of Rwandans.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-primary-foreground/80">
            RWIZA is a locally-owned expedition company built on sustainable luxury and community empowerment — every itinerary is designed with the parks, the people, and the planet in mind.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { icon: Leaf, k: "Carbon", v: "Negative" },
            { icon: HeartHandshake, k: "Communities", v: "12 Partners" },
            { icon: Award, k: "Reviews", v: "4.98 / 5" },
            { icon: Globe2, k: "Nations", v: "40+ Served" },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
              <s.icon className="mx-auto mb-3 h-6 w-6 text-gold" />
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.k}</div>
              <div className="mt-1 font-display text-2xl font-bold text-forest">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-4xl px-4 py-10 md:px-6">
        <h2 className="mb-10 text-center font-display text-3xl font-bold md:text-4xl">A Journey Rooted in the Hills</h2>
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-gold via-forest to-transparent md:left-1/2" />
          {MILESTONES.map((m, i) => (
            <div key={m.year} className={`relative mb-10 flex items-center gap-6 md:mb-14 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
              <div className="ml-10 flex-1 md:ml-0">
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-wider text-gold">{m.year}</div>
                  <h3 className="mt-1 font-display text-lg font-bold">{m.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{m.body}</p>
                </div>
              </div>
              <div className="absolute left-4 h-4 w-4 -translate-x-1/2 rounded-full bg-gold ring-4 ring-background md:left-1/2" />
              <div className="hidden flex-1 md:block" />
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Local Experts</p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Professional Guiding Team</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {GUIDES.map((g) => (
            <div key={g.name} className="group overflow-hidden rounded-2xl border border-border bg-card text-center shadow-sm transition hover:-translate-y-1 hover:shadow-luxe">
              <div className="aspect-square bg-gradient-to-br from-forest to-gold p-1">
                <div className="grid h-full w-full place-items-center rounded-xl bg-forest-deep font-display text-4xl font-bold text-gold">
                  {g.initials}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold">{g.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{g.role}</p>
                <div className="mt-3 flex flex-wrap justify-center gap-1.5 text-[10px] font-semibold">
                  {g.langs.map((l) => (
                    <span key={l} className="rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-gold">{l}</span>
                  ))}
                </div>
                <div className="mt-3 text-xs font-semibold text-forest">{g.years} yrs experience</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
