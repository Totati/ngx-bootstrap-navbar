import { NgModule } from '@angular/core';
import { TbnNavbarCollapseComponent } from './navbar-collapse.component';
import { CommonModule } from '@angular/common';
import { TbnNavbarComponent } from './navbar.component';



@NgModule({
  declarations: [TbnNavbarCollapseComponent, TbnNavbarComponent],
  imports: [
    CommonModule
  ],
  exports: [TbnNavbarCollapseComponent, TbnNavbarComponent]
})
export class TbnNavbarModule { }
