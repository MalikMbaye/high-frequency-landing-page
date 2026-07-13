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
              <h4>Frequency Through Bone</h4>
              <p>Bone-conduction transducers deliver a gentle vibration through the temporal bone at a precise frequency, 100 times per second.</p>
            </div>
          </div>
          <div className="how-callout how-callout-2">
            <span className="callout-num">2</span>
            <div>
              <h4>Sound You Feel, Not Just Hear</h4>
              <p>The vibration travels through the skull so you experience the frequency physically, not only through your eardrums.</p>
            </div>
          </div>
          <div className="how-callout how-callout-3">
            <span className="callout-num">3</span>
            <div>
              <h4>A Shift You Can Feel</h4>
              <p>Most people feel a shift in under 60 seconds. Focus. Calm. Flow. Energy. On demand.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
