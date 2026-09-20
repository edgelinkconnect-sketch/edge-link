import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DoLBO0al.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link, v as useNavigate, y as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-CiSvnN9i.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { B as Mail, E as Phone, U as Lock, W as LoaderCircle, i as User } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as useAuth } from "./router-s5e8-avL.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as hero_mountains_default } from "./hero-mountains-1-NmgtDH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-3u5mXEt2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var logoUrl = "/pwa-icon-512.png";
var DEMO_ACCOUNTS = [
	{
		label: "Demo Admin",
		email: "admin.demo@edgelinktours.com",
		password: "EdgelinkDemo2026!"
	},
	{
		label: "Super Demo (admin)",
		email: "super.demo@edgelinktours.com",
		password: "EdgelinkSuper2026!"
	},
	{
		label: "Demo Traveller",
		email: "traveller.demo@edgelinktours.com",
		password: "EdgelinkTravel2026!"
	}
];
function AuthPage() {
	const { t } = useTranslation();
	const { user, loading, role, isAdmin } = useAuth();
	const navigate = useNavigate();
	const search = useSearch({ from: "/auth" });
	const [mode, setMode] = (0, import_react.useState)(search.mode ?? "signin");
	const [prefill, setPrefill] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!loading && user && role) navigate({
			to: search.redirect || (isAdmin ? "/admin" : "/dashboard"),
			replace: true
		});
	}, [
		user,
		loading,
		role,
		isAdmin,
		navigate,
		search.redirect
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: `auth-page ${mode === "signup" ? "auth-signup" : "auth-signin"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "auth-scene",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					className: "auth-scene-video",
					autoPlay: true,
					loop: true,
					muted: true,
					playsInline: true,
					poster: hero_mountains_default,
					preload: "metadata",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
						src: "/resources/video.mp4",
						type: "video/mp4"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "auth-scene-overlay" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "auth-side-brand",
					"aria-label": "EDGELINK Tours home",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: logoUrl,
						alt: "EDGELINK Tours logo"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "auth-scene-copy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "auth-eyebrow",
							children: "Rwanda, slowly discovered"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "auth-scene-title",
							children: [
								"Take the long",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "way home." })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "auth-scene-caption",
							children: "The quiet roads, the high country, and a little more time to look around."
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "auth-panel-wrap",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "auth-panel-top",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "auth-secure-note",
						children: t("brand.tagline")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "auth-panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "auth-panel-intro",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "auth-eyebrow",
									children: mode === "signin" ? t("auth.signInSubtitle") : t("auth.signUpSubtitle")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: mode === "signin" ? t("auth.signIn") : t("auth.signUp") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: mode === "signin" ? "Sign in to your client or admin account." : "Create a client account to manage your journeys and conversations." })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "auth-tabs",
							role: "tablist",
							"aria-label": "Account access",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMode("signin"),
								className: mode === "signin" ? "active" : "",
								children: t("auth.signIn")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMode("signup"),
								className: mode === "signup" ? "active" : "",
								children: t("auth.signUp")
							})]
						}),
						mode === "signin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInForm, { prefill }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignUpForm, { onSuccess: () => setMode("signin") })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "auth-demo",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "auth-demo-label",
						children: t("common.getStarted")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid gap-2",
						children: DEMO_ACCOUNTS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setMode("signin");
								setPrefill({
									...d,
									n: Date.now()
								});
							},
							className: "auth-demo-account",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-semibold",
								children: d.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block",
								children: d.email
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("common.getStarted") })]
						}, d.email))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "auth-legal",
					children: [
						t("footer.legal"),
						" · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/terms",
							className: "auth-legal-link",
							children: t("footer.terms")
						}),
						" ",
						"· ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/privacy",
							className: "auth-legal-link",
							children: t("footer.privacy")
						}),
						"."
					]
				})
			]
		})]
	});
}
function SignInForm({ prefill }) {
	const { t } = useTranslation();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!prefill) return;
		setEmail(prefill.email);
		setPassword(prefill.password);
	}, [prefill]);
	const submit = async (e) => {
		e.preventDefault();
		setBusy(true);
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		setBusy(false);
		if (error) return toast.error(error.message);
		toast.success(t("auth.signInSuccess"));
	};
	const forgot = async () => {
		if (!email) return toast.error(t("auth.email"));
		const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
		if (error) return toast.error(error.message);
		toast.success(t("auth.sendReset"));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "email",
				icon: Mail,
				label: t("auth.email"),
				type: "email",
				value: email,
				onChange: setEmail,
				required: true,
				autoComplete: "email",
				inputMode: "email"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "password",
				icon: Lock,
				label: t("auth.password"),
				type: "password",
				value: password,
				onChange: setPassword,
				required: true,
				autoComplete: "current-password"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "submit",
				className: "h-11 w-full bg-forest text-base text-cream hover:bg-forest-deep",
				disabled: busy,
				children: [
					busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
					" ",
					t("auth.signIn")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: forgot,
				className: "w-full text-center text-xs text-forest underline hover:text-forest-deep",
				children: t("auth.forgotPassword")
			})
		]
	});
}
function SignUpForm({ onSuccess }) {
	const { t } = useTranslation();
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const submit = async (e) => {
		e.preventDefault();
		if (password.length < 8) return toast.error("Password must be at least 8 characters");
		setBusy(true);
		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: window.location.origin,
				data: {
					full_name: fullName,
					phone
				}
			}
		});
		setBusy(false);
		if (error) return toast.error(error.message);
		toast.success(t("auth.signUpSuccess"));
		onSuccess();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "fullName",
				icon: User,
				label: t("auth.fullName"),
				value: fullName,
				onChange: setFullName,
				required: true,
				autoComplete: "name"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "phone",
				icon: Phone,
				label: t("auth.phone"),
				type: "tel",
				value: phone,
				onChange: setPhone,
				placeholder: "+250 788 000 000",
				autoComplete: "tel",
				inputMode: "tel"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "email",
				icon: Mail,
				label: t("auth.email"),
				type: "email",
				value: email,
				onChange: setEmail,
				required: true,
				autoComplete: "email",
				inputMode: "email"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "password",
				icon: Lock,
				label: t("auth.password"),
				type: "password",
				value: password,
				onChange: setPassword,
				required: true,
				autoComplete: "new-password"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "submit",
				className: "h-11 w-full bg-gold text-base text-gold-foreground hover:brightness-95",
				disabled: busy,
				children: [
					busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
					" ",
					t("auth.signUp")
				]
			})
		]
	});
}
function Field({ id, icon: Icon, label, type = "text", value, onChange, required, placeholder, autoComplete, inputMode }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: id,
			className: "text-forest",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id,
				type,
				value,
				onChange: (e) => onChange(e.target.value),
				required,
				placeholder,
				autoComplete,
				inputMode,
				autoCapitalize: type === "email" ? "none" : void 0,
				autoCorrect: type === "email" ? "off" : void 0,
				className: "h-11 pl-9 text-base"
			})]
		})]
	});
}
//#endregion
export { AuthPage as component };
