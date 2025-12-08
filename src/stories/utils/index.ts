// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getInstruction = (trigger: string, triggerProps: any, component: string) => {
  switch (trigger) {
    case "timer":
      return `Wait ${triggerProps.ms} milliseconds and the ${component} will appear`;
    case "scroll":
      return `Scroll down the page by ${triggerProps.percent}% then the banner will appear`;
    case "exit":
      return "Raise the cursor up to exit the window";
    case "inactivity":
      return `Stay inactive for ${triggerProps} milliseconds`;
    default:
      return "React Marketing Popups: Banner";
  }
};
