import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { K as Leaf, Tt as Award, p as Sparkles, r as Users } from "../_libs/lucide-react.mjs";
import { n as motion } from "../_libs/framer-motion.mjs";
import { a as TEAM, c as AppShell, i as PARTNERS, s as VALUES } from "./router-s5e8-avL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-Bhrg-eJT.js
var import_jsx_runtime = require_jsx_runtime();
var VALUE_ICONS = {
	Sustainability: Leaf,
	Community: Users,
	Excellence: Award,
	Authenticity: Sparkles
};
function About() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border bg-forest-deep py-16 text-primary-foreground md:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 md:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold",
						children: "About"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-bold md:text-5xl",
						children: "EDGELINK means beautiful"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-primary-foreground/80",
						children: "Connecting people, places and possibilities — EDGELINK Tours is our love letter to East Africa."
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 20
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold",
						children: "Our story"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-bold md:text-4xl",
						children: "Founded by guides who grew up on these ridges."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "EDGELINK began in 2005 when a group of Volcanoes National Park guides realised the country's most iconic safaris were being sold by companies without a single Rwandan on staff. We started with one Land Cruiser, one gorilla permit at a time, and an unshakeable belief that Rwanda should be told by Rwandans." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Twenty years later, we're Rwanda's leading independent luxury operator: 100% locally owned, RDB-certified, and trusted by discerning travellers from every continent. Our head guides average 15 years in the field. Our lodge partners are the best on the continent. Our clients become friends." })]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-muted/40 py-16 md:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 md:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-10 text-center font-display text-3xl font-bold md:text-4xl",
					children: "Our values"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 md:grid-cols-4",
					children: VALUES.map((v, i) => {
						const Icon = VALUE_ICONS[v.title];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: { delay: i * .06 },
							className: "rounded-2xl border border-border bg-card p-6 shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-forest text-primary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-bold",
									children: v.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: v.body
								})
							]
						}, v.title);
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden bg-muted/40 py-16 md:py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-forest/10 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-7xl px-4 md:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto mb-12 max-w-2xl text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase tracking-[0.3em] text-gold",
									children: t("team.eyebrow")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-3 font-display text-3xl font-bold md:text-4xl",
									children: t("team.title")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-4 h-px w-16 bg-gold" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-muted-foreground",
									children: t("team.subtitle")
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-6 md:grid-cols-2",
							children: TEAM.slice(0, 2).map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
								initial: {
									opacity: 0,
									y: 20
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: { once: true },
								transition: { delay: i * .08 },
								className: "group flex flex-col gap-5 rounded-3xl border border-border bg-card p-7 shadow-sm transition hover:-translate-y-1 hover:border-gold/60 hover:shadow-luxe sm:flex-row sm:items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-forest via-forest to-gold font-display text-2xl font-bold text-cream ring-4 ring-gold/30",
										children: m.initials
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -bottom-1 -right-1 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-foreground",
										children: "Lead"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-xl font-bold text-forest",
										children: m.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-xs font-semibold uppercase tracking-wider text-gold",
										children: m.role
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm leading-relaxed text-muted-foreground",
										children: m.bio
									})
								] })]
							}, m.name))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
							children: TEAM.slice(2).map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
								initial: {
									opacity: 0,
									y: 20
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: { once: true },
								transition: { delay: .15 + i * .06 },
								className: "group rounded-3xl border border-border bg-card p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-gold/60 hover:shadow-luxe",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-gold to-forest font-display text-lg font-bold text-cream ring-4 ring-gold/20 transition group-hover:ring-gold/50",
										children: m.initials
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-4 font-display text-base font-bold text-forest",
										children: m.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-[11px] font-semibold uppercase tracking-wider text-gold",
										children: m.role
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-xs leading-relaxed text-muted-foreground",
										children: m.bio
									})
								]
							}, m.name))
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-forest-deep py-16 text-primary-foreground md:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-4xl px-4 text-center md:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "mx-auto mb-3 h-8 w-8 text-gold" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-bold md:text-4xl",
						children: "Sustainability isn't a page. It's the whole plan."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-primary-foreground/85",
						children: "Every trip is carbon-offset through Rwanda's national reforestation program. We partner exclusively with eco-lodges and cooperatives, and 8% of every booking goes directly to Volcanoes NP conservation and community health projects around the park."
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-14 md:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em] text-gold",
				children: "Partners & accreditations"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center text-sm font-semibold text-muted-foreground",
				children: PARTNERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-full border border-border px-4 py-2",
					children: p
				}, p))
			})]
		})
	] });
}
//#endregion
export { About as component };
