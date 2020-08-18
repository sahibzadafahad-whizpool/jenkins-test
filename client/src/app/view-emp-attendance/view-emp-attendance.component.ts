import { Component, OnInit } from '@angular/core';
import { ViewEmpAttendanceService } from './view-emp-attendance.service';
import { NgbModal,NgbModalRef,NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../shared/services/common.service';
import { SettingsService } from '../settings/settings.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './view-emp-attendance.component.html',
  styleUrls: ['./view-emp-attendance.component.scss'],
  providers: [
    ViewEmpAttendanceService,
    CommonService,
    SettingsService
  ]
})
export class ViewEmpAttendanceComponent implements OnInit {
  /* active session */
  public running_session = localStorage.getItem('running_session');

  role_xref_id = ''
  role_xref_name = ''
  employee_id = 'all';
  showTable = false;
  showMonthly = false;
  enablePrintButton = false;
  employeesList: Array<any>;
  employees_data: Array<any>;
  role_xref_data:Array<any>;
  months: Array<any>;
  currentMonth;
  currentMonthsYear = new Date();
  selectedYear: number = null;
  selectedMonth: any = null;
  startDate:any;
  endDate:any;
  daysInMonth: number;
  daysArray: Array<any> = [];
  previous_months: Array<any> = [];
  monthly_report_print_data: Array<any> = [];
  daily_report_print_data: Array<any> = [];
  monthly_time_period = '';
  attendance_year;
  attendance_month = this.currentMonthsYear.getMonth() + 1;
  attendance_data: Array<any> = [];
  public school_info: {};

  // create instance of services to access method from services
  constructor(
    private modalService: NgbModal,
    private _viewEmpAttendanceService: ViewEmpAttendanceService,
    private _commonService: CommonService,
    private _settingsService: SettingsService
  ) {}

  // this function auto called when component loads
  ngOnInit() {
    this.get_role_xref();
    this.get_employees(this.role_xref_id);
    this.getMonthYears();
    this.getSchoolInfo();

  }

  public getSchoolInfo(){
    this._settingsService.get_schoolInfoF().subscribe(result => {
        
        if(result.status){
            this.school_info = result.data[0];
        }
    });
  }

  public prepare_complete_report_print_modal(monthlymodalcontent,dailymodalcontent){
      
    //daily attendance data is too big, we will only print data for monthly attendance

    let ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    };

    if(this.showMonthly){
      
        this.monthly_report_print_data = this.attendance_data;

        this.modalService.open(monthlymodalcontent, ngbModalOptions);
    }
    else{
        
        this.daily_report_print_data = [];//empty it
        this.daily_report_print_data = this.attendance_data;
        this.modalService.open(dailymodalcontent, ngbModalOptions);

    }
}

public prepare_employee_attendance_monthly_print_report(employee_id,content){

  let single_attendance_data = {}; 
  for(let i=0;i<this.attendance_data.length;i++){
      if(this.attendance_data[i].employee_id==employee_id){
          single_attendance_data = this.attendance_data[i];
      }
  }

  this.monthly_report_print_data = [];
  this.monthly_report_print_data[0] = single_attendance_data;

  let ngbModalOptions: NgbModalOptions = {
    size: 'lg',
    backdrop: 'static',
    keyboard: false
  };

  this.modalService.open(content, ngbModalOptions);

}

public print_monthly_complete_report(){
    
  var mywindow = window.open('', 'PRINT');//,'height=400,width=600'
  mywindow.document.write('<html><head><title>Print</title>');

  mywindow.document.write('</head><body><div class="container" style="">');
  var mydata = document.getElementById('monthly_complete_report').innerHTML;
  
  mywindow.document.write(mydata);
  mywindow.document.write('</div></body></html>');
  mywindow.document.close(); // necessary for IE >= 10
  mywindow.focus(); // necessary for IE >= 10*/

  mywindow.print();
  mywindow.close();
  
  return true;
}

public prepare_employee_attendance_daily_print_report(employee_id,content){

  let single_attendance_data = {}; 
  for(let i=0;i<this.attendance_data.length;i++){
      if(this.attendance_data[i].employee_id==employee_id){
          single_attendance_data = this.attendance_data[i];
      }
  }

  this.daily_report_print_data = [];//empty it
  this.daily_report_print_data[0] = single_attendance_data;
  
  let ngbModalOptions: NgbModalOptions = {
    size: 'lg',
    backdrop: 'static',
    keyboard: false
  };

  this.modalService.open(content, ngbModalOptions);

}

print_daily_single_employee_report(){
  var mywindow = window.open('', 'PRINT');//,'height=400,width=600'
  mywindow.document.write('<html><head><title>Print</title>');

  mywindow.document.write('</head><body><div class="container" style="">');
  var mydata = document.getElementById('daily_single_employee_report').innerHTML;
  
  mywindow.document.write(mydata);
  mywindow.document.write('</div></body></html>');
  mywindow.document.close(); // necessary for IE >= 10
  mywindow.focus(); // necessary for IE >= 10*/

  mywindow.print();
  mywindow.close();
  
  return true;
}

  onSubmitCAttenRep(submitEvent){
    const manageAttendData = submitEvent.value;

    //this.selectedYear = manageAttendData.attendance_year;
    this.selectedYear = this.currentMonthsYear.getFullYear();
    this.selectedMonth = manageAttendData.attendance_month;

    // add 0 at start if month is les than 10
    if (this.selectedMonth < 10) {
      this.selectedMonth = '0' + this.selectedMonth;
    }

    // get days in a month
    this.daysInMonth = new Date(
      this.selectedYear,
      this.selectedMonth,
      0
    ).getDate();

    // set days of selected month
    this.daysArray = [];
    for (let i = 1; i <= this.daysInMonth; i++) {
      this.daysArray.push(i);
    }
    
    var date = new Date();
    if(this.selectedMonth == '13')
    {
      date.setDate(date.getDate() - 60 );
      this.startDate = date.getFullYear() + '-' + (date.getMonth() +1 ) + '-' + '01';
      this.endDate = this.selectedYear + '-' + (new Date().getMonth() + 1) + '-' + '01';
      
      this.previous_months = this._commonService.get_next_months(this.startDate,2);
      this.monthly_time_period = this.get_monthly_time_period(this.previous_months);
    }
    else if(this.selectedMonth == '14')
    {
      date.setDate(date.getDate() - 90);
      this.startDate = date.getFullYear() + '-' + (date.getMonth() +1) + '-' + '01';
      this.endDate = this.selectedYear + '-' + (new Date().getMonth() + 1) + '-' + '01';

      this.previous_months = this._commonService.get_next_months(this.startDate,3);
      this.monthly_time_period = this.get_monthly_time_period(this.previous_months);
    }
    else
    {
      this.startDate = this.selectedYear + '-' + this.selectedMonth + '-' + '01';
      this.endDate = this.selectedYear + '-' + this.selectedMonth + '-' + this.daysInMonth; 
    }
  

    // convert to unix timestamp
    const attendStartDate = new Date(this.startDate).getTime() / 1000;
    const attendEndDate = new Date(this.endDate).getTime() / 1000;

    // call function to get student attendance details against selected month
    this.getEmployeesAttendReport(
      this.role_xref_id,
      this.employee_id,
      attendStartDate,
      attendEndDate,
      this.selectedMonth
    );
  }

  public getEmployeesAttendReport(role_xref_id,employee_id,attendStartDate,attendEndDate,selectedMonth) {

    let data = {};
    data['role_xref_id'] = role_xref_id;
    data['employee_id'] = employee_id;
    data['attendStartDate'] = attendStartDate;
    data['attendEndDate'] = attendEndDate;
    data['running_session'] = this.running_session;

    this._viewEmpAttendanceService
      .getEmployeesAttendReport(data)
      .subscribe(result => {
          
          if(result.status){

              this.role_xref_name = this.get_role_xref_name(this.role_xref_id);

              this.attendance_data = result.data;
              this.enablePrintButton = true;
              if(selectedMonth == '13' || selectedMonth == '14')
              {
                this.showTable = false;
                this.showMonthly = true;
              }
              else{
                this.showTable = true;
                this.showMonthly = false;
              }
          }
          else{
              this.attendance_data = [];
              //show error toaster
              this.showTable = false;
              this.showMonthly = false;
              this.enablePrintButton = false;
          }
      });
  }

  public get_role_xref_name(role_xref_id){
    if(role_xref_id=="all" || role_xref_id==""){
      return 'All Employees';
    }
    else{
        //we will have to look for sections array
        let roles = this.role_xref_data;
        for(let i=0;i<roles.length;i++){
            if(roles[i].role_xref_id==role_xref_id){
                return roles[i].role_xref_name;
            }
        }
    }
}

  get_employees(role_xref_id){

    let data = {};
    data['role_xref_id'] = role_xref_id;

    this._viewEmpAttendanceService.get_employees(data).subscribe(result => {
      if(result.status){
          this.employeesList = result.data;
      }
    });
  }

  get_role_xref(){
    this._viewEmpAttendanceService.get_role_xref().subscribe(result => {
      this.role_xref_data = result.data;
    });
  }

  onChangeRoleXref(){
      this.get_employees(this.role_xref_id);
  }

  public getMonthYears() {
    const currentYear = 2010;

    this.currentMonth = new Date().getMonth() + 1;

    this.months = [
      {
        name:'Jan',
        value:'1'
      },
      {
        name:'Feb',
        value:'2',
      },
      {
        name:'Mar',
        value:'3',
      },
      {
        name:'Apr',
        value:'4',
      },
      {
        name:'May',
        value:'5',
      },
      {
        name:'Jun',
        value:'6',
      },
      {
        name:'Jul',
        value:'7',
      },
      {
        name:'Aug',
        value:'8',
      },
      {
        name:'Sep',
        value:'9',
      },
      {
        name:'Oct',
        value:'10',
      },
      {
        name:'Nov',
        value:'11',
      },
      {
        name:'Dec',
        value:'12',
      },
      {
        name:'Last 2 Months',
        value:'13',
      },
      {
        name:'Last 3 Months',
        value:'14',
      }
    ];
  }
  
  get_monthly_time_period(previous_months){
    return previous_months[0].month_name+' to '+previous_months[previous_months.length-1].month_name
  }

  public show_daily_attendance_status(day,employee_data){

    let attendance = employee_data.attendance;

    if(attendance.length){
      for(let i=0;i<attendance.length;i++){

          if(attendance[i].day==day){
              return attendance[i].attend_status;
          }
      }
    }

    return '';

  }

  public get_pretty_date(year,month,day)
  {
      let date = this._commonService.get_pretty_date2(year+'-'+month+'-'+day);
      
      return date;
  }


  total_days_of_attendance(attendance){

    let total_days = 0;

    for(var i=0;i<this.previous_months.length;i++){
        let month = this.previous_months[i].month_index
        total_days = total_days+this._commonService.get_total_days_in_month(month);
    }
    return total_days;

  }

  public show_months_attendance(month,attendance){
    
    let month_index = this.previous_months[month].month_index;

    for(let i=0;i<attendance.length;i++){
        if((month_index+1)==attendance[i].month){
            return attendance[i].total_attendance
        }
    }

    return 0;

  }

}
