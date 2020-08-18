(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["announcements-announcements-module"],{

/***/ "./src/app/announcements/announcements.component.html":
/*!************************************************************!*\
  !*** ./src/app/announcements/announcements.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-md-12 grid-margin stretch-card\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <div class=\"row\">\r\n\r\n                    <div class=\"col-lg-9 col-md-9\">\r\n                        <h4 class=\"card-title\">Announcements Management</h4>\r\n                    </div>\r\n\r\n                    <div class=\"col-lg-3\" style=\"padding-bottom: 1.5em;\">\r\n\r\n                        <button _ngcontent-c2=\"\" (click)=\"openNgModal(addAnnouncModel , 'md')\" class=\"btn btn-success btn-block\">Add Announcement\r\n                            <i _ngcontent-c2=\"\" class=\"mdi mdi-plus\"></i></button>\r\n                    </div>\r\n                </div>\r\n\r\n                <ngb-tabset class=\"tab-solid tab-solid-primary\">\r\n                    <ngb-tab>\r\n                        <ng-template ngbTabTitle>\r\n                            Active Announcements\r\n                        </ng-template>\r\n                        <ng-template ngbTabContent>\r\n                            <div class=\"table-responsive\">\r\n                                <table class=\"table table-bordered table-hover\">\r\n                                    <thead class=\"thead-light\">\r\n                                        <tr>\r\n                                            <th>S.No</th>\r\n                                            <th>Title</th>\r\n                                            <th>Description</th>\r\n                                            <th>Announcement Date</th>\r\n\r\n                                            <th *ngIf=\"(admin_level == 1)\">Update</th>\r\n\r\n                                            <th *ngIf=\"(admin_level == 1)\">Delete</th>\r\n                                        </tr>\r\n                                    </thead>\r\n                                    <tbody>\r\n                                        <tr *ngFor=\"let item of activeAnnouncementDetails | paginate: { id: 'pager', itemsPerPage: pageSize, currentPage: pageNumber};let index = index\">\r\n                                            <td>{{index+1}}</td>\r\n                                            <td>{{item.announc_title}}</td>\r\n                                            <td>{{item.announc_details}}</td>\r\n                                            <td>{{item.announcement_date * 1000 | date}}</td>\r\n\r\n                                            <td *ngIf=\"(admin_level == 1)\">\r\n                                                <label class=\"badge badge-info\"\r\n                                                (click)=openUpdateAnnouncModal(updateAnnouncModel,item.announcement_id)\r\n                                                style=\"cursor: pointer;\">Edit</label>\r\n\r\n                                            </td>\r\n                                            <td *ngIf=\"(admin_level == 1)\">\r\n                                                <label class=\"badge badge-danger\"\r\n                                                (click)=onClickDelAnnouncment(item.announcement_id)\r\n                                                style=\"cursor: pointer;\">Delete</label>\r\n\r\n                                            </td>\r\n\r\n                                        </tr>\r\n                                    </tbody>\r\n                                </table>\r\n                            </div>\r\n                        </ng-template>\r\n                    </ngb-tab>\r\n\r\n                    <ngb-tab>\r\n                        <ng-template ngbTabTitle>\r\n                            Expired Announcements\r\n                        </ng-template>\r\n                        <ng-template ngbTabContent>\r\n                            <table class=\"table table-bordered table-hover\">\r\n                                <thead class=\"thead-light\">\r\n                                    <tr>\r\n                                        <th>S.No</th>\r\n                                        <th>Title</th>\r\n                                        <th>Description</th>\r\n                                        <th>Announcement Date</th>\r\n\r\n                                        <th>Status</th>\r\n\r\n                                        <th *ngIf=\"(admin_level == 1)\">Delete</th>\r\n                                    </tr>\r\n                                </thead>\r\n                                <tbody>\r\n                                    <tr *ngFor=\"let item of expiredAnnouncementDetails | paginate: { id: 'pager', itemsPerPage: pageSize, currentPage: pageNumber};let index = index\">\r\n                                        <td>{{index+1}}</td>\r\n                                        <td>{{item.announc_title}}</td>\r\n                                        <td>{{item.announc_details}}</td>\r\n                                        <td>{{item.announcement_date * 1000 | date}}</td>\r\n\r\n                                        <td>\r\n                                            <span style=\"color: red;\">Expired </span>\r\n                                        </td>\r\n\r\n\r\n                                        <td *ngIf=\"(admin_level == 1)\">\r\n                                            <label class=\"badge badge-danger\"\r\n                                            (click)=onClickDelAnnouncment(item.announcement_id)\r\n                                            style=\"cursor: pointer;\">Delete</label>\r\n\r\n                                        </td>\r\n                                    </tr>\r\n                                </tbody>\r\n                            </table>\r\n                        </ng-template>\r\n                    </ngb-tab>\r\n\r\n                </ngb-tabset>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n<!-- *********************************** Modals **************************************** -->\r\n\r\n\r\n<!-- ******** Add Announcement ************ -->\r\n\r\n\r\n<ng-template #addAnnouncModel let-modal>\r\n    <div class=\"modal-header\">\r\n        <div style=\"text-align: center; \">\r\n            <h3>Add Announcement Details</h3>\r\n        </div>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n    </div>\r\n      <form class=\"form-group\" #addannouncement=\"ngForm\" (ngSubmit)=\"add_newAnnouncement(addannouncement)\">\r\n    <div class=\"modal-body\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-12 col-md-12 \" style=\"margin-bottom: -2em;\">\r\n\r\n                    <label class=\"control-label\"> Announcement Title *</label>\r\n\r\n                    <input type=\"text\" required class=\"form-control fm-control\" name=\"announc_title\" placeholder=\"Announcement Title\" [(ngModel)]=\"announc_title\" #pickedAnnouTitle=\"ngModel\">\r\n                    <p class=\"alert alert-danger\" *ngIf=\"!pickedAnnouTitle.valid && pickedAnnouTitle.touched\" style=\"margin-top:1em; margin-left:0em;\">\r\n                        Announcement title is required!\r\n                    </p>\r\n\r\n                    <label class=\"control-label\"> Announcement Description *</label>\r\n\r\n                    <textarea rows=\"4\" cols=\"50\" required class=\"form-control fm-control\" name=\"announc_desc\" [(ngModel)]=\"announc_desc\" #pickedAnnouDesc=\"ngModel\"> </textarea>\r\n                    <p class=\"alert alert-danger\" *ngIf=\"!pickedAnnouDesc.valid && pickedAnnouDesc.touched\" style=\"margin-top:1em; margin-left:0em;\">\r\n                        Announcement description required!\r\n                    </p>\r\n\r\n                    <label class=\"control-label\">Announcement Date * </label>\r\n                    <input type=\"date\" required class=\"form-control fm-control\" name=\"announc_date\" [(ngModel)]=\"announc_date\" #pickedAnnoucDate=\"ngModel\">\r\n                    <p class=\"alert alert-danger\" *ngIf=\"!pickedAnnoucDate.valid && pickedAnnoucDate.touched\" style=\"margin-top:1em; margin-left:0em;\">\r\n                        Announcement Date is required!\r\n                    </p>\r\n\r\n                    <label class=\"control-label\">Announcement Expire Date * </label>\r\n                    <input type=\"date\" required class=\"form-control fm-control\" name=\"announcE_date\" [(ngModel)]=\"announcE_date\" #pickedAnnoucEDate=\"ngModel\">\r\n                    <p class=\"alert alert-danger\" *ngIf=\"!pickedAnnoucEDate.valid && pickedAnnoucEDate.touched\" style=\"margin-top:1em; margin-left:0em;\">\r\n                        Announcement Expire Date is required!\r\n                    </p>\r\n\r\n                    <label class=\"control-label\" style=\"margin-bottom: .5em;\">Announcement For * </label> <span style=\"margin-left: 1em; color: brown;\"><small>*For\r\n              multiple selection click with Ctrl Key</small></span>\r\n\r\n                    <select multiple class=\"form-control fm-control\" required style=\"margin-top:0em;\" [(ngModel)]=\"announc_for\" name=\"announc_for\" #pickedStdGender=\"ngModel\">\r\n            <option [value]=\"999\"> For All Students</option>\r\n            <option *ngFor=\"let item of classdataList\" [value]=\"item.class_id\"> {{item.class_name}}</option>\r\n\r\n            <!-- <option *ngFor=\"#item of myOptions\" [value]=\"item.value\">{{item.name}}</option> -->\r\n          </select>\r\n\r\n\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n       <input type=\"submit\" class=\"btn btn-info\" [disabled]=\"!addannouncement.form.valid\" value=\"Add New Announcement\" >\r\n        <button class=\"btn btn-light\" (click)=\"modal.close()\">close</button>\r\n    </div>\r\n  </form>\r\n</ng-template>\r\n\r\n\r\n\r\n\r\n\r\n<!-- ******** Update Announcement ************ -->\r\n\r\n<ng-template #updateAnnouncModel let-modal>\r\n    <div class=\"modal-header\">\r\n        <div style=\"text-align: center; \">\r\n            <h3>Update Announcement Details</h3>\r\n        </div>\r\n<button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n    </div>\r\n         <form class=\"form-group\" #updateAnnouncement=\"ngForm\" (ngSubmit)=\"onSubmitupdateAnnouncement(updateAnnouncement)\">\r\n    <div class=\"modal-body\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-12 col-md-12 col-sm-12\" style=\"margin-bottom: -2em;\">\r\n\r\n                    <label class=\"control-label\"> Announcement Title *</label>\r\n\r\n                    <input type=\"text\" required class=\"form-control fm-control\" name=\"u_announc_title\" [(ngModel)]=\"u_announc_title\" #pickedUAnnouTitle=\"ngModel\">\r\n                    <p class=\"alert alert-danger\" *ngIf=\"!pickedUAnnouTitle.valid && pickedUAnnouTitle.touched\" style=\"margin-top:1em; margin-left:0em;\">\r\n                        Announcement title is required!\r\n                    </p>\r\n\r\n                    <label class=\"control-label\"> Announcement Description *</label>\r\n\r\n                    <textarea rows=\"4\" cols=\"50\" required class=\"form-control fm-control\" name=\"u_announc_desc\" [(ngModel)]=\"u_announc_desc\" #pickedUAnnouDesc=\"ngModel\"> </textarea>\r\n                    <p class=\"alert alert-danger\" *ngIf=\"!pickedUAnnouDesc.valid && pickedUAnnouDesc.touched\" style=\"margin-top:1em; margin-left:0em;\">\r\n                        Announcement description required!\r\n                    </p>\r\n\r\n\r\n\r\n                    <label class=\"control-label\" style=\"margin-bottom: .5em;\">Announcement For </label> <span style=\"margin-left: 1em; color: brown;\"><small>*For\r\n                multiple selection click with Ctrl Key</small></span>\r\n\r\n                    <select multiple class=\"form-control fm-control\" style=\"margin-top:0em;\" [(ngModel)]=\"u_announc_for\" name=\"u_announc_for\" #pickedStdGender=\"ngModel\">\r\n                       <option [value]=\"999\"> For All Students</option>\r\n                       <option *ngFor=\"let item of classdataList\" [value]=\"item.class_id\"> {{item.class_name}}</option>\r\n                  </select>\r\n\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n       <input type=\"submit\" class=\"btn btn-info\" [disabled]=\"!updateAnnouncement.form.valid\" value=\"Update Announcement\">\r\n        <button class=\"btn btn-light\" (click)=\"modal.close('Close click')\">close</button>\r\n    </div>\r\n    </form>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./src/app/announcements/announcements.component.scss":
/*!************************************************************!*\
  !*** ./src/app/announcements/announcements.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/announcements/announcements.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/announcements/announcements.component.ts ***!
  \**********************************************************/
/*! exports provided: AnnouncementsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnouncementsComponent", function() { return AnnouncementsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes/manageClass.service */ "./src/app/classes/manageClass.service.ts");
/* harmony import */ var _announcements_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./announcements.service */ "./src/app/announcements/announcements.service.ts");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _shared_services_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/services/common.service */ "./src/app/shared/services/common.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AnnouncementsComponent = /** @class */ (function () {
    function AnnouncementsComponent(_commonService, _classDataService, _announcementsService, modalService) {
        this._commonService = _commonService;
        this._classDataService = _classDataService;
        this._announcementsService = _announcementsService;
        this.modalService = modalService;
        this.pageSize = 10;
        this.pageNumber = 1;
        /* active session */
        this.running_session = localStorage.getItem('running_session');
        // update announcement variables
        this.u_announc_for = [];
        // arrays
        this.classdataList = [];
        this.activeAnnouncementDetails = [];
        this.expiredAnnouncementDetails = [];
        this.announcementDetails = [];
        // notification
        this.addAnnouncNoti = '';
        this.successNotifi = false;
        this.alertType = '';
        this.dbRespMsg = '';
        this.dbERespMsg = '';
        this.dbUpRespMsg = '';
        this.updateAnnouncMsg = '';
        this.updateNotifi = false;
    }
    AnnouncementsComponent.prototype.ngOnInit = function () {
        // get admin level
        this.admin_level = localStorage.getItem('admin_level');
        this.getClassData();
        this.getAnnouncements();
    };
    // *********************************************************************************************************************** */
    /**********************************************************Read Data from DB Methods************************************** */
    // *********************************************************************************************************************** */
    // ********************************************************** **********/
    // *********************** Get all Classes data ************************/
    // ******************************************************************* */
    AnnouncementsComponent.prototype.getClassData = function () {
        var _this = this;
        this._classDataService.getClassesF().subscribe(function (result) {
            _this.classdataList = result;
        });
    };
    // ********************************************************** **********/
    // *********************** Get all Announcements ************************/
    // ******************************************************************* */
    AnnouncementsComponent.prototype.getAnnouncements = function () {
        var _this = this;
        this._announcementsService.getActiveAnnouncements().subscribe(function (result) {
            if (result.status === 1) {
                _this.activeAnnouncementDetails = result.data;
                // console.log(this.announcementDetails);
            }
            if (result.status === 0) {
                _this.dbRespMsg = 'No Announcement available';
            }
            if (result.status === 403) {
                _this.dbRespMsg = result.msg;
            }
        });
        // expired announcements
        this._announcementsService.getExpiredAnnouncements().subscribe(function (result) {
            if (result.status === 1) {
                _this.expiredAnnouncementDetails = result.data;
                // console.log(this.announcementDetails);
            }
            if (result.status === 0) {
                _this.dbERespMsg = 'No Announcement available';
            }
            if (result.status === 403) {
                _this.dbERespMsg = result.msg;
            }
        });
    };
    // ********************************************************** **********/
    // ********* Get Single Announcements Data for update ********************/
    // ******************************************************************* */
    AnnouncementsComponent.prototype.get_singleAnnouncementData = function (announcement_id) {
        var _this = this;
        var announcementString = null;
        this._announcementsService
            .get_singleAnnouncementDataF(announcement_id)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this.announcementDetails = result.data;
                announcementString = _this.announcementDetails[0];
                _this.u_announc_title = announcementString.announc_title;
                _this.u_announc_desc = announcementString.announc_details;
                // this.u_announc_for = announcementString.announc_for;
            }
            else {
                _this.dbUpRespMsg = result.msg;
            }
        });
    };
    // *********************************************************************************************************************** */
    /**********************************************************Add Update  Data  Methods************************************** */
    // *********************************************************************************************************************** */
    // ********************************************************** **********/
    // *********************** Add new announcements ************************/
    // ******************************************************************* */
    AnnouncementsComponent.prototype.add_newAnnouncement = function (submitEvent) {
        var _this = this;
        var announcement_data = submitEvent.value;
        // ** convert date to Unix timestamp
        var announc_date = new Date(announcement_data.announc_date).getTime() / 1000;
        var announc_Expiredate = new Date(announcement_data.announcE_date).getTime() / 1000;
        var announcement_for = announcement_data.announc_for;
        var new_announcement_data = {
            announc_title: announcement_data.announc_title,
            announc_details: announcement_data.announc_desc,
            announcement_date: announc_date,
            announcement_expire: announc_Expiredate,
            announc_for: announcement_for.toString()
        };
        // calling function
        this._announcementsService
            .add_newAnnouncementF(new_announcement_data)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this._commonService.successToaster('Added Successfully', 'Success!');
                _this.getAnnouncements(); // call function to reload the data after inserting new data
                submitEvent.reset();
                _this.closeModal();
            }
            else {
                _this._commonService.errorToaster(result.msg, 'Failed!');
            }
        });
    };
    // ********************************************************** **********/
    // *********************** Update announcements ************************/
    // ******************************************************************* */
    AnnouncementsComponent.prototype.onSubmitupdateAnnouncement = function (submitEvent) {
        var _this = this;
        var announcement_id = this.selected_announcement_id;
        var update_announc_data = submitEvent.value;
        var update_type; // update all if user selected new announcement receving details
        var update_data;
        // check user wants to update announcement receving details
        if (update_announc_data.u_announc_for.length <= 0) {
            update_type = 'not_all';
            update_data = {
                u_announc_title: update_announc_data.u_announc_title,
                u_announc_desc: update_announc_data.u_announc_desc
            };
        }
        else {
            update_type = '999';
            update_data = {
                u_announc_for: update_announc_data.u_announc_for.toString(),
                u_announc_title: update_announc_data.u_announc_title,
                u_announc_desc: update_announc_data.u_announc_desc
            };
        }
        this._announcementsService
            .update_announcement(announcement_id, update_type, update_data)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this._commonService.successToaster('Updated Successfully', 'Success!');
                _this.closeModal();
            }
            else {
                _this._commonService.errorToaster(result.msg, 'Failed!');
            }
            _this.getAnnouncements();
        });
    };
    // ********************************************************** **********/
    // *********************** Delete announcements ************************/
    // ******************************************************************* */
    AnnouncementsComponent.prototype.onClickDelAnnouncment = function (announcement_id) {
        var _this = this;
        sweetalert2__WEBPACK_IMPORTED_MODULE_3___default()({
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
                _this._announcementsService
                    .deleteAnnouncement(announcement_id)
                    .subscribe(function (respresult) {
                    if (respresult.status === 1) {
                        // show deleted notification
                        _this._commonService.successToaster('Announcement has been deleted.', 'Deleted!');
                        _this.getAnnouncements();
                    }
                    else {
                        _this._commonService.errorToaster(respresult.msg, 'Error!');
                    }
                });
            }
        });
    };
    // ************************************************************************************************************* */
    /*********************************************General   Methods************************************************ */
    // ************************************************************************************************************* */
    /********************************* pagination Info ****************************/
    // ********* Open exam update modal */
    AnnouncementsComponent.prototype.openUpdateAnnouncModal = function (modal, announcement_id) {
        this.u_announc_for = [];
        this.openNgModal(modal, 'md');
        this.selected_announcement_id = announcement_id;
        this.get_singleAnnouncementData(announcement_id);
    };
    AnnouncementsComponent.prototype.pageChanged = function (pN) {
        this.pageNumber = pN;
    };
    // hide success toaster after 2 secs
    AnnouncementsComponent.prototype.FadeOutToaster = function () {
        var _this = this;
        setTimeout(function () {
            _this.successNotifi = false;
        }, 2000);
    };
    AnnouncementsComponent.prototype.FadeOutUpdateToaster = function () {
        var _this = this;
        setTimeout(function () {
            _this.updateNotifi = false;
        }, 2000);
    };
    // open modal
    AnnouncementsComponent.prototype.openModal = function (modal) {
        modal.open();
    };
    // close modal
    AnnouncementsComponent.prototype.closeModal = function () {
        this.modalService.dismissAll();
    };
    // new modal
    AnnouncementsComponent.prototype.openNgModal = function (content, size) {
        this.modalService.open(content, { size: size });
    };
    AnnouncementsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-announcements',
            template: __webpack_require__(/*! ./announcements.component.html */ "./src/app/announcements/announcements.component.html"),
            styles: [__webpack_require__(/*! ./announcements.component.scss */ "./src/app/announcements/announcements.component.scss")],
            providers: [_classes_manageClass_service__WEBPACK_IMPORTED_MODULE_1__["ClassDataService"], _announcements_service__WEBPACK_IMPORTED_MODULE_2__["AnnouncementsService"], _shared_services_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"]]
        }),
        __metadata("design:paramtypes", [_shared_services_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"],
            _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_1__["ClassDataService"],
            _announcements_service__WEBPACK_IMPORTED_MODULE_2__["AnnouncementsService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"]])
    ], AnnouncementsComponent);
    return AnnouncementsComponent;
}());



/***/ }),

/***/ "./src/app/announcements/announcements.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/announcements/announcements.module.ts ***!
  \*******************************************************/
/*! exports provided: AnnouncementsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnouncementsModule", function() { return AnnouncementsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _announcements_routing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./announcements.routing */ "./src/app/announcements/announcements.routing.ts");
/* harmony import */ var _announcements_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./announcements.component */ "./src/app/announcements/announcements.component.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-select */ "./node_modules/ng2-select/index.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ng2_select__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-modal */ "./node_modules/ngx-modal/index.js");
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(ngx_modal__WEBPACK_IMPORTED_MODULE_8__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AnnouncementsModule = /** @class */ (function () {
    function AnnouncementsModule() {
    }
    AnnouncementsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _announcements_routing__WEBPACK_IMPORTED_MODULE_3__["routing"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_6__["NgxPaginationModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"],
                ng2_select__WEBPACK_IMPORTED_MODULE_7__["SelectModule"],
                ngx_modal__WEBPACK_IMPORTED_MODULE_8__["ModalModule"]
            ],
            declarations: [_announcements_component__WEBPACK_IMPORTED_MODULE_4__["AnnouncementsComponent"]]
        })
    ], AnnouncementsModule);
    return AnnouncementsModule;
}());



/***/ }),

/***/ "./src/app/announcements/announcements.routing.ts":
/*!********************************************************!*\
  !*** ./src/app/announcements/announcements.routing.ts ***!
  \********************************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _announcements_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./announcements.component */ "./src/app/announcements/announcements.component.ts");


var childRoutes = [
    {
        path: '',
        component: _announcements_component__WEBPACK_IMPORTED_MODULE_1__["AnnouncementsComponent"]
    }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(childRoutes);


/***/ }),

/***/ "./src/app/classes/manageClass.service.ts":
/*!************************************************!*\
  !*** ./src/app/classes/manageClass.service.ts ***!
  \************************************************/
/*! exports provided: ClassDataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClassDataService", function() { return ClassDataService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../shared/services/global.service */ "./src/app/shared/services/global.service.ts");
// ******************** Node APIs path  MainProject/Routes/route.js *********************** */
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ClassDataService = /** @class */ (function () {
    function ClassDataService(http, _globalService) {
        this.http = http;
        this._globalService = _globalService;
        this.serverLink = this._globalService.constants.serverLink;
        this.headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"](this._globalService.constants.headers);
    }
    // *********************** Call  API for Updating Class Data *****************************
    ClassDataService.prototype.updateSubClass = function (classUpdateDetails, id) {
        return this.http
            .put(this.serverLink + 'update/subclass/' + id, classUpdateDetails, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *********************** Call API for retreiewing sub Class Data ********************
    ClassDataService.prototype.getSubClasses = function () {
        return this.http
            .get(this.serverLink + 'get/subclasses', {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *********************** Call API for retreiewing Class Data ********************
    ClassDataService.prototype.getClassesF = function () {
        return this.http
            .get(this.serverLink + 'get/classes', {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *********************** Call API for retreiewing single Class Data By ID********************
    ClassDataService.prototype.getSingleClassByIdF = function (id) {
        return this.http
            .get(this.serverLink + 'get/classById/' + id, {
            headers: this.headers
        })
            .map(function (res) { return res.json(); });
    };
    // ********************* Call API to check whether class already added ******************* */
    ClassDataService.prototype.classExistCheckF = function (c_name) {
        return this.http
            .get(this.serverLink + 'get/classByName/' + c_name, {
            headers: this.headers
        })
            .map(function (res) { return res.json(); });
    };
    // *********************** Call  API for Adding New Class Data *****************************
    ClassDataService.prototype.addClassF = function (classDetails) {
        return this.http
            .post(this.serverLink + 'add/class', classDetails, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *********************** Call  API for Adding New Sub Class Data *****************************  
    ClassDataService.prototype.addSubClass = function (classDetails) {
        return this.http
            .post(this.serverLink + 'add/subclass', classDetails, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *********************** Call  API for Updating Class Data *****************************
    ClassDataService.prototype.updateClassF = function (classUpdateDetails, id) {
        return this.http
            .put(this.serverLink + 'update/class/' + id, classUpdateDetails, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *********************** Call  API for Deleting Teachers Data *****************************
    ClassDataService.prototype.deleteClassF = function (deleteStatus, id) {
        return this.http
            .put(this.serverLink + 'delete/class/' + id, deleteStatus, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    ClassDataService.prototype.deleteSubClass = function (deleteStatus, id) {
        return this.http
            .put(this.serverLink + 'delete/subclass/' + id, deleteStatus, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    ClassDataService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__["GlobalService"]])
    ], ClassDataService);
    return ClassDataService;
}());



/***/ })

}]);
//# sourceMappingURL=announcements-announcements-module.js.map