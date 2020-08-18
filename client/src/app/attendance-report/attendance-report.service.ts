import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { GlobalService } from '../shared/services/global.service';
@Injectable()
export class AttendanceReportService {
  constructor(private http: Http, private _globalService: GlobalService) {}
  public headers = new Headers(this._globalService.constants.headers);
  public serverLink = this._globalService.constants.serverLink;

  // ********************* Call  API to get students Attendance report **********************

  getStdAttendReport(
    class_id,
    section_id,
    student_id,
    attendStartDate,
    attendEndDate,
    running_session
  ) {
    return this.http
      .get(
        this.serverLink +
          'get/stdAttendReport/' +
          class_id +
          '/' +
          section_id +
          '/' +
          student_id +
          '/' +
          attendStartDate +
          '/' +
          attendEndDate +
          '/' +
          running_session,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }

  getStudentsOfClassSection(class_id,section_id,running_session){
    return this.http
    .get(
      this.serverLink +
        'get/students_of_class_section/' +
        class_id +
        '/' +
        section_id +
        '/'+
        running_session,
      {
        headers: this.headers
      }
    )
    .map(response => response.json());
  }

  publish_attendance(data){
    return this.http.post(this.serverLink +
      'publish_attendance',data).map(response => response.json());;
  }

}
