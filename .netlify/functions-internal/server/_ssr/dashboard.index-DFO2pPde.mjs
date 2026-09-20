import { t as supabase } from "./client-DoLBO0al.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-CiSvnN9i.mjs";
import { Et as ArrowRight, P as MessageSquare, T as Plane, _ as Settings, bt as Camera, d as Star, i as User, xt as Calendar, z as MapPin } from "../_libs/lucide-react.mjs";
import { C as useAuth } from "./router-s5e8-avL.mjs";
import { t as Card } from "./card-BYsnRyjM.mjs";
import { t as StatusBadge } from "./status-badge-CYT7GKBW.mjs";
import { a as differenceInCalendarDays, i as format } from "../_libs/date-fns.mjs";
import { t as DashboardShell } from "./dashboard-shell--xLCWXxd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.index-DFO2pPde.js
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const { user } = useAuth();
	const { data: bookings, isLoading: loadingBookings } = useQuery({
		queryKey: ["my-bookings", user?.id],
		queryFn: async () => {
			const { data, error } = await supabase.from("bookings").select("id, booking_number, status, travel_start, adults, children, tours(name, location)").eq("client_id", user.id).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		},
		enabled: !!user
	});
	const { data: profile } = useQuery({
		queryKey: ["my-profile", user?.id],
		queryFn: async () => {
			const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
			return data;
		},
		enabled: !!user
	});
	const { data: experienceCount } = useQuery({
		queryKey: ["my-experience-count", user?.id],
		queryFn: async () => {
			const { count } = await supabase.from("experiences").select("id", {
				count: "exact",
				head: true
			}).eq("client_id", user.id);
			return count ?? 0;
		},
		enabled: !!user
	});
	const { data: openChats } = useQuery({
		queryKey: ["my-open-chats", user?.id],
		queryFn: async () => {
			const { count } = await supabase.from("chats").select("id", {
				count: "exact",
				head: true
			}).eq("client_id", user.id).eq("status", "active");
			return count ?? 0;
		},
		enabled: !!user
	});
	const upcoming = (bookings ?? []).filter((b) => b.travel_start && b.status !== "cancelled" && new Date(b.travel_start) >= /* @__PURE__ */ new Date()).sort((a, b) => a.travel_start < b.travel_start ? -1 : 1)[0];
	const daysToGo = upcoming?.travel_start ? differenceInCalendarDays(new Date(upcoming.travel_start), /* @__PURE__ */ new Date()) : null;
	const firstName = (profile?.full_name || user?.email || "").split(/[ @]/)[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardShell, {
		title: `Karibu, ${firstName}`,
		description: "Everything about your East African journey — bookings, conversations and memories — in one place.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			size: "sm",
			variant: "outline",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/tours",
				children: "Browse journeys"
			})
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden rounded-2xl gradient-forest p-6 text-cream",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 opacity-[0.07]",
				style: {
					backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
					backgroundSize: "26px 26px"
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex flex-wrap items-center gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-14 w-14 items-center justify-center rounded-xl bg-gold text-gold-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plane, { className: "h-6 w-6" })
				}), upcoming ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-[12rem] flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-widest text-cream/60",
							children: "Next departure"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-xl",
							children: upcoming.tours?.name ?? "Your tour"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-cream/70",
							children: [
								upcoming.tours?.location,
								" ·",
								" ",
								format(new Date(upcoming.travel_start), "PPP")
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-4xl text-gold",
						children: daysToGo
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-widest text-cream/60",
						children: "days to go"
					})]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-[12rem] flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-widest text-cream/60",
							children: "Next departure"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-xl",
							children: "Nothing on the calendar yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-cream/70",
							children: "Pick a journey and we'll count down the days with you."
						})
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "py-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Calendar,
						label: "Bookings",
						value: bookings?.length ?? 0,
						to: "/dashboard/bookings"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Star,
						label: "Experiences shared",
						value: experienceCount ?? 0,
						to: "/dashboard/experiences"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: MessageSquare,
						label: "Open chats",
						value: openChats ?? 0,
						to: "/dashboard/chat"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: User,
						label: "Member since",
						value: profile?.created_at ? format(new Date(profile.created_at), "MMM yyyy") : "—",
						to: "/dashboard/profile"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-6 lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-semibold text-forest",
							children: "Your bookings"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Latest first"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/tours",
								children: "Book another"
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 space-y-3",
						children: [
							loadingBookings && [0, 1].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-20 animate-pulse rounded-xl bg-muted" }, i)),
							!loadingBookings && (bookings?.length ?? 0) === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-dashed border-border p-10 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mx-auto h-6 w-6 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm font-semibold text-forest",
										children: "No bookings yet"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: "Your next adventure starts with a single itinerary."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "sm",
										className: "mt-4 bg-gold text-gold-foreground hover:brightness-95",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/tours",
											children: "Explore itineraries"
										})
									})
								]
							}),
							bookings?.slice(0, 5).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/dashboard/bookings",
								className: "group flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border p-4 transition hover:border-gold hover:shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-mono text-[11px] text-muted-foreground",
											children: b.booking_number
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "truncate font-semibold text-forest",
											children: b.tours?.name ?? "Tour"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs text-muted-foreground",
											children: [
												b.tours?.location,
												" · ",
												b.adults,
												" adults",
												b.children ? `, ${b.children} kids` : "",
												b.travel_start ? ` · ${format(new Date(b.travel_start), "PP")}` : ""
											]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: b.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-gold" })]
								})]
							}, b.id))
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-semibold text-forest",
							children: "Quick actions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
									to: "/dashboard/bookings",
									icon: Calendar,
									title: "All bookings",
									desc: "Track and manage trips"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
									to: "/dashboard/chat",
									icon: MessageSquare,
									title: "Support chat",
									desc: "Talk to your designer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
									to: "/dashboard/experiences",
									icon: Camera,
									title: "Share an experience",
									desc: "Photos and reviews"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
									to: "/dashboard/profile",
									icon: Settings,
									title: "Profile settings",
									desc: "Details and preferences"
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "gradient-forest p-6 text-cream",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg",
								children: "Need a hand?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-cream/70",
								children: "Our travel designers are on WhatsApp and live chat every day."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								className: "mt-4 w-full bg-gold text-gold-foreground hover:brightness-95",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/dashboard/chat",
									children: "Start a conversation"
								})
							})
						]
					})]
				})]
			})]
		})]
	});
}
function StatCard({ icon: Icon, label, value, to }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: "group block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: cn("p-5 transition hover:border-gold hover:shadow-md"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl bg-forest/10 p-3 text-forest transition group-hover:bg-gold/20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-wide text-muted-foreground",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-2xl font-semibold text-forest",
					children: value
				})] })]
			})
		})
	});
}
function QuickLink({ to, icon: Icon, title, desc }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "group flex items-center gap-3 rounded-xl border border-border px-3 py-2.5 transition hover:border-gold hover:bg-muted/50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-forest" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-medium text-forest",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] text-muted-foreground",
					children: desc
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-gold" })
		]
	});
}
//#endregion
export { Dashboard as component };
