import { useEffect } from "react";
import {
  ArrowLeft,
  ShieldCheck,
  PackageX,
  Hand,
  Wrench,
  Hash,
  Link2,
  Camera,
  MessageSquare,
  ClipboardCheck,
  Truck,
  ExternalLink,
} from "lucide-react";

const CLAIM_URL = "https://covrly.claimsorted.com/submit-a-claim";
const SUPPORT_EMAIL = "Hello@highfrequencyhw.com";

const covered = [
  {
    icon: PackageX,
    title: "Lost in transit",
    body: "Tracking stalls or the carrier can't locate your parcel. We reship your set at no cost.",
  },
  {
    icon: Hand,
    title: "Stolen after delivery",
    body: "Marked delivered but never made it to you. Porch theft is covered — a replacement goes out.",
  },
  {
    icon: Wrench,
    title: "Damaged or not functional",
    body: "Arrived cracked, crushed, or dead out of the box. Send photos and we replace the unit.",
  },
];

const bringWithYou = [
  { icon: Hash, title: "Order number", body: "From your confirmation email — looks like #1234." },
  { icon: Link2, title: "Tracking link or number", body: "A screenshot of the carrier page works too." },
  { icon: Camera, title: "Photos, if damaged", body: "The unit, the box, and the shipping label." },
  { icon: MessageSquare, title: "Short description", body: "What happened, and when you noticed it." },
];

const steps = [
  {
    n: "01",
    title: "Open the claim form",
    body: "Claims are handled by ClaimSorted, our shipping protection partner. Search for our store name and your order number to pull up your purchase.",
  },
  {
    n: "02",
    title: "Tell us what happened",
    body: "One issue per submission. If several items were hit by the same delivery problem, include them all in that one claim.",
  },
  {
    n: "03",
    title: "Upload your proof",
    body: "Attach your tracking screenshot and any damage photos while you're in the form. Missing files are the number one cause of delays.",
  },
  {
    n: "04",
    title: "We reship your order",
    body: "Once the claim is approved, a replacement ships out and you get a fresh tracking number by email.",
  },
];

const faqs = [
  {
    q: "How do I know if I have shipping protection?",
    a: "It's an optional add-on at checkout. If you selected it, it appears as a line item on your order confirmation email.",
  },
  {
    q: "What if I didn't add shipping protection?",
    a: `Email ${SUPPORT_EMAIL} with your order number and what happened. We still help — it just isn't automatic, and carrier claims take longer.`,
  },
  {
    q: "How long does a claim take?",
    a: "Most claims are reviewed within 1–3 business days. Complete submissions move fastest; if something's missing we'll email you a clear list of what we need.",
  },
  {
    q: "How long do I have to file?",
    a: "File within 30 days of the delivery date (or the last tracking update for a lost parcel), and within 60 days for damaged or defective units.",
  },
  {
    q: "Do I get a refund or a replacement?",
    a: "Shipping protection covers a replacement shipment. If you'd rather have your money back, that's the 30-day money-back guarantee — start with our returns policy instead.",
  },
];

const Claims = () => {
  useEffect(() => {
    document.title = "Returns & Claims | High Frequency Headphones";
    const desc = document.querySelector('meta[name="description"]');
    const prev = desc?.getAttribute("content") ?? null;
    desc?.setAttribute(
      "content",
      "Lost, stolen, or damaged order? File a shipping protection claim and we'll reship your High Frequency Headphones."
    );
    return () => {
      if (desc && prev) desc.setAttribute("content", prev);
    };
  }, []);

  return (
    <div className="trk">
      <div className="trk-wrap-wide">
        <a href="/" className="trk-back">
          <ArrowLeft size={16} /> Back to High Frequency Headphones
        </a>

        <div className="trk-card">
          <span className="clm-eyebrow">
            <ShieldCheck size={14} aria-hidden="true" /> Shipping protection
          </span>
          <h1 className="trk-title">Returns &amp; claims</h1>
          <p className="trk-sub" style={{ marginBottom: 22 }}>
            Every order can be checked out with shipping protection. If your set was lost in
            transit, stolen after delivery, or arrived damaged, file a claim and we reship it —
            you don't chase the carrier, we do.
          </p>
          <div className="clm-cta-row">
            <a className="trk-btn" href={CLAIM_URL} target="_blank" rel="noopener noreferrer">
              Submit a claim <ExternalLink size={16} aria-hidden="true" />
            </a>
            <a className="clm-link" href="/track">
              Track my order instead
            </a>
          </div>
          <p className="clm-fineprint">
            Takes about 3 minutes. You'll need your store name and order number to locate your
            purchase.
          </p>
        </div>

        <div className="trk-card">
          <h2 className="clm-h2">What shipping protection covers</h2>
          <div className="clm-grid-3">
            {covered.map(({ icon: Icon, title, body }) => (
              <div className="clm-tile" key={title}>
                <span className="clm-ico">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="trk-card">
          <h2 className="clm-h2">Have these ready</h2>
          <div className="clm-grid-2">
            {bringWithYou.map(({ icon: Icon, title, body }) => (
              <div className="clm-row" key={title}>
                <span className="clm-ico sm">
                  <Icon size={17} aria-hidden="true" />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="trk-card">
          <h2 className="clm-h2">How a claim works</h2>
          <ol className="clm-steps">
            {steps.map((s) => (
              <li key={s.n}>
                <span className="clm-step-n">{s.n}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="clm-mini-notes">
            <p>
              <ClipboardCheck size={15} aria-hidden="true" /> One issue per submission keeps your
              claim moving.
            </p>
            <p>
              <Truck size={15} aria-hidden="true" /> Replacements ship from our US fulfillment
              center with fresh tracking.
            </p>
          </div>
        </div>

        <div className="trk-card">
          <h2 className="clm-h2">Common questions</h2>
          <div className="clm-faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <p className="clm-fineprint" style={{ marginTop: 18 }}>
            Still unsure? Email <a className="clm-link" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>{" "}
            or read the{" "}
            <a className="clm-link" href="/shipping-policy">
              shipping &amp; return policy
            </a>
            .
          </p>
        </div>

        <div className="trk-card clm-final">
          <div>
            <h2 className="clm-h2" style={{ marginBottom: 6 }}>
              Ready to file?
            </h2>
            <p className="clm-fineprint" style={{ margin: 0 }}>
              Claims are reviewed within 1–3 business days.
            </p>
          </div>
          <a className="trk-btn" href={CLAIM_URL} target="_blank" rel="noopener noreferrer">
            Submit a claim <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Claims;
