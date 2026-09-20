import { t as supabase } from "./client-DoLBO0al.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { P as MessageSquare, R as Map, Y as Image, d as Star, r as Users, xt as Calendar } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-BYsnRyjM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DceLLQoe.js
var import_jsx_runtime = require_jsx_runtime();
function AdminOverview() {
	const { t } = useTranslation();
	const stats = useQuery({
		queryKey: ["admin-stats"],
		queryFn: async () => {
			const [tours, gallery, bookings, experiences, chats, users] = await Promise.all([
				supabase.from("tours").select("id", {
					count: "exact",
					head: true
				}),
				supabase.from("gallery").select("id", {
					count: "exact",
					head: true
				}),
				supabase.from("bookings").select("id, status", { count: "exact" }),
				supabase.from("experiences").select("id, status", { count: "exact" }),
				supabase.from("chats").select("id, status", { count: "exact" }),
				supabase.from("profiles").select("id", {
					count: "exact",
					head: true
				})
			]);
			return {
				tours: tours.count ?? 0,
				gallery: gallery.count ?? 0,
				bookings: bookings.count ?? 0,
				pendingBookings: (bookings.data ?? []).filter((b) => b.status === "pending").length,
				experiences: experiences.count ?? 0,
				pendingExperiences: (experiences.data ?? []).filter((e) => e.status === "pending").length,
				chats: chats.count ?? 0,
				activeChats: (chats.data ?? []).filter((c) => c.status === "active").length,
				users: users.count ?? 0
			};
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-bold text-forest",
			children: t("admin.overview")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: t("admin.overview")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					icon: Map,
					label: t("admin.stats.totalTours"),
					value: stats.data?.tours ?? 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					icon: Image,
					label: t("admin.stats.galleryImages"),
					value: stats.data?.gallery ?? 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					icon: Users,
					label: t("common.people"),
					value: stats.data?.users ?? 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					icon: Calendar,
					label: t("admin.stats.totalBookings"),
					value: stats.data?.bookings ?? 0,
					sub: `${stats.data?.pendingBookings ?? 0} ${t("status.pending").toLowerCase()}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					icon: Star,
					label: t("admin.stats.pendingExperiences"),
					value: stats.data?.experiences ?? 0,
					sub: `${stats.data?.pendingExperiences ?? 0} ${t("status.pending").toLowerCase()}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					icon: MessageSquare,
					label: t("admin.stats.openChats"),
					value: stats.data?.chats ?? 0,
					sub: `${stats.data?.activeChats ?? 0} ${t("status.active").toLowerCase()}`
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-8 p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-semibold text-forest",
				children: "Welcome to Phase 1"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Foundation is live: authentication, roles, database schema, admin gate. Tours, gallery, bookings, experiences, and chat management pages will populate in the next phase."
			})]
		})
	] });
}
function Stat({ icon: Icon, label, value, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-wide text-muted-foreground",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 font-display text-3xl font-bold text-forest",
					children: value
				}),
				sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-xs text-gold-foreground/60",
					children: sub
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-full bg-gold/20 p-3 text-forest",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
			})]
		})
	});
}
//#endregion
export { AdminOverview as component };
