import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const getIp = (req: Request) =>
  (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
  req.headers.get("cf-connecting-ip") ||
  "unknown";

async function hashIp(ip: string) {
  const data = new TextEncoder().encode(`hfh-popup:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { action } = await req.json().catch(() => ({ action: "check" }));
    const ipHash = await hashIp(getIp(req));

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    if (action === "dismiss") {
      await supabase
        .from("popup_dismissals")
        .upsert({ ip_hash: ipHash }, { onConflict: "ip_hash" });
      return new Response(JSON.stringify({ dismissed: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data } = await supabase
      .from("popup_dismissals")
      .select("ip_hash")
      .eq("ip_hash", ipHash)
      .maybeSingle();

    return new Response(JSON.stringify({ dismissed: !!data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ dismissed: false }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
