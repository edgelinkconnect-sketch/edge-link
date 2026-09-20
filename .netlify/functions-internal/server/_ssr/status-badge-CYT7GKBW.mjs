import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-badge-CYT7GKBW.js
var import_jsx_runtime = require_jsx_runtime();
var STYLES = {
	pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/15 dark:text-yellow-300",
	under_review: "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300",
	available: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
	approved: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
	confirmed: "bg-forest text-cream",
	completed: "bg-gold/30 text-forest dark:text-gold",
	cancelled: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300",
	rejected: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300"
};
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${STYLES[status] ?? "bg-muted text-foreground"}`,
		children: status.replace("_", " ")
	});
}
//#endregion
export { StatusBadge as t };
