import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from '../shared/services/global.service';
@Injectable()
export class DailyAttendanceService {
  constructor(private http: Http, private _globalService: GlobalService) {}

  public serverLink = this._globalService.constants.serverLink;
  public headers = new Headers(this._globalService.constants.headers);

  // *********************** Call  API for Marking Attendance *****************************

  markAttendanceF(dailyAttendance) {
    return this.http
      .post(this.serverLink + 'mark/attendance', dailyAttendance, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // ********************* Call  API to get students for mark attendace **********************

  getstdForMrkAttendance(class_id, section_id, running_session, timestamp) {
    return this.http
      .get(
        this.serverLink +
          'get/stdForMrkAttendance/' +
          class_id +
          '/' +
          section_id +
          '/' +
          running_session +
          '/' +
          timestamp,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }

  // ********************* Call  API to mark attendance in bulk **********************
  mark_Bulk_attendance(bulk_attendance) {
    return this.http
      .post(this.serverLink + 'mark/bulk_attendance', bulk_attendance, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // ********************* Call API to add absent reason **********************
  add_absent_reason(data) {
    return this.http
      .post(this.serverLink + 'update/absent_reason', data, {
        headers: this.headers
      })
      .map(response => response.json());
  }
}
