import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from './../shared/services/global.service';

@Injectable()
export class ManageFeeDiscountsService {
  public headers = new Headers(this._globalService.constants.headers);

  constructor(private http: Http, private _globalService: GlobalService) {}

  // get server link from global services
  public serverLink = this._globalService.constants.serverLink;

  // *********************************************************************************************************************** */
  /********************************************Calling APIs  ************************************************************** */
  // *********************************************************************************************************************** */

  // ************************** Call API to get student details  by class id *******************************
  getClassStudentsF(class_id, section_id, running_session) {
    return this.http
      .get(
        this.serverLink +
          'get/class_students/' +
          class_id +
          '/' +
          section_id +
          '/' +
          running_session,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }

  // ************************** Call API to get class fee details   *******************************
  getClassFeeF(class_id, running_session) {
    return this.http
      .get(
        this.serverLink +
          'get/class_feeDetails/' +
          class_id +
          '/' +
          running_session,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }

  // ************************** Call API to set fee discount   *******************************
  setStudentFeeDiscount(fee_discount_data) {
    return this.http
      .post(this.serverLink + 'set/studentFeeDiscount', fee_discount_data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // ************************** Call API to get students fee discount details   *******************************
  get_studentsFeeDiscountList(class_id, runnig_session) {
    return this.http
      .get(
        this.serverLink +
          'get/studentsFeeDiscList/' +
          class_id +
          '/' +
          runnig_session,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }

  // ************************** Call API to get single std fee discount details   *******************************
  get_singleStdFeeDisF(discount_id) {
    return this.http
      .get(this.serverLink + 'get/singleStdFeeDiscDetails/' + discount_id, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // ************************** Call API to update std fee discount details   *******************************

  update_stdFeeDiscount(discount_id, std_feeDisDetails) {
    return this.http
      .put(
        this.serverLink + 'update/stdFeeDiscountDetails/' + discount_id,
        std_feeDisDetails,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }

  // ************************** Call API to disable student fee discount   *******************************

  disableStdFeeDiscount(discount_id, status) {
    return this.http
      .put(
        this.serverLink +
          'change/stdFeeDiscount_status/' +
          discount_id +
          '/' +
          status,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }
  
  /*****************************************************************************************/
	getStudentList(formData) {
		return this.http
		  .post(this.serverLink + 'get/get_student_list', formData, {
			headers: this.headers
		  })
		  .map(response => response.json());
	} 
    
	getDiscoutnListByClassId(formData) {
		return this.http
		  .post(this.serverLink + 'get/discount_by_class', formData, {
			headers: this.headers
		  })
		  .map(response => response.json());
	}
}
