import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import honeyHero from "@/assets/honey/honey-hero.webp";
import honeyRitual from "@/assets/honey/honey-ritual.webp";
import honeyIngredients from "@/assets/honey/honey-ingredients.webp";
import honeyDipperWood from "@/assets/honey/honey-dipper-wood.webp";
import honeyGuarantee from "@/assets/honey/honey-guarantee.webp";
import honeyFacts from "@/assets/honey/honey-facts.webp";
import honeySteamingCup from "@/assets/honey/honey-steaming-cup.webp";
import honeyGoldSpoon from "@/assets/honey/honey-gold-spoon.webp";

/** Square 1:1 gallery for the bump modal: main image, thumb rail, lightbox. */
export const bumpGalleryImages: Array<{ src: string; alt: string }> = [
  { src: honeyHero, alt: "High Frequency Honey sachet with honey pouring out" },
  { src: honeyRitual, alt: "Three steps: tear the stick, squeeze into tea, ten seconds once a day" },
  { src: honeyIngredients, alt: "Three ingredients: mountain mineral resin, organic honey, natural caramel" },
  { src: honeyDipperWood, alt: "Wooden honey dipper drizzling honey next to a honey stick and resin" },
  { src: honeyGuarantee, alt: "Try it for 30 days — full refund, same guarantee as the headphones" },
  { src: honeyFacts, alt: "Supplement facts panel for High Frequency Honey" },
  { src: honeySteamingCup, alt: "Honey stick squeezed into a steaming cup of tea" },
  { src: honeyGoldSpoon, alt: "Brass spoon of dark honey beside resin on slate" },
];

export default function BumpGallery() {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const total = bumpGalleryImages.length;


  const step = useCallback(
    (dir: number) => setIndex((i) => (i + dir + total) % total),
    [total],
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setLightbox(false);
      }
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [lightbox, step]);

  const current = bumpGalleryImages[index];

  return (
    <div className="hfg">
      <div className="hfg-main">
        <button
          type="button"
          className="hfg-main-btn"
          onClick={() => setLightbox(true)}
          aria-label="Expand image"
        >
          <img src={current.src} alt={current.alt} loading="lazy" />
        </button>
        <button type="button" className="hfg-arrow hfg-prev" onClick={() => step(-1)} aria-label="Previous image">
          <ChevronLeft size={20} />
        </button>
        <button type="button" className="hfg-arrow hfg-next" onClick={() => step(1)} aria-label="Next image">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="hfg-rail">
        <div className="hfg-thumbs" ref={railRef} role="tablist" aria-label="Product images">
          {bumpGalleryImages.map((img, i) => (
            <button
              key={img.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={`hfg-thumb ${i === index ? "is-active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`View image ${i + 1}`}
            >
              <img src={img.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      <p className="hfg-note">AI-enhanced product images. Final packaging differs from what is shown.</p>



      {lightbox &&
        createPortal(
          <div
            className="hfg-lb"
            role="dialog"
            aria-modal="true"
            aria-label="Product image viewer"
            onClick={(e) => {
              if (e.target === e.currentTarget) setLightbox(false);
            }}
          >
            <button type="button" className="hfg-lb-close" onClick={() => setLightbox(false)} aria-label="Close viewer">
              <X size={18} />
            </button>
            <button type="button" className="hfg-arrow hfg-prev" onClick={() => step(-1)} aria-label="Previous image">
              <ChevronLeft size={20} />
            </button>
            <figure className="hfg-lb-figure">
              <img src={current.src} alt={current.alt} />
            </figure>
            <button type="button" className="hfg-arrow hfg-next" onClick={() => step(1)} aria-label="Next image">
              <ChevronRight size={20} />
            </button>
          </div>,
          document.body,
        )}
    </div>
  );
}
