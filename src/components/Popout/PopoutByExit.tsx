import React from 'react';
import { Popout } from '.';
import { useExitIntentTrigger } from '../../hooks/useExitIntentTrigger';
import type { PopoutProps } from './Popout';
import { useFiredAndSeenEffect } from '../../hooks/useFiredAndSeen';

export const PopoutByExit: React.FC<PopoutProps> = (props) => {
  const [fired] = useExitIntentTrigger();
  useFiredAndSeenEffect({
    id: props.id || 'rmp-popout-exit',
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
