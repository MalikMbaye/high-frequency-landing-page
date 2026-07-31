create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

select cron.unschedule(jobname) from cron.job where jobname = 'sync-shopify-orders-15min';

select cron.schedule(
  'sync-shopify-orders-15min',
  '*/15 * * * *',
  $$
  select net.http_post(
    url := 'https://mvgwectctjiklltqasgq.supabase.co/functions/v1/sync-shopify-orders',
    headers := '{"Content-Type":"application/json"}'::jsonb,
    body := jsonb_build_object('since', to_char((now() - interval '30 days') at time zone 'utc', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'))
  );
  $$
);