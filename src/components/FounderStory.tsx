import img_4Gc3icy1 from "@/assets/genspark/4Gc3icy1.webp";
import img_bCInaQuM from "@/assets/genspark/bCInaQuM.webp";
import Expandable from "./Expandable";
const FounderStory = () => {
  return (
    <section className="section section-dark founder-story" data-theme="dark">
      <div className="neural-mesh"></div>
      <div className="hfh-container">
        <header className="founder-header">
          <h2 className="meet-j-headline">MEET <span className="hl-purple">J.</span></h2>
          <p className="founder-tagline">Built by a serial entrepreneur who chose his brain over everything.</p>
        </header>

        <div className="founder-block">
          <figure className="founder-figure">
            <img src={img_bCInaQuM} alt="J Johnson Jr. on stage presenting High Frequency Headphones" />
          </figure>
          <div className="founder-copy">
          <Expandable collapsedHeight={320}>
            <p>By 21, he was making six figures in tech, had helped generate over 60 million views for an AI food delivery company, and served as head of growth for a fitness app — all while building one of the largest organic audiences in the frequency and wellness space. 500,000+ followers. 100 million organic impressions. He was already at the forefront of social media when most founders were still writing business plans.</p>
            <p>He was also one of the fastest people in the country. His 100-meter time was 10.3 seconds, 0.8 seconds off Usain Bolt's world record. He ran a 4:25 in the 40-yard dash. He trained alongside Olympic gold medalists and world record holders. He could have gone pro.</p>
            <p>But when he pushed to the next level, his brain became the bottleneck. He'd dealt with ADHD his whole life, and at 17 he was prescribed Vyvanse. It worked for focus. But it stopped him from eating. If he couldn't eat, he couldn't train. If he couldn't train, he couldn't compete. The drug that was supposed to fix his brain was destroying his body.</p>
            <p className="founder-pull"><strong>So he made a decision that everyone around him thought was insane.</strong></p>
            <p>He walked away from the athletic career. He stopped taking Vyvanse. And he went looking for a real solution. Not a temporary fix. Not another pill. Something that would actually make his brain work the way it should.</p>
          </Expandable>
          </div>
        </div>

        <div className="founder-block reverse">
          <div className="founder-copy">
          <Expandable collapsedHeight={340}>
            <p>He tried everything. Meditation. Supplements. Biohacks. Nothing worked the way he needed it to. Then he found something that changed the trajectory of his entire life.</p>
            <p>Decades of government-funded neuroscience research had been studying how specific sound frequencies affect brain states. The findings, which had been classified and were later made public, proved that precise frequency patterns can shift brainwave states on command. Focus. Calm. Energy. Flow. All controllable through frequency.</p>
            <p>J's realization: if this research proves frequency can shift your state, and your state controls everything you do, then this is the answer for anyone whose brain is working against them.</p>
            <p>But the technology to deliver it properly didn't exist. Nobody had combined frequency science with hardware that could deliver it directly through the skull.</p>
            <p>J had the exact knowledge intersection to build it. Years of frequency research. Three years of failed hardware development on a light technology company that taught him firmware, manufacturing, and product engineering. A deep understanding of neuroscience and brainwave states. After doing R&D on the best ways to transfer frequency, he discovered frequency technology headphones.</p>
            <p className="founder-pull"><strong>He ordered prototypes that same day. Three months later, he was on stage in front of 4,000 people.</strong></p>
            <p>Today he's training for the 2028 LA Olympics in flag football and the 100 meter dash. His brain is on a different frequency now. Literally.</p>
          </Expandable>
          </div>
          <figure className="founder-figure">
            <img src={img_4Gc3icy1} alt="J Johnson Jr. wearing HFH headphones in training" />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default FounderStory;
