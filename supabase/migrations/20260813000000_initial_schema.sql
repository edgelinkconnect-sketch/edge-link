-- EDGELINK Tours base schema.
-- This migration must run before the later seed, realtime, and policy migrations.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'client');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  phone text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

CREATE TABLE IF NOT EXISTS public.tours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE,
  name text NOT NULL,
  location text NOT NULL,
  region text,
  activity text,
  duration text NOT NULL,
  price text NOT NULL DEFAULT '0',
  description text NOT NULL DEFAULT '',
  itinerary text NOT NULL DEFAULT '',
  highlights text[] DEFAULT '{}',
  included_services text,
  excluded_services text,
  difficulty text,
  max_group_size integer,
  best_time text,
  status text NOT NULL DEFAULT 'draft',
  featured_image_url text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number text NOT NULL UNIQUE DEFAULT ('EDG-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8))),
  tour_id uuid NOT NULL REFERENCES public.tours(id) ON DELETE RESTRICT,
  client_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  adults integer NOT NULL DEFAULT 1 CHECK (adults > 0),
  children integer NOT NULL DEFAULT 0 CHECK (children >= 0),
  children_ages text,
  travel_start date,
  travel_end date,
  dietary_requirements text,
  special_requests text,
  referral_source text,
  admin_notes text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.chats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assigned_admin_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  subject text,
  category text NOT NULL DEFAULT 'general',
  status text NOT NULL DEFAULT 'active',
  last_message_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT chats_category_check CHECK (category IN ('booking', 'itinerary', 'payment', 'general'))
);

CREATE TABLE IF NOT EXISTS public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id uuid NOT NULL REFERENCES public.chats(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sender_role text NOT NULL,
  message text,
  attachment_url text,
  read_status boolean NOT NULL DEFAULT false,
  delivered_status boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (message IS NOT NULL OR attachment_url IS NOT NULL)
);

CREATE TABLE IF NOT EXISTS public.experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tour_id uuid NOT NULL REFERENCES public.tours(id) ON DELETE RESTRICT,
  booking_id uuid REFERENCES public.bookings(id) ON DELETE SET NULL,
  experience_date date NOT NULL,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  message text NOT NULL,
  images text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'pending',
  admin_notes text,
  approved_at timestamptz,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  title text NOT NULL,
  description text,
  location text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  photographer text,
  uploaded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  is_ai boolean NOT NULL DEFAULT false,
  is_featured boolean NOT NULL DEFAULT false,
  views integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  destinations text[] NOT NULL DEFAULT '{}',
  trip_duration text,
  group_size text,
  budget_range text,
  travel_date text,
  special_requirements text,
  heard_from text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- These functions are defined after their referenced tables exist.
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    NULLIF(NEW.raw_user_meta_data ->> 'phone', '')
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    phone = EXCLUDED.phone,
    updated_at = now();

  INSERT INTO public.user_roles (user_id, role)
  SELECT NEW.id, 'client'::public.app_role
  WHERE NOT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = NEW.id AND role = 'client'::public.app_role
  )
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_set_updated_at ON public.profiles;
CREATE TRIGGER profiles_set_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
DROP TRIGGER IF EXISTS tours_set_updated_at ON public.tours;
CREATE TRIGGER tours_set_updated_at BEFORE UPDATE ON public.tours FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
DROP TRIGGER IF EXISTS bookings_set_updated_at ON public.bookings;
CREATE TRIGGER bookings_set_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
DROP TRIGGER IF EXISTS experiences_set_updated_at ON public.experiences;
CREATE TRIGGER experiences_set_updated_at BEFORE UPDATE ON public.experiences FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE INDEX IF NOT EXISTS tours_status_idx ON public.tours(status);
CREATE INDEX IF NOT EXISTS tours_slug_idx ON public.tours(slug);
CREATE INDEX IF NOT EXISTS bookings_client_id_idx ON public.bookings(client_id);
CREATE INDEX IF NOT EXISTS bookings_tour_id_idx ON public.bookings(tour_id);
CREATE INDEX IF NOT EXISTS chats_client_id_idx ON public.chats(client_id);
CREATE INDEX IF NOT EXISTS messages_chat_id_idx ON public.messages(chat_id, created_at);
CREATE INDEX IF NOT EXISTS experiences_client_id_idx ON public.experiences(client_id);
CREATE INDEX IF NOT EXISTS user_roles_user_id_idx ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS gallery_location_idx ON public.gallery(location);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view active tours" ON public.tours;
CREATE POLICY "Public can view active tours" ON public.tours FOR SELECT USING (status = 'active' OR public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins manage tours" ON public.tours;
CREATE POLICY "Admins manage tours" ON public.tours FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public can view gallery" ON public.gallery;
CREATE POLICY "Public can view gallery" ON public.gallery FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins manage gallery" ON public.gallery;
CREATE POLICY "Admins manage gallery" ON public.gallery FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Users view own profile" ON public.profiles;
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id OR public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can read own role" ON public.user_roles;
CREATE POLICY "Users can read own role" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users create bookings" ON public.bookings;
CREATE POLICY "Users create bookings" ON public.bookings FOR INSERT TO authenticated WITH CHECK (client_id = auth.uid() OR client_id IS NULL);
DROP POLICY IF EXISTS "Users view own bookings" ON public.bookings;
CREATE POLICY "Users view own bookings" ON public.bookings FOR SELECT TO authenticated USING (client_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Users cancel own bookings" ON public.bookings;
CREATE POLICY "Users cancel own bookings" ON public.bookings FOR UPDATE TO authenticated USING (client_id = auth.uid() OR public.has_role(auth.uid(), 'admin')) WITH CHECK (client_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Clients manage own chats" ON public.chats;
CREATE POLICY "Clients manage own chats" ON public.chats FOR ALL TO authenticated USING (client_id = auth.uid() OR public.has_role(auth.uid(), 'admin')) WITH CHECK (client_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Chat participants read messages" ON public.messages;
CREATE POLICY "Chat participants read messages" ON public.messages FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.chats c WHERE c.id = chat_id AND (c.client_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))));
DROP POLICY IF EXISTS "Chat participants send messages" ON public.messages;
CREATE POLICY "Chat participants send messages" ON public.messages FOR INSERT TO authenticated WITH CHECK (sender_id = auth.uid() AND EXISTS (SELECT 1 FROM public.chats c WHERE c.id = chat_id AND (c.client_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))));
DROP POLICY IF EXISTS "Chat participants update messages" ON public.messages;
CREATE POLICY "Chat participants update messages" ON public.messages FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM public.chats c WHERE c.id = chat_id AND (c.client_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))));

DROP POLICY IF EXISTS "Clients manage own experiences" ON public.experiences;
CREATE POLICY "Clients manage own experiences" ON public.experiences FOR ALL TO authenticated USING (client_id = auth.uid() OR public.has_role(auth.uid(), 'admin')) WITH CHECK (client_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Public can read approved experiences" ON public.experiences;
CREATE POLICY "Public can read approved experiences" ON public.experiences FOR SELECT USING (status = 'approved');

DROP POLICY IF EXISTS "Anyone can submit inquiry" ON public.inquiries;
CREATE POLICY "Anyone can submit inquiry" ON public.inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Admins read inquiries" ON public.inquiries;
CREATE POLICY "Admins read inquiries" ON public.inquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can subscribe" ON public.newsletter_subscribers FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Admins read subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Admins read subscribers" ON public.newsletter_subscribers FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.tours, public.gallery TO anon, authenticated;
GRANT INSERT ON public.inquiries, public.newsletter_subscribers TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.profiles, public.user_roles, public.bookings, public.chats, public.messages, public.experiences TO authenticated;
GRANT UPDATE, DELETE, INSERT, SELECT ON public.tours, public.gallery TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

INSERT INTO storage.buckets (id, name, public) VALUES
  ('tours', 'tours', false),
  ('gallery', 'gallery', false),
  ('experiences', 'experiences', false),
  ('chat-attachments', 'chat-attachments', false)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can read tour media" ON storage.objects;
CREATE POLICY "Public can read tour media" ON storage.objects FOR SELECT USING (bucket_id IN ('tours', 'gallery'));
DROP POLICY IF EXISTS "Admins manage tour media" ON storage.objects;
CREATE POLICY "Admins manage tour media" ON storage.objects FOR ALL TO authenticated USING (bucket_id IN ('tours', 'gallery') AND public.has_role(auth.uid(), 'admin')) WITH CHECK (bucket_id IN ('tours', 'gallery') AND public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Users read own experience media" ON storage.objects;
CREATE POLICY "Users read own experience media" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'experiences' AND ((storage.foldername(name))[1] = auth.uid()::text OR public.has_role(auth.uid(), 'admin')));
DROP POLICY IF EXISTS "Users manage own experience media" ON storage.objects;
CREATE POLICY "Users manage own experience media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'experiences' AND (storage.foldername(name))[1] = auth.uid()::text);
DROP POLICY IF EXISTS "Users read chat attachments" ON storage.objects;
CREATE POLICY "Users read chat attachments" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'chat-attachments');
DROP POLICY IF EXISTS "Users upload chat attachments" ON storage.objects;
CREATE POLICY "Users upload chat attachments" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'chat-attachments' AND (storage.foldername(name))[1] = auth.uid()::text);

ALTER TABLE public.chats REPLICA IDENTITY FULL;
ALTER TABLE public.messages REPLICA IDENTITY FULL;
ALTER TABLE public.bookings REPLICA IDENTITY FULL;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'chats') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.chats;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'messages') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'bookings') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
  END IF;
END $$;
