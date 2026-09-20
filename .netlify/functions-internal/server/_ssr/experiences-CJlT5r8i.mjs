import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DoLBO0al.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Button } from "./button-CiSvnN9i.mjs";
import { W as LoaderCircle, t as X, vt as Check } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Card } from "./card-BYsnRyjM.mjs";
import { t as StatusBadge } from "./status-badge-CYT7GKBW.mjs";
import { i as format } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/experiences-CJlT5r8i.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	"pending",
	"approved",
	"rejected",
	"all"
];
function AdminExperiences() {
	const qc = useQueryClient();
	const [filter, setFilter] = (0, import_react.useState)("pending");
	const { data: rows, isLoading } = useQuery({
		queryKey: ["admin-experiences", filter],
		queryFn: async () => {
			let q = supabase.from("experiences").select("*, tours(name, region)").order("submitted_at", { ascending: false });
			if (filter !== "all") q = q.eq("status", filter);
			const { data, error } = await q;
			if (error) throw error;
			return data ?? [];
		}
	});
	const decide = async (id, status) => {
		const { error } = await supabase.from("experiences").update({
			status,
			approved_at: status === "approved" ? (/* @__PURE__ */ new Date()).toISOString() : null
		}).eq("id", id);
		if (error) return toast.error(error.message);
		toast.success(`Experience ${status}`);
		qc.invalidateQueries({ queryKey: ["admin-experiences"] });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-bold text-forest",
			children: "Experiences"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 flex flex-wrap gap-2",
			children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setFilter(f),
				className: `rounded-full border px-3 py-1.5 text-xs capitalize ${filter === f ? "border-forest bg-forest text-cream" : "border-border bg-background"}`,
				children: f
			}, f))
		}),
		isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mx-auto mt-10 h-6 w-6 animate-spin text-muted-foreground" }),
		!isLoading && rows?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mt-6 p-10 text-center text-sm text-muted-foreground",
			children: "Nothing here right now."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 space-y-3",
			children: rows?.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold text-forest",
							children: x.tours?.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground",
							children: [
								"★".repeat(x.rating),
								" · ",
								format(new Date(x.submitted_at), "PP"),
								" · ",
								x.images?.length ?? 0,
								" photo(s)"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-2xl text-sm",
							children: x.message
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: x.status }), x.status !== "approved" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								className: "bg-forest text-cream",
								onClick: () => void decide(x.id, "approved"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-1.5 h-4 w-4" }), " Approve"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => void decide(x.id, "rejected"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "mr-1.5 h-4 w-4" }), " Reject"]
							})]
						})]
					})]
				})
			}, x.id))
		})
	] });
}
//#endregion
export { AdminExperiences as component };
