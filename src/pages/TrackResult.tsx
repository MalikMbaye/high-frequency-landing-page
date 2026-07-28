import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ChevronDown, Info, Truck } from "lucide-react";
import {
  BACKLOG_CLEAR_DATE,
  FAQS,
  PILL_LABEL,
  STAGES,
  SURGE_END,
  SURGE_START,
  activeStageIndex,
  deliveryWindow,
  fmtDate,
  type TrackResult,
} from "@/lib/track";

const TrackResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = (location.state as { order?: TrackResult } | null)?.order ?? null;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
              {PILL_LABEL[status] ?? stage.label}
            </span>
          </div>

          {showSurgeBanner && (
            <div className="trk-banner">
              <Info size={18} style={{ flex: "0 0 18px", marginTop: 2 }} />
              <span>
                You ordered during our biggest surge yet (Jun 1 – Jul 27). We're catching up fast;
                your order is in the current shipping wave and the estimate below accounts for the
                backlog.
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
                Estimates include a small buffer while we clear the current backlog (caught up by{" "}
                {BACKLOG_CLEAR_DATE}). As the queue drains, this date tightens.
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
                  <div className="trk-meaning-t">{s.label}</div>
                  <div className="trk-meaning-d">{s.description}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="trk-card">
          <h2 className="trk-h2">Questions</h2>
          <div className="trk-faq">
            {FAQS.map((f, i) => (
              <div key={f.q} className="trk-faq-item">
                <button
                  type="button"
                  className="trk-faq-q"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {f.q}
                  <ChevronDown
                    size={18}
                    style={{
                      flex: "0 0 18px",
                      transform: openFaq === i ? "rotate(180deg)" : "none",
                      transition: "transform .2s ease",
                    }}
                  />
                </button>
                {openFaq === i && <div className="trk-faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackResultPage;
