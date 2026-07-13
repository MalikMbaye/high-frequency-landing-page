import { Coffee, Pill, Smartphone } from "lucide-react";
import Expandable from "./Expandable";

const WrongTeardown = () => {
  return (
    <section className="section section-grey wrong-teardown" data-theme="light">
      <div className="hfh-container">
        <h2 className="section-header">Everything You're Using for Focus Is Making It Worse</h2>
        <div className="card-grid three-col">
          <article className="light-card">
            <div className="wrong-icon">
              <Coffee size={36} />
              <span className="strike-line"></span>
            </div>
            <span className="tag tag-wrong">WRONG</span>
            <h3 className="card-title">Coffee helps you focus. Right? <span className="hl-purple">Wrong.</span></h3>
            <Expandable collapsedHeight={80}>
              <p>Coffee borrows energy from your future self. Your brain is 73% water. You're dehydrating the one organ that runs your entire life. By 2 PM, you're crashing. So you get more. And you crash again. Every single day. That's a cycle, not a solution.</p>
            </Expandable>
          </article>
          <article className="light-card">
            <div className="wrong-icon">
              <Pill size={36} />
              <span className="strike-line"></span>
            </div>
            <span className="tag tag-wrong">WRONG</span>
            <h3 className="card-title">Prescription stimulants actually work though. Right? <span className="hl-purple">Wrong.</span></h3>
            <Expandable collapsedHeight={80}>
              <p>Prescription stimulants can borrow you a few hours of focus and charge you back with dependency, tolerance, and rough comedowns. Over time many people need more just to feel normal. That's a subscription, not a solution.</p>
            </Expandable>
          </article>
          <article className="light-card">
            <div className="wrong-icon">
              <Smartphone size={36} />
              <span className="strike-line"></span>
            </div>
            <span className="tag tag-wrong">WRONG</span>
            <h3 className="card-title">Meditation apps. Calm. Headspace. Those are science-backed. Right? <span className="hl-purple">Wrong.</span></h3>
            <Expandable collapsedHeight={80}>
              <p>Go look at what they're actually doing. Beach sounds. Bird noises. Fireplace audio. There is almost zero real frequency science in any of those apps. They don't even know about the research that proves this works.</p>
            </Expandable>
          </article>
        </div>
        <p className="transition-line">So what actually works? What if there was something that didn't just give you focus temporarily, but actually rebuilt your brain's ability to focus on its own? And what if decades of neuroscience research already proved it?</p>
      </div>
    </section>
  );
};

export default WrongTeardown;
