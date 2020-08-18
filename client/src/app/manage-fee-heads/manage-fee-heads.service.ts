import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from './../shared/services/global.service';

@Injectable()
export class ManageFeeHeadsService {
  public headers = new Headers();

  constructor(private http: Http, private _globalService: GlobalService) {
    this.headers.append('Content-type', 'application/json');
  }

  // get server link from global services
  public serverLink = this._globalService.constants.serverLink;

  // *********************************************************************************************************************** */
  /********************************************Calling APIs  ************************************************************** */
  // *********************************************************************************************************************** */

  // ************************** Call API to add new Fee Heads  *******************************
	
  addNewFeeHead(formdata) {
	
    return this.http
      .post(this.serverLink + 'add/feehead', formdata, {
        headers: this.headers
      })
      .map(response => response.json());
  } 
  
  // ************************** Call API to get all Fee Heads  *******************************
  getFeeHeads() {
    return this.http
      .get(this.serverLink + 'get/feeheads', {
        headers: this.headers
      })
      .map(response => response.json());
  }
  
  // ************************** Call API to updatel Fee Heads  *******************************
	updateFeeHeads(formdata, id) {
		return this.http
		  .put(this.serverLink + 'update/feeheads/' + id, formdata, {
			headers: this.headers
		  })
		  .map(response => response.json());
	}
  
  // ************************** Call API to updatel Fee Heads  ******************************	
	deletesingleFeeHead(deleteStatus, id) {
    return this.http
      .put(this.serverLink + 'delete/feehead/' + id, deleteStatus, {
        headers: this.headers
      })
      .map(response => response.json());
  }
  
}
