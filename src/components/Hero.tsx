import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, X } from "lucide-react";
import { Link } from "react-router-dom";

// Pexels: "Time Lapse of Working in Home" by Sandrin
const REEL_VIDEO_SRC = "https://videos.pexels.com/video-files/12913395/12913395-uhd_1440_2560_30fps.mp4";

const MARQUEE_ITEMS = [
  "Design", "Development", "Strategy", "Branding",
  "Motion", "Web Apps", "Systems", "Identity",
  "Design", "Development", "Strategy", "Branding",
  "Motion", "Web Apps", "Systems", "Identity",
];

const HEADLINE_LINES = ["We design", "and build things", "people love."];

// Strong expo ease — more intentional than CSS defaults
const EXPO = [0.16, 1, 0.3, 1] as const;

// Full-screen video modal
const VideoModal = ({ src, onClose }: { src: string; onClose: () => void }) => (
  <AnimatePresence>
    <motion.div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-5xl mx-4"
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <video
          src={src}
          className="w-full rounded-xl"
          autoPlay
          controls
          style={{ maxHeight: "80vh" }}
        />
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/60 hover:text-white flex items-center gap-1.5 text-sm"
          style={{ transition: "color 200ms ease-out" }}
        >
          <X className="w-4 h-4" /> Close
        </button>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [modalOpen, setModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll-driven parallax — only when motion is OK
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // Spring-based mouse tracking for the reel card (decorative — right place for springs)
  const rawX = useSpring(0, { stiffness: 120, damping: 28 });
  const rawY = useSpring(0, { stiffness: 120, damping: 28 });
  const reelRotateX = useTransform(rawY, [-0.5, 0.5], [5, -5]);
  const reelRotateY = useTransform(rawX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !reelRef.current) return;
    const rect = reelRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    rawY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-[100dvh] w-full flex flex-col overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient background video */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ opacity: 0.18 }}
            src={REEL_VIDEO_SRC}
          />
          {/* Gradient overlays to blend edges and keep text readable */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 60% 40%, transparent 20%, hsl(0 0% 2%) 75%), linear-gradient(to bottom, hsl(0 0% 2% / 0.6) 0%, transparent 30%, transparent 70%, hsl(0 0% 2%) 100%)",
            }}
          />
        </div>
      )}

      {/* Grain texture */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 flex-1 flex items-center"
        style={
          prefersReducedMotion
            ? {}
            : { y: contentY, opacity: contentOpacity, willChange: "transform, opacity" }
        }
      >
        <div className="container mx-auto px-6 lg:px-12 pt-28 pb-20">
          <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px] gap-16 lg:gap-12 items-start">

            {/* Left: Headline block */}
            <div className="space-y-10">
              {/* Display headline — DM Serif Display */}
              <h1 className="font-display font-normal text-[clamp(3.2rem,8.5vw,7.5rem)] leading-[1.02] tracking-[-0.01em] text-white">
                {HEADLINE_LINES.map((line, i) => (
                  <span key={i} className="block overflow-hidden">
                    <motion.span
                      className="block"
                      initial={prefersReducedMotion ? {} : { y: "110%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{
                        duration: 0.9,
                        delay: 0.25 + i * 0.11,
                        ease: EXPO,
                      }}
                    >
                      {i === 2 ? (
                        <>
                          people{" "}
                          <span className="text-white/30 italic">love.</span>
                        </>
                      ) : (
                        line
                      )}
                    </motion.span>
                  </span>
                ))}
              </h1>

              {/* Sub-label */}
              <motion.div
                className="space-y-1 pl-1"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.62, ease: EXPO }}
              >
                <p className="text-white/50 text-base md:text-lg font-light tracking-[0.02em]">
                  Design + development studio
                </p>
                <p className="text-white/25 text-sm font-light tracking-[0.02em]">
                  Based globally. Built precisely.
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div
                className="flex flex-wrap items-center gap-5 pl-1"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.75, ease: EXPO }}
              >
                <motion.div whileTap={{ scale: 0.97 }} style={{ transition: "transform 160ms ease-out" }}>
                  <Link
                    to="/start-project"
                    className="group inline-flex items-center gap-2.5 bg-white text-black px-7 py-3.5 rounded-full text-sm font-medium"
                    style={{ transition: "background-color 200ms ease-out" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.88)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
                  >
                    Start a Project
                    <ArrowRight
                      className="w-3.5 h-3.5"
                      style={{ transition: "transform 200ms ease-out" }}
                      onMouseEnter={(e) => ((e.currentTarget as SVGElement).style.transform = "translateX(2px)")}
                    />
                  </Link>
                </motion.div>

                <Link
                  to="/work"
                  className="text-sm text-white/40 hover:text-white/80 underline underline-offset-4 decoration-white/15 hover:decoration-white/40"
                  style={{ transition: "color 200ms ease-out, text-decoration-color 200ms ease-out" }}
                >
                  View our work
                </Link>
              </motion.div>
            </div>

            {/* Right: Reel card — spring-tracked 3D tilt */}
            <motion.div
              ref={reelRef}
              className="hidden lg:block mt-4 self-start"
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05, ease: EXPO }}
              style={
                prefersReducedMotion
                  ? {}
                  : {
                      rotateX: reelRotateX,
                      rotateY: reelRotateY,
                      transformStyle: "preserve-3d",
                      transformPerspective: 800,
                    }
              }
            >
              <div
                data-cursor="view"
                data-cursor-label="Play"
                onClick={() => setModalOpen(true)}
                className="w-full aspect-square rounded-2xl border border-white/8 bg-white/[0.025] backdrop-blur-xl overflow-hidden relative cursor-pointer group"
              >
                {/* Looping silent video preview inside the card */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-40 group-hover:opacity-55 transition-opacity duration-500"
                  src={REEL_VIDEO_SRC}
                />

                {/* Abstract background pattern */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at 30% 40%, hsl(0 0% 16% / 0.8), transparent 60%), radial-gradient(ellipse at 70% 70%, hsl(0 0% 10% / 0.6), transparent 50%)",
                  }}
                />

                {/* Corner label */}
                <div className="absolute top-5 left-5 font-mono text-[10px] text-white/20 uppercase tracking-widest">
                  Reel 2025
                </div>

                {/* Top-right year */}
                <div className="absolute top-5 right-5 font-mono text-[10px] text-white/15 uppercase tracking-widest">
                  01 / 01
                </div>

                {/* Play button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div
                    className="w-14 h-14 rounded-full border border-white/15 bg-white/5 flex items-center justify-center group-hover:border-white/35 group-hover:bg-white/10"
                    style={{ transition: "border-color 250ms ease-out, background-color 250ms ease-out" }}
                  >
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  </div>
                  <div className="text-center">
                    <div className="text-[11px] text-white/25 uppercase tracking-[0.2em] mb-1">Studio Reel</div>
                    <div className="text-sm text-white/45 font-light">3 min 24 sec</div>
                  </div>
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, hsl(0 0% 100% / 0.04), transparent 65%)",
                    transition: "opacity 400ms ease-out",
                  }}
                />

                {/* Electric accent line at bottom */}
                <div
                  className="absolute bottom-0 left-0 h-[1px] w-0 bg-electric group-hover:w-full"
                  style={{ transition: "width 400ms cubic-bezier(0.16, 1, 0.3, 1)" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom marquee strip */}
      <div className="relative z-10 border-t border-white/[0.06] overflow-hidden">
        <div className="flex py-4">
          <div className="flex shrink-0 animate-marquee">
            {MARQUEE_ITEMS.map((item, i) => (
              <span
                key={i}
                className="text-[10px] text-white/18 uppercase tracking-[0.28em] whitespace-nowrap px-6"
              >
                {item}
                <span className="ml-6 text-white/10">·</span>
              </span>
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex shrink-0 animate-marquee" aria-hidden="true">
            {MARQUEE_ITEMS.map((item, i) => (
              <span
                key={i}
                className="text-[10px] text-white/18 uppercase tracking-[0.28em] whitespace-nowrap px-6"
              >
                {item}
                <span className="ml-6 text-white/10">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-20 right-8 z-10 hidden lg:flex flex-col items-center gap-3"
        style={prefersReducedMotion ? {} : { opacity: scrollIndicatorOpacity }}
      >
        <div className="w-[1px] h-10 bg-white/10 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-white/40"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/20">Scroll</span>
      </motion.div>

      {/* Video modal */}
      {modalOpen && (
        <VideoModal src={REEL_VIDEO_SRC} onClose={() => setModalOpen(false)} />
      )}
    </section>
  );
};

export default Hero;
