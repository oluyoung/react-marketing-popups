import { render } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { SlideInByExit } from "../../components/SlideIn/SlideInByExit";
import { SlideInByTimer } from "../../components/SlideIn/SlideInByTimer";
import { SlideInByScroll } from "../../components/SlideIn/SlideInByScroll";
import { SlideInByInactivity } from "../../components/SlideIn/SlideInByInactivity";
import * as useExitIntentTriggerModule from "../../hooks/useExitIntentTrigger";
import * as useTimerTriggerModule from "../../hooks/useTimerTrigger";
import * as useScrollTriggerModule from "../../hooks/useScrollTrigger";
import * as useInactivityTriggerModule from "../../hooks/useInactivityTrigger";
import * as usePersistenceModule from "../../hooks/usePersistence";

describe("SlideIn trigger components", () => {
  const defaultProps = {
    id: "test-slidein",
    open: false,
    onOpenChange: vi.fn(),
    children: <div>Content</div>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("SlideInByExit", () => {
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
      render(<SlideInByExit {...defaultProps} />);
      expect(defaultProps.onOpenChange).toHaveBeenCalledWith(true);
    });

    test("calls markSeen if isOk is true or fired and open is false", () => {
      hasSeenMock.mockReturnValue(false);
      render(<SlideInByExit {...defaultProps} isOk />);
      expect(markSeenMock).toHaveBeenCalled();
    });

    test("snapshot", () => {
      const { container } = render(<SlideInByExit {...defaultProps} />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("SlideInByTimer", () => {
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
      render(<SlideInByTimer {...defaultProps} triggerProps={triggerProps} />);
      expect(defaultProps.onOpenChange).toHaveBeenCalledWith(true);
    });

    test("calls markSeen if isOk is true or fired and open is false", () => {
      hasSeenMock.mockReturnValue(false);
      render(<SlideInByTimer {...defaultProps} triggerProps={triggerProps} isOk />);
      expect(markSeenMock).toHaveBeenCalled();
    });

    test("snapshot", () => {
      const { container } = render(<SlideInByTimer {...defaultProps} triggerProps={triggerProps} />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("SlideInByScroll", () => {
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
      render(<SlideInByScroll {...defaultProps} triggerProps={triggerProps} />);
      expect(defaultProps.onOpenChange).toHaveBeenCalledWith(true);
    });

    test("calls markSeen if isOk is true or fired and open is false", () => {
      hasSeenMock.mockReturnValue(false);
      render(<SlideInByScroll {...defaultProps} triggerProps={triggerProps} isOk />);
      expect(markSeenMock).toHaveBeenCalled();
    });

    test("snapshot", () => {
      const { container } = render(<SlideInByScroll {...defaultProps} triggerProps={triggerProps} />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("SlideInByInactivity", () => {
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
      render(<SlideInByInactivity {...defaultProps} triggerProps={triggerProps} />);
      expect(defaultProps.onOpenChange).toHaveBeenCalledWith(true);
    });

    test("calls markSeen if isOk is true or fired and open is false", () => {
      hasSeenMock.mockReturnValue(false);
      render(<SlideInByInactivity {...defaultProps} triggerProps={triggerProps} isOk />);
      expect(markSeenMock).toHaveBeenCalled();
    });

    test("snapshot", () => {
      const { container } = render(<SlideInByInactivity {...defaultProps} triggerProps={triggerProps} />);
      expect(container).toMatchSnapshot();
    });
  });
});
