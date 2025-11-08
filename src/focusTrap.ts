// let lastContainer: HTMLElement | null = null;
// let previousActive: Element | null = null;
// let keyHandler: (e: KeyboardEvent) => void;

// export function trapFocus(container: HTMLElement) {
//   if (!container) return;
//   lastContainer = container;
//   previousActive = document.activeElement;
//   const focusable = container.querySelectorAll<HTMLElement>(
//     'a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])'
//   );

//   const first = focusable[0];
//   const last = focusable[focusable.length - 1];

//   keyHandler = (e: KeyboardEvent) => {
//     if (e.key === "Escape") {
//       return;
//     }
//     if (e.key !== "Tab" || focusable.length === 0) return;

//     if (e.shiftKey && document.activeElement === first) {
//       e.preventDefault();
//       (last || first).focus();
//     } else if (!e.shiftKey && document.activeElement === last) {
//       e.preventDefault();
//       (first || last).focus();
//     }
//   };

//   document.addEventListener("keydown", keyHandler);
//   if (first) first.focus();
//   else container.focus();
// }

// export function releaseFocus() {
//   document.removeEventListener("keydown", keyHandler);
//   keyHandler = undefined as any;
//   lastContainer = null;
//   previousActive = null;
// }
