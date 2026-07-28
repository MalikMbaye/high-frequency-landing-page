REVOKE EXECUTE ON FUNCTION public.track_order(text, text) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.recompute_queue(int) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.recompute_queue() FROM anon, authenticated, public;
GRANT EXECUTE ON FUNCTION public.track_order(text, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.recompute_queue(int) TO service_role;