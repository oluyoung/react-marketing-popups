import { SlideIn as SlideInCore, type SlideInProps } from './SlideIn';
import { SlideInByTimer } from './SlideInByTimer';
import { SlideInByExit } from './SlideInByExit';
import { SlideInByScroll } from './SlideInByScroll';
import { SlideInByInactivity } from './SlideInByInactivity';
import '../../animate.min.css';

export const SlideIn = ({
  trigger,
  ...props
}: SlideInProps) => {
  let SlideInComponent = SlideInCore;
  if (trigger === 'timer') SlideInComponent = SlideInByTimer;
  if (trigger === 'exit') SlideInComponent = SlideInByExit;
  if (trigger === 'scroll') SlideInComponent = SlideInByScroll;
  if (trigger === 'inactivity') SlideInComponent = SlideInByInactivity;

  return (
    <SlideInComponent {...props}>
      {props.children}
    </SlideInComponent>
  )
};
