import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VideoProof from "@/components/VideoProof";
import WrongTeardown from "@/components/WrongTeardown";
import HowItWorks from "@/components/HowItWorks";
import BeforeAfterScience from "@/components/BeforeAfterScience";
import Neuroplasticity from "@/components/Neuroplasticity";
import FounderStory from "@/components/FounderStory";
import TaglineBlock from "@/components/TaglineBlock";
import ProductReveal from "@/components/ProductReveal";
import FiveStates from "@/components/FiveStates";
import Generator from "@/components/Generator";
import AIMeditation from "@/components/AIMeditation";
import LibraryHubNetwork from "@/components/LibraryHubNetwork";
import UseCases from "@/components/UseCases";
import StatsBlock from "@/components/StatsBlock";
import VehicleSwitch from "@/components/VehicleSwitch";
import ReactionWall from "@/components/ReactionWall";
import Captivation from "@/components/Captivation";
import ProductBlock from "@/components/ProductBlock";
import WhatsInBox from "@/components/WhatsInBox";
import PriceReframe from "@/components/PriceReframe";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import StickyBuyBar from "@/components/StickyBuyBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ProductBlock />
      <VideoProof />
      <WrongTeardown />
      <HowItWorks />
      <BeforeAfterScience />
      <Neuroplasticity />
      <ProductBlock />
      <TaglineBlock />
      <ProductReveal />
      <FiveStates />
      <Generator />
      <AIMeditation />
      <LibraryHubNetwork />
      <ProductBlock />
      <UseCases />
      <StatsBlock />
      <VehicleSwitch />
      {/* <ReactionWall /> temporarily hidden — will return as Instagram carousel */}
      <Captivation />
      <ProductBlock />
      <WhatsInBox />
      <PriceReframe />
      <FAQ />
      <FounderStory />
      <Footer />
      <StickyBuyBar />
    </div>
  );
};

export default Index;
