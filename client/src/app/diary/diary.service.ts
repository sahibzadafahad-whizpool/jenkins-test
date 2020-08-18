import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from '../shared/services/global.service';
@Injectable()
export class DiaryService {
  constructor(private http: Http, private _globalService: GlobalService) {}

  public serverLink = this._globalService.constants.serverLink;
  public headers = new Headers(this._globalService.constants.headers);

  // *********************** Call  API for Marking Attendance *****************************

  viewDiary(data) {
    return this.http
      .post(this.serverLink + 'get_class_diary', data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  add_diary(data) {
    return this.http
      .post(this.serverLink + 'add_class_diary', data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  edit_diary(data) {
    return this.http
      .post(this.serverLink + 'edit_class_diary', data, {
        headers: this.headers
      })
      .map(response => response.json());
  }
  
  delete_diary(data) {
    return this.http
      .post(this.serverLink + 'delete_diary', data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

}
