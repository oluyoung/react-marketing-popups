export type SlideInAnimations = 'top' | 'bottom' | 'left' | 'right' | 'center';

export const fadePositionAnimations: Record<SlideInAnimations, string[]> = {
  top: ['animate__fadeInDown','animate__fadeOutUp'],
  bottom: ['animate__fadeInUp','animate__fadeOutDown'],
  left: ['animate__fadeInLeft','animate__fadeOutLeft'],
  right: ['animate__fadeInRight', 'animate__fadeOutRight'],
  center: ['animate__fadeIn','animate__fadeOut']
};

export const slidePositionAnimations: Record<SlideInAnimations, string[]> = {
  top: ['animate__slideInDown','animate__slideOutUp'],
  bottom: ['animate__slideInUp','animate__slideOutDown'],
  left: ['animate__slideInLeft','animate__slideOutLeft'],
  right: ['animate__slideInRight', 'animate__slideOutRight'],
  center: []
};

export const bouncePositionAnimations: Record<SlideInAnimations, string[]> = {
  top: ['animate__bounceInUp','animate__bounceOutDown'],
  bottom: ['animate__bounceInDown','animate__bounceOutUp'],
  left: ['animate__bounceOutLeft','animate__bounceOutLeft'],
  right: ['animate__bounceInRight', 'animate__bounceOutRight'],
  center: ['animate__bounceIn', 'animate__bounceOutDown'],
};

export const zoomPositionAnimations: Record<string, string[]> = {
  center: ['animate__zoomIn', 'animate__zoomIn']
}