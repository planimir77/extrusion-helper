import { TestBed } from '@angular/core/testing';

import { DensityOptionsService } from './density-options.service';

describe('DensityOptionsService', () => {
  let service: DensityOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DensityOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
