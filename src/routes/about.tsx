import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Leaf, Users, Award, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { TEAM, VALUES, PARTNERS } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About RWIZA — Rwandan-owned Luxury Safaris" },
      { name: "description", content: "Founded by Rwandan guides. Twenty years of luxury expeditions, community ownership, and sustainable travel." },
      { property: "og:url", content: "https://rwiza.lovable.app/about" },
      { property: "og:title", content: "About RWIZA — Rwandan-owned Luxury Safaris" },
      { property: "og:description", content: "Founded by Rwandan guides. Twenty years of luxury expeditions, community ownership, and sustainable travel." },
    ],
    links: [{ rel: "canonical", href: "https://rwiza.lovable.app/about" }],
  }),
  component: About,
});

const VALUE_ICONS = { Sustainability: Leaf, Community: Users, Excellence: Award, Authenticity: Sparkles } as const;

function About() {
  return (
    <AppShell>
      <section className="border-b border-border bg-forest-deep py-16 text-primary-foreground md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">About</p>
          <h1 className="font-display text-4xl font-bold md:text-5xl">RWIZA means beautiful</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">In Kinyarwanda, "rwiza" is the word for the beauty we grew up in. RWIZA Travel & Tour is our love letter to it.</p>
        </div>
      </section>

      {/* STORY */}
      <section className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Our story</p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Founded by guides who grew up on these ridges.</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              RWIZA began in 2005 when a group of Volcanoes National Park guides realised the country's most iconic safaris were being sold by companies without a single Rwandan on staff. We started with one Land Cruiser, one gorilla permit at a time, and an unshakeable belief that Rwanda should be told by Rwandans.
            </p>
            <p>
              Twenty years later, we're Rwanda's leading independent luxury operator: 100% locally owned, RDB-certified, and trusted by discerning travellers from every continent. Our head guides average 15 years in the field. Our lodge partners are the best on the continent. Our clients become friends.
            </p>
          </div>
        </motion.div>
      </section>

      {/* VALUES */}
      <section className="bg-muted/40 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="mb-10 text-center font-display text-3xl font-bold md:text-4xl">Our values</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {VALUES.map((v, i) => {
              const Icon = VALUE_ICONS[v.title as keyof typeof VALUE_ICONS];
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-forest text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <h2 className="mb-10 text-center font-display text-3xl font-bold md:text-4xl">Meet the team</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m, i) => (
            <motion.article
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-gold to-forest text-lg font-bold text-white">
                {m.initials}
              </div>
              <h3 className="font-display text-lg font-bold">{m.name}</h3>
              <div className="text-xs font-semibold uppercase tracking-wider text-gold">{m.role}</div>
              <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* SUSTAINABILITY */}
      <section className="bg-forest-deep py-16 text-primary-foreground md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <Leaf className="mx-auto mb-3 h-8 w-8 text-gold" />
          <h2 className="font-display text-3xl font-bold md:text-4xl">Sustainability isn't a page. It's the whole plan.</h2>
          <p className="mt-4 text-primary-foreground/85">Every trip is carbon-offset through Rwanda's national reforestation program. We partner exclusively with eco-lodges and cooperatives, and 8% of every booking goes directly to Volcanoes NP conservation and community health projects around the park.</p>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em] text-gold">Partners & accreditations</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center text-sm font-semibold text-muted-foreground">
          {PARTNERS.map((p) => <div key={p} className="rounded-full border border-border px-4 py-2">{p}</div>)}
        </div>
      </section>
    </AppShell>
  );
}
