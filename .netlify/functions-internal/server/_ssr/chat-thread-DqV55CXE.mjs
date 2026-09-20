import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DoLBO0al.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-CiSvnN9i.mjs";
import { $ as Headphones, F as MessageCircle, N as Mic, O as Pause, Ot as ArrowDown, W as LoaderCircle, ct as CornerDownLeft, f as Square, p as Sparkles, t as X, vt as Check, w as Play, yt as CheckCheck } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as useAuth } from "./router-s5e8-avL.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { i as format, n as isToday, t as isYesterday } from "../_libs/date-fns.mjs";
import { n as useStickToBottomContext, t as StickToBottom } from "../_libs/use-stick-to-bottom.mjs";
import { t as nanoid } from "../_libs/nanoid.mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-thread-DqV55CXE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Conversation = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickToBottom, {
	className: cn("relative flex-1 overflow-y-hidden", className),
	initial: "smooth",
	resize: "smooth",
	role: "log",
	...props
});
var ConversationContent = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickToBottom.Content, {
	className: cn("flex flex-col gap-8 p-4", className),
	...props
});
var ConversationScrollButton = ({ className, ...props }) => {
	const { isAtBottom, scrollToBottom } = useStickToBottomContext();
	const handleScrollToBottom = (0, import_react.useCallback)(() => {
		scrollToBottom();
	}, [scrollToBottom]);
	return !isAtBottom && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		className: cn("absolute bottom-4 left-[50%] translate-x-[-50%] rounded-full dark:bg-background dark:hover:bg-muted", className),
		onClick: handleScrollToBottom,
		size: "icon",
		type: "button",
		variant: "outline",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-4" })
	});
};
function InputGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "input-group",
		role: "group",
		className: cn("group/input-group border-input dark:bg-input/30 shadow-xs relative flex w-full items-center rounded-md border outline-none transition-[color,box-shadow]", "h-9 has-[>textarea]:h-auto", "has-[>[data-align=inline-start]]:[&>input]:pl-2", "has-[>[data-align=inline-end]]:[&>input]:pr-2", "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3", "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3", "has-[[data-slot=input-group-control]:focus-visible]:ring-ring has-[[data-slot=input-group-control]:focus-visible]:ring-1", "has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40", className),
		...props
	});
}
var inputGroupAddonVariants = cva("text-muted-foreground flex h-auto cursor-text select-none items-center justify-center gap-2 py-1.5 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4", {
	variants: { align: {
		"inline-start": "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
		"inline-end": "order-last pr-3 has-[>button]:mr-[-0.4rem] has-[>kbd]:mr-[-0.35rem]",
		"block-start": "[.border-b]:pb-3 order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5",
		"block-end": "[.border-t]:pt-3 order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5"
	} },
	defaultVariants: { align: "inline-start" }
});
function InputGroupAddon({ className, align = "inline-start", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "group",
		"data-slot": "input-group-addon",
		"data-align": align,
		className: cn(inputGroupAddonVariants({ align }), className),
		onClick: (e) => {
			if (e.target.closest("button")) return;
			e.currentTarget.parentElement?.querySelector("input")?.focus();
		},
		...props
	});
}
var inputGroupButtonVariants = cva("flex items-center gap-2 text-sm shadow-none", {
	variants: { size: {
		xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3.5",
		sm: "h-8 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5",
		"icon-xs": "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
		"icon-sm": "size-8 p-0 has-[>svg]:p-0"
	} },
	defaultVariants: { size: "xs" }
});
function InputGroupButton({ className, type = "button", variant = "ghost", size = "xs", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type,
		"data-size": size,
		variant,
		className: cn(inputGroupButtonVariants({ size }), className),
		...props
	});
}
function InputGroupTextarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
		"data-slot": "input-group-control",
		className: cn("flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent", className),
		...props
	});
}
function Spinner({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
		role: "status",
		"aria-label": "Loading",
		className: cn("size-4 animate-spin", className),
		...props
	});
}
var convertBlobUrlToDataUrl = async (url) => {
	try {
		const blob = await (await fetch(url)).blob();
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = () => resolve(null);
			reader.readAsDataURL(blob);
		});
	} catch {
		return null;
	}
};
var PromptInputController = (0, import_react.createContext)(null);
var ProviderAttachmentsContext = (0, import_react.createContext)(null);
var useOptionalPromptInputController = () => (0, import_react.useContext)(PromptInputController);
var useOptionalProviderAttachments = () => (0, import_react.useContext)(ProviderAttachmentsContext);
var LocalAttachmentsContext = (0, import_react.createContext)(null);
var usePromptInputAttachments = () => {
	const provider = useOptionalProviderAttachments();
	const context = (0, import_react.useContext)(LocalAttachmentsContext) ?? provider;
	if (!context) throw new Error("usePromptInputAttachments must be used within a PromptInput or PromptInputProvider");
	return context;
};
var LocalReferencedSourcesContext = (0, import_react.createContext)(null);
var PromptInput = ({ className, accept, multiple, globalDrop, syncHiddenInput, maxFiles, maxFileSize, onError, onSubmit, children, ...props }) => {
	const controller = useOptionalPromptInputController();
	const usingProvider = !!controller;
	const inputRef = (0, import_react.useRef)(null);
	const formRef = (0, import_react.useRef)(null);
	const [items, setItems] = (0, import_react.useState)([]);
	const files = usingProvider ? controller.attachments.files : items;
	const [referencedSources, setReferencedSources] = (0, import_react.useState)([]);
	const filesRef = (0, import_react.useRef)(files);
	(0, import_react.useEffect)(() => {
		filesRef.current = files;
	}, [files]);
	const openFileDialogLocal = (0, import_react.useCallback)(() => {
		inputRef.current?.click();
	}, []);
	const matchesAccept = (0, import_react.useCallback)((f) => {
		if (!accept || accept.trim() === "") return true;
		return accept.split(",").map((s) => s.trim()).filter(Boolean).some((pattern) => {
			if (pattern.endsWith("/*")) {
				const prefix = pattern.slice(0, -1);
				return f.type.startsWith(prefix);
			}
			return f.type === pattern;
		});
	}, [accept]);
	const addLocal = (0, import_react.useCallback)((fileList) => {
		const incoming = [...fileList];
		const accepted = incoming.filter((f) => matchesAccept(f));
		if (incoming.length && accepted.length === 0) {
			onError?.({
				code: "accept",
				message: "No files match the accepted types."
			});
			return;
		}
		const withinSize = (f) => maxFileSize ? f.size <= maxFileSize : true;
		const sized = accepted.filter(withinSize);
		if (accepted.length > 0 && sized.length === 0) {
			onError?.({
				code: "max_file_size",
				message: "All files exceed the maximum size."
			});
			return;
		}
		setItems((prev) => {
			const capacity = typeof maxFiles === "number" ? Math.max(0, maxFiles - prev.length) : void 0;
			const capped = typeof capacity === "number" ? sized.slice(0, capacity) : sized;
			if (typeof capacity === "number" && sized.length > capacity) onError?.({
				code: "max_files",
				message: "Too many files. Some were not added."
			});
			const next = [];
			for (const file of capped) next.push({
				filename: file.name,
				id: nanoid(),
				mediaType: file.type,
				type: "file",
				url: URL.createObjectURL(file)
			});
			return [...prev, ...next];
		});
	}, [
		matchesAccept,
		maxFiles,
		maxFileSize,
		onError
	]);
	const removeLocal = (0, import_react.useCallback)((id) => setItems((prev) => {
		const found = prev.find((file) => file.id === id);
		if (found?.url) URL.revokeObjectURL(found.url);
		return prev.filter((file) => file.id !== id);
	}), []);
	const addWithProviderValidation = (0, import_react.useCallback)((fileList) => {
		const incoming = [...fileList];
		const accepted = incoming.filter((f) => matchesAccept(f));
		if (incoming.length && accepted.length === 0) {
			onError?.({
				code: "accept",
				message: "No files match the accepted types."
			});
			return;
		}
		const withinSize = (f) => maxFileSize ? f.size <= maxFileSize : true;
		const sized = accepted.filter(withinSize);
		if (accepted.length > 0 && sized.length === 0) {
			onError?.({
				code: "max_file_size",
				message: "All files exceed the maximum size."
			});
			return;
		}
		const currentCount = files.length;
		const capacity = typeof maxFiles === "number" ? Math.max(0, maxFiles - currentCount) : void 0;
		const capped = typeof capacity === "number" ? sized.slice(0, capacity) : sized;
		if (typeof capacity === "number" && sized.length > capacity) onError?.({
			code: "max_files",
			message: "Too many files. Some were not added."
		});
		if (capped.length > 0) controller?.attachments.add(capped);
	}, [
		matchesAccept,
		maxFileSize,
		maxFiles,
		onError,
		files.length,
		controller
	]);
	const clearAttachments = (0, import_react.useCallback)(() => usingProvider ? controller?.attachments.clear() : setItems((prev) => {
		for (const file of prev) if (file.url) URL.revokeObjectURL(file.url);
		return [];
	}), [usingProvider, controller]);
	const clearReferencedSources = (0, import_react.useCallback)(() => setReferencedSources([]), []);
	const add = usingProvider ? addWithProviderValidation : addLocal;
	const remove = usingProvider ? controller.attachments.remove : removeLocal;
	const openFileDialog = usingProvider ? controller.attachments.openFileDialog : openFileDialogLocal;
	const clear = (0, import_react.useCallback)(() => {
		clearAttachments();
		clearReferencedSources();
	}, [clearAttachments, clearReferencedSources]);
	(0, import_react.useEffect)(() => {
		if (!usingProvider) return;
		controller.__registerFileInput(inputRef, () => inputRef.current?.click());
	}, [usingProvider, controller]);
	(0, import_react.useEffect)(() => {
		if (syncHiddenInput && inputRef.current && files.length === 0) inputRef.current.value = "";
	}, [files, syncHiddenInput]);
	(0, import_react.useEffect)(() => {
		const form = formRef.current;
		if (!form) return;
		if (globalDrop) return;
		const onDragOver = (e) => {
			if (e.dataTransfer?.types?.includes("Files")) e.preventDefault();
		};
		const onDrop = (e) => {
			if (e.dataTransfer?.types?.includes("Files")) e.preventDefault();
			if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) add(e.dataTransfer.files);
		};
		form.addEventListener("dragover", onDragOver);
		form.addEventListener("drop", onDrop);
		return () => {
			form.removeEventListener("dragover", onDragOver);
			form.removeEventListener("drop", onDrop);
		};
	}, [add, globalDrop]);
	(0, import_react.useEffect)(() => {
		if (!globalDrop) return;
		const onDragOver = (e) => {
			if (e.dataTransfer?.types?.includes("Files")) e.preventDefault();
		};
		const onDrop = (e) => {
			if (e.dataTransfer?.types?.includes("Files")) e.preventDefault();
			if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) add(e.dataTransfer.files);
		};
		document.addEventListener("dragover", onDragOver);
		document.addEventListener("drop", onDrop);
		return () => {
			document.removeEventListener("dragover", onDragOver);
			document.removeEventListener("drop", onDrop);
		};
	}, [add, globalDrop]);
	(0, import_react.useEffect)(() => () => {
		if (!usingProvider) {
			for (const f of filesRef.current) if (f.url) URL.revokeObjectURL(f.url);
		}
	}, [usingProvider]);
	const handleChange = (0, import_react.useCallback)((event) => {
		if (event.currentTarget.files) add(event.currentTarget.files);
		event.currentTarget.value = "";
	}, [add]);
	const attachmentsCtx = (0, import_react.useMemo)(() => ({
		add,
		clear: clearAttachments,
		fileInputRef: inputRef,
		files: files.map((item) => ({
			...item,
			id: item.id
		})),
		openFileDialog,
		remove
	}), [
		files,
		add,
		remove,
		clearAttachments,
		openFileDialog
	]);
	const refsCtx = (0, import_react.useMemo)(() => ({
		add: (incoming) => {
			const array = Array.isArray(incoming) ? incoming : [incoming];
			setReferencedSources((prev) => [...prev, ...array.map((s) => ({
				...s,
				id: nanoid()
			}))]);
		},
		clear: clearReferencedSources,
		remove: (id) => {
			setReferencedSources((prev) => prev.filter((s) => s.id !== id));
		},
		sources: referencedSources
	}), [referencedSources, clearReferencedSources]);
	const handleSubmit = (0, import_react.useCallback)(async (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		const text = usingProvider ? controller.textInput.value : (() => {
			return new FormData(form).get("message") || "";
		})();
		if (!usingProvider) form.reset();
		try {
			const result = onSubmit({
				files: await Promise.all(files.map(async ({ id: _id, ...item }) => {
					if (item.url?.startsWith("blob:")) {
						const dataUrl = await convertBlobUrlToDataUrl(item.url);
						return {
							...item,
							url: dataUrl ?? item.url
						};
					}
					return item;
				})),
				text
			}, event);
			if (result instanceof Promise) try {
				await result;
				clear();
				if (usingProvider) controller.textInput.clear();
			} catch {}
			else {
				clear();
				if (usingProvider) controller.textInput.clear();
			}
		} catch {}
	}, [
		usingProvider,
		controller,
		files,
		onSubmit,
		clear
	]);
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		accept,
		"aria-label": "Upload files",
		className: "hidden",
		multiple,
		onChange: handleChange,
		ref: inputRef,
		title: "Upload files",
		type: "file"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
		className: cn("w-full", className),
		onSubmit: handleSubmit,
		ref: formRef,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup, {
			className: "overflow-hidden",
			children
		})
	})] });
	const withReferencedSources = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalReferencedSourcesContext.Provider, {
		value: refsCtx,
		children: inner
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalAttachmentsContext.Provider, {
		value: attachmentsCtx,
		children: withReferencedSources
	});
};
var PromptInputTextarea = ({ onChange, onKeyDown, className, placeholder = "What would you like to know?", ...props }) => {
	const controller = useOptionalPromptInputController();
	const attachments = usePromptInputAttachments();
	const [isComposing, setIsComposing] = (0, import_react.useState)(false);
	const handleKeyDown = (0, import_react.useCallback)((e) => {
		onKeyDown?.(e);
		if (e.defaultPrevented) return;
		if (e.key === "Enter") {
			if (isComposing || e.nativeEvent.isComposing) return;
			if (e.shiftKey) return;
			e.preventDefault();
			const { form } = e.currentTarget;
			if ((form?.querySelector("button[type=\"submit\"]"))?.disabled) return;
			form?.requestSubmit();
		}
		if (e.key === "Backspace" && e.currentTarget.value === "" && attachments.files.length > 0) {
			e.preventDefault();
			const lastAttachment = attachments.files.at(-1);
			if (lastAttachment) attachments.remove(lastAttachment.id);
		}
	}, [
		onKeyDown,
		isComposing,
		attachments
	]);
	const handlePaste = (0, import_react.useCallback)((event) => {
		const items = event.clipboardData?.items;
		if (!items) return;
		const files = [];
		for (const item of items) if (item.kind === "file") {
			const file = item.getAsFile();
			if (file) files.push(file);
		}
		if (files.length > 0) {
			event.preventDefault();
			attachments.add(files);
		}
	}, [attachments]);
	const handleCompositionEnd = (0, import_react.useCallback)(() => setIsComposing(false), []);
	const handleCompositionStart = (0, import_react.useCallback)(() => setIsComposing(true), []);
	const controlledProps = controller ? {
		onChange: (e) => {
			controller.textInput.setInput(e.currentTarget.value);
			onChange?.(e);
		},
		value: controller.textInput.value
	} : { onChange };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupTextarea, {
		className: cn("field-sizing-content max-h-48 min-h-16", className),
		name: "message",
		onCompositionEnd: handleCompositionEnd,
		onCompositionStart: handleCompositionStart,
		onKeyDown: handleKeyDown,
		onPaste: handlePaste,
		placeholder,
		...props,
		...controlledProps
	});
};
var PromptInputFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
	align: "block-end",
	className: cn("justify-between gap-1", className),
	...props
});
var PromptInputSubmit = ({ className, variant = "default", size = "icon-sm", status, onStop, onClick, children, ...props }) => {
	const isGenerating = status === "submitted" || status === "streaming";
	let Icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerDownLeft, { className: "size-4" });
	if (status === "submitted") Icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {});
	else if (status === "streaming") Icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-4" });
	else if (status === "error") Icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" });
	const handleClick = (0, import_react.useCallback)((e) => {
		if (isGenerating && onStop) {
			e.preventDefault();
			onStop();
			return;
		}
		onClick?.(e);
	}, [
		isGenerating,
		onStop,
		onClick
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupButton, {
		"aria-label": isGenerating ? "Stop" : "Submit",
		className: cn(className),
		onClick: handleClick,
		size,
		type: isGenerating && onStop ? "button" : "submit",
		variant,
		...props,
		children: children ?? Icon
	});
};
var motionComponentCache = /* @__PURE__ */ new Map();
var getMotionComponent = (element) => {
	let component = motionComponentCache.get(element);
	if (!component) {
		component = motion.create(element);
		motionComponentCache.set(element, component);
	}
	return component;
};
var ShimmerComponent = ({ children, as: Component = "p", className, duration = 2, spread = 2 }) => {
	const MotionComponent = getMotionComponent(Component);
	const dynamicSpread = (0, import_react.useMemo)(() => (children?.length ?? 0) * spread, [children, spread]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionComponent, {
		animate: { backgroundPosition: "0% center" },
		className: cn("relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent", "[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--color-background),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]", className),
		initial: { backgroundPosition: "100% center" },
		style: {
			"--spread": `${dynamicSpread}px`,
			backgroundImage: "var(--bg), linear-gradient(var(--color-muted-foreground), var(--color-muted-foreground))"
		},
		transition: {
			duration,
			ease: "linear",
			repeat: Number.POSITIVE_INFINITY
		},
		children
	});
};
var Shimmer = (0, import_react.memo)(ShimmerComponent);
var CLIENT_SHORTCUTS = [
	{
		label: "Send my dates",
		message: "I would like to share my travel dates. They are: "
	},
	{
		label: "Ask for a quote",
		message: "Please prepare a quotation for my trip."
	},
	{
		label: "Request a voice note",
		message: "Could you send me a voice note with the trip details?"
	},
	{
		label: "What's included?",
		message: "Could you tell me what is included in this trip?"
	},
	{
		label: "Change my dates",
		action: "dates"
	}
];
var ADMIN_SHORTCUTS = [
	{
		label: "Ask for dates",
		message: "Please share your preferred travel dates."
	},
	{
		label: "Prepare quotation",
		message: "I will prepare your quotation and send it shortly."
	},
	{
		label: "Ask group size",
		message: "Please confirm the number of adults and children travelling."
	},
	{
		label: "Send a voice note",
		message: "I will send you a voice note with more details shortly."
	},
	{
		label: "Ask preferences",
		message: "Do you have any accommodation, activity, or dietary preferences?"
	}
];
function dayLabel(date) {
	if (isToday(date)) return "Today";
	if (isYesterday(date)) return "Yesterday";
	return format(date, "EEEE, d MMM yyyy");
}
function ChatThread({ chatId, role }) {
	const { user } = useAuth();
	const qc = useQueryClient();
	const [draft, setDraft] = (0, import_react.useState)("");
	const [sending, setSending] = (0, import_react.useState)(false);
	const [recording, setRecording] = (0, import_react.useState)(false);
	const [uploadingVoice, setUploadingVoice] = (0, import_react.useState)(false);
	const [dateRequestOpen, setDateRequestOpen] = (0, import_react.useState)(false);
	const [newStartDate, setNewStartDate] = (0, import_react.useState)("");
	const [newEndDate, setNewEndDate] = (0, import_react.useState)("");
	const [audioUrls, setAudioUrls] = (0, import_react.useState)({});
	const [pending, setPending] = (0, import_react.useState)([]);
	const [peerTyping, setPeerTyping] = (0, import_react.useState)(false);
	const [peerOnline, setPeerOnline] = (0, import_react.useState)(false);
	const typingChannel = (0, import_react.useRef)(null);
	const recorder = (0, import_react.useRef)(null);
	const recordingStream = (0, import_react.useRef)(null);
	const recordingChunks = (0, import_react.useRef)([]);
	const lastTypingSent = (0, import_react.useRef)(0);
	const { data: messages, isLoading, error: messagesError } = useQuery({
		queryKey: ["messages", chatId],
		refetchInterval: 5e3,
		refetchOnWindowFocus: true,
		queryFn: async () => {
			const { data, error } = await supabase.from("messages").select("id, chat_id, sender_id, sender_role, message, attachment_url, read_status, created_at").eq("chat_id", chatId).order("created_at", { ascending: true });
			if (error) throw error;
			return data ?? [];
		}
	});
	(0, import_react.useEffect)(() => {
		if (messagesError instanceof Error) toast.error(`Could not load messages: ${messagesError.message}`);
	}, [messagesError]);
	(0, import_react.useEffect)(() => {
		let active = true;
		const loadAudioUrls = async () => {
			const attachments = (messages ?? []).filter((m) => m.attachment_url);
			const entries = await Promise.all(attachments.map(async (m) => {
				const { data, error } = await supabase.storage.from("chat-attachments").createSignedUrl(m.attachment_url, 3600);
				return error || !data?.signedUrl ? null : [m.id, data.signedUrl];
			}));
			if (active) setAudioUrls(Object.fromEntries(entries.filter(Boolean)));
		};
		loadAudioUrls();
		return () => {
			active = false;
		};
	}, [messages]);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		const channel = supabase.channel(`chat-${chatId}`, { config: { presence: { key: `${role}:${user.id}` } } }).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "messages",
			filter: `chat_id=eq.${chatId}`
		}, () => {
			qc.invalidateQueries({ queryKey: ["messages", chatId] });
			qc.invalidateQueries({ queryKey: ["chats"] });
		}).on("broadcast", { event: "typing" }, (payload) => {
			if (payload.payload?.role !== role) {
				setPeerTyping(true);
				window.setTimeout(() => setPeerTyping(false), 2500);
			}
		}).on("presence", { event: "sync" }, () => {
			const state = channel.presenceState();
			setPeerOnline(Object.keys(state).some((k) => !k.startsWith(`${role}:`)));
		}).subscribe((status) => {
			if (status === "SUBSCRIBED") channel.track({
				role,
				at: Date.now()
			});
		});
		typingChannel.current = channel;
		return () => {
			supabase.removeChannel(channel);
			typingChannel.current = null;
		};
	}, [
		chatId,
		qc,
		role,
		user
	]);
	(0, import_react.useEffect)(() => {
		if (!messages || !user) return;
		const unread = messages.filter((m) => m.sender_id !== user.id && !m.read_status).map((m) => m.id);
		if (unread.length === 0) return;
		supabase.from("messages").update({ read_status: true }).in("id", unread).then(({ error }) => {
			if (error) toast.error(`Could not mark messages as read: ${error.message}`);
		});
	}, [messages, user]);
	(0, import_react.useEffect)(() => {
		if (!messages || pending.length === 0) return;
		setPending((p) => p.filter((x) => !messages.some((m) => m.message === x.message && m.sender_id === user?.id)));
	}, [
		messages,
		pending.length,
		user?.id
	]);
	const groups = (0, import_react.useMemo)(() => {
		const all = [...(messages ?? []).map((m) => ({
			kind: "real",
			m
		})), ...pending.map((p) => ({
			kind: "pending",
			m: p
		}))];
		const out = [];
		for (const item of all) {
			const day = dayLabel(new Date(item.m.created_at));
			const last = out[out.length - 1];
			if (last && last.day === day) last.items.push(item);
			else out.push({
				day,
				items: [item]
			});
		}
		return out;
	}, [messages, pending]);
	const send = async (text) => {
		const body = text.trim();
		if (!body || !user) return;
		const tempId = `tmp-${Date.now()}`;
		setSending(true);
		setDraft("");
		setPending((p) => [...p, {
			id: tempId,
			message: body,
			created_at: (/* @__PURE__ */ new Date()).toISOString()
		}]);
		const { error } = await supabase.from("messages").insert({
			chat_id: chatId,
			sender_id: user.id,
			sender_role: role,
			message: body,
			delivered_status: true
		});
		setSending(false);
		if (error) {
			setPending((p) => p.filter((x) => x.id !== tempId));
			setDraft(body);
			toast.error(`Could not send message: ${error.message}`);
		}
		qc.invalidateQueries({ queryKey: ["messages", chatId] });
	};
	const startRecording = async () => {
		if (!navigator.mediaDevices?.getUserMedia || !("MediaRecorder" in window)) {
			toast.error("Voice notes are not supported in this browser.");
			return;
		}
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const mimeType = [
				"audio/webm;codecs=opus",
				"audio/webm",
				"audio/mp4"
			].find((type) => MediaRecorder.isTypeSupported(type));
			const mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : void 0);
			recordingStream.current = stream;
			recordingChunks.current = [];
			recorder.current = mediaRecorder;
			mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0) recordingChunks.current.push(event.data);
			};
			mediaRecorder.onstop = () => {
				const blob = new Blob(recordingChunks.current, { type: mediaRecorder.mimeType || "audio/webm" });
				uploadVoiceNote(blob);
			};
			mediaRecorder.start();
			setRecording(true);
		} catch {
			toast.error("Microphone access is required to record a voice note.");
		}
	};
	const stopRecording = () => {
		recorder.current?.stop();
		recordingStream.current?.getTracks().forEach((track) => track.stop());
		recorder.current = null;
		setRecording(false);
	};
	const uploadVoiceNote = async (blob) => {
		if (!user) return;
		setUploadingVoice(true);
		const extension = blob.type.includes("mp4") ? "m4a" : "webm";
		const path = `${user.id}/${chatId}/${Date.now()}.${extension}`;
		const { error: uploadError } = await supabase.storage.from("chat-attachments").upload(path, blob, {
			contentType: blob.type || "audio/webm",
			upsert: false
		});
		if (uploadError) {
			setUploadingVoice(false);
			toast.error(`Could not upload voice note: ${uploadError.message}`);
			return;
		}
		const { error: messageError } = await supabase.from("messages").insert({
			chat_id: chatId,
			sender_id: user.id,
			sender_role: role,
			message: null,
			attachment_url: path,
			delivered_status: true
		});
		setUploadingVoice(false);
		if (messageError) {
			toast.error(`Could not send voice note: ${messageError.message}`);
			return;
		}
		qc.invalidateQueries({ queryKey: ["messages", chatId] });
	};
	const notifyTyping = () => {
		const now = Date.now();
		if (now - lastTypingSent.current < 1200) return;
		lastTypingSent.current = now;
		typingChannel.current?.send({
			type: "broadcast",
			event: "typing",
			payload: { role }
		});
	};
	const shortcuts = role === "client" ? CLIENT_SHORTCUTS : ADMIN_SHORTCUTS;
	const submitDateRequest = () => {
		if (!newStartDate) {
			toast.error("Choose a new start date first.");
			return;
		}
		const range = newEndDate ? `${newStartDate} to ${newEndDate}` : newStartDate;
		send(`I would like to change my travel dates. My new preferred date${newEndDate ? "s are" : " is"}: ${range}.`);
		setDateRequestOpen(false);
		setNewStartDate("");
		setNewEndDate("");
	};
	const isEmpty = !isLoading && (messages?.length ?? 0) === 0 && pending.length === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-[min(72vh,48rem)] min-h-[34rem] flex-col overflow-hidden bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 border-b border-border bg-card px-4 py-3.5 sm:px-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest text-cream shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Headphones, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card", peerOnline ? "bg-gold" : "bg-muted-foreground/40") })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-sm font-semibold text-foreground",
							children: role === "client" ? "EDGELINK Travel Desk" : "Traveller conversation"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-xs text-muted-foreground",
							children: peerOnline ? "Online now" : role === "client" ? "Usually replies within a few minutes" : "Currently offline"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto hidden items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 text-gold" }), " Live support"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Conversation, {
				className: "chat-scrollbar min-h-0 flex-1 bg-muted/20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConversationContent, {
					className: "mx-auto w-full max-w-3xl space-y-4 p-4 sm:p-6",
					children: [
						isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex min-h-40 items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shimmer, {
								className: "text-sm",
								children: "Loading conversation…"
							})
						}),
						isEmpty && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center justify-center py-16 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-2xl bg-forest/10 p-4 text-forest",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-6 w-6" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 font-display text-lg font-semibold text-forest",
									children: "No messages yet"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 max-w-sm text-sm text-muted-foreground",
									children: "Say hello — our team replies quickly and can tailor any itinerary to you."
								})
							]
						}),
						groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "my-3 flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-md border border-border bg-card px-3 py-0.5 text-[10px] font-medium uppercase text-muted-foreground",
										children: g.day
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" })
								]
							}), g.items.map((item, idx) => {
								const isPending = item.kind === "pending";
								const m = item.m;
								const mine = isPending || m.sender_id === user?.id;
								const prev = g.items[idx - 1];
								const grouped = (prev ? prev.kind === "pending" || prev.m.sender_id === user?.id : null) === mine;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("flex", mine ? "justify-end" : "justify-start", grouped ? "mt-0.5" : "mt-3"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: cn("max-w-[88%] px-4 py-3 text-sm shadow-sm transition sm:max-w-[72%]", mine ? "rounded-2xl rounded-br-md bg-forest text-cream" : "rounded-2xl rounded-bl-md border border-border/80 bg-card text-card-foreground", isPending && "opacity-70"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "whitespace-pre-wrap break-words leading-relaxed",
											children: [
												m.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: m.message }),
												m.attachment_url && audioUrls[m.id] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceNote, {
													src: audioUrls[m.id],
													mine
												}),
												m.attachment_url && !audioUrls[m.id] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-xs opacity-70",
													children: "Loading voice note…"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: cn("mt-2 flex items-center justify-end gap-1 text-[10px]", mine ? "text-cream/60" : "text-muted-foreground"),
											children: [format(new Date(m.created_at), "HH:mm"), mine && (isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : m.read_status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }))]
										})]
									})
								}, m.id);
							})]
						}, g.day)),
						peerTyping && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-start",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1 rounded-lg rounded-bl-sm border border-border bg-card px-4 py-3",
								children: [
									0,
									1,
									2
								].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground",
									style: { animationDelay: `${i * 120}ms` }
								}, i))
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationScrollButton, { className: "bottom-3" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border bg-background px-4 pt-3 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex w-full max-w-3xl items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
						children: "Quick send"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex min-w-0 gap-2 overflow-x-auto pb-1",
						children: shortcuts.map((shortcut) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							onClick: () => {
								if ("action" in shortcut && shortcut.action === "dates") setDateRequestOpen(true);
								else if ("message" in shortcut) send(shortcut.message);
							},
							variant: "outline",
							size: "sm",
							className: "shrink-0 rounded-lg border-border bg-card text-xs text-muted-foreground shadow-none transition hover:border-gold hover:bg-gold/10 hover:text-forest",
							children: shortcut.label
						}, shortcut.label))
					})]
				}), dateRequestOpen && role === "client" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto mt-3 flex w-full max-w-3xl flex-wrap items-end gap-3 rounded-xl border border-gold/30 bg-gold/10 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-[9rem] flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "new-travel-start",
								className: "mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
								children: "New start date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "new-travel-start",
								type: "date",
								value: newStartDate,
								onChange: (event) => setNewStartDate(event.target.value),
								className: "h-9 w-full rounded-md border border-border bg-background px-2 text-sm"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-[9rem] flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "new-travel-end",
								className: "mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
								children: "New end date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "new-travel-end",
								type: "date",
								min: newStartDate || void 0,
								value: newEndDate,
								onChange: (event) => setNewEndDate(event.target.value),
								className: "h-9 w-full rounded-md border border-border bg-background px-2 text-sm"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							onClick: submitDateRequest,
							className: "bg-forest text-cream hover:bg-forest-deep",
							children: "Send date request"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "ghost",
							onClick: () => setDateRequestOpen(false),
							children: "Cancel"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border bg-card p-3 sm:p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto mb-2 flex max-w-3xl items-center justify-between px-1 text-[11px] text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: recording ? "Recording voice note" : "Messages are private to this conversation" }),
						recording && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5 font-semibold text-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 animate-pulse rounded-full bg-destructive" }), " Tap stop when finished"]
						}),
						uploadingVoice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-forest",
							children: "Uploading voice note..."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PromptInput, {
					className: "mx-auto max-w-3xl rounded-xl border border-border bg-background shadow-sm focus-within:border-gold/70 focus-within:ring-2 focus-within:ring-gold/15",
					onSubmit: ({ text }) => void send(text),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptInputTextarea, {
						value: draft,
						onChange: (e) => {
							setDraft(e.target.value);
							notifyTyping();
						},
						placeholder: "Write a message",
						"aria-label": "Message",
						className: "min-h-12 text-sm"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PromptInputFooter, {
						className: "justify-end px-2 pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: recording ? "destructive" : "outline",
							size: "icon",
							onClick: () => recording ? stopRecording() : void startRecording(),
							disabled: sending || uploadingVoice,
							title: recording ? "Stop recording" : "Record voice note",
							"aria-label": recording ? "Stop recording" : "Record voice note",
							children: recording ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptInputSubmit, {
							status: sending ? "submitted" : void 0,
							disabled: sending || !draft.trim(),
							className: "bg-gold text-gold-foreground hover:bg-gold/90"
						})]
					})]
				})]
			})
		]
	});
}
function VoiceNote({ src, mine }) {
	const audioRef = (0, import_react.useRef)(null);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [duration, setDuration] = (0, import_react.useState)(0);
	const bars = [
		5,
		9,
		14,
		8,
		18,
		12,
		22,
		11,
		16,
		7,
		19,
		10,
		24,
		13,
		18,
		8,
		15,
		6,
		11,
		17,
		9,
		14,
		7,
		12
	];
	const elapsed = duration ? Math.floor(progress / 100 * duration) : 0;
	const toggle = async () => {
		const audio = audioRef.current;
		if (!audio) return;
		if (audio.paused) {
			await audio.play();
			setPlaying(true);
		} else {
			audio.pause();
			setPlaying(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("mt-1 flex min-w-[210px] items-center gap-3 rounded-xl px-2.5 py-2", mine ? "bg-cream/10" : "bg-muted/60"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
				ref: audioRef,
				src,
				preload: "metadata",
				onLoadedMetadata: (event) => setDuration(event.currentTarget.duration),
				onTimeUpdate: (event) => setProgress(event.currentTarget.duration ? event.currentTarget.currentTime / event.currentTarget.duration * 100 : 0),
				onEnded: () => {
					setPlaying(false);
					setProgress(0);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => void toggle(),
				className: cn("grid h-9 w-9 shrink-0 place-items-center rounded-full transition", mine ? "bg-gold text-gold-foreground hover:brightness-110" : "bg-forest text-cream hover:bg-forest-deep"),
				"aria-label": playing ? "Pause voice note" : "Play voice note",
				children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "ml-0.5 h-4 w-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-7 items-center gap-[2px]",
					"aria-label": "Voice note waveform",
					children: bars.map((height, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("w-1 rounded-full transition-colors", index / bars.length * 100 < progress ? mine ? "bg-gold" : "bg-forest" : mine ? "bg-cream/45" : "bg-muted-foreground/35"),
						style: { height: `${height}px` }
					}, index))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("mt-0.5 text-[10px] font-medium tabular-nums", mine ? "text-cream/65" : "text-muted-foreground"),
					children: [formatVoiceTime(elapsed), duration ? ` / ${formatVoiceTime(duration)}` : ""]
				})]
			})
		]
	});
}
function formatVoiceTime(seconds) {
	return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
}
//#endregion
export { ChatThread as t };
