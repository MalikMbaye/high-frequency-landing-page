CREATE TABLE public.popup_dismissals (
  id uuid primary key default gen_random_uuid(),
  ip_hash text not null unique,
  dismissed_at timestamptz not null default now()
);
GRANT ALL ON public.popup_dismissals TO service_role;
ALTER TABLE public.popup_dismissals ENABLE ROW LEVEL SECURITY;