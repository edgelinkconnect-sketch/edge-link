# Edge Link Tours

Build a premium, high-fidelity, full-stack React web application for "RWIZA Travel and Tour," a luxury and adventure-focused Rwandan tourism platform. The application must feature a seamless multi-page routing system, a global state management system for simulated bookings/auth, fully interactive features, and high-end animations.

---

### 1. BRANDING, VISUAL IDENTITY, & LOGO SPECIFICATIONS

*   **Aesthetic:** High-end, premium, organic, yet modern and professional. Inspired by the "Land of a Thousand Hills."

*   **Logo Emblem Description (Incorporate into UI):** A detailed, circular emblem featuring a prominent, golden-accented mountain gorilla in the center, a silhouette of the Kigali skyline behind it, rolling green hills, a 4x4 safari Land Cruiser climbing a winding trail, and a subtle silhouette map of Rwanda in the background. Note: Do not include any birds or cranes.

*   **Color Palette (Light Mode):**

    *   Primary: Deep Forest Green (`#1E3F20` / `#163018`) for core headers, brand banners, and prominent CTAs.

    *   Accent: Brushed Metallic Gold (`#C5A85C` / `#B5944A`) for badges, ratings, highlights, and borders.

    *   Base Backgrounds: Warm Cream / Antique White (`#FAF8F5`) to evoke a clean, premium, eco-luxury feel.

    *   Text: Deep Charcoal (`#1E221F`) for comfortable contrast.

*   **Color Palette (Dark Mode):**

    *   Primary: Slightly more vibrant, desaturated Forest Green (`#2A552C`) for readability.

    *   Accent: Warm Metallic Gold (`#DCC17A`).

    *   Base Backgrounds: Obsidian Green/Dark Slate (`#121814` and `#1A221C`).

    *   Text: Soft Off-White (`#EBF0EB`).

*   **Theme Switcher:** Include a persistent Sun/Moon toggle in the navigation bar using a class-based Tailwind toggle saved to `localStorage`.

---

### 2. MULTILINGUAL ENGINE (i18n)

*   **Supported Languages:** **English (EN)**, **Kinyarwanda (RW)**, **French (FR)**, and **Swahili (SW)**.

*   **Language Switcher:** A polished dropdown in the global navigation bar showing flag icons and language codes.

*   **Mock Translation Scope:** Implement a localized dictionary context. Core navigation, CTAs (e.g., "Book Tour" / "Sura Ubukerarugendo" / "Réserver" / "Weka Uhifadhi"), page headers, and summary cards must dynamically translate when a language is selected.

---

### 3. GLOBAL ROUTING & INTERACTIVE STATE

*   Use a robust routing framework (like React Router) to handle 11 distinct views.

*   Implement a shared global state (React Context or similar) to manage:

    1.  **User Authentication:** Toggle between Guest, Registered Client, and Admin/Guide modes.

    2.  **Cart & Bookings:** Storing selected tour details, dates, and pricing.

    3.  **Active Conversations:** Live-chat message log.

---

### 4. THE 11 PAGES - FUNCTIONAL SPECIFICATIONS

#### [Page 1] Home Page (Index)

*   **Hero Banner:** Parallax background of misty volcanic mountains, a prominent tour search bar (destination, date, group size), and a golden primary CTA: "Explore Rwanda."

*   **Featured Packages:** Three high-end cards highlighting Volcanoes National Park, Akagera National Park, and Nyungwe Forest.

*   **Testimonial Slider:** Clean, auto-sliding carousel of glowing guest reviews with star ratings and golden-framed customer avatars.

#### [Page 2] Destinations (Explore)

*   **Interactive Map Component:** An interactive SVG map of Rwanda. Pinpoint active regions: Kigali, Lake Kivu, Musanze, Akagera, and Nyungwe.

*   **Dynamic Sidebar:** Clicking a map pin smoothly reveals high-res image placeholders, key attraction summaries, weather alerts, and a button to "View Available Tours" for that specific destination.

#### [Page 3] Tours Listing

*   **Grid System:** Responsive cards presenting different itineraries. Include key info: duration, difficulty, price, and custom tags.

*   **Advanced Filter Panel:** Sidebar filters allowing users to filter instantly by activity type (Gorilla Trekking, Safari, Hiking, Cultural), duration, and price limits.

#### [Page 4] Tour Detail

*   **Hero Image Gallery:** Multi-image carousel of the specific tour (e.g., Gorilla Trekking).

*   **Information Tabs:** Highly interactive tabbed component separating the "Detailed Itinerary (Day-by-Day)", "What is Included", and "Important Guidelines".

*   **Sticky Reservation Card:** A floating card that calculates real-time pricing based on group size inputs and triggers the checkout process.

#### [Page 5] About Us (Company)

*   **Brand Narrative:** A timeline explaining the origins of RWIZA, focusing on sustainable, luxury tourism and community empowerment.

*   **Team Grid:** High-quality cards showcasing the local guide network, detailing their languages spoken, years of experience, and specialized parks.

#### [Page 6] Client Dashboard

*   **Booking Summary:** A visual progress tracker showing upcoming trips with a countdown timer.

*   **Interactive Itinerary Timeline:** Day-by-day interactive map and checklist showing lodge accommodations, departure times, and driver contacts.

*   **Payments & Invoices:** Clear table showing payment status (Paid, Deposit, Pending) with functional PDF-download simulation.

#### [Page 7] Multi-Step Booking Form

*   **Step 1: Customizer:** Select dates, select a Land Cruiser upgrade, and choose lodging tier.

*   **Step 2: Traveler Details:** Dynamic forms that expand depending on the number of guests.

*   **Step 3: Secure Payment:** A mock checkout window supporting credit cards or local mobile money payment simulations with clear success states and confirmation messaging.

#### [Page 8] Admin Dashboard (Dark UI Theme option preferred)

*   **Key Metrics:** Quick-glance cards showing Monthly Revenue (e.g., $196k), Active Permits, Client Count, and Vehicle Status.

*   **Analytics Charts:** Use smooth line charts and bar graphs (Recharts) to map seasonality, sales performance, and booking volumes.

*   **Operational Logs:** Real-time log showing recent client actions (e.g., "Blessing booked Akagera Tour").

#### [Page 9] Tour Guide Panel

*   **My Calendar:** An interactive schedule showing assigned trips, pickup points, and tour routes.

*   **Guest Manifest:** Comprehensive manifest for active trips, highlighting dietary requirements, medical conditions, and permit validations.

#### [Page 10] Photo & Media Manager

*   **Media Grid:** A beautiful, filterable digital asset library showcasing stunning scenery, lodges, and wildlife.

*   **Uploader Simulation:** Drag-and-drop zone allowing admins to upload new media, set descriptive tags, and assign assets to specific tours.

#### [Page 11] Client Communications (Support)

*   **Split-Pane Interface:** Active client chat list on the left, open window on the right.

*   **Interactive Chat Box:** Fully functional simulation allowing admins and clients to trade messages, equipped with interactive canned responses (e.g., "Send Gorilla Permit FAQ").

---

### 5. UI/UX & TRANSITION REQUIREMENTS

*   **Transitions:** Implement Framer Motion (or native Tailwind transitions) for page-to-page fading, smooth dropdowns, sliding menus, and card-hover scales.

*   **Responsiveness:** Ensure perfect desktop-to-mobile visual structural integrity, adapting all 11 pages to smaller viewports seamlessly with a dedicated mobile drawer menu.

the first image is prefered design the second is the logo

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://edgelink250.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/41ce22b6-d21d-43bc-aec9-1ecdd821ba9c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
