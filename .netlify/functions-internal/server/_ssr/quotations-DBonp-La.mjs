import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DoLBO0al.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Button } from "./button-CiSvnN9i.mjs";
import { B as Mail, F as MessageCircle, W as LoaderCircle, ft as Clock3, m as SlidersHorizontal, r as Users, vt as Check, y as Search } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Card } from "./card-BYsnRyjM.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { i as format } from "../_libs/date-fns.mjs";
import { n as whatsappUrl } from "./whatsapp-DocSP22n.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quotations-DBonp-La.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUSES = [
	"new",
	"quoted",
	"sent",
	"archived"
];
function AdminQuotations() {
	const qc = useQueryClient();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [quoteDrafts, setQuoteDrafts] = (0, import_react.useState)({});
	const [amountDrafts, setAmountDrafts] = (0, import_react.useState)({});
	const { data: requests, isLoading } = useQuery({
		queryKey: ["admin-quotations"],
		queryFn: async () => {
			const { data, error } = await supabase.from("tour_quote_requests").select("*, tours(name, location, duration)").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const counts = (0, import_react.useMemo)(() => {
		const all = requests ?? [];
		return {
			all: all.length,
			new: all.filter((r) => r.status === "new").length,
			quoted: all.filter((r) => r.status === "quoted").length,
			sent: all.filter((r) => r.status === "sent").length
		};
	}, [requests]);
	const rows = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		return (requests ?? []).filter((r) => {
			if (filter !== "all" && r.status !== filter) return false;
			if (!q) return true;
			return [
				r.full_name,
				r.email,
				r.phone,
				r.id,
				r.tours?.name
			].some((v) => (v ?? "").toLowerCase().includes(q));
		});
	}, [
		requests,
		filter,
		search
	]);
	(0, import_react.useEffect)(() => {
		if (!selectedId || !rows.some((row) => row.id === selectedId)) setSelectedId(rows[0]?.id ?? null);
	}, [rows, selectedId]);
	const selected = rows.find((row) => row.id === selectedId) ?? null;
	const update = async (id, patch) => {
		const { error } = await supabase.from("tour_quote_requests").update(patch).eq("id", id);
		if (error) return toast.error(error.message);
		qc.invalidateQueries({ queryKey: ["admin-quotations"] });
	};
	const sendQuote = async (request) => {
		const amount = (amountDrafts[request.id] ?? request.quoted_amount ?? "").trim();
		const amountLabel = amount ? `${amount} USD` : "To be confirmed";
		const tourName = request.tours?.name ?? "your selected tour";
		const tourLocation = request.tours?.location ?? "Rwanda";
		const tourDuration = request.tours?.duration ?? "custom itinerary";
		const travelDates = request.travel_start ? `${format(new Date(request.travel_start), "MMM d, yyyy")}${request.travel_end ? ` to ${format(new Date(request.travel_end), "MMM d, yyyy")}` : ""}` : "your preferred travel dates";
		const baseMessage = [
			`Hello ${request.full_name},`,
			"",
			`Thank you for your interest in ${tourName}. We are pleased to share the quotation for your ${tourName} journey in ${tourLocation}.`,
			"",
			"Trip details:",
			`• Tour: ${tourName}`,
			`• Duration: ${tourDuration}`,
			`• Travel dates: ${travelDates}`,
			`• Quotation amount: ${amountLabel}`,
			"",
			"This proposal is tailored to your preferences and is designed to give you a clear overview of the experience we can arrange for you.",
			"",
			"Please reply to this message if you would like us to proceed, and our team will guide you through the next steps.",
			"",
			"Warm regards,",
			"EDGELINK Tours"
		].join("\n");
		const message = quoteDrafts[request.id]?.trim() || baseMessage;
		window.open(whatsappUrl(message, request.phone), "_blank", "noopener");
		await update(request.id, {
			status: "sent",
			quoted_amount: amount || null,
			admin_notes: quoteDrafts[request.id] ? "Custom quote prepared for WhatsApp" : "Quote sent by WhatsApp"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1500px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-gold" }), " Sales desk"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-bold text-forest",
						children: "Quotation inbox"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-xl text-sm text-muted-foreground",
						children: "Review requests, prepare a USD offer, and send the final answer to WhatsApp."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "h-4 w-4" }), " Updated live"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Needs attention",
						value: counts.new,
						tone: "gold"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Being prepared",
						value: counts.quoted,
						tone: "forest"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Sent to clients",
						value: counts.sent,
						tone: "neutral"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 flex flex-col gap-3 rounded-lg border border-border bg-card p-3 shadow-sm lg:flex-row lg:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: "Search client, tour, phone, or request ID",
						className: "border-0 bg-muted/60 pl-9 shadow-none focus-visible:ring-1"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 overflow-x-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "h-4 w-4 shrink-0 text-muted-foreground" }), ["all", ...STATUSES].map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setFilter(status),
						className: `shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold capitalize transition ${filter === status ? "bg-forest text-cream" : "text-muted-foreground hover:bg-muted"}`,
						children: status === "all" ? `All ${counts.all}` : `${status} ${status === "new" ? counts.new : status === "quoted" ? counts.quoted : status === "sent" ? counts.sent : ""}`
					}, status))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-h-[620px] gap-4 lg:grid-cols-[minmax(280px,0.75fr)_minmax(0,1.65fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "overflow-hidden p-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-b border-border px-4 py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold text-forest",
								children: "Requests"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground",
								children: [rows.length, " showing"]
							})]
						})
					}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mx-auto mt-10 h-6 w-6 animate-spin text-muted-foreground" }) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "p-8 text-center text-sm text-muted-foreground",
						children: "No requests match this view."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-border",
						children: rows.map((request) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestListItem, {
							request,
							selected: request.id === selectedId,
							onSelect: () => setSelectedId(request.id)
						}, request.id))
					})]
				}), selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteWorkspace, {
					request: selected,
					amount: amountDrafts[selected.id] ?? selected.quoted_amount ?? "",
					message: quoteDrafts[selected.id] ?? "",
					onAmountChange: (value) => setAmountDrafts((prev) => ({
						...prev,
						[selected.id]: value
					})),
					onMessageChange: (value) => setQuoteDrafts((prev) => ({
						...prev,
						[selected.id]: value
					})),
					onStatusChange: (status) => void update(selected.id, {
						status,
						quoted_amount: amountDrafts[selected.id] ?? selected.quoted_amount ?? null
					}),
					onMarkQuoted: () => void update(selected.id, {
						status: "quoted",
						quoted_amount: amountDrafts[selected.id] ?? selected.quoted_amount ?? null
					}),
					onSend: () => void sendQuote(selected)
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "grid place-items-center p-8 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "mx-auto h-10 w-10 text-muted-foreground/40" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-semibold text-forest",
							children: "Select a request"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Choose a client from the inbox to prepare their quote."
						})
					] })
				})]
			})
		]
	});
}
function Metric({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-card p-4 shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `mb-3 h-1 w-10 rounded-full ${tone === "gold" ? "bg-gold" : tone === "forest" ? "bg-forest" : "bg-muted-foreground/40"}` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-3xl font-semibold text-forest",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: label
			})
		]
	});
}
function RequestListItem({ request, selected, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick: onSelect,
		className: `w-full border-l-2 p-4 text-left transition hover:bg-muted/60 ${selected ? "border-l-gold bg-gold/10" : "border-l-transparent"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate font-semibold text-forest",
					children: request.full_name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 truncate text-xs text-muted-foreground",
					children: request.tours?.name ?? "Tour request"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: request.status })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex items-center justify-between gap-2 text-[11px] text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: request.phone }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: format(new Date(request.created_at), "PP") })]
		})]
	});
}
function StatusBadge({ status }) {
	const styles = {
		new: "bg-gold/20 text-gold-foreground",
		quoted: "bg-forest/10 text-forest",
		sent: "bg-emerald-100 text-emerald-800",
		archived: "bg-muted text-muted-foreground"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${styles[status] ?? styles.archived}`,
		children: status
	});
}
function QuoteWorkspace({ request, amount, message, onAmountChange, onMessageChange, onStatusChange, onMarkQuoted, onSend }) {
	const travelDates = request.travel_start ? `${format(new Date(request.travel_start), "PP")}${request.travel_end ? ` → ${format(new Date(request.travel_end), "PP")}` : ""}` : "Flexible dates";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "overflow-hidden p-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-b border-border bg-forest px-5 py-5 text-cream sm:px-7",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-[0.18em] text-cream/60",
						children: "Selected request"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-3xl font-bold",
						children: request.full_name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-cream/70",
						children: request.tours?.name ?? "Tour request"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: request.status,
					onChange: (e) => onStatusChange(e.target.value),
					className: "rounded-md border border-cream/20 bg-cream/10 px-3 py-2 text-xs capitalize text-cream",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							className: "text-foreground",
							value: "new",
							children: "new"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							className: "text-foreground",
							value: "quoted",
							children: "quoted"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							className: "text-foreground",
							value: "sent",
							children: "sent"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							className: "text-foreground",
							value: "archived",
							children: "archived"
						})
					]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 p-5 sm:p-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {}),
							label: "Email",
							value: request.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {}),
							label: "WhatsApp",
							value: request.phone
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
							label: "Travellers",
							value: `${request.adults} adults${request.children ? `, ${request.children} children` : ""}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}),
							label: "Travel dates",
							value: travelDates
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-lg border border-border bg-muted/35 p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
							children: "Client brief"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-sm",
							children: request.special_requests || "No special requests provided."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-right text-xs text-muted-foreground",
							children: request.budget_range ? `Budget ${request.budget_range}` : "No budget"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-[220px_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground",
							children: "Quotation amount"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute left-3 top-2.5 text-sm font-semibold text-muted-foreground",
								children: "$"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: amount,
								onChange: (e) => onAmountChange(e.target.value),
								placeholder: "2,500",
								className: "pl-8 text-lg font-semibold"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: "This will be sent in USD."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground",
						children: "Message to client"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 8,
						value: message,
						onChange: (e) => onMessageChange(e.target.value),
						placeholder: "Leave blank to use the standard quote message."
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col-reverse justify-between gap-3 border-t border-border pt-4 sm:flex-row sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground",
						children: ["Request received ", format(new Date(request.created_at), "PPp")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							onClick: onMarkQuoted,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-1.5 h-4 w-4" }), " Save quote"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "bg-[#25D366] text-white hover:brightness-95",
							onClick: onSend,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "mr-1.5 h-4 w-4" }), " Send via WhatsApp"]
						})]
					})]
				})
			]
		})]
	});
}
function Info({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 gap-3 rounded-lg border border-border p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-0.5 text-gold [&>svg]:h-4 [&>svg]:w-4",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 truncate text-sm font-medium",
				children: value
			})]
		})]
	});
}
//#endregion
export { AdminQuotations as component };
