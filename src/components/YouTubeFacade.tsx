import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

interface Props {
  videoId: string;
  title: string;
  /** Aspect ratio of the frame, e.g. "9 / 16" for Shorts */
  aspectRatio?: string;
  className?: string;
  /** Eager-load the iframe (use for the first visible video only) */
  priority?: boolean;
  /**
   * Use the lightweight thumbnail facade instead of the real iframe.
   * Disabled by default on the main landing page so YouTube embeds are
   * immediately visible and clickable.
   */
  facade?: boolean;
}

/**
 * YouTube embed. By default it renders the real iframe immediately so users
 * see the actual YouTube player. Pass `facade` to fall back to the
 * thumbnail + play-button placeholder for off-screen carousel items.
 */
const YouTubeFacade = ({
  videoId,
  title,
  aspectRatio = "9 / 16",
  className,
  priority = false,
  facade = false,
}: Props) => {
  const [active, setActive] = useState(!facade);
  const [inView, setInView] = useState(!facade || priority);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!facade) return;
    const el = wrapperRef.current;
    if (!el) return;

    // Lazy-load the facade iframe only when the carousel item is near
    // the viewport; keeps initial page weight low.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "200px", threshold: 0.1 }
    );
    io.observe(el);

    return () => io.disconnect();
  }, [facade]);

  const showPlayer = active || inView;

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio,
        background: "#000",
        overflow: "hidden",
      }}
    >
      {showPlayer ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&autoplay=${facade && active ? 1 : 0}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading={priority ? "eager" : "lazy"}
          style={{ width: "100%", height: "100%", border: 0, display: "block" }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Play video: ${title}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            padding: 0,
            border: 0,
            cursor: "pointer",
            background: "#000",
          }}
        >
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt={title}
            width={480}
            height={360}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              background:
                "radial-gradient(circle at center, rgba(0,0,0,0.15), rgba(0,0,0,0.45))",
            }}
          >
            <span
              style={{
                display: "grid",
                placeItems: "center",
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.92)",
                boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
              }}
            >
              <Play size={28} style={{ marginLeft: 3 }} fill="#111" color="#111" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
};

export default YouTubeFacade;
