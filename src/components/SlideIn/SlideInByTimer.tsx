import React from 'react'
import { useTimerTrigger } from '../../hooks/useTimerTrigger';
import { SlideIn, type SlideInProps } from './SlideIn';
import { useFiredAndSeenEffect } from '../../hooks/useFiredAndSeen';

export const SlideInByTimer: React.FC<SlideInProps> = (props) => {
  const [fired] = useTimerTrigger(props.triggerProps.ms, props.triggerProps.enabled);
  useFiredAndSeenEffect({
    id: props.id || 'rmp-slideIn-timer',
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
