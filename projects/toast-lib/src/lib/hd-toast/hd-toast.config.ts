import { InjectionToken } from '@angular/core';

export type HdToastType = 'success' | 'error' | 'warning' | 'info' | 'custom';
export type HdToastTheme = 'light' | 'dark';
export type HdToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-full-width' | 'bottom-full-width';

export interface HdToastData {
  message: string;
  title?: string;
}

/**
 * User Configurations for a toast.
 */
export interface HdToastUserConfig {
  /**
   * toast container position
   * default: top-left
   */
  position: HdToastPosition;
  /**
   * toasts color theme
   * default: light
   */
  theme: HdToastTheme;
  /**
   * clicking on toast will dispose it
   * default: true
   */
  tapToDispose: boolean;
  /**
   * close button on toasts
   * default: false
   */
  closeIcon: boolean;
  /**
   * disable both timeout and extendedTimeout
   * default: false
   */
  disableTimeouts: boolean;
  /**
   * toast time to live in milliseconds
   * default: 5000
   */
  timeout?: number;
  /**
   * time to close after a user hovers over toast
   * default: 2000
   */
  extendedTimeout?: number;
  /**
   * animation ease time on toast
   * default: 500
   */
  easeTime?: number;
  /**
   * max toasts opened. Toasts will be queued
   * Zero is unlimited
   * default: 0
   */
  maxToastsNumber: number;
}

/**
 * Global Toast configuration with theming
 * Includes User Configurations
 */
export interface HdToastConfig extends HdToastUserConfig {
  type: HdToastType;
}

export const hdToastDefaultConfig: HdToastUserConfig = {
  position: 'top-left',
  theme: 'light',
  tapToDispose: true,
  closeIcon: false,
  disableTimeouts: false,
  timeout: 5000,
  extendedTimeout: 2000,
  easeTime: 500,
  maxToastsNumber: 0
};

/**
 * Config Package for a toast to launch
 */
export interface HdConfigPackage {
  config: HdToastConfig;
  data: HdToastData;
}

export const HD_CONFIG_PACKAGE = new InjectionToken<HdConfigPackage>('HD_CONFIG_PACKAGE');
