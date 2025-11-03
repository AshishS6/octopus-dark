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
            An Essential Aspect of{" "}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent relative inline-block"
              style={{
                transform: `translateZ(${useTransform(depth, [0, 0.3], [0, -75])}px)`,
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              Creativity
              {/* Octopus icon with 3D effect */}
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2"
                style={{
                  transform: `translateZ(${useTransform(depth, [0, 0.3], [0, -100])}px)`,
                }}
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  className="text-primary"
                >
                  <circle cx="20" cy="15" r="8" fill="currentColor" opacity="0.8" />
                  <circle cx="15" cy="12" r="2" fill="hsl(6 93% 71%)" />
                  <circle cx="25" cy="12" r="2" fill="hsl(6 93% 71%)" />
                  {[...Array(8)].map((_, i) => (
                    <motion.line
                      key={i}
                      x1={20}
                      y1={23}
                      x2={20 + Math.cos((i * Math.PI) / 4) * 6}
                      y2={23 + Math.sin((i * Math.PI) / 4) * 6}
                      stroke="currentColor"
                      strokeWidth="2"
                      opacity="0.6"
                      animate={{
                        pathLength: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </svg>
              </motion.div>
            </motion.span>{" "}
            is Not Being Afraid to Fail
          </motion.h1>

          {/* Subheadline with parallax */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto"
            style={{
              transform: `translateZ(${useTransform(depth, [0, 0.3], [0, -15])}px)`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Transform your brand with innovative digital solutions. We create compelling experiences that connect, engage, and inspire.
          </motion.p>

          {/* CTAs with 3D hover effects */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{
              transform: `translateZ(${useTransform(depth, [0, 0.3], [0, -40])}px)`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
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
          </motion.div>

          {/* Stats with 3D counter effect */}
          <motion.div
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16"
            style={{
              transform: `translateZ(${useTransform(depth, [0, 0.3], [0, -25])}px)`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {[
              { number: "150+", label: "Projects Delivered" },
              { number: "50+", label: "Happy Clients" },
              { number: "5+", label: "Years Experience" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className={`text-center ${i === 1 ? "border-x border-border" : ""}`}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 1 + i * 0.1,
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
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
