import { Component, OnInit } from '@angular/core';
import { TeachersDataService } from '../teachers/teachers.service';
import { ClassDataService } from '../classes/manageClass.service';

import { SectionDataService } from './manageSection.service';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../shared/services/common.service';

// for using jquery
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
  providers: [
    SectionDataService,
    ClassDataService,
    TeachersDataService,
    CommonService
  ]
})
export class SectionsComponent implements OnInit {
  classData: Array<any>;
  teachersData: Array<any>;
  isSectionPresentA: Array<any>;
  sectionData: Array<any> = [];
  sectionOptions: Array<any> = [];
  selectedSection: Array<any> = [];
  singleSectionData: Array<any>;
  tabtitle = 'Add New Section';
  pageSize = 10;
  pageNumber = 1;
  whenClicked = [false, false];
  lastIndex;

  arrayname;
  disableButton = 0;
  sectionCheckAlert;
  successNotification = 0;
  updateButtonDisable = 1;
  sectionAddMsg = '';
  alertType: string;
  isSelectSection: false;

  sec_id;
  tech_id;
  c_id;
  sec_name = '';
  c_name = '';
  tech_name = '';
  updateSuccessNotifi = 0;
  updateRest;
  selectedClassName;
  class_id;
  section_name;
  teacher_id;
  admin_level: any;
  showtable = false;

  section_id;
  // creating object of Service's  to call methods  => 'this is called dependency injection'
  constructor(
    private _commonService: CommonService,
    private _classesDataService: ClassDataService,
    private _teachersDataService: TeachersDataService,
    private _sectionDataService: SectionDataService,
    private modalService: NgbModal
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
  /******************************************Read Data from DB Methods*********************************************/
  // ***************************************************************************************************************/

  // ********************************************************************** */
  // ************ Get Section Data Against Selected Class ***************** */
  // ********************************************************************* */

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
	  //console.log(class_id);
    this.getSectionByClassID(class_id);
    this.onChildSelect(Child);
  }

  public getSectionByClassID(class_id) {
    this.showtable = true;
    this._sectionDataService.getSectionF(class_id).subscribe(result => {
      if(result.status==1){
          this.sectionData = result.data;
          this.sectionOptions = [];
          this.section_id = null;
          this.arrayname = this.sectionData;
    
          if (this.sectionData.length) {
            this.selectedClassName = this.sectionData[0].class_name;
            this.sectionOptions = result.data;
          } else {
            this.selectedClassName = ' ';
          }
      }
    });
  }

  // ********************************************************************** */
  // ************ Get Single Section Data Against Selected Section  ******** */
  // ********************************************************************* */

  public getSingleSectionData(section_id, class_id) {
    let singleSectionList = null;
    this._sectionDataService
      .getSingleSectionF(section_id, class_id)
      .subscribe(result => {
        this.singleSectionData = result;
        singleSectionList = this.singleSectionData[0];
        this.sec_id = singleSectionList.section_id;
        this.sec_name = singleSectionList.section_name;
        this.c_id = singleSectionList.class_id;
        this.c_name = singleSectionList.class_name;
        this.tech_id = singleSectionList.teacher_id;
        this.tech_name = singleSectionList.teacher_name;
      });
  }

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
  // *********************** Get Teachers Data ************************ */
  // ********************************************************************* */

  public getTeachersData() {
    this._teachersDataService.getTeachersF().subscribe(result => {
      this.teachersData = result;
    });
  }

  // ***************************************************************************************************************/
  /**************************************Write , Update , Delate Data  Methods*************************************/
  // ***************************************************************************************************************/

  // **************************************************************** */
  // ******************* Add new section event handler  ******************/
  // ***************************************************************** */

  public onSubmitAddSection(submitEvent) {
    const addSecdata = submitEvent.value;
    const class_id = addSecdata.class_id;

    const newSectionData = {
      class_id: addSecdata.class_id,
      teacher_id: addSecdata.teacher_id,
      section_name: addSecdata.section_name
    };

    this._sectionDataService.addSectionF(newSectionData).subscribe(result => {
      if (result.status === 1) {
        this._commonService.successToaster('Added Successfully', 'Success!');
        // call function to reload sections details from DB
        this.getSectionByClassID(class_id);
        submitEvent.reset();
        this.closeModal();
      } else {
        this._commonService.errorToaster(result.msg, 'Error!');
      }
    });
  }

  // ***************************************************************************** **/
  // ******************* check section already added event handler  ******************/
  // ********************************************************** *******************/

  public checkSectionAdded(class_id, section_name) {
    this.sectionCheckAlert = 0;
    let isSectionPresent = 0;
    section_name = section_name.replace(/\s/g, ''); // replace spaces in name

    this._sectionDataService
      .sectionExistCheckF(class_id, section_name)
      .subscribe(result => {
        this.isSectionPresentA = result;
        isSectionPresent = this.isSectionPresentA[0].section_present;
        if (isSectionPresent) {
          isSectionPresent = 1;
          this.sectionCheckAlert = 1;
          this.disableButton = 0;
        } else {
          isSectionPresent = 0;
          this.sectionCheckAlert = 0;
          this.disableButton = 1;
        }
      });
  }

  // *************************************************************** */
  // ******************* Update Section Data event handler  ******************/
  // *************************************************************** */

  public onSubmitUpdateSection(submitEvent) {
    const Updatedata = submitEvent.value;
    const clas_id = +Updatedata.c_id;
    const section_id = +Updatedata.sec_id;
    const techr_id = Updatedata.tech_id; // convert into int
    const updateSectionData = {
      teacher_id: techr_id
    };
    this._sectionDataService
      .updateSectionF(updateSectionData, clas_id, section_id)
      .subscribe(result => {
        if (result.status === 1) {
          this._commonService.successToaster(
            'Updated Successfully',
            'Success!'
          );
          this.closeModal();
          this.getTeachersData();
          // load data from db after update
          this.getSectionByClassID(clas_id);
        } else {
          this._commonService.errorToaster(result.msg, 'Error!');
        }
      });

    this.updateRest = submitEvent;
  }

  // *************************************************************** */
  // *************** Delete Section event handler  *****************/
  // *************************************************************** */

  public deleteSection(section_id, clas_id) {
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
        this._sectionDataService
          .delSectionF(clas_id, section_id, deleteStatus) // delete section service calling
          .subscribe(data => {
            this.getSectionByClassID(clas_id); // load section data
          });
        // show deleted notification
        this._commonService.successToaster('Deleted Successfully', 'Success!');
      }
    });
  }

  // ************************************************************************************************************* */
  /*********************************************General   Methods************************************************ */
  // ************************************************************************************************************* */

  // get selected class section details
  getSelectedSectionDetails(index) {
    if (index === 'all') {
      this.arrayname = this.sectionData;
    } else {
      this.selectedSection = [];
      this.selectedSection.push(this.sectionData[index]);
      this.arrayname = this.selectedSection;
    }
  }

  // new modal
  openNgModal(content, size) {
    this.modalService.open(content, { size: size });
  }

  public pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

  public classRequired(data) {
    this.disableButton = 1;
  }

  // hide success toaster after 2 secs
  public FadeOutToaster(time) {
    setTimeout(() => {
      this.successNotification = 0;
    }, time);
  }

  // open model
  public openEditSectionModal(modal, section_id, class_id) {
    // call method to get single section data for updating
    this.getSingleSectionData(section_id, class_id);

    this.openNgModal(modal, 'md');
  }

  // close model
  public closeModal() {
    this.modalService.dismissAll();
  }

  // open model
  public openModal(modal) {
    modal.open();
  }

  // active update button for section update

  public activeUpdatebtn() {
    this.updateButtonDisable = 0;
  }

  // hide update success alert after 2 secs
  public FadeOutUpdateToaster() {
    setTimeout(() => {
      this.updateSuccessNotifi = 0;
    }, 2000);
  }
}
