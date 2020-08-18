import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { GlobalService } from '../shared/services/global.service';
@Injectable()
export class StudentPromotionService {
  constructor(private http: Http, private _globalService: GlobalService) {}

  public serverLink = this._globalService.constants.serverLink;
  public headers = new Headers(this._globalService.constants.headers);

  // *************** Call API to get Students data for students promotions *****************
  getStudentsPromotionInfo(class_id, current_session, next_session) {
    return this.http
      .get(
        this.serverLink +
          'get/std_promotionInfo/' +
          class_id +
          '/' +
          current_session +
          '/' +
          next_session,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }

  // *************** Call API to enroll student in next session *****************
  studentPromoteFun(user_promote_data) {
    return this.http
      .post(this.serverLink + 'new/enrollment', user_promote_data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *************** Call API to promote students in bulk *****************

  studentBulKPromoteFun(bulk_promote_data) {
    return this.http
      .post(this.serverLink + 'new/bulk_enrollment', bulk_promote_data, {
        headers: this.headers
      })
      .map(response => response.json());
  }
}
