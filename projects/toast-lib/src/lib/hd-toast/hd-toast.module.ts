import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HdToastComponent } from './hd-toast.component';

@NgModule({
  declarations: [
    HdToastComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    OverlayModule,
    PortalModule
  ],
  entryComponents: [HdToastComponent]
})
export class HdToastModule { }
