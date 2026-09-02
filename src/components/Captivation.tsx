import willAsset from "@/assets/celebs/headshot_05_will_i_am.jpg.asset.json";
import everetteAsset from "@/assets/celebs/headshot_02_everette_taylor.png.asset.json";
import kyrieAsset from "@/assets/celebs/headshot_08_kyrie_irving.jpg.asset.json";
import conorAsset from "@/assets/celebs/headshot_09_conor_mcgregor.jpg.asset.json";
import aokiAsset from "@/assets/celebs/headshot_01_steve_aoki.jpg.asset.json";
import jheneAsset from "@/assets/celebs/headshot_03_jhene_aiko.jpg.asset.json";
import keysAsset from "@/assets/celebs/headshot_10_19_keys.jpg.asset.json";

type Card = {
  initials: string;
  photo: string;
  name: string;
  handle: string;
  cat: string;
  followers: string;
  desc: string;
};

const cards: Card[] = [
  { initials: "WI", photo: willAsset.url, name: "will.i.am", handle: "@iamwill", cat: "Culture", followers: "2M", desc: "Grammy-winning artist, producer, and tech entrepreneur." },
  { initials: "ET", photo: everetteAsset.url, name: "Everette Taylor", handle: "@everette", cat: "Founder", followers: "604K", desc: "CEO of Kickstarter and culture-driven startup operator." },
  { initials: "KI", photo: kyrieAsset.url, name: "Kyrie Irving", handle: "@kyrieirving", cat: "Sports", followers: "20.3M", desc: "NBA champion and global basketball star." },
  { initials: "CM", photo: conorAsset.url, name: "Conor McGregor", handle: "@thenotoriousmma", cat: "Sports", followers: "47M", desc: "UFC champion and global combat-sports icon." },
  { initials: "SA", photo: aokiAsset.url, name: "Steve Aoki", handle: "@steveaoki", cat: "Culture", followers: "11M", desc: "Platinum DJ, producer, and founder of Dim Mak." },
  { initials: "JA", photo: jheneAsset.url, name: "Jhené Aiko", handle: "@jheneaiko", cat: "Culture", followers: "17M", desc: "Grammy-nominated R&B artist and songwriter." },
  { initials: "19", photo: keysAsset.url, name: "19 Keys", handle: "@19_keys", cat: "Thought Leader", followers: "977K", desc: "Entrepreneur, author, and thought-leadership creator." },
];

const Captivation = () => {
  return (
    <section className="section they-came-to-us" data-theme="dark">
      <div className="tctu-container">
        <header className="tctu-header">
          <span className="tctu-eyebrow">FOLLOWERS OF THE MOVEMENT</span>
          <h2 className="tctu-headline">They Came To Us.</h2>
          <p className="tctu-stat">98.9M+ combined Instagram followers</p>
          <p className="tctu-sub">Supporters of the technology</p>
        </header>

        <div className="tctu-grid">
          {cards.map((c) => (
            <article className="tctu-tile" key={c.handle}>
              <div className="tctu-tile-media">
                <img className="tctu-tile-img" src={c.photo} alt={c.name} loading="lazy" />
                <span className="tctu-tile-chip">{c.cat}</span>
                <div className="tctu-tile-overlay">
                  <span className="tctu-tile-name">{c.name}</span>
                  <span className="tctu-tile-handle">{c.handle}</span>
                  <span className="tctu-tile-followers">
                    <strong>{c.followers}</strong> followers
                  </span>
                </div>
              </div>
              <p className="tctu-tile-desc">{c.desc}</p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Captivation;
