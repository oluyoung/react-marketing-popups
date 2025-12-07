import type { BannerProps } from './Banner';
import { Banner as BannerCore } from './Banner';
import { BannerByTimer } from './BannerByTimer';
import '../../animate.min.css';

/**
 * Banner Component
 * Smoothly animates content into view
 * Choose a trigger for the desired action
 * TODO: Choose a position for it to come in from - center
 * TODO: Choose an animation for it to use - fadeIn
 */
export const Banner = ({
  trigger,
  ...props
}: BannerProps) => {
  let BannerComponent = BannerCore;
  if (trigger === 'timer') BannerComponent = BannerByTimer;

  return (
    <BannerComponent {...props}>
      {props.children}
    </BannerComponent>
  )
};
