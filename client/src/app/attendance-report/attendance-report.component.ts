import { Component, OnInit } from '@angular/core';
import { StudentsInfoService } from '../students/student-information.service';
import { DailyAttendanceService } from '../attendance/daily-attendance.service';
import { SectionDataService } from '../sections/manageSection.service';
import { ClassDataService } from '../classes/manageClass.service';
import { AttendanceReportService } from './attendance-report.service';
import { CommonService } from '../shared/services/common.service';
import { SettingsService } from '../settings/settings.service';

import { NgbModal,NgbModalRef,NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss'],
  providers: [
    StudentsInfoService,
    ClassDataService,
    SectionDataService,
    DailyAttendanceService,
    AttendanceReportService,
    CommonService,
    SettingsService
  ]
})
export class AttendanceReportComponent implements OnInit {
  /* active session */
  public running_session = localStorage.getItem('running_session');
  showTable = false;
  showMonthly = false;
  public searchText;
  // Arrays
  classDataList: Array<any>;
  sectionsDataList: Array<any>;
  studentsDataList: Array<any>;
  studentAttendance: Array<any>;
  studentsAttendreport: Array<any>;
  years: Array<any> = [];
  months: Array<any>;

  

  /* List student data variables */

  class_id: number;
  class_name: string;
  enroll_id: number;
  std_rollNum: number;
  std_sectionId: string = 'all';
  section_name: string;
  status: number;
  std_address: string;
  std_dob: string;
  std_email: string;
  std_gender: string;
  std_id: number;
  std_name: string;
  std_parentId: number;
  std_password: string;
  std_phonenum: number;
  std_prevSchool: string;
  std_username: string;
  std_classId: number;
  attendance_date: string;
  sectionId: number;
  attend_status = 'Undefined';

  currentMonthsYear = new Date();
  attendance_year;
  attendance_month = this.currentMonthsYear.getMonth() + 1;
  index;
  selectedClass: string = null;
  selectedSection: string = null;
  selectedYear: number = null;
  selectedMonth: any = null;
  startDate:any;
  endDate:any;

  attendanceUnixTime: any;
  daysInMonth: number;
  daysArray: Array<any> = [];
  previous_months: Array<any> = [];
  monthly_report_print_data: Array<any> = [];
  daily_report_print_data: Array<any> = [];
  totalAttendance:string;
  showAllSectionsAttendance:boolean = false;

  monthly_time_period = '';

  student_id = 'all';

  // notofication

  studentAvailabe = '';
  disableBtn = true;
  markAttendRespMsg: string;
  attendanceNotifiction = 0;
  showHeading = false;
  enablePrintButton = false;

  currentMonth;
  attendanceListAllSection: Array<any>;
  showSectionAttendance:boolean = false;
  public school_info: {};

  // create instance of services to access method from services
  constructor(
    private _StudentsInfoService: StudentsInfoService,
    private _classDataService: ClassDataService,
    private _sectionDataService: SectionDataService,
    private _dailyAttendanceService: DailyAttendanceService,
    private _attendanceReportService: AttendanceReportService,
    private _commonService: CommonService,
    private modalService: NgbModal,
    private _settingsService: SettingsService
  ) {}

  // this function auto called when component loads
  ngOnInit() {
    this.getClassData();
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

  public publish_attendance(){
      //we have to publish today's attendance to parents
      let today_date = this._commonService.get_today_date();
      let timestamp = Math.floor(new Date(today_date).getTime()/1000);
      let data = {class_id:this.std_classId,section_id:this.std_sectionId,timestamp:timestamp,running_session:this.running_session};
      this._attendanceReportService.publish_attendance(data).subscribe(result => {
          if(result.hasOwnProperty('status') && result.status==1){
              this._commonService.successToaster(
                'Attendance published successfully',
                'Success!'
              );
          }
          else{
              this._commonService.successToaster(
                'Error publishing attendance, please contact support',
                'Failed!'
              );
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
        
        this.monthly_report_print_data = this.studentsAttendreport;


          this.modalService.open(monthlymodalcontent, ngbModalOptions);
      }
      else{
          
          this.daily_report_print_data = [];//empty it
          this.daily_report_print_data = this.studentsAttendreport;
          this.modalService.open(dailymodalcontent, ngbModalOptions);

      }
  }

  public prepare_student_attendance_daily_print_report(student_id,content){

      let single_attendance_data = {}; 
      for(let i=0;i<this.studentsAttendreport.length;i++){
          if(this.studentsAttendreport[i].student_id==student_id){
              single_attendance_data = this.studentsAttendreport[i];
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
    
  print_daily_single_student_report(){
        var mywindow = window.open('', 'PRINT');//,'height=400,width=600'
        mywindow.document.write('<html><head><title>Print</title>');

        mywindow.document.write('</head><body><div class="container" style="">');
      var mydata = document.getElementById('daily_single_student_report').innerHTML;
        
        mywindow.document.write(mydata);
        mywindow.document.write('</div></body></html>');
        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();
        
        return true;
  }

  public prepare_student_attendance_monthly_print_report(student_id,content){

    let single_attendance_data = {}; 
    for(let i=0;i<this.studentsAttendreport.length;i++){
        if(this.studentsAttendreport[i].student_id==student_id){
            single_attendance_data = this.studentsAttendreport[i];
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

  public getClassData() {

    //for admin we need all classes, but for teacher we just need default classes
    let mode = 'default'

    this._classDataService.getClassesF(mode).subscribe(result => {
      this.classDataList = [];
      if(result.status==1){
        this.classDataList = result.data
      }
    });
  }

  // ********************************************************************** */
  // ************ Get Section Data Against Selected Class ***************** */
  // ********************************************************************* */

  public getSectionByClassID(class_id) {
    // * disbale btn untill section selcted and empty section array when selected class change
    this.sectionsDataList = [];
    this.std_sectionId = 'all';
    this.disableBtn = true;

    let mode = 'default'
    //for admin we need all classes, but for teacher we just need default sections

    this._sectionDataService.getSectionF(class_id,mode).subscribe(result => {
      this.sectionsDataList = [];
      if(result.status==1){
        this.sectionsDataList = result.data
      }
    });
  }

  // ********************************************************** **********/
  // ******************* Get student attendance report  *****************/
  // ******************************************************************* */

  public getStudentsAttendReport(
    class_id,
    section_id,
    student_id,
    attendStartDate,
    attendEndDate,
    selectedMonth
  ) {
    /* get all students against selected class and Section*/

    this._attendanceReportService
      .getStdAttendReport(
        class_id,
        section_id,
        student_id,
        attendStartDate,
        attendEndDate,
        this.running_session
      )
      .subscribe(result => {
        this.studentsAttendreport = result.data; // get monthly student attendance report
        
        if (this.studentsAttendreport.length) {
          this.selectedClass = this.studentsAttendreport[0].class_name;
          this.selectedSection = this.studentsAttendreport[0].section_name;
          this.studentAvailabe = ' ';
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
        } else {
          this.studentAvailabe =
            '* No Student Data available for selected class..!  ';
          this.selectedClass = ' ';
          this.selectedSection = ' ';
          this.showTable = false;
          this.showMonthly = false;
          this.enablePrintButton = false;
        }
      });
  }

  // ************************************************************************************************************* */
  /*********************************************General   Methods************************************************ */
  // ************************************************************************************************************* */

  // *** selected class , section and date for attendance ****/

  public onSubmitCAttenRep(submitEvent) {
    
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

    const classId = manageAttendData.std_classId;
    const sectionId = manageAttendData.std_sectionId;
    const student_id = manageAttendData.student_id;

    // call function to get student attendance details against selected month
    this.getStudentsAttendReport(
      classId,
      sectionId,
      student_id,
      attendStartDate,
      attendEndDate,
      this.selectedMonth
    );
  }

  get_monthly_time_period(previous_months){
      return previous_months[0].month_name+' to '+previous_months[previous_months.length-1].month_name
  }

  // *** get sections against class for dropdown
  public classSelected(class_id) {
    this.getSectionByClassID(class_id);
    this.disableBtn = false;
  }

  // enable manage attendance btn when section isnt empty
  public onSectionChange() {
    this.disableBtn = false;

    this._attendanceReportService
      .getStudentsOfClassSection(
        this.std_classId,
        this.std_sectionId,
        this.running_session
      )
      .subscribe(result => {
          if(result.status){
              this.studentsDataList = result.data;
          }
      });

    

  }

  // hide success toaster after 2 secs
  FadeOutToaster() {
    setTimeout(() => {
      this.attendanceNotifiction = 0;
    }, 1000);
  }

  // get list of YEars for dropdown
  public getMonthYears() {
    const currentYear = 2010;

    // set values for year dropdown
    for (let i = 0; i <= 100; i++) {
      this.years.push(currentYear + i);
    }

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

  public show_daily_attendance_status(day,student_data){

    let attendance = student_data.attendance;

    if(attendance.length){
      for(let i=0;i<attendance.length;i++){

          //let date = new Date(this.selectedYear+'-'+this.selectedMonth+'-'+day);
          //console.log(date);

          if(attendance[i].date==day){
              if(attendance[i].late_arrival == 1){
                  return 'Late';
              }
              else{
              return attendance[i].attend_status;
          }
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

  public show_section_name(section_id){
      if(section_id=="all"){
        return 'All';
      }
      else{
          //we will have to look for sections array
          let sections = this.sectionsDataList;
          for(let i=0;i<sections.length;i++){
              if(sections[i].section_id==section_id){
                  return sections[i].section_name;
              }
          }
      }
  }

}
