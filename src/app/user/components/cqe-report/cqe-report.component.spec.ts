import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CQEReportComponent } from './cqe-report.component';

describe('CQEReportComponent', () => {
  let component: CQEReportComponent;
  let fixture: ComponentFixture<CQEReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CQEReportComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CQEReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
