import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from './../shared/services/global.service';
import 'rxjs/add/operator/catch';
@Injectable()
export class SettingsService {
  constructor(private http: Http, private _globalService: GlobalService) {}
  public headers = new Headers(this._globalService.constants.headers);
  public serverLink = this._globalService.constants.serverLink;
  public imagesBaseServer = this._globalService.constants.imagesBaseServer;

  
  // *********************** Call  API to get session details *****************************

  get_fee_templates_list() {
    return this.http
      .get(this.serverLink + 'get_fee_templates_list/', {
        headers: this.headers
      })
      .map(response => response.json());
  }

  get_promotionalMessages(data) {
    return this.http
      .get(this.serverLink + 'get/promotionalmessages/' + data, {
        headers: this.headers
      })
      .map(response => response.json());
  }
  
   // *********************** update session data *****************************
  update_promotionalMessages(updated_data) {
    return this.http
      .post(this.serverLink + 'update/promotionalmessages', updated_data, {
        headers: this.headers
      })
      .map(response => response.json());
  }
  
  // *********************** Call  API to get session details *****************************

  get_sessionDetailsF(data) {
    return this.http
      .get(this.serverLink + 'get/session_details/' + data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API to get active session details *****************************

  get_activeSessionF() {
    return this.http
      .get(this.serverLink + 'get/active_session', {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Add new session *****************************
  add_newSession(data) {
    return this.http
      .post(this.serverLink + 'add/new_session', data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** update session data *****************************
  update_SessionInfo(updated_data) {
    return this.http
      .post(this.serverLink + 'update/session_date', updated_data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Set session active *****************************
  set_sessionActiveF(update_data) {
    return this.http
      .post(this.serverLink + 'set/session_active', update_data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Set school info *****************************
  get_schoolInfoF() {
    return this.http
      .get(this.serverLink + 'get/school_info', {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Update school info *****************************
  update_schoolInfo(school_id, update_data) {
    return this.http
      .put(this.serverLink + 'update/school_info/' + school_id, update_data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Forget password *****************************
  forget_password(email) {
    return this.http
      .post(this.serverLink + 'forget/password', email, {
        headers: this.headers
      })
      .map(response => response.json());
  }
  
  // ********************************************************************* */
  // ********************** upload images****************** */
  // ******************************************************************* */

  uploadLogo(image_data) {
    return this.http
      .post(this.serverLink + 'upload/school_logo', image_data, {
        
      })
      .map(response => response.json());
  }
}
