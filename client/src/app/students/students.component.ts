import { Component, ElementRef, OnInit } from '@angular/core';
import { StudentsInfoService } from './student-information.service';
import { ParentsDataService } from '../parents/parents.service';
import { DatePipe } from '@angular/common';

import { SectionDataService } from '../sections/manageSection.service';
import { ClassDataService } from '../classes/manageClass.service';
import { NgbModal,NgbModalOptions,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Md5 } from 'ts-md5/dist/md5';
import { ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { ManageFeeInvoiceService } from '../manage-fee-invoice/manage-fee-invoice.service';
import { AddExamsService } from '../exams/add-exams.service';
import { IndexService } from '../index/index.service';

import { CommonService } from '../shared/services/common.service';
import { SettingsService } from './../settings/settings.service';

// for using jquery
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  providers: [
    StudentsInfoService,
    ClassDataService,
    SectionDataService,
    ParentsDataService,
    CommonService,
    AdminService,
    ManageFeeInvoiceService,
    SettingsService,
    AddExamsService,
    IndexService,
    DatePipe
  ]
})
export class StudentsComponent implements OnInit {
  // reset image filed after submit
  @ViewChild('imageFile')
  myInputVariable: ElementRef;

  public modelRef: NgbModalRef;

  public searchText;
  public imageBaseUrl;

  public subClassData: Array<any>;

  printButton = false;
  showAddParentOption = false;

  studentsInfo: Array<any>;
  exam_marks: Array<any>;
  fee_invoice: Array<any>;
  singleStdInfo: Array<any>;
  singleParentInfo: Array<any>;
  offset = 0;
  /* active session */
  running_session = localStorage.getItem('running_session');
  defaultsession = localStorage.getItem('running_session');
  avatarImgSrc;
  imageThumbBaseUrl;
  placeholder = 'assets/images/placeholder.png';
  userName = 'Ali';
  userPost = 'Student';

  /* arrays  */
  classDataList: Array<any>;
  studentsDataList: Array<any>;
  singleStudentList: Array<any>;
  sectionsData: Array<any> = [];
  parentDetails: Array<any>;
  examsDataList: Array<any>;
  studentExamResult: Array<any>;
  studentFeeHistroyList: Array<any> = [];
  allStudensDataList: Array<any> = [];
  public filesToUpload: Array<File> = [];

  /* update student data variables */

  class_id: number;
  class_name: string;
  enroll_id: number;
  std_rollNum: number;
  std_sectionId: number;
  section_name: string;
  status: number;
  student_id: number;
  std_address_1: string;
  std_address_2: string;
  std_dob: string;
  std_religion: string;
  parent_type: string = 'father';
  std_email: string;
  std_gender: string;
  std_id: number;
  std_name: string;
  std_parentId: number;
  std_password: string;
  std_transport: string;
  std_hostel: string;
  std_blood_group: string;
  std_bloodgroup: string;
  std_phonenum: number;
  std_emergency_number: number;
  student_comment: string;
  std_bform_number: number;
  std_prevSchool: string;
  std_username: string;
  year: string;
  primary_parent_type:string
  parent_number: number;
  parent_address: string;
  mother_address: string;
  guardian_address: string;
  relationship: string;
  parent_name: string;
  parent_email: string;
  student_medicalproblem: string;
  student_disablityproblem: string;
  std_leavingReason: string;
  parent_profession: string;
  mother_profession: string;
  guardian_profession: string;
  parent_income: string;
  mother_income: string;
  guardian_income: string;
  parent_education: string;
  mother_education: string;
  guardian_education: string;
  guardian_relation: string;
  add_or_edit_parent_mode: string;

  public sub_class_id;
  public sub_class_name;

  parent_phoneNum;
  u_parent_relationship;

  selectedStd_id: number;
  selected_exam: string;
  student_image: string;

  result_totalMarks = 0;
  result_obtainedMarks = 0;

  /* pagination Info */
  pageSize = 10;
  pageNumber = 1;

  /* notifications */

  selectedClassName: string;
  available;
  studentdetailNoti = 'Select Any Class';
  updateSuccessNotifi = 0;
  updateResponseMsg: string;
  alertType;
  dbRespMsg: string;
  examResultStatus = false;
  resultSummary = false;
  feedetailsPresent = false;
  uploadImage = false;
  imgValidation = true;

  admin_level: any;

  // add student
  // Data Arrays

  sectionsDataList: Array<any>;

  isUserPresentA: Array<any>;

  // add students variables
  stud_enroll_session: string;
  stud_phone_number: number;
  stud_bform_number: number;
  stud_address_1: string;
  stud_address_2: string;
  stud_classId: number;
  stud_dob: string;
  stud_email: string;
  stud_enrollDate: string;
  stud_gender: string;
  stud_leavingReason: string;
  stud_name: string;
  stud_parentId: number;
  stud_password: string;
  stud_prevSchool: string;
  stud_rollNum: string;
  stud_sectionId: number;
  stud_userName: string;
  stud_image;
  stud_parentNumber: number;
  parent_relationship;
  section_id;
  stud_religion:string;
  stud_emergency_number:string;
  default_password = '';
  medical_problemOptionText:string = 'No';
  handiCapOptionText:string = 'No';
  student_parentCNIC:string;
  parentGuardianNameText:string;
  stud_parentCnicNumber:string;
  showAddParentButton:boolean = false;
  showEditParentButton:boolean = false;
  showVerifyButton:boolean = false;

  
  // verify parent
  verify_parent = false;
  verified_parent_name = '';
  verify_parent_msg = '';
  verify_parent_cnic_msg = '';
  alert_color = '';


  //isUserPresentA: Array<any>;
  // variables used in add parent form
  //parent_address = '';
  //parent_email = '';
  //parent_name = '';
  mother_name = '';
  mother_cnic:string;
  guardian_name = '';
  guardian_cnic:string;
  parent_password = '';
  //parent_phoneNum: string;
  //parent_profession = '';
  parent_userName = '';
  //relationship = '';
  parent_cnic: number;
  parent_sec_phoneNum;
  mother_sec_phoneNum;
  guardian_sec_phoneNum;
  father_name;
  mother_phoneNum: string;
  guardian_phoneNum: string;
  fatherMotherGuardianText: string = 'father';
  motherUName = '';
  motherUCnic: any;
  guardianUName = '';
  guardianUCnic: string;
  mother_email:string;
  guardian_email:string;

   // notifications flags
   //addResponseMessage: String = '';
   updateResponseMessage: String = '';
   successNotification = 0;
   //alertType;
   //updateSuccessNotifi = 0;
   checkCnic = false;
   checkUserName = false;
   checkPhone = false;
   checkEmail = false;
   cnic_check = false;
   phone_check = false;
   email_check = false;
   isUserPresent;

  FatherStyle =
  {
    'text-decoration': 'underline'
  }
  MotherStyle = 
  {
    'text-decoration':''
  }
  GuardianStyle = 
  {
    'text-decoration':''
  }

  
  
  optionList = [
    {
      name:'Father',
      value:'father',
    },
    {
      name:'Mother',
      value:'mother',
    },
    {
      name:'Other',
      value:'guardian',
    }

  ]

  /*Parent CNIC Verification JSON List for Testing */
  
  parentDetailsCheck = {}
  





  public teachersArray: Array<any> = [];

  // notifications

  addResponseMessage: string;
  submitNotification = 0;
  disableBtn = false;
  checkRollNumber = false;
  showfilter = false;
  is_subject_group_allow = false;

  // error free

  public exam;

  // Blood Group List

  bloodGroupList = 
  [
    {name:'O-',value:'o-'},
    {name:'O+',value:'o+'},
    {name:'A-',value:'a-'},
    {name:'A+',value:'a+'},
    {name:'B-',value:'b-'},
    {name:'B+',value:'b+'},
    {name:'AB-',value:'ab-'},
    {name:'AB+',value:'ab+'}
  ]

  myDate:any = new Date();

  // create instance of services to access method from services
  constructor(
    private _router: Router,
    private _StudentsInfoService: StudentsInfoService,
    private _classDataService: ClassDataService,
    private _sectionDataService: SectionDataService,
    private _parentDataService: ParentsDataService,
    private _settingsService: SettingsService,
    private modalService: NgbModal,
    private _adminService: AdminService,
    private _parentsService: ParentsDataService,
    private _dashboardService: IndexService,
    // private _authClass: AuthClass,
    private _addExamsService: AddExamsService,
    private _manageFeeInvoiceService: ManageFeeInvoiceService,
    private el: ElementRef,
    private _commonService: CommonService,
    private datePipe: DatePipe
  ) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }

  // this function auto called when component loads
  ngOnInit() {
    this.imageBaseUrl =
      this._StudentsInfoService.imagesBaseServer + 'profile_images/';
    this.imageThumbBaseUrl =
      this._StudentsInfoService.imagesBaseServer + 'profile_images/thumbs/';

    // get admin level
    this.admin_level = localStorage.getItem('admin_level');

    $('.list-group-item').click(function(e) {
      e.preventDefault();
      $('.list-group-item').removeClass('active');
      $(this).addClass('active');
    });

    this.getClassData();
    this.getSubClassData();
    this.get_schoolInfo();

    this.getParentsData();
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
      this.classDataList = [];
      if(result.status==1){
          this.classDataList = result.data
      }
    });
  }

	public getSubClassData() {
		this._classDataService.getSubClasses().subscribe(result => {
		  this.subClassData = result;
		});
	}
	
	public get_schoolInfo() {
		var date = new Date();	
		this._settingsService.get_schoolInfoF().subscribe(result => {
		  if (result.status === 1) {
			let schoolInfo = null;
			schoolInfo = result.data[0];
			this.is_subject_group_allow = schoolInfo.is_subject_group;	
		
		  } else {
			this._commonService.errorToaster(result.msg, 'Error!');
		  }
		});
	}
  
  // ********************************************************** **********/
  // *********************** Get all exams data ************************/
  // ******************************************************************* */

  public getExamsinfo() {
    const type = 'all';
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

  // ********************************************************** **********/
  // *********************** Get all Parents data ************************/
  // ******************************************************************* */

  public getParentsData() {
    this._parentDataService.getParentsF().subscribe(result => {
      this.parentDetails = result;
    });
  }

  // change bg color on click

  onChildSelect(Child) {
    // This would work but if you have the previously selected child stored
    // it would be better to just turn that one white
    for (const myChild of this.classDataList) {
      myChild.BackgroundColour = 'white';
      myChild.color = 'black';
    }

    Child.BackgroundColour = 'rgba(233, 233, 234, 0.48)';
    Child.color = 'cornflowerblue';
  }

  public onClickSideBar(class_id, Child) {
    this.getStudentsByClassID(class_id);
    this.onChildSelect(Child);
  }

  // ********************************************************** **********/
  // ****************** Get all Students details by class ID ************/
  // ******************************************************************* */

  public getStudentsByClassID(class_id) {
    this.studentsDataList = [];
    this.allStudensDataList = [];
    /* get all students against selected class */

    this._StudentsInfoService
      .getStudByClassId(class_id, this.running_session)
      .subscribe(result => {
        
        if (result.status === 1) {
        this.studentsDataList = result.data;
        this.allStudensDataList = result.data;
          this.showfilter = true;
          this.selectedClassName = this.allStudensDataList[0].class_name;
          this.studentdetailNoti = 'Student Details';
          this.available = ' ';
        } else {
          this.studentsDataList = [];
          this.allStudensDataList = [];
          this.selectedClassName = 'No ';
          this.studentdetailNoti = 'Student Details';
          this.available = 'Available';
        }
      });

    /* get all section against selected class */
    this._sectionDataService.getSectionF(class_id).subscribe(result => {
      this.sectionsData = []; // empty the arrayy onselect class change
      if(result.status==1){
        this.sectionsData = result.data;
      }
    });
  }

  // ********************************************************** **********/
  // *************** Get single Student details by student ID ************/
  // ******************************************************************* */

  public getSingleStudentData(student_id, class_id) {
    this.avatarImgSrc = '';
    this.selectedStd_id = student_id;
    this._StudentsInfoService
      .getSingleStdInfo(student_id, this.running_session)
      .subscribe(result => {
        if (result.status) {
          let singleStudentData = null;
          this.singleStudentList = result.data;

          singleStudentData = this.singleStudentList[0];

          this.sub_class_id = singleStudentData.sub_class_id;
          
          this.sub_class_name = this.set_sub_class_name(singleStudentData.sub_class_id);

          this.class_id = singleStudentData.class_id;
          this.student_id = singleStudentData.std_id;
          this.class_name = singleStudentData.class_name;
          this.enroll_id = singleStudentData.enroll_id;
          this.std_rollNum = singleStudentData.roll_num;
          this.std_sectionId = singleStudentData.section_id;
          this.section_name = singleStudentData.section_name;
          this.std_address_1 = singleStudentData.std_address_1;
          this.std_address_2 = singleStudentData.std_address_2;
          this.std_dob = singleStudentData.std_dob;
          this.std_religion = singleStudentData.std_religion;
          this.std_email = singleStudentData.std_email;
          this.std_gender = singleStudentData.std_gender;
          this.std_id = singleStudentData.std_id;
          this.std_name = singleStudentData.std_name;
          this.std_parentId = singleStudentData.std_parentId;
          this.std_phonenum = singleStudentData.std_phonenum;
          this.std_emergency_number = singleStudentData.emergency_number;
          this.std_bform_number = singleStudentData.std_bformnum;
          this.student_comment = singleStudentData.comments;
          this.std_prevSchool = singleStudentData.std_prevSchool;
          this.std_username = singleStudentData.std_username;
          this.year = singleStudentData.year;

          this.std_transport = singleStudentData.std_transport;
          this.std_hostel = singleStudentData.std_hostel;

          this.std_blood_group = singleStudentData.blood_group;

          if(singleStudentData.medical_problem!='' && singleStudentData.medical_problem!=null){
              this.medical_problemOptionText = 'Yes';
              this.student_medicalproblem = singleStudentData.medical_problem;
          }
          else{
              this.medical_problemOptionText = 'No';
              this.student_medicalproblem = '';
          }

          if(singleStudentData.disability_problem!='' && singleStudentData.disability_problem!=null){
              this.handiCapOptionText = 'Yes';
              this.student_disablityproblem = singleStudentData.disability_problem;
          }
          else{
              this.handiCapOptionText = 'No';
              this.student_disablityproblem = '';
          }

          if (singleStudentData.image_path !== '') {
              this.avatarImgSrc = singleStudentData.image_path;
          }
          this.parent_profession = singleStudentData.parent_profession;
          this.std_leavingReason = singleStudentData.leaving_reason;
        } else {
          console.log(result.msg);
        }
      });

      //we need some parent details to show in student profile
      //lets get them

      this._StudentsInfoService
      .getParentInfoFromStudent(student_id)
      .subscribe(result => {
        if (result.status) {
            let data = result.data[0];
            this.set_parent_info_for_student_profile(data);
        }
      });

      

  }

  set_sub_class_name(sub_class_id){

      if(this.subClassData.length){
        for(let i=0;i<this.subClassData.length;i++){
          if(this.subClassData[i].sub_class_id == sub_class_id){
              return this.subClassData[i].sub_class_name
          }
        }
      }
      
      return '';
  }

  set_parent_info_for_student_profile(data){
    
    this.father_name = data.parent_name
    this.primary_parent_type = data.primary_parent_type

    if(data.primary_parent_type=="father"){
        this.parent_name = data.parent_name;
        this.parent_email = data.parent_email;
        this.parent_address = data.parent_address;
        this.parent_number = data.parent_phoneNum;
        this.parent_cnic = data.parent_cnic;
        this.parent_sec_phoneNum = data.parent_sec_phoneNum
        this.parent_education = data.parent_education
        this.parent_income = data.parent_income
    }
    else if(data.primary_parent_type=="mother"){
        this.parent_name = data.mother_name;
        this.parent_email = data.mother_email;
        this.parent_address = data.mother_address;
        this.parent_number = data.mother_phoneNum;
        this.parent_cnic = data.mother_cnic;
        this.parent_sec_phoneNum = data.mother_sec_phoneNum
        this.parent_education = data.mother_education
        this.parent_income = data.mother_income
    }
    else{
        this.parent_name = data.guardian_name;
        this.parent_email = data.guardian_email;
        this.parent_address = data.guardian_address;
        this.parent_number = data.guardian_phoneNum;
        this.parent_cnic = data.gaurdian_cnic;
        this.parent_sec_phoneNum = data.gaurdian_sec_phoneNum
        this.parent_education = data.guardian_education
        this.parent_income = data.guardian_income
    }
    // this.relationship = data.parent_relationship;
  }

  openNgImageModal(content) {
      this.modalService.open(content);
  }

  // ********************************************************** **********/
  // ****************** Get student result against exam id ***************/
  // ******************************************************************* */

  get_stdResult(exam_id) {
    this.printButton = false;
    this.resultSummary = false;
    this.result_obtainedMarks = 0;
    this.result_totalMarks = 0;
    this.dbRespMsg = '';
    this.studentExamResult = [];
    this._StudentsInfoService
      .get_stdResultF(exam_id, this.selectedStd_id, this.running_session)
      .subscribe(result => {
        if (result.status === 1) {
          this.studentExamResult = result.data;
          if (this.studentExamResult.length > 0) {
            this.printButton = true;
          }
          this.resultSummary = true;

          this.selected_exam = this.studentExamResult[0].exam_name;

          // sum total marks of student
          this.result_totalMarks = this.studentExamResult.reduce(
            (sum, item) => sum + item.total_marks,
            0
          );

          // sum obtained marks of student
          this.result_obtainedMarks = this.studentExamResult.reduce(
            (sum, item) => sum + item.obtained_marks,
            0
          );
        } else if (result.status === 0) {
          this.examResultStatus = true;
          this._commonService.warningToaster('No data found', 'Failed!');
        } else {
          this.examResultStatus = true;
          this._commonService.errorToaster('Server error try again', 'Error!');
        }
      });
  }

  // ********************************************************** **********/
  // ****************** Get student fee histroy  ***************/
  // ******************************************************************* */

  public getStudentFeeHistroy(student_id) {
    this.feedetailsPresent = false;
    this.studentFeeHistroyList = [];
    this._manageFeeInvoiceService
      .getStudentFeeHistroy(student_id, this.running_session)
      .subscribe(result => {
        if (result.status === 1) {
          this.studentFeeHistroyList = result.data;
        } else if (result.status === 0) {
          this.feedetailsPresent = true;
        } else {
          this._commonService.errorToaster(result.msg, 'Error!');
        }
      });
  }

  // add student
  // ********************************************************************** */
  // ************ Get Section Data Against Selected Class ***************** */
  // ********************************************************************* */

  public getSectionByClassID(class_id) {
    // * disbale btn untill section selcted and empty section array when selected class change
    this.sectionsDataList = [];
    this.std_sectionId = null;
    this.disableBtn = true;
    this._sectionDataService.getSectionF(class_id).subscribe(result => {
      this.sectionsDataList = result.data;
    });
  }

  // ***************************************************************************** **/
  // ******************* check userName already added event handler  ******************/
  // ********************************************************** *******************/

  public isUserNameAdded(username) {
    
    this.checkUserName = false;
    let isUserPresent = 0;
    const userInfo = {
      user_name: username,
      table_name: 'tbl_students'
    };
    
    if(this.add_or_edit_parent_mode=="edit"){
      userInfo['parent_id'] = this.std_parentId;
    }

    this._adminService.userNameExistCheckF(userInfo).subscribe(result => {
      
      this.isUserPresentA = result;
      isUserPresent = this.isUserPresentA[0].userName_present;
      if (isUserPresent) {
        this.checkUserName = true;
      } else {
        this.checkUserName = false;
      }
    });
  }



  // ***************************************************************************** **/
  // ******************* Filter Student By section  ******************/
  // ********************************************************** *******************/


  public filterStudentBySection(section_name) {
    if (section_name !== 'all') {
      const filterBySection = this.allStudensDataList.filter(
        student => student.section_name === section_name);

      this.studentsDataList = filterBySection;

    } else {
      this.studentsDataList = this.allStudensDataList;
    }

  }

  // *********************************************************************************************************************** */
  /*********************************************Write , Update , Delate Data  Methods************************************** */
  // *********************************************************************************************************************** */

  // ************************************************************************* */
  // ******************* update students event handler function ****************/
  // ********************************************************************** ***/

  public onSubmitupdateStd(updateEvent) {
    // get student image
    const imagesData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    if (files.length >= 1) {
      this.uploadImage = true;
    }

    for (let i = 0; i < files.length; i++) {
      imagesData.append('uploads[]', files[i], files[i]['name']);
    }

    const updateData = updateEvent.value;

    let std_sectionId = updateData.std_sectionId;
    const std_id = updateData.std_id;
    const class_id = Number(updateData.class_id);

    if (std_sectionId === 'undefined') {
      std_sectionId = this.std_sectionId;
    }

    // update info against tbl_students

    const updateStdData = {
      std_id:this.std_id,
      std_address_1: updateData.std_address_1,
      std_address_2: updateData.std_address_2,
      std_dob: updateData.std_dob,
      std_religion: updateData.std_religion,
      std_email: updateData.std_email,
      std_gender: updateData.std_gender,
      std_name: updateData.std_name,
      
      std_phonenum: updateData.std_phonenum,
      emergency_number: updateData.std_emergency_number,
      std_bformnum: updateData.std_bform_number,
      std_prevSchool: updateData.std_prevSchool,
      std_leavingReason: updateData.std_leavingReason,
      std_transport: updateData.std_transport,
      std_hostel: updateData.std_hostel,
      blood_group: updateData.std_blood_group,
      comments:updateData.student_comment,
    };
    
    if(updateData.medical_problem=="Yes"){
        updateStdData['medical_problem'] = updateData.student_medicalproblem;
    }
    else{
        updateStdData['medical_problem'] = '';
    }

    if(updateData.medical_handicap=="Yes"){
        updateStdData['disability_problem'] = updateData.student_disablityproblem;
    }
    else{
        updateStdData['disability_problem'] = '';
    }

    // update info against tbl_enroll

    // let updateEnrollInfo = {
    //   std_sectionId: Number(std_sectionId),
    //   enroll_id: updateData.enroll_id
    // };

    this._StudentsInfoService
      .updateStdInfo(std_id, updateStdData)
      .subscribe(result => {
        if (result.status) {
          const id = JSON.stringify(updateData.std_id);
          imagesData.append('id', id); // std id
          imagesData.append('tbl_name', 'tbl_students'); //
          imagesData.append('source', 'student');

          // this.myInputVariable.nativeElement.value = "";

          // add student images
          if (this.uploadImage === true) {
            this._commonService.add_images(imagesData).subscribe(respresult => {
              this.filesToUpload = [];
              this.getStudentsByClassID(class_id);
            });
          }

          this._commonService.successToaster(
            'Updated Successfully',
            'Success!'
          );

          this.getStudentsByClassID(class_id);
          this.closeModal();
          // update info in enroll tbl  is section update on then uncomment
          // this._StudentsInfoService
          //   .updateStdEnrollInfo(std_id, updateEnrollInfo)
          //   .subscribe(result => {
          //     if (result.status == 1) {
          //       swal({
          //         type: "success",
          //         title: "Updated successfully",
          //         showConfirmButton: false,
          //         timer: 2000
          //       });
          //       // call function to reload students data
          //       this.getStudentsByClassID(class_id);
          //     } else {
          //       swal("Failed!", result.msg, "error");
          //     }
          //   });
        } else {
          this._commonService.errorToaster(result.msg, 'Error!');
        }
      });
  }

  // ************************************************************************************************************* */
  /********************************************* Validate and Store Images in Array******************************** */
  // ************************************************************************************************************* */

  public fileChangeEvent(fileInput: any) {
    const filedata = <Array<File>>fileInput.target.files;

    const reader = new FileReader();
    reader.readAsDataURL(filedata[0]);

    reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
            const width = img.naturalWidth;
            if (!this._commonService.validateFile(filedata[0].name)) {
              this.imgValidation = false;
              this.uploadImage = false;
              this._commonService.errorToaster(
                'Invalid file type',
                ''
              );
            } else {
              //check image is <= 1000px
              if(width<=1000){
                  this.filesToUpload = filedata;
                  this.imgValidation = true;
              }
              else{
                  this.imgValidation = false;
                  this.uploadImage = false;
                  this._commonService.errorToaster(
                    'Please select image less than 1000px',
                    ''
                  );
              }
              
            }
        };

    };

    
  }

  // ********************************************************************************* */
  // ******************* OnClick delete student event handler function *****************/
  // ***********************************************************************************/

  public onClickdeleteStudent(std_id, class_id) {
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
        this._StudentsInfoService.deleteStudent(std_id).subscribe(data => {
          if (data.status) {
            this.getStudentsByClassID(class_id); // load students data after deleting data

            // show deleted notification
            this._commonService.successToaster(
              'Deleted Successfully',
              'Success!'
            );
          } else {
            this._commonService.errorToaster(data.msg, 'Error!');
          }
        });
      }
    });
  }

  // add student
  // **************************************************************** */
  // ******************* Add new students event handler  ******************/
  // ***************************************************************** */

  public onSubmitAddStd(submitEvent) {
    // get student image
    const imagesData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    if (files.length >= 1) {
      this.uploadImage = true;
    }

    for (let i = 0; i < files.length; i++) {
      imagesData.append('uploads[]', files[i], files[i]['name']);
    }

    const submitedAddStd = submitEvent.value;

    const newStudData = {
      std_name: submitedAddStd.stud_name,
      std_dob: submitedAddStd.stud_dob,
      std_gender: submitedAddStd.stud_gender,
      std_religion: submitedAddStd.stud_religion,
      std_parentId: this.std_parentId,
      std_phonenum: submitedAddStd.stud_phone_number,
      bform_number: submitedAddStd.stud_bform_number,
      emergency_number: submitedAddStd.stud_emergency_number,
      std_email: submitedAddStd.stud_email,
      std_address_1: submitedAddStd.stud_address_1,
      std_address_2: submitedAddStd.stud_address_2,
      previous_school: submitedAddStd.stud_prevSchool,
      previous_school_leaving_reason: submitedAddStd.stud_leavingReason,
      std_transport: submitedAddStd.std_transport,
      std_hostel: submitedAddStd.std_hostel,
      blood_group: submitedAddStd.std_bloodgroup,
      comments: submitedAddStd.student_comment,
    };

    if(submitedAddStd.student_medicalproblem && submitedAddStd.student_medicalproblem!=''){
        newStudData['medical_problem'] = submitedAddStd.student_medicalproblem;
    }

    if(submitedAddStd.student_disablityproblem && submitedAddStd.student_disablityproblem!=''){
        newStudData['disability_problem'] = submitedAddStd.student_disablityproblem;
    }

    this._StudentsInfoService.addStudentF(newStudData).subscribe(result => {
      if (result.status) {
        this.verify_parent_msg = '';

        if (this.uploadImage === true) {
          const id = JSON.stringify(result.student_id);
          imagesData.append('id', id); // std id
          imagesData.append('tbl_name', 'tbl_students'); //
          imagesData.append('source', 'student');

          // this.myInputVariable.nativeElement.value = "";

          // add student images

          this._commonService.add_images(imagesData).subscribe(res_result => {
            this.filesToUpload = [];
            this.uploadImage = false;
            this.getStudentsByClassID(submitedAddStd.stud_classId);
          });
        }

        // if student info added then enroll student against class and section year
        const newEnrollData = {
          student_id: result.student_id,
          enroll_session: this.defaultsession,
          std_classId: submitedAddStd.stud_classId,
          std_sectionId: submitedAddStd.stud_sectionId,
          std_sub_class_id: submitedAddStd.sub_class_id,
        };

        this._StudentsInfoService
          .enrollStudentF(newEnrollData) // enroll student
          .subscribe(resp_result => {
            if (resp_result.status === 1) {
              this._commonService.successToaster(
                'Added Successfully',
                'Success!'
              );
              submitEvent.reset(); // reset form after submission
              this.getStudentsByClassID(submitedAddStd.stud_classId);
              this.closeModal();
            } else {
              this._commonService.errorToaster(resp_result.msg, 'Failed!');
            }
          });
      } else {
        this._commonService.errorToaster(result.msg, 'Error!');
      }
    });
  }

  // *********************************************************************************************************************** */
  /*********************************************General   Methods************************************** */
  // *********************************************************************************************************************** */

  public verifyParentPhoneNum(parentNumber) {
    if (typeof parentNumber === 'undefined') {
      this.verify_parent_msg = 'Number Required';
      this.alert_color = 'red';
    } else {
      const verify_number = {
        parent_number: parentNumber
      };

      this.verify_parent = false;
      this.stud_parentId = 0;
      this.verified_parent_name = '';
      this.verify_parent_msg = '';
      this.alert_color = 'red';
      // verify parent phone number while adding new student
      this._StudentsInfoService
        .verifyParentF(verify_number) // enroll student
        .subscribe(result => {
          if (result.status === 1) {
            this.verify_parent = true;
            this.stud_parentId = result.data[0].parent_id;
            this.verified_parent_name = result.data[0].parent_name;
            this.verify_parent_msg =
              'Parent Verified as ' + this.verified_parent_name;
            this.alert_color = 'green';
          } else {
            this.verify_parent = false;
            this.stud_parentId = 0;
            this.verified_parent_name = '';
            this.verify_parent_msg = 'Invalid CNIC Number';
            this.alert_color = 'red';
            this.showAddParentOption = true;
          }
        });
    }
  }

  // *** get sections against class for dropdown
  public classSelected(class_id) {
    this.getSectionByClassID(class_id);
  }

  // enable manage attendance btn when section isnt empty
  public enableBtn() {
    this.disableBtn = false;
  }

  // new modal
  openNgModal(content) {

    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
        keyboard: false,
        size: 'lg'
    };

    this.modelRef = this.modalService.open(content, ngbModalOptions);
  }

  public prepare_add_student_model(content){
      //we need to empty student fields

      delete this.stud_name;
      delete this.stud_dob;
      delete this.stud_gender;
      delete this.stud_religion;
      delete this.std_parentId;
      delete this.stud_phone_number;
      delete this.stud_bform_number;
      delete this.stud_phone_number;
      delete this.stud_phone_number;
      delete this.stud_phone_number;
      delete this.stud_emergency_number,this.stud_email,this.stud_address_1,this.stud_address_2;
      delete this.stud_prevSchool;
      delete this.stud_leavingReason;
      this.std_transport = '0';
      this.std_hostel = '0';
      delete this.std_bloodgroup;
      this.medical_problemOptionText = 'No';
      this.student_medicalproblem = '';
      this.handiCapOptionText = 'No';
      this.student_disablityproblem = '';
      delete this.student_comment;
      delete this.stud_classId;
      delete this.stud_sectionId;
      delete this.sub_class_id;
      this.onChangecheckParentGuardianCnic();

      this.filesToUpload = [];
      this.uploadImage = false;
      
      this.openNgModal(content);
  }

  public prepare_add_parent_modal(content){
      this.add_or_edit_parent_mode = 'add';
      this.openNgModal(content);
  }

  public prepare_edit_parent_modal(content){
      this.add_or_edit_parent_mode = 'edit';
      this.openNgModal(content);

      this.setSingleParentData(this.std_parentId);

  }

  public setSingleParentData(parent_id) {
    this.avatarImgSrc = '';
    this.std_parentId = parent_id;
    this._StudentsInfoService
      .getSingleParentInfo(parent_id)
      .subscribe(result => {
        if (result.length) {
            let parent_details = result[0];

            this.parent_name = parent_details.parent_name;
            this.parent_cnic = parent_details.parent_cnic;
            this.parent_phoneNum = parent_details.parent_phoneNum;
            this.parent_profession = parent_details.parent_profession;
            this.parent_income = parent_details.parent_income;
            this.parent_education = parent_details.parent_education;
            this.parent_sec_phoneNum = parent_details.parent_sec_phoneNum;
            this.parent_email = parent_details.parent_email;
            this.parent_address = parent_details.parent_address;
            this.parent_userName = parent_details.parent_userName;

            this.mother_name = parent_details.mother_name;
            this.mother_cnic = parent_details.mother_cnic;
            this.mother_phoneNum = parent_details.mother_phoneNum;
            this.mother_profession = parent_details.mother_profession;
            this.mother_income = parent_details.mother_income;
            this.mother_education = parent_details.mother_education;
            this.mother_sec_phoneNum = parent_details.mother_sec_phoneNum;
            this.mother_email = parent_details.mother_email;
            this.mother_address = parent_details.mother_address;

            this.guardian_name = parent_details.guardian_name;
            this.guardian_cnic = parent_details.guardian_cnic;
            this.guardian_phoneNum = parent_details.guardian_phoneNum;
            this.guardian_profession = parent_details.guardian_profession;
            this.guardian_income = parent_details.guardian_income;
            this.guardian_education = parent_details.guardian_education;
            this.guardian_sec_phoneNum = parent_details.guardian_sec_phoneNum;
            this.guardian_email = parent_details.guardian_email;
            this.guardian_address = parent_details.guardian_address;
            this.guardian_relation = parent_details.guardian_relation;

            this.checkCnic = true;
            this.checkPhone = true;
            
            this.isUserNameAdded(parent_details.parent_userName);

            this.onChangeFatherMotherGuardian(parent_details.primary_parent_type);

        }
      });
  }

  // get exam id
  public submitExamIdF(submitEvent) {
    const exam_id = submitEvent.value.exam;
    this.get_stdResult(exam_id);
  }

  // open model for edit student data
  public openEditStudModal(modal, student_id, class_id) {
    // call method to get singal Student data for updating
    this.getSingleStudentData(student_id, class_id);
    this.openNgModal(modal);
  }

  // open model for  student Profile data
  public openProfileStudModal(modal, student_id, class_id) {
    this.printButton = false;
    // call method to get singal Student data for updating
    this.getSingleStudentData(student_id, class_id);
    this.getStudentFeeHistroy(student_id);

    this.openModal(modal);

    // clear the previous data
    this.studentExamResult = [];
    this.resultSummary = false;
  }

  // close model
  public closeModal() {
    this.modalService.dismissAll();
  }

  public goToParentRoute() {
    this._router.navigate(['/pages/parents']);
  }

  /********************************* pagination Info ****************************/

  public pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

  openModal(modal) {
    // modal.open();
    this.openNgModal(modal);
  }

  public filterByValue(array, string) {
    return array.filter(o =>
        Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
}

// ********************************************************************* */
  // ********* Get all parents with pagination ************************ */
  // ******************************************************************* */

  // update parent

  public onSubmitUpdateParent(submitEvent){
      const data = submitEvent.value;

      let update_data = {
          parent_id:this.std_parentId,
          primary_parent_type:this.parent_type,
          parent_userName: data.parent_userName.replace(/\s/g, ''),

          parent_address: data.parent_address,
          parent_email: data.parent_email,
          parent_name: data.parent_name,
          parent_cnic: data.parent_cnic,
          parent_phoneNum: data.parent_phoneNum,
          parent_profession: data.parent_profession,
          parent_income: data.parent_income,
          parent_sec_phoneNum: data.parent_sec_phoneNum,

          mother_address: data.mother_address,
          mother_email: data.mother_email,
          mother_name: data.mother_name,
          mother_cnic: data.mother_cnic,
          mother_phoneNum: data.mother_phoneNum,
          mother_profession: data.mother_profession,
          mother_income: data.mother_income,
          mother_sec_phoneNum: data.mother_sec_phoneNum,

          guardian_address: data.guardian_address,
          guardian_email: data.guardian_email,
          guardian_name: data.guardian_name,
          guardian_cnic: data.guardian_cnic,
          guardian_phoneNum: data.guardian_phoneNum,
          guardian_profession: data.guardian_profession,
          guardian_income: data.guardian_income,
          guardian_sec_phoneNum: data.guardian_sec_phoneNum,
          guardian_relation:data.guardian_relation,

      };

      let primary_parent_name = '';

      if(this.parent_type=="father"){
        update_data['primary_parent_cnic'] = data.parent_cnic;
        primary_parent_name = data.parent_name
      }
      else if(this.parent_type=="mother"){
        update_data['primary_parent_cnic'] = data.mother_cnic;
        primary_parent_name = data.mother_name
      }
      else{
        update_data['primary_parent_cnic'] = data.guardian_cnic;
        primary_parent_name = data.guardian_name
      } 


      if(data.hasOwnProperty('parent_password') && data.parent_password!=''){
          update_data['parent_password'] = Md5.hashStr(data.parent_password);
      }

      this._parentsService.updateParentF(update_data,this.std_parentId).subscribe(result => {
        if (result.status === 1) {
          
          this.parentGuardianNameText = primary_parent_name
          this.stud_parentCnicNumber = update_data['primary_parent_cnic']

          this._commonService.successToaster('Updated Successfully', 'Success!');

          this.modelRef.close();

          submitEvent.reset();
        } else {
          this.parent_password = '';
          this._commonService.errorToaster(result.msg, 'Error!');
        }
      });

  }

  // add parent

  public onSubmitAddParent(submitEvent) {
    
    
    const data = submitEvent.value;
    const parent_passwordHash = Md5.hashStr(data.parent_password);

    const newParentData = {
      primary_parent_type:this.parent_type,

      parent_userName: data.parent_userName.replace(/\s/g, ''),
      parent_password: parent_passwordHash,

      parent_address: data.parent_address,
      parent_email: data.parent_email,
      parent_name: data.parent_name,
      parent_cnic: data.parent_cnic,
      parent_phoneNum: data.parent_phoneNum,
      parent_profession: data.parent_profession,
      parent_education: data.parent_education,
      parent_income: data.parent_income,
      parent_sec_phoneNum: data.parent_sec_phoneNum,

      mother_address: data.mother_address,
      mother_email: data.mother_email,
      mother_name: data.mother_name,
      mother_cnic: data.mother_cnic,
      mother_phoneNum: data.mother_phoneNum,
      mother_profession: data.mother_profession,
      mother_education: data.mother_education,
      mother_income: data.mother_income,
      mother_sec_phoneNum: data.mother_sec_phoneNum,

      guardian_address: data.guardian_address,
      guardian_email: data.guardian_email,
      guardian_name: data.guardian_name,
      guardian_cnic: data.guardian_cnic,
      guardian_phoneNum: data.guardian_phoneNum,
      guardian_profession: data.guardian_profession,
      guardian_education: data.guardian_education,
      guardian_income: data.guardian_income,
      guardian_sec_phoneNum: data.guardian_sec_phoneNum,
      guardian_relation:data.guardian_relation,

    };

    let primary_parent_name = '';

    if(this.parent_type=="father"){
      newParentData['primary_parent_cnic'] = data.parent_cnic;
      primary_parent_name = data.parent_name
    }
    else if(this.parent_type=="mother"){
        newParentData['primary_parent_cnic'] = data.mother_cnic;
        primary_parent_name = data.mother_name
    }
    else{
        newParentData['primary_parent_cnic'] = data.guardian_cnic;
        primary_parent_name = data.guardian_name
    } 

    this._parentsService.addParentF(newParentData).subscribe(result => {
      if (result.status === 1) {

        this.parentGuardianNameText = primary_parent_name
        this.stud_parentCnicNumber = newParentData['primary_parent_cnic']
        this.std_parentId = result.parent_id

        this._commonService.successToaster('Added Successfully', 'Success!');

        this.modelRef.close();

        submitEvent.reset();
      } else {
        this.parent_password = '';
        this._commonService.errorToaster(result.msg, 'Error!');
      }
    });
    
    
  }


  setGuardianCNICNumber(fatherCNICNumber)
  {
    this.guardian_cnic = fatherCNICNumber;
  }

 

  public onChangeFatherMotherGuardian(value)
  {

    this.parent_type = value;
    this.fatherMotherGuardianText = value;
    if(value == 'father')
    {   
        this.FatherStyle['text-decoration'] = 'underline';
        this.MotherStyle['text-decoration'] = '';
        this.GuardianStyle['text-decoration'] = '';
    }
    if(value == 'mother')
    {
      this.MotherStyle['text-decoration'] = 'underline';
      this.FatherStyle['text-decoration'] = '';
      this.GuardianStyle['text-decoration'] = '';
    }
    if(value == 'guardian')
    {
      this.MotherStyle['text-decoration'] = '';
      this.FatherStyle['text-decoration'] = '';
      this.GuardianStyle['text-decoration'] = 'underline';
    }
  }
  /********************************* set parent user name by default phone number ****************************/
  setUserName(mobile_number,parent_type) {
    // for unique notifi and btn disable
    this.checkPhone = false;
    this.phone_check = false;
    
    if (mobile_number) {
      
      this.isUserNameAdded(mobile_number.toString());
      const string_phone_num = mobile_number.toString();
      // default password will be first four digits of phone number with test@ (eg test@first_four_digit_of_mobile)
      const mobile_first_four_digits = string_phone_num.substring(0, 4);
      if(this.parent_type==parent_type){
          this.parent_userName = mobile_number.toString();
          this.default_password = 'parent@' + mobile_first_four_digits;
      }
    }

    //only set password on change of user name if it is selected parent type

    if(this.parent_type==parent_type){
        this.parent_password = this.default_password;
    }

    // ******************** */ check phone num is unique or not

    const check_unique_data = {
      type: 'phone',
      check_value: mobile_number,
      tbl_name: 'tbl_parents'
    };
    this._commonService.check_unique_f(check_unique_data).subscribe(result => {
      
      if (result.status === 1) {
        if (!result.data[0].parent_phone_count) {
          this.checkPhone = true;
          this.phone_check = false;
        } else {
          this.checkPhone = false;
          this.phone_check = true;
        }
      } else {
        console.log(result.msg);
      }
    });
  }


  nicNumberPattern = "^((\\+91-?)|0)?[0-9]{13}$";  

  /****************** check cnic uniqueness ******************/

  check_cnicUniqueF(value) {
    // for notification n btn disable

    //we have two validation on cnic fields, 1. Pattern for checking 13 digit and 2. this call to check already existing
    //so check if length is !13 then dont put this validation
    
    if(value<=1000000000000){
        return false;
    }

    //length is 13 so format is valid, lets check already existing
    this.cnic_check = false;
    this.checkCnic = false;
  
    // check whether value is unique or not
    const check_unique_data = {
      type: 'cnic',
      check_value: value,
      tbl_name: 'tbl_parents'
    };

    if(this.add_or_edit_parent_mode=="edit"){
        check_unique_data['parent_id'] = this.std_parentId;
    }

    this._commonService.check_unique_f(check_unique_data).subscribe(result => {
      if (result.status == 1) {
        if (!result.data[0].parent_cnic_count) {
          this.checkCnic = true;
          this.cnic_check = false;
        } else {
          this.checkCnic = false;
          this.cnic_check = true;
        }
      } else {
        this.checkCnic = false;
      }
    });
  }

   /****************** check email uniqueness ******************/

   check_emailUniqueF(value) {
    // for notification n btn disable
    this.email_check = false;
    this.checkEmail = false;
    // check whether value is unique or not
    const check_unique_data = {
      type: 'email',
      check_value: value,
      tbl_name: 'tbl_parents'
    };

    if(this.add_or_edit_parent_mode=="edit"){
        check_unique_data['parent_id'] = this.std_parentId;
    }

    this._commonService.check_unique_f(check_unique_data).subscribe(result => {

      if (result.status == 1) {
        if (!result.data[0].parent_email_count) {
          this.checkEmail = true;
          this.email_check = false;
        } else {
          this.checkEmail = false;
          this.email_check = true;
        }
      } else {
        console.log(result.msg);
      }
    });
  }

  /*  Verify Parent / Guardian CNIC Number */
  onClickcheckParentGuardianCnic(value)
  {
    if(!value || value == '')
    {
      this.verify_parent_cnic_msg = 'CNIC Required';
      this.alert_color = 'red';
    }
    else if(value.toString().length!=13){
        this.verify_parent_cnic_msg = 'CNIC must be 13 digits';
        this.alert_color = 'red';
    }
    else{
        //we need to get parent details with the help of cnic
        const data = {
          cnic: value
        };
        this._StudentsInfoService.getParentFromCNIC(data).subscribe(result => {
            if(!result.status){
                this.verify_parent_cnic_msg = 'CNIC does not exist';
                this.alert_color = 'red';
                this.parentGuardianNameText = '';
                this.showAddParentButton = true;
                this.showEditParentButton = false;

                delete this.parentGuardianNameText;
                delete this.parent_name;
                delete this.std_parentId;

            }
            else{
                this.parentDetailsCheck = result.data[0];
                
                this.showVerifyButton = true;
                this.verify_parent_cnic_msg = '';
                this.showEditParentButton = true;
                this.showAddParentButton = false;

                this.parentGuardianNameText = this.parentDetailsCheck['parent_name'];
                this.std_parentId = this.parentDetailsCheck['parent_id']
                this.parent_name = this.parentDetailsCheck['parent_name'];
            }
        });
    }

  }

  //admin wants to change parent
  onChangecheckParentGuardianCnic(){
    delete this.parentGuardianNameText;
    delete this.parent_name;
    this.showVerifyButton = false;
    delete this.std_parentId;
    this.stud_parentCnicNumber = '';
    this.verify_parent_cnic_msg = '';
  }


}
