import React from 'react'
import { useScrollTrigger } from '../../hooks/useScrollTrigger'
import { usePersistence } from '../../hooks/usePersistence';
import { Popout, type PopoutProps } from './Popout';

export const PopoutByScroll: React.FC<PopoutProps> = (props) => {
  const [fired] = useScrollTrigger(props.triggerProps);
  const { hasSeen, markSeen } = usePersistence(props.id || 'rmp-popout-inactivity');
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (fired && !hasSeen()) setOpen(true);
    if (props.isComplete) markSeen();
  }, [fired, props.isComplete]);

  return (
    <Popout {...props} open={open}>
      {props.children}
    </Popout>
  )
}
