ALTER TABLE public.tours
ADD COLUMN IF NOT EXISTS translations jsonb NOT NULL DEFAULT '{}';
