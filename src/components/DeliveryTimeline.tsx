import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

const addBusinessDays = (start: Date, days: number) => {
  const d = new Date(start);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) added += 1;
  }
  return d;
};

const fmt = (d: Date) =>
  d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

const BEST_CASE_DAYS = 8;
const WORST_CASE_DAYS = 13;

type Step = { key: string; label: string; caption: string; date: Date };

const DeliveryTimeline = () => {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const { steps, worstCaseDate } = useMemo(() => {
    const today = new Date();
    return {
      steps: [
        { key: "order", label: "Order placed", caption: "Payment confirmed instantly", date: today },
        { key: "pack", label: "Packed & tested", caption: "Hand-assembled and QC'd", date: addBusinessDays(today, 3) },
        { key: "ship", label: "Shipped", caption: "Tracking number emailed", date: addBusinessDays(today, 5) },
        { key: "deliver", label: "Now shipping", caption: "Local delivery window", date: addBusinessDays(today, BEST_CASE_DAYS) },
      ],
      worstCaseDate: addBusinessDays(today, WORST_CASE_DAYS),
    };
  }, []);

  return (
    <div className="dlv-timeline">
      <button
        type="button"
        className="dlv-head"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-label={expanded ? "Collapse delivery timeline" : "Expand delivery timeline"}
      >
        <span className="dlv-title">Your delivery timeline</span>
        <span className="dlv-badge">
          Estimated delivery: {fmt(steps[3].date)}
          {expanded && ` — ${fmt(worstCaseDate)}`}
        </span>
        <span
          className="dlv-chevron"
          aria-hidden="true"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <ChevronDown size={16} />
        </span>
      </button>

      {expanded && (
        <>
          <div className="dlv-track" role="list">
            <div className="dlv-line" aria-hidden="true">
              <span className="dlv-line-fill" style={{ width: `${(active / (steps.length - 1)) * 100}%` }} />
            </div>
            {steps.map((s, i) => (
              <button
                key={s.key}
                type="button"
                role="listitem"
                className={`dlv-node ${i <= active ? "is-on" : ""}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-label={`${s.label} — ${fmt(s.date)}`}
              >
                <span className="dlv-dot" aria-hidden="true" />
                <span className="dlv-label">{s.label}</span>
                <span className="dlv-date">{fmt(s.date)}</span>
              </button>
            ))}
          </div>

          <div className="dlv-detail">
            <strong>{steps[active].label}</strong>
            <span>{steps[active].caption}</span>
          </div>

          <p className="dlv-note">
            <strong>Estimated delivery window:</strong> {fmt(steps[3].date)} — {fmt(worstCaseDate)}.
            Transit is 5–10 business days after packing and testing for local orders, 10–20 business days for international. Dates are estimates and update automatically as your order moves.
          </p>
        </>
      )}
    </div>
  );
};

export default DeliveryTimeline;
