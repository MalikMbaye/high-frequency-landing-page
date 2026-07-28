import { useEffect } from "react";

const StockBanner = () => {
  useEffect(() => {
    document.body.classList.add("has-banner");
    return () => document.body.classList.remove("has-banner");
  }, []);

  return (
    <a href="#buy" className="stock-banner" aria-label="Shop now — back in stock">
      <span className="stock-banner-pulse" aria-hidden="true" />
      <span className="stock-banner-label">BACK IN STOCK</span>
      <span className="stock-banner-text">
        <span className="stock-banner-desktop">High Frequency Headphones are shipping again — at your door in as little as 3 days</span>
        <span className="stock-banner-mobile">At your door in as little as 3 days</span>

      </span>
      <span className="stock-banner-cta">Shop Now</span>
    </a>
  );
};

export default StockBanner;
