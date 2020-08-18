import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from '../app/shared/services/global.service';

@Injectable()
export class AdminService {
  public headers = new Headers();

  constructor(private http: Http, private _globalService: GlobalService) {
    this.headers.append('Content-type', 'application/json');
  }

  public serverLink = this._globalService.constants.serverLink;

  // ********************* LoginCHeck ***********************

  loginCheck(loginData) {
    return this.http
      .post(this.serverLink + 'admin/login', loginData, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // ********************************************************************* */
  // *********************** check username already added****************** */
  // ******************************************************************* */

  userNameExistCheckF(userInfo) {
    return this.http
      .post(this.serverLink + 'isUserName/present', userInfo, {
        headers: this.headers
      })
      .map(response => response.json());
  }
}
