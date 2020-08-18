// ******************** Node APIs path  MainProject/Routes/route.js *********************** */

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from '../shared/services/global.service';

@Injectable()
export class TeachersDataService {
  constructor(private http: Http, private _globalService: GlobalService) {}

  public serverLink = this._globalService.constants.serverLink;
  public imagesBaseServer = this._globalService.constants.imagesBaseServer;
  public headers = new Headers(this._globalService.constants.headers);

  // *********************** Call API for retreiewing Teachers Data ********************

  getTeachersF() {
    return this.http
      .get(this.serverLink + 'get/teachers/1', {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call API for retreiewing Teachers Data with pagination ********************
  getTeachersWithPaginationF(pagination_data) {
    return this.http
      .post(
        this.serverLink + 'list/teachers_with_pagination',
        pagination_data,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }

  // *********************** Call API for retreiewing Teachers Name and Id only ********************

  getTeacherNameIdF() {
    return this.http
      .get(this.serverLink + 'get/teacherNameId', {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call API for retreiewing single Teachers Data ********************

  getSingleTeacherF(id) {
    return this.http
      .get(this.serverLink + 'get/teacher/' + id, {
        headers: this.headers
      })
      .map(res => res.json());
  }

  getTeacherSchedule(data){

    return this.http
      .post(this.serverLink + 'get/teacher/schedule',data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API for Adding Teachers Data *****************************

  addTeachersF(newTeacherData) {
    return this.http
      .post(this.serverLink + 'add/teacher', newTeacherData, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API for Updating Teachers Data *****************************

  updateTeacherF(updateTeacherData, id) {
    return this.http
      .put(this.serverLink + 'update/teacher/' + id, updateTeacherData, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API for DeletingTeachers Data *****************************

  deleteTeachersF(id) {
    return this.http
      .delete(this.serverLink + 'delete/teacher/' + id, {
        headers: this.headers
      })
      .map(response => response.json());
  }
}
