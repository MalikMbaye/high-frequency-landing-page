import { ArrowRight, Brain, Landmark, TrendingUp, Loader2 } from "lucide-react";
import img_8LB4jvGU from "@/assets/genspark/8LB4jvGU.webp";
import img_Rp0TCgqL from "@/assets/genspark/Rp0TCgqL.webp";
import img_SmtUY9Nr from "@/assets/genspark/SmtUY9Nr.webp";
import img_xSGiWWRx from "@/assets/genspark/xSGiWWRx.webp";
import Expandable from "./Expandable";
import { useBuyNow } from "@/hooks/useBuyNow";

const BeforeAfterScience = () => {
  const { buyNow, isLoading } = useBuyNow();
  return (
    <section className="section section-dark before-after-science" id="science" data-theme="dark">
      <div className="hfh-container">
        <h2 className="section-header light">What We Saw in an Informal EEG Pilot.</h2>
        <p className="section-sub light">A small group of volunteers. A MUSE headset. Here's what showed up on the readout.</p>

        <div className="ba-visual">
          <img src={img_xSGiWWRx} alt="Before and after brainwave visualization showing chaotic waves becoming more organized" />
        </div>

        <p className="big-stat-line">Most participants reported feeling a clear state shift within the first minute.</p>

        <div className="science-bridge">
          <h3 className="sub-section-header">Inspired by Decades of Frequency Research.</h3>
          <p className="section-sub light">Not a clinical study. Just the body of work that shaped HFH.</p>
        </div>

        <div className="research-grid">
          <article className="research-card">
            <div className="research-chart">
              <img src={img_SmtUY9Nr} alt="EEG power spectrum snapshot from an informal pilot session" />
            </div>
            <div className="research-copy">
              <span className="research-tag">INFORMAL PILOT — EEG SNAPSHOT</span>
              <h4>A More Organized Readout</h4>
              <p>In this informal pilot recording, brainwave activity looked noisy before the session and appeared more organized after 60 seconds of frequency delivery. Small sample, not a clinical study — just what we saw on the readout.</p>
            </div>
          </article>

          <article className="research-card reverse">
            <div className="research-chart">
              <img src={img_8LB4jvGU} alt="Scatter plot of before and after EEG epochs from an informal pilot session" />
            </div>
            <div className="research-copy">
              <span className="research-tag">INFORMAL PILOT — SCATTER PLOT</span>
              <h4>A Visible Shift on the Readout</h4>
              <p>In this small pilot, the BEFORE and AFTER EEG epochs looked distinct on a scatter plot. It's a snapshot from one informal session — not a peer-reviewed study — but users consistently report the same subjective shift the readout suggests.</p>
            </div>
          </article>

          <article className="research-card">
            <div className="research-chart">
              <img src={img_Rp0TCgqL} alt="Bar chart illustrating HFH app user retention past 30 minutes vs the industry average" />
            </div>
            <div className="research-copy">
              <span className="research-tag">USER RETENTION</span>
              <h4>81% Stay Past 30 Minutes.</h4>
              <p>Over 100,000 people have downloaded the HFH app. 81% keep using it past 30 minutes — in a category where 30-day retention typically sits under 10%. That's an engagement stat, not a brain measurement, but it tells us people keep coming back.</p>
            </div>
          </article>
        </div>

        <div className="science-pillars">
          <div className="pillar">
            <div className="sci-icon"><Landmark size={22} /></div>
            <h5>Government-Funded Frequency Research</h5>
            <Expandable collapsedHeight={100}>
              <p>Starting in the 1980s, the US government funded research into how sound frequencies affect brain states, later declassified as the Gateway Process. HFH is inspired by that body of research — not a clinical replication of it.</p>
            </Expandable>
          </div>
          <div className="pillar">
            <div className="sci-icon"><Brain size={22} /></div>
            <h5>Informal EEG Pilot</h5>
            <Expandable collapsedHeight={100}>
              <p>In an informal pilot session, EEG recordings showed more organized brainwave patterns during use. Small sample, no clinical claims — just an early signal that matched what users described feeling.</p>
            </Expandable>
          </div>
          <div className="pillar">
            <div className="sci-icon"><TrendingUp size={22} /></div>
            <h5>81% App Retention Rate</h5>
            <Expandable collapsedHeight={80}>
              <p>Over 100,000 people have downloaded the HFH app. 81% of them kept using it past 30 minutes. In a category where the average app retention rate at 30 days is under 10%, that number tells us people keep coming back.</p>
            </Expandable>
          </div>
        </div>

        <p className="pull-stat">Real people. Real sessions. Honest data.</p>
        <div style={{ textAlign: "center" }}>
          <button type="button" onClick={() => buyNow()} disabled={isLoading} className="btn btn-gold btn-lg">
            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <>Get Your Headphones <ArrowRight size={18} /></>}
          </button>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterScience;
