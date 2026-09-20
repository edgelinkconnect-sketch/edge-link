import { t as supabase } from "./client-DoLBO0al.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Button } from "./button-CiSvnN9i.mjs";
import { F as MessageCircle, W as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as useAuth } from "./router-s5e8-avL.mjs";
import { t as Card } from "./card-BYsnRyjM.mjs";
import { t as StatusBadge } from "./status-badge-CYT7GKBW.mjs";
import { i as format } from "../_libs/date-fns.mjs";
import { n as whatsappUrl } from "./whatsapp-DocSP22n.mjs";
import { t as DashboardShell } from "./dashboard-shell--xLCWXxd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.bookings-NbDH0jg_.js
var import_jsx_runtime = require_jsx_runtime();
function MyBookings() {
	const { user } = useAuth();
	const qc = useQueryClient();
	const { data: bookings, isLoading } = useQuery({
		queryKey: ["my-bookings-full", user?.id],
		queryFn: async () => {
			const { data, error } = await supabase.from("bookings").select("id, booking_number, status, travel_start, travel_end, adults, children, special_requests, created_at, tours(name, location, duration)").eq("client_id", user.id).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		},
		enabled: !!user
	});
	const cancel = async (id, number) => {
		const { error } = await supabase.from("bookings").update({ status: "cancelled" }).eq("id", id);
		if (error) return toast.error(error.message);
		toast.success(`Booking ${number} cancelled`);
		qc.invalidateQueries({ queryKey: ["my-bookings-full"] });
		qc.invalidateQueries({ queryKey: ["my-bookings"] });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		title: "My bookings",
		description: "Track requests, confirmations and completed journeys.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "outline",
			size: "sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/tours",
				children: "Book another"
			})
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mx-auto mt-10 h-6 w-6 animate-spin text-muted-foreground" }),
			bookings?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-6 p-10 text-center text-sm text-muted-foreground",
				children: [
					"No bookings yet. Explore our",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/tours",
						className: "underline",
						children: "itineraries"
					}),
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 space-y-4",
				children: bookings?.map((b) => {
					const tour = b.tours;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "p-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-xs text-muted-foreground",
									children: b.booking_number
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-lg font-bold text-forest",
									children: tour?.name ?? "Tour"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 text-sm text-muted-foreground",
									children: [
										tour?.location,
										" · ",
										tour?.duration,
										" · ",
										b.adults,
										" adults",
										b.children ? `, ${b.children} children` : ""
									]
								}),
								b.travel_start && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm text-muted-foreground",
									children: [format(new Date(b.travel_start), "PP"), b.travel_end ? ` → ${format(new Date(b.travel_end), "PP")}` : ""]
								}),
								b.special_requests && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 max-w-xl text-sm",
									children: b.special_requests
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-end gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: b.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											size: "sm",
											variant: "outline",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: whatsappUrl(`Hello EDGELINK Tours, about booking ${b.booking_number}:`),
												target: "_blank",
												rel: "noopener noreferrer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "mr-1.5 h-4 w-4" }), " WhatsApp"]
											})
										}),
										b.status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "outline",
											onClick: () => void cancel(b.id, b.booking_number),
											children: "Cancel"
										}),
										b.status === "completed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											size: "sm",
											className: "bg-gold text-gold-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/dashboard/experiences",
												children: "Share experience"
											})
										})
									]
								})]
							})]
						})
					}, b.id);
				})
			})
		] })
	});
}
//#endregion
export { MyBookings as component };
