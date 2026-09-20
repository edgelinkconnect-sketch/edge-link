export const WHATSAPP_NUMBER = "250791900016";

export function normalizeWhatsappNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("0")) return `250${digits.slice(1)}`;
  return digits;
}

export function whatsappUrl(message: string, number = WHATSAPP_NUMBER) {
  const target = normalizeWhatsappNumber(number) || WHATSAPP_NUMBER;
  return `https://wa.me/${target}?text=${encodeURIComponent(message)}`;
}
