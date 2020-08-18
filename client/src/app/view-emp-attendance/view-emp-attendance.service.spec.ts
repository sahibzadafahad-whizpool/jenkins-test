import { TestBed, inject } from '@angular/core/testing';

import { ViewEmpAttendanceService } from './view-emp-attendance.service';

describe('ViewEmpAttendanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewEmpAttendanceService]
    });
  });

  it('should be created', inject([ViewEmpAttendanceService], (service: ViewEmpAttendanceService) => {
    expect(service).toBeTruthy();
  }));
});
