import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VideoProof from "@/components/VideoProof";
import WrongTeardown from "@/components/WrongTeardown";
import HowItWorks from "@/components/HowItWorks";
import BeforeAfterScience from "@/components/BeforeAfterScience";
import Neuroplasticity from "@/components/Neuroplasticity";
import FounderStory from "@/components/FounderStory";

import ProductReveal from "@/components/ProductReveal";
import FiveStates from "@/components/FiveStates";
import AIMeditation from "@/components/AIMeditation";
import LibraryHubNetwork from "@/components/LibraryHubNetwork";
import UseCases from "@/components/UseCases";
import StatsBlock from "@/components/StatsBlock";
import VehicleSwitch from "@/components/VehicleSwitch";
import ProductBlock from "@/components/ProductBlock";
import WhatsInBox from "@/components/WhatsInBox";
import YouTubeShortsCarousel from "@/components/YouTubeShortsCarousel";

const shortsAfterFirstPDP = [
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
import PriceReframe from "@/components/PriceReframe";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import StickyBuyBar from "@/components/StickyBuyBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <VideoProof />
      <ProductBlock />
      <WhatsInBox />
      <YouTubeShortsCarousel videos={shortsAfterFirstPDP} id="reviews" />
      <WrongTeardown />
      <HowItWorks />
      <BeforeAfterScience />
      <YouTubeShortsCarousel videos={shortsAfterSecondPDP} />
      <Neuroplasticity />
      <ProductReveal />
      <FiveStates />
      <AIMeditation />
      <LibraryHubNetwork />
      <ProductBlock />
      <UseCases />
      <StatsBlock />
      <VehicleSwitch />
      <ProductBlock />
      <YouTubeShortsCarousel videos={shortsAfterThirdPDP} />
      <PriceReframe />
      <FAQ />
      <FounderStory />
      <Footer />
      <StickyBuyBar />
    </div>
  );
};

export default Index;
