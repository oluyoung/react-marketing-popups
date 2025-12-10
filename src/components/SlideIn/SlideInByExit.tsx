import React from 'react';
import { useExitIntentTrigger } from '../../hooks/useExitIntentTrigger';
import { SlideIn, type SlideInProps } from './SlideIn';
import { useFiredAndSeenEffect } from '../../hooks/useFiredAndSeen';

export const SlideInByExit: React.FC<SlideInProps> = (props) => {
  const [fired] = useExitIntentTrigger();
  useFiredAndSeenEffect({
    id: props.id || 'rmp-slideIn-exit',
    fired,
    isOk: props.isOk,
    onOpenChange: props.onOpenChange,
    open: props.open
  });

  return (
    <SlideIn {...props}>
      {props.children}
    </SlideIn>
  );
};
