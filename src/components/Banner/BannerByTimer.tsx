import React from 'react'
import { useTimerTrigger } from '../../hooks/useTimerTrigger';
import { usePersistence } from '../../hooks/usePersistence';
import { Banner, type BannerProps } from './Banner';

export const BannerByTimer: React.FC<BannerProps> = (props) => {
  const [fired] = useTimerTrigger(props.triggerProps);
  const { hasSeen, markSeen } = usePersistence(props.id || 'rmp-popout-timer');

  React.useEffect(() => {
    if (fired && !hasSeen()) props.onOpenChange(true);
    if (props.isOk) markSeen();
  }, [fired, hasSeen, markSeen, props, props.isOk]);

  return (
    <Banner {...props}>
      {props.children}
    </Banner>
  )
}
