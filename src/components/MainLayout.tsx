import { Outlet, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import BackgroundController from "@/components/BackgroundController";
import Footer from "@/components/Footer";
import { DepthProvider } from "@/context/DepthProvider";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

type DepthToken = "depth-0" | "depth-1" | "depth-2" | "depth-3";

const MainLayout = () => {
    const { pathname } = useLocation();
    const [reducedMotion, setReducedMotion] = useState(false);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // Determine Depth Token based on route
    const getDepthToken = (): DepthToken => {
        if (pathname === "/") return "depth-0"; // Home - High Motion
        if (pathname === "/services" || pathname === "/work") return "depth-1"; // Overview - Medium
        if (pathname === "/start-project") return "depth-3"; // Form - Minimal
        return "depth-2"; // Detail pages - Low
    };

    const depthToken = getDepthToken();

    return (
        <DepthProvider>
            <div className="min-h-screen flex flex-col relative">
                <BackgroundController
                    particleDensity={1}
                    depthToken={depthToken}
                    reducedMotion={reducedMotion}
                />

                <Navigation />

                <main className="flex-grow">
                    <Outlet />
                </main>

                <Footer />

                {/* Reduced Motion Toggle - Fixed Bottom Left */}
                <div className="fixed bottom-4 left-4 z-50">
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-background/50 backdrop-blur-md border-primary/20 hover:bg-background/80"
                        onClick={() => setReducedMotion(!reducedMotion)}
                        title={reducedMotion ? "Enable Motion" : "Reduce Motion"}
                    >
                        {reducedMotion ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-primary" />}
                    </Button>
                </div>
            </div>
        </DepthProvider>
    );
};

export default MainLayout;
