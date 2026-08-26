import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X, Loader2, HelpCircle, User, ShoppingCart } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import { useBuyNow } from "@/hooks/useBuyNow";
import { useCartStore } from "@/stores/cartStore";
import logoAsset from "@/assets/hfh-logo.png.asset.json";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const { buyNow, isLoading } = useBuyNow();
  const openCart = useCartStore((s) => s.openDrawer);

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
          <a href="/help">
            <HelpCircle size={14} aria-hidden="true" />
            Help Center
          </a>
        </div>
      </div>

      <div className="nav-inner">
        <a href="#hero" className="brand-mark" aria-label="High Frequency Headphones — home">
          <img src={logoAsset.url} alt="High Frequency Headphones logo" className="brand-logo" />
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#how-it-works">How it Works</a>
          <a href="#product">Product</a>
          <a href="#app">App</a>
          <a href="#reviews">Video Reviews</a>
          <a href="#testimonials">Testimonials</a>
        </nav>
        <div className="nav-actions">
          <CartDrawer />
          <button type="button" onClick={() => buyNow()} disabled={isLoading} className="btn btn-purple btn-sm">
            {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : "ORDER NOW"}
          </button>
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
        <span className="mm-eyebrow">Explore</span>
        <nav className="mm-primary" aria-label="Mobile primary">
          <a href="#how-it-works" onClick={closeMenu}>How it Works</a>
          <a href="#product" onClick={closeMenu}>Product</a>
          <a href="#app" onClick={closeMenu}>App</a>
          <a href="#reviews" onClick={closeMenu}>Video Reviews</a>
          <a href="#testimonials" onClick={closeMenu}>Testimonials</a>
        </nav>
        <div className="mm-divider" />
        <div className="mm-utility">
          <a href="/track" onClick={closeMenu}>
            <User size={16} aria-hidden="true" />
            My Order
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
        <button type="button" onClick={() => { closeMenu(); buyNow(); }} disabled={isLoading} className="btn btn-purple mm-cta">
          {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : "ORDER NOW"}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
