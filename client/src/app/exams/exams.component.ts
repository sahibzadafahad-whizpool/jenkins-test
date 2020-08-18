import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
import { Validators } from '@angular/forms';
import { StudentsInfoService } from '../students/student-information.service';
import { SectionDataService } from '../sections/manageSection.service';
import { ClassDataService } from './../classes/manageClass.service';
import { AddExamsService } from './add-exams.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss'],
  providers: [
    AddExamsService,
    StudentsInfoService,
    SectionDataService,
    ClassDataService,
    CommonService
  ]
})
export class ExamsComponent implements OnInit {
  /* active session */
  public running_session = localStorage.getItem('running_session');
  public searchText;
  showLabel = false;
  disableBtn = true;

  // add exam variables
  exam_name: string;
  exam_comment: string;
  exam_date: string;
  exam_tmarks: number;
  type = '';
  showTotalMarksField = false;
  grading_system: number;

  // update exam variables

  examName: string;
  examId: number;
  examComment: string;
  examDate: string;
  examTMarks: number;
  ugrading_system: number;

  // arrays
  examsDataList: Array<any>;
  singleExamListA: Array<any>;

  // notifications

  successNotifi = 0;
  updateNotifi = 0;
  alertType = '';
  addExamNoti = '';
  updateExamNoti = '';
  dbRespMsg = '';

  showtable = false;

  /* pagination Info */
  pageSize = 10;
  pageNumber = 1;
  admin_level: any;

  profileForm = this.fb.group({
    examNumber: [''],
    grading_system: [''],
    exams: this.fb.array([])
  });

  constructor(
    private _addExamsService: AddExamsService,
    private _StudentsInfoService: StudentsInfoService,
    private _classDataService: ClassDataService,
    private _sectionDataService: SectionDataService,
    private modalService: NgbModal,
    private _commonService: CommonService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    // get admin level
    this.admin_level = localStorage.getItem('admin_level');
    this.getExamsinfo();
  }

  // *********************************************************************************************************************** */
  /**********************************************************Read Data from DB Methods************************************** */
  // *********************************************************************************************************************** */

  // ********************************************************** **********/
  // *********************** Get all exams data ************************/
  // ******************************************************************* */

  public getExamsinfo() {
    this.dbRespMsg = '';

    this._addExamsService
      .getExamInfoFun(this.running_session)
      .subscribe(result => {
        if (result.status === 1) {
          this.examsDataList = result.data;
          this.showtable = true;
        }
        if (result.status === 0) {
          this.showtable = false;
          this.dbRespMsg = 'No exam is added.';
        }

        if (result.status === 403) {
          this.dbRespMsg = result.msg;
        }
      });
  }

  // ********************************************************** **********/
  // *********************** Get single exams data ************************/
  // ******************************************************************* */
  public get_singleExamData(exam_id) {
    let singleExam = null;
    this._addExamsService.get_singleExamDataFun(exam_id).subscribe(result => {
      if (result.status === 1) {
        this.singleExamListA = result.data;

        singleExam = this.singleExamListA[0];

        this.examId = singleExam.exam_id;
        this.examName = singleExam.exam_name;
        // this.examDate = singleExam.exam_date = ''
        //   ? ''
        //   : this._commonService.get_date_from_unix(singleExam.exam_date);
        this.examComment = singleExam.exam_comment;
        this.examTMarks = singleExam.exam_tmarks;
        this.ugrading_system = singleExam.grading_method;
      } else {
        this.alertType = 'danger';
        this.updateNotifi = 1;
        this.updateExamNoti = result.msg;
      }
    });
  }

  // *********************************************************************************************************************** */
  /**********************************************Add , Delete , Update Data  Methods************************************** */
  // *********************************************************************************************************************** */

  // dynamic form generation

  get exams() {
    return this.profileForm.get('exams') as FormArray;
  }

  addtextFields() {
    this.exams.push(this.fb.control(''));
  }

  // add dynamic text fields for adding exams

  SetNumberOfExams(numberOfExams: number) {
    this.showLabel = true;
    this.disableBtn = false;
    // remove text fields on change number of exams
    this.profileForm = this.fb.group({
      examNumber: [numberOfExams],
      grading_system: [''],
      exams: this.fb.array([])
    });

    for (let i = 0; i < numberOfExams; i++) {
      this.addtextFields();
    }
  }

  // ********************************************************** **********/
  // ***************************** Add new exam ************************/
  // ******************************************************************* */

  onSubmitAddExam() {
    const exam_data = {
      exams: this.profileForm.value.exams,
      exam_date: 0,
      exam_comment: '',
      grading_method: this.profileForm.value.grading_system,
      //exam_tmarks: '',
      running_session: this.running_session,
      type: 'exam'
    };

    this._addExamsService.addNewExamFun(exam_data).subscribe(result => {
      if (result.status === 1) {
        this._commonService.successToaster(
          'Exam Added Successfully',
          'Success!'
        );

        this.getExamsinfo();
        this.closeModal();
      } else {
        this._commonService.errorToaster(result.msg, 'Failed!');
      }
    });
  }

  // public onClickAddExam(addExamEvent) {
  //   let examMarks;
  //   if (addExamEvent.value.grading_system === '1') {
  //     examMarks = addExamEvent.value.exam_tmarks;
  //   } else {
  //     examMarks = '';
  //   }

  //   // ** convert selected time to Unix timestamp
  //   const examUnixTime =
  //     new Date(addExamEvent.value.exam_date).getTime() / 1000;
  //   const exam_data = {
  //     exam_name: addExamEvent.value.exam_name,
  //     exam_date: examUnixTime,
  //     exam_comment: addExamEvent.value.exam_comment,
  //     grading_method: addExamEvent.value.grading_system,
  //     exam_tmarks: examMarks,
  //     running_session: this.running_session,
  //     type: 'exam'
  //   };

  //   this._addExamsService.addNewExamFun(exam_data).subscribe(result => {
  //     if (result.status === 1) {
  //       this._commonService.successToaster(
  //         'Exam Added Successfully',
  //         'Success!'
  //       );
  //       addExamEvent.reset();
  //       this.getExamsinfo();
  //       this.closeModal();
  //     } else {
  //       this._commonService.errorToaster(result.msg, 'Failed!');
  //     }
  //   });
  // }

  // ********************************************************************** */
  // ********************************* Delete Exams  *********************** */
  // ********************************************************************* */

  public onClickDelExam(exam_id: number) {
    swal({
      title: 'Are you sure?',
      text: 'You wont be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        // if user confirm then call delete API
        this._addExamsService.deleteExamsFun(exam_id).subscribe(resultresp => {
          if (resultresp.status === 1) {
            this._commonService.successToaster(
              'Deleted Successfully',
              'Success!'
            );
            this.getExamsinfo();
          } else {
            this._commonService.errorToaster(resultresp.msg, 'Error!');
          }
        });
      }
    });
  }

  // ********************************************************************** */
  // **************************** Update Exams Data *********************** */
  // ********************************************************************* */

  public onClickUpdateExam(updateEventData) {
    const update_exam_data = updateEventData.value;

    const exam_id = update_exam_data.examId;
    const exam_UpdateData = {
      exam_name: update_exam_data.examName,
      exam_comment: '',
      exam_date: update_exam_data.examDate,
      exam_tmarks: ''
    };

    this._addExamsService
      .updateExamData(exam_UpdateData, exam_id)
      .subscribe(result => {
        if (result.status === 1) {
          this._commonService.successToaster(
            'Updated Successfully',
            'Success!'
          );
          // load new data after update
          this.get_singleExamData(exam_id);
          this.getExamsinfo();
          this.closeModal();
        } else {
          this._commonService.errorToaster(result.msg, 'Error!');
        }
      });
  }

  // *********************************************************************************************************************** */
  /**********************************************************General Methods********************************************** */
  // *********************************************************************************************************************** */

  // get grading system
  selectedGradingSystemF(gradingSystem) {
    if (gradingSystem === '1') {
      this.showTotalMarksField = true;
    } else {
      this.showTotalMarksField = false;
    }
  }

  // new modal
  openNgModal(content, size) {
    this.modalService.open(content, { size: size });
  }

  // ********* Open exam update modal */
  public openUpdateExamModal(modal, exam_id: number) {
    this.openNgModal(modal, 'md');
    this.get_singleExamData(exam_id);
  }

  // open modal
  public openModal(modal) {
    this.openNgModal(modal, 'md');
  }

  // close modal
  public closeModal() {
    this.modalService.dismissAll();
    this.profileForm.reset();
    this.showLabel = false;
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }
}
