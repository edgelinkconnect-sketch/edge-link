import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, MapPin, Calendar, Users, Star, ArrowRight, Mountain, Compass, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";
import { TOURS, TESTIMONIALS } from "@/lib/tours-data";
import hero from "@/assets/hero-mountains.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RWIZA Travel & Tour — Luxury Rwandan Safaris" },
      { name: "description", content: "Find your Rwandan adventure with RWIZA — luxury gorilla trekking, Big Five safaris, and cultural journeys." },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useI18n();
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <AppShell>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero})`, transform: "scale(1.05)" }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-deep/70 via-forest-deep/40 to-background" />
        <div className="mx-auto max-w-6xl px-4 pb-28 pt-24 text-center md:px-6 md:pb-40 md:pt-40">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold backdrop-blur animate-fade-up">
            <Sparkles className="h-3.5 w-3.5" /> Explore the Beauty
          </div>
          <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold leading-tight text-white drop-shadow-lg md:text-6xl lg:text-7xl animate-fade-up">
            {t("hero_title")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/90 md:text-lg animate-fade-up">
            {t("hero_sub")}
          </p>

          {/* Search bar */}
          <div className="mx-auto mt-10 grid max-w-4xl gap-2 rounded-2xl bg-background/95 p-3 shadow-luxe backdrop-blur md:grid-cols-[1.3fr_1fr_1fr_auto] animate-fade-up">
            <div className="flex items-center gap-2 rounded-lg bg-muted/60 px-3">
              <MapPin className="h-4 w-4 text-gold" />
              <Input placeholder={t("search_destination")} className="border-0 bg-transparent shadow-none focus-visible:ring-0" />
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-muted/60 px-3">
              <Calendar className="h-4 w-4 text-gold" />
              <Input type="date" className="border-0 bg-transparent shadow-none focus-visible:ring-0" />
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-muted/60 px-3">
              <Users className="h-4 w-4 text-gold" />
              <Input type="number" min={1} defaultValue={2} placeholder={t("search_group")} className="border-0 bg-transparent shadow-none focus-visible:ring-0" />
            </div>
            <Button asChild size="lg" className="bg-forest text-primary-foreground hover:bg-forest-deep">
              <Link to="/tours"><Search className="mr-1.5 h-4 w-4" /> {t("search_go")}</Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-gold text-gold-foreground shadow-luxe hover:brightness-95">
              <Link to="/destinations">{t("cta_explore")} <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white">
              <Link to="/tours">{t("cta_view")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">{t("section_highlights")}</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Journeys crafted for a lifetime</h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Mountain, title: "Volcanoes", body: "Track mountain gorillas in Africa's most iconic rainforest.", tag: "Signature" },
            { icon: Compass, title: "Akagera", body: "Big Five safari across savannah, wetlands and rolling hills.", tag: "Wild East" },
            { icon: Sparkles, title: "Nyungwe", body: "Canopy walks and chimpanzee tracking in ancient rainforest.", tag: "Eco-luxe" },
          ].map((h, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-luxe">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/10 blur-2xl transition group-hover:bg-gold/20" />
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-forest text-primary-foreground">
                <h.icon className="h-6 w-6" />
              </div>
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">{h.tag}</div>
              <h3 className="font-display text-2xl font-bold">{h.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{h.body}</p>
              <Link to="/tours" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest hover:text-gold">
                Discover <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="bg-muted/40 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">{t("section_featured")}</p>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold md:text-4xl">{t("section_featured_sub")}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {TOURS.slice(0, 3).map((tour) => (
              <Link
                key={tour.id}
                to="/tours/$tourId"
                params={{ tourId: tour.id }}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-luxe"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={tour.image} alt={tour.name} loading="lazy" width={1200} height={900} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  {tour.tag && (
                    <div className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-foreground">
                      {tour.tag}
                    </div>
                  )}
                  <div className="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                    {tour.duration} {t("days")}
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">{tour.region}</div>
                  <h3 className="mt-1 font-display text-xl font-bold">{tour.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{tour.summary}</p>
                  <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("from")}</div>
                      <div className="font-display text-2xl font-bold text-forest">${tour.price.toLocaleString()}</div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold">
                      {t("book_now")} <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center md:px-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">{t("section_testimonials")}</p>
        <h2 className="mb-10 font-display text-3xl font-bold md:text-4xl">Words from our travellers</h2>
        <div key={idx} className="animate-fade-in rounded-3xl border border-border bg-card p-10 shadow-luxe">
          <div className="mb-4 flex justify-center gap-1 text-gold">
            {Array.from({ length: TESTIMONIALS[idx].rating }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <p className="mx-auto max-w-2xl font-display text-xl italic leading-relaxed md:text-2xl">
            "{TESTIMONIALS[idx].text}"
          </p>
          <div className="mt-6">
            <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-gradient-to-br from-gold to-forest ring-2 ring-gold" />
            <div className="font-semibold">{TESTIMONIALS[idx].name}</div>
            <div className="text-xs text-muted-foreground">{TESTIMONIALS[idx].country}</div>
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-gold" : "w-1.5 bg-muted-foreground/30"}`}
            />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
