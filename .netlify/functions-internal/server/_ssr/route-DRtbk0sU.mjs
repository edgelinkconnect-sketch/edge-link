import { _ as Link, p as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-CiSvnN9i.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { P as MessageSquare, R as Map, V as LogOut, Y as Image, d as Star, k as Newspaper, pt as Circle, q as LayoutDashboard, xt as Calendar } from "../_libs/lucide-react.mjs";
import { C as useAuth, b as LanguageSwitcher, x as ThemeToggle, y as BrandLogo } from "./router-s5e8-avL.mjs";
import { t as NotificationToggle } from "./notification-toggle-Dgbe6HMu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-DRtbk0sU.js
var import_jsx_runtime = require_jsx_runtime();
var LINKS = [
	{
		to: "/admin",
		key: "overview",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/admin/tours",
		key: "tours",
		icon: Map
	},
	{
		to: "/admin/gallery",
		key: "gallery",
		icon: Image
	},
	{
		to: "/admin/journal",
		key: "journal",
		icon: Newspaper
	},
	{
		to: "/admin/quotations",
		key: "bookings",
		icon: Calendar
	},
	{
		to: "/admin/experiences",
		key: "experiences",
		icon: Star
	},
	{
		to: "/admin/chat",
		key: "chat",
		icon: MessageSquare
	}
];
function AdminLayout() {
	const { signOut, user } = useAuth();
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-forest-deep text-cream",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "hidden w-64 shrink-0 flex-col border-r border-cream/10 bg-forest-deep md:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-cream/10 px-5 py-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, {
							imageClassName: "h-14 w-14",
							className: "text-cream"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-[10px] font-semibold uppercase tracking-widest text-cream/45",
							children: "Admin account · operator console"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationToggle, { className: "mt-3 border-cream/30 text-cream hover:bg-cream/10" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSwitcher, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex-1 space-y-1 p-3",
					children: LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: l.to,
						activeOptions: { exact: l.exact },
						className: "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-cream/65 transition hover:bg-cream/5 hover:text-cream data-[status=active]:border-r-2 data-[status=active]:border-gold data-[status=active]:bg-gold/10 data-[status=active]:font-semibold data-[status=active]:text-gold",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(l.icon, { className: "h-4 w-4" }),
							" ",
							t(`admin.${l.key}`)
						]
					}, l.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-cream/10 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-center gap-3 rounded-md bg-cream/5 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative grid h-9 w-9 shrink-0 place-items-center rounded-md bg-gold font-semibold text-gold-foreground",
								children: [(user?.email?.[0] ?? "S").toUpperCase(), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "absolute -bottom-0.5 -right-0.5 h-3 w-3 fill-gold text-forest-deep" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-xs font-semibold",
									children: "Admin account"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-[10px] text-cream/55",
									children: user?.email
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "mb-1 flex items-center gap-3 rounded-md px-3 py-2 text-sm text-cream/70 hover:bg-cream/10",
							children: ["← ", t("common.back")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => void signOut(),
							variant: "ghost",
							className: "w-full justify-start gap-3 text-cream/70 hover:bg-cream/10 hover:text-cream",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }),
								" ",
								t("nav.signOut")
							]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "flex-1 overflow-x-hidden bg-background text-foreground md:rounded-l-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border bg-background px-4 py-3 md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate text-xs text-muted-foreground",
						children: user?.email
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSwitcher, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationToggle, {})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-3 overflow-x-auto pb-1",
					children: LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						activeOptions: { exact: l.exact },
						className: "shrink-0 rounded-full border border-border px-3 py-1.5 text-xs data-[status=active]:bg-forest data-[status=active]:text-cream data-[status=active]:border-forest",
						children: t(`admin.${l.key}`)
					}, l.to))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-3 sm:p-5 md:p-7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})]
		})]
	});
}
//#endregion
export { AdminLayout as component };
