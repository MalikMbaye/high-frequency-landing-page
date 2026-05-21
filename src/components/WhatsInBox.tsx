import { BookOpen, Headphones, LayoutGrid, Plug, VolumeX } from "lucide-react";

const items = [
  { id: "headphones", Icon: Headphones, title: <>High Frequency Headphones<sup>™</sup></> },
  { id: "earplugs", Icon: VolumeX, title: "Noise Isolation Earplugs" },
  { id: "cable", Icon: Plug, title: "Magnetic Charger" },
  { id: "guide", Icon: BookOpen, title: "Quick Start Guide" },
  { id: "app", Icon: LayoutGrid, title: "HFH Frequency App" },
];

const WhatsInBox = () => {
  return (
    <section className="section whats-in-box-section" data-theme="light">
      <div className="hfh-container">
        <header className="wib-header">
          <h2 className="wib-headline">What's in the Box</h2>
          <p className="wib-sub">Everything you need to start rebuilding your brain. Nothing you don't.</p>
        </header>
        <div className="wib-grid">
          {items.map(({ id, Icon, title }) => (
            <div className="wib-item" key={id}>
              <div className="wib-icon"><Icon /></div>
              <p className="wib-title">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatsInBox;
