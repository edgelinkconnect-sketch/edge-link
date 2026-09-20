ALTER TABLE public.journal_posts
ADD COLUMN IF NOT EXISTS image_urls text[] NOT NULL DEFAULT '{}';