import { TestBed, inject } from '@angular/core/testing';

import { MarkEmpAttendanceService } from './mark-emp-attendance.service';

describe('MarkEmpAttendanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkEmpAttendanceService]
    });
  });

  it('should be created', inject([MarkEmpAttendanceService], (service: MarkEmpAttendanceService) => {
    expect(service).toBeTruthy();
  }));
});
