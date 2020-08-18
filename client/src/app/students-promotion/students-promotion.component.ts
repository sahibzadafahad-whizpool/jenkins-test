import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings/settings.service';
import { ClassDataService } from '../classes/manageClass.service';
import { StudentPromotionService } from './student-promotion.service';
import { StudentsInfoService } from '../students/student-information.service';
import { SectionDataService } from '../sections/manageSection.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-students-promotion',
  templateUrl: './students-promotion.component.html',
  styleUrls: ['./students-promotion.component.scss'],
  providers: [
    SettingsService,
    ClassDataService,
    StudentPromotionService,
    StudentsInfoService,
    SectionDataService,
    CommonService
  ]
})
export class StudentsPromotionComponent implements OnInit {
  /* pagination Info */
  pageSize = 10;
  pageNumber = 1;
  showTable = false;
  tabtitle = 'Students Promotions';
  current_session = localStorage.getItem('running_session');
  admin_level = localStorage.getItem('admin_level');

  // promotion variables
  class_id: number;
  next_session: string;
  std_roll_num: any;

  // promotion modal variables
  currentClass = '';
  currentSection = '';
  nextSession = '';
  disableBtn = false;
  promoted_class_id;
  promoted_section_id;
  p_student_id: number;
  promotedB_class_id: number;
  promotedB_section_id: number;

  // arrays
  sessionList: Array<any>;
  classList: Array<any>;
  studentPromotionData: Array<any>;
  stdAllexamResultList: Array<any>;
  sectionsDataList: Array<any>;

  // promote in bulk
  selectedAll: any;
  promote_all_btn = false;
  next_session_class_id;
  next_session_section_id;

  constructor(
    private modalService: NgbModal,
    private _settingsService: SettingsService,
    private _classDataService: ClassDataService,
    private _studentPromotionService: StudentPromotionService,
    private _studentsInfoService: StudentsInfoService,
    private _sectionDataService: SectionDataService,
    private _commonService: CommonService
  ) {}

  ngOnInit() {
    // get admin level
    this.admin_level = localStorage.getItem('admin_level');
    this.get_sessionsData();
    this.get_classesData();
  }

  // *********************************************************************************************************************** */
  /**********************************************************Read Data from DB Methods************************************** */
  // *********************************************************************************************************************** */

  // ********************************************************************* */
  // *********************** Get all sessions data************************ */
  // ******************************************************************* */

  // getting all sessions list
  public get_sessionsData() {
    const data = 'not_active';
    this._settingsService.get_sessionDetailsF(data).subscribe(result => {
      if (result.status === 1) {
        this.sessionList = result.data;
      } else if (result.status === 0) {
        this._commonService.warningToaster(
          'No next session is added',
          'Failed!'
        );
      } else {
        this._commonService.errorToaster('Server error try again.', 'Error!');
        console.log(result.msg);
      }
    });
  }

  // ********************************************************************* */
  // *********************** Get all classes data************************ */
  // ******************************************************************* */

  // getting all claases data

  public get_classesData() {
    this._classDataService.getClassesF().subscribe(result => {
      this.classList = []
      if (result.status === 403 || result.status==0) {
        this._commonService.errorToaster('Server error try again.', 'Error!');
        console.log(result.msg);
      }else{
          this.classList = result.data;
      }
    });
  }

  // ********************************************************************** */
  // ************ Get Section Data Against Selected Class ***************** */
  // ********************************************************************* */

  public getSectionByClassID(class_id) {
    // * disable btn untill section selcted and empty section array when selected class change
    this.sectionsDataList = [];
    this.disableBtn = true;

    this._sectionDataService.getSectionF(class_id).subscribe(result => {
      this.sectionsDataList = [];
      if(result.status==1){
        this.sectionsDataList = result.data
      }
    });
  }

  // ********************************************************************* */
  // ********** Get all students against class  for promotion************** */
  // ******************************************************************* */

  public listStudentsForPromotion(submitedEvent) {
    // active promote all btn
    this.promote_all_btn = true;
    this.showTable = true;
    this.next_session_class_id = submitedEvent.value.promotedB_class_id;
    this.next_session_section_id = submitedEvent.value.promotedB_section_id;

    this.studentPromotionData = [];
    this.nextSession = '';
    const class_id = submitedEvent.value.class_id;
    const next_session = submitedEvent.value.next_session;
    this.nextSession = next_session;
    this._studentPromotionService
      .getStudentsPromotionInfo(class_id, this.current_session, next_session)
      .subscribe(result => {
        if (result.status === 1) {
          this.studentPromotionData = result.data;
          this.currentClass = result.data[0].class_name;
        } else if (result.status === 0) {
          this._commonService.warningToaster(
            'No student data available',
            'Notice!'
          );
        } else {
          this._commonService.errorToaster('Server error try again', 'Error!');
          console.log(result.msg);
        }
      });
  }

  // *********************************************************************************************************************** */
  /**********************************************************Add , Update Delete Methods************************************** */
  // *********************************************************************************************************************** */

  // ********************************************************************* */
  // *********************** Promote Student************************ */
  // ******************************************************************* */

  public onSubmitPromoteStudent(submittedEvent) {
    // get current date
    const d = new Date();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const current_date =
      d.getFullYear() +
      '-' +
      (('' + month).length < 2 ? '0' : '') +
      month +
      '-' +
      (('' + day).length < 2 ? '0' : '') +
      day;

    // ** convert selected time to Unix timestamp

    const unix_today_date = new Date(current_date).getTime() / 1000;
    const user_promote_data = {
      year: submittedEvent.value.nextSession,
      student_id: submittedEvent.value.p_student_id,
      class_id: submittedEvent.value.promoted_class_id,
      section_id: submittedEvent.value.promoted_section_id,
      roll_num: this.std_roll_num,
      enroll_date: unix_today_date
    };
    swal({
      title: 'Are you sure? Youve checked the selected options ?',
      text:
        ' Make sure to select correct class , next session options from the select menu before promoting',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I did!'
    }).then(result => {
      this._studentPromotionService
        .studentPromoteFun(user_promote_data)
        .subscribe(resultresp => {
          if (resultresp.status === 1) {
            this._commonService.successToaster(
              'Added Successfully',
              'Success!'
            );
          } else if (resultresp.status === 3) {
            this._commonService.warningToaster(resultresp.msg, 'Failed!');
          } else {
            this._commonService.errorToaster(
              'Server error try again',
              'Error!'
            );
            console.log(resultresp.msg);
          }
        });
    });
  }

  // ********************************************************************* */
  // *********************** Promote Students In Bulk ************************ */
  // ******************************************************************* */

  promote_all() {
    const d = new Date();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const current_date =
      d.getFullYear() +
      '-' +
      (('' + month).length < 2 ? '0' : '') +
      month +
      '-' +
      (('' + day).length < 2 ? '0' : '') +
      day;

    // ** convert selected time to Unix timestamp

    const unix_today_date = new Date(current_date).getTime() / 1000;
    const user_bulk_promote_data = {
      next_session: this.nextSession,
      enroll_date: unix_today_date,
      next_class_id: this.next_session_class_id,
      next_section_id: this.next_session_section_id,
      student_data_array: this.studentPromotionData
    };

    swal({
      title: 'Are you sure? Youve checked the selected options ?',
      text:
        ' Make sure to select correct class , section , next session options from the select menu before promoting',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Get Data!'
    }).then(result => {
      const array_count = this.studentPromotionData.length;
      this._studentPromotionService
        .studentBulKPromoteFun(user_bulk_promote_data)
        .subscribe(resultresp => {
          console.log(result);
          if (resultresp.status === 1) {
            if (array_count === resultresp.count) {
              // if user click button without selecting present / absent for student

              this._commonService.warningToaster(
                'Kindly select any student',
                'Failed!'
              );
            } else if (array_count === resultresp.enroll_count) {
              this._commonService.errorToaster(
                'Students are already enrolled in selected session',
                'Failed!'
              );
            } else {
              this._commonService.successToaster(
                'Promoted Successfully',
                'Success!'
              );
            }
          } else {
            this._commonService.errorToaster(
              'Server error try again.',
              'Error!'
            );
            console.log(resultresp.msg);
          }
        });
    });
  }

  // *********************************************************************************************************************** */
  /*********************************************General   Methods************************************** */
  // *********************************************************************************************************************** */

  // ****** Select / unSelect bilk attendance Mark  **************************/

  public selectAll() {
    for (let i = 0; i < this.studentPromotionData.length; i++) {
      this.studentPromotionData[i].promotion = this.selectedAll;
    }
  }
  public checkIfAllSelected() {
    this.selectedAll = this.studentPromotionData.every(function(item: any) {
      return item.selected === true;
    });
  }

  /****************************View student result info ********************** */
  public viewStdResult(student_id) {
    this._studentsInfoService
      .get_stdAllexamResultF(student_id, this.current_session)
      .subscribe(result => {
        if (result.status === 1) {
          this.stdAllexamResultList = result.data;
        } else {
          console.log('fetching marks error' + result.msg);
        }
      });
  }

  /********************************** View student promotion modal *************** */

  public openStdPromotionModal(modal, student_id, index, std_roll_num) {
    this.promoted_class_id = '';
    this.promoted_section_id = '';
    this.std_roll_num = std_roll_num;
    this.p_student_id = student_id;
    this.currentSection = this.studentPromotionData[index].section_name;

    const next_session = this.next_session;

    // check whether student  is already promoted , if yes get the student data against next session

    this.openNgModal(modal, 'md');
  }

  // *** get sections against class for dropdown
  public classSelected(class_id) {
    this.getSectionByClassID(class_id);
  }

  /********************************* pagination Info ****************************/

  public pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

  // enable manage attendance btn when section isnt empty
  public enableBtn() {
    this.disableBtn = false;
  }

  closeModal(modal) {
    modal.close();
  }

  // new modal
  public openNgModal(content, size) {
    this.modalService.open(content, { size: size });
  }
}
