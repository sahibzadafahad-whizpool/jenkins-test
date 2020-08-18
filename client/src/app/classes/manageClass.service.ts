// ******************** Node APIs path  MainProject/Routes/route.js *********************** */

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from './../shared/services/global.service';

@Injectable()
export class ClassDataService {
  constructor(private http: Http, private _globalService: GlobalService) {}

  public serverLink = this._globalService.constants.serverLink;
  public headers = new Headers(this._globalService.constants.headers);

   // *********************** Call  API for Updating Class Data *****************************

  updateSubClass(classUpdateDetails, id) {
    return this.http
      .put(this.serverLink + 'update/subclass/' + id, classUpdateDetails, {
        headers: this.headers
      })
      .map(response => response.json());
  }
  
  // *********************** Call API for retreiewing sub Class Data ********************

  getSubClasses() {
    return this.http
      .get(this.serverLink + 'get/subclasses', {
        headers: this.headers
      })
      .map(response => response.json());
  }
  
  // *********************** Call API for retreiewing Class Data ********************

  getClassesF(mode='') {
    return this.http
      .get(this.serverLink + 'get/classes/'+mode, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call API for retreiewing single Class Data By ID********************

  getSingleClassByIdF(id) {
    return this.http
      .get(this.serverLink + 'get/classById/' + id, {
        headers: this.headers
      })
      .map(res => res.json());
  }

  // ********************* Call API to check whether class already added ******************* */

  classExistCheckF(c_name) {
    return this.http
      .get(this.serverLink + 'get/classByName/' + c_name, {
        headers: this.headers
      })
      .map(res => res.json());
  }

  // *********************** Call  API for Adding New Class Data *****************************

  addClassF(classDetails) {
    return this.http
      .post(this.serverLink + 'add/class', classDetails, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API for Adding New Sub Class Data *****************************  
  addSubClass(classDetails) {
    return this.http
      .post(this.serverLink + 'add/subclass', classDetails, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API for Updating Class Data *****************************

  updateClassF(classUpdateDetails, id) {
    return this.http
      .put(this.serverLink + 'update/class/' + id, classUpdateDetails, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API for Deleting Teachers Data *****************************

  deleteClassF(deleteStatus, id) {
    return this.http
      .put(this.serverLink + 'delete/class/' + id, deleteStatus, {
        headers: this.headers
      })
      .map(response => response.json());
  }
  
  deleteSubClass(deleteStatus, id) {
    return this.http
      .put(this.serverLink + 'delete/subclass/' + id, deleteStatus, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  getClassDetails(data){
    return this.http
    .post(this.serverLink + 'get_class_details', data, {
      headers: this.headers
    })
    .map(response => response.json());
  }

}
