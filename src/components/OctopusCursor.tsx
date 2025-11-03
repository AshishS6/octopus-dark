import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import Lottie from "lottie-react";

// Try to load Lottie animation, fallback to SVG if not available
let octopusAnimationData: any = null;
try {
  // Will be loaded dynamically if file exists
  octopusAnimationData = null;
} catch {
  // Fallback to SVG
}

interface OctopusCursorProps {
  enabled?: boolean;
}

const OctopusCursor = ({ enabled = true }: OctopusCursorProps) => {
  const [pos, setPos] = useState({ 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, 
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0, 
    visible: true, 
    hover: false 
  });
  const [isTouch, setIsTouch] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const hoverElementsRef = useRef<Set<Element>>(new Set());

  // Optimized spring physics for smoother movement
  const springX = useSpring(0, { stiffness: 180, damping: 25, mass: 0.5 });
  const springY = useSpring(0, { stiffness: 180, damping: 25, mass: 0.5 });
  const scale = useSpring(1, { stiffness: 300, damping: 20 });
  const opacity = useMotionValue(1);
  
  // Use ref to track mouse position for smoother updates
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Detect touch devices
    const checkTouch = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0
      );
    };

    // Detect reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedMotion = mediaQuery.matches;
    setPrefersReducedMotion(reducedMotion);

    const handleReducedMotion = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      setShouldRender(!e.matches);
    };
    mediaQuery.addEventListener("change", handleReducedMotion);

    const touchDevice = checkTouch();
    setIsTouch(touchDevice);
    setShouldRender(!touchDevice && !reducedMotion && enabled);

    // Don't hide cursor on touch devices or if reduced motion is preferred
    if (!touchDevice && !reducedMotion && enabled) {
      document.documentElement.style.cursor = "none";
    }

    // Optimized mouse move handler using requestAnimationFrame for smoothness
    const moveCursor = (e: MouseEvent) => {
      // Store mouse position in ref for immediate access
      mousePosRef.current = {
        x: e.clientX - 20,
        y: e.clientY - 20,
      };
      
      // Update state for visibility (less frequently)
      setPos((prev) => ({
        ...prev,
        visible: true,
      }));
      opacity.set(1);
      
      // Update spring values directly - this is smooth already
      springX.set(mousePosRef.current.x);
      springY.set(mousePosRef.current.y);
    };

    // Mouse enter/leave handlers for document
    const handleMouseEnter = () => {
      setPos((prev) => ({ ...prev, visible: true }));
      opacity.set(1);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      // Only hide if mouse truly left the document (not just moved to a child)
      if (!e.relatedTarget) {
        setPos((prev) => ({ ...prev, visible: false }));
        opacity.set(0);
      }
    };

    // Handle hover elements
    const setupHoverElements = () => {
      const elements = document.querySelectorAll('[data-cursor-hover="true"]');
      elements.forEach((el) => {
        if (!hoverElementsRef.current.has(el)) {
          hoverElementsRef.current.add(el);
          el.addEventListener("mouseenter", () => {
            setPos((prev) => ({ ...prev, hover: true }));
          });
          el.addEventListener("mouseleave", () => {
            setPos((prev) => ({ ...prev, hover: false }));
          });
        }
      });
    };

    // Setup hover for interactive elements by default
    const setupInteractiveElements = () => {
      const interactiveSelectors = "a, button, [role='button'], input, textarea, select";
      const interactiveElements = document.querySelectorAll(interactiveSelectors);
      
      interactiveElements.forEach((el) => {
        if (!hoverElementsRef.current.has(el)) {
          hoverElementsRef.current.add(el);
          el.addEventListener("mouseenter", () => {
            setPos((prev) => ({ ...prev, hover: true }));
          });
          el.addEventListener("mouseleave", () => {
            setPos((prev) => ({ ...prev, hover: false }));
          });
        }
      });
    };

    // Listen to mousemove on document for immediate visibility
    // Using passive: true for better performance
    document.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    // Show cursor immediately if mouse is already over the page
    if (document.querySelector("body")) {
      // Initial visibility check
      const initialMove = () => {
        setPos((prev) => ({ ...prev, visible: true }));
        opacity.set(1);
      };
      document.body.addEventListener("mousemove", initialMove, { once: true, passive: true });
    }

    // Setup hover elements
    setupHoverElements();
    setupInteractiveElements();

    // Re-check for new elements periodically
    const intervalId = setInterval(() => {
      setupHoverElements();
      setupInteractiveElements();
    }, 1000);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      mediaQuery.removeEventListener("change", handleReducedMotion);
      clearInterval(intervalId);
      
      // Restore cursor
      document.documentElement.style.cursor = "";
      
      // Cleanup hover listeners
      hoverElementsRef.current.forEach((el) => {
        el.removeEventListener("mouseenter", () => {});
        el.removeEventListener("mouseleave", () => {});
      });
      hoverElementsRef.current.clear();
    };
  }, [enabled, opacity, springX, springY]);

  // Update opacity based on visibility
  useEffect(() => {
    const targetOpacity = pos.visible ? 1 : 0;
    opacity.set(targetOpacity);
  }, [pos.visible, opacity]);

  // Update scale based on hover state
  useEffect(() => {
    scale.set(pos.hover ? 1.12 : 1);
  }, [pos.hover, scale]);

  // Initialize spring values to current position on mount
  useEffect(() => {
    springX.set(pos.x);
    springY.set(pos.y);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Don't render on touch devices or if disabled
  if (!shouldRender || isTouch || !enabled) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      style={{
        opacity,
        x: springX,
        y: springY,
        willChange: "transform", // Optimize for GPU acceleration
      }}
    >
      <motion.div
        style={{
          scale,
          filter: pos.hover ? "drop-shadow(0 0 8px hsl(189 100% 60%))" : "none",
        }}
      >
        {octopusAnimationData ? (
          <Lottie
            animationData={octopusAnimationData}
            style={{ width: 40, height: 40 }}
            loop
            autoplay
          />
        ) : (
          // Enhanced SVG fallback
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            className="drop-shadow-lg"
          >
            {/* Octopus body */}
            <motion.circle
              cx="20"
              cy="18"
              r="8"
              fill="hsl(189 100% 42%)"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Eyes */}
            <circle cx="17" cy="16" r="2" fill="hsl(220 25% 6%)" />
            <circle cx="23" cy="16" r="2" fill="hsl(220 25% 6%)" />
            <motion.circle
              cx="17.5"
              cy="16"
              r="1"
              fill="hsl(189 100% 60%)"
              animate={{
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              cx="23.5"
              cy="16"
              r="1"
              fill="hsl(189 100% 60%)"
              animate={{
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            />

            {/* Tentacles with enhanced animation */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
              const angle = (i * Math.PI * 2) / 8;
              const baseX = 20 + Math.cos(angle) * 7;
              const baseY = 24 + Math.sin(angle) * 5;
              
              // Pre-calculate path values to avoid undefined errors
              const qx1 = baseX + Math.cos(angle) * 8;
              const qy1 = baseY + Math.sin(angle) * 8 + 5;
              const endX1 = baseX + Math.cos(angle) * 12;
              const endY1 = baseY + Math.sin(angle) * 12 + 8;
              
              const qx2 = baseX + Math.cos(angle) * 10;
              const qy2 = baseY + Math.sin(angle) * 6 + 5;
              const endX2 = baseX + Math.cos(angle) * 14;
              const endY2 = baseY + Math.sin(angle) * 10 + 8;
              
              const path1 = `M ${baseX.toFixed(2)} ${baseY.toFixed(2)} Q ${qx1.toFixed(2)} ${qy1.toFixed(2)}, ${endX1.toFixed(2)} ${endY1.toFixed(2)}`;
              const path2 = `M ${baseX.toFixed(2)} ${baseY.toFixed(2)} Q ${qx2.toFixed(2)} ${qy2.toFixed(2)}, ${endX2.toFixed(2)} ${endY2.toFixed(2)}`;

              return (
                <motion.path
                  key={i}
                  d={path1}
                  stroke="hsl(189 100% 42%)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  animate={{
                    d: [path1, path2, path1],
                  }}
                  transition={{
                    duration: pos.hover ? 1 + i * 0.08 : 1.5 + i * 0.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.05,
                  }}
                />
              );
            })}
          </svg>
        )}
      </motion.div>
    </motion.div>
  );
};

export default OctopusCursor;
