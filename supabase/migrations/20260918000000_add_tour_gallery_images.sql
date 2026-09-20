ALTER TABLE public.tours
ADD COLUMN IF NOT EXISTS gallery_image_urls text[] NOT NULL DEFAULT '{}';
