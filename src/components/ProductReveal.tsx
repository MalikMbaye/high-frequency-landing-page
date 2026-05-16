import img_NpWJA0G8 from "@/assets/genspark/NpWJA0G8.jpg";
import img_dAKCEFQK from "@/assets/genspark/dAKCEFQK.png";
const ProductReveal = () => {
  return (
    <section className="section section-light product-reveal" id="product" data-theme="light">
      <div className="hfh-container">
        <h2 className="section-header">Frequency Science. In a Pair of Headphones.</h2>
        <p className="section-sub">High Frequency Highway. Bone conduction frequency headphones paired with a precision frequency app.</p>

        {/* Row 1: HARDWARE */}
        <div className="reveal-row">
          <div className="reveal-visual tier-2-visual">
            <div className="ambient-halo halo-soft"></div>
            <div className="ambient-ribbon ribbon-purple"></div>
            <img
              src={img_dAKCEFQK}
              alt="HFH bone conduction headphones with purple frequency ripples pulsing outward through a translucent skull silhouette"
              loading="lazy"
            />
          </div>
          <div className="reveal-copy">
            <span className="row-label">THE HARDWARE</span>
            <h3>Bone conduction transducers that pulse 100 times per second through your skull.</h3>
            <p>The transducers vibrate 100 times per second through your bones. Your brain doesn't just hear the frequency. It physically feels it. And it locks in. Instantly.</p>
            <p>Aerospace-grade titanium. Medical-grade silicone pads. 29 grams. Built like premium hardware, because it is premium hardware.</p>
          </div>
        </div>

        {/* Row 2: SOFTWARE */}
        <div className="reveal-row reverse">
          <div className="reveal-visual tier-2-visual">
            <div className="ambient-halo halo-soft"></div>
            <div className="ambient-ribbon ribbon-gold"></div>
            <img
              src={img_NpWJA0G8}
              alt="HFH precision frequency app on smartphone with floating UI fragments"
            />
            <span className="floating-pill pill-gold">FOCUS</span>
            <span className="floating-pill pill-purple">CALM</span>
          </div>
          <div className="reveal-copy">
            <span className="row-label">THE SOFTWARE</span>
            <h3>A precision frequency app with 100,000+ downloads.</h3>
            <p>Select your state. Focus. Calm. Energy. Flow. Sleep. The full Rife frequency library. The Gateway Process binaural patterns. AI-powered personalized meditation you can redirect in real time.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReveal;
