import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from '../shared/services/global.service';
@Injectable()
export class ViewEmpAttendanceService {
  constructor(private http: Http, private _globalService: GlobalService) {}

  public serverLink = this._globalService.constants.serverLink;
  public headers = new Headers(this._globalService.constants.headers);

  get_role_xref() {
    return this.http
      .get(this.serverLink + 'get/role_xref/', {
        headers: this.headers
      })
      .map(res => res.json());
  }

  get_employees(data) {
    return this.http
      .post(this.serverLink + 'get/employees',data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  getEmployeesAttendReport(data){
    return this.http
    .post(this.serverLink + 'get/EmployeesAttendanceReport/',data, {
      headers: this.headers
    })
    .map(response => response.json());
  }

}
