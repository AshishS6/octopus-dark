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
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-background"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Animated Grain Overlay for Texture */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05] mix-blend-screen pointer-events-none animate-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Premium Minimalist Background Pulse Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div
          className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full animate-pulse-glow"
          style={{
            background: "radial-gradient(circle, hsl(0 0% 100% / 0.08), transparent 70%)",
            filter: "blur(80px)",
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
          <div className="text-mask mb-8 inline-block">
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md animate-mask-up"
              style={{
                transform: `translateZ(${useTransform(depth, [0, 0.3], [0, -10])}px)`,
                animationDelay: "0.1s"
              }}
            >
              <Sparkles className="w-4 h-4 text-white/50" />
              <span className="text-xs font-medium tracking-[0.2em] text-white/80 uppercase">
                Premium Digital Agency
              </span>
            </motion.div>
          </div>

          {/* Headline with Mask Effect */}
          <h1
            className="text-6xl md:text-8xl lg:text-[7.5rem] font-heading font-medium mb-8 leading-[1.02] tracking-tighter text-white"
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            <span className="text-mask inline-block pb-2">
              <span className="animate-mask-up block" style={{ animationDelay: "0.3s" }}>
                Digital Excellence,
              </span>
            </span>
            <br />
            <span className="text-mask inline-block">
              <span className="animate-mask-up block text-white/50" style={{ animationDelay: "0.45s" }}>
                Engineered.
              </span>
            </span>
          </h1>

          {/* Dynamic Subheadline */}
          <div className="text-mask mb-14 inline-block">
            <div className="h-8 md:h-12 overflow-hidden relative animate-mask-up" style={{ animationDelay: "0.6s" }}>
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
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-float-subtle">
        <motion.div
          style={{
            opacity: useTransform(depth, [0, 0.1], [1, 0]),
          }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
          <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-1/2 bg-white/50"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
