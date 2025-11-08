import { useEffect, useState } from "react";

export function useTimerTrigger(ms: number, enabled = true) {
  const [fired, setFired] = useState(false);
  
  useEffect(() => {
    if (!enabled || fired || ms <= 0) return;
  
    const t = window.setTimeout(() => setFired(true), ms);
  
    return () => window.clearTimeout(t);
  }, [ms, enabled, fired]);
  
  return [fired, setFired] as const;
}
