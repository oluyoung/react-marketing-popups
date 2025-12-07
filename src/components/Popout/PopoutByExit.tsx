import React from 'react';
import { Popout } from '.';
import { useExitIntentTrigger } from '../../hooks/useExitIntentTrigger';
import { usePersistence } from '../../hooks/usePersistence';
import type { PopoutProps } from './Popout';

export const PopoutByExit: React.FC<PopoutProps> = (props) => {
  const [fired] = useExitIntentTrigger();
  const { hasSeen, markSeen } = usePersistence(props.id || 'rmp-popout-exit');

  React.useEffect(() => {
    if (fired && !hasSeen()) props.onOpenChange(true);
    if (props.isOk) {
      markSeen();
      props.onOpenChange(false);
    }
  }, [fired, hasSeen, markSeen, props, props.isOk]);

  return (
    <Popout
      {...props}
      open={props.open}
      onClose={() => {
        markSeen(); 
        props.onOpenChange(false);
      }}
    >
      {props.children}
    </Popout>
  );
};
