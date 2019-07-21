import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TbnNavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: TbnNavbarComponent;
  let fixture: ComponentFixture<TbnNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TbnNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TbnNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
