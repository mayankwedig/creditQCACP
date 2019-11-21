import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingSettlementComponent } from './pending-settlement.component';

describe('PendingSettlementComponent', () => {
  let component: PendingSettlementComponent;
  let fixture: ComponentFixture<PendingSettlementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingSettlementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
