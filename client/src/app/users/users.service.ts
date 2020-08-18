import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from '../shared/services/global.service';
import 'rxjs/add/operator/catch';
@Injectable()
export class UsersService {
  constructor(private http: Http, private _globalService: GlobalService) {}
  public serverLink = this._globalService.constants.serverLink;
  public headers = new Headers(this._globalService.constants.headers);

  // *********************** Call  API to add new users *****************************

  add_newUserF(new_user_data) {
    return this.http
      .post(this.serverLink + 'add/new_user', new_user_data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API to get all users *****************************
  get_userDetailsF() {
    return this.http
      .get(this.serverLink + 'get/user_data', {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API to update users *****************************
  updateUserInfo(update_data, login_id) {
    return this.http
      .put(
        this.serverLink + 'update/update_userInfo/' + login_id,
        update_data,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }

  // *********************** Update Password *****************************
  update_userPassword(passwordData) {
    return this.http
      .put(this.serverLink + 'update/userPassword', passwordData, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  deleteAdmin(user) {
    return this.http
      .post(this.serverLink + 'delete/user', user, {
        headers: this.headers
      })
      .map(response => response.json());
  }
}
