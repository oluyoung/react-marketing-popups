import React from 'react'
import { useScrollTrigger } from '../../hooks/useScrollTrigger'
import { usePersistence } from '../../hooks/usePersistence';
import { Popout, type PopoutProps } from './Popout';

export const PopoutByScroll: React.FC<PopoutProps> = (props) => {
  const [fired] = useScrollTrigger(props.triggerProps);
  const { hasSeen, markSeen } = usePersistence(props.id || 'rmp-popout-inactivity');

  React.useEffect(() => {
    if (fired && !hasSeen()) props.onOpenChange(true);
    if (props.isOk) markSeen();
  }, [fired, props.isOk]);

  return (
    <Popout {...props} onClose={() => {
        props.onOpenChange(false);
        markSeen();
        props.onClose?.();
      }}
    >
      {props.children}
    </Popout>
  )
}
