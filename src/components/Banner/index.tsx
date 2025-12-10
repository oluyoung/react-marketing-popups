import type { BannerProps } from './Banner';
import { Banner as BannerCore } from './Banner';
import { BannerByTimer } from './BannerByTimer';
import { BannerByExit} from './BannerByExit';
import { BannerByScroll } from './BannerByScroll';
import { BannerByInactivity } from './BannerByInactivity';
import '../../animate.min.css';

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
