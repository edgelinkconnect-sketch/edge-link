import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { i as stringType, n as enumType, r as objectType, t as arrayType } from "../_libs/zod.mjs";
import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./server-CvhsHXqw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inquiries.functions-B_nw2WKA.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var inquirySchema = objectType({
	full_name: stringType().trim().min(2).max(120),
	email: stringType().trim().email().max(255),
	phone: stringType().trim().min(4).max(40),
	destinations: arrayType(enumType([
		"volcanoes",
		"akagera",
		"nyungwe"
	])).min(1).max(3),
	trip_duration: stringType().max(60).optional(),
	group_size: stringType().max(60).optional(),
	budget_range: stringType().max(60).optional(),
	travel_date: stringType().optional(),
	special_requirements: stringType().max(2e3).optional(),
	heard_from: stringType().max(120).optional()
});
var newsletterSchema = objectType({ email: stringType().trim().email().max(255) });
function serverClient() {
	const url = process.env.SUPABASE_URL;
	const key = process.env.SUPABASE_PUBLISHABLE_KEY;
	return createClient(url, key, {
		auth: {
			persistSession: false,
			autoRefreshToken: false,
			storage: void 0
		},
		global: { fetch: (input, init) => {
			const h = new Headers(init?.headers);
			if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
			h.set("apikey", key);
			return fetch(input, {
				...init,
				headers: h
			});
		} }
	});
}
var submitInquiry_createServerFn_handler = createServerRpc({
	id: "91320a5771b7bd16fea166384a6f51abe2a881df9a7d3131cad1b3f7d9e6a608",
	name: "submitInquiry",
	filename: "src/lib/inquiries.functions.ts"
}, (opts) => submitInquiry.__executeServer(opts));
var submitInquiry = createServerFn({ method: "POST" }).inputValidator((raw) => inquirySchema.parse(raw)).handler(submitInquiry_createServerFn_handler, async ({ data }) => {
	const { error } = await serverClient().from("inquiries").insert({
		...data,
		travel_date: data.travel_date || null
	});
	if (error) throw new Error(error.message);
	return { ok: true };
});
var subscribeNewsletter_createServerFn_handler = createServerRpc({
	id: "540c525aa0a7052979ba9bf807a4851175c4cdab6118647916867e035b22f02e",
	name: "subscribeNewsletter",
	filename: "src/lib/inquiries.functions.ts"
}, (opts) => subscribeNewsletter.__executeServer(opts));
var subscribeNewsletter = createServerFn({ method: "POST" }).inputValidator((raw) => newsletterSchema.parse(raw)).handler(subscribeNewsletter_createServerFn_handler, async ({ data }) => {
	const { error } = await serverClient().from("newsletter_subscribers").insert(data);
	if (error && !error.message.includes("duplicate")) throw new Error(error.message);
	return { ok: true };
});
//#endregion
export { submitInquiry_createServerFn_handler, subscribeNewsletter_createServerFn_handler };
