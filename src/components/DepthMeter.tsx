import { motion, useScroll, useTransform } from "framer-motion";

const DepthMeter = () => {
  const { scrollYProgress } = useScroll();
  const depth = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4">
      {/* Depth line */}
      <div className="relative w-0.5 h-64 bg-border rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-primary to-accent"
          style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
        />
      </div>

      {/* Depth indicator */}
      <motion.div className="flex flex-col items-center gap-1">
        <motion.span className="text-xs font-mono text-primary">
          {depth.get().toFixed(0)}m
        </motion.span>
        <span className="text-[10px] text-muted-foreground">DEPTH</span>
      </motion.div>
    </div>
  );
};

export default DepthMeter;
