(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["users-users-module"],{

/***/ "./src/app/users/users.component.html":
/*!********************************************!*\
  !*** ./src/app/users/users.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n\r\n    <div class=\"col-lg-12 grid-margin stretch-card\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h4 class=\"card-title\">User Details</h4>\r\n\r\n\r\n                <div class=\"row\" style=\"padding-bottom: 1em; margin-top:-2em\">\r\n\r\n\r\n                    <div class=\"col-lg-10 \">\r\n\r\n                    </div>\r\n\r\n                    <div class=\"col-lg-2 pull-right \">\r\n\r\n                        <button _ngcontent-c2=\"\" (click)=\"openNgModal(addUserModal , 'lg')\" class=\"btn btn-success btn-block\">New\r\n              User\r\n              <i _ngcontent-c2=\"\" class=\"mdi mdi-plus\"></i></button>\r\n                    </div>\r\n                    <div style=\"text-align: center;\">\r\n\r\n                    </div>\r\n\r\n                </div>\r\n\r\n\r\n                <div class=\"table-responsive\">\r\n\r\n                    <table class=\"table table-bordered table-hover\">\r\n                        <thead class=\"thead-light\">\r\n                            <tr>\r\n                                <th># </th>\r\n                                <!-- <th>Admin</th> -->\r\n                                <th> Name </th>\r\n                                <th>Email </th>\r\n                                <th>Phone </th>\r\n                                <th>Status </th>\r\n                                <th>Role </th>\r\n\r\n                                <th *ngIf=\"(admin_level == 1)\">Actions</th>\r\n                            </tr>\r\n                        </thead>\r\n\r\n                        <tbody>\r\n                            <tr *ngFor=\"let item of usersData | paginate: { id: 'pager', itemsPerPage: pageSize, currentPage: pageNumber};let index = index\">\r\n                                <td>{{index + 1}}</td>\r\n                                <!-- <td> <img src=\"{{item.thumb_path == '' || NULL ? imagePath : item.thumb_path }}\"\r\n                            class=\"rounded-circle dropdown-toggle\" width=\"30px\" data-toggle=\"dropdown\" alt=\"avatar\"\r\n                            style=\" border-radius: 50%;\"> -->\r\n\r\n                                <!-- <img [src]=\"item.thumb_path == \"\" || null ? 'avatar' : item.thumb_path\" height=\"200\" /> -->\r\n\r\n                                <!-- </td> -->\r\n                                <td>{{item.user_name}}</td>\r\n                                <td>{{item.user_email}}</td>\r\n                                <td>{{ item.phone_num}}</td>\r\n                                <td>{{ item.status == '1' ? 'Active' : 'Inactive'}}</td>\r\n                                <td>{{ item.user_level == '1' ? 'Super Admin' : (item.user_level == '2' ? 'Admin' : 'Staff')}}</td>\r\n\r\n                                <td *ngIf=\"(admin_level == 1)\">\r\n\r\n                                    <label class=\"badge badge-info\" (click)=openEditUserModal(updateUserModal,index) style=\"cursor: pointer;\">Edit</label>\r\n                                    <label *ngIf=\"(item.user_level != 1)\" class=\"badge badge-danger\" (click)=deleteUser(item.login_id) style=\"cursor: pointer; margin-left: 1em;\">Delete</label>\r\n\r\n\r\n\r\n                                </td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n\r\n                    <div style=\"text-align: center ; margin-top: 2em;\">\r\n                        <form class=\"pagination-wrapper\">\r\n                            <div class=\"form-group pages\">\r\n                                <pagination-controls class=\"my-pagination\" id=\"pager\" (pageChange)=\"pageChanged($event)\" maxSize=\"10\" directionLinks=\"true\" autoHide=\"true\" previousLabel=\"Prev\" nextLabel=\"Next\" screenReaderPaginationLabel=\"Pagination\" screenReaderPageLabel=\"page\" screenReaderCurrentLabel=\"You're on page\">\r\n                                </pagination-controls>\r\n                            </div>\r\n\r\n                        </form>\r\n                    </div>\r\n\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</div>\r\n\r\n\r\n<!-- add user modal  -->\r\n\r\n\r\n<ng-template #addUserModal let-modal>\r\n    <div class=\"modal-header\">\r\n        <div style=\"text-align: center\">\r\n            <h3>Add New User</h3>\r\n        </div>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n    </div>\r\n     <form class=\"form-group\" #adduser=\"ngForm\" (ngSubmit)=\"onSubmitAddUser(adduser)\">\r\n    <div class=\"modal-body\">\r\n\r\n            <div class=\"row\">\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:0em;\">Name * <span style=\"color:red;\"\r\n              *ngIf=\"!pickedUname.valid && pickedUname.touched\"><small>\r\n                User Name Required</small> </span></label>\r\n                    <input type=\"text\" required style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"u_name\" placeholder=\"Name\" [(ngModel)]=\"u_name\" #pickedUname=\"ngModel\">\r\n                </div>\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:0em;\"> Email * <span style=\"color:red;\"\r\n              *ngIf=\"!pickedUemail.valid && pickedUemail.touched\"><small>\r\n                Email Required</small> </span></label>\r\n                    <input type=\"email\" required style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"u_email\" placeholder=\" Email\" [(ngModel)]=\"u_email\" #pickedUemail=\"ngModel\">\r\n                </div>\r\n\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:0em;\">Password * <small>\r\n            </small> <span style=\"color:red;\" *ngIf=\"!pickedpassw.valid && pickedpassw.touched\"><small>\r\n                Password Required</small>\r\n            </span></label>\r\n                    <input type=\"password\" #pass style=\"margin-top:0em;\" class=\"form-control fm-control\" required name=\"u_password\" placeholder=\"Password\" [(ngModel)]=\"u_password\" #pickedpassw=\"ngModel\">\r\n                </div>\r\n\r\n\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:0em;\">Confirm Password * <small>\r\n            </small> <span style=\"color:red;\" *ngIf=\"!pickedCpassw.valid && pickedCpassw.touched\"><small>\r\n                Confirm Password Required</small> </span> <span style=\"color:red;\" *ngIf=\"confirmPassCheck\"><small>\r\n                Not Matching</small>\r\n            </span>\r\n            <span style=\"color:green;\" *ngIf=\"confirmPassMatch\"><small>\r\n                Password Matching</small>\r\n            </span>\r\n          </label>\r\n                    <input type=\"password\" #confirmPass (keyup)=\"checkConfirmPass(confirmPass.value,pass.value)\" style=\"\r\n                    margin-top:0em;\" class=\"form-control fm-control\" required name=\"c_password\" placeholder=\"Confirm Password\" [(ngModel)]=\"c_password\" #pickedCpassw=\"ngModel\">\r\n                </div>\r\n\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:0em;\">Phone Number <span style=\"color:red;\"\r\n              *ngIf=\"!pickedPphoneNum.valid && pickedPphoneNum.touched\"><small>\r\n                PhoneNumber Required</small>\r\n            </span></label>\r\n                    <input type=\"number\" style=\"margin-top:0em;\" required class=\"form-control fm-control\" name=\"u_phoneNum\" placeholder=\"Phone Number\" [(ngModel)]=\"u_phoneNum\" #pickedPphoneNum=\"ngModel\">\r\n                </div>\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:0em;\">User Role * </label>\r\n                    <span style=\"color:red;\" *ngIf=\"!pickedRoll.valid && pickedRoll.touched\"><small>\r\n              Role Required</small>\r\n          </span>\r\n                    <select class=\"form-control fm-control\" required #pickedRoll=\"ngModel\" style=\"margin-top:0em;\" [(ngModel)]=\"u_role\" name=\"u_role\">\r\n            <option [ngValue]=\"undefined\" disabled>Select Role</option>\r\n            <option value=\"1\">Super Admin</option>\r\n            <option value=\"2\">Admin</option>\r\n            <option value=\"3\">Staff</option>\r\n          </select>\r\n                </div>\r\n                <div class=\"col-md-4 form-group\">\r\n                    <!-- <label class=\"control-label\" style=\"margin-top:0em;\">Image </label> -->\r\n                    <input id=\"admin_image\" style=\"margin-top:0em;\" #imageFile accept=\"image/*\" name=\"admin_image\" type=\"hidden\" (change)=\"fileChangeEvent($event)\" class=\"form-control fm-control\" placeholder=\"Upload a picture...\" />\r\n                </div>\r\n\r\n            </div>\r\n\r\n\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n      <input type=\"submit\" class=\"btn btn-info\"  [disabled]=\"!adduser.form.valid || disableBtn\" value=\"Add New User\">\r\n        <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n    </div>\r\n    </form>\r\n</ng-template>\r\n\r\n\r\n\r\n\r\n\r\n<!-- Update Parent  -->\r\n\r\n\r\n\r\n\r\n<ng-template #updateUserModal let-modal>\r\n    <div class=\"modal-header\">\r\n        <div style=\"text-align: center\">\r\n            <h3>Update User Info</h3>\r\n        </div>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n    </div>\r\n     <form class=\"form-group\" #updateuser=\"ngForm\" (ngSubmit)=\"onSubmitUpdateUser(updateuser)\">\r\n    <div class=\"modal-body\">\r\n\r\n            <div class=\"row\">\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:.5em;\">Name * <span style=\"color:red;\"\r\n              *ngIf=\"!pickedUnameU.valid && pickedUnameU.touched\"><small>\r\n                User Name Required</small> </span></label>\r\n                    <input type=\"text\" required style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"u_nameU\" placeholder=\"Name\" [(ngModel)]=\"u_nameU\" #pickedUnameU=\"ngModel\">\r\n                </div>\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:.5em;\"> Email * <span style=\"color:red;\"\r\n              *ngIf=\"!pickedUemailU.valid && pickedUemailU.touched\"><small>\r\n                Email Required</small> </span></label>\r\n                    <input type=\"email\" required style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"u_emailU\" placeholder=\" Email\" [(ngModel)]=\"u_emailU\" #pickedUemailU=\"ngModel\">\r\n                </div>\r\n\r\n\r\n\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:1em;\">Phone Number <span style=\"color:red;\"\r\n              *ngIf=\"!pickedPphoneNumU.valid && pickedPphoneNumU.touched\"><small>\r\n                PhoneNumber Required</small>\r\n            </span></label>\r\n                    <input type=\"number\" style=\"margin-top:0em;\" required class=\"form-control fm-control\" name=\"u_phoneNumU\" placeholder=\"Phone Number\" [(ngModel)]=\"u_phoneNumU\" #pickedPphoneNumU=\"ngModel\">\r\n                </div>\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:1em;\">User Role * </label>\r\n                    <span style=\"color:red;\" *ngIf=\"!pickedRollU.valid && pickedRollU.touched\"><small>\r\n              Role Required</small>\r\n          </span>\r\n                    <select class=\"form-control fm-control\" required #pickedRollU=\"ngModel\" style=\"margin-top:0em;\" [(ngModel)]=\"u_roleU\" name=\"u_roleU\">\r\n            <option [ngValue]=\"undefined\" disabled>Select Role</option>\r\n            <option value=\"1\">Super Admin</option>\r\n            <option value=\"2\">Admin</option>\r\n            <option value=\"3\">Staff</option>\r\n          </select>\r\n                </div>\r\n\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:1em;\">User Status * </label>\r\n                    <span style=\"color:red;\" *ngIf=\"!pickedstatusU.valid && pickedstatusU.touched\"><small>\r\n              Status Required</small>\r\n          </span>\r\n                    <select class=\"form-control fm-control\" required #pickedstatusU=\"ngModel\" style=\"margin-top:0em;\" [(ngModel)]=\"u_status\" name=\"u_status\">\r\n            <option [ngValue]=\"undefined\" disabled>Select Status</option>\r\n            <option value=\"1\">Active</option>\r\n            <option value=\"2\">Inactive</option>\r\n\r\n          </select>\r\n                </div>\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:1em;\">Password <small>\r\n            </small> <span style=\"color:red;\" *ngIf=\"!pickedUpassw.valid && pickedUpassw.touched\"><small>\r\n                Password Required</small>\r\n            </span></label>\r\n                    <input type=\"password\" #passU style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"u_passwordU\" placeholder=\"Password\" [(ngModel)]=\"u_passwordU\" #pickedUpassw=\"ngModel\">\r\n                </div>\r\n\r\n\r\n                <input type=\"hidden\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"login_id\" [(ngModel)]=\"login_id\">\r\n\r\n            </div>\r\n\r\n\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n       <input type=\"submit\" class=\"btn btn-info\"  [disabled]=\"!updateuser.form.valid || disableBtn\" value=\"Update User\">\r\n\r\n        <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n    </div>\r\n      </form>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./src/app/users/users.component.scss":
/*!********************************************!*\
  !*** ./src/app/users/users.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/users/users.component.ts":
/*!******************************************!*\
  !*** ./src/app/users/users.component.ts ***!
  \******************************************/
/*! exports provided: UsersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersComponent", function() { return UsersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ts_md5_dist_md5__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ts-md5/dist/md5 */ "./node_modules/ts-md5/dist/md5.js");
/* harmony import */ var ts_md5_dist_md5__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ts_md5_dist_md5__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _users_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./users.service */ "./src/app/users/users.service.ts");
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/services/global.service */ "./src/app/shared/services/global.service.ts");
/* harmony import */ var _shared_services_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/services/common.service */ "./src/app/shared/services/common.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var UsersComponent = /** @class */ (function () {
    function UsersComponent(_globalService, _usersService, _commonService, modalService) {
        this._globalService = _globalService;
        this._usersService = _usersService;
        this._commonService = _commonService;
        this.modalService = modalService;
        this.imagePath = 'assets/images/student_2.png ';
        this.pageSize = 10;
        this.pageNumber = 1;
        this.u_email = '';
        this.u_name = '';
        // update user variables
        this.u_nameU = '';
        this.u_emailU = '';
        this.u_phoneNumU = '';
        this.existing_email = '';
        this.c_passwordU = '';
        this.u_passwordU = '';
        // notifications variables
        this.confirmPassCheck = false;
        this.confirmPassMatch = false;
        this.disableBtn = false;
        // update
        this.disableUBtn = false;
        this.confirmPassCheckU = false;
        this.confirmPassMatchU = false;
        this.filesToUpload = [];
    }
    UsersComponent.prototype.ngOnInit = function () {
        // get admin level
        this.admin_level = localStorage.getItem('admin_level');
        this.get_userDetails();
    };
    // *********************************************************************************************************************** */
    /**********************************************************Read Data from DB Methods************************************** */
    // *********************************************************************************************************************** */
    // ********************************************************** **********/
    // ************************* get user data ***************************/
    // ******************************************************************* */
    UsersComponent.prototype.get_userDetails = function () {
        var _this = this;
        this._usersService.get_userDetailsF().subscribe(function (result) {
            if (result.status === 1) {
                _this.usersData = result.data;
            }
            else if (result.status === 0) {
                _this._commonService.warningToaster(result.msg, 'Failed!');
            }
            else if (result.status === 403) {
                _this._commonService.warningToaster('Login Session Expired', 'Login!');
                _this._globalService.logoutFun();
            }
            else {
                _this._commonService.errorToaster(result.msg, 'Failed!');
            }
        });
    };
    // *********************************************************************************************************************** */
    /**********************************************************Add Update  Data  Methods************************************** */
    // *********************************************************************************************************************** */
    // ********************************************************** **********/
    // *********************** Add new User ************************/
    // ******************************************************************* */
    UsersComponent.prototype.onSubmitAddUser = function (submitedEvent) {
        var _this = this;
        // get admin image
        var imagesData = new FormData();
        var files = this.filesToUpload;
        // console.log(files);
        for (var i = 0; i < files.length; i++) {
            imagesData.append('uploads[]', files[i], files[i]['name']);
        }
        var eventHandler = submitedEvent.value;
        var hash_pass = ts_md5_dist_md5__WEBPACK_IMPORTED_MODULE_2__["Md5"].hashStr(eventHandler.u_password);
        var user_data = {
            user_name: eventHandler.u_name,
            user_email: eventHandler.u_email,
            user_password: hash_pass,
            phone_num: eventHandler.u_phoneNum,
            user_level: Number(eventHandler.u_role)
        };
        this._usersService.add_newUserF(user_data).subscribe(function (result) {
            if (result.status === 1) {
                var id = JSON.stringify(result.inserted_id);
                imagesData.append('id', id); // admin id
                imagesData.append('tbl_name', 'tbl_users'); //
                imagesData.append('source', 'admin');
                // add admin images
                _this._commonService.add_images(imagesData).subscribe(function (resp_result) {
                    _this.filesToUpload = [];
                });
                _this._commonService.successToaster('Added Successfully', 'Success!');
                submitedEvent.reset();
                _this.get_userDetails();
            }
            else if (result.status === 3) {
                _this._commonService.warningToaster(result.msg, 'Failed!');
            }
            else if (result.status === 403) {
                _this._commonService.warningToaster('Login Session Expired', 'Failed!');
                _this._globalService.logoutFun();
            }
            else {
                sweetalert2__WEBPACK_IMPORTED_MODULE_1___default()('Failed!', result.msg, 'error');
                _this._commonService.errorToaster(result.msg, 'Failed!');
            }
        });
    };
    // ************************************************************************************************************* */
    /*********************************************Store Images in Array******************************** */
    // ************************************************************************************************************* */
    UsersComponent.prototype.fileChangeEvent = function (fileInput) {
        this.filesToUpload = fileInput.target.files;
        // this.product.photo = fileInput.target.files[0]['name'];
    };
    // ********************************************************** **********/
    // *********************** Update  User ************************/
    // ******************************************************************* */
    UsersComponent.prototype.onSubmitUpdateUser = function (submitEvent) {
        var _this = this;
        var user_data = submitEvent.value;
        var login_id = user_data.login_id;
        var update_data;
        var flag = 0;
        if (typeof user_data.u_passwordU !== 'undefined') {
            flag = 1;
            var hash_pass = ts_md5_dist_md5__WEBPACK_IMPORTED_MODULE_2__["Md5"].hashStr(submitEvent.value.u_passwordU);
            update_data = {
                user_email: user_data.u_emailU,
                user_name: user_data.u_nameU,
                phone_num: user_data.u_phoneNumU,
                user_level: user_data.u_roleU,
                status: user_data.u_status,
                existing_email: this.existing_email,
                user_password: hash_pass
            };
        }
        else {
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
            .subscribe(function (result) {
            if (result.status === 1) {
                _this._commonService.successToaster('Updated Successfully', 'Success!');
                if (flag === 1) {
                    // if admin is logged in and change password then logout
                    var loggedInUserId = Number(localStorage.getItem('id'));
                    // logout the user of their password is changed
                    if (login_id === loggedInUserId) {
                        setTimeout(function () {
                            _this._globalService.logoutFun();
                        }, 3000);
                    }
                }
                _this.get_userDetails();
            }
            else if (result.status === 3) {
                _this._commonService.warningToaster(result.msg, 'Failed!');
            }
            else if (result.status === 403) {
                _this._commonService.warningToaster('Login Session Expired', 'Failed!');
                _this._globalService.logoutFun();
            }
            else {
                sweetalert2__WEBPACK_IMPORTED_MODULE_1___default()('Failed!', result.msg, 'error');
                _this._commonService.errorToaster(result.msg, 'Failed!');
            }
        });
    };
    // ********************************************************** **********/
    // *********************** Update  User Password ************************/
    // ******************************************************************* */
    UsersComponent.prototype.onSubmitUptPass = function (submitEvent) {
        var _this = this;
        var hash_pass = ts_md5_dist_md5__WEBPACK_IMPORTED_MODULE_2__["Md5"].hashStr(submitEvent.value.u_passwordU);
        var passwordData = {
            login_id: this.login_id,
            user_password: hash_pass
        };
        this._usersService.update_userPassword(passwordData).subscribe(function (result) {
            if (result.status === 1) {
                _this._commonService.successToaster('Password Updated successfully', 'Success!');
                _this.get_userDetails();
                var loggedInUserId = Number(localStorage.getItem('id'));
                // logout the user of their password is changed
                if (_this.login_id === loggedInUserId) {
                    setTimeout(function () {
                        _this._globalService.logoutFun();
                    }, 3000);
                }
            }
            else if (result.status === 403) {
                _this._commonService.warningToaster('Login Session Expired', 'Login Required!');
                _this._globalService.logoutFun();
            }
            else {
                _this._commonService.warningToaster(result.msg, 'Failed');
            }
        });
    };
    // ********************************************************** **********/
    // *********************** Delete Admin ************************/
    // ******************************************************************* */
    UsersComponent.prototype.deleteUser = function (user_id) {
        var _this = this;
        var user = {
            user_id: user_id
        };
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default()({
            title: 'Are you sure?',
            text: 'You wont be able to revert this!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function (result) {
            if (result.value) {
                // if user confirm then call delete API
                _this._usersService.deleteAdmin(user).subscribe(function (data) {
                    if (data.status === 1) {
                        _this.get_userDetails(); // load admin data after deleting data
                        _this._commonService.successToaster('Admin has been deleted.', 'Deleted');
                    }
                    else {
                        _this._commonService.errorToaster('Some error try again.', 'Error!');
                    }
                });
            }
        });
    };
    // ************************************************************************************************************* */
    /*********************************************General   Methods************************************************ */
    // ************************************************************************************************************* */
    // new modal
    UsersComponent.prototype.openNgModal = function (content, size) {
        this.modalService.open(content, { size: size });
    };
    /********************************* pagination Info ****************************/
    UsersComponent.prototype.pageChanged = function (pN) {
        this.pageNumber = pN;
    };
    // ************ check password and confirm password
    UsersComponent.prototype.checkConfirmPass = function (c_pass, pass) {
        this.confirmPassCheck = true;
        if (c_pass === pass) {
            this.confirmPassCheck = false;
            this.confirmPassMatch = true;
            this.disableBtn = false;
        }
        else {
            this.confirmPassCheck = true;
            this.confirmPassMatch = false;
            this.disableBtn = true;
        }
    };
    // ************ check password and confirm password on update
    UsersComponent.prototype.checkConfirmPassOnUpdate = function (c_pass, pass) {
        this.confirmPassCheckU = true;
        if (c_pass === pass) {
            this.confirmPassCheckU = false;
            this.confirmPassMatchU = true;
            this.disableUBtn = false;
        }
        else {
            this.confirmPassCheckU = true;
            this.confirmPassMatchU = false;
            this.disableUBtn = true;
        }
    };
    // ************ open edit model ************
    UsersComponent.prototype.openEditUserModal = function (modal, arrayIndex) {
        this.confirmPassCheckU = false;
        this.confirmPassMatchU = false;
        this.c_passwordU = '';
        this.u_passwordU = '';
        var userDataString = null;
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
    };
    // open update modal
    UsersComponent.prototype.openModal = function (modal) {
        modal.open();
    };
    // close model
    UsersComponent.prototype.closeModal = function (modal) {
        modal.close();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('imageFile'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], UsersComponent.prototype, "myInputVariable", void 0);
    UsersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-users',
            template: __webpack_require__(/*! ./users.component.html */ "./src/app/users/users.component.html"),
            styles: [__webpack_require__(/*! ./users.component.scss */ "./src/app/users/users.component.scss")],
            providers: [_users_service__WEBPACK_IMPORTED_MODULE_3__["UsersService"], _shared_services_global_service__WEBPACK_IMPORTED_MODULE_4__["GlobalService"], _shared_services_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"]]
        }),
        __metadata("design:paramtypes", [_shared_services_global_service__WEBPACK_IMPORTED_MODULE_4__["GlobalService"],
            _users_service__WEBPACK_IMPORTED_MODULE_3__["UsersService"],
            _shared_services_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModal"]])
    ], UsersComponent);
    return UsersComponent;
}());



/***/ }),

/***/ "./src/app/users/users.module.ts":
/*!***************************************!*\
  !*** ./src/app/users/users.module.ts ***!
  \***************************************/
/*! exports provided: UsersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersModule", function() { return UsersModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _users_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./users.routing */ "./src/app/users/users.routing.ts");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng2-select */ "./node_modules/ng2-select/index.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ng2_select__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-modal */ "./node_modules/ngx-modal/index.js");
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ngx_modal__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _users_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./users.component */ "./src/app/users/users.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








/* components */

var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                ngx_pagination__WEBPACK_IMPORTED_MODULE_3__["NgxPaginationModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"],
                ng2_select__WEBPACK_IMPORTED_MODULE_4__["SelectModule"],
                ngx_modal__WEBPACK_IMPORTED_MODULE_5__["ModalModule"],
                _users_routing__WEBPACK_IMPORTED_MODULE_2__["routing"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"].forRoot()
            ],
            declarations: [_users_component__WEBPACK_IMPORTED_MODULE_8__["UsersComponent"]]
        })
    ], UsersModule);
    return UsersModule;
}());



/***/ }),

/***/ "./src/app/users/users.routing.ts":
/*!****************************************!*\
  !*** ./src/app/users/users.routing.ts ***!
  \****************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _users_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./users.component */ "./src/app/users/users.component.ts");


var childRoutes = [
    {
        path: '',
        component: _users_component__WEBPACK_IMPORTED_MODULE_1__["UsersComponent"]
    }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(childRoutes);


/***/ }),

/***/ "./src/app/users/users.service.ts":
/*!****************************************!*\
  !*** ./src/app/users/users.service.ts ***!
  \****************************************/
/*! exports provided: UsersService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersService", function() { return UsersService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/services/global.service */ "./src/app/shared/services/global.service.ts");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UsersService = /** @class */ (function () {
    function UsersService(http, _globalService) {
        this.http = http;
        this._globalService = _globalService;
        this.serverLink = this._globalService.constants.serverLink;
        this.headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"](this._globalService.constants.headers);
    }
    // *********************** Call  API to add new users *****************************
    UsersService.prototype.add_newUserF = function (new_user_data) {
        return this.http
            .post(this.serverLink + 'add/new_user', new_user_data, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *********************** Call  API to get all users *****************************
    UsersService.prototype.get_userDetailsF = function () {
        return this.http
            .get(this.serverLink + 'get/user_data', {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *********************** Call  API to update users *****************************
    UsersService.prototype.updateUserInfo = function (update_data, login_id) {
        return this.http
            .put(this.serverLink + 'update/update_userInfo/' + login_id, update_data, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *********************** Update Password *****************************
    UsersService.prototype.update_userPassword = function (passwordData) {
        return this.http
            .put(this.serverLink + 'update/userPassword', passwordData, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.deleteAdmin = function (user) {
        return this.http
            .post(this.serverLink + 'delete/user', user, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    UsersService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__["GlobalService"]])
    ], UsersService);
    return UsersService;
}());



/***/ })

}]);
//# sourceMappingURL=users-users-module.js.map