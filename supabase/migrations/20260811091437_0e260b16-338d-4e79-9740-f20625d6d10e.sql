CREATE TABLE public.bump_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  variant text NOT NULL,
  event text NOT NULL,
  session_id text,
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.bump_events TO anon, authenticated;
GRANT ALL ON public.bump_events TO service_role;
ALTER TABLE public.bump_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can log bump events" ON public.bump_events FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE INDEX bump_events_variant_event_idx ON public.bump_events (variant, event, created_at DESC);