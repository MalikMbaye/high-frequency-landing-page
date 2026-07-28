import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ChevronDown, Info, Mail, Truck } from "lucide-react";
import {
  FAQS,
  STAGES,
  SURGE_END,
  SURGE_START,
  SUPPORT_EMAIL,
  activeStageIndex,
  stagePillLabel,
  deliveryWindow,
  fmtDate,
  type TrackResult,
} from "@/lib/track";

const TrackResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = (location.state as { order?: TrackResult } | null)?.order ?? null;
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(new Set());

  useEffect(() => {
    document.title = "Your Order Status | High Frequency Headphones";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  useEffect(() => {
    if (!order) navigate("/track", { replace: true });
  }, [order, navigate]);

  if (!order) return null;

  const active = activeStageIndex(order);
  const status = order.customer_status ?? "received";
  const pill = stagePillLabel(order);
  const stage = STAGES[active];
  const window = deliveryWindow(order);
  const placed = order.placed_at ? new Date(order.placed_at) : null;
  const isDelivered = active === 4;
  const isLive = Boolean(order.tracking_number || order.shipped_at);
  const showSurgeBanner =
    !!placed && placed >= SURGE_START && placed < SURGE_END && !isDelivered;

  return (
    <div className="trk">
      <div className="trk-wrap-wide">
        <Link to="/track" className="trk-back">
          <ArrowLeft size={16} /> Track another order
        </Link>

        <div className="trk-card">
          <div className="trk-summary">
            <div className="trk-sum-item">
              <span className="trk-sum-k">Order</span>
              <span className="trk-sum-v">#{order.order_number.replace(/^#/, "")}</span>
            </div>
            {placed && (
              <div className="trk-sum-item">
                <span className="trk-sum-k">Placed</span>
                <span className="trk-sum-v">{fmtDate(placed)}</span>
              </div>
            )}
            {window && (
              <div className="trk-sum-item">
                <span className="trk-sum-k">
                  {isDelivered ? "Delivered" : "Estimated delivery"}
                </span>
                <span className="trk-sum-v">{window}</span>
              </div>
            )}
            <span className={`trk-pill${isLive ? " is-live" : ""}`}>
              {pill}
            </span>
          </div>

          {showSurgeBanner && (
            <div className="trk-banner">
              <Info size={18} style={{ flex: "0 0 18px", marginTop: 2 }} />
              <span>
                You ordered during our biggest demand surge yet. Fresh inventory has landed,
                we're shipping daily, and the estimate below reflects your live position.
              </span>
            </div>
          )}

          <div className="trk-chev-scroll" style={{ marginTop: 24 }}>
            <div className="trk-chevs">
              {STAGES.map((s, i) => {
                const state = i < active ? "done" : i === active ? "active" : "todo";
                return (
                  <div key={s.key} className={`trk-chev is-${state}`}>
                    <span className="trk-chev-num">
                      {state === "done" && <Check size={13} />}
                      {s.label}
                    </span>
                    <span className="trk-chev-cap">{s.caption}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="trk-detail">
            <h3>{stage.label}</h3>
            <p>{stage.description}</p>

            {status === "reserved" && order.batch_code && (
              <p>
                You're reserved for <strong>{order.batch_code}</strong>. We'll ship your set as soon
                as that batch lands.
              </p>
            )}

            {!isLive && order.est_ship_date && (
              <p>
                Estimated to ship around <strong>{fmtDate(order.est_ship_date)}</strong>
                {order.position_in_queue ? ` — you're #${order.position_in_queue} in the queue.` : "."}
              </p>
            )}

            {!isLive && (
              <p className="trk-note">
                Estimates include a buffer and update automatically as we clear through orders.
              </p>
            )}

            {isLive && (
              <>
                {order.shipped_at && <p>Shipped on {fmtDate(new Date(order.shipped_at))}.</p>}
                {(order.tracking_company || order.tracking_number) && (
                  <p className="trk-mono">
                    {order.tracking_company} {order.tracking_number}
                  </p>
                )}
                {order.tracking_url && (
                  <a
                    className="trk-btn trk-btn-wide"
                    href={order.tracking_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Truck size={18} /> Track your shipment
                  </a>
                )}
              </>
            )}
          </div>
        </div>

        <div className="trk-card">
          <h2 className="trk-h2">What each stage means</h2>
          <ul className="trk-meanings">
            {STAGES.map((s, i) => (
              <li key={s.key} className="trk-meaning">
                <span className="trk-meaning-n">{i + 1}</span>
                <div>
                  <div className="trk-meaning-t">
                    {s.label}
                    <span className="trk-meaning-eta">{s.eta}</span>
                  </div>
                  <div className="trk-meaning-d">{s.description}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="trk-card">
          <h2 className="trk-h2">Questions</h2>
          <div className="trk-faq">
            {FAQS.map((f, i) => {
              const isOpen = openFaqs.has(i);
              return (
                <div key={f.q} className="trk-faq-item">
                  <button
                    type="button"
                    className="trk-faq-q"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenFaqs((prev) => {
                        const next = new Set(prev);
                        if (next.has(i)) next.delete(i);
                        else next.add(i);
                        return next;
                      })
                    }
                  >
                    {f.q}
                    <ChevronDown
                      size={18}
                      style={{
                        flex: "0 0 18px",
                        transform: isOpen ? "rotate(180deg)" : "none",
                        transition: "transform .2s ease",
                      }}
                    />
                  </button>
                  {isOpen && <div className="trk-faq-a">{f.a}</div>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="trk-card">
          <h2 className="trk-h2">Still need help?</h2>
          <p className="trk-note" style={{ marginBottom: 14 }}>
            Have a claim or a question about this order? Email our customer service team and
            we'll get back to you — your order number is included automatically.
          </p>
          <a
            className="trk-btn trk-btn-wide"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none" }}
            href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
              `Order #${order.order_number.replace(/^#/, "")} — customer service claim`
            )}&body=${encodeURIComponent(
              `Order number: #${order.order_number.replace(/^#/, "")}\nStatus: ${
                pill
              }\n\nHow can we help?\n`
            )}`}
          >
            <Mail size={18} /> Contact customer service
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrackResultPage;
