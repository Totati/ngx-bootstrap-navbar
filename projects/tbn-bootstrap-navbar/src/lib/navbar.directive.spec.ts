import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TbnNavbarDirective } from './navbar.directive';

describe('NavbarComponent', () => {
  let component: TbnNavbarDirective;
  let fixture: ComponentFixture<TbnNavbarDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TbnNavbarDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TbnNavbarDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
