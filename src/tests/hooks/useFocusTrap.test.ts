import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFocusTrap } from "../../hooks/useFocusTrap";

describe("useFocusTrap", () => {
  let addEventListenerSpy: ReturnType<typeof vi.spyOn>;
  let removeEventListenerSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    addEventListenerSpy = vi.spyOn(document, "addEventListener");
    removeEventListenerSpy = vi.spyOn(document, "removeEventListener");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const setup = (active: boolean) => {
    return renderHook(() => useFocusTrap<HTMLDivElement>(active));
  };

  const createContainer = (children: HTMLElement[] = []) => {
    const container = document.createElement("div");
    container.tabIndex = -1; // to allow focus fallback
    children.forEach((c) => container.appendChild(c));
    document.body.appendChild(container);
    return container;
  };

  const pressTab = (shiftKey = false) => {
    const event = new KeyboardEvent("keydown", {
      key: "Tab",
      shiftKey,
      bubbles: true
    });
    document.dispatchEvent(event);
  };

  const pressKey = (key: string) => {
    const event = new KeyboardEvent("keydown", { key, bubbles: true });
    document.dispatchEvent(event);
  };

  test("returns a ref", () => {
    const { result } = setup(true);
    expect(result.current).toBeDefined();
  });

  test("does nothing when active=false", () => {
    const { result } = setup(false);

    const container = createContainer();
    result.current.current = container;

    expect(addEventListenerSpy).not.toHaveBeenCalled();
    expect(removeEventListenerSpy).not.toHaveBeenCalled();
  });

  test("focuses first focusable element when active=true", () => {
    const { result } = setup(true);

    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    const container = createContainer([btn1, btn2]);

    result.current.current = container;

    // Mount effect
    act(() => {});

    expect(document.activeElement).toBe(btn1);
    expect(addEventListenerSpy).toHaveBeenCalled();
  });

  test("falls back to container if no focusable elements exist", () => {
    const { result } = setup(true);

    const container = createContainer([]);
    result.current.current = container;

    act(() => {});

    expect(document.activeElement).toBe(container);
  });

  test("shift+tab on first loops focus to last", () => {
    const { result } = setup(true);

    const first = document.createElement("button");
    const middle = document.createElement("button");
    const last = document.createElement("button");

    const container = createContainer([first, middle, last]);
    result.current.current = container;

    act(() => {});

    // Ensure first is focused
    expect(document.activeElement).toBe(first);

    // Press shift+tab
    act(() => pressTab(true));

    expect(document.activeElement).toBe(last);
  });

  test("tab on last loops focus to first", () => {
    const { result } = setup(true);

    const first = document.createElement("button");
    const middle = document.createElement("button");
    const last = document.createElement("button");

    const container = createContainer([first, middle, last]);
    result.current.current = container;

    act(() => {});

    // Move focus manually to last
    act(() => last.focus());
    expect(document.activeElement).toBe(last);

    act(() => pressTab(false));

    expect(document.activeElement).toBe(first);
  });

  test("escape key does not interfere or loop focus", () => {
    const { result } = setup(true);

    const btn1 = document.createElement("button");
    const container = createContainer([btn1]);

    result.current.current = container;

    act(() => {});

    expect(document.activeElement).toBe(btn1);

    act(() => pressKey("Escape"));

    // Should NOT change focus
    expect(document.activeElement).toBe(btn1);
  });

  test("restores previous active element on cleanup", () => {
    const prev = document.createElement("button");
    document.body.appendChild(prev);
    prev.focus();

    expect(document.activeElement).toBe(prev);

    const { result, unmount } = setup(true);

    const btn = document.createElement("button");
    const container = createContainer([btn]);

    result.current.current = container;

    act(() => {});

    expect(document.activeElement).toBe(btn);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalled();
    expect(document.activeElement).toBe(prev);
  });

  test("effect re-runs when active changes", () => {
    const { result, rerender } = renderHook(
      (p: { active: boolean }) => useFocusTrap<HTMLDivElement>(p.active),
      { initialProps: { active: true } }
    );

    const btn = document.createElement("button");
    const container = createContainer([btn]);

    result.current.current = container;

    act(() => {});

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);

    rerender({ active: false });

    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
  });
});
