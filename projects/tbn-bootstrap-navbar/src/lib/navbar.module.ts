import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TbnNavbarCollapseComponent } from './navbar-collapse.component';
import { TbnNavbarDirective } from './navbar.directive';

@NgModule({
  declarations: [TbnNavbarCollapseComponent, TbnNavbarDirective],
  imports: [CommonModule],
  exports: [TbnNavbarCollapseComponent, TbnNavbarDirective]
})
export class TbnNavbarModule {}
