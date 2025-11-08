import { useEffect, useRef, useState } from "react";

export function useInactivityTrigger(ms = 30000) {
  const [fired, setFired] = useState(false);

  const timerRef = useRef<number | null>(null);

  function reset() {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setFired(true), ms);
  }

  useEffect(() => {
    if (fired) return;

    const events: (keyof WindowEventMap)[] = [
      "mousemove",
      "mousemove",
      "mousedown",
      "click",
      "keydown",
      "keypress",
      "keyup",
      "scroll",
      "touchstart",
      "touchmove",
      "resize",
      "blur",
      "focus",
    ];
    events.forEach((ev) =>
      window.addEventListener(ev, reset, { passive: true })
    );

    reset();

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, reset));
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [ms, fired]);

  return [fired, setFired] as const;
}
