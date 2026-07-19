# Phase 2 + 3 + Theme + i18n

Big scope — flagging trade-offs up front so we agree before I start writing hundreds of files.

## What I'll ship

### Phase 2 — Tours & Gallery
- **Admin `/admin/tours`**: list + create/edit/delete/duplicate/activate. TipTap rich text for description & itinerary. Fields: name, slug, region, activity, duration, difficulty, price, hero image, highlights, included, guidelines.
- **Admin `/admin/gallery`**: drag-drop upload to `gallery` bucket, edit caption/location/tags, delete, bulk delete, "Remove AI images" (deletes rows where `is_ai=true`).
- **Public `/tours`** (new index) + **`/tours/$slug`**: pulls tour from DB, auto-appends `gallery` rows where `location = tour.region`.
- **Public `/gallery`**: DB-backed, location filter chips, lightbox.

### Phase 3 — Bookings & Experiences
- **Public booking form** on tour detail: inserts booking row (status=pending) → opens WhatsApp with formatted message to +250788341431.
- **Client `/dashboard/bookings`**: list own bookings, cancel while pending.
- **Admin `/admin/bookings`**: filter by status, change status (pending → confirmed → completed / cancelled), notes, CSV export.
- **Client `/dashboard/experiences`**: share experience for completed bookings only. 1–5 stars, ≤200 chars, up to 5 photos.
- **Admin `/admin/experiences`**: approve/reject. On approve → photos copied into `gallery` tagged with tour region; testimonial surfaces on home.

### Theme toggle
- Light / Dark / System, persisted in localStorage, applied via `class="dark"` on `<html>`. Toggle in nav + admin/dashboard sidebars. Existing tokens already OKLCH — I'll add matching `.dark` overrides to `src/styles.css`.

### i18n — 13 languages
English, French, Kinyarwanda, Swahili, Spanish, Italian, Portuguese, German, Chinese (Simplified), Arabic (RTL), Korean, Japanese, Hindi.
- Library: `react-i18next` + `i18next-browser-languagedetector`.
- Language switcher in nav, persisted in localStorage. RTL flip for Arabic via `dir="rtl"` on `<html>`.
- Every static UI string routed through `t("key")`. Translation JSON files under `src/locales/<lang>/common.json`.

## Honest scope note on "every word"

There are ~1,200+ user-visible strings across 20+ existing routes plus everything I'm about to build. I will:
1. **Refactor every route I touch in Phase 2/3** to use `t()` and ship complete translations for all 13 languages for those strings.
2. **Refactor existing pages** (home, destinations, packages, about, gallery, contact, faq, journal, sustainability, auth, dashboard, nav, footer) in the same pass and translate them all.
3. **User-generated content** (tour names/descriptions the admin types, gallery captions, chat messages, reviews) stays in the language it was entered — I won't auto-translate DB content. If you want per-locale tour fields (e.g. `name_fr`, `name_rw`), say so and I'll add a translations table instead.
4. **Machine translation quality**: translations will be programmatic (I write them), not professionally reviewed. Good enough to ship; a native speaker should review before launch for Kinyarwanda especially.

## Order I'll execute

1. Theme toggle + i18n scaffolding + translate existing pages (one big pass).
2. Phase 2 backend + admin tours + admin gallery + public tours/gallery rewrites, translated as built.
3. Phase 3 bookings + experiences flows, translated as built.
4. Typecheck + smoke test the auth-gated flows via Playwright.

This will span multiple long turns. I'll push through without stopping between phases unless something breaks.

## Confirm before I start

- **Language switcher placement**: nav dropdown with flag + name (my default), or a separate `/settings` page? *(default: nav dropdown)*
- **DB translations for tours/gallery**: skip for now (admin enters one language, UI chrome translated only) or add `tour_translations` table? *(default: skip — say the word if you want it)*
- **"Remove AI images"**: bulk-delete rows where `is_ai=true`, or add a manual "mark as AI" toggle per image? *(default: both — auto-flag on upload if filename contains `ai`/`generated`, plus manual toggle)*

Reply "go" (with any tweaks) and I'll start.