import { TestBed, inject } from '@angular/core/testing';

import { ManageFeeVoucherService } from './manage-fee-voucher.service';

describe('ManageFeeVoucherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageFeeVoucherService]
    });
  });

  it('should be created', inject([ManageFeeVoucherService], (service: ManageFeeVoucherService) => {
    expect(service).toBeTruthy();
  }));
});
