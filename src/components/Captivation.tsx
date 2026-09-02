type Card = {
  initials: string;
  name: string;
  handle: string;
  cat: string;
  followers: string;
  desc: string;
};

const cards: Card[] = [
  { initials: "WI", name: "will.i.am", handle: "@iamwill", cat: "Culture", followers: "2M", desc: "Grammy-winning artist, producer, and tech entrepreneur." },
  { initials: "ET", name: "Everette Taylor", handle: "@everette", cat: "Founder", followers: "604K", desc: "CEO of Kickstarter and culture-driven startup operator." },
  { initials: "KI", name: "Kyrie Irving", handle: "@kyrieirving", cat: "Sports", followers: "20.3M", desc: "NBA champion and global basketball star." },
  { initials: "CM", name: "Conor McGregor", handle: "@thenotoriousmma", cat: "Sports", followers: "47M", desc: "UFC champion and global combat-sports icon." },
  { initials: "SA", name: "Steve Aoki", handle: "@steveaoki", cat: "Culture", followers: "11M", desc: "Platinum DJ, producer, and founder of Dim Mak." },
  { initials: "JA", name: "Jhené Aiko", handle: "@jheneaiko", cat: "Culture", followers: "17M", desc: "Grammy-nominated R&B artist and songwriter." },
  { initials: "19", name: "19 Keys", handle: "@19_keys", cat: "Thought Leader", followers: "977K", desc: "Entrepreneur, author, and thought-leadership creator." },
];

const Captivation = () => {
  return (
    <section className="section they-came-to-us" data-theme="dark">
      <div className="tctu-container">
        <header className="tctu-header">
          <span className="tctu-eyebrow">HIGH FREQUENCY HEADPHONES</span>
          <h2 className="tctu-headline">They Came To Us.</h2>
          <p className="tctu-stat">98.9M+ combined Instagram followers</p>
          <p className="tctu-sub">Social proof you can see — with context, not just names.</p>
          <p className="tctu-micro">No PR firm. No paid endorsements. No pitch decks.</p>
        </header>

        <div className="tctu-grid">
          {cards.map((c) => (
            <article className="tctu-card" key={c.handle}>
              <div className="tctu-card-top">
                <span className="tctu-ig">Instagram profile</span>
                <span className="tctu-dot" aria-hidden="true"></span>
              </div>
              <div className="tctu-divider"></div>
              <div className="tctu-profile">
                <div className="tctu-avatar tctu-avatar-initials" aria-hidden="true">{c.initials}</div>
                <div className="tctu-identity">
                  <span className="tctu-name">{c.name}</span>
                  <span className="tctu-handle">{c.handle}</span>
                  <span className="tctu-cat">{c.cat}</span>
                </div>
              </div>
              <div className="tctu-followers">
                <span className="tctu-follow-num">{c.followers}</span>
                <span className="tctu-follow-label">followers</span>
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
