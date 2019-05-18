import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
import { ComponentRef } from '@angular/core';

export class HdOverlayRef {

  constructor(
    private outlet: DomPortalOutlet
  ) { }

  attach(portal: ComponentPortal<any>): ComponentRef<any> {
    return this.outlet.attachComponentPortal(portal);
  }

  detach() {
    this.outlet.detach();
  }

  get overlayElement(): HTMLElement {
    return this.outlet.outletElement as HTMLElement;
  }
}
