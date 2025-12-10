import React from 'react';
import { useExitIntentTrigger } from '../../hooks/useExitIntentTrigger';
import { Banner, type BannerProps } from './Banner';
import { useFiredAndSeenEffect } from '../../hooks/useFiredAndSeen';

export const BannerByExit: React.FC<BannerProps> = (props) => {
  const [fired] = useExitIntentTrigger();
  useFiredAndSeenEffect({
    id: props.id || 'rmp-banner-exit',
    fired,
    isOk: props.isOk,
    onOpenChange: props.onOpenChange,
    open: props.open
  });
  return (
    <Banner {...props}>
      {props.children}
    </Banner>
  );
};
