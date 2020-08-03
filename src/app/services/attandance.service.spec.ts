import { TestBed } from '@angular/core/testing';

import { AttandanceService } from './attandance.service';

describe('AttandanceService', () => {
  let service: AttandanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttandanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
