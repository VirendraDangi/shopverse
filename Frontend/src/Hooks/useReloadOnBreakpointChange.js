// hooks/useReloadOnBreakpointChange.js
import { useEffect, useRef } from "react";

const useReloadOnBreakpointChange = (breakpoint = 768) => {
  const prevIsMobile = useRef(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      const isMobileNow = window.innerWidth < breakpoint;

      // Reload if switching across breakpoint
      if (prevIsMobile.current !== isMobileNow) {
        window.location.reload();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
};

export default useReloadOnBreakpointChange;
