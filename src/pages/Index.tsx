import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProblemAgitation } from "@/components/ProblemAgitation";
import { FounderStory } from "@/components/FounderStory";
import { ProductReveal } from "@/components/ProductReveal";
import { ReactionVideoGrid } from "@/components/ReactionVideoGrid";
import { Testimonials } from "@/components/Testimonials";
import { OfferStack } from "@/components/OfferStack";
import { AppShowcase } from "@/components/AppShowcase";
import { ScienceCredibility } from "@/components/ScienceCredibility";
import { UrgencyClose } from "@/components/UrgencyClose";
import { FAQ } from "@/components/FAQ";
import { FooterCTA } from "@/components/FooterCTA";
import { Footer } from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Index = () => {
  const scrollRef = useScrollReveal();

  return (
    <div ref={scrollRef} className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ProblemAgitation />
      <FounderStory />
      <ProductReveal />
      <ReactionVideoGrid />
      <Testimonials />
      <OfferStack />
      <AppShowcase />
      <ScienceCredibility />
      <UrgencyClose />
      <FAQ />
      <FooterCTA />
      <Footer />
    </div>
  );
};

export default Index;
