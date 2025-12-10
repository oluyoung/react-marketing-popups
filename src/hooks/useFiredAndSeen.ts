import { useEffect } from "react";
import { usePersistence } from "./usePersistence";

type Props = {
  id: string;
  fired: boolean;
  open: boolean;
  isOk?: boolean;
  onOpenChange: (value: boolean) => void;
}

export const useFiredAndSeenEffect = ({ id, fired, onOpenChange, open, isOk }: Props) => {
  const { hasSeen, markSeen } = usePersistence(id);
  useEffect(() => {
    if (fired && !hasSeen()) onOpenChange(true);
    if (isOk) markSeen();
    if (fired && !open) markSeen();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fired, isOk,]);
}