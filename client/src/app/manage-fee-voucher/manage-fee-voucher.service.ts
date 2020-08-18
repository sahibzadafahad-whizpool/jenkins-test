import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from './../shared/services/global.service';

@Injectable()
export class ManageFeeVoucherService {
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

	getFeeVoucher(formData) {
		return this.http
		  .post(this.serverLink + 'get/fee_voucher', formData, {
			headers: this.headers
		  })
		  .map(response => response.json());
	}
	
	checkFeeVoucher(formData) {
		return this.http
		  .post(this.serverLink + 'check/fee_voucher', formData, {
			headers: this.headers
		  })
		  .map(response => response.json());
	}
	
	// ************************** Call API to add new Fee Structure  ******************************
	updateFeeVoucherDraft(formData) {
		return this.http
		  .post(this.serverLink + 'update/fee_voucher_draft', formData, {
			headers: this.headers
		  })
		  .map(response => response.json());
	}
	
	// ************************** Call API to add new Fee Structure  *******************************
	getclassTutionFee(class_id, running_session) {
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
	  
	  // ************************** Call API to add new Fee Structure  *******************************
	createFeeVouchers(formData) {
		return this.http
		  .post(this.serverLink + 'create/fee_vouchers', formData, {
			headers: this.headers
		  })
		  .map(response => response.json());
	}
}
