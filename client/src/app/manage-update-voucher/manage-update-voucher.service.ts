import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from './../shared/services/global.service';

@Injectable()
export class ManageUpdateVoucherService {
  public headers = new Headers();

  constructor(private http: Http, private _globalService: GlobalService) {
    this.headers.append('Content-type', 'application/json');
  }

  // get server link from global services
  public serverLink = this._globalService.constants.serverLink;

  // *********************************************************************************************************************** */
  /********************************************Calling APIs  ************************************************************** */
  // *********************************************************************************************************************** */

	// ************************** Call API to add new Fee Invoice  *******************************

	fetcFeeVoucher(formData) {
		return this.http
		  .post(this.serverLink + 'fetch/fee_voucher', formData, {
			headers: this.headers
		  })
		  .map(response => response.json());
	}	
	
	// ************************** Call API to add new Fee Invoice  *******************************
	getClassStudents(formData) {
		return this.http
		  .post(this.serverLink + 'fetch/fee_class_invoice', formData, {
			headers: this.headers
		  })
		  .map(response => response.json());
	}
	
	// ************************** Call API to add new Fee Invoice  *******************************
	updateClassStudentsInvoices(formData) {
		return this.http
		  .post(this.serverLink + 'update/student_clas_invoice', formData, {
			headers: this.headers
		  })
		  .map(response => response.json());
	}
	

// ************************** Call API to add new Fee Invoice  *******************************
	updateClassStudentsVoucher(formData) {
		return this.http
		  .post(this.serverLink + 'update/student_clas_voucher', formData, {
			headers: this.headers
		  })
		  .map(response => response.json());
	}

	// ************************** Call API to update student Fee Payment Details *******************************
	  updateFeePaymentStatus(invoice_id, update_data) {
		return this.http
		  .put(
			this.serverLink + 'update/feePaymentDetails/' + invoice_id,
			update_data,
			{
			  headers: this.headers
			}
		  )
		  .map(response => response.json());
	  }

	  // ************************** Call API to get student Fee Histroy *******************************
	  getStudentFeeHistroy(student_id, running_session) {
		return this.http
		  .get(
			this.serverLink +
			  'get/studentFeeHistroy/' +
			  student_id +
			  '/' +
			  running_session,
			{
			  headers: this.headers
			}
		  )
		  .map(response => response.json());
	  }
}
