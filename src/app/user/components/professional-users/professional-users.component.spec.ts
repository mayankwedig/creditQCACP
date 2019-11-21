import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalUsersComponent } from './professional-users.component';

describe('ProfessionalUsersComponent', () => {
  let component: ProfessionalUsersComponent;
  let fixture: ComponentFixture<ProfessionalUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
