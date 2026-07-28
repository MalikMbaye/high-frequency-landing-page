import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const STORAGE_KEY = "hfh_back_in_stock_splash_v1";
const DURATION = 2200;

const BackInStockSplash = () => {
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}

    setMounted(true);
    document.body.style.overflow = "hidden";

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const colors = ["#6b2eb8", "#a855f7", "#d4af37", "#ffffff"];
    let raf = 0;

    if (!reduce) {
      const end = Date.now() + DURATION - 400;
      const frame = () => {
        confetti({ particleCount: 4, angle: 60, spread: 62, origin: { x: 0, y: 0.75 }, colors, disableForReducedMotion: true });
        confetti({ particleCount: 4, angle: 120, spread: 62, origin: { x: 1, y: 0.75 }, colors, disableForReducedMotion: true });
        if (Date.now() < end) raf = requestAnimationFrame(frame);
      };
      confetti({ particleCount: 90, spread: 100, origin: { y: 0.6 }, colors, disableForReducedMotion: true });
      raf = requestAnimationFrame(frame);
    }

    const t1 = window.setTimeout(() => setLeaving(true), DURATION);
    const t2 = window.setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = "";
    }, DURATION + 500);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className={`bis-splash ${leaving ? "is-leaving" : ""}`} role="status" aria-live="polite">
      <div className="bis-inner">
        <span className="bis-eyebrow">High Frequency Headphones</span>
        <h2 className="bis-title">Now Back In Stock</h2>
        <div className="bis-bar" aria-hidden="true"><span /></div>
        <p className="bis-sub">Loading your experience…</p>
      </div>
    </div>
  );
};

export default BackInStockSplash;
