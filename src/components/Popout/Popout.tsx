import React, {
  useEffect,
  useId,
  useMemo
} from "react";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import styles from "./Popout.module.css";
import cn from 'classnames';
import '../../animate.min.css';
import { useAnimatePresence } from "../../hooks/useAnimatePresence";
import { zoomPositionAnimations } from "../../constants";

export type PopoutProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose?: () => void;
  ariaLabel?: string;
  closeOnOverlay?: boolean;
  lockScroll?: boolean;
  children?: React.ReactNode;
  id?: string;
  overlayClassName?: string;
  contentClassName?: string;
  elemProps?: {
    overlayElProps?: typeof HTMLDivElement,
    containerElProps?: typeof HTMLDivElement,
  }
  animation?: string;
  duration?: number;
  isOk?: boolean;
};

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
  isOk
}) => {
  const uid = useId();
  const body = typeof document !== "undefined" ? document.body : null;
  const containerRef = useFocusTrap<HTMLDivElement>(open);
  
  const [animationIn, animationOut] = useMemo(() => {
    switch(animation) {
      case 'zoom':
      default:
        return zoomPositionAnimations['center'];
    }
  }, [animation])
  const { isMounted, animationClass, handleAnimationEnd } = useAnimatePresence({ open, animationIn, animationOut })

  const handleClose = () => {}

  useEffect(() => {
    if (!open || !body) return;
    const originalOverflow = document.body.style.overflow;
    if (lockScroll) document.body.style.overflow = "hidden";
    return () => {
      if (lockScroll) document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    if (isMounted && isOk) handleClose();
  }, [isMounted, handleClose, isOk]);

  if (!isMounted || !body) return null;

  return (
    <div
      id={id ?? `rmp-overlay-${uid}`}
      className={cn(styles.rmpOverlay, overlayClassName)}
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (closeOnOverlay && e.target === e.currentTarget) {
          onOpenChange?.(false);
        };
      }}
      {...(elemProps && elemProps.overlayElProps ? elemProps.overlayElProps : {})}
    >
      <div className={styles.rmpPopoutWrapper}>
        <div
          className={cn('animate__animated', styles.rmpContent, contentClassName, animationClass)}
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
            className={styles.nlpClose}
            onClick={() => {
              onOpenChange?.(false);
            }}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};
