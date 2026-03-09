import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useTransform } from "framer-motion";
import { useDepth } from "@/context/DepthProvider";

const Hero = () => {
  const { depth } = useDepth();

  // Subtle 3D transforms based on scroll depth
  const textTranslateZ = useTransform(depth, [0, 0.3], [0, -20]);
  const textOpacity = useTransform(depth, [0, 0.3], [1, 0.4]);
  const parallaxY = useTransform(depth, [0, 0.3], [0, 50]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Premium Minimalist Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <motion.div
          className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(0 0% 100% / 0.1), transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content with 3D Effects */}
      <motion.div
        className="relative z-10 container mx-auto px-6 lg:px-12 pt-20"
        style={{
          y: parallaxY,
          opacity: textOpacity,
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8 backdrop-blur-md"
            style={{
              transform: `translateZ(${useTransform(depth, [0, 0.3], [0, -10])}px)`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Sparkles className="w-4 h-4 text-white/70" />
            <span className="text-sm font-medium tracking-wide text-white/90 uppercase">
              Premium Digital Agency
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-6xl md:text-8xl lg:text-[7rem] font-heading font-medium mb-6 leading-[1.05] tracking-tight text-white"
            style={{
              transform: `translateZ(${textTranslateZ}px)`,
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Digital Excellence,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 inline-block">
              Engineered.
            </span>
          </motion.h1>

          {/* Dynamic Subheadline */}
          <div className="h-8 md:h-12 mb-12 overflow-hidden relative">
            <motion.div
              animate={{ y: [0, -48, -96, 0] }}
              transition={{ duration: 9, repeat: Infinity, times: [0, 0.33, 0.66, 1], ease: "circIn" }}
              className="flex flex-col items-center"
            >
              <p className="text-xl md:text-2xl text-white/60 font-light h-12 flex items-center">Crafting brands that dominate.</p>
              <p className="text-xl md:text-2xl text-white/60 font-light h-12 flex items-center">Building experiences that scale.</p>
              <p className="text-xl md:text-2xl text-white/60 font-light h-12 flex items-center">Designing the future of web.</p>
            </motion.div>
          </div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            style={{
              transform: `translateZ(${useTransform(depth, [0, 0.3], [0, -15])}px)`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-white/50 to-white/20 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <Button
                size="lg"
                className="relative bg-white text-black hover:bg-white/90 px-8 py-6 rounded-full text-lg font-medium"
              >
                <span>Start Your Project</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 hover:bg-white/10 hover:text-white px-8 py-6 rounded-full text-lg font-medium backdrop-blur-sm"
              >
                View Our Work
              </Button>
            </motion.div>
          </motion.div>

          {/* Micro Proof & Stats */}
          <motion.div
            className="mt-24 pt-10 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {[
              { label: "Projects Delivered", value: "150+" },
              { label: "Client Satisfaction", value: "99%" },
              { label: "Global Partners", value: "50+" },
              { label: "Industry Awards", value: "12" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-heading font-medium text-white mb-2">{stat.value}</div>
                <div className="text-sm text-white/50 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={{
          opacity: useTransform(depth, [0, 0.2], [1, 0]),
        }}
      >
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5 backdrop-blur-sm">
          <motion.div
            className="w-1 h-2 bg-white/60 rounded-full"
            animate={{
              y: [0, 10, 0],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
