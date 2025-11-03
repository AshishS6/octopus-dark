import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import OctopusCursor from "@/components/OctopusCursor";
import BackgroundController from "@/components/BackgroundController";
import DepthMeter from "@/components/DepthMeter";
import { DepthProvider } from "@/context/DepthProvider";

// Lazy load below-the-fold components for better initial load performance
const WhoWeAre = lazy(() => import("@/components/WhoWeAre"));
const Services = lazy(() => import("@/components/Services"));
const WorkSamples = lazy(() => import("@/components/WorkSamples"));
const ClientsMarquee = lazy(() => import("@/components/ClientsMarquee"));
const Team = lazy(() => import("@/components/Team"));
const ContactCTA = lazy(() => import("@/components/ContactCTA"));
const Footer = lazy(() => import("@/components/Footer"));

// Loading fallback component
const SectionLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <DepthProvider>
      <div className="min-h-screen">
        <OctopusCursor enabled={true} />
        <BackgroundController particleDensity={1} />
        <DepthMeter />
        <Navigation />
        <Hero />
        {/* Lazy loaded sections with suspense */}
        <Suspense fallback={<SectionLoader />}>
          <WhoWeAre />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <WorkSamples />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ClientsMarquee />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Team />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ContactCTA />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
      </div>
    </DepthProvider>
  );
};

export default Index;
