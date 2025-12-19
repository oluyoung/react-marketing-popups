import { describe, test, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePersistence } from "../../hooks/usePersistence";

describe("usePersistence", () => {
  let storageGetSpy: ReturnType<typeof vi.spyOn>;
  let storageSetSpy: ReturnType<typeof vi.spyOn>;
  let storageRemoveSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Mock localStorage
    storageGetSpy = vi.spyOn(Storage.prototype, "getItem");
    storageSetSpy = vi.spyOn(Storage.prototype, "setItem");
    storageRemoveSpy = vi.spyOn(Storage.prototype, "removeItem");

    storageGetSpy.mockReset();
    storageSetSpy.mockReset();
    storageRemoveSpy.mockReset();

    storageGetSpy.mockImplementation(() => null);
    storageSetSpy.mockImplementation(() => {});
    storageRemoveSpy.mockImplementation(() => {});
  });

  const setup = (key = "test-key") => renderHook(() => usePersistence(key));

  // --------------------------
  // hasSeen()
  // --------------------------
  test("hasSeen returns false when key is not set", () => {
    const { result } = setup("my-key");

    storageGetSpy.mockReturnValueOnce(null);

    expect(result.current.hasSeen()).toBe(false);
    expect(storageGetSpy).toHaveBeenCalledWith("my-key");
  });

  test("hasSeen returns true when localStorage value is '1'", () => {
    const { result } = setup("seen-key");

    storageGetSpy.mockReturnValueOnce("1");

    expect(result.current.hasSeen()).toBe(true);
    expect(storageGetSpy).toHaveBeenCalledWith("seen-key");
  });

  test("hasSeen returns false if localStorage throws", () => {
    const { result } = setup("error-key");

    storageGetSpy.mockImplementationOnce(() => {
      throw new Error("localStorage failure");
    });

    expect(result.current.hasSeen()).toBe(false);
  });

  // --------------------------
  // markSeen()
  // --------------------------
  test("markSeen sets localStorage to '1' for the key", () => {
    const { result } = setup("mark-key");

    act(() => {
      result.current.markSeen();
    });

    expect(storageSetSpy).toHaveBeenCalledWith("mark-key", "1");
  });

  test("markSeen throws an error if localStorage.setItem fails", () => {
    const { result } = setup("mark-fail");

    storageSetSpy.mockImplementationOnce(() => {
      throw new Error("setItem fail");
    });

    expect(() => result.current.markSeen()).toThrow(
      "Could not set item please refresh"
    );
  });

  // --------------------------
  // clear()
  // --------------------------
  test("clear removes key from localStorage", () => {
    const { result } = setup("clear-key");

    act(() => {
      result.current.clear();
    });

    expect(storageRemoveSpy).toHaveBeenCalledWith("clear-key");
  });

  test("clear throws if localStorage.removeItem fails", () => {
    const { result } = setup("clear-fail");

    storageRemoveSpy.mockImplementationOnce(() => {
      throw new Error("removeItem fail");
    });

    expect(() => result.current.clear()).toThrow(
      "Could not clear local storage"
    );
  });

  // --------------------------
  // Stable callbacks (useCallback)
  // --------------------------
  test("callbacks do not change identity between renders", () => {
    const { result, rerender } = setup("stable");

    const originalHasSeen = result.current.hasSeen;
    const originalMarkSeen = result.current.markSeen;
    const originalClear = result.current.clear;

    rerender();

    expect(result.current.hasSeen).toBe(originalHasSeen);
    expect(result.current.markSeen).toBe(originalMarkSeen);
    expect(result.current.clear).toBe(originalClear);
  });
});
