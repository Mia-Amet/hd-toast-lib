import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { AnimationEvent } from '@angular/animations';

import {
  faCheckCircle,
  faTimes,
  faCircle,
  faInfoCircle,
  faBan,
  faExclamationTriangle,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';

import { HdToastRef } from './hd-toast-ref';
import { hdToastAnimation, HdToastAnimationState } from './hd-toast-animation';
import { HD_CONFIG_PACKAGE, HdConfigPackage } from './hd-toast.config';

@Component({
  selector: 'hd-toast',
  template: `
    <div class="hd-toast" (click)="disposeOnTap()"
      [ngClass]="[pack.config.type, pack.config.position, pack.config.theme]"
      [@fadeAnimation]="{ value: animationState, params: { fadeIn: 1000, fadeOut: 1000 } }"
      (@fadeAnimation.done)="onFadeFinished($event)">
      <div class="hd-toast-icon">
        <fa-icon class="circle" [icon]="faCircle"></fa-icon>
        <fa-icon class="icon" [icon]="iconType"
          [ngClass]="{ 'hd-warning-icon-size': pack.config.type === 'warning' }"></fa-icon>
      </div>
      <div class="hd-toast-content">
        <h5 *ngIf="pack.data.title && pack.data.title.length" class="ng-easy-toast-title">{{ pack.data.title }}</h5>
        <p class="hd-toast-text">{{ pack.data.message }}</p>
      </div>
      <div class="hd-toast-close" *ngIf="pack.config.closeIcon" (click)="animationState = 'closing'">
        <fa-icon [icon]="faTimes"></fa-icon>
      </div>
    </div>
  `,
  styles: [],
  animations: [hdToastAnimation.fadeToast]
})
export class HdToastComponent implements OnInit {
  faCircle = faCircle;
  faTimes = faTimes;
  iconType: IconDefinition;

  animationState: HdToastAnimationState = 'default';

  private timeout: any;

  /**
   * clears timeout on hover
   */
  @HostListener('mouseenter') clearTimeout() {
    if (this.pack.config.disableTimeouts || !this.timeout) return;
    clearTimeout(this.timeout);
  }

  /**
   * resets timeout on hover
   */
  @HostListener('mouseleave') extendTimeout() {
    if (this.pack.config.disableTimeouts || !this.timeout) return;
    this.timeout = setTimeout(() => {
      if (this.ref.active()) this.animationState = 'closing';
    }, this.pack.config.extendedTimeout);
  }

  /**
   * fires closing animation
   */
  @HostListener('click') disposeOnTap() {
    if (!this.pack.config.tapToDispose) return;
    this.animationState = 'closing';
  }

  constructor(
    @Inject(HD_CONFIG_PACKAGE) readonly pack: HdConfigPackage,
    readonly ref: HdToastRef
  ) { }

  ngOnInit() {
    /**
     * picks up a theme icon
     */
    switch (this.pack.config.type) {
      case 'success':
        this.iconType = faCheckCircle;
        break;
      case 'error':
        this.iconType = faBan;
        break;
      case 'info':
        this.iconType = faInfoCircle;
        break;
      case 'warning':
        this.iconType = faExclamationTriangle;
        break;
    }

    /**
     * activates toast and sets timeout
     */
    if (this.pack.config.timeout && !this.pack.config.disableTimeouts) {
      this.timeout = setTimeout(() => {
        if (this.ref.active()) this.animationState = 'closing';
      }, this.pack.config.timeout);
    }
  }

  /**
   * clears timeout and closes toast
   */
  private close() {
    if (this.timeout) clearTimeout(this.timeout);
    this.ref.dismiss();
  }

  /**
   * closing animation function
   */
  onFadeFinished(event: AnimationEvent) {
    const { toState } = event;
    const isFadeOut = (toState as HdToastAnimationState) === 'closing';
    const isFinished = this.animationState === 'closing';

    if (isFadeOut && isFinished) {
      this.close();
    }
  }

}
