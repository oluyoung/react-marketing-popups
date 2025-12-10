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
  type Trirggers
} from "../../types";
import { useAnimatePresence } from "../../hooks/useAnimatePresence";
import styles from "./Banner.module.css";
import '../../animate.min.css';

export interface BannerProps {
  id: string;
  open: boolean;
  position?: AnimationPositions;
  onOpenChange: (open: boolean) => void;
  onClose?: () => void;
  duration?: number;
  children: React.ReactNode;
  animation?: Animations;
  containerClassName?: string;
  contentClassName?: string;
  closeBtnClassname?: string;
  elemProps?: {
    containerElProps?: typeof HTMLDivElement,
    contentElProps?: typeof HTMLDivElement,
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  triggerProps?: any;
  trigger?: Trirggers;
  isOk?: boolean;
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
    if (isMounted && isOk) handleClose();
  }, [isMounted, handleClose, isOk]);

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
