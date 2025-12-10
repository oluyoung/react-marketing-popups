import React, { useCallback, useEffect, useMemo, useRef } from "react";
import cn from 'classnames';
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
import styles from "./Banner.module.css";
import '../../animate.min.css';

export interface BannerProps extends SharedProps {
  /** Direction from which the banner comes in */
  position?: AnimationPositions;

  /** Animation used for open and close of component */
  animation?: Animations;

  /** className for root element */
  containerClassName?: string;

  /** className for content container element */
  contentClassName?: string;

  /** Props for root element and content container element */
  elemProps?: {
    containerElProps?: typeof HTMLDivElement,
    contentElProps?: typeof HTMLDivElement,
  }
}

/**
 * Banner Component
 * Smoothly animates content from top, bottom, left or right edges.
 * Top/bottom are fixed full-width banners; left/right are fixed full screen-height smaller-width panels.
 */
export const Banner: React.FC<BannerProps> = ({
  id,
  open,
  position = "bottom",
  onOpenChange,
  duration = 300,
  children,
  animation = "slide",
  containerClassName,
  contentClassName,
  closeBtnClassname,
  onClose,
  isOk,
  closeOnOk,
  elemProps
}) => {
  const bannerRef = useRef<HTMLDivElement | null>(null);

  const [animationIn, animationOut] = useMemo(() => {
    switch (animation) {
      case 'bounce':
        return bouncePositionAnimations[position as PopoutAnimationPositions];
      case 'fade':
        return fadePositionAnimations[position as PopoutAnimationPositions];
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
    if (isMounted && isOk && closeOnOk) handleClose();
  }, [isMounted, handleClose, isOk, closeOnOk]);

  if (!isMounted) return null;

  return (
    <div
      id={id}
      className={cn(styles.rmpBanner, styles[`rmpBanner-${position}`], containerClassName, 'animate__animated', animationClass)}
      onAnimationEnd={handleAnimationEnd}
      style={{ animationDuration: `${duration}ms` }}
      role="dialog"
      aria-modal="true"
      ref={bannerRef}
      {...(elemProps && elemProps.containerElProps ? elemProps.containerElProps : {})}
    >
      <div className={cn(styles.rmpBannerContent, contentClassName)} {...(elemProps && elemProps.contentElProps ? elemProps.contentElProps : {})}>
        {children}
        <button className={cn(styles.rmpBannerCloseBtn, closeBtnClassname)} onClick={handleClose} aria-label="Close">
          ✕
        </button>
      </div>
    </div>
  );
};
