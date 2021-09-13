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
  private readonly _document: Document;
  private readonly onDestroy$ = new Subject<void>();
  private readonly update$ = new Subject<void>();
  private loaded = false;
  private _isExpanded = false;
  get isExpanded() {
    return this._isExpanded;
  }

  constructor(
    private readonly viewportRuler: ViewportRuler,
    private readonly elRef: ElementRef<HTMLElement>,
    private readonly ngZone: NgZone,
    private readonly cdRef: ChangeDetectorRef,
    private readonly platform: Platform,
    @Inject(DOCUMENT) document: any
  ) {
    this._document = document;
    this.ngZone.runOutsideAngular(() => {
      merge(this.viewportRuler.change(150), this.update$)
        .pipe(
          filter(
            () =>
              this.loaded ||
              (this.loaded = checkBootstrapStylesAreLoaded(
                this._document,
                this.elRef.nativeElement
              ))
          ),
          map(() => {
            const element = this.elRef.nativeElement;
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
          this.ngZone.run(() => {
            this._isExpanded = isExpanded;
            this.cdRef.markForCheck();
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
        this.elRef.nativeElement
      );
      if (this.loaded) {
        this.updateExpansion();
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

  updateExpansion() {
    this.update$.next();
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
