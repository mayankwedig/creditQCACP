import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalUsersDedefaultersComponent } from './professional-users-dedefaulters.component';

describe('ProfessionalUsersDedefaultersComponent', () => {
  let component: ProfessionalUsersDedefaultersComponent;
  let fixture: ComponentFixture<ProfessionalUsersDedefaultersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalUsersDedefaultersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalUsersDedefaultersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
