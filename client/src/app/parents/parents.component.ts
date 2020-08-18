// ******************************************************************************************************************* */
// *********** register html , css components and handle all the data submiting from frontend and response from backend  */
// ****************************************************************************************************************** */

import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Md5 } from 'ts-md5/dist/md5';
import { ParentsDataService } from './parents.service'; // service for calling Node API's
import { AdminService } from '../admin.service';
import { CommonService } from '../shared/services/common.service';
import { SearchPipe } from './search.pipe';
import { IndexService } from '../index/index.service';
import { NgbModal,NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { stringify } from 'querystring';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.scss'],
  providers: [
    ParentsDataService,
    Md5,
    AdminService,
    CommonService,
    IndexService
  ]
})
export class ParentsComponent implements OnInit {
 
  running_session;

  admin_level: any;
  pageSize = 10;
  pageNumber = 1;
  offset = 0;
  default_password = '';
  parentsDataList: Array<any>;
  singleParentData: Array<any>;

  showFatherName:boolean = false;

  isUserPresentA: Array<any>;
  // variables used in add parent form
  parent_address = '';
  parent_email = '';
  parent_name = '';
  mother_name = '';
  mother_cnic:string;
  guardian_name = '';
  guardian_cnic:string;
  parent_password = '';
  parent_phoneNum: string;
  parent_profession = '';
  parent_userName = '';
  relationship = '';
  parent_cnic: number;
  totalParents;
  parent_sec_phoneNum;
  father_name;
  mother_phoneNum: string;
  mother_sec_phoneNum;
  guardian_sec_phoneNum;
  guardian_phoneNum: string;
  mother_address: string;
  guardian_address: string;
  fatherMotherGuardianText: string = 'father';
  stud_parentCnicNumber:string;
  std_parentId: number;
  parent_type: string = 'father';

  parentGuardianNameText:string;
  showVerifyButton:boolean = false;
  
  /* CSS and NgIf Conditions for father mother */
  
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


  // variables used in update parent form
  parentId: number;
  parentAddress = '';
  parentEmail = ''; /* father email address */
  parentName = '';
  parentPassword = '';
  parentPhoneNum: string;
  parentProfession = '';
  parentUserName = '';
  pRelationship = '';
  parentCNICNum: any;
  parentSecPhoneNum;
  motherUName = '';
  motherUCnic: any;
  guardianUName = '';
  guardianUCnic: string;
  mother_email:string;
  guardian_email:string;
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
  // check unique on update

  public existing_email = '';
  public existing_cnic: string;
  public existing_phone: string;
  public existing_userName = '';

  public emailNotUnique = '';
  public cnicNotUnique = '';
  public usernameNotUnique = '';
  public phoneNumNotUnique = '';

  public updateBtnDisable = false;

  // notifications flags
  addResponseMessage: String = '';
  updateResponseMessage: String = '';
  successNotification = 0;
  alertType;
  updateSuccessNotifi = 0;
  checkUserName = false;
  checkCnic = false;
  checkPhone = false;
  checkEmail = false;
  cnic_check = false;
  phone_check = false;
  email_check = false;
  isUserPresent;





  public searchText;

  constructor(
    private _parentsService: ParentsDataService,
    private _adminService: AdminService,
    private _commonService: CommonService,
    private _dashboardService: IndexService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    // get admin level
    this.admin_level = localStorage.getItem('admin_level');
    // call API to get teachers data when user load the app
    // this.getParentData();  // without pagination
    this.getParentsWithPagination(this.offset);
    this.get_totalParents(); // get parents count for pagination

    
  
    

  }

  // *********************************************************************************************************************** */
  /**********************************************************Read Data from DB Methods************************************** */
  // *********************************************************************************************************************** */

  // ********************************************************************* */
  // *********************** Get all parents data************************ */
  // ******************************************************************* */
  nicNumberPattern = "^((\\+91-?)|0)?[0-9]{13}$";  
  public getParentData() {
    this._parentsService.getParentsF().subscribe(result => {
      this.parentsDataList = result;
    });
  }

  // ********************************************************************* */
  // ********* Get all parents with pagination ************************ */
  // ******************************************************************* */

  public getParentsWithPagination(offset: number) {
    const pagination_data = {
      itemsPerPage: this.pageSize,
      offset: offset
    };

    this._parentsService
      .getParentsWithPaginationF(pagination_data)
      .subscribe(result => {
        this.parentsDataList = result.data;
      });
  }

  // ********************************************************************* */
  // *********************** Get Number of Parents************************ */
  // ******************************************************************* */

  public get_totalParents() {
    const count_type = 'parents';
    this._dashboardService
      .get_totalStudentsF(count_type, this.running_session)
      .subscribe(result => {
        if (result.status === 1) {
          this.totalParents = result.data[0].count_total;
        } else if (result.status === 0) {
          this.totalParents = 'No Parent Added ';
        } else {
          console.log(result);
        }
      });
  }

  // *************************************************************************** */
  // ********************** Get single parent data ****************************** */
  // **************************************************************************** */

  public prepare_add_parent_modal(content){
      this.add_or_edit_parent_mode = 'add';
      this.openNgModal(content);
  }

  public prepare_edit_parent_modal(content,id,index){
      this.add_or_edit_parent_mode = 'edit';
      this.openNgModal(content);

      this.setSingleParentData(id);

  }

  public setSingleParentData(parent_id) {
    this.std_parentId = parent_id;
    this._parentsService
      .getSingleParentF(parent_id)
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

  public getSingleParentData(index) {
    let singleParent = null;

    singleParent = this.parentsDataList[index];

    this.parentId = singleParent.parent_id;
    this.parentAddress = singleParent.parent_address;
    this.parentEmail = singleParent.parent_email;
    this.parentName = singleParent.parent_name;
    // this.parentPassword = singleParent.parent_password;
    this.parentPhoneNum = singleParent.parent_phoneNum;
    this.parentProfession = singleParent.parent_profession;
    this.parentUserName = singleParent.parent_userName;
    this.parentSecPhoneNum = singleParent.parent_sec_phoneNum;
    this.parentCNICNum = singleParent.parent_cnic;

    // for checking unique data on update

    this.existing_email = singleParent.parent_email;
    this.existing_cnic = singleParent.parent_cnic;
    this.existing_phone = singleParent.parent_phoneNum;
    this.existing_userName = singleParent.parent_userName;
  }

  // ***************************************************************************** **/
  // ******************* check userName already added event handler  ******************/
  // ********************************************************** *******************/

  public isUserNameAdded(username) {
    this.checkUserName = false;
    let isUserPresent = 0;
    const userInfo = {
      user_name: username,
      table_name: 'tbl_parents'
    };

    if(this.add_or_edit_parent_mode=="edit"){
      userInfo['parent_id'] = this.std_parentId;
    }

    this._commonService.userNameExistCheckF(userInfo).subscribe(result => {
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
  // ********************************* search from database  **********************/
  // ********************************************************** *******************/

  // ********************** */ get searching data from database  ************************
  public searchFromDb(searchKeyWord) {
    if (!searchKeyWord) {
      this.getParentsWithPagination(this.offset); // with pagination
    } else {
      const search_data = {
        type: 'tbl_parents',
        keyword: searchKeyWord // NIC OR Phone number
      };

      this._commonService.searchByNicPhoneNum(search_data).subscribe(result => {
        if (result.status === 1) {
          this.parentsDataList = result.data;
        } else {
          console.log(result.data);
        }
      });
    }
  }

  // *********************************************************************************************************************** */
  /*********************************************Write , Update , Delate Data  Methods************************************** */
  // *********************************************************************************************************************** */

  // ************************************************************************* */
  // ******************* Add parent event handler function ******************/
  // ********************************************************************** ***/

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

    if(this.parent_type=="father"){
      newParentData['primary_parent_cnic'] = data.parent_cnic;
    }
    else if(this.parent_type=="mother"){
        newParentData['primary_parent_cnic'] = data.mother_cnic;
    }
    else{
        newParentData['primary_parent_cnic'] = data.guardian_cnic;
    } 

    this._parentsService.addParentF(newParentData).subscribe(result => {
      if (result.status === 1) {
        this.get_totalParents(); // get parents count for pagination

        this._commonService.successToaster('Added Successfully', 'Success!');
        this.getParentsWithPagination(this.offset);
        this.closeModal();
        submitEvent.reset();
      } else {
        this.parent_password = '';
        this._commonService.errorToaster(result.msg, 'Error!');
      }
    });
    
    
  }

  // ************************************************************************* */
  // ******************* Update parent event handler function ******************/
  // ********************************************************************** ***/

  public onSubmitUpdateParent(submitEvent) {
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

      if(this.parent_type=="father"){
        update_data['primary_parent_cnic'] = data.parent_cnic;
      }
      else if(this.parent_type=="mother"){
        update_data['primary_parent_cnic'] = data.mother_cnic;
      }
      else{
        update_data['primary_parent_cnic'] = data.guardian_cnic;
      } 


      if(data.hasOwnProperty('parent_password') && data.parent_password!=''){
          update_data['parent_password'] = Md5.hashStr(data.parent_password);
    }

      this._parentsService.updateParentF(update_data,this.std_parentId).subscribe(result => {
        if (result.status === 1) {

          this._commonService.successToaster('Updated Successfully', 'Success!');
          this.getParentsWithPagination(this.offset);
          this.closeModal();
          submitEvent.reset();
        } else {
          this.parent_password = '';
          this._commonService.errorToaster(result.msg, 'Error!');
        }
      });

  }

  // ************************************************************************* */
  // ******************* Update parent Password event handler function *************/
  // ********************************************************************** ***/

  public onSubmitUptParentPass(submitEvent) {
    const data = submitEvent.value;
    const parent_id = data.parentId;
    const hash_pass = Md5.hashStr(data.parentPassword);
    const updatePassword = {
      parentPassword: hash_pass
    };

    this._parentsService
      .updatePassword(parent_id, updatePassword)
      .subscribe(result => {
        if (result.status === 1) {
          this._commonService.successToaster(
            'Updated Successfully',
            'Success!'
          );

          this.parentPassword = '';
        } else {
          this._commonService.errorToaster(result.msg, 'Failed!');
        }
      });
  }

  // ************************************************************************* */
  // ******************* Delete parent event handler function ******************/
  // ********************************************************************** ***/
  public deleteParent(parent_id) {
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
        this._parentsService.deleteParentF(parent_id).subscribe(respresult => {
          if (respresult.status === 1) {
            this.getParentData(); // load parents data

            this._commonService.successToaster(
              'Deleted Successfully',
              'Success!'
            );
          } else {
            this._commonService.errorToaster(respresult.msg, 'Failed!');
          }
        });
      }
    });
  }

  // *********************************************************************************************************************** */
  /*********************************************General   Methods************************************** */
  // *********************************************************************************************************************** */

  // new modal
  openNgModal(content) {

    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
        keyboard: false,
        size: 'lg'
    };

    this.modalService.open(content, ngbModalOptions);
  }

  // hide success toaster after 2 secs
  FadeOutToaster() {
    setTimeout(() => {
      this.successNotification = 0;
    }, 3000);
  }

  FadeOutUpdateToaster() {
    setTimeout(() => {
      this.updateSuccessNotifi = 0;
    }, 2000);
  }


  // close model
  closeModal() {
    this.modalService.dismissAll();
  }

  // close model
  openModal(modal) {
    modal.open();
  }

  /********************************* pagination Info ****************************/

  pageChanged(pN: number): void {
    this.pageNumber = pN;
    // console.log(this.pageNumber);

    this.offset = (pN - 1) * this.pageSize;

    this.getParentsWithPagination(this.offset);

    // console.log(this.offset);
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
      console.log(result);
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

  /****************** check cnic uniqueness ******************/

  check_cnicUniqueF(value) {
  
     //we have two validation on cnic fields, 1. Pattern for checking 13 digit and 2. this call to check already existing
    //so check if length is !13 then dont put this validation

    if(value<=1000000000000){
        return false;
    }

    //length is 13 so format is valid, lets check already existing
    this.cnic_check = false;
    this.checkCnic = false;

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
      console.log(result);
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

  /*********************check unique on Update ************* */

  checkUniqueOnUpdate(check_info, check_value) {
    if (check_value) {
      let existing;

      if (check_info === 'p_email') {
        existing = this.existing_email;
      } else if (check_info === 'p_cnic') {
        existing = this.existing_cnic;
      } else if (check_info === 'p_username') {
        existing = this.existing_userName;
      } else {
        existing = this.existing_phone;
      }

      const check_data = {
        check_info: check_info, // email / user name / cnic / phone num
        table: 'tbl_parents',
        check_value: check_value,
        existing: existing
      };

      this._commonService.checkUniqueOnUpdate(check_data).subscribe(result => {
        console.log(result);
        if (result.status === 1) {
          this.updateBtnDisable = true;
          if (result.notificationVar === 'email') {
            this.emailNotUnique = 'Email already in use';
          } else if (result.notificationVar === 'cnic') {
            this.cnicNotUnique = 'CNIC already in use';
          } else if (result.notificationVar === 'username') {
            this.usernameNotUnique = 'User Name already in use';
          } else if (result.notificationVar === 'phonenum') {
            this.phoneNumNotUnique = 'Phone Num already in use';
          }
        } else {
          if (check_info === 'p_email') {
            this.emailNotUnique = '';
          } else if (check_info === 'p_cnic') {
            this.cnicNotUnique = '';
          } else if (check_info === 'p_username') {
            this.usernameNotUnique = '';
          } else {
            this.phoneNumNotUnique = '';
          }

          console.log(result.msg);
          this.updateBtnDisable = false;
        }
      });
    }
  }

  /********************** set guardian phone number from father phone number */
  setGuardianPhoneNumber(phoneNumber)
  {
    this.guardian_phoneNum = phoneNumber;
    
    
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

  //admin wants to change parent
  onChangecheckParentGuardianCnic(){
    delete this.parentGuardianNameText;
    delete this.parent_name;
    this.showVerifyButton = false;
    delete this.std_parentId;
    this.stud_parentCnicNumber = '';
  }

  show_parent_detail(primary_parent_type,parent_detail,mother_detail,guardian_detail){
      if(primary_parent_type=='father'){
          return parent_detail
      }
      else if(primary_parent_type=='mother'){
          return mother_detail
      }
      else{
          return guardian_detail
      }
  }

}
