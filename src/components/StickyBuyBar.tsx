import { useEffect, useState } from "react";

const StickyBuyBar = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      setShow(heroBottom < 0);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <a
      href="#order"
      id="stickyBuy"
      className={`sticky-buy-bar ${show ? "show" : ""}`}
    >
      Get Your Headphones — $349
    </a>
  );
};

export default StickyBuyBar;
