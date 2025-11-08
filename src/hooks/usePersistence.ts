import { useCallback } from "react";

export function usePersistence(key: string) {
  const hasSeen = useCallback(() => {
    try {
      return localStorage.getItem(key) === "1";
    } catch {
      return false;
    }
  }, [key]);

  const markSeen = useCallback(() => {
    try {
      localStorage.setItem(key, "1");
    } catch {}
  }, [key]);

  const clear = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch {}
  }, [key]);

  return { hasSeen, markSeen, clear };
}
