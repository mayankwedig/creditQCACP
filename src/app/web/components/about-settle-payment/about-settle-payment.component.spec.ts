import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSettlePaymentComponent } from './about-settle-payment.component';

describe('AboutSettlePaymentComponent', () => {
  let component: AboutSettlePaymentComponent;
  let fixture: ComponentFixture<AboutSettlePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutSettlePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutSettlePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
