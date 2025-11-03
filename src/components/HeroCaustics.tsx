import { motion, useTransform } from "framer-motion";
import { useDepth } from "@/context/DepthProvider";

const HeroCaustics = () => {
  const { depth } = useDepth();
  
  // Caustics fade out as we go deeper
  const opacity = useTransform(depth, [0, 0.3], [0.15, 0]);
  const scale = useTransform(depth, [0, 0.3], [1, 1.2]);
  
  // Create realistic caustic patterns using multiple overlapping gradients
  const causticPattern = `
    radial-gradient(
      ellipse 200px 300px at 20% 30%,
      hsl(189 100% 70% / 0.2) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse 300px 200px at 80% 20%,
      hsl(189 100% 65% / 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse 250px 350px at 50% 10%,
      hsl(189 100% 75% / 0.18) 0%,
      transparent 45%
    ),
    radial-gradient(
      ellipse 180px 250px at 70% 50%,
      hsl(189 100% 70% / 0.12) 0%,
      transparent 40%
    ),
    radial-gradient(
      ellipse 220px 180px at 30% 60%,
      hsl(189 100% 68% / 0.15) 0%,
      transparent 45%
    )
  `;

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        opacity,
        scale,
        background: causticPattern,
        mixBlendMode: "screen",
        willChange: "transform",
      }}
      animate={{
        x: [0, 30, 0],
        y: [0, 20, 0],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Secondary animated layer for depth */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 400px 300px at 60% 40%,
              hsl(189 100% 60% / 0.1) 0%,
              transparent 60%
            )
          `,
          mixBlendMode: "overlay",
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </motion.div>
  );
};

export default HeroCaustics;

