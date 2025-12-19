import { renderHook, act } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { useAnimatePresence } from "../../hooks/useAnimatePresence";

describe("useAnimatePresence", () => {
  const defaultProps = {
    open: false,
    animationIn: "fadeIn",
    animationOut: "fadeOut"
  };

  const setup = (props = defaultProps) => {
    return renderHook(() => useAnimatePresence(props));
  };

  test("should initialize with open=false and set isMounted=false, animationClass=''", () => {
    const { result } = setup({
      open: false,
      animationIn: "zoomIn",
      animationOut: "zoomOut"
    });

    expect(result.current.isMounted).toBe(false);
    expect(result.current.animationClass).toBe("");
  });

  test("should initialize with open=true and mount with animationIn", () => {
    const { result } = setup({
      open: true,
      animationIn: "slideIn",
      animationOut: "slideOut"
    });

    // open=true triggers mounting
    expect(result.current.isMounted).toBe(true);
    expect(result.current.animationClass).toBe("slideIn");
  });

  test("should apply animationIn when open switches false → true", () => {
    const { result, rerender } = renderHook(
      (props: any) => useAnimatePresence(props),
      {
        initialProps: { ...defaultProps, open: false }
      }
    );

    // Initial state
    expect(result.current.isMounted).toBe(false);
    expect(result.current.animationClass).toBe("");

    // Switch to open=true
    rerender({ ...defaultProps, open: true });

    expect(result.current.isMounted).toBe(true);
    expect(result.current.animationClass).toBe("fadeIn");
  });

  test("should apply animationOut when open switches true → false", () => {
    const { result, rerender } = renderHook(
      (props: any) => useAnimatePresence(props),
      {
        initialProps: { open: true, animationIn: "fadeIn", animationOut: "fadeOut" }
      }
    );

    // Initial
    expect(result.current.animationClass).toBe("fadeIn");
    expect(result.current.isMounted).toBe(true);

    // Switch to closed
    rerender({ open: false, animationIn: "fadeIn", animationOut: "fadeOut" });

    expect(result.current.animationClass).toBe("fadeOut");
    expect(result.current.isMounted).toBe(true); // still mounted until animation end
  });

  test("handleAnimationEnd unmounts only when open=false", () => {
    const { result, rerender } = renderHook(
      (props: any) => useAnimatePresence(props),
      {
        initialProps: { open: true, animationIn: "fadeIn", animationOut: "fadeOut" }
      }
    );

    // Close component
    rerender({ open: false, animationIn: "fadeIn", animationOut: "fadeOut" });

    expect(result.current.isMounted).toBe(true);

    act(() => {
      result.current.handleAnimationEnd();
    });

    expect(result.current.isMounted).toBe(false);
  });

  test("handleAnimationEnd does NOT unmount when open=true", () => {
    const { result } = setup({
      open: true,
      animationIn: "fadeIn",
      animationOut: "fadeOut"
    });

    // open=true means animation end should NOT dismount
    act(() => {
      result.current.handleAnimationEnd();
    });

    expect(result.current.isMounted).toBe(true);
  });
});
