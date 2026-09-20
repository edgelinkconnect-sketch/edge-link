//#region node_modules/.nitro/vite/services/ssr/assets/whatsapp-DocSP22n.js
var WHATSAPP_NUMBER = "250791900016";
function normalizeWhatsappNumber(phone) {
	const digits = phone.replace(/\D/g, "");
	if (!digits) return "";
	if (digits.startsWith("0")) return `250${digits.slice(1)}`;
	return digits;
}
function whatsappUrl(message, number = WHATSAPP_NUMBER) {
	return `https://wa.me/${normalizeWhatsappNumber(number) || "250791900016"}?text=${encodeURIComponent(message)}`;
}
//#endregion
export { whatsappUrl as n, WHATSAPP_NUMBER as t };
