import { useRef, useState } from "react";
import { ArrowRight, Brain, Focus, Sparkles, Waves, Volume2, VolumeX, Loader2 } from "lucide-react";
import { useBuyNow } from "@/hooks/useBuyNow";
import videoAsset from "@/assets/hemisphere-sync.mp4.asset.json";
import brainSync from "@/assets/hemisphere/brain-sync.jpg";
import waveMerge from "@/assets/hemisphere/wave-merge.jpg";
import headphones from "@/assets/genspark/G1vHJv9R.webp";
import "./hemisphere-sync.css";

const benefits = [
  { icon: Focus, label: "Sharper Focus", line: "Both halves on one rhythm. You lock in and stay there." },
  { icon: Waves, label: "Calmer Mood", line: "The mental noise drops. You settle without trying." },
  { icon: Brain, label: "Faster Learning", line: "A synced brain wires new skills quicker." },
  { icon: Sparkles, label: "Zero Fog", line: "The haze lifts. Thinking feels clean." },
];

const HemisphereSync = () => {
  const { buyNow, isLoading } = useBuyNow();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) void v.play();
  };

  return (
    <section className="hs-section" id="hemisphere-sync" data-theme="dark">
      <div className="hs-glow hs-glow-1" aria-hidden="true" />
      <div className="hs-glow hs-glow-2" aria-hidden="true" />
      <div className="hs-glow hs-glow-3" aria-hidden="true" />

      <div className="hs-inner">
        <div className="hs-spine" aria-hidden="true" />

        {/* Block 1 — Hero */}
        <div className="hs-block">
          <span className="hs-dot" aria-hidden="true" />
          <div className="hs-hero">
            <div className="hs-hero-copy">
              <span className="hs-eyebrow">THE SCIENCE THAT PROVES IT WORKS</span>
              <h2 className="hs-h2">The Best Way to Feel Binaural Beats Actually Work</h2>
              <p className="hs-sub">
                When both halves of your brain lock to one rhythm, focus and calm switch on in under a minute.
                Stream binaural beats through earbuds and you feel nothing. Feel them through bone, and you know
                the second it's working.
              </p>

              <a href="#hs-proof" className="btn btn-purple hs-cta">
                See the Proof <ArrowRight size={18} />
              </a>
            </div>
            <figure className="hs-figure hs-figure-brain">
              <img src={brainSync} alt="Profile of a brain with a single frequency wave running through both hemispheres" width={1024} height={1024} loading="lazy" />
            </figure>
          </div>
        </div>

        {/* Block 2 — Watch it work */}
        <div className="hs-block" id="hs-proof">
          <span className="hs-dot" aria-hidden="true" />
          <h3 className="hs-h3">The Proof Is Simple: You Feel the Shift in Seconds</h3>
          <p className="hs-body">
            Send one tone to each ear and your brain builds a third that pulls both hemispheres into sync.
            That sync is measurable. It's the proof the technology is doing its job. Cheap earbuds only play
            the beats. These headphones drive them through frequency technology at 100 vibrations a second,
            so you feel the shift in seconds, not twenty minutes.
          </p>

          <div className="hs-video-wrap">
            <video
              ref={videoRef}
              className="hs-video"
              src={videoAsset.url}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <button type="button" className="hs-sound" onClick={toggleSound} aria-label={muted ? "Unmute video" : "Mute video"}>
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{muted ? "Tap for sound" : "Sound on"}</span>
            </button>
          </div>

          <figure className="hs-figure hs-figure-wave">
            <img src={waveMerge} alt="Two waves at different frequencies merging into one synced wave" width={1280} height={720} loading="lazy" />
          </figure>
        </div>

        {/* Block 3 — Benefits */}
        <div className="hs-block">
          <span className="hs-dot" aria-hidden="true" />
          <h3 className="hs-h3">A Synced Brain Changes Four Things, Fast</h3>
          <ul className="hs-benefits">
            {benefits.map(({ icon: Icon, label, line }) => (
              <li key={label}>
                <Icon size={20} aria-hidden="true" />
                <strong>{label}</strong>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Block 4 — Close */}
        <div className="hs-block hs-close">
          <span className="hs-dot" aria-hidden="true" />
          <figure className="hs-figure hs-figure-product">
            <img src={headphones} alt="High Frequency Headphones floating on a dark background" loading="lazy" />
          </figure>
          <h3 className="hs-h2 hs-h2-close">Two ears. Three frequencies. One synced brain.</h3>
          <p className="hs-sub">Put them on. Pick your state. Feel the proof in 60 seconds.</p>
          <button type="button" className="btn btn-purple hs-cta" onClick={() => buyNow()} disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <>Get Your Headphones <ArrowRight size={18} /></>}
          </button>
          <p className="hs-muted">Ships worldwide · 30-day money-back guarantee</p>
        </div>
      </div>
    </section>
  );
};

export default HemisphereSync;
