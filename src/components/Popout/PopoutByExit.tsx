import React from 'react';
import { Popout } from '.';
import { useExitIntentTrigger } from '../../hooks/useExitIntentTrigger';
import { usePersistence } from '../../hooks/usePersistence';
import type { PopoutProps } from './Popout';

export const PopoutByExit: React.FC<PopoutProps> = (props) => {
  const [fired] = useExitIntentTrigger();
  const { hasSeen, markSeen } = usePersistence(props.id || 'rmp-popout-exit');
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (fired && !hasSeen()) setOpen(true);
    if (props.isComplete) {
      markSeen();
      setOpen(false);
    }
  }, [fired, props.isComplete]);

  return (
    <Popout
      {...props}
      open={open}
      onClose={() => { 
        setOpen(false);
        markSeen(); 
        if (props.onClose) props.onClose();
      }}
    >
      {props.children}
    </Popout>
  );
};
