import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DoLBO0al.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Button } from "./button-CiSvnN9i.mjs";
import { W as LoaderCircle, d as Star } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as useAuth } from "./router-s5e8-avL.mjs";
import { t as Card } from "./card-BYsnRyjM.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { t as StatusBadge } from "./status-badge-CYT7GKBW.mjs";
import { i as format } from "../_libs/date-fns.mjs";
import { t as DashboardShell } from "./dashboard-shell--xLCWXxd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.experiences-BNFkH7Oq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MyExperiences() {
	const { user } = useAuth();
	const qc = useQueryClient();
	const [bookingId, setBookingId] = (0, import_react.useState)("");
	const [rating, setRating] = (0, import_react.useState)(5);
	const [message, setMessage] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)("");
	const [files, setFiles] = (0, import_react.useState)([]);
	const { data: completed } = useQuery({
		queryKey: ["completed-bookings", user?.id],
		queryFn: async () => {
			const { data, error } = await supabase.from("bookings").select("id, booking_number, tour_id, travel_end, tours(name)").eq("client_id", user.id).eq("status", "completed");
			if (error) throw error;
			return data ?? [];
		},
		enabled: !!user
	});
	const { data: mine } = useQuery({
		queryKey: ["my-experiences", user?.id],
		queryFn: async () => {
			const { data, error } = await supabase.from("experiences").select("id, rating, message, status, submitted_at, tours(name)").eq("client_id", user.id).order("submitted_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		},
		enabled: !!user
	});
	const submit = useMutation({
		mutationFn: async () => {
			const booking = completed?.find((b) => b.id === bookingId);
			if (!booking) throw new Error("Choose a completed booking first.");
			if (message.trim().length < 10) throw new Error("Tell us a little more about your trip.");
			const paths = [];
			for (const file of files.slice(0, 5)) {
				const path = `${user.id}/${crypto.randomUUID()}-${file.name.replace(/[^\w.-]/g, "_")}`;
				const { error } = await supabase.storage.from("experiences").upload(path, file);
				if (error) throw error;
				paths.push(path);
			}
			const { error } = await supabase.from("experiences").insert({
				client_id: user.id,
				booking_id: booking.id,
				tour_id: booking.tour_id,
				rating,
				message: message.trim().slice(0, 200),
				images: paths,
				experience_date: date || booking.travel_end || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
			});
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Thank you — your experience is awaiting review");
			setMessage("");
			setFiles([]);
			setBookingId("");
			qc.invalidateQueries({ queryKey: ["my-experiences"] });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		title: "Share an experience",
		description: "Available once a journey is marked completed. Approved stories appear on our site.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-6",
				children: completed?.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						"You don't have a completed journey yet.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard/bookings",
							className: "underline",
							children: "View bookings"
						}),
						"."
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-4",
					onSubmit: (e) => {
						e.preventDefault();
						submit.mutate();
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Journey" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: bookingId,
								onChange: (e) => setBookingId(e.target.value),
								required: true,
								className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select a completed booking…"
								}), completed?.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: b.id,
									children: [
										b.tours?.name,
										" · ",
										b.booking_number
									]
								}, b.id))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Rating" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1",
								children: [
									1,
									2,
									3,
									4,
									5
								].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setRating(n),
									"aria-label": `${n} stars`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-6 w-6 ${n <= rating ? "fill-gold text-gold" : "text-muted-foreground"}` })
								}, n))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [
								"Your story (",
								message.length,
								"/200)"
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 4,
								maxLength: 200,
								value: message,
								onChange: (e) => setMessage(e.target.value),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Date of experience" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									value: date,
									onChange: (e) => setDate(e.target.value)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Photos (up to 5)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "file",
									accept: "image/*",
									multiple: true,
									onChange: (e) => setFiles(Array.from(e.target.files ?? []).slice(0, 5))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							disabled: submit.isPending,
							className: "w-full bg-gold text-gold-foreground",
							children: [submit.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), " Submit for review"]
						})
					]
				})
			}), mine && mine.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold text-forest",
					children: "Your submissions"
				}), mine.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-wrap items-start justify-between gap-3 p-4",
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
								format(new Date(x.submitted_at), "PP")
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 max-w-xl text-sm",
							children: x.message
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: x.status })]
				}, x.id))]
			})]
		})
	});
}
//#endregion
export { MyExperiences as component };
