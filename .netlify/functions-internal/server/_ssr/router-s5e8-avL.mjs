import { o as __toESM } from "../_runtime.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { t as supabase } from "./client-DoLBO0al.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link, f as createRouter, g as createRootRouteWithContext, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, x as useRouter, z as redirect } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-CiSvnN9i.mjs";
import { t as instance } from "../_libs/i18next.mjs";
import { n as initReactI18next, t as useTranslation } from "../_libs/react-i18next.mjs";
import { t as Browser } from "../_libs/i18next-browser-languagedetector+[...].mjs";
import { $ as Headphones, B as Mail, E as Phone, F as MessageCircle, H as LogIn, I as Menu, J as Instagram, K as Leaf, L as Maximize2, M as Monitor, Q as HeartHandshake, S as Recycle, Tt as Award, _t as ChevronDown, c as TreePine, et as Globe, g as ShieldCheck, gt as ChevronRight, i as User, j as Moon, n as WifiOff, o as Twitter, ot as Droplets, pt as Circle, r as Users, rt as Facebook, st as Download, t as X, u as Sun, v as Send, vt as Check, z as MapPin } from "../_libs/lucide-react.mjs";
import { a as Label2, c as Root2, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2, o as Portal2, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { i as stringType, n as enumType, r as objectType } from "../_libs/zod.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as motion, r as AnimatePresence } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-auth-BDfGB1Ow.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AuthContext = (0, import_react.createContext)({
	user: null,
	session: null,
	role: null,
	loading: true,
	isAdmin: false,
	signOut: async () => {}
});
function AuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [user, setUser] = (0, import_react.useState)(null);
	const [role, setRole] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const qc = useQueryClient();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		let mounted = true;
		const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
			if (!mounted) return;
			setSession(s);
			setUser(s?.user ?? null);
			if (!s?.user) setRole(null);
			if (s?.user) setTimeout(() => {
				fetchRole(s.user.id);
			}, 0);
			if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
				router.invalidate();
				if (event !== "SIGNED_OUT") qc.invalidateQueries();
			}
		});
		supabase.auth.getSession().then(({ data }) => {
			if (!mounted) return;
			setSession(data.session);
			setUser(data.session?.user ?? null);
			if (data.session?.user) fetchRole(data.session.user.id);
			setLoading(false);
		});
		async function fetchRole(uid) {
			const { data } = await supabase.from("user_roles").select("role").eq("user_id", uid);
			if (!mounted) return;
			const roles = (data ?? []).map((r) => r.role);
			if (roles.includes("admin")) setRole("admin");
			else if (roles.includes("client")) setRole("client");
			else setRole("client");
		}
		return () => {
			mounted = false;
			sub.subscription.unsubscribe();
		};
	}, [qc, router]);
	const signOut = async () => {
		await qc.cancelQueries();
		qc.clear();
		await supabase.auth.signOut();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			user,
			session,
			role,
			loading,
			isAdmin: role === "admin",
			signOut
		},
		children
	});
}
function useAuth() {
	return (0, import_react.useContext)(AuthContext);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/i18n-CSz97DaV.js
var en_default = {
	brand: {
		"name": "EDGELINK",
		"tagline": "Tours"
	},
	nav: {
		"home": "Home",
		"destinations": "Destinations",
		"tours": "Tours",
		"packages": "Itineraries",
		"gallery": "Gallery",
		"sustainability": "Sustainability",
		"journal": "Journal",
		"faq": "FAQ",
		"about": "About",
		"contact": "Contact",
		"bookNow": "Book Now",
		"signIn": "Sign in",
		"signOut": "Sign out",
		"dashboard": "Dashboard",
		"admin": "Admin",
		"createAccount": "Create account",
		"myDashboard": "My dashboard",
		"adminPanel": "Admin panel",
		"explore": "Tours & Itineraries"
	},
	theme: {
		"toggle": "Toggle theme",
		"light": "Light",
		"dark": "Dark",
		"system": "System"
	},
	common: {
		"loading": "Loading…",
		"save": "Save",
		"cancel": "Cancel",
		"delete": "Delete",
		"edit": "Edit",
		"create": "Create",
		"update": "Update",
		"confirm": "Confirm",
		"back": "Back",
		"next": "Next",
		"previous": "Previous",
		"search": "Search",
		"filter": "Filter",
		"all": "All",
		"yes": "Yes",
		"no": "No",
		"close": "Close",
		"submit": "Submit",
		"sending": "Sending…",
		"saving": "Saving…",
		"processing": "Processing…",
		"upload": "Upload",
		"uploading": "Uploading…",
		"download": "Download",
		"view": "View",
		"actions": "Actions",
		"status": "Status",
		"name": "Name",
		"email": "Email",
		"phone": "Phone",
		"date": "Date",
		"price": "Price",
		"duration": "Duration",
		"location": "Location",
		"description": "Description",
		"notes": "Notes",
		"optional": "optional",
		"required": "required",
		"readMore": "Read more",
		"learnMore": "Learn more",
		"viewAll": "View all",
		"getStarted": "Get started",
		"comingSoon": "Coming soon",
		"empty": "Nothing here yet",
		"error": "Something went wrong",
		"success": "Success",
		"day": "day",
		"days": "days",
		"person": "person",
		"people": "people",
		"from": "from",
		"perPerson": "per person"
	},
	home: {
		"heroTitle": "Journeys crafted for a lifetime",
		"heroSubtitle": "Luxury gorilla trekking, Big Five safaris, and rainforest expeditions across Rwanda's most breathtaking landscapes.",
		"exploreTours": "Explore tours",
		"planTrip": "Plan your trip",
		"whyEdgelink": "Why EDGELINK",
		"featuredDestinations": "Featured destinations",
		"featuredTours": "Signature journeys",
		"testimonials": "What our guests say",
		"newsletter": "Stay in touch",
		"newsletterSub": "Field notes, new expeditions, and season-by-season inspiration.",
		"subscribe": "Subscribe",
		"yourEmail": "Your email"
	},
	why: {
		"expertGuides": "Expert Guides",
		"expertGuidesBody": "Rwanda-born, RDB-certified, 20+ years in the field.",
		"luxuryLodges": "Luxury Lodges",
		"luxuryLodgesBody": "Singita, Wilderness Safaris, One&Only — the country's finest.",
		"customItineraries": "Custom Itineraries",
		"customItinerariesBody": "Every trip designed around your pace, tastes, and dreams.",
		"sustainable": "Sustainable Travel",
		"sustainableBody": "Carbon-neutral, community-owned, park-fee positive."
	},
	destinations: {
		"title": "Rwanda's finest destinations",
		"subtitle": "Five distinct worlds within a single day's drive.",
		"viewDestination": "View destination"
	},
	tours: {
		"title": "Our tours",
		"subtitle": "Signature journeys crafted by Rwanda-born guides.",
		"filterActivity": "Activity",
		"filterDifficulty": "Difficulty",
		"filterRegion": "Region",
		"highlights": "Highlights",
		"itinerary": "Itinerary",
		"included": "What's included",
		"excluded": "What's not included",
		"guidelines": "Guidelines",
		"bestTime": "Best time to visit",
		"groupSize": "Max group",
		"bookThisTour": "Book this tour",
		"requestBooking": "Request booking",
		"relatedGallery": "From this location",
		"difficultyEasy": "Easy",
		"difficultyModerate": "Moderate",
		"difficultyChallenging": "Challenging",
		"noResults": "No tours match your filters."
	},
	gallery: {
		"title": "Gallery",
		"subtitle": "Field images captured by our guides and guests.",
		"filterLocation": "Filter by location",
		"empty": "No images yet."
	},
	contact: {
		"title": "Plan your journey",
		"subtitle": "Tell us about your dream trip. We reply within 24 hours.",
		"fullName": "Full name",
		"emailAddress": "Email address",
		"phoneNumber": "Phone / WhatsApp",
		"country": "Country of residence",
		"adults": "Adults",
		"children": "Children",
		"childrenAges": "Children ages",
		"travelStart": "Preferred start date",
		"travelEnd": "Preferred end date",
		"budget": "Budget (USD)",
		"travelStyle": "Travel style",
		"interests": "Interests",
		"message": "Tell us more",
		"howHeard": "How did you hear about us?",
		"send": "Send inquiry",
		"sendWhatsApp": "Send via WhatsApp",
		"success": "Thanks — we'll be in touch within 24 hours.",
		"chooseTour": "Choose a tour"
	},
	auth: {
		"signIn": "Sign in",
		"signUp": "Create account",
		"email": "Email address",
		"password": "Password",
		"fullName": "Full name",
		"phone": "Phone number",
		"forgotPassword": "Forgot password?",
		"haveAccount": "Already have an account?",
		"noAccount": "Don't have an account?",
		"signInSubtitle": "Welcome back — sign in to continue.",
		"signUpSubtitle": "Join EDGELINK to book journeys and share experiences.",
		"resetTitle": "Reset your password",
		"resetSubtitle": "We'll email you a secure link.",
		"sendReset": "Send reset link",
		"signInSuccess": "Welcome back!",
		"signUpSuccess": "Account created — you're signed in.",
		"signOutSuccess": "Signed out."
	},
	dashboard: {
		"title": "My dashboard",
		"welcome": "Welcome back",
		"myBookings": "My bookings",
		"myExperiences": "Shared experiences",
		"myProfile": "Profile",
		"chatSupport": "Chat with us",
		"upcomingTrips": "Upcoming trips",
		"totalBookings": "Total bookings",
		"sharedExperiences": "Shared experiences",
		"noBookings": "You have no bookings yet.",
		"startBooking": "Start planning",
		"cancelBooking": "Cancel booking",
		"shareExperience": "Share your experience",
		"shareExperienceOnly": "You can share experiences only for completed trips.",
		"rating": "Rating",
		"photos": "Photos",
		"yourMessage": "Your message",
		"publish": "Publish for review"
	},
	admin: {
		"overview": "Overview",
		"tours": "Tours",
		"gallery": "Gallery",
		"journal": "Journal",
		"bookings": "Bookings",
		"experiences": "Experiences",
		"chat": "Chat",
		"stats": {
			"totalTours": "Total tours",
			"galleryImages": "Gallery images",
			"totalBookings": "Total bookings",
			"openChats": "Open chats",
			"pendingExperiences": "Pending experiences"
		},
		"toursCrud": {
			"newTour": "New tour",
			"editTour": "Edit tour",
			"deleteConfirm": "Delete this tour? This cannot be undone.",
			"duplicate": "Duplicate",
			"activate": "Activate",
			"deactivate": "Deactivate",
			"slug": "Slug (URL)",
			"region": "Region",
			"activity": "Activity type",
			"heroImage": "Hero image",
			"highlights": "Highlights (one per line)",
			"included": "Included (one per line)",
			"excluded": "Excluded (one per line)",
			"difficulty": "Difficulty",
			"maxGroup": "Max group size",
			"bestTime": "Best time",
			"priceLabel": "Price (USD)",
			"durationLabel": "Duration (e.g. 3 days)",
			"empty": "No tours yet — create your first."
		},
		"galleryCrud": {
			"upload": "Upload images",
			"removeAi": "Remove AI images",
			"removeAiConfirm": "Delete every image flagged as AI-generated?",
			"markAi": "Mark as AI",
			"unmarkAi": "Unmark AI",
			"bulkDelete": "Delete selected",
			"caption": "Caption",
			"photographer": "Photographer",
			"tags": "Tags (comma separated)",
			"featured": "Featured",
			"isAi": "AI-generated",
			"dragDrop": "Drag & drop images here, or click to browse",
			"empty": "Gallery is empty."
		},
		"bookingsAdmin": {
			"filterStatus": "Status",
			"changeStatus": "Change status",
			"exportCsv": "Export CSV",
			"adminNotes": "Admin notes",
			"empty": "No bookings yet."
		},
		"experiencesAdmin": {
			"approve": "Approve",
			"reject": "Reject",
			"onApprove": "Photos will be added to the gallery on approval.",
			"empty": "No experiences submitted."
		}
	},
	status: {
		"pending": "Pending",
		"confirmed": "Confirmed",
		"completed": "Completed",
		"cancelled": "Cancelled",
		"approved": "Approved",
		"rejected": "Rejected",
		"active": "Active",
		"inactive": "Inactive",
		"draft": "Draft"
	},
	activity: {
		"gorilla": "Gorilla Trekking",
		"safari": "Safari",
		"hiking": "Hiking",
		"cultural": "Cultural",
		"birdwatching": "Bird watching",
		"kayaking": "Kayaking"
	},
	footer: {
		"company": "Company",
		"explore": "Explore",
		"support": "Support",
		"legal": "Legal",
		"followUs": "Follow us",
		"rights": "All rights reserved.",
		"privacy": "Privacy",
		"terms": "Terms"
	},
	specialist: {
		"cta": "Ask a specialist",
		"signInTitle": "Sign in to chat with a specialist",
		"signInBody": "Create a free account or sign in to open a live conversation with our travel designers."
	},
	hub: {
		"eyebrow": "Explore",
		"title": "Tours, destinations & itineraries",
		"subtitle": "One place for every EDGELINK journey — filter by park, activity or trip length.",
		"region": "Destination",
		"activity": "Activity",
		"duration": "Trip length",
		"all": "All",
		"empty": "No journeys match those filters yet.",
		"view": "View journey",
		"from": "From",
		"results_one": "{{count}} journey",
		"results_other": "{{count}} journeys"
	},
	dashboardNav: {
		"overview": "Overview",
		"bookings": "Bookings",
		"chat": "Chat",
		"experiences": "Experiences",
		"profile": "Profile"
	},
	team: {
		"eyebrow": "Our people",
		"title": "Meet the team",
		"subtitle": "Guides, planners and conservationists who make every journey personal."
	}
};
var fr_default = {
	brand: {
		"name": "EDGELINK",
		"tagline": "Excursions"
	},
	nav: {
		"home": "Accueil",
		"destinations": "Destinations",
		"tours": "Circuits",
		"packages": "Itinéraires",
		"gallery": "Galerie",
		"sustainability": "Durabilité",
		"journal": "Journal",
		"faq": "FAQ",
		"about": "À propos",
		"contact": "Contact",
		"bookNow": "Réserver",
		"signIn": "Se connecter",
		"signOut": "Déconnexion",
		"dashboard": "Tableau de bord",
		"admin": "Admin",
		"createAccount": "Créer un compte",
		"myDashboard": "Mon tableau de bord",
		"adminPanel": "Panneau admin",
		"explore": "Circuits & itinéraires"
	},
	theme: {
		"toggle": "Changer le thème",
		"light": "Clair",
		"dark": "Sombre",
		"system": "Système"
	},
	common: {
		"loading": "Chargement…",
		"save": "Enregistrer",
		"cancel": "Annuler",
		"delete": "Supprimer",
		"edit": "Modifier",
		"create": "Créer",
		"update": "Mettre à jour",
		"confirm": "Confirmer",
		"back": "Retour",
		"next": "Suivant",
		"previous": "Précédent",
		"search": "Rechercher",
		"filter": "Filtrer",
		"all": "Tous",
		"yes": "Oui",
		"no": "Non",
		"close": "Fermer",
		"submit": "Envoyer",
		"sending": "Envoi…",
		"saving": "Enregistrement…",
		"processing": "Traitement…",
		"upload": "Téléverser",
		"uploading": "Téléversement…",
		"download": "Télécharger",
		"view": "Voir",
		"actions": "Actions",
		"status": "Statut",
		"name": "Nom",
		"email": "E-mail",
		"phone": "Téléphone",
		"date": "Date",
		"price": "Prix",
		"duration": "Durée",
		"location": "Lieu",
		"description": "Description",
		"notes": "Notes",
		"optional": "optionnel",
		"required": "requis",
		"readMore": "Lire plus",
		"learnMore": "En savoir plus",
		"viewAll": "Voir tout",
		"getStarted": "Commencer",
		"comingSoon": "Bientôt",
		"empty": "Rien pour l'instant",
		"error": "Une erreur s'est produite",
		"success": "Succès",
		"day": "jour",
		"days": "jours",
		"person": "personne",
		"people": "personnes",
		"from": "à partir de",
		"perPerson": "par personne"
	},
	home: {
		"heroTitle": "Des voyages conçus pour toute une vie",
		"heroSubtitle": "Trekking de luxe des gorilles, safaris Big Five et expéditions en forêt tropicale à travers les paysages les plus époustouflants du Rwanda.",
		"exploreTours": "Explorer les circuits",
		"planTrip": "Planifier votre voyage",
		"whyEdgelink": "Pourquoi EDGELINK",
		"featuredDestinations": "Destinations phares",
		"featuredTours": "Voyages signature",
		"testimonials": "Ce que disent nos clients",
		"newsletter": "Restez en contact",
		"newsletterSub": "Carnets de terrain, nouvelles expéditions et inspiration saisonnière.",
		"subscribe": "S'abonner",
		"yourEmail": "Votre e-mail"
	},
	why: {
		"expertGuides": "Guides experts",
		"expertGuidesBody": "Nés au Rwanda, certifiés RDB, plus de 20 ans d'expérience.",
		"luxuryLodges": "Lodges de luxe",
		"luxuryLodgesBody": "Singita, Wilderness Safaris, One&Only — les meilleurs du pays.",
		"customItineraries": "Itinéraires sur mesure",
		"customItinerariesBody": "Chaque voyage conçu autour de votre rythme et de vos rêves.",
		"sustainable": "Voyage durable",
		"sustainableBody": "Neutre en carbone, communautaire, positif pour les parcs."
	},
	destinations: {
		"title": "Les plus belles destinations du Rwanda",
		"subtitle": "Cinq mondes distincts à moins d'une journée de route.",
		"viewDestination": "Voir la destination"
	},
	tours: {
		"title": "Nos circuits",
		"subtitle": "Voyages signature créés par des guides rwandais.",
		"filterActivity": "Activité",
		"filterDifficulty": "Difficulté",
		"filterRegion": "Région",
		"highlights": "Points forts",
		"itinerary": "Itinéraire",
		"included": "Inclus",
		"excluded": "Non inclus",
		"guidelines": "Consignes",
		"bestTime": "Meilleure période",
		"groupSize": "Groupe max",
		"bookThisTour": "Réserver ce circuit",
		"requestBooking": "Demander une réservation",
		"relatedGallery": "Depuis ce lieu",
		"difficultyEasy": "Facile",
		"difficultyModerate": "Modéré",
		"difficultyChallenging": "Difficile",
		"noResults": "Aucun circuit ne correspond."
	},
	gallery: {
		"title": "Galerie",
		"subtitle": "Images capturées par nos guides et voyageurs.",
		"filterLocation": "Filtrer par lieu",
		"empty": "Aucune image."
	},
	contact: {
		"title": "Planifiez votre voyage",
		"subtitle": "Parlez-nous de votre rêve. Réponse sous 24h.",
		"fullName": "Nom complet",
		"emailAddress": "Adresse e-mail",
		"phoneNumber": "Téléphone / WhatsApp",
		"country": "Pays de résidence",
		"adults": "Adultes",
		"children": "Enfants",
		"childrenAges": "Âges des enfants",
		"travelStart": "Date de début souhaitée",
		"travelEnd": "Date de fin souhaitée",
		"budget": "Budget (USD)",
		"travelStyle": "Style de voyage",
		"interests": "Centres d'intérêt",
		"message": "Dites-nous en plus",
		"howHeard": "Comment nous avez-vous connus ?",
		"send": "Envoyer la demande",
		"sendWhatsApp": "Envoyer via WhatsApp",
		"success": "Merci — nous vous répondrons sous 24h.",
		"chooseTour": "Choisir un circuit"
	},
	auth: {
		"signIn": "Se connecter",
		"signUp": "Créer un compte",
		"email": "Adresse e-mail",
		"password": "Mot de passe",
		"fullName": "Nom complet",
		"phone": "Numéro de téléphone",
		"forgotPassword": "Mot de passe oublié ?",
		"haveAccount": "Vous avez déjà un compte ?",
		"noAccount": "Pas encore de compte ?",
		"signInSubtitle": "Ravi de vous revoir — connectez-vous.",
		"signUpSubtitle": "Rejoignez EDGELINK pour réserver et partager.",
		"resetTitle": "Réinitialiser le mot de passe",
		"resetSubtitle": "Nous vous enverrons un lien sécurisé.",
		"sendReset": "Envoyer le lien",
		"signInSuccess": "Bon retour !",
		"signUpSuccess": "Compte créé — vous êtes connecté.",
		"signOutSuccess": "Déconnecté."
	},
	dashboard: {
		"title": "Mon tableau de bord",
		"welcome": "Ravi de vous revoir",
		"myBookings": "Mes réservations",
		"myExperiences": "Expériences partagées",
		"myProfile": "Profil",
		"chatSupport": "Nous contacter",
		"upcomingTrips": "Voyages à venir",
		"totalBookings": "Réservations totales",
		"sharedExperiences": "Expériences partagées",
		"noBookings": "Aucune réservation.",
		"startBooking": "Commencer à planifier",
		"cancelBooking": "Annuler la réservation",
		"shareExperience": "Partagez votre expérience",
		"shareExperienceOnly": "Uniquement pour les voyages terminés.",
		"rating": "Note",
		"photos": "Photos",
		"yourMessage": "Votre message",
		"publish": "Publier pour examen"
	},
	admin: {
		"overview": "Vue d'ensemble",
		"tours": "Circuits",
		"gallery": "Galerie",
		"bookings": "Réservations",
		"experiences": "Expériences",
		"chat": "Chat",
		"stats": {
			"totalTours": "Circuits totaux",
			"galleryImages": "Images galerie",
			"totalBookings": "Réservations totales",
			"openChats": "Chats ouverts",
			"pendingExperiences": "Expériences en attente"
		},
		"toursCrud": {
			"newTour": "Nouveau circuit",
			"editTour": "Modifier le circuit",
			"deleteConfirm": "Supprimer ce circuit ?",
			"duplicate": "Dupliquer",
			"activate": "Activer",
			"deactivate": "Désactiver",
			"slug": "Slug (URL)",
			"region": "Région",
			"activity": "Type d'activité",
			"heroImage": "Image principale",
			"highlights": "Points forts (un par ligne)",
			"included": "Inclus (un par ligne)",
			"excluded": "Exclus (un par ligne)",
			"difficulty": "Difficulté",
			"maxGroup": "Taille max groupe",
			"bestTime": "Meilleure période",
			"priceLabel": "Prix (USD)",
			"durationLabel": "Durée (ex. 3 jours)",
			"empty": "Aucun circuit — créez le premier."
		},
		"galleryCrud": {
			"upload": "Téléverser des images",
			"removeAi": "Supprimer images IA",
			"removeAiConfirm": "Supprimer toutes les images marquées IA ?",
			"markAi": "Marquer IA",
			"unmarkAi": "Démarquer IA",
			"bulkDelete": "Supprimer sélection",
			"caption": "Légende",
			"photographer": "Photographe",
			"tags": "Étiquettes (séparées par virgule)",
			"featured": "En vedette",
			"isAi": "Généré par IA",
			"dragDrop": "Glissez-déposez des images ici, ou cliquez",
			"empty": "La galerie est vide."
		},
		"bookingsAdmin": {
			"filterStatus": "Statut",
			"changeStatus": "Changer le statut",
			"exportCsv": "Exporter CSV",
			"adminNotes": "Notes admin",
			"empty": "Aucune réservation."
		},
		"experiencesAdmin": {
			"approve": "Approuver",
			"reject": "Rejeter",
			"onApprove": "Les photos rejoindront la galerie à l'approbation.",
			"empty": "Aucune expérience soumise."
		}
	},
	status: {
		"pending": "En attente",
		"confirmed": "Confirmé",
		"completed": "Terminé",
		"cancelled": "Annulé",
		"approved": "Approuvé",
		"rejected": "Rejeté",
		"active": "Actif",
		"inactive": "Inactif",
		"draft": "Brouillon"
	},
	activity: {
		"gorilla": "Trekking gorilles",
		"safari": "Safari",
		"hiking": "Randonnée",
		"cultural": "Culturel",
		"birdwatching": "Observation d'oiseaux",
		"kayaking": "Kayak"
	},
	footer: {
		"company": "Entreprise",
		"explore": "Explorer",
		"support": "Support",
		"legal": "Légal",
		"followUs": "Suivez-nous",
		"rights": "Tous droits réservés.",
		"privacy": "Confidentialité",
		"terms": "Conditions"
	},
	specialist: {
		"cta": "Parler à un spécialiste",
		"signInTitle": "Connectez-vous pour discuter",
		"signInBody": "Créez un compte gratuit ou connectez-vous pour ouvrir une conversation avec nos concepteurs de voyages."
	},
	hub: {
		"eyebrow": "Explorer",
		"title": "Circuits, destinations et itinéraires",
		"subtitle": "Un seul endroit pour tous les voyages EDGELINK — filtrez par parc, activité ou durée.",
		"region": "Destination",
		"activity": "Activité",
		"duration": "Durée",
		"all": "Tout",
		"empty": "Aucun voyage ne correspond à ces filtres.",
		"view": "Voir le voyage",
		"from": "À partir de",
		"results_one": "{{count}} voyage",
		"results_other": "{{count}} voyages"
	},
	dashboardNav: {
		"overview": "Aperçu",
		"bookings": "Réservations",
		"chat": "Discussion",
		"experiences": "Expériences",
		"profile": "Profil"
	},
	team: {
		"eyebrow": "Notre équipe",
		"title": "Rencontrez l'équipe",
		"subtitle": "Guides, planificateurs et défenseurs de la nature qui rendent chaque voyage unique."
	}
};
var rw_default = {
	brand: {
		"name": "EDGELINK",
		"tagline": "Ingendo"
	},
	nav: {
		"home": "Ahabanza",
		"destinations": "Aho ujya",
		"tours": "Ingendo",
		"packages": "Gahunda",
		"gallery": "Amashusho",
		"sustainability": "Kurambya",
		"journal": "Ikinyamakuru",
		"faq": "Ibibazo",
		"about": "Ibyerekeye",
		"contact": "Twandikire",
		"bookNow": "Buka Nonaha",
		"signIn": "Injira",
		"signOut": "Sohoka",
		"dashboard": "Ikibaho",
		"admin": "Umuyobozi",
		"createAccount": "Kora konti",
		"myDashboard": "Ikibaho cyanjye",
		"adminPanel": "Igice cy'umuyobozi",
		"explore": "Ingendo n'Ingengabihe"
	},
	theme: {
		"toggle": "Hindura ibara",
		"light": "Umucyo",
		"dark": "Umwijima",
		"system": "Sisitemu"
	},
	common: {
		"loading": "Biratunganywa…",
		"save": "Bika",
		"cancel": "Kuraho",
		"delete": "Siba",
		"edit": "Hindura",
		"create": "Kora",
		"update": "Vugurura",
		"confirm": "Emeza",
		"back": "Subira",
		"next": "Ibikurikira",
		"previous": "Ibibanjirije",
		"search": "Shakisha",
		"filter": "Shungura",
		"all": "Byose",
		"yes": "Yego",
		"no": "Oya",
		"close": "Funga",
		"submit": "Ohereza",
		"sending": "Kohereza…",
		"saving": "Kubika…",
		"processing": "Gutunganya…",
		"upload": "Ohereza",
		"uploading": "Kohereza…",
		"download": "Kuramo",
		"view": "Reba",
		"actions": "Ibikorwa",
		"status": "Uko bimeze",
		"name": "Izina",
		"email": "Imeri",
		"phone": "Telefoni",
		"date": "Itariki",
		"price": "Igiciro",
		"duration": "Igihe",
		"location": "Aho biherereye",
		"description": "Ibisobanuro",
		"notes": "Ibitekerezo",
		"optional": "bihitamo",
		"required": "birakenewe",
		"readMore": "Soma byinshi",
		"learnMore": "Menya byinshi",
		"viewAll": "Reba byose",
		"getStarted": "Tangira",
		"comingSoon": "Bizaza",
		"empty": "Nta kintu",
		"error": "Habaye ikibazo",
		"success": "Byagenze neza",
		"day": "umunsi",
		"days": "iminsi",
		"person": "umuntu",
		"people": "abantu",
		"from": "kuva",
		"perPerson": "kuri umuntu"
	},
	home: {
		"heroTitle": "Ingendo zishushanijwe iteka",
		"heroSubtitle": "Kwiga ingagi mu buryo bwiza, safari z'inyamaswa eshanu, no gukora ingendo mu mashyamba y'u Rwanda.",
		"exploreTours": "Reba ingendo",
		"planTrip": "Tegura urugendo",
		"whyEdgelink": "Kuki EDGELINK",
		"featuredDestinations": "Ahantu hazwi",
		"featuredTours": "Ingendo z'akarusho",
		"testimonials": "Icyo abagenzi bavuga",
		"newsletter": "Gumana natwe",
		"newsletterSub": "Amakuru y'ingendo n'ibiganiro bishya.",
		"subscribe": "Iyandikishe",
		"yourEmail": "Imeri yawe"
	},
	why: {
		"expertGuides": "Abayobozi b'inzobere",
		"expertGuidesBody": "Bavukiye mu Rwanda, bemewe na RDB, imyaka 20+ y'ubunararibonye.",
		"luxuryLodges": "Amazu y'ubwiza",
		"luxuryLodgesBody": "Singita, Wilderness Safaris, One&Only — meza cyane.",
		"customItineraries": "Gahunda zihariye",
		"customItinerariesBody": "Buri rugendo rushushanyijwe hakurikijwe icyifuzo cyawe.",
		"sustainable": "Ubukerarugendo burambye",
		"sustainableBody": "Ntibutera imyanda, bufasha abaturage n'ibigo bya parike."
	},
	destinations: {
		"title": "Ahantu heza mu Rwanda",
		"subtitle": "Isi eshanu zitandukanye mu munsi umwe.",
		"viewDestination": "Reba aho ujya"
	},
	tours: {
		"title": "Ingendo zacu",
		"subtitle": "Ingendo zateguwe n'abayobozi b'Abanyarwanda.",
		"filterActivity": "Igikorwa",
		"filterDifficulty": "Urwego",
		"filterRegion": "Akarere",
		"highlights": "Ingingo z'ingenzi",
		"itinerary": "Gahunda",
		"included": "Ibiri muri iyi gahunda",
		"excluded": "Ibitari muri iyi gahunda",
		"guidelines": "Amabwiriza",
		"bestTime": "Igihe cyiza",
		"groupSize": "Ubwinshi bw'itsinda",
		"bookThisTour": "Buka uru rugendo",
		"requestBooking": "Saba kubuka",
		"relatedGallery": "Muri iki cyanya",
		"difficultyEasy": "Byoroshye",
		"difficultyModerate": "Bikomeye gato",
		"difficultyChallenging": "Bigoye",
		"noResults": "Nta rugendo rubonetse."
	},
	gallery: {
		"title": "Amashusho",
		"subtitle": "Amashusho yafashwe n'abayobozi n'abagenzi.",
		"filterLocation": "Shungura ku hantu",
		"empty": "Nta shusho."
	},
	contact: {
		"title": "Tegura urugendo rwawe",
		"subtitle": "Tubwire urugendo rwawe rwo mu nzozi. Twitaba mu masaha 24.",
		"fullName": "Amazina yombi",
		"emailAddress": "Aderesi ya imeri",
		"phoneNumber": "Telefoni / WhatsApp",
		"country": "Igihugu utuye",
		"adults": "Abakuru",
		"children": "Abana",
		"childrenAges": "Imyaka y'abana",
		"travelStart": "Itariki yo gutangira",
		"travelEnd": "Itariki yo kurangiza",
		"budget": "Ingengo (USD)",
		"travelStyle": "Uburyo bw'urugendo",
		"interests": "Ibyo ukunda",
		"message": "Tubwire byinshi",
		"howHeard": "Watumenye ute?",
		"send": "Ohereza icyifuzo",
		"sendWhatsApp": "Ohereza kuri WhatsApp",
		"success": "Murakoze — tuzabahamagara mu masaha 24.",
		"chooseTour": "Hitamo urugendo"
	},
	auth: {
		"signIn": "Injira",
		"signUp": "Kora konti",
		"email": "Aderesi ya imeri",
		"password": "Ijambo ry'ibanga",
		"fullName": "Amazina yombi",
		"phone": "Nimero ya telefoni",
		"forgotPassword": "Wibagiwe ijambo ry'ibanga?",
		"haveAccount": "Usanzwe ufite konti?",
		"noAccount": "Nta konti ufite?",
		"signInSubtitle": "Murakaza neza — injira ukomeze.",
		"signUpSubtitle": "Jyamo muri EDGELINK ubuke kandi usangire uburambe.",
		"resetTitle": "Vugurura ijambo ry'ibanga",
		"resetSubtitle": "Tuzakwohereza link yizewe.",
		"sendReset": "Ohereza link",
		"signInSuccess": "Murakaza neza!",
		"signUpSuccess": "Konti yakozwe — wakwinjiye.",
		"signOutSuccess": "Wasohotse."
	},
	dashboard: {
		"title": "Ikibaho cyanjye",
		"welcome": "Murakaza neza",
		"myBookings": "Amabuka yanjye",
		"myExperiences": "Uburambe wasangiye",
		"myProfile": "Umwirondoro",
		"chatSupport": "Vugana natwe",
		"upcomingTrips": "Ingendo ziri imbere",
		"totalBookings": "Amabuka yose",
		"sharedExperiences": "Uburambe wasangiye",
		"noBookings": "Nta bubuka.",
		"startBooking": "Tangira gutegura",
		"cancelBooking": "Kuraho ibuka",
		"shareExperience": "Sangira uburambe",
		"shareExperienceOnly": "Ni ku ngendo zarangiye gusa.",
		"rating": "Amanota",
		"photos": "Amashusho",
		"yourMessage": "Ubutumwa bwawe",
		"publish": "Ohereza kubasuzuma"
	},
	admin: {
		"overview": "Incamake",
		"tours": "Ingendo",
		"gallery": "Amashusho",
		"bookings": "Amabuka",
		"experiences": "Uburambe",
		"chat": "Ikiganiro",
		"stats": {
			"totalTours": "Ingendo zose",
			"galleryImages": "Amashusho",
			"totalBookings": "Amabuka yose",
			"openChats": "Ibiganiro bifunguye",
			"pendingExperiences": "Uburambe butegereje"
		},
		"toursCrud": {
			"newTour": "Urugendo rushya",
			"editTour": "Hindura urugendo",
			"deleteConfirm": "Siba uru rugendo?",
			"duplicate": "Gukoporora",
			"activate": "Emerera",
			"deactivate": "Hagarika",
			"slug": "Slug (URL)",
			"region": "Akarere",
			"activity": "Ubwoko bw'igikorwa",
			"heroImage": "Ishusho nyamukuru",
			"highlights": "Ingingo (imwe kuri buri murongo)",
			"included": "Ibiri muri (buri murongo)",
			"excluded": "Ibitari muri (buri murongo)",
			"difficulty": "Urwego",
			"maxGroup": "Ubwinshi bw'itsinda",
			"bestTime": "Igihe cyiza",
			"priceLabel": "Igiciro (USD)",
			"durationLabel": "Igihe (urugero: iminsi 3)",
			"empty": "Nta rugendo — tangiza."
		},
		"galleryCrud": {
			"upload": "Ohereza amashusho",
			"removeAi": "Kuraho amashusho ya AI",
			"removeAiConfirm": "Siba amashusho yose ya AI?",
			"markAi": "Shyiraho AI",
			"unmarkAi": "Kuraho AI",
			"bulkDelete": "Siba byatoranyijwe",
			"caption": "Umutwe",
			"photographer": "Uwafashe",
			"tags": "Ibimenyetso (bitandukanyijwe n'akitso)",
			"featured": "Byatoranyijwe",
			"isAi": "Byakozwe na AI",
			"dragDrop": "Kurura amashusho, cyangwa kanda",
			"empty": "Amashusho nta yaboneka."
		},
		"bookingsAdmin": {
			"filterStatus": "Uko bimeze",
			"changeStatus": "Hindura uko bimeze",
			"exportCsv": "Ohereza CSV",
			"adminNotes": "Ibitekerezo",
			"empty": "Nta bubuka."
		},
		"experiencesAdmin": {
			"approve": "Emeza",
			"reject": "Anga",
			"onApprove": "Amashusho azongerwa mu ishusho iyo yemejwe.",
			"empty": "Nta burambe bwoherejwe."
		}
	},
	status: {
		"pending": "Bitegereje",
		"confirmed": "Byemejwe",
		"completed": "Byarangiye",
		"cancelled": "Byakuweho",
		"approved": "Byemewe",
		"rejected": "Byangiwe",
		"active": "Bikora",
		"inactive": "Ntibikora",
		"draft": "Icyapa"
	},
	activity: {
		"gorilla": "Kwiga ingagi",
		"safari": "Safari",
		"hiking": "Kugendera ku maguru",
		"cultural": "Umuco",
		"birdwatching": "Kureba inyoni",
		"kayaking": "Kayak"
	},
	footer: {
		"company": "Ikigo",
		"explore": "Reba",
		"support": "Ubufasha",
		"legal": "Amategeko",
		"followUs": "Dukurikire",
		"rights": "Uburenganzira bwose bwihariwe.",
		"privacy": "Ibanga",
		"terms": "Amabwiriza"
	},
	specialist: {
		"cta": "Baza umuhanga",
		"signInTitle": "Injira kugira uganire",
		"signInBody": "Fungura konti ku buntu cyangwa winjire kugira ngo uganire n'abategura ingendo bacu."
	},
	hub: {
		"eyebrow": "Shakisha",
		"title": "Ingendo, ahantu n'ingengabihe",
		"subtitle": "Ahantu hamwe h'ingendo zose za EDGELINK — hitamo pariki, ibikorwa cyangwa iminsi.",
		"region": "Ahantu",
		"activity": "Ibikorwa",
		"duration": "Igihe",
		"all": "Byose",
		"empty": "Nta rugendo ruhuye n'ibyo wahisemo.",
		"view": "Reba urugendo",
		"from": "Guhera kuri",
		"results_one": "urugendo {{count}}",
		"results_other": "ingendo {{count}}"
	},
	dashboardNav: {
		"overview": "Incamake",
		"bookings": "Ibyabitswe",
		"chat": "Ikiganiro",
		"experiences": "Ubunararibonye",
		"profile": "Umwirondoro"
	},
	team: {
		"eyebrow": "Abacu",
		"title": "Menya itsinda ryacu",
		"subtitle": "Abayobozi, abategura n'abarinzi b'ibidukikije batuma buri rugendo ruba urwawe."
	}
};
var sw_default = {
	brand: {
		"name": "EDGELINK",
		"tagline": "Utalii"
	},
	nav: {
		"home": "Nyumbani",
		"destinations": "Maeneo",
		"tours": "Safari",
		"packages": "Ratiba",
		"gallery": "Picha",
		"sustainability": "Uendelevu",
		"journal": "Jarida",
		"faq": "Maswali",
		"about": "Kuhusu",
		"contact": "Wasiliana",
		"bookNow": "Weka Sasa",
		"signIn": "Ingia",
		"signOut": "Toka",
		"dashboard": "Dashibodi",
		"admin": "Msimamizi",
		"createAccount": "Fungua akaunti",
		"myDashboard": "Dashibodi yangu",
		"adminPanel": "Paneli ya msimamizi",
		"explore": "Safari na Ratiba"
	},
	theme: {
		"toggle": "Badilisha mandhari",
		"light": "Nuru",
		"dark": "Giza",
		"system": "Mfumo"
	},
	common: {
		"loading": "Inapakia…",
		"save": "Hifadhi",
		"cancel": "Ghairi",
		"delete": "Futa",
		"edit": "Hariri",
		"create": "Unda",
		"update": "Sasisha",
		"confirm": "Thibitisha",
		"back": "Rudi",
		"next": "Ijayo",
		"previous": "Iliyotangulia",
		"search": "Tafuta",
		"filter": "Chuja",
		"all": "Zote",
		"yes": "Ndio",
		"no": "Hapana",
		"close": "Funga",
		"submit": "Wasilisha",
		"sending": "Inatuma…",
		"saving": "Inahifadhi…",
		"processing": "Inashughulikia…",
		"upload": "Pakia",
		"uploading": "Inapakia…",
		"download": "Pakua",
		"view": "Angalia",
		"actions": "Vitendo",
		"status": "Hali",
		"name": "Jina",
		"email": "Barua pepe",
		"phone": "Simu",
		"date": "Tarehe",
		"price": "Bei",
		"duration": "Muda",
		"location": "Mahali",
		"description": "Maelezo",
		"notes": "Vidokezo",
		"optional": "hiari",
		"required": "inahitajika",
		"readMore": "Soma zaidi",
		"learnMore": "Jifunze zaidi",
		"viewAll": "Angalia zote",
		"getStarted": "Anza",
		"comingSoon": "Inakuja",
		"empty": "Hakuna kitu bado",
		"error": "Hitilafu imetokea",
		"success": "Umefanikiwa",
		"day": "siku",
		"days": "siku",
		"person": "mtu",
		"people": "watu",
		"from": "kuanzia",
		"perPerson": "kwa mtu"
	},
	home: {
		"heroTitle": "Safari zilizoundwa kwa maisha yote",
		"heroSubtitle": "Safari za kifahari za sokwe, wanyama watano wakuu, na msitu wa mvua nchini Rwanda.",
		"exploreTours": "Chunguza safari",
		"planTrip": "Panga safari yako",
		"whyEdgelink": "Kwa nini EDGELINK",
		"featuredDestinations": "Maeneo maarufu",
		"featuredTours": "Safari za kipekee",
		"testimonials": "Wageni wetu wanasema",
		"newsletter": "Wasiliana nasi",
		"newsletterSub": "Habari za safari mpya na msukumo.",
		"subscribe": "Jisajili",
		"yourEmail": "Barua pepe yako"
	},
	why: {
		"expertGuides": "Waelekezi wataalamu",
		"expertGuidesBody": "Wazaliwa Rwanda, waliothibitishwa na RDB, uzoefu wa miaka 20+.",
		"luxuryLodges": "Malazi ya kifahari",
		"luxuryLodgesBody": "Singita, Wilderness Safaris, One&Only — bora zaidi.",
		"customItineraries": "Ratiba maalum",
		"customItinerariesBody": "Kila safari imeundwa kwa ndoto zako.",
		"sustainable": "Utalii endelevu",
		"sustainableBody": "Bila kaboni, jamii, chanya kwa mbuga."
	},
	destinations: {
		"title": "Maeneo bora ya Rwanda",
		"subtitle": "Dunia tano tofauti ndani ya siku moja.",
		"viewDestination": "Angalia eneo"
	},
	tours: {
		"title": "Safari zetu",
		"subtitle": "Safari maalum na waelekezi wa Rwanda.",
		"filterActivity": "Shughuli",
		"filterDifficulty": "Ugumu",
		"filterRegion": "Eneo",
		"highlights": "Mambo makuu",
		"itinerary": "Ratiba",
		"included": "Yaliyomo",
		"excluded": "Yasiyomo",
		"guidelines": "Miongozo",
		"bestTime": "Wakati bora",
		"groupSize": "Kikundi cha juu",
		"bookThisTour": "Weka safari hii",
		"requestBooking": "Omba nafasi",
		"relatedGallery": "Kutoka eneo hili",
		"difficultyEasy": "Rahisi",
		"difficultyModerate": "Wastani",
		"difficultyChallenging": "Ngumu",
		"noResults": "Hakuna safari inayolingana."
	},
	gallery: {
		"title": "Picha",
		"subtitle": "Picha zilizopigwa na waelekezi na wageni.",
		"filterLocation": "Chuja kwa eneo",
		"empty": "Hakuna picha."
	},
	contact: {
		"title": "Panga safari yako",
		"subtitle": "Tueleze safari yako ya ndoto. Tunajibu ndani ya masaa 24.",
		"fullName": "Jina kamili",
		"emailAddress": "Anwani ya barua pepe",
		"phoneNumber": "Simu / WhatsApp",
		"country": "Nchi ya makazi",
		"adults": "Watu wazima",
		"children": "Watoto",
		"childrenAges": "Umri wa watoto",
		"travelStart": "Tarehe ya kuanza",
		"travelEnd": "Tarehe ya kumaliza",
		"budget": "Bajeti (USD)",
		"travelStyle": "Mtindo wa safari",
		"interests": "Maslahi",
		"message": "Tuambie zaidi",
		"howHeard": "Ulisikiaje kuhusu sisi?",
		"send": "Tuma ombi",
		"sendWhatsApp": "Tuma kwa WhatsApp",
		"success": "Asante — tutawasiliana ndani ya masaa 24.",
		"chooseTour": "Chagua safari"
	},
	auth: {
		"signIn": "Ingia",
		"signUp": "Fungua akaunti",
		"email": "Barua pepe",
		"password": "Nywila",
		"fullName": "Jina kamili",
		"phone": "Namba ya simu",
		"forgotPassword": "Umesahau nywila?",
		"haveAccount": "Una akaunti tayari?",
		"noAccount": "Huna akaunti?",
		"signInSubtitle": "Karibu tena — ingia kuendelea.",
		"signUpSubtitle": "Jiunge EDGELINK kuweka safari.",
		"resetTitle": "Weka upya nywila",
		"resetSubtitle": "Tutakutumia kiungo salama.",
		"sendReset": "Tuma kiungo",
		"signInSuccess": "Karibu!",
		"signUpSuccess": "Akaunti imeundwa.",
		"signOutSuccess": "Umetoka."
	},
	dashboard: {
		"title": "Dashibodi yangu",
		"welcome": "Karibu tena",
		"myBookings": "Nafasi zangu",
		"myExperiences": "Uzoefu ulioshirikiwa",
		"myProfile": "Wasifu",
		"chatSupport": "Zungumza nasi",
		"upcomingTrips": "Safari zijazo",
		"totalBookings": "Nafasi zote",
		"sharedExperiences": "Uzoefu ulioshirikiwa",
		"noBookings": "Hakuna nafasi.",
		"startBooking": "Anza kupanga",
		"cancelBooking": "Ghairi",
		"shareExperience": "Shiriki uzoefu wako",
		"shareExperienceOnly": "Kwa safari zilizokamilika tu.",
		"rating": "Alama",
		"photos": "Picha",
		"yourMessage": "Ujumbe wako",
		"publish": "Chapisha kwa ukaguzi"
	},
	admin: {
		"overview": "Muhtasari",
		"tours": "Safari",
		"gallery": "Picha",
		"bookings": "Nafasi",
		"experiences": "Uzoefu",
		"chat": "Mazungumzo",
		"stats": {
			"totalTours": "Safari zote",
			"galleryImages": "Picha",
			"totalBookings": "Nafasi zote",
			"openChats": "Mazungumzo wazi",
			"pendingExperiences": "Uzoefu unaosubiri"
		},
		"toursCrud": {
			"newTour": "Safari mpya",
			"editTour": "Hariri safari",
			"deleteConfirm": "Futa safari hii?",
			"duplicate": "Nakili",
			"activate": "Wezesha",
			"deactivate": "Zima",
			"slug": "Slug (URL)",
			"region": "Eneo",
			"activity": "Aina ya shughuli",
			"heroImage": "Picha kuu",
			"highlights": "Mambo makuu (moja kwa mstari)",
			"included": "Yaliyomo (moja kwa mstari)",
			"excluded": "Yasiyomo (moja kwa mstari)",
			"difficulty": "Ugumu",
			"maxGroup": "Kikundi cha juu",
			"bestTime": "Wakati bora",
			"priceLabel": "Bei (USD)",
			"durationLabel": "Muda (mfano siku 3)",
			"empty": "Hakuna safari — anza."
		},
		"galleryCrud": {
			"upload": "Pakia picha",
			"removeAi": "Ondoa picha za AI",
			"removeAiConfirm": "Futa picha zote za AI?",
			"markAi": "Weka AI",
			"unmarkAi": "Ondoa AI",
			"bulkDelete": "Futa zilizochaguliwa",
			"caption": "Maelezo",
			"photographer": "Mpiga picha",
			"tags": "Vitambulisho (vilivyotenganishwa na koma)",
			"featured": "Maalumu",
			"isAi": "Imetengenezwa na AI",
			"dragDrop": "Buruta picha hapa au bofya",
			"empty": "Picha hakuna."
		},
		"bookingsAdmin": {
			"filterStatus": "Hali",
			"changeStatus": "Badilisha hali",
			"exportCsv": "Hamisha CSV",
			"adminNotes": "Vidokezo",
			"empty": "Hakuna nafasi."
		},
		"experiencesAdmin": {
			"approve": "Kubali",
			"reject": "Kataa",
			"onApprove": "Picha zitaongezwa kwa picha zikikubaliwa.",
			"empty": "Hakuna uzoefu uliowasilishwa."
		}
	},
	status: {
		"pending": "Inasubiri",
		"confirmed": "Imethibitishwa",
		"completed": "Imekamilika",
		"cancelled": "Imefutwa",
		"approved": "Imekubaliwa",
		"rejected": "Imekataliwa",
		"active": "Hai",
		"inactive": "Haifanyi kazi",
		"draft": "Rasimu"
	},
	activity: {
		"gorilla": "Sokwe wa mlima",
		"safari": "Safari",
		"hiking": "Kupanda",
		"cultural": "Utamaduni",
		"birdwatching": "Kutazama ndege",
		"kayaking": "Kayak"
	},
	footer: {
		"company": "Kampuni",
		"explore": "Chunguza",
		"support": "Msaada",
		"legal": "Kisheria",
		"followUs": "Tufuate",
		"rights": "Haki zote zimehifadhiwa.",
		"privacy": "Faragha",
		"terms": "Masharti"
	},
	specialist: {
		"cta": "Uliza mtaalamu",
		"signInTitle": "Ingia ili kuzungumza",
		"signInBody": "Fungua akaunti bila malipo au ingia ili kuanza mazungumzo na wabunifu wetu wa safari."
	},
	hub: {
		"eyebrow": "Chunguza",
		"title": "Safari, maeneo na ratiba",
		"subtitle": "Sehemu moja kwa kila safari ya EDGELINK — chuja kwa hifadhi, shughuli au muda.",
		"region": "Eneo",
		"activity": "Shughuli",
		"duration": "Muda wa safari",
		"all": "Zote",
		"empty": "Hakuna safari inayolingana na vichujio hivi.",
		"view": "Angalia safari",
		"from": "Kuanzia",
		"results_one": "safari {{count}}",
		"results_other": "safari {{count}}"
	},
	dashboardNav: {
		"overview": "Muhtasari",
		"bookings": "Nafasi",
		"chat": "Mazungumzo",
		"experiences": "Uzoefu",
		"profile": "Wasifu"
	},
	team: {
		"eyebrow": "Watu wetu",
		"title": "Kutana na timu",
		"subtitle": "Waongozaji, wapangaji na wahifadhi wanaofanya kila safari iwe ya kipekee."
	}
};
var es_default = {
	brand: {
		"name": "EDGELINK",
		"tagline": "Tours"
	},
	nav: {
		"home": "Inicio",
		"destinations": "Destinos",
		"tours": "Tours",
		"packages": "Itinerarios",
		"gallery": "Galería",
		"sustainability": "Sostenibilidad",
		"journal": "Diario",
		"faq": "Preguntas",
		"about": "Nosotros",
		"contact": "Contacto",
		"bookNow": "Reservar",
		"signIn": "Iniciar sesión",
		"signOut": "Cerrar sesión",
		"dashboard": "Panel",
		"admin": "Admin",
		"createAccount": "Crear cuenta",
		"myDashboard": "Mi panel",
		"adminPanel": "Panel admin",
		"explore": "Tours e itinerarios"
	},
	theme: {
		"toggle": "Cambiar tema",
		"light": "Claro",
		"dark": "Oscuro",
		"system": "Sistema"
	},
	common: {
		"loading": "Cargando…",
		"save": "Guardar",
		"cancel": "Cancelar",
		"delete": "Eliminar",
		"edit": "Editar",
		"create": "Crear",
		"update": "Actualizar",
		"confirm": "Confirmar",
		"back": "Atrás",
		"next": "Siguiente",
		"previous": "Anterior",
		"search": "Buscar",
		"filter": "Filtrar",
		"all": "Todos",
		"yes": "Sí",
		"no": "No",
		"close": "Cerrar",
		"submit": "Enviar",
		"sending": "Enviando…",
		"saving": "Guardando…",
		"processing": "Procesando…",
		"upload": "Subir",
		"uploading": "Subiendo…",
		"download": "Descargar",
		"view": "Ver",
		"actions": "Acciones",
		"status": "Estado",
		"name": "Nombre",
		"email": "Correo",
		"phone": "Teléfono",
		"date": "Fecha",
		"price": "Precio",
		"duration": "Duración",
		"location": "Ubicación",
		"description": "Descripción",
		"notes": "Notas",
		"optional": "opcional",
		"required": "requerido",
		"readMore": "Leer más",
		"learnMore": "Saber más",
		"viewAll": "Ver todo",
		"getStarted": "Empezar",
		"comingSoon": "Próximamente",
		"empty": "Nada aún",
		"error": "Algo salió mal",
		"success": "Éxito",
		"day": "día",
		"days": "días",
		"person": "persona",
		"people": "personas",
		"from": "desde",
		"perPerson": "por persona"
	},
	home: {
		"heroTitle": "Viajes creados para toda la vida",
		"heroSubtitle": "Trekking de gorilas de lujo, safaris de los Cinco Grandes y expediciones en la selva a través de Ruanda.",
		"exploreTours": "Explorar tours",
		"planTrip": "Planea tu viaje",
		"whyEdgelink": "Por qué EDGELINK",
		"featuredDestinations": "Destinos destacados",
		"featuredTours": "Viajes emblemáticos",
		"testimonials": "Lo que dicen nuestros huéspedes",
		"newsletter": "Mantente en contacto",
		"newsletterSub": "Notas de campo y nuevas expediciones.",
		"subscribe": "Suscribirse",
		"yourEmail": "Tu correo"
	},
	why: {
		"expertGuides": "Guías expertos",
		"expertGuidesBody": "Nacidos en Ruanda, certificados RDB, más de 20 años.",
		"luxuryLodges": "Lodges de lujo",
		"luxuryLodgesBody": "Singita, Wilderness Safaris, One&Only — los mejores del país.",
		"customItineraries": "Itinerarios personalizados",
		"customItinerariesBody": "Cada viaje diseñado alrededor de ti.",
		"sustainable": "Viaje sostenible",
		"sustainableBody": "Neutral en carbono, comunitario, positivo para los parques."
	},
	destinations: {
		"title": "Los mejores destinos de Ruanda",
		"subtitle": "Cinco mundos distintos en un solo día.",
		"viewDestination": "Ver destino"
	},
	tours: {
		"title": "Nuestros tours",
		"subtitle": "Viajes emblemáticos creados por guías ruandeses.",
		"filterActivity": "Actividad",
		"filterDifficulty": "Dificultad",
		"filterRegion": "Región",
		"highlights": "Destacados",
		"itinerary": "Itinerario",
		"included": "Incluye",
		"excluded": "No incluye",
		"guidelines": "Directrices",
		"bestTime": "Mejor época",
		"groupSize": "Grupo máx",
		"bookThisTour": "Reservar este tour",
		"requestBooking": "Solicitar reserva",
		"relatedGallery": "Desde este lugar",
		"difficultyEasy": "Fácil",
		"difficultyModerate": "Moderado",
		"difficultyChallenging": "Desafiante",
		"noResults": "Ningún tour coincide."
	},
	gallery: {
		"title": "Galería",
		"subtitle": "Imágenes capturadas por nuestros guías y huéspedes.",
		"filterLocation": "Filtrar por ubicación",
		"empty": "Sin imágenes."
	},
	contact: {
		"title": "Planea tu viaje",
		"subtitle": "Cuéntanos tu sueño. Respondemos en 24h.",
		"fullName": "Nombre completo",
		"emailAddress": "Correo electrónico",
		"phoneNumber": "Teléfono / WhatsApp",
		"country": "País de residencia",
		"adults": "Adultos",
		"children": "Niños",
		"childrenAges": "Edades de los niños",
		"travelStart": "Fecha de inicio",
		"travelEnd": "Fecha de fin",
		"budget": "Presupuesto (USD)",
		"travelStyle": "Estilo de viaje",
		"interests": "Intereses",
		"message": "Cuéntanos más",
		"howHeard": "¿Cómo nos conociste?",
		"send": "Enviar solicitud",
		"sendWhatsApp": "Enviar por WhatsApp",
		"success": "Gracias — te contactaremos en 24h.",
		"chooseTour": "Elige un tour"
	},
	auth: {
		"signIn": "Iniciar sesión",
		"signUp": "Crear cuenta",
		"email": "Correo electrónico",
		"password": "Contraseña",
		"fullName": "Nombre completo",
		"phone": "Teléfono",
		"forgotPassword": "¿Olvidaste tu contraseña?",
		"haveAccount": "¿Ya tienes cuenta?",
		"noAccount": "¿No tienes cuenta?",
		"signInSubtitle": "Bienvenido de nuevo.",
		"signUpSubtitle": "Únete a EDGELINK.",
		"resetTitle": "Restablecer contraseña",
		"resetSubtitle": "Te enviaremos un enlace seguro.",
		"sendReset": "Enviar enlace",
		"signInSuccess": "¡Bienvenido!",
		"signUpSuccess": "Cuenta creada.",
		"signOutSuccess": "Sesión cerrada."
	},
	dashboard: {
		"title": "Mi panel",
		"welcome": "Bienvenido",
		"myBookings": "Mis reservas",
		"myExperiences": "Experiencias compartidas",
		"myProfile": "Perfil",
		"chatSupport": "Chatea con nosotros",
		"upcomingTrips": "Próximos viajes",
		"totalBookings": "Reservas totales",
		"sharedExperiences": "Experiencias compartidas",
		"noBookings": "Sin reservas.",
		"startBooking": "Empezar a planear",
		"cancelBooking": "Cancelar",
		"shareExperience": "Comparte tu experiencia",
		"shareExperienceOnly": "Solo para viajes completados.",
		"rating": "Calificación",
		"photos": "Fotos",
		"yourMessage": "Tu mensaje",
		"publish": "Publicar para revisión"
	},
	admin: {
		"overview": "Resumen",
		"tours": "Tours",
		"gallery": "Galería",
		"bookings": "Reservas",
		"experiences": "Experiencias",
		"chat": "Chat",
		"stats": {
			"totalTours": "Tours totales",
			"galleryImages": "Imágenes",
			"totalBookings": "Reservas totales",
			"openChats": "Chats abiertos",
			"pendingExperiences": "Experiencias pendientes"
		},
		"toursCrud": {
			"newTour": "Nuevo tour",
			"editTour": "Editar tour",
			"deleteConfirm": "¿Eliminar este tour?",
			"duplicate": "Duplicar",
			"activate": "Activar",
			"deactivate": "Desactivar",
			"slug": "Slug (URL)",
			"region": "Región",
			"activity": "Tipo de actividad",
			"heroImage": "Imagen principal",
			"highlights": "Destacados (uno por línea)",
			"included": "Incluye (uno por línea)",
			"excluded": "No incluye (uno por línea)",
			"difficulty": "Dificultad",
			"maxGroup": "Grupo máx",
			"bestTime": "Mejor época",
			"priceLabel": "Precio (USD)",
			"durationLabel": "Duración (ej. 3 días)",
			"empty": "Sin tours — crea el primero."
		},
		"galleryCrud": {
			"upload": "Subir imágenes",
			"removeAi": "Eliminar imágenes IA",
			"removeAiConfirm": "¿Eliminar todas las imágenes IA?",
			"markAi": "Marcar IA",
			"unmarkAi": "Desmarcar IA",
			"bulkDelete": "Eliminar selección",
			"caption": "Descripción",
			"photographer": "Fotógrafo",
			"tags": "Etiquetas (separadas por coma)",
			"featured": "Destacada",
			"isAi": "Generada por IA",
			"dragDrop": "Arrastra imágenes aquí o haz clic",
			"empty": "Galería vacía."
		},
		"bookingsAdmin": {
			"filterStatus": "Estado",
			"changeStatus": "Cambiar estado",
			"exportCsv": "Exportar CSV",
			"adminNotes": "Notas admin",
			"empty": "Sin reservas."
		},
		"experiencesAdmin": {
			"approve": "Aprobar",
			"reject": "Rechazar",
			"onApprove": "Las fotos se añadirán a la galería al aprobar.",
			"empty": "Sin experiencias enviadas."
		}
	},
	status: {
		"pending": "Pendiente",
		"confirmed": "Confirmado",
		"completed": "Completado",
		"cancelled": "Cancelado",
		"approved": "Aprobado",
		"rejected": "Rechazado",
		"active": "Activo",
		"inactive": "Inactivo",
		"draft": "Borrador"
	},
	activity: {
		"gorilla": "Trekking de gorilas",
		"safari": "Safari",
		"hiking": "Senderismo",
		"cultural": "Cultural",
		"birdwatching": "Avistamiento",
		"kayaking": "Kayak"
	},
	footer: {
		"company": "Empresa",
		"explore": "Explorar",
		"support": "Soporte",
		"legal": "Legal",
		"followUs": "Síguenos",
		"rights": "Todos los derechos reservados.",
		"privacy": "Privacidad",
		"terms": "Términos"
	},
	specialist: {
		"cta": "Habla con un especialista",
		"signInTitle": "Inicia sesión para chatear",
		"signInBody": "Crea una cuenta gratuita o inicia sesión para abrir una conversación con nuestros diseñadores de viajes."
	},
	hub: {
		"eyebrow": "Explorar",
		"title": "Tours, destinos e itinerarios",
		"subtitle": "Un solo lugar para cada viaje EDGELINK: filtra por parque, actividad o duración.",
		"region": "Destino",
		"activity": "Actividad",
		"duration": "Duración",
		"all": "Todos",
		"empty": "Ningún viaje coincide con esos filtros.",
		"view": "Ver viaje",
		"from": "Desde",
		"results_one": "{{count}} viaje",
		"results_other": "{{count}} viajes"
	},
	dashboardNav: {
		"overview": "Resumen",
		"bookings": "Reservas",
		"chat": "Chat",
		"experiences": "Experiencias",
		"profile": "Perfil"
	},
	team: {
		"eyebrow": "Nuestra gente",
		"title": "Conoce al equipo",
		"subtitle": "Guías, planificadores y conservacionistas que hacen personal cada viaje."
	}
};
var it_default = {
	brand: {
		"name": "EDGELINK",
		"tagline": "Tour"
	},
	nav: {
		"home": "Home",
		"destinations": "Destinazioni",
		"tours": "Tour",
		"packages": "Itinerari",
		"gallery": "Galleria",
		"sustainability": "Sostenibilità",
		"journal": "Diario",
		"faq": "FAQ",
		"about": "Chi siamo",
		"contact": "Contatti",
		"bookNow": "Prenota",
		"signIn": "Accedi",
		"signOut": "Esci",
		"dashboard": "Dashboard",
		"admin": "Admin",
		"createAccount": "Crea account",
		"myDashboard": "La mia dashboard",
		"adminPanel": "Pannello admin",
		"explore": "Tour e itinerari"
	},
	theme: {
		"toggle": "Cambia tema",
		"light": "Chiaro",
		"dark": "Scuro",
		"system": "Sistema"
	},
	common: {
		"loading": "Caricamento…",
		"save": "Salva",
		"cancel": "Annulla",
		"delete": "Elimina",
		"edit": "Modifica",
		"create": "Crea",
		"update": "Aggiorna",
		"confirm": "Conferma",
		"back": "Indietro",
		"next": "Avanti",
		"previous": "Precedente",
		"search": "Cerca",
		"filter": "Filtra",
		"all": "Tutti",
		"yes": "Sì",
		"no": "No",
		"close": "Chiudi",
		"submit": "Invia",
		"sending": "Invio…",
		"saving": "Salvataggio…",
		"processing": "Elaborazione…",
		"upload": "Carica",
		"uploading": "Caricamento…",
		"download": "Scarica",
		"view": "Vedi",
		"actions": "Azioni",
		"status": "Stato",
		"name": "Nome",
		"email": "Email",
		"phone": "Telefono",
		"date": "Data",
		"price": "Prezzo",
		"duration": "Durata",
		"location": "Luogo",
		"description": "Descrizione",
		"notes": "Note",
		"optional": "opzionale",
		"required": "richiesto",
		"readMore": "Leggi di più",
		"learnMore": "Scopri di più",
		"viewAll": "Vedi tutto",
		"getStarted": "Inizia",
		"comingSoon": "Prossimamente",
		"empty": "Nulla qui",
		"error": "Qualcosa è andato storto",
		"success": "Successo",
		"day": "giorno",
		"days": "giorni",
		"person": "persona",
		"people": "persone",
		"from": "da",
		"perPerson": "a persona"
	},
	home: {
		"heroTitle": "Viaggi creati per una vita intera",
		"heroSubtitle": "Trekking di lusso con i gorilla, safari dei Big Five ed esplorazioni nella foresta pluviale in Ruanda.",
		"exploreTours": "Esplora i tour",
		"planTrip": "Pianifica il viaggio",
		"whyEdgelink": "Perché EDGELINK",
		"featuredDestinations": "Destinazioni in evidenza",
		"featuredTours": "Viaggi iconici",
		"testimonials": "Cosa dicono i nostri ospiti",
		"newsletter": "Rimani in contatto",
		"newsletterSub": "Note dal campo e nuove spedizioni.",
		"subscribe": "Iscriviti",
		"yourEmail": "La tua email"
	},
	why: {
		"expertGuides": "Guide esperte",
		"expertGuidesBody": "Nati in Ruanda, certificati RDB, oltre 20 anni.",
		"luxuryLodges": "Lodge di lusso",
		"luxuryLodgesBody": "Singita, Wilderness Safaris, One&Only — i migliori del paese.",
		"customItineraries": "Itinerari su misura",
		"customItinerariesBody": "Ogni viaggio pensato attorno a te.",
		"sustainable": "Viaggio sostenibile",
		"sustainableBody": "Neutro in carbonio, comunitario, positivo per i parchi."
	},
	destinations: {
		"title": "Le migliori destinazioni del Ruanda",
		"subtitle": "Cinque mondi distinti in un solo giorno.",
		"viewDestination": "Vedi destinazione"
	},
	tours: {
		"title": "I nostri tour",
		"subtitle": "Viaggi iconici creati da guide ruandesi.",
		"filterActivity": "Attività",
		"filterDifficulty": "Difficoltà",
		"filterRegion": "Regione",
		"highlights": "Punti salienti",
		"itinerary": "Itinerario",
		"included": "Incluso",
		"excluded": "Non incluso",
		"guidelines": "Linee guida",
		"bestTime": "Miglior periodo",
		"groupSize": "Gruppo max",
		"bookThisTour": "Prenota",
		"requestBooking": "Richiedi prenotazione",
		"relatedGallery": "Da questa località",
		"difficultyEasy": "Facile",
		"difficultyModerate": "Moderato",
		"difficultyChallenging": "Impegnativo",
		"noResults": "Nessun tour trovato."
	},
	gallery: {
		"title": "Galleria",
		"subtitle": "Immagini catturate dalle nostre guide e ospiti.",
		"filterLocation": "Filtra per luogo",
		"empty": "Nessuna immagine."
	},
	contact: {
		"title": "Pianifica il tuo viaggio",
		"subtitle": "Raccontaci il tuo sogno. Rispondiamo entro 24h.",
		"fullName": "Nome completo",
		"emailAddress": "Indirizzo email",
		"phoneNumber": "Telefono / WhatsApp",
		"country": "Paese di residenza",
		"adults": "Adulti",
		"children": "Bambini",
		"childrenAges": "Età dei bambini",
		"travelStart": "Data di inizio",
		"travelEnd": "Data di fine",
		"budget": "Budget (USD)",
		"travelStyle": "Stile di viaggio",
		"interests": "Interessi",
		"message": "Dicci di più",
		"howHeard": "Come ci hai conosciuti?",
		"send": "Invia richiesta",
		"sendWhatsApp": "Invia via WhatsApp",
		"success": "Grazie — ti risponderemo entro 24h.",
		"chooseTour": "Scegli un tour"
	},
	auth: {
		"signIn": "Accedi",
		"signUp": "Crea account",
		"email": "Email",
		"password": "Password",
		"fullName": "Nome completo",
		"phone": "Telefono",
		"forgotPassword": "Password dimenticata?",
		"haveAccount": "Hai già un account?",
		"noAccount": "Non hai un account?",
		"signInSubtitle": "Bentornato.",
		"signUpSubtitle": "Unisciti a EDGELINK.",
		"resetTitle": "Reimposta la password",
		"resetSubtitle": "Ti invieremo un link sicuro.",
		"sendReset": "Invia link",
		"signInSuccess": "Bentornato!",
		"signUpSuccess": "Account creato.",
		"signOutSuccess": "Disconnesso."
	},
	dashboard: {
		"title": "La mia dashboard",
		"welcome": "Bentornato",
		"myBookings": "Le mie prenotazioni",
		"myExperiences": "Esperienze condivise",
		"myProfile": "Profilo",
		"chatSupport": "Chatta con noi",
		"upcomingTrips": "Viaggi in arrivo",
		"totalBookings": "Prenotazioni totali",
		"sharedExperiences": "Esperienze condivise",
		"noBookings": "Nessuna prenotazione.",
		"startBooking": "Inizia a pianificare",
		"cancelBooking": "Annulla",
		"shareExperience": "Condividi la tua esperienza",
		"shareExperienceOnly": "Solo per viaggi completati.",
		"rating": "Valutazione",
		"photos": "Foto",
		"yourMessage": "Il tuo messaggio",
		"publish": "Pubblica per revisione"
	},
	admin: {
		"overview": "Panoramica",
		"tours": "Tour",
		"gallery": "Galleria",
		"bookings": "Prenotazioni",
		"experiences": "Esperienze",
		"chat": "Chat",
		"stats": {
			"totalTours": "Tour totali",
			"galleryImages": "Immagini",
			"totalBookings": "Prenotazioni totali",
			"openChats": "Chat aperte",
			"pendingExperiences": "Esperienze in attesa"
		},
		"toursCrud": {
			"newTour": "Nuovo tour",
			"editTour": "Modifica tour",
			"deleteConfirm": "Eliminare questo tour?",
			"duplicate": "Duplica",
			"activate": "Attiva",
			"deactivate": "Disattiva",
			"slug": "Slug (URL)",
			"region": "Regione",
			"activity": "Tipo di attività",
			"heroImage": "Immagine principale",
			"highlights": "Punti salienti (uno per riga)",
			"included": "Incluso (uno per riga)",
			"excluded": "Non incluso (uno per riga)",
			"difficulty": "Difficoltà",
			"maxGroup": "Gruppo max",
			"bestTime": "Miglior periodo",
			"priceLabel": "Prezzo (USD)",
			"durationLabel": "Durata (es. 3 giorni)",
			"empty": "Nessun tour — crea il primo."
		},
		"galleryCrud": {
			"upload": "Carica immagini",
			"removeAi": "Rimuovi immagini IA",
			"removeAiConfirm": "Eliminare tutte le immagini IA?",
			"markAi": "Segna IA",
			"unmarkAi": "Rimuovi IA",
			"bulkDelete": "Elimina selezione",
			"caption": "Didascalia",
			"photographer": "Fotografo",
			"tags": "Tag (separati da virgola)",
			"featured": "In evidenza",
			"isAi": "Generata da IA",
			"dragDrop": "Trascina qui le immagini, o clicca",
			"empty": "Galleria vuota."
		},
		"bookingsAdmin": {
			"filterStatus": "Stato",
			"changeStatus": "Cambia stato",
			"exportCsv": "Esporta CSV",
			"adminNotes": "Note admin",
			"empty": "Nessuna prenotazione."
		},
		"experiencesAdmin": {
			"approve": "Approva",
			"reject": "Rifiuta",
			"onApprove": "Le foto verranno aggiunte alla galleria dopo l'approvazione.",
			"empty": "Nessuna esperienza inviata."
		}
	},
	status: {
		"pending": "In attesa",
		"confirmed": "Confermato",
		"completed": "Completato",
		"cancelled": "Annullato",
		"approved": "Approvato",
		"rejected": "Rifiutato",
		"active": "Attivo",
		"inactive": "Inattivo",
		"draft": "Bozza"
	},
	activity: {
		"gorilla": "Trekking gorilla",
		"safari": "Safari",
		"hiking": "Escursionismo",
		"cultural": "Culturale",
		"birdwatching": "Birdwatching",
		"kayaking": "Kayak"
	},
	footer: {
		"company": "Azienda",
		"explore": "Esplora",
		"support": "Supporto",
		"legal": "Legale",
		"followUs": "Seguici",
		"rights": "Tutti i diritti riservati.",
		"privacy": "Privacy",
		"terms": "Termini"
	},
	specialist: {
		"cta": "Parla con uno specialista",
		"signInTitle": "Accedi per chattare",
		"signInBody": "Crea un account gratuito o accedi per aprire una conversazione con i nostri travel designer."
	},
	hub: {
		"eyebrow": "Esplora",
		"title": "Tour, destinazioni e itinerari",
		"subtitle": "Un unico posto per ogni viaggio EDGELINK — filtra per parco, attività o durata.",
		"region": "Destinazione",
		"activity": "Attività",
		"duration": "Durata",
		"all": "Tutti",
		"empty": "Nessun viaggio corrisponde a questi filtri.",
		"view": "Vedi viaggio",
		"from": "Da",
		"results_one": "{{count}} viaggio",
		"results_other": "{{count}} viaggi"
	},
	dashboardNav: {
		"overview": "Panoramica",
		"bookings": "Prenotazioni",
		"chat": "Chat",
		"experiences": "Esperienze",
		"profile": "Profilo"
	},
	team: {
		"eyebrow": "Le nostre persone",
		"title": "Incontra il team",
		"subtitle": "Guide, pianificatori e conservazionisti che rendono personale ogni viaggio."
	}
};
var pt_default = {
	brand: {
		"name": "EDGELINK",
		"tagline": "Tours"
	},
	nav: {
		"home": "Início",
		"destinations": "Destinos",
		"tours": "Tours",
		"packages": "Itinerários",
		"gallery": "Galeria",
		"sustainability": "Sustentabilidade",
		"journal": "Diário",
		"faq": "FAQ",
		"about": "Sobre",
		"contact": "Contato",
		"bookNow": "Reservar",
		"signIn": "Entrar",
		"signOut": "Sair",
		"dashboard": "Painel",
		"admin": "Admin",
		"createAccount": "Criar conta",
		"myDashboard": "Meu painel",
		"adminPanel": "Painel admin",
		"explore": "Tours e itinerários"
	},
	theme: {
		"toggle": "Alternar tema",
		"light": "Claro",
		"dark": "Escuro",
		"system": "Sistema"
	},
	common: {
		"loading": "Carregando…",
		"save": "Salvar",
		"cancel": "Cancelar",
		"delete": "Excluir",
		"edit": "Editar",
		"create": "Criar",
		"update": "Atualizar",
		"confirm": "Confirmar",
		"back": "Voltar",
		"next": "Próximo",
		"previous": "Anterior",
		"search": "Buscar",
		"filter": "Filtrar",
		"all": "Todos",
		"yes": "Sim",
		"no": "Não",
		"close": "Fechar",
		"submit": "Enviar",
		"sending": "Enviando…",
		"saving": "Salvando…",
		"processing": "Processando…",
		"upload": "Enviar",
		"uploading": "Enviando…",
		"download": "Baixar",
		"view": "Ver",
		"actions": "Ações",
		"status": "Estado",
		"name": "Nome",
		"email": "E-mail",
		"phone": "Telefone",
		"date": "Data",
		"price": "Preço",
		"duration": "Duração",
		"location": "Local",
		"description": "Descrição",
		"notes": "Notas",
		"optional": "opcional",
		"required": "obrigatório",
		"readMore": "Ler mais",
		"learnMore": "Saber mais",
		"viewAll": "Ver tudo",
		"getStarted": "Começar",
		"comingSoon": "Em breve",
		"empty": "Nada ainda",
		"error": "Algo deu errado",
		"success": "Sucesso",
		"day": "dia",
		"days": "dias",
		"person": "pessoa",
		"people": "pessoas",
		"from": "a partir de",
		"perPerson": "por pessoa"
	},
	home: {
		"heroTitle": "Viagens criadas para toda uma vida",
		"heroSubtitle": "Trekking de luxo com gorilas, safáris Big Five e expedições na floresta em Ruanda.",
		"exploreTours": "Explorar tours",
		"planTrip": "Planeje sua viagem",
		"whyEdgelink": "Por que EDGELINK",
		"featuredDestinations": "Destinos em destaque",
		"featuredTours": "Viagens exclusivas",
		"testimonials": "O que dizem nossos hóspedes",
		"newsletter": "Fique em contato",
		"newsletterSub": "Notas de campo e novas expedições.",
		"subscribe": "Inscrever",
		"yourEmail": "Seu e-mail"
	},
	why: {
		"expertGuides": "Guias especialistas",
		"expertGuidesBody": "Nascidos em Ruanda, certificados RDB, mais de 20 anos.",
		"luxuryLodges": "Lodges de luxo",
		"luxuryLodgesBody": "Singita, Wilderness Safaris, One&Only — os melhores.",
		"customItineraries": "Itinerários personalizados",
		"customItinerariesBody": "Cada viagem pensada em torno de você.",
		"sustainable": "Viagem sustentável",
		"sustainableBody": "Neutra em carbono, comunitária, positiva para parques."
	},
	destinations: {
		"title": "Os melhores destinos de Ruanda",
		"subtitle": "Cinco mundos distintos em um único dia.",
		"viewDestination": "Ver destino"
	},
	tours: {
		"title": "Nossos tours",
		"subtitle": "Viagens exclusivas criadas por guias ruandeses.",
		"filterActivity": "Atividade",
		"filterDifficulty": "Dificuldade",
		"filterRegion": "Região",
		"highlights": "Destaques",
		"itinerary": "Itinerário",
		"included": "Incluído",
		"excluded": "Não incluído",
		"guidelines": "Diretrizes",
		"bestTime": "Melhor época",
		"groupSize": "Grupo máx",
		"bookThisTour": "Reservar",
		"requestBooking": "Solicitar reserva",
		"relatedGallery": "Deste local",
		"difficultyEasy": "Fácil",
		"difficultyModerate": "Moderado",
		"difficultyChallenging": "Desafiador",
		"noResults": "Nenhum tour encontrado."
	},
	gallery: {
		"title": "Galeria",
		"subtitle": "Imagens capturadas pelos nossos guias e hóspedes.",
		"filterLocation": "Filtrar por local",
		"empty": "Sem imagens."
	},
	contact: {
		"title": "Planeje sua jornada",
		"subtitle": "Conte-nos seu sonho. Respondemos em 24h.",
		"fullName": "Nome completo",
		"emailAddress": "E-mail",
		"phoneNumber": "Telefone / WhatsApp",
		"country": "País de residência",
		"adults": "Adultos",
		"children": "Crianças",
		"childrenAges": "Idade das crianças",
		"travelStart": "Data de início",
		"travelEnd": "Data de fim",
		"budget": "Orçamento (USD)",
		"travelStyle": "Estilo de viagem",
		"interests": "Interesses",
		"message": "Conte-nos mais",
		"howHeard": "Como nos conheceu?",
		"send": "Enviar solicitação",
		"sendWhatsApp": "Enviar via WhatsApp",
		"success": "Obrigado — responderemos em 24h.",
		"chooseTour": "Escolha um tour"
	},
	auth: {
		"signIn": "Entrar",
		"signUp": "Criar conta",
		"email": "E-mail",
		"password": "Senha",
		"fullName": "Nome completo",
		"phone": "Telefone",
		"forgotPassword": "Esqueceu a senha?",
		"haveAccount": "Já tem conta?",
		"noAccount": "Sem conta?",
		"signInSubtitle": "Bem-vindo de volta.",
		"signUpSubtitle": "Junte-se à EDGELINK.",
		"resetTitle": "Redefinir senha",
		"resetSubtitle": "Enviaremos um link seguro.",
		"sendReset": "Enviar link",
		"signInSuccess": "Bem-vindo!",
		"signUpSuccess": "Conta criada.",
		"signOutSuccess": "Sessão encerrada."
	},
	dashboard: {
		"title": "Meu painel",
		"welcome": "Bem-vindo",
		"myBookings": "Minhas reservas",
		"myExperiences": "Experiências compartilhadas",
		"myProfile": "Perfil",
		"chatSupport": "Fale conosco",
		"upcomingTrips": "Próximas viagens",
		"totalBookings": "Reservas totais",
		"sharedExperiences": "Experiências compartilhadas",
		"noBookings": "Sem reservas.",
		"startBooking": "Começar",
		"cancelBooking": "Cancelar",
		"shareExperience": "Compartilhe sua experiência",
		"shareExperienceOnly": "Apenas para viagens concluídas.",
		"rating": "Avaliação",
		"photos": "Fotos",
		"yourMessage": "Sua mensagem",
		"publish": "Publicar para revisão"
	},
	admin: {
		"overview": "Visão geral",
		"tours": "Tours",
		"gallery": "Galeria",
		"bookings": "Reservas",
		"experiences": "Experiências",
		"chat": "Chat",
		"stats": {
			"totalTours": "Total de tours",
			"galleryImages": "Imagens",
			"totalBookings": "Total de reservas",
			"openChats": "Chats abertos",
			"pendingExperiences": "Experiências pendentes"
		},
		"toursCrud": {
			"newTour": "Novo tour",
			"editTour": "Editar tour",
			"deleteConfirm": "Excluir este tour?",
			"duplicate": "Duplicar",
			"activate": "Ativar",
			"deactivate": "Desativar",
			"slug": "Slug (URL)",
			"region": "Região",
			"activity": "Tipo de atividade",
			"heroImage": "Imagem principal",
			"highlights": "Destaques (um por linha)",
			"included": "Incluído (um por linha)",
			"excluded": "Não incluído (um por linha)",
			"difficulty": "Dificuldade",
			"maxGroup": "Grupo máx",
			"bestTime": "Melhor época",
			"priceLabel": "Preço (USD)",
			"durationLabel": "Duração (ex. 3 dias)",
			"empty": "Nenhum tour — crie o primeiro."
		},
		"galleryCrud": {
			"upload": "Enviar imagens",
			"removeAi": "Remover imagens IA",
			"removeAiConfirm": "Excluir todas as imagens IA?",
			"markAi": "Marcar IA",
			"unmarkAi": "Desmarcar IA",
			"bulkDelete": "Excluir selecionadas",
			"caption": "Legenda",
			"photographer": "Fotógrafo",
			"tags": "Tags (separadas por vírgula)",
			"featured": "Em destaque",
			"isAi": "Gerada por IA",
			"dragDrop": "Arraste imagens aqui, ou clique",
			"empty": "Galeria vazia."
		},
		"bookingsAdmin": {
			"filterStatus": "Estado",
			"changeStatus": "Mudar estado",
			"exportCsv": "Exportar CSV",
			"adminNotes": "Notas admin",
			"empty": "Nenhuma reserva."
		},
		"experiencesAdmin": {
			"approve": "Aprovar",
			"reject": "Rejeitar",
			"onApprove": "As fotos serão adicionadas à galeria após aprovação.",
			"empty": "Nenhuma experiência enviada."
		}
	},
	status: {
		"pending": "Pendente",
		"confirmed": "Confirmado",
		"completed": "Concluído",
		"cancelled": "Cancelado",
		"approved": "Aprovado",
		"rejected": "Rejeitado",
		"active": "Ativo",
		"inactive": "Inativo",
		"draft": "Rascunho"
	},
	activity: {
		"gorilla": "Trekking de gorilas",
		"safari": "Safári",
		"hiking": "Caminhada",
		"cultural": "Cultural",
		"birdwatching": "Observação de aves",
		"kayaking": "Caiaque"
	},
	footer: {
		"company": "Empresa",
		"explore": "Explorar",
		"support": "Suporte",
		"legal": "Legal",
		"followUs": "Siga-nos",
		"rights": "Todos os direitos reservados.",
		"privacy": "Privacidade",
		"terms": "Termos"
	},
	specialist: {
		"cta": "Fale com um especialista",
		"signInTitle": "Entre para conversar",
		"signInBody": "Crie uma conta gratuita ou entre para abrir uma conversa com os nossos designers de viagens."
	},
	hub: {
		"eyebrow": "Explorar",
		"title": "Tours, destinos e itinerários",
		"subtitle": "Um só lugar para cada viagem EDGELINK — filtre por parque, atividade ou duração.",
		"region": "Destino",
		"activity": "Atividade",
		"duration": "Duração",
		"all": "Todos",
		"empty": "Nenhuma viagem corresponde a esses filtros.",
		"view": "Ver viagem",
		"from": "A partir de",
		"results_one": "{{count}} viagem",
		"results_other": "{{count}} viagens"
	},
	dashboardNav: {
		"overview": "Visão geral",
		"bookings": "Reservas",
		"chat": "Chat",
		"experiences": "Experiências",
		"profile": "Perfil"
	},
	team: {
		"eyebrow": "A nossa equipa",
		"title": "Conheça a equipa",
		"subtitle": "Guias, planeadores e conservacionistas que tornam cada viagem pessoal."
	}
};
var de_default = {
	brand: {
		"name": "EDGELINK",
		"tagline": "Touren"
	},
	nav: {
		"home": "Startseite",
		"destinations": "Reiseziele",
		"tours": "Touren",
		"packages": "Reisepläne",
		"gallery": "Galerie",
		"sustainability": "Nachhaltigkeit",
		"journal": "Journal",
		"faq": "FAQ",
		"about": "Über uns",
		"contact": "Kontakt",
		"bookNow": "Buchen",
		"signIn": "Anmelden",
		"signOut": "Abmelden",
		"dashboard": "Dashboard",
		"admin": "Admin",
		"createAccount": "Konto erstellen",
		"myDashboard": "Mein Dashboard",
		"adminPanel": "Admin-Panel",
		"explore": "Touren & Reiserouten"
	},
	theme: {
		"toggle": "Design wechseln",
		"light": "Hell",
		"dark": "Dunkel",
		"system": "System"
	},
	common: {
		"loading": "Lädt…",
		"save": "Speichern",
		"cancel": "Abbrechen",
		"delete": "Löschen",
		"edit": "Bearbeiten",
		"create": "Erstellen",
		"update": "Aktualisieren",
		"confirm": "Bestätigen",
		"back": "Zurück",
		"next": "Weiter",
		"previous": "Vorherige",
		"search": "Suchen",
		"filter": "Filtern",
		"all": "Alle",
		"yes": "Ja",
		"no": "Nein",
		"close": "Schließen",
		"submit": "Senden",
		"sending": "Wird gesendet…",
		"saving": "Wird gespeichert…",
		"processing": "Wird verarbeitet…",
		"upload": "Hochladen",
		"uploading": "Wird hochgeladen…",
		"download": "Herunterladen",
		"view": "Ansehen",
		"actions": "Aktionen",
		"status": "Status",
		"name": "Name",
		"email": "E-Mail",
		"phone": "Telefon",
		"date": "Datum",
		"price": "Preis",
		"duration": "Dauer",
		"location": "Ort",
		"description": "Beschreibung",
		"notes": "Notizen",
		"optional": "optional",
		"required": "erforderlich",
		"readMore": "Mehr lesen",
		"learnMore": "Mehr erfahren",
		"viewAll": "Alle ansehen",
		"getStarted": "Loslegen",
		"comingSoon": "Bald verfügbar",
		"empty": "Noch nichts hier",
		"error": "Etwas ist schief gelaufen",
		"success": "Erfolg",
		"day": "Tag",
		"days": "Tage",
		"person": "Person",
		"people": "Personen",
		"from": "ab",
		"perPerson": "pro Person"
	},
	home: {
		"heroTitle": "Reisen fürs Leben",
		"heroSubtitle": "Luxus-Gorilla-Trekking, Big-Five-Safaris und Regenwald-Expeditionen in Ruanda.",
		"exploreTours": "Touren entdecken",
		"planTrip": "Reise planen",
		"whyEdgelink": "Warum EDGELINK",
		"featuredDestinations": "Ausgewählte Reiseziele",
		"featuredTours": "Signature-Reisen",
		"testimonials": "Was unsere Gäste sagen",
		"newsletter": "Bleib in Kontakt",
		"newsletterSub": "Feldnotizen und neue Expeditionen.",
		"subscribe": "Abonnieren",
		"yourEmail": "Deine E-Mail"
	},
	why: {
		"expertGuides": "Erfahrene Guides",
		"expertGuidesBody": "In Ruanda geboren, RDB-zertifiziert, 20+ Jahre Erfahrung.",
		"luxuryLodges": "Luxus-Lodges",
		"luxuryLodgesBody": "Singita, Wilderness Safaris, One&Only — die besten des Landes.",
		"customItineraries": "Individuelle Reisen",
		"customItinerariesBody": "Jede Reise um dich herum geplant.",
		"sustainable": "Nachhaltiges Reisen",
		"sustainableBody": "CO2-neutral, gemeinschaftsorientiert, park-fördernd."
	},
	destinations: {
		"title": "Ruandas schönste Reiseziele",
		"subtitle": "Fünf verschiedene Welten in einem Tag.",
		"viewDestination": "Ziel ansehen"
	},
	tours: {
		"title": "Unsere Touren",
		"subtitle": "Signature-Reisen ruandischer Guides.",
		"filterActivity": "Aktivität",
		"filterDifficulty": "Schwierigkeit",
		"filterRegion": "Region",
		"highlights": "Höhepunkte",
		"itinerary": "Reiseplan",
		"included": "Enthalten",
		"excluded": "Nicht enthalten",
		"guidelines": "Richtlinien",
		"bestTime": "Beste Reisezeit",
		"groupSize": "Max. Gruppe",
		"bookThisTour": "Buchen",
		"requestBooking": "Anfragen",
		"relatedGallery": "Von diesem Ort",
		"difficultyEasy": "Leicht",
		"difficultyModerate": "Mittel",
		"difficultyChallenging": "Anspruchsvoll",
		"noResults": "Keine Touren gefunden."
	},
	gallery: {
		"title": "Galerie",
		"subtitle": "Bilder unserer Guides und Gäste.",
		"filterLocation": "Nach Ort filtern",
		"empty": "Keine Bilder."
	},
	contact: {
		"title": "Reise planen",
		"subtitle": "Erzähl uns von deinem Traum. Antwort binnen 24h.",
		"fullName": "Vollständiger Name",
		"emailAddress": "E-Mail-Adresse",
		"phoneNumber": "Telefon / WhatsApp",
		"country": "Wohnsitzland",
		"adults": "Erwachsene",
		"children": "Kinder",
		"childrenAges": "Alter der Kinder",
		"travelStart": "Startdatum",
		"travelEnd": "Enddatum",
		"budget": "Budget (USD)",
		"travelStyle": "Reisestil",
		"interests": "Interessen",
		"message": "Mehr erzählen",
		"howHeard": "Wie hast du von uns gehört?",
		"send": "Anfrage senden",
		"sendWhatsApp": "Per WhatsApp senden",
		"success": "Danke — wir melden uns binnen 24h.",
		"chooseTour": "Tour wählen"
	},
	auth: {
		"signIn": "Anmelden",
		"signUp": "Konto erstellen",
		"email": "E-Mail",
		"password": "Passwort",
		"fullName": "Vollständiger Name",
		"phone": "Telefon",
		"forgotPassword": "Passwort vergessen?",
		"haveAccount": "Bereits ein Konto?",
		"noAccount": "Kein Konto?",
		"signInSubtitle": "Willkommen zurück.",
		"signUpSubtitle": "Werde Teil von EDGELINK.",
		"resetTitle": "Passwort zurücksetzen",
		"resetSubtitle": "Wir senden dir einen sicheren Link.",
		"sendReset": "Link senden",
		"signInSuccess": "Willkommen!",
		"signUpSuccess": "Konto erstellt.",
		"signOutSuccess": "Abgemeldet."
	},
	dashboard: {
		"title": "Mein Dashboard",
		"welcome": "Willkommen zurück",
		"myBookings": "Meine Buchungen",
		"myExperiences": "Geteilte Erlebnisse",
		"myProfile": "Profil",
		"chatSupport": "Chat mit uns",
		"upcomingTrips": "Kommende Reisen",
		"totalBookings": "Buchungen insgesamt",
		"sharedExperiences": "Geteilte Erlebnisse",
		"noBookings": "Keine Buchungen.",
		"startBooking": "Planung starten",
		"cancelBooking": "Stornieren",
		"shareExperience": "Teile dein Erlebnis",
		"shareExperienceOnly": "Nur für abgeschlossene Reisen.",
		"rating": "Bewertung",
		"photos": "Fotos",
		"yourMessage": "Deine Nachricht",
		"publish": "Zur Prüfung veröffentlichen"
	},
	admin: {
		"overview": "Übersicht",
		"tours": "Touren",
		"gallery": "Galerie",
		"bookings": "Buchungen",
		"experiences": "Erlebnisse",
		"chat": "Chat",
		"stats": {
			"totalTours": "Touren gesamt",
			"galleryImages": "Galeriebilder",
			"totalBookings": "Buchungen gesamt",
			"openChats": "Offene Chats",
			"pendingExperiences": "Ausstehende Erlebnisse"
		},
		"toursCrud": {
			"newTour": "Neue Tour",
			"editTour": "Tour bearbeiten",
			"deleteConfirm": "Diese Tour löschen?",
			"duplicate": "Duplizieren",
			"activate": "Aktivieren",
			"deactivate": "Deaktivieren",
			"slug": "Slug (URL)",
			"region": "Region",
			"activity": "Aktivitätstyp",
			"heroImage": "Hauptbild",
			"highlights": "Höhepunkte (eine pro Zeile)",
			"included": "Enthalten (eine pro Zeile)",
			"excluded": "Nicht enthalten (eine pro Zeile)",
			"difficulty": "Schwierigkeit",
			"maxGroup": "Max. Gruppe",
			"bestTime": "Beste Zeit",
			"priceLabel": "Preis (USD)",
			"durationLabel": "Dauer (z. B. 3 Tage)",
			"empty": "Keine Touren — erstelle die erste."
		},
		"galleryCrud": {
			"upload": "Bilder hochladen",
			"removeAi": "KI-Bilder entfernen",
			"removeAiConfirm": "Alle als KI markierten Bilder löschen?",
			"markAi": "Als KI markieren",
			"unmarkAi": "KI-Markierung entfernen",
			"bulkDelete": "Ausgewählte löschen",
			"caption": "Bildunterschrift",
			"photographer": "Fotograf",
			"tags": "Tags (durch Komma getrennt)",
			"featured": "Hervorgehoben",
			"isAi": "Von KI generiert",
			"dragDrop": "Bilder hierher ziehen oder klicken",
			"empty": "Galerie leer."
		},
		"bookingsAdmin": {
			"filterStatus": "Status",
			"changeStatus": "Status ändern",
			"exportCsv": "CSV exportieren",
			"adminNotes": "Admin-Notizen",
			"empty": "Keine Buchungen."
		},
		"experiencesAdmin": {
			"approve": "Genehmigen",
			"reject": "Ablehnen",
			"onApprove": "Fotos werden nach Genehmigung zur Galerie hinzugefügt.",
			"empty": "Keine Erlebnisse eingereicht."
		}
	},
	status: {
		"pending": "Ausstehend",
		"confirmed": "Bestätigt",
		"completed": "Abgeschlossen",
		"cancelled": "Storniert",
		"approved": "Genehmigt",
		"rejected": "Abgelehnt",
		"active": "Aktiv",
		"inactive": "Inaktiv",
		"draft": "Entwurf"
	},
	activity: {
		"gorilla": "Gorilla-Trekking",
		"safari": "Safari",
		"hiking": "Wandern",
		"cultural": "Kulturell",
		"birdwatching": "Vogelbeobachtung",
		"kayaking": "Kajak"
	},
	footer: {
		"company": "Unternehmen",
		"explore": "Entdecken",
		"support": "Support",
		"legal": "Rechtliches",
		"followUs": "Folge uns",
		"rights": "Alle Rechte vorbehalten.",
		"privacy": "Datenschutz",
		"terms": "Bedingungen"
	},
	specialist: {
		"cta": "Spezialisten fragen",
		"signInTitle": "Zum Chatten anmelden",
		"signInBody": "Erstellen Sie ein kostenloses Konto oder melden Sie sich an, um mit unseren Reisedesignern zu chatten."
	},
	hub: {
		"eyebrow": "Entdecken",
		"title": "Touren, Ziele & Reiserouten",
		"subtitle": "Ein Ort für jede EDGELINK-Reise — filtern Sie nach Park, Aktivität oder Dauer.",
		"region": "Ziel",
		"activity": "Aktivität",
		"duration": "Reisedauer",
		"all": "Alle",
		"empty": "Keine Reise passt zu diesen Filtern.",
		"view": "Reise ansehen",
		"from": "Ab",
		"results_one": "{{count}} Reise",
		"results_other": "{{count}} Reisen"
	},
	dashboardNav: {
		"overview": "Übersicht",
		"bookings": "Buchungen",
		"chat": "Chat",
		"experiences": "Erlebnisse",
		"profile": "Profil"
	},
	team: {
		"eyebrow": "Unser Team",
		"title": "Lernen Sie das Team kennen",
		"subtitle": "Guides, Planer und Naturschützer, die jede Reise persönlich machen."
	}
};
var zh_default = {
	brand: {
		"name": "EDGELINK",
		"tagline": "游览"
	},
	nav: {
		"home": "首页",
		"destinations": "目的地",
		"tours": "旅行",
		"packages": "行程",
		"gallery": "画廊",
		"sustainability": "可持续",
		"journal": "日志",
		"faq": "常见问题",
		"about": "关于",
		"contact": "联系",
		"bookNow": "立即预订",
		"signIn": "登录",
		"signOut": "退出",
		"dashboard": "仪表板",
		"admin": "管理员",
		"createAccount": "创建账户",
		"myDashboard": "我的面板",
		"adminPanel": "管理面板",
		"explore": "行程与线路"
	},
	theme: {
		"toggle": "切换主题",
		"light": "浅色",
		"dark": "深色",
		"system": "系统"
	},
	common: {
		"loading": "加载中…",
		"save": "保存",
		"cancel": "取消",
		"delete": "删除",
		"edit": "编辑",
		"create": "创建",
		"update": "更新",
		"confirm": "确认",
		"back": "返回",
		"next": "下一步",
		"previous": "上一步",
		"search": "搜索",
		"filter": "筛选",
		"all": "全部",
		"yes": "是",
		"no": "否",
		"close": "关闭",
		"submit": "提交",
		"sending": "发送中…",
		"saving": "保存中…",
		"processing": "处理中…",
		"upload": "上传",
		"uploading": "上传中…",
		"download": "下载",
		"view": "查看",
		"actions": "操作",
		"status": "状态",
		"name": "姓名",
		"email": "邮箱",
		"phone": "电话",
		"date": "日期",
		"price": "价格",
		"duration": "时长",
		"location": "位置",
		"description": "描述",
		"notes": "备注",
		"optional": "可选",
		"required": "必填",
		"readMore": "阅读更多",
		"learnMore": "了解更多",
		"viewAll": "查看全部",
		"getStarted": "开始",
		"comingSoon": "即将推出",
		"empty": "暂无内容",
		"error": "出错了",
		"success": "成功",
		"day": "天",
		"days": "天",
		"person": "人",
		"people": "人",
		"from": "起",
		"perPerson": "每人"
	},
	home: {
		"heroTitle": "为一生打造的旅程",
		"heroSubtitle": "在卢旺达体验豪华大猩猩徒步、五大兽野生动物园和雨林探险。",
		"exploreTours": "探索旅行",
		"planTrip": "规划旅程",
		"whyEdgelink": "为什么选择 EDGELINK",
		"featuredDestinations": "精选目的地",
		"featuredTours": "招牌行程",
		"testimonials": "客户评价",
		"newsletter": "保持联系",
		"newsletterSub": "野外笔记和新的探险。",
		"subscribe": "订阅",
		"yourEmail": "您的邮箱"
	},
	why: {
		"expertGuides": "专家向导",
		"expertGuidesBody": "生于卢旺达,RDB 认证,20年以上经验。",
		"luxuryLodges": "豪华住宿",
		"luxuryLodgesBody": "Singita、Wilderness Safaris、One&Only — 最佳选择。",
		"customItineraries": "定制行程",
		"customItinerariesBody": "每次旅行都围绕您设计。",
		"sustainable": "可持续旅行",
		"sustainableBody": "碳中和、社区所有、公园正向。"
	},
	destinations: {
		"title": "卢旺达最佳目的地",
		"subtitle": "一天内可到达的五个独特世界。",
		"viewDestination": "查看目的地"
	},
	tours: {
		"title": "我们的旅行",
		"subtitle": "卢旺达向导精心设计的招牌旅程。",
		"filterActivity": "活动",
		"filterDifficulty": "难度",
		"filterRegion": "地区",
		"highlights": "亮点",
		"itinerary": "行程",
		"included": "包含",
		"excluded": "不包含",
		"guidelines": "指南",
		"bestTime": "最佳时间",
		"groupSize": "最大团队",
		"bookThisTour": "预订此行程",
		"requestBooking": "申请预订",
		"relatedGallery": "来自此地",
		"difficultyEasy": "简单",
		"difficultyModerate": "中等",
		"difficultyChallenging": "挑战",
		"noResults": "没有匹配的旅行。"
	},
	gallery: {
		"title": "画廊",
		"subtitle": "由我们的向导和客人拍摄。",
		"filterLocation": "按地点筛选",
		"empty": "暂无图片。"
	},
	contact: {
		"title": "规划您的旅程",
		"subtitle": "告诉我们您的梦想。24 小时内回复。",
		"fullName": "全名",
		"emailAddress": "电子邮箱",
		"phoneNumber": "电话 / WhatsApp",
		"country": "居住国家",
		"adults": "成人",
		"children": "儿童",
		"childrenAges": "儿童年龄",
		"travelStart": "出发日期",
		"travelEnd": "结束日期",
		"budget": "预算 (USD)",
		"travelStyle": "旅行风格",
		"interests": "兴趣",
		"message": "告诉我们更多",
		"howHeard": "您如何得知我们?",
		"send": "发送咨询",
		"sendWhatsApp": "通过 WhatsApp 发送",
		"success": "谢谢 — 我们将在 24 小时内联系您。",
		"chooseTour": "选择旅行"
	},
	auth: {
		"signIn": "登录",
		"signUp": "创建账户",
		"email": "电子邮箱",
		"password": "密码",
		"fullName": "全名",
		"phone": "电话",
		"forgotPassword": "忘记密码?",
		"haveAccount": "已有账户?",
		"noAccount": "没有账户?",
		"signInSubtitle": "欢迎回来。",
		"signUpSubtitle": "加入 EDGELINK。",
		"resetTitle": "重置密码",
		"resetSubtitle": "我们将发送安全链接。",
		"sendReset": "发送链接",
		"signInSuccess": "欢迎!",
		"signUpSuccess": "账户已创建。",
		"signOutSuccess": "已退出。"
	},
	dashboard: {
		"title": "我的面板",
		"welcome": "欢迎回来",
		"myBookings": "我的预订",
		"myExperiences": "分享的体验",
		"myProfile": "个人资料",
		"chatSupport": "与我们聊天",
		"upcomingTrips": "即将到来的旅行",
		"totalBookings": "总预订",
		"sharedExperiences": "分享的体验",
		"noBookings": "暂无预订。",
		"startBooking": "开始规划",
		"cancelBooking": "取消",
		"shareExperience": "分享您的体验",
		"shareExperienceOnly": "仅限已完成的旅行。",
		"rating": "评分",
		"photos": "照片",
		"yourMessage": "您的留言",
		"publish": "发布审核"
	},
	admin: {
		"overview": "概览",
		"tours": "旅行",
		"gallery": "画廊",
		"bookings": "预订",
		"experiences": "体验",
		"chat": "聊天",
		"stats": {
			"totalTours": "总旅行",
			"galleryImages": "图片",
			"totalBookings": "总预订",
			"openChats": "开放聊天",
			"pendingExperiences": "待审体验"
		},
		"toursCrud": {
			"newTour": "新旅行",
			"editTour": "编辑旅行",
			"deleteConfirm": "删除此旅行?",
			"duplicate": "复制",
			"activate": "激活",
			"deactivate": "停用",
			"slug": "Slug (URL)",
			"region": "地区",
			"activity": "活动类型",
			"heroImage": "主图",
			"highlights": "亮点(每行一个)",
			"included": "包含(每行一个)",
			"excluded": "不包含(每行一个)",
			"difficulty": "难度",
			"maxGroup": "最大团队",
			"bestTime": "最佳时间",
			"priceLabel": "价格 (USD)",
			"durationLabel": "时长(例如 3 天)",
			"empty": "暂无旅行 — 创建第一个。"
		},
		"galleryCrud": {
			"upload": "上传图片",
			"removeAi": "删除 AI 图片",
			"removeAiConfirm": "删除所有 AI 图片?",
			"markAi": "标记为 AI",
			"unmarkAi": "取消 AI 标记",
			"bulkDelete": "删除已选",
			"caption": "标题",
			"photographer": "摄影师",
			"tags": "标签(逗号分隔)",
			"featured": "精选",
			"isAi": "AI 生成",
			"dragDrop": "拖放图片或点击浏览",
			"empty": "画廊为空。"
		},
		"bookingsAdmin": {
			"filterStatus": "状态",
			"changeStatus": "更改状态",
			"exportCsv": "导出 CSV",
			"adminNotes": "管理员备注",
			"empty": "暂无预订。"
		},
		"experiencesAdmin": {
			"approve": "批准",
			"reject": "拒绝",
			"onApprove": "批准后照片将添加到画廊。",
			"empty": "暂无提交的体验。"
		}
	},
	status: {
		"pending": "待处理",
		"confirmed": "已确认",
		"completed": "已完成",
		"cancelled": "已取消",
		"approved": "已批准",
		"rejected": "已拒绝",
		"active": "活跃",
		"inactive": "未激活",
		"draft": "草稿"
	},
	activity: {
		"gorilla": "大猩猩徒步",
		"safari": "野生动物园",
		"hiking": "徒步",
		"cultural": "文化",
		"birdwatching": "观鸟",
		"kayaking": "皮划艇"
	},
	footer: {
		"company": "公司",
		"explore": "探索",
		"support": "支持",
		"legal": "法律",
		"followUs": "关注我们",
		"rights": "版权所有。",
		"privacy": "隐私",
		"terms": "条款"
	},
	specialist: {
		"cta": "咨询专家",
		"signInTitle": "登录后即可对话",
		"signInBody": "免费注册或登录，即可与我们的旅行设计师实时交流。"
	},
	hub: {
		"eyebrow": "探索",
		"title": "行程、目的地与线路",
		"subtitle": "所有 EDGELINK 旅程集中于此——按公园、活动或天数筛选。",
		"region": "目的地",
		"activity": "活动",
		"duration": "行程天数",
		"all": "全部",
		"empty": "没有符合条件的行程。",
		"view": "查看行程",
		"from": "起价",
		"results_one": "{{count}} 条行程",
		"results_other": "{{count}} 条行程"
	},
	dashboardNav: {
		"overview": "概览",
		"bookings": "预订",
		"chat": "聊天",
		"experiences": "体验",
		"profile": "资料"
	},
	team: {
		"eyebrow": "我们的团队",
		"title": "认识团队",
		"subtitle": "向导、策划师与保育专家，让每段旅程都独一无二。"
	}
};
var ar_default = {
	brand: {
		"name": "EDGELINK",
		"tagline": "جولات"
	},
	nav: {
		"home": "الرئيسية",
		"destinations": "الوجهات",
		"tours": "الجولات",
		"packages": "البرامج",
		"gallery": "المعرض",
		"sustainability": "الاستدامة",
		"journal": "المدونة",
		"faq": "الأسئلة",
		"about": "من نحن",
		"contact": "اتصل",
		"bookNow": "احجز الآن",
		"signIn": "تسجيل الدخول",
		"signOut": "تسجيل الخروج",
		"dashboard": "لوحة التحكم",
		"admin": "المشرف",
		"createAccount": "إنشاء حساب",
		"myDashboard": "لوحتي",
		"adminPanel": "لوحة الإدارة",
		"explore": "الجولات والبرامج"
	},
	theme: {
		"toggle": "تبديل المظهر",
		"light": "فاتح",
		"dark": "داكن",
		"system": "النظام"
	},
	common: {
		"loading": "جار التحميل…",
		"save": "حفظ",
		"cancel": "إلغاء",
		"delete": "حذف",
		"edit": "تعديل",
		"create": "إنشاء",
		"update": "تحديث",
		"confirm": "تأكيد",
		"back": "رجوع",
		"next": "التالي",
		"previous": "السابق",
		"search": "بحث",
		"filter": "تصفية",
		"all": "الكل",
		"yes": "نعم",
		"no": "لا",
		"close": "إغلاق",
		"submit": "إرسال",
		"sending": "جار الإرسال…",
		"saving": "جار الحفظ…",
		"processing": "جار المعالجة…",
		"upload": "رفع",
		"uploading": "جار الرفع…",
		"download": "تحميل",
		"view": "عرض",
		"actions": "إجراءات",
		"status": "الحالة",
		"name": "الاسم",
		"email": "البريد",
		"phone": "الهاتف",
		"date": "التاريخ",
		"price": "السعر",
		"duration": "المدة",
		"location": "الموقع",
		"description": "الوصف",
		"notes": "ملاحظات",
		"optional": "اختياري",
		"required": "مطلوب",
		"readMore": "اقرأ المزيد",
		"learnMore": "معرفة المزيد",
		"viewAll": "عرض الكل",
		"getStarted": "ابدأ",
		"comingSoon": "قريباً",
		"empty": "لا شيء بعد",
		"error": "حدث خطأ",
		"success": "نجاح",
		"day": "يوم",
		"days": "أيام",
		"person": "شخص",
		"people": "أشخاص",
		"from": "من",
		"perPerson": "للشخص"
	},
	home: {
		"heroTitle": "رحلات مصممة للأبد",
		"heroSubtitle": "تتبع الغوريلا الفاخر وسفاري الحيوانات الخمسة الكبرى واستكشاف الغابات المطيرة في رواندا.",
		"exploreTours": "استكشف الجولات",
		"planTrip": "خطط رحلتك",
		"whyEdgelink": "لماذا EDGELINK",
		"featuredDestinations": "الوجهات المميزة",
		"featuredTours": "رحلات مميزة",
		"testimonials": "ما يقوله ضيوفنا",
		"newsletter": "ابق على تواصل",
		"newsletterSub": "ملاحظات ميدانية ورحلات جديدة.",
		"subscribe": "اشترك",
		"yourEmail": "بريدك"
	},
	why: {
		"expertGuides": "مرشدون خبراء",
		"expertGuidesBody": "من مواليد رواندا، معتمدون، أكثر من 20 عاماً.",
		"luxuryLodges": "نزل فاخرة",
		"luxuryLodgesBody": "Singita و Wilderness Safaris — الأفضل.",
		"customItineraries": "برامج مخصصة",
		"customItinerariesBody": "كل رحلة مصممة حولك.",
		"sustainable": "سفر مستدام",
		"sustainableBody": "محايد كربونياً، مجتمعي، إيجابي للمتنزهات."
	},
	destinations: {
		"title": "أفضل وجهات رواندا",
		"subtitle": "خمسة عوالم مميزة في يوم واحد.",
		"viewDestination": "عرض الوجهة"
	},
	tours: {
		"title": "جولاتنا",
		"subtitle": "رحلات مميزة صممها مرشدون روانديون.",
		"filterActivity": "النشاط",
		"filterDifficulty": "الصعوبة",
		"filterRegion": "المنطقة",
		"highlights": "أبرز المعالم",
		"itinerary": "البرنامج",
		"included": "شامل",
		"excluded": "غير شامل",
		"guidelines": "الإرشادات",
		"bestTime": "أفضل وقت",
		"groupSize": "الحد الأقصى للمجموعة",
		"bookThisTour": "احجز هذه الجولة",
		"requestBooking": "اطلب الحجز",
		"relatedGallery": "من هذا الموقع",
		"difficultyEasy": "سهل",
		"difficultyModerate": "متوسط",
		"difficultyChallenging": "صعب",
		"noResults": "لا توجد جولات مطابقة."
	},
	gallery: {
		"title": "المعرض",
		"subtitle": "صور التقطها مرشدونا وضيوفنا.",
		"filterLocation": "تصفية حسب الموقع",
		"empty": "لا صور."
	},
	contact: {
		"title": "خطط رحلتك",
		"subtitle": "أخبرنا بحلمك. نرد خلال 24 ساعة.",
		"fullName": "الاسم الكامل",
		"emailAddress": "البريد الإلكتروني",
		"phoneNumber": "الهاتف / واتساب",
		"country": "بلد الإقامة",
		"adults": "بالغين",
		"children": "أطفال",
		"childrenAges": "أعمار الأطفال",
		"travelStart": "تاريخ البدء",
		"travelEnd": "تاريخ الانتهاء",
		"budget": "الميزانية (USD)",
		"travelStyle": "نمط السفر",
		"interests": "الاهتمامات",
		"message": "أخبرنا المزيد",
		"howHeard": "كيف سمعت عنا؟",
		"send": "أرسل الطلب",
		"sendWhatsApp": "أرسل عبر واتساب",
		"success": "شكراً — سنتواصل خلال 24 ساعة.",
		"chooseTour": "اختر جولة"
	},
	auth: {
		"signIn": "تسجيل الدخول",
		"signUp": "إنشاء حساب",
		"email": "البريد",
		"password": "كلمة المرور",
		"fullName": "الاسم الكامل",
		"phone": "الهاتف",
		"forgotPassword": "نسيت كلمة المرور؟",
		"haveAccount": "لديك حساب؟",
		"noAccount": "لا تملك حساباً؟",
		"signInSubtitle": "مرحباً بعودتك.",
		"signUpSubtitle": "انضم إلى EDGELINK.",
		"resetTitle": "إعادة تعيين كلمة المرور",
		"resetSubtitle": "سنرسل رابطاً آمناً.",
		"sendReset": "أرسل الرابط",
		"signInSuccess": "أهلاً!",
		"signUpSuccess": "تم إنشاء الحساب.",
		"signOutSuccess": "تم تسجيل الخروج."
	},
	dashboard: {
		"title": "لوحتي",
		"welcome": "مرحباً بعودتك",
		"myBookings": "حجوزاتي",
		"myExperiences": "تجارب مشتركة",
		"myProfile": "الملف الشخصي",
		"chatSupport": "تحدث معنا",
		"upcomingTrips": "الرحلات القادمة",
		"totalBookings": "إجمالي الحجوزات",
		"sharedExperiences": "تجارب مشتركة",
		"noBookings": "لا حجوزات.",
		"startBooking": "ابدأ التخطيط",
		"cancelBooking": "إلغاء",
		"shareExperience": "شارك تجربتك",
		"shareExperienceOnly": "للرحلات المكتملة فقط.",
		"rating": "التقييم",
		"photos": "صور",
		"yourMessage": "رسالتك",
		"publish": "انشر للمراجعة"
	},
	admin: {
		"overview": "نظرة عامة",
		"tours": "الجولات",
		"gallery": "المعرض",
		"bookings": "الحجوزات",
		"experiences": "التجارب",
		"chat": "الدردشة",
		"stats": {
			"totalTours": "إجمالي الجولات",
			"galleryImages": "الصور",
			"totalBookings": "إجمالي الحجوزات",
			"openChats": "الدردشات المفتوحة",
			"pendingExperiences": "التجارب المعلقة"
		},
		"toursCrud": {
			"newTour": "جولة جديدة",
			"editTour": "تعديل الجولة",
			"deleteConfirm": "حذف هذه الجولة؟",
			"duplicate": "تكرار",
			"activate": "تفعيل",
			"deactivate": "إلغاء تفعيل",
			"slug": "الرابط",
			"region": "المنطقة",
			"activity": "نوع النشاط",
			"heroImage": "الصورة الرئيسية",
			"highlights": "المعالم (واحد لكل سطر)",
			"included": "شامل (واحد لكل سطر)",
			"excluded": "غير شامل (واحد لكل سطر)",
			"difficulty": "الصعوبة",
			"maxGroup": "الحد الأقصى",
			"bestTime": "أفضل وقت",
			"priceLabel": "السعر (USD)",
			"durationLabel": "المدة (مثل 3 أيام)",
			"empty": "لا جولات — أنشئ الأولى."
		},
		"galleryCrud": {
			"upload": "رفع الصور",
			"removeAi": "إزالة صور الذكاء الاصطناعي",
			"removeAiConfirm": "حذف كل الصور المولدة بالذكاء الاصطناعي؟",
			"markAi": "وضع علامة ذكاء اصطناعي",
			"unmarkAi": "إزالة العلامة",
			"bulkDelete": "حذف المحدد",
			"caption": "التعليق",
			"photographer": "المصور",
			"tags": "الوسوم (مفصولة بفاصلة)",
			"featured": "مميزة",
			"isAi": "مولدة بالذكاء الاصطناعي",
			"dragDrop": "اسحب الصور هنا أو انقر",
			"empty": "المعرض فارغ."
		},
		"bookingsAdmin": {
			"filterStatus": "الحالة",
			"changeStatus": "تغيير الحالة",
			"exportCsv": "تصدير CSV",
			"adminNotes": "ملاحظات الإدارة",
			"empty": "لا حجوزات."
		},
		"experiencesAdmin": {
			"approve": "موافقة",
			"reject": "رفض",
			"onApprove": "ستضاف الصور إلى المعرض بعد الموافقة.",
			"empty": "لا تجارب مقدمة."
		}
	},
	status: {
		"pending": "قيد الانتظار",
		"confirmed": "مؤكد",
		"completed": "مكتمل",
		"cancelled": "ملغى",
		"approved": "موافق عليه",
		"rejected": "مرفوض",
		"active": "نشط",
		"inactive": "غير نشط",
		"draft": "مسودة"
	},
	activity: {
		"gorilla": "تتبع الغوريلا",
		"safari": "سفاري",
		"hiking": "المشي",
		"cultural": "ثقافي",
		"birdwatching": "مراقبة الطيور",
		"kayaking": "الكاياك"
	},
	footer: {
		"company": "الشركة",
		"explore": "استكشف",
		"support": "الدعم",
		"legal": "قانوني",
		"followUs": "تابعنا",
		"rights": "جميع الحقوق محفوظة.",
		"privacy": "الخصوصية",
		"terms": "الشروط"
	},
	specialist: {
		"cta": "اسأل مختصاً",
		"signInTitle": "سجّل الدخول للدردشة",
		"signInBody": "أنشئ حساباً مجانياً أو سجّل الدخول لبدء محادثة مباشرة مع مصممي الرحلات لدينا."
	},
	hub: {
		"eyebrow": "استكشف",
		"title": "الجولات والوجهات والبرامج",
		"subtitle": "مكان واحد لكل رحلات EDGELINK — صفِّ حسب الحديقة أو النشاط أو المدة.",
		"region": "الوجهة",
		"activity": "النشاط",
		"duration": "مدة الرحلة",
		"all": "الكل",
		"empty": "لا توجد رحلات تطابق هذه المرشحات.",
		"view": "عرض الرحلة",
		"from": "ابتداءً من",
		"results_one": "رحلة {{count}}",
		"results_other": "{{count}} رحلات"
	},
	dashboardNav: {
		"overview": "نظرة عامة",
		"bookings": "الحجوزات",
		"chat": "المحادثة",
		"experiences": "التجارب",
		"profile": "الملف الشخصي"
	},
	team: {
		"eyebrow": "فريقنا",
		"title": "تعرّف على الفريق",
		"subtitle": "مرشدون ومخططون وخبراء حفاظ يجعلون كل رحلة شخصية."
	}
};
var ko_default = {
	brand: {
		"name": "EDGELINK",
		"tagline": "투어"
	},
	nav: {
		"home": "홈",
		"destinations": "여행지",
		"tours": "투어",
		"packages": "일정",
		"gallery": "갤러리",
		"sustainability": "지속가능성",
		"journal": "저널",
		"faq": "자주 묻는 질문",
		"about": "소개",
		"contact": "문의",
		"bookNow": "지금 예약",
		"signIn": "로그인",
		"signOut": "로그아웃",
		"dashboard": "대시보드",
		"admin": "관리자",
		"createAccount": "계정 만들기",
		"myDashboard": "내 대시보드",
		"adminPanel": "관리 패널",
		"explore": "투어 & 일정"
	},
	theme: {
		"toggle": "테마 전환",
		"light": "라이트",
		"dark": "다크",
		"system": "시스템"
	},
	common: {
		"loading": "로딩 중…",
		"save": "저장",
		"cancel": "취소",
		"delete": "삭제",
		"edit": "편집",
		"create": "만들기",
		"update": "업데이트",
		"confirm": "확인",
		"back": "뒤로",
		"next": "다음",
		"previous": "이전",
		"search": "검색",
		"filter": "필터",
		"all": "전체",
		"yes": "예",
		"no": "아니오",
		"close": "닫기",
		"submit": "제출",
		"sending": "전송 중…",
		"saving": "저장 중…",
		"processing": "처리 중…",
		"upload": "업로드",
		"uploading": "업로드 중…",
		"download": "다운로드",
		"view": "보기",
		"actions": "작업",
		"status": "상태",
		"name": "이름",
		"email": "이메일",
		"phone": "전화",
		"date": "날짜",
		"price": "가격",
		"duration": "기간",
		"location": "위치",
		"description": "설명",
		"notes": "메모",
		"optional": "선택",
		"required": "필수",
		"readMore": "더 읽기",
		"learnMore": "자세히",
		"viewAll": "모두 보기",
		"getStarted": "시작",
		"comingSoon": "곧 출시",
		"empty": "아직 없음",
		"error": "오류 발생",
		"success": "성공",
		"day": "일",
		"days": "일",
		"person": "명",
		"people": "명",
		"from": "부터",
		"perPerson": "1인당"
	},
	home: {
		"heroTitle": "평생을 위한 여행",
		"heroSubtitle": "르완다에서 럭셔리 고릴라 트레킹, 빅5 사파리, 열대우림 탐험.",
		"exploreTours": "투어 탐색",
		"planTrip": "여행 계획",
		"whyEdgelink": "EDGELINK를 선택하는 이유",
		"featuredDestinations": "추천 여행지",
		"featuredTours": "시그니처 여행",
		"testimonials": "고객 후기",
		"newsletter": "연락 유지",
		"newsletterSub": "현장 노트와 새 탐험.",
		"subscribe": "구독",
		"yourEmail": "이메일"
	},
	why: {
		"expertGuides": "전문 가이드",
		"expertGuidesBody": "르완다 출생, RDB 인증, 20년 이상 경력.",
		"luxuryLodges": "럭셔리 롯지",
		"luxuryLodgesBody": "Singita, Wilderness Safaris, One&Only.",
		"customItineraries": "맞춤 일정",
		"customItinerariesBody": "당신을 중심으로 설계된 여행.",
		"sustainable": "지속가능 여행",
		"sustainableBody": "탄소 중립, 지역사회 기반, 공원 친화적."
	},
	destinations: {
		"title": "르완다 최고의 여행지",
		"subtitle": "하루 거리 내 다섯 개의 세계.",
		"viewDestination": "여행지 보기"
	},
	tours: {
		"title": "우리 투어",
		"subtitle": "르완다 가이드가 만든 시그니처 여행.",
		"filterActivity": "활동",
		"filterDifficulty": "난이도",
		"filterRegion": "지역",
		"highlights": "하이라이트",
		"itinerary": "일정",
		"included": "포함",
		"excluded": "불포함",
		"guidelines": "안내",
		"bestTime": "최적 시기",
		"groupSize": "최대 인원",
		"bookThisTour": "이 투어 예약",
		"requestBooking": "예약 요청",
		"relatedGallery": "이 지역에서",
		"difficultyEasy": "쉬움",
		"difficultyModerate": "보통",
		"difficultyChallenging": "도전",
		"noResults": "일치하는 투어 없음."
	},
	gallery: {
		"title": "갤러리",
		"subtitle": "가이드와 손님이 찍은 사진.",
		"filterLocation": "위치 필터",
		"empty": "이미지 없음."
	},
	contact: {
		"title": "여행 계획",
		"subtitle": "꿈을 알려주세요. 24시간 내 답변.",
		"fullName": "이름",
		"emailAddress": "이메일",
		"phoneNumber": "전화 / WhatsApp",
		"country": "거주 국가",
		"adults": "성인",
		"children": "어린이",
		"childrenAges": "어린이 나이",
		"travelStart": "시작일",
		"travelEnd": "종료일",
		"budget": "예산 (USD)",
		"travelStyle": "여행 스타일",
		"interests": "관심사",
		"message": "더 알려주세요",
		"howHeard": "어떻게 알게 되셨나요?",
		"send": "요청 보내기",
		"sendWhatsApp": "WhatsApp으로 보내기",
		"success": "감사합니다 — 24시간 내 연락드립니다.",
		"chooseTour": "투어 선택"
	},
	auth: {
		"signIn": "로그인",
		"signUp": "계정 만들기",
		"email": "이메일",
		"password": "비밀번호",
		"fullName": "이름",
		"phone": "전화",
		"forgotPassword": "비밀번호를 잊으셨나요?",
		"haveAccount": "이미 계정이 있으신가요?",
		"noAccount": "계정이 없으신가요?",
		"signInSubtitle": "다시 오신 것을 환영합니다.",
		"signUpSubtitle": "EDGELINK에 가입하세요.",
		"resetTitle": "비밀번호 재설정",
		"resetSubtitle": "안전한 링크를 보내드립니다.",
		"sendReset": "링크 보내기",
		"signInSuccess": "환영합니다!",
		"signUpSuccess": "계정이 생성되었습니다.",
		"signOutSuccess": "로그아웃되었습니다."
	},
	dashboard: {
		"title": "내 대시보드",
		"welcome": "다시 오신 것을 환영합니다",
		"myBookings": "내 예약",
		"myExperiences": "공유 경험",
		"myProfile": "프로필",
		"chatSupport": "채팅하기",
		"upcomingTrips": "예정된 여행",
		"totalBookings": "총 예약",
		"sharedExperiences": "공유 경험",
		"noBookings": "예약 없음.",
		"startBooking": "계획 시작",
		"cancelBooking": "취소",
		"shareExperience": "경험 공유",
		"shareExperienceOnly": "완료된 여행에만 가능.",
		"rating": "평점",
		"photos": "사진",
		"yourMessage": "메시지",
		"publish": "검토 게시"
	},
	admin: {
		"overview": "개요",
		"tours": "투어",
		"gallery": "갤러리",
		"bookings": "예약",
		"experiences": "경험",
		"chat": "채팅",
		"stats": {
			"totalTours": "총 투어",
			"galleryImages": "이미지",
			"totalBookings": "총 예약",
			"openChats": "열린 채팅",
			"pendingExperiences": "대기 중인 경험"
		},
		"toursCrud": {
			"newTour": "새 투어",
			"editTour": "투어 편집",
			"deleteConfirm": "이 투어를 삭제하시겠습니까?",
			"duplicate": "복제",
			"activate": "활성화",
			"deactivate": "비활성화",
			"slug": "Slug (URL)",
			"region": "지역",
			"activity": "활동 유형",
			"heroImage": "메인 이미지",
			"highlights": "하이라이트 (한 줄에 하나)",
			"included": "포함 (한 줄에 하나)",
			"excluded": "불포함 (한 줄에 하나)",
			"difficulty": "난이도",
			"maxGroup": "최대 인원",
			"bestTime": "최적 시기",
			"priceLabel": "가격 (USD)",
			"durationLabel": "기간 (예: 3일)",
			"empty": "투어 없음 — 첫 번째 만들기."
		},
		"galleryCrud": {
			"upload": "이미지 업로드",
			"removeAi": "AI 이미지 제거",
			"removeAiConfirm": "AI로 표시된 모든 이미지 삭제?",
			"markAi": "AI로 표시",
			"unmarkAi": "AI 표시 해제",
			"bulkDelete": "선택 삭제",
			"caption": "캡션",
			"photographer": "사진작가",
			"tags": "태그 (쉼표로 구분)",
			"featured": "추천",
			"isAi": "AI 생성",
			"dragDrop": "이미지를 드래그하거나 클릭",
			"empty": "갤러리 비어 있음."
		},
		"bookingsAdmin": {
			"filterStatus": "상태",
			"changeStatus": "상태 변경",
			"exportCsv": "CSV 내보내기",
			"adminNotes": "관리자 메모",
			"empty": "예약 없음."
		},
		"experiencesAdmin": {
			"approve": "승인",
			"reject": "거절",
			"onApprove": "승인 시 사진이 갤러리에 추가됩니다.",
			"empty": "제출된 경험 없음."
		}
	},
	status: {
		"pending": "대기 중",
		"confirmed": "확정",
		"completed": "완료",
		"cancelled": "취소됨",
		"approved": "승인됨",
		"rejected": "거절됨",
		"active": "활성",
		"inactive": "비활성",
		"draft": "초안"
	},
	activity: {
		"gorilla": "고릴라 트레킹",
		"safari": "사파리",
		"hiking": "하이킹",
		"cultural": "문화",
		"birdwatching": "조류 관찰",
		"kayaking": "카약"
	},
	footer: {
		"company": "회사",
		"explore": "탐색",
		"support": "지원",
		"legal": "법률",
		"followUs": "팔로우",
		"rights": "모든 권리 보유.",
		"privacy": "개인정보",
		"terms": "약관"
	},
	specialist: {
		"cta": "전문가에게 문의",
		"signInTitle": "채팅하려면 로그인하세요",
		"signInBody": "무료 계정을 만들거나 로그인하면 여행 디자이너와 실시간으로 대화할 수 있습니다."
	},
	hub: {
		"eyebrow": "둘러보기",
		"title": "투어, 목적지, 일정",
		"subtitle": "모든 EDGELINK 여행을 한 곳에서 — 공원, 액티비티, 기간으로 필터링하세요.",
		"region": "목적지",
		"activity": "액티비티",
		"duration": "여행 기간",
		"all": "전체",
		"empty": "조건에 맞는 여행이 없습니다.",
		"view": "여행 보기",
		"from": "시작가",
		"results_one": "{{count}}개 여행",
		"results_other": "{{count}}개 여행"
	},
	dashboardNav: {
		"overview": "개요",
		"bookings": "예약",
		"chat": "채팅",
		"experiences": "경험",
		"profile": "프로필"
	},
	team: {
		"eyebrow": "우리 팀",
		"title": "팀을 소개합니다",
		"subtitle": "모든 여정을 특별하게 만드는 가이드, 플래너, 보전 전문가."
	}
};
var ja_default = {
	brand: {
		"name": "EDGELINK",
		"tagline": "ツアー"
	},
	nav: {
		"home": "ホーム",
		"destinations": "目的地",
		"tours": "ツアー",
		"packages": "旅程",
		"gallery": "ギャラリー",
		"sustainability": "サステナビリティ",
		"journal": "ジャーナル",
		"faq": "よくある質問",
		"about": "会社概要",
		"contact": "お問い合わせ",
		"bookNow": "予約する",
		"signIn": "ログイン",
		"signOut": "ログアウト",
		"dashboard": "ダッシュボード",
		"admin": "管理",
		"createAccount": "アカウント作成",
		"myDashboard": "マイダッシュボード",
		"adminPanel": "管理パネル",
		"explore": "ツアーと旅程"
	},
	theme: {
		"toggle": "テーマ切替",
		"light": "ライト",
		"dark": "ダーク",
		"system": "システム"
	},
	common: {
		"loading": "読み込み中…",
		"save": "保存",
		"cancel": "キャンセル",
		"delete": "削除",
		"edit": "編集",
		"create": "作成",
		"update": "更新",
		"confirm": "確認",
		"back": "戻る",
		"next": "次へ",
		"previous": "前へ",
		"search": "検索",
		"filter": "フィルター",
		"all": "すべて",
		"yes": "はい",
		"no": "いいえ",
		"close": "閉じる",
		"submit": "送信",
		"sending": "送信中…",
		"saving": "保存中…",
		"processing": "処理中…",
		"upload": "アップロード",
		"uploading": "アップロード中…",
		"download": "ダウンロード",
		"view": "表示",
		"actions": "アクション",
		"status": "ステータス",
		"name": "名前",
		"email": "メール",
		"phone": "電話",
		"date": "日付",
		"price": "価格",
		"duration": "期間",
		"location": "場所",
		"description": "説明",
		"notes": "メモ",
		"optional": "任意",
		"required": "必須",
		"readMore": "続きを読む",
		"learnMore": "詳細",
		"viewAll": "すべて見る",
		"getStarted": "始める",
		"comingSoon": "近日公開",
		"empty": "まだ何もありません",
		"error": "エラーが発生しました",
		"success": "成功",
		"day": "日",
		"days": "日",
		"person": "人",
		"people": "人",
		"from": "から",
		"perPerson": "1人あたり"
	},
	home: {
		"heroTitle": "一生ものの旅",
		"heroSubtitle": "ルワンダで、贅沢なゴリラトレッキング、ビッグ5サファリ、熱帯雨林の探検を。",
		"exploreTours": "ツアーを探す",
		"planTrip": "旅を計画",
		"whyEdgelink": "EDGELINKを選ぶ理由",
		"featuredDestinations": "おすすめ目的地",
		"featuredTours": "シグネチャー旅",
		"testimonials": "お客様の声",
		"newsletter": "つながりを保つ",
		"newsletterSub": "フィールドノートと新しい遠征。",
		"subscribe": "購読",
		"yourEmail": "メールアドレス"
	},
	why: {
		"expertGuides": "専門ガイド",
		"expertGuidesBody": "ルワンダ生まれ、RDB認定、20年以上の経験。",
		"luxuryLodges": "高級ロッジ",
		"luxuryLodgesBody": "Singita、Wilderness Safaris、One&Only。",
		"customItineraries": "オーダーメイド旅程",
		"customItinerariesBody": "あなたを中心に設計された旅。",
		"sustainable": "持続可能な旅",
		"sustainableBody": "カーボンニュートラル、地域共同、公園にプラス。"
	},
	destinations: {
		"title": "ルワンダ最高の目的地",
		"subtitle": "一日の距離に5つの異なる世界。",
		"viewDestination": "目的地を見る"
	},
	tours: {
		"title": "ツアー",
		"subtitle": "ルワンダのガイドが作るシグネチャー旅。",
		"filterActivity": "アクティビティ",
		"filterDifficulty": "難易度",
		"filterRegion": "地域",
		"highlights": "ハイライト",
		"itinerary": "旅程",
		"included": "含まれるもの",
		"excluded": "含まれないもの",
		"guidelines": "ガイドライン",
		"bestTime": "ベストシーズン",
		"groupSize": "最大人数",
		"bookThisTour": "予約する",
		"requestBooking": "予約リクエスト",
		"relatedGallery": "この場所から",
		"difficultyEasy": "簡単",
		"difficultyModerate": "中級",
		"difficultyChallenging": "難しい",
		"noResults": "該当するツアーはありません。"
	},
	gallery: {
		"title": "ギャラリー",
		"subtitle": "ガイドとゲストが撮った写真。",
		"filterLocation": "場所で絞込み",
		"empty": "画像なし。"
	},
	contact: {
		"title": "旅の計画",
		"subtitle": "夢を教えてください。24時間以内に返信します。",
		"fullName": "氏名",
		"emailAddress": "メールアドレス",
		"phoneNumber": "電話 / WhatsApp",
		"country": "居住国",
		"adults": "大人",
		"children": "子供",
		"childrenAges": "子供の年齢",
		"travelStart": "開始日",
		"travelEnd": "終了日",
		"budget": "予算 (USD)",
		"travelStyle": "旅のスタイル",
		"interests": "興味",
		"message": "詳細をお聞かせください",
		"howHeard": "どこで知りましたか?",
		"send": "リクエスト送信",
		"sendWhatsApp": "WhatsAppで送信",
		"success": "ありがとう — 24時間以内にご連絡します。",
		"chooseTour": "ツアーを選択"
	},
	auth: {
		"signIn": "ログイン",
		"signUp": "アカウント作成",
		"email": "メール",
		"password": "パスワード",
		"fullName": "氏名",
		"phone": "電話",
		"forgotPassword": "パスワードをお忘れですか?",
		"haveAccount": "アカウントをお持ちですか?",
		"noAccount": "アカウントがありませんか?",
		"signInSubtitle": "お帰りなさい。",
		"signUpSubtitle": "EDGELINKに参加。",
		"resetTitle": "パスワードをリセット",
		"resetSubtitle": "安全なリンクをお送りします。",
		"sendReset": "リンクを送信",
		"signInSuccess": "ようこそ!",
		"signUpSuccess": "アカウント作成完了。",
		"signOutSuccess": "ログアウトしました。"
	},
	dashboard: {
		"title": "マイダッシュボード",
		"welcome": "お帰りなさい",
		"myBookings": "予約",
		"myExperiences": "共有した体験",
		"myProfile": "プロフィール",
		"chatSupport": "チャット",
		"upcomingTrips": "今後の旅",
		"totalBookings": "予約総数",
		"sharedExperiences": "共有した体験",
		"noBookings": "予約なし。",
		"startBooking": "計画開始",
		"cancelBooking": "キャンセル",
		"shareExperience": "体験を共有",
		"shareExperienceOnly": "完了した旅のみ。",
		"rating": "評価",
		"photos": "写真",
		"yourMessage": "メッセージ",
		"publish": "レビュー用に投稿"
	},
	admin: {
		"overview": "概要",
		"tours": "ツアー",
		"gallery": "ギャラリー",
		"bookings": "予約",
		"experiences": "体験",
		"chat": "チャット",
		"stats": {
			"totalTours": "総ツアー数",
			"galleryImages": "画像",
			"totalBookings": "総予約",
			"openChats": "オープンチャット",
			"pendingExperiences": "保留中の体験"
		},
		"toursCrud": {
			"newTour": "新規ツアー",
			"editTour": "ツアー編集",
			"deleteConfirm": "このツアーを削除しますか?",
			"duplicate": "複製",
			"activate": "有効化",
			"deactivate": "無効化",
			"slug": "Slug (URL)",
			"region": "地域",
			"activity": "アクティビティタイプ",
			"heroImage": "メイン画像",
			"highlights": "ハイライト (1行に1つ)",
			"included": "含む (1行に1つ)",
			"excluded": "含まない (1行に1つ)",
			"difficulty": "難易度",
			"maxGroup": "最大人数",
			"bestTime": "ベストシーズン",
			"priceLabel": "価格 (USD)",
			"durationLabel": "期間 (例: 3日)",
			"empty": "ツアーなし — 最初のツアーを作成。"
		},
		"galleryCrud": {
			"upload": "画像アップロード",
			"removeAi": "AI画像を削除",
			"removeAiConfirm": "AIとマークされたすべての画像を削除?",
			"markAi": "AIとしてマーク",
			"unmarkAi": "AIマーク解除",
			"bulkDelete": "選択を削除",
			"caption": "キャプション",
			"photographer": "写真家",
			"tags": "タグ (カンマ区切り)",
			"featured": "特集",
			"isAi": "AI生成",
			"dragDrop": "画像をドラッグ&ドロップまたはクリック",
			"empty": "ギャラリーは空。"
		},
		"bookingsAdmin": {
			"filterStatus": "ステータス",
			"changeStatus": "ステータス変更",
			"exportCsv": "CSVエクスポート",
			"adminNotes": "管理者メモ",
			"empty": "予約なし。"
		},
		"experiencesAdmin": {
			"approve": "承認",
			"reject": "却下",
			"onApprove": "承認時に写真がギャラリーに追加されます。",
			"empty": "投稿された体験なし。"
		}
	},
	status: {
		"pending": "保留中",
		"confirmed": "確定",
		"completed": "完了",
		"cancelled": "キャンセル",
		"approved": "承認済み",
		"rejected": "却下",
		"active": "アクティブ",
		"inactive": "非アクティブ",
		"draft": "下書き"
	},
	activity: {
		"gorilla": "ゴリラトレッキング",
		"safari": "サファリ",
		"hiking": "ハイキング",
		"cultural": "文化",
		"birdwatching": "バードウォッチング",
		"kayaking": "カヤック"
	},
	footer: {
		"company": "会社",
		"explore": "探索",
		"support": "サポート",
		"legal": "法的情報",
		"followUs": "フォロー",
		"rights": "全著作権所有。",
		"privacy": "プライバシー",
		"terms": "利用規約"
	},
	specialist: {
		"cta": "スペシャリストに相談",
		"signInTitle": "チャットにはログインが必要です",
		"signInBody": "無料アカウントを作成するかログインすると、トラベルデザイナーとリアルタイムで相談できます。"
	},
	hub: {
		"eyebrow": "探す",
		"title": "ツアー・目的地・旅程",
		"subtitle": "すべてのEDGELINKの旅をひとつに — 公園、アクティビティ、日数で絞り込み。",
		"region": "目的地",
		"activity": "アクティビティ",
		"duration": "日数",
		"all": "すべて",
		"empty": "条件に合う旅程が見つかりません。",
		"view": "旅程を見る",
		"from": "料金",
		"results_one": "{{count}}件の旅",
		"results_other": "{{count}}件の旅"
	},
	dashboardNav: {
		"overview": "概要",
		"bookings": "予約",
		"chat": "チャット",
		"experiences": "体験",
		"profile": "プロフィール"
	},
	team: {
		"eyebrow": "私たちのチーム",
		"title": "チーム紹介",
		"subtitle": "すべての旅を特別にするガイド、プランナー、保全の専門家。"
	}
};
var hi_default = {
	brand: {
		"name": "EDGELINK",
		"tagline": "टूर"
	},
	nav: {
		"home": "मुख्य पृष्ठ",
		"destinations": "गंतव्य",
		"tours": "टूर",
		"packages": "यात्रा कार्यक्रम",
		"gallery": "गैलरी",
		"sustainability": "स्थिरता",
		"journal": "जर्नल",
		"faq": "अक्सर पूछे जाने वाले प्रश्न",
		"about": "हमारे बारे में",
		"contact": "संपर्क",
		"bookNow": "अभी बुक करें",
		"signIn": "साइन इन",
		"signOut": "साइन आउट",
		"dashboard": "डैशबोर्ड",
		"admin": "प्रशासक",
		"createAccount": "खाता बनाएं",
		"myDashboard": "मेरा डैशबोर्ड",
		"adminPanel": "एडमिन पैनल",
		"explore": "टूर और यात्रा-क्रम"
	},
	theme: {
		"toggle": "थीम बदलें",
		"light": "हल्का",
		"dark": "गहरा",
		"system": "सिस्टम"
	},
	common: {
		"loading": "लोड हो रहा है…",
		"save": "सहेजें",
		"cancel": "रद्द करें",
		"delete": "हटाएं",
		"edit": "संपादित करें",
		"create": "बनाएं",
		"update": "अपडेट",
		"confirm": "पुष्टि करें",
		"back": "वापस",
		"next": "अगला",
		"previous": "पिछला",
		"search": "खोजें",
		"filter": "फ़िल्टर",
		"all": "सभी",
		"yes": "हाँ",
		"no": "नहीं",
		"close": "बंद करें",
		"submit": "जमा करें",
		"sending": "भेज रहा है…",
		"saving": "सहेज रहा है…",
		"processing": "प्रोसेसिंग…",
		"upload": "अपलोड",
		"uploading": "अपलोड हो रहा है…",
		"download": "डाउनलोड",
		"view": "देखें",
		"actions": "कार्रवाई",
		"status": "स्थिति",
		"name": "नाम",
		"email": "ईमेल",
		"phone": "फ़ोन",
		"date": "तारीख",
		"price": "मूल्य",
		"duration": "अवधि",
		"location": "स्थान",
		"description": "विवरण",
		"notes": "नोट्स",
		"optional": "वैकल्पिक",
		"required": "आवश्यक",
		"readMore": "और पढ़ें",
		"learnMore": "और जानें",
		"viewAll": "सभी देखें",
		"getStarted": "शुरू करें",
		"comingSoon": "जल्द ही",
		"empty": "अभी कुछ नहीं",
		"error": "कुछ गलत हुआ",
		"success": "सफलता",
		"day": "दिन",
		"days": "दिन",
		"person": "व्यक्ति",
		"people": "लोग",
		"from": "से",
		"perPerson": "प्रति व्यक्ति"
	},
	home: {
		"heroTitle": "जीवनभर की यात्राएँ",
		"heroSubtitle": "रवांडा में लक्ज़री गोरिल्ला ट्रेकिंग, बिग फाइव सफारी, और वर्षावन अभियान।",
		"exploreTours": "टूर देखें",
		"planTrip": "यात्रा की योजना बनाएं",
		"whyEdgelink": "EDGELINK क्यों",
		"featuredDestinations": "विशेष गंतव्य",
		"featuredTours": "सिग्नेचर यात्राएँ",
		"testimonials": "मेहमानों की राय",
		"newsletter": "संपर्क में रहें",
		"newsletterSub": "फील्ड नोट्स और नए अभियान।",
		"subscribe": "सदस्यता",
		"yourEmail": "आपका ईमेल"
	},
	why: {
		"expertGuides": "विशेषज्ञ गाइड",
		"expertGuidesBody": "रवांडा में जन्मे, RDB प्रमाणित, 20+ वर्ष अनुभव।",
		"luxuryLodges": "लक्ज़री लॉज",
		"luxuryLodgesBody": "Singita, Wilderness Safaris, One&Only।",
		"customItineraries": "कस्टम यात्रा",
		"customItinerariesBody": "हर यात्रा आपके लिए बनी।",
		"sustainable": "टिकाऊ यात्रा",
		"sustainableBody": "कार्बन तटस्थ, समुदाय आधारित, पार्क सकारात्मक।"
	},
	destinations: {
		"title": "रवांडा के बेहतरीन गंतव्य",
		"subtitle": "एक दिन की दूरी पर पाँच अलग दुनिया।",
		"viewDestination": "गंतव्य देखें"
	},
	tours: {
		"title": "हमारे टूर",
		"subtitle": "रवांडा के गाइडों द्वारा बनाई सिग्नेचर यात्राएँ।",
		"filterActivity": "गतिविधि",
		"filterDifficulty": "कठिनाई",
		"filterRegion": "क्षेत्र",
		"highlights": "मुख्य आकर्षण",
		"itinerary": "यात्रा कार्यक्रम",
		"included": "शामिल",
		"excluded": "शामिल नहीं",
		"guidelines": "दिशा-निर्देश",
		"bestTime": "सबसे अच्छा समय",
		"groupSize": "अधिकतम समूह",
		"bookThisTour": "इस टूर को बुक करें",
		"requestBooking": "बुकिंग का अनुरोध",
		"relatedGallery": "इस स्थान से",
		"difficultyEasy": "आसान",
		"difficultyModerate": "मध्यम",
		"difficultyChallenging": "चुनौतीपूर्ण",
		"noResults": "कोई टूर नहीं मिला।"
	},
	gallery: {
		"title": "गैलरी",
		"subtitle": "हमारे गाइडों और मेहमानों द्वारा ली गई तस्वीरें।",
		"filterLocation": "स्थान से फ़िल्टर",
		"empty": "कोई तस्वीर नहीं।"
	},
	contact: {
		"title": "अपनी यात्रा की योजना बनाएं",
		"subtitle": "अपने सपने के बारे में बताएं। 24 घंटे में जवाब।",
		"fullName": "पूरा नाम",
		"emailAddress": "ईमेल पता",
		"phoneNumber": "फ़ोन / WhatsApp",
		"country": "निवास देश",
		"adults": "वयस्क",
		"children": "बच्चे",
		"childrenAges": "बच्चों की उम्र",
		"travelStart": "आरंभ तिथि",
		"travelEnd": "समाप्ति तिथि",
		"budget": "बजट (USD)",
		"travelStyle": "यात्रा शैली",
		"interests": "रुचियाँ",
		"message": "और बताएं",
		"howHeard": "आपने हमारे बारे में कैसे सुना?",
		"send": "पूछताछ भेजें",
		"sendWhatsApp": "WhatsApp से भेजें",
		"success": "धन्यवाद — हम 24 घंटे में संपर्क करेंगे।",
		"chooseTour": "एक टूर चुनें"
	},
	auth: {
		"signIn": "साइन इन",
		"signUp": "खाता बनाएं",
		"email": "ईमेल",
		"password": "पासवर्ड",
		"fullName": "पूरा नाम",
		"phone": "फ़ोन",
		"forgotPassword": "पासवर्ड भूल गए?",
		"haveAccount": "पहले से खाता है?",
		"noAccount": "खाता नहीं है?",
		"signInSubtitle": "वापस स्वागत है।",
		"signUpSubtitle": "EDGELINK में शामिल हों।",
		"resetTitle": "पासवर्ड रीसेट करें",
		"resetSubtitle": "हम एक सुरक्षित लिंक भेजेंगे।",
		"sendReset": "लिंक भेजें",
		"signInSuccess": "स्वागत है!",
		"signUpSuccess": "खाता बनाया गया।",
		"signOutSuccess": "साइन आउट।"
	},
	dashboard: {
		"title": "मेरा डैशबोर्ड",
		"welcome": "वापस स्वागत है",
		"myBookings": "मेरी बुकिंग",
		"myExperiences": "साझा अनुभव",
		"myProfile": "प्रोफ़ाइल",
		"chatSupport": "हमसे चैट करें",
		"upcomingTrips": "आगामी यात्राएँ",
		"totalBookings": "कुल बुकिंग",
		"sharedExperiences": "साझा अनुभव",
		"noBookings": "कोई बुकिंग नहीं।",
		"startBooking": "योजना शुरू करें",
		"cancelBooking": "रद्द करें",
		"shareExperience": "अपना अनुभव साझा करें",
		"shareExperienceOnly": "केवल पूर्ण यात्राओं के लिए।",
		"rating": "रेटिंग",
		"photos": "तस्वीरें",
		"yourMessage": "आपका संदेश",
		"publish": "समीक्षा के लिए प्रकाशित"
	},
	admin: {
		"overview": "अवलोकन",
		"tours": "टूर",
		"gallery": "गैलरी",
		"bookings": "बुकिंग",
		"experiences": "अनुभव",
		"chat": "चैट",
		"stats": {
			"totalTours": "कुल टूर",
			"galleryImages": "तस्वीरें",
			"totalBookings": "कुल बुकिंग",
			"openChats": "खुली चैट",
			"pendingExperiences": "लंबित अनुभव"
		},
		"toursCrud": {
			"newTour": "नया टूर",
			"editTour": "टूर संपादित करें",
			"deleteConfirm": "यह टूर हटाएं?",
			"duplicate": "प्रतिलिपि",
			"activate": "सक्रिय करें",
			"deactivate": "निष्क्रिय करें",
			"slug": "Slug (URL)",
			"region": "क्षेत्र",
			"activity": "गतिविधि प्रकार",
			"heroImage": "मुख्य छवि",
			"highlights": "मुख्य आकर्षण (प्रति पंक्ति एक)",
			"included": "शामिल (प्रति पंक्ति एक)",
			"excluded": "शामिल नहीं (प्रति पंक्ति एक)",
			"difficulty": "कठिनाई",
			"maxGroup": "अधिकतम समूह",
			"bestTime": "सबसे अच्छा समय",
			"priceLabel": "मूल्य (USD)",
			"durationLabel": "अवधि (जैसे 3 दिन)",
			"empty": "कोई टूर नहीं — पहला बनाएं।"
		},
		"galleryCrud": {
			"upload": "छवियाँ अपलोड करें",
			"removeAi": "AI छवियाँ हटाएँ",
			"removeAiConfirm": "AI के रूप में चिह्नित सभी छवियाँ हटाएं?",
			"markAi": "AI के रूप में चिह्नित",
			"unmarkAi": "AI चिह्न हटाएँ",
			"bulkDelete": "चयनित हटाएं",
			"caption": "कैप्शन",
			"photographer": "फोटोग्राफर",
			"tags": "टैग (अल्पविराम से अलग)",
			"featured": "विशेष",
			"isAi": "AI द्वारा उत्पन्न",
			"dragDrop": "छवियाँ यहाँ खींचें, या क्लिक करें",
			"empty": "गैलरी खाली है।"
		},
		"bookingsAdmin": {
			"filterStatus": "स्थिति",
			"changeStatus": "स्थिति बदलें",
			"exportCsv": "CSV निर्यात",
			"adminNotes": "एडमिन नोट्स",
			"empty": "कोई बुकिंग नहीं।"
		},
		"experiencesAdmin": {
			"approve": "स्वीकृत",
			"reject": "अस्वीकृत",
			"onApprove": "स्वीकृति पर तस्वीरें गैलरी में जोड़ी जाएंगी।",
			"empty": "कोई अनुभव प्रस्तुत नहीं।"
		}
	},
	status: {
		"pending": "लंबित",
		"confirmed": "पुष्टि",
		"completed": "पूर्ण",
		"cancelled": "रद्द",
		"approved": "स्वीकृत",
		"rejected": "अस्वीकृत",
		"active": "सक्रिय",
		"inactive": "निष्क्रिय",
		"draft": "मसौदा"
	},
	activity: {
		"gorilla": "गोरिल्ला ट्रेकिंग",
		"safari": "सफारी",
		"hiking": "पैदल यात्रा",
		"cultural": "सांस्कृतिक",
		"birdwatching": "पक्षी अवलोकन",
		"kayaking": "कयाकिंग"
	},
	footer: {
		"company": "कंपनी",
		"explore": "खोजें",
		"support": "समर्थन",
		"legal": "कानूनी",
		"followUs": "फ़ॉलो करें",
		"rights": "सर्वाधिकार सुरक्षित।",
		"privacy": "गोपनीयता",
		"terms": "शर्तें"
	},
	specialist: {
		"cta": "विशेषज्ञ से पूछें",
		"signInTitle": "चैट के लिए साइन इन करें",
		"signInBody": "मुफ़्त खाता बनाएँ या साइन इन करें और हमारे ट्रैवल डिज़ाइनर से सीधे बात करें।"
	},
	hub: {
		"eyebrow": "खोजें",
		"title": "टूर, गंतव्य और यात्रा-क्रम",
		"subtitle": "हर EDGELINK यात्रा एक ही जगह — पार्क, गतिविधि या अवधि से छाँटें।",
		"region": "गंतव्य",
		"activity": "गतिविधि",
		"duration": "यात्रा अवधि",
		"all": "सभी",
		"empty": "इन फ़िल्टरों से कोई यात्रा नहीं मिली।",
		"view": "यात्रा देखें",
		"from": "से शुरू",
		"results_one": "{{count}} यात्रा",
		"results_other": "{{count}} यात्राएँ"
	},
	dashboardNav: {
		"overview": "अवलोकन",
		"bookings": "बुकिंग",
		"chat": "चैट",
		"experiences": "अनुभव",
		"profile": "प्रोफ़ाइल"
	},
	team: {
		"eyebrow": "हमारी टीम",
		"title": "टीम से मिलिए",
		"subtitle": "गाइड, योजनाकार और संरक्षणकर्ता जो हर यात्रा को खास बनाते हैं।"
	}
};
var LANGUAGES = [
	{
		code: "en",
		name: "English",
		flag: "🇬🇧",
		dir: "ltr"
	},
	{
		code: "fr",
		name: "Français",
		flag: "🇫🇷",
		dir: "ltr"
	},
	{
		code: "rw",
		name: "Kinyarwanda",
		flag: "🇷🇼",
		dir: "ltr"
	},
	{
		code: "sw",
		name: "Kiswahili",
		flag: "🇹🇿",
		dir: "ltr"
	},
	{
		code: "es",
		name: "Español",
		flag: "🇪🇸",
		dir: "ltr"
	},
	{
		code: "it",
		name: "Italiano",
		flag: "🇮🇹",
		dir: "ltr"
	},
	{
		code: "pt",
		name: "Português",
		flag: "🇵🇹",
		dir: "ltr"
	},
	{
		code: "de",
		name: "Deutsch",
		flag: "🇩🇪",
		dir: "ltr"
	},
	{
		code: "zh",
		name: "中文",
		flag: "🇨🇳",
		dir: "ltr"
	},
	{
		code: "ar",
		name: "العربية",
		flag: "🇸🇦",
		dir: "rtl"
	},
	{
		code: "ko",
		name: "한국어",
		flag: "🇰🇷",
		dir: "ltr"
	},
	{
		code: "ja",
		name: "日本語",
		flag: "🇯🇵",
		dir: "ltr"
	},
	{
		code: "hi",
		name: "हिन्दी",
		flag: "🇮🇳",
		dir: "ltr"
	}
];
if (!instance.isInitialized) instance.use(Browser).use(initReactI18next).init({
	lng: typeof window === "undefined" ? "en" : void 0,
	resources: {
		en: { translation: en_default },
		fr: { translation: fr_default },
		rw: { translation: rw_default },
		sw: { translation: sw_default },
		es: { translation: es_default },
		it: { translation: it_default },
		pt: { translation: pt_default },
		de: { translation: de_default },
		zh: { translation: zh_default },
		ar: { translation: ar_default },
		ko: { translation: ko_default },
		ja: { translation: ja_default },
		hi: { translation: hi_default }
	},
	fallbackLng: "en",
	interpolation: { escapeValue: false },
	detection: {
		order: ["localStorage", "navigator"],
		caches: ["localStorage"],
		lookupLocalStorage: "edgelink_lang"
	}
});
var i18n_default = instance;
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/theme-toggle-hb_jpgXi.js
var ThemeCtx = (0, import_react.createContext)({
	theme: "system",
	setTheme: () => {},
	resolved: "light"
});
function ThemeProvider({ children }) {
	const [theme, setThemeState] = (0, import_react.useState)("system");
	const [resolved, setResolved] = (0, import_react.useState)("light");
	(0, import_react.useEffect)(() => {
		const saved = localStorage.getItem("edgelink_theme") ?? "system";
		setThemeState(saved);
	}, []);
	(0, import_react.useEffect)(() => {
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const apply = () => {
			const r = theme === "system" ? media.matches ? "dark" : "light" : theme;
			setResolved(r);
			document.documentElement.classList.toggle("dark", r === "dark");
		};
		apply();
		media.addEventListener("change", apply);
		return () => media.removeEventListener("change", apply);
	}, [theme]);
	const setTheme = (t) => {
		localStorage.setItem("edgelink_theme", t);
		setThemeState(t);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeCtx.Provider, {
		value: {
			theme,
			setTheme,
			resolved
		},
		children
	});
}
var useTheme = () => (0, import_react.useContext)(ThemeCtx);
var logoUrl = "/pwa-icon-512.png";
function BrandLogo({ className, imageClassName, showName = true, href = "/", onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: href,
		onClick,
		className: cn("flex items-center gap-3", className),
		"aria-label": "EDGELINK Tours home",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: logoUrl,
			alt: "EDGELINK Tours logo",
			className: cn("h-14 w-14 rounded-full object-cover ring-2 ring-gold", imageClassName)
		}), showName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex flex-col leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-lg font-bold tracking-wide",
				children: "EDGELINK"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "-mt-0.5 text-[10px] uppercase tracking-[0.2em] text-gold",
				children: "Tours"
			})]
		})]
	});
}
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	checked,
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
function LanguageSwitcher() {
	const { i18n } = useTranslation();
	const current = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			size: "sm",
			className: "gap-1.5",
			"aria-label": "Change language",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-4 w-4" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden sm:inline",
					children: current.flag
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden md:inline text-xs uppercase",
					children: current.code
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
		align: "end",
		className: "max-h-96 overflow-y-auto",
		children: LANGUAGES.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
			onClick: () => void i18n.changeLanguage(l.code),
			className: i18n.language === l.code ? "font-semibold bg-accent" : "",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mr-2",
					children: l.flag
				}),
				" ",
				l.name
			]
		}, l.code))
	})] });
}
function ThemeToggle() {
	const { theme, setTheme, resolved } = useTheme();
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			size: "icon",
			"aria-label": t("theme.toggle"),
			children: resolved === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" })
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		align: "end",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onClick: () => setTheme("light"),
				className: theme === "light" ? "font-semibold" : "",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "mr-2 h-4 w-4" }),
					" ",
					t("theme.light")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onClick: () => setTheme("dark"),
				className: theme === "dark" ? "font-semibold" : "",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "mr-2 h-4 w-4" }),
					" ",
					t("theme.dark")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onClick: () => setTheme("system"),
				className: theme === "system" ? "font-semibold" : "",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "mr-2 h-4 w-4" }),
					" ",
					t("theme.system")
				]
			})
		]
	})] });
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/tour-cruiser-C_SjOh1w.js
var tour_gorilla_default = "/assets/tour-gorilla-BBaadZeK.jpg";
var tour_akagera_default = "/assets/tour-akagera-BZ6uDDQm.jpg";
var tour_nyungwe_default = "/assets/tour-nyungwe-9CQaDO1k.jpg";
var tour_kivu_default = "/assets/tour-kivu-CYt3vKxA.jpg";
var tour_kigali_default = "/assets/tour-kigali-rRJKEml9.jpg";
var tour_cruiser_default = "/assets/tour-cruiser-DyGo3UpO.jpg";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-s5e8-avL.js
var styles_default = "/assets/styles-BDOdnkm9.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var SW_URL = "/sw.js";
function isBlockedContext() {
	if (typeof window === "undefined") return true;
	if (window.top !== window.self) return true;
	const host = window.location.hostname;
	if (host.startsWith("id-preview--") || host.startsWith("preview--")) return true;
	if (host === "lovableproject.com" || host.endsWith(".lovableproject.com")) return true;
	if (host === "lovableproject-dev.com" || host.endsWith(".lovableproject-dev.com")) return true;
	if (host === "beta.lovable.dev" || host.endsWith(".beta.lovable.dev")) return true;
	if (new URLSearchParams(window.location.search).has("sw") && new URLSearchParams(window.location.search).get("sw") === "off") return true;
	return false;
}
async function unregisterAppWorkers() {
	if (!("serviceWorker" in navigator)) return;
	const regs = await navigator.serviceWorker.getRegistrations();
	await Promise.allSettled(regs.filter((r) => {
		return (r.active?.scriptURL ?? r.installing?.scriptURL ?? r.waiting?.scriptURL ?? "").endsWith(SW_URL);
	}).map((r) => r.unregister()));
}
async function registerServiceWorker() {
	if (!("serviceWorker" in navigator)) return;
	if (isBlockedContext()) {
		await unregisterAppWorkers();
		return;
	}
	try {
		const { registerSW } = await import("./virtual_pwa-register-BrEp8vXU.mjs");
		registerSW({ immediate: true });
	} catch {}
}
var DISMISS_KEY = "edgelink_pwa_dismissed";
function PwaInstallPrompt() {
	const [deferred, setDeferred] = (0, import_react.useState)(null);
	const [visible, setVisible] = (0, import_react.useState)(false);
	const [offline, setOffline] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		registerServiceWorker();
		const onOnline = () => setOffline(false);
		const onOffline = () => setOffline(true);
		setOffline(!navigator.onLine);
		window.addEventListener("online", onOnline);
		window.addEventListener("offline", onOffline);
		const onPrompt = (e) => {
			e.preventDefault();
			setDeferred(e);
			if (localStorage.getItem(DISMISS_KEY) !== "1") setVisible(true);
		};
		window.addEventListener("beforeinstallprompt", onPrompt);
		window.addEventListener("appinstalled", () => setVisible(false));
		return () => {
			window.removeEventListener("online", onOnline);
			window.removeEventListener("offline", onOffline);
			window.removeEventListener("beforeinstallprompt", onPrompt);
		};
	}, []);
	const install = async () => {
		if (!deferred) return;
		await deferred.prompt();
		await deferred.userChoice;
		setDeferred(null);
		setVisible(false);
	};
	const dismiss = () => {
		localStorage.setItem(DISMISS_KEY, "1");
		setVisible(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: offline && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			y: -40,
			opacity: 0
		},
		animate: {
			y: 0,
			opacity: 1
		},
		exit: {
			y: -40,
			opacity: 0
		},
		className: "fixed inset-x-0 top-0 z-[60] flex items-center justify-center gap-2 bg-forest px-4 py-1.5 text-xs font-medium text-cream",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "h-3.5 w-3.5" }), " You're offline — showing your saved pages"]
	}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: visible && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			y: 60,
			opacity: 0
		},
		animate: {
			y: 0,
			opacity: 1
		},
		exit: {
			y: 60,
			opacity: 0
		},
		className: "fixed bottom-4 left-4 z-50 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-border bg-card p-4 shadow-luxe",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: dismiss,
				"aria-label": "Dismiss",
				className: "absolute right-3 top-3 text-muted-foreground hover:text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/pwa-icon-192.png",
					alt: "",
					width: 44,
					height: 44,
					className: "h-11 w-11 rounded-xl"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-sm font-bold text-forest",
					children: "Install EDGELINK Tours"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: "Add the app to your home screen for instant access to bookings, chat and offline itineraries."
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => void install(),
				size: "sm",
				className: "mt-3 w-full bg-gold text-gold-foreground hover:brightness-95",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-1.5 h-4 w-4" }), " Install app"]
			})
		]
	}) })] });
}
function notificationsSupported() {
	return typeof window !== "undefined" && "Notification" in window;
}
function notificationPermission() {
	if (!notificationsSupported()) return "unsupported";
	return Notification.permission;
}
async function requestNotificationPermission() {
	if (!notificationsSupported()) return "unsupported";
	try {
		return await Notification.requestPermission();
	} catch {
		return Notification.permission;
	}
}
/**
* Shows a system notification on desktop and Android/PWA.
* Uses the service worker registration when available (required on mobile Chrome),
* falling back to the plain Notification constructor on desktop.
*/
async function showNotification({ title, body, tag, url }) {
	if (!notificationsSupported() || Notification.permission !== "granted") return false;
	const options = {
		body,
		tag,
		icon: "/icons/icon-192.png",
		badge: "/icons/icon-192.png",
		data: { url: url ?? "/" },
		vibrate: [
			120,
			60,
			120
		]
	};
	try {
		if ("serviceWorker" in navigator) {
			const reg = await navigator.serviceWorker.getRegistration();
			if (reg) {
				await reg.showNotification(title, options);
				return true;
			}
		}
		const n = new Notification(title, options);
		n.onclick = () => {
			window.focus();
			if (url) window.location.href = url;
		};
		return true;
	} catch {
		return false;
	}
}
/**
* Listens for new chat messages (and new bookings for admins) in realtime and
* raises a desktop / phone system notification plus an in-app toast.
*/
function LiveAlerts() {
	const { user, isAdmin, loading } = useAuth();
	const seen = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	(0, import_react.useEffect)(() => {
		if (loading || !user) return;
		const uid = user.id;
		const channel = supabase.channel(`alerts-${uid}`);
		channel.on("postgres_changes", {
			event: "INSERT",
			schema: "public",
			table: "messages"
		}, (payload) => {
			const row = payload.new;
			if (!row?.id || row.sender_id === uid || seen.current.has(row.id)) return;
			seen.current.add(row.id);
			const from = row.sender_role === "admin" ? "EDGELINK support" : "A traveller";
			const body = row.message?.slice(0, 140) || "Sent an attachment";
			const url = isAdmin ? "/admin/chat" : "/dashboard/chat";
			toast.message(`New message from ${from}`, { description: body });
			showNotification({
				title: `New message · ${from}`,
				body,
				tag: `chat-${row.chat_id}`,
				url
			});
		});
		if (isAdmin) {
			channel.on("postgres_changes", {
				event: "INSERT",
				schema: "public",
				table: "bookings"
			}, (payload) => {
				const row = payload.new;
				if (!row?.id || seen.current.has(row.id)) return;
				seen.current.add(row.id);
				const body = `${row.full_name} · ${row.adults} adult${row.adults === 1 ? "" : "s"}${row.children ? ` + ${row.children} children` : ""} · ${row.booking_number}`;
				toast.success("New booking received", { description: body });
				showNotification({
					title: "New booking received",
					body,
					tag: `booking-${row.id}`,
					url: "/admin/bookings"
				});
			});
			channel.on("postgres_changes", {
				event: "INSERT",
				schema: "public",
				table: "tour_quote_requests"
			}, (payload) => {
				const row = payload.new;
				if (!row?.id || seen.current.has(row.id)) return;
				seen.current.add(row.id);
				const body = `${row.full_name} · ${row.phone} · ${row.adults} adult${row.adults === 1 ? "" : "s"}${row.children ? ` + ${row.children} children` : ""}`;
				toast.success("New quotation request received", { description: body });
				showNotification({
					title: "New quotation request",
					body,
					tag: `quote-request-${row.id}`,
					url: "/admin/quotations"
				});
			});
		}
		channel.subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [
		user,
		isAdmin,
		loading
	]);
	return null;
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-7xl font-bold text-forest",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-6 inline-flex items-center rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground",
					children: "Go home"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong. Try again or head home."
				}),
				false,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-md border border-input px-4 py-2 text-sm font-medium",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$33 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "EDGELINK Tours — Luxury Rwandan Safaris" },
			{
				name: "description",
				content: "Journeys crafted for a lifetime. Luxury gorilla trekking, Big Five safaris, and rainforest expeditions across Rwanda."
			},
			{
				property: "og:site_name",
				content: "EDGELINK Tours"
			},
			{
				property: "og:title",
				content: "EDGELINK Tours — Luxury Rwandan Safaris"
			},
			{
				property: "og:description",
				content: "Journeys crafted for a lifetime. Luxury gorilla trekking, Big Five safaris, and rainforest expeditions across Rwanda."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "theme-color",
				content: "#0A2A20"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent"
			},
			{
				name: "apple-mobile-web-app-title",
				content: "EDGELINK"
			},
			{
				name: "mobile-web-app-capable",
				content: "yes"
			}
		],
		links: [
			{
				rel: "manifest",
				href: "/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Work+Sans:wght@400;500;600;700&display=swap"
			},
			{
				rel: "icon",
				type: "image/png",
				href: "/favicon.png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$33.useRouteContext();
	(0, import_react.useEffect)(() => {
		const applyLanguage = (language) => {
			const meta = LANGUAGES.find((item) => item.code === language);
			document.documentElement.dir = meta?.dir ?? "ltr";
			document.documentElement.lang = language;
		};
		applyLanguage(i18n_default.language || "en");
		i18n_default.on("languageChanged", applyLanguage);
		return () => i18n_default.off("languageChanged", applyLanguage);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveAlerts, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PwaInstallPrompt, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
				richColors: true,
				position: "top-right"
			})
		] }) })
	});
}
var $$splitComponentImporter$28 = () => import("./routes-CT3Rv-ih.mjs");
var Route$32 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "EDGELINK Tours — Luxury Rwandan Safaris" },
			{
				name: "description",
				content: "Journeys crafted for a lifetime — luxury gorilla trekking, Big Five safaris, and canopy walks in Rwanda."
			},
			{
				property: "og:url",
				content: "https://edgelink-tours.lovable.app/"
			},
			{
				property: "og:title",
				content: "EDGELINK Tours — Luxury Rwandan Safaris"
			},
			{
				property: "og:description",
				content: "Journeys crafted for a lifetime — luxury gorilla trekking, Big Five safaris, and canopy walks in Rwanda."
			}
		],
		links: [{
			rel: "canonical",
			href: "https://edgelink-tours.lovable.app/"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./route-Di7iQBCH.mjs");
var Route$31 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async ({ location }) => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({
			to: "/auth",
			search: { redirect: location.href }
		});
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./about-Bhrg-eJT.mjs");
var Route$30 = createFileRoute("/about")({
	head: () => ({
		meta: [
			{ title: "About EDGELINK — Rwandan-owned Luxury Safaris" },
			{
				name: "description",
				content: "Founded by Rwandan guides. Twenty years of luxury expeditions, community ownership, and sustainable travel."
			},
			{
				property: "og:url",
				content: "https://edgelink-tours.lovable.app/about"
			},
			{
				property: "og:title",
				content: "About EDGELINK — Rwandan-owned Luxury Safaris"
			},
			{
				property: "og:description",
				content: "Founded by Rwandan guides. Twenty years of luxury expeditions, community ownership, and sustainable travel."
			}
		],
		links: [{
			rel: "canonical",
			href: "https://edgelink-tours.lovable.app/about"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./auth-3u5mXEt2.mjs");
var searchSchema = objectType({
	redirect: stringType().optional(),
	mode: enumType(["signin", "signup"]).optional()
});
var Route$29 = createFileRoute("/auth")({
	validateSearch: (s) => searchSchema.parse(s),
	head: () => ({ meta: [
		{ title: "Sign in — EDGELINK Tours" },
		{
			name: "description",
			content: "Sign in or create your EDGELINK account to manage bookings and share experiences."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./contact-CdzxhzMv.mjs");
objectType({
	full_name: stringType().trim().min(2, "Full name required").max(120),
	email: stringType().trim().email("Invalid email").max(255),
	phone: stringType().trim().min(4, "Phone required").max(40),
	nationality: stringType().optional(),
	country_residence: stringType().optional(),
	adults: stringType().min(1, "Required"),
	children: stringType().optional(),
	children_ages: stringType().optional(),
	travel_dates: stringType().min(1, "Required"),
	destinations: stringType().min(1, "Choose a destination"),
	duration: stringType().optional(),
	budget: stringType().optional(),
	accommodation: stringType().optional(),
	travel_style: stringType().optional(),
	dietary: stringType().optional(),
	mobility: stringType().optional(),
	occasion: stringType().optional(),
	notes: stringType().max(2e3).optional(),
	referral: stringType().optional(),
	contact_method: stringType().optional()
});
var Route$28 = createFileRoute("/contact")({
	head: () => ({
		meta: [
			{ title: "Plan Your Adventure — EDGELINK Tours" },
			{
				name: "description",
				content: "Design your Rwandan safari. WhatsApp us direct at +250 791 900 016 or send us a full inquiry — we reply within 24 hours."
			},
			{
				property: "og:url",
				content: "https://edgelink-tours.lovable.app/contact"
			},
			{
				property: "og:title",
				content: "Plan Your Adventure — EDGELINK Tours"
			},
			{
				property: "og:description",
				content: "Design your Rwandan safari. WhatsApp us direct or send a full inquiry — we reply within 24 hours."
			}
		],
		links: [{
			rel: "canonical",
			href: "https://edgelink-tours.lovable.app/contact"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./destinations-D8TPoq4x.mjs");
var Route$27 = createFileRoute("/destinations")({ component: lazyRouteComponent($$splitComponentImporter$23, "component") });
var FAQS = [
	{
		cat: "General",
		q: "What's the best time to visit Rwanda for a safari?",
		a: "Rwanda has two dry seasons ideal for trekking and game drives: June–September and December–February. The wetter months (March–May, October–November) offer lush landscapes and fewer visitors, but rain gear is essential."
	},
	{
		cat: "General",
		q: "Do I need a visa to visit Rwanda?",
		a: "Most nationalities can get a 30-day visa on arrival for $50 or apply for the East Africa Tourist Visa ($100, covers Rwanda, Kenya, Uganda). Citizens of African Union member states and select others enter visa-free."
	},
	{
		cat: "General",
		q: "Is Rwanda safe for tourists?",
		a: "Yes. Rwanda is consistently ranked one of the safest countries in Africa. Kigali is spotless, crime is very low, and infrastructure is excellent. Standard travel precautions apply."
	},
	{
		cat: "General",
		q: "What vaccinations do I need?",
		a: "Yellow fever certificate is required for entry. We recommend routine vaccinations (Hepatitis A/B, Typhoid, Tetanus) plus anti-malarial prophylaxis. Consult a travel doctor 6–8 weeks before travel."
	},
	{
		cat: "Gorilla Trekking",
		q: "How fit do I need to be for gorilla trekking?",
		a: "Moderate fitness is sufficient. Treks last 2–6 hours through rainforest at altitudes of 2,500–3,500m. We match your group to a gorilla family based on fitness, and porters are always available."
	},
	{
		cat: "Gorilla Trekking",
		q: "What should I wear for gorilla trekking?",
		a: "Long trousers, long-sleeve shirt (tucked in), sturdy waterproof hiking boots, gaiters, gardening gloves for nettles, a rain jacket, hat, and daypack. Neutral colours preferred — no bright reds or whites."
	},
	{
		cat: "Gorilla Trekking",
		q: "How much does a gorilla trekking permit cost?",
		a: "The Rwanda Development Board permit is $1,500 per person per trek. All EDGELINK packages include permits — we secure them 6+ months in advance to guarantee your dates."
	},
	{
		cat: "Gorilla Trekking",
		q: "What are the rules during gorilla trekking?",
		a: "Maintain a 7-metre distance, wear a mask, no flash photography, one-hour maximum with the family, no visits if you're sick, and follow your guide's instructions at all times. These rules protect the gorillas from human diseases."
	},
	{
		cat: "Logistics",
		q: "What's included in a safari package?",
		a: "Every EDGELINK package includes all permits, park fees, luxury lodging, private guided transfers in a 4x4 Land Cruiser, all meals, drinking water, and airport transfers. International flights, travel insurance, and gratuities are excluded."
	},
	{
		cat: "Logistics",
		q: "How do I get to Rwanda?",
		a: "Fly into Kigali International Airport (KGL). Direct flights from Brussels, Amsterdam, Doha, Dubai, Istanbul, Johannesburg, Addis Ababa, and Nairobi. RwandAir, Qatar Airways, KLM, Turkish Airlines, and Ethiopian Airlines all serve KGL."
	},
	{
		cat: "Accommodation",
		q: "Are children allowed on safaris?",
		a: "Yes, we love family safaris. However, gorilla trekking has a minimum age of 15. Children of all ages can enjoy Akagera game drives, Nyungwe canopy walks (with parents), and cultural experiences."
	},
	{
		cat: "Sustainability",
		q: "How does EDGELINK support conservation?",
		a: "We're a Gorilla Friendly™ certified operator. 10% of every package fee is donated to the Dian Fossey Fund and community conservation cooperatives. Our carbon emissions are 100% offset through Rwandan reforestation."
	}
];
var $$splitComponentImporter$22 = () => import("./faq-CP-HxOOf.mjs");
var Route$26 = createFileRoute("/faq")({
	head: () => ({
		meta: [
			{ title: "FAQ — EDGELINK Tours" },
			{
				name: "description",
				content: "Answers to the most common questions about safaris, permits, visas, gorilla trekking, and travel in Rwanda."
			},
			{
				property: "og:title",
				content: "FAQ — EDGELINK Tours"
			},
			{
				property: "og:description",
				content: "Answers to the most common questions about safaris, permits, visas, and gorilla trekking in Rwanda."
			},
			{
				property: "og:url",
				content: "https://edgelink-tours.lovable.app/faq"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://edgelink-tours.lovable.app/faq"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: FAQS.map((f) => ({
					"@type": "Question",
					name: f.q,
					acceptedAnswer: {
						"@type": "Answer",
						text: f.a
					}
				}))
			})
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./gallery-vJiYvyic.mjs");
var Route$25 = createFileRoute("/gallery")({
	head: () => ({ meta: [
		{ title: "Gallery — EDGELINK Tours" },
		{
			name: "description",
			content: "Gorillas, Big Five, canopy walks, and luxury lodges — inside EDGELINK's Rwandan expeditions."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			property: "og:title",
			content: "Gallery — EDGELINK Tours"
		},
		{
			property: "og:description",
			content: "Gorillas, Big Five, canopy walks, and luxury lodges — inside EDGELINK's Rwandan expeditions."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./journal-BZBHRzHC.mjs");
var Route$24 = createFileRoute("/journal")({
	head: () => ({
		meta: [
			{ title: "Journal — EDGELINK Tours" },
			{
				name: "description",
				content: "Stories, guides, and conservation news from Rwanda's national parks — from our guides on the ground."
			},
			{
				property: "og:title",
				content: "Journal — EDGELINK Tours"
			},
			{
				property: "og:description",
				content: "Stories, guides, and conservation news from Rwanda's national parks."
			},
			{
				property: "og:url",
				content: "https://edgelink-tours.lovable.app/journal"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://edgelink-tours.lovable.app/journal"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var Route$23 = createFileRoute("/packages")({ beforeLoad: () => {
	throw redirect({
		to: "/tours",
		replace: true
	});
} });
var $$splitComponentImporter$19 = () => import("./privacy-CQO9dcrD.mjs");
var Route$22 = createFileRoute("/privacy")({
	head: () => ({ meta: [{ title: "Privacy Policy — EDGELINK Tours" }, {
		name: "description",
		content: "Privacy Policy for EDGELINK Tours."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./reset-password-B4NS76mt.mjs");
var Route$21 = createFileRoute("/reset-password")({
	head: () => ({ meta: [{ title: "Reset password — EDGELINK" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
function Nav() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const { user, isAdmin } = useAuth();
	const { t } = useTranslation();
	const NAV = [
		{
			to: "/",
			label: t("nav.home")
		},
		{
			to: "/tours",
			label: t("nav.explore")
		},
		{
			to: "/gallery",
			label: t("nav.gallery")
		},
		{
			to: "/sustainability",
			label: t("nav.sustainability")
		},
		{
			to: "/journal",
			label: t("nav.journal")
		},
		{
			to: "/faq",
			label: t("nav.faq")
		},
		{
			to: "/about",
			label: t("nav.about")
		},
		{
			to: "/contact",
			label: t("nav.contact")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, {
					className: "shrink-0 text-forest",
					imageClassName: "h-14 w-14",
					onClick: () => setOpen(false)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "ml-6 hidden flex-1 items-center gap-1 xl:flex",
					"aria-label": "Primary",
					children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: n.to,
						activeOptions: { exact: n.to === "/" },
						className: "rounded-md px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-forest data-[status=active]:text-forest data-[status=active]:font-semibold",
						children: n.label
					}, n.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSwitcher, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
						user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "outline",
							className: "hidden md:inline-flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: isAdmin ? "/admin" : "/dashboard",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "mr-1.5 h-4 w-4" }), isAdmin ? t("nav.admin") : t("nav.dashboard")]
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "ghost",
							className: "hidden md:inline-flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/auth",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "mr-1.5 h-4 w-4" }),
									" ",
									t("nav.signIn")
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							className: "hidden bg-gold text-gold-foreground shadow-luxe hover:brightness-95 md:inline-flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								children: t("nav.bookNow")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "xl:hidden",
							onClick: () => setOpen((o) => !o),
							"aria-label": "Toggle menu",
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				y: -8
			},
			animate: {
				opacity: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				y: -8
			},
			transition: { duration: .2 },
			className: "border-t border-border bg-background xl:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3",
				children: [
					NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: n.to,
						onClick: () => setOpen(false),
						className: "rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent",
						children: n.label
					}, n.to)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						onClick: () => setOpen(false),
						className: "mt-2 rounded-md bg-gold px-3 py-2.5 text-center text-sm font-semibold text-gold-foreground",
						children: t("nav.bookNow")
					}),
					user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: isAdmin ? "/admin" : "/dashboard",
						onClick: () => setOpen(false),
						className: "rounded-md border border-forest px-3 py-2.5 text-center text-sm font-semibold text-forest",
						children: isAdmin ? t("nav.adminPanel") : t("nav.myDashboard")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/auth",
						onClick: () => setOpen(false),
						className: "rounded-md border border-forest px-3 py-2.5 text-center text-sm font-semibold text-forest",
						children: [
							t("nav.signIn"),
							" / ",
							t("nav.createAccount")
						]
					})
				]
			})
		}) })]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-24 border-t border-border bg-forest-deep text-primary-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, {
					imageClassName: "h-16 w-16",
					className: "text-primary-foreground"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-primary-foreground/70",
					children: "Journeys crafted for a lifetime — through the Land of a Thousand Hills."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "mb-3 font-display text-sm font-semibold uppercase tracking-wider text-gold",
					children: "Explore"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm text-primary-foreground/80",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/destinations",
							className: "hover:text-gold",
							children: "Destinations"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/tours",
							className: "hover:text-gold",
							children: "Packages"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/gallery",
							className: "hover:text-gold",
							children: "Gallery"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							className: "hover:text-gold",
							children: "About"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "mb-3 font-display text-sm font-semibold uppercase tracking-wider text-gold",
					children: "Contact"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm text-primary-foreground/80",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 text-gold" }), "KG 7 Ave, Kigali, Rwanda"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "mt-0.5 h-4 w-4 shrink-0 text-gold" }), "+250 791 900 016"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "mt-0.5 h-4 w-4 shrink-0 text-gold" }), "info@edgelinktours.com"]
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "mb-3 font-display text-sm font-semibold uppercase tracking-wider text-gold",
						children: "Follow"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-3",
						children: [
							Instagram,
							Facebook,
							Twitter
						].map((Icon, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							"aria-label": "Social link",
							className: "grid h-9 w-9 place-items-center rounded-full border border-gold/40 text-gold transition hover:bg-gold hover:text-gold-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-primary-foreground/60",
						children: "Working hours: Mon–Sat, 08:00–19:00 CAT"
					})
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-white/10 px-4 py-4 text-center text-xs text-primary-foreground/60 md:px-6",
			children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" EDGELINK Tours · Explore the Beauty"
			]
		})]
	});
}
var PREVIEW_MESSAGES = [
	{
		from: "desk",
		text: "Hello. How can we help shape your Rwanda journey?"
	},
	{
		from: "traveller",
		text: "I would love to know more about gorilla permits."
	},
	{
		from: "desk",
		text: "Of course. We can help with permits, dates and the right lodge."
	}
];
function FloatingCTA() {
	const { user } = useAuth();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [messages, setMessages] = (0, import_react.useState)(PREVIEW_MESSAGES);
	const chatTarget = user ? "/dashboard/chat" : "/auth?redirect=%2Fdashboard%2Fchat";
	function sendMessage(event) {
		event?.preventDefault();
		const text = draft.trim();
		if (!text) return;
		setMessages((current) => [...current, {
			from: "traveller",
			text
		}]);
		setDraft("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 md:bottom-6 md:right-6",
		children: [open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto mb-1 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between bg-forest px-4 py-3 text-cream",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative grid h-9 w-9 place-items-center rounded-full bg-gold text-gold-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadsetIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-forest bg-emerald-400" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: "EDGELINK Travel Desk"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-cream/65",
							children: "Usually replies within a few minutes"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setOpen(false),
						className: "rounded-full p-1.5 text-cream/70 transition hover:bg-cream/10 hover:text-cream",
						"aria-label": "Close chat preview",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2.5 bg-muted/35 p-3",
					children: messages.map((message, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `flex ${message.from === "traveller" ? "justify-end" : "justify-start"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `max-w-[86%] rounded-xl px-3 py-2 text-xs leading-relaxed ${message.from === "traveller" ? "rounded-br-sm bg-forest text-cream" : "rounded-bl-sm border border-border bg-card text-foreground"}`,
							children: message.text
						})
					}, `${message.from}-${index}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: sendMessage,
					className: "flex items-center gap-2 border-t border-border bg-card p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: draft,
						onChange: (event) => setDraft(event.target.value),
						placeholder: "Type a message...",
						"aria-label": "Type a chat message",
						className: "h-10 min-w-0 flex-1 rounded-lg border border-input bg-background px-3 text-xs outline-none transition placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-gold/20"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: !draft.trim(),
						className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-forest text-cream transition hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-40",
						"aria-label": "Send message",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 border-t border-border bg-card p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: chatTarget,
						className: "flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-gold px-3 text-xs font-semibold text-gold-foreground transition hover:brightness-95",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "h-3.5 w-3.5" }), " Open full chat"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setOpen(false),
						className: "grid h-10 w-10 place-items-center rounded-lg border border-border text-muted-foreground transition hover:border-gold hover:text-forest",
						"aria-label": "Minimize chat preview",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setOpen((value) => !value),
			className: "pointer-events-auto flex items-center gap-2 rounded-full bg-forest px-4 py-3 text-sm font-semibold text-cream shadow-luxe transition hover:bg-forest-deep",
			"aria-expanded": open,
			"aria-label": open ? "Close support chat" : "Open support chat",
			children: [
				open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden sm:inline",
					children: open ? "Close chat" : "Chat with us"
				}),
				!open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-emerald-400" })
			]
		})]
	});
}
function HeadsetIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Headphones, { className: "h-4 w-4" });
}
function AppShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.main, {
				initial: {
					opacity: 0,
					y: 8
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .35,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingCTA, {})
		]
	});
}
var IMAGES = {
	gorilla: tour_gorilla_default,
	akagera: tour_akagera_default,
	nyungwe: tour_nyungwe_default,
	kivu: tour_kivu_default,
	kigali: tour_kigali_default,
	cruiser: tour_cruiser_default
};
var TESTIMONIALS = [
	{
		name: "Michael Chen",
		location: "Singapore",
		text: "The most seamless safari we've ever experienced. Every detail was anticipated."
	},
	{
		name: "Sarah Johnson",
		location: "United Kingdom",
		text: "EDGELINK made our gorilla trekking dream come true. The guides were phenomenal."
	},
	{
		name: "David Kim",
		location: "United States",
		text: "Luxury, adventure, and sustainability — EDGELINK delivers on all three."
	},
	{
		name: "Emma & Jack",
		location: "Australia",
		text: "We've traveled to 30+ countries, and this was our best experience."
	},
	{
		name: "Maria Rodriguez",
		location: "Spain",
		text: "The canopy walk in Nyungwe was breathtaking. Everything was perfectly organized."
	},
	{
		name: "James O'Brien",
		location: "Ireland",
		text: "From arrival to departure, we felt completely taken care of. 10/10."
	}
];
var TEAM = [
	{
		name: "Jean-Pierre Niyonzima",
		role: "Founder & Lead Guide",
		bio: "Twenty years of leading treks in Volcanoes NP. RDB-certified silverback specialist.",
		initials: "JP"
	},
	{
		name: "Grace Uwimana",
		role: "Operations Manager",
		bio: "Fifteen years orchestrating logistics for high-net-worth travellers across East Africa.",
		initials: "GU"
	},
	{
		name: "Emmanuel Habimana",
		role: "Senior Safari Guide",
		bio: "Akagera-based ranger-turned-guide, specialist in rhino tracking and birdlife.",
		initials: "EH"
	},
	{
		name: "Claire Mukamana",
		role: "Guest Relations",
		bio: "First-language English, French, and Kinyarwanda. Your concierge on the ground.",
		initials: "CM"
	},
	{
		name: "Dr. James Wilson",
		role: "Conservation Partner",
		bio: "Primatologist working with Dian Fossey Fund on gorilla family research.",
		initials: "JW"
	},
	{
		name: "Aline Ishimwe",
		role: "Marketing & Communications",
		bio: "Storyteller in three languages. Documents every EDGELINK journey.",
		initials: "AI"
	}
];
var VALUES = [
	{
		title: "Sustainability",
		body: "Carbon-neutral itineraries, revenue routed to park conservation, single-use plastics banned."
	},
	{
		title: "Community",
		body: "Local ownership. Every trip supports cooperatives, schools, and community health projects."
	},
	{
		title: "Excellence",
		body: "Small groups, private vehicles, and the finest lodges — no compromises on quality."
	},
	{
		title: "Authenticity",
		body: "Real Rwanda, real people. Curated by locals who know the country's every ridge."
	}
];
var PARTNERS = [
	"Rwanda Development Board",
	"Gorilla Friendly™",
	"Sustainable Travel International",
	"Eco-Tourism Rwanda",
	"Luxury Safari Alliance"
];
var Route$20 = createFileRoute("/sustainability")({
	head: () => ({
		meta: [
			{ title: "Sustainability — EDGELINK Tours" },
			{
				name: "description",
				content: "Carbon-neutral safaris, community-owned lodges, park-fee positive travel. How EDGELINK travels with purpose."
			},
			{
				property: "og:title",
				content: "Travel with Purpose — EDGELINK Sustainability"
			},
			{
				property: "og:description",
				content: "Carbon-neutral safaris, community-owned lodges, park-fee positive travel."
			},
			{
				property: "og:url",
				content: "https://edgelink-tours.lovable.app/sustainability"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://edgelink-tours.lovable.app/sustainability"
		}]
	}),
	component: Sustainability
});
var COMMITMENTS = [
	{
		icon: Leaf,
		title: "Carbon Neutral",
		body: "We offset 100% of our operational carbon emissions through verified reforestation partners in the Volcanoes buffer zone."
	},
	{
		icon: Users,
		title: "Community Ownership",
		body: "We partner exclusively with community-owned lodges and employ local staff at every level — from guides to management."
	},
	{
		icon: ShieldCheck,
		title: "Park-Fee Positive",
		body: "Every safari contributes directly to conservation. Park fees fund ranger salaries, habitat protection, and anti-poaching patrols."
	},
	{
		icon: Award,
		title: "Gorilla Friendly Certified",
		body: "We follow strict IGCP protocols — mask-wearing, 7m distance, one-hour visits — to protect the mountain gorilla population."
	}
];
var TIPS = [
	{
		icon: Droplets,
		title: "Refill, don't buy",
		body: "Every lodge has filtered water stations. Bring a reusable bottle — we provide one on arrival."
	},
	{
		icon: Recycle,
		title: "Pack out what you pack in",
		body: "Rwanda banned single-use plastics in 2008. Please respect the ban at customs and beyond."
	},
	{
		icon: TreePine,
		title: "Leave only footprints",
		body: "Stay on marked trails in national parks. Vegetation regrows slowly at altitude."
	},
	{
		icon: HeartHandshake,
		title: "Buy local",
		body: "Cooperatives, coffee farms, and craft markets recycle your spend into local communities."
	}
];
function Sustainability() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border bg-forest-deep py-16 text-primary-foreground md:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 md:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold",
						children: "Our Commitment"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-bold md:text-5xl",
						children: "Travel with Purpose"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-primary-foreground/80",
						children: "Rwanda is a global model for conservation-led tourism. Every EDGELINK journey directly funds the parks, people, and primates that make it possible."
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-10 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold",
					children: "Our Commitments"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-bold md:text-4xl",
					children: "Four pillars of responsible travel"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: COMMITMENTS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-forest text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, { className: "h-6 w-6 text-gold" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl font-bold text-forest",
							children: c.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: c.body
						})
					]
				}, c.title))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-muted/40 py-16 md:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 md:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-10 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold",
						children: "Partnerships"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-bold md:text-4xl",
						children: "Recognised & certified"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap items-center justify-center gap-x-10 gap-y-4",
					children: PARTNERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-gold" }), p]
					}, p))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-10 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold",
						children: "Traveller Guide"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-bold md:text-4xl",
						children: "How to travel responsibly in Rwanda"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4",
					children: TIPS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card p-6 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t.icon, { className: "h-6 w-6 text-gold" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 font-display text-lg font-bold",
								children: t.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: t.body
							})
						]
					}, t.title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-14 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						className: "bg-gold text-gold-foreground hover:brightness-95",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							children: "Plan a Purposeful Journey"
						})
					})
				})
			]
		})
	] });
}
var $$splitComponentImporter$17 = () => import("./terms-C3iLVbG-.mjs");
var Route$19 = createFileRoute("/terms")({
	head: () => ({ meta: [{ title: "Terms of Service — EDGELINK Tours" }, {
		name: "description",
		content: "Terms of Service for EDGELINK Tours."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./tours-DylRhYpY.mjs");
var Route$18 = createFileRoute("/tours")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./route-DRtbk0sU.mjs");
var Route$17 = createFileRoute("/_authenticated/admin")({
	ssr: false,
	beforeLoad: async ({ location }) => {
		const { data: userData } = await supabase.auth.getUser();
		if (!userData.user) throw redirect({
			to: "/auth",
			search: { redirect: location.href }
		});
		const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", userData.user.id).eq("role", "admin");
		if (!roles || roles.length === 0) throw redirect({ to: "/dashboard" });
	},
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var Route$16 = createFileRoute("/destinations/")({ beforeLoad: () => {
	throw redirect({
		to: "/tours",
		replace: true
	});
} });
var Route$15 = createFileRoute("/destinations/$slug")({ beforeLoad: () => {
	throw redirect({
		to: "/tours",
		replace: true
	});
} });
var $$splitComponentImporter$14 = () => import("./tours.index-C6uD_lFP.mjs");
var Route$14 = createFileRoute("/tours/")({
	head: () => ({ meta: [
		{ title: "Tours — EDGELINK Tours" },
		{
			name: "description",
			content: "Browse every EDGELINK Tours expedition: gorilla trekking, Big Five safaris, rainforest canopy walks and Lake Kivu retreats."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			property: "og:title",
			content: "Tours — EDGELINK Tours"
		},
		{
			property: "og:description",
			content: "Browse every EDGELINK Tours expedition across Rwanda's parks and lakes."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./tours._slug-LMb_Dg-U.mjs");
var Route$13 = createFileRoute("/tours/$slug")({
	head: () => ({ meta: [
		{ title: "Tour details — EDGELINK Tours" },
		{
			name: "description",
			content: "Full itinerary, inclusions and pricing for this EDGELINK Tours expedition in Rwanda."
		},
		{
			property: "og:type",
			content: "article"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			property: "og:title",
			content: "Tour details — EDGELINK Tours"
		},
		{
			property: "og:description",
			content: "Full itinerary, inclusions and pricing for this EDGELINK Tours expedition."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./admin-DceLLQoe.mjs");
var Route$12 = createFileRoute("/_authenticated/admin/")({
	head: () => ({ meta: [{ title: "Admin overview — EDGELINK" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./bookings-4SmxRuhu.mjs");
var Route$11 = createFileRoute("/_authenticated/admin/bookings")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./chat-Di6dQBV_.mjs");
var Route$10 = createFileRoute("/_authenticated/admin/chat")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./experiences-CJlT5r8i.mjs");
var Route$9 = createFileRoute("/_authenticated/admin/experiences")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./gallery-FcZ96Hfg.mjs");
var Route$8 = createFileRoute("/_authenticated/admin/gallery")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./journal-8lUnVO9E.mjs");
var Route$7 = createFileRoute("/_authenticated/admin/journal")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./quotations-DBonp-La.mjs");
var Route$6 = createFileRoute("/_authenticated/admin/quotations")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./tours-B4hxwQfx.mjs");
var Route$5 = createFileRoute("/_authenticated/admin/tours")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./dashboard.index-DFO2pPde.mjs");
var Route$4 = createFileRoute("/_authenticated/dashboard/")({
	head: () => ({ meta: [
		{ title: "My Dashboard — EDGELINK Tours" },
		{
			name: "description",
			content: "Track your safari bookings, chat with your travel designer and share your EDGELINK Tours experiences."
		},
		{
			property: "og:title",
			content: "My Dashboard — EDGELINK Tours"
		},
		{
			property: "og:description",
			content: "Track your safari bookings, chat with your travel designer and share your experiences."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./dashboard.bookings-NbDH0jg_.mjs");
var Route$3 = createFileRoute("/_authenticated/dashboard/bookings")({
	head: () => ({ meta: [{ title: "My bookings — EDGELINK Tours" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./dashboard.chat-BkPVJyt8.mjs");
var Route$2 = createFileRoute("/_authenticated/dashboard/chat")({
	head: () => ({ meta: [
		{ title: "Support chat — EDGELINK Tours" },
		{
			name: "description",
			content: "Message your EDGELINK Tours travel designer in real time about bookings, itineraries and payments."
		},
		{
			property: "og:title",
			content: "Support chat — EDGELINK Tours"
		},
		{
			property: "og:description",
			content: "Message your travel designer in real time."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./dashboard.experiences-BNFkH7Oq.mjs");
var Route$1 = createFileRoute("/_authenticated/dashboard/experiences")({
	head: () => ({ meta: [{ title: "Share an experience — EDGELINK Tours" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./dashboard.profile-5FEFcTXE.mjs");
var Route = createFileRoute("/_authenticated/dashboard/profile")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$32.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$33
});
var AuthenticatedRouteRoute = Route$31.update({
	id: "/_authenticated",
	getParentRoute: () => Route$33
});
var AboutRoute = Route$30.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$33
});
var AuthRoute = Route$29.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$33
});
var ContactRoute = Route$28.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$33
});
var DestinationsRoute = Route$27.update({
	id: "/destinations",
	path: "/destinations",
	getParentRoute: () => Route$33
});
var FaqRoute = Route$26.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => Route$33
});
var GalleryRoute = Route$25.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => Route$33
});
var JournalRoute = Route$24.update({
	id: "/journal",
	path: "/journal",
	getParentRoute: () => Route$33
});
var PackagesRoute = Route$23.update({
	id: "/packages",
	path: "/packages",
	getParentRoute: () => Route$33
});
var PrivacyRoute = Route$22.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$33
});
var ResetPasswordRoute = Route$21.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$33
});
var SustainabilityRoute = Route$20.update({
	id: "/sustainability",
	path: "/sustainability",
	getParentRoute: () => Route$33
});
var TermsRoute = Route$19.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$33
});
var ToursRoute = Route$18.update({
	id: "/tours",
	path: "/tours",
	getParentRoute: () => Route$33
});
var AuthenticatedAdminRouteRoute = Route$17.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
});
var DestinationsIndexRoute = Route$16.update({
	id: "/",
	path: "/",
	getParentRoute: () => DestinationsRoute
});
var DestinationsSlugRoute = Route$15.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => DestinationsRoute
});
var ToursIndexRoute = Route$14.update({
	id: "/",
	path: "/",
	getParentRoute: () => ToursRoute
});
var ToursSlugRoute = Route$13.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => ToursRoute
});
var AuthenticatedAdminIndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthenticatedAdminRouteRoute
});
var AuthenticatedAdminBookingsRoute = Route$11.update({
	id: "/bookings",
	path: "/bookings",
	getParentRoute: () => AuthenticatedAdminRouteRoute
});
var AuthenticatedAdminChatRoute = Route$10.update({
	id: "/chat",
	path: "/chat",
	getParentRoute: () => AuthenticatedAdminRouteRoute
});
var AuthenticatedAdminExperiencesRoute = Route$9.update({
	id: "/experiences",
	path: "/experiences",
	getParentRoute: () => AuthenticatedAdminRouteRoute
});
var AuthenticatedAdminGalleryRoute = Route$8.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => AuthenticatedAdminRouteRoute
});
var AuthenticatedAdminJournalRoute = Route$7.update({
	id: "/journal",
	path: "/journal",
	getParentRoute: () => AuthenticatedAdminRouteRoute
});
var AuthenticatedAdminQuotationsRoute = Route$6.update({
	id: "/quotations",
	path: "/quotations",
	getParentRoute: () => AuthenticatedAdminRouteRoute
});
var AuthenticatedAdminToursRoute = Route$5.update({
	id: "/tours",
	path: "/tours",
	getParentRoute: () => AuthenticatedAdminRouteRoute
});
var AuthenticatedDashboardIndexRoute = Route$4.update({
	id: "/dashboard/",
	path: "/dashboard/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardBookingsRoute = Route$3.update({
	id: "/dashboard/bookings",
	path: "/dashboard/bookings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardChatRoute = Route$2.update({
	id: "/dashboard/chat",
	path: "/dashboard/chat",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardExperiencesRoute = Route$1.update({
	id: "/dashboard/experiences",
	path: "/dashboard/experiences",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardProfileRoute = Route.update({
	id: "/dashboard/profile",
	path: "/dashboard/profile",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminRouteRouteChildren = {
	AuthenticatedAdminBookingsRoute,
	AuthenticatedAdminChatRoute,
	AuthenticatedAdminExperiencesRoute,
	AuthenticatedAdminGalleryRoute,
	AuthenticatedAdminJournalRoute,
	AuthenticatedAdminQuotationsRoute,
	AuthenticatedAdminToursRoute,
	AuthenticatedAdminIndexRoute
};
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAdminRouteRoute: AuthenticatedAdminRouteRoute._addFileChildren(AuthenticatedAdminRouteRouteChildren),
	AuthenticatedDashboardBookingsRoute,
	AuthenticatedDashboardChatRoute,
	AuthenticatedDashboardExperiencesRoute,
	AuthenticatedDashboardProfileRoute,
	AuthenticatedDashboardIndexRoute
};
var AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
var DestinationsRouteChildren = {
	DestinationsSlugRoute,
	DestinationsIndexRoute
};
var DestinationsRouteWithChildren = DestinationsRoute._addFileChildren(DestinationsRouteChildren);
var ToursRouteChildren = {
	ToursSlugRoute,
	ToursIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
	AboutRoute,
	AuthRoute,
	ContactRoute,
	DestinationsRoute: DestinationsRouteWithChildren,
	FaqRoute,
	GalleryRoute,
	JournalRoute,
	PackagesRoute,
	PrivacyRoute,
	ResetPasswordRoute,
	SustainabilityRoute,
	TermsRoute,
	ToursRoute: ToursRoute._addFileChildren(ToursRouteChildren)
};
var routeTree = Route$33._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { useAuth as C, LANGUAGES as S, tour_kivu_default as _, TEAM as a, LanguageSwitcher as b, AppShell as c, requestNotificationPermission as d, showNotification as f, tour_kigali_default as g, tour_gorilla_default as h, PARTNERS as i, FAQS as l, tour_cruiser_default as m, Route$13 as n, TESTIMONIALS as o, tour_akagera_default as p, IMAGES as r, VALUES as s, router_exports as t, notificationPermission as u, tour_nyungwe_default as v, ThemeToggle as x, BrandLogo as y };
