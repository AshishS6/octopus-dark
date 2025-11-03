import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import Services from "@/components/Services";
import WorkSamples from "@/components/WorkSamples";
import ClientsMarquee from "@/components/ClientsMarquee";
import Team from "@/components/Team";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <WhoWeAre />
      <Services />
      <WorkSamples />
      <ClientsMarquee />
      <Team />
      <ContactCTA />
      <Footer />
    </div>
  );
};

export default Index;
