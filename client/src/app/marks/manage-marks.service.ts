// ******************** Node APIs path  MainProject/Routes/route.js *********************** */

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from '../shared/services/global.service';

@Injectable()
export class ManageMarksService {
  constructor(private http: Http, private _globalService: GlobalService) {}

  public headers = new Headers(this._globalService.constants.headers);
  // get server link from global services
  public serverLink = this._globalService.constants.serverLink;

  // *********************************************************************************************************************** */
  /********************************************Calling APIs  ************************************************************** */
  // *********************************************************************************************************************** */

  // ************************** Call API to get std , exam marks deatils to update . add marks   *******************************

  getStdForMngMarks(
    class_id,
    section_id,
    exam_id,
    subject_id,
    running_session,
    subject_type
  ) {
    return this.http
      .get(
        this.serverLink +
          'get/stdForMngMarks/' +
          class_id +
          '/' +
          section_id +
          '/' +
          exam_id +
          '/' +
          subject_id +
          '/' +
          running_session +
          '/' +
          subject_type,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }

  // ************************** Call API to add exam marks against subjects  *******************************

  addExamMarksF(stdMarksdata) {
    return this.http
      .post(this.serverLink + 'add/examMarks', stdMarksdata, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // ************************** Add quiz Images  *******************************

  add_quiz_images(images_data) {
    return this.http
      .post(this.serverLink + 'quiz/images', images_data, {
        headers: this.headers
      })
      .map(response => response.json());
  }
}
