import { useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";

const OctopusCursor = () => {
  const cursorX = useSpring(0, { stiffness: 60, damping: 12 });
  const cursorY = useSpring(0, { stiffness: 60, damping: 12 });
  const isHovering = useRef(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      isHovering.current = target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a, button") !== null;
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{ x: cursorX, y: cursorY }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        {/* Octopus body */}
        <motion.circle
          cx="20"
          cy="18"
          r="8"
          fill="hsl(var(--primary))"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Eyes */}
        <circle cx="17" cy="16" r="2" fill="hsl(var(--background))" />
        <circle cx="23" cy="16" r="2" fill="hsl(var(--background))" />
        <circle cx="17.5" cy="16" r="1" fill="hsl(var(--primary-foreground))" />
        <circle cx="23.5" cy="16" r="1" fill="hsl(var(--primary-foreground))" />
        
        {/* Tentacles */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i * Math.PI * 2) / 8;
          const baseX = 20 + Math.cos(angle) * 7;
          const baseY = 24 + Math.sin(angle) * 5;
          
          return (
            <motion.path
              key={i}
              d={`M ${baseX} ${baseY} Q ${baseX + Math.cos(angle) * 8} ${baseY + Math.sin(angle) * 8 + 5}, ${baseX + Math.cos(angle) * 12} ${baseY + Math.sin(angle) * 12 + 8}`}
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  `M ${baseX} ${baseY} Q ${baseX + Math.cos(angle) * 8} ${baseY + Math.sin(angle) * 8 + 5}, ${baseX + Math.cos(angle) * 12} ${baseY + Math.sin(angle) * 12 + 8}`,
                  `M ${baseX} ${baseY} Q ${baseX + Math.cos(angle) * 10} ${baseY + Math.sin(angle) * 6 + 5}, ${baseX + Math.cos(angle) * 14} ${baseY + Math.sin(angle) * 10 + 8}`,
                  `M ${baseX} ${baseY} Q ${baseX + Math.cos(angle) * 8} ${baseY + Math.sin(angle) * 8 + 5}, ${baseX + Math.cos(angle) * 12} ${baseY + Math.sin(angle) * 12 + 8}`,
                ],
              }}
              transition={{
                duration: 1.5 + i * 0.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>
    </motion.div>
  );
};

export default OctopusCursor;
