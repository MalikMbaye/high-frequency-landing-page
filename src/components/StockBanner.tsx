import { useLocation } from "react-router-dom";

/**
 * Promotional banner — rendered as the first child of the fixed header.
 * Shows the FUEL30 offer only on /highfrequencyhealth; otherwise prompts
 * for expedited shipping on the main site.
 */
const StockBanner = () => {
  const { pathname } = useLocation();
  const isHealth = pathname.startsWith("/highfrequencyhealth");

  return (
    <div className="stock-banner" role="status">
      <span className="stock-banner-dot" aria-hidden="true" />
      <span className="stock-banner-text">
        {isHealth
          ? "Use code FUEL30 at checkout for 30% off"
          : "ORDER NOW FOR EXPEDITED SHIPPING"}
      </span>
    </div>
  );
};

export default StockBanner;
