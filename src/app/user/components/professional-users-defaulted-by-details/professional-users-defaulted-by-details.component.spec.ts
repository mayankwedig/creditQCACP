import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalUsersDefaultedByDetailsComponent } from './professional-users-defaulted-by-details.component';

describe('ProfessionalUsersDefaultedByDetailsComponent', () => {
  let component: ProfessionalUsersDefaultedByDetailsComponent;
  let fixture: ComponentFixture<ProfessionalUsersDefaultedByDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalUsersDefaultedByDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalUsersDefaultedByDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
