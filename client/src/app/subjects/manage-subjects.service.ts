// ******************** Node APIs path  MainProject/Routes/route.js *********************** */

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from '../shared/services/global.service';

@Injectable()
export class SubjectsDataService {
  constructor(private http: Http, private _globalService: GlobalService) {}

  // get server link from global services
  public serverLink = this._globalService.constants.serverLink;
  public headers = new Headers(this._globalService.constants.headers);

  // *********************** Call  API for Adding New Class Data *****************************

  addSubjectF(newSubjectData) {
    return this.http
      .post(this.serverLink + 'add/subject', newSubjectData, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *************** Call API to get Elective Subject data against class *****************

  getElectiveSubjectF(class_id, running_session) {
    return this.http
      .get(
        this.serverLink + 'get/eSubject/' + class_id + '/' + running_session,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }

  // *************** Call API to get Core Subject data against class *****************

  getCoreSubjectF(class_id, running_session) {
    return this.http
      .get(
        this.serverLink + 'get/cSubject/' + class_id + '/' + running_session,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }

  // *************** Call API to get Core Subject data against class and section Id *****************
  getSubjectByClassSecIdF(class_id, section_id, running_session) {
    return this.http
      .get(
        this.serverLink +
          'get/cSubjectByClassSec/' +
          class_id +
          '/' +
          section_id +
          '/' +
          running_session,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }

  // *************** Call API to get Single subject data against class *****************
  getSingleSubjectF(subject_id, section_id, class_id, running_session) {
    return this.http
      .get(
        this.serverLink +
          'get/singleSubject/' +
          class_id +
          '/' +
          section_id +
          '/' +
          subject_id +
          '/' +
          running_session,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }

  // *************** Call API to check subject already added *****************

  checkSubjectPresent(subject_data) {
    return this.http
      .post(this.serverLink + 'check/subject', subject_data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *************** Call API to Update Subject Details **********************

  updateSubjectF(class_id, section_id, subject_id, updateSubjData) {
    return this.http
      .put(
        this.serverLink +
          'update/subject/' +
          class_id +
          '/' +
          section_id +
          '/' +
          subject_id,
        updateSubjData,
        { headers: this.headers }
      )
      .map(response => response.json());
  }

  // *********************** Call API for Delete Subject Data ********************

  delSubjectF(class_id, section_id, subject_id, deleteStatus) {
    return this.http
      .put(
        this.serverLink +
          'delete/subject/' +
          class_id +
          '/' +
          section_id +
          '/' +
          subject_id,
        deleteStatus,
        { headers: this.headers }
      )
      .map(response => response.json());
  }
}
