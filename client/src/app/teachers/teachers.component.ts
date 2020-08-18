import { GlobalService } from './../shared/services/global.service';

import { Component, OnInit, ElementRef } from '@angular/core';
import swal from 'sweetalert2';
import { Md5 } from 'ts-md5/dist/md5';
import { TeachersDataService } from './teachers.service'; // service for calling Node API's
import { AdminService } from '../admin.service';
import { CommonService } from '../shared/services/common.service';
import { SettingsService } from './../settings/settings.service';
import { Http } from '@angular/http';
import { ViewChild } from '@angular/core';
import { IndexService } from '../index/index.service';
import { NgbModal,NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
  providers: [
    TeachersDataService,
    Md5,
    AdminService,
    IndexService,
    CommonService,
    GlobalService
  ] // register service to use service data or call service functions
})
export class TeachersComponent implements OnInit {
  // reset image filed after submit
  @ViewChild('imageFile')
  myInputVariable: ElementRef;

  // arrays
  teachersDataList: Array<any>; // array to store teachers data fetching from DB
  singleTeacherData: Array<any>; // array to store single teacher data
  isUserPresentA: Array<any>;
  public filesToUpload: Array<File> = [];
  public transcriptToUpload: Array<File> = [];
  public teacher_schedule: Array<any> = [];

  public admin_level: any;
  default_password;
  // default variables
  pageSize = 10;
  pageNumber = 1;
  offset = 0;
  imgValidation = true;
  transcriptValidation = true;
  jwt: string = null;
  uploadImage = false;
  uploadTranscript = false;
  running_session = localStorage.getItem('running_session');
  public placeholderPath = 'assets/images/teacherplaceholder.png';
  public imageBaseUrl;
  public profileImageBaseUrl;
  public transcriptImageBaseUrl;
  public transcriptThumbImageBaseUrl;
  public salary_template;
  // notifications
  successNotification = 0;
  updateSuccessNotifi = 0;
  checkUserName = false;
  checkCnic = false;
  checkPhone = false;
  checkEmail = false;
  cnic_check = false;
  phone_check = false;
  email_check = false;
  isUserPresent;

  ViewImageModalImage = '';
  ImageModalTitle = '';

  // add and update form variables
  t_desc;
  teacher_id = 0;
  teacher_name = '';
  father_name = '';
  teacher_thumb = '';
  teacher_transcript_thumb = '';
  teacher_qual = '';
  teacher_desig = '';
  password;
  gender = '';
  t_religion = '';
  teacher_religion = '';
  marital_status = '';
  dob = '';
  phone_num = '';
  landline_num = '';
  t_landline_num = '';
  email = '';
  address = '';
  teacher_salary;
  teacher_basic_salary;
  teacher_house_allowance;
  teacher_medical_allowance;
  teacher_bonus;
  experience;
  username;
  t_name: string;
  loadData;
  t_email;
  t_username;
  t_password;
  t_gender;
  t_marital_status;
  t_phone_num;
  teacher_nic;
  teacher_image;
  uteacher_image;
  t_cnic;
  teacher_password = '';
  tDesc;

  teacher_profile_image_for_viewimagemodal = '';
  teacher_transcript_image_for_viewimagemodal = '';

  t_last_employment_from_year;
  t_last_employment_to_year;
  t_last_employment_organization_name;
  t_last_employment_position;
  t_last_employment_main_duty;

  last_employment_from_year;
  last_employment_to_year;
  last_employment_organization_name;
  last_employment_position;
  last_employment_main_duty;

  totalTeachers;
  totalTeachersN;

  public searchText;

  public existing_email = '';
  public existing_cnic: string;
  public existing_phone: string;

  public emailNotUnique = '';
  public cnicNotUnique = '';
  public school_info;
  public phoneNumNotUnique = '';

  public updateBtnDisable = false;

  public add_teacher_card_body = false;
  public update_teacher_card_body = false;
  public teacher_details_card_body = true;

  // creating object of TeachersDataService class to call methods  => 'this is called dependency injection'
  constructor(
    private _teachersDataService: TeachersDataService,
    private _adminService: AdminService,
    private _commonService: CommonService,
    private _settingsService: SettingsService,
    private http: Http,
    private el: ElementRef,
    private _dashboardService: IndexService,
    private modalService: NgbModal,
    private _globalService: GlobalService
  ) {}

  // ********************* auto run the function on page load *******************//

  ngOnInit() {
    this.admin_level = localStorage.getItem('admin_level');
    this.imageBaseUrl =
      this._teachersDataService.imagesBaseServer + 'profile_images/thumbs/';

      this.profileImageBaseUrl =
      this._teachersDataService.imagesBaseServer + 'profile_images/';

      this.transcriptImageBaseUrl =
      this._teachersDataService.imagesBaseServer + 'transcript_images/';

      this.transcriptThumbImageBaseUrl =
      this._teachersDataService.imagesBaseServer + 'transcript_images/thumbs/';

    // call API to get teachers data when user load the app
    // this.getTeachersData();

    this.getTeachersWithPagination(this.offset); // with pagination
    this.get_totalTeachers(); // count teachers
    this.get_salary_template();
    this.get_schoolInfo();
  }

  // ********************************************************************************************************************** */
  /**********************************************************Read Data from DB Methods************************************** */
  // *********************************************************************************************************************** */

  // ********************************************************************* */
  // *********************** Get all teachers data************************ */
  // ******************************************************************* */

  public get_schoolInfo() {
		var date = new Date();	
		this._settingsService.get_schoolInfoF().subscribe(result => {
		  if (result.status === 1) {
			  this.school_info = result.data[0];
		  }
		});
	}

  public get_salary_template() {
    this._commonService.get_salary_template().subscribe(result => {   
        if(result.status==1){
            this.salary_template = result.data;
        }
        
    });
  }

  public getTeachersData() {
    this._teachersDataService.getTeachersF().subscribe(result => {
      
      this.teachersDataList = result;
    });
  }

  // ********************************************************************* */
  // ************** Get all teachers with pagination data******************* */
  // ******************************************************************* */

  public getTeachersWithPagination(offset) {
    const pagination_data = {
      itemsPerPage: this.pageSize,
      offset: offset,
      role_xref_id:1
    };

    this._teachersDataService
      .getTeachersWithPaginationF(pagination_data)
      .subscribe(result => {
        
        this.teachersDataList = result.data;
      });
  }

  public getTeacherSchedule(id){

    let data={current_session:localStorage.getItem('running_session'),id:id};

    this.teacher_schedule = [];
    this._teachersDataService.getTeacherSchedule(data).subscribe(result => {
        if(result.status){
            this.teacher_schedule = result.data;
        }
        
    });
  }


  // ********************************************************************* */
  // *********************** Get Number of Teachers************************ */
  // ******************************************************************* */

  public get_totalTeachers() {
    const count_type = 'teachers';
    this._dashboardService
      .get_totalStudentsF(count_type, this.running_session)
      .subscribe(result => {
        if (result.status === 1) {
          this.totalTeachers = result.data[0].count_total;
        } else if (result.status === 0) {
          this.totalTeachersN = 'No Teachers Added ';
        } else {
          console.log(result);
        }
      });
  }

  // *************************************************************************** */
  // ********************** Get single teacher data ****************************** */
  // **************************************************************************** */

  public getSingleTeacherData(index) {
    
    this.imgValidation = true;
    let singleTeacher = null;

    // get the response data in array singleTeacherData

    singleTeacher = this.teachersDataList[index];
    
    this.teacher_id = singleTeacher.employee_id;
    this.teacher_name = singleTeacher.employee_name;
    this.father_name = singleTeacher.father_name;
    this.teacher_qual = singleTeacher.employee_qual;
    this.teacher_desig = singleTeacher.employee_desig;
    this.password = singleTeacher.password;
    this.gender = singleTeacher.gender;
    this.teacher_religion = singleTeacher.religion;
    this.marital_status = singleTeacher.marital_status;
    this.dob = singleTeacher.dob;
    this.phone_num = singleTeacher.phone_num;
    this.landline_num = singleTeacher.landline_num;
    this.email = singleTeacher.email;
    this.address = singleTeacher.address;

    this.experience = singleTeacher.experience;
    this.username = singleTeacher.user_name;
    this.t_cnic = singleTeacher.employee_cnic;
    this.tDesc = singleTeacher.employee_description;

    this.teacher_thumb = singleTeacher.thumb_path;
    this.teacher_profile_image_for_viewimagemodal = singleTeacher.image_path;
    this.teacher_transcript_image_for_viewimagemodal = singleTeacher.transcript_image_path;
    this.teacher_transcript_thumb = singleTeacher.transcript_thumb_path;

    this.last_employment_from_year = singleTeacher.last_employment_from_year;
    this.last_employment_to_year = singleTeacher.last_employment_to_year;
    this.last_employment_organization_name = singleTeacher.last_employment_organization_name;
    this.last_employment_position = singleTeacher.last_employment_position;
    this.last_employment_main_duty = singleTeacher.last_employment_main_duty;

    this.teacher_basic_salary = singleTeacher.basic_salary
    this.teacher_house_allowance = singleTeacher.house_allowance
    this.teacher_medical_allowance = singleTeacher.medical_allowance
    this.teacher_bonus = singleTeacher.bonus
    this.teacher_salary = singleTeacher.total_salary


  }

  // ***************************************************************************** **/
  // ******************* check userName already added event handler  ******************/
  // ********************************************************** *******************/

  public isUserNameAdded(username) {
    this.checkUserName = false;
    let isUserPresent = 0;
    const userInfo = {
      user_name: username,
      table_name: 'tbl_employees',
      role_xref_id: 1,
    };
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

  // *********************************************************************************************************************** */
  /*********************************************Write , Update , Delete Data  Methods************************************** */
  // *********************************************************************************************************************** */

  // ************************************************************************* */
  // ******************* Add teacher event handler function ******************/
  // ********************************************************************** ***/

  public onSubmitAddTeacher(submitEvent) {

    // get teacher image
    var imagesData = new FormData();
    var transcriptData = new FormData();
    const files: Array<File> = this.filesToUpload;
    const transcripts: Array<File> = this.transcriptToUpload;
    
    for (let i = 0; i < files.length; i++) {
      imagesData.append('uploads[]', files[i], files[i]['name']);
    }
    if (files.length >= 1) {
      this.uploadImage = true;
    }

    for (let i = 0; i < transcripts.length; i++) {
        transcriptData.append('uploads[]', transcripts[i], transcripts[i]['name']);
    }
    if (transcripts.length >= 1) {
        this.uploadTranscript = true;
    }

    const data = submitEvent.value;
    const newTeacherData = {
      role:'teacher',
      teacher_name: data.t_name,
      father_name: data.t_father_name,
      teacher_qual: data.t_qualification,
      teacher_desig: data.t_desig,
      password: Md5.hashStr(data.t_password),
      gender: data.t_gender,
      religion: data.t_religion,
      marital_status: data.t_marital_status,
      dob: data.t_dob,
      teacher_nic: data.teacher_nic,
      phone_num: data.t_phone_num,
      landline_num: data.t_landline_num,
      email: data.t_email,
      address: data.t_address,
      experience: data.t_experience,
      user_name: data.t_username.replace(/\s/g, ''),
      t_desc: data.t_desc,
      last_employment_from_year: data.t_last_employment_from_year,
      last_employment_to_year: data.t_last_employment_to_year,
      last_employment_organization_name: data.t_last_employment_organization_name,
      last_employment_position: data.t_last_employment_position,
      last_employment_main_duty: data.t_last_employment_main_duty,
      basic_salary: data.t_basic_salary,
      house_allowance: data.t_house_allowance,
      medical_allowance: data.t_medical_allowance,
      bonus: data.t_bonus,
      total_salary: data.t_salary,
    };

    this._teachersDataService.addTeachersF(newTeacherData).subscribe(result => {
      if (result.status === 1) {

        this._commonService.successToaster(
          'Details saved Successfully',
          'Success!'
        );

        const id = JSON.stringify(result.inserted_id);

        imagesData.append('id', id); // teacher id
        imagesData.append('tbl_name', 'tbl_employees');
        imagesData.append('source', 'teacher');

        transcriptData.append('id', id); // teacher id
        transcriptData.append('tbl_name', 'tbl_employees');
        transcriptData.append('source', 'teacher');

        // add teacher images
        if (this.uploadImage === true) {

          let toaster_instance = this._commonService.progressToaster(
            'Please wait, saving photo . . . .',
            'Saving!'
          );

          this._commonService.add_images(imagesData).subscribe(respresult => {

            if (respresult.status !== 1) {              
              toaster_instance.message = 'Error saving photo'
            } else {
              toaster_instance.message = 'Photo saved Successfully'
            this.filesToUpload = [];
            this.getTeachersWithPagination(this.offset);
            }
            toaster_instance.timeOut = 3000
          });
        }

        // add teacher transcript
        if (this.uploadTranscript === true) {

          let toaster_instance = this._commonService.progressToaster(
            'Please wait, saving transcript . . . .',
            'Saving!'
          );

          this._commonService.add_transcript(transcriptData).subscribe(respresult => {
              if (respresult.status !== 1) {
                toaster_instance.message = 'Error saving transcript'
              } else {
                toaster_instance.message = 'Transcript saved Successfully'
            this.getTeachersWithPagination(this.offset);
              }
              toaster_instance.timeOut = 3000
          });
        }

        // reset for after submission
        submitEvent.reset();
        this.getTeachersWithPagination(this.offset);
        this.show_teachers_list();

        //reset image uploading variables
        this.filesToUpload = [];
        this.transcriptToUpload = [];

        this.uploadImage = false;
        this.uploadTranscript = false;
        
        delete this.t_gender
        delete this.t_marital_status
        
      } else {
        this._commonService.errorToaster(result.msg, 'Error!');
      }
    });
  }

  // ************************************************************************************************************* */
  /*********************************************Store Images in Array******************************** */
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
        // check file is valid
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

  // ************************************************************************************************************* */
  /*********************************************Store transcript in Array******************************** */
  // ************************************************************************************************************* */

  public transcriptChangeEvent(fileInput: any) {
    
    const filedata = <Array<File>>fileInput.target.files;
    
    if (!this._commonService.validateFile(filedata[0].name)) {
          
      this.transcriptValidation = false;
      this.uploadTranscript = false;
      
    } else {
      
      this.transcriptToUpload = filedata;
      this.transcriptValidation = true;

    }

  }

  // **************************************************************************** */
  // ******************* Update teacher event handler function ******************/
  /************************************************************************* */

  public onSubmitUpdateTeacher(submitEvent) {
    // empty noti string
    this.emailNotUnique = '';
    this.cnicNotUnique = '';

    this.phoneNumNotUnique = '';
    // get teacher image
    var imagesData = new FormData();
    var transcriptData = new FormData();

    const files: Array<File> = this.filesToUpload;
    const transcripts: Array<File> = this.transcriptToUpload;

    if (files.length >= 1) {
      this.uploadImage = true;
    }

    for (let i = 0; i < files.length; i++) {
      imagesData.append('uploads[]', files[i], files[i]['name']);
    }

    for (let i = 0; i < transcripts.length; i++) {
        transcriptData.append('uploads[]', transcripts[i], transcripts[i]['name']);
    }
    if (transcripts.length >= 1) {
        this.uploadTranscript = true;
    }

    const data = submitEvent.value;
    const id = data.teacher_id;

    const updateTeacherData = {
      role:'teacher',
      teacher_name: data.teacher_name,
      father_name: data.father_name,
      teacher_cnic: data.t_cnic,
      phone_num: data.phone_num,
      landline_num: data.landline_num,
      teacher_password:
        data.teacher_password === ''
          ? data.teacher_password
          : Md5.hashStr(data.teacher_password),
      email: data.email,
      teacher_qual: data.teacher_qual,
      teacher_desig: data.teacher_desig,
      experience: data.experience,
      gender: data.gender,
      religion: data.teacher_religion,
      marital_status: data.marital_status,
      dob: data.dob,
      address: data.address,      
      t_desc: data.tDesc,
      last_employment_from_year: data.last_employment_from_year,
      last_employment_to_year: data.last_employment_to_year,
      last_employment_organization_name: data.last_employment_organization_name,
      last_employment_position: data.last_employment_position,
      last_employment_main_duty: data.last_employment_main_duty,
      basic_salary: data.teacher_basic_salary,
      house_allowance: data.teacher_house_allowance,
      medical_allowance: data.teacher_medical_allowance,
      bonus: data.teacher_bonus,
      total_salary: data.teacher_salary,
    };

    this._teachersDataService
      .updateTeacherF(updateTeacherData, id)
      .subscribe(result => {

        const t_id = JSON.stringify(data.teacher_id);
        imagesData.append('id', t_id);
        imagesData.append('tbl_name', 'tbl_employees');
        imagesData.append('source', 'teacher');

        transcriptData.append('id', t_id); // teacher id
        transcriptData.append('tbl_name', 'tbl_employees');
        transcriptData.append('source', 'teacher');

        // this.myInputVariable.nativeElement.value = "";

        // update teacher images if image selected
        if (this.uploadImage === true) {
          
          let toaster_instance = this._commonService.progressToaster(
            'Please wait, saving photo . . . .',
            'Saving!'
          );

          this._commonService.add_images(imagesData).subscribe(respresult => {
            this.filesToUpload = [];
            if (respresult.status !== 1) {
              toaster_instance.message = 'Error saving photo'
            } else {
              toaster_instance.message = 'Photo saved Successfully'
              this.getTeachersWithPagination(this.offset);
            }
            toaster_instance.timeOut = 3000
          });
        }

        // update teacher transcript if transcript selected
        if (this.uploadTranscript === true) {
          let toaster_instance = this._commonService.progressToaster(
            'Please wait, saving transcript . . . .',
            'Saving!'
          );
          this._commonService.add_transcript(transcriptData).subscribe(respresult => {
            this.transcriptToUpload = [];
            if (respresult.status !== 1) {
              toaster_instance.message = 'Error saving transcript'
            } else {
              toaster_instance.message = 'Transcript saved Successfully'
              this.getTeachersWithPagination(this.offset);
            }
            toaster_instance.timeOut = 3000
          });
        }

        if (result.status === 1) {
          
          this._commonService.successToaster(
            'Details saved Successfully',
            'Success!'
          );

          this.getTeachersWithPagination(this.offset); // with pagination
          this.show_teachers_list();

          //reset image uploading variables
          this.filesToUpload = [];
          this.transcriptToUpload = [];

          this.uploadImage = false;
          this.uploadTranscript = false;

        } else {
          this._commonService.errorToaster(result.msg, 'Error!');
        }
      });
  }

  // ********************************************************************************* */
  // ******************* OnClick delete teacher event handler function *****************/
  // ***********************************************************************************/

  public deleteTeacher(id) {
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
        this._teachersDataService.deleteTeachersF(id).subscribe(data => {
          this.getTeachersData(); // load teachers data after deleting data
        });
        // show deleted notification
        this._commonService.successToaster('Deleted Successfully', 'Success!');
      }
    });
  }

  // *********************************************************************************************************************** */
  /*********************************************General   Methods************************************** */
  // *********************************************************************************************************************** */

  show_teachers_list(){
      this.add_teacher_card_body = false;
      this.update_teacher_card_body = false;
      this.teacher_details_card_body = true;
  }

  prepare_add_teacher(){
      this.add_teacher_card_body = true;
      this.update_teacher_card_body = false;
      this.teacher_details_card_body = false;
  }

  prepare_edit_teacher(id, index){
      this.add_teacher_card_body = false;
      this.update_teacher_card_body = true;
      this.teacher_details_card_body = false;

      this.emailNotUnique = '';
      this.cnicNotUnique = '';
  
      this.phoneNumNotUnique = '';
      // call method to get singal teacher data for updating
      this.getSingleTeacherData(index);

  }

  // new modal
  openNgModal(content) {


  let ngbModalOptions: NgbModalOptions = {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
  };

    this.modalService.open(content, ngbModalOptions);

  }

    // new modal
    openNgProfileModal(content) {


      let ngbModalOptions: NgbModalOptions = {
          size: 'lg',
          // windowClass:'teacher_profile_modal',//do this to decrease modal width to 75%
          backdrop: 'static',
          keyboard: false
      };
    
        this.modalService.open(content, ngbModalOptions);
    
      }

    // image modal
    openNgImageModal(content,image,imagetype) {

      //let large_image = image.replace('\/thumb\/','\/large\/',);

      this.ViewImageModalImage = image;
      if(imagetype=='profileimage'){
          this.ImageModalTitle = 'Profile Image';
      }
      else{
          this.ImageModalTitle = 'Final Transcript';
      }

      

      let ngbModalOptions: NgbModalOptions = {
          backdrop: 'static',
          keyboard: false
      };
    
        this.modalService.open(content, ngbModalOptions);
    
      }

  // ********************** */ get searching data from database  ************************
  public searchFromDb(searchKeyWord) {
    if (!searchKeyWord) {
      this.getTeachersWithPagination(this.offset); // with pagination
    } else {
      const search_data = {
        type: 'tbl_employees',
        role_xref_id:1,
        keyword: searchKeyWord // NIC OR Phone number
      };

      this._commonService.searchByNicPhoneNum(search_data).subscribe(result => {
        if (result.status === 1) {
          this.teachersDataList = result.data;
        } else {
          console.log(result.data);
        }
      });
    }
  }

  // ****************** */ hide success toaster after 2 secs *******************
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
  // open model for edit teacher data
  public openEditTeachModal(modal, id, index) {
    this.emailNotUnique = '';
    this.cnicNotUnique = '';

    this.phoneNumNotUnique = '';
    // call method to get singal teacher data for updating
    this.getSingleTeacherData(index);
    this.openNgModal(modal);
  }
  
  public openProfileTeacherModal(modal, id, index) {
	  
    //this.printButton = false;
    // call method to get singal Student data for updating
    this.getSingleTeacherData(index);

    this.getTeacherSchedule(id);

    this.openNgProfileModal(modal);

    // clear the previous data
    //this.studentExamResult = [];
    //this.resultSummary = false;
  }
  // close model
  public closeModal() {
    this.modalService.dismissAll();
  }

  public openModal(modal) {
	
    modal.open();
  }

  /********************************* pagination Info ****************************/

  public pageChanged(pN: number): void {
    this.pageNumber = pN;

    this.offset = (pN - 1) * this.pageSize;

    this.getTeachersWithPagination(this.offset);
  }

  validateTextField(text){

    let result1 = (text.match('^[A-Za-z ]+$'));
    if(result1){
      console.log('yes')
    }
    else{
      console.log('no')
    }
    
    
  }

  /********************************* set parent user name by default phone number ****************************/
  setUserName(mobile_number) {
    // for unique notifi and btn disable
    this.checkPhone = false;
    this.phone_check = false;

    if (mobile_number) {
      this.t_username = mobile_number.toString();
      const string_phone_num = mobile_number.toString();
      // default password will be first four digits of phone number with test@ (eg test@first_four_digit_of_mobile)
      const mobile_first_four_digits = string_phone_num.substring(0, 4);
      this.default_password = 'teach@' + mobile_first_four_digits;
    }

    this.t_password = this.default_password;

    // check phone num is unique or not

    const check_unique_data = {
      type: 'phone',
      check_value: mobile_number,
      role:'teacher',
      tbl_name: 'tbl_teachers'
    };
    this._commonService.check_unique_f(check_unique_data).subscribe(result => {
      if (result.status === 1) {
        if (result.data[0].teacher_phone_count) {
          this.checkPhone = true;
          this.phone_check = true;
        } else {
          this.checkPhone = false;
          this.phone_check = false;
        }
      } else {
        console.log(result.msg);
      }
    });
  }

  /****************** check cnic uniqueness ******************/

  check_cnicUniqueF(value) {
    // for notification n btn disable
    this.cnic_check = false;
    this.checkCnic = false;
    // check whether value is unique or not
    const check_unique_data = {
      type: 'cnic',
      check_value: value,
      role:'teacher',
      tbl_name: 'tbl_teachers'
    };
    this._commonService.check_unique_f(check_unique_data).subscribe(result => {
      if (result.status === 1) {
        if (result.data[0].teacher_cnic_count) {
          this.checkCnic = true;
          this.cnic_check = true;
        } else {
          this.checkCnic = false;
          this.cnic_check = false;
        }
      } else {
        console.log(result.msg);
      }
    });
  }

  /****************** check email uniqueness ******************/

  check_emailUniqueF(value) {
    if (value === '') {
      this.email_check = false;
      this.checkEmail = false;
    } else {
      // for notification n btn disable
      this.email_check = false;
      this.checkEmail = false;
      // check whether value is unique or not
      const check_unique_data = {
        type: 'email',
        check_value: value,
        role:'teacher',
        tbl_name: 'tbl_teachers'
      };
      this._commonService
        .check_unique_f(check_unique_data)
        .subscribe(result => {
          if (result.status === 1) {
            if (result.data[0].teacher_email_count) {
              this.email_check = true;
              this.checkEmail = true;
            } else {
              this.email_check = false;
              this.checkEmail = false;
            }
          } else {
            console.log(result.msg);
          }
        });
    }
  }

  /*********************check unique on Update ************* */

  checkUniqueOnUpdate(check_info, check_value) {
    if (check_value) {
      let existing;

      if (check_info === 't_email') {
        existing = this.existing_email;
      } else if (check_info === 't_cnic') {
        existing = this.existing_cnic;
      } else if (check_info === 't_phonenum') {
        existing = this.existing_phone;
      }

      const check_data = {
        check_info: check_info, // email / user name / cnic / phone num
        table: 'tbl_teachers',
        role:'teacher',
        check_value: check_value,
        existing: existing
      };

      this._commonService.checkUniqueOnUpdate(check_data).subscribe(result => {
        if (result.status === 1) {
          this.updateBtnDisable = true;
          if (result.notificationVar === 'email') {
            this.emailNotUnique = 'Email already in use';
          } else if (result.notificationVar === 'cnic') {
            this.cnicNotUnique = 'CNIC already in use';
          } else if (result.notificationVar === 'phonenum') {
            this.phoneNumNotUnique = 'Phone Num already in use';
          }
        } else {
          if (check_info === 't_email') {
            this.emailNotUnique = '';
          } else if (check_info === 't_cnic') {
            this.cnicNotUnique = '';
          } else if (check_info === 't_phonenum') {
            this.phoneNumNotUnique = '';
          }

          console.log(result.msg);
          this.updateBtnDisable = false;
        }
      });
    }
  }

  viewSalarySlip(record){

      var print_text = "";
      var date_object = new Date()
      var date = Math.floor(date_object.getTime()/1000);
		
      var currentDate = this._commonService.get_pretty_date(date);
      
      var templateText = this.salary_template
      let width = 100
      print_text  += '<div style="width:100%">';
      print_text += '<page size="A4" layout="landscape"><div style="width:'+width+'%;float:left;padding:15px;">';

      templateText = templateText.replace("##SCHOOL_LOGO##", this.school_info.logo);
      templateText = templateText.replace("##SCHOOL_NAME##", this.school_info.school_name);
      templateText = templateText.replace("##SCHOOL_ADDRESS##", this.school_info.school_address);
      templateText = templateText.replace("##PHONE##", this.school_info.school_num);

      templateText = templateText.replace("##SALARY_MONTH##", this._commonService.get_current_month());
      templateText = templateText.replace("##SALARY_YEAR##", date_object.getFullYear());

      templateText = templateText.replace("##NAME##", record.employee_name);
      templateText = templateText.replace("##FATHER_NAME##", record.father_name);

      templateText = templateText.replace("##BASIC_SALARY##", record.basic_salary);
      templateText = templateText.replace("##HOUSE_ALLOWANCE##", record.house_allowance);
      templateText = templateText.replace("##MEDICAL_ALLOWANCE##", record.medical_allowance);
      templateText = templateText.replace("##BONUS##", record.bonus);
      templateText = templateText.replace(/##TOTAL_SALARY##/g, record.total_salary);

      templateText = templateText.replace(/##CURRENTDATE##/g, currentDate);

      print_text += templateText;
      print_text += '</div>';

      this._commonService.PrintPreview(print_text);

  }

}
