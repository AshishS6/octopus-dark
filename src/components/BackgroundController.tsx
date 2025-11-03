import { motion, useTransform } from "framer-motion";
import { useDepth } from "@/context/DepthProvider";
import OceanSurface from "./layers/OceanSurface";
import MidOcean from "./layers/MidOcean";
import DeepOcean from "./layers/DeepOcean";
import Particles from "./Particles";

interface BackgroundControllerProps {
  className?: string;
  particleDensity?: number;
}

const BackgroundController = ({
  className = "",
  particleDensity = 1,
}: BackgroundControllerProps) => {
  const { depth } = useDepth();

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
        }}
      />

      {/* Layer components */}
      <OceanSurface />
      <MidOcean />
      <DeepOcean />

      {/* Particles layer */}
      <Particles density={particleDensity} />
    </div>
  );
};

export default BackgroundController;

