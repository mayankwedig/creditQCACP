import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDefaulterComponent } from './upload-defaulter.component';

describe('UploadDefaulterComponent', () => {
  let component: UploadDefaulterComponent;
  let fixture: ComponentFixture<UploadDefaulterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDefaulterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDefaulterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
