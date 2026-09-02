import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Leaf, Users, Award, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppShell } from "@/components/layout/app-shell";
import { TEAM, VALUES, PARTNERS } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About EDGELINK — Rwandan-owned Luxury Safaris" },
      { name: "description", content: "Founded by Rwandan guides. Twenty years of luxury expeditions, community ownership, and sustainable travel." },
      { property: "og:url", content: "https://edgelink-tours.lovable.app/about" },
      { property: "og:title", content: "About EDGELINK — Rwandan-owned Luxury Safaris" },
      { property: "og:description", content: "Founded by Rwandan guides. Twenty years of luxury expeditions, community ownership, and sustainable travel." },
    ],
    links: [{ rel: "canonical", href: "https://edgelink-tours.lovable.app/about" }],
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
          <h1 className="font-display text-4xl font-bold md:text-5xl">EDGELINK means beautiful</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">Connecting people, places and possibilities — EDGELINK Tours is our love letter to East Africa.</p>
        </div>
      </section>

      {/* STORY */}
      <section className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Our story</p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Founded by guides who grew up on these ridges.</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              EDGELINK began in 2005 when a group of Volcanoes National Park guides realised the country's most iconic safaris were being sold by companies without a single Rwandan on staff. We started with one Land Cruiser, one gorilla permit at a time, and an unshakeable belief that Rwanda should be told by Rwandans.
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
      <section className="relative overflow-hidden bg-muted/40 py-16 md:py-24">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-forest/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{t("team.eyebrow")}</p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{t("team.title")}</h2>
            <div className="mx-auto mt-4 h-px w-16 bg-gold" />
            <p className="mt-4 text-muted-foreground">{t("team.subtitle")}</p>
          </div>

          {/* Leadership */}
          <div className="grid gap-6 md:grid-cols-2">
            {TEAM.slice(0, 2).map((m, i) => (
              <motion.article
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group flex flex-col gap-5 rounded-3xl border border-border bg-card p-7 shadow-sm transition hover:-translate-y-1 hover:border-gold/60 hover:shadow-luxe sm:flex-row sm:items-center"
              >
                <div className="relative shrink-0">
                  <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-forest via-forest to-gold font-display text-2xl font-bold text-cream ring-4 ring-gold/30">
                    {m.initials}
                  </div>
                  <span className="absolute -bottom-1 -right-1 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-foreground">Lead</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-forest">{m.name}</h3>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold">{m.role}</div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Wider team */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.slice(2).map((m, i) => (
              <motion.article
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.06 }}
                className="group rounded-3xl border border-border bg-card p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-gold/60 hover:shadow-luxe"
              >
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-gold to-forest font-display text-lg font-bold text-cream ring-4 ring-gold/20 transition group-hover:ring-gold/50">
                  {m.initials}
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-forest">{m.name}</h3>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-gold">{m.role}</div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{m.bio}</p>
              </motion.article>
            ))}
          </div>
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
