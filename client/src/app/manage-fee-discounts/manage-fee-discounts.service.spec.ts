import { TestBed, inject } from '@angular/core/testing';

import { ManageFeeDiscountsService } from './manage-fee-discounts.service';

describe('ManageFeeDiscountsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageFeeDiscountsService]
    });
  });

  it('should be created', inject([ManageFeeDiscountsService], (service: ManageFeeDiscountsService) => {
    expect(service).toBeTruthy();
  }));
});
