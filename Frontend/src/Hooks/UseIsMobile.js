import { useEffect, useState } from "react";

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      const newValue = window.innerWidth < breakpoint;
      setIsMobile((prev) => {
        // Only update if value changed to avoid re-renders
        if (prev !== newValue) return newValue;
        return prev;
      });
    };

    handleResize(); // Call once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;


