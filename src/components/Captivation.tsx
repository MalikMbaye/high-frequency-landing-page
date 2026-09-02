type Card = {
  initials: string;
  name: string;
  handle: string;
  cat: string;
  followers: string;
  desc: string;
};

const cards: Card[] = [
  { initials: "01", name: "Athletes", handle: "Pre-game & recovery", cat: "Performance", followers: "60s", desc: "Lock in before competition, then drop into recovery after." },
  { initials: "02", name: "Founders", handle: "Deep work blocks", cat: "Focus", followers: "4hr", desc: "Four hours of uninterrupted focus without another coffee." },
  { initials: "03", name: "Artists", handle: "Creative flow", cat: "Creativity", followers: "Flow", desc: "Get into the state where ideas arrive faster than you can write." },
  { initials: "04", name: "Producers", handle: "Studio sessions", cat: "Culture", followers: "All-day", desc: "Stay sharp through long sessions without the crash." },
  { initials: "05", name: "Executives", handle: "High-stakes days", cat: "Clarity", followers: "Calm", desc: "Reset between meetings and walk in composed." },
  { initials: "06", name: "Students", handle: "Study & exams", cat: "Learning", followers: "Recall", desc: "Settle the noise and retain more in less time." },
  { initials: "07", name: "Everyone Else", handle: "Sleep & stress", cat: "Wellness", followers: "Nightly", desc: "Wind the nervous system down and fall asleep faster." },
];

const Captivation = () => {
  return (
    <section className="section they-came-to-us" data-theme="dark">
      <div className="tctu-container">
        <header className="tctu-header">
          <span className="tctu-eyebrow">HIGH FREQUENCY HEADPHONES</span>
          <h2 className="tctu-headline">Built For Every Kind Of Day.</h2>
          <p className="tctu-stat">100,000+ people in every country on earth</p>
          <p className="tctu-sub">One device. Seven states. Pick the one your day needs.</p>
          <p className="tctu-micro">No hype. No routine to learn. Just press play.</p>
        </header>

        <div className="tctu-grid">
          {cards.map((c) => (
            <article className="tctu-card" key={c.name}>
              <div className="tctu-card-top">
                <span className="tctu-ig">{c.cat}</span>
                <span className="tctu-dot" aria-hidden="true"></span>
              </div>
              <div className="tctu-divider"></div>
              <div className="tctu-profile">
                <div className="tctu-avatar tctu-avatar-initials" aria-hidden="true">{c.initials}</div>
                <div className="tctu-identity">
                  <span className="tctu-name">{c.name}</span>
                  <span className="tctu-handle">{c.handle}</span>
                </div>
              </div>
              <div className="tctu-followers">
                <span className="tctu-follow-num">{c.followers}</span>
              </div>
              <div className="tctu-divider"></div>
              <p className="tctu-desc">{c.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Captivation;
