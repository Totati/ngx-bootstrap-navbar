import { ViewportRuler } from '@angular/cdk/scrolling';
import {
  AfterContentInit,
  Directive,
  ElementRef,
  NgZone,
  OnDestroy
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[tbnNavbar]',
  host: {
    class: 'navbar',
    '[class.navbar-expand]': 'isExpanded'
  }
})
export class TbnNavbarDirective implements AfterContentInit, OnDestroy {
  isExpanded = true;

  private _viewportSizeCache = this._viewportRuler.getViewportSize();
  private _onDestroy = new Subject<void>();
  private _update = new Subject<void>();

  constructor(
    private _viewportRuler: ViewportRuler,
    private _elRef: ElementRef<HTMLElement>,
    private _ngZone: NgZone
  ) {
    this._ngZone.runOutsideAngular(() => {
      merge(this._viewportRuler.change(150), this._update)
        .pipe(
          map(() => {
            const element = this._elRef.nativeElement;
            let overflowSize;
            if(this.isExpanded) {
              overflowSize = element.scrollWidth - element.offsetWidth;
            } else {
              element.classList.add('navbar-expanded');
              window.getComputedStyle(this._elRef.nativeElement);
              overflowSize = element.scrollWidth - element.offsetWidth;
              element.classList.remove('navbar-expanded');
            }
            if (!overflowSize) {
              return true;
            }
          }),
          distinctUntilChanged(),
          takeUntil(this._onDestroy)
        )
        .subscribe(isExpanded => {
          this._ngZone.run(() => {
            this.isExpanded = isExpanded;
          });
        });
    });
  }

  ngAfterContentInit() {
    this.updateExpansion();
  }

  ngOnDestroy() {
    this._update.complete();
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  updateExpansion() {
    this._update.next();
  }
}
