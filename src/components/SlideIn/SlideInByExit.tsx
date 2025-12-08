import React from 'react';
import { useExitIntentTrigger } from '../../hooks/useExitIntentTrigger';
import { usePersistence } from '../../hooks/usePersistence';
import { SlideIn , type SlideInProps } from './SlideIn';

export const SlideInByExit: React.FC<SlideInProps> = (props) => {
  const [fired] = useExitIntentTrigger();
  const { hasSeen, markSeen } = usePersistence(props.id || 'rmp-slideIn-exit');

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
  );
};
