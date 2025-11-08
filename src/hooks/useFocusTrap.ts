import { useEffect, useRef } from "react";

/**
 * useFocusTrap
 * Traps focus within the given container while active.
 *
 * @param active Whether the focus trap is enabled
 * @returns a ref to attach to the container element
 */
export function useFocusTrap<T extends HTMLElement>(active: boolean) {
  const containerRef = useRef<T | null>(null);
  const previousActiveRef = useRef<Element | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!active || !container) return;

    // Store previously focused element
    previousActiveRef.current = document.activeElement;

    // Query focusable elements inside container
    const focusable = container.querySelectorAll<HTMLElement>(
      'a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    // Define keyboard handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") return;
      if (e.key !== "Tab" || focusable.length === 0) return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        (last || first).focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        (first || last).focus();
      }
    };

    // Attach handler and set initial focus
    document.addEventListener("keydown", handleKeyDown);
    (first || container).focus();

    // Cleanup on unmount or when deactivated
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previousActiveRef.current instanceof HTMLElement) {
        previousActiveRef.current.focus();
      }
    };
  }, [active]);

  return containerRef;
}
