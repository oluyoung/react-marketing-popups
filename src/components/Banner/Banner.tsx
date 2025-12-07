import React, { useCallback, useEffect, useMemo, useRef } from "react";
// import { useSlideInVisibility } from "../../hooks/useSlideInVisibility";
import cn from 'classnames';
import styles from "./Banner.module.css";
// import { useAnimationClass } from "../../hooks/useAnimationClass";
import { bouncePositionAnimations, fadePositionAnimations, slidePositionAnimations, type SlideInAnimations } from "../../constants";
import '../../animate.min.css';
// import { useAnimationVisibility } from "../../hooks/useAnimationVisibility";
import { useAnimatePresence } from "../../hooks/useAnimatePresence";

export interface BannerProps {
  id: string;
  open: boolean;
  position?: SlideInAnimations;
  onOpenChange: (open: boolean) => void;
  onClose?: () => void;
  duration?: number;
  children: React.ReactNode;
  animation?: "slide" | "bounce" | "fade";
  containerClassName?: string;
  contentClassName?: string;
  elemProps?: {
    containerElProps?: typeof HTMLDivElement,
    contentElProps?: typeof HTMLDivElement,
  }
  trigger?: 'timer' | 'exit' | 'scroll' | 'inactivity' | '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  triggerProps?: any;
  isOk?: boolean;
}

export const Banner: React.FC<BannerProps> = ({
  id,
  open,
  position = "bottom",
  onOpenChange,
  duration = 300,
  children,
  animation = "slide",
  containerClassName,
  contentClassName = '',
  onClose,
  isOk
}) => {
  const bannerRef = useRef<HTMLDivElement | null>(null);

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
    >
      <div className={cn(styles.rmpBannerContent, contentClassName)}>
        {children}
        <button className={styles.rmpBannerCloseBtn} onClick={handleClose} aria-label="Close">
          ✕
        </button>
      </div>
    </div>
  );
};

/**
 when open, mount && display
 when visible, slide out
 when !visible, slide in
 when !open, dismount
 */