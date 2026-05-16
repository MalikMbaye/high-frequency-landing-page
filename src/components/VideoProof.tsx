import { ArrowRight } from "lucide-react";

const VideoProof = () => {
  return (
    <section className="section section-light video-proof" data-theme="light">
      <div className="hfh-container narrow">
        <h2 className="section-header">Real EEG. NYU. No Edits.</h2>
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
          <video
            src="/videos/brain-test.mp4"
            controls
            playsInline
            preload="metadata"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <p className="video-caption">
          Real EEG footage. No edits. No filters. Recorded with NYU students.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <a href="#order" className="btn btn-purple btn-lg">
            Get Your Headphones <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoProof;
