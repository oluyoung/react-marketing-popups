import React from 'react';
import { useInactivityTrigger } from '../../hooks/useInactivityTrigger';
import { Banner, type BannerProps } from './Banner';
import { useFiredAndSeenEffect } from '../../hooks/useFiredAndSeen';

export const BannerByInactivity: React.FC<BannerProps> = (props) => {
  const [fired] = useInactivityTrigger(props.triggerProps);
  useFiredAndSeenEffect({
    id: props.id || 'rmp-banner-inactivity',
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
