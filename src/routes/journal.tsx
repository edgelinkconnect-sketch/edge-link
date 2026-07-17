import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Clock, User, Facebook, Twitter, Link2 } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/lib/site-data";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — RWIZA Travel & Tour" },
      { name: "description", content: "Stories, guides, and conservation news from Rwanda's national parks — from our guides on the ground." },
      { property: "og:title", content: "Journal — RWIZA Travel & Tour" },
      { property: "og:description", content: "Stories, guides, and conservation news from Rwanda's national parks." },
      { property: "og:url", content: "https://rwiza.lovable.app/journal" },
    ],
    links: [{ rel: "canonical", href: "https://rwiza.lovable.app/journal" }],
  }),
  component: Journal,
});

const CATEGORIES = ["All", "Gorilla Trekking", "Rwanda Travel Tips", "Conservation News", "Lodge Reviews", "Culture & Food"] as const;

const POSTS = [
  {
    slug: "gorilla-trekking-101",
    title: "Gorilla Trekking 101: What to Expect",
    excerpt: "From the pre-dawn briefing at park headquarters to your intimate hour with a silverback — a first-timer's step-by-step guide.",
    category: "Gorilla Trekking",
    author: "Jean-Pierre Niyonzima",
    date: "March 12, 2026",
    readTime: "8 min",
    image: IMAGES.gorilla,
    body: "Your gorilla trek begins the night before, with a light dinner and an early bed at your lodge. At 5:30am, you're driven to Kinigi park headquarters, where guides assess fitness levels and assign families. Trekking distances vary from 30 minutes to six hours — porters carry your pack for $20. When you reach the family, you'll spend exactly one transformative hour observing them at 7m distance. Photos without flash. Then the descent, a hot lunch at your lodge, and time to process what you've just experienced.",
  },
  {
    slug: "best-time-to-visit",
    title: "Best Time to Visit Rwanda's National Parks",
    excerpt: "Two dry seasons, two green seasons — how to pick the perfect month for your Rwandan safari.",
    category: "Rwanda Travel Tips",
    author: "Grace Uwimana",
    date: "February 28, 2026",
    readTime: "6 min",
    image: IMAGES.nyungwe,
    body: "Rwanda's equatorial climate means year-round trekking is possible, but the two dry seasons — June to September and December to February — offer the driest trails and clearest views. March to May brings the long rains: fewer travellers, greener landscapes, and lower permit demand. October and November are transitional and lovely for photography.",
  },
  {
    slug: "singita-kwitonda-review",
    title: "Inside Singita Kwitonda: A Luxury Lodge Review",
    excerpt: "Eight private suites, a spa carved from volcanic rock, and views of five volcanoes. Our head of guest relations spends 48 hours at Rwanda's newest icon.",
    category: "Lodge Reviews",
    author: "Claire Mukamana",
    date: "February 10, 2026",
    readTime: "10 min",
    image: IMAGES.cruiser,
    body: "Kwitonda sits at 2,300m on the border of Volcanoes National Park. Rammed-earth walls, brass finishes, and a fireplace in every suite. The food — foraged, seasonal, Rwandan-modern — rivals anything in East Africa. Rates from $3,300 per person per night. Worth every dollar for a lifetime memory.",
  },
  {
    slug: "nyungwe-canopy-walk",
    title: "Nyungwe Canopy Walk: A Bird's Eye View",
    excerpt: "The 200-metre suspended bridge, 70m above the rainforest floor, is Africa's only canopy walkway. Here's what you'll see.",
    category: "Rwanda Travel Tips",
    author: "Emmanuel Habimana",
    date: "January 22, 2026",
    readTime: "5 min",
    image: IMAGES.nyungwe,
    body: "The walk takes 90 minutes, with an easy forest hike either side. From the platform, you'll spot Great Blue Turacos, L'Hoest's monkeys, and — if you're lucky — a chimpanzee troop moving below. Sunrise walks require pre-booking. Not recommended for anyone with severe acrophobia.",
  },
  {
    slug: "gorilla-conservation-success",
    title: "Conservation Success: Rwanda's Gorilla Population Growth",
    excerpt: "From 254 individuals in 1981 to over 1,000 today. Inside the Rwandan model that turned poaching into protection.",
    category: "Conservation News",
    author: "Dr. James Wilson",
    date: "January 5, 2026",
    readTime: "12 min",
    image: IMAGES.gorilla,
    body: "The Virunga population's recovery is one of conservation's great modern successes. Ranger patrols, community revenue sharing (10% of park fees), veterinary interventions, and disciplined tourism have combined to double the population in three decades. Rwanda's gorillas are the only great apes whose numbers are still growing.",
  },
];

function Journal() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const posts = category === "All" ? POSTS : POSTS.filter((p) => p.category === category);
  const open = POSTS.find((p) => p.slug === openSlug);

  return (
    <AppShell>
      <section className="border-b border-border bg-forest-deep py-16 text-primary-foreground md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">The Journal</p>
          <h1 className="font-display text-4xl font-bold md:text-5xl">Stories from the field</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">Guides, reviews, and conservation notes from our team on the ground.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                category === c ? "border-forest bg-forest text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-forest"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {open ? (
          <article className="mx-auto max-w-3xl">
            <Button variant="ghost" size="sm" onClick={() => setOpenSlug(null)} className="mb-4">← Back to journal</Button>
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">{open.category}</div>
            <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">{open.title}</h1>
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><User className="h-3 w-3" />{open.author}</span>
              <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{open.date}</span>
              <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{open.readTime} read</span>
            </div>
            <img src={open.image} alt={open.title} className="mt-6 aspect-[16/9] w-full rounded-2xl object-cover" />
            <p className="mt-6 text-lg font-medium leading-relaxed text-foreground/90">{open.excerpt}</p>
            <div className="mt-4 whitespace-pre-line text-base leading-relaxed text-muted-foreground">{open.body}</div>
            <div className="mt-8 flex items-center gap-3 border-t border-border pt-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Share:</span>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(open.title)}`} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-gold hover:text-gold"><Twitter className="h-4 w-4" /></a>
              <a href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-gold hover:text-gold"><Facebook className="h-4 w-4" /></a>
              <button onClick={() => navigator.clipboard?.writeText(window.location.href)} className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-gold hover:text-gold" aria-label="Copy link"><Link2 className="h-4 w-4" /></button>
            </div>
          </article>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <article key={p.slug} className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-luxe" onClick={() => setOpenSlug(p.slug)}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-foreground">{p.category}</div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold leading-tight group-hover:text-forest">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><User className="h-3 w-3" />{p.author.split(" ")[0]}</span>
                    <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{p.date}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{p.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </AppShell>
  );
}
