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
  d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

type Step = { key: string; label: string; caption: string; date: Date };

const DeliveryTimeline = () => {
  const steps = useMemo<Step[]>(() => {
    const today = new Date();
    return [
      { key: "order", label: "Order placed", caption: "Payment confirmed", date: today },
      { key: "pack", label: "Packed & tested", caption: "Hand-assembled", date: addBusinessDays(today, 1) },
      { key: "ship", label: "Shipped", caption: "Tracking emailed", date: addBusinessDays(today, 2) },
      { key: "deliver", label: "Now shipping", caption: "As little as 3 days", date: addBusinessDays(today, 3) },
    ];
  }, []);

  return (
    <div className="dlv-timeline">
      <div className="dlv-head">
        <span className="dlv-title">Delivery</span>
        <span className="dlv-badge">Best case: {fmt(steps[3].date)}</span>
      </div>

      <div className="dlv-track" role="list" aria-label="Delivery progress">
        <div className="dlv-line" aria-hidden="true">
          <span className="dlv-line-fill" style={{ width: "100%" }} />
        </div>
        {steps.map((s) => (
          <span key={s.key} className="dlv-node is-on" role="listitem" aria-label={`${s.label} — ${fmt(s.date)}`}>
            <span className="dlv-dot" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default DeliveryTimeline;
