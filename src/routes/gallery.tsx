import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { GALLERY } from "@/lib/site-data";

const CATEGORIES = ["All", "Gorillas", "Safari", "Canopy", "Landscapes", "Lodges", "Culture"] as const;

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — EDGELINK Tours" },
      { name: "description", content: "Gorillas, Big Five, canopy walks, and luxury lodges — inside EDGELINK's Rwandan expeditions." },
      { property: "og:url", content: "https://edgelink-tours.lovable.app/gallery" },
      { property: "og:title", content: "Gallery — EDGELINK Tours" },
      { property: "og:description", content: "Gorillas, Big Five, canopy walks, and luxury lodges — inside EDGELINK's Rwandan expeditions." },
    ],
    links: [{ rel: "canonical", href: "https://edgelink-tours.lovable.app/gallery" }],
  }),
  component: Gallery,
});

function Gallery() {
  const [cat, setCat] = useState<typeof CATEGORIES[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const items = GALLERY.filter((g) => cat === "All" || g.category === cat);

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
          {CATEGORIES.map((c) => (
            <Button
              key={c}
              variant={cat === c ? "default" : "outline"}
              size="sm"
              onClick={() => setCat(c)}
              className={cat === c ? "bg-forest text-primary-foreground hover:bg-forest-deep" : ""}
            >
              {c}
            </Button>
          ))}
        </div>

        <div className="columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4">
          {items.map((g, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setLightbox(i)}
              className="mb-4 block w-full overflow-hidden rounded-xl transition hover:opacity-90"
            >
              <img src={g.image} alt={g.caption} loading="lazy" className="w-full object-cover" />
            </motion.button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-4"
          >
            <button onClick={() => setLightbox(null)} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
            <motion.figure
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-5xl"
            >
              <img src={items[lightbox].image} alt={items[lightbox].caption} className="max-h-[80vh] w-auto rounded-xl object-contain" />
              <figcaption className="mt-3 text-center text-sm text-white/80">{items[lightbox].caption}</figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}
