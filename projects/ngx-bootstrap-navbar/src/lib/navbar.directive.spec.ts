import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxNavbarDirective } from './navbar.directive';

describe('NavbarComponent', () => {
  let component: NgxNavbarDirective;
  let fixture: ComponentFixture<NgxNavbarDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxNavbarDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxNavbarDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
