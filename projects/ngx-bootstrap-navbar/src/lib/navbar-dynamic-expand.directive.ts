import { Platform } from '@angular/cdk/platform';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { DOCUMENT } from '@angular/common';
import {
  AfterContentInit,
  Directive,
  ElementRef,
  NgZone,
  OnDestroy,
  ChangeDetectorRef,
  Inject,
  inject,
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil, filter } from 'rxjs/operators';

@Directive({
  selector: '[ngxNavbarDynamicExpand]',
  host: {
    class: 'navbar text-nowrap',
    '[class.navbar-expand]': 'isExpanded',
  },
})
export class NgxNavbarDynamicExpandDirective
  implements AfterContentInit, OnDestroy
{
  private readonly onDestroy$ = new Subject<void>();
  private readonly update$ = new Subject<void>();
  private readonly nativeElement =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private loaded = false;
  private _isExpanded = false;
  get isExpanded() {
    return this._isExpanded;
  }

  constructor(
    private readonly ngZone: NgZone,
    private readonly platform: Platform,
    @Inject(DOCUMENT) private readonly _document: Document,
    viewportRuler: ViewportRuler,
    cdRef: ChangeDetectorRef
  ) {
    ngZone.runOutsideAngular(() => {
      merge(viewportRuler.change(150), this.update$)
        .pipe(
          filter(
            () =>
              this.loaded ||
              (this.loaded = checkBootstrapStylesAreLoaded(
                _document,
                this.nativeElement
              ))
          ),
          map(() => {
            const element = this.nativeElement;
            let overflowSize;
            if (this.isExpanded) {
              overflowSize = element.scrollWidth - element.offsetWidth;
            } else {
              const clone = element.cloneNode(true) as HTMLElement;
              clone.classList.add('navbar-expand');
              const parent = element.parentElement;
              if (parent) {
                parent.appendChild(clone);
                overflowSize = clone.scrollWidth - clone.offsetWidth;
                parent.removeChild(clone);
              }
            }
            return !overflowSize;
          }),
          distinctUntilChanged(),
          takeUntil(this.onDestroy$)
        )
        .subscribe((isExpanded) => {
          ngZone.run(() => {
            this._isExpanded = isExpanded;
            cdRef.markForCheck();
          });
        });
    });
  }

  ngAfterContentInit() {
    if (!this.platform.isBrowser) {
      return;
    }
    this.ngZone.runOutsideAngular(() => {
      this.loaded = checkBootstrapStylesAreLoaded(
        this._document,
        this.nativeElement
      );
      if (this.loaded) {
        this.update$.next();
      } else {
        setTimeout(() => {
          this.ngAfterContentInit();
        }, 1000 / 60);
      }
    });
  }

  ngOnDestroy() {
    this.update$.complete();
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}

function checkBootstrapStylesAreLoaded(
  document: Document,
  element: Element
): boolean {
  const documentWindow = document.defaultView || window;
  const computedStyle =
    documentWindow && documentWindow.getComputedStyle
      ? documentWindow.getComputedStyle(element)
      : false;
  return computedStyle && computedStyle.whiteSpace === 'nowrap';
}
