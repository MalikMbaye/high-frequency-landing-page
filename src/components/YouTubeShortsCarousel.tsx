import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import YouTubeFacade from "@/components/YouTubeFacade";


interface Props {
  videos: string[];
  title?: string;
  subtitle?: string;
  theme?: "light" | "dark";
  id?: string;
  layout?: "carousel" | "grid" | "row";
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
          {layout !== "grid" && (
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
            className={layout === "grid" ? "shorts-grid" : layout === "row" ? "shorts-row" : "ig-scroller shorts-scroller"}
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
        .shorts-row {
          display: flex;
          flex-wrap: nowrap;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding: 8px 0 16px;
          align-items: flex-start;
        }
        .shorts-row .shorts-video {
          flex: 0 0 calc((100% - 40px) / 3);
          max-width: calc((100% - 40px) / 3);
          scroll-snap-align: start;
        }
        .shorts-row::-webkit-scrollbar { height: 8px; }
        .shorts-row::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }
        @media (max-width: 900px) {
          .shorts-row { gap: 14px; }
          .shorts-row .shorts-video {
            flex: 0 0 calc((100% - 14px) / 2);
            max-width: calc((100% - 14px) / 2);
          }
        }
        .shorts-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          padding: 8px 0;
          align-items: flex-start;
        }
        .shorts-grid .shorts-video { flex: 0 0 calc((100% - 60px) / 4); max-width: calc((100% - 60px) / 4); }
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
          .shorts-row {
          display: flex;
          flex-wrap: nowrap;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding: 8px 0 16px;
          align-items: flex-start;
        }
        .shorts-row .shorts-video {
          flex: 0 0 calc((100% - 40px) / 3);
          max-width: calc((100% - 40px) / 3);
          scroll-snap-align: start;
        }
        .shorts-row::-webkit-scrollbar { height: 8px; }
        .shorts-row::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }
        @media (max-width: 900px) {
          .shorts-row { gap: 14px; }
          .shorts-row .shorts-video {
            flex: 0 0 calc((100% - 14px) / 2);
            max-width: calc((100% - 14px) / 2);
          }
        }
        .shorts-grid { gap: 14px; }
          .shorts-grid .shorts-video { flex: 0 0 calc((100% - 14px) / 2); max-width: calc((100% - 14px) / 2); }
        }
        @media (max-width: 520px) {
          .shorts-row {
          display: flex;
          flex-wrap: nowrap;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding: 8px 0 16px;
          align-items: flex-start;
        }
        .shorts-row .shorts-video {
          flex: 0 0 calc((100% - 40px) / 3);
          max-width: calc((100% - 40px) / 3);
          scroll-snap-align: start;
        }
        .shorts-row::-webkit-scrollbar { height: 8px; }
        .shorts-row::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }
        @media (max-width: 900px) {
          .shorts-row { gap: 14px; }
          .shorts-row .shorts-video {
            flex: 0 0 calc((100% - 14px) / 2);
            max-width: calc((100% - 14px) / 2);
          }
        }
        .shorts-grid {
            flex-wrap: nowrap;
            justify-content: flex-start;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            gap: 12px;
            padding-bottom: 12px;
          }
          .shorts-grid .shorts-video {
            flex: 0 0 calc((100% - 12px) / 2);
            max-width: calc((100% - 12px) / 2);
            scroll-snap-align: center;
          }
          .shorts-grid::-webkit-scrollbar { height: 6px; }
          .shorts-grid::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 3px; }
        }
        .ig-scroller::-webkit-scrollbar { height: 8px; }
        .ig-scroller::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }
      `}</style>
    </section>
  );
};

export default YouTubeShortsCarousel;
