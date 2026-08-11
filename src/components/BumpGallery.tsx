import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import honeyHero from "@/assets/honey/honey-hero.webp";
import honeyStoneHeadphones from "@/assets/honey/honey-stone-headphones.webp";
import honeyPourResin from "@/assets/honey/honey-pour-resin.webp";
import honeySteamingCup from "@/assets/honey/honey-steaming-cup.webp";
import honeyBoxApp from "@/assets/honey/honey-box-app.webp";
import honeyGoldSpoon from "@/assets/honey/honey-gold-spoon.webp";
import honeyDipperWood from "@/assets/honey/honey-dipper-wood.webp";

/** Square 1:1 gallery for the bump modal: main image, thumb rail, lightbox. */
export const bumpGalleryImages: Array<{ src: string; alt: string }> = [
  { src: honeyHero, alt: "High Frequency Honey sachet with honey pouring out" },
  { src: honeyStoneHeadphones, alt: "Honey stick beside High Frequency headphones and tea on slate" },
  { src: honeyPourResin, alt: "Golden honey pouring beside a piece of high-altitude resin" },
  { src: honeySteamingCup, alt: "Honey stick squeezed into a steaming cup of tea" },
  { src: honeyBoxApp, alt: "Box of honey sticks with the app and a cup of tea" },
  { src: honeyGoldSpoon, alt: "Brass spoon of dark honey beside resin on slate" },
  { src: honeyDipperWood, alt: "Wooden honey dipper drizzling honey next to a honey stick" },
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
      </div>

      <div className="hfg-rail">
        {total > 5 && (
          <button
            type="button"
            className="hfg-rail-arrow hfg-rail-prev"
            onClick={() => railRef.current?.scrollBy({ left: -160, behavior: "smooth" })}
            aria-label="Scroll thumbnails left"
          >
            <ChevronLeft size={14} />
          </button>
        )}
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
        {total > 5 && (
          <button
            type="button"
            className="hfg-rail-arrow hfg-rail-next"
            onClick={() => railRef.current?.scrollBy({ left: 160, behavior: "smooth" })}
            aria-label="Scroll thumbnails right"
          >
            <ChevronRight size={14} />
          </button>
        )}
      </div>


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
