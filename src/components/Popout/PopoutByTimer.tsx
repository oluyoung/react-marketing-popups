import React from 'react'
import { useTimerTrigger } from '../../hooks/useTimerTrigger';
import { Popout, type PopoutProps } from './Popout';
import { usePersistence } from '../../hooks/usePersistence';

export const PopoutByTimer: React.FC<PopoutProps> = (props) => {
  const [fired] = useTimerTrigger(props.triggerProps?.ms || 3000, props.triggerProps?.enabled || true);
  const { hasSeen, markSeen } = usePersistence(props.id || 'rmp-popout-timer');

  React.useEffect(() => {
    if (fired && !hasSeen()) props.onOpenChange(true);
    if (props.isOk) markSeen();
    if (fired && !props.open) markSeen();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fired, props.isOk]);

  return (
    <Popout {...props}>
      {props.children}
    </Popout>
  );
};
