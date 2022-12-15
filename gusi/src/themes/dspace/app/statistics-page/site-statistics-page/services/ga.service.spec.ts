import { TestBed } from '@angular/core/testing';

import { GAService } from './ga.service';

describe('ServicesService', () => {
  let service: GAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
