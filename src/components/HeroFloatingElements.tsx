import { motion, useTransform } from "framer-motion";
import { useDepth } from "@/context/DepthProvider";

const HeroFloatingElements = () => {
  const { depth } = useDepth();
  const opacity = useTransform(depth, [0, 0.2], [1, 0]);

  // Jellyfish-like floating elements
  const jellyfish = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    left: 15 + i * 35,
    delay: i * 2,
    size: 40 + Math.random() * 30,
  }));

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ opacity }}
    >
      {jellyfish.map((jelly) => (
        <motion.div
          key={jelly.id}
          className="absolute"
          style={{
            left: `${jelly.left}%`,
            top: "20%",
            width: `${jelly.size}px`,
            height: `${jelly.size * 1.2}px`,
            willChange: "transform",
          }}
          initial={{
            y: 0,
            x: 0,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: jelly.delay,
          }}
        >
          {/* Jellyfish body */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 120"
            className="opacity-30"
          >
            {/* Bell/umbrella */}
            <ellipse
              cx="50"
              cy="40"
              rx="45"
              ry="35"
              fill="hsl(189 100% 60% / 0.2)"
              stroke="hsl(189 100% 70% / 0.3)"
              strokeWidth="1"
            />
            {/* Tentacles */}
            {Array.from({ length: 6 }, (_, i) => {
              const x1 = 50 + (i - 2.5) * 8;
              const x2 = 50 + (i - 2.5) * 8 + Math.sin(i) * 5;
              return (
                <motion.path
                  key={i}
                  d={`M ${x1} 75 Q ${x1 + Math.sin(i) * 2} 100, ${x2} 120`}
                  stroke="hsl(189 100% 65% / 0.3)"
                  strokeWidth="1.5"
                  fill="none"
                  animate={{
                    d: [
                      `M ${x1} 75 Q ${x1 + Math.sin(i) * 2} 100, ${x2} 120`,
                      `M ${x1} 75 Q ${x1 + Math.sin(i) * 5} 100, ${x2 + Math.sin(i) * 3} 120`,
                      `M ${x1} 75 Q ${x1 + Math.sin(i) * 2} 100, ${x2} 120`,
                    ],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              );
            })}
            {/* Glow effect */}
            <ellipse
              cx="50"
              cy="40"
              rx="35"
              ry="25"
              fill="hsl(189 100% 70% / 0.1)"
              filter="blur(8px)"
            />
          </svg>
        </motion.div>
      ))}

      {/* Floating sea plants */}
      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={`plant-${i}`}
          className="absolute bottom-0"
          style={{
            left: `${10 + i * 25}%`,
            width: "30px",
            height: "150px",
            willChange: "transform",
          }}
          initial={{ rotateZ: 0 }}
          animate={{
            rotateZ: [0, 3, -3, 0],
            scaleY: [1, 1.05, 1],
          }}
          transition={{
            duration: 6 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 30 150" className="opacity-20">
            <path
              d={`M 15 150 
                Q ${10 + Math.random() * 10} 100, ${15 + Math.random() * 5} 80
                Q ${20 - Math.random() * 10} 60, ${15 + Math.random() * 5} 40
                Q ${10 + Math.random() * 10} 20, 15 0`}
              stroke="hsl(189 100% 50%)"
              strokeWidth="2"
              fill="hsl(189 100% 40% / 0.1)"
            />
          </svg>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default HeroFloatingElements;

