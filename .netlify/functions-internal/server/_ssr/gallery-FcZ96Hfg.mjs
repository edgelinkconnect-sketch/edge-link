import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DoLBO0al.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Button } from "./button-CiSvnN9i.mjs";
import { W as LoaderCircle, X as ImagePlus, a as Upload, d as Star, l as Trash2, p as Sparkles } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Card } from "./card-BYsnRyjM.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-CwLzEEob.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, l as Badge, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-veiyoZ0k.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
import { n as useMediaUrls, t as slugify } from "./media-C-t6IOdB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery-FcZ96Hfg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminGallery() {
	const qc = useQueryClient();
	const [selected, setSelected] = (0, import_react.useState)([]);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [confirm, setConfirm] = (0, import_react.useState)(null);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const [filter, setFilter] = (0, import_react.useState)("All");
	const fileRef = (0, import_react.useRef)(null);
	const { data: shots, isLoading } = useQuery({
		queryKey: ["admin-gallery"],
		queryFn: async () => {
			const { data, error } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const media = useMediaUrls("gallery", (shots ?? []).map((s) => s.image_url));
	const locations = (0, import_react.useMemo)(() => ["All", ...new Set((shots ?? []).map((s) => s.location).filter(Boolean))], [shots]);
	const items = (shots ?? []).filter((s) => filter === "All" || s.location === filter);
	async function uploadFiles(files) {
		setUploading(true);
		let ok = 0;
		try {
			for (const file of Array.from(files)) {
				if (!file.type.startsWith("image/")) continue;
				const base = slugify(file.name.replace(/\.[^.]+$/, ""));
				const path = `${Date.now()}-${base}.${file.name.split(".").pop()}`;
				const { error } = await supabase.storage.from("gallery").upload(path, file);
				if (error) {
					toast.error(`${file.name}: ${error.message}`);
					continue;
				}
				const { error: insErr } = await supabase.from("gallery").insert({
					image_url: path,
					title: base.replace(/-/g, " ") || "Untitled",
					location: filter !== "All" ? filter : "Rwanda",
					is_ai: /(^|-)(ai|generated|midjourney|dalle)(-|$)/.test(base)
				});
				if (insErr) {
					toast.error(insErr.message);
					continue;
				}
				ok++;
			}
			if (ok) {
				toast.success(`${ok} image${ok > 1 ? "s" : ""} uploaded`);
				qc.invalidateQueries({ queryKey: ["admin-gallery"] });
			}
		} finally {
			setUploading(false);
		}
	}
	const saveMeta = useMutation({
		mutationFn: async (s) => {
			const { error } = await supabase.from("gallery").update({
				title: s.title,
				description: s.description,
				location: s.location,
				tags: s.tags,
				photographer: s.photographer,
				is_ai: s.is_ai,
				is_featured: s.is_featured
			}).eq("id", s.id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Image updated");
			setEditing(null);
			qc.invalidateQueries({ queryKey: ["admin-gallery"] });
			qc.invalidateQueries({ queryKey: ["public-gallery"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const removeMany = useMutation({
		mutationFn: async (ids) => {
			const paths = (shots ?? []).filter((s) => ids.includes(s.id)).map((s) => s.image_url).filter((p) => !/^https?:/.test(p));
			const { error } = await supabase.from("gallery").delete().in("id", ids);
			if (error) throw error;
			if (paths.length) await supabase.storage.from("gallery").remove(paths);
		},
		onSuccess: (_d, ids) => {
			toast.success(`${ids.length} image${ids.length > 1 ? "s" : ""} removed`);
			setSelected([]);
			setConfirm(null);
			qc.invalidateQueries({ queryKey: ["admin-gallery"] });
			qc.invalidateQueries({ queryKey: ["public-gallery"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const aiIds = (shots ?? []).filter((s) => s.is_ai).map((s) => s.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-bold text-forest",
				children: "Gallery"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Upload real field photography, tag it by location, and prune AI imagery."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					aiIds.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: () => setConfirm("ai"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mr-1.5 h-4 w-4" }),
							" Remove AI images (",
							aiIds.length,
							")"
						]
					}),
					selected.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "text-destructive",
						onClick: () => setConfirm("selected"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-1.5 h-4 w-4" }),
							" Delete ",
							selected.length
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						disabled: uploading,
						onClick: () => fileRef.current?.click(),
						className: "bg-forest text-primary-foreground hover:bg-forest-deep",
						children: [uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "mr-1.5 h-4 w-4" }), " Upload"]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: fileRef,
			type: "file",
			accept: "image/*",
			multiple: true,
			className: "hidden",
			onChange: (e) => {
				if (e.target.files?.length) uploadFiles(e.target.files);
				e.target.value = "";
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			onDragOver: (e) => {
				e.preventDefault();
				setDragging(true);
			},
			onDragLeave: () => setDragging(false),
			onDrop: (e) => {
				e.preventDefault();
				setDragging(false);
				if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files);
			},
			className: `mt-6 rounded-xl border-2 border-dashed p-6 text-center text-sm transition ${dragging ? "border-gold bg-gold/10" : "border-border text-muted-foreground"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "mx-auto mb-2 h-6 w-6 text-gold" }),
				"Drag & drop photos here to upload",
				filter !== "All" ? ` and tag them "${filter}"` : "",
				"."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 flex flex-wrap gap-2",
			children: locations.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setFilter(l),
				className: `rounded-full border px-3 py-1.5 text-xs font-medium transition ${filter === l ? "border-forest bg-forest text-primary-foreground" : "border-border hover:border-forest/50"}`,
				children: l
			}, l))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4",
			children: isLoading ? [
				0,
				1,
				2,
				3
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "aspect-square rounded-xl" }, i)) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "col-span-full p-10 text-center text-muted-foreground",
				children: "No images yet."
			}) : items.map((s) => {
				const isSel = selected.includes(s.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `group overflow-hidden rounded-xl border bg-card transition ${isSel ? "border-gold ring-2 ring-gold" : "border-border"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setSelected((p) => isSel ? p.filter((x) => x !== s.id) : [...p, s.id]),
						className: "relative block aspect-square w-full bg-muted",
						children: [media(s.image_url) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: media(s.image_url),
							alt: s.title,
							loading: "lazy",
							className: "h-full w-full object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-full place-items-center text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "h-6 w-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute left-2 top-2 flex gap-1",
							children: [s.is_ai && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "text-[10px]",
								children: "AI"
							}), s.is_featured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								className: "bg-gold text-gold-foreground text-[10px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "mr-0.5 h-2.5 w-2.5" }), "Featured"]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-sm font-medium",
								children: s.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-xs text-muted-foreground",
								children: s.location
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								className: "mt-2 w-full",
								onClick: () => setEditing(s),
								children: "Edit"
							})
						]
					})]
				}, s.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!editing,
			onOpenChange: (v) => !v && setEditing(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-w-lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-display text-xl",
						children: "Edit image"
					}) }),
					editing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Title",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: editing.title,
									onChange: (e) => setEditing({
										...editing,
										title: e.target.value
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Location",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: editing.location,
									onChange: (e) => setEditing({
										...editing,
										location: e.target.value
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Description",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: editing.description ?? "",
									onChange: (e) => setEditing({
										...editing,
										description: e.target.value
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Photographer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: editing.photographer ?? "",
									onChange: (e) => setEditing({
										...editing,
										photographer: e.target.value
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Tags (comma separated)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: editing.tags.join(", "),
									onChange: (e) => setEditing({
										...editing,
										tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4 pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: editing.is_ai,
										onChange: (e) => setEditing({
											...editing,
											is_ai: e.target.checked
										})
									}), "Mark as AI-generated"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: editing.is_featured,
										onChange: (e) => setEditing({
											...editing,
											is_featured: e.target.checked
										})
									}), "Featured"]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setEditing(null),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => editing && saveMeta.mutate(editing),
						disabled: saveMeta.isPending,
						className: "bg-forest text-primary-foreground hover:bg-forest-deep",
						children: [saveMeta.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }), "Save"]
					})] })
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
			open: !!confirm,
			onOpenChange: (v) => !v && setConfirm(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: confirm === "ai" ? "Remove all AI images?" : `Delete ${selected.length} image(s)?` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "The files are removed from storage as well. This can't be undone." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
				onClick: () => removeMany.mutate(confirm === "ai" ? aiIds : selected),
				children: "Delete"
			})] })] })
		})
	] });
}
function Row({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
			children: label
		}), children]
	});
}
//#endregion
export { AdminGallery as component };
