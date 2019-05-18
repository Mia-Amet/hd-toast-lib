import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector } from '@angular/core';

import { DomPortalOutlet } from '@angular/cdk/portal';

import { HdToastPosition } from '../hd-toast/hd-toast.config';
import { HdOverlayContainer } from './hd-overlay-container';
import { HdOverlayRef } from './hd-overlay-ref';

@Injectable({
  providedIn: 'root'
})
export class HdOverlay {
  private panels: Map<HdToastPosition, HTMLElement> = new Map();

  constructor(
    private overlayContainer: HdOverlayContainer,
    private cfr: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    @Inject(DOCUMENT) private document: any
  ) { }

  private createPanel(position: HdToastPosition): HTMLElement {
    const panel = this.document.createElement('div');
    panel.classList.add('hd-toast-container');
    panel.classList.add(position);

    this.overlayContainer.element.appendChild(panel);
    return panel;
  }

  getPanel(position: HdToastPosition): HTMLElement {
    if (!this.panels.get(position)) this.panels.set(position, this.createPanel(position));
    return this.panels.get(position);
  }

  create(position: HdToastPosition): HdOverlayRef {
    return new HdOverlayRef(new DomPortalOutlet(this.getPanel(position), this.cfr, this.appRef, this.injector));
  }
}
