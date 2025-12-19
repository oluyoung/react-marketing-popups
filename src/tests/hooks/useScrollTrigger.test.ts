// import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
// import { renderHook, act } from "@testing-library/react";
// import { useScrollTrigger } from "./useScrollTrigger";

// describe("useScrollTrigger", () => {
//   let addSpy: ReturnType<typeof vi.spyOn>;
//   let removeSpy: ReturnType<typeof vi.spyOn>;
//   let scrollTopBackup: number;
//   let scrollHeightBackup: number;
//   let clientHeightBackup: number;

//   beforeEach(() => {
//     addSpy = vi.spyOn(window, "addEventListener");
//     removeSpy = vi.spyOn(window, "removeEventListener");

//     addSpy.mockClear();
//     removeSpy.mockClear();

//     // Backup document.documentElement properties
//     const docEl = document.documentElement;
//     scrollTopBackup = docEl.scrollTop;
//     scrollHeightBackup = docEl.scrollHeight;
//     clientHeightBackup = docEl.clientHeight;

//     // Reset to default
//     docEl.scrollTop = 0;
//     docEl.scrollHeight = 1000;
//     docEl.clientHeight = 500;
//   });

//   afterEach(() => {
//     // Restore
//     const docEl = document.documentElement;
//     docEl.scrollTop = scrollTopBackup;
//     docEl.scrollHeight = scrollHeightBackup;
//     docEl.clientHeight = clientHeightBackup;
//     vi.restoreAllMocks();
//   });

//   const setup = (percent?: number) => renderHook(() => useScrollTrigger(percent));

//   test("returns fired=false initially", () => {
//     const { result } = setup();
//     expect(result.current[0]).toBe(false);
//   });

//   test("adds scroll listener on mount", () => {
//     setup(50);
//     expect(addSpy).toHaveBeenCalledWith("scroll", expect.any(Function), { passive: true });
//   });

//   test("fires immediately if scroll already past threshold", () => {
//     const docEl = document.documentElement;
//     docEl.scrollTop = 300; // 60% scrolled
//     docEl.scrollHeight = 500;
//     docEl.clientHeight = 100;

//     const { result } = setup(50);
//     expect(result.current[0]).toBe(true);
//   });

//   test("fires when user scrolls past threshold", () => {
//     const { result } = setup(50);

//     expect(result.current[0]).toBe(false);

//     const event = new Event("scroll");
//     const docEl = document.documentElement;

//     // Scroll to 60%
//     docEl.scrollTop = 60;
//     docEl.scrollHeight = 100;
//     docEl.clientHeight = 50;

//     act(() => window.dispatchEvent(event));
//     expect(result.current[0]).toBe(true);
//   });

//   test("does not re-add listener if fired=true", () => {
//     const { result, rerender } = setup(50);

//     act(() => result.current[1](true)); // manually fire
//     rerender();

//     expect(addSpy).toHaveBeenCalledTimes(1); // only initial mount
//   });

//   test("cleanup removes scroll listener", () => {
//     const { unmount } = setup(50);
//     unmount();

//     expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
//   });

//   test("setFired can manually set fired=true", () => {
//     const { result } = setup(50);
//     expect(result.current[0]).toBe(false);

//     act(() => result.current[1](true));
//     expect(result.current[0]).toBe(true);
//   });
// });
