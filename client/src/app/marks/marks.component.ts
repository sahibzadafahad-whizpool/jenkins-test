import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../shared/services/common.service';
import { StudentsInfoService } from '../students/student-information.service';
import { SectionDataService } from '../sections/manageSection.service';
import { ClassDataService } from '../classes/manageClass.service';
import { SubjectsDataService } from '../subjects/manage-subjects.service';
import { AddExamsService } from '../exams/add-exams.service';
import { ManageMarksService } from './manage-marks.service';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.scss'],
  providers: [
    StudentsInfoService,
    ClassDataService,
    SectionDataService,
    AddExamsService,
    SubjectsDataService,
    ManageMarksService,
    CommonService
  ]
})
export class MarksComponent implements OnInit {
  // reset image filed after submit
  @ViewChild('imageFile')
  myInputVariable: ElementRef;

  // default

  public tabtitle = 'Manage Marks';
  public pageSize = 10;
  public pageNumber = 1;
  /* active session */
  public running_session = localStorage.getItem('running_session');

  // variables
  public getSelectedExam: string;
  public getSelectedSubject: string;
  public selectedClass: string;
  public selectedClassName = '';
  public selectedClsSection: any;
  public selectedSubject: string;
  public examDate: any;
  public examTMarks: any;
  public obtained_marks: number;
  public selectedExamId: number;
  public selectedexamType = '';
  public subj_total_marks;

  // quiz marks
  public q_obtained_marks: number;
  public quiz_images: Array<any>;
  public q_section_id;
  public q_class_id;
  public q_std_id;

  // Arrays
  public classdataList: Array<any>;
  public sectionsList: Array<any>;

  public examList: Array<any>;
  public cSubjectsList: Array<any>;
  public examsDataList: Array<any>;
  public stdExamMarksList: Array<any>;

  public dataresult: Array<any>;

  public filesToUpload: Array<File> = [];

  // notification
  public disableBtn = true;
  public dbRespMsg = '';
  public updatemarksMsg = '';
  public manageMArksStatus = false;
  public alertType = '';

  public showtable = false;
  public grading_type;
  showGrading = true;

  // dropdown variables
  public exam: number;
  public classid: number;
  public section: number;
  public subject: number;

  public selected_subject_type;

  // error free
  public studentAvailabe;
  public loadData;
  public exam_type;
  public searchText;

  // create instance of services to access method from services
  constructor(
    private _classDataService: ClassDataService,
    private _sectionDataService: SectionDataService,
    private _addExamsService: AddExamsService,
    private _subjectsDataService: SubjectsDataService,
    private _manageMarksService: ManageMarksService,
    private modalService: NgbModal,
    private _commonService: CommonService
  ) {}

  // this function auto called when component loads
  ngOnInit() {
    this.getClassData(); // get class data
    this.getExamsinfo();
  }

  // *********************************************************************************************************************** */
  /**********************************************************Read Data from DB Methods************************************** */
  // *********************************************************************************************************************** */

  // ********************************************************** **********/
  // *********************** Get all Classes data ************************/
  // ******************************************************************* */

  public getClassData() {
    this._classDataService.getClassesF().subscribe(result => {
      this.classdataList = [];
      if(result.status==1){
        this.classdataList = result.data
      }
    });
  }

  // ********************************************************** **********/
  // *********************** Get all exams data ************************/
  // ******************************************************************* */

  public getExamsinfo() {
    this._addExamsService
      .getExamInfoFun(this.running_session)
      .subscribe(result => {
        if (result.status === 1) {
          this.examsDataList = result.data;
        }
        if (result.status === 0) {
          this.dbRespMsg = 'No exam is added';
        }

        if (result.status === 403) {
          this.dbRespMsg = result.msg;
        }
      });
  }

  // ********************************************************************** */
  // ************ Get Section Data Against Selected Class ***************** */
  // ********************************************************************* */

  public getSectionByClassID(class_id) {
    this.selectedClass = class_id;
    // * disbale btn untill section selcted and empty section array when selected class change
    this.sectionsList = [];
    this.cSubjectsList = [];
    this.selectedClsSection = ''; // unset the varibale on selected class  changed
    this.selectedClassName = ''; //
    this.disableBtn = true;

    this._sectionDataService.getSectionF(class_id).subscribe(result => {
      this.sectionsList = [];
      if(result.status==1){
        this.sectionsList = result.data
      }
    });
  }

  // ********************************************************************** */
  // ******* Get Elective And Core Subject Data by Class ID section ID **************** */
  // ********************************************************************* */

  public getSubjectByClassSecId(class_id, section_id, subjects_type) {
    this.cSubjectsList = [];
    this.disableBtn = true;
    // *** get Core subjects

    this._subjectsDataService
      .getSubjectByClassSecIdF(class_id, section_id, this.running_session)
      .subscribe(result => {
        if (result.status === 1) {
          this.cSubjectsList = result.data;
          this.selectedClassName = this.cSubjectsList[0].class_name;
          this.selectedClsSection = this.cSubjectsList[0].section_name;
        }
        if (result.status === 0) {
          this.dbRespMsg = 'No subject is added against class';
        }

        if (result.status === 403) {
          this.dbRespMsg = result.msg;
        }
      });
  }

  // *********************************************************************************** */
  // ***** Get students details against class and section to mark numbers against exams **** */
  // ************************************************************************************ */

  public getStudentMarks(
    class_id,
    section_id,
    exam_id,
    subject_id,
    subject_type
  ) {
    this.stdExamMarksList = [];
    this.getSelectedExam = '';
    this.examDate = '';
    this.examTMarks = '';
    this.showtable = true;
    this.dbRespMsg = '';

    this._manageMarksService
      // call function to get student marks details against selected subject to mark marks or update marks
      .getStdForMngMarks(
        class_id,
        section_id,
        exam_id,
        subject_id,
        this.running_session,
        subject_type
      )
      .subscribe(result => {
        if (result.status === 1) {
          // comp prev added total marks with new t marks
          if (
            result.data[0].total_marks !== null &&
            Number(this.grading_type) === 1
          ) {
            if (result.data[0].total_marks !== this.subj_total_marks) {
              swal(
                'Invalid Total Marks!',
                'Total Marks doesnt match with previously added total marks ' +
                  result.data[0].total_marks,
                'warning'
              );
              this.showtable = false;
              return false;
            } else {
              this.stdExamMarksList = result.data;
              this.getSelectedExam = this.stdExamMarksList[0].exam_name;
              this.examDate = this.stdExamMarksList[0].exam_date;
              this.examTMarks = this.stdExamMarksList[0].exam_tmarks;
            }
          } else {
            this.stdExamMarksList = result.data;
            this.getSelectedExam = this.stdExamMarksList[0].exam_name;
            this.examDate = this.stdExamMarksList[0].exam_date;
            this.examTMarks = this.stdExamMarksList[0].exam_tmarks;
          }
        }
        if (result.status === 0) {
          this.showtable = false;
          this.dbRespMsg = 'No students  added against class';
        }

        if (result.status === 403) {
          this.showtable = false;
          this.dbRespMsg = result.msg;
        }
      });
  }

  // *********************************************************************************************************************** */
  /**********************************************************Add Update  Data  Methods************************************** */
  // *********************************************************************************************************************** */

  // ************************************************************************************************************* */
  /*********************************************Store Assignment Images in Array******************************** */
  // ************************************************************************************************************* */

  public fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    // this.product.photo = fileInput.target.files[0]['name'];
  }

  // ********************************************************** **********/
  // ********* Mark student marks against  subject *************************/
  // ******************************************************************* */

  public addExamMarks(
    class_id,
    section_id,
    std_id,
    obtained_marks_grade,
    grading_type
  ) {
    this.updatemarksMsg = '';

    if (+grading_type === 1) {
      if (obtained_marks_grade === '') {
        swal('oops!', 'Kindly enter the obtained marks.', 'warning');
        return false;
      }

      if (obtained_marks_grade > this.subj_total_marks) {
        swal(
          'Oops...',
          'Obtained marks must be less than total marks ' +
            this.subj_total_marks +
            '.',
          'warning'
        );
        return false;
      }
    }

    if (+grading_type === 2) {
      if (obtained_marks_grade === '') {
        swal('oops!', 'Kindly enter Grade.', 'warning');
        return false;
      }
    }

    // if grading method is percent grading than obtained letter grades else numbers.
    const obtained_marks = obtained_marks_grade;
    const totalMarks = +grading_type === 1 ? Number(this.subj_total_marks) : '';
    // if grading method is Letter grading

    const stdMarksdata = {
      class_id: class_id,
      section_id: section_id,
      student_id: std_id,
      obtained_marks: obtained_marks,
      total_marks: totalMarks,
      subject_id: Number(this.selectedSubject),
      running_session: this.running_session,
      exam_id: Number(this.selectedExamId),
      exam_type: 'exam'
    };

    // call function to add exam marks against selected subject
    this._manageMarksService.addExamMarksF(stdMarksdata).subscribe(result => {
      if (result.status === 1) {
        this._commonService.successToaster('Updated Successfully', 'Success!');
        const subject_type = this.selected_subject_type; // need param to call function
        // call function to load data after update marks
        this.getStudentMarks(
          class_id,
          section_id,
          this.selectedExamId,
          this.selectedSubject,
          subject_type
        );
      } else {
        this._commonService.errorToaster(result.msg, 'Error!');
      }
    });
  }

  // ********************************************************** **********/
  // ********* Update Quiz  marks *************************/
  // ******************************************************************* */

  onClickUpdateQuizMarks(submitEvent) {
    // get quiz images

    const imagesData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    // console.log(files);

    for (let i = 0; i < files.length; i++) {
      imagesData.append('uploads[]', files[i], files[i]['name']);
    }

    // quiz details
    const stdMarksdata = {
      class_id: this.q_class_id,
      section_id: this.q_section_id,
      student_id: this.q_std_id,
      obtained_marks: Number(submitEvent.value.q_obtained_marks),
      total_marks: Number(submitEvent.value.examTMarks),
      subject_id: Number(this.selectedSubject),
      running_session: this.running_session,
      exam_id: Number(this.selectedExamId),
      exam_type: this.selectedexamType
    };

    // call function to add exam marks against selected subject
    this._manageMarksService.addExamMarksF(stdMarksdata).subscribe(result => {
      if (result.status === 1) {
        // data store in tbl_images with quiz images
        const id = JSON.stringify(result.inserted_id);
        imagesData.append('source_id', id); // student quiz id
        imagesData.append('source_type', 'quiz');

        // this.myInputVariable.nativeElement.value = '';

        // calling add quiz images API
        this._manageMarksService
          .add_quiz_images(imagesData)
          .subscribe(resultresp => {
            this.filesToUpload = [];
          });

        this._commonService.successToaster('Updated Successfully', 'Success!');
        const subject_type = this.selected_subject_type; // need param to call function
        // call function to load data after update marks
        this.getStudentMarks(
          this.q_class_id,
          this.q_section_id,
          this.selectedExamId,
          this.selectedSubject,
          subject_type
        );
      } else {
        this._commonService.errorToaster('Server error try again', 'Error!');
      }
    });
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
    const subject_type = 'c';
    this.getSubjectByClassSecId(this.selectedClass, section_id, subject_type);
  }

  // *** get sections against class for dropdown
  public classSelected(class_id) {
    this.getSectionByClassID(class_id);
  }

  // selected subject id

  public funSelectedSub(subject_id) {
    this.selectedSubject = '';

    const subject_id_type = subject_id.split('-');
    this.selectedSubject = subject_id_type[0];
    this.selected_subject_type = subject_id_type[1];
    this.enableBtn();
  }

  // selected exam id
  public submitExamIdF(exam_id) {
    this.showtable = false;
    this.selectedExamId = exam_id;

    this.grading_type = this.searchGradingType(exam_id);

    if (+this.grading_type === 1) {
      this.showGrading = false;
    } else {
      this.showGrading = true;
    }
  }

  public submitExamTypeF(exam_type) {
    this.selectedexamType = exam_type;
    this.examsDataList = [];
    this.getExamsinfo(); // get exam data against selected type
  }

  // **************** on submit manage core subject marks ********************
  public onSubmitMngMarks(submitEvent) {
    const eventData = submitEvent.value;

    const class_id = Number(eventData.classid);
    const section_id = Number(eventData.section);
    const exam_id = Number(eventData.exam);

    const subject_id_type = eventData.subject.split('-');
    const subject_id = subject_id_type[0];
    const subject_type = subject_id_type[1];

    this.getStudentMarks(
      class_id,
      section_id,
      exam_id,
      subject_id,
      subject_type
    );
  }

  // ****************** on submit manage elective subjects ******************

  public onSubmitMngESubjMarks(submitEvent) {
    const eventData = submitEvent.value;

    const class_id = Number(eventData.classid);
    const section_id = Number(eventData.section);
    const exam_id = Number(eventData.exam);
    const subject_id = Number(eventData.subject);
    const subject_type = 'elective';
    this.getStudentMarks(
      class_id,
      section_id,
      exam_id,
      subject_id,
      subject_type
    );
  }

  // ************** upload quiz marks , open modal , upload images  ***********

  public updateQuizModal(modal, class_id, section_id, std_id, index) {
    this.openNgModal(modal, 'md');
    this.q_obtained_marks = this.stdExamMarksList[index].obtained_marks;
    this.q_section_id = section_id;
    this.q_class_id = class_id;
    this.q_std_id = std_id;
  }

  /********************************* pagination Info ****************************/

  public pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

  // enable manage attendance btn when section isnt empty
  public enableBtn() {
    this.disableBtn = false;
  }

  // hide success toaster after 2 secs
  public FadeOutToaster() {
    setTimeout(() => {
      // this.attendanceNotifiction = 0;
    }, 1000);
  }

  public FadeOutUpdateErrorToaster() {
    setTimeout(() => {
      this.manageMArksStatus = false;
    }, 3000);
  }

  // open modal
  public openModal(modal) {
    this.openNgModal(modal, 'md');
  }

  // close modal
  public closeModal(modal) {
    modal.close();
  }

  // return grading type against exam id
  public searchGradingType(examid: number) {
    for (let i = 0; i < this.examsDataList.length; i++) {
      if (+this.examsDataList[i].exam_id === +examid) {
        return this.examsDataList[i].grading_method;
      }
    }
  }
}
