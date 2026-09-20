import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-CiSvnN9i.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { P as MessageSquare, V as LogOut, _ as Settings, bt as Camera, h as Shield, q as LayoutDashboard, xt as Calendar } from "../_libs/lucide-react.mjs";
import { C as useAuth, c as AppShell } from "./router-s5e8-avL.mjs";
import { t as NotificationToggle } from "./notification-toggle-Dgbe6HMu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-shell--xLCWXxd.js
var import_jsx_runtime = require_jsx_runtime();
var LINKS = [
	{
		to: "/dashboard",
		key: "overview",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/dashboard/bookings",
		key: "bookings",
		icon: Calendar
	},
	{
		to: "/dashboard/chat",
		key: "chat",
		icon: MessageSquare
	},
	{
		to: "/dashboard/experiences",
		key: "experiences",
		icon: Camera
	},
	{
		to: "/dashboard/profile",
		key: "profile",
		icon: Settings
	}
];
function DashboardShell({ title, description, actions, children }) {
	const { isAdmin, role, signOut } = useAuth();
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[90rem] gap-6 px-3 py-4 sm:px-5 lg:flex lg:py-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "hidden w-60 shrink-0 lg:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dashboard-surface sticky top-24 space-y-1 rounded-lg p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 rounded-md border border-border bg-muted/50 px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
							children: "Signed in as"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex items-center gap-2 text-sm font-semibold text-forest",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4" }),
								" ",
								role === "admin" ? "Admin account" : "Client account"
							]
						})]
					}),
					LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: l.to,
						activeOptions: { exact: "exact" in l },
						className: "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-foreground/75 transition hover:bg-muted data-[status=active]:bg-forest data-[status=active]:text-cream",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(l.icon, { className: "h-4 w-4" }),
							" ",
							t(`dashboardNav.${l.key}`)
						]
					}, l.to)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-2 border-t border-border" }),
					isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin",
						className: "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gold hover:bg-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4" }),
							" ",
							t("nav.adminPanel")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationToggle, { className: "w-full justify-start" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => void signOut(),
						variant: "ghost",
						className: "w-full justify-start gap-3 text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }),
							" ",
							t("nav.signOut")
						]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden",
					children: [LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						activeOptions: { exact: "exact" in l },
						className: "shrink-0 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium data-[status=active]:border-forest data-[status=active]:bg-forest data-[status=active]:text-cream",
						children: t(`dashboardNav.${l.key}`)
					}, l.to)), isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin",
						className: "shrink-0 rounded-full border border-gold px-3.5 py-1.5 text-xs font-medium text-gold",
						children: t("nav.adminPanel")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "truncate font-display text-3xl font-normal text-forest sm:text-4xl",
							children: title
						}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: description
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [actions, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							className: "lg:hidden",
							onClick: () => void signOut(),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "mr-1.5 h-4 w-4" }),
								" ",
								t("nav.signOut")
							]
						})]
					})]
				}),
				children
			]
		})]
	}) });
}
//#endregion
export { DashboardShell as t };
