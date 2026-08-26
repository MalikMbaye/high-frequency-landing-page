/**
 * Promotional banner — rendered as the first child of the fixed header.
 */
const StockBanner = () => {
  return (
    <div className="stock-banner" role="status">
      <span className="stock-banner-dot" aria-hidden="true" />
      <span className="stock-banner-text">
        Use code FUEL30 at checkout for 30% off
      </span>
    </div>
  );
};

export default StockBanner;
