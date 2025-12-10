import React from 'react';
import { useInactivityTrigger } from '../../hooks/useInactivityTrigger';
import { Popout, type PopoutProps } from './Popout';
import { useFiredAndSeenEffect } from '../../hooks/useFiredAndSeen';

export const PopoutByInactivity: React.FC<PopoutProps> = (props) => {
  const [fired] = useInactivityTrigger(props.triggerProps);
  useFiredAndSeenEffect({
    id: props.id || 'rmp-popout-inactivity',
    fired,
    isOk: props.isOk,
    onOpenChange: props.onOpenChange,
    open: props.open
  });
  return (
    <Popout {...props}>
      {props.children}
    </Popout>
  )
}
