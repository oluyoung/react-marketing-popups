import React from 'react';
import { useExitIntentTrigger } from '../../hooks/useExitIntentTrigger';
import { usePersistence } from '../../hooks/usePersistence';
import { Banner, type BannerProps } from './Banner';

export const BannerByExit: React.FC<BannerProps> = (props) => {
  const [fired] = useExitIntentTrigger();
  const { hasSeen, markSeen } = usePersistence(props.id || 'rmp-banner-exit');

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
  );
};
