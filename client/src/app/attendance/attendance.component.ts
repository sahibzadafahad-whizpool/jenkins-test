import { Component, OnInit } from '@angular/core';
import { StudentsInfoService } from '../students/student-information.service';
import { DailyAttendanceService } from './daily-attendance.service';
import { SectionDataService } from '../sections/manageSection.service';
import { ClassDataService } from '../classes/manageClass.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
  providers: [
    StudentsInfoService,
    ClassDataService,
    SectionDataService,
    DailyAttendanceService,
    CommonService
  ]
})
export class AttendanceComponent implements OnInit {
  tabtitle = 'Daily Attendance';
  /* active session */
  public running_session = localStorage.getItem('running_session');

  /* pagination Info */
  pageSize = 10;
  pageNumber = 1;

  // Arrays
  classDataList: Array<any>;
  sectionsDataList: Array<any>;
  public studentsDataList: Array<any>;

  /* List student data variables */

  class_id: number;
  class_name: string;
  enroll_id: number;
  std_rollNum: number;
  std_sectionId: string;
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
  year: string;
  std_classId: number;
  attendance_date: string = this._commonService.get_today_date();
  attendance_max_date: string = this._commonService.get_today_date();
  sectionId: number;
  attend_status = 'Undefined';


  selectedClass: string = null;
  selectedSection: string = null;
  selectedDate: string = null;

  attendanceUnixTime: any;

  // leave reason
  c_student_name = '';
  attendance_id: number;
  absent_reason: string;

  // notification

  studentAvailabe = '';
  disableBtn = true;
  markAttendRespMsg: string;
  attendanceNotifiction = 0;
  showTable = false;
  disableSelectSection = true;

  mark_all_btn = false;

  loadData;

  selectedAll: any;
  selected_unix_date: any;

  // create instance of services to access method from services
  constructor(
    private _StudentsInfoService: StudentsInfoService,
    private _classDataService: ClassDataService,
    private _sectionDataService: SectionDataService,
    private _dailyAttendanceService: DailyAttendanceService,
    private modalService: NgbModal,
    private _commonService: CommonService
  ) {}

  // this function auto called when component loads
  ngOnInit() {
    this.getClassData();
  }

  // *********************************************************************************************************************** */
  /**********************************************************Read Data from DB Methods************************************** */
  // *********************************************************************************************************************** */

  // ********************************************************** **********/
  // *********************** Get all Classes data ************************/
  // ******************************************************************* */

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
    this.std_sectionId = null;
    this.disableBtn = true;
    this.sectionsDataList.unshift('Select Section')

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
  // ********* Get all Students details by class , Section ID ************/
  // ******************************************************************* */

  public getStudentsForMarkAttend(class_id, section_id) {
    /* get all students and attendance report against selected class and Section  date*/
    this._dailyAttendanceService
      .getstdForMrkAttendance(
        class_id,
        section_id,

        this.running_session,
        this.attendanceUnixTime
      )
      .subscribe(result => {
        this.studentsDataList = result.data;

        if (this.studentsDataList.length) {
          this.selectedClass = this.studentsDataList[0].class_name;
          this.selectedSection = this.studentsDataList[0].section_name;
          this.studentAvailabe = ' ';
          // active mark all btn
          this.mark_all_btn = true;
          this.showTable = true;
        } else {
          this.studentAvailabe =
            '* No Student Data available for selected class..!  ';
          this.selectedClass = ' ';
          this.selectedSection = ' ';
        }
      });
  }

  // *********************************************************************************************************************** */
  /**********************************************************Add Update  Data  Methods************************************** */
  // *********************************************************************************************************************** */

  // ********************************************************** **********/
  // ********* Mark student attendance  datewise *************************/
  // ******************************************************************* */

  public markAttendance(class_id, section_id, student_id, attendanceStatus) {
    const date = this.selectedDate.split('-'); // get date from selected timestamp
    const dailyAttendance = {
      class_id: class_id,
      section_id: section_id,
      student_id: student_id,
      timestamp: this.attendanceUnixTime,
      dayDate: Number(date[2]),
      month: Number(date[1]),
      attend_year: Number(date[0]),
      year: this.running_session,
      attend_status: attendanceStatus
    };

    this._dailyAttendanceService
      .markAttendanceF(dailyAttendance)
      .subscribe(result => {
        if (result.status === 1) {
          // load student details after mark attendance
          this.getStudentsForMarkAttend(class_id, section_id);
          this.markAttendRespMsg = 'Attendance Updated Successfully';
          this.attendanceNotifiction = 1;
          this.FadeOutToaster();
        }
      });
  }

  // ********************************************************** **********/
  // ********* Mark student attendance  in bulk *************************/
  // ******************************************************************* */

  public MarkAll() {
    const date = this.selectedDate.split('-'); // get date from selected timestamp
    const dailyAttendance = {
      timestamp: this.attendanceUnixTime,
      dayDate: Number(date[2]),
      month: Number(date[1]),
      attend_year: Number(date[0]),
      year: this.running_session,
      bulk_attendance: this.studentsDataList
    };

    const array_count = this.studentsDataList.length;
    this._dailyAttendanceService
      .mark_Bulk_attendance(dailyAttendance)
      .subscribe(result => {
        if (result.status === 1) {
          if (array_count === result.count) {
            // if user click button without selecting present / absent for student
            this._commonService.warningToaster(
              'Kindly select any present / absent status',
              'Failed!'
            );
          } else {
            this._commonService.successToaster(
              'Updated Successfully',
              'Success!'
            );
          }
        } else {
          this._commonService.errorToaster('Server error try again', 'Failed!');
        }
      });
  }

  // ********************************************************** **********/
  // ***************** Add student leave reason *************************/
  // ******************************************************************* */

  public add_std_leaveReason(submitEvent) {
    const update_data = {
      attendance_id: submitEvent.value.attendance_id,
      comment: submitEvent.value.absent_reason
    };
    this._dailyAttendanceService
      .add_absent_reason(update_data)
      .subscribe(result => {
        if (result.status === 1) {
          this._commonService.successToaster(
            'Updated Successfully',
            'Success!'
          );
        } else {
          this._commonService.errorToaster('Server error try again', 'Failed!');
          console.log(result.msg);
        }
      });
  }

  // ************************************************************************************************************* */
  /*********************************************General   Methods************************************************ */
  // ************************************************************************************************************* */

  openNgModal(content, size) {
    this.modalService.open(content, { size: size });
  }

  // ********* Leave reason modal ********** */
  public addLeave_Application(modal, student_name, attendance_id, comment) {
    this.c_student_name = student_name;
    this.attendance_id = attendance_id;
    this.absent_reason = comment;

    this.openNgModal(modal, 'md');
  }

  late_arrival_changed(event,index){
      this.studentsDataList[index].late_arrival = event.target.checked;
  }

  // ****** Select / unSelect bulk attendance Mark  **************************/

  public selectAll() {
    if(this.studentsDataList && this.studentsDataList.length){
    for (let i = 0; i < this.studentsDataList.length; i++) {
      this.studentsDataList[i].attend_status = this.selectedAll;
    }
  }
    

  }
  public checkIfAllSelected() {
    this.selectedAll = this.studentsDataList.every(function(item: any) {
      return item.selected === 'P';
    });
  }

  // *** selected class , section and date for attendance ****/

  public onSubmitMngAtten(submitEvent) {
    const manageAttendData = submitEvent.value;

    this.selectedDate = manageAttendData.attendance_date;

    // ** convert selected time to Unix timestamp
    this.attendanceUnixTime = new Date(this.selectedDate).getTime() / 1000;
    this.selected_unix_date = this.attendanceUnixTime;
    const classId = manageAttendData.std_classId;
    const sectionId = manageAttendData.std_sectionId;


    this.getStudentsForMarkAttend(classId, sectionId);
  }

  // *** get sections against class for dropdown
  public classSelected(class_id) {
    this.disableSelectSection = false;
    this.getSectionByClassID(class_id);

  }

  /********************************* pagination Info ****************************/

  public pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

  // enable manage attendance btn when section isnt empty
  public enableBtn() {
    this.disableBtn = false;
    this.disableSelectSection = true;
  }

  // hide success toaster after 2 secs
  public FadeOutToaster() {
    setTimeout(() => {
      this.attendanceNotifiction = 0;
    }, 1000);
  }

  // open modal
  public openModal(modal) {
    modal.open();
  }

  // close modal
  public closeModal(modal) {
    modal.close();
  }
}
