import React, {
  // useEffect, 
  useId
} from "react";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import styles from "./Popout.module.css";
import cn from 'classnames';

export type PopoutProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose?: () => void;
  ariaLabel?: string;
  closeOnOverlay?: boolean;
  // lockScroll?: boolean;
  children?: React.ReactNode;
  id?: string;
  overlayClassName?: string;
  contentClassName?: string;
  trigger?: 'timer' | 'exit' | 'scroll' | 'inactivity' | '';
  triggerProps?: any;
  isComplete?: boolean;
  elemProps?: {
    overlayElProps?: HTMLDivElement,
    containerElProps?: HTMLDivElement,
  }
};

export const Popout: React.FC<PopoutProps> = ({
  onOpenChange,
  onClose,
  open = false,
  closeOnOverlay = true,
  // lockScroll = true,
  children,
  id,
  overlayClassName = "",
  contentClassName = "",
  elemProps,
}) => {
  const uid = useId();
  const root = typeof document !== "undefined" ? document.body : null;
  const containerRef = useFocusTrap<HTMLDivElement>(open);

  // useEffect(() => {
  //   if (!open || !root) return;
  //   const originalOverflow = document.body.style.overflow;
  //   if (lockScroll) document.body.style.overflow = "hidden";
  //   return () => {
  //     if (lockScroll) document.body.style.overflow = originalOverflow;
  //   };
  // }, []);

  if (!open || !root) return null;

  return (
    <div
      id={id ?? `rmp-overlay-${uid}`}
      className={cn(styles.rmpOverlay, overlayClassName)}
      role="dialog"
      aria-label={ariaLabel}
      aria-modal="true"
      onMouseDown={(e) => {
        if (closeOnOverlay && e.target === e.currentTarget) onOpenChange(false);
      }}
      {...(elemProps && elemProps.overlayElProps ? elemProps.overlayElProps : {})}
    >
      <div
        className={cn(styles.rmpContent, contentClassName)}
        ref={containerRef}
        tabIndex={-1}
        {...(elemProps && elemProps.overlayElProps ? elemProps.overlayElProps : {})}
      >
        {children}
        <button
          type="button"
          aria-label="Close"
          className={styles.nlpClose}
          onClick={() => onClose && onClose()}
        >
          ×
        </button>
      </div>
    </div>
  );
};
