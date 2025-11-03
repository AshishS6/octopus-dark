import { motion, useTransform } from "framer-motion";
import { useDepth } from "@/context/DepthProvider";

interface MidOceanProps {
  className?: string;
}

const MidOcean = ({ className = "" }: MidOceanProps) => {
  const { depth } = useDepth();

  // Mid layer is visible in the middle depth range
  const opacity = useTransform(depth, [0.2, 0.5, 0.8], [0, 1, 0]);
  const translateY = useTransform(depth, [0, 1], [0, 100]);
  const blur = useTransform(depth, [0.2, 0.5], [0, 5]);

  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      style={{
        opacity,
        y: translateY,
        filter: `blur(${blur}px)`,
      }}
    >
      {/* Coral and plants */}
      <div className="absolute bottom-0 left-0 right-0 h-96">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`coral-${i}`}
            className="absolute bottom-0"
            style={{
              left: `${i * 12.5}%`,
              width: `${Math.random() * 60 + 50}px`,
              height: `${Math.random() * 150 + 100}px`,
            }}
            animate={{
              scaleY: [1, 1.08, 1],
              rotateZ: [0, Math.random() * 3 - 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 200"
              fill="none"
              className="opacity-40"
            >
              <path
                d={`M 50 200 
                  Q ${30 + Math.random() * 20} 150, ${40 + Math.random() * 20} 120
                  Q ${50 + Math.random() * 20} 90, ${45 + Math.random() * 20} 60
                  Q ${55 + Math.random() * 20} 30, 50 0`}
                stroke="hsl(189 100% 45%)"
                strokeWidth="2"
                fill="hsl(189 100% 35% / 0.2)"
              />
              <path
                d={`M 50 120 Q ${60 + Math.random() * 15} 100, 50 80`}
                stroke="hsl(189 100% 50%)"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Mid-depth fish - swimming horizontally */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`mid-fish-${i}`}
            className="absolute"
            style={{
              top: `${30 + i * 20}%`,
            }}
            animate={{
              x: [-150, window.innerWidth + 150],
            }}
            transition={{
              duration: Math.random() * 25 + 20,
              repeat: Infinity,
              delay: Math.random() * 15,
              ease: "linear",
            }}
          >
            <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
              <path
                d="M0 15 Q15 5, 30 15 Q45 25, 60 15 L55 15 Q40 18, 25 15 Q10 12, 5 15 Z"
                fill="hsl(189 100% 50% / 0.3)"
                stroke="hsl(189 100% 55% / 0.5)"
                strokeWidth="1"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Gradient overlay for mid depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom,
            transparent 0%,
            hsl(189 100% 35% / 0.1) 50%,
            hsl(189 85% 25% / 0.2) 100%
          )`,
        }}
      />
    </motion.div>
  );
};

export default MidOcean;

