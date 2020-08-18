import { TestBed, inject } from '@angular/core/testing';

import { ManageFeeStructureService } from './manage-fee-structure.service';

describe('ManageFeeStructureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageFeeStructureService]
    });
  });

  it('should be created', inject([ManageFeeStructureService], (service: ManageFeeStructureService) => {
    expect(service).toBeTruthy();
  }));
});
