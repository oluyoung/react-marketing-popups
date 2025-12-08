import type { PopoutProps } from './Popout';
import { Popout as PopoutCore } from './Popout';
import { PopoutByTimer } from './PopoutByTimer';
import { PopoutByInactivity } from './PopoutByInactivity';
import { PopoutByExit } from './PopoutByExit';
import { PopoutByScroll } from './PopoutByScroll';

/**
 * Popout Component
 * Smoothly animates content into view
 * Choose an animation for the desired animation
 */
export const Popout = ({
  trigger,
  ...props
}: PopoutProps) => {
  let PopoutComponent = PopoutCore;
  if (trigger === 'timer') PopoutComponent = PopoutByTimer;
  if (trigger === 'scroll') PopoutComponent = PopoutByScroll;
  if (trigger === 'inactivity') PopoutComponent = PopoutByInactivity;
  if (trigger === 'exit') PopoutComponent = PopoutByExit;

  return (
    <PopoutComponent {...props}>
      {props.children}
    </PopoutComponent>
  )
};
