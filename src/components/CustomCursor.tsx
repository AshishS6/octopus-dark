import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";

type CursorState = "default" | "link" | "view" | "drag";

const CURSOR_STATES: Record<CursorState, { size: number; opacity: number }> = {
  default: { size: 10, opacity: 0.55 },
  link:    { size: 22, opacity: 0.8 },
  view:    { size: 80, opacity: 1 },
  drag:    { size: 56, opacity: 1 },
};

const CustomCursor = () => {
  const prefersReducedMotion = useReducedMotion();
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const posX = useSpring(0, { stiffness: 320, damping: 36, mass: 0.6 });
  const posY = useSpring(0, { stiffness: 320, damping: 36, mass: 0.6 });
  // Slower follower ring
  const ringX = useSpring(0, { stiffness: 90, damping: 22, mass: 0.8 });
  const ringY = useSpring(0, { stiffness: 90, damping: 22, mass: 0.8 });

  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    if (prefersReducedMotion) return;

    const onMove = (e: MouseEvent) => {
      posX.set(e.clientX);
      posY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest("[data-cursor]") as HTMLElement | null;
      if (el) {
        const c = el.dataset.cursor as CursorState;
        const l = el.dataset.cursorLabel ?? "";
        setState(c ?? "default");
        setLabel(l);
        return;
      }
      const isLink =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']");
      if (isLink) {
        setState("link");
        setLabel("");
      } else {
        setState("default");
        setLabel("");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseover", onOver);
    };
  }, [prefersReducedMotion, posX, posY, ringX, ringY, visible]);

  // Hide on touch / reduced motion
  if (prefersReducedMotion) return null;

  const { size, opacity } = CURSOR_STATES[state];
  const isExpanded = state === "view" || state === "drag";

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none" aria-hidden>
      {/* Dot — fast, tight tracking */}
      <motion.div
        className="absolute rounded-full bg-white mix-blend-difference"
        style={{
          x: posX,
          y: posY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? (isExpanded ? 0 : 0.9) : 0,
          width: 6,
          height: 6,
          transition: "opacity 200ms ease-out",
        }}
      />

      {/* Ring — slow follower */}
      <motion.div
        className="absolute rounded-full border border-white/60 mix-blend-difference flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? opacity : 0,
          width: size,
          height: size,
          transition: "width 350ms cubic-bezier(0.16,1,0.3,1), height 350ms cubic-bezier(0.16,1,0.3,1), opacity 250ms ease-out, border-color 250ms ease-out",
          backgroundColor: isExpanded ? "hsl(74 100% 50% / 0.12)" : "transparent",
          borderColor: isExpanded ? "hsl(74 100% 50% / 0.7)" : "rgba(255,255,255,0.6)",
        }}
      >
        {label && (
          <span
            className="text-[10px] font-medium uppercase tracking-[0.15em] text-white whitespace-nowrap select-none"
            style={{ mixBlendMode: "difference" }}
          >
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
};

export default CustomCursor;
