import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { Popout, type PopoutProps } from "../../components/Popout/Popout";
import * as useAnimatePresenceModule from "../../hooks/useAnimatePresence";
import * as useFocusTrapModule from "../../hooks/useFocusTrap";

describe("Popout Component", () => {
  const defaultProps: PopoutProps = {
    id: "test-popout",
    open: true,
    onOpenChange: vi.fn(),
    children: <div>Popout Content</div>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // --- Renderer function ---
  const renderPopout = (props?: Partial<PopoutProps>) => {
    return render(<Popout {...defaultProps} {...props} />);
  };

  // --- Mocks ---
  const mockAnimatePresence = (overrides?: Partial<ReturnType<typeof useAnimatePresenceModule.useAnimatePresence>>) => {
    vi.spyOn(useAnimatePresenceModule, "useAnimatePresence").mockReturnValue({
      isMounted: true,
      animationClass: "mockAnimation",
      handleAnimationEnd: vi.fn(),
      ...overrides,
    });
  };

  const mockFocusTrap = () => {
    vi.spyOn(useFocusTrapModule, "useFocusTrap").mockReturnValue({ current: null });
  };

  test("renders correctly and matches snapshot", () => {
    mockAnimatePresence();
    mockFocusTrap();
    const { container } = renderPopout();
    expect(container).toMatchSnapshot();
  });

  test("renders with default zoom animation", () => {
    mockAnimatePresence();
    mockFocusTrap();
    const { getByRole } = renderPopout();
    expect(getByRole("dialog")).toBeTruthy();
    expect(getByRole("dialog").firstChild).toHaveClass("rmpContent", "mockAnimation");
  });

  test("calls onOpenChange and onClose when close button clicked", async () => {
    mockAnimatePresence();
    mockFocusTrap();
    const onClose = vi.fn();
    const { getByLabelText } = renderPopout({ onClose });
    const button = getByLabelText("Close");

    await userEvent.click(button);

    expect(defaultProps.onOpenChange).toHaveBeenCalledWith(false);
    expect(onClose).toHaveBeenCalled();
  });

  test("calls handleClose on overlay click when closeOnOverlay true", async () => {
    mockAnimatePresence();
    mockFocusTrap();
    const onClose = vi.fn();
    const { getByRole } = renderPopout({ closeOnOverlay: true, onClose });
    const overlay = getByRole("dialog");

    await userEvent.click(overlay);
    expect(defaultProps.onOpenChange).toHaveBeenCalledWith(false);
    expect(onClose).toHaveBeenCalled();
  });

  test("does not call handleClose on overlay click when target not equal currentTarget", async () => {
    mockAnimatePresence();
    mockFocusTrap();
    const onClose = vi.fn();
    const { getByRole } = renderPopout({ closeOnOverlay: true, onClose });
    const overlay = getByRole("dialog");

    // Simulate event where target !== currentTarget
    overlay.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    expect(defaultProps.onOpenChange).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  test("does not call handleClose on overlay click when closeOnOverlay false", async () => {
    mockAnimatePresence();
    mockFocusTrap();
    const onClose = vi.fn();
    const { getByRole } = renderPopout({ closeOnOverlay: false, onClose });
    const overlay = getByRole("dialog");

    await userEvent.click(overlay);
    expect(defaultProps.onOpenChange).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  test("renders with custom overlayClassName and contentClassName", () => {
    mockAnimatePresence();
    mockFocusTrap();
    const { getByRole } = renderPopout({
      overlayClassName: "overlayClass",
      contentClassName: "contentClass",
    });
    const overlay = getByRole("dialog");
    const content = overlay.firstChild;
    expect(overlay).toHaveClass("overlayClass");
    expect(content).toHaveClass("contentClass");
  });

  test("lockScroll sets and resets body overflow", () => {
    mockAnimatePresence();
    mockFocusTrap();
    const originalOverflow = document.body.style.overflow;
    renderPopout({ lockScroll: true, open: true });
    expect(document.body.style.overflow).toBe("hidden");

    // Cleanup effect will reset
    renderPopout({ lockScroll: true, open: false });
    expect(document.body.style.overflow).toBe(originalOverflow);
  });

  test("calls handleClose when isOk and closeOnOk true", () => {
    const handleClose = vi.fn();
    mockAnimatePresence();
    mockFocusTrap();
    vi.spyOn(React, "useCallback").mockImplementation((fn) => handleClose as any);

    renderPopout({ isOk: true, closeOnOk: true });
    expect(handleClose).toHaveBeenCalled();
  });

  test("returns null if !isMounted or no document.body", () => {
    mockAnimatePresence({ isMounted: false });
    mockFocusTrap();
    const originalBody = global.document.body;
    Object.defineProperty(global.document, "body", { value: null });
    const { container } = renderPopout();
    expect(container.firstChild).toBeNull();
    Object.defineProperty(global.document, "body", { value: originalBody });
  });

  test("renders bounce and fade animations", () => {
    mockAnimatePresence();
    mockFocusTrap();
    renderPopout({ animation: "bounce" });
    renderPopout({ animation: "fade" });
  });

  test("renders with elemProps overlayElProps and containerElProps", () => {
    mockAnimatePresence();
    mockFocusTrap();
    const elemProps = {
      overlayElProps: { "data-overlay": "1" },
      containerElProps: { "data-container": "1" },
    };
    const { getByRole } = renderPopout({ elemProps });
    const overlay = getByRole("dialog");
    expect(overlay).toHaveAttribute("data-overlay", "1");
    expect(overlay.firstChild).toHaveAttribute("data-container", "1");
  });
});
