import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const STATS = [
  { value: "150+", label: "Projects Delivered" },
  { value: "7", label: "Years of Practice" },
  { value: "99%", label: "Client Retention" },
];

const EXPO = [0.16, 1, 0.3, 1] as const;

// Reusable scroll-triggered line reveal
const RevealLine = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={prefersReducedMotion ? {} : { y: "108%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: 0.85, delay, ease: EXPO }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const WhoWeAre = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" className="py-32 md:py-44 relative bg-background overflow-hidden">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: "5rem 5rem",
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-[1fr_260px] gap-16 lg:gap-20 items-start">

          {/* Manifesto — left */}
          <div className="max-w-3xl">
            {/* Section label */}
            <RevealLine className="mb-10">
              <span className="font-mono text-[11px] text-white/25 uppercase tracking-[0.25em]">
                Studio
              </span>
            </RevealLine>

            {/* First statement */}
            <div className="space-y-0">
              <RevealLine delay={0.05}>
                <p className="font-display text-[clamp(2rem,5.5vw,4rem)] font-normal leading-[1.1] text-white/85">
                  In a world where everyone's
                </p>
              </RevealLine>
              <RevealLine delay={0.11}>
                <p className="font-display text-[clamp(2rem,5.5vw,4rem)] font-normal leading-[1.1] text-white/85">
                  software is good enough —
                </p>
              </RevealLine>
            </div>

            {/* Pause / divider */}
            <div className="my-8 overflow-hidden">
              <motion.div
                className="h-[1px] bg-white/10"
                initial={prefersReducedMotion ? {} : { scaleX: 0, transformOrigin: "left" }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: EXPO }}
              />
            </div>

            {/* Punchline */}
            <RevealLine delay={0.08}>
              <p className="font-display italic text-[clamp(2.2rem,6vw,4.5rem)] font-normal leading-[1.08] text-white">
                Taste is the differentiator.
              </p>
            </RevealLine>

            {/* Body */}
            <motion.div
              className="mt-10 space-y-4 max-w-xl"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: EXPO }}
            >
              <p className="text-white/45 font-light text-lg leading-relaxed">
                We're a design and development studio that builds things people love —
                not just things that work.
              </p>
              <p className="text-white/35 font-light text-base leading-relaxed">
                Every project starts with the uncomfortable question: what does this
                actually need to do? From that answer, we design, engineer, and
                ship with uncompromising precision.
              </p>
            </motion.div>
          </div>

          {/* Stats — right */}
          <div ref={statsRef} className="lg:pt-20 space-y-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                className="border-b border-white/6 pb-8 last:border-0"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.1,
                  ease: EXPO,
                }}
              >
                <div className="font-display text-[3.5rem] font-normal text-white leading-none mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-white/30 uppercase tracking-[0.2em] font-light">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
