import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Leaf, Sparkles, Users, Star, Award, ShieldCheck, Trees } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { subscribeNewsletter } from "@/lib/inquiries.functions";
import { DESTINATIONS, TESTIMONIALS, PARTNERS } from "@/lib/site-data";
import hero from "@/assets/hero-mountains.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EDGELINK Tours — Luxury Rwandan Safaris" },
      { name: "description", content: "Journeys crafted for a lifetime — luxury gorilla trekking, Big Five safaris, and canopy walks in Rwanda." },
      { property: "og:url", content: "https://edgelink-tours.lovable.app/" },
      { property: "og:title", content: "EDGELINK Tours — Luxury Rwandan Safaris" },
      { property: "og:description", content: "Journeys crafted for a lifetime — luxury gorilla trekking, Big Five safaris, and canopy walks in Rwanda." },
    ],
    links: [{ rel: "canonical", href: "https://edgelink-tours.lovable.app/" }],
  }),
  component: Home,
});

const WHY = [
  { icon: Award, title: "Expert Guides", body: "Rwanda-born, RDB-certified, 20+ years in the field." },
  { icon: Trees, title: "Luxury Lodges", body: "Singita, Wilderness Safaris, One&Only — the country's finest." },
  { icon: Compass, title: "Custom Itineraries", body: "Every trip designed around your pace, tastes, and dreams." },
  { icon: Leaf, title: "Sustainable Travel", body: "Carbon-neutral, community-owned, park-fee positive." },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  };
}

function Home() {
  const subscribe = useServerFn(subscribeNewsletter);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await subscribe({ data: { email } });
      toast.success("You're subscribed. Watch your inbox for our next expedition.");
      setEmail("");
    } catch {
      toast.error("Please enter a valid email address.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AppShell>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 12, ease: "easeOut" }}
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero})` }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-deep/75 via-forest-deep/45 to-background" />
        <div className="mx-auto max-w-6xl px-4 pb-28 pt-24 text-center md:px-6 md:pb-40 md:pt-40">
          <motion.div {...fadeUp(0)} className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/25 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Explore the Beauty
          </motion.div>
          <motion.h1 {...fadeUp(0.05)} className="mx-auto max-w-4xl font-display text-4xl font-bold leading-tight text-white drop-shadow-lg md:text-6xl lg:text-7xl">
            Find Your Rwandan Adventure
          </motion.h1>
          <motion.p {...fadeUp(0.1)} className="mx-auto mt-5 max-w-2xl text-base text-white/90 md:text-lg">
            Journeys crafted for a lifetime — through the Land of a Thousand Hills.
          </motion.p>
          <motion.div {...fadeUp(0.15)} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-gold text-gold-foreground shadow-luxe hover:brightness-95">
              <Link to="/destinations">View Destinations <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white">
              <Link to="/contact">Plan Your Safari</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <motion.div {...fadeUp()} className="mb-12 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Destinations</p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Three national parks. Three unforgettable worlds.</h2>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">
          {DESTINATIONS.map((d, i) => (
            <motion.div key={d.slug} {...fadeUp(i * 0.08)}>
              <Link
                to="/destinations/$slug"
                params={{ slug: d.slug }}
                className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-luxe"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">{d.activity}</div>
                    <h3 className="font-display text-2xl font-bold">{d.name}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-white/85">{d.tagline}</p>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold">
                      Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY EDGELINK */}
      <section className="bg-forest-deep py-20 text-primary-foreground md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div {...fadeUp()} className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Why EDGELINK</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">The EDGELINK difference</h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-4">
            {WHY.map((w, i) => (
              <motion.div key={w.title} {...fadeUp(i * 0.06)} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-gold-foreground">
                  <w.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-bold">{w.title}</h3>
                <p className="mt-2 text-sm text-primary-foreground/75">{w.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <motion.div {...fadeUp()} className="mb-12 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Testimonials</p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Words from our travellers</h2>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((tt, i) => (
            <motion.blockquote key={tt.name} {...fadeUp(i * 0.05)} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-3 flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="font-display text-base italic leading-relaxed">"{tt.text}"</p>
              <footer className="mt-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-gold to-forest text-xs font-bold text-white">
                  {tt.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{tt.name}</div>
                  <div className="text-xs text-muted-foreground">{tt.location}</div>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="border-y border-border bg-muted/40 py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 md:px-6">
          {PARTNERS.map((p) => (
            <div key={p} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-gold" />
              {p}
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center md:px-6 md:py-24">
        <motion.div {...fadeUp()}>
          <Users className="mx-auto mb-3 h-8 w-8 text-gold" />
          <h2 className="font-display text-3xl font-bold md:text-4xl">Join our expedition letter</h2>
          <p className="mt-3 text-muted-foreground">Occasional dispatches on new lodges, gorilla family news, and secret trails. Never spam.</p>
          <form onSubmit={onSubscribe} className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row">
            <Input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
            />
            <Button type="submit" disabled={submitting} className="h-12 bg-gold text-gold-foreground hover:brightness-95">
              {submitting ? "Subscribing…" : "Subscribe"}
            </Button>
          </form>
        </motion.div>
      </section>
    </AppShell>
  );
}
