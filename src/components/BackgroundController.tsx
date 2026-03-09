import { motion } from "framer-motion";

interface BackgroundControllerProps {
  className?: string;
  particleDensity?: number;
  depthToken?: "depth-0" | "depth-1" | "depth-2" | "depth-3";
  reducedMotion?: boolean;
}

const BackgroundController = ({
  className = "",
  reducedMotion = false,
}: BackgroundControllerProps) => {

  // A very subtle, sophisticated dark agency gradient that feels premium.
  const gradientStyle = {
    background: `radial-gradient(circle at 50% 0%, hsl(0 0% 10% / 0.5) 0%, hsl(0 0% 2%) 70%)`
  };

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-background ${className}`}
    >
      {/* Base dark layout */}
      <motion.div
        className="absolute inset-0"
        style={gradientStyle}
        initial={!reducedMotion ? { opacity: 0 } : false}
        animate={!reducedMotion ? { opacity: 1 } : false}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Subtle Grain Overlay for texture (optional premium feel) */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default BackgroundController;

