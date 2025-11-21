import { TestBed } from '@angular/core/testing';

import { CodingStats } from './coding-stats';

describe('CodingStats', () => {
  let service: CodingStats;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodingStats);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
