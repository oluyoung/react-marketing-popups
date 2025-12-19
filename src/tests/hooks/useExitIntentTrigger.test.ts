import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useExitIntentTrigger } from "../../hooks/useExitIntentTrigger";

describe("useExitIntentTrigger", () => {
  let addEventSpy: ReturnType<typeof vi.spyOn>;
  let removeEventSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    addEventSpy = vi.spyOn(document, "addEventListener");
    removeEventSpy = vi.spyOn(document, "removeEventListener");
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  const triggerMouseOut = (y: number, relatedTarget: EventTarget | null = null) => {
    const event = new MouseEvent("mouseout", {
      clientY: y,
      relatedTarget,
      bubbles: true
    });
    document.dispatchEvent(event);
  };

  const setup = (options?: any) => {
    return renderHook(() => useExitIntentTrigger(options));
  };

  test("should initialize with fired = false", () => {
    const { result } = setup();
    const [fired] = result.current;
    expect(fired).toBe(false);
  });

  test("should fire immediately when mouse leaves top zone and delayMs=0 (default)", () => {
    const { result } = setup({ topZonePx: 50 });

    expect(result.current[0]).toBe(false);

    act(() => {
      triggerMouseOut(20); // inside top zone
    });

    expect(result.current[0]).toBe(true);
  });

  test("should not fire when mouse leaves but not in top zone", () => {
    const { result } = setup();

    act(() => {
      triggerMouseOut(200); // too far down
    });

    expect(result.current[0]).toBe(false);
  });

  test("should not fire when relatedTarget exists (hovering into another element)", () => {
    const { result } = setup();

    act(() => {
      triggerMouseOut(10, document.body); // has relatedTarget → ignore
    });

    expect(result.current[0]).toBe(false);
  });

  test("should fire after delay when delayMs > 0", () => {
    const { result } = setup({ delayMs: 500, topZonePx: 50 });

    act(() => {
      triggerMouseOut(10);
    });

    expect(result.current[0]).toBe(false); // not yet

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current[0]).toBe(true);
  });

  test("should clear timeout on unmount", () => {
    const clearSpy = vi.spyOn(window, "clearTimeout");

    const { unmount } = setup({ delayMs: 300 });

    act(() => {
      triggerMouseOut(10);
    });

    unmount();

    expect(clearSpy).toHaveBeenCalled();
  });

  test("should remove event listener on unmount", () => {
    const { unmount } = setup();
    unmount();
    expect(removeEventSpy).toHaveBeenCalled();
  });

  test("should not fire again when once = true (default)", () => {
    const { result } = setup({ topZonePx: 50 });

    // First trigger
    act(() => {
      triggerMouseOut(10);
    });

    expect(result.current[0]).toBe(true);

    // Try again
    act(() => {
      triggerMouseOut(10);
    });

    // Should still be true, but no re-fire or extra animations
    expect(result.current[0]).toBe(true);
  });

  test("should allow multiple firings when once=false", () => {
    const { result } = setup({ once: false, topZonePx: 50 });

    act(() => {
      triggerMouseOut(10);
    });

    expect(result.current[0]).toBe(true);

    // reset fired manually
    act(() => {
      result.current[1](false);
    });

    expect(result.current[0]).toBe(false);

    // trigger again
    act(() => {
      triggerMouseOut(10);
    });

    expect(result.current[0]).toBe(true);
  });

  test("should respect custom topZonePx", () => {
    const { result } = setup({ topZonePx: 10 });

    act(() => {
      triggerMouseOut(15);
    });

    expect(result.current[0]).toBe(false);

    act(() => {
      triggerMouseOut(5);
    });

    expect(result.current[0]).toBe(true);
  });

  test("should re-run effect when options change", () => {
    const { rerender } = renderHook(
      (props: any) => useExitIntentTrigger(props),
      {
        initialProps: { topZonePx: 20 }
      }
    );

    expect(addEventSpy).toHaveBeenCalledTimes(1);

    rerender({ topZonePx: 30 });

    // Cleanup + re-add expected
    expect(removeEventSpy).toHaveBeenCalledTimes(1);
    expect(addEventSpy).toHaveBeenCalledTimes(2);
  });
});
