import React from 'react';
import { useInactivityTrigger } from '../../hooks/useInactivityTrigger';
import { SlideIn, type SlideInProps } from './SlideIn';
import { useFiredAndSeenEffect } from '../../hooks/useFiredAndSeen';

export const SlideInByInactivity: React.FC<SlideInProps> = (props) => {
  const [fired] = useInactivityTrigger(props.triggerProps);
  useFiredAndSeenEffect({
    id: props.id || 'rmp-slideIn-inactivity',
    fired,
    isOk: props.isOk,
    onOpenChange: props.onOpenChange,
    open: props.open
  });

  return (
    <SlideIn {...props}>
      {props.children}
    </SlideIn>
  )
}
