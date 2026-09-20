import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, Clock, Compass, Leaf, MapPin, Mountain, Sparkles, Users, Star, Award, ShieldCheck, Trees } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { subscribeNewsletter } from "@/lib/inquiries.functions";
import { TESTIMONIALS, PARTNERS } from "@/lib/site-data";
import { TOURS } from "@/lib/tours-data";
import { supabase } from "@/integrations/supabase/client";
import { useMediaUrls } from "@/lib/media";
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
  { icon: Award, key: "expertGuides", bodyKey: "expertGuidesBody" },
  { icon: Trees, key: "luxuryLodges", bodyKey: "luxuryLodgesBody" },
  { icon: Compass, key: "customItineraries", bodyKey: "customItinerariesBody" },
  { icon: Leaf, key: "sustainable", bodyKey: "sustainableBody" },
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
  const { t } = useTranslation();
  const subscribe = useServerFn(subscribeNewsletter);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { data: tours } = useQuery({
    queryKey: ["homepage-tours"],
    queryFn: async () => {
      const { data } = await supabase
        .from("tours")
        .select("id, slug, name, location, region, activity, duration, featured_image_url, description")
        .eq("status", "active")
        .order("created_at")
        .limit(6);
      if (data?.length) return data;
      return TOURS.map((tour) => ({
        id: tour.id,
        slug: tour.id,
        name: tour.name,
        location: tour.region,
        region: tour.region,
        activity: tour.activity,
        duration: `${tour.duration} days`,
        featured_image_url: tour.image,
        description: tour.summary,
      }));
    },
  });
  const tourMedia = useMediaUrls("tours", (tours ?? []).map((tour) => tour.featured_image_url));

  async function onSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await subscribe({ data: { email } });
      toast.success(t("home.subscribe"));
      setEmail("");
    } catch {
      toast.error(t("common.error"));
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
          <motion.div {...fadeUp(0)} className="mb-8 flex justify-center">
            <BrandLogo
              showName={false}
              imageClassName="h-28 w-28 rounded-2xl ring-4 ring-gold shadow-2xl md:h-36 md:w-36"
              className="rounded-2xl bg-white/95 p-1"
            />
          </motion.div>
          <motion.div {...fadeUp(0)} className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/25 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> {t("home.exploreTours")}
          </motion.div>
          <motion.h1 {...fadeUp(0.05)} className="mx-auto max-w-4xl font-display text-4xl font-bold leading-tight text-white drop-shadow-lg md:text-6xl lg:text-7xl">
            {t("home.heroTitle")}
          </motion.h1>
          <motion.p {...fadeUp(0.1)} className="mx-auto mt-5 max-w-2xl text-base text-white/90 md:text-lg">
            {t("home.heroSubtitle")}
          </motion.p>
          <motion.div {...fadeUp(0.15)} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-gold text-gold-foreground shadow-luxe hover:brightness-95">
              <Link to="/destinations">{t("common.viewAll")} <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white">
              <Link to="/contact">{t("home.planTrip")}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* TOURS & ITINERARIES */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <motion.div {...fadeUp()} className="mb-12 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Tours & itineraries</p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Journeys shaped around Rwanda</h2>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">
          {(tours ?? []).slice(0, 6).map((tour, i) => (
            <motion.div key={tour.id} {...fadeUp(i * 0.08)}>
              <Link
                to="/tours/$slug"
                params={{ slug: tour.slug ?? tour.id }}
                className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-luxe"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  {tourMedia(tour.featured_image_url) ? <img src={tourMedia(tour.featured_image_url)} alt={tour.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /> : <div className="grid h-full w-full place-items-center text-muted-foreground"><Mountain className="h-8 w-8" /></div>}
                  <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur"><Clock className="h-3 w-3" /> {tour.duration}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold"><MapPin className="h-3 w-3" /> {tour.region || tour.location}</div>
                  <h3 className="mt-1 font-display text-xl font-bold">{tour.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{tour.description}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest">Ask for quote <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></div>
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
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">{t("home.whyEdgelink")}</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">{t("home.whyEdgelink")}</h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-4">
            {WHY.map((w, i) => (
              <motion.div key={w.key} {...fadeUp(i * 0.06)} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-gold-foreground">
                  <w.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-bold">{t(`why.${w.key}`)}</h3>
                <p className="mt-2 text-sm text-primary-foreground/75">{t(`why.${w.bodyKey}`)}</p>
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
