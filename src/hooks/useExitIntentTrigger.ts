import { useEffect, useState } from "react";

type Options = { topZonePx?: number; delayMs?: number; once?: boolean };

export function useExitIntentTrigger(opts: Options = {}) {
  const { topZonePx = 50, delayMs = 0, once = true } = opts;
  const [fired, setFired] = useState(false);

  useEffect(() => {
    if (fired && once) return;
    let timer: number | undefined;

    function onMouseOut(e: MouseEvent) {
      if (!e.relatedTarget && e.clientY <= topZonePx) {
        if (delayMs) {
          window.clearTimeout(timer);
          timer = window.setTimeout(() => setFired(true), delayMs);
        } else {
          setFired(true);
        }
      }
    }

    document.addEventListener("mouseout", onMouseOut);

    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      if (timer) window.clearTimeout(timer);
    };
  }, [topZonePx, delayMs, once, fired]);

  return [fired, setFired] as const;
}
