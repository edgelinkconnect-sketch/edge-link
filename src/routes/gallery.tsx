import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useMediaUrls } from "@/lib/media";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — EDGELINK Tours" },
      { name: "description", content: "Gorillas, Big Five, canopy walks, and luxury lodges — inside EDGELINK's Rwandan expeditions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Gallery — EDGELINK Tours" },
      { property: "og:description", content: "Gorillas, Big Five, canopy walks, and luxury lodges — inside EDGELINK's Rwandan expeditions." },
    ],
  }),
  component: Gallery,
});

type Shot = {
  id: string;
  image_url: string;
  title: string;
  description: string | null;
  location: string;
  photographer: string | null;
};

function Gallery() {
  const [loc, setLoc] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const { data: shots, isLoading } = useQuery({
    queryKey: ["public-gallery"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("id, image_url, title, description, location, photographer")
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Shot[];
    },
  });

  const media = useMediaUrls("gallery", (shots ?? []).map((s) => s.image_url));
  const locations = useMemo(() => ["All", ...new Set((shots ?? []).map((s) => s.location).filter(Boolean))], [shots]);
  const items = (shots ?? []).filter((s) => loc === "All" || s.location === loc);

  return (
    <AppShell>
      <section className="border-b border-border bg-forest-deep py-16 text-primary-foreground md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Gallery</p>
          <h1 className="font-display text-4xl font-bold md:text-5xl">From the field</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="mb-8 flex flex-wrap gap-2">
          {locations.map((c) => (
            <button
              key={c}
              onClick={() => setLoc(c)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                loc === c ? "border-forest bg-forest text-primary-foreground" : "border-border hover:border-forest/50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <Skeleton key={i} className="aspect-square rounded-xl" />)}
          </div>
        ) : items.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
            Fresh photography is on its way — check back soon.
          </p>
        ) : (
          <div className="columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4">
            {items.map((g, i) => {
              const url = media(g.image_url);
              if (!url) return null;
              return (
                <motion.button
                  key={g.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setLightbox(i)}
                  className="mb-4 block w-full overflow-hidden rounded-xl transition hover:opacity-90"
                >
                  <img src={url} alt={g.title} loading="lazy" className="w-full object-cover" />
                </motion.button>
              );
            })}
          </div>
        )}
      </section>

      <AnimatePresence>
        {lightbox !== null && items[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-4"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.figure
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-5xl"
            >
              <img src={media(items[lightbox].image_url)} alt={items[lightbox].title} className="max-h-[80vh] w-auto rounded-xl object-contain" />
              <figcaption className="mt-3 text-center text-sm text-white/80">
                {items[lightbox].title}
                {items[lightbox].location ? ` · ${items[lightbox].location}` : ""}
                {items[lightbox].photographer ? ` · © ${items[lightbox].photographer}` : ""}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}
