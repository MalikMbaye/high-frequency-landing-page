import { useEffect, useRef, useState } from "react";

/**
 * Thin animated sine wave under the topbar. The only motion on the page.
 * Frozen to a static path when the user prefers reduced motion.
 */
const Waveform = () => {
  const [d, setD] = useState("");
  const raf = useRef<number>();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const build = (phase: number, wavelength: number) => {
      const pts: string[] = [];
      for (let x = 0; x <= 100; x += 2) {
        const y = 1 + Math.sin((x / wavelength) * Math.PI * 2 + phase) * 0.9;
        pts.push(`${x === 0 ? "M" : "L"}${x} ${y.toFixed(3)}`);
      }
      return pts.join(" ");
    };

    if (reduced) {
      setD(build(0, 12));
      return;
    }

    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const elapsed = (t - start) / 1000;
      const wavelength = 10 + Math.sin(elapsed * 0.12) * 5;
      setD(build(elapsed * 1.1, wavelength));
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <svg className="hc-wave" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden="true">
      <path d={d} fill="none" stroke="var(--hc-accent)" strokeWidth="0.35" opacity="0.55" />
    </svg>
  );
};

export default Waveform;
