import { TestBed } from '@angular/core/testing';
import { CQEService } from './cqe.service';

describe('CQEService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CQEService = TestBed.get(CQEService);
    expect(service).toBeTruthy();
  });
});
