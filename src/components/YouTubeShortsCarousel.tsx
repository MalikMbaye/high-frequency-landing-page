import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import YouTubeFacade from "@/components/YouTubeFacade";


interface Props {
  videos: string[];
  title?: string;
  subtitle?: string;
  theme?: "light" | "dark";
  id?: string;
  layout?: "carousel" | "grid";
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
  id,
  layout = "carousel",
}: Props) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section
      id={id}
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

        <div className="shorts-wrap">
          {layout === "carousel" && (
            <>
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
            </>
          )}

          <div
            ref={scrollerRef}
            className={layout === "grid" ? "shorts-grid" : "ig-scroller shorts-scroller"}
          >
            {videos.map((url, i) => {
              const vid = getId(url);
              return (
                <div
                  key={url}
                  className="shorts-video"
                >
                  <YouTubeFacade
                    videoId={vid}
                    title={`High Frequency Headphones reaction video ${i + 1}`}
                    aspectRatio="9 / 16"
                  />
                </div>
              );
            })}

          </div>
        </div>
      </div>

      <style>{`
        .shorts-wrap { position: relative; margin-top: 24px; }
        .shorts-scroller {
          display: flex;
          justify-content: center;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 8px 4px 24px;
          -webkit-overflow-scrolling: touch;
        }
        .shorts-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px;
          padding: 8px 0;
          align-items: start;
        }
        .shorts-video {
          min-width: 0;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid hsl(var(--border));
          box-shadow: var(--hfh-shadow-dark);
        }
        .shorts-scroller .shorts-video {
          flex: 0 0 auto;
          scroll-snap-align: start;
          width: min(320px, 80vw);
        }
        @media (max-width: 900px) {
          .shorts-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
        }
        @media (max-width: 520px) {
          .shorts-grid { grid-template-columns: 1fr; gap: 18px; }
        }
        .ig-scroller::-webkit-scrollbar { height: 8px; }
        .ig-scroller::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }
      `}</style>
    </section>
  );
};

export default YouTubeShortsCarousel;
