import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mountain, MapPin, Check, ArrowRight, ChevronLeft, ChevronRight, Users, Minus, Plus } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TOURS } from "@/lib/tours-data";
import { useI18n } from "@/lib/i18n";
import { useApp } from "@/lib/app-context";
import { toast } from "sonner";

export const Route = createFileRoute("/tours/$tourId")({
  loader: ({ params }) => {
    const tour = TOURS.find((t) => t.id === params.tourId);
    if (!tour) throw notFound();
    return { tour };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.tour.name} — RWIZA Travel & Tour` },
          { name: "description", content: loaderData.tour.summary },
          { property: "og:title", content: loaderData.tour.name },
          { property: "og:description", content: loaderData.tour.summary },
          { property: "og:image", content: loaderData.tour.image },
        ]
      : [{ title: "Tour not found" }, { name: "robots", content: "noindex" }],
  }),
  component: TourDetail,
  notFoundComponent: () => (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Tour not found</h1>
        <Button asChild className="mt-6"><Link to="/tours">Browse tours</Link></Button>
      </div>
    </AppShell>
  ),
});

function TourDetail() {
  const data = Route.useLoaderData() as { tour: (typeof TOURS)[number] };
  const tour = data.tour;
  const { t } = useI18n();
  const { addToCart } = useApp();
  const [gallery, setGallery] = useState(0);
  const [group, setGroup] = useState(2);
  const total = tour.price * group;

  const handleBook = () => {
    addToCart({
      tourId: tour.id, tourName: tour.name, date: new Date().toISOString().slice(0, 10),
      groupSize: group, pricePerPerson: tour.price, vehicle: "Land Cruiser Std", lodging: "Luxury Lodge",
    });
    toast.success("Added to booking. Redirecting…");
  };

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-4 pt-10 md:px-6">
        <nav className="mb-4 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link> ·{" "}
          <Link to="/tours" className="hover:text-foreground">Tours</Link> ·{" "}
          <span className="text-foreground">{tour.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div>
            {/* GALLERY */}
            <div className="relative overflow-hidden rounded-3xl shadow-luxe">
              <img src={tour.gallery[gallery]} alt={tour.name} className="aspect-[16/10] w-full object-cover" />
              <button onClick={() => setGallery((g) => (g - 1 + tour.gallery.length) % tour.gallery.length)}
                className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-background/80 backdrop-blur hover:bg-background">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={() => setGallery((g) => (g + 1) % tour.gallery.length)}
                className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-background/80 backdrop-blur hover:bg-background">
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                {tour.gallery.map((_, i) => (
                  <button key={i} onClick={() => setGallery(i)}
                    className={`h-1.5 rounded-full transition-all ${i === gallery ? "w-6 bg-gold" : "w-1.5 bg-white/60"}`} />
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-2">
              {tour.gallery.map((g, i) => (
                <button key={i} onClick={() => setGallery(i)}
                  className={`overflow-hidden rounded-lg border-2 ${i === gallery ? "border-gold" : "border-transparent"}`}>
                  <img src={g} alt="" className="aspect-[4/3] w-full object-cover" />
                </button>
              ))}
            </div>

            <div className="mt-8">
              <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">{tour.region}</div>
              <h1 className="mt-1 font-display text-4xl font-bold md:text-5xl">{tour.name}</h1>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-gold" />{tour.duration} {t("days")}</span>
                <span className="inline-flex items-center gap-1.5"><Mountain className="h-4 w-4 text-gold" />{tour.difficulty}</span>
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-gold" />{tour.activity}</span>
              </div>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">{tour.summary}</p>
            </div>

            <Tabs defaultValue="itinerary" className="mt-10">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="included">What's Included</TabsTrigger>
                <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
              </TabsList>
              <TabsContent value="itinerary" className="mt-6 space-y-4">
                {tour.itinerary.map((d) => (
                  <div key={d.day} className="rounded-2xl border border-border bg-card p-5">
                    <div className="mb-1 flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-forest text-sm font-bold text-primary-foreground">{d.day}</span>
                      <h3 className="font-display text-lg font-bold">{d.title}</h3>
                    </div>
                    <p className="ml-12 text-sm text-muted-foreground">{d.body}</p>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="included" className="mt-6">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {tour.included.map((i) => (
                    <li key={i} className="flex items-start gap-2 rounded-xl border border-border bg-card p-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {i}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="guidelines" className="mt-6">
                <ul className="space-y-2">
                  {tour.guidelines.map((g) => (
                    <li key={g} className="rounded-xl border border-border bg-card p-3 text-sm">{g}</li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>

          {/* STICKY RESERVATION */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-gold/40 bg-card shadow-luxe">
              <div className="bg-forest-deep p-5 text-primary-foreground">
                <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">{t("from")}</div>
                <div className="font-display text-4xl font-bold">${tour.price.toLocaleString()}<span className="text-sm font-normal opacity-70">{t("per_person")}</span></div>
              </div>
              <div className="space-y-4 p-5">
                <div>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Group size</div>
                  <div className="flex items-center gap-3 rounded-lg border border-border p-2">
                    <Button size="icon" variant="outline" onClick={() => setGroup((g) => Math.max(1, g - 1))}><Minus className="h-4 w-4" /></Button>
                    <div className="flex-1 text-center"><Users className="mx-auto h-4 w-4 text-gold" /><div className="font-display text-2xl font-bold">{group}</div></div>
                    <Button size="icon" variant="outline" onClick={() => setGroup((g) => Math.min(12, g + 1))}><Plus className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="rounded-xl bg-muted p-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">${(tour.price * group).toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Est. taxes & fees</span><span className="font-semibold">${Math.round(total * 0.08).toLocaleString()}</span></div>
                  <div className="mt-2 flex justify-between border-t border-border pt-2 font-display text-lg font-bold"><span>Total</span><span className="text-gold">${Math.round(total * 1.08).toLocaleString()}</span></div>
                </div>
                <Button onClick={handleBook} asChild className="w-full bg-gold text-gold-foreground shadow-luxe hover:brightness-95">
                  <Link to="/booking">{t("book_now")} <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                </Button>
                <p className="text-center text-xs text-muted-foreground">Free cancellation up to 30 days before departure</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </AppShell>
  );
}
