import { motion } from "framer-motion";
import { useDepth } from "@/context/DepthProvider";
import { useTransform } from "framer-motion";

interface Bubble {
  id: number;
  size: number;
  startX: number;
  duration: number;
  delay: number;
}

const HeroBubbles = () => {
  const { depth } = useDepth();
  const opacity = useTransform(depth, [0, 0.3], [1, 0]);

  // Generate bubbles with varying sizes and positions
  const bubbles: Bubble[] = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 40 + 20,
    startX: Math.random() * 100,
    duration: Math.random() * 8 + 12,
    delay: Math.random() * 5,
  }));

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ opacity }}
    >
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${bubble.startX}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            // Realistic bubble with gradient and border
            background: `radial-gradient(circle at 30% 30%, 
              hsl(189 100% 90% / 0.4) 0%, 
              hsl(189 100% 70% / 0.2) 50%, 
              transparent 100%)`,
            border: `1px solid hsl(189 100% 80% / 0.3)`,
            boxShadow: `
              inset -2px -2px 4px hsl(189 100% 90% / 0.3),
              0 0 8px hsl(189 100% 70% / 0.2)
            `,
            willChange: "transform",
          }}
          initial={{
            y: 0,
            x: 0,
            scale: 0.8,
            opacity: 0,
          }}
          animate={{
            y: -window.innerHeight - 100,
            x: [0, Math.random() * 60 - 30, Math.random() * 60 - 30],
            scale: [0.8, 1.2, 1.5],
            opacity: [0, 0.6, 0.3, 0],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "easeOut",
          }}
        >
          {/* Bubble highlight */}
          <div
            className="absolute top-[20%] left-[20%] w-[30%] h-[30%] rounded-full"
            style={{
              background: "hsl(189 100% 100% / 0.6)",
              filter: "blur(2px)",
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default HeroBubbles;

