import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DoLBO0al.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { n as motion, r as AnimatePresence } from "../_libs/framer-motion.mjs";
import { c as AppShell } from "./router-s5e8-avL.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
import { n as useMediaUrls } from "./media-C-t6IOdB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery-vJiYvyic.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Gallery() {
	const [loc, setLoc] = (0, import_react.useState)("All");
	const [lightbox, setLightbox] = (0, import_react.useState)(null);
	const { data: shots, isLoading } = useQuery({
		queryKey: ["public-gallery"],
		queryFn: async () => {
			const { data, error } = await supabase.from("gallery").select("id, image_url, title, description, location, photographer").order("is_featured", { ascending: false }).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const media = useMediaUrls("gallery", (shots ?? []).map((s) => s.image_url));
	const locations = (0, import_react.useMemo)(() => ["All", ...new Set((shots ?? []).map((s) => s.location).filter(Boolean))], [shots]);
	const items = (shots ?? []).filter((s) => loc === "All" || s.location === loc);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border bg-forest-deep py-16 text-primary-foreground md:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 md:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold",
					children: "Gallery"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl font-bold md:text-5xl",
					children: "From the field"
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-12 md:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-8 flex flex-wrap gap-2",
				children: locations.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setLoc(c),
					className: `rounded-full border px-4 py-1.5 text-sm font-medium transition ${loc === c ? "border-forest bg-forest text-primary-foreground" : "border-border hover:border-forest/50"}`,
					children: c
				}, c))
			}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
				children: [
					0,
					1,
					2,
					3,
					4,
					5,
					6,
					7
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "aspect-square rounded-xl" }, i))
			}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground",
				children: "Fresh photography is on its way — check back soon."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4",
				children: items.map((g, i) => {
					const url = media(g.image_url);
					if (!url) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						onClick: () => setLightbox(i),
						className: "mb-4 block w-full overflow-hidden rounded-xl transition hover:opacity-90",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: url,
							alt: g.title,
							loading: "lazy",
							className: "w-full object-cover"
						})
					}, g.id);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: lightbox !== null && items[lightbox] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			onClick: () => setLightbox(null),
			className: "fixed inset-0 z-50 grid place-items-center bg-black/90 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setLightbox(null),
				className: "absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20",
				"aria-label": "Close",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.figure, {
				initial: { scale: .95 },
				animate: { scale: 1 },
				exit: { scale: .95 },
				onClick: (e) => e.stopPropagation(),
				className: "max-h-[85vh] max-w-5xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: media(items[lightbox].image_url),
					alt: items[lightbox].title,
					className: "max-h-[80vh] w-auto rounded-xl object-contain"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
					className: "mt-3 text-center text-sm text-white/80",
					children: [
						items[lightbox].title,
						items[lightbox].location ? ` · ${items[lightbox].location}` : "",
						items[lightbox].photographer ? ` · © ${items[lightbox].photographer}` : ""
					]
				})]
			})]
		}) })
	] });
}
//#endregion
export { Gallery as component };
