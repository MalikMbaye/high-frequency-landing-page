import { ArrowRight, Brain, Landmark, TrendingUp } from "lucide-react";

const BeforeAfterScience = () => {
  return (
    <section className="section section-dark before-after-science" id="science" data-theme="dark">
      <div className="hfh-container">
        <h2 className="section-header light">Your Brain Before. Your Brain After.</h2>
        <p className="section-sub light">Validated by EEG testing with NYU students. The data tells the story.</p>

        <div className="ba-visual">
          <img src="https://www.genspark.ai/api/files/s/xSGiWWRx" alt="Before and after brain state visualization showing chaotic red waves transforming to coherent purple waves" />
        </div>

        <p className="big-stat-line">81% of users stay locked in past 30 minutes. Industry average is under 10%.</p>

        <div className="science-bridge">
          <h3 className="sub-section-header">Decades of Research. One Device That Delivers It.</h3>
          <p className="section-sub light">This technology is built on neuroscience, not marketing.</p>
        </div>

        <div className="research-grid">
          <article className="research-card">
            <div className="research-chart">
              <img src="https://www.genspark.ai/api/files/s/SmtUY9Nr" alt="EEG power spectrum chart showing chaotic before signal and coherent after signal" />
            </div>
            <div className="research-copy">
              <span className="research-tag">EEG POWER SPECTRUM</span>
              <h4>Chaos Becomes Coherence</h4>
              <p>Before HFH, brainwave activity is noisy and fragmented across frequency bands. After 60 seconds of bone conduction frequency delivery, the signal organizes into clean, coherent peaks at the alpha and beta bands. Your brain stops zigzagging and starts running in a straight line.</p>
            </div>
          </article>

          <article className="research-card reverse">
            <div className="research-chart">
              <img src="https://www.genspark.ai/api/files/s/8LB4jvGU" alt="Cluster analysis scatter plot showing clear separation between before and after brain states" />
            </div>
            <div className="research-copy">
              <span className="research-tag">RECORDED BY NYU STUDENTS</span>
              <h4>A Measurable State Shift</h4>
              <p>When NYU researchers ran principal component analysis on the EEG epochs, the BEFORE and AFTER states formed two distinct, separated clusters. One was scattered, the other wasn't. This isn't placebo. It isn't subjective. It's a measurable, reproducible neurological event captured on MUSE.</p>
            </div>
          </article>

          <article className="research-card">
            <div className="research-chart">
              <img src="https://www.genspark.ai/api/files/s/Rp0TCgqL" alt="Bar chart showing 81 percent brainwave coherence after HFH versus 35 percent before" />
            </div>
            <div className="research-copy">
              <span className="research-tag">COHERENCE INDEX</span>
              <h4>81% Coherence. 30+ Minutes.</h4>
              <p>Over 100,000 people have downloaded the HFH app. 81% of them stay locked in past 30 minutes. In an industry where the average meditation app retention rate at 30 days is under 10%, that number tells you everything about whether this works.</p>
            </div>
          </article>
        </div>

        <div className="science-pillars">
          <div className="pillar">
            <div className="sci-icon"><Landmark size={22} /></div>
            <h5>Government-Funded Frequency Research</h5>
            <p>Starting in the 1980s, the US government funded extensive research into how sound frequencies affect brain states. The resulting program, known as the Gateway Process, was classified for decades before being released to the public. The findings proved that specific binaural beats and frequency patterns can shift brainwave states on command.</p>
          </div>
          <div className="pillar">
            <div className="sci-icon"><Brain size={22} /></div>
            <h5>EEG Validation (NYU Student Testing)</h5>
            <p>EEG testing conducted with NYU students showed that the technology keeps the brain in coherent brainwave states for longer periods. Jay's analogy: would you rather run in a straight line or a zigzag? A coherent brainwave state lets your brain compute faster and process faster.</p>
          </div>
          <div className="pillar">
            <div className="sci-icon"><TrendingUp size={22} /></div>
            <h5>81% App Retention Rate</h5>
            <p>Over 100,000 people have downloaded the HFH app. 81% of them kept using it. In an industry where the average app retention rate at 30 days is under 10%, that number tells you everything about whether this works.</p>
          </div>
        </div>

        <p className="pull-stat">The brain runs in a straight line, not a zigzag.</p>
        <div style={{ textAlign: "center" }}>
          <a href="#order" className="btn btn-gold btn-lg">
            Get Your Headphones <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterScience;
