import { Component, OnInit } from '@angular/core';
import { ClassDataService } from './manageClass.service';

import { SectionDataService } from './../sections/manageSection.service';
import { TeachersDataService } from './../teachers/teachers.service'; // import teachers data service to use teachers data
import { SubjectsDataService } from '../subjects/manage-subjects.service';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
  providers: [
    ClassDataService,
    TeachersDataService,
    SectionDataService,
    SubjectsDataService,
    CommonService
  ]
})
export class ClassesComponent implements OnInit {
  // array
  teachersList: Array<any>;
  classData: Array<any>;
  subClassData: Array<any>;
  singleClassData: Array<any>;
  isClassPresentA: Array<any>;
  sectionData: Array<any>;
  class_details: Array<any>;
  public collapsed_sections: Array<any> = [];
  // default
  tabtitle = 'Add Class';
  pageSize = 100;
  pageNumber = 1;
  running_session;

  // notifications

  successNotification = 0;
  updateSuccessNotifi = 0;
  classCheckAlert = false;
  disableBtn = false;
  subjectCheckAlert;
  classLastInsertedId;

  // add class
  class_name;
  numeric_name;
  d_section_name;

  // update class info
  class_id;
  sub_class_id;
  sub_class_name;
  //class_name;

  teacher_name;
  c_name;
  admin_level: any;

  // add section
  public selected_class: number;
  public section_name: string;
  public teacher_id: number;

  selected_class_name;
  selectedSection_id: number;

  // add subject

  public sub_section_id: number;
  public sub_teacher_id: number;
  public subject_name: string;
  public subject_type;

  public sectionCheckAlert;

  // creating object of Service's  to call methods  => 'this is called dependency injection'
  constructor(
    private _classesDataService: ClassDataService,
    private _teachersDataService: TeachersDataService,
    private _sectionDataService: SectionDataService,
    private _SubjectsDataService: SubjectsDataService,
    private modalService: NgbModal,
    private _commonService: CommonService
  ) {}

  // ********************* auto run the function on page load *******************//
  ngOnInit() {
    // get admin level
    this.admin_level = localStorage.getItem('admin_level');
    // call API to get teachers and class data when user load the app
    this.getTeachersData();
    this.getClassData();
    this.getSubClassData();

    this.running_session = localStorage.getItem('running_session');
  }

  // *********************************************************************************************************************** */
  /**********************************************************Read Data from DB Methods************************************** */
  // *********************************************************************************************************************** */

  // ********************************************************************** */
  // *********************** Get all teachers data ************************ */
  // ********************************************************************* */
  public getTeachersData() {
    this._teachersDataService.getTeachersF().subscribe(result => {
      this.teachersList = result;
    });
  }

  // ********************************************************** **********/
  // *********************** Get all Classes data ************************ */
  // ******************************************************************* */

  public getClassData() {
    this._classesDataService.getClassesF().subscribe(result => {
        this.classData = [];
        if(result.status==1){
          this.classData = result.data
        }
    });
  }

  // ********************************************************** **********/
  // *********************** Get all Sub Classes data ************************ */
  // ******************************************************************* */

  public getSubClassData() {
    this._classesDataService.getSubClasses().subscribe(result => {
      this.subClassData = result;
    });
  }

  // ********************************************************************** */
  // ************ Get Section Data Against Selected Class ***************** */
  // ********************************************************************* */

  public getSectionByClassID(class_id) {
    // * disbale btn untill section selcted and empty section array when selected class change
    this.sectionData = [];

    this.disableBtn = true;

    this._sectionDataService.getSectionF(class_id).subscribe(result => {
      this.sectionData = []
      if(result.status==1){
        this.sectionData = result.data
      }
    });
  }

  // *************************************************************************** */
  // ********************** Get single sub Class data ****************************** */
  // ************************************************************************** */

  public getSingleSubClassData(index) {
    let singleClass = null;

    singleClass = this.subClassData[index];
    this.sub_class_id = singleClass.sub_class_id;
    this.sub_class_name = singleClass.sub_class_name;
  }
  
  // *************************************************************************** */
  // ********************** Get single Class data ****************************** */
  // ************************************************************************** */

  public getSingleClassData(index) {
    let singleClass = null;

    singleClass = this.classData[index];
    this.class_id = singleClass.class_id;
    this.class_name = singleClass.class_name;
    this.numeric_name = singleClass.numeric_name;

    let data = {};
    data['class_id'] = this.class_id

    this._classesDataService.getClassDetails(data).subscribe(result => {
        this.class_details = []
        if(result.status==1){
            this.class_details = result.data
        }
    });

  }

  // *********************************************************************************************************************** */
  /********************************************* Write , Update , Delate Data  Methods************************************** */
  // *********************************************************************************************************************** */

 	
  // **************************************************************** */
  // ******************* Add new class event handler  ******************/
  // ***************************************************************** */
  public onSubmitAddSubClass(submitEvent) {
    const data = submitEvent.value;
    //console.log(data);
    const newClassData = {
      sub_class_name: data.c_name,
    };
    this._classesDataService.addSubClass(newClassData).subscribe(result => {
      if (result.status === 1) {
		this._commonService.successToaster('Added Successfully', 'Success!');
		submitEvent.reset(); // reset form after submission
		this.getSubClassData();
		this.closeModal();
	  } else {
		this._commonService.successToaster(result.msg, 'Failed!');
	  }
    });
  }
  
  // **************************************************************** */
  // ******************* Add new class event handler  ******************/
  // ***************************************************************** */

  public onSubmitAddClass(submitEvent) {
    const data = submitEvent.value;
    //console.log(data);
    const newClassData = {
      class_name: data.c_name,
      numeric_name: data.numericC_name
    };

    this._classesDataService.addClassF(newClassData).subscribe(result => {
      this.classLastInsertedId = result.data; // store id of last inserted class
      this.getClassData(); // load data from db after add

      // add teacher , sections against class, by-default Section A will be assigned to each created new class
      const newSectionData = {
        class_id: this.classLastInsertedId,
        teacher_id: data.teacher_id,
        section_name: 'A'
      };
      this._sectionDataService
        .addSectionF(newSectionData)
        .subscribe(resultResp => {
          if (resultResp.status === 1) {
            this._commonService.successToaster('Added Successfully', 'Success!');
            submitEvent.reset(); // reset form after submission
            this.getTeachersData();
            this.getClassData();
            this.closeModal();
          } else {
            this._commonService.successToaster(resultResp.msg, 'Failed!');
          }
        });
    });
  }

  // ***************************************************************************** **/
  // ******************* check class already added event handler  ******************/
  // ********************************************************** *******************/

  public checkClassAdded(c_name) {
    if(c_name!=''){
    this.classCheckAlert = false;
    let isClassPresent = 0;
    this._classesDataService.classExistCheckF(c_name).subscribe(result => {
      this.isClassPresentA = result;
      isClassPresent = this.isClassPresentA[0].class_present;
      if (isClassPresent) {
        this.classCheckAlert = true;
      } else {
        this.classCheckAlert = false;
      }
    });
  }
  }

  // *************************************************************** */
  // ******************* Update class event handler  ******************/
  // *************************************************************** */

  public onSubmitUpdateSubClass(submitEvent) {
    const data = submitEvent.value;
    const id = data.sub_class_id;
	
    const updateClassData = {
      sub_class_name: data.sub_class_name
	};

    this._classesDataService
      .updateSubClass(updateClassData, id)
      .subscribe(result => {
        if (result.status === 1) {
		  submitEvent.reset();		
          this._commonService.successToaster('Updated Successfully', 'Success!');
          // load data from db after update
         this.getSubClassData();
          this.closeModal();
        } else {
          this._commonService.errorToaster(result.msg, 'Failed!');
        }
      });
  }

  
  // *************************************************************** */
  // ******************* Update class event handler  ******************/
  // *************************************************************** */

  public onSubmitUpdateClass(submitEvent) {
    const data = submitEvent.value;
    const id = data.class_id;
	const class_name = data.class_name;

    const updateClassData = {
      numeric_name: data.numeric_name,
	  class_name: data.class_name
    };

    this._classesDataService
      .updateClassF(updateClassData, id)
      .subscribe(result => {
        if (result.status === 1) {
		  submitEvent.reset();		
          this._commonService.successToaster('Updated Successfully', 'Success!');
          // load data from db after update
          this.getClassData();
          this.closeModal();
        } else {
          this._commonService.errorToaster(result.msg, 'Failed!');
        }
      });
  }
  
  // **************************************************************** */
  // ******************* Delete class event handler  ******************/
  // ********************************************************** *****/
  public deleteSubClassGroup(sub_class_id) {
    const classData = this.classData;

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
        this._classesDataService
          .deleteSubClass(deleteStatus, sub_class_id) // delete class service calling
          .subscribe(result => {
			
			  this._commonService.successToaster('Deleted Successfully', 'Success!');
			  // load data from db after update
			  this.getSubClassData();
			  this.closeModal();
			
		  });
	 
      
      }
    });
  }
  
  // **************************************************************** */
  // ******************* Delete class event handler  ******************/
  // ********************************************************** ******/

  public deleteClass(class_id) {
    const classData = this.classData;

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
        this._classesDataService
          .deleteClassF(deleteStatus, class_id) // delete class service calling
          .subscribe(data => {
            this._sectionDataService
              .delSectionByClassIdF(deleteStatus, class_id) // delete section against deleted class
              .subscribe(resdata => {});
            this.getClassData(); // load data after delete
          });
        // show deleted notification

        this._commonService.successToaster('Deleted Successfully', 'Success!');
        this.closeModal();
      }
    });
  }

  // **************************************************************** */
  // ******************* Add new section event handler  ******************/
  // ***************************************************************** */

  public onSubmitAddSection(submitEvent) {
    const addSecdata = submitEvent.value;
    const class_id = addSecdata.class_id;

    const newSectionData = {
      class_id: this.selected_class,
      teacher_id: addSecdata.teacher_id,
      section_name: addSecdata.section_name
    };

    this._sectionDataService.addSectionF(newSectionData).subscribe(result => {
      if (result.status === 1) {
		submitEvent.reset(); // reset form after submission
        this._commonService.successToaster('Added Successfully', 'Success!');
        this.closeModal();

        submitEvent.reset();
      } else {
        this._commonService.errorToaster(result.msg, 'Failed!');
      }
    });
  }

  // **************************************************************** */
  // ******************* Add new subject event handler  ******************/
  // ***************************************************************** */

  public onSubmitAddSubj(submitEvent) {
    const addSubjdata = submitEvent.value;
    const class_id = addSubjdata.class_id;
    const subject_type = Number(addSubjdata.subject_type);

    const newSubjectData = {
      class_id: this.selected_class,
      teacher_id: Number(addSubjdata.sub_teacher_id),
      section_id: Number(addSubjdata.sub_section_id),
      subject_name: addSubjdata.subject_name,
      subject_type: subject_type,
      year: this.running_session
    };

    this._SubjectsDataService.addSubjectF(newSubjectData).subscribe(result => {
      this.disableBtn = true;
      if (result.status === 1) {
		submitEvent.reset(); // reset form after submission  
        this._commonService.successToaster('Added Successfully', 'Success!');
        this.closeModal();

        addSubjdata.subject_name = '';
      } else {
        this._commonService.errorToaster(result.msg, 'Failed!');
      }
    });
  }

  // ****************************************************************************************************** */
  /*********************************************General   Methods************************************** */
  // ****************************************************************************************************** */

  // new modal
  openNgModal(content, size) {
    this.modalService.open(content, { size: size });
  }

  // hide success toaster after 2 secs
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

  // ***  get selected section id
  public sectionSelected(section_id) {
    // enable manage attendance btn when section isnt empty
    this.disableBtn = false;
    this.selectedSection_id = section_id;
  }

  // open model
  public openEditClassModal(modal, id, index) {
    // call method to get single class data for updating
    this.getSingleClassData(index);
    this.openNgModal(modal, 'md');
  }

  // open model
  public openEditSubClassModal(modal, id, index) {
    // call method to get single class data for updating
    this.getSingleSubClassData(index);
    this.openNgModal(modal, 'md');
  }



// open model
  public openViewClassModal(modal, id, index) {
    // call method to get single class data for updating
    this.getSingleClassData(index);
    this.openNgModal(modal, 'md');
  }

  // open add section modal
  public openAddSectionsModal(modal, class_id, selected_class_name) {
	//$('#addSectionModal form')[0].reset();
    this.selected_class_name = selected_class_name;
    this.openNgModal(modal, 'md');
    this.selected_class = class_id;
  }

  // open add subjects modal

  public openAddSubjectModal(modal, class_id, selected_class_name) {
    this.selected_class_name = selected_class_name;
    this.getSectionByClassID(class_id);
    this.selected_class = class_id;
    this.openNgModal(modal, 'md');
  }

  // *** function to get subject name and check whether already added against selected class
  public checkSubject(subject_name) {
    let isSubjectPresent = 0;
    const subjectDetails = {
      subject_name: subject_name,
      class_id: Number(this.selected_class),
      section_id: Number(this.selectedSection_id),
      running_session: this.running_session
    };

    this._SubjectsDataService
      .checkSubjectPresent(subjectDetails)
      .subscribe(result => {
        isSubjectPresent = result[0].subject_present;
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

  section_collapse_toggle_clicked(event){

      let section_id = parseInt(event.target.attributes.section_id.value)
      if(this.collapsed_sections.indexOf(section_id)>-1){
          this.collapsed_sections.splice(this.collapsed_sections.indexOf(section_id), 1);    
      }
      else{
          this.collapsed_sections.push(section_id)
      }
  }

  // close model
  public closeModal() {
    this.modalService.dismissAll();
  }

  public openModal(modal) {
    modal.open();
  }

  public pageChanged(pN): void {
    this.pageNumber = pN;
  }
}
