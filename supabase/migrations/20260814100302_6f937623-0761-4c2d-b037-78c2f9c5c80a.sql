INSERT INTO public.tours (slug, name, location, region, activity, duration, price, description, itinerary, highlights, included_services, excluded_services, difficulty, max_group_size, best_time, status, featured_image_url)
VALUES
 ('gorilla-encounter','Gorilla Encounter','Volcanoes','Volcanoes','Trekking','3 days',3500,
  'Trek through misty bamboo forest to spend one intimate hour with a habituated mountain gorilla family.',
  'Day 1: Kigali to Musanze — private transfer, dinner briefing. Day 2: Gorilla trek — one hour with the family. Day 3: Return — optional golden monkey trek.',
  ARRAY['One-hour gorilla family visit','Luxury lodge in Musanze','Private Land Cruiser'],
  ARRAY['Gorilla permit ($1,500)','2 nights luxury lodge','All park fees','Private guide & driver','All meals'],
  ARRAY['International flights','Travel insurance','Gratuities'],'Challenging',8,'Jun–Sep, Dec–Feb','active',''),
 ('big-five','Big Five Safari','Akagera','Akagera','Safari','4 days',2800,
  'Rwanda''s only savannah park — lion, rhino, elephant, leopard and buffalo across plains and wetlands.',
  'Day 1: Kigali to Akagera. Day 2: Full-day safari and boat safari on Lake Ihema. Day 3: Northern plains rhino & lion tracking. Day 4: Return.',
  ARRAY['Lion & rhino tracking','Sunset boat safari on Lake Ihema','Tented luxury camp'],
  ARRAY['3 nights Magashi Camp','All game drives','Boat safari','All park fees','All meals & drinks'],
  ARRAY['International flights','Travel insurance','Gratuities'],'Easy',8,'Jun–Sep, Dec–Feb','active',''),
 ('primate-expedition','Primate Expedition','Nyungwe','Nyungwe','Trekking','5 days',4600,
  'Chimpanzee and gorilla tracking across two national parks, plus Africa''s only high canopy walkway.',
  'Day 1: Kigali to Nyungwe. Day 2: Canopy walk. Day 3: Chimp trek. Day 4: Nyungwe to Musanze. Day 5: Gorilla trek & return.',
  ARRAY['Chimpanzee & gorilla tracking','Canopy walk','Two national parks'],
  ARRAY['Gorilla + chimp permits','4 nights luxury lodges','All transfers','All park fees','All meals'],
  ARRAY['International flights','Travel insurance','Gratuities'],'Challenging',8,'Jun–Sep','active',''),
 ('ultimate-rwanda','Ultimate Rwanda','Other','Other','Safari','7 days',6800,
  'All three national parks — gorillas, chimpanzees and the Big Five — with curated luxury lodges throughout.',
  'Day 1: Kigali arrival. Day 2: To Akagera. Day 3: Big Five safari. Day 4: To Nyungwe. Day 5: Chimp trek. Day 6: To Volcanoes. Day 7: Gorilla trek & return.',
  ARRAY['All three national parks','Gorilla, chimp & Big Five','Curated luxury lodges'],
  ARRAY['All permits','6 nights luxury lodging','Private guide throughout','All park fees','All meals & drinks'],
  ARRAY['International flights','Travel insurance','Gratuities'],'Moderate',8,'Jun–Sep, Dec–Feb','active',''),
 ('luxury-honeymoon','Luxury Honeymoon','Lake Kivu','Lake Kivu','Trekking','6 days',5900,
  'A private gorilla trek followed by a lakeside retreat on Lake Kivu — sunset kayaking and a couple''s spa.',
  'Day 1: Kigali to Musanze. Day 2: Gorilla trek. Day 3: To Lake Kivu. Day 4: Island hop. Day 5: Sunset kayak. Day 6: Return.',
  ARRAY['Private gorilla trek','Lake Kivu retreat','Sunset kayak & couple''s spa'],
  ARRAY['Gorilla permits','5 nights luxury suites','Private transfers','Couple''s spa treatment','All meals'],
  ARRAY['International flights','Travel insurance','Gratuities'],'Moderate',4,'Jun–Sep, Dec–Feb','active','')
ON CONFLICT (slug) DO NOTHING;

CREATE OR REPLACE FUNCTION public.touch_chat_last_message()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.chats SET last_message_at = now() WHERE id = NEW.chat_id;
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS messages_touch_chat ON public.messages;
CREATE TRIGGER messages_touch_chat AFTER INSERT ON public.messages
FOR EACH ROW EXECUTE FUNCTION public.touch_chat_last_message();

ALTER TABLE public.messages REPLICA IDENTITY FULL;
ALTER TABLE public.chats REPLICA IDENTITY FULL;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname='supabase_realtime' AND tablename='messages') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname='supabase_realtime' AND tablename='chats') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.chats;
  END IF;
END $$;

DROP POLICY IF EXISTS "Read experience photos" ON storage.objects;
CREATE POLICY "Read experience photos" ON storage.objects FOR SELECT USING (bucket_id = 'experiences');
DROP POLICY IF EXISTS "Users upload experience photos" ON storage.objects;
CREATE POLICY "Users upload experience photos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'experiences' AND (storage.foldername(name))[1] = auth.uid()::text);
DROP POLICY IF EXISTS "Users delete own experience photos" ON storage.objects;
CREATE POLICY "Users delete own experience photos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'experiences' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS "Read chat attachments" ON storage.objects;
CREATE POLICY "Read chat attachments" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'chat-attachments');
DROP POLICY IF EXISTS "Users upload chat attachments" ON storage.objects;
CREATE POLICY "Users upload chat attachments" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'chat-attachments' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS "Admins view all profiles" ON public.profiles;
CREATE POLICY "Admins view all profiles" ON public.profiles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));