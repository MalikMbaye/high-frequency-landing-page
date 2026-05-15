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
import InstagramReactions, { ALL_INSTAGRAM_POSTS } from "@/components/InstagramReactions";
import Captivation from "@/components/Captivation";
import ProductBlock from "@/components/ProductBlock";
import WhatsInBox from "@/components/WhatsInBox";
import PriceReframe from "@/components/PriceReframe";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import StickyBuyBar from "@/components/StickyBuyBar";

// Split Instagram reactions across the 4 ProductBlock placements on the page
const reactionSlices = [
  ALL_INSTAGRAM_POSTS.slice(0, 5),
  ALL_INSTAGRAM_POSTS.slice(5, 10),
  ALL_INSTAGRAM_POSTS.slice(10, 14),
  ALL_INSTAGRAM_POSTS.slice(14, 18),
];

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
      <InstagramReactions
        posts={reactionSlices[1]}
        title="From Skeptic to Believer in 60 Seconds"
        subtitle="Calm focus. Visible state shifts. Captured live."
      />
      <TaglineBlock />
      <ProductReveal />
      <FiveStates />
      <Generator />
      <AIMeditation />
      <LibraryHubNetwork />
      <ProductBlock />
      <InstagramReactions
        posts={reactionSlices[2]}
        title="Founders, Students, Strangers — Same Reaction"
        subtitle="Real people. Real moments. Public posts from the community."
      />
      <UseCases />
      <StatsBlock />
      <VehicleSwitch />
      <Captivation />
      <ProductBlock />
      <InstagramReactions
        posts={reactionSlices[3]}
        title="More Reactions, Straight from Instagram"
        subtitle="A new feeling — in their own words."
      />
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
