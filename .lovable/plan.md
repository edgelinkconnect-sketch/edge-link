
# RWIZA Travel & Tour — Full Rebuild

## Approach

Delete the current 11-page structure (Dashboard, Admin, Guide, Media, Support, i18n, existing booking flow) and rebuild as a focused 7-page luxury marketing site with a Lovable Cloud backend for the contact and newsletter forms.

## Design system (src/styles.css)

- Palette: forest `#1a3c2a`, gold `#c9a84c`, cream `#f5f0e8`, charcoal `#2d2d2d`
- Fonts: Playfair Display (headings) + Inter (body), loaded via `<link>` in `__root.tsx`
- Semantic tokens for shadcn variants; retire old brand tokens
- Framer Motion for page transitions, section fade-ins, mobile drawer
- Global sticky header + footer + floating WhatsApp/Consultation button

## Pages

1. `/` — Home: hero (AI still with Ken Burns pan), 3 destination cards, Why RWIZA (4 icons), 6 testimonials, trust badges, newsletter, footer
2. `/destinations` — grid of 3 with activity filter
3. `/destinations/volcanoes`, `/destinations/akagera`, `/destinations/nyungwe` — detail pages: hero, overview, what-to-expect, best-time seasonal calendar, lodges, sample itinerary, pricing, gallery, CTA
4. `/packages` — 5 curated itineraries + detail dialog with inclusions/exclusions
5. `/about` — story, 6 team members, values, sustainability, partners
6. `/gallery` — masonry grid, category filter, lightbox
7. `/contact` — inquiry form (RHF + Zod), contact sidebar, embedded map, floating WhatsApp

## Backend (Lovable Cloud)

Two tables + RLS + grants:

- `inquiries` — full contact form payload; anon INSERT allowed, authenticated admin SELECT (owner-gated via `has_role`)
- `newsletter_subscribers` — email + created_at; anon INSERT with unique email

Contact form + newsletter submit through server functions that insert with the anon publishable client under narrow policies. Confirmation email via Lovable Emails will require the user to set up a sending domain — I'll scaffold the template and helper, and prompt for domain setup as a follow-up.

## Assets

Generate 12–15 AI stills at `fast` quality:
- 1 hero (misty Volcanoes ridge with gorilla family silhouette)
- 3 destination heroes (Volcanoes, Akagera, Nyungwe)
- 6 gallery images across categories
- 5 package thumbnails

Reuse existing tour images where they fit; delete unused.

## Files

**Delete:** `src/routes/{admin,dashboard,guide,media,support,booking}.tsx`, `src/routes/tours.tsx`, `src/routes/tours.$tourId.tsx`, `src/lib/i18n.tsx`, `src/lib/app-context.tsx`

**Create/rewrite:** `src/styles.css`, `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/routes/destinations.tsx`, `src/routes/destinations.$slug.tsx`, `src/routes/packages.tsx`, `src/routes/about.tsx`, `src/routes/gallery.tsx`, `src/routes/contact.tsx`, `src/components/layout/{nav,footer,floating-cta}.tsx`, `src/lib/site-data.ts`, `src/lib/inquiries.functions.ts`

**Dependencies:** add `framer-motion`, `react-hook-form`, `@hookform/resolvers`, `zod` (some may already exist).

## Out of scope for this pass

- Sending confirmation emails (needs domain setup — I'll wire the template + prompt setup after)
- Admin CMS to edit content (content lives in `site-data.ts`; can move to DB later)
- Sitemap.xml / robots.txt tuning (I'll add basic ones)

Proceed?
