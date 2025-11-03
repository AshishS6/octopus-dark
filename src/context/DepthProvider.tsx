import { createContext, useContext, ReactNode } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface DepthContextType {
  depth: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
}

const DepthContext = createContext<DepthContextType | null>(null);

export const useDepth = () => {
  const context = useContext(DepthContext);
  if (!context) {
    throw new Error("useDepth must be used within DepthProvider");
  }
  return context;
};

interface DepthProviderProps {
  children: ReactNode;
}

export const DepthProvider = ({ children }: DepthProviderProps) => {
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to depth (0 = surface, 1 = deep ocean)
  // Using easing for smoother transition
  const depth = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 0.3, 0.7, 1],
    {
      clamp: true,
    }
  );

  return (
    <DepthContext.Provider value={{ depth, scrollYProgress }}>
      {children}
    </DepthContext.Provider>
  );
};

