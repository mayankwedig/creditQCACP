import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadUsersDefaulterComponent } from './upload-users-defaulter.component';

describe('UploadUsersDefaulterComponent', () => {
  let component: UploadUsersDefaulterComponent;
  let fixture: ComponentFixture<UploadUsersDefaulterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadUsersDefaulterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadUsersDefaulterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
