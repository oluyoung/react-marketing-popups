import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App';
import PopoutDemo from './demos/PopoutDemo';
import SlideInDemo from './demos/SlideInDemo';
import BannerDemo from './demos/BannerDemo';

export { Popout } from "./components/Popout";
export { Popout as PopoutCore } from "./components/Popout/Popout";
export type { PopoutProps } from "./components/Popout/Popout";

export { useTimerTrigger } from "./hooks/useTimerTrigger";
export { useExitIntentTrigger } from "./hooks/useExitIntentTrigger";
export { useScrollTrigger } from "./hooks/useScrollTrigger";
export { useInactivityTrigger } from "./hooks/useInactivityTrigger";
export { usePersistence } from "./hooks/usePersistence";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <PopoutDemo />
    <SlideInDemo />
    <BannerDemo />
  </StrictMode>,
)
