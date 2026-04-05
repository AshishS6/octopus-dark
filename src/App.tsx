import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Index from "./pages/Index";
import { GlowingEffectDemo } from "./components/demo/glowing-effect-demo";
import NotFound from "./pages/NotFound";

import MainLayout from "./components/MainLayout";

// Lazy load pages
const Work = lazy(() => import("./pages/Work"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const ServicesPage = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const StartProject = lazy(() => import("./pages/StartProject"));

const queryClient = new QueryClient();

const EXPO = [0.16, 1, 0.3, 1] as const;

// Thin wipe-in transition shared across all pages
const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.45, ease: EXPO }}
  >
    {children}
  </motion.div>
);

// Inner component that has access to useLocation (must be inside BrowserRouter)
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/start-project" element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
              <PageTransition><StartProject /></PageTransition>
            </Suspense>
          } />
          <Route path="/work" element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
              <PageTransition><Work /></PageTransition>
            </Suspense>
          } />
          <Route path="/work/:slug" element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
              <PageTransition><CaseStudy /></PageTransition>
            </Suspense>
          } />
          <Route path="/services" element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
              <PageTransition><ServicesPage /></PageTransition>
            </Suspense>
          } />
          <Route path="/services/:service" element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
              <PageTransition><ServiceDetail /></PageTransition>
            </Suspense>
          } />
          <Route path="/glowing" element={
            <PageTransition>
              <div className="p-8 min-h-screen bg-background">
                <GlowingEffectDemo />
              </div>
            </PageTransition>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
