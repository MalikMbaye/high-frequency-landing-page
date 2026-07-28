export type TrackResult = {
  order_number: string;
  customer_status: string | null;
  placed_at: string | null;
  position_in_queue: number | null;
  est_ship_date: string | null;
  est_delivery_min: string | null;
  est_delivery_max: string | null;
  batch_code: string | null;
  batch_status: string | null;
  tracking_number: string | null;
  tracking_url: string | null;
  tracking_company: string | null;
  shipped_at: string | null;
};

export const TRANSIT_MIN_DAYS = 3;
export const TRANSIT_MAX_DAYS = 7;
export const BACKLOG_CLEAR_DATE = "Aug 4";
export const SURGE_START = new Date("2026-06-01T00:00:00Z");
export const SURGE_END = new Date("2026-07-28T00:00:00Z");

export const STAGES = [
  {
    key: "received",
    label: "Order Received",
    caption: "Locked into the queue",
    description:
      "Your order is confirmed and locked into the queue in the order it came in. Nothing else you need to do.",
    eta: "Same day",
  },
  {
    key: "processing",
    label: "Processing & Handling",
    caption: "Prepped and packed",
    description:
      "Your order reached the front of the line and our warehouse is prepping and packing it now.",
    eta: "1–3 business days",
  },
  {
    key: "tracking_added",
    label: "Tracking Added",
    caption: "Tracking number issued",
    description:
      "Your shipping label and tracking number are created and your package is being handed to the carrier. You'll see the number here and in your email as soon as it's issued.",
    eta: "Shortly after packing",
  },
  {
    key: "in_transit",
    label: "In Transit",
    caption: "On the way",
    description:
      "Your package is with the carrier and moving. Follow it live below. Delivery usually takes 3–7 business days from here.",
    eta: "3–7 business days",
  },
  {
    key: "delivered",
    label: "Delivered",
    caption: "At your door",
    description:
      "Delivered. Time to plug in and shift your state. Anything off? Reach out and we'll make it right.",
    eta: "Complete",
  },
] as const;

export const STAGE_INDEX: Record<string, number> = {
  received: 0,
  awaiting_batch: 0,
  reserved: 0,
  processing: 1,
  preparing: 1,
  label_printed: 2,
  tracking_added: 2,
  batch_in_production: 0,
  batch_in_transit: 0,
  shipped: 3,
  in_transit: 3,
  delivered_or_transit: 3,
  delivered: 4,
};

export const PILL_LABEL: Record<string, string> = {
  received: "Order received",
  awaiting_batch: "Order received",
  reserved: "Reserved for next batch",
  processing: "Processing",
  preparing: "Processing",
  label_printed: "Tracking added",
  tracking_added: "Tracking added",
  shipped: "In transit",
  in_transit: "In transit",
  delivered_or_transit: "In transit",
  delivered: "Delivered",
};

export const SUPPORT_EMAIL = "highfrequencyhighway@gmail.com";

export const addBusinessDays = (from: Date, days: number) => {
  const d = new Date(from.getTime());
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) added += 1;
  }
  return d;
};

export const fmtDate = (d: Date | string | null) => {
  if (!d) return null;
  const date = typeof d === "string" ? new Date(`${d}T12:00:00`) : d;
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export const deliveryWindow = (result: TrackResult) => {
  const base = result.shipped_at
    ? new Date(result.shipped_at)
    : result.est_ship_date
      ? new Date(`${result.est_ship_date}T12:00:00`)
      : null;
  if (!base || Number.isNaN(base.getTime())) return null;
  const min = fmtDate(addBusinessDays(base, TRANSIT_MIN_DAYS));
  const max = fmtDate(addBusinessDays(base, TRANSIT_MAX_DAYS));
  return min && max ? `${min} – ${max}` : null;
};

export const businessDaysBetween = (from: Date, to: Date) => {
  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) return 0;
  let count = 0;
  const d = new Date(from.getTime());
  while (d < to) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) count += 1;
  }
  return count;
};

/**
 * Derives the live stage from real signals rather than a stored status,
 * so historical/retroactive orders resolve correctly:
 *  1. delivered flag / delivery window fully elapsed after shipping
 *  2. tracking issued -> tracking added, then in transit once it's moving
 *  3. otherwise time elapsed since the order was placed
 */
export const activeStageIndex = (result: TrackResult, now: Date = new Date()) => {
  if (result.customer_status === "delivered") return 4;

  const shipped = result.shipped_at ? new Date(result.shipped_at) : null;
  const hasShipped = !!shipped && !Number.isNaN(shipped.getTime());
  const hasTracking = Boolean(result.tracking_number);

  if (hasShipped || hasTracking) {
    const from = hasShipped ? shipped! : null;
    if (from) {
      const elapsed = businessDaysBetween(from, now);
      if (elapsed > TRANSIT_MAX_DAYS) return 4; // window fully elapsed -> delivered
      if (elapsed >= 1) return 3; // moving with the carrier
      return 2; // tracking issued today
    }
    // tracking number but no ship timestamp yet
    return 2;
  }

  // No tracking yet — infer from how long the order has been waiting.
  const placed = result.placed_at ? new Date(result.placed_at) : null;
  if (placed && !Number.isNaN(placed.getTime())) {
    const waiting = businessDaysBetween(placed, now);
    const shipDate = result.est_ship_date ? new Date(`${result.est_ship_date}T12:00:00`) : null;
    const dueForProcessing =
      (shipDate && !Number.isNaN(shipDate.getTime()) && businessDaysBetween(now, shipDate) <= 3) ||
      waiting >= 2;
    if (dueForProcessing) return 1;
    return 0;
  }

  return STAGE_INDEX[result.customer_status ?? "received"] ?? 0;
};

export const stagePillLabel = (result: TrackResult, now: Date = new Date()) => {
  const idx = activeStageIndex(result, now);
  const key = STAGES[idx].key;
  return PILL_LABEL[key] ?? STAGES[idx].label;
};


export const FAQS = [
  {
    q: "How is my delivery estimate calculated?",
    a: "It's not a guess. We look at your order date and your place in line, our current inventory on hand, and how quickly we're shipping, then add carrier transit (3–7 business days). As we clear through orders, the estimate tightens. We build in a buffer, so the date you see is one we're confident we can meet or beat.",
  },
  {
    q: "I pre-ordered during your high-demand period — where's my order?",
    a: "You ordered during the biggest surge in HFH history. For a stretch this year, demand came in faster than we could restock, so we moved to a pre-order model with an extended delivery window while we caught up. That window is behind us. Fresh inventory has landed and we've now shipped all or nearly all pre-orders. If yours is somehow still open, your live status is above — and if anything looks off, email us and we'll sort it out the same day.",
  },
  {
    q: "Why did my order take longer than usual?",
    a: "For a few weeks, demand outran supply. HFH ships in batches — units arrive from our manufacturer in waves and orders fill in the order they came in. When a batch sold out, new orders waited for the next one. You were never lost in a pile. Your position and estimate update automatically as each batch clears, and we're now caught up and shipping daily.",
  },
  {
    q: "What's your shipping policy?",
    a: "Orders ship in the order received, in batches, as inventory lands. Once your label is created you'll get a tracking number here and by email. Standard US transit is 3–7 business days after your order ships.",
  },
  {
    q: "What's your return policy?",
    a: `We want you to actually try them — that's the only way to know if frequency is for you. If they're not a fit, you can return within 30 days of delivery for a full refund, even if you've opened and used them. Just email ${SUPPORT_EMAIL} with your order number to start, and send them back with everything that came in the box. The only returns we can't accept are ones that arrive physically damaged from misuse.`,
  },
  {
    q: "Can I change my shipping address?",
    a: `If your order hasn't reached the Tracking Added stage, email ${SUPPORT_EMAIL} with your order number and the correct address and we'll update it before it ships. Once tracking is issued we can't change it, but reach out anyway and we'll help however we can.`,
  },
  {
    q: "Still have a question?",
    a: `Email ${SUPPORT_EMAIL} and a real person will get back to you. We read every message.`,
  },
];
