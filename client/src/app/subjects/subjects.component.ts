import { Component, OnInit } from '@angular/core';
import { TeachersDataService } from '../teachers/teachers.service';
import { ClassDataService } from '../classes/manageClass.service';
import { SectionDataService } from '../sections/manageSection.service';
import swal from 'sweetalert2';
import { SubjectsDataService } from './manage-subjects.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../shared/services/common.service';

// for using jquery
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
  providers: [
    SubjectsDataService,
    TeachersDataService,
    ClassDataService,
    SectionDataService,
    CommonService
  ]
})
export class SubjectsComponent implements OnInit {
  public running_session = localStorage.getItem('running_session');

  // Arrays
  classData: Array<any>;
  teachersData: Array<any>;
  isSubjectPresentA: Array<any>;
  sectionData: Array<any>;
  electiveSubjectsData: Array<any>;
  coreSubjectsData: Array<any>;
  singleSubjectData: Array<any>;

  // variables to store Update Info
  subjectId;
  subjectName;
  classId;
  teacherName;
  teacherId;
  sectionId;
  sectionName;
  className;
  subjectType;

  // variables to store add Info
  subject_id;
  subject_name;
  class_id;
  teacher_name;
  teacher_id;
  section_id;
  section_name;
  class_name;
  subject_type;

  selectedSection_id = 0;
  selectedClass_id = 0;
  // Notifications
  successNotification = 0;
  showNotiRequiredAll = 1;
  subjectCheckAlert;
  updateSuccessNotifi = 0;

  selectedClassName = '* No Class Selected To Show ';
  notAvailable;
  disableBtn = false;

  tabtitle = 'Add Subjects';
  /* pagination Info */
  pageSize = 10;
  pageNumber = 1;

  admin_level: any;

  // creating object of Service's  to call methods  => 'this is called dependency injection'
  constructor(
    private _SubjectsDataService: SubjectsDataService,
    private _classesDataService: ClassDataService,
    private _teachersDataService: TeachersDataService,
    private _sectionDataService: SectionDataService,
    private modalService: NgbModal,
    private _commonService: CommonService
  ) {}

  // ********************* auto run the function on page load *******************//
  ngOnInit() {
    // get admin level
    this.admin_level = localStorage.getItem('admin_level');

    // sidebar settings for select class
    $('.list-group-item').click(function(e) {
      e.preventDefault();
      $('.list-group-item').removeClass('active');
      $(this).addClass('active');
    });

    this.getClassData(); // call function to get class details for dropdown
    this.getTeachersData(); // call function to get teachers details for dropdown
  }

  // ***************************************************************************************************************/
  /******************************************Read Data from DB *********************************************/
  // ***************************************************************************************************************/

  // ********************************************************************** */
  // *********************** Get Class Data ******************************* */
  // ********************************************************************* */

  public getClassData() {
    this._classesDataService.getClassesF().subscribe(result => {
        this.classData = [];
        if(result.status==1){
          this.classData = result.data
        }
    });
  }

  // ********************************************************************** */
  // ************ Get Section Data Against Selected Class ***************** */
  // ********************************************************************* */

  public getSectionByClassID(class_id) {
    // * disbale btn untill section selcted and empty section array when selected class change
    this.sectionData = [];
    delete this.section_id;
    this.disableBtn = true;

    this._sectionDataService.getSectionF(class_id).subscribe(result => {
        if(result.status==1){
          this.sectionData = result.data;
        }
    });
  }

  // ********************************************************************** */
  // *********************** Get Teachers Data ************************ */
  // ********************************************************************* */

  public getTeachersData() {
    this._teachersDataService.getTeachersF().subscribe(result => {
      this.teachersData = result;
    });
  }

  // sidebar color change on click
  onChildSelect(Child) {
    // This would work but if you have the previously selected child stored
    // it would be better to just turn that one white
    for (const myChild of this.classData) {
      myChild.BackgroundColour = 'white';
      myChild.color = 'black';
    }

    Child.BackgroundColour = 'rgba(233, 233, 234, 0.48)';
    Child.color = 'cornflowerblue';
  }

  public onClickSideBar(class_id, Child) {
    this.getSubjectByClassId(class_id);
    this.onChildSelect(Child);
  }

  // ********************************************************************** */
  // ******* Get Elective And Core Subject Data by Class ID **************** */
  // ********************************************************************* */

  public getSubjectByClassId(class_id) {
    // *** get elective subjects
    this._SubjectsDataService
      .getElectiveSubjectF(class_id, this.running_session)
      .subscribe(result => {
        this.electiveSubjectsData = result;
        if (this.electiveSubjectsData.length) {
          // if there is elective subject then store class name in variable to show in view heading

          this.selectedClassName = this.electiveSubjectsData[0].class_name;
          this.notAvailable = '';
        } else {
          this.selectedClassName = ' ';
          this.notAvailable = 'Not Available';
        }
      });

    // *** get Core subjects
    this._SubjectsDataService
      .getCoreSubjectF(class_id, this.running_session)
      .subscribe(result => {
        this.coreSubjectsData = result;
        if (this.coreSubjectsData.length) {
          this.selectedClassName = this.coreSubjectsData[0].class_name + " Subject Details ";
          this.notAvailable = '';
        } else {
          this.selectedClassName = ' ';
          this.notAvailable = 'No Subject added';
        }
      });
  }
  // ********************************************************************** */
  // ******* Get Single subject data against Class and Subject  *********** */
  // ********************************************************************* */

  public getSingleSubjectData(subject_id, section_id, class_id) {
    let singleSubjectList = null;
    this._SubjectsDataService
      .getSingleSubjectF(subject_id, section_id, class_id, this.running_session)
      .subscribe(result => {
        this.singleSubjectData = result;
        singleSubjectList = this.singleSubjectData[0];

        this.subjectId = singleSubjectList.subject_id;
        this.subjectName = singleSubjectList.subject_name;
        this.classId = singleSubjectList.class_id;
        this.teacherName = singleSubjectList.teacher_name;
        this.teacherId = singleSubjectList.teacher_id;
        this.sectionName = singleSubjectList.section_name;
        this.className = singleSubjectList.class_name;
        this.sectionId = singleSubjectList.section_id;
        this.subjectType = singleSubjectList.subject_type;
      });
  }

  // ***************************************************************************************************************/
  /**************************************Write , Update , Delate Data  Methods*************************************/
  // ***************************************************************************************************************/

  // **************************************************************** */
  // ******************* Add new subject event handler  ******************/
  // ***************************************************************** */

  public onSubmitAddSubj(submitEvent) {
    const addSubjdata = submitEvent.value;
    const class_id = addSubjdata.class_id;
    const subject_type = Number(addSubjdata.subject_type);
    const newSubjectData = {
      class_id: Number(addSubjdata.class_id),
      teacher_id: Number(addSubjdata.teacher_id),
      section_id: Number(addSubjdata.section_id),
      subject_name: addSubjdata.subject_name,
      subject_type: subject_type,
      year: this.running_session
    };

    this._SubjectsDataService.addSubjectF(newSubjectData).subscribe(result => {
      this.getSubjectByClassId(class_id);
      this.disableBtn = true;
      if (result.status === 1) {
        this._commonService.successToaster('Added Successfully', 'Success!');
        this.closeModal();
        submitEvent.reset(); // reset form after submission
      } else {
        this._commonService.errorToaster(result.msg, 'Error!');
      }
    });
  }

  // **************************************************************** */
  // ******************* update subject event handler  ******************/
  // ***************************************************************** */

  public onSubmitUpdateSubj(submitEvent) {
    const data = submitEvent.value;
    const class_id = Number(data.classId);
    const section_id = Number(data.sectionId);
    const subject_id = Number(data.subjectId);
    const updateSubjData = {
      subject_name: data.subjectName,
      subject_type: Number(data.subjectType),
      teacher_id: Number(data.teacherId)
    };

    this._SubjectsDataService
      .updateSubjectF(class_id, section_id, subject_id, updateSubjData)
      .subscribe(result => {
        if (result.status === 1) {
          this.getSubjectByClassId(class_id); // load data after update
          this._commonService.successToaster(
            'Updated Successfully',
            'Success!'
          );
          this.closeModal();
        } else {
          this._commonService.errorToaster(result.msg, 'Error!');
        }
      });
  }

  // *************************************************************** */
  // *************** Delete Subject event handler  *****************/
  // *************************************************************** */

  public deleteSubject(class_id, section_id, subject_id) {
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
        const deleteStatus = {
          status: 0
        };
        // if user confirm then call delete API
        this._SubjectsDataService
          .delSubjectF(class_id, section_id, subject_id, deleteStatus) // delete subject service calling
          .subscribe(data => {
            this.getSubjectByClassId(class_id); // load data after delete
          });

        this._commonService.successToaster('Deleted Successfully', 'Success!');
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

  public pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

  // show msg required all field newar submit button
  public mouseOverButton(status) {
    if (status === false) {
      this.showNotiRequiredAll = 0;
    } else {
      this.showNotiRequiredAll = 1;
    }
  }

  public mouseOutButton(status) {
    this.showNotiRequiredAll = 1;
  }

  // *** get sections against class for dropdown
  public classSelected(class_id) {
    this.getSectionByClassID(class_id);
    this.selectedClass_id = class_id;
  }

  // ***  get selected section id
  public sectionSelected(section_id) {
    // enable manage attendance btn when section isnt empty
    this.disableBtn = false;
    this.selectedSection_id = section_id;
  }

  // *** function to get subject name and check whether already added against selected class
  public checkSubject(subject_name) {
    let isSubjectPresent = 0;
    const subjectDetails = {
      subject_name: subject_name,
      class_id: Number(this.selectedClass_id),
      section_id: Number(this.selectedSection_id),
      running_session: this.running_session
    };

    this._SubjectsDataService
      .checkSubjectPresent(subjectDetails)
      .subscribe(result => {
        this.isSubjectPresentA = result;
        isSubjectPresent = this.isSubjectPresentA[0].subject_present;
        if (isSubjectPresent) {
          this.subjectCheckAlert = 1;
          isSubjectPresent = 1;
          this.disableBtn = true;
        } else {
          this.subjectCheckAlert = 0;
          isSubjectPresent = 0;
          this.disableBtn = false;
        }
      });
  }

  // * open model for edit subject details
  public openEditSubjectModal(modal, subject_id, section_id, class_id) {
    // call method to get single section data for updating
    this.getSingleSubjectData(subject_id, section_id, class_id);

    this.openNgModal(modal, 'md');
  }

  // close model
  // close model
  public closeModal() {
    this.modalService.dismissAll();
  }

  // open model
  public openModal(modal) {
    modal.open();
  }

  // hide update success alert after 2 secs
  public FadeOutToaster() {
    setTimeout(() => {
      this.successNotification = 0;
    }, 2000);
  }

  public FadeOutUpdateToaster() {
    setTimeout(() => {
      this.updateSuccessNotifi = 0;
    }, 2000);
  }
}
