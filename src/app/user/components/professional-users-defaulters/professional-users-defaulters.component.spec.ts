import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalUsersDefaultersComponent } from './professional-users-defaulters.component';

describe('ProfessionalUsersDefaultersComponent', () => {
  let component: ProfessionalUsersDefaultersComponent;
  let fixture: ComponentFixture<ProfessionalUsersDefaultersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalUsersDefaultersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalUsersDefaultersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
