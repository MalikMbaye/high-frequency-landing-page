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
  },
  {
    key: "processing",
    label: "Processing & Handling",
    caption: "Prepped and packed",
    description:
      "Your order reached the front of the line and our warehouse is prepping and packing it now.",
  },
  {
    key: "label_printed",
    label: "Label Printed",
    caption: "Handed to the carrier",
    description:
      "Your shipping label is created and your package is being handed to the carrier. Your tracking number appears next.",
  },
  {
    key: "shipped",
    label: "Tracking Added",
    caption: "In transit",
    description:
      "Your package is with the carrier and moving. Follow it live below. Delivery usually takes 3–7 business days from here.",
  },
  {
    key: "delivered",
    label: "Delivered",
    caption: "At your door",
    description:
      "Delivered. Time to plug in and shift your state. Anything off? Reach out and we'll make it right.",
  },
] as const;

export const STAGE_INDEX: Record<string, number> = {
  received: 0,
  awaiting_batch: 0,
  reserved: 0,
  processing: 1,
  preparing: 1,
  label_printed: 2,
  batch_in_production: 0,
  batch_in_transit: 0,
  shipped: 3,
  delivered_or_transit: 3,
  delivered: 4,
};

export const PILL_LABEL: Record<string, string> = {
  received: "Order received",
  awaiting_batch: "Order received",
  reserved: "Reserved for next batch",
  processing: "Processing",
  preparing: "Processing",
  label_printed: "Label printed",
  shipped: "In transit",
  delivered_or_transit: "In transit",
  delivered: "Delivered",
};

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

export const activeStageIndex = (result: TrackResult) => {
  if (result.customer_status === "delivered") return 4;
  if (result.tracking_number || result.shipped_at) return 3;
  return STAGE_INDEX[result.customer_status ?? "received"] ?? 0;
};

export const FAQS = [
  {
    q: "How is my delivery estimate calculated?",
    a: "It's not a guess. We look at your order date and your place in line, our current inventory on hand, and how many orders we ship per day, then add carrier transit (3–7 business days). As we clear the backlog the estimate tightens. We build in a small buffer, so the date you see is one we're confident we can beat.",
  },
  {
    q: "I ordered between June 1 and July 27 — where's my order?",
    a: "You ordered during the biggest demand surge in HFH history, and for a stretch orders came in faster than we could restock. That's fixed — a fresh shipment landed and we're shipping around 142 orders a day. Every order from that window is in the current wave and ships by Aug 4, arriving within 3–7 business days after that.",
  },
  {
    q: "Why is my order taking longer than usual?",
    a: "Demand outran supply for a few weeks. HFH ships in batches — units arrive from our manufacturer in waves and orders fill in the order they came in. When a batch sells out, new orders wait for the next one. You're never lost in a pile; your position and estimate update automatically as each batch clears.",
  },
  {
    q: "What's your shipping policy?",
    a: "Orders ship in the order received, in batches, as inventory lands. Once your label is created you get a tracking number here and by email. Standard US transit is 3–7 business days after your order ships.",
  },
  {
    q: "What's your return policy?",
    a: "Returns are accepted within 30 days of delivery for unused items in original packaging. Email highfrequencyhighway@gmail.com with your order number to start a return.",
  },
  {
    q: "Can I change my shipping address?",
    a: "If your order hasn't reached the Label Printed stage, email highfrequencyhighway@gmail.com with your order number and the correct address and we'll update it before it ships. Once a label is printed we can't change it.",
  },
];
