import { Component, ElementRef, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Md5 } from 'ts-md5/dist/md5';
import { UsersService } from './users.service';
import { GlobalService } from '../shared/services/global.service';
import { ViewChild } from '@angular/core';
import { CommonService } from '../shared/services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersService, GlobalService, CommonService]
})
export class UsersComponent implements OnInit {
  // reset image filed after submit
  @ViewChild('imageFile')
  myInputVariable: ElementRef;

  public imagePath = 'assets/images/student_2.png ';

  // default
  public loadData;
  public pageSize = 10;
  public pageNumber = 1;

  public admin_level: any;

  // add user variables
  public c_password: any;
  public u_password: any;
  public u_email = '';
  public u_name = '';

  public u_phoneNum: number;
  public u_role: number;
  public admin_image;

  // update user variables

  public u_nameU = '';
  public u_emailU = '';
  public u_phoneNumU = '';
  public u_roleU: any;
  public u_status: number;
  public login_id: number;
  public existing_email = '';
  public c_passwordU = '';
  public u_passwordU = '';

  // notifications variables
  public confirmPassCheck = false;
  public confirmPassMatch = false;
  public disableBtn = false;
  // update
  public disableUBtn = false;
  public confirmPassCheckU = false;
  public confirmPassMatchU = false;

  // array
  public usersData: Array<any>;
  public filesToUpload: Array<File> = [];

  constructor(
    private _globalService: GlobalService,
    private _usersService: UsersService,
    private _commonService: CommonService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    // get admin level
    this.admin_level = localStorage.getItem('admin_level');
    this.get_userDetails();
  }

  // *********************************************************************************************************************** */
  /**********************************************************Read Data from DB Methods************************************** */
  // *********************************************************************************************************************** */

  // ********************************************************** **********/
  // ************************* get user data ***************************/
  // ******************************************************************* */
  public get_userDetails() {
    this._usersService.get_userDetailsF().subscribe(result => {
      if (result.status === 1) {
        this.usersData = result.data;
      } else if (result.status === 0) {
        this._commonService.warningToaster(result.msg, 'Failed!');
      } else if (result.status === 403) {
        this._commonService.warningToaster('Login Session Expired', 'Login!');
        this._globalService.logoutFun();
      } else {
        this._commonService.errorToaster(result.msg, 'Failed!');
      }
    });
  }

  // *********************************************************************************************************************** */
  /**********************************************************Add Update  Data  Methods************************************** */
  // *********************************************************************************************************************** */

  // ********************************************************** **********/
  // *********************** Add new User ************************/
  // ******************************************************************* */

  public onSubmitAddUser(submitedEvent) {
    // get admin image
    const imagesData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    // console.log(files);

    for (let i = 0; i < files.length; i++) {
      imagesData.append('uploads[]', files[i], files[i]['name']);
    }

    const eventHandler = submitedEvent.value;
    const hash_pass = Md5.hashStr(eventHandler.u_password);

    const user_data = {
      user_name: eventHandler.u_name,
      user_email: eventHandler.u_email,
      user_password: hash_pass,
      phone_num: eventHandler.u_phoneNum,
      user_level: Number(eventHandler.u_role)
    };

    this._usersService.add_newUserF(user_data).subscribe(result => {
      if (result.status === 1) {
        const id = JSON.stringify(result.inserted_id);
        imagesData.append('id', id); // admin id
        imagesData.append('tbl_name', 'tbl_users'); //
        imagesData.append('source', 'admin');

        // add admin images

        this._commonService.add_images(imagesData).subscribe(resp_result => {
          this.filesToUpload = [];
        });

        this._commonService.successToaster('Added Successfully', 'Success!');
        submitedEvent.reset();
        this.get_userDetails();
      } else if (result.status === 3) {
        this._commonService.warningToaster(result.msg, 'Failed!');
      } else if (result.status === 403) {
        this._commonService.warningToaster('Login Session Expired', 'Failed!');
        this._globalService.logoutFun();
      } else {
        swal('Failed!', result.msg, 'error');
        this._commonService.errorToaster(result.msg, 'Failed!');
      }
    });
  }

  // ************************************************************************************************************* */
  /*********************************************Store Images in Array******************************** */
  // ************************************************************************************************************* */

  public fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    // this.product.photo = fileInput.target.files[0]['name'];
  }

  // ********************************************************** **********/
  // *********************** Update  User ************************/
  // ******************************************************************* */

  public onSubmitUpdateUser(submitEvent) {
    const user_data = submitEvent.value;
    const login_id = user_data.login_id;
    let update_data;
    let flag = 0;

    if (typeof user_data.u_passwordU !== 'undefined') {
      flag = 1;
      const hash_pass = Md5.hashStr(submitEvent.value.u_passwordU);

      update_data = {
        user_email: user_data.u_emailU,
        user_name: user_data.u_nameU,
        phone_num: user_data.u_phoneNumU,
        user_level: user_data.u_roleU,
        status: user_data.u_status,
        existing_email: this.existing_email,
        user_password: hash_pass
      };
    } else {
      update_data = {
        user_email: user_data.u_emailU,
        user_name: user_data.u_nameU,
        phone_num: user_data.u_phoneNumU,
        user_level: user_data.u_roleU,
        status: user_data.u_status,
        existing_email: this.existing_email
      };
    }

    this._usersService
      .updateUserInfo(update_data, login_id)
      .subscribe(result => {
        if (result.status === 1) {
          this._commonService.successToaster(
            'Updated Successfully',
            'Success!'
          );
          if (flag === 1) {
            // if admin is logged in and change password then logout

            const loggedInUserId = Number(localStorage.getItem('id'));
            // logout the user of their password is changed
            if (login_id === loggedInUserId) {
              setTimeout(() => {
                this._globalService.logoutFun();
              }, 3000);
            }
          }
          this.get_userDetails();
        } else if (result.status === 3) {
          this._commonService.warningToaster(result.msg, 'Failed!');
        } else if (result.status === 403) {
          this._commonService.warningToaster(
            'Login Session Expired',
            'Failed!'
          );
          this._globalService.logoutFun();
        } else {
          swal('Failed!', result.msg, 'error');
          this._commonService.errorToaster(result.msg, 'Failed!');
        }
      });
  }

  // ********************************************************** **********/
  // *********************** Update  User Password ************************/
  // ******************************************************************* */

  public onSubmitUptPass(submitEvent) {
    const hash_pass = Md5.hashStr(submitEvent.value.u_passwordU);
    const passwordData = {
      login_id: this.login_id,
      user_password: hash_pass
    };

    this._usersService.update_userPassword(passwordData).subscribe(result => {
      if (result.status === 1) {
        this._commonService.successToaster(
          'Password Updated successfully',
          'Success!'
        );
        this.get_userDetails();

        const loggedInUserId = Number(localStorage.getItem('id'));
        // logout the user of their password is changed
        if (this.login_id === loggedInUserId) {
          setTimeout(() => {
            this._globalService.logoutFun();
          }, 3000);
        }
      } else if (result.status === 403) {
        this._commonService.warningToaster(
          'Login Session Expired',
          'Login Required!'
        );
        this._globalService.logoutFun();
      } else {
        this._commonService.warningToaster(result.msg, 'Failed');
      }
    });
  }

  // ********************************************************** **********/
  // *********************** Delete Admin ************************/
  // ******************************************************************* */

  public deleteUser(user_id) {
    const user = {
      user_id: user_id
    };

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
        this._usersService.deleteAdmin(user).subscribe(data => {
          if (data.status === 1) {
            this.get_userDetails(); // load admin data after deleting data
            this._commonService.successToaster(
              'Admin has been deleted.',
              'Deleted'
            );
          } else {
            this._commonService.errorToaster('Some error try again.', 'Error!');
          }
        });
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

  /********************************* pagination Info ****************************/
  public pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

  // ************ check password and confirm password
  public checkConfirmPass(c_pass, pass) {
    this.confirmPassCheck = true;
    if (c_pass === pass) {
      this.confirmPassCheck = false;
      this.confirmPassMatch = true;
      this.disableBtn = false;
    } else {
      this.confirmPassCheck = true;
      this.confirmPassMatch = false;
      this.disableBtn = true;
    }
  }

  // ************ check password and confirm password on update
  public checkConfirmPassOnUpdate(c_pass, pass) {
    this.confirmPassCheckU = true;
    if (c_pass === pass) {
      this.confirmPassCheckU = false;
      this.confirmPassMatchU = true;
      this.disableUBtn = false;
    } else {
      this.confirmPassCheckU = true;
      this.confirmPassMatchU = false;
      this.disableUBtn = true;
    }
  }

  // ************ open edit model ************
  public openEditUserModal(modal, arrayIndex) {
    this.confirmPassCheckU = false;
    this.confirmPassMatchU = false;
    this.c_passwordU = '';
    this.u_passwordU = '';

    let userDataString = null;
    userDataString = this.usersData[arrayIndex];
    this.u_nameU = userDataString.user_name;
    this.u_emailU = userDataString.user_email;
    this.u_phoneNumU = userDataString.phone_num;
    this.u_roleU = userDataString.user_level;
    this.u_status = userDataString.status;
    this.login_id = userDataString.login_id;

    // for checking email while updating query
    this.existing_email = userDataString.user_email;

    this.openNgModal(modal, 'lg');
  }

  // open update modal
  public openModal(modal) {
    modal.open();
  }

  // close model
  public closeModal(modal) {
    modal.close();
  }
}
