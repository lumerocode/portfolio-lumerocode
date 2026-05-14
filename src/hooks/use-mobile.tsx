import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Custom hook to detect if the user is on a mobile device based on screen width.
 * Useful for logic-based responsive rendering (e.g., pagination size, conditional features).
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // Media query listener for the mobile breakpoint
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Listen for window resize changes
    mql.addEventListener("change", onChange);
    
    // Initial check on mount
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    
    // Cleanup listener on unmount
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Use double bang (!!) to ensure a boolean return even if initial state is undefined
  return !!isMobile;
}