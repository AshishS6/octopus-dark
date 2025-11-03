import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const OceanBackground = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to color values
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.3, 0.5, 0.7, 0.9]);
  const lightRayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.2, 0]);
  const bubbleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Light rays from surface */}
      <motion.div 
        className="absolute inset-0"
        style={{ opacity: lightRayOpacity }}
      >
        <div className="absolute top-0 left-1/4 w-32 h-full bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-xl animate-float" />
        <div className="absolute top-0 right-1/3 w-24 h-full bg-gradient-to-b from-primary/15 via-primary/3 to-transparent blur-xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-0 left-2/3 w-28 h-full bg-gradient-to-b from-primary/10 via-primary/2 to-transparent blur-xl animate-float" style={{ animationDelay: "4s" }} />
      </motion.div>

      {/* Floating bubbles */}
      <motion.div 
        className="absolute inset-0"
        style={{ opacity: bubbleOpacity }}
      >
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10 border border-primary/20"
            style={{
              width: Math.random() * 20 + 10,
              height: Math.random() * 20 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, -200],
              x: [0, Math.random() * 50 - 25, Math.random() * 50 - 25],
              opacity: [0.3, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Floating particles - plankton */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Fish silhouettes */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`fish-${i}`}
            className="absolute"
            style={{
              top: `${20 + i * 15}%`,
            }}
            animate={{
              x: [-100, window.innerWidth + 100],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear",
            }}
          >
            <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
              <path
                d="M0 10 Q10 5, 20 10 Q30 15, 40 10 L35 10 Q30 12, 25 10 Q15 8, 5 10 Z"
                fill="hsl(var(--primary))"
                opacity="0.2"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Coral/plant silhouettes at bottom */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-64"
        style={{ opacity: backgroundOpacity }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`coral-${i}`}
            className="absolute bottom-0 bg-gradient-to-t from-primary/20 to-transparent"
            style={{
              left: `${i * 8.33}%`,
              width: `${Math.random() * 60 + 40}px`,
              height: `${Math.random() * 120 + 80}px`,
              clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
            }}
            animate={{
              scaleY: [1, 1.05, 1],
              rotateZ: [0, Math.random() * 2 - 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Caustics effect */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: "radial-gradient(circle at 30% 20%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 70% 60%, hsl(var(--primary)) 0%, transparent 50%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default OceanBackground;
