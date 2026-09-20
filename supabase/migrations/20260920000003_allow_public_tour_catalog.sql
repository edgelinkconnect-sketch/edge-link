-- The public catalog must be readable before a visitor creates an account.
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON public.tours TO anon;

ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view active tours" ON public.tours;
CREATE POLICY "Public can view active tours" ON public.tours
FOR SELECT TO anon, authenticated
USING (status = 'active' OR public.has_role(auth.uid(), 'admin'));