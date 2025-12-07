import React from 'react';
import { useInactivityTrigger } from '../../hooks/useInactivityTrigger'
import { usePersistence } from '../../hooks/usePersistence';
import { Popout, type PopoutProps } from './Popout';

export const PopoutByInactivity: React.FC<PopoutProps> = (props) => {
  const [fired] = useInactivityTrigger(props.triggerProps);
  const { hasSeen, markSeen } = usePersistence(props.id || 'rmp-popout-inactivity');

  React.useEffect(() => {
    if (fired && !hasSeen()) props.onOpenChange(true);
    if (props.isOk) {
      markSeen();
      props.onOpenChange(false);
    }
  }, [fired, props.isOk]);

  return (
    <Popout
      {...props}
      onClose={() => {
        props.onOpenChange(false);
        markSeen();
        props.onClose?.();
      }}
    >
      {props.children}
    </Popout>
  )
}
