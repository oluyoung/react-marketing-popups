import React from 'react';
import { useInactivityTrigger } from '../../hooks/useInactivityTrigger'
import { usePersistence } from '../../hooks/usePersistence';
import { Banner, type BannerProps } from './Banner';

export const BannerByInactivity: React.FC<BannerProps> = (props) => {
  const [fired] = useInactivityTrigger(props.triggerProps);
  const { hasSeen, markSeen } = usePersistence(props.id || 'rmp-banner-inactivity');

  React.useEffect(() => {
    if (fired && !hasSeen()) props.onOpenChange(true);
    if (props.isOk) markSeen();
    if (fired && !props.open) markSeen();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fired, props.isOk]);

  return (
    <Banner {...props}>
      {props.children}
    </Banner>
  )
}
