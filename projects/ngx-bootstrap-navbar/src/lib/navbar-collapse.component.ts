import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation
} from '@angular/core';
import { ngxNavbarAnimations } from './navbar-animation';

@Component({
  selector: 'ngx-navbar-collapse',
  template: `
    <ng-content></ng-content>
  `,
  styles: [
    `
      .ngx-navbar-collapse.collapsing {
        height: auto;
      }
    `
  ],
  host: {
    class: 'navbar-collapse ngx-navbar-collapse',
    '[class.collapse]': '!isTransitioning',
    '[class.show]': '!isCollapsed && !isTransitioning',
    '[class.collapsing]': 'isTransitioning',
    '[@slideState]': '!isCollapsed',
    '(@slideState.done)': 'isTransitioning = false'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ngxNavbarAnimations.navbarSlide],
  exportAs: 'ngxNavbarCollapse'
})
export class NgxNavbarCollapseComponent {
  public isCollapsed = true;
  public isTransitioning = false;

  constructor(private _cdr: ChangeDetectorRef) {}

  toggle() {
    this.isTransitioning = true;
    this.isCollapsed = !this.isCollapsed;
    this._cdr.markForCheck();
  }

  close() {
    if (this.isCollapsed) {
      return;
    }
    this.isTransitioning = true;
    this.isCollapsed = true;
    this._cdr.markForCheck();
  }

  open() {
    if (!this.isCollapsed) {
      return;
    }
    this.isTransitioning = true;
    this.isCollapsed = false;
    this._cdr.markForCheck();
  }
}
