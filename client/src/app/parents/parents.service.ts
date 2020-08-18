// ****************************************************************************************** //
// ************* We define business logic here for calling Node API's ************************** //
// ******************************************************************************************* */
// ******************** Node APIs path  MainProject/Routes/route.js *********************** */

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from '../shared/services/global.service';

@Injectable()
export class ParentsDataService {
  constructor(private http: Http, private _globalService: GlobalService) {}
  public headers = new Headers(this._globalService.constants.headers);
  public serverLink = this._globalService.constants.serverLink;

  // *********************** Call  API for Adding Parent Data *****************************

  addParentF(newParentData) {
    return this.http
      .post(this.serverLink + 'add/parent', newParentData, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API for Get Parent Data *****************************

  getParentsF() {
    return this.http
      .get(this.serverLink + 'get/parents', {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API for Get Parent Data using pagination *****************************

  getParentsWithPaginationF(paginationData) {
    return this.http
      .post(this.serverLink + 'list/parentsWithPagination', paginationData, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API for Get Single Parent Data *****************************

  getSingleParentF(parent_id) {
    return this.http
      .get(this.serverLink + 'get/singleParent/' + parent_id, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API to Update Parent Data *****************************

  updateParentF(updateParentData, parent_id) {
    return this.http
      .put(this.serverLink + 'update/parent/' + parent_id, updateParentData, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API to Update Parent Data *****************************

  deleteParentF(parent_id) {
    return this.http
      .put(this.serverLink + 'delete/parent/' + parent_id, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API to Update Parent password *****************************

  updatePassword(parent_id, updatePassword) {
    return this.http
      .put(this.serverLink + 'update/pPassword/' + parent_id, updatePassword, {
        headers: this.headers
      })
      .map(response => response.json());
  }
}
