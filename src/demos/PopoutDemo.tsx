import React from 'react';
import { Popout } from '../components/Popout';
import { useTimerTrigger } from '../hooks/useTimerTrigger'
import { useInactivityTrigger } from '../hooks/useInactivityTrigger'
import { useScrollTrigger } from '../hooks/useScrollTrigger'
import { useExitIntentTrigger } from '../hooks/useExitIntentTrigger'
import { usePersistence } from '../hooks/usePersistence'

const PopoutDemo = () => {
  // const [timeFired] = useTimerTrigger(3000);
  const [fired] = useExitIntentTrigger();
  const { hasSeen, markSeen } = usePersistence("nlp:v1");
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (fired && !hasSeen()) setOpen(true);
  }, [fired]);

  return (
    <Popout open={open} onOpenChange={(next: boolean) => { setOpen(next); if (!next) markSeen(); }}>
      <div>
        <h1>This is a popup content</h1>
      </div>
    </Popout>
  )
}

export default PopoutDemo;
