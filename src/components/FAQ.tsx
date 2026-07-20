import { useState } from "react";
import { Brain, ChevronDown, FlaskConical, Globe, Headphones, Music, Package, RefreshCw, Shield, Timer, Truck, Wrench } from "lucide-react";

type Item = {
  Icon: typeof Brain;
  q: string;
  a: string;
};

const items: Item[] = [
  {
    Icon: Headphones,
    q: "How is this different from binaural beats on YouTube or Spotify?",
    a: "Two things. First, you don't know the exact frequency you're getting on those platforms. There's no quality control, no precision. Second, those are audio-only. Our headphones use frequency technology transducers that vibrate 100 times per second. Your brain doesn't just hear the frequency through your ears. It physically feels it through your skull. That's why the shift is instant and that's why every reaction video looks the same.",
  },
  {
    Icon: FlaskConical,
    q: "Is this actually backed by science?",
    a: "The US government funded decades of research into how frequency affects brain states, later declassified as the Gateway Process. We've also run informal EEG pilot sessions that showed more organized brainwave patterns during use. HFH is inspired by that body of work — we don't claim to treat any medical condition.",
  },
  {
    Icon: Music,
    q: "Can I use these as regular headphones too?",
    a: "Yes. Full Bluetooth connectivity. Music, podcasts, phone calls. They work as your everyday headphones with frequency technology built in. You also get noise-isolation earplugs for full frequency immersion.",
  },
  {
    Icon: Brain,
    q: "What does \"the more you use it, the less you need it\" actually mean?",
    a: "Every session helps train your brain toward focus, calm, and flow. Over time, many users find it easier to reach those states on their own. Stimulants tend to build dependency — this is designed to build the opposite.",
  },
  {
    Icon: Timer,
    q: "How fast does it work?",
    a: "The first time you put them on, you'll feel the shift in under 60 seconds. We've recorded over 300 first-time reactions on camera. The eyes widen. The spine straightens. Everyone says the same thing.",
  },
  {
    Icon: Truck,
    q: "How long does shipping take?",
    a: "In-stock orders are processed in 1-3 business days and typically arrive within 5-10 business days from your order date. International orders ship within 3-5 business days of processing and arrive in 14-28 business days depending on destination. Every order receives a tracking number by email once it leaves our fulfillment center.",
  },
  {
    Icon: Package,
    q: "What happens after I place my order?",
    a: "You get an order confirmation email immediately. When your unit leaves the fulfillment center, you get a shipping confirmation with tracking. If your order hasn't shipped within 10 business days and you haven't received a shipping notification, you're entitled to a full refund on request.",
  },
  {
    Icon: Globe,
    q: "Do you ship internationally?",
    a: "Yes. We've shipped to over 25 countries. International orders take 3-5 business days to process and 14-28 business days to arrive depending on destination. Shipping is calculated at checkout. International return shipping is the responsibility of the customer.",
  },
  {
    Icon: Shield,
    q: "What if it doesn't work for me?",
    a: "30-day money-back guarantee, starting on the date your order is delivered. Try them, use them, push them. If they're not for you, email support@highfrequencyhighway.com with your order number and we'll send a prepaid return label within 24 hours (domestic). Refund hits your original payment method within 5-10 business days of us receiving the return. Original shipping costs are not refunded.",
  },
  {
    Icon: RefreshCw,
    q: "Can I exchange for a different model or cancel my order?",
    a: "We don't offer direct exchanges right now. Return your original order using the 30-day process and place a new order for the model you want. If your order hasn't shipped yet, you can cancel anytime for a full refund — email support@highfrequencyhighway.com with \"Cancel\" in the subject line and your order number, and we'll confirm within 48 hours.",
  },
  {
    Icon: Wrench,
    q: "What if my headphones arrive damaged or defective?",
    a: "Email support@highfrequencyhighway.com immediately with your order number, photos of the damage, and a brief description. We'll ship a replacement at no cost, or issue a full refund including original shipping if a replacement isn't available. You don't need to send the damaged unit back unless we ask. Defective claims must be made within 60 days of delivery.",
  },
];


const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section section-light faq-section" data-theme="light">
      <div className="hfh-container narrow">
        <h2 className="section-header">Questions.</h2>
        <div className="faq-list">
          {items.map((item, i) => {
            const open = openIndex === i;
            return (
              <details
                key={item.q}
                className="faq-item"
                open={open}
                onToggle={(e) => {
                  const el = e.currentTarget;
                  if (el.open) setOpenIndex(i);
                  else if (openIndex === i) setOpenIndex(null);
                }}
              >
                <summary className="faq-summary">
                  <span className="faq-icon-box"><item.Icon size={16} /></span>
                  <span className="faq-q">{item.q}</span>
                  <span className="faq-chev"><ChevronDown size={18} /></span>
                </summary>
                <div className="faq-a">{item.a}</div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
