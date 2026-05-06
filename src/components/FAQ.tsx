import { useState } from "react";
import { Brain, ChevronDown, FlaskConical, Globe, Headphones, Music, Shield, Timer } from "lucide-react";

type Item = {
  Icon: typeof Brain;
  q: string;
  a: string;
};

const items: Item[] = [
  {
    Icon: Headphones,
    q: "How is this different from binaural beats on YouTube or Spotify?",
    a: "Two things. First, you don't know the exact frequency you're getting on those platforms. There's no quality control, no precision. Second, those are audio-only. Our headphones use bone conduction transducers that vibrate 100 times per second. Your brain doesn't just hear the frequency through your ears. It physically feels it through your skull. That's why the shift is instant and that's why every reaction video looks the same.",
  },
  {
    Icon: FlaskConical,
    q: "Is this actually backed by science?",
    a: "The US government spent decades researching frequency's effect on brain states. The findings, now publicly available, proved that specific frequencies shift brainwave states on command. We've also conducted EEG testing with NYU students that showed increased brainwave coherence while using the technology. This is neuroscience delivered through hardware.",
  },
  {
    Icon: Music,
    q: "Can I use these as regular headphones too?",
    a: "Yes. Full Bluetooth connectivity. Music, podcasts, phone calls. They work as your everyday headphones with frequency technology built in. You also get noise-isolation earplugs for full frequency immersion.",
  },
  {
    Icon: Brain,
    q: "What does \"the more you use it, the less you need it\" actually mean?",
    a: "Every session builds neuroplasticity. Your brain forms stronger neural pathways for focus, calm, and flow. Over time, your brain gets better at entering those states on its own, without the device. Adderall and coffee create dependency. This builds independence.",
  },
  {
    Icon: Timer,
    q: "How fast does it work?",
    a: "The first time you put them on, you'll feel the shift in under 60 seconds. We've recorded over 300 first-time reactions on camera. The eyes widen. The spine straightens. Everyone says the same thing.",
  },
  {
    Icon: Globe,
    q: "Do you ship internationally?",
    a: "We've shipped to over 25 countries. Yes, we ship worldwide.",
  },
  {
    Icon: Shield,
    q: "What if it doesn't work for me?",
    a: "30-day money-back guarantee. Full refund. No questions. We've done this demo hundreds of times, in person, on camera, at events, with celebrities, with regular people. The reaction is the same every time.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section section-light faq-section" data-theme="light">
      <div className="hfh-container narrow">
        <h2 className="section-header">Questions.</h2>
        <div className="faq-list">
          {items.map((item, i) => {
            const open = openIndex === i;
            return (
              <details
                key={item.q}
                className="faq-item"
                open={open}
                onToggle={(e) => {
                  const el = e.currentTarget;
                  if (el.open) setOpenIndex(i);
                  else if (openIndex === i) setOpenIndex(null);
                }}
              >
                <summary className="faq-summary">
                  <span className="faq-icon-box"><item.Icon size={16} /></span>
                  <span className="faq-q">{item.q}</span>
                  <span className="faq-chev"><ChevronDown size={18} /></span>
                </summary>
                <div className="faq-a">{item.a}</div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
