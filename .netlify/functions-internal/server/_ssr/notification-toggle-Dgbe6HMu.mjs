import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { Ct as BellRing, St as Bell, wt as BellOff } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as requestNotificationPermission, f as showNotification, u as notificationPermission } from "./router-s5e8-avL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notification-toggle-Dgbe6HMu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function registerPushNotifications() {
	if (!("serviceWorker" in navigator)) return false;
	if (!("PushManager" in window)) return false;
	if (Notification.permission !== "granted") return false;
	await navigator.serviceWorker.ready;
	console.warn("Missing VITE_VAPID_PUBLIC_KEY. Browser push is disabled.");
	return false;
}
function NotificationToggle({ className }) {
	const [state, setState] = (0, import_react.useState)("default");
	(0, import_react.useEffect)(() => {
		setState(notificationPermission());
	}, []);
	if (state === "unsupported") return null;
	const enable = async () => {
		const result = await requestNotificationPermission();
		setState(result);
		if (result === "granted") try {
			await registerPushNotifications();
			await showNotification({
				title: "Alerts are on",
				body: "You'll be notified here about new messages, bookings, and quote requests.",
				tag: "alerts-on"
			});
			toast.success("Notifications enabled on this device");
		} catch (error) {
			console.error(error);
			toast.error("Could not enable push alerts on this device. Try again in a moment.");
		}
		else if (result === "denied") toast.error("Notifications blocked — enable them in your browser settings");
	};
	const granted = state === "granted";
	const denied = state === "denied";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => {
			if (!granted) enable();
		},
		disabled: granted,
		title: granted ? "Notifications are on for this device" : denied ? "Blocked — allow notifications in your browser settings" : "Turn on notifications for new messages and bookings",
		className: cn("inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition", granted ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "hover:bg-muted", className),
		children: [granted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellRing, { className: "h-3.5 w-3.5" }) : denied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellOff, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-3.5 w-3.5" }), granted ? "Alerts on" : denied ? "Alerts blocked" : "Enable alerts"]
	});
}
//#endregion
export { NotificationToggle as t };
