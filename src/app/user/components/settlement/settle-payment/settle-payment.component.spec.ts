import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlePaymentComponent } from './settle-payment.component';

describe('SettlePaymentComponent', () => {
  let component: SettlePaymentComponent;
  let fixture: ComponentFixture<SettlePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettlePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
