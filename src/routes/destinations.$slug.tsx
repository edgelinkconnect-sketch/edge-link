import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Check, Calendar, Users, Trees } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { DESTINATIONS, type Destination } from "@/lib/site-data";

export const Route = createFileRoute("/destinations/$slug")({
  loader: ({ params }) => {
    const dest = DESTINATIONS.find((d) => d.slug === params.slug);
    if (!dest) throw notFound();
    return dest;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found — EDGELINK" }, { name: "robots", content: "noindex" }] };
    const d = loaderData as Destination;
    const url = `https://edgelink-tours.lovable.app/destinations/${d.slug}`;
    return {
      meta: [
        { title: `${d.name} — EDGELINK Tours` },
        { name: "description", content: d.tagline },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:title", content: `${d.name} — EDGELINK Tours` },
        { property: "og:description", content: d.tagline },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: DestinationDetail,
  notFoundComponent: DestinationNotFound,
});

function DestinationNotFound() {
  return (
    <AppShell>
      <div className="mx-auto max-w-md px-4 py-32 text-center">
        <h1 className="font-display text-4xl font-bold">Destination not found</h1>
        <Button asChild className="mt-6 bg-gold text-gold-foreground"><Link to="/destinations">Back to destinations</Link></Button>
      </div>
    </AppShell>
  );
}

function DestinationDetail() {
  const d = Route.useLoaderData() as Destination;

  return (
    <AppShell>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: `url(${d.image})` }} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-deep/75 via-forest-deep/50 to-background" />
        <div className="mx-auto max-w-5xl px-4 pb-24 pt-24 text-center md:px-6 md:pb-32 md:pt-32">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold">{d.activity}</p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl font-bold text-white drop-shadow-lg md:text-6xl">{d.name}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mx-auto mt-4 max-w-2xl text-lg text-white/90">{d.tagline}</motion.p>
          <div className="mt-8 inline-flex items-baseline gap-2 rounded-full bg-white/95 px-6 py-2.5 shadow-luxe">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">From</span>
            <span className="font-display text-2xl font-bold text-forest">${d.priceFrom.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">per person</span>
            {d.permit && <span className="ml-2 border-l border-border pl-2 text-xs text-muted-foreground">permit ${d.permit} included</span>}
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center md:px-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Overview</p>
        <p className="font-display text-xl leading-relaxed md:text-2xl">{d.overview}</p>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="bg-muted/40 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="mb-10 text-center font-display text-3xl font-bold md:text-4xl">What to expect</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {d.whatToExpect.map((w) => (
              <div key={w.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-display text-lg font-bold text-forest">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEST TIME */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="mb-8 flex items-center gap-3">
          <Calendar className="h-6 w-6 text-gold" />
          <h2 className="font-display text-3xl font-bold">Best time to visit</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-5">
          {d.bestTime.map((s) => (
            <div key={s.month} className="rounded-xl border border-border bg-card p-4">
              <div className="text-xs font-bold uppercase tracking-wider text-forest">{s.month}</div>
              <div className="mt-1 text-sm">{s.label}</div>
              <div className={`mt-3 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                s.rating === "Excellent" ? "bg-gold/20 text-forest" :
                s.rating === "Good" ? "bg-muted text-foreground" : "bg-muted/50 text-muted-foreground"
              }`}>{s.rating}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ITINERARY + LODGES */}
      <section className="bg-muted/40 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:px-6">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <Users className="h-6 w-6 text-gold" />
              <h2 className="font-display text-3xl font-bold">Sample itinerary</h2>
            </div>
            <ol className="space-y-4">
              {d.itinerary.map((it) => (
                <li key={it.day} className="rounded-xl border border-border bg-card p-5">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Day {it.day}</div>
                  <div className="mt-1 font-display text-lg font-bold">{it.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{it.body}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <div className="mb-6 flex items-center gap-3">
              <Trees className="h-6 w-6 text-gold" />
              <h2 className="font-display text-3xl font-bold">Where you'll stay</h2>
            </div>
            <ul className="space-y-4">
              {d.lodges.map((l) => (
                <li key={l.name} className="rounded-xl border border-border bg-card p-5">
                  <div className="font-display text-lg font-bold text-forest">{l.name}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{l.blurb}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <h2 className="mb-8 font-display text-3xl font-bold">Gallery</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {d.gallery.map((src, i) => (
            <div key={i} className={`overflow-hidden rounded-xl ${i % 5 === 0 ? "col-span-2 row-span-2" : ""}`}>
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-forest-deep py-16 text-center text-primary-foreground md:py-20">
        <div className="mx-auto max-w-2xl px-4 md:px-6">
          <Check className="mx-auto mb-3 h-8 w-8 text-gold" />
          <h2 className="font-display text-3xl font-bold md:text-4xl">Ready to book this safari?</h2>
          <p className="mt-3 text-primary-foreground/80">Speak with a specialist within 24 hours. Every itinerary customised.</p>
          <Button asChild size="lg" className="mt-6 bg-gold text-gold-foreground shadow-luxe hover:brightness-95">
            <Link to="/contact">Book This Safari <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </AppShell>
  );
}
