import { ArrowRight, ShieldCheck } from "lucide-react";

const PriceReframe = () => {
  return (
    <section className="section section-light price-reframe" id="order" data-theme="light">
      <div className="hfh-container narrow">
        <div className="guarantee-row">
          <div className="guarantee-badge">
            <div className="seal">
              <ShieldCheck size={28} />
              <span>30-DAY</span>
              <strong>MONEY-BACK</strong>
              <span>GUARANTEE</span>
            </div>
            <p>If you don't feel the shift, send them back. Full refund. No questions.</p>
          </div>
          <div className="urgency-close">
            <p>Your brain isn't waiting for you to decide. Every scroll, every notification, every context-switch is training it to never focus again. The only question is whether you're going to control the direction.</p>
          </div>
        </div>

        <div className="final-cta-area" style={{ textAlign: "center" }}>
          <a href="#order" className="btn btn-purple btn-xl">
            Get Your High Frequency Highway Headphones <ArrowRight size={18} />
          </a>
          <p className="sub-button">Ships worldwide.</p>
        </div>
      </div>
    </section>
  );
};

export default PriceReframe;
