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

  constructor(private readonly cdRef: ChangeDetectorRef) {}

  toggle() {
    this.isTransitioning = true;
    this.isCollapsed = !this.isCollapsed;
    this.cdRef.markForCheck();
  }

  close() {
    if (this.isCollapsed) {
      return;
    }
    this.isTransitioning = true;
    this.isCollapsed = true;
    this.cdRef.markForCheck();
  }

  open() {
    if (!this.isCollapsed) {
      return;
    }
    this.isTransitioning = true;
    this.isCollapsed = false;
    this.cdRef.markForCheck();
  }
}
