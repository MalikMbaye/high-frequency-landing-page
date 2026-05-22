import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  videos: string[];
  title?: string;
  subtitle?: string;
  theme?: "light" | "dark";
}

const getId = (url: string) => {
  const m = url.match(/shorts\/([A-Za-z0-9_-]+)/) || url.match(/v=([A-Za-z0-9_-]+)/);
  return m ? m[1] : "";
};

const YouTubeShortsCarousel = ({
  videos,
  title = "See It In Action",
  subtitle,
  theme = "light",
}: Props) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section
      className={`section ${theme === "dark" ? "section-dark" : "section-light"}`}
      data-theme={theme}
      style={{ paddingTop: 56, paddingBottom: 56 }}
    >
      <div className="hfh-container">
        {title && (
          <h2 className={`section-header ${theme === "dark" ? "light" : ""}`}>{title}</h2>
        )}
        {subtitle && (
          <p className={`section-sub ${theme === "dark" ? "light" : ""}`}>{subtitle}</p>
        )}

        <div style={{ position: "relative", marginTop: 24 }}>
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollBy(-1)}
            className="ig-arrow ig-arrow-left"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollBy(1)}
            className="ig-arrow ig-arrow-right"
          >
            <ArrowRight size={20} />
          </button>

          <div
            ref={scrollerRef}
            className="ig-scroller"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              padding: "8px 4px 24px",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {videos.map((url) => {
              const id = getId(url);
              return (
                <div
                  key={url}
                  style={{
                    flex: "0 0 auto",
                    scrollSnapAlign: "start",
                    width: "min(320px, 80vw)",
                    aspectRatio: "9 / 16",
                    background: "#000",
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "1px solid rgba(0,0,0,0.08)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                  }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`}
                    title={`YouTube Short ${id}`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ width: "100%", height: "100%", border: 0, display: "block" }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .ig-scroller::-webkit-scrollbar { height: 8px; }
        .ig-scroller::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }
      `}</style>
    </section>
  );
};

export default YouTubeShortsCarousel;
