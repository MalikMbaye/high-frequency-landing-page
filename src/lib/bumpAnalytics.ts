import { supabase } from "@/integrations/supabase/client";

/**
 * Order-bump conversion logging. Every event carries the copy variant tag so the
 * conversion rate per variant can be read straight off the bump_events table.
 */
export type BumpEvent = "viewed" | "accepted" | "declined" | "detail_opened";

const SESSION_KEY = "hfh_bump_session";

function sessionId(): string {
  if (typeof window === "undefined") return "server";
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function trackBump(event: BumpEvent, variant: string, meta: Record<string, unknown> = {}) {
  console.log(`[bump] ${event}`, { bump_variant: variant, ...meta });
  // Fire-and-forget: never block or break the purchase flow on analytics.
  void supabase
    .from("bump_events")
    .insert({ variant, event, session_id: sessionId(), meta })
    .then(({ error }) => {
      if (error) console.warn("bump event log failed", error.message);
    });
}
