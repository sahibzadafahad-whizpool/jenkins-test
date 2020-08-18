import { TestBed, inject } from '@angular/core/testing';

import { DailyAttendanceService } from './daily-attendance.service';

describe('DailyAttendanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DailyAttendanceService]
    });
  });

  it('should be created', inject([DailyAttendanceService], (service: DailyAttendanceService) => {
    expect(service).toBeTruthy();
  }));
});
