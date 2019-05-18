import { Injectable, Injector } from '@angular/core';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { HdOverlay } from '../hd-overlay/hd-overlay';
import { HdToastRef } from './hd-toast-ref';
import { HdToastComponent } from './hd-toast.component';
import {
  HD_CONFIG_PACKAGE,
  HdConfigPackage,
  HdToastConfig,
  HdToastData,
  hdToastDefaultConfig,
  HdToastPosition,
  HdToastUserConfig
} from './hd-toast.config';

@Injectable({
  providedIn: 'root'
})
export class HdToastService {
  activeToasts: HdToastRef[] = [];

  constructor(
    private overlay: HdOverlay,
    private parentInjector: Injector
  ) { }

  /**
   * Creates Portal Injector
   */
  private getInjector(pack: HdConfigPackage, toastRef: HdToastRef, parentInjector: Injector): PortalInjector {
    const tokens = new WeakMap();

    tokens.set(HD_CONFIG_PACKAGE, pack);
    tokens.set(HdToastRef, toastRef);

    return new PortalInjector(parentInjector, tokens);
  }

  /**
   * Creates and attaches hd-overlay to a toast component
   */
  private createToast(config: HdToastConfig, data: HdToastData): HdToastRef {
    // Checks for completed toasts in active toasts array and removes them
    this.activeToasts = this.activeToasts.filter(toast => toast.active());

    // Clears some old toasts if maximum toast number was reached
    if (config.maxToastsNumber && this.activeToasts.length === config.maxToastsNumber) {
      if (this.activeToasts[0].active()) this.activeToasts[0].dismiss();
      this.activeToasts.splice(0, 1);
    }
    if (config.maxToastsNumber && this.activeToasts.length > config.maxToastsNumber) {
      const difference = this.activeToasts.length - config.maxToastsNumber;
      for (let i = 0; i <= difference; i++) if (this.activeToasts[i].active()) this.activeToasts[i].dismiss();
      this.activeToasts.splice(0, difference + 1);
    }

    const overlayRef = this.overlay.create(config.position);
    const toastRef = new HdToastRef(overlayRef);
    const injector = this.getInjector({ config, data }, toastRef, this.parentInjector);
    const toastPortal = new ComponentPortal(HdToastComponent, null, injector);

    overlayRef.attach(toastPortal);
    this.activeToasts.push(toastRef);

    return toastRef;
  }

  /**
   * show successful toast
   */
  success(message: string, title: string = '', userConfig: Partial<HdToastUserConfig> = {}): HdToastRef {
    const config: HdToastConfig = { ...hdToastDefaultConfig, ...userConfig, type: 'success' };
    const data: HdToastData = { message, title };

    return this.createToast(config, data);
  }

  /**
   * show warning toast
   */
  warning(message: string, title: string = '', userConfig: Partial<HdToastUserConfig> = {}): HdToastRef {
    const config: HdToastConfig = { ...hdToastDefaultConfig, ...userConfig, type: 'warning' };
    const data: HdToastData = { message, title };

    return this.createToast(config, data);
  }

  /**
   * show info toast
   */
  info(message: string, title: string = '', userConfig: Partial<HdToastUserConfig> = {}): HdToastRef {
    const config: HdToastConfig = { ...hdToastDefaultConfig, ...userConfig, type: 'info' };
    const data: HdToastData = { message, title };

    return this.createToast(config, data);
  }

  /**
   * show error toast
   */
  error(message: string, title: string = '', userConfig: Partial<HdToastUserConfig> = {}): HdToastRef {
    const config: HdToastConfig = { ...hdToastDefaultConfig, ...userConfig, type: 'error' };
    const data: HdToastData = { message, title };

    return this.createToast(config, data);
  }
}
