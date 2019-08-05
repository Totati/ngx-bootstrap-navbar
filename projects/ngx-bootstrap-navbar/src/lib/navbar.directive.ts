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
  selector: '[ngxNavbar]',
  host: {
    class: 'navbar',
    '[class.navbar-expand]': 'isExpanded'
  }
})
export class NgxNavbarDirective implements AfterContentInit, OnDestroy {
  private _isExpanded = false;
  get isExpanded() {
    return this._isExpanded;
  }

  private _onDestroy = new Subject<void>();
  private _update = new Subject<void>();

  private isExpanded$ = merge(
    this._viewportRuler.change(150),
    this._update
  ).pipe(
    map(() => {
      const element = this._elRef.nativeElement;
      let overflowSize;
      if (this.isExpanded) {
        overflowSize = element.scrollWidth - element.offsetWidth;
      } else {
        const clone = element.cloneNode(true) as HTMLElement;
        clone.classList.add('navbar-expand');
        element.parentElement.appendChild(clone);
        overflowSize = clone.scrollWidth - clone.offsetWidth;
        element.parentElement.removeChild(clone);
      }
      if (!overflowSize) {
        return true;
      }
    }),
    distinctUntilChanged(),
    takeUntil(this._onDestroy)
  );

  constructor(
    private _viewportRuler: ViewportRuler,
    private _elRef: ElementRef<HTMLElement>,
    private _ngZone: NgZone
  ) {
    this._ngZone.runOutsideAngular(() => {
      this.isExpanded$.subscribe(isExpanded => {
        this._ngZone.run(() => {
          this._isExpanded = isExpanded;
        });
      });
    });
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.updateExpansion();
    }, 0);
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
