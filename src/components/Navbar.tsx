import { useEffect, useState } from "react";
import { Menu, X, Loader2 } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import { useBuyNow } from "@/hooks/useBuyNow";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const { buyNow, isLoading } = useBuyNow();

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
      <div className="nav-inner">
        <a href="#hero" className="brand-mark">HIGH FREQUENCY HEADPHONES</a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#science">Science</a>
          <a href="#product">Product</a>
          <a href="#reviews">Reviews</a>
          <a href="/track">Track My Order</a>
        </nav>
        <div className="flex items-center gap-3 ml-auto">
          <button type="button" onClick={() => buyNow()} disabled={isLoading} className="btn btn-purple btn-sm">{isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : "ORDER NOW"}</button>
          <CartDrawer />
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
        <a href="#science" onClick={closeMenu}>Science</a>
        <a href="#product" onClick={closeMenu}>Product</a>
        <a href="#reviews" onClick={closeMenu}>Reviews</a>
        <a href="/track" onClick={closeMenu}>Track My Order</a>
        <button type="button" onClick={() => { closeMenu(); buyNow(); }} disabled={isLoading} className="btn btn-purple">{isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : "ORDER NOW"}</button>
      </div>
    </header>
  );
};

export default Navbar;
