import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useCartSync } from "@/hooks/useCartSync";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import ShippingPolicy from "./pages/ShippingPolicy";
import ShopifyInstalled from "./pages/ShopifyInstalled";
import Track from "./pages/Track";
import Claims from "./pages/Claims";
import TrackResult from "./pages/TrackResult";
import NotFound from "./pages/NotFound";
import HelpHome from "./pages/help/HelpHome";
import HelpSectionPage from "./pages/help/HelpSectionPage";
import HelpArticlePage from "./pages/help/HelpArticlePage";
import HelpSearchPage from "./pages/help/HelpSearchPage";
import EmailCapturePopup from "./components/EmailCapturePopup";
import PostPurchaseUpsell from "./pages/PostPurchaseUpsell";
import HoneyLanding from "./pages/HoneyLanding";
import HollywoodReporter from "./pages/HollywoodReporter";
import { BumpModalHost } from "./components/BumpModal";


const queryClient = new QueryClient();

const AppContent = () => {
  useCartSync();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/shopify-installed" element={<ShopifyInstalled />} />
        <Route path="/track" element={<Track />} />
        <Route path="/track/result" element={<TrackResult />} />
        <Route path="/claims" element={<Claims />} />
        <Route path="/returns" element={<Navigate to="/claims" replace />} />
        <Route path="/submit-a-claim" element={<Navigate to="/claims" replace />} />
        <Route path="/help" element={<HelpHome />} />
        <Route path="/help/search" element={<HelpSearchPage />} />
        <Route path="/help/:sectionSlug" element={<HelpSectionPage />} />
        <Route path="/help/:sectionSlug/:articleSlug" element={<HelpArticlePage />} />
        <Route path="/upsell" element={<PostPurchaseUpsell />} />
        <Route path="/highfrequencyhealth" element={<HoneyLanding />} />
        <Route path="/honey" element={<Navigate to="/highfrequencyhealth" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <MarketingOverlays />
      <BumpModalHost />
    </BrowserRouter>
  );
};

/** Email popup is a marketing surface — keep it off the help center. */
const MarketingOverlays = () => {
  const { pathname } = useLocation();

  // No splash screen anymore: mark it done immediately so the email popup
  // timer isn't left waiting on an event that never fires.
  useEffect(() => {
    (window as any).__hfhSplashDone = true;
    window.dispatchEvent(new Event("hfh:splash-done"));
  }, [pathname]);

  if (pathname.startsWith("/help")) return null;
  return <EmailCapturePopup />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
