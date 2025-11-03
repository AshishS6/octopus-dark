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
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        opacity,
        y: translateY,
        filter: `blur(${blur}px)`,
        willChange: "transform, opacity, filter",
      }}
    >
      {/* Enhanced Sun rays from surface */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Light rays with improved realism */}
        <motion.div
          className="absolute top-0 left-1/4 w-32 h-full"
          style={{
            background: "linear-gradient(to bottom, hsl(189 100% 70% / 0.35), transparent)",
            filter: "blur(40px)",
            willChange: "transform",
          }}
          animate={{
            scaleY: [1, 1.12, 1],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 right-1/3 w-24 h-full"
          style={{
            background: "linear-gradient(to bottom, hsl(189 100% 68% / 0.3), transparent)",
            filter: "blur(35px)",
            willChange: "transform",
          }}
          animate={{
            scaleY: [1, 1.18, 1],
            x: [0, -12, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
        <motion.div
          className="absolute top-0 left-2/3 w-28 h-full"
          style={{
            background: "linear-gradient(to bottom, hsl(189 100% 65% / 0.25), transparent)",
            filter: "blur(45px)",
            willChange: "transform",
          }}
          animate={{
            scaleY: [1, 1.1, 1],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      {/* Enhanced Surface caustics - more realistic light patterns */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 200px 300px at 30% 20%, hsl(189 100% 70% / 0.18) 0%, transparent 45%),
            radial-gradient(ellipse 300px 200px at 70% 40%, hsl(189 100% 65% / 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 250px 350px at 50% 30%, hsl(189 100% 75% / 0.12) 0%, transparent 55%)
          `,
          mixBlendMode: "screen",
          willChange: "transform",
        }}
        animate={{
          scale: [1, 1.25, 1],
          rotate: [0, 12, 0],
          x: [0, 25, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Secondary caustic layer for depth */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 400px 300px at 60% 50%, hsl(189 100% 60% / 0.1) 0%, transparent 60%)
          `,
          mixBlendMode: "overlay",
          willChange: "transform",
        }}
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, -8, 0],
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </motion.div>
  );
};

export default OceanSurface;

