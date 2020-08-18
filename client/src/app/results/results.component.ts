import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { CommonService } from '../shared/services/common.service';
import { StudentsInfoService } from '../students/student-information.service';
import { SectionDataService } from '../sections/manageSection.service';
import { ClassDataService } from '../classes/manageClass.service';
import { SubjectsDataService } from '../subjects/manage-subjects.service';
import { AddExamsService } from '../exams/add-exams.service';
import { SettingsService } from '../settings/settings.service';
import { ResultsService } from '../results/results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  providers: [
    StudentsInfoService,
    ClassDataService,
    SectionDataService,
    AddExamsService,
    SubjectsDataService,
    CommonService,
    SettingsService,
    ResultsService
  ]
})
export class ResultsComponent implements OnInit {
  /* active session */
  public running_session = localStorage.getItem('running_session');
  public searchText;
  // Arrays
  public classdataList: Array<any>;
  public sectionsList: Array<any>;

  public examList: Array<any>;
  public cSubjectsList: Array<any>;
  public examsDataList: Array<any>;
  public sessionData: Array<any> = [];

  public resultSummary: Array<any> = [];
  public quiz_results: Array<any> = [];
  public assignment_results: Array<any> = [];

  public result_totalMarks: number;
  public result_obtainedMarks: number;

  public SingleStudentresult;
  public singleStudentQuizResult;
  public singleStudentAssignmentResult;
  fakeArray = new Array(7);

  // notification
  public disableBtn = true;
  public dbRespMsg = '';
  printButton = false;

  // dropdown variables
  public exam: number;
  public classid: number;
  public section: number;
  public subject: number;
  public session;
  public selectedSession;

  public getSelectedExam: string;
  public getSelectedSubject: string;
  public selectedClass: string;
  public selectedClassName = '';
  public selectedClsSection: any;
  public selectedSubject: string;
  public selectedExamId;

  public showtable = false;
  public grading_type;
  showGrading = true;

  public selected_std_obtained_marks;
  public selected_std_total_marks;

  public total_exams_count;
  public total_subjects_count;

  constructor(
    private _classDataService: ClassDataService,
    private _sectionDataService: SectionDataService,
    private _addExamsService: AddExamsService,
    private _subjectsDataService: SubjectsDataService,
    private _settingsService: SettingsService,

    private modalService: NgbModal,
    private _commonService: CommonService,
    private _resultsService: ResultsService
  ) {}

  ngOnInit() {
    this.getClassData(); // get class data

    this.get_sessionDetails();
  }

  // *********************************************************************************************************************** */
  /**********************************************************Read Data from DB Methods************************************** */
  // *********************************************************************************************************************** */

  // ********************************************************** **********/
  // ************************* get Session details ***************************/
  // ******************************************************************* */
  public get_sessionDetails() {
    const data = 'all';
    this._settingsService.get_sessionDetailsF(data).subscribe(result => {
      if (result.status === 1) {
        this.sessionData = result.data;
      } else if (result.status === 0) {
        this._commonService.warningToaster(result.msg, 'Failed!');
      } else {
        this._commonService.errorToaster(result.msg, 'Error!');
      }
    });
  }

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

  // ********************************************************** **********/
  // *********************** Get all exams data ************************/
  // ******************************************************************* */

  public getExamsinfoBySession(session_name) {
    this.examsDataList = [];
    this.disableBtn = true;
    this._addExamsService.getExamInfoFun(session_name).subscribe(result => {
      if (result.status === 1) {
        this.examsDataList = result.data;
      }
      if (result.status === 0) {
        swal('Opps!', 'No exam data is added against selected session');
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
    // this.selectedClassName = ''; //
    this.disableBtn = true;

    this._sectionDataService.getSectionF(class_id).subscribe(result => {
      this.sectionsList = [];
      if(result.status==1){
        this.sectionsList = result.data
      }
    });
  }

  // ********************************************************************************************** */
  // ************ Get Student Result Summary against session , exam class , section ***************** */
  // ********************************************************************************************** */
  public onSubmitShowResultSummary(submittedData , result_type) {
    this.showtable = false;
    this.printButton = true;
    this.resultSummary = [];
    this.selectedSession = submittedData.value.session;
    const section_details = submittedData.value.section.split('-');
    this.selectedClsSection = section_details[1];
    const data = {

      class_id: submittedData.value.classid,
      section_id: section_details[0],
      session: submittedData.value.session,
      result_type : result_type
    };
    this._resultsService.getStudentsResultSummary(data).subscribe(result => {
      if (result.status === 1) {
        this.showtable = true;

        if (result_type === 'exam') {
          this.resultSummary = result.data;

          this.total_exams_count = this.resultSummary[0].exams.length;
          this.total_subjects_count = this.resultSummary[0].exams[0].student_info.length;
          // loop over students
          for ( let i = 0 ; i < this.resultSummary.length ; i++ ) {

            // loop over each exam against students to get total obtaide marks
            for ( let j = 0 ; j < this.resultSummary[i].exams.length ; j++) {

                    // sum total marks of student
                const exam_totalMarks = this.resultSummary[i].exams[j]['student_info']
                .reduce((sum, item) => sum + Number(item.total_marks), 0);

                this.resultSummary[i].exams[j].total_marks = exam_totalMarks;

                // sum obtained marks of student
                const exam_obtainedMarks = this.resultSummary[i].exams[j]['student_info']

                .reduce((sum, item) => sum + Number(item.obtained_marks), 0);
                this.resultSummary[i].exams[j].obtained_marks = exam_obtainedMarks;

                this.resultSummary[i].exams[j].percent = (Number(exam_obtainedMarks) / Number(exam_totalMarks)) * 100;
              }

                 // sum total marks of student
                const result_totalMarks = this.resultSummary[i].exams
                .reduce((sum, item) => sum + Number(item.total_marks), 0);

                this.resultSummary[i].result_total_marks = result_totalMarks;

                const result_obtainedMarks = this.resultSummary[i].exams
                .reduce((sum, item) => sum + Number(item.obtained_marks), 0);

                this.resultSummary[i].result_obtain_marks = result_obtainedMarks;


          }

        } else if (result_type === 'quiz') {

          // if admin has selected quiztab than we show the quiz result summary
          this.quiz_results = result.data;
          for (let i = 0 ; i < this.quiz_results.length ; i++) {

             // sum total marks of student
             const quiz_totalMarks = this.quiz_results[i].quiz_results_info
             .reduce((sum, item) => sum + Number(item.quiz_t_marks), 0);

             const quiz_obtainedMarks = this.quiz_results[i].quiz_results_info
             .reduce((sum, item) => sum + Number(item.obtained_marks), 0);

             this.quiz_results[i].total_marks = quiz_totalMarks;
             this.quiz_results[i].obtained_marks = quiz_obtainedMarks;

          }

        } else {

          // if admin has selected assign than we show the assign result summary
          this.assignment_results = result.data;

          for (let i = 0 ; i < this.assignment_results.length ; i++) {

             // sum total marks of student
             const assign_totalMarks = this.assignment_results[i].assignment_results_info
             .reduce((sum, item) => sum + Number(item.assign_tMarks), 0);

             const assign_obtainedMarks = this.assignment_results[i].assignment_results_info
             .reduce((sum, item) => sum + Number(item.obtained_marks), 0);

             this.assignment_results[i].total_marks = assign_totalMarks;
             this.assignment_results[i].obtained_marks = assign_obtainedMarks;

          }

        }

      } else if (result.status === 2) {
        swal(
          '!',
          'No students added against selected class and section',
          'warning'
        );
        return false;
      } else {
        swal('Error !', 'Some error try again!', 'error');
        return false;
      }
    });
  }


  // *************************************************************************************/
  /*********** Selected Student Exams Result Details ***************************************** */
  /************************************************************************************* */

  public selectedStudentResult(index,modal , obt_marks , t_marks) {

    this.SingleStudentresult = this.resultSummary[index];
    this.selected_std_obtained_marks = obt_marks;
    this.selected_std_total_marks = t_marks;

    this.openNgModal(modal , 'lg');

  }

  // *************************************************************************************/
  /********************* Selected Student Quizs Result Details ***************************/
  /************************************************************************************* */

  public selectedStudentQuizResult(data , modal) {

    this.singleStudentQuizResult = data;
    this.openNgModal(modal , 'lg');

  }


    // *************************************************************************************/
  /********************* Selected Student Assignment Result Details ***************************/
  /************************************************************************************* */

  public selectedStudentAssignResult(data , modal) {

    this.singleStudentAssignmentResult = data;
    this.openNgModal(modal , 'lg');

  }

  // ************************************************************************************************************* */
  /*********************************************General   Methods************************************************ */
  // ************************************************************************************************************* */



  submitSession(session_name) {
    this.getExamsinfoBySession(session_name);
  }

  // new modal
  openNgModal(content, size: any) {
    this.modalService.open(content, { size: size });
  }

  // *** get sections against class for dropdown
  public classSelected(class_d) {
    const class_details = class_d.split('-');

    this.selectedClassName = class_details[1];
    this.getSectionByClassID(class_details[0]);

  }

  // enable manage attendance btn when section isnt empty
  public enableBtn() {
    this.disableBtn = false;
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

  // return grading type against exam id
  public searchGradingType(examid: number) {
    for (let i = 0; i < this.examsDataList.length; i++) {
      if (+this.examsDataList[i].exam_id === +examid) {
        return this.examsDataList[i].grading_method;
      }
    }
  }


  // return an array with given number length
  counter(i: number) {
    return new Array(i);
}

changetab() {
  this.showtable = false;
}
}
