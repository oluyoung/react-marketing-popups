import React from 'react';
import { useInactivityTrigger } from '../../hooks/useInactivityTrigger'
import { usePersistence } from '../../hooks/usePersistence';
import { Popout, type PopoutProps } from './Popout';

export const PopoutByInactivity: React.FC<PopoutProps> = (props) => {
  const [fired] = useInactivityTrigger(props.triggerProps);
  const { hasSeen, markSeen } = usePersistence(props.id || 'rmp-popout-inactivity');
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
  )
}
