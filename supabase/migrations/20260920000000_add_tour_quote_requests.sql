CREATE TABLE IF NOT EXISTS public.tour_quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id uuid NOT NULL REFERENCES public.tours(id) ON DELETE RESTRICT,
  client_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  adults integer NOT NULL DEFAULT 1 CHECK (adults > 0),
  children integer NOT NULL DEFAULT 0 CHECK (children >= 0),
  travel_start date,
  travel_end date,
  special_requests text,
  budget_range text,
  status text NOT NULL DEFAULT 'new',
  quoted_amount text,
  admin_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS tour_quote_requests_set_updated_at ON public.tour_quote_requests;
CREATE TRIGGER tour_quote_requests_set_updated_at
BEFORE UPDATE ON public.tour_quote_requests
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS tour_quote_requests_tour_id_idx ON public.tour_quote_requests(tour_id);
CREATE INDEX IF NOT EXISTS tour_quote_requests_client_id_idx ON public.tour_quote_requests(client_id);
CREATE INDEX IF NOT EXISTS tour_quote_requests_status_idx ON public.tour_quote_requests(status);

ALTER TABLE public.tour_quote_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Clients insert their own quote requests" ON public.tour_quote_requests;
CREATE POLICY "Clients insert their own quote requests" ON public.tour_quote_requests
FOR INSERT TO authenticated
WITH CHECK (client_id = auth.uid() OR client_id IS NULL);

DROP POLICY IF EXISTS "Users view their own quote requests" ON public.tour_quote_requests;
CREATE POLICY "Users view their own quote requests" ON public.tour_quote_requests
FOR SELECT TO authenticated
USING (client_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins manage quote requests" ON public.tour_quote_requests;
CREATE POLICY "Admins manage quote requests" ON public.tour_quote_requests
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

GRANT SELECT, INSERT, UPDATE ON public.tour_quote_requests TO authenticated;
