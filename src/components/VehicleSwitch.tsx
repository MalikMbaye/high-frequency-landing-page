import { ArrowRight, Check, Coffee, Droplet, FlaskConical, Headphones, Pill, Smartphone } from "lucide-react";

const VehicleSwitch = () => {
  return (
    <section className="section section-light vehicle-switch" data-theme="light">
      <div className="hfh-container">
        <h2 className="section-header">What You're Spending Now vs. What You Could Be Using</h2>
        <p className="section-sub">You're already spending money trying to manage your brain. The question is whether what you're using is making you stronger or more dependent.</p>

        <div className="ledger">
          <div className="ledger-row competitor">
            <div className="prod-icon"><Coffee size={26} /></div>
            <div className="prod-info">
              <h5>Coffee / Caffeine</h5>
              <span className="cost-strike">$1,095/year</span>
            </div>
            <p className="prod-drawback">Dehydrates a brain that's 73% water. Crashes by 2 PM. Makes you MORE reliant every single morning.</p>
          </div>
          <div className="ledger-row competitor">
            <div className="prod-icon"><Pill size={26} /></div>
            <div className="prod-info">
              <h5>Prescription Stimulants</h5>
              <span className="cost-strike">$2,400+/year</span>
            </div>
            <p className="prod-drawback">Prescription stimulants can carry side effects, dependency, and withdrawal — a monthly cost that doesn't build anything long-term.</p>
          </div>
          <div className="ledger-row competitor">
            <div className="prod-icon"><Smartphone size={26} /></div>
            <div className="prod-info">
              <h5>Calm / Headspace</h5>
              <span className="cost-strike">$70/year</span>
            </div>
            <p className="prod-drawback">Beach sounds and bird noises labeled as meditation. Almost zero real frequency science. No hardware. No vibration.</p>
          </div>
          <div className="ledger-row competitor">
            <div className="prod-icon"><FlaskConical size={26} /></div>
            <div className="prod-info">
              <h5>Nootropic Stacks</h5>
              <span className="cost-strike">$2,400+/year</span>
            </div>
            <p className="prod-drawback">Expensive supplement combinations that don't build anything long-term.</p>
          </div>
          <div className="ledger-row competitor">
            <div className="prod-icon"><Droplet size={26} /></div>
            <div className="prod-info">
              <h5>Energy Drinks</h5>
              <span className="cost-strike">$1,460+/year</span>
            </div>
            <p className="prod-drawback">Crash cycle. Chemical dependency. Zero long-term benefit.</p>
          </div>
          <div className="ledger-row hfh-row">
            <div className="prod-icon hfh-icon"><Headphones size={26} /></div>
            <div className="prod-info">
              <h5>High Frequency Headphones</h5>
              <span className="cost-good">One Purchase <Check size={16} /></span>
            </div>
            <p className="prod-drawback">No subscription. No jitters. No crash. Focus, calm, flow, or sleep on demand. Designed to help your brain get better at finding these states on its own.</p>
          </div>
        </div>

        <p className="summary-line">One device. One purchase. Replaces all five.</p>
        <div style={{ textAlign: "center" }}>
          <a href="#order" className="btn btn-purple btn-lg">
            Make the Switch <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default VehicleSwitch;
