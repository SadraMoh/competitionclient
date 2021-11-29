import { TestBed } from '@angular/core/testing';

import { CoinboxService } from './coinbox.service';

describe('CoinboxService', () => {
  let service: CoinboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
