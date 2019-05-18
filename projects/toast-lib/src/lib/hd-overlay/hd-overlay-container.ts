import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HdOverlayContainer implements OnDestroy {
  private _element: HTMLElement;

  constructor(
    @Inject(DOCUMENT) protected document: any
  ) { }

  ngOnDestroy(): void {
    if (this._element && this._element.parentNode) this._element.parentNode.removeChild(this._element);
  }

  /**
   * This returns the overlay container element. It will lazily
   * create the element the first time it is called to facilitate
   * using the container in non-browser environments.
   * @returns the container element
   */
  get element(): HTMLElement {
    if (!this._element) this.createContainer();
    return this._element;
  }

  set element(element: HTMLElement) {
    this._element = element;
  }

  /**
   * Create the overlay container element, which is simply a div
   * with the 'cdk-overlay-container' class on the document body.
   */
  private createContainer(): void {
    const container = this.document.createElement('div');
    container.classList.add('cdk-overlay-container');
    this.document.body.appendChild(container);
    this.element = container;
  }
}
