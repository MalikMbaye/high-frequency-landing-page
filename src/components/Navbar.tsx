import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X, Loader2, HelpCircle, User, ShoppingCart, ShieldCheck } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import { useBuyNow } from "@/hooks/useBuyNow";
import { useCartStore } from "@/stores/cartStore";
import StockBanner from "./StockBanner";
import logoAsset from "@/assets/hfh-logo.png.asset.json";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const { buyNow, isLoading } = useBuyNow();
  const openCart = useCartStore((s) => s.openDrawer);
  const { pathname } = useLocation();
  const isHoney = pathname.startsWith("/highfrequencyhealth");

  useEffect(() => {
    const navHeight = 64;

    const updateNavState = () => {
      const probeY = navHeight + 4;
      const sections = Array.from(document.querySelectorAll<HTMLElement>("section[data-theme]"));
      let current: HTMLElement | null = null;
      for (const sec of sections) {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          current = sec;
          break;
        }
      }
      if (!current) return;
      setDark(current.dataset.theme === "dark");
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateNavState();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateNavState();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`top-nav ${dark ? "dark" : ""}`} id="topNav">
      <StockBanner />

      {/* Utility strip — secondary, low-emphasis links */}
      <div className="nav-utility-bar">
        <div className="nav-utility-inner">
          <a href="/track">
            <User size={14} aria-hidden="true" />
            My Order
          </a>
          <a href="/claims">
            <ShieldCheck size={14} aria-hidden="true" />
            Returns &amp; Claims
          </a>
          <a href="/help">
            <HelpCircle size={14} aria-hidden="true" />
            Help Center
          </a>
        </div>
      </div>

      <div className="nav-inner">
        <a href={isHoney ? "/highfrequencyhealth" : "/"} className="brand-mark" aria-label="High Frequency Headphones — home">
          <img src={logoAsset.url} alt="High Frequency Headphones logo" className="brand-logo" />
        </a>
        <div className="nav-actions">
          <CartDrawer />
          {isHoney ? (
            <a href="#buy" className="btn btn-purple btn-sm">ORDER NOW</a>
          ) : (
            <button type="button" onClick={() => buyNow()} disabled={isLoading} className="btn btn-purple btn-sm">
              {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : "ORDER NOW"}
            </button>
          )}
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <div className="mm-utility">
          <a href="/track" onClick={closeMenu}>
            <User size={16} aria-hidden="true" />
            My Order
          </a>
          <a href="/claims" onClick={closeMenu}>
            <ShieldCheck size={16} aria-hidden="true" />
            Returns &amp; Claims
          </a>
          <a href="/help" onClick={closeMenu}>
            <HelpCircle size={16} aria-hidden="true" />
            Help Center
          </a>
          <button type="button" onClick={() => { closeMenu(); openCart(); }}>
            <ShoppingCart size={16} aria-hidden="true" />
            Cart
          </button>
        </div>
        {isHoney ? (
          <a href="#buy" onClick={closeMenu} className="btn btn-purple mm-cta">ORDER NOW</a>
        ) : (
          <button type="button" onClick={() => { closeMenu(); buyNow(); }} disabled={isLoading} className="btn btn-purple mm-cta">
            {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : "ORDER NOW"}
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
