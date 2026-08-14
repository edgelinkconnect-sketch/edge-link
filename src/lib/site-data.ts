import gorilla from "@/assets/tour-gorilla.jpg";
import akagera from "@/assets/tour-akagera.jpg";
import nyungwe from "@/assets/tour-nyungwe.jpg";
import kivu from "@/assets/tour-kivu.jpg";
import kigali from "@/assets/tour-kigali.jpg";
import cruiser from "@/assets/tour-cruiser.jpg";

export const IMAGES = { gorilla, akagera, nyungwe, kivu, kigali, cruiser };

export type DestinationSlug = "volcanoes" | "akagera" | "nyungwe";

export type Destination = {
  slug: DestinationSlug;
  name: string;
  tagline: string;
  overview: string;
  image: string;
  activity: "Trekking" | "Safari" | "Canopy Walk";
  priceFrom: number;
  permit?: number;
  whatToExpect: { title: string; body: string }[];
  bestTime: { month: string; label: string; rating: "Excellent" | "Good" | "Fair" }[];
  lodges: { name: string; blurb: string }[];
  itinerary: { day: number; title: string; body: string }[];
  gallery: string[];
};

export const DESTINATIONS: Destination[] = [
  {
    slug: "volcanoes",
    name: "Volcanoes National Park",
    tagline: "Track mountain gorillas in Africa's most iconic rainforest",
    overview:
      "Trek through misty bamboo forest to spend one intimate hour with a habituated mountain gorilla family — one of only about 1,000 individuals left on earth.",
    image: gorilla,
    activity: "Trekking",
    priceFrom: 3500,
    permit: 1500,
    whatToExpect: [
      { title: "Trekking difficulty", body: "Moderate to challenging. Treks range 2–6 hours through rainforest and volcanic terrain. Porters available." },
      { title: "Group sizes", body: "Maximum 8 travellers per gorilla family, per day. Small-group experience is guaranteed." },
      { title: "Permits", body: "Rwanda Development Board permit required ($1,500 per person). Included in every EDGELINK package." },
    ],
    bestTime: [
      { month: "Jan–Feb", label: "Dry season — prime trekking", rating: "Excellent" },
      { month: "Mar–May", label: "Long rains, lush landscapes", rating: "Fair" },
      { month: "Jun–Sep", label: "Dry season — peak visibility", rating: "Excellent" },
      { month: "Oct–Nov", label: "Short rains, fewer visitors", rating: "Good" },
      { month: "Dec", label: "Festive, dry, book early", rating: "Excellent" },
    ],
    lodges: [
      { name: "Singita Kwitonda Lodge", blurb: "Eight suites facing the volcanoes, private plunge pools, in-lodge spa." },
      { name: "Bisate Lodge", blurb: "Wilderness Safaris' spherical villas on a reforested crater rim." },
      { name: "One&Only Gorilla's Nest", blurb: "Old-world timber lodges tucked among eucalyptus forest." },
    ],
    itinerary: [
      { day: 1, title: "Kigali → Musanze", body: "Private Land Cruiser transfer, briefing over dinner at your lodge." },
      { day: 2, title: "Gorilla trek", body: "Early park HQ briefing, guided trek to your assigned family, one full hour with the group." },
      { day: 3, title: "Return", body: "Optional golden monkey visit or Dian Fossey grave hike, transfer to Kigali." },
    ],
    gallery: [gorilla, nyungwe, cruiser, kivu, kigali, akagera],
  },
  {
    slug: "akagera",
    name: "Akagera National Park",
    tagline: "Big Five safari across savannah, wetlands and rolling hills",
    overview:
      "Rwanda's only savannah park, home to lion, rhino, elephant, leopard, and buffalo — reintroduced through African Parks in one of Africa's great conservation stories.",
    image: akagera,
    activity: "Safari",
    priceFrom: 2800,
    whatToExpect: [
      { title: "Game drives", body: "Morning and afternoon drives across acacia woodland, plains, and Lake Ihema shoreline." },
      { title: "Boat safaris", body: "Sunset cruises on Lake Ihema for hippo, crocodile, and 480+ bird species." },
      { title: "Rhino & lion tracking", body: "Guided tracking with park rangers in northern Kilala Plains." },
    ],
    bestTime: [
      { month: "Jan–Feb", label: "Dry, excellent game viewing", rating: "Excellent" },
      { month: "Mar–May", label: "Green season, lower prices", rating: "Fair" },
      { month: "Jun–Sep", label: "Peak dry season", rating: "Excellent" },
      { month: "Oct–Nov", label: "Short rains, calving season", rating: "Good" },
      { month: "Dec", label: "Warm, dry, festive", rating: "Excellent" },
    ],
    lodges: [
      { name: "Magashi Camp", blurb: "Six tented suites on Lake Rwanyakazinga, Wilderness Safaris flagship." },
      { name: "Ruzizi Tented Lodge", blurb: "Lakeside eco-camp with revenue supporting park conservation." },
      { name: "Karenge Bush Camp", blurb: "Seasonal safari camp in remote northern plains." },
    ],
    itinerary: [
      { day: 1, title: "Kigali → Akagera", body: "Scenic three-hour transfer east, afternoon game drive." },
      { day: 2, title: "Full-day safari", body: "Sunrise drive, boat safari on Lake Ihema, evening game drive." },
      { day: 3, title: "Northern plains", body: "Rhino & lion tracking, cultural visit with Masaka community." },
      { day: 4, title: "Return", body: "Final morning drive, transfer to Kigali." },
    ],
    gallery: [akagera, cruiser, kivu, gorilla, nyungwe, kigali],
  },
  {
    slug: "nyungwe",
    name: "Nyungwe National Park",
    tagline: "Canopy walks and chimpanzee tracking in ancient rainforest",
    overview:
      "One of Africa's oldest rainforests — 1,000 sq km of primary forest home to 13 primate species, 300 bird species, and the continent's only high-canopy walkway.",
    image: nyungwe,
    activity: "Canopy Walk",
    priceFrom: 3200,
    whatToExpect: [
      { title: "Chimpanzee tracking", body: "Early-morning trek to a habituated community. Sightings not guaranteed but likely." },
      { title: "Canopy walkway", body: "A 70-metre-high suspension bridge over the forest canopy — Africa's only." },
      { title: "Birdwatching", body: "Great Blue Turaco, Ruwenzori Turaco, and 27 Albertine Rift endemics." },
    ],
    bestTime: [
      { month: "Jan–Feb", label: "Short dry season", rating: "Good" },
      { month: "Mar–May", label: "Wettest, dense forest", rating: "Fair" },
      { month: "Jun–Sep", label: "Long dry — best trekking", rating: "Excellent" },
      { month: "Oct–Nov", label: "Short rains", rating: "Fair" },
      { month: "Dec", label: "Warm, mostly dry", rating: "Good" },
    ],
    lodges: [
      { name: "One&Only Nyungwe House", blurb: "22 suites on a working tea plantation bordering the park." },
      { name: "Nyungwe Top View Hill Hotel", blurb: "Panoramic ridge-top eco-lodge with warm hospitality." },
      { name: "Gisakura Guest House", blurb: "Simple, comfortable base for early chimp treks." },
    ],
    itinerary: [
      { day: 1, title: "Kigali → Nyungwe", body: "Scenic Congo-Nile Trail drive via Nyanza King's Palace." },
      { day: 2, title: "Canopy walkway", body: "Guided walk on the Igishigishigi trail and 70m canopy bridge." },
      { day: 3, title: "Chimpanzee trek", body: "Pre-dawn departure to track a habituated chimp community." },
      { day: 4, title: "Tea estate & return", body: "Gisakura tea estate tour and lunch, transfer to Kigali." },
    ],
    gallery: [nyungwe, gorilla, kivu, cruiser, kigali, akagera],
  },
];

export const PACKAGES = [
  {
    id: "gorilla-encounter",
    name: "Gorilla Encounter",
    duration: "3 days",
    price: 3500,
    image: gorilla,
    tag: "Signature",
    highlights: ["One-hour gorilla family visit", "Luxury lodge in Musanze", "Private Land Cruiser"],
    park: "Volcanoes",
    inclusions: ["Gorilla permit ($1,500)", "2 nights luxury lodge", "All park fees", "Private guide & driver", "All meals"],
    exclusions: ["International flights", "Travel insurance", "Gratuities"],
    itinerary: [
      { day: 1, title: "Kigali → Musanze", body: "Private transfer, dinner briefing at Singita Kwitonda." },
      { day: 2, title: "Gorilla trek", body: "Morning trek, one hour with the family, afternoon at leisure." },
      { day: 3, title: "Return", body: "Optional golden monkey trek, transfer to Kigali." },
    ],
  },
  {
    id: "big-five",
    name: "Big Five Safari",
    duration: "4 days",
    price: 2800,
    image: akagera,
    tag: "Best Seller",
    highlights: ["Lion & rhino tracking", "Sunset boat safari on Lake Ihema", "Tented luxury camp"],
    park: "Akagera",
    inclusions: ["3 nights Magashi Camp", "All game drives", "Boat safari", "All park fees", "All meals & drinks"],
    exclusions: ["International flights", "Travel insurance", "Gratuities"],
    itinerary: [
      { day: 1, title: "Kigali → Akagera", body: "Scenic drive east, afternoon game drive." },
      { day: 2, title: "Full-day safari", body: "Morning drive, boat safari, evening drive." },
      { day: 3, title: "Northern plains", body: "Rhino & lion tracking with rangers." },
      { day: 4, title: "Return", body: "Final drive, transfer to Kigali." },
    ],
  },
  {
    id: "primate-expedition",
    name: "Primate Expedition",
    duration: "5 days",
    price: 4600,
    image: nyungwe,
    tag: "Eco-luxe",
    highlights: ["Chimpanzee & gorilla tracking", "Canopy walk", "Two national parks"],
    park: "Nyungwe + Volcanoes",
    inclusions: ["Gorilla + chimp permits", "4 nights luxury lodges", "All transfers", "All park fees", "All meals"],
    exclusions: ["International flights", "Travel insurance", "Gratuities"],
    itinerary: [
      { day: 1, title: "Kigali → Nyungwe", body: "Scenic transfer through the tea highlands." },
      { day: 2, title: "Canopy walk", body: "Suspended canopy bridge, forest hike." },
      { day: 3, title: "Chimp trek", body: "Pre-dawn chimpanzee tracking." },
      { day: 4, title: "Nyungwe → Musanze", body: "Cross-country transfer to Volcanoes." },
      { day: 5, title: "Gorilla trek & return", body: "Morning gorilla family visit, transfer to Kigali." },
    ],
  },
  {
    id: "ultimate-rwanda",
    name: "Ultimate Rwanda",
    duration: "7 days",
    price: 6800,
    image: cruiser,
    tag: "Grand Tour",
    highlights: ["All three national parks", "Gorilla, chimp & Big Five", "Curated luxury lodges"],
    park: "Volcanoes + Akagera + Nyungwe",
    inclusions: ["All permits", "6 nights luxury lodging", "Private guide throughout", "All park fees", "All meals & drinks"],
    exclusions: ["International flights", "Travel insurance", "Gratuities"],
    itinerary: [
      { day: 1, title: "Kigali arrival", body: "Boutique hotel, welcome dinner." },
      { day: 2, title: "→ Akagera", body: "Afternoon game drive." },
      { day: 3, title: "Big Five safari", body: "Game drives & boat safari." },
      { day: 4, title: "→ Nyungwe", body: "Transfer via Kigali, canopy walk." },
      { day: 5, title: "Chimp trek", body: "Morning chimpanzee tracking, tea estate visit." },
      { day: 6, title: "→ Volcanoes", body: "Cross-country transfer, briefing." },
      { day: 7, title: "Gorilla trek & return", body: "Gorilla family visit, transfer to Kigali." },
    ],
  },
  {
    id: "luxury-honeymoon",
    name: "Luxury Honeymoon",
    duration: "6 days",
    price: 5900,
    image: kivu,
    tag: "Romance",
    highlights: ["Private gorilla trek", "Lake Kivu retreat", "Sunset kayak & couple's spa"],
    park: "Volcanoes + Lake Kivu",
    inclusions: ["Gorilla permits", "5 nights luxury suites", "Private transfers", "Couple's spa treatment", "All meals"],
    exclusions: ["International flights", "Travel insurance", "Gratuities"],
    itinerary: [
      { day: 1, title: "Kigali → Musanze", body: "Boutique lodge, welcome dinner under the stars." },
      { day: 2, title: "Gorilla trek", body: "Family visit, afternoon at leisure." },
      { day: 3, title: "Musanze → Lake Kivu", body: "Scenic drive along the Congo-Nile ridge." },
      { day: 4, title: "Island hop", body: "Boat tour of Napoleon Island and coffee cooperative." },
      { day: 5, title: "Sunset kayak", body: "Private kayak at sunset, couple's spa." },
      { day: 6, title: "Return", body: "Transfer via Kigali city tour, departure." },
    ],
  },
] as const;

export const TESTIMONIALS = [
  { name: "Michael Chen", location: "Singapore", text: "The most seamless safari we've ever experienced. Every detail was anticipated." },
  { name: "Sarah Johnson", location: "United Kingdom", text: "EDGELINK made our gorilla trekking dream come true. The guides were phenomenal." },
  { name: "David Kim", location: "United States", text: "Luxury, adventure, and sustainability — EDGELINK delivers on all three." },
  { name: "Emma & Jack", location: "Australia", text: "We've traveled to 30+ countries, and this was our best experience." },
  { name: "Maria Rodriguez", location: "Spain", text: "The canopy walk in Nyungwe was breathtaking. Everything was perfectly organized." },
  { name: "James O'Brien", location: "Ireland", text: "From arrival to departure, we felt completely taken care of. 10/10." },
];

export const TEAM = [
  { name: "Jean-Pierre Niyonzima", role: "Founder & Lead Guide", bio: "Twenty years of leading treks in Volcanoes NP. RDB-certified silverback specialist.", initials: "JP" },
  { name: "Grace Uwimana", role: "Operations Manager", bio: "Fifteen years orchestrating logistics for high-net-worth travellers across East Africa.", initials: "GU" },
  { name: "Emmanuel Habimana", role: "Senior Safari Guide", bio: "Akagera-based ranger-turned-guide, specialist in rhino tracking and birdlife.", initials: "EH" },
  { name: "Claire Mukamana", role: "Guest Relations", bio: "First-language English, French, and Kinyarwanda. Your concierge on the ground.", initials: "CM" },
  { name: "Dr. James Wilson", role: "Conservation Partner", bio: "Primatologist working with Dian Fossey Fund on gorilla family research.", initials: "JW" },
  { name: "Aline Ishimwe", role: "Marketing & Communications", bio: "Storyteller in three languages. Documents every EDGELINK journey.", initials: "AI" },
];

export const VALUES = [
  { title: "Sustainability", body: "Carbon-neutral itineraries, revenue routed to park conservation, single-use plastics banned." },
  { title: "Community", body: "Local ownership. Every trip supports cooperatives, schools, and community health projects." },
  { title: "Excellence", body: "Small groups, private vehicles, and the finest lodges — no compromises on quality." },
  { title: "Authenticity", body: "Real Rwanda, real people. Curated by locals who know the country's every ridge." },
];

export const PARTNERS = [
  "Rwanda Development Board",
  "Gorilla Friendly™",
  "Sustainable Travel International",
  "Eco-Tourism Rwanda",
  "Luxury Safari Alliance",
];

export const GALLERY: { image: string; caption: string; category: "Gorillas" | "Safari" | "Canopy" | "Landscapes" | "Lodges" | "Culture" }[] = [
  { image: gorilla, caption: "Silverback in Volcanoes NP", category: "Gorillas" },
  { image: akagera, caption: "Lion pride on the Kilala plains", category: "Safari" },
  { image: nyungwe, caption: "Canopy walkway, 70m above the forest", category: "Canopy" },
  { image: kivu, caption: "Sunset on Lake Kivu", category: "Landscapes" },
  { image: kigali, caption: "Kigali by night", category: "Culture" },
  { image: cruiser, caption: "Land Cruiser at dawn", category: "Safari" },
  { image: gorilla, caption: "Mother and infant, Kwitonda family", category: "Gorillas" },
  { image: nyungwe, caption: "Chimpanzee in Nyungwe rainforest", category: "Canopy" },
  { image: akagera, caption: "Elephant crossing, Akagera", category: "Safari" },
  { image: kivu, caption: "Coffee terraces above the lake", category: "Landscapes" },
  { image: kigali, caption: "Inema Arts Centre", category: "Culture" },
  { image: cruiser, caption: "Lodge terrace at Singita Kwitonda", category: "Lodges" },
];
