import { TestBed, inject } from '@angular/core/testing';

import { ManageUpdateVoucherService } from './manage-update-voucher.service';

describe('ManageUpdateVoucherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageUpdateVoucherService]
    });
  });

  it('should be created', inject([ManageUpdateVoucherService], (service: ManageUpdateVoucherService) => {
    expect(service).toBeTruthy();
  }));
});
