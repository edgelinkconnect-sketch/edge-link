import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DoLBO0al.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Button } from "./button-CiSvnN9i.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { A as Mountain, Dt as ArrowLeft, F as MessageCircle, W as LoaderCircle, dt as Clock, mt as CircleCheck, r as Users, t as X, u as Sun, vt as Check, z as MapPin } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as useAuth, c as AppShell, n as Route$13 } from "./router-s5e8-avL.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { n as whatsappUrl, t as WHATSAPP_NUMBER } from "./whatsapp-DocSP22n.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CwLzEEob.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
import { n as useMediaUrls } from "./media-C-t6IOdB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tours._slug-LMb_Dg-U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QuoteRequestDialog({ open, onOpenChange, tourSlug, tourName, duration }) {
	const { user } = useAuth();
	const [form, setForm] = (0, import_react.useState)({
		full_name: "",
		email: "",
		phone: "",
		adults: 2,
		children: 0,
		travel_start: "",
		travel_end: "",
		special_requests: "",
		budget_range: ""
	});
	const [done, setDone] = (0, import_react.useState)(null);
	const { data: profile } = useQuery({
		queryKey: ["quote-profile", user?.id],
		queryFn: async () => {
			const { data } = await supabase.from("profiles").select("full_name, phone").eq("id", user.id).maybeSingle();
			return data;
		},
		enabled: !!user && open
	});
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setDone(null);
		setForm((f) => ({
			...f,
			full_name: f.full_name || profile?.full_name || "",
			email: f.email || user?.email || "",
			phone: f.phone || profile?.phone || ""
		}));
	}, [
		open,
		profile,
		user
	]);
	const submit = useMutation({
		mutationFn: async () => {
			const { data: tour, error: tourError } = await supabase.from("tours").select("id, name").eq("slug", tourSlug).maybeSingle();
			if (tourError) throw tourError;
			if (!tour) throw new Error("This itinerary is not currently available for quotation.");
			const payload = {
				tour_id: tour.id,
				client_id: user?.id ?? null,
				full_name: form.full_name.trim(),
				email: form.email.trim(),
				phone: form.phone.trim(),
				adults: Number(form.adults) || 1,
				children: Number(form.children) || 0,
				travel_start: form.travel_start || null,
				travel_end: form.travel_end || null,
				special_requests: form.special_requests || null,
				budget_range: form.budget_range || null,
				status: "new"
			};
			const { data, error } = await supabase.from("tour_quote_requests").insert(payload).select("id, phone").single();
			if (error) throw error;
			return data;
		},
		onSuccess: (request) => {
			const msg = [
				`Hello EDGELINK Tours, I would like a quotation for ${tourName}.`,
				"",
				`Client: ${form.full_name}`,
				`Email: ${form.email}`,
				`Phone: ${form.phone}`,
				`Travel dates: ${form.travel_start || "Flexible"}${form.travel_end ? ` → ${form.travel_end}` : ""}`,
				`Guests: ${form.adults} adults${form.children ? `, ${form.children} children` : ""}`,
				form.budget_range ? `Budget: ${form.budget_range}` : "",
				form.special_requests ? `Notes: ${form.special_requests}` : ""
			].filter(Boolean).join("\n");
			const adminWaUrl = whatsappUrl(msg, WHATSAPP_NUMBER);
			setDone({
				id: request.id,
				waUrl: adminWaUrl
			});
			window.open(adminWaUrl, "_blank", "noopener");
			toast.success("Quotation request sent to the admin on WhatsApp");
		},
		onError: (e) => toast.error(e.message)
	});
	const set = (k) => (e) => setForm({
		...form,
		[k]: e.target.value
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "max-h-[92vh] max-w-2xl overflow-y-auto",
			children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto h-12 w-12 text-gold" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-4 font-display text-2xl font-bold text-forest",
						children: "Quote request received"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-2 max-w-sm text-sm text-muted-foreground",
						children: "We have captured your request and your travel specialist can now send a quote by WhatsApp."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex justify-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "bg-[#25D366] text-white hover:brightness-95",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: done.waUrl,
								target: "_blank",
								rel: "noopener noreferrer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "mr-1.5 h-4 w-4" }), " Open WhatsApp"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => onOpenChange(false),
							children: "Close"
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
				className: "font-display text-2xl",
				children: ["Ask for quote · ", tourName]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [duration, " · share your travel dates and preferences. We will prepare a tailored quote and send it directly to your WhatsApp number."] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-2 space-y-4",
				onSubmit: (e) => {
					e.preventDefault();
					submit.mutate();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Full name",
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.full_name,
									onChange: set("full_name"),
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Email",
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "email",
									value: form.email,
									onChange: set("email"),
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Phone (WhatsApp)",
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.phone,
									onChange: set("phone"),
									required: true,
									placeholder: "+250 ..."
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Budget range",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.budget_range,
									onChange: set("budget_range"),
									placeholder: "e.g. $2,500 - $4,000"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Adults",
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 1,
									max: 20,
									value: form.adults,
									onChange: set("adults"),
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Children",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 0,
									max: 20,
									value: form.children,
									onChange: set("children")
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Travel start",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									value: form.travel_start,
									onChange: set("travel_start")
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Travel end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									value: form.travel_end,
									onChange: set("travel_end")
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Special requests",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 3,
							value: form.special_requests,
							onChange: set("special_requests"),
							placeholder: "Preferred lodge, honeymoon plan, mobility needs, etc."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						disabled: submit.isPending,
						className: "w-full bg-gold text-gold-foreground hover:brightness-95",
						children: [submit.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Request quote"]
					})
				]
			})] })
		})
	});
}
function Field({ label, required, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
			className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
			children: [
				label,
				" ",
				required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-gold",
					children: "*"
				})
			]
		}), children]
	});
}
function lines(value) {
	return (value ?? "").split("\n").map((l) => l.replace(/^[-•*]\s*/, "").trim()).filter(Boolean);
}
function TourDetail() {
	const { slug } = Route$13.useParams();
	const { i18n } = useTranslation();
	const [quoteOpen, setQuoteOpen] = (0, import_react.useState)(false);
	const { data: tour, isLoading } = useQuery({
		queryKey: ["tour", slug],
		queryFn: async () => {
			const { data, error } = await supabase.from("tours").select("*").eq("slug", slug).eq("status", "active").maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	const { data: shots } = useQuery({
		queryKey: [
			"tour-gallery",
			tour?.region,
			tour?.location
		],
		enabled: !!tour,
		queryFn: async () => {
			const region = tour.region || tour.location;
			const { data, error } = await supabase.from("gallery").select("id, image_url, title, location").eq("location", region).limit(8);
			if (error) throw error;
			return data ?? [];
		}
	});
	const heroMedia = useMediaUrls("tours", [tour?.featured_image_url, ...tour?.gallery_image_urls ?? []]);
	const shotMedia = useMediaUrls("gallery", (shots ?? []).map((s) => s.image_url));
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-4 px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-72 w-full rounded-2xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-2/3" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40 w-full" })
		]
	}) });
	if (!tour) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-bold text-forest",
				children: "Tour not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "This itinerary may have been retired or renamed."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-6 bg-forest text-primary-foreground hover:bg-forest-deep",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/tours",
					children: "Browse all tours"
				})
			})
		]
	}) });
	const languageCode = i18n.language.split("-")[0];
	const localizedTour = {
		...tour,
		...tour.translations?.[languageCode] ?? {}
	};
	const included = lines(localizedTour.included_services);
	const excluded = lines(localizedTour.excluded_services);
	const days = lines(localizedTour.itinerary);
	const heroUrl = heroMedia(tour.featured_image_url);
	const tourImages = (tour.gallery_image_urls ?? []).filter((image) => image !== tour.featured_image_url);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden bg-forest-deep text-primary-foreground",
			children: [heroUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: heroUrl,
				alt: localizedTour.name,
				className: "absolute inset-0 h-full w-full object-cover opacity-40"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/tours",
						className: "inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " All tours"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 max-w-3xl font-display text-4xl font-bold md:text-5xl",
						children: localizedTour.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-4 text-sm text-primary-foreground/85",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-gold" }), localizedTour.region || localizedTour.location]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-gold" }), localizedTour.duration]
							}),
							localizedTour.difficulty && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mountain, { className: "h-4 w-4 text-gold" }), localizedTour.difficulty]
							}),
							tour.max_group_size && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4 text-gold" }),
									"Max ",
									tour.max_group_size
								]
							}),
							localizedTour.best_time && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4 text-gold" }), localizedTour.best_time]
							})
						]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 lg:grid-cols-[1fr_320px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-bold text-forest",
						children: "Overview"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 whitespace-pre-line leading-relaxed text-muted-foreground",
						children: localizedTour.description
					})] }),
					tourImages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-bold text-forest",
						children: "Journey gallery"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-2",
						children: tourImages.map((image, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: heroMedia(image),
							alt: `${tour.name} image ${index + 2}`,
							className: "aspect-[4/3] w-full rounded-xl object-cover"
						}, image))
					})] }),
					(localizedTour.highlights?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-bold text-forest",
						children: "Highlights"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 grid gap-2 sm:grid-cols-2",
						children: localizedTour.highlights.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2 rounded-lg border border-border bg-card p-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-gold" }), h]
						}, h))
					})] }),
					days.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-bold text-forest",
						children: "Itinerary"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-3 space-y-2",
						children: days.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-lg border border-border bg-card p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[10px] font-bold uppercase tracking-[0.2em] text-gold",
								children: ["Day ", i + 1]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 text-sm",
								children: d
							})]
						}, i))
					})] }),
					(included.length > 0 || excluded.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6 md:grid-cols-2",
						children: [included.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-2 font-display text-lg font-bold text-forest",
							children: "Included"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-1.5 text-sm",
							children: included.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-gold" }), x]
							}, x))
						})] }), excluded.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-2 font-display text-lg font-bold text-forest",
							children: "Not included"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-1.5 text-sm text-muted-foreground",
							children: excluded.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "mt-0.5 h-4 w-4 shrink-0" }), x]
							}, x))
						})] })]
					}),
					(shots?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-2xl font-bold text-forest",
						children: ["From ", tour.region || tour.location]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid grid-cols-2 gap-3 md:grid-cols-4",
						children: shots.map((s) => {
							const url = shotMedia(s.image_url);
							return url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: url,
								alt: s.title,
								loading: "lazy",
								className: "aspect-square w-full rounded-xl object-cover"
							}, s.id) : null;
						})
					})] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "h-fit rounded-2xl border border-border bg-card p-6 shadow-sm lg:sticky lg:top-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-wider text-muted-foreground",
						children: "Custom planning"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-2xl font-bold text-forest",
						children: "Ask for quote"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: [
							"Share your travel dates and preferences and our team will prepare a tailored quote for ",
							tour.name,
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => setQuoteOpen(true),
						size: "lg",
						className: "mt-5 w-full bg-gold text-gold-foreground hover:brightness-95",
						children: "Ask for quote"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "mt-2 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							children: "Ask a question"
						})
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteRequestDialog, {
			open: quoteOpen,
			onOpenChange: setQuoteOpen,
			tourSlug: tour.slug ?? "",
			tourName: tour.name,
			duration: tour.duration
		})
	] });
}
//#endregion
export { TourDetail as component };
