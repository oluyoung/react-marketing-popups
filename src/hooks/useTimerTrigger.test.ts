import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTimerTrigger } from "./useTimerTrigger";

describe("useTimerTrigger", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  const setup = (ms?: number, enabled?: boolean) =>
    renderHook(() => useTimerTrigger(ms, enabled));

  test("returns fired=false initially", () => {
    const { result } = setup();
    expect(result.current[0]).toBe(false);
  });

  test("fires after default 3000ms", () => {
    const { result } = setup();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current[0]).toBe(true);
  });

  test("fires after custom time", () => {
    const { result } = setup(5000);

    act(() => {
      vi.advanceTimersByTime(4999);
    });
    expect(result.current[0]).toBe(false);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current[0]).toBe(true);
  });

  test("does not fire if enabled=false", () => {
    const { result } = setup(3000, false);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current[0]).toBe(false);
  });

  test("does not fire if ms <= 0", () => {
    const { result } = setup(0);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe(false);
  });

  test("returns setter setFired to manually trigger", () => {
    const { result } = setup();

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);
  });

  test("clears timeout on unmount", () => {
    const clearSpy = vi.spyOn(window, "clearTimeout");

    const { unmount } = setup(3000);

    unmount();

    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });
});
