import { motion, useTransform } from "framer-motion";
import { useDepth } from "@/context/DepthProvider";

interface OceanSurfaceProps {
  className?: string;
}

const OceanSurface = ({ className = "" }: OceanSurfaceProps) => {
  const { depth } = useDepth();

  // Surface layer fades out as we go deeper
  const opacity = useTransform(depth, [0, 0.3], [1, 0]);
  const translateY = useTransform(depth, [0, 1], [0, 50]);
  const blur = useTransform(depth, [0, 0.3], [0, 10]);

  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      style={{
        opacity,
        y: translateY,
        filter: `blur(${blur}px)`,
      }}
    >
      {/* Sun rays from surface */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Light rays */}
        <motion.div
          className="absolute top-0 left-1/4 w-32 h-full bg-gradient-to-b from-cyan-400/30 via-cyan-300/10 to-transparent blur-2xl"
          animate={{
            scaleY: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 right-1/3 w-24 h-full bg-gradient-to-b from-cyan-400/25 via-cyan-300/8 to-transparent blur-2xl"
          animate={{
            scaleY: [1, 1.15, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-0 left-2/3 w-28 h-full bg-gradient-to-b from-cyan-400/20 via-cyan-300/5 to-transparent blur-2xl"
          animate={{
            scaleY: [1, 1.08, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Surface caustics - light patterns on water surface */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, hsl(189 100% 60% / 0.15) 0%, transparent 40%),
            radial-gradient(circle at 70% 40%, hsl(189 100% 55% / 0.12) 0%, transparent 45%),
            radial-gradient(circle at 50% 30%, hsl(189 100% 65% / 0.1) 0%, transparent 50%)
          `,
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default OceanSurface;

