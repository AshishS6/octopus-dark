import { lazy, Suspense } from "react";
import Hero from "@/components/Hero";
import SignalMarquee from "@/components/SignalMarquee";

// Navigation and Footer are provided by MainLayout — do not import them here.

// Lazy-load below-the-fold sections
const WhoWeAre = lazy(() => import("@/components/WhoWeAre"));
const Services = lazy(() => import("@/components/Services"));
const WorkSamples = lazy(() => import("@/components/WorkSamples"));
const ClientsMarquee = lazy(() => import("@/components/ClientsMarquee"));
const Team = lazy(() => import("@/components/Team"));
const ContactCTA = lazy(() => import("@/components/ContactCTA"));

// Minimal loader — avoids layout shift
const SectionLoader = () => <div className="min-h-[200px]" />;

const Index = () => (
  <>
    <Hero />
    <SignalMarquee />
    <Suspense fallback={<SectionLoader />}>
      <WhoWeAre />
    </Suspense>
    <Suspense fallback={<SectionLoader />}>
      <WorkSamples />
    </Suspense>
    <Suspense fallback={<SectionLoader />}>
      <Services />
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
  </>
);

export default Index;
