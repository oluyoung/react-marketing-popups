import React, {
  useCallback,
  useEffect,
  useId,
  useMemo
} from "react";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import styles from "./Popout.module.css";
import cn from 'classnames';
import { useAnimatePresence } from "../../hooks/useAnimatePresence";
import {
  bouncePositionAnimations,
  fadePositionAnimations,
  zoomPositionAnimations
} from "../../constants";
import {
  type PopoutAnimationPositions,
  type PopoutAnimations,
  type SharedProps,
} from "../../types";
import '../../animate.min.css';

export interface PopoutProps extends SharedProps {
  /** close modal on overlay click */
  closeOnOverlay?: boolean;

  /** Sets body's overflow hidden */
  lockScroll?: boolean;

  /** className for overlay element */
  overlayClassName?: string;

  /** className for content container element */
  contentClassName?: string;

  /** Props for overlay element and content container element */
  elemProps?: {
    overlayElProps?: typeof HTMLDivElement,
    containerElProps?: typeof HTMLDivElement,
  }

  /** Animation used for open and close of component */
  animation?: PopoutAnimations;
};

const position = 'center' as PopoutAnimationPositions;

export const Popout: React.FC<PopoutProps> = ({
  onOpenChange,
  open = false,
  closeOnOverlay = true,
  lockScroll = false,
  children,
  id,
  overlayClassName = "",
  contentClassName = "",
  elemProps,
  animation = "zoom",
  duration = 400,
  isOk,
  closeOnOk,
  closeBtnClassname,
  onClose,
}) => {
  const uid = useId();
  const body = typeof document !== "undefined" ? document.body : null;
  const containerRef = useFocusTrap<HTMLDivElement>(open);

  const [animationIn, animationOut] = useMemo(() => {
    switch (animation) {
      case 'bounce':
        return bouncePositionAnimations[position];
      case 'fade':
        return fadePositionAnimations[position];
      case 'zoom':
      default:
        return zoomPositionAnimations[position];
    }
  }, [animation])
  const { isMounted, animationClass, handleAnimationEnd } = useAnimatePresence({ open, animationIn, animationOut })

  const handleClose = useCallback(() => {
    onOpenChange(false);
    onClose?.();
  }, [onOpenChange, onClose]);

  useEffect(() => {
    if (!open || !body) return;
    const originalOverflow = document.body.style.overflow;
    if (lockScroll) document.body.style.overflow = "hidden";
    return () => {
      if (lockScroll) document.body.style.overflow = originalOverflow;
    };
  }, [open, lockScroll, body]);

  useEffect(() => {
    if (isMounted && isOk && closeOnOk) handleClose();
  }, [closeOnOk, handleClose, isMounted, isOk]);

  if (!isMounted || !body) return null;

  return (
    <div
      id={id ?? `rmp-overlay-${uid}`}
      className={cn(styles.rmpOverlay, overlayClassName)}
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (closeOnOverlay && e.target === e.currentTarget) {
          handleClose();
        };
      }}
      {...(elemProps && elemProps.overlayElProps ? elemProps.overlayElProps : {})}
    >
      <div
        className={cn(styles.rmpContent, contentClassName, 'animate__animated', animationClass)}
        style={{ animationDuration: `${duration}ms` }}
        ref={containerRef}
        onAnimationEnd={handleAnimationEnd}
        tabIndex={-1}
        {...(elemProps && elemProps.containerElProps ? elemProps.containerElProps : {})}
      >
        {children}
        <button
          type="button"
          aria-label="Close"
          className={cn(styles.rmpClose, closeBtnClassname)}
          onClick={handleClose}
        >
          ×
        </button>
      </div>
    </div>
  );
};
