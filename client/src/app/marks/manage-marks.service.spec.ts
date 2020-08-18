import { TestBed, inject } from '@angular/core/testing';

import { ManageMarksService } from './manage-marks.service';

describe('ManageMarksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageMarksService]
    });
  });

  it('should be created', inject([ManageMarksService], (service: ManageMarksService) => {
    expect(service).toBeTruthy();
  }));
});
