import { QuizesService } from './quizes.service';
import { Component, OnInit } from '@angular/core';
import { SectionDataService } from '../sections/manageSection.service';
import { ClassDataService } from '../classes/manageClass.service';
import { SubjectsDataService } from '../subjects/manage-subjects.service';
import { CommonService } from '../shared/services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.scss'],
  providers: [
    ClassDataService,
    SectionDataService,
    SubjectsDataService,
    QuizesService,
    CommonService
  ]
})
export class QuizesComponent implements OnInit {
  public running_session = localStorage.getItem('running_session');
  // Arrays
  public classdataList: Array<any>;
  public sectionsList: Array<any>;
  public filesToUpload: Array<File> = [];
  public cSubjectsList: Array<any>;
  public quiz_Data: Array<any>;
  public std_quizDetails: Array<any>;

  selected_class_id: number;
  selected_section_id: number;

  g_subject_id: number;
  g_section_id: number;
  g_class_id: number;

  selected_subject;
  selected_subj_type;
  selected_quiz_t_marks;
  selected_quiz_id;

  public showHeading = false;
  public disableBtn = true;
  public selectedClass: number;

  public selectedSubject: any;

  public selectedClassName: string;
  public selectedClsSection: string;

  imgValidation = true;
  uploadImage = false;

  // add assignments variables

  public classid: number;
  public sectionid: number;
  public subjectid: number;
  public title = '';
  public description = '';
  public quizDate = '';
  public quiz_t_marks: number;

  showtable = false;

  constructor(
    private _commonService: CommonService,
    private _classDataService: ClassDataService,
    private _sectionDataService: SectionDataService,
    private _subjectsDataService: SubjectsDataService,
    private _quizService: QuizesService,

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
          this.disableBtn = false;
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
  // ************************* Get Quizes details ********************** */
  // ********************************************************************* */

  public getQuizes(subject_id) {
    const data = {
      class_id: this.selected_class_id,
      section_id: this.selected_section_id,
      subject_id: subject_id,
      running_session: this.running_session
    };

    this._quizService.get_quizesData(data).subscribe(result => {
      if (result.status === 1) {
        this.showtable = true;
        this.quiz_Data = result.data;

      }
      if (result.status === 0) {
        this._commonService.warningToaster(
          'No Quiz is added against class',
          '!'
        );
      }

      if (result.status === 403) {
        this._commonService.warningToaster('Server error try again', 'Error!');
      }
    });
  }

  // ********************************************************************** */
  // ************* Get students for update quiz marks ************** */
  // ********************************************************************* */

  public getStudentQuizDetails(quiz_id) {
    this.std_quizDetails = [];
    const data = {
      class_id: this.selected_class_id,
      section_id: this.selected_section_id,
      subject_id: this.selected_subject,
      subject_type: this.selected_subj_type,
      running_session: this.running_session,
      quiz_id: quiz_id
    };

    this._quizService.get_students_quiz_details(data).subscribe(result => {
      if (result.status === 1) {
        this.std_quizDetails = result.data;
        this.selected_quiz_id = this.std_quizDetails[0].quiz_id;
        this.selected_quiz_t_marks = this.std_quizDetails[0].quiz_t_marks;
      } else {
        swal('!', 'No students added against class', 'warning');
        return false;
      }
    });
  }

  // ********************************************************** **********/
  // ***************************** Add Quiz *************************/
  // ******************************************************************* */

  public onClickAddQuiz(submitEvent) {
    
    // get quiz image data
    const imagesData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    if (files.length >= 1) {
      this.uploadImage = true;
    }

    for (let i = 0; i < files.length; i++) {
      imagesData.append('uploads[]', files[i], files[i]['name']);
    }

    // quiz data
    const eventHandler = submitEvent.value;

    const subject_id_type = eventHandler.subjectid.split('-');
    const subj_id = subject_id_type[0];
    const subject_type = subject_id_type[1];



    this.selected_subject = subj_id;
    this.selected_subj_type = subject_type;

    this.selected_class_id = eventHandler.classid;
    this.selected_section_id = eventHandler.sectionid;
    // ** convert selected time to Unix timestamp

    const unix_quiz_date = new Date(eventHandler.quizDate).getTime() / 1000;

    const add_quiz_data = {
      class_id: this.selected_class_id,
      section_id: this.selected_section_id,
      subject_id: subj_id,
      title: eventHandler.title,
      description: eventHandler.description,
      quiz_date: unix_quiz_date,
      quiz_t_marks: eventHandler.quiz_t_marks,
      year: this.running_session
    };

    this._quizService.add_newQuiz(add_quiz_data).subscribe(result => {
      if (result.status === 1) {

        // data store in tbl_images with asignment images
        if (this.uploadImage === true) {
          const id = JSON.stringify(result.inserted_id);
          imagesData.append('source_id', id); // quiz id
          imagesData.append('source_type', 'quiz');

          // this.myInputVariable.nativeElement.value = "";

          // add quiz images

          this._quizService
            .add_quiz_images(imagesData)
            .subscribe(resultresp => {
              this.filesToUpload = [];
          });
        }

        this._commonService.successToaster('Added Successfully', 'Success!');
        submitEvent.reset();
        this.closeModal();
        this.getQuizes(subj_id);

      } else {
        this._commonService.errorToaster('Server error try again', 'Error!');
      }
    });
  }



  // ********************************************************** **********/
  // ***************************** update Quiz *************************/
  // ******************************************************************* */

  public updateStdQuizMarks(obtQuizMarks: number, quiz_id: number, std_id) {

    if (obtQuizMarks > this.selected_quiz_t_marks) {
      swal(
        'Oops...',
        'Obtained marks must be less than total marks ' +
          this.selected_quiz_t_marks +
          '.',
        'warning'
      );
      return false;
    }

    const quiz_dataObj = {

      'student_id': std_id,
      'obtained_marks': obtQuizMarks,
      'quiz_id': quiz_id,
      'marked_date': this._commonService.get_current_unix_timestamp()

    };
    this._quizService.upload_std_quiz_marks(quiz_dataObj).subscribe(result => {

     if (result.status === 1) {

      this._commonService.successToaster('Updated Successfully', 'Success!');

     } else {

      swal('Error' , 'Server Error, Try Again..!', 'error');

     }
    });



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

  public submitgetQuizes(submitEvent) {
    const subject_id_type = submitEvent.value.g_subject_id.split('-');
    const subject_id = subject_id_type[0];
    const subject_type = subject_id_type[1];

    this.selected_class_id = submitEvent.value.g_class_id;
    this.selected_section_id = submitEvent.value.g_section_id;

    this.selected_subject = subject_id;
    this.selected_subj_type = subject_type;
    this.getQuizes(subject_id);
  }

  // ********************************************************************** */
  // ************************* Update Quiz Marks Modal ************** */
  // ********************************************************************* */

  public updateQuizModal(modal, quiz_id) {
    this.getStudentQuizDetails(quiz_id);
    this.openModal(modal);
  }

  // open modal
  public openModal(modal) {
    this.openNgModal(modal, 'md');
  }

  // *** get sections against class for dropdown
  public classSelected(class_id) {
    this.getSectionByClassID(class_id);
  }
  // new modal
  openNgModal(content, size) {
    this.modalService.open(content, { size: size });
  }

  // *** Selected section class id to get subjects */

  public sectionSelectedF(section_id) {
    this.getSubjectByClassSecId(this.selectedClass, section_id);
  }

  // get selected subject id
  public funSelectedSub(subject_id) {
    this.selectedSubject = '';
    this.selectedSubject = subject_id;
    this.enableBtn();
  }

  // enable manage assignment btn when section isnt empty
  public enableBtn() {
    this.disableBtn = false;
  }

  // close modal
  public closeModal() {
    this.modalService.dismissAll();
  }
}
