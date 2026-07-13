import { ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import { useBuyNow } from "@/hooks/useBuyNow";

const PriceReframe = () => {
  const { buyNow, isLoading } = useBuyNow();
  return (
    <section className="section section-light price-reframe" id="order" data-theme="light">
      <div className="hfh-container narrow">
        <h2 className="section-header">You're Already Spending More Than This on Things That Don't Work</h2>
        <p>Three dollars a day on coffee is over $1,000 a year. Prescription stimulants can run $200 a month or more. Annual Calm subscription. Energy drinks. Nootropic stacks. You're already spending hundreds, maybe thousands, on things that keep you dependent.</p>
        <p className="emphasis"><strong>This is one purchase that makes you less dependent. Every single day.</strong></p>
        <p>No subscription. No refills. No monthly dose increases. One device that delivers focus, calm, energy, flow, and sleep on demand, while simultaneously building your brain's ability to do it without help.</p>

        <div className="guarantee-row">
          <div className="guarantee-badge">
            <div className="seal">
              <ShieldCheck size={28} />
              <span>30-DAY</span>
              <strong>MONEY-BACK</strong>
              <span>GUARANTEE</span>
            </div>
            <p>If you don't feel the shift, send them back. Full refund. No questions. We've recorded over 300 reactions. We know what happens when you put these on.</p>
          </div>
          <div className="urgency-close">
            <p>Your brain isn't waiting for you to decide. It's getting rewired right now. Every scroll, every notification, every context-switch is training your brain to never focus again. The only question is whether you're going to control the direction.</p>
          </div>
        </div>

        <div className="final-cta-area" style={{ textAlign: "center" }}>
          <button type="button" onClick={() => buyNow()} disabled={isLoading} className="btn btn-purple btn-xl">
            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <>Reserve Your High Frequency Headphones <ArrowRight size={18} /></>}
          </button>
          <p className="sub-button">Start rebuilding your brain today. Ships worldwide.</p>
        </div>
      </div>
    </section>
  );
};

export default PriceReframe;
