import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DoLBO0al.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Button } from "./button-CiSvnN9i.mjs";
import { W as LoaderCircle, st as Download, y as Search } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Card } from "./card-BYsnRyjM.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { t as StatusBadge } from "./status-badge-CYT7GKBW.mjs";
import { i as format } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookings-4SmxRuhu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUSES = [
	"pending",
	"under_review",
	"available",
	"confirmed",
	"completed",
	"cancelled"
];
function AdminBookings() {
	const qc = useQueryClient();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [search, setSearch] = (0, import_react.useState)("");
	const [notesFor, setNotesFor] = (0, import_react.useState)(null);
	const [noteDraft, setNoteDraft] = (0, import_react.useState)("");
	const { data: bookings, isLoading } = useQuery({
		queryKey: ["admin-bookings"],
		queryFn: async () => {
			const { data, error } = await supabase.from("bookings").select("*, tours(name, location)").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const rows = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		return (bookings ?? []).filter((b) => {
			if (filter !== "all" && b.status !== filter) return false;
			if (!q) return true;
			return [
				b.booking_number,
				b.full_name,
				b.email,
				b.phone
			].some((v) => (v ?? "").toLowerCase().includes(q));
		});
	}, [
		bookings,
		filter,
		search
	]);
	const update = async (id, patch) => {
		const { error } = await supabase.from("bookings").update(patch).eq("id", id);
		if (error) return toast.error(error.message);
		toast.success("Booking updated");
		qc.invalidateQueries({ queryKey: ["admin-bookings"] });
	};
	const exportCsv = () => {
		const csv = [[
			"Reference",
			"Status",
			"Tour",
			"Name",
			"Email",
			"Phone",
			"Adults",
			"Children",
			"Start",
			"End",
			"Created"
		], ...rows.map((b) => [
			b.booking_number,
			b.status,
			b.tours?.name ?? "",
			b.full_name,
			b.email,
			b.phone,
			b.adults,
			b.children,
			b.travel_start ?? "",
			b.travel_end ?? "",
			b.created_at
		])].map((r) => r.map((c) => `"${String(c).replace(/"/g, "\"\"")}"`).join(",")).join("\n");
		const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
		const a = document.createElement("a");
		a.href = url;
		a.download = `edgelink-bookings-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
		a.click();
		URL.revokeObjectURL(url);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-bold text-forest",
				children: "Bookings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				onClick: exportCsv,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-1.5 h-4 w-4" }), " Export CSV"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 flex flex-wrap items-center gap-2",
			children: [["all", ...STATUSES].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setFilter(s),
				className: `rounded-full border px-3 py-1.5 text-xs capitalize ${filter === s ? "border-forest bg-forest text-cream" : "border-border bg-background"}`,
				children: s.replace("_", " ")
			}, s)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative ml-auto w-full max-w-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: search,
					onChange: (e) => setSearch(e.target.value),
					placeholder: "Search name, email, ref",
					className: "pl-8"
				})]
			})]
		}),
		isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mx-auto mt-10 h-6 w-6 animate-spin text-muted-foreground" }),
		!isLoading && rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mt-6 p-10 text-center text-sm text-muted-foreground",
			children: "No bookings match this filter."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 space-y-3",
			children: rows.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-[16rem]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-xs text-muted-foreground",
								children: b.booking_number
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold text-forest",
								children: b.tours?.name ?? "Tour"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm text-muted-foreground",
								children: [
									b.full_name,
									" · ",
									b.email,
									" · ",
									b.phone
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground",
								children: [
									b.adults,
									" adults",
									b.children ? `, ${b.children} children` : "",
									b.travel_start ? ` · ${format(new Date(b.travel_start), "PP")}` : "",
									` · requested ${format(new Date(b.created_at), "PP")}`
								]
							}),
							b.special_requests && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-2xl text-sm",
								children: b.special_requests
							}),
							b.admin_notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 max-w-2xl rounded-md bg-muted p-2 text-xs",
								children: ["Internal: ", b.admin_notes]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-end gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: b.status }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: b.status,
								onChange: (e) => void update(b.id, { status: e.target.value }),
								className: "rounded-md border border-input bg-background px-2 py-1.5 text-xs",
								"aria-label": "Change status",
								children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s,
									children: s.replace("_", " ")
								}, s))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => {
									setNotesFor(notesFor === b.id ? null : b.id);
									setNoteDraft(b.admin_notes ?? "");
								},
								children: "Internal note"
							})
						]
					})]
				}), notesFor === b.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 3,
						value: noteDraft,
						onChange: (e) => setNoteDraft(e.target.value)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => setNotesFor(null),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							className: "bg-forest text-cream",
							onClick: () => {
								update(b.id, { admin_notes: noteDraft });
								setNotesFor(null);
							},
							children: "Save note"
						})]
					})]
				})]
			}, b.id))
		})
	] });
}
//#endregion
export { AdminBookings as component };
