export type AnimationPositions = "top" | "bottom" | "left" | "right";
export type PopoutAnimationPositions = AnimationPositions & "center";
export type Animations = "fade" | "bounce" | "slide";
export type PopoutAnimations = "zoom" | "fade" | "bounce";
export type Trirggers = "exit" | "inactivity" | "scroll" | "timer";

export interface SharedProps {
  /** Called when open state changes (e.g. onOpenChange(true)) */
  onOpenChange: (open: boolean) => void;

  /** Called when panel closes */
  onClose?: () => void;

  /** Identifier for the slide in when using persistence */
  id: string;

  /** Controls open state */
  open: boolean;

  /** Duration of animation in ms */
  duration?: number;

  /** Content within banner */
  children: React.ReactNode;

  /** Props for trigger as defined in the selected trigger's hook */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  triggerProps?: any;

  /** Trigger function to call */
  trigger?: Trirggers;

  /** User-defined value for when content has successful user engagement */
  isOk?: boolean;

  /** Flag to close banner when isOk is true */
  closeOnOk?: boolean;

  /** className for close button */
  closeBtnClassname?: string;
}
