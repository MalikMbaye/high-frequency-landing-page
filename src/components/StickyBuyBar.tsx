import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useBuyNow } from "@/hooks/useBuyNow";

const StickyBuyBar = () => {
  const [show, setShow] = useState(false);
  const { buyNow, isLoading } = useBuyNow();

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 720px)");

    const update = () => {
      if (mobileQuery.matches) {
        setShow(true);
        return;
      }

      const hero = document.getElementById("hero");
      const buy = document.getElementById("buy");
      if (!hero) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      const buyTop = buy ? buy.getBoundingClientRect().top : Infinity;
      // Show only when hero is scrolled past AND buy section is not yet in view
      setShow(heroBottom < 0 && buyTop > window.innerHeight);
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
    mobileQuery.addEventListener("change", update);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mobileQuery.removeEventListener("change", update);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => buyNow()}
      disabled={isLoading}
      id="stickyBuy"
      className={`sticky-buy-bar ${show ? "show" : ""}`}
    >
      {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "Get Your Headphones — $169"}
    </button>
  );
};

export default StickyBuyBar;
