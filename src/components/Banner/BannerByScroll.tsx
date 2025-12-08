import React from 'react'
import { useScrollTrigger } from '../../hooks/useScrollTrigger'
import { usePersistence } from '../../hooks/usePersistence';
import { Banner, type BannerProps } from './Banner';

export const BannerByScroll: React.FC<BannerProps> = (props) => {
  const [fired] = useScrollTrigger(props.triggerProps);
  const { hasSeen, markSeen } = usePersistence(props.id || 'rmp-banner-scroll');

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
