import gorilla from "@/assets/tour-gorilla.jpg";
import akagera from "@/assets/tour-akagera.jpg";
import nyungwe from "@/assets/tour-nyungwe.jpg";
import kivu from "@/assets/tour-kivu.jpg";
import kigali from "@/assets/tour-kigali.jpg";
import cruiser from "@/assets/tour-cruiser.jpg";

export type Tour = {
  id: string;
  name: string;
  region: string;
  activity: "Gorilla Trekking" | "Safari" | "Hiking" | "Cultural";
  duration: number;
  difficulty: "Easy" | "Moderate" | "Challenging";
  price: number;
  image: string;
  tag?: string;
  summary: string;
  highlights: string[];
  itinerary: { day: number; title: string; body: string }[];
  included: string[];
  guidelines: string[];
  gallery: string[];
};

export const TOURS: Tour[] = [
  {
    id: "gorilla-trekking",
    name: "Gorilla Trekking Expedition",
    region: "Volcanoes NP",
    activity: "Gorilla Trekking",
    duration: 3,
    difficulty: "Challenging",
    price: 3450,
    image: gorilla,
    tag: "Signature",
    summary: "A once-in-a-lifetime trek through the misty bamboo forest of Volcanoes National Park.",
    highlights: ["Gorilla permit included", "Private silverback family visit", "Luxury lodge in Musanze"],
    itinerary: [
      { day: 1, title: "Kigali → Musanze", body: "Land Cruiser transfer to Volcanoes NP with a stop at the Kimironko markets." },
      { day: 2, title: "Gorilla Trek", body: "Early briefing at park HQ, guided trek to a habituated family, one full hour with the group." },
      { day: 3, title: "Golden Monkey & Return", body: "Optional golden monkey visit before returning to Kigali for departure." },
    ],
    included: ["Gorilla permit ($1,500)", "Certified guides", "All park fees", "Luxury lodge (2 nights)", "Private 4x4 Land Cruiser"],
    guidelines: ["Minimum age 15", "Moderate fitness required", "Bring hiking boots & rain shell", "Photography without flash"],
    gallery: [gorilla, nyungwe, cruiser, kigali],
  },
  {
    id: "akagera-safari",
    name: "Akagera Big Five Safari",
    region: "Akagera NP",
    activity: "Safari",
    duration: 4,
    difficulty: "Easy",
    price: 2180,
    image: akagera,
    tag: "Best Seller",
    summary: "Track the Big Five across savannah, wetlands, and acacia woodland in Rwanda's only savannah park.",
    highlights: ["Boat safari on Lake Ihema", "Night game drive", "Rhino & lion tracking"],
    itinerary: [
      { day: 1, title: "Kigali → Akagera", body: "Scenic transfer east, afternoon game drive." },
      { day: 2, title: "Full-day Safari", body: "Morning and evening drives, boat safari at midday." },
      { day: 3, title: "Northern Plains", body: "Rhino tracking and lion territory drive." },
      { day: 4, title: "Return to Kigali", body: "Cultural stop and city tour." },
    ],
    included: ["All park & activity fees", "Luxury tented camp", "Full board dining", "Expert ranger-guide"],
    guidelines: ["Suitable for families 8+", "Malaria prophylaxis recommended", "Neutral clothing advised"],
    gallery: [akagera, cruiser, kivu, kigali],
  },
  {
    id: "nyungwe-canopy",
    name: "Nyungwe Canopy & Chimps",
    region: "Nyungwe NP",
    activity: "Hiking",
    duration: 4,
    difficulty: "Moderate",
    price: 1980,
    image: nyungwe,
    tag: "Eco-luxe",
    summary: "Ancient rainforest, canopy walkways, and chimpanzee tracking in one seamless itinerary.",
    highlights: ["70m canopy walk", "Chimpanzee tracking", "Tea plantation lunch"],
    itinerary: [
      { day: 1, title: "Kigali → Nyungwe", body: "Drive via Nyanza King's Palace." },
      { day: 2, title: "Canopy Walk", body: "Guided canopy walkway and Igishigishigi trail." },
      { day: 3, title: "Chimpanzee Trek", body: "Early departure to track chimp community." },
      { day: 4, title: "Tea Estate Return", body: "Gisakura tea estate tour, back to Kigali." },
    ],
    included: ["Chimp permit", "Canopy walk fee", "Forest lodge accommodation", "All meals"],
    guidelines: ["Rain gear essential", "Long trousers required", "Minimum age 12 for chimp trek"],
    gallery: [nyungwe, gorilla, kivu, cruiser],
  },
  {
    id: "kivu-cultural",
    name: "Lake Kivu Cultural Retreat",
    region: "Lake Kivu",
    activity: "Cultural",
    duration: 3,
    difficulty: "Easy",
    price: 1250,
    image: kivu,
    tag: "Slow Travel",
    summary: "Coffee farms, island hops, and lakeside sunsets on Rwanda's inland sea.",
    highlights: ["Napoleon Island bat colony", "Coffee cooperative visit", "Sunset kayak"],
    itinerary: [
      { day: 1, title: "Kigali → Kibuye", body: "Scenic Congo-Nile route drive." },
      { day: 2, title: "Islands & Coffee", body: "Boat tour + coffee cooperative." },
      { day: 3, title: "Sunset & Return", body: "Kayak at sunset, transfer back." },
    ],
    included: ["Boutique lakeside hotel", "All boat transfers", "Coffee tasting"],
    guidelines: ["Basic swimming ability recommended", "Sunscreen essential"],
    gallery: [kivu, kigali, cruiser, nyungwe],
  },
  {
    id: "kigali-city",
    name: "Kigali City Immersion",
    region: "Kigali",
    activity: "Cultural",
    duration: 2,
    difficulty: "Easy",
    price: 480,
    image: kigali,
    summary: "Rwanda's story told through markets, memorials, and craft studios.",
    highlights: ["Kigali Genocide Memorial", "Nyamirambo walking tour", "Inema arts centre"],
    itinerary: [
      { day: 1, title: "History & Markets", body: "Genocide memorial + Kimironko market." },
      { day: 2, title: "Art & Cuisine", body: "Inema arts + chef-led dinner." },
    ],
    included: ["Local guide", "All entry fees", "Boutique hotel"],
    guidelines: ["Respectful dress at memorial", "Comfortable walking shoes"],
    gallery: [kigali, kivu, gorilla, cruiser],
  },
  {
    id: "musanze-hike",
    name: "Musanze Twin Lakes Hike",
    region: "Musanze",
    activity: "Hiking",
    duration: 2,
    difficulty: "Moderate",
    price: 620,
    image: cruiser,
    summary: "Rolling volcanic hills, twin lakes, and a night at a boutique eco-lodge.",
    highlights: ["Ruhondo & Burera lakes", "Community lunch", "Sunrise viewpoint"],
    itinerary: [
      { day: 1, title: "Twin Lakes Ridge Hike", body: "Ridge trail with community lunch." },
      { day: 2, title: "Sunrise & Return", body: "Sunrise viewpoint, return to Kigali." },
    ],
    included: ["Eco-lodge stay", "Guide & porter", "All meals"],
    guidelines: ["Moderate fitness", "Layered clothing"],
    gallery: [cruiser, gorilla, nyungwe, kivu],
  },
];

export const DESTINATIONS = [
  { id: "kigali", name: "Kigali", x: 55, y: 55, blurb: "Cosmopolitan capital, art, memorials, and cuisine.", image: kigali, weather: "22°C · Clear" },
  { id: "musanze", name: "Musanze", x: 40, y: 25, blurb: "Gateway to Volcanoes National Park and gorilla trekking.", image: gorilla, weather: "18°C · Misty" },
  { id: "kivu", name: "Lake Kivu", x: 20, y: 45, blurb: "Inland sea with coffee shores and island retreats.", image: kivu, weather: "24°C · Sunny" },
  { id: "akagera", name: "Akagera", x: 85, y: 40, blurb: "Savannah and Big Five wildlife in the east.", image: akagera, weather: "28°C · Warm" },
  { id: "nyungwe", name: "Nyungwe", x: 25, y: 80, blurb: "Ancient rainforest, canopy walks and chimpanzees.", image: nyungwe, weather: "20°C · Rain" },
];

export const GUIDES = [
  { name: "Emmanuel Nkurunziza", role: "Head Guide · Volcanoes NP", years: 14, langs: ["EN", "RW", "FR"], initials: "EN" },
  { name: "Alice Umutoni", role: "Lead Ranger · Akagera NP", years: 9, langs: ["EN", "RW", "SW"], initials: "AU" },
  { name: "Jean-Paul Habimana", role: "Forest Guide · Nyungwe", years: 11, langs: ["EN", "FR"], initials: "JP" },
  { name: "Sarah Mukamana", role: "Cultural Curator · Kigali", years: 7, langs: ["EN", "RW", "FR"], initials: "SM" },
];

export const TESTIMONIALS = [
  { name: "Michael Chen", country: "Singapore", rating: 5, text: "The most seamless safari we've ever experienced. Every detail was anticipated." },
  { name: "Sophie Laurent", country: "France", rating: 5, text: "Notre guide était incroyable. Un moment inoubliable avec les gorilles." },
  { name: "Aditi Sharma", country: "India", rating: 5, text: "Luxury meets purpose. Sustainable tourism done exceptionally well." },
  { name: "Kwame Boateng", country: "Ghana", rating: 5, text: "From Kigali to Kivu, every stop felt hand-crafted for us." },
];
