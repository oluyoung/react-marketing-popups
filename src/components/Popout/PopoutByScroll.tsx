import React from 'react'
import { useScrollTrigger } from '../../hooks/useScrollTrigger';
import { Popout, type PopoutProps } from './Popout';
import { useFiredAndSeenEffect } from '../../hooks/useFiredAndSeen';

export const PopoutByScroll: React.FC<PopoutProps> = (props) => {
  const [fired] = useScrollTrigger(props.triggerProps);
  useFiredAndSeenEffect({
    id: props.id || 'rmp-popout-scroll',
    fired,
    isOk: props.isOk,
    onOpenChange: props.onOpenChange,
    open: props.open
  });
  return (
    <Popout {...props}>
      {props.children}
    </Popout>
  );
}
