import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { SlideIn, type SlideInProps } from "./SlideIn";
import * as useAnimatePresenceModule from "../../hooks/useAnimatePresence";

describe("SlideIn Component", () => {
  const defaultProps: SlideInProps = {
    id: "test-slidein",
    open: true,
    onOpenChange: vi.fn(),
    children: <div>SlideIn Content</div>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderSlideIn = (props?: Partial<SlideInProps>) => {
    return render(<SlideIn {...defaultProps} {...props} />);
  };

  const mockAnimatePresence = (overrides?: Partial<ReturnType<typeof useAnimatePresenceModule.useAnimatePresence>>) => {
    vi.spyOn(useAnimatePresenceModule, "useAnimatePresence").mockReturnValue({
      isMounted: true,
      animationClass: "mockAnimation",
      handleAnimationEnd: vi.fn(),
      ...overrides,
    });
  };

  test("renders correctly and matches snapshot", () => {
    mockAnimatePresence();
    const { container } = renderSlideIn();
    expect(container).toMatchSnapshot();
  });

  test("renders with default position and animation", () => {
    mockAnimatePresence();
    const { getByRole } = renderSlideIn();
    const dialog = getByRole("dialog");
    expect(dialog).toHaveClass("animate__animated mockAnimation");
  });

  test("renders with wrapperClassName, containerClassName, contentClassName", () => {
    mockAnimatePresence();
    const { container } = renderSlideIn({
      wrapperClassName: "wrapperClass",
      containerClassName: "containerClass",
      contentClassName: "contentClass",
    });
    expect(container.firstChild).toHaveClass("wrapperClass");
    expect(container.querySelector("div")).toHaveClass("containerClass");
    expect(container.querySelector("div > div")).toHaveClass("contentClass");
  });

  test("calls onOpenChange and onClose when close button clicked", async () => {
    mockAnimatePresence();
    const onClose = vi.fn();
    const { getByLabelText } = renderSlideIn({ onClose });
    const button = getByLabelText("Close");

    await userEvent.click(button);

    expect(defaultProps.onOpenChange).toHaveBeenCalledWith(false);
    expect(onClose).toHaveBeenCalled();
  });

  test("calls handleClose on isOk effect", () => {
    const handleClose = vi.fn();
    mockAnimatePresence({ isMounted: true });
    // Override useCallback for test
    vi.spyOn(React, "useCallback").mockImplementation(() => handleClose as any);

    renderSlideIn({ isOk: true });
    expect(handleClose).toHaveBeenCalled();
  });

  test("does not render if isMounted is false", () => {
    mockAnimatePresence({ isMounted: false });
    const { container } = renderSlideIn();
    expect(container.firstChild).toBeNull();
  });

  test("handles elemProps wrapper, container, content", () => {
    mockAnimatePresence();
    const elemProps: any = {
      wrapperElProps: { "data-wrapper": "1" },
      containerElProps: { "data-container": "1" },
      contentElProps: { "data-content": "1" },
    };
    const { container } = renderSlideIn({ elemProps });
    expect(container.querySelector("div")).toHaveAttribute("data-wrapper", "1");
    expect(container.querySelector("div > div")).toHaveAttribute("data-container", "1");
    expect(container.querySelector("div > div > div")).toHaveAttribute("data-content", "1");
  });

  test("renders with bounce animation", () => {
    mockAnimatePresence();
    const { getByRole } = renderSlideIn({ animation: "bounce", position: "left" });
    expect(getByRole("dialog")).toBeTruthy();
  });

  test("renders with fade animation", () => {
    mockAnimatePresence();
    const { getByRole } = renderSlideIn({ animation: "fade", position: "right" });
    expect(getByRole("dialog")).toBeTruthy();
  });

  test("renders with slide animation (default)", () => {
    mockAnimatePresence();
    const { getByRole } = renderSlideIn({ animation: "slide", position: "left" });
    expect(getByRole("dialog")).toBeTruthy();
  });
});
