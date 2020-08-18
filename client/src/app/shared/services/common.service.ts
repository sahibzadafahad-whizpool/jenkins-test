import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from './global.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CommonService {
  constructor(
    private http: Http,
    private _globalService: GlobalService,
    private toastr: ToastrService
  ) {}

  public serverLink = this._globalService.constants.serverLink;
  public headers = new Headers(this._globalService.constants.headers);

  public months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  public complete_months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  public weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  get_role_xref(){
    return this.http
      .get(this.serverLink + 'get_role_xref', {
        headers: this.headers
      })
      .map(response => response.json());
  }

  get_salary_template(){
    return this.http
      .get(this.serverLink + 'get_salary_template', {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // ********************************************************************* */
  // *********************** check username already added****************** */
  // ******************************************************************* */

  userNameExistCheckF(userInfo) {
    return this.http
      .post(this.serverLink + 'isUserName/present', userInfo, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // ********************************************************************* */
  // ********************** check uniquness phone , cinic****************** */
  // ******************************************************************* */

  check_unique_f(check_unique_data) {
    return this.http
      .post(this.serverLink + 'check/unique', check_unique_data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // ********************************************************************* */
  // ********************** upload images****************** */
  // ******************************************************************* */

  add_images(image_data) {
    return this.http
      .post(this.serverLink + 'upload/profile_image', image_data, {
        
      })
      .map(response => response.json());
  }

    // ********************************************************************* */
  // ********************** upload transcript****************** */
  // ******************************************************************* */

  add_transcript(transcript_data) {
    return this.http
      .post(this.serverLink + 'upload/profile_transcript', transcript_data, {
      })
      .map(response => response.json());
  }

  // ********************************************************************* */
  // ********************** seacrh by phone num and NIC****************** */
  // ******************************************************************* */

  searchByNicPhoneNum(search_data) {
    return this.http
      .post(this.serverLink + 'search_by_NiCPhonenum', search_data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // ********************************************************************* */
  // ********************** check uniqueness on update ***************** */
  // ******************************************************************* */

  checkUniqueOnUpdate(unique_data) {
    return this.http
      .post(this.serverLink + 'check_unique_onUpdate', unique_data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // show toaster
  successToaster(title, body) {
    let toaster_reference = this.toastr.success(title, body, {
      progressBar: true,
      timeOut: 2000
    });
    return toaster_reference
  }
  // show toaster
  warningToaster(title, body) {
    this.toastr.warning(title, body, {
      progressBar: true,
      timeOut: 2000
    });
  }

  errorToaster(title, body) {
    this.toastr.error(title, body, {
      progressBar: true,
      timeOut: 2000
    });
  }

  progressToaster(title, body) {
    let toast = this.toastr.info(title, body, {
      progressBar: false
    });
    let _componentInstance = this.toastr.toasts.find(toast => toast.toastId == 1).toastRef.componentInstance
    return _componentInstance
  }

  // validate image

  validateFile(name: String) {
    const ext = name.substring(name.lastIndexOf('.') + 1);
    if (
      ext.toLowerCase() === 'png' ||
      ext.toLowerCase() === 'jpg' ||
      ext.toLowerCase() === 'jpeg'
    ) {
      return true;
    } else {
      return false;
    }
  }

  public get_date_from_unix(timestamp) {
    const date = new Date(timestamp * 1000).toISOString().slice(0, 10);
    return date;
  }

  public get_current_unix_timestamp() {

    const unix_timestamp = Math.floor(Date.now() / 1000);
    return unix_timestamp;
  }

  public get_today_date(){
      let date = new Date();

      let year = date.getFullYear();
      
      //month is always 1 less than the actual one (basically it returns the index of months)
      //day and month if <10 then these will be like 1,2,3,4 but we need them as 01,02,03,04  

      let month = (date.getMonth()+1).toString();
      let day = date.getDate().toString();

      if(month.length==1){
          month = "0"+month;
      }

      if(day.length==1){
        day = "0"+day;
      }

      return year+'-'+month+'-'+day;

  }

  public get_timestamp_days_ago(days){

    let start_date_raw = new Date();
            
    start_date_raw = new Date(start_date_raw.getTime() - ( days * 24 * 60 * 60 * 1000));

    let start_date = Math.floor(start_date_raw.getTime()/1000);
    
    return start_date;    

  }

  public get_timestamp_months_ago(months){
    let start_date_raw = new Date();

    start_date_raw.setMonth(start_date_raw.getMonth() - months);

    let start_date = Math.floor(start_date_raw.getTime()/1000);
    return start_date;
  }

  public convert_date_to_timestamp(date){
    
    date=date.split("-");
    var newDate=date[1]+","+date[2]+","+date[0];
    return Math.floor((new Date(newDate).getTime()/1000));​ //will alert 1330192800

  }

  public get_current_month(){
      let date = new Date();
      let month_index = (date.getMonth());
      let just_month = this.complete_months[month_index];
      return just_month;
  }

  public get_current_year(){
      let date = new Date();
      return date.getFullYear();
  }

  public get_pretty_date(tdate){
    var date = new Date(tdate*1000);

    let month_index = (date.getMonth());

    let just_month = this.months[month_index];

    let just_date = date.getDate().toString();
    let just_year = date.getFullYear();

    if(just_date.length==1){
      just_date = "0"+just_date;
    }

    return just_date+' '+just_month+', '+just_year;

  }

  public get_pretty_date2(tdate){
    
    var date = new Date(tdate);

    let pretty_day = this.weekdays[date.getDay()]

    let month_index = (date.getMonth());

    let just_month = this.months[month_index];

    let just_date = date.getDate().toString();
    let just_year = date.getFullYear();

    if(just_date.length==1){
      just_date = "0"+just_date;
    }

    return pretty_day+' '+just_date+' '+just_month+', '+just_year;

  }

  public get_total_days_in_month(month){
    let date = new Date();
    date.setMonth(month);

    let days = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    return days;
  }

  public get_next_months(start_date,number_of_months){
    let st = new Date(start_date);
    let arr = [];
    for(let i=0;i<number_of_months;i++){
        let nd = new Date();
        
        //set date 1 so that month calculation is fine, otherwise it will skip feb month if date you are checking is say 30 march, 30|31 of any month
        nd.setDate(1);
        nd.setMonth(st.getMonth()+i);

        let inner_array = {};
        inner_array['month_name'] = this.months[nd.getMonth()]
        inner_array['month_index'] = nd.getMonth();

        arr.push(inner_array)
    }

    return arr;

  }
					
	public PrintPreview(printContent) {

        var toPrint = document.getElementById('printarea');

        var popupWin = window.open('', '_blank', 'width=1100,height=650,location=no,left=200px');

        popupWin.document.open();

        popupWin.document.write('<html><title>::Print Preview::</title><head><style type="text/css">@media print { .pagebreak { clear: both; page-break-after: always; } @page {size: auto; size: A4 landscape;margin: 0;}.no-print, .no-print *{display:none !important;height: 0 !important;}}</style></head><body><div class="no-print" style="text-align:center"><input type="button" style="background-color: #4CAF50;border: none; color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;cursor:pointer" onclick="window.print()" value="PRINT" /></div>')

        popupWin.document.write(printContent);

        popupWin.document.write('</html>');

        popupWin.document.close();

    }
	
	public createChalanNo(roll_num, class_id,feemonth,feeyear) {
		return (roll_num).toString()+feemonth+(feeyear).toString().substr(-2);
	}
	
}
