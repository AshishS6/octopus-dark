import { useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

const EXPO = [0.16, 1, 0.3, 1] as const;

const ContactCTA = () => {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }
    toast.success("Got it. We'll be in touch shortly.");
    setEmail("");
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 md:py-48 relative bg-background overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70vw] h-[50vw] max-w-[800px] max-h-[500px]"
          style={{
            background: "radial-gradient(ellipse at 50% 100%, hsl(0 0% 100% / 0.04), transparent 65%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl">

          {/* Label */}
          <div className="overflow-hidden mb-8">
            <motion.span
              className="font-mono text-[11px] text-white/25 uppercase tracking-[0.25em] block"
              initial={prefersReducedMotion ? {} : { y: "110%", opacity: 0 }}
              animate={inView ? { y: "0%", opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: EXPO }}
            >
              Let's talk
            </motion.span>
          </div>

          {/* Headline */}
          <div className="space-y-0 mb-14">
            {["Ready to build", "something?"].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h2
                  className="font-display font-normal text-[clamp(2.8rem,8vw,7rem)] leading-[1.0] text-white"
                  initial={prefersReducedMotion ? {} : { y: "108%", opacity: 0 }}
                  animate={inView ? { y: "0%", opacity: 1 } : {}}
                  transition={{ duration: 0.85, delay: 0.08 + i * 0.1, ease: EXPO }}
                >
                  {i === 1 ? (
                    <>
                      something<span className="text-white/25">?</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.h2>
              </div>
            ))}
          </div>

          {/* Email input row */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: EXPO }}
          >
            <form onSubmit={handleSubmit} className="max-w-xl">
              <div
                className="relative flex items-center gap-4"
                style={{
                  borderBottom: `1px solid ${focused ? "hsl(0 0% 100% / 0.3)" : "hsl(0 0% 100% / 0.12)"}`,
                  transition: "border-color 200ms ease-out",
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent text-white/75 placeholder:text-white/20 text-lg md:text-xl font-light py-5 outline-none"
                  aria-label="Your email address"
                />
                <motion.button
                  type="submit"
                  className="flex items-center gap-2 text-white/35 hover:text-white py-5 pl-4 shrink-0"
                  style={{ transition: "color 200ms ease-out" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="text-xs uppercase tracking-widest font-medium">Send</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
              <p className="mt-4 text-xs text-white/20 font-light">
                No templates. No pressure. Just an honest conversation.
              </p>
            </form>
          </motion.div>

          {/* Alternative contact */}
          <motion.div
            className="mt-16 flex flex-col sm:flex-row gap-10 sm:gap-16"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
          >
            <div>
              <div className="font-mono text-[10px] text-white/20 uppercase tracking-widest mb-2">Email</div>
              <a
                href="mailto:hello@octopus.studio"
                className="text-sm text-white/45 hover:text-white/80"
                style={{ transition: "color 200ms ease-out" }}
              >
                hello@octopus.studio
              </a>
            </div>
            <div>
              <div className="font-mono text-[10px] text-white/20 uppercase tracking-widest mb-2">Based in</div>
              <span className="text-sm text-white/45">Global · Remote-first</span>
            </div>
            <div>
              <div className="font-mono text-[10px] text-white/20 uppercase tracking-widest mb-2">Response time</div>
              <span className="text-sm text-white/45">Within 24 hours</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
