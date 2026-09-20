CREATE TABLE IF NOT EXISTS public.journal_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.journal_posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (post_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.journal_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.journal_posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body text NOT NULL CHECK (char_length(trim(body)) BETWEEN 1 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS journal_likes_post_id_idx ON public.journal_likes(post_id);
CREATE INDEX IF NOT EXISTS journal_comments_post_id_idx ON public.journal_comments(post_id, created_at DESC);

ALTER TABLE public.journal_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read journal likes" ON public.journal_likes;
CREATE POLICY "Public can read journal likes" ON public.journal_likes FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Users manage their journal likes" ON public.journal_likes;
CREATE POLICY "Users manage their journal likes" ON public.journal_likes FOR ALL TO authenticated
USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Public can read journal comments" ON public.journal_comments;
CREATE POLICY "Public can read journal comments" ON public.journal_comments FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Users create journal comments" ON public.journal_comments;
CREATE POLICY "Users create journal comments" ON public.journal_comments FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "Users delete their journal comments" ON public.journal_comments;
CREATE POLICY "Users delete their journal comments" ON public.journal_comments FOR DELETE TO authenticated
USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

GRANT SELECT ON public.journal_likes, public.journal_comments TO anon, authenticated;
GRANT INSERT, DELETE ON public.journal_likes TO authenticated;
GRANT INSERT, DELETE ON public.journal_comments TO authenticated;