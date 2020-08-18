import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from '../shared/services/global.service';
@Injectable()
export class MarkEmpAttendanceService {
  constructor(private http: Http, private _globalService: GlobalService) {}

  public serverLink = this._globalService.constants.serverLink;
  public headers = new Headers(this._globalService.constants.headers);

  // *********************** Call  API for Marking Attendance *****************************

  get_role_xref() {
    return this.http
      .get(this.serverLink + 'get/role_xref/', {
        headers: this.headers
      })
      .map(res => res.json());
  }

  get_employees_for_attendance(data){
    return this.http
    .post(this.serverLink + 'get/employees_for_attendance',data, {
      headers: this.headers
    })
    .map(response => response.json());
  }
  
  markEmployeeAttendance(data){
    return this.http
    .post(this.serverLink + 'mark_employee_attendance',data, {
      headers: this.headers
    })
    .map(response => response.json());
  }

}
