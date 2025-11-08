import { useEffect } from 'react';
import type { PopoutProps } from './Popout';
import { Popout as PopoutCore } from './Popout';
import { PopoutByTimer } from './PopoutByTimer';
import { PopoutByInactivity } from './PopoutByInactivity';
import { PopoutByExit } from './PopoutByExit';
import { PopoutByScroll } from './PopoutByScroll';

export const Popout = ({
  trigger = '',
  isComplete = false,
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
