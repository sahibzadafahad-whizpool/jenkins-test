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

  public result_totalMarks: number;
  public result_obtainedMarks: number;

  public SingleStudentresult;

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
      this.classdataList = result;
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
    this.selectedClassName = ''; //
    this.disableBtn = true;

    this._sectionDataService.getSectionF(class_id).subscribe(result => {
      this.sectionsList = result;
    });
  }

  // ********************************************************************************************** */
  // ************ Get Student Result Summary against session , exam class , section ***************** */
  // ********************************************************************************************** */
  public onSubmitShowResultSummary(submittedData) {
    this.showtable = false;
    this.printButton = true;
    this.resultSummary = [];
    const data = {

      class_id: submittedData.value.classid,
      section_id: submittedData.value.section,
      session: submittedData.value.session
    };
    this._resultsService.getStudentsResultSummary(data).subscribe(result => {
      if (result.status === 1) {
        this.showtable = true;
        this.resultSummary = result.data;
        // do all this stuff when selected exam type is percent



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
  /*********** Selected Student Result Details ***************************************** */
  /************************************************************************************* */

  public selectedStudentResult(index,modal) {

    this.SingleStudentresult = this.resultSummary[index];

    this.openNgModal(modal , 'lg');

  }

  // ************************************************************************************************************* */
  /*********************************************General   Methods************************************************ */
  // ************************************************************************************************************* */

  selectedStudent(index) {
    console.log(index);
  }

  submitSession(session_name) {
    this.getExamsinfoBySession(session_name);
  }

  // new modal
  openNgModal(content, size: any) {
    this.modalService.open(content, { size: size });
  }

  // *** get sections against class for dropdown
  public classSelected(class_id) {
    this.getSectionByClassID(class_id);
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
}
