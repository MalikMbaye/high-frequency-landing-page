
CREATE TABLE public.shopify_tokens (
  shop_domain TEXT PRIMARY KEY,
  access_token TEXT NOT NULL,
  scope TEXT,
  installed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Only service_role (edge functions) can touch this table. No anon, no authenticated.
GRANT ALL ON public.shopify_tokens TO service_role;

ALTER TABLE public.shopify_tokens ENABLE ROW LEVEL SECURITY;

-- No policies = no client access. Service role bypasses RLS.

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_shopify_tokens_updated_at
BEFORE UPDATE ON public.shopify_tokens
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
