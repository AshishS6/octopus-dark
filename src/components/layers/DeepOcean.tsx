import { motion, useTransform } from "framer-motion";
import { useDepth } from "@/context/DepthProvider";

interface DeepOceanProps {
  className?: string;
}

const DeepOcean = ({ className = "" }: DeepOceanProps) => {
  const { depth } = useDepth();

  // Deep layer becomes visible as we go deeper
  const opacity = useTransform(depth, [0.6, 0.8, 1], [0, 0.8, 1]);
  const translateY = useTransform(depth, [0, 1], [0, 150]);
  const blur = useTransform(depth, [0.6, 1], [0, 8]);

  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      style={{
        opacity,
        y: translateY,
        filter: `blur(${blur}px)`,
      }}
    >
      {/* Bioluminescent particles/glows */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`bio-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              background: `radial-gradient(circle, hsl(189 100% 60% / 0.6) 0%, transparent 70%)`,
              boxShadow: `0 0 ${Math.random() * 15 + 10}px hsl(189 100% 60% / 0.4)`,
            }}
            animate={{
              opacity: [0.3, 0.9, 0.3],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Deep ocean gradient - darker, more mysterious */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, hsl(189 100% 30% / 0.15) 0%, transparent 60%),
            radial-gradient(circle at 80% 70%, hsl(189 85% 20% / 0.2) 0%, transparent 65%),
            linear-gradient(
              to bottom,
              transparent 0%,
              hsl(220 50% 8% / 0.3) 50%,
              hsl(220 60% 5% / 0.5) 100%
            )
          `,
        }}
      />

      {/* Deep ocean creatures - slower, more mysterious */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`deep-creature-${i}`}
            className="absolute"
            style={{
              top: `${40 + i * 20}%`,
            }}
            animate={{
              x: [-200, window.innerWidth + 200],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: Math.random() * 40 + 35,
              repeat: Infinity,
              delay: Math.random() * 20,
              ease: "linear",
            }}
          >
            <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
              <ellipse
                cx="40"
                cy="20"
                rx="35"
                ry="18"
                fill="hsl(189 100% 40% / 0.2)"
                stroke="hsl(189 100% 50% / 0.4)"
                strokeWidth="1.5"
              />
              <circle
                cx="30"
                cy="18"
                r="3"
                fill="hsl(189 100% 60% / 0.6)"
              />
              <circle
                cx="50"
                cy="18"
                r="3"
                fill="hsl(189 100% 60% / 0.6)"
              />
            </svg>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DeepOcean;

