import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DoLBO0al.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-CiSvnN9i.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as useAuth } from "./router-s5e8-avL.mjs";
import { t as Card } from "./card-BYsnRyjM.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as DashboardShell } from "./dashboard-shell--xLCWXxd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.profile-5FEFcTXE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const { user } = useAuth();
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		supabase.from("profiles").select("*").eq("id", user.id).maybeSingle().then(({ data }) => {
			if (data) {
				setFullName(data.full_name ?? "");
				setPhone(data.phone ?? "");
			}
		});
	}, [user]);
	const save = async (e) => {
		e.preventDefault();
		if (!user) return;
		setBusy(true);
		const { error } = await supabase.from("profiles").upsert({
			id: user.id,
			full_name: fullName,
			phone
		});
		setBusy(false);
		if (error) return toast.error(error.message);
		toast.success("Profile saved");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		title: "Profile",
		description: "Your contact details and preferences.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "max-w-2xl p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: save,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "email",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "email",
						value: user?.email ?? "",
						disabled: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "fullName",
						children: "Full name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "fullName",
						value: fullName,
						onChange: (e) => setFullName(e.target.value),
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "phone",
						children: "Phone"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "phone",
						value: phone,
						onChange: (e) => setPhone(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "bg-forest text-cream",
						disabled: busy,
						children: "Save changes"
					})
				]
			})
		})
	});
}
//#endregion
export { ProfilePage as component };
