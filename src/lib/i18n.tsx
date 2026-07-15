import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "rw" | "fr" | "sw";

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "rw", label: "RW", flag: "🇷🇼" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "sw", label: "SW", flag: "🇰🇪" },
];

const DICT = {
  en: {
    nav_home: "Home", nav_destinations: "Destinations", nav_tours: "Tours",
    nav_about: "About", nav_dashboard: "Dashboard", nav_admin: "Admin",
    nav_guide: "Guide Panel", nav_media: "Media", nav_support: "Support",
    cta_explore: "Explore Rwanda", cta_book: "Book Tour", cta_view: "View Tours",
    cta_signin: "Sign In", cta_signout: "Sign Out",
    hero_title: "Find Your Rwandan Adventure",
    hero_sub: "Luxury safaris and expedition tours across the Land of a Thousand Hills.",
    search_destination: "Destination", search_date: "Travel date", search_group: "Group size",
    search_go: "Search",
    section_featured: "Featured Journeys",
    section_featured_sub: "Curated, small-group expeditions to Rwanda's most spectacular parks.",
    section_testimonials: "Client Testimonials",
    section_highlights: "Key Highlights",
    from: "From", per_person: "/ person", duration: "Duration", difficulty: "Difficulty",
    day: "Day", days: "days", night: "night", nights: "nights",
    book_now: "Book Now", learn_more: "Learn More",
  },
  rw: {
    nav_home: "Ahabanza", nav_destinations: "Aho Kujya", nav_tours: "Ingendo",
    nav_about: "Abo Turi bo", nav_dashboard: "Ikibaho", nav_admin: "Umuyobozi",
    nav_guide: "Umuyobozi w'Urugendo", nav_media: "Amashusho", nav_support: "Ubufasha",
    cta_explore: "Sura u Rwanda", cta_book: "Sura Ubukerarugendo", cta_view: "Reba Ingendo",
    cta_signin: "Injira", cta_signout: "Sohoka",
    hero_title: "Shakisha Urugendo rwawe mu Rwanda",
    hero_sub: "Safari zo mu rwego rwo hejuru ku Gihugu cy'Imisozi Igihumbi.",
    search_destination: "Aho Ujya", search_date: "Itariki", search_group: "Umubare",
    search_go: "Shakisha",
    section_featured: "Ingendo Zihariye",
    section_featured_sub: "Ingendo zitondewe za pariki za Rwanda zikomeye.",
    section_testimonials: "Ibitekerezo by'Abakiriya",
    section_highlights: "Ibiranga",
    from: "Kuva", per_person: "/ umuntu", duration: "Igihe", difficulty: "Urwego",
    day: "Umunsi", days: "iminsi", night: "ijoro", nights: "amajoro",
    book_now: "Sura Ubu", learn_more: "Menya Byinshi",
  },
  fr: {
    nav_home: "Accueil", nav_destinations: "Destinations", nav_tours: "Circuits",
    nav_about: "À propos", nav_dashboard: "Tableau", nav_admin: "Admin",
    nav_guide: "Panneau Guide", nav_media: "Médias", nav_support: "Support",
    cta_explore: "Explorer le Rwanda", cta_book: "Réserver", cta_view: "Voir les Circuits",
    cta_signin: "Se connecter", cta_signout: "Déconnexion",
    hero_title: "Trouvez Votre Aventure Rwandaise",
    hero_sub: "Safaris de luxe au Pays des Mille Collines.",
    search_destination: "Destination", search_date: "Date", search_group: "Groupe",
    search_go: "Rechercher",
    section_featured: "Voyages Vedettes",
    section_featured_sub: "Expéditions en petit groupe dans les plus beaux parcs.",
    section_testimonials: "Témoignages",
    section_highlights: "Points forts",
    from: "Dès", per_person: "/ personne", duration: "Durée", difficulty: "Difficulté",
    day: "Jour", days: "jours", night: "nuit", nights: "nuits",
    book_now: "Réserver", learn_more: "En savoir plus",
  },
  sw: {
    nav_home: "Nyumbani", nav_destinations: "Vituo", nav_tours: "Ziara",
    nav_about: "Kuhusu", nav_dashboard: "Dashibodi", nav_admin: "Msimamizi",
    nav_guide: "Paneli ya Kiongozi", nav_media: "Midia", nav_support: "Msaada",
    cta_explore: "Chunguza Rwanda", cta_book: "Weka Uhifadhi", cta_view: "Angalia Ziara",
    cta_signin: "Ingia", cta_signout: "Toka",
    hero_title: "Pata Safari Yako ya Rwanda",
    hero_sub: "Safari za kifahari katika Nchi ya Milima Elfu.",
    search_destination: "Kituo", search_date: "Tarehe", search_group: "Kundi",
    search_go: "Tafuta",
    section_featured: "Safari Maalum",
    section_featured_sub: "Safari za kikundi kidogo katika mbuga bora.",
    section_testimonials: "Ushuhuda wa Wateja",
    section_highlights: "Vivutio",
    from: "Kuanzia", per_person: "/ mtu", duration: "Muda", difficulty: "Ugumu",
    day: "Siku", days: "siku", night: "usiku", nights: "usiku",
    book_now: "Weka Sasa", learn_more: "Jifunze Zaidi",
  },
} as const;

type Key = keyof typeof DICT["en"];

const I18nCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string }>({
  lang: "en", setLang: () => {}, t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("rwiza-lang") as Lang | null) : null;
    if (saved && ["en", "rw", "fr", "sw"].includes(saved)) setLangState(saved);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("rwiza-lang", l);
  };
  const t = (k: Key) => (DICT[lang] as Record<string, string>)[k] ?? DICT.en[k];
  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);
