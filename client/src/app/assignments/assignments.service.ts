import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from '../shared/services/global.service';

@Injectable()
export class AssignmentsService {
  constructor(private http: Http, private _globalService: GlobalService) {}

  public serverLink = this._globalService.constants.serverLink;
  public headers = new Headers(this._globalService.constants.headers);
  // *********************** Call  API to add new assignment *****************************

  add_newAssignmentF(new_assignment_data) {
    return this.http
      .post(this.serverLink + 'add/new_assignment', new_assignment_data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API to get assignmen details *****************************

  get_assignmentsF(assignemnt_data) {
    return this.http
      .post(this.serverLink + 'get_assignment_details', assignemnt_data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  upload_images(formData) {
    return this.http
      .post(this.serverLink + 'photos/upload', formData, {
        headers: this.headers
      })
      .map(files => files.json());
  }

  // *********************** getting student and assignment mark details *****************************

  get_students_assign_details(data) {
    return this.http
      .post(this.serverLink + 'get/student/assign_details', data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Update student assignment marks *****************************
  update_Assignment_marks(data) {
    return this.http
      .post(this.serverLink + 'update/std_assignment_marks', data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** upload assignment images *****************************

  add_assignment_images(image_data) {
    return this.http
      .post(this.serverLink + 'upload/assignment', image_data, {
        
      })
      .map(response => response.json());
  }
}
