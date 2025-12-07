import React, { useCallback, useEffect, useMemo } from "react";
import cn from "classnames";
import styles from "./SlideIn.module.css";
import { bouncePositionAnimations, fadePositionAnimations, slidePositionAnimations, type SlideInAnimations, } from "../../constants";
import { useAnimatePresence } from "../../hooks/useAnimatePresence";
import '../../animate.min.css';

export interface SlideInProps {
  /** Controls open state */
  open: boolean;

  /** Direction from which the banner or panel slides in */
  position?: SlideInAnimations;

  /** Fired when open state changes (e.g. closing) */
  onOpenChange: (open: boolean) => void;

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

  animation?: 'slide' | 'fade' | 'bounce';

  isOk?: boolean;
}

/**
 * SlideIn Component
 * Smoothly animates content from top, bottom, left, or right edges.
 * Top/bottom are full-width banners; left/right are fixed smaller-width panels.
 */
export const SlideIn: React.FC<SlideInProps> = ({
  open,
  position = "left",
  onOpenChange,
  onClose,
  duration = 300,
  children,
  containerClassName = "",
  contentClassName = "",
  elemProps,
  animation = 'slide',
  isOk,
}) => {
  const [animationIn, animationOut] = useMemo(() => {
    switch (animation) {
      case 'bounce':
        return bouncePositionAnimations[position];
      case 'fade':
        return fadePositionAnimations[position];
      case 'slide':
      default:
        return slidePositionAnimations[position];
    }
  }, [position, animation]);

  const {
    isMounted,
    animationClass,
    handleAnimationEnd,
  } = useAnimatePresence({ open, animationIn, animationOut });

  const handleClose = useCallback(() => {
    onOpenChange(false);
    onClose?.();
  }, [
    onClose,
    onOpenChange
  ]);

  useEffect(() => {
    if (isMounted && isOk) handleClose();
  }, [isMounted, handleClose, isOk]);

  if (!isMounted) return null

  return (
    <div className={cn(styles.rmpSlideinWrapper, styles[`rmpSlidein-${position}`])}>
      <div
        className={cn(styles.rmpSlideinContainer, containerClassName, 'animate__animated', animationClass)}
        style={{ animationDuration: `${duration}ms` }}
        onAnimationEnd={handleAnimationEnd}
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
    </div>
  );
};
