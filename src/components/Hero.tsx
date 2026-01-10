import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useTransform } from "framer-motion";
import { useDepth } from "@/context/DepthProvider";
import HeroBubbles from "./HeroBubbles";
import HeroCaustics from "./HeroCaustics";
import HeroFloatingElements from "./HeroFloatingElements";

const Hero = () => {
  const { depth } = useDepth();

  // 3D transforms based on scroll depth
  const textTranslateZ = useTransform(depth, [0, 0.3], [0, -50]);
  const textOpacity = useTransform(depth, [0, 0.3], [1, 0.7]);
  const parallaxY = useTransform(depth, [0, 0.3], [0, 30]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Enhanced Ocean Surface Layer with Caustics */}
      <HeroCaustics />

      {/* Floating Bubbles */}
      <HeroBubbles />

      {/* Floating Sea Elements */}
      <HeroFloatingElements />

      {/* Enhanced Light Rays from Surface */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-32 h-full"
          style={{
            background: "linear-gradient(to bottom, hsl(189 100% 70% / 0.3), transparent)",
            filter: "blur(40px)",
            opacity: useTransform(depth, [0, 0.3], [1, 0]),
            willChange: "transform, opacity",
          }}
          animate={{
            scaleY: [1, 1.15, 1],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 right-1/3 w-24 h-full"
          style={{
            background: "linear-gradient(to bottom, hsl(189 100% 65% / 0.25), transparent)",
            filter: "blur(35px)",
            opacity: useTransform(depth, [0, 0.3], [0.8, 0]),
            willChange: "transform, opacity",
          }}
          animate={{
            scaleY: [1, 1.2, 1],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-0 left-2/3 w-28 h-full"
          style={{
            background: "linear-gradient(to bottom, hsl(189 100% 68% / 0.2), transparent)",
            filter: "blur(45px)",
            opacity: useTransform(depth, [0, 0.3], [0.6, 0]),
            willChange: "transform, opacity",
          }}
          animate={{
            scaleY: [1, 1.1, 1],
            x: [0, 25, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      {/* Animated Glow Effects - Enhanced */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(189 100% 42% / 0.15), transparent)",
            filter: "blur(100px)",
            willChange: "transform",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(6 93% 71% / 0.12), transparent)",
            filter: "blur(120px)",
            willChange: "transform",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
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
          {/* Badge with 3D effect */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-sm"
            style={{
              transform: `translateZ(${useTransform(depth, [0, 0.3], [0, -25])}px)`,
            }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Creative Digital Agency</span>
          </motion.div>

          {/* Headline with 3D Perspective */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 leading-tight"
            style={{
              transform: `translateZ(${textTranslateZ}px)`,
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
            initial={{ opacity: 0, y: 30, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Creativity That Goes{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent relative inline-block">
              Deeper
            </span>{" "}
            Than Design
          </motion.h1>

          {/* Dynamic Subheadline Rotation */}
          <div className="h-8 md:h-10 mb-10 overflow-hidden relative">
            <motion.div
              animate={{ y: [0, -40, -80, 0] }}
              transition={{ duration: 9, repeat: Infinity, times: [0, 0.33, 0.66, 1], ease: "circIn" }}
              className="flex flex-col items-center"
            >
              <p className="text-lg md:text-xl text-muted-foreground h-10 flex items-center">Branding that converts</p>
              <p className="text-lg md:text-xl text-muted-foreground h-10 flex items-center">Websites that scale startups</p>
              <p className="text-lg md:text-xl text-muted-foreground h-10 flex items-center">Campaigns that drive growth</p>
            </motion.div>
          </div>

          {/* CTAs with 3D hover effects */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={{
              transform: `translateZ(${useTransform(depth, [0, 0.3], [0, -40])}px)`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex flex-col items-center gap-6">
              <div className="flex gap-4">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Start Your Project
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    {/* Animated shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeInOut",
                      }}
                    />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary/30 hover:bg-primary/10 backdrop-blur-sm"
                  >
                    View Our Work
                  </Button>
                </motion.div>
              </div>
              {/* Micro Proof */}
              <p className="text-sm text-muted-foreground/80 font-medium">
                Trusted by 50+ brands • 150+ projects delivered
              </p>
            </div>
          </motion.div>

          {/* Stats with 3D counter effect */}
          <motion.div
            className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16 items-start"
            style={{
              transform: `translateZ(${useTransform(depth, [0, 0.3], [0, -25])}px)`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {[
              { main: "150+", sub: "projects delivered" },
              { main: "Startups", sub: "& growing brands" },
              { main: "Strategy", sub: "Design • Technology" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className={`text-center ${i === 1 ? "border-x border-border" : ""}`}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="text-lg md:text-xl font-heading font-bold text-primary mb-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 1 + i * 0.1,
                  }}
                >
                  {stat.main}
                </motion.div>
                <div className="text-xs md:text-sm text-muted-foreground px-2">{stat.sub}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Optional animated line */}
          <motion.div
            className="mt-12 text-sm text-muted-foreground/60 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            “From the surface to the deep — we build brands that last.”
          </motion.div>        </div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={{
          opacity: useTransform(depth, [0, 0.2], [1, 0]),
        }}
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2 backdrop-blur-sm">
          <motion.div
            className="w-1.5 h-3 bg-primary rounded-full"
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
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
