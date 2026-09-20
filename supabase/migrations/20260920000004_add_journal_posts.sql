CREATE TABLE IF NOT EXISTS public.journal_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  body text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'Rwanda Travel Tips',
  author text NOT NULL DEFAULT 'EDGELINK Tours',
  read_time text NOT NULL DEFAULT '5 min',
  image_url text NOT NULL DEFAULT '',
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS journal_posts_set_updated_at ON public.journal_posts;
CREATE TRIGGER journal_posts_set_updated_at
BEFORE UPDATE ON public.journal_posts
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS journal_posts_published_idx ON public.journal_posts(published, created_at DESC);

ALTER TABLE public.journal_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read published journal posts" ON public.journal_posts;
CREATE POLICY "Public can read published journal posts" ON public.journal_posts
FOR SELECT TO anon, authenticated USING (published = true OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins manage journal posts" ON public.journal_posts;
CREATE POLICY "Admins manage journal posts" ON public.journal_posts
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

GRANT SELECT ON public.journal_posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.journal_posts TO authenticated;