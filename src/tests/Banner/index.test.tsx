import { describe, test, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { BannerByExit } from "../../components/Banner/BannerByExit";
import { BannerByTimer } from "../../components/Banner/BannerByTimer";
import { BannerByScroll } from "../../components/Banner/BannerByScroll";
import { BannerByInactivity } from "../../components/Banner/BannerByInactivity";
import * as useExitIntentTriggerModule from "../../hooks/useExitIntentTrigger";
import * as useTimerTriggerModule from "../../hooks/useTimerTrigger";
import * as useScrollTriggerModule from "../../hooks/useScrollTrigger";
import * as useInactivityTriggerModule from "../../hooks/useInactivityTrigger";
import * as usePersistenceModule from "../../hooks/usePersistence";

describe("Banner trigger components", () => {
  const defaultProps = {
    id: "test-banner",
    open: false,
    onOpenChange: vi.fn(),
    children: <div>Content</div>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // --- BannerByExit ---
  describe("BannerByExit", () => {
    const markSeenMock = vi.fn();
    const hasSeenMock = vi.fn();

    beforeEach(() => {
      vi.spyOn(useExitIntentTriggerModule, "useExitIntentTrigger").mockReturnValue([true, vi.fn()] as const);
      vi.spyOn(usePersistenceModule, "usePersistence").mockReturnValue({
        markSeen: markSeenMock,
        hasSeen: hasSeenMock,
        clear: vi.fn(),
      });
    });

    test("calls onOpenChange if fired and not seen", () => {
      hasSeenMock.mockReturnValue(false);
      render(<BannerByExit {...defaultProps} />);
      expect(defaultProps.onOpenChange).toHaveBeenCalledWith(true);
    });

    test("does not call onOpenChange if already seen", () => {
      hasSeenMock.mockReturnValue(true);
      render(<BannerByExit {...defaultProps} />);
      expect(defaultProps.onOpenChange).not.toHaveBeenCalled();
    });

    test("calls markSeen if isOk is true", () => {
      hasSeenMock.mockReturnValue(false);
      render(<BannerByExit {...defaultProps} isOk={true} />);
      expect(markSeenMock).toHaveBeenCalled();
    });

    test("calls markSeen if fired and open is false", () => {
      hasSeenMock.mockReturnValue(false);
      render(<BannerByExit {...defaultProps} />);
      expect(markSeenMock).toHaveBeenCalled();
    });
  });

  // --- BannerByTimer ---
  describe("BannerByTimer", () => {
    const markSeenMock = vi.fn();
    const hasSeenMock = vi.fn();
    const triggerProps = { ms: 3000, enabled: true };

    beforeEach(() => {
      vi.spyOn(useTimerTriggerModule, "useTimerTrigger").mockReturnValue([true, vi.fn()] as const);
      vi.spyOn(usePersistenceModule, "usePersistence").mockReturnValue({
        markSeen: markSeenMock,
        hasSeen: hasSeenMock,
        clear: vi.fn(),
      });
    });

    test("calls onOpenChange if fired and not seen", () => {
      hasSeenMock.mockReturnValue(false);
      render(<BannerByTimer {...defaultProps} triggerProps={triggerProps} />);
      expect(defaultProps.onOpenChange).toHaveBeenCalledWith(true);
    });

    test("does not call onOpenChange if already seen", () => {
      hasSeenMock.mockReturnValue(true);
      render(<BannerByTimer {...defaultProps} triggerProps={triggerProps} />);
      expect(defaultProps.onOpenChange).not.toHaveBeenCalled();
    });

    test("calls markSeen if isOk is true", () => {
      hasSeenMock.mockReturnValue(false);
      render(<BannerByTimer {...defaultProps} triggerProps={triggerProps} isOk />);
      expect(markSeenMock).toHaveBeenCalled();
    });

    test("calls markSeen if fired and open is false", () => {
      hasSeenMock.mockReturnValue(false);
      render(<BannerByTimer {...defaultProps} triggerProps={triggerProps} />);
      expect(markSeenMock).toHaveBeenCalled();
    });
  });

  // --- BannerByScroll ---
  describe("BannerByScroll", () => {
    const markSeenMock = vi.fn();
    const hasSeenMock = vi.fn();
    const triggerProps = 50;

    beforeEach(() => {
      vi.spyOn(useScrollTriggerModule, "useScrollTrigger").mockReturnValue([true, vi.fn()] as const);
      vi.spyOn(usePersistenceModule, "usePersistence").mockReturnValue({
        markSeen: markSeenMock,
        hasSeen: hasSeenMock,
        clear: vi.fn(),
      });
    });

    test("calls onOpenChange if fired and not seen", () => {
      hasSeenMock.mockReturnValue(false);
      render(<BannerByScroll {...defaultProps} triggerProps={triggerProps} />);
      expect(defaultProps.onOpenChange).toHaveBeenCalledWith(true);
    });

    test("calls markSeen if isOk is true", () => {
      hasSeenMock.mockReturnValue(false);
      render(<BannerByScroll {...defaultProps} triggerProps={triggerProps} isOk />);
      expect(markSeenMock).toHaveBeenCalled();
    });

    test("calls markSeen if fired and open is false", () => {
      hasSeenMock.mockReturnValue(false);
      render(<BannerByScroll {...defaultProps} triggerProps={triggerProps} />);
      expect(markSeenMock).toHaveBeenCalled();
    });
  });

  // --- BannerByInactivity ---
  describe("BannerByInactivity", () => {
    const markSeenMock = vi.fn();
    const hasSeenMock = vi.fn();
    const triggerProps = 3000;

    beforeEach(() => {
      vi.spyOn(useInactivityTriggerModule, "useInactivityTrigger").mockReturnValue([true, vi.fn()] as const);
      vi.spyOn(usePersistenceModule, "usePersistence").mockReturnValue({
        markSeen: markSeenMock,
        hasSeen: hasSeenMock,
        clear: vi.fn(),
      });
    });

    test("calls onOpenChange if fired and not seen", () => {
      hasSeenMock.mockReturnValue(false);
      render(<BannerByInactivity {...defaultProps} triggerProps={triggerProps} />);
      expect(defaultProps.onOpenChange).toHaveBeenCalledWith(true);
    });

    test("calls markSeen if isOk is true", () => {
      hasSeenMock.mockReturnValue(false);
      render(<BannerByInactivity {...defaultProps} triggerProps={triggerProps} isOk />);
      expect(markSeenMock).toHaveBeenCalled();
    });

    test("calls markSeen if fired and open is false", () => {
      hasSeenMock.mockReturnValue(false);
      render(<BannerByInactivity {...defaultProps} triggerProps={triggerProps} />);
      expect(markSeenMock).toHaveBeenCalled();
    });
  });
});
