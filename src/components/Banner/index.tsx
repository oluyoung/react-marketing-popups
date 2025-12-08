import type { BannerProps } from './Banner';
import { Banner as BannerCore } from './Banner';
import { BannerByTimer } from './BannerByTimer';
import { BannerByExit} from './BannerByExit';
import { BannerByScroll } from './BannerByScroll';
import { BannerByInactivity } from './BannerByInactivity';
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
  if (trigger === 'exit') BannerComponent = BannerByExit;
  if (trigger === 'scroll') BannerComponent = BannerByScroll;
  if (trigger === 'inactivity') BannerComponent = BannerByInactivity;

  return (
    <BannerComponent {...props}>
      {props.children}
    </BannerComponent>
  )
};
