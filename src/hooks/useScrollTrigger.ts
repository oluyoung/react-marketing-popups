import { useEffect, useState } from "react";

export function useScrollTrigger(percent = 50) {
  const [fired, setFired] = useState(false);

  useEffect(() => {
    if (fired) return;
    
    function onScroll() {
      const h = document.documentElement;
      const scrollable = Math.max(1, h.scrollHeight - h.clientHeight);
      const at = (h.scrollTop / scrollable) * 100;
      if (at >= percent) setFired(true);
    }
    
    onScroll();
    
    window.addEventListener("scroll", onScroll, { passive: true });
    
    return () => window.removeEventListener("scroll", onScroll);
  }, [percent, fired]);
  
  return [fired, setFired] as const;
}
