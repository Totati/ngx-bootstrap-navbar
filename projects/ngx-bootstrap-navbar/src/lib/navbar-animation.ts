import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';
/** Time and timing curve for navbar animations. */
export const NAVBAR_ANIMATION_TIMING = '300ms ease-out';

export const ngxNavbarAnimations: {
  readonly navbarSlide: AnimationTriggerMetadata;
} = {
  navbarSlide: trigger('slideState', [
    transition('false => true', [
      style({
        opacity: 0,
        height: 0,
        overflow: 'hidden'
      }),
      animate(
        NAVBAR_ANIMATION_TIMING,
        style({
          opacity: 1,
          height: '*'
        })
      )
    ]),
    transition('true => false', [
      animate(
        NAVBAR_ANIMATION_TIMING,
        style({
          display: 'block',
          opacity: 0,
          height: 0,
          overflow: 'hidden'
        })
      )
    ])
  ])
};
