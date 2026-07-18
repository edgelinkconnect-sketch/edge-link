This is a large multi-week build. I'll ship it in phases so each layer works before we stack more on it. Please confirm the phase order and a couple of decisions below before I start.

## Scope note
Some spec items I'll adapt to what this stack actually supports:
- **Backend**: TanStack Start server functions + Lovable Cloud (Supabase) — not a separate Node/Express server. Realtime chat uses Supabase Realtime (Postgres changes), not Socket.io. Same UX (live messages, read receipts, typing), simpler infra.
- **File storage**: Supabase Storage (not Cloudinary).
- **Admin account**: created via normal Supabase Auth signup + a `user_roles` row granting `admin`. The password you shared will be set on first run. I will NOT hardcode credentials in source — that's a critical security issue. Same login UX for you.
- **Offline maps**: MapLibre + service worker tile cache + IndexedDB for GeoJSON. Works after first online visit.
- **WhatsApp**: `wa.me` deep link prefilled with booking details (already in place for the current contact form). No WhatsApp Business API.
- **Rich text**: TipTap.

## Phases

**Phase 1 — Foundation (auth + schema + roles)**
- Migration: `profiles`, `user_roles` (enum: admin, client), `has_role()` security-definer fn, all RLS + GRANTs
- Migration: `tours`, `gallery`, `bookings`, `experiences`, `chats`, `messages` tables with RLS
- Supabase Storage buckets: `gallery`, `experiences`, `chat-attachments`, `avatars`
- Auth pages: `/auth` (login + register with full name/phone), password reset
- Seed admin: on first load, if `hirwadieume9@gmail.com` exists, grant admin role (you sign up once with that email + your password)
- Route gate: `_authenticated/` for client area, `_authenticated/admin/` for admin (has_role check)

**Phase 2 — Tours + Gallery (admin CRUD + public display)**
- Admin `/admin/tours`: list, create, edit, delete, duplicate, activate/deactivate (TipTap for description/itinerary)
- Admin `/admin/gallery`: upload (drag-drop), edit metadata, delete, bulk ops, "Remove AI Images" (flag-based `is_ai=true` deletes)
- Public `/tours` + `/tours/$id`: detail page auto-pulls gallery images WHERE `location = tour.location`
- Public `/gallery` with location filters + lightbox

**Phase 3 — Bookings + Experiences**
- Public booking form on tour detail → inserts row → opens WhatsApp with the formatted message you specified
- Client `/dashboard/bookings`: list own bookings, cancel if pending
- Admin `/admin/bookings`: list, filter, status flow, notes, CSV export
- Client `/dashboard/share-experience`: only for completed bookings, 1-5 stars, 200-char msg, up to 5 photos
- Admin `/admin/experiences`: approve/reject/edit; on approve → photos copied into gallery with tour location, testimonial visible on home

**Phase 4 — Chat**
- `chats` + `messages` with Supabase Realtime subscription
- Client `/dashboard/chat`: start new chat with category, send text + image/PDF
- Admin `/admin/chat`: inbox, filter by category/status, quick replies, mark resolved
- Read receipts (single/double check), typing indicator via broadcast channel

**Phase 5 — Offline Maps + Polish**
- MapLibre map on `/map` with location markers (Nyungwe, Akagera, Volcanoes, Kigali, Lake Kivu)
- Service worker caches map tiles + app shell; IndexedDB stores locations GeoJSON
- Home hero slider from gallery, testimonials carousel from approved experiences, newsletter (already exists), trust badges
- SEO: per-route head metadata, JSON-LD for Tours + Reviews + Organization, sitemap

## Decisions I need from you

1. **Ship all 5 phases in this chat?** Each phase is a substantial change. I recommend I do Phase 1 now, you verify signup + admin access work, then I proceed. Alternative: I push through all 5 in sequence without waiting.
2. **Admin bootstrap**: OK if I set it up so the first time `hirwadieume9@gmail.com` signs up, that account is auto-promoted to admin? (Safer than hardcoding the password in code.)
3. **Keep or delete existing pages?** Current site has `/about`, `/faq`, `/journal`, `/sustainability`, `/gallery`, `/destinations`, `/packages`, `/contact`, `/`. Keep them alongside the new system, or replace with the new tour/gallery-driven pages?
4. **Email confirmations for signup**: on (users must click email link) or off (instant signup, easier testing)?

Reply with answers to 1-4 and I'll start Phase 1.
