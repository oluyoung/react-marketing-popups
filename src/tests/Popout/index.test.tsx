import React from "react";
import { render } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { Popout } from "../../components/Popout/Popout";
import {
  PopoutByExit,
} from "../../components/Popout/PopoutByExit";
import {
  PopoutByInactivity,
} from "../../components/Popout/PopoutByInactivity";
import {
  PopoutByScroll,
} from "../../components/Popout/PopoutByScroll";
import {
  PopoutByTimer
} from "../../components/Popout/PopoutByTimer";
import * as useExitIntentTriggerModule from "../../hooks/useExitIntentTrigger";
import * as useInactivityTriggerModule from "../../hooks/useInactivityTrigger";
import * as useScrollTriggerModule from "../../hooks/useScrollTrigger";
import * as useTimerTriggerModule from "../../hooks/useTimerTrigger";
import * as usePersistenceModule from "../../hooks/usePersistence";

describe("Popout Trigger Components", () => {
  const defaultProps = {
    id: "test-popout",
    open: false,
    onOpenChange: vi.fn(),
    children: <div>Content</div>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // --- Renderer function ---
  const renderPopout = (Component: React.FC<any>, props?: any) => {
    return render(<Component {...defaultProps} {...props} />);
  };

  const mockPersistence = (overrides?: Partial<ReturnType<typeof usePersistenceModule.usePersistence>>) => {
    vi.spyOn(usePersistenceModule, "usePersistence").mockReturnValue({
      hasSeen: vi.fn().mockReturnValue(false),
      markSeen: vi.fn(),
      clear: vi.fn(),
      ...overrides,
    });
  };

  test("Popout renders PopoutCore by default", () => {
    const { container } = renderPopout(Popout, { trigger: undefined });
    expect(container).toMatchSnapshot();
  });

  // --- PopoutByExit ---
  test("PopoutByExit fires onOpenChange when fired and not seen", () => {
    vi.spyOn(useExitIntentTriggerModule, "useExitIntentTrigger").mockReturnValue([true, vi.fn()]);
    mockPersistence();
    renderPopout(PopoutByExit);
    expect(defaultProps.onOpenChange).toHaveBeenCalledWith(true);
  });

  test("PopoutByExit calls markSeen when isOk true", () => {
    vi.spyOn(useExitIntentTriggerModule, "useExitIntentTrigger").mockReturnValue([false, vi.fn()]);
    const markSeen = vi.fn();
    mockPersistence({ markSeen });
    renderPopout(PopoutByExit, { isOk: true });
    expect(markSeen).toHaveBeenCalled();
  });

  test("PopoutByExit calls markSeen when fired and !open", () => {
    vi.spyOn(useExitIntentTriggerModule, "useExitIntentTrigger").mockReturnValue([true, vi.fn()]);
    const markSeen = vi.fn();
    mockPersistence({ markSeen });
    renderPopout(PopoutByExit, { open: false });
    expect(markSeen).toHaveBeenCalled();
  });

  // --- PopoutByTimer ---
  test("PopoutByTimer fires onOpenChange when fired and not seen", () => {
    vi.spyOn(useTimerTriggerModule, "useTimerTrigger").mockReturnValue([true, vi.fn()]);
    mockPersistence();
    renderPopout(PopoutByTimer, { triggerProps: { ms: 300 } });
    expect(defaultProps.onOpenChange).toHaveBeenCalledWith(true);
  });

  test("PopoutByTimer calls markSeen when isOk true", () => {
    vi.spyOn(useTimerTriggerModule, "useTimerTrigger").mockReturnValue([false, vi.fn()]);
    const markSeen = vi.fn();
    mockPersistence({ markSeen });
    renderPopout(PopoutByTimer, { isOk: true });
    expect(markSeen).toHaveBeenCalled();
  });

  test("PopoutByTimer calls markSeen when fired and !open", () => {
    vi.spyOn(useTimerTriggerModule, "useTimerTrigger").mockReturnValue([true, vi.fn()]);
    const markSeen = vi.fn();
    mockPersistence({ markSeen });
    renderPopout(PopoutByTimer, { open: false });
    expect(markSeen).toHaveBeenCalled();
  });

  // --- PopoutByScroll ---
  test("PopoutByScroll fires onOpenChange when fired and not seen", () => {
    vi.spyOn(useScrollTriggerModule, "useScrollTrigger").mockReturnValue([true, vi.fn()]);
    mockPersistence();
    renderPopout(PopoutByScroll);
    expect(defaultProps.onOpenChange).toHaveBeenCalledWith(true);
  });

  test("PopoutByScroll calls markSeen when isOk true", () => {
    vi.spyOn(useScrollTriggerModule, "useScrollTrigger").mockReturnValue([false, vi.fn()]);
    const markSeen = vi.fn();
    mockPersistence({ markSeen });
    renderPopout(PopoutByScroll, { isOk: true });
    expect(markSeen).toHaveBeenCalled();
  });

  test("PopoutByScroll calls markSeen when fired and !open", () => {
    vi.spyOn(useScrollTriggerModule, "useScrollTrigger").mockReturnValue([true, vi.fn()]);
    const markSeen = vi.fn();
    mockPersistence({ markSeen });
    renderPopout(PopoutByScroll, { open: false });
    expect(markSeen).toHaveBeenCalled();
  });

  // --- PopoutByInactivity ---
  test("PopoutByInactivity fires onOpenChange when fired and not seen", () => {
    vi.spyOn(useInactivityTriggerModule, "useInactivityTrigger").mockReturnValue([true, vi.fn()]);
    mockPersistence();
    renderPopout(PopoutByInactivity);
    expect(defaultProps.onOpenChange).toHaveBeenCalledWith(true);
  });

  test("PopoutByInactivity calls markSeen when isOk true", () => {
    vi.spyOn(useInactivityTriggerModule, "useInactivityTrigger").mockReturnValue([false, vi.fn()]);
    const markSeen = vi.fn();
    mockPersistence({ markSeen });
    renderPopout(PopoutByInactivity, { isOk: true });
    expect(markSeen).toHaveBeenCalled();
  });

  test("PopoutByInactivity calls markSeen when fired and !open", () => {
    vi.spyOn(useInactivityTriggerModule, "useInactivityTrigger").mockReturnValue([true, vi.fn()]);
    const markSeen = vi.fn();
    mockPersistence({ markSeen });
    renderPopout(PopoutByInactivity, { open: false });
    expect(markSeen).toHaveBeenCalled();
  });
});
