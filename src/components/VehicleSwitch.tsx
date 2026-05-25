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
              <h5>Adderall / Vyvanse</h5>
              <span className="cost-strike">$2,400+/year</span>
            </div>
            <p className="prod-drawback">Rents focus and charges with side effects, dependency, and withdrawal. Makes you MORE reliant every month.</p>
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
            <p className="prod-drawback">Expensive supplement combinations that still don't rebuild your brain. Zero neuroplasticity building.</p>
          </div>
          <div className="ledger-row competitor">
            <div className="prod-icon"><Droplet size={26} /></div>
            <div className="prod-info">
              <h5>Energy Drinks</h5>
              <span className="cost-strike">$1,460+/year</span>
            </div>
            <p className="prod-drawback">Your heart detects them as poison. Crash cycle. Chemical dependency. Zero cognitive benefit.</p>
          </div>
          <div className="ledger-row hfh-row">
            <div className="prod-icon hfh-icon"><Headphones size={26} /></div>
            <div className="prod-info">
              <h5>High Frequency Headphones</h5>
              <span className="cost-good">One Purchase <Check size={16} /></span>
            </div>
            <p className="prod-drawback">No subscription. No side effects. No crash. No dependency. Focus, calm, flow, or sleep on demand. Builds neuroplasticity with every session.</p>
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
