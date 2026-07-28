ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS position_in_queue int,
  ADD COLUMN IF NOT EXISTS est_delivery_min date,
  ADD COLUMN IF NOT EXISTS est_delivery_max date;

CREATE INDEX IF NOT EXISTS idx_orders_lookup ON public.orders (lower(order_number), lower(email));
CREATE INDEX IF NOT EXISTS idx_orders_queue ON public.orders (placed_at) WHERE shipped_at IS NULL;

CREATE OR REPLACE FUNCTION public.recompute_queue(c int DEFAULT 142)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
declare
  o record;
  rank int := 0;
  ship date;
  ready date;
  units int := 0;
begin
  for o in
    select * from public.orders
     where shipped_at is null and coalesce(financial_status,'paid') <> 'refunded'
     order by placed_at asc
  loop
    rank := rank + 1;
    units := units + coalesce(o.quantity, 1);

    ready := case
      when units <= 3000 then current_date
      when units <= 5500 then date '2026-08-17'
      else date '2026-08-17' + 30
    end;

    ship := greatest(ready, current_date + ceil(rank::numeric / greatest(c,1))::int);

    update public.orders set
      position_in_queue = rank,
      est_ship_date     = ship,
      est_delivery_min  = ship + 3,
      est_delivery_max  = ship + 9,
      assigned_batch_id = null,
      position_in_batch = null,
      customer_status   = case
        when units > 3000 and ship > current_date then 'reserved'
        when ship <= current_date + 1 then 'label_printed'
        when ship <= current_date + 3 then 'processing'
        else 'received' end,
      updated_at = now()
    where id = o.id;
  end loop;

  update public.orders
     set customer_status = 'shipped',
         updated_at = now()
   where shipped_at is not null and customer_status is distinct from 'shipped';
end;
$function$;

DROP FUNCTION IF EXISTS public.track_order(text, text);

CREATE OR REPLACE FUNCTION public.track_order(p_order_number text, p_email text)
RETURNS TABLE(
  order_number text,
  customer_status text,
  placed_at timestamptz,
  position_in_queue int,
  est_ship_date date,
  est_delivery_min date,
  est_delivery_max date,
  batch_code text,
  batch_status text,
  tracking_number text,
  tracking_url text,
  tracking_company text,
  shipped_at timestamptz
)
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
  where lower(regexp_replace(o.order_number, '^#', '')) = lower(regexp_replace(trim(p_order_number), '^#', ''))
    and lower(o.email) = lower(trim(p_email))
  limit 1;
$function$;