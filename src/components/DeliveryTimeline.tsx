import { useMemo, useState } from "react";

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

type Step = { key: string; label: string; caption: string; date: Date };

const DeliveryTimeline = () => {
  const [active, setActive] = useState(0);

  const steps = useMemo<Step[]>(() => {
    const today = new Date();
    return [
      { key: "order", label: "Order placed", caption: "Payment confirmed instantly", date: today },
      { key: "pack", label: "Packed & tested", caption: "Hand-assembled and QC'd", date: addBusinessDays(today, 1) },
      { key: "ship", label: "Shipped", caption: "Tracking number emailed", date: addBusinessDays(today, 2) },
      { key: "deliver", label: "Now shipping in as little as 3 days", caption: "Best case delivery window", date: addBusinessDays(today, 3) },
    ];
  }, []);

  return (
    <div className="dlv-timeline">
      <div className="dlv-head">
        <span className="dlv-title">Your delivery timeline</span>
        <span className="dlv-badge">Best case: {fmt(steps[3].date)}</span>
      </div>

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
            <span className="dlv-date">{fmt(s.date)}</span>
          </button>
        ))}
      </div>

      <div className="dlv-detail">
        <strong>{steps[active].label}</strong>
        <span>{steps[active].caption}</span>
      </div>

      <p className="dlv-note">
        Estimated dates based on today's order. Most orders arrive in 3-10 business days.
      </p>
    </div>
  );
};

export default DeliveryTimeline;
