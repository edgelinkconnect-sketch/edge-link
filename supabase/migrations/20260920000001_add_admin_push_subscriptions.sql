CREATE TABLE IF NOT EXISTS public.admin_push_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  endpoint text NOT NULL UNIQUE,
  p256dh text NOT NULL,
  auth text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS admin_push_subscriptions_set_updated_at ON public.admin_push_subscriptions;
CREATE TRIGGER admin_push_subscriptions_set_updated_at
BEFORE UPDATE ON public.admin_push_subscriptions
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS admin_push_subscriptions_user_id_idx ON public.admin_push_subscriptions(user_id);

ALTER TABLE public.admin_push_subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins manage their own push subscriptions" ON public.admin_push_subscriptions;
CREATE POLICY "Admins manage their own push subscriptions" ON public.admin_push_subscriptions
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin') AND user_id = auth.uid())
WITH CHECK (public.has_role(auth.uid(), 'admin') AND user_id = auth.uid());

GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_push_subscriptions TO authenticated;
