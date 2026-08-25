import { Suspense, useEffect, useRef, useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Approx height reserved before mount, to avoid layout shift */
  minHeight?: number | string;
  /** Pixels before entering viewport to start mounting */
  rootMargin?: string;
}

/**
 * Mounts its children only when the placeholder nears the viewport.
 * Each instance has its own Suspense boundary so a chunk loading below
 * does not collapse already-rendered sections above.
 */
const LazySection = ({ children, minHeight = 400, rootMargin }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    // Desktop has bandwidth to spare: start mounting far earlier so images
    // are decoded well before the section scrolls into view.
    const isDesktop =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 768px)").matches;
    const margin = rootMargin ?? (isDesktop ? "2500px 0px" : "1200px 0px");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: margin }
    );
    io.observe(el);

    // Safety net: once the page is idle, mount everything so nothing is
    // ever caught half-loaded during a fast scroll.
    const idleMount = window.setTimeout(() => setVisible(true), isDesktop ? 2000 : 5000);

    return () => {
      io.disconnect();
      window.clearTimeout(idleMount);
    };
  }, [visible, rootMargin]);


  return (
    <div ref={ref} style={!visible ? { minHeight } : undefined}>
      {visible ? (
        <Suspense fallback={<div style={{ minHeight }} />}>{children}</Suspense>
      ) : null}
    </div>
  );
};

export default LazySection;
