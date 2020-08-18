import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { GlobalService } from '../shared/services/global.service';

@Injectable()
export class StudentsInfoService {
  constructor(private http: Http, private _globalService: GlobalService) {}

  public serverLink = this._globalService.constants.serverLink;
  public imagesBaseServer = this._globalService.constants.imagesBaseServer;
  public headers = new Headers(this._globalService.constants.headers);

  // *************** Call API to get Students data against class *****************

  getParentFromCNIC(data){
    return this.http
    .post(
      this.serverLink + 'get/parent_from_cnic/',data,
      {
        headers: this.headers
      }
    )
    .map(response => response.json());
  }

  getStudByClassId(class_id, running_session) {
    return this.http
      .get(
        this.serverLink + 'get/students/' + class_id + '/' + running_session,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }

  // *************** Call API to get Students Result info *****************
  get_stdResultF(exam_id, student_id, running_session) {
    return this.http
      .get(
        this.serverLink +
          'get/std_result/' +
          exam_id +
          '/' +
          student_id +
          '/' +
          running_session,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }

  // *************** Call API to get Students All exam Result info *****************
  get_stdAllexamResultF(student_id, running_session) {
    return this.http
      .get(
        this.serverLink +
          'get/std_result/' +
          student_id +
          '/' +
          running_session,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }

  // *************** Call API to get required Students data against class and section *****************

  getStudDataByClassSecId(class_id, section_id, running_session) {
    return this.http
      .get(
        this.serverLink +
          'get/getStudDataByClassSecId/' +
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

  // *************** Call API to get Students  data against class and section *****************

  // ** @param data_required -> get student all data or only required data */

  getStudByClassSecId(class_id, section_id, running_session, data_required) {
    return this.http
      .get(
        this.serverLink +
          'get/studentsByClassSecId/' +
          class_id +
          '/' +
          section_id +
          '/' +
          running_session +
          '/' +
          data_required,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }

  // *************** Call API to get Signle Students data for update *****************

  getSingleStdInfo(class_id, running_session) {
    return this.http
      .get(
        this.serverLink +
          'get/singleStudent/' +
          class_id +
          '/' +
          running_session,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }

  getParentInfoFromStudent(student_id) {
    return this.http
      .get(
        this.serverLink +
          'get/parent_info_from_student/' +
          student_id,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }

  getSingleParentInfo(parent_id) {
    return this.http
      .get(
        this.serverLink +
          'get/singleParent/' +
          parent_id,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }

  // *************** Call API to update student personal info *****************

  updateStdInfo(std_id, updateStdData) {
    return this.http
      .put(this.serverLink + 'update/studentInfo/' + std_id, updateStdData, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *************** Call API to update student educational info *****************

  updateStdEnrollInfo(std_id, updateEnrollInfo) {
    return this.http
      .put(
        this.serverLink + 'update/studentEduInfo/' + std_id,
        updateEnrollInfo,
        { headers: this.headers }
      )
      .map(response => response.json());
  }

  // *************** Call API to Delete student  *****************

  deleteStudent(std_id) {
    return this.http
      .put(this.serverLink + 'delete/student/' + std_id, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API for verifing parent phone number *****************************

  verifyParentF(parentNumber) {
    return this.http
      .post(this.serverLink + 'verify/parent', parentNumber, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API for Adding New Student *****************************

  addStudentF(newSubjectData) {
    return this.http
      .post(this.serverLink + 'add/student', newSubjectData, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API for Adding New Student *****************************

  enrollStudentF(enrollStudentData) {
    return this.http
      .post(this.serverLink + 'enroll/student', enrollStudentData, {
        headers: this.headers
      })
      .map(response => response.json());
  }
}
