import { TestBed, inject } from '@angular/core/testing';

import { AttendanceReportService } from './attendance-report.service';

describe('AttendanceReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttendanceReportService]
    });
  });

  it('should be created', inject([AttendanceReportService], (service: AttendanceReportService) => {
    expect(service).toBeTruthy();
  }));
});
