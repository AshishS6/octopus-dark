import { useState, useEffect, useCallback } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { getLenis } from "@/components/SmoothScroll";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/#team" },
  { label: "Contact", href: "/#contact" },
];

const SOCIAL_LINKS = [
  { label: "Twitter", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
];

const EXPO = [0.16, 1, 0.3, 1] as const;

const scrollToHash = (hash: string) => {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el, { offset: -80, duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  // After navigating to "/", wait for render then scroll to hash
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const id = location.hash.replace("#", "");
      // Small delay lets the page mount before we attempt scroll
      const t = setTimeout(() => scrollToHash(location.hash), 120);
      return () => clearTimeout(t);
    }
  }, [location]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent, href: string) => {
      const isHashLink = href.startsWith("/#");
      if (!isHashLink) return; // let React Router handle normal links

      e.preventDefault();
      const hash = href.slice(1); // "#team", "#contact"

      if (location.pathname === "/") {
        // Already on home — just scroll
        scrollToHash(hash);
      } else {
        // Navigate to "/" with hash; useEffect above will scroll after mount
        navigate("/" + hash);
      }
      setIsOpen(false);
    },
    [location.pathname, navigate]
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setIsOpen(false), [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          transition: "background-color 250ms ease-out, border-color 250ms ease-out",
          backgroundColor: isScrolled ? "hsl(0 0% 2% / 0.92)" : "transparent",
          borderBottom: isScrolled ? "1px solid hsl(0 0% 100% / 0.05)" : "1px solid transparent",
          backdropFilter: isScrolled ? "blur(16px)" : "none",
        }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link
              to="/"
              className="font-display text-xl text-white/90 hover:text-white tracking-tight"
              style={{ transition: "color 200ms ease-out" }}
            >
              Octopus<span className="text-white/30">°</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isHashLink = link.href.startsWith("/#");
                const isActive = isHashLink
                  ? location.hash === link.href.slice(1)
                  : location.pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative text-sm font-medium text-white/50 hover:text-white/90"
                    style={{ transition: "color 200ms ease-out" }}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-electric" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* CTA — desktop */}
              <motion.div
                className="hidden md:block"
                whileTap={{ scale: 0.97 }}
                style={{ transition: "transform 160ms ease-out" } as React.CSSProperties}
              >
                <Link
                  to="/start-project"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-black bg-white px-5 py-2.5 rounded-full hover:bg-white/88"
                  style={{ transition: "background-color 200ms ease-out" }}
                >
                  Start a Project
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>

              {/* Hamburger / Close */}
              <button
                className="relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] group"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <span
                  className="w-5 h-[1.5px] bg-white/70 group-hover:bg-white"
                  style={{
                    transition: "transform 250ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease-out, background-color 200ms ease-out",
                    transform: isOpen ? "translateY(3.25px) rotate(45deg)" : "none",
                  }}
                />
                <span
                  className="w-5 h-[1.5px] bg-white/70 group-hover:bg-white"
                  style={{
                    transition: "transform 250ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease-out, background-color 200ms ease-out",
                    transform: isOpen ? "translateY(-3.25px) rotate(-45deg)" : "none",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-screen mobile/overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background flex flex-col"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Grain on overlay */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />

            <div className="container mx-auto px-6 lg:px-12 flex-1 flex flex-col">
              {/* Spacer for nav height */}
              <div className="h-20" />

              {/* Big nav links — staggered reveal */}
              <nav className="flex-1 flex flex-col justify-center gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.05 + i * 0.06,
                      ease: EXPO,
                    }}
                  >
                    <Link
                      to={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="group flex items-baseline gap-4 py-3 border-b border-white/5 last:border-0"
                    >
                      <span className="font-mono text-[11px] text-white/20 w-6 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="font-display text-[clamp(2.5rem,7vw,5rem)] font-normal leading-tight text-white/70 group-hover:text-white"
                        style={{ transition: "color 200ms ease-out" }}
                      >
                        {link.label}
                      </span>
                      <ArrowUpRight
                        className="w-6 h-6 text-white/20 group-hover:text-electric ml-auto self-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
                        style={{ transition: "all 250ms cubic-bezier(0.16, 1, 0.3, 1)" }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Footer strip */}
              <motion.div
                className="py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-white/5"
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
              >
                {/* Start project CTA */}
                <Link
                  to="/start-project"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-6 py-3 rounded-full hover:bg-white/88"
                  style={{ transition: "background-color 200ms ease-out" }}
                >
                  Start a Project
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                {/* Social links */}
                <div className="flex items-center gap-6">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="text-xs text-white/30 hover:text-white/70 uppercase tracking-widest"
                      style={{ transition: "color 200ms ease-out" }}
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
