import { motion, useTransform } from "framer-motion";
import { useDepth } from "@/context/DepthProvider";
import OceanSurface from "./layers/OceanSurface";
import MidOcean from "./layers/MidOcean";
import DeepOcean from "./layers/DeepOcean";
import Particles from "./Particles";

interface BackgroundControllerProps {
  className?: string;
  particleDensity?: number;
  depthToken?: "depth-0" | "depth-1" | "depth-2" | "depth-3";
  reducedMotion?: boolean;
}

const BackgroundController = ({
  className = "",
  particleDensity = 1,
  depthToken = "depth-0",
  reducedMotion = false,
}: BackgroundControllerProps) => {
  const { depth } = useDepth();

  // Map depth token to density and layer opacity
  const getTokenSettings = () => {
    if (reducedMotion) return { density: 0, opacity: 0.2 };

    switch (depthToken) {
      case "depth-0": return { density: 1, opacity: 1 };
      case "depth-1": return { density: 0.5, opacity: 0.8 };
      case "depth-2": return { density: 0.2, opacity: 0.6 };
      case "depth-3": return { density: 0.05, opacity: 0.4 };
      default: return { density: 1, opacity: 1 };
    }
  };

  const settings = getTokenSettings();

  // Overall background gradient that shifts with depth
  const backgroundGradient = useTransform(
    depth,
    [0, 0.5, 1],
    [
      `linear-gradient(to bottom, 
        hsl(189 100% 50% / 0.05) 0%, 
        hsl(189 85% 40% / 0.1) 50%, 
        hsl(220 50% 10% / 0.2) 100%)`,
      `linear-gradient(to bottom, 
        hsl(189 85% 35% / 0.1) 0%, 
        hsl(189 70% 30% / 0.15) 50%, 
        hsl(220 55% 8% / 0.3) 100%)`,
      `linear-gradient(to bottom, 
        hsl(189 70% 25% / 0.15) 0%, 
        hsl(220 60% 8% / 0.25) 50%, 
        hsl(220 65% 5% / 0.5) 100%)`,
    ]
  );

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden -z-10 ${className}`}
    >
      {/* Base gradient that shifts with depth */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: backgroundGradient,
          opacity: settings.opacity
        }}
      />

      {/* Layer components - Conditional rendering based on depth/motion could be added here for perf */}
      <OceanSurface />
      <MidOcean />
      <DeepOcean />

      {/* Particles layer */}
      {!reducedMotion && <Particles density={settings.density} />}
    </div>
  );
};

export default BackgroundController;

