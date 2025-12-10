import React from 'react'
import { useTimerTrigger } from '../../hooks/useTimerTrigger';
import { Banner, type BannerProps } from './Banner';
import { useFiredAndSeenEffect } from '../../hooks/useFiredAndSeen';

export const BannerByTimer: React.FC<BannerProps> = (props) => {
  const [fired] = useTimerTrigger(props.triggerProps.ms, props.triggerProps.enabled);
  useFiredAndSeenEffect({
    id: props.id || 'rmp-banner-timer',
    fired,
    isOk: props.isOk,
    onOpenChange: props.onOpenChange,
    open: props.open
  });
  return (
    <Banner {...props}>
      {props.children}
    </Banner>
  )
}
