import { TestBed, inject } from '@angular/core/testing';

import { ManageFeeInvoiceService } from './manage-fee-invoice.service';

describe('ManageFeeInvoiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageFeeInvoiceService]
    });
  });

  it('should be created', inject([ManageFeeInvoiceService], (service: ManageFeeInvoiceService) => {
    expect(service).toBeTruthy();
  }));
});
