/**
 * Landing-page attribution.
 *
 * Captures the first page a visitor lands on (plus any UTM params) so every
 * Shopify cart / order can be traced back to the page that produced it —
 * e.g. purchases originating from /hollywood-reporter.
 */

const KEY = "hfh_attribution";

export interface Attribution {
  landingPath: string;
  referrer: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  firstSeen: string;
}

/** Record the landing page once per browser session. */
export function captureAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  const existing = getAttribution();
  if (existing) return existing;

  const params = new URLSearchParams(window.location.search);
  const attribution: Attribution = {
    landingPath: window.location.pathname || "/",
    referrer: document.referrer || "direct",
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
    utmContent: params.get("utm_content") || undefined,
    utmTerm: params.get("utm_term") || undefined,
    firstSeen: new Date().toISOString(),
  };

  try {
    sessionStorage.setItem(KEY, JSON.stringify(attribution));
  } catch {
    /* storage blocked — attribution is best-effort */
  }
  return attribution;
}

export function getAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

/** Shopify cart attributes (show up on the order in Shopify admin). */
export function attributionCartAttributes(): Array<{ key: string; value: string }> {
  const a = getAttribution();
  if (!a) return [];
  const attrs: Array<{ key: string; value: string }> = [
    { key: "landing_page", value: a.landingPath },
    { key: "referrer", value: a.referrer.slice(0, 200) },
    { key: "current_page", value: typeof window !== "undefined" ? window.location.pathname : a.landingPath },
  ];
  if (a.utmSource) attrs.push({ key: "utm_source", value: a.utmSource });
  if (a.utmMedium) attrs.push({ key: "utm_medium", value: a.utmMedium });
  if (a.utmCampaign) attrs.push({ key: "utm_campaign", value: a.utmCampaign });
  if (a.utmContent) attrs.push({ key: "utm_content", value: a.utmContent });
  if (a.utmTerm) attrs.push({ key: "utm_term", value: a.utmTerm });
  return attrs;
}

/**
 * Append attribution UTMs to the Shopify checkout URL so Shopify's own
 * analytics credits the landing page that generated the sale.
 */
export function withAttributionParams(checkoutUrl: string): string {
  const a = getAttribution();
  if (!a) return checkoutUrl;
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set("utm_source", a.utmSource || "hfh_site");
    url.searchParams.set("utm_medium", a.utmMedium || "landing_page");
    url.searchParams.set("utm_campaign", a.utmCampaign || a.landingPath.replace(/^\//, "") || "home");
    if (a.utmContent) url.searchParams.set("utm_content", a.utmContent);
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}
