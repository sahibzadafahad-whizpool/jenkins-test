import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from '../shared/services/global.service';

@Injectable()
export class ResetPasswordService {
  public headers = new Headers();

  constructor(private http: Http, private _globalService: GlobalService) {
    this.headers.append('Content-type', 'application/json');
  }

  public serverLink = this._globalService.constants.serverLink;

  // *********************** parent reset new password *****************************

  resetNewPassword(reset_password_data) {
    return this.http
      .post(this.serverLink + 'api/reset_password', reset_password_data, {
        headers: this.headers
      })
      .map(response => response.json());
  }
}
