import React from "react";
import cn from "classnames";
import styles from "./SlideIn.module.css";

export interface SlideInProps {
  /** Controls open state */
  open: boolean;

  /** Direction from which the banner or panel slides in */
  position?: "top" | "bottom" | "left" | "right";

  /** Fired when open state changes (e.g. closing) */
  onOpenChange?: (open: boolean) => void;

  /** Fired when open state changes (e.g. closing) */
  onClose?: () => void;

  /** Duration of slide animation in ms */
  duration?: number;

  /** Child content (newsletter, text, CTA, etc.) */
  children: React.ReactNode;

  containerClassName?: string;
  contentClassName?: string;

  elemProps?: {
    containerElProps?: typeof HTMLDivElement,
    contentElProps?: typeof HTMLDivElement,
  }
}

/**
 * SlideIn Component
 * Smoothly animates content from top, bottom, left, or right edges.
 * Top/bottom are full-width banners; left/right are fixed smaller-width panels.
 */
export const SlideIn: React.FC<SlideInProps> = ({
  open,
  position = "bottom",
  onOpenChange,
  onClose,
  duration = 300,
  children,
  containerClassName = "",
  contentClassName = "",
  elemProps,
}) => {
  const [visible, setVisible] = React.useState(open);
  console.log({ open, position: [styles.rmpSlideinIsOpen, styles.rmpSlideinIsClosed],  })
  React.useEffect(() => {
    if (open) setVisible(true);
  }, [open]);

  const handleTransitionEnd = () => {
    if (!open) setVisible(false);
  };

  const handleClose = () => {
    onOpenChange?.(false);
    onClose?.();
  };

  if (!visible && !open) return null;

  return (
    <div
      className={cn(styles.rmpSlideinContainer, styles[`rmpSlidein-${position}`], open ? styles.rmpSlideinIsOpen : styles.rmpSlideinIsClosed, containerClassName)}
      style={{ transitionDuration: `${duration}ms` }}
      onTransitionEnd={handleTransitionEnd}
      role="dialog"
      aria-modal="true"
      {...(elemProps && elemProps.containerElProps ? elemProps.containerElProps : {})}
    >
      <div className={cn(styles.rmpSlideinContent, contentClassName)} {...(elemProps && elemProps.contentElProps ? elemProps.contentElProps : {})}>
        {children}
        <button
          className={styles.rmpSlideinCloseBtn}
          onClick={handleClose}
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
