import React from 'react'
import { useTimerTrigger } from '../../hooks/useTimerTrigger';
import { Popout, type PopoutProps } from './Popout';
import { useFiredAndSeenEffect } from '../../hooks/useFiredAndSeen';

export const PopoutByTimer: React.FC<PopoutProps> = (props) => {
  const [fired] = useTimerTrigger(props.triggerProps?.ms || 3000, props.triggerProps?.enabled || true);
  useFiredAndSeenEffect({
    id: props.id || 'rmp-popout-timer',
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
};
