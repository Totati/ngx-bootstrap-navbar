import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxNavbarCollapseComponent } from './navbar-collapse.component';
import { NgxNavbarDirective } from './navbar.directive';

@NgModule({
  declarations: [NgxNavbarCollapseComponent, NgxNavbarDirective],
  imports: [CommonModule],
  exports: [NgxNavbarCollapseComponent, NgxNavbarDirective]
})
export class NgxNavbarModule {}
