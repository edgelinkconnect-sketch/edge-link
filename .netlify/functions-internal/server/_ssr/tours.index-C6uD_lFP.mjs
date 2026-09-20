import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DoLBO0al.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Button } from "./button-CiSvnN9i.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { A as Mountain, Et as ArrowRight, dt as Clock, z as MapPin } from "../_libs/lucide-react.mjs";
import { n as motion } from "../_libs/framer-motion.mjs";
import { c as AppShell } from "./router-s5e8-avL.mjs";
import { t as AskSpecialistButton } from "./ask-specialist-BG0Isyw9.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
import { n as useMediaUrls } from "./media-C-t6IOdB.mjs";
import { t as TOURS } from "./tours-data-CAGOSi_M.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tours.index-C6uD_lFP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useTours() {
	return useQuery({
		queryKey: ["public-tours"],
		queryFn: async () => {
			const { data, error } = await supabase.from("tours").select("id, slug, name, location, region, activity, duration, difficulty, price, featured_image_url, description, highlights, translations").eq("status", "active").order("created_at");
			if (!error && data?.length) return data;
			return TOURS.map((tour) => ({
				id: tour.id,
				slug: tour.id,
				name: tour.name,
				location: tour.region,
				region: tour.region,
				activity: tour.activity,
				duration: `${tour.duration} days`,
				difficulty: tour.difficulty,
				price: String(tour.price),
				featured_image_url: tour.image,
				description: tour.summary,
				highlights: tour.highlights,
				translations: null
			}));
		}
	});
}
function ToursIndex() {
	const { t: tr, i18n } = useTranslation();
	const { data: tours, isLoading, error } = useTours();
	const [region, setRegion] = (0, import_react.useState)("All");
	const [activity, setActivity] = (0, import_react.useState)("All");
	const [duration, setDuration] = (0, import_react.useState)("All");
	const media = useMediaUrls("tours", (tours ?? []).map((t) => t.featured_image_url));
	const regions = (0, import_react.useMemo)(() => ["All", ...new Set((tours ?? []).map((t) => t.region || t.location).filter(Boolean))], [tours]);
	const durations = (0, import_react.useMemo)(() => ["All", ...new Set((tours ?? []).map((t) => t.duration).filter(Boolean))], [tours]);
	const activities = (0, import_react.useMemo)(() => ["All", ...new Set((tours ?? []).map((t) => t.activity).filter(Boolean))], [tours]);
	const items = (tours ?? []).filter((t) => (region === "All" || (t.region || t.location) === region) && (activity === "All" || t.activity === activity) && (duration === "All" || t.duration === duration));
	const languageCode = i18n.language.split("-")[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-border bg-forest-deep py-16 text-primary-foreground md:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold",
					children: tr("hub.eyebrow")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl font-bold md:text-5xl",
					children: tr("hub.title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-primary-foreground/80",
					children: tr("hub.subtitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AskSpecialistButton, { className: "mt-6 bg-gold text-gold-foreground hover:brightness-95" })
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-4 py-12 md:px-6",
		children: [
			error instanceof Error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6 rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive",
				children: "Tours could not be loaded. Please refresh the page or try again shortly."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterRow, {
						label: tr("hub.region"),
						options: regions,
						value: region,
						onChange: setRegion
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterRow, {
						label: tr("hub.activity"),
						options: activities,
						value: activity,
						onChange: setActivity
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterRow, {
						label: tr("hub.duration"),
						options: durations,
						value: duration,
						onChange: setDuration
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pt-1 text-xs text-muted-foreground",
						children: tr("hub.results", { count: items.length })
					})
				]
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
				children: [
					0,
					1,
					2
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-80 rounded-2xl" }, i))
			}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground",
				children: tr("hub.empty")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
				children: items.map((t, i) => (() => {
					const localized = {
						...t,
						...t.translations?.[languageCode] ?? {}
					};
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
						initial: {
							opacity: 0,
							y: 18
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: {
							duration: .45,
							delay: i * .05
						},
						className: "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-luxe",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-[16/10] overflow-hidden bg-muted",
							children: [media(t.featured_image_url) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: media(t.featured_image_url),
								alt: localized.name,
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
									t.duration
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
										" ",
										t.region || t.location
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-1 font-display text-xl font-bold",
									children: localized.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 line-clamp-3 text-sm text-muted-foreground",
									children: localized.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-auto flex items-end justify-between border-t border-border pt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-wider text-muted-foreground",
										children: "Enquire"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-display text-lg font-bold text-forest",
										children: "Ask for quote"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "sm",
										className: "bg-forest text-primary-foreground hover:bg-forest-deep",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/tours/$slug",
											params: { slug: t.slug ?? t.id },
											children: [
												tr("hub.view"),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-4 w-4" })
											]
										})
									})]
								})
							]
						})]
					}, t.id);
				})())
			})
		]
	})] });
}
function FilterRow({ label, options, value, onChange }) {
	const { t } = useTranslation();
	const allLabel = t("hub.all");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mr-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
			children: label
		}), options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => onChange(o),
			className: `rounded-full border px-3 py-1.5 text-xs font-medium transition ${value === o ? "border-forest bg-forest text-primary-foreground" : "border-border hover:border-forest/50"}`,
			children: o === "All" ? allLabel : o
		}, o))]
	});
}
//#endregion
export { ToursIndex as component, useTours };
