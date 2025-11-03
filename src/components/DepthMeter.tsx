import { motion, useTransform, useMotionValueEvent } from "framer-motion";
import { useDepth } from "@/context/DepthProvider";
import { useState } from "react";

const DepthMeter = () => {
  const { depth, scrollYProgress } = useDepth();
  const [depthValue, setDepthValue] = useState(0);

  // Transform depth to meters (0 = surface, 1 = 100m deep)
  const depthMeters = useTransform(depth, [0, 1], [0, 100]);
  
  // Subscribe to depth changes for display
  useMotionValueEvent(depth, "change", (latest) => {
    setDepthValue(latest);
  });

  // Depth zones
  const getZone = (d: number) => {
    if (d < 0.33) return "SURFACE";
    if (d < 0.66) return "MID-DEPTH";
    return "DEEP OCEAN";
  };

  // Color changes with depth
  const indicatorColor = useTransform(
    depth,
    [0, 0.5, 1],
    ["hsl(189 100% 55%)", "hsl(189 85% 45%)", "hsl(189 70% 35%)"]
  );

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4">
      {/* Depth line with gradient */}
      <div className="relative w-1 h-64 bg-border/30 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          className="absolute top-0 left-0 w-full rounded-full"
          style={{
            height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
            background: useTransform(
              depth,
              [0, 0.5, 1],
              [
                "linear-gradient(to bottom, hsl(189 100% 55%) 0%, hsl(189 85% 45%) 50%, hsl(189 70% 35%) 100%)",
                "linear-gradient(to bottom, hsl(189 85% 45%) 0%, hsl(189 70% 40%) 50%, hsl(189 60% 30%) 100%)",
                "linear-gradient(to bottom, hsl(189 70% 35%) 0%, hsl(189 60% 30%) 50%, hsl(220 50% 15%) 100%)",
              ]
            ),
            boxShadow: useTransform(
              depth,
              [0, 0.5, 1],
              [
                "0 0 10px hsl(189 100% 55% / 0.5)",
                "0 0 15px hsl(189 85% 45% / 0.6)",
                "0 0 20px hsl(189 70% 35% / 0.7)",
              ]
            ),
          }}
        />
        
        {/* Depth markers */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between py-2">
          {[0, 25, 50, 75, 100].map((mark) => (
            <div
              key={mark}
              className="w-2 h-0.5 bg-foreground/20 rounded-full"
              style={{
                marginLeft: "-2px",
              }}
            />
          ))}
        </div>
      </div>

      {/* Depth indicator */}
      <motion.div
        className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg bg-background/50 backdrop-blur-sm border border-border/30"
        style={{
          borderColor: indicatorColor,
        }}
      >
        <motion.span
          className="text-lg font-mono font-bold"
          style={{
            color: indicatorColor,
          }}
        >
          {(depthValue * 100).toFixed(0)}m
        </motion.span>
        <motion.span
          className="text-[10px] uppercase tracking-wider font-medium"
          style={{
            color: indicatorColor,
            opacity: 0.8,
          }}
        >
          {getZone(depthValue)}
        </motion.span>
      </motion.div>
    </div>
  );
};

export default DepthMeter;
