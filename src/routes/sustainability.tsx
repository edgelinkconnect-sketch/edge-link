import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, Users, ShieldCheck, HeartHandshake, TreePine, Droplets, Recycle, Award } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { PARTNERS } from "@/lib/site-data";

export const Route = createFileRoute("/sustainability")({
  head: () => ({
    meta: [
      { title: "Sustainability — EDGELINK Tours" },
      { name: "description", content: "Carbon-neutral safaris, community-owned lodges, park-fee positive travel. How EDGELINK travels with purpose." },
      { property: "og:title", content: "Travel with Purpose — EDGELINK Sustainability" },
      { property: "og:description", content: "Carbon-neutral safaris, community-owned lodges, park-fee positive travel." },
      { property: "og:url", content: "https://edgelink-tours.lovable.app/sustainability" },
    ],
    links: [{ rel: "canonical", href: "https://edgelink-tours.lovable.app/sustainability" }],
  }),
  component: Sustainability,
});

const COMMITMENTS = [
  { icon: Leaf, title: "Carbon Neutral", body: "We offset 100% of our operational carbon emissions through verified reforestation partners in the Volcanoes buffer zone." },
  { icon: Users, title: "Community Ownership", body: "We partner exclusively with community-owned lodges and employ local staff at every level — from guides to management." },
  { icon: ShieldCheck, title: "Park-Fee Positive", body: "Every safari contributes directly to conservation. Park fees fund ranger salaries, habitat protection, and anti-poaching patrols." },
  { icon: Award, title: "Gorilla Friendly Certified", body: "We follow strict IGCP protocols — mask-wearing, 7m distance, one-hour visits — to protect the mountain gorilla population." },
];

const TIPS = [
  { icon: Droplets, title: "Refill, don't buy", body: "Every lodge has filtered water stations. Bring a reusable bottle — we provide one on arrival." },
  { icon: Recycle, title: "Pack out what you pack in", body: "Rwanda banned single-use plastics in 2008. Please respect the ban at customs and beyond." },
  { icon: TreePine, title: "Leave only footprints", body: "Stay on marked trails in national parks. Vegetation regrows slowly at altitude." },
  { icon: HeartHandshake, title: "Buy local", body: "Cooperatives, coffee farms, and craft markets recycle your spend into local communities." },
];

export default Sustainability;
function Sustainability() {
  return (
    <AppShell>
      <section className="border-b border-border bg-forest-deep py-16 text-primary-foreground md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Our Commitment</p>
          <h1 className="font-display text-4xl font-bold md:text-5xl">Travel with Purpose</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">
            Rwanda is a global model for conservation-led tourism. Every EDGELINK journey directly funds the parks, people, and primates that make it possible.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Our Commitments</p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Four pillars of responsible travel</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {COMMITMENTS.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-forest text-primary-foreground">
                <c.icon className="h-6 w-6 text-gold" />
              </div>
              <h3 className="font-display text-xl font-bold text-forest">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/40 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Partnerships</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Recognised & certified</h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {PARTNERS.map((p) => (
              <div key={p} className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-gold" />
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Traveller Guide</p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">How to travel responsibly in Rwanda</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TIPS.map((t) => (
            <div key={t.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <t.icon className="h-6 w-6 text-gold" />
              <h3 className="mt-4 font-display text-lg font-bold">{t.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Button asChild size="lg" className="bg-gold text-gold-foreground hover:brightness-95">
            <Link to="/contact">Plan a Purposeful Journey</Link>
          </Button>
        </div>
      </section>
    </AppShell>
  );
}
