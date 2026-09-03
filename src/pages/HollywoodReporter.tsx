import { lazy } from "react";
import StickyBuyBar from "@/components/StickyBuyBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HollywoodReporterPress from "@/components/HollywoodReporterPress";
import ProductBlock from "@/components/ProductBlock";
import TestimonialGallery from "@/components/TestimonialGallery";
import WhatsInBox from "@/components/WhatsInBox";
import Captivation from "@/components/Captivation";
import LazySection from "@/components/LazySection";
import YouTubeShortsCarousel from "@/components/YouTubeShortsCarousel";
import WhyMoreThanOne from "@/components/WhyMoreThanOne";

// Below-the-fold: code-split so the JS for these sections is fetched only when needed.
const WrongTeardown = lazy(() => import("@/components/WrongTeardown"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const BeforeAfterScience = lazy(() => import("@/components/BeforeAfterScience"));
const HemisphereSync = lazy(() => import("@/components/HemisphereSync"));

const Neuroplasticity = lazy(() => import("@/components/Neuroplasticity"));
const ProductReveal = lazy(() => import("@/components/ProductReveal"));
const FiveStates = lazy(() => import("@/components/FiveStates"));
const AIMeditation = lazy(() => import("@/components/AIMeditation"));
const FrequencyControl = lazy(() => import("@/components/FrequencyControl"));
const LibraryHubNetwork = lazy(() => import("@/components/LibraryHubNetwork"));
const UseCases = lazy(() => import("@/components/UseCases"));
const StatsBlock = lazy(() => import("@/components/StatsBlock"));
const VehicleSwitch = lazy(() => import("@/components/VehicleSwitch"));
const PriceReframe = lazy(() => import("@/components/PriceReframe"));
const FAQ = lazy(() => import("@/components/FAQ"));
const FounderStory = lazy(() => import("@/components/FounderStory"));
const Footer = lazy(() => import("@/components/Footer"));

const shortsAfterFirstPDP = [
  "https://www.youtube.com/watch?v=CXjLAr6SPmE",
  "https://www.youtube.com/shorts/BUUBmswVNRE",
  "https://www.youtube.com/shorts/ab0egzOwL4w",
  "https://www.youtube.com/shorts/ZZc5cOMMu3A",
];
const shortsAfterBox = [
  "https://www.youtube.com/shorts/6v5PvPTl2Ic",
  "https://www.youtube.com/shorts/qWse__HjCvw",
  "https://www.youtube.com/shorts/c4iz9tFwj40",
  "https://www.youtube.com/shorts/jQ5BOHd62zg",
  "https://www.youtube.com/shorts/p_GaR-Ll02A",
  "https://www.youtube.com/shorts/lbHDsCC6XFY",
  "https://www.youtube.com/shorts/TzhYmjFAwVk",
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

const HollywoodReporter = () => {
  return (
    <div className="min-h-screen bg-background page-thr">
      {/* Above-the-fold: render eagerly so the top paints instantly */}
      <Navbar />
      <Hero variant="press" />
      <YouTubeShortsCarousel
        videos={shortsAfterBox}
        layout="row"
        title="Trusted by the Top 1%"
        subtitle={
          <>
            Experience The Viral Frequency Tech Trusted By Pro Athletes And CEOs.{" "}
            <a href="mailto:j@highfrequencyhw.com">
              Contact us to learn more
            </a>
          </>
        }
      />

      <Captivation />
      <ProductBlock />
      <HollywoodReporterPress />
      <WhatsInBox />
      <TestimonialGallery />

      {/* Below-the-fold: mount as user scrolls down. Each LazySection has its
          own Suspense boundary so loading one chunk does not collapse the
          others (which previously caused mid-scroll jumps to the top). */}
      <YouTubeShortsCarousel videos={shortsAfterFirstPDP} id="reviews" />
      <LazySection>
        <WhyMoreThanOne />
      </LazySection>
      <LazySection>
        <WrongTeardown />
      </LazySection>
      <LazySection>
        <HowItWorks />
      </LazySection>

      <LazySection>
        <HemisphereSync />
      </LazySection>
      <LazySection>
        <BeforeAfterScience />
      </LazySection>

      <YouTubeShortsCarousel videos={shortsAfterSecondPDP} />
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
        <FrequencyControl />
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
      <YouTubeShortsCarousel videos={shortsAfterThirdPDP} />
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
      <StickyBuyBar />
    </div>
  );
};

export default HollywoodReporter;
