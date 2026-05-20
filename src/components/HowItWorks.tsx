const HowItWorks = () => {
  return (
    <section className="section section-dark how-bg" data-theme="dark">
      <div className="how-bg-image" aria-hidden="true"></div>
      <div className="how-bg-overlay" aria-hidden="true"></div>
      <div className="hfh-container">
        <h2 className="section-header light">How It Works.</h2>
        <p className="section-sub light">Three things happen the moment you put them on.</p>
        <div className="how-overlay">
          <div className="how-callout how-callout-1">
            <span className="callout-num">1</span>
            <div>
              <h4>Direct Frequency Transmission</h4>
              <p>The transducer pulses 100 times per second through your temporal bone.</p>
            </div>
          </div>
          <div className="how-callout how-callout-2">
            <span className="callout-num">2</span>
            <div>
              <h4>Instant Brain Stimulation</h4>
              <p>Your brain recognizes frequency even more than music and human language. The transducers connect directly with the cochlea, bypassing the eardrums.</p>
            </div>
          </div>
          <div className="how-callout how-callout-3">
            <span className="callout-num">3</span>
            <div>
              <h4>Immediate Cognitive Boost</h4>
              <p>State shifts in under 60 seconds. Focus. Calm. Flow. Energy. On demand.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
