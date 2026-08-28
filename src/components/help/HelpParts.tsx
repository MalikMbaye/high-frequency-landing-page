import { useEffect, useState } from "react";
import { ChevronDown, Link2, PackageSearch, ShieldCheck } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { HelpFaq, SUPPORT_EMAIL, mentionsOrders, slugify } from "@/lib/helpCenter";

/** Inline nudge appended to any answer that touches orders / shipping / tracking. */
export const TrackOrderNudge = () => (
  <p className="hc-track-nudge">
    <PackageSearch size={15} aria-hidden="true" />
    <span>
      Want a live status? <a href="/track">Track your order here</a> — enter the email you used at
      checkout and we'll show your current stage and delivery estimate.
    </span>
  </p>
);

/** Shipping protection claim pointer for lost / stolen / damaged orders. */
export const ClaimsNudge = () => (
  <p className="hc-track-nudge">
    <ShieldCheck size={15} aria-hidden="true" />
    <span>
      Lost, stolen, or damaged? <a href="/claims">File a shipping protection claim</a> and we'll
      reship your order.
    </span>
  </p>
);

export const Markdown = ({ children }: { children: string }) => (
  <div className="hc-prose">
    <ReactMarkdown>{children}</ReactMarkdown>
  </div>
);

export const FaqAccordion = ({ faqs }: { faqs: HelpFaq[] }) => {
  const [open, setOpen] = useState<string | null>(null);

  // Deep link: /help/section#slugified-question opens and scrolls to that row.
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));
    if (!hash) return;
    const match = faqs.find((f) => slugify(f.q) === hash);
    if (!match) return;
    setOpen(hash);
    window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ block: "center" });
    }, 80);
  }, [faqs]);

  if (!faqs.length) return null;

  return (
    <div className="hc-faq">
      {faqs.map((f) => {
        const id = slugify(f.q);
        const isOpen = open === id;
        return (
          <div key={id} id={id} className={`hc-faq-row ${isOpen ? "open" : ""}`}>
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                className="hc-faq-q"
                aria-expanded={isOpen}
                aria-controls={`${id}-panel`}
                onClick={() => setOpen(isOpen ? null : id)}
              >
                {f.q}
                <ChevronDown className="chev" size={18} aria-hidden="true" />
              </button>
            </h3>
            {isOpen && (
              <div className="hc-faq-a" id={`${id}-panel`}>
                <Markdown>{f.a}</Markdown>
                {mentionsOrders(f.q, f.a) && <TrackOrderNudge />}
                <a className="hc-permalink" href={`#${id}`}>
                  <Link2 size={12} style={{ display: "inline", marginRight: 4 }} />
                  Link to this answer
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const StillStuck = () => (
  <section className="hc-callout">
    <h2>Still stuck?</h2>
    <p>
      Email {SUPPORT_EMAIL} and we'll reply within 24 hours. Put your order number in the subject
      line if it's about an order.
    </p>
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <a className="hc-btn" href={`mailto:${SUPPORT_EMAIL}`}>
        Email support
      </a>
      <a className="hc-btn hc-btn-ghost" href="/claims">
        Returns &amp; claims
      </a>
      <a href="/help/contact" style={{ fontSize: 14, color: "var(--hc-mute)" }}>
        More ways to get help
      </a>
    </div>
  </section>
);

export const OrderTrackerCallout = () => (
  <section className="hc-callout">
    <h2>Check your order status</h2>
    <p>
      Enter your order number and the email you used at checkout. Your stage, delivery estimate, and
      live carrier link update automatically.
    </p>
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <a className="hc-btn" href="/track">
        Open the order tracker
      </a>
      <a className="hc-btn-ghost hc-btn" href="/claims">
        Returns &amp; claims
      </a>
    </div>
  </section>
);
