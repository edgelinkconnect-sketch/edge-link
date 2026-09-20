import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Check, Clock, MapPin, Mountain, Sun, Users, X } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useMediaUrls } from "@/lib/media";
import { useTranslation } from "react-i18next";
import { QuoteRequestDialog } from "@/components/quote-request-dialog";

export const Route = createFileRoute("/tours/$slug")({
  head: () => ({
    meta: [
      { title: "Tour details — EDGELINK Tours" },
      { name: "description", content: "Full itinerary, inclusions and pricing for this EDGELINK Tours expedition in Rwanda." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Tour details — EDGELINK Tours" },
      { property: "og:description", content: "Full itinerary, inclusions and pricing for this EDGELINK Tours expedition." },
    ],
  }),
  component: TourDetail,
});

type FullTour = {
  id: string;
  slug: string | null;
  name: string;
  location: string;
  region: string | null;
  activity: string | null;
  duration: string;
  difficulty: string | null;
  best_time: string | null;
  max_group_size: number | null;
  price: string;
  featured_image_url: string;
  gallery_image_urls: string[] | null;
  translations: Record<string, TourTranslation> | null;
  description: string;
  itinerary: string;
  included_services: string | null;
  excluded_services: string | null;
  highlights: string[] | null;
};

type TourTranslation = Partial<{
  name: string;
  location: string;
  region: string;
  activity: string;
  duration: string;
  difficulty: string;
  best_time: string;
  price: string;
  description: string;
  itinerary: string;
  included_services: string;
  excluded_services: string;
  price: string;
  highlights: string[];
}>;

function lines(value?: string | null) {
  return (value ?? "")
    .split("\n")
    .map((l) => l.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
}

function TourDetail() {
  const { slug } = Route.useParams();
  const { i18n } = useTranslation();
  const [quoteOpen, setQuoteOpen] = useState(false);

  const { data: tour, isLoading } = useQuery({
    queryKey: ["tour", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("tours").select("*").eq("slug", slug).eq("status", "active").maybeSingle();
      if (error) throw error;
      return data as FullTour | null;
    },
  });

  const { data: shots } = useQuery({
    queryKey: ["tour-gallery", tour?.region, tour?.location],
    enabled: !!tour,
    queryFn: async () => {
      const region = tour!.region || tour!.location;
      const { data, error } = await supabase
        .from("gallery")
        .select("id, image_url, title, location")
        .eq("location", region)
        .limit(8);
      if (error) throw error;
      return data ?? [];
    },
  });

  const heroMedia = useMediaUrls("tours", [
    tour?.featured_image_url,
    ...(tour?.gallery_image_urls ?? []),
  ]);
  const shotMedia = useMediaUrls("gallery", (shots ?? []).map((s) => s.image_url));

  if (isLoading) {
    return (
      <AppShell>
        <div className="mx-auto max-w-5xl space-y-4 px-4 py-16">
          <Skeleton className="h-72 w-full rounded-2xl" />
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-40 w-full" />
        </div>
      </AppShell>
    );
  }

  if (!tour) {
    return (
      <AppShell>
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <h1 className="font-display text-3xl font-bold text-forest">Tour not found</h1>
          <p className="mt-2 text-muted-foreground">This itinerary may have been retired or renamed.</p>
          <Button asChild className="mt-6 bg-forest text-primary-foreground hover:bg-forest-deep">
            <Link to="/tours">Browse all tours</Link>
          </Button>
        </div>
      </AppShell>
    );
  }

  const languageCode = i18n.language.split("-")[0];
  const localizedTour = { ...tour, ...(tour.translations?.[languageCode] ?? {}) };
  const included = lines(localizedTour.included_services);
  const excluded = lines(localizedTour.excluded_services);
  const days = lines(localizedTour.itinerary);
  const heroUrl = heroMedia(tour.featured_image_url);
  const tourImages = (tour.gallery_image_urls ?? []).filter((image) => image !== tour.featured_image_url);

  return (
    <AppShell>
      <section className="relative overflow-hidden bg-forest-deep text-primary-foreground">
        {heroUrl && <img src={heroUrl} alt={localizedTour.name} className="absolute inset-0 h-full w-full object-cover opacity-40" />}
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <Link to="/tours" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            <ArrowLeft className="h-3.5 w-3.5" /> All tours
          </Link>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold md:text-5xl">{localizedTour.name}</h1>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-primary-foreground/85">
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-gold" />{localizedTour.region || localizedTour.location}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-gold" />{localizedTour.duration}</span>
            {localizedTour.difficulty && <span className="inline-flex items-center gap-1.5"><Mountain className="h-4 w-4 text-gold" />{localizedTour.difficulty}</span>}
            {tour.max_group_size && <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 text-gold" />Max {tour.max_group_size}</span>}
            {localizedTour.best_time && <span className="inline-flex items-center gap-1.5"><Sun className="h-4 w-4 text-gold" />{localizedTour.best_time}</span>}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          <div>
            <h2 className="font-display text-2xl font-bold text-forest">Overview</h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-muted-foreground">{localizedTour.description}</p>
          </div>

          {tourImages.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-bold text-forest">Journey gallery</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {tourImages.map((image, index) => (
                  <img key={image} src={heroMedia(image)} alt={`${tour.name} image ${index + 2}`} className="aspect-[4/3] w-full rounded-xl object-cover" />
                ))}
              </div>
            </div>
          )}

          {(localizedTour.highlights?.length ?? 0) > 0 && (
            <div>
              <h2 className="font-display text-2xl font-bold text-forest">Highlights</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {localizedTour.highlights!.map((h) => (
                  <li key={h} className="flex gap-2 rounded-lg border border-border bg-card p-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {days.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-bold text-forest">Itinerary</h2>
              <ol className="mt-3 space-y-2">
                {days.map((d, i) => (
                  <li key={i} className="rounded-lg border border-border bg-card p-4">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Day {i + 1}</div>
                    <div className="mt-0.5 text-sm">{d}</div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {(included.length > 0 || excluded.length > 0) && (
            <div className="grid gap-6 md:grid-cols-2">
              {included.length > 0 && (
                <div>
                  <h3 className="mb-2 font-display text-lg font-bold text-forest">Included</h3>
                  <ul className="space-y-1.5 text-sm">
                    {included.map((x) => <li key={x} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{x}</li>)}
                  </ul>
                </div>
              )}
              {excluded.length > 0 && (
                <div>
                  <h3 className="mb-2 font-display text-lg font-bold text-forest">Not included</h3>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {excluded.map((x) => <li key={x} className="flex gap-2"><X className="mt-0.5 h-4 w-4 shrink-0" />{x}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}

          {(shots?.length ?? 0) > 0 && (
            <div>
              <h2 className="font-display text-2xl font-bold text-forest">From {tour.region || tour.location}</h2>
              <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                {shots!.map((s) => {
                  const url = shotMedia(s.image_url);
                  return url ? (
                    <img key={s.id} src={url} alt={s.title} loading="lazy" className="aspect-square w-full rounded-xl object-cover" />
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-sm lg:sticky lg:top-24">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Custom planning</div>
          <div className="font-display text-2xl font-bold text-forest">Ask for quote</div>
          <p className="mt-2 text-sm text-muted-foreground">
            Share your travel dates and preferences and our team will prepare a tailored quote for {tour.name}.
          </p>
          <Button onClick={() => setQuoteOpen(true)} size="lg" className="mt-5 w-full bg-gold text-gold-foreground hover:brightness-95">
            Ask for quote
          </Button>
          <Button asChild variant="outline" className="mt-2 w-full">
            <Link to="/contact">Ask a question</Link>
          </Button>
        </aside>
      </section>

      <QuoteRequestDialog
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        tourSlug={tour.slug ?? ""}
        tourName={tour.name}
        duration={tour.duration}
      />
    </AppShell>
  );
}
