import React from "react";

export function useAnimatePresence({
  open,
  animationIn,
  animationOut
}: {
  open: boolean;
  animationIn: string;
  animationOut: string;
}) {
  const [isMounted, setIsMounted] = React.useState(open);
  const [animationClass, setAnimationClass] = React.useState("");

  React.useEffect(() => {
    if (open) {
      setIsMounted(true);
      setAnimationClass(animationIn);
    } else {
      setAnimationClass(animationOut);
    }
  }, [open, animationIn, animationOut]);

  const handleAnimationEnd = () => {
    if (!open) {
      setIsMounted(false);
    }
  };

  return {
    isMounted,
    animationClass,
    handleAnimationEnd
  };
}
