import { useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import willAsset from "@/assets/celebs/headshot_05_will_i_am.jpg.asset.json";
import everetteAsset from "@/assets/celebs/headshot_02_everette_taylor.png.asset.json";
import kyrieAsset from "@/assets/celebs/headshot_08_kyrie_irving.jpg.asset.json";
import conorAsset from "@/assets/celebs/headshot_09_conor_mcgregor.jpg.asset.json";
import aokiAsset from "@/assets/celebs/headshot_01_steve_aoki.jpg.asset.json";
import jheneAsset from "@/assets/celebs/headshot_03_jhene_aiko.jpg.asset.json";
import keysAsset from "@/assets/celebs/headshot_10_19_keys.jpg.asset.json";
import billyAsset from "@/assets/celebs/headshot_07_billy_carson.jpg.asset.json";
import daymondAsset from "@/assets/celebs/headshot_06_daymond_john.jpg.asset.json";

type Endorser = {
  name: string;
  handle: string;
  tag: string;
  followers: string;
  proof: string;
  image: string;
  video?: string;
  asset_type: "video" | "photo";
};

const endorsers: Endorser[] = [
  {
    name: "will.i.am",
    handle: "@iamwill",
    tag: "Culture",
    followers: "2M",
    proof: "Grammy-winning artist, producer, and tech entrepreneur. Reacted on camera to the frequency technology.",
    image: willAsset.url,
    video: "lbHDsCC6XFY",
    asset_type: "video",
  },
  {
    name: "Everette Taylor",
    handle: "@everette",
    tag: "Founder",
    followers: "604K",
    proof: "CEO of Kickstarter. Shared his review after six months of daily use.",
    image: everetteAsset.url,
    video: "p_GaR-Ll02A",
    asset_type: "video",
  },
  {
    name: "Kyrie Irving",
    handle: "@kyrieirving",
    tag: "Sports",
    followers: "20.3M",
    proof: "NBA champion and global basketball star.",
    image: kyrieAsset.url,
    asset_type: "photo",
  },
  {
    name: "Billy Carson",
    handle: "@4biddenknowledge",
    tag: "Thought Leader",
    followers: "2.1M",
    proof: "Author and founder of 4biddenknowledge. Tried the headphones on camera.",
    image: billyAsset.url,
    video: "qWse__HjCvw",
    asset_type: "video",
  },
  {
    name: "Daymond John",
    handle: "@thesharkdaymond",
    tag: "Founder",
    followers: "3.6M",
    proof: "Shark Tank investor and FUBU founder. Reacted live to the frequency shift.",
    image: daymondAsset.url,
    video: "6v5PvPTl2Ic",
    asset_type: "video",
  },
  {
    name: "Jhené Aiko",
    handle: "@jheneaiko",
    tag: "Culture",
    followers: "17M",
    proof: "Grammy-nominated R&B artist and songwriter.",
    image: jheneAsset.url,
    asset_type: "photo",
  },
  {
    name: "19 Keys",
    handle: "@19_keys",
    tag: "Thought Leader",
    followers: "977K",
    proof: "Entrepreneur, author, and thought-leadership creator. Shared his session on camera.",
    image: keysAsset.url,
    video: "TzhYmjFAwVk",
    asset_type: "video",
  },
  {
    name: "Conor McGregor",
    handle: "@thenotoriousmma",
    tag: "Sports",
    followers: "47M",
    proof: "UFC champion and global combat-sports icon.",
    image: conorAsset.url,
    asset_type: "photo",
  },
  {
    name: "Steve Aoki",
    handle: "@steveaoki",
    tag: "Culture",
    followers: "11M",
    proof: "Platinum DJ, producer, and founder of Dim Mak.",
    image: aokiAsset.url,
    asset_type: "photo",
  },
];

const Captivation = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<Endorser | null>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 });

  const scrollBy = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(320, el.clientWidth * 0.8), behavior: "smooth" });
  };

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || e.pointerType !== "mouse") return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: 0 };
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.abs(dx);
    el.scrollLeft = drag.current.startScroll - dx;
  }, []);

  const endDrag = useCallback(() => {
    drag.current.active = false;
  }, []);

  return (
    <section className="section they-came-to-us" data-theme="light">
      <div className="tctu-header-wrap">
        <header className="tctu-header">
          <span className="tctu-eyebrow">FOLLOWERS OF THE MOVEMENT</span>
          <h2 className="tctu-headline">They Came To Us.</h2>
          <p className="tctu-stat">98.9M+ combined Instagram followers</p>
          <p className="tctu-sub">Supporters of the technology</p>
        </header>
      </div>

      <div className="tctu-carousel">
        <button
          type="button"
          className="tctu-arrow tctu-arrow-left"
          aria-label="Scroll left"
          onClick={() => scrollBy(-1)}
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          className="tctu-arrow tctu-arrow-right"
          aria-label="Scroll right"
          onClick={() => scrollBy(1)}
        >
          <ChevronRight size={22} />
        </button>

        <div
          className="tctu-track"
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
        >
          {endorsers.map((p) => {
            const isVideo = p.asset_type === "video";
            return (
              <article className="tctu-tile" key={p.handle}>
                <div className="tctu-tile-media">
                  <img className="tctu-tile-img" src={p.image} alt={p.name} loading="lazy" draggable={false} />
                  <span className="tctu-tile-chip">{p.tag}</span>
                  {isVideo && (
                    <button
                      type="button"
                      className="tctu-play"
                      aria-label={`Play ${p.name} clip`}
                      onClick={() => {
                        if (drag.current.moved > 6) return;
                        setLightbox(p);
                      }}
                    >
                      <Play size={26} fill="currentColor" />
                    </button>
                  )}
                  <div className="tctu-tile-overlay">
                    <span className="tctu-tile-name">{p.name}</span>
                    <span className="tctu-tile-handle">{p.handle}</span>
                    <span className="tctu-tile-followers">
                      <strong>{p.followers}</strong> followers
                    </span>
                  </div>
                </div>
                <p className="tctu-tile-desc">{p.proof}</p>
              </article>
            );
          })}
        </div>
      </div>

      {lightbox && (
        <div className="tctu-lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}>
          <button type="button" className="tctu-lightbox-close" aria-label="Close video">
            <X size={22} />
          </button>
          <div className="tctu-lightbox-frame" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${lightbox.video}?autoplay=1&rel=0&playsinline=1`}
              title={`${lightbox.name} clip`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Captivation;
