import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaulterDetailComponent } from './defaulter-detail.component';

describe('DefaulterDetailComponent', () => {
  let component: DefaulterDetailComponent;
  let fixture: ComponentFixture<DefaulterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaulterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaulterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
