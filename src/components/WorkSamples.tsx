import { useRef } from "react";
import { motion, useInView, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const PROJECTS = [
  {
    number: "01",
    title: "Apex Brand Identity",
    category: "Branding",
    description: "Complete visual identity system for a Series B fintech startup.",
    year: "2025",
    // Gradient as placeholder — replace with real images later
    bg: "linear-gradient(135deg, hsl(0 0% 10%) 0%, hsl(0 0% 7%) 50%, hsl(20 8% 9%) 100%)",
    accent: "hsl(35 80% 55%)",
    slug: "apex-brand-identity",
  },
  {
    number: "02",
    title: "Nexus Commerce",
    category: "Web Development",
    description: "High-performance e-commerce platform serving 2M+ monthly users.",
    year: "2024",
    bg: "linear-gradient(135deg, hsl(220 15% 9%) 0%, hsl(220 10% 6%) 50%, hsl(210 12% 10%) 100%)",
    accent: "hsl(210 80% 60%)",
    slug: "nexus-commerce",
  },
  {
    number: "03",
    title: "Pulse Motion System",
    category: "Motion & Interaction",
    description: "Animation framework and component library for enterprise SaaS.",
    year: "2024",
    bg: "linear-gradient(135deg, hsl(260 10% 9%) 0%, hsl(260 8% 6%) 50%, hsl(270 10% 10%) 100%)",
    accent: "hsl(265 60% 65%)",
    slug: "pulse-motion-system",
  },
];

const EXPO = [0.16, 1, 0.3, 1] as const;

// Individual project row with mouse-tracking 3D tilt
const ProjectRow = ({
  project,
  index,
  inView,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  inView: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const rawX = useSpring(0, { stiffness: 100, damping: 30 });
  const rawY = useSpring(0, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(rawY, [-0.4, 0.4], [3, -3]);
  const rotateY = useTransform(rawX, [-0.4, 0.4], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    rawY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.article
      className="group"
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.12, ease: EXPO }}
    >
      {/* Project image */}
      <motion.div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-xl cursor-pointer mb-6"
        style={
          prefersReducedMotion
            ? {}
            : { rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 1000 }
        }
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Link to={`/work/${project.slug}`}>
          <div
            className="w-full aspect-[16/9] md:aspect-[21/9]"
            style={{ background: project.bg }}
          >
            {/* Overlay grid lines (design-y feel for placeholder) */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
                backgroundSize: "4rem 4rem",
              }}
            />

            {/* Accent glow in corner */}
            <div
              className="absolute bottom-0 right-0 w-[40%] h-[60%] opacity-20"
              style={{
                background: `radial-gradient(circle at 80% 80%, ${project.accent}, transparent 65%)`,
                filter: "blur(30px)",
              }}
            />

            {/* Project number — large watermark */}
            <div className="absolute top-6 left-8 font-mono text-[11px] text-white/20 uppercase tracking-widest">
              {project.number}
            </div>

            {/* Year */}
            <div className="absolute top-6 right-8 font-mono text-[11px] text-white/15 uppercase tracking-widest">
              {project.year}
            </div>

            {/* Hover overlay */}
            <div
              className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100"
              style={{ transition: "opacity 350ms ease-out" }}
            />

            {/* View link — appears on hover */}
            <div
              className="absolute bottom-6 right-8 flex items-center gap-2 text-sm text-white/50 group-hover:text-white opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
              style={{ transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              View Case Study
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Electric accent line at bottom — draws on hover */}
          <div
            className="absolute bottom-0 left-0 h-[1.5px] w-0 group-hover:w-full"
            style={{
              background: project.accent,
              transition: "width 500ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </Link>
      </motion.div>

      {/* Project meta */}
      <div className="flex items-start justify-between gap-4 px-1">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
              {project.category}
            </span>
          </div>
          <h3 className="font-display text-xl md:text-2xl font-normal text-white/80 group-hover:text-white"
            style={{ transition: "color 200ms ease-out" }}>
            {project.title}
          </h3>
          <p className="text-sm text-white/35 font-light mt-1">{project.description}</p>
        </div>
        <Link
          to={`/work/${project.slug}`}
          className="shrink-0 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/25 hover:border-white/30 hover:text-white/70 mt-1"
          style={{ transition: "all 200ms ease-out" }}
          aria-label={`View ${project.title}`}
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.article>
  );
};

const WorkSamples = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="work" ref={sectionRef} className="py-32 md:py-44 relative bg-background">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/6 pb-12">
          <div>
            <div className="overflow-hidden mb-5">
              <motion.span
                className="font-mono text-[11px] text-white/25 uppercase tracking-[0.25em] block"
                initial={prefersReducedMotion ? {} : { y: "110%", opacity: 0 }}
                animate={inView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: EXPO }}
              >
                Selected Work
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-[clamp(2rem,5vw,3.5rem)] font-normal text-white"
                initial={prefersReducedMotion ? {} : { y: "108%", opacity: 0 }}
                animate={inView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.06, ease: EXPO }}
              >
                The work speaks.
              </motion.h2>
            </div>
          </div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          >
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 text-sm text-white/35 hover:text-white/70"
              style={{ transition: "color 200ms ease-out" }}
            >
              View all projects
              <ArrowUpRight
                className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ transition: "transform 200ms ease-out" }}
              />
            </Link>
          </motion.div>
        </div>

        {/* Projects — stacked full-width */}
        <div className="space-y-20 md:space-y-28">
          {PROJECTS.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSamples;
