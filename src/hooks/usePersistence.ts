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
    } catch {
      throw new Error('Could not set item please refresh')
    }
  }, [key]);

  const clear = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch {
      throw new Error('Could not clear local storage')
    }
  }, [key]);

  return { hasSeen, markSeen, clear };
}
