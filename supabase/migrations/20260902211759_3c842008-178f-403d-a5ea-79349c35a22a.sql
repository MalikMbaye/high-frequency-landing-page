CREATE TABLE public.partner_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT INSERT ON public.partner_inquiries TO anon;
GRANT INSERT ON public.partner_inquiries TO authenticated;
GRANT ALL ON public.partner_inquiries TO service_role;
ALTER TABLE public.partner_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a partnership inquiry" ON public.partner_inquiries FOR INSERT TO anon, authenticated WITH CHECK (email IS NOT NULL AND length(email) <= 255 AND length(coalesce(name,'')) <= 100 AND length(coalesce(company,'')) <= 120 AND length(coalesce(message,'')) <= 2000);