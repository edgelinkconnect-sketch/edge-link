import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-CiSvnN9i.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { P as MessageSquare } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as useAuth } from "./router-s5e8-avL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ask-specialist-BG0Isyw9.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Sends the traveller straight into the live chat system.
* Signed out → bounced to /auth with a clear explanation and a redirect back.
*/
function AskSpecialistButton({ className, variant, size = "default", label }) {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const go = () => {
		if (user) {
			navigate({ to: "/dashboard/chat" });
			return;
		}
		toast.info(t("specialist.signInTitle"), { description: t("specialist.signInBody") });
		navigate({
			to: "/auth",
			search: { redirect: "/dashboard/chat" }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		onClick: go,
		variant,
		size,
		className: cn(className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "mr-2 h-4 w-4" }), label ?? t("specialist.cta")]
	});
}
//#endregion
export { AskSpecialistButton as t };
