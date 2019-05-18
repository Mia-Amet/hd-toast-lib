import { HdOverlayRef } from '../hd-overlay/hd-overlay-ref';

/**
 * Reference to a toast opened via the HdToast service.
 */
export class HdToastRef {

  constructor(
    private readonly overlay: HdOverlayRef
  ) { }

  /**
   * Close the toast.
   */
  dismiss(): void {
    this.overlay.detach();
  }

  /**
   * Check if the toast is active or not
   */
  active(): boolean {
    return this.overlay && !!this.overlay.overlayElement;
  }
}




