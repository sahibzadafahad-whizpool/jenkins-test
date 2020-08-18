import { TestBed, inject } from '@angular/core/testing';

import { ManagePreviousVoucherService } from './manage-previous-voucher.service';

describe('ManagePreviousVoucherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagePreviousVoucherService]
    });
  });

  it('should be created', inject([ManagePreviousVoucherService], (service: ManagePreviousVoucherService) => {
    expect(service).toBeTruthy();
  }));
});
