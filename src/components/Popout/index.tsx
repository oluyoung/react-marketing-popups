import type { PopoutProps } from './Popout';
import { Popout as PopoutCore } from './Popout';
import { PopoutByTimer } from './PopoutByTimer';
import { PopoutByInactivity } from './PopoutByInactivity';
import { PopoutByExit } from './PopoutByExit';
import { PopoutByScroll } from './PopoutByScroll';

/**
 * Popout Component
 * Smoothly animates content into view
 * Choose a trigger for the desired action
 * TODO: Choose a position for it to come in from
 * TODO: Choose an animation for it to use
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
