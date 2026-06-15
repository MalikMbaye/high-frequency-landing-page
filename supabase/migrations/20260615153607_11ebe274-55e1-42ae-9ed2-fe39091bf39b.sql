REVOKE ALL ON public.shopify_tokens FROM anon, authenticated, PUBLIC;
GRANT ALL ON public.shopify_tokens TO service_role;
CREATE POLICY "Deny all client access to shopify_tokens" ON public.shopify_tokens AS RESTRICTIVE FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);