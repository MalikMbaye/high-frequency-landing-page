import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SocialProofBar } from "@/components/SocialProofBar";
import { ProblemAgitation } from "@/components/ProblemAgitation";
import { ProductReveal } from "@/components/ProductReveal";
import { ReactionVideoGrid } from "@/components/ReactionVideoGrid";
import { AppShowcase } from "@/components/AppShowcase";
import { ScienceCredibility } from "@/components/ScienceCredibility";
import { Testimonials } from "@/components/Testimonials";
import { OfferStack } from "@/components/OfferStack";
import { UrgencyClose } from "@/components/UrgencyClose";
import { Footer } from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Index = () => {
  const scrollRef = useScrollReveal();

  return (
    <div ref={scrollRef} className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <SocialProofBar />
      <ProblemAgitation />
      <ProductReveal />
      <ReactionVideoGrid />
      <AppShowcase />
      <ScienceCredibility />
      <Testimonials />
      <OfferStack />
      <UrgencyClose />
      <Footer />
    </div>
  );
};

export default Index;
