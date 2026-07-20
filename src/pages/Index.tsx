import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VideoProof from "@/components/VideoProof";
import ProductBlock from "@/components/ProductBlock";
import TestimonialGallery from "@/components/TestimonialGallery";
import WhatsInBox from "@/components/WhatsInBox";
import LazySection from "@/components/LazySection";
import StockBanner from "@/components/StockBanner";

// Below-the-fold: code-split so the JS for these sections is fetched only when needed.
const YouTubeShortsCarousel = lazy(() => import("@/components/YouTubeShortsCarousel"));
const WrongTeardown = lazy(() => import("@/components/WrongTeardown"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const BeforeAfterScience = lazy(() => import("@/components/BeforeAfterScience"));
const Neuroplasticity = lazy(() => import("@/components/Neuroplasticity"));
const ProductReveal = lazy(() => import("@/components/ProductReveal"));
const FiveStates = lazy(() => import("@/components/FiveStates"));
const AIMeditation = lazy(() => import("@/components/AIMeditation"));
const LibraryHubNetwork = lazy(() => import("@/components/LibraryHubNetwork"));
const UseCases = lazy(() => import("@/components/UseCases"));
const StatsBlock = lazy(() => import("@/components/StatsBlock"));
const VehicleSwitch = lazy(() => import("@/components/VehicleSwitch"));
const PriceReframe = lazy(() => import("@/components/PriceReframe"));
const FAQ = lazy(() => import("@/components/FAQ"));
const FounderStory = lazy(() => import("@/components/FounderStory"));
const Footer = lazy(() => import("@/components/Footer"));
const StickyBuyBar = lazy(() => import("@/components/StickyBuyBar"));

const shortsAfterFirstPDP = [
  "https://www.youtube.com/watch?v=CXjLAr6SPmE",
  "https://www.youtube.com/shorts/BUUBmswVNRE",
  "https://www.youtube.com/shorts/ab0egzOwL4w",
  "https://www.youtube.com/shorts/ZZc5cOMMu3A",
];
const shortsAfterSecondPDP = [
  "https://www.youtube.com/shorts/HLye0rMR7m0",
  "https://www.youtube.com/shorts/vld_AHcHY7s",
  "https://www.youtube.com/shorts/X43gjmUoQ54",
];
const shortsAfterThirdPDP = [
  "https://www.youtube.com/shorts/FmoietrnqRc",
  "https://www.youtube.com/shorts/7VFIVBJaRog",
  "https://www.youtube.com/shorts/2R_YkaOhlsQ",
];

const Fallback = ({ h = 400 }: { h?: number }) => <div style={{ minHeight: h }} />;

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Above-the-fold: render eagerly so the top paints instantly */}
      <Navbar />
      <Hero />
      
      <ProductBlock />
      <WhatsInBox />
      <TestimonialGallery />


      {/* Below-the-fold: mount as user scrolls down. Each LazySection has its
          own Suspense boundary so loading one chunk does not collapse the
          others (which previously caused mid-scroll jumps to the top). */}
      <LazySection>
        <YouTubeShortsCarousel videos={shortsAfterFirstPDP} id="reviews" />
      </LazySection>
      <LazySection>
        <WrongTeardown />
      </LazySection>
      <LazySection>
        <HowItWorks />
      </LazySection>
      <LazySection>
        <BeforeAfterScience />
      </LazySection>
      <LazySection>
        <YouTubeShortsCarousel videos={shortsAfterSecondPDP} />
      </LazySection>
      <LazySection>
        <Neuroplasticity />
      </LazySection>
      <LazySection>
        <ProductReveal />
      </LazySection>
      <LazySection>
        <FiveStates />
      </LazySection>
      <LazySection>
        <AIMeditation />
      </LazySection>
      <LazySection>
        <LibraryHubNetwork />
      </LazySection>
      <LazySection>
        <UseCases />
      </LazySection>
      <LazySection>
        <StatsBlock />
      </LazySection>
      <LazySection>
        <VehicleSwitch />
      </LazySection>
      <LazySection>
        <ProductBlock />
      </LazySection>
      <LazySection>
        <YouTubeShortsCarousel videos={shortsAfterThirdPDP} />
      </LazySection>
      <LazySection>
        <PriceReframe />
      </LazySection>
      <LazySection>
        <FAQ />
      </LazySection>
      <LazySection>
        <FounderStory />
      </LazySection>
      <LazySection>
        <Footer />
      </LazySection>
      <Suspense fallback={null}>
        <StickyBuyBar />
      </Suspense>
    </div>
  );
};

export default Index;
