create table if not exists public.batches (
  id uuid primary key default gen_random_uuid(),
  batch_code text not null,
  quantity int not null check (quantity >= 0),
  status text not null default 'ordered'
    check (status in ('ordered','in_production','in_transit','arrived','closed')),
  eta_date date,
  ship_buffer_days int not null default 3,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  shopify_order_id bigint unique,
  order_number text not null,
  email text not null,
  customer_name text,
  quantity int not null default 1,
  placed_at timestamptz not null default now(),
  financial_status text,
  fulfillment_status text default 'unfulfilled',
  tracking_number text,
  tracking_url text,
  tracking_company text,
  shipped_at timestamptz,
  assigned_batch_id uuid references public.batches(id) on delete set null,
  position_in_batch int,
  est_ship_date date,
  customer_status text default 'received',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_orders_lookup on public.orders (lower(order_number), lower(email));
create index if not exists idx_orders_queue on public.orders (placed_at) where shipped_at is null;

grant all on public.batches to service_role;
grant all on public.orders to service_role;

alter table public.batches enable row level security;
alter table public.orders enable row level security;

create policy "Deny all client access to batches" on public.batches
  as restrictive for all to anon, authenticated using (false) with check (false);
create policy "Deny all client access to orders" on public.orders
  as restrictive for all to anon, authenticated using (false) with check (false);

create trigger update_batches_updated_at before update on public.batches
  for each row execute function public.update_updated_at_column();
create trigger update_orders_updated_at before update on public.orders
  for each row execute function public.update_updated_at_column();

create or replace function public.track_order(p_order_number text, p_email text)
returns table (
  order_number text,
  customer_status text,
  batch_code text,
  batch_status text,
  position_in_batch int,
  est_ship_date date,
  tracking_number text,
  tracking_url text,
  tracking_company text,
  shipped_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    o.order_number, o.customer_status,
    b.batch_code, b.status,
    o.position_in_batch, o.est_ship_date,
    o.tracking_number, o.tracking_url, o.tracking_company, o.shipped_at
  from public.orders o
  left join public.batches b on b.id = o.assigned_batch_id
  where lower(o.order_number) = lower(trim(p_order_number))
    and lower(o.email) = lower(trim(p_email))
  limit 1;
$$;

revoke all on function public.track_order(text, text) from public;
grant execute on function public.track_order(text, text) to anon, authenticated, service_role;

create or replace function public.recompute_queue()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  o record;
  b record;
  used int;
begin
  update public.orders
     set assigned_batch_id = null, position_in_batch = null, est_ship_date = null
   where shipped_at is null;

  for o in
    select * from public.orders
     where shipped_at is null and coalesce(financial_status,'paid') <> 'refunded'
     order by placed_at asc
  loop
    for b in
      select bt.*,
             coalesce((select sum(x.quantity) from public.orders x
                        where x.assigned_batch_id = bt.id and x.shipped_at is null),0) as allocated
        from public.batches bt
       where bt.status <> 'closed'
       order by bt.eta_date asc nulls last
    loop
      if b.allocated + o.quantity <= b.quantity then
        used := (select count(*) from public.orders x
                  where x.assigned_batch_id = b.id and x.shipped_at is null);
        update public.orders
           set assigned_batch_id = b.id,
               position_in_batch = used + 1,
               est_ship_date = b.eta_date + b.ship_buffer_days
         where id = o.id;
        exit;
      end if;
    end loop;
  end loop;

  update public.orders set customer_status = case
    when shipped_at is not null then 'shipped'
    when assigned_batch_id is null then 'awaiting_batch'
    when (select status from public.batches where id = assigned_batch_id) = 'arrived' then 'preparing'
    when (select status from public.batches where id = assigned_batch_id) = 'in_transit' then 'batch_in_transit'
    when (select status from public.batches where id = assigned_batch_id) = 'in_production' then 'batch_in_production'
    else 'reserved'
  end;
end;
$$;

revoke all on function public.recompute_queue() from public;
grant execute on function public.recompute_queue() to service_role;