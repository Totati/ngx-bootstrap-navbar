import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TbnNavbarCollapseComponent } from './navbar-collapse.component';

describe('NgxBootstrapNavbarComponent', () => {
  let component: TbnNavbarCollapseComponent;
  let fixture: ComponentFixture<TbnNavbarCollapseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TbnNavbarCollapseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TbnNavbarCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
