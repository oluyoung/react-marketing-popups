import React from 'react'
import { useScrollTrigger } from '../../hooks/useScrollTrigger';
import { Banner, type BannerProps } from './Banner';
import { useFiredAndSeenEffect } from '../../hooks/useFiredAndSeen';

export const BannerByScroll: React.FC<BannerProps> = (props) => {
  const [fired] = useScrollTrigger(props.triggerProps);
  useFiredAndSeenEffect({
    id: props.id || 'rmp-banner-scroll',
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
