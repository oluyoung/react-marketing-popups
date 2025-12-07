import React from "react";

export interface UseSlideInVisibilityProps {
  open: boolean;
  duration?: number;
}

export function useSlideInVisibility({ open }: UseSlideInVisibilityProps) {
  const [visible, setVisible] = React.useState(open);

  React.useEffect(() => {
    if (open) setVisible(true);
  }, [open]);

  const handleTransitionEnd = () => {
    setVisible(false);
  };

  return { visible, handleTransitionEnd };
}
