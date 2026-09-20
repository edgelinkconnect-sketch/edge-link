import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DoLBO0al.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Button } from "./button-CiSvnN9i.mjs";
import { C as Plus, D as Pencil, W as LoaderCircle, a as Upload, b as Save, l as Trash2, nt as FileImage, tt as FileText } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Card } from "./card-BYsnRyjM.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { t as slugify } from "./media-C-t6IOdB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journal-8lUnVO9E.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyPost = {
	slug: "",
	title: "",
	excerpt: "",
	body: "",
	category: "Rwanda Travel Tips",
	author: "EDGELINK Tours",
	read_time: "5 min",
	image_url: "",
	image_urls: [],
	published: false
};
function AdminJournal() {
	const qc = useQueryClient();
	const [editing, setEditing] = (0, import_react.useState)(null);
	const { data: posts, isLoading } = useQuery({
		queryKey: ["admin-journal"],
		queryFn: async () => {
			const { data, error } = await supabase.from("journal_posts").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const save = useMutation({
		mutationFn: async (post) => {
			const payload = {
				...post,
				slug: slugify(post.slug || post.title),
				image_urls: post.image_urls?.slice(0, 5) ?? []
			};
			const result = "id" in post ? await supabase.from("journal_posts").update(payload).eq("id", post.id) : await supabase.from("journal_posts").insert(payload);
			if (result.error) throw result.error;
		},
		onSuccess: () => {
			toast.success("Journal post saved");
			setEditing(null);
			qc.invalidateQueries({ queryKey: ["admin-journal"] });
			qc.invalidateQueries({ queryKey: ["public-journal"] });
		},
		onError: (error) => toast.error(error.message)
	});
	const remove = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("journal_posts").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Journal post deleted");
			qc.invalidateQueries({ queryKey: ["admin-journal"] });
			qc.invalidateQueries({ queryKey: ["public-journal"] });
		},
		onError: (error) => toast.error(error.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground",
						children: "Content desk"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-bold text-forest",
						children: "Journal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Create stories, guides, and field notes for the public journal."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setEditing({ ...emptyPost }),
					className: "bg-forest text-cream hover:bg-forest-deep",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-4 w-4" }), " New post"]
				})]
			}),
			editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostEditor, {
				post: editing,
				saving: save.isPending,
				onChange: setEditing,
				onCancel: () => setEditing(null),
				onSave: () => void save.mutate(editing)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 md:grid-cols-2",
				children: [
					isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mx-auto h-6 w-6 animate-spin text-muted-foreground" }),
					!isLoading && !posts?.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "p-8 text-center text-sm text-muted-foreground md:col-span-2",
						children: "No database posts yet. Create the first one above."
					}),
					(posts ?? []).map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gold/15 text-gold-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "font-display text-xl font-bold text-forest",
											children: post.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${post.published ? "bg-emerald-100 text-emerald-800" : "bg-muted text-muted-foreground"}`,
											children: post.published ? "Published" : "Draft"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: [
											post.category,
											" · ",
											post.author,
											" · ",
											post.read_time
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 line-clamp-2 text-sm text-muted-foreground",
										children: post.excerpt
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex justify-end gap-2 border-t border-border pt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => setEditing(post),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "mr-1.5 h-4 w-4" }), " Edit"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								className: "text-destructive",
								onClick: () => void remove.mutate(post.id),
								disabled: remove.isPending,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-1.5 h-4 w-4" }), " Delete"]
							})]
						})]
					}, post.id))
				]
			})
		]
	});
}
function PostEditor({ post, saving, onChange, onCancel, onSave }) {
	const fileRef = (0, import_react.useRef)(null);
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const set = (key, value) => onChange({
		...post,
		[key]: value
	});
	const uploadImages = async (files) => {
		const selected = Array.from(files ?? []).filter((file) => file.type.startsWith("image/")).slice(0, 5);
		if (!selected.length) {
			toast.error("Please choose image files.");
			return;
		}
		setUploading(true);
		const paths = [];
		for (const file of selected) {
			const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
			const path = `journal/${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${extension}`;
			const { error } = await supabase.storage.from("gallery").upload(path, file, {
				contentType: file.type,
				upsert: false
			});
			if (error) toast.error(`Could not upload ${file.name}: ${error.message}`);
			else paths.push(path);
		}
		setUploading(false);
		if (!paths.length) return;
		set("image_url", paths[0]);
		set("image_urls", paths);
		toast.success(`${paths.length} image${paths.length === 1 ? "" : "s"} uploaded`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "mt-6 border-gold/40 p-5 shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-bold text-forest",
					children: "id" in post ? "Edit post" : "New post"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Draft the article and publish it when ready."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: onCancel,
					children: "Close"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: post.title,
							onChange: (e) => set("title", e.target.value),
							placeholder: "A new story from Rwanda"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Slug" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: post.slug,
							onChange: (e) => set("slug", e.target.value),
							placeholder: "new-story-from-rwanda"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: post.category,
							onChange: (e) => set("category", e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Author" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: post.author,
							onChange: (e) => set("author", e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Read time" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: post.read_time,
							onChange: (e) => set("read_time", e.target.value),
							placeholder: "5 min"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Image URL or storage path" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: post.image_url,
							onChange: (e) => set("image_url", e.target.value),
							placeholder: "https://..."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileRef,
							type: "file",
							accept: "image/*",
							multiple: true,
							className: "hidden",
							onChange: (e) => {
								uploadImages(e.target.files ?? void 0);
								e.target.value = "";
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onDragOver: (e) => {
								e.preventDefault();
								setDragging(true);
							},
							onDragLeave: () => setDragging(false),
							onDrop: (e) => {
								e.preventDefault();
								setDragging(false);
								uploadImages(e.dataTransfer.files);
							},
							className: `rounded-xl border-2 border-dashed p-6 text-center transition ${dragging ? "border-gold bg-gold/10" : "border-border bg-muted/30"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileImage, { className: "mx-auto h-7 w-7 text-gold" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm font-semibold text-forest",
									children: "Drop up to 5 images here"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: "The first image becomes the cover. The others appear between article paragraphs."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									className: "mt-3",
									disabled: uploading,
									onClick: () => fileRef.current?.click(),
									children: [uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "mr-1.5 h-4 w-4" }), " Choose images"]
								}),
								post.image_urls?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 flex justify-center gap-2",
									children: post.image_urls.map((path, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-forest px-2 py-1 text-[10px] text-cream",
										children: index === 0 ? "Cover" : `Inline ${index}`
									}, path))
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Excerpt" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 2,
							value: post.excerpt,
							onChange: (e) => set("excerpt", e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Article body" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 10,
							value: post.body,
							onChange: (e) => set("body", e.target.value)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-4 flex items-center gap-2 text-sm font-medium",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: post.published,
					onChange: (e) => set("published", e.target.checked)
				}), " Publish this post"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex justify-end gap-2 border-t border-border pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: onCancel,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: onSave,
					disabled: saving || uploading || !post.title.trim() || !post.body.trim(),
					className: "bg-forest text-cream hover:bg-forest-deep",
					children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "mr-1.5 h-4 w-4" }), " Save post"]
				})]
			})
		]
	});
}
//#endregion
export { AdminJournal as component };
