import React, { useCallback, useEffect, useMemo } from "react";
import cn from "classnames";
import styles from "./SlideIn.module.css";
import {
  bouncePositionAnimations,
  fadePositionAnimations,
  slidePositionAnimations,
} from "../../constants";
import {
  type AnimationPositions,
  type Animations,
  type PopoutAnimationPositions,
  type SharedProps,
} from "../../types";
import { useAnimatePresence } from "../../hooks/useAnimatePresence";
import '../../animate.min.css';

export interface SlideInProps extends SharedProps {
  /** Direction from which the panel slides in */
  position?: Omit<AnimationPositions, 'top' | 'bottom'>;

  /** className for root element */
  wrapperClassName?: string;
  
  /** className for container element */
  containerClassName?: string;

  /** className for content container element */
  contentClassName?: string;

  /** Props for root element and content container element */
  elemProps?: {
    wrapperElProps?: typeof HTMLDivElement,
    containerElProps?: typeof HTMLDivElement,
    contentElProps?: typeof HTMLDivElement,
  }

  /** Animation used for open and close of component */
  animation?: Animations;
}

/**
 * SlideIn Component
 * Smoothly animates content from left or right edges.
 */
export const SlideIn: React.FC<SlideInProps> = ({
  open,
  position = "left",
  onOpenChange,
  onClose,
  duration = 300,
  children,
  wrapperClassName,
  containerClassName = "",
  contentClassName = "",
  closeBtnClassname,
  elemProps,
  animation = 'slide',
  isOk,
}) => {
  const [animationIn, animationOut] = useMemo(() => {
    switch (animation) {
      case 'bounce':
        return bouncePositionAnimations[position as PopoutAnimationPositions];
      case 'fade':
        return fadePositionAnimations[position as PopoutAnimationPositions];
      case 'slide':
      default:
        return slidePositionAnimations[position as AnimationPositions];
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
    <div className={cn(styles.rmpSlideinWrapper, styles[`rmpSlidein-${position}`], wrapperClassName)} {...(elemProps && elemProps.wrapperElProps ? elemProps.wrapperElProps : {})}>
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
            className={cn(styles.rmpSlideinCloseBtn, closeBtnClassname)}
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
