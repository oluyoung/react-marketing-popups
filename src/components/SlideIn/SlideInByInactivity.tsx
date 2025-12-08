import React from 'react';
import { useInactivityTrigger } from '../../hooks/useInactivityTrigger'
import { usePersistence } from '../../hooks/usePersistence';
import { SlideIn, type SlideInProps } from './SlideIn';

export const SlideInByInactivity: React.FC<SlideInProps> = (props) => {
  const [fired] = useInactivityTrigger(props.triggerProps);
  const { hasSeen, markSeen } = usePersistence(props.id || 'rmp-slideIn-inactivity');

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
