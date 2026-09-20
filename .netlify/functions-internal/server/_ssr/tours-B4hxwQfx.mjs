import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DoLBO0al.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Button } from "./button-CiSvnN9i.mjs";
import { C as Plus, D as Pencil, W as LoaderCircle, X as ImagePlus, at as EyeOff, it as Eye, kt as Archive, l as Trash2, lt as Copy, p as Sparkles, r as Users, y as Search, z as MapPin } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { S as LANGUAGES } from "./router-s5e8-avL.mjs";
import { t as Card } from "./card-BYsnRyjM.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-CwLzEEob.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, l as Badge, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-veiyoZ0k.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
import { n as useMediaUrls, t as slugify } from "./media-C-t6IOdB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tours-B4hxwQfx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY = {
	name: "",
	slug: "",
	location: "",
	region: "",
	activity: "Safari",
	duration: "3 days",
	difficulty: "Moderate",
	best_time: "",
	max_group_size: "",
	price: "",
	featured_image_url: "",
	description: "",
	itinerary: "",
	gallery_image_urls: [],
	translations: {},
	included_services: "",
	excluded_services: "",
	highlights: "",
	status: "active"
};
function AdminTours() {
	const qc = useQueryClient();
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({ ...EMPTY });
	const [deleteId, setDeleteId] = (0, import_react.useState)(null);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [activityFilter, setActivityFilter] = (0, import_react.useState)("all");
	const [translationLanguage, setTranslationLanguage] = (0, import_react.useState)("fr");
	const fileRef = (0, import_react.useRef)(null);
	(0, import_react.useRef)(null);
	const { data: tours, isLoading, isError } = useQuery({
		queryKey: ["admin-tours"],
		queryFn: async () => {
			const { data, error } = await supabase.from("tours").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const media = useMediaUrls("tours", [
		...(tours ?? []).flatMap((tour) => [tour.featured_image_url, ...tour.gallery_image_urls ?? []]),
		form.featured_image_url,
		...form.gallery_image_urls
	]);
	const activities = (0, import_react.useMemo)(() => [...new Set((tours ?? []).map((tour) => tour.activity).filter(Boolean))], [tours]);
	const filteredTours = (0, import_react.useMemo)(() => {
		const normalized = query.trim().toLowerCase();
		return (tours ?? []).filter((tour) => {
			return (!normalized || [
				tour.name,
				tour.location,
				tour.region,
				tour.activity,
				tour.slug
			].some((value) => value?.toLowerCase().includes(normalized))) && (statusFilter === "all" || tour.status === statusFilter) && (activityFilter === "all" || tour.activity === activityFilter);
		});
	}, [
		activityFilter,
		query,
		statusFilter,
		tours
	]);
	const stats = (0, import_react.useMemo)(() => ({
		total: tours?.length ?? 0,
		active: (tours ?? []).filter((tour) => tour.status === "active").length,
		drafts: (tours ?? []).filter((tour) => tour.status !== "active").length,
		destinations: new Set((tours ?? []).map((tour) => tour.region || tour.location).filter(Boolean)).size
	}), [tours]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		if (editing) setForm({
			name: editing.name,
			slug: editing.slug ?? "",
			location: editing.location,
			region: editing.region ?? "",
			activity: editing.activity ?? "",
			duration: editing.duration,
			difficulty: editing.difficulty ?? "",
			best_time: editing.best_time ?? "",
			max_group_size: editing.max_group_size?.toString() ?? "",
			price: editing.price,
			featured_image_url: editing.featured_image_url,
			gallery_image_urls: [editing.featured_image_url, ...editing.gallery_image_urls ?? []].filter(Boolean).slice(0, 5),
			translations: editing.translations ?? {},
			description: editing.description,
			itinerary: editing.itinerary,
			included_services: editing.included_services ?? "",
			excluded_services: editing.excluded_services ?? "",
			highlights: (editing.highlights ?? []).join("\n"),
			status: editing.status
		});
		else setForm({ ...EMPTY });
	}, [editing, open]);
	const save = useMutation({
		mutationFn: async () => {
			if (!form.name.trim()) throw new Error("Name is required");
			const payload = {
				name: form.name.trim(),
				slug: form.slug.trim() || slugify(form.name) || null,
				location: form.location.trim() || form.region.trim() || "Rwanda",
				region: form.region.trim() || null,
				activity: form.activity.trim() || null,
				duration: form.duration.trim() || "—",
				difficulty: form.difficulty.trim() || null,
				best_time: form.best_time.trim() || null,
				max_group_size: form.max_group_size ? Number(form.max_group_size) : null,
				price: form.price.trim() || "0",
				featured_image_url: form.gallery_image_urls[0] || form.featured_image_url || "",
				gallery_image_urls: form.gallery_image_urls.slice(0, 5),
				translations: form.translations,
				description: form.description,
				itinerary: form.itinerary,
				included_services: form.included_services || null,
				excluded_services: form.excluded_services || null,
				highlights: form.highlights.split("\n").map((highlight) => highlight.trim()).filter(Boolean),
				status: form.status
			};
			const result = editing ? await supabase.from("tours").update(payload).eq("id", editing.id) : await supabase.from("tours").insert(payload);
			if (result.error) throw result.error;
		},
		onSuccess: () => {
			toast.success(editing ? "Tour updated" : "Tour created");
			setOpen(false);
			setEditing(null);
			qc.invalidateQueries({ queryKey: ["admin-tours"] });
			qc.invalidateQueries({ queryKey: ["public-tours"] });
		},
		onError: (error) => toast.error(error.message)
	});
	const duplicate = useMutation({
		mutationFn: async (tour) => {
			const { id, created_at, ...rest } = tour;
			const { error } = await supabase.from("tours").insert({
				...rest,
				gallery_image_urls: rest.gallery_image_urls ?? [],
				name: `${tour.name} (copy)`,
				slug: `${tour.slug ?? slugify(tour.name)}-copy-${Date.now().toString(36)}`,
				status: "draft"
			});
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Tour duplicated as draft");
			qc.invalidateQueries({ queryKey: ["admin-tours"] });
		},
		onError: (error) => toast.error(error.message)
	});
	const toggleStatus = useMutation({
		mutationFn: async (tour) => {
			const { error } = await supabase.from("tours").update({ status: tour.status === "active" ? "draft" : "active" }).eq("id", tour.id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["admin-tours"] });
			qc.invalidateQueries({ queryKey: ["public-tours"] });
		},
		onError: (error) => toast.error(error.message)
	});
	const remove = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("tours").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Tour deleted");
			setDeleteId(null);
			qc.invalidateQueries({ queryKey: ["admin-tours"] });
			qc.invalidateQueries({ queryKey: ["public-tours"] });
		},
		onError: (error) => toast.error(error.message)
	});
	async function upload(files) {
		const selected = (files instanceof File ? [files] : Array.from(files)).slice(0, 5 - form.gallery_image_urls.length);
		if (!selected.length) return toast.error("A tour can have up to 5 images");
		setUploading(true);
		try {
			const paths = [];
			for (const [index, file] of selected.entries()) {
				const extension = file.name.split(".").pop() ?? "jpg";
				const path = `${Date.now()}-${index}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${extension}`;
				const { error } = await supabase.storage.from("tours").upload(path, file, { upsert: false });
				if (error) throw error;
				paths.push(path);
			}
			setForm((current) => ({
				...current,
				featured_image_url: current.gallery_image_urls[0] || paths[0] || current.featured_image_url,
				gallery_image_urls: [...current.gallery_image_urls, ...paths].slice(0, 5)
			}));
			toast.success(`${paths.length} image${paths.length === 1 ? "" : "s"} uploaded`);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setUploading(false);
		}
	}
	function openCreate() {
		setEditing(null);
		setOpen(true);
	}
	const selectedTranslation = form.translations[translationLanguage] ?? {};
	function updateTranslation(patch) {
		setForm((current) => ({
			...current,
			translations: {
				...current.translations,
				[translationLanguage]: {
					...current.translations[translationLanguage],
					...patch
				}
			}
		}));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-full pb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative overflow-hidden rounded-2xl bg-forest-deep px-5 py-7 text-cream shadow-luxe sm:px-8 sm:py-9",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full border border-gold/20" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-32 right-20 h-64 w-64 rounded-full border border-gold/10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex flex-wrap items-end justify-between gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), " Catalogue studio"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-4xl font-normal sm:text-5xl",
								children: "Journeys that stay with you."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-xl text-sm text-cream/65",
								children: "Shape the itineraries, images and stories that travellers discover across Rwanda."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: openCreate,
							className: "bg-gold text-gold-foreground hover:brightness-95",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " New journey"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Total journeys",
						value: stats.total,
						icon: MapPin
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Live on site",
						value: stats.active,
						icon: Eye,
						accent: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Drafts to review",
						value: stats.drafts,
						icon: Archive
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Destinations",
						value: stats.destinations,
						icon: Sparkles
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-normal text-forest",
						children: "Your catalogue"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							filteredTours.length,
							" of ",
							stats.total,
							" journeys shown"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative min-w-[16rem] flex-1 lg:flex-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: query,
									onChange: (event) => setQuery(event.target.value),
									placeholder: "Search journeys, regions...",
									className: "h-10 pl-9"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: statusFilter,
								onChange: (event) => setStatusFilter(event.target.value),
								className: "h-10 rounded-md border border-input bg-background px-3 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "all",
										children: "All status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "active",
										children: "Live"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "draft",
										children: "Draft"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: activityFilter,
								onChange: (event) => setActivityFilter(event.target.value),
								className: "h-10 rounded-md border border-input bg-background px-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "All activities"
								}), activities.map((activity) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: activity,
									children: activity
								}, activity))]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 overflow-hidden rounded-xl border border-border bg-card shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden grid-cols-[minmax(18rem,2fr)_minmax(8rem,1fr)_minmax(8rem,1fr)_minmax(7rem,0.8fr)_auto] gap-4 border-b border-border bg-muted/35 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground lg:grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Journey" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Destination" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Activity" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Price" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-right",
								children: "Actions"
							})
						]
					}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3 p-4",
						children: [
							0,
							1,
							2
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-20 rounded-lg" }, item))
					}) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-12 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-forest",
							children: "Could not load the catalogue."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Check your connection and refresh the page."
						})]
					}) : filteredTours.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-12 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mx-auto h-7 w-7 text-gold" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-semibold text-forest",
								children: "No journeys match those filters."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "link",
								onClick: () => {
									setQuery("");
									setStatusFilter("all");
									setActivityFilter("all");
								},
								children: "Clear filters"
							})
						]
					}) : filteredTours.map((tour) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TourRowView, {
						tour,
						imageUrl: media(tour.featured_image_url),
						onEdit: () => {
							setEditing(tour);
							setOpen(true);
						},
						onToggle: () => toggleStatus.mutate(tour),
						onDuplicate: () => duplicate.mutate(tour),
						onDelete: () => setDeleteId(tour.id)
					}, tour.id))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: (value) => {
					setOpen(value);
					if (!value) setEditing(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-h-[94vh] max-w-4xl overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "font-display text-3xl font-normal text-forest",
							children: editing ? "Edit journey" : "Create a journey"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6 lg:grid-cols-[1.2fr_0.8fr]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Journey name",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: form.name,
													onChange: (event) => setForm({
														...form,
														name: event.target.value
													}),
													placeholder: "Gorilla Encounter"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "URL slug",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: form.slug,
													placeholder: slugify(form.name) || "gorilla-encounter",
													onChange: (event) => setForm({
														...form,
														slug: event.target.value
													})
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Region",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: form.region,
													onChange: (event) => setForm({
														...form,
														region: event.target.value
													}),
													placeholder: "Volcanoes"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Location",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: form.location,
													onChange: (event) => setForm({
														...form,
														location: event.target.value
													}),
													placeholder: "Musanze"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Activity",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: form.activity,
													onChange: (event) => setForm({
														...form,
														activity: event.target.value
													}),
													placeholder: "Safari"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Duration",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: form.duration,
													onChange: (event) => setForm({
														...form,
														duration: event.target.value
													}),
													placeholder: "3 days"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Difficulty",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: form.difficulty,
													onChange: (event) => setForm({
														...form,
														difficulty: event.target.value
													}),
													placeholder: "Moderate"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Best time to visit",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: form.best_time,
													onChange: (event) => setForm({
														...form,
														best_time: event.target.value
													}),
													placeholder: "Jun-Sep, Dec-Feb"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Price (USD)",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													inputMode: "numeric",
													value: form.price,
													onChange: (event) => setForm({
														...form,
														price: event.target.value
													}),
													placeholder: "3500"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Max group size",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													inputMode: "numeric",
													value: form.max_group_size,
													onChange: (event) => setForm({
														...form,
														max_group_size: event.target.value
													}),
													placeholder: "8"
												})
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Description",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											rows: 5,
											value: form.description,
											onChange: (event) => setForm({
												...form,
												description: event.target.value
											}),
											placeholder: "Describe the experience in a few vivid sentences."
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Highlights",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											rows: 4,
											value: form.highlights,
											onChange: (event) => setForm({
												...form,
												highlights: event.target.value
											}),
											placeholder: "One highlight per line"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Itinerary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											rows: 6,
											value: form.itinerary,
											onChange: (event) => setForm({
												...form,
												itinerary: event.target.value
											}),
											placeholder: "Day 1: ..."
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4 rounded-xl border border-border bg-muted/20 p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Manual translations" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-xs text-muted-foreground",
												children: "Add translated tour content for each language. English uses the fields above."
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												value: translationLanguage,
												onChange: (event) => setTranslationLanguage(event.target.value),
												className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
												children: LANGUAGES.filter((language) => language.code !== "en").map((language) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
													value: language.code,
													children: [
														language.flag,
														" ",
														language.name
													]
												}, language.code))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid gap-4 sm:grid-cols-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
														label: "Translated name",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															value: selectedTranslation.name ?? "",
															onChange: (event) => updateTranslation({ name: event.target.value })
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
														label: "Translated location",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															value: selectedTranslation.location ?? "",
															onChange: (event) => updateTranslation({ location: event.target.value })
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
														label: "Translated activity",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															value: selectedTranslation.activity ?? "",
															onChange: (event) => updateTranslation({ activity: event.target.value })
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
														label: "Translated region",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															value: selectedTranslation.region ?? "",
															onChange: (event) => updateTranslation({ region: event.target.value })
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
														label: "Translated duration",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															value: selectedTranslation.duration ?? "",
															onChange: (event) => updateTranslation({ duration: event.target.value })
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
														label: "Translated difficulty",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															value: selectedTranslation.difficulty ?? "",
															onChange: (event) => updateTranslation({ difficulty: event.target.value })
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
														label: "Translated best time",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															value: selectedTranslation.best_time ?? "",
															onChange: (event) => updateTranslation({ best_time: event.target.value })
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
														label: "Translated price",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															value: selectedTranslation.price ?? "",
															onChange: (event) => updateTranslation({ price: event.target.value })
														})
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Translated description",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
													rows: 4,
													value: selectedTranslation.description ?? "",
													onChange: (event) => updateTranslation({ description: event.target.value })
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Translated itinerary",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
													rows: 4,
													value: selectedTranslation.itinerary ?? "",
													onChange: (event) => updateTranslation({ itinerary: event.target.value })
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Translated highlights (one per line)",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
													rows: 3,
													value: (selectedTranslation.highlights ?? []).join("\n"),
													onChange: (event) => updateTranslation({ highlights: event.target.value.split("\n").map((item) => item.trim()).filter(Boolean) })
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid gap-4 sm:grid-cols-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
													label: "Translated included services",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
														rows: 3,
														value: selectedTranslation.included_services ?? "",
														onChange: (event) => updateTranslation({ included_services: event.target.value })
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
													label: "Translated excluded services",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
														rows: 3,
														value: selectedTranslation.excluded_services ?? "",
														onChange: (event) => updateTranslation({ excluded_services: event.target.value })
													})
												})]
											})
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border bg-muted/30 p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mb-3 flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Featured image" }), form.featured_image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													size: "sm",
													onClick: () => setForm({
														...form,
														featured_image_url: ""
													}),
													children: "Clear"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "aspect-[4/3] overflow-hidden rounded-lg bg-background",
												children: media(form.featured_image_url) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: media(form.featured_image_url),
													alt: "",
													className: "h-full w-full object-cover"
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "grid h-full place-items-center text-muted-foreground",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "h-8 w-8" })
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												ref: fileRef,
												type: "file",
												accept: "image/*",
												multiple: true,
												className: "hidden",
												onChange: (event) => {
													const files = event.target.files;
													if (files) upload(files);
													event.target.value = "";
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												type: "button",
												variant: "outline",
												disabled: uploading,
												onClick: () => fileRef.current?.click(),
												className: "mt-3 w-full",
												children: [
													uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "mr-2 h-4 w-4" }),
													" ",
													form.gallery_image_urls.length >= 5 ? "5 images added" : "Add images"
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border bg-muted/20 p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-3 flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [
												"Tour images (",
												form.gallery_image_urls.length,
												"/5)"
											] }), form.gallery_image_urls.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "sm",
												onClick: () => setForm({
													...form,
													featured_image_url: "",
													gallery_image_urls: []
												}),
												children: "Clear all"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid grid-cols-3 gap-2",
											children: form.gallery_image_urls.map((path, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "group relative aspect-square overflow-hidden rounded-md bg-background",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: media(path),
													alt: `Tour image ${index + 1}`,
													className: "h-full w-full object-cover"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													className: "absolute inset-x-1 bottom-1 hidden rounded bg-forest-deep/85 px-1 py-0.5 text-[10px] text-cream group-hover:block",
													onClick: () => setForm((current) => {
														const gallery_image_urls = current.gallery_image_urls.filter((_, itemIndex) => itemIndex !== index);
														return {
															...current,
															gallery_image_urls,
															featured_image_url: gallery_image_urls[0] ?? ""
														};
													}),
													children: "Remove"
												})]
											}, path))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Included",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
												rows: 5,
												value: form.included_services,
												onChange: (event) => setForm({
													...form,
													included_services: event.target.value
												}),
												placeholder: "One service per line"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Not included",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
												rows: 5,
												value: form.excluded_services,
												onChange: (event) => setForm({
													...form,
													excluded_services: event.target.value
												}),
												placeholder: "One service per line"
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Publishing status",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: form.status,
											onChange: (event) => setForm({
												...form,
												status: event.target.value
											}),
											className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "active",
												children: "Live on website"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "draft",
												children: "Save as draft"
											})]
										})
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setOpen(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => save.mutate(),
							disabled: save.isPending,
							className: "bg-forest text-primary-foreground hover:bg-forest-deep",
							children: [save.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), editing ? "Save changes" : "Create journey"]
						})] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: !!deleteId,
				onOpenChange: (value) => !value && setDeleteId(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Delete this journey?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "This removes it from the public catalogue permanently. Existing bookings keep their reference." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: () => deleteId && remove.mutate(deleteId),
					children: "Delete journey"
				})] })] })
			})
		]
	});
}
function Metric({ label, value, icon: Icon, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "flex items-center justify-between p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 font-display text-3xl text-forest",
			children: value
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `grid h-10 w-10 place-items-center rounded-lg ${accent ? "bg-gold text-gold-foreground" : "bg-forest/10 text-forest"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
		})]
	});
}
function TourRowView({ tour, imageUrl, onEdit, onToggle, onDuplicate, onDelete }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group grid gap-4 border-b border-border p-4 last:border-b-0 sm:p-5 lg:grid-cols-[minmax(18rem,2fr)_minmax(8rem,1fr)_minmax(8rem,1fr)_minmax(7rem,0.8fr)_auto] lg:items-center lg:gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-muted",
					children: imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: imageUrl,
						alt: tour.name,
						className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-full place-items-center text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "h-5 w-5" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate font-semibold text-forest",
								children: tour.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: tour.status === "active" ? "default" : "secondary",
								children: tour.status === "active" ? "Live" : "Draft"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-1 text-sm text-muted-foreground",
							children: tour.description || "No description yet."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center gap-3 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3.5 w-3.5" }),
									" Up to ",
									tour.max_group_size ?? "—"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tour.duration })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden text-sm lg:block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: tour.region || tour.location
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-xs text-muted-foreground/70",
					children: tour.location
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden text-sm text-muted-foreground lg:block",
				children: tour.activity || "Uncategorised"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden font-semibold text-forest lg:block",
				children: ["$", Number(tour.price).toLocaleString()]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-end gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "ghost",
						onClick: onEdit,
						title: "Edit journey",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "ghost",
						onClick: onToggle,
						title: tour.status === "active" ? "Unpublish" : "Publish",
						children: tour.status === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "ghost",
						onClick: onDuplicate,
						title: "Duplicate journey",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "ghost",
						className: "text-destructive hover:text-destructive",
						onClick: onDelete,
						title: "Delete journey",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-xs text-muted-foreground lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					tour.region || tour.location,
					" · ",
					tour.activity || "Uncategorised"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-semibold text-forest",
					children: ["$", Number(tour.price).toLocaleString()]
				})]
			})
		]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
			children: label
		}), children]
	});
}
//#endregion
export { AdminTours as component };
