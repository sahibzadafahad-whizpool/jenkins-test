// ******************** Node APIs path  MainProject/Routes/route.js *********************** */

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from './../shared/services/global.service';

@Injectable()
export class SectionDataService {
  public headers = new Headers(this._globalService.constants.headers);

  constructor(private http: Http, private _globalService: GlobalService) {}

  public serverLink = this._globalService.constants.serverLink;

  // ********* Call API to get section data against class id *****************

  getOnlySectionDataF(class_id) {
    return this.http
      .get(this.serverLink + 'get/sectionData/' + class_id, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // ********* Call API to get section related all data (section , class, teachers info) against class id *****************

  getSectionF(class_id,mode='') {

    let mode_param = ''
    if(mode!=''){
      mode_param = "\/"+mode
    }

    return this.http
      .get(this.serverLink + 'get/sectionRelatedData/' + class_id+mode_param, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *************** Call API to get single section data against class *****************

  getSingleSectionF(section_id, class_id) {
    return this.http
      .get(
        this.serverLink + 'get/singleSection/' + section_id + '/' + class_id,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }

  // ********************* Call API for add Section Data ***********************

  addSectionF(sectionDetails) {
    return this.http
      .post(this.serverLink + 'add/section', sectionDetails, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call API for Delete Section Data ********************

  delSectionF(clas_id, section_id, deleteStatus) {
    return this.http
      .put(
        this.serverLink + 'delete/section/' + clas_id + '/' + section_id,
        deleteStatus,
        { headers: this.headers }
      )
      .map(response => response.json());
  }

  // *********************** Call API for Delete Section Data By class ID ********************

  delSectionByClassIdF(deleteStatus, id) {
    return this.http
      .put(this.serverLink + 'delete/sectionByClassId/' + id, deleteStatus, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *************** Call API to check whether Section already added against selected class ************* */

  sectionExistCheckF(class_id, section_name) {
    return this.http
      .get(
        this.serverLink +
          'check/sectionExists/' +
          class_id +
          '/' +
          section_name,
        {
          headers: this.headers
        }
      )
      .map(res => res.json());
  }

  // *********************** Call API for Updating Section Data  ********************

  updateSectionF(updateSectionData, clas_id, section_id) {
    return this.http
      .put(
        this.serverLink + 'update/section/' + clas_id + '/' + section_id,
        updateSectionData,
        { headers: this.headers }
      )
      .map(response => response.json());
  }
}
