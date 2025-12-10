import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useInactivityTrigger } from "./useInactivityTrigger";

describe("useInactivityTrigger", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  const setup = (ms?: number) => renderHook(() => useInactivityTrigger(ms));

  const allEvents = [
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

  test("returns fired=false initially", () => {
    const { result } = setup(5000);
    expect(result.current[0]).toBe(false);
  });

  test("sets up event listeners on mount", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    setup(5000);

    allEvents.forEach((e) => {
      expect(addSpy).toHaveBeenCalledWith(e, expect.any(Function), {
        passive: true,
      });
    });
  });

  test("starts timer on mount and fires after ms", () => {
    const { result } = setup(2000);

    expect(result.current[0]).toBe(false);

    act(() => {
      vi.advanceTimersByTime(1999);
    });

    expect(result.current[0]).toBe(false);

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current[0]).toBe(true);
  });

  test("reset is called on user activity and delays firing", () => {
    const { result } = setup(3000);

    expect(result.current[0]).toBe(false);

    // Let 2000ms pass
    act(() => vi.advanceTimersByTime(2000));

    // Trigger event to reset timer
    act(() => {
      window.dispatchEvent(new Event("mousemove"));
    });

    // Should NOT fire at 3000ms (original start)
    act(() => vi.advanceTimersByTime(1500));
    expect(result.current[0]).toBe(false);

    // Should fire after full new interval
    act(() => vi.advanceTimersByTime(1500));
    expect(result.current[0]).toBe(true);
  });

  test("cleanup removes all event listeners and clears timer", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const clearSpy = vi.spyOn(window, "clearTimeout");

    const { unmount } = setup(4000);
    unmount();

    allEvents.forEach((e) => {
      expect(removeSpy).toHaveBeenCalledWith(e, expect.any(Function));
    });

    expect(clearSpy).toHaveBeenCalled();
  });

  test("does not reattach listeners when fired=true", () => {
    const addSpy = vi.spyOn(window, "addEventListener");

    const { result, rerender } = setup(2000);

    // Force fired = true
    act(() => {
      result.current[1](true);
    });

    rerender();

    // Should not re-add listeners when fired
    expect(addSpy).toHaveBeenCalledTimes(allEvents.length); // Only initial mount
  });

  test("manually setting fired=true stops inactivity tracking immediately", () => {
    const clearSpy = vi.spyOn(window, "clearTimeout");
    const { result } = setup(5000);

    expect(result.current[0]).toBe(false);

    act(() => result.current[1](true));

    expect(result.current[0]).toBe(true);
    expect(clearSpy).toHaveBeenCalled();
  });
});
