import React from 'react'
import { useScrollTrigger } from '../../hooks/useScrollTrigger';
import { SlideIn, type SlideInProps } from './SlideIn';
import { useFiredAndSeenEffect } from '../../hooks/useFiredAndSeen';

export const SlideInByScroll: React.FC<SlideInProps> = (props) => {
  const [fired] = useScrollTrigger(props.triggerProps);
  useFiredAndSeenEffect({
    id: props.id || 'rmp-slideIn-scroll',
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
