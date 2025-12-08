export type AnimationPositions = 'top' | 'bottom' | 'left' | 'right';
export type PopoutAnimationPositions = AnimationPositions & 'center';
export type Animations = 'fade' | 'bounce' | 'slide';
export type PopoutAnimations = 'zoom' | 'fade' | 'bounce';
export type Trirggers = 'exit' | 'inactivity' | 'scroll' | 'timer';

export const fadePositionAnimations: Record<PopoutAnimationPositions, string[]> = {
  top: ['animate__fadeInDown','animate__fadeOutUp'],
  bottom: ['animate__fadeInUp','animate__fadeOutDown'],
  left: ['animate__fadeInLeft','animate__fadeOutLeft'],
  right: ['animate__fadeInRight', 'animate__fadeOutRight'],
  center: ['animate__fadeIn','animate__fadeOut']
};

export const slidePositionAnimations: Record<AnimationPositions, string[]> = {
  top: ['animate__slideInDown','animate__slideOutUp'],
  bottom: ['animate__slideInUp','animate__slideOutDown'],
  left: ['animate__slideInLeft','animate__slideOutLeft'],
  right: ['animate__slideInRight', 'animate__slideOutRight']
};

export const bouncePositionAnimations: Record<PopoutAnimationPositions, string[]> = {
  top: ['animate__bounceInDown','animate__bounceOutUp'],
  bottom: ['animate__bounceInUp','animate__bounceOutDown'],
  left: ['animate__bounceInLeft','animate__bounceOutLeft'],
  right: ['animate__bounceInRight', 'animate__bounceOutRight'],
  center: ['animate__bounceIn', 'animate__bounceOut'],
};

export const zoomPositionAnimations: Record<string, string[]> = {
  center: ['animate__zoomIn', 'animate__zoomOut']
}