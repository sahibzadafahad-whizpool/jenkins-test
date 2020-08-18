import { Component, OnInit, ElementRef } from '@angular/core';
import { SectionDataService } from '../sections/manageSection.service';
import { ClassDataService } from '../classes/manageClass.service';
import { SubjectsDataService } from '../subjects/manage-subjects.service';
import { AssignmentsService } from './assignments.service';
import { CommonService } from '../shared/services/common.service';
import { ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss'],
  providers: [
    ClassDataService,
    SectionDataService,
    SubjectsDataService,
    AssignmentsService,
    CommonService
  ]
})
export class AssignmentsComponent implements OnInit {
  // reset image filed after submit
  @ViewChild('imageFile')
  myInputVariable: ElementRef;

  public pageSize = 10;
  public pageNumber = 1;
  /* active session */
  public running_session = localStorage.getItem('running_session');

  // Arrays
  public classdataList: Array<any>;
  public sectionsList: Array<any>;
  public filesToUpload: Array<File> = [];

  public cSubjectsList: Array<any>;
  public assignments_Data: Array<any>;

  public std_assignmentDetails: Array<any>;

  // add assignments variables

  public classid: number;
  public sectionid: number;
  public subjectid: number;
  public title = '';
  public description = '';
  public dueDate = '';
  public tMarks: number;
  public assignment_image;

  // update marks

  selected_class_id: number;
  selected_section_id: number;

  g_subject_id: number;
  g_section_id: number;
  g_class_id: number;
  studentAvailable;
  manageMArksStatus;
  studentAvailabel;
  studentAvailabe;

  selected_subject: any;
  selected_subj_type: any;

  // notifications
  public showHeading = false;
  public disableBtn = true;
  public selectedClass: number;

  public selectedSubject: any;

  public selectedClassName: string;
  public selectedClsSection: string;

  imgValidation = true;
  uploadImage = false;

  public upload;
  // create instance of services to access method from services
  constructor(
    private _commonService: CommonService,
    private _classDataService: ClassDataService,
    private _sectionDataService: SectionDataService,
    private _subjectsDataService: SubjectsDataService,
    private _assignmentsService: AssignmentsService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getClassData(); // get class data
  }

  // *********************************************************************************************************************** */
  /**********************************************************Read Data from DB Methods************************************** */
  // *********************************************************************************************************************** */

  // ********************************************************** **********/
  // *********************** Get all Classes data ************************/
  // ******************************************************************* */

  public getClassData() {
    this._classDataService.getClassesF().subscribe(result => {
        this.classdataList = []
        if(result.status==1){
          this.classdataList = result.data;
        }
    });
  }

  // ********************************************************************** */
  // ************ Get Section Data Against Selected Class ***************** */
  // ********************************************************************* */

  public getSectionByClassID(class_id: number) {
    this.selectedClass = class_id;
    // * disbale btn untill section selcted and empty section array when selected class change
    this.sectionsList = [];
    this.cSubjectsList = [];

    this.disableBtn = true;

    this._sectionDataService.getSectionF(class_id).subscribe(result => {
        this.sectionsList = []
        if(result.status==1){
            this.sectionsList = result.data;
        }
    });
  }

  // ********************************************************************** */
  // **** Get Elective And Core Subject Data by Class ID section ID ******* */
  // ********************************************************************* */

  public getSubjectByClassSecId(class_id, section_id) {
    this.cSubjectsList = [];
    this.disableBtn = true;
    // *** get Core subjects
    const type = 'all';
    this._subjectsDataService
      .getSubjectByClassSecIdF(class_id, section_id, this.running_session)
      .subscribe(result => {
        if (result.status === 1) {
          this.cSubjectsList = result.data;
          this.selectedClassName = result.data[0].class_name;
          this.selectedClsSection = result.data[0].section_name;
        }
        if (result.status === 0) {
          this._commonService.warningToaster(
            'No subject is added against class',
            '!'
          );
        }

        if (result.status === 403) {
          console.log(result.msg);
        }
      });
  }

  // ********************************************************************** */
  // ************************* Get Assignment details ********************** */
  // ********************************************************************* */

  public getAssignments(submitEvent) {
    this.showHeading = true;
    const subject_id_type = submitEvent.value.g_subject_id.split('-');
    const subject_id = subject_id_type[0];
    const subject_type = subject_id_type[1];

    this.selected_subject = subject_id;
    this.selected_subj_type = subject_type;

    this.selected_class_id = submitEvent.value.g_class_id;
    this.selected_section_id = submitEvent.value.g_section_id;

    const assignemnt_data = {
      class_id: submitEvent.value.g_class_id,
      section_id: submitEvent.value.g_section_id,
      subject_id: subject_id,
      running_session: this.running_session
    };

    this._assignmentsService
      .get_assignmentsF(assignemnt_data)
      .subscribe(result => {
        if (result.status === 1) {
          this.assignments_Data = result.data;
        }
        if (result.status === 0) {
          this._commonService.warningToaster(
            'No assignment is added against class',
            '!'
          );
        }

        if (result.status === 403) {
          this._commonService.warningToaster(
            'Server error try again',
            'Error!'
          );
        }
      });
  }

  // ********************************************************************** */
  // ************* Get students for update assignment marks ************** */
  // ********************************************************************* */

  public getStudentAssignDetails(assign_id) {
    const data = {
      class_id: this.selected_class_id,
      section_id: this.selected_section_id,
      subject_id: this.selected_subject,
      subject_type: this.selected_subj_type,
      running_session: this.running_session,
      assign_id: assign_id
    };

    this._assignmentsService
      .get_students_assign_details(data)
      .subscribe(result => {
        if (result.status === 1) {
          this.std_assignmentDetails = result.data;

        } else {
          console.log(result);
        }
      });
  }

  // ********************************************************************** */
  // ************************* Update Assignment Marks Modal ************** */
  // ********************************************************************* */

  public updateAssignmentModal(modal, assign_id, assign_tMarks, index) {
    this.getStudentAssignDetails(assign_id);
    this.openModal(modal);
  }

  // *********************************************************************************************************************** */
  /**********************************************************Add Update  Data  Methods************************************** */
  // *********************************************************************************************************************** */

  // ********************************************************** **********/
  // ***************************** Assignments *************************/
  // ******************************************************************* */

  public onClickAddAssignment(submitEvent) {
    // get assignment image data
    const imagesData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    if (files.length >= 1) {
      this.uploadImage = true;
    }

    for (let i = 0; i < files.length; i++) {
      imagesData.append('uploads[]', files[i], files[i]['name']);
    }

    // assignment data
    const eventHandler = submitEvent.value;

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

    const assign_duedate = new Date(eventHandler.dueDate).getTime() / 1000;

    const add_assignment_data = {
      class_id: eventHandler.classid,
      section_id: eventHandler.sectionid,
      subject_id: eventHandler.subjectid,
      title: eventHandler.title,
      description: eventHandler.description,
      type: 'assignment',
      assign_created_date: unix_today_date,
      assign_due_date: assign_duedate,
      assign_tMarks: eventHandler.tMarks,
      year: this.running_session
    };

    this._assignmentsService
      .add_newAssignmentF(add_assignment_data)
      .subscribe(result => {
        if (result.status === 1) {
          // data store in tbl_images with asignment images
          if (this.uploadImage === true) {
            const id = JSON.stringify(result.inserted_id);
            imagesData.append('source_id', id); // assignment id
            imagesData.append('source_type', 'assignment');

            // this.myInputVariable.nativeElement.value = "";

            // add assignment images

            this._assignmentsService
              .add_assignment_images(imagesData)
              .subscribe(resultresp => {
                this.filesToUpload = [];
              });
          }

          submitEvent.reset();
          this._commonService.successToaster('Added Successfully', 'Success!');
          this.closeModal();

          
        } else {
          this._commonService.errorToaster('Server error try again', 'Error!');
        }
      });
  }

  // ********************************************************** **********/
  // ******************* Add Student Assignments Marks********************/
  // ******************************************************************* */

  addStdAssignMarks(
    assign_id,
    std_id,
    obtained_marks,
    selected_assg_t_marks

  ) {


    if (obtained_marks > selected_assg_t_marks) {

      swal('Failed', 'Obtained marks must be less than Total marks  : ' + selected_assg_t_marks , 'warning');
      return false;
    } else {

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

    const unix_today_date = this._commonService.get_current_unix_timestamp();

    if (obtained_marks === '') {
      this._commonService.warningToaster('Obtained marks required', 'Failed!');
    } else {
      const std_assign_data = {
        student_id: std_id,
        obtained_marks: obtained_marks,
        marked: 1,
        assign_submit_date: unix_today_date,
        comments: '',
        assign_id: assign_id
      };

      this._assignmentsService
        .update_Assignment_marks(std_assign_data)
        .subscribe(result => {
          if (result.status === 1) {
            this._commonService.successToaster(
              'Updated Successfully',
              'Success!'
            );
            // this.closeModal();
          } else {
            this._commonService.errorToaster(
              'Server error try again',
              'Failed!'
            );
          }
        });
    }

    }


  }

  // ************************************************************************************************************* */
  /*********************************************Store Assignment Images in Array******************************** */
  // ************************************************************************************************************* */
  public fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;

    // this.product.photo = fileInput.target.files[0]['name'];

    // //check file is valid
    // if (!this._commonService.validateFile(filedata[0].name)) {

    //     this.imgValidation = false ;
    //     this.uploadImage = false;
    // }else{

    //    this.filesToUpload = filedata;
    //    this.imgValidation = true;
    // }
  }

  // ************************************************************************************************************* */
  /*********************************************General   Methods************************************************ */
  // ************************************************************************************************************* */

  // new modal
  openNgModal(content, size) {
    this.modalService.open(content, { size: size });
  }

  // *** Selected section class id to get subjects */

  public sectionSelectedF(section_id) {
    
    this.getSubjectByClassSecId(this.selectedClass, section_id);
  }

  // *** get sections against class for dropdown
  public classSelected(class_id) {
    this.getSectionByClassID(class_id);
  }

  // get selected subject id
  public funSelectedSub(subject_id) {
    this.selectedSubject = '';
    this.selectedSubject = subject_id;
    this.enableBtn();
  }

  /********************************* pagination Info ****************************/

  public pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

  // enable manage assignment btn when section isnt empty
  public enableBtn() {
    this.disableBtn = false;
  }

  // open modal
  public openModal(modal) {
    this.openNgModal(modal, 'md');
  }

  // close modal
  public closeModal() {
    this.modalService.dismissAll();
  }
}
