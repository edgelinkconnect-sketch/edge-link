import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DoLBO0al.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-CiSvnN9i.mjs";
import { C as Plus, P as MessageSquare, W as LoaderCircle, y as Search } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as useAuth } from "./router-s5e8-avL.mjs";
import { t as Card } from "./card-BYsnRyjM.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { r as formatDistanceToNow } from "../_libs/date-fns.mjs";
import { t as ChatThread } from "./chat-thread-DqV55CXE.mjs";
import { t as DashboardShell } from "./dashboard-shell--xLCWXxd.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-CwLzEEob.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.chat-BkPVJyt8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = [
	{
		label: "Booking",
		value: "booking"
	},
	{
		label: "Itinerary",
		value: "itinerary"
	},
	{
		label: "Payment",
		value: "payment"
	},
	{
		label: "General",
		value: "general"
	}
];
function normalizeChatCategory(value) {
	return CATEGORIES.some((category) => category.value === value) ? value : "general";
}
function ClientChat() {
	const { user } = useAuth();
	const qc = useQueryClient();
	const [activeId, setActiveId] = (0, import_react.useState)(null);
	const [newOpen, setNewOpen] = (0, import_react.useState)(false);
	const [subject, setSubject] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("general");
	const [search, setSearch] = (0, import_react.useState)("");
	const { data: chats, isLoading, error: chatsError, refetch: refetchChats } = useQuery({
		queryKey: ["chats", user?.id],
		refetchOnWindowFocus: true,
		queryFn: async () => {
			const { data, error } = await supabase.from("chats").select("id, subject, category, status, last_message_at").eq("client_id", user.id).order("last_message_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		},
		enabled: !!user
	});
	(0, import_react.useEffect)(() => {
		if (chatsError instanceof Error) toast.error(`Could not load conversations: ${chatsError.message}`);
	}, [chatsError]);
	const create = useMutation({
		mutationFn: async () => {
			const { data, error } = await supabase.from("chats").insert({
				client_id: user.id,
				subject: subject.trim() || "New conversation",
				category: normalizeChatCategory(category)
			}).select("id").single();
			if (error) throw error;
			return data.id;
		},
		onSuccess: (id) => {
			setNewOpen(false);
			setSubject("");
			setActiveId(id);
			qc.invalidateQueries({ queryKey: ["chats"] });
			toast.success("Conversation started");
		},
		onError: (e) => toast.error(e.message)
	});
	const filtered = (chats ?? []).filter((c) => `${c.subject ?? ""} ${c.category}`.toLowerCase().includes(search.toLowerCase()));
	const active = filtered.find((c) => c.id === activeId) ?? filtered[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardShell, {
		title: "Support chat",
		description: "A direct line to your dedicated EDGELINK travel team.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "sm",
			onClick: () => setNewOpen(true),
			className: "bg-gold text-gold-foreground hover:brightness-95",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-4 w-4" }), " New conversation"]
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 lg:grid-cols-[19rem_minmax(0,1fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "dashboard-surface flex h-[min(72vh,48rem)] min-h-[34rem] flex-col overflow-hidden p-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative border-b border-border p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-6 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: "Search conversations",
						className: "h-9 pl-8 text-sm",
						"aria-label": "Search conversations"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-1 overflow-y-auto p-2",
					children: [
						isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mx-auto my-6 h-5 w-5 animate-spin text-muted-foreground" }),
						!isLoading && chatsError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "m-3 rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "mx-auto h-5 w-5 text-destructive" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm font-semibold text-destructive",
									children: "Chat could not be loaded"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 break-words text-xs text-muted-foreground",
									children: chatsError.message
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									className: "mt-3",
									onClick: () => void refetchChats(),
									children: "Try again"
								})
							]
						}),
						!isLoading && !chatsError && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "mx-auto h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "No conversations yet."
							})]
						}),
						filtered.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => setActiveId(c.id),
							className: cn("h-auto w-full justify-start rounded-md border border-transparent p-3 text-left transition hover:bg-muted", active?.id === c.id && "border-gold/40 bg-muted"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate font-semibold text-forest",
										children: c.subject
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide", c.status === "resolved" ? "bg-muted text-muted-foreground" : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"),
										children: c.status
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-0.5 truncate text-xs text-muted-foreground",
									children: [
										c.category,
										" ·",
										" ",
										formatDistanceToNow(new Date(c.last_message_at), { addSuffix: true })
									]
								})]
							})
						}, c.id))
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "dashboard-surface min-h-[34rem] overflow-hidden p-0",
				children: active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-border bg-muted/40 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-lg font-semibold text-forest",
						children: active.subject
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: active.category
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatThread, {
					chatId: active.id,
					role: "client"
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center p-16 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-full bg-forest/10 p-4 text-forest",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-6 w-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 font-semibold text-forest",
							children: "Start a conversation"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 max-w-xs text-sm text-muted-foreground",
							children: "Ask about availability, permits, or a fully bespoke itinerary — we reply fast."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => setNewOpen(true),
							className: "mt-5 bg-gold text-gold-foreground hover:brightness-95",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-4 w-4" }), " New conversation"]
						})
					]
				})
			})]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: newOpen,
			onOpenChange: setNewOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "New conversation" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Subject" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: subject,
							onChange: (e) => setSubject(e.target.value),
							placeholder: "Question about my gorilla trek"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								onClick: () => setCategory(c.value),
								className: cn("rounded-md border px-3 py-1.5 text-xs transition", category === c.value ? "border-forest bg-forest text-cream" : "border-border hover:border-gold"),
								children: c.label
							}, c.value))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => create.mutate(),
						disabled: create.isPending,
						className: "w-full bg-gold text-gold-foreground",
						children: [create.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), " Start chat"]
					})
				]
			})] })
		})]
	});
}
//#endregion
export { ClientChat as component };
