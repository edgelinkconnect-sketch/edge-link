
-- Storage policies (buckets already exist)
CREATE POLICY "Public read gallery" ON storage.objects FOR SELECT USING (bucket_id = 'gallery');
CREATE POLICY "Public read tours" ON storage.objects FOR SELECT USING (bucket_id = 'tours');
CREATE POLICY "Public read avatars" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Public read experiences" ON storage.objects FOR SELECT USING (bucket_id = 'experiences');

CREATE POLICY "Admins manage gallery" ON storage.objects FOR ALL
  USING (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage tours storage" ON storage.objects FOR ALL
  USING (bucket_id = 'tours' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'tours' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users upload own avatar" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users update own avatar" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users delete own avatar" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users upload experience photos" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'experiences' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users delete own experience photos" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'experiences' AND ((storage.foldername(name))[1] = auth.uid()::text OR public.has_role(auth.uid(), 'admin')));

CREATE POLICY "Users read own chat attachments" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'chat-attachments' AND ((storage.foldername(name))[1] = auth.uid()::text OR public.has_role(auth.uid(), 'admin')));
CREATE POLICY "Users upload own chat attachments" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'chat-attachments' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Extend tours schema
ALTER TABLE public.tours
  ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS region TEXT,
  ADD COLUMN IF NOT EXISTS activity TEXT,
  ADD COLUMN IF NOT EXISTS highlights TEXT[] DEFAULT '{}';

DROP POLICY IF EXISTS "Public view active tours" ON public.tours;
CREATE POLICY "Public view active tours" ON public.tours FOR SELECT
  USING (status = 'active' OR public.has_role(auth.uid(), 'admin'));
