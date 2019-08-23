import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxNavbarCollapseComponent } from './navbar-collapse.component';

describe('NgxNavbarComponent', () => {
  let component: NgxNavbarCollapseComponent;
  let fixture: ComponentFixture<NgxNavbarCollapseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxNavbarCollapseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxNavbarCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
