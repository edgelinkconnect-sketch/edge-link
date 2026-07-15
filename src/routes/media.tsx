import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UploadCloud, ImagePlus, Search } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import gorilla from "@/assets/tour-gorilla.jpg";
import akagera from "@/assets/tour-akagera.jpg";
import nyungwe from "@/assets/tour-nyungwe.jpg";
import kivu from "@/assets/tour-kivu.jpg";
import kigali from "@/assets/tour-kigali.jpg";
import cruiser from "@/assets/tour-cruiser.jpg";
import hero from "@/assets/hero-mountains.jpg";

export const Route = createFileRoute("/media")({
  head: () => ({ meta: [{ title: "Media Library — RWIZA" }, { name: "robots", content: "noindex" }] }),
  component: Media,
});

const ASSETS = [
  { src: gorilla, tag: "Wildlife", name: "Silverback Portrait" },
  { src: akagera, tag: "Wildlife", name: "Akagera Elephants" },
  { src: nyungwe, tag: "Landscape", name: "Nyungwe Canopy Walk" },
  { src: kivu, tag: "Landscape", name: "Kivu Sunset" },
  { src: kigali, tag: "Urban", name: "Kigali Skyline" },
  { src: cruiser, tag: "Fleet", name: "Land Cruiser Ridge" },
  { src: hero, tag: "Landscape", name: "Volcanoes at Dawn" },
  { src: gorilla, tag: "Wildlife", name: "Golden Monkey" },
  { src: akagera, tag: "Wildlife", name: "Big Five Herd" },
];

const TAGS = ["All", "Wildlife", "Landscape", "Urban", "Fleet"];

function Media() {
  const [tag, setTag] = useState("All");
  const [q, setQ] = useState("");
  const filtered = ASSETS.filter((a) => (tag === "All" || a.tag === tag) && a.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Media Manager</p>
            <h1 className="mt-1 font-display text-3xl font-bold md:text-4xl">Photo & Media Library</h1>
          </div>
          <Button className="bg-gold text-gold-foreground"><ImagePlus className="mr-1.5 h-4 w-4" />New upload</Button>
        </div>

        {/* Uploader */}
        <div className="rounded-2xl border-2 border-dashed border-gold/60 bg-gold/5 p-10 text-center transition hover:bg-gold/10">
          <UploadCloud className="mx-auto h-10 w-10 text-gold" />
          <h3 className="mt-3 font-display text-lg font-bold">Drop images here</h3>
          <p className="mt-1 text-sm text-muted-foreground">or click to browse · JPG, PNG, WEBP up to 25 MB</p>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search media…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-10" />
          </div>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tg) => (
              <button key={tg} onClick={() => setTag(tg)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  tag === tg ? "bg-forest text-primary-foreground" : "border border-border text-muted-foreground hover:bg-muted"
                }`}>{tg}</button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((a, i) => (
            <div key={i} className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <div className="relative aspect-square overflow-hidden">
                <img src={a.src} alt={a.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>
              <div className="p-3">
                <div className="truncate text-sm font-semibold">{a.name}</div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-gold">{a.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
