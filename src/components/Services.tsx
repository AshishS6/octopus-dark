import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  {
    number: "01",
    title: "Brand Identity",
    shortDesc: "Visual languages that own a corner of the mind.",
    description:
      "We build authoritative brand systems — from core messaging and visual language to guidelines that scale across every touchpoint. Logos anyone can recognise, systems every team can use.",
    tags: ["Strategy", "Identity", "Guidelines"],
  },
  {
    number: "02",
    title: "Web Development",
    shortDesc: "Production-grade, performant, built to outlast the brief.",
    description:
      "Robust, scalable digital products engineered for speed, security, and exceptional UX. We write code that's maintainable, tested, and built with the same obsession we bring to design.",
    tags: ["Next.js", "React", "Performance"],
  },
  {
    number: "03",
    title: "Motion & Interaction",
    shortDesc: "The unseen details that compound into something stunning.",
    description:
      "Interfaces feel right when a thousand barely audible voices all sing in tune. We design and build interactions that create that feeling — from micro-animations to full motion systems.",
    tags: ["Animation", "UX", "Framer Motion"],
  },
  {
    number: "04",
    title: "Strategy & Direction",
    shortDesc: "We ask the questions clients didn't know to ask.",
    description:
      "Every project starts with diagnosis, not prescription. We align on what success actually looks like, then shape the scope and sequencing to get there efficiently.",
    tags: ["Research", "Direction", "Positioning"],
  },
  {
    number: "05",
    title: "Digital Campaigns",
    shortDesc: "Precision-targeted. ROI-obsessed.",
    description:
      "Data-driven advertising strategies built to acquire users, enhance lifetime value, and maximise return on spend. We track what matters and cut what doesn't.",
    tags: ["Performance", "Paid Media", "Analytics"],
  },
];

const EXPO = [0.16, 1, 0.3, 1] as const;

const Services = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="services" ref={sectionRef} className="py-32 md:py-44 relative bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-20 border-b border-white/6 pb-12">
          <div>
            <div className="overflow-hidden mb-5">
              <motion.span
                className="font-mono text-[11px] text-white/25 uppercase tracking-[0.25em] block"
                initial={prefersReducedMotion ? {} : { y: "110%", opacity: 0 }}
                animate={inView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: EXPO }}
              >
                Disciplines
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-[clamp(2rem,5vw,3.5rem)] font-normal text-white leading-tight"
                initial={prefersReducedMotion ? {} : { y: "108%", opacity: 0 }}
                animate={inView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.06, ease: EXPO }}
              >
                What we do.
              </motion.h2>
            </div>
          </div>
          <motion.p
            className="text-white/35 font-light text-sm max-w-xs text-right hidden lg:block"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Hover or tap a discipline to learn more.
          </motion.p>
        </div>

        {/* Service rows */}
        <div className="divide-y divide-white/[0.06]">
          {SERVICES.map((service, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={service.number}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 + i * 0.07, ease: EXPO }}
              >
                {/* Row header — hover on desktop, click on mobile */}
                <button
                  className="w-full text-left group"
                  onClick={() => toggle(i)}
                  onMouseEnter={() => setOpenIndex(i)}
                  onMouseLeave={() => setOpenIndex(null)}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-6 md:gap-10 py-7 md:py-8">
                    {/* Number */}
                    <span className="font-mono text-[11px] text-white/20 tabular-nums w-7 shrink-0">
                      {service.number}
                    </span>

                    {/* Title + short desc */}
                    <div className="flex-1 flex flex-col md:flex-row md:items-baseline gap-1 md:gap-8">
                      <span
                        className="font-display text-[clamp(1.5rem,4vw,2.8rem)] font-normal leading-tight text-white/65 group-hover:text-white"
                        style={{ transition: "color 200ms ease-out" }}
                      >
                        {service.title}
                      </span>
                      <span className="text-sm text-white/25 font-light hidden md:block">
                        {service.shortDesc}
                      </span>
                    </div>

                    {/* Arrow */}
                    <ArrowRight
                      className="w-5 h-5 text-white/15 shrink-0"
                      style={{
                        transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                        color: isOpen ? "hsl(var(--electric))" : undefined,
                        transition: "transform 250ms cubic-bezier(0.16, 1, 0.3, 1), color 200ms ease-out",
                      }}
                    />
                  </div>
                </button>

                {/* Expandable description */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.2, ease: "easeOut" },
                      }}
                      className="overflow-hidden"
                      onMouseEnter={() => setOpenIndex(i)}
                      onMouseLeave={() => setOpenIndex(null)}
                    >
                      <div className="pl-[4.75rem] pb-8 grid md:grid-cols-[1fr_auto] gap-6 items-end">
                        <p className="text-white/45 font-light text-base md:text-lg leading-relaxed max-w-xl">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[10px] text-white/25 border border-white/8 rounded-full px-3 py-1 uppercase tracking-widest"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Footer link */}
        <motion.div
          className="mt-14 flex items-center gap-3"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        >
          <a
            href="/services"
            className="group inline-flex items-center gap-2 text-sm text-white/35 hover:text-white/70"
            style={{ transition: "color 200ms ease-out" }}
          >
            Explore all services
            <ArrowRight
              className="w-3.5 h-3.5 group-hover:translate-x-0.5"
              style={{ transition: "transform 200ms ease-out" }}
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
