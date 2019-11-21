import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDefaulterComponent } from './about-defaulter.component';

describe('AboutDefaulterComponent', () => {
  let component: AboutDefaulterComponent;
  let fixture: ComponentFixture<AboutDefaulterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutDefaulterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutDefaulterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
