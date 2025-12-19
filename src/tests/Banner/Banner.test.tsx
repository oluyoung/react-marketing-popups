import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Banner } from "../../components/Banner";

vi.mock("classnames", () => ({
  default: (...classes: string[]) => classes.filter(Boolean).join(" "),
}));

vi.mock("./Banner.module.css", () => ({
  default: {
    rmpBanner: "rmpBanner",
    "rmpBanner-bottom": "rmpBanner-bottom",
    "rmpBanner-top": "rmpBanner-top",
    rmpBannerContent: "rmpBannerContent",
    rmpBannerCloseBtn: "rmpBannerCloseBtn",
  }
}));

vi.mock("../../constants", () => ({
  slidePositionAnimations: {
    bottom: ["slideIn", "slideOut"],
    top: ["slideInTop", "slideOutTop"],
    left: ["slideInLeft", "slideOutLeft"],
    right: ["slideInRight", "slideOutRight"],
  },
  bouncePositionAnimations: {
    bottom: ["bounceIn", "bounceOut"]
  },
  fadePositionAnimations: {
    bottom: ["fadeIn", "fadeOut"]
  }
}));

// mock useAnimatePresence
const mockUseAnimatePresence = vi.fn();
vi.mock("../../hooks/useAnimatePresence", () => ({
  useAnimatePresence: (args: unknown) => mockUseAnimatePresence(args)
}));

// renderer utility
const renderBanner = (props = {}) => {
  const defaultProps = {
    id: "test-id",
    open: true,
    onOpenChange: vi.fn(),
    children: <div>Content</div>,
  };
  return render(<Banner {...defaultProps} {...props} />);
};

describe("Banner Component (Updated)", () => {
  beforeEach(() => {
    mockUseAnimatePresence.mockReset();
    mockUseAnimatePresence.mockReturnValue({
      isMounted: true,
      animationClass: "animIn",
      handleAnimationEnd: vi.fn(),
    });
  });

  test("renders when mounted", () => {
    renderBanner();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  test("does not render when not mounted", () => {
    mockUseAnimatePresence.mockReturnValue({ isMounted: false });
    const { container } = renderBanner();
    expect(container.firstChild).toBe(null);
  });

  test("applies defaults: bottom + slide + duration=300", () => {
    renderBanner();
    const dialog = screen.getByRole("dialog");

    expect(dialog.className).toContain("rmpBanner-bottom");
    expect(dialog).toHaveStyle("animation-duration: 300ms");
  });

  test("slide animation path is used", () => {
    renderBanner({ animation: "slide", position: "bottom" });

    expect(mockUseAnimatePresence).toHaveBeenCalledWith({
      open: true,
      animationIn: "slideIn",
      animationOut: "slideOut"
    });
  });

  test("fade animation path is used", () => {
    renderBanner({ animation: "fade", position: "bottom" });

    expect(mockUseAnimatePresence).toHaveBeenCalledWith({
      open: true,
      animationIn: "fadeIn",
      animationOut: "fadeOut"
    });
  });

  test("bounce animation path is used", () => {
    renderBanner({ animation: "bounce", position: "bottom" });

    expect(mockUseAnimatePresence).toHaveBeenCalledWith({
      open: true,
      animationIn: "bounceIn",
      animationOut: "bounceOut"
    });
  });

  test("close button triggers onOpenChange(false) and onClose()", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const onClose = vi.fn();

    renderBanner({ onOpenChange, onClose });

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(onClose).toHaveBeenCalled();
  });

  test("isOk + closeOnOk = auto-close", () => {
    const onOpenChange = vi.fn();
    mockUseAnimatePresence.mockReturnValue({
      isMounted: true,
      animationClass: "animIn",
      handleAnimationEnd: vi.fn(),
    });

    renderBanner({
      isOk: true,
      closeOnOk: true,
      onOpenChange,
    });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  test("isOk true but closeOnOk false = no auto-close", () => {
    const onOpenChange = vi.fn();

    renderBanner({
      isOk: true,
      closeOnOk: false,
      onOpenChange,
    });

    expect(onOpenChange).not.toHaveBeenCalled();
  });

  test("animationEnd function is called", () => {
    const mockEnd = vi.fn();
    mockUseAnimatePresence.mockReturnValue({
      isMounted: true,
      animationClass: "animIn",
      handleAnimationEnd: mockEnd,
    });

    renderBanner();

    fireEvent.animationEnd(screen.getByRole("dialog"));

    expect(mockEnd).toHaveBeenCalled();
  });

  test("elemProps spreads correctly", () => {
    renderBanner({
      elemProps: {
        containerElProps: { "data-container": "1" },
        contentElProps: { "data-content": "1" }
      }
    });

    expect(screen.getByRole("dialog")).toHaveAttribute("data-container", "1");
    expect(screen.getByText("Content").parentElement).toHaveAttribute("data-content", "1");
  });

  test("custom classnames are merged", () => {
    renderBanner({
      containerClassName: "extra-container",
      contentClassName: "extra-content",
      closeBtnClassname: "extra-close",
    });

    expect(screen.getByRole("dialog").className).toContain("extra-container");
    expect(screen.getByText("Content").parentElement!.className).toContain("extra-content");
    expect(screen.getByRole("button", { name: "Close" }).className).toContain("extra-close");
  });
});
