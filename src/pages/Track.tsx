import { useState, useEffect, FormEvent } from "react";
import { ArrowLeft, Check, Loader2, Package, Truck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type TrackResult = {
  order_number: string;
  customer_status: string | null;
  batch_code: string | null;
  batch_status: string | null;
  position_in_batch: number | null;
  est_ship_date: string | null;
  tracking_number: string | null;
  tracking_url: string | null;
  tracking_company: string | null;
  shipped_at: string | null;
};

const STAGES = [
  { key: "received", label: "Order received" },
  { key: "reserved", label: "Reserved for your batch" },
  { key: "batch_in_production", label: "In production" },
  { key: "batch_in_transit", label: "On its way to us" },
  { key: "preparing", label: "Preparing your shipment" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

const STATUS_INDEX: Record<string, number> = {
  received: 0,
  awaiting_batch: 0,
  reserved: 1,
  batch_in_production: 2,
  batch_in_transit: 3,
  preparing: 4,
  shipped: 5,
  delivered: 6,
};

const copyFor = (status: string, batch: string | null) => {
  const code = batch || "your batch";
  switch (status) {
    case "reserved":
      return `You're locked into ${code}. This is the batch that brings your set home.`;
    case "batch_in_production":
      return `${code} is being built right now. The frequency is loading.`;
    case "batch_in_transit":
      return `${code} is in transit to our warehouse. Almost there.`;
    case "preparing":
      return "Your batch landed. We're packing your order now.";
    case "shipped":
      return "It's moving. Your set is on the way — track it live below.";
    case "awaiting_batch":
      return "Your order's confirmed. It'll be assigned to the next incoming batch — this page updates the second it's locked in.";
    default:
      return "We've got your order. You're officially in line.";
  }
};

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

const Track = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TrackResult | null>(null);

  useEffect(() => {
    document.title = "Track Your Order | High Frequency Headphones";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      meta.remove();
    };
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    const { data, error: rpcError } = await supabase.functions.invoke("track-order", {
      body: {
        orderNumber,
        email,
      },
    });
    setLoading(false);
    if (rpcError) {
      setError("Something went wrong on our end. Please try again in a moment.");
      return;
    }
    const row = (data as { order: TrackResult | null } | null)?.order;
    if (!row) {
      setError(
        "We couldn't find an order with that number and email — double-check both and try again."
      );
      return;
    }
    setResult(row);
  };

  const status = result?.customer_status || "received";
  const activeIndex = STATUS_INDEX[status] ?? 0;

  return (
    <div className="track-page">
      <div className="track-wrap">
        <a href="/" className="track-back">
          <ArrowLeft size={16} /> Back to High Frequency Headphones
        </a>

        <h1 className="track-title">Track Your Order</h1>
        <p className="track-sub">
          We ship in batches. Enter your order details to see exactly where you sit in the queue.
        </p>

        <form onSubmit={onSubmit} className="track-form">
          <label className="track-label">
            Order number
            <input
              className="track-input"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="#1042"
              required
            />
          </label>
          <label className="track-label">
            Email used at checkout
            <input
              className="track-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
            />
          </label>
          <button className="track-btn" type="submit" disabled={loading}>
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Track my order"}
          </button>
        </form>

        {error && <p className="track-error">{error}</p>}

        {result && (
          <div className="track-result">
            <div className="track-order-no">Order {result.order_number}</div>
            <p className="track-headline">{copyFor(status, result.batch_code)}</p>

            <ol className="track-stages">
              {STAGES.map((stage, i) => {
                const state = i < activeIndex ? "done" : i === activeIndex ? "active" : "todo";
                return (
                  <li key={stage.key} className={`track-stage is-${state}`}>
                    <span className="track-dot">{state === "done" ? <Check size={12} /> : null}</span>
                    <span className="track-stage-label">{stage.label}</span>
                  </li>
                );
              })}
            </ol>

            <div className="track-details">
              {result.batch_code && (
                <p>
                  <Package size={15} /> You're in <strong>{result.batch_code}</strong>
                  {result.position_in_batch ? ` — spot #${result.position_in_batch} in this batch.` : "."}
                </p>
              )}
              {status !== "shipped" && result.est_ship_date && (
                <p>🗓️ Estimated to ship around <strong>{fmtDate(result.est_ship_date)}</strong>.</p>
              )}
              {status === "awaiting_batch" && (
                <p>
                  Your order is confirmed and will be assigned to the next incoming batch — we'll
                  update this page as soon as it's locked in.
                </p>
              )}
              {status === "shipped" && (
                <div className="track-shipped">
                  {result.shipped_at && <p>Shipped on {fmtDate(result.shipped_at)}</p>}
                  {(result.tracking_company || result.tracking_number) && (
                    <p className="track-carrier">
                      {result.tracking_company} {result.tracking_number}
                    </p>
                  )}
                  {result.tracking_url && (
                    <a
                      className="track-btn track-btn-ship"
                      href={result.tracking_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Truck size={18} /> Track your shipment
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Track;
