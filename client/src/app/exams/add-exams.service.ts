import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from '../shared/services/global.service';

@Injectable()
export class AddExamsService {
  constructor(private http: Http, private _globalService: GlobalService) {}

  // get server link from global services
  public serverLink = this._globalService.constants.serverLink;
  public headers = new Headers(this._globalService.constants.headers);

  // *********************************************************************************************************************** */
  /********************************************Calling APIs  ************************************************************** */
  // *********************************************************************************************************************** */

  // ************************** Call API to add new exam data  *******************************

  addNewExamFun(exam_data) {
    return this.http
      .post(this.serverLink + 'add/newExam', exam_data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // ************************** Call API to get exams list  *******************************/

  getExamInfoFun(running_session) {
    return this.http
      .get(this.serverLink + 'get/examList/' + running_session, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // ************************** Call API to get single exams data  *******************************/
  get_singleExamDataFun(exam_id) {
    return this.http
      .get(this.serverLink + 'get/singleExamList/' + exam_id, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *************************Call API to delete exams ********************************* */

  deleteExamsFun(exam_id) {
    return this.http
      .delete(this.serverLink + 'delete/exam/' + exam_id, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *************************Call API to update exams ********************************* */
  updateExamData(exam_UpdateData, exam_id) {
    return this.http
      .put(this.serverLink + 'update/exam/' + exam_id, exam_UpdateData, {
        headers: this.headers
      })
      .map(response => response.json());
  }
}
