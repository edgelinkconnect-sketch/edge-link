import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DoLBO0al.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Button } from "./button-CiSvnN9i.mjs";
import { F as MessageCircle, G as Link2, Z as Heart, dt as Clock, i as User, o as Twitter, rt as Facebook, v as Send, xt as Calendar } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as useAuth, c as AppShell, r as IMAGES } from "./router-s5e8-avL.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as useMediaUrls } from "./media-C-t6IOdB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journal-BZBHRzHC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = [
	"All",
	"Gorilla Trekking",
	"Rwanda Travel Tips",
	"Conservation News",
	"Lodge Reviews",
	"Culture & Food"
];
var POSTS = [
	{
		slug: "gorilla-trekking-101",
		title: "Gorilla Trekking 101: What to Expect",
		excerpt: "From the pre-dawn briefing at park headquarters to your intimate hour with a silverback — a first-timer's step-by-step guide.",
		category: "Gorilla Trekking",
		author: "Jean-Pierre Niyonzima",
		date: "March 12, 2026",
		readTime: "8 min",
		image: IMAGES.gorilla,
		body: "Your gorilla trek begins the night before, with a light dinner and an early bed at your lodge. At 5:30am, you're driven to Kinigi park headquarters, where guides assess fitness levels and assign families. Trekking distances vary from 30 minutes to six hours — porters carry your pack for $20. When you reach the family, you'll spend exactly one transformative hour observing them at 7m distance. Photos without flash. Then the descent, a hot lunch at your lodge, and time to process what you've just experienced."
	},
	{
		slug: "best-time-to-visit",
		title: "Best Time to Visit Rwanda's National Parks",
		excerpt: "Two dry seasons, two green seasons — how to pick the perfect month for your Rwandan safari.",
		category: "Rwanda Travel Tips",
		author: "Grace Uwimana",
		date: "February 28, 2026",
		readTime: "6 min",
		image: IMAGES.nyungwe,
		body: "Rwanda's equatorial climate means year-round trekking is possible, but the two dry seasons — June to September and December to February — offer the driest trails and clearest views. March to May brings the long rains: fewer travellers, greener landscapes, and lower permit demand. October and November are transitional and lovely for photography."
	},
	{
		slug: "singita-kwitonda-review",
		title: "Inside Singita Kwitonda: A Luxury Lodge Review",
		excerpt: "Eight private suites, a spa carved from volcanic rock, and views of five volcanoes. Our head of guest relations spends 48 hours at Rwanda's newest icon.",
		category: "Lodge Reviews",
		author: "Claire Mukamana",
		date: "February 10, 2026",
		readTime: "10 min",
		image: IMAGES.cruiser,
		body: "Kwitonda sits at 2,300m on the border of Volcanoes National Park. Rammed-earth walls, brass finishes, and a fireplace in every suite. The food — foraged, seasonal, Rwandan-modern — rivals anything in East Africa. Rates from $3,300 per person per night. Worth every dollar for a lifetime memory."
	},
	{
		slug: "nyungwe-canopy-walk",
		title: "Nyungwe Canopy Walk: A Bird's Eye View",
		excerpt: "The 200-metre suspended bridge, 70m above the rainforest floor, is Africa's only canopy walkway. Here's what you'll see.",
		category: "Rwanda Travel Tips",
		author: "Emmanuel Habimana",
		date: "January 22, 2026",
		readTime: "5 min",
		image: IMAGES.nyungwe,
		body: "The walk takes 90 minutes, with an easy forest hike either side. From the platform, you'll spot Great Blue Turacos, L'Hoest's monkeys, and — if you're lucky — a chimpanzee troop moving below. Sunrise walks require pre-booking. Not recommended for anyone with severe acrophobia."
	},
	{
		slug: "gorilla-conservation-success",
		title: "Conservation Success: Rwanda's Gorilla Population Growth",
		excerpt: "From 254 individuals in 1981 to over 1,000 today. Inside the Rwandan model that turned poaching into protection.",
		category: "Conservation News",
		author: "Dr. James Wilson",
		date: "January 5, 2026",
		readTime: "12 min",
		image: IMAGES.gorilla,
		body: "The Virunga population's recovery is one of conservation's great modern successes. Ranger patrols, community revenue sharing (10% of park fees), veterinary interventions, and disciplined tourism have combined to double the population in three decades. Rwanda's gorillas are the only great apes whose numbers are still growing."
	}
];
function Journal() {
	const { user } = useAuth();
	const qc = useQueryClient();
	const [category, setCategory] = (0, import_react.useState)("All");
	const [openSlug, setOpenSlug] = (0, import_react.useState)(null);
	const [commentDraft, setCommentDraft] = (0, import_react.useState)("");
	const [replyTo, setReplyTo] = (0, import_react.useState)(null);
	const [replyDraft, setReplyDraft] = (0, import_react.useState)("");
	const { data: managedPosts, isLoading } = useQuery({
		queryKey: ["public-journal"],
		queryFn: async () => {
			const { data } = await supabase.from("journal_posts").select("*").eq("published", true).order("created_at", { ascending: false });
			return (data ?? []).map((post) => ({
				id: post.id,
				slug: post.slug,
				title: post.title,
				excerpt: post.excerpt,
				category: post.category,
				author: post.author,
				date: new Date(post.created_at).toLocaleDateString("en-US", {
					month: "long",
					day: "numeric",
					year: "numeric"
				}),
				readTime: post.read_time,
				image: post.image_url || IMAGES.gorilla,
				image_urls: post.image_urls ?? [],
				body: post.body
			}));
		}
	});
	const media = useMediaUrls("gallery", (managedPosts ?? []).flatMap((post) => [post.image_url, ...post.image_urls ?? []]));
	const displayPosts = (isLoading ? [] : [...managedPosts ?? [], ...POSTS.filter((post) => !(managedPosts ?? []).some((managed) => managed.slug === post.slug))]).map((post) => ({
		...post,
		image: media(post.image) || post.image,
		image_urls: "image_urls" in post ? post.image_urls.map((image) => media(image) || image) : []
	}));
	const posts = category === "All" ? displayPosts : displayPosts.filter((p) => p.category === category);
	const open = displayPosts.find((p) => p.slug === openSlug);
	const managedPostId = open && "id" in open ? open.id : null;
	const { data: likes } = useQuery({
		queryKey: ["journal-likes", managedPostId],
		enabled: !!managedPostId,
		queryFn: async () => {
			const { data, error } = await supabase.from("journal_likes").select("id, user_id").eq("post_id", managedPostId);
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: comments } = useQuery({
		queryKey: ["journal-comments", managedPostId],
		enabled: !!managedPostId,
		queryFn: async () => {
			const { data, error } = await supabase.from("journal_comments").select("id, user_id, parent_id, body, created_at").eq("post_id", managedPostId).order("created_at", { ascending: true });
			if (error) throw error;
			return data ?? [];
		}
	});
	const toggleLike = async () => {
		if (!managedPostId) return;
		if (!user) return toast.error("Sign in to like this story.");
		const existing = likes?.find((like) => like.user_id === user.id);
		const result = existing ? await supabase.from("journal_likes").delete().eq("id", existing.id) : await supabase.from("journal_likes").insert({
			post_id: managedPostId,
			user_id: user.id
		});
		if (result.error) return toast.error(result.error.message);
		qc.invalidateQueries({ queryKey: ["journal-likes", managedPostId] });
	};
	const submitComment = async (event, parentId = null) => {
		event.preventDefault();
		if (!managedPostId) return;
		if (!user) return toast.error("Sign in to leave a comment.");
		const body = (parentId ? replyDraft : commentDraft).trim();
		if (!body) return;
		const { error } = await supabase.from("journal_comments").insert({
			post_id: managedPostId,
			user_id: user.id,
			body,
			parent_id: parentId
		});
		if (error) return toast.error(error.message);
		if (parentId) {
			setReplyDraft("");
			setReplyTo(null);
		} else setCommentDraft("");
		qc.invalidateQueries({ queryKey: ["journal-comments", managedPostId] });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-border bg-forest-deep py-16 text-primary-foreground md:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold",
					children: "The Journal"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl font-bold md:text-5xl",
					children: "Stories from the field"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-primary-foreground/80",
					children: "Guides, reviews, and conservation notes from our team on the ground."
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-4 py-10 md:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-8 flex flex-wrap gap-2",
			children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setCategory(c),
				className: `rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${category === c ? "border-forest bg-forest text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-forest"}`,
				children: c
			}, c))
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
			children: [
				0,
				1,
				2
			].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-80 animate-pulse rounded-2xl bg-muted" }, item))
		}) : open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "mx-auto max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: () => setOpenSlug(null),
					className: "mb-4",
					children: "← Back to journal"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] font-semibold uppercase tracking-[0.25em] text-gold",
					children: open.category
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-3xl font-bold md:text-4xl",
					children: open.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3 w-3" }), open.author]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }), open.date]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }),
								open.readTime,
								" read"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: open.image,
					alt: open.title,
					className: "mt-6 aspect-[16/9] w-full rounded-2xl object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-lg font-medium leading-relaxed text-foreground/90",
					children: open.excerpt
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 text-base leading-relaxed text-muted-foreground",
					children: open.body.split(/\n\s*\n/).map((paragraph, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whitespace-pre-line",
						children: paragraph
					}), open.image_urls?.[index] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: open.image_urls[index],
						alt: `${open.title} — image ${index + 2}`,
						loading: "lazy",
						className: "my-7 aspect-[16/9] w-full rounded-xl object-cover"
					})] }, `${open.slug}-paragraph-${index}`))
				}),
				managedPostId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-end justify-between gap-3 border-b border-border pb-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] font-bold uppercase tracking-[0.2em] text-gold",
								children: "Join the conversation"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 font-display text-2xl font-bold text-forest",
								children: "Thoughts from travellers"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }),
									" ",
									comments?.length ?? 0,
									" comments"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex items-center justify-between rounded-xl bg-forest p-4 text-cream",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-semibold",
								children: likes?.length ?? 0
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-cream/65",
								children: "people liked this story"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								onClick: () => void toggleLike(),
								variant: "outline",
								className: likes?.some((like) => like.user_id === user?.id) ? "border-gold bg-gold text-gold-foreground" : "border-cream/30 bg-cream/10 text-cream hover:bg-cream/20",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `mr-1.5 h-4 w-4 ${likes?.some((like) => like.user_id === user?.id) ? "fill-current" : ""}` }),
									" ",
									likes?.some((like) => like.user_id === user?.id) ? "Liked" : "Like story"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: (event) => void submitComment(event),
							className: "mt-5 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: commentDraft,
								onChange: (event) => setCommentDraft(event.target.value),
								placeholder: user ? "Add a thoughtful comment..." : "Sign in to comment",
								disabled: !user,
								className: "h-11"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								disabled: !user || !commentDraft.trim(),
								className: "h-11 bg-gold text-gold-foreground hover:brightness-95",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "mr-1.5 h-4 w-4" }), " Post"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 space-y-4",
							children: (comments ?? []).filter((comment) => !comment.parent_id).map((comment) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid h-8 w-8 place-items-center rounded-full bg-gold/20 text-xs font-bold text-forest",
												children: "T"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm font-semibold text-forest",
												children: "Traveller"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[11px] text-muted-foreground",
												children: new Date(comment.created_at).toLocaleDateString()
											})] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												setReplyTo(replyTo === comment.id ? null : comment.id);
												setReplyDraft("");
											},
											className: "inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-forest",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-3.5 w-3.5" }), " Reply"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm leading-relaxed text-foreground/80",
										children: comment.body
									}),
									(comments ?? []).filter((reply) => reply.parent_id === comment.id).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4 space-y-3 border-l-2 border-gold/30 pl-4",
										children: (comments ?? []).filter((reply) => reply.parent_id === comment.id).map((reply) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs font-semibold text-forest",
											children: ["Traveller ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-normal text-muted-foreground",
												children: ["· ", new Date(reply.created_at).toLocaleDateString()]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm text-foreground/75",
											children: reply.body
										})] }, reply.id))
									}),
									replyTo === comment.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: (event) => void submitComment(event, comment.id),
										className: "mt-4 flex gap-2 border-t border-border pt-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											autoFocus: true,
											value: replyDraft,
											onChange: (event) => setReplyDraft(event.target.value),
											placeholder: user ? "Write a reply..." : "Sign in to reply",
											disabled: !user
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											size: "icon",
											disabled: !user || !replyDraft.trim(),
											"aria-label": "Send reply",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
										})]
									})
								]
							}, comment.id))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex items-center gap-3 border-t border-border pt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Share:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(open.title)}`,
							target: "_blank",
							rel: "noreferrer",
							className: "grid h-9 w-9 place-items-center rounded-full border border-border hover:border-gold hover:text-gold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Twitter, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`,
							target: "_blank",
							rel: "noreferrer",
							className: "grid h-9 w-9 place-items-center rounded-full border border-border hover:border-gold hover:text-gold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => navigator.clipboard?.writeText(window.location.href),
							className: "grid h-9 w-9 place-items-center rounded-full border border-border hover:border-gold hover:text-gold",
							"aria-label": "Copy link",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "h-4 w-4" })
						})
					]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
			children: posts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-luxe",
				onClick: () => setOpenSlug(p.slug),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-[16/10] overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p.image,
						alt: p.title,
						loading: "lazy",
						className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-foreground",
						children: p.category
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-bold leading-tight group-hover:text-forest",
							children: p.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 line-clamp-2 text-sm text-muted-foreground",
							children: p.excerpt
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-3 text-[11px] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3 w-3" }), p.author.split(" ")[0]]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }), p.date]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), p.readTime]
								})
							]
						})
					]
				})]
			}, p.slug))
		})]
	})] });
}
//#endregion
export { Journal as component };
