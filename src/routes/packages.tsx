import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Check, X } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PACKAGES } from "@/lib/site-data";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Packages — RWIZA Travel & Tour" },
      { name: "description", content: "Five curated itineraries: Gorilla Encounter, Big Five Safari, Primate Expedition, Ultimate Rwanda, and Luxury Honeymoon." },
      { property: "og:url", content: "https://rwiza.lovable.app/packages" },
      { property: "og:title", content: "Packages — RWIZA Travel & Tour" },
      { property: "og:description", content: "Five curated itineraries: Gorilla Encounter, Big Five Safari, Primate Expedition, Ultimate Rwanda, and Luxury Honeymoon." },
    ],
    links: [{ rel: "canonical", href: "https://rwiza.lovable.app/packages" }],
  }),
  component: Packages,
});

function Packages() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = PACKAGES.find((p) => p.id === openId);

  return (
    <AppShell>
      <section className="border-b border-border bg-forest-deep py-16 text-primary-foreground md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Packages</p>
          <h1 className="font-display text-4xl font-bold md:text-5xl">Curated Rwandan itineraries</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">Five journeys designed by our head guides — each fully customisable.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-luxe"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-foreground">{p.tag}</div>
                <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                  <Clock className="h-3 w-3" /> {p.duration}
                </div>
              </div>
              <div className="p-6">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">{p.park}</div>
                <h3 className="mt-1 font-display text-xl font-bold">{p.name}</h3>
                <ul className="mt-3 space-y-1.5">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" /> {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">From</div>
                    <div className="font-display text-2xl font-bold text-forest">${p.price.toLocaleString()}</div>
                  </div>
                  <Button size="sm" onClick={() => setOpenId(p.id)} className="bg-forest text-primary-foreground hover:bg-forest-deep">
                    View Details
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <Dialog open={!!openId} onOpenChange={(v) => !v && setOpenId(null)}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          {active && (
            <>
              <DialogHeader>
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">{active.park} · {active.duration}</div>
                <DialogTitle className="font-display text-3xl">{active.name}</DialogTitle>
              </DialogHeader>
              <img src={active.image} alt={active.name} className="my-4 aspect-[16/9] w-full rounded-xl object-cover" />
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-display font-bold text-forest">Included</h4>
                  <ul className="space-y-1.5 text-sm">
                    {active.inclusions.map((x) => <li key={x} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{x}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-display font-bold text-forest">Not included</h4>
                  <ul className="space-y-1.5 text-sm">
                    {active.exclusions.map((x) => <li key={x} className="flex gap-2 text-muted-foreground"><X className="mt-0.5 h-4 w-4 shrink-0" />{x}</li>)}
                  </ul>
                </div>
              </div>
              <h4 className="mb-2 mt-4 font-display font-bold text-forest">Itinerary</h4>
              <ol className="space-y-2 text-sm">
                {active.itinerary.map((it) => (
                  <li key={it.day} className="rounded-lg border border-border bg-card p-3">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Day {it.day}</div>
                    <div className="font-semibold">{it.title}</div>
                    <div className="text-muted-foreground">{it.body}</div>
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex items-center justify-between rounded-xl bg-muted p-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">From</div>
                  <div className="font-display text-2xl font-bold text-forest">${active.price.toLocaleString()}</div>
                </div>
                <Button asChild size="lg" className="bg-gold text-gold-foreground hover:brightness-95">
                  <Link to="/contact">Book This Package <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
