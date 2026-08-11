import { useEffect, useState } from "react";
import "@/components/upsell.css";
import { upsellCopy } from "@/content/upsellCopy";
import honeyBox from "@/assets/honey/honey-hero.webp";
import gummies from "@/assets/honey/honey-cup.webp";
import bundle from "@/assets/honey/honey-wave.webp";

/**
 * Post-purchase one-click upsell (adaptable into a Shopify post-purchase extension).
 * All copy comes from src/content/upsellCopy.ts; the ingredient/benefit paragraph is
 * fetched from /content/upsell-detail.json so it is never in the initial HTML.
 */
const IMAGES: Record<string, string> = {
  "HFH-HONEY-30": honeyBox,
  "HFH-GUMMIES-60": gummies,
  "HFH-BUNDLE": bundle,
};

const ALT: Record<string, string> = {
  "HFH-HONEY-30": "High Frequency Honey on a gold spoon",
  "HFH-GUMMIES-60": "High Frequency Honey stick poured into a warm cup",
  "HFH-BUNDLE": "Gold waveform with honey across a matte black box",
};

/** Replace with the Shopify post-purchase changeset call. */
async function addUpsell(sku: string) {
  console.log("[upsell] addUpsell", sku);
}

interface DetailContent {
  paragraphs: string[];
  disclaimer: string;
}

export default function PostPurchaseUpsell() {
  const [detail, setDetail] = useState<DetailContent | null>(null);
  const [pending, setPending] = useState<string | null>(null);

  // Fetched after mount — keeps the detail copy out of the served HTML.
  useEffect(() => {
    fetch("/content/upsell-detail.json")
      .then((r) => r.json())
      .then(setDetail)
      .catch((e) => console.error("Failed to load upsell detail:", e));
  }, []);

  const handleAdd = async (sku: string) => {
    setPending(sku);
    await addUpsell(sku);
    setPending(null);
  };

  return (
    <main className="hfu hfu-page">
      <div className="hfu-wrap">
        <h1 className="hfu-h hfu-h1">{upsellCopy.headline}</h1>
        <p className="hfu-p hfu-sub">{upsellCopy.sub}</p>

        <div className="hfu-grid">
          {upsellCopy.cards.map((card) => (
            <article key={card.sku} className={card.chip ? "hfu-card hfu-card-featured" : "hfu-card"}>
              <div className="hfu-media hfu-square">
                <img src={IMAGES[card.sku]} alt={ALT[card.sku]} loading="lazy" />
              </div>
              {card.chip && <span className="hfu-chip">{card.chip}</span>}
              <h3>{card.title}</h3>
              <p className="hfu-p">{card.desc}</p>
              <div className="hfu-price">
                <strong>{card.price}</strong>
                {card.compareAt && <s>{card.compareAt}</s>}
              </div>
              <button type="button" className="hfu-cta" onClick={() => handleAdd(card.sku)} disabled={pending === card.sku}>
                {pending === card.sku ? "Adding\u2026" : card.cta}
              </button>
            </article>
          ))}
        </div>

        {detail && (
          <div className="hfu-detail">
            {detail.paragraphs.map((p) => (
              <p key={p} className="hfu-p">
                {p}
              </p>
            ))}
            <p className="hfu-fine">{detail.disclaimer}</p>
          </div>
        )}

        <button type="button" className="hfu-link" onClick={() => (window.location.href = "/track")}>
          {upsellCopy.skip}
        </button>
        <p className="hfu-trust">{upsellCopy.footer}</p>
      </div>
    </main>
  );
}
