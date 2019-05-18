import { AnimationTriggerMetadata, animate, state, style, transition, trigger } from '@angular/animations';

export type HdToastAnimationState = 'default' | 'closing';

export const hdToastAnimation: { readonly fadeToast: AnimationTriggerMetadata; } = {
  fadeToast: trigger('fadeAnimation', [
    state('in', style({ opacity: 1 })),
    transition('void => *', [
      style({ opacity: 0 }), animate('{{ fadeIn }}ms')
    ]),
    transition('default => closing',
      animate('{{ fadeOut }}ms', style({ opacity: 0 })),
    ),
  ]),
};
