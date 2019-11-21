import { TestBed } from '@angular/core/testing';

import { DefaulterService } from './defaulter.service';

describe('DefaulterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DefaulterService = TestBed.get(DefaulterService);
    expect(service).toBeTruthy();
  });
});
