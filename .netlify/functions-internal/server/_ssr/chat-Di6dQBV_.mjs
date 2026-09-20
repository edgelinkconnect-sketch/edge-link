import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DoLBO0al.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-CiSvnN9i.mjs";
import { P as MessageSquare, W as LoaderCircle, mt as CircleCheck, x as RotateCcw, y as Search } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Card } from "./card-BYsnRyjM.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { r as formatDistanceToNow } from "../_libs/date-fns.mjs";
import { t as ChatThread } from "./chat-thread-DqV55CXE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-Di6dQBV_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	"active",
	"resolved",
	"all"
];
function AdminChat() {
	const qc = useQueryClient();
	const [filter, setFilter] = (0, import_react.useState)("active");
	const [activeId, setActiveId] = (0, import_react.useState)(null);
	const [search, setSearch] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const channel = supabase.channel("admin-chat-inbox").on("postgres_changes", {
			event: "INSERT",
			schema: "public",
			table: "messages"
		}, () => {
			qc.invalidateQueries({ queryKey: ["chats", "admin"] });
		}).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [qc]);
	const { data: chats, isLoading, error: chatsError, refetch: refetchChats } = useQuery({
		queryKey: [
			"chats",
			"admin",
			filter
		],
		refetchOnWindowFocus: true,
		queryFn: async () => {
			let q = supabase.from("chats").select("id, subject, category, status, last_message_at, client_id").order("last_message_at", { ascending: false });
			if (filter !== "all") q = q.eq("status", filter);
			const { data, error } = await q;
			if (error) throw error;
			return data ?? [];
		},
		refetchInterval: 15e3
	});
	(0, import_react.useEffect)(() => {
		if (chatsError instanceof Error) toast.error(`Could not load inbox: ${chatsError.message}`);
	}, [chatsError]);
	const { data: unread } = useQuery({
		queryKey: [
			"chats",
			"admin",
			"unread"
		],
		queryFn: async () => {
			const { data, error } = await supabase.from("messages").select("chat_id").eq("sender_role", "client").eq("read_status", false);
			if (error) throw error;
			const map = {};
			for (const m of data ?? []) map[m.chat_id] = (map[m.chat_id] ?? 0) + 1;
			return map;
		},
		refetchInterval: 15e3
	});
	const filtered = (chats ?? []).filter((c) => `${c.subject ?? ""} ${c.category}`.toLowerCase().includes(search.toLowerCase()));
	const active = filtered.find((c) => c.id === activeId) ?? filtered[0];
	const setStatus = async (id, status) => {
		const { error } = await supabase.from("chats").update({ status }).eq("id", id);
		if (error) return toast.error(error.message);
		toast.success(`Conversation ${status}`);
		qc.invalidateQueries({ queryKey: ["chats"] });
	};
	const totalUnread = Object.values(unread ?? {}).reduce((a, b) => a + b, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground",
					children: "Communication desk"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "truncate font-display text-4xl font-normal text-forest",
					children: "Support inbox"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: totalUnread > 0 ? `${totalUnread} unread traveller message${totalUnread > 1 ? "s" : ""}` : "All caught up"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-2",
			children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => setFilter(f),
				className: cn("rounded-md border px-3 py-1.5 text-xs capitalize transition", filter === f ? "border-forest bg-forest text-cream" : "border-border bg-background hover:border-gold"),
				children: f
			}, f))
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-5 grid gap-3 lg:grid-cols-[21rem_minmax(0,1fr)]",
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
								children: "Chat inbox could not be loaded"
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
					!isLoading && !chatsError && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "p-6 text-center text-sm text-muted-foreground",
						children: "No conversations."
					}),
					filtered.map((c) => {
						const count = unread?.[c.id] ?? 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => setActiveId(c.id),
							className: cn("h-auto w-full justify-start rounded-md border border-transparent p-3 text-left transition hover:bg-muted", active?.id === c.id && "border-gold/40 bg-muted"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate font-semibold text-forest",
										children: c.subject ?? "Conversation"
									}), count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "shrink-0 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-gold-foreground",
										children: count
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
						}, c.id);
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "dashboard-surface min-h-[34rem] overflow-hidden p-0",
			children: active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/40 p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-lg font-semibold text-forest",
					children: active.subject ?? "Conversation"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-muted-foreground",
					children: [
						active.category,
						" · status ",
						active.status
					]
				})] }), active.status === "resolved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => void setStatus(active.id, "active"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "mr-1.5 h-4 w-4" }), " Reopen"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => void setStatus(active.id, "resolved"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mr-1.5 h-4 w-4" }), " Mark resolved"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatThread, {
				chatId: active.id,
				role: "admin"
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center p-16 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-6 w-6 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: "Select a conversation."
				})]
			})
		})]
	})] });
}
//#endregion
export { AdminChat as component };
