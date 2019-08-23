import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxNavbarDynamicExpandDirective } from './navbar-dynamic-collapse.directive';

describe('NgxNavbarDynamicExpandDirective', () => {
  let component: NgxNavbarDynamicExpandDirective;
  let fixture: ComponentFixture<NgxNavbarDynamicExpandDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxNavbarDynamicExpandDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxNavbarDynamicExpandDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
