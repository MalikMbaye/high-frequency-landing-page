CREATE OR REPLACE FUNCTION public.track_order(p_order_number text, p_email text)
 RETURNS TABLE(order_number text, customer_status text, placed_at timestamp with time zone, position_in_queue integer, est_ship_date date, est_delivery_min date, est_delivery_max date, batch_code text, batch_status text, tracking_number text, tracking_url text, tracking_company text, shipped_at timestamp with time zone)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select
    o.order_number, o.customer_status, o.placed_at,
    o.position_in_queue, o.est_ship_date, o.est_delivery_min, o.est_delivery_max,
    b.batch_code, b.status,
    o.tracking_number, o.tracking_url, o.tracking_company, o.shipped_at
  from public.orders o
  left join public.batches b on b.id = o.assigned_batch_id
  where lower(o.email) = lower(trim(p_email))
    and (
      coalesce(trim(p_order_number), '') = ''
      or lower(regexp_replace(o.order_number, '^#', '')) = lower(regexp_replace(trim(p_order_number), '^#', ''))
    )
  order by o.placed_at desc
  limit 1;
$function$;