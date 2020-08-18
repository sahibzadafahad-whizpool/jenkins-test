import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from './../shared/services/global.service';

@Injectable()
export class ManageFeeStructureService {
  public headers = new Headers();

  constructor(private http: Http, private _globalService: GlobalService) {
    this.headers.append('Content-type', 'application/json');
  }

  // get server link from global services
  public serverLink = this._globalService.constants.serverLink;

  // *********************************************************************************************************************** */
  /********************************************Calling APIs  ************************************************************** */
  // *********************************************************************************************************************** */

  // ************************** Call API to add new Fee Structure  *******************************

  addNewFeeStructure(fee_structData) {
    return this.http
      .post(this.serverLink + 'add/FeeStruct', fee_structData, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // ************************** Call API to get Fee Structure details *******************************
  getFeeStructInfoF(running_session) {
    return this.http
      .get(this.serverLink + 'get/fee_structDetails/' + running_session)
      .map(response => response.json());
  }

  // *************************** Delete Fee Structure ************************************ */

  deleteFeeStructF(fee_struct_id) {
    return this.http
      .delete(this.serverLink + 'delete/fee_structure/' + fee_struct_id, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *************************** Get single class fee structure************************************ */

  get_singleClassFeeStructDataF(fee_struct_id) {
    return this.http
      .get(this.serverLink + 'get/single_ClassfeeStructData/' + fee_struct_id)
      .map(response => response.json());
  }

  // *************************** update fee structure data************************************ */
  updateFeeStructF(update_data) {
    return this.http
      .put(this.serverLink + 'update/class_feeStruct', update_data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  getFeeStructByClassIdF(class_id, running_session) {
    return this.http
      .get(
        this.serverLink +
          'get/getFeeStructByClassId/' +
          class_id +
          '/' +
          running_session
      )
      .map(response => response.json());
  }
}
