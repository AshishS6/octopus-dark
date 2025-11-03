import { useEffect, useRef, useState } from "react";
import { useDepth } from "@/context/DepthProvider";
import { useMotionValueEvent } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  type: "bubble" | "plankton";
}

interface ParticlesProps {
  className?: string;
  density?: number;
}

const Particles = ({ className = "", density = 1 }: ParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const { depth } = useDepth();
  const [currentDepth, setCurrentDepth] = useState(0);

  // Subscribe to depth changes
  useMotionValueEvent(depth, "change", (latest) => {
    setCurrentDepth(latest);
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Initialize particles based on device capability
    const initParticles = () => {
      const isLowEnd =
        (navigator.hardwareConcurrency || 4) <= 2 ||
        ((navigator as any).deviceMemory || 4) <= 2;
      const particleCount = isLowEnd
        ? Math.floor(30 * density)
        : Math.floor(60 * density);

      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        type: Math.random() > 0.7 ? "bubble" : "plankton",
      }));
    };

    initParticles();

    // Optimized animation loop with batching
    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      // Throttle to target FPS for consistent performance
      if (currentTime - lastTime >= frameInterval) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Pre-calculate depth opacity values once per frame
        const bubbleOpacity = Math.max(0, 1 - currentDepth * 2);
        const planktonOpacity = 0.3 + currentDepth * 0.2;
        const useGlow = currentDepth > 0.6;

        particlesRef.current.forEach((particle) => {
          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Optimized bounds checking with wrapping
          if (particle.x < 0) {
            particle.x = canvas.width;
          } else if (particle.x > canvas.width) {
            particle.x = 0;
          }
          if (particle.y < 0) {
            particle.y = canvas.height;
          } else if (particle.y > canvas.height) {
            particle.y = 0;
          }

          // Calculate opacity once
          const depthOpacity = particle.type === "bubble" ? bubbleOpacity : planktonOpacity;
          const finalOpacity = particle.opacity * depthOpacity;

          // Skip rendering if completely transparent
          if (finalOpacity <= 0.01) return;

          ctx.save();
          ctx.globalAlpha = finalOpacity;
          
          if (particle.type === "bubble") {
            // Optimized bubble drawing - single path
            const size = particle.size;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
            ctx.strokeStyle = `hsl(189 100% 70%)`;
            ctx.fillStyle = `hsl(189 100% 80% / 0.3)`;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.fill();
            
            // Bubble highlight
            ctx.beginPath();
            ctx.arc(particle.x - size * 0.3, particle.y - size * 0.3, size * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(189 100% 90% / 0.5)`;
            ctx.fill();
          } else {
            // Optimized plankton drawing
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(189 100% 60%)`;
            
            // Apply glow only when needed
            if (useGlow) {
              ctx.shadowBlur = 5;
              ctx.shadowColor = `hsl(189 100% 60%)`;
            }
            ctx.fill();
            if (useGlow) {
              ctx.shadowBlur = 0;
            }
          }

          ctx.restore();
        });

        lastTime = currentTime;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame((time) => animate(time));

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentDepth, density]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 5 }}
    />
  );
};

export default Particles;

