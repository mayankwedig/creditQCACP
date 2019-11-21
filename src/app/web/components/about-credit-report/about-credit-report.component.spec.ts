import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCreditReportComponent } from './about-credit-report.component';

describe('AboutCreditReportComponent', () => {
  let component: AboutCreditReportComponent;
  let fixture: ComponentFixture<AboutCreditReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutCreditReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutCreditReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
