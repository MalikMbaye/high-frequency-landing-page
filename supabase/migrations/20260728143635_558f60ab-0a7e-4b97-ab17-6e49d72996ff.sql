REVOKE EXECUTE ON FUNCTION public.track_order(text, text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.track_order(text, text) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.track_order(text, text) TO service_role;