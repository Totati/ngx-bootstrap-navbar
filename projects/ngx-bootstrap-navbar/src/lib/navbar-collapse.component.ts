import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ngxNavbarAnimations } from './navbar-animation';

@Component({
  selector: 'ngx-navbar-collapse',
  template: ` <ng-content></ng-content> `,
  styles: [
    `
      .ngx-navbar-collapse.collapsing {
        height: auto;
      }
    `,
  ],
  host: {
    class: 'navbar-collapse ngx-navbar-collapse',
    '[@slideState]': '!isCollapsed',
    '(@slideState.done)': 'done()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ngxNavbarAnimations.navbarSlide],
  exportAs: 'ngxNavbarCollapse',
})
export class NgxNavbarCollapseComponent {
  public isCollapsed = true;
  private isTransitioning = false;
  private readonly nativeElement =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    this.updateClasses();
  }

  toggle() {
    this.isTransitioning = true;
    this.isCollapsed = !this.isCollapsed;
    this.updateClasses();
  }

  close() {
    if (this.isCollapsed) {
      return;
    }
    this.isTransitioning = true;
    this.isCollapsed = true;
    this.updateClasses();
  }

  open() {
    if (!this.isCollapsed) {
      return;
    }
    this.isTransitioning = true;
    this.isCollapsed = false;
    this.updateClasses();
  }

  protected done() {
    this.isTransitioning = false;
    this.updateClasses();
  }

  protected updateClasses() {
    const classList = this.nativeElement.classList;
    const isTransitioning = this.isTransitioning;
    classList.toggle('collapse', !isTransitioning);
    classList.toggle('show', !this.isCollapsed && !isTransitioning);
    classList.toggle('collapsing', isTransitioning);
  }
}
