import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import rw from "@/locales/rw.json";
import sw from "@/locales/sw.json";
import es from "@/locales/es.json";
import it from "@/locales/it.json";
import pt from "@/locales/pt.json";
import de from "@/locales/de.json";
import zh from "@/locales/zh.json";
import ar from "@/locales/ar.json";
import ko from "@/locales/ko.json";
import ja from "@/locales/ja.json";
import hi from "@/locales/hi.json";

export const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "fr", name: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "rw", name: "Kinyarwanda", flag: "🇷🇼", dir: "ltr" },
  { code: "sw", name: "Kiswahili", flag: "🇹🇿", dir: "ltr" },
  { code: "es", name: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "it", name: "Italiano", flag: "🇮🇹", dir: "ltr" },
  { code: "pt", name: "Português", flag: "🇵🇹", dir: "ltr" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  { code: "zh", name: "中文", flag: "🇨🇳", dir: "ltr" },
  { code: "ar", name: "العربية", flag: "🇸🇦", dir: "rtl" },
  { code: "ko", name: "한국어", flag: "🇰🇷", dir: "ltr" },
  { code: "ja", name: "日本語", flag: "🇯🇵", dir: "ltr" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳", dir: "ltr" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

if (!i18n.isInitialized) {
  void i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en }, fr: { translation: fr }, rw: { translation: rw },
        sw: { translation: sw }, es: { translation: es }, it: { translation: it },
        pt: { translation: pt }, de: { translation: de }, zh: { translation: zh },
        ar: { translation: ar }, ko: { translation: ko }, ja: { translation: ja },
        hi: { translation: hi },
      },
      fallbackLng: "en",
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
        lookupLocalStorage: "edgelink_lang",
      },
    });
}

if (typeof document !== "undefined") {
  const applyDir = (lng: string) => {
    const meta = LANGUAGES.find((l) => l.code === lng);
    document.documentElement.dir = meta?.dir ?? "ltr";
    document.documentElement.lang = lng;
  };
  applyDir(i18n.language || "en");
  i18n.on("languageChanged", applyDir);
}

export default i18n;
