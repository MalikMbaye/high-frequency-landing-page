import { useEffect, useRef, useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Approx height reserved before mount, to avoid layout shift */
  minHeight?: number | string;
  /** Pixels before entering viewport to start mounting */
  rootMargin?: string;
}

/**
 * Mounts its children only when the placeholder nears the viewport.
 * Used to defer below-the-fold sections so the top of the page paints fast.
 */
const LazySection = ({ children, minHeight = 400, rootMargin = "600px 0px" }: Props) => {
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
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} style={!visible ? { minHeight } : undefined}>
      {visible ? children : null}
    </div>
  );
};

export default LazySection;
