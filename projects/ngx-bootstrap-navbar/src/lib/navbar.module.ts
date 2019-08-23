import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxNavbarCollapseComponent } from './navbar-collapse.component';
import { NgxNavbarDynamicExpandDirective } from './navbar-dynamic-collapse.directive';

@NgModule({
  declarations: [NgxNavbarCollapseComponent, NgxNavbarDynamicExpandDirective],
  imports: [CommonModule],
  exports: [NgxNavbarCollapseComponent, NgxNavbarDynamicExpandDirective]
})
export class NgxNavbarModule {}
