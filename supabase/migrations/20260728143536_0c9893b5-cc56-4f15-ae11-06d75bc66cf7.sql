CREATE OR REPLACE FUNCTION public.track_order(p_order_number text, p_email text)
 RETURNS TABLE(order_number text, customer_status text, batch_code text, batch_status text, position_in_batch integer, est_ship_date date, tracking_number text, tracking_url text, tracking_company text, shipped_at timestamp with time zone)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select
    o.order_number, o.customer_status,
    b.batch_code, b.status,
    o.position_in_batch, o.est_ship_date,
    o.tracking_number, o.tracking_url, o.tracking_company, o.shipped_at
  from public.orders o
  left join public.batches b on b.id = o.assigned_batch_id
  where lower(regexp_replace(o.order_number, '^#', '')) = lower(regexp_replace(trim(p_order_number), '^#', ''))
    and lower(o.email) = lower(trim(p_email))
  limit 1;
$function$;

GRANT EXECUTE ON FUNCTION public.track_order(text, text) TO anon;
GRANT EXECUTE ON FUNCTION public.track_order(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.track_order(text, text) TO service_role;