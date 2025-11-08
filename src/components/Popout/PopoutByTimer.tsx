import React from 'react'
import { useTimerTrigger } from '../../hooks/useTimerTrigger';
import { Popout, type PopoutProps } from './Popout';
import { usePersistence } from '../../hooks/usePersistence';

export const PopoutByTimer: React.FC<PopoutProps> = (props) => {
  const [fired] = useTimerTrigger(props.triggerProps);
  const { hasSeen, markSeen } = usePersistence(props.id || 'rmp-popout-timer');
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
