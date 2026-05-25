import { ArrowRight } from "lucide-react";
import img_cmPVNmax from "@/assets/genspark/cmPVNmax.webp";

const Generator = () => {
  return (
    <section className="section section-dark the-generator" data-theme="dark">
      <div className="hfh-container">
        <header className="ts-header">
          <span className="row-label gold">THE GENERATOR</span>
          <h2 className="section-header light">Generate Any Frequency. On Demand.</h2>
          <p className="section-sub light">An infinite frequency engine in your pocket. Dial in the exact Hz your brain needs and feel it through your skull within seconds.</p>
        </header>

        <div className="reveal-row">
          <div className="reveal-visual tier-2-visual">
            <div className="ambient-halo halo-soft"></div>
            <div className="ambient-ribbon ribbon-purple"></div>
            <img
              src={img_cmPVNmax}
              alt="The Generator app interface on a phone showing 7.83 Hz frequency dial with waveform and presets"
              loading="lazy"
            />
            <span className="floating-pill pill-purple">7.83 Hz</span>
            <span className="floating-pill pill-gold">40 Hz</span>
          </div>
          <div className="reveal-copy light">
            <h3>The full Rife library. The Gateway Process patterns. Anything you can imagine.</h3>
            <p>Type the frequency. Select the protocol. The generator delivers it through frequency technology in real time. Layer multiple frequencies. Save your own stacks. Build a personal library that adapts to whatever your brain needs that day.</p>
            <p>This is what frequency apps wish they were. No beach sounds. No bird noises. Just precision, science, and a brain that listens.</p>
            <a href="#order" className="btn btn-gold">
              Open the Generator <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Generator;
