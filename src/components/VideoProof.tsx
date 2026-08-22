import { ArrowRight, Loader2 } from "lucide-react";
import { useBuyNow } from "@/hooks/useBuyNow";
import YouTubeFacade from "@/components/YouTubeFacade";

const VideoProof = () => {
  const { buyNow, isLoading } = useBuyNow();
  return (
    <section className="section section-light video-proof" data-theme="light">
      <div className="hfh-container narrow">
        <h2 className="section-header">Watch What People Feel in 60 Seconds.</h2>
        <div
          style={{
            margin: "0 auto 20px",
            maxWidth: 540,
            borderRadius: 12,
            overflow: "hidden",
            border: "1.5px solid var(--hfh-gold)",
            background: "var(--hfh-navy-deep)",
          }}
        >
          <YouTubeFacade
            videoId="CXjLAr6SPmE"
            title="First reaction to High Frequency Headphones"
            aspectRatio="9 / 16"
            priority
          />
        </div>

        <p className="video-caption">
          Real footage from an informal pilot session. No edits. No filters.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="button" onClick={() => buyNow()} disabled={isLoading} className="btn btn-purple btn-lg">
            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <>Get Your Headphones <ArrowRight size={18} /></>}
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoProof;
