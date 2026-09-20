ALTER TABLE public.journal_comments
ADD COLUMN IF NOT EXISTS parent_id uuid REFERENCES public.journal_comments(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS journal_comments_parent_id_idx ON public.journal_comments(parent_id);