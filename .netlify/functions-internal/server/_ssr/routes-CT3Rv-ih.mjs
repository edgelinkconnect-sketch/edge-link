import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DoLBO0al.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { L as isRedirect, _ as Link, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Button } from "./button-CiSvnN9i.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { A as Mountain, Et as ArrowRight, K as Leaf, Tt as Award, d as Star, dt as Clock, g as ShieldCheck, p as Sparkles, r as Users, s as Trees, ut as Compass, z as MapPin } from "../_libs/lucide-react.mjs";
import { i as stringType, n as enumType, r as objectType, t as arrayType } from "../_libs/zod.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as motion } from "../_libs/framer-motion.mjs";
import { c as AppShell, i as PARTNERS, o as TESTIMONIALS, y as BrandLogo } from "./router-s5e8-avL.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as hero_mountains_default } from "./hero-mountains-1-NmgtDH.mjs";
import { n as useMediaUrls } from "./media-C-t6IOdB.mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./server-CvhsHXqw.mjs";
import { t as TOURS } from "./tours-data-CAGOSi_M.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CT3Rv-ih.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var inquirySchema = objectType({
	full_name: stringType().trim().min(2).max(120),
	email: stringType().trim().email().max(255),
	phone: stringType().trim().min(4).max(40),
	destinations: arrayType(enumType([
		"volcanoes",
		"akagera",
		"nyungwe"
	])).min(1).max(3),
	trip_duration: stringType().max(60).optional(),
	group_size: stringType().max(60).optional(),
	budget_range: stringType().max(60).optional(),
	travel_date: stringType().optional(),
	special_requirements: stringType().max(2e3).optional(),
	heard_from: stringType().max(120).optional()
});
var newsletterSchema = objectType({ email: stringType().trim().email().max(255) });
createServerFn({ method: "POST" }).inputValidator((raw) => inquirySchema.parse(raw)).handler(createSsrRpc("91320a5771b7bd16fea166384a6f51abe2a881df9a7d3131cad1b3f7d9e6a608"));
var subscribeNewsletter = createServerFn({ method: "POST" }).inputValidator((raw) => newsletterSchema.parse(raw)).handler(createSsrRpc("540c525aa0a7052979ba9bf807a4851175c4cdab6118647916867e035b22f02e"));
var WHY = [
	{
		icon: Award,
		key: "expertGuides",
		bodyKey: "expertGuidesBody"
	},
	{
		icon: Trees,
		key: "luxuryLodges",
		bodyKey: "luxuryLodgesBody"
	},
	{
		icon: Compass,
		key: "customItineraries",
		bodyKey: "customItinerariesBody"
	},
	{
		icon: Leaf,
		key: "sustainable",
		bodyKey: "sustainableBody"
	}
];
function fadeUp(delay = 0) {
	return {
		initial: {
			opacity: 0,
			y: 24
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-80px"
		},
		transition: {
			duration: .6,
			delay,
			ease: [
				.16,
				1,
				.3,
				1
			]
		}
	};
}
function Home() {
	const { t } = useTranslation();
	const subscribe = useServerFn(subscribeNewsletter);
	const [email, setEmail] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const { data: tours } = useQuery({
		queryKey: ["homepage-tours"],
		queryFn: async () => {
			const { data } = await supabase.from("tours").select("id, slug, name, location, region, activity, duration, featured_image_url, description").eq("status", "active").order("created_at").limit(6);
			if (data?.length) return data;
			return TOURS.map((tour) => ({
				id: tour.id,
				slug: tour.id,
				name: tour.name,
				location: tour.region,
				region: tour.region,
				activity: tour.activity,
				duration: `${tour.duration} days`,
				featured_image_url: tour.image,
				description: tour.summary
			}));
		}
	});
	const tourMedia = useMediaUrls("tours", (tours ?? []).map((tour) => tour.featured_image_url));
	async function onSubscribe(e) {
		e.preventDefault();
		setSubmitting(true);
		try {
			await subscribe({ data: { email } });
			toast.success(t("home.subscribe"));
			setEmail("");
		} catch {
			toast.error(t("common.error"));
		} finally {
			setSubmitting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative isolate overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { scale: 1.15 },
					animate: { scale: 1.05 },
					transition: {
						duration: 12,
						ease: "easeOut"
					},
					className: "absolute inset-0 -z-10 bg-cover bg-center",
					style: { backgroundImage: `url(${hero_mountains_default})` }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 -z-10 bg-gradient-to-b from-forest-deep/75 via-forest-deep/45 to-background" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 pb-28 pt-24 text-center md:px-6 md:pb-40 md:pt-40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							...fadeUp(0),
							className: "mb-8 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, {
								showName: false,
								imageClassName: "h-28 w-28 rounded-2xl ring-4 ring-gold shadow-2xl md:h-36 md:w-36",
								className: "rounded-2xl bg-white/95 p-1"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							...fadeUp(0),
							className: "mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/25 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold backdrop-blur",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }),
								" ",
								t("home.exploreTours")
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
							...fadeUp(.05),
							className: "mx-auto max-w-4xl font-display text-4xl font-bold leading-tight text-white drop-shadow-lg md:text-6xl lg:text-7xl",
							children: t("home.heroTitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							...fadeUp(.1),
							className: "mx-auto mt-5 max-w-2xl text-base text-white/90 md:text-lg",
							children: t("home.heroSubtitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							...fadeUp(.15),
							className: "mt-10 flex flex-wrap items-center justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								className: "bg-gold text-gold-foreground shadow-luxe hover:brightness-95",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/destinations",
									children: [
										t("common.viewAll"),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1.5 h-4 w-4" })
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								variant: "outline",
								className: "border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/contact",
									children: t("home.planTrip")
								})
							})]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				...fadeUp(),
				className: "mb-12 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold",
					children: "Tours & itineraries"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-bold md:text-4xl",
					children: "Journeys shaped around Rwanda"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-3",
				children: (tours ?? []).slice(0, 6).map((tour, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					...fadeUp(i * .08),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/tours/$slug",
						params: { slug: tour.slug ?? tour.id },
						className: "group block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-luxe",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-[16/10] overflow-hidden bg-muted",
							children: [tourMedia(tour.featured_image_url) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: tourMedia(tour.featured_image_url),
								alt: tour.name,
								loading: "lazy",
								className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-full w-full place-items-center text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mountain, { className: "h-8 w-8" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }),
									" ",
									tour.duration
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
										" ",
										tour.region || tour.location
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-1 font-display text-xl font-bold",
									children: tour.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 line-clamp-2 text-sm text-muted-foreground",
									children: tour.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest",
									children: ["Ask for quote ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-1" })]
								})
							]
						})]
					})
				}, tour.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-forest-deep py-20 text-primary-foreground md:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 md:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					...fadeUp(),
					className: "mb-12 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold",
						children: t("home.whyEdgelink")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-bold md:text-4xl",
						children: t("home.whyEdgelink")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 md:grid-cols-4",
					children: WHY.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						...fadeUp(i * .06),
						className: "rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-gold-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(w.icon, { className: "h-6 w-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-bold",
								children: t(`why.${w.key}`)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-primary-foreground/75",
								children: t(`why.${w.bodyKey}`)
							})
						]
					}, w.key))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				...fadeUp(),
				className: "mb-12 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold",
					children: "Testimonials"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-bold md:text-4xl",
					children: "Words from our travellers"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
				children: TESTIMONIALS.map((tt, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.blockquote, {
					...fadeUp(i * .05),
					className: "rounded-2xl border border-border bg-card p-6 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 flex gap-0.5 text-gold",
							children: Array.from({ length: 5 }).map((_, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-current" }, k))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-base italic leading-relaxed",
							children: [
								"\"",
								tt.text,
								"\""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
							className: "mt-4 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-gold to-forest text-xs font-bold text-white",
								children: tt.name.split(" ").map((w) => w[0]).join("").slice(0, 2)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-semibold",
								children: tt.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: tt.location
							})] })]
						})
					]
				}, tt.name))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border bg-muted/40 py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 md:px-6",
				children: PARTNERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-gold" }), p]
				}, p))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-3xl px-4 py-20 text-center md:px-6 md:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				...fadeUp(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "mx-auto mb-3 h-8 w-8 text-gold" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-bold md:text-4xl",
						children: "Join our expedition letter"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted-foreground",
						children: "Occasional dispatches on new lodges, gorilla family news, and secret trails. Never spam."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: onSubscribe,
						className: "mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "email",
							required: true,
							placeholder: "your@email.com",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							className: "h-12"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: submitting,
							className: "h-12 bg-gold text-gold-foreground hover:brightness-95",
							children: submitting ? "Subscribing…" : "Subscribe"
						})]
					})
				]
			})
		})
	] });
}
//#endregion
export { Home as component };
