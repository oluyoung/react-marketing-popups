import React from 'react'
import { useTimerTrigger } from '../../hooks/useTimerTrigger';
import { usePersistence } from '../../hooks/usePersistence';
import { SlideIn, type SlideInProps } from './SlideIn';

export const SlideInByTimer: React.FC<SlideInProps> = (props) => {
  const [fired] = useTimerTrigger(props.triggerProps.ms, props.triggerProps.enabled);
  const { hasSeen, markSeen } = usePersistence(props.id || 'rmp-slideIn-timer');

  React.useEffect(() => {
    if (fired && !hasSeen()) props.onOpenChange(true);
    if (props.isOk) markSeen();
    if (fired && !props.open) markSeen();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fired, props.isOk]);

  return (
    <SlideIn {...props}>
      {props.children}
    </SlideIn>
  )
}
