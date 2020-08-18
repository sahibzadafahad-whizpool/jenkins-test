(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["attendance-attendance-module"],{

/***/ "./src/app/attendance/attendance.component.html":
/*!******************************************************!*\
  !*** ./src/app/attendance/attendance.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-lg-12 \">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h4 class=\"card-title\">Manage Daily Attendance</h4>\r\n                <form style=\"margin-top:2em;\" class=\"form-group\" #manageAttedance=\"ngForm\" (ngSubmit)=\"onSubmitMngAtten(manageAttedance)\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4 form-group\">\r\n                            <label class=\"control-label\"> Class *</label>\r\n                            <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedStdCLass.valid && pickedStdCLass.touched\"><small>Class\r\n                  Required</small></span>\r\n                            <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedStdCLass [(ngModel)]=\"std_classId\" (change)=classSelected(pickedStdCLass.value); name=\"std_classId\">\r\n                <option [ngValue]=\"undefined\" disabled>Select Class</option>\r\n                <option *ngFor=\"let item of classDataList\" [value]=\"item.class_id\">{{item.class_name}}</option>\r\n              </select>\r\n\r\n                        </div>\r\n\r\n                        <div class=\"col-md-4 form-group\">\r\n                            <label class=\"control-label\"> Section *</label>\r\n                            <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedStdSection.valid && pickedStdSection.touched\"><small>Section\r\n                  Required</small></span>\r\n                            <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedStdSection [(ngModel)]=\"std_sectionId\" (change)=enableBtn() name=\"std_sectionId\">\r\n                <option [ngValue]=\"undefined\" disabled>Select Section</option>\r\n                <option *ngFor=\"let item of sectionsDataList\" [value]=\"item.section_id\">{{item.section_name}}</option>\r\n              </select>\r\n\r\n                        </div>\r\n\r\n                        <div class=\"col-md-4 form-group\">\r\n                            <label class=\"control-label\" style=\"margin-top:0em;\"> Date * </label>\r\n                            <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedattendancedate.valid && pickedattendancedate.touched\"><small>Date\r\n                  for Attendance required</small></span>\r\n\r\n                            <input type=\"date\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"attendance_date\" required [(ngModel)]=\"attendance_date\" #pickedattendancedate=\"ngModel\">\r\n                        </div>\r\n\r\n                        <div class=\"col-md-12 form-group\" style=\"text-align: center\">\r\n                            <input type=\"submit\" class=\"btn btn-info\" style=\"margin-top:2em\" [disabled]=\"!manageAttedance.form.valid || disableBtn\" value=\"Manage Attendence\">\r\n\r\n                        </div>\r\n                        <div class=\"col-md-12 \" style=\"text-align: center\">\r\n                            <h5 style=\"color: red;\"> {{ studentAvailabe }}</h5>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</div>\r\n\r\n<div class=\"row\" *ngIf=\"showTable\">\r\n    <div class=\"col-lg-12 col-md-12\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n\r\n                <!-- <h4 class=\"card-title\">Assignments Information</h4> -->\r\n                <div class=\"mini-heading\" style=\"text-align: center ; margin-top :-2.5em ; margin-bottom:2em;\">\r\n                    <h3> Manage Attendance For</h3>\r\n                    <h4>\r\n                        Class : {{selectedClass}}\r\n                    </h4>\r\n                    <h4> Section : {{selectedSection}}\r\n                    </h4>\r\n                    <h4> Date : {{selectedDate}}</h4>\r\n                </div>\r\n                <hr>\r\n                <!-- <div style=\"height: 60px\">\r\n           <alert *ngIf=\"attendanceNotifiction\" type=\"success\">{{ markAttendRespMsg}}</alert>\r\n        </div> -->\r\n\r\n                <table class=\"table table-bordered table-hover\">\r\n                    <thead class=\"thead-light\">\r\n                        <tr>\r\n                            <th> S.No</th>\r\n                            <th>Roll Num</th>\r\n                            <th>Student Name</th>\r\n                            <!-- <th>Class </th>\r\n              <th>Section</th> -->\r\n\r\n                            <th>Attendance Status : {{selectedDate}}</th>\r\n                            <th><input type=\"checkbox\" [(ngModel)]=\"selectedAll\" (change)=\"selectAll();\" /> Select All</th>\r\n                            <!-- <th>Mark Individually</th> -->\r\n\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr *ngFor=\"let item of studentsDataList | paginate: { id: 'pager', itemsPerPage: pageSize, currentPage: pageNumber};let index = index\">\r\n\r\n                            <td>{{index + 1}}</td>\r\n                            <td>{{item.roll_num}}</td>\r\n                            <td>{{item.std_name}}</td>\r\n                            <!-- <td>{{item.class_name}}</td>\r\n\r\n\r\n              <td>{{item.section_name}}</td> -->\r\n\r\n                            <td [style.color]=\"item.attend_status == true ? 'green' : (item.attend_status == false ? 'red' : ( item.attend_status == 'P' ? 'green' : (  item.attend_status == 'A' ? 'red' : 'black' )))\">\r\n                                <strong>\r\n                  {{item.attend_status == true ? \"Marked Present\" : (item.attend_status == false ? \"Marked Absent\" : ( item.attend_status == \"P\" ? \"Marked Present\" : (  item.attend_status == \"A\" ? \"Marked Absent\" : \"Not Marked\" ) ))}}\r\n                </strong>\r\n                            </td>\r\n                            <td> <input type=\"checkbox\" [(ngModel)]=\"item.attend_status\" (change)=\"checkIfAllSelected();\">\r\n                            </td>\r\n\r\n\r\n                            <!-- <td>\r\n                <label *ngIf=\"item.attend_status == 'A' || item.attend_status == false || item.attend_status == null \"\r\n                  style=\"cursor: pointer;  margin-left: 1em; \" class=\"badge badge-primary\"\r\n                  (click)=\"markAttendance(item.class_id,item.section_id,item.std_id,'P')\">Present</label>\r\n\r\n                <label *ngIf=\"item.attend_status == 'A' || item.attend_status == false \"\r\n                  style=\"cursor: pointer; margin-left: 1em; \" class=\"badge badge-warning\"\r\n                  (click)=\"addLeave_Application(addLeaveReasonModel,item.std_name,item.attendance_id , item.comment)\">Update\r\n                  Leave\r\n                  Reason</label>\r\n\r\n                <label *ngIf=\"item.attend_status == 'P' || item.attend_status == true || item.attend_status == null \"\r\n                  style=\"cursor: pointer; margin-left: 1em;\" class=\"badge badge-danger\"\r\n                  (click)=\"markAttendance(item.class_id,item.section_id,item.std_id,'A')\">Absent</label>\r\n\r\n              </td> -->\r\n                        </tr>\r\n\r\n                    </tbody>\r\n                </table>\r\n\r\n                <div class=\"row\" style=\"margin-top: 2em;\">\r\n                    <div class=\"col-lg-12\" style=\"text-align: center\" *ngIf=\"mark_all_btn\">\r\n                        <label style=\"cursor: pointer; margin-left: 1em; font-size: 13px;\" class=\"badge badge-info\" (click)=\"MarkAll()\">Mark\r\n              Attendance\r\n              In Bulk</label>\r\n                    </div>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</div>\r\n\r\n\r\n\r\n\r\n<!-- *********************************** Modals **************************************** -->\r\n\r\n\r\n\r\n<ng-template #addLeaveReasonModel let-modal>\r\n    <div class=\"modal-header\">\r\n        <div style=\"text-align: center\">\r\n            <h3>Add Absent Reason</h3>\r\n        </div>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <form class=\"form-group\" #addStdLeave=\"ngForm\" (ngSubmit)=\"add_std_leaveReason(addStdLeave)\">\r\n            <label class=\"control-label\"> Student Name </label>\r\n\r\n            <input type=\"text\" readonly class=\"form-control fm-control\" name=\"c_student_name\" [(ngModel)]=\"c_student_name\" #pickedExpTitle=\"ngModel\">\r\n\r\n            <input type=\"hidden\" name=\"attendance_id\" [(ngModel)]=\"attendance_id\">\r\n\r\n\r\n            <label class=\"control-label\"> Absent Reason *</label>\r\n\r\n            <textarea rows=\"4\" cols=\"50\" required class=\"form-control fm-control\" name=\"absent_reason\" [(ngModel)]=\"absent_reason\" #pickedExpDesc=\"ngModel\"> </textarea>\r\n            <p class=\"alert alert-danger\" *ngIf=\"!pickedExpDesc.valid && pickedExpDesc.touched\" style=\"margin-top:1em; margin-left:0em;\">\r\n                Reason Required!\r\n            </p>\r\n\r\n\r\n            <div class=\"modal_button\" style=\"text-align:right\">\r\n                <input type=\"submit\" class=\"btn btn-info\" [disabled]=\"!addStdLeave.form.valid\" value=\"Add\" style=\"margin-top: 1em;\">\r\n            </div>\r\n\r\n        </form>\r\n\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n    </div>\r\n</ng-template>"

/***/ }),

/***/ "./src/app/attendance/attendance.component.scss":
/*!******************************************************!*\
  !*** ./src/app/attendance/attendance.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/attendance/attendance.component.ts":
/*!****************************************************!*\
  !*** ./src/app/attendance/attendance.component.ts ***!
  \****************************************************/
/*! exports provided: AttendanceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttendanceComponent", function() { return AttendanceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _students_student_information_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../students/student-information.service */ "./src/app/students/student-information.service.ts");
/* harmony import */ var _daily_attendance_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./daily-attendance.service */ "./src/app/attendance/daily-attendance.service.ts");
/* harmony import */ var _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sections/manageSection.service */ "./src/app/sections/manageSection.service.ts");
/* harmony import */ var _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../classes/manageClass.service */ "./src/app/classes/manageClass.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _shared_services_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/services/common.service */ "./src/app/shared/services/common.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AttendanceComponent = /** @class */ (function () {
    // create instance of services to access method from services
    function AttendanceComponent(_StudentsInfoService, _classDataService, _sectionDataService, _dailyAttendanceService, modalService, _commonService) {
        this._StudentsInfoService = _StudentsInfoService;
        this._classDataService = _classDataService;
        this._sectionDataService = _sectionDataService;
        this._dailyAttendanceService = _dailyAttendanceService;
        this.modalService = modalService;
        this._commonService = _commonService;
        this.tabtitle = 'Daily Attendance';
        /* active session */
        this.running_session = localStorage.getItem('running_session');
        /* pagination Info */
        this.pageSize = 10;
        this.pageNumber = 1;
        this.attend_status = 'Undefined';
        this.selectedClass = null;
        this.selectedSection = null;
        this.selectedDate = null;
        // leave reason
        this.c_student_name = '';
        // notification
        this.studentAvailabe = '';
        this.disableBtn = true;
        this.attendanceNotifiction = 0;
        this.showTable = false;
        this.mark_all_btn = false;
    }
    // this function auto called when component loads
    AttendanceComponent.prototype.ngOnInit = function () {
        this.getClassData();
    };
    // *********************************************************************************************************************** */
    /**********************************************************Read Data from DB Methods************************************** */
    // *********************************************************************************************************************** */
    // ********************************************************** **********/
    // *********************** Get all Classes data ************************/
    // ******************************************************************* */
    AttendanceComponent.prototype.getClassData = function () {
        var _this = this;
        this._classDataService.getClassesF().subscribe(function (result) {
            _this.classDataList = result;
        });
    };
    // ********************************************************************** */
    // ************ Get Section Data Against Selected Class ***************** */
    // ********************************************************************* */
    AttendanceComponent.prototype.getSectionByClassID = function (class_id) {
        var _this = this;
        // * disbale btn untill section selcted and empty section array when selected class change
        this.sectionsDataList = [];
        this.std_sectionId = null;
        this.disableBtn = true;
        this._sectionDataService.getSectionF(class_id).subscribe(function (result) {
            _this.sectionsDataList = result;
        });
    };
    // ********************************************************** **********/
    // ********* Get all Students details by class , Section ID ************/
    // ******************************************************************* */
    AttendanceComponent.prototype.getStudentsForMarkAttend = function (class_id, section_id) {
        var _this = this;
        /* get all students and attendance report against selected class and Section  date*/
        this._dailyAttendanceService
            .getstdForMrkAttendance(class_id, section_id, this.running_session, this.attendanceUnixTime)
            .subscribe(function (result) {
            _this.studentsDataList = result.data;
            console.log(_this.studentsDataList);
            if (_this.studentsDataList.length) {
                _this.selectedClass = _this.studentsDataList[0].class_name;
                _this.selectedSection = _this.studentsDataList[0].section_name;
                _this.studentAvailabe = ' ';
                // active mark all btn
                _this.mark_all_btn = true;
                _this.showTable = true;
            }
            else {
                _this.studentAvailabe =
                    '* No Student Data available for selected class..!  ';
                _this.selectedClass = ' ';
                _this.selectedSection = ' ';
            }
        });
    };
    // *********************************************************************************************************************** */
    /**********************************************************Add Update  Data  Methods************************************** */
    // *********************************************************************************************************************** */
    // ********************************************************** **********/
    // ********* Mark student attendance  datewise *************************/
    // ******************************************************************* */
    AttendanceComponent.prototype.markAttendance = function (class_id, section_id, student_id, attendanceStatus) {
        var _this = this;
        var date = this.selectedDate.split('-'); // get date from selected timestamp
        var dailyAttendance = {
            class_id: class_id,
            section_id: section_id,
            student_id: student_id,
            timestamp: this.attendanceUnixTime,
            dayDate: Number(date[2]),
            month: Number(date[1]),
            attend_year: Number(date[0]),
            year: this.running_session,
            attend_status: attendanceStatus
        };
        this._dailyAttendanceService
            .markAttendanceF(dailyAttendance)
            .subscribe(function (result) {
            if (result.status === 1) {
                // load student details after mark attendance
                _this.getStudentsForMarkAttend(class_id, section_id);
                _this.markAttendRespMsg = 'Attendance Updated Successfully';
                _this.attendanceNotifiction = 1;
                _this.FadeOutToaster();
            }
        });
    };
    // ********************************************************** **********/
    // ********* Mark student attendance  in bulk *************************/
    // ******************************************************************* */
    AttendanceComponent.prototype.MarkAll = function () {
        var _this = this;
        var date = this.selectedDate.split('-'); // get date from selected timestamp
        var dailyAttendance = {
            timestamp: this.attendanceUnixTime,
            dayDate: Number(date[2]),
            month: Number(date[1]),
            attend_year: Number(date[0]),
            year: this.running_session,
            bulk_attendance: this.studentsDataList
        };
        var array_count = this.studentsDataList.length;
        this._dailyAttendanceService
            .mark_Bulk_attendance(dailyAttendance)
            .subscribe(function (result) {
            if (result.status === 1) {
                if (array_count === result.count) {
                    // if user click button without selecting present / absent for student
                    _this._commonService.warningToaster('Kindly select any present / absent status', 'Failed!');
                }
                else {
                    _this._commonService.successToaster('Updated Successfully', 'Success!');
                }
            }
            else {
                _this._commonService.errorToaster('Server error try again', 'Failed!');
            }
        });
    };
    // ********************************************************** **********/
    // ***************** Add student leave reason *************************/
    // ******************************************************************* */
    AttendanceComponent.prototype.add_std_leaveReason = function (submitEvent) {
        var _this = this;
        var update_data = {
            attendance_id: submitEvent.value.attendance_id,
            comment: submitEvent.value.absent_reason
        };
        this._dailyAttendanceService
            .add_absent_reason(update_data)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this._commonService.successToaster('Updated Successfully', 'Success!');
            }
            else {
                _this._commonService.errorToaster('Server error try again', 'Failed!');
                console.log(result.msg);
            }
        });
    };
    // ************************************************************************************************************* */
    /*********************************************General   Methods************************************************ */
    // ************************************************************************************************************* */
    AttendanceComponent.prototype.openNgModal = function (content, size) {
        this.modalService.open(content, { size: size });
    };
    // ********* Leave reason modal ********** */
    AttendanceComponent.prototype.addLeave_Application = function (modal, student_name, attendance_id, comment) {
        this.c_student_name = student_name;
        this.attendance_id = attendance_id;
        this.absent_reason = comment;
        this.openNgModal(modal, 'md');
    };
    // ****** Select / unSelect bulk attendance Mark  **************************/
    AttendanceComponent.prototype.selectAll = function () {
        for (var i = 0; i < this.studentsDataList.length; i++) {
            this.studentsDataList[i].attend_status = this.selectedAll;
        }
    };
    AttendanceComponent.prototype.checkIfAllSelected = function () {
        this.selectedAll = this.studentsDataList.every(function (item) {
            return item.selected === 'P';
        });
    };
    // *** selected class , section and date for attendance ****/
    AttendanceComponent.prototype.onSubmitMngAtten = function (submitEvent) {
        var manageAttendData = submitEvent.value;
        this.selectedDate = manageAttendData.attendance_date;
        // ** convert selected time to Unix timestamp
        this.attendanceUnixTime = new Date(this.selectedDate).getTime() / 1000;
        this.selected_unix_date = this.attendanceUnixTime;
        var classId = manageAttendData.std_classId;
        var sectionId = manageAttendData.std_sectionId;
        this.getStudentsForMarkAttend(classId, sectionId);
    };
    // *** get sections against class for dropdown
    AttendanceComponent.prototype.classSelected = function (class_id) {
        this.getSectionByClassID(class_id);
    };
    /********************************* pagination Info ****************************/
    AttendanceComponent.prototype.pageChanged = function (pN) {
        this.pageNumber = pN;
    };
    // enable manage attendance btn when section isnt empty
    AttendanceComponent.prototype.enableBtn = function () {
        this.disableBtn = false;
    };
    // hide success toaster after 2 secs
    AttendanceComponent.prototype.FadeOutToaster = function () {
        var _this = this;
        setTimeout(function () {
            _this.attendanceNotifiction = 0;
        }, 1000);
    };
    // open modal
    AttendanceComponent.prototype.openModal = function (modal) {
        modal.open();
    };
    // close modal
    AttendanceComponent.prototype.closeModal = function (modal) {
        modal.close();
    };
    AttendanceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-attendance',
            template: __webpack_require__(/*! ./attendance.component.html */ "./src/app/attendance/attendance.component.html"),
            styles: [__webpack_require__(/*! ./attendance.component.scss */ "./src/app/attendance/attendance.component.scss")],
            providers: [
                _students_student_information_service__WEBPACK_IMPORTED_MODULE_1__["StudentsInfoService"],
                _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_4__["ClassDataService"],
                _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_3__["SectionDataService"],
                _daily_attendance_service__WEBPACK_IMPORTED_MODULE_2__["DailyAttendanceService"],
                _shared_services_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"]
            ]
        }),
        __metadata("design:paramtypes", [_students_student_information_service__WEBPACK_IMPORTED_MODULE_1__["StudentsInfoService"],
            _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_4__["ClassDataService"],
            _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_3__["SectionDataService"],
            _daily_attendance_service__WEBPACK_IMPORTED_MODULE_2__["DailyAttendanceService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModal"],
            _shared_services_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"]])
    ], AttendanceComponent);
    return AttendanceComponent;
}());



/***/ }),

/***/ "./src/app/attendance/attendance.module.ts":
/*!*************************************************!*\
  !*** ./src/app/attendance/attendance.module.ts ***!
  \*************************************************/
/*! exports provided: AttendanceModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttendanceModule", function() { return AttendanceModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _attendance_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./attendance.routing */ "./src/app/attendance/attendance.routing.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng2-select */ "./node_modules/ng2-select/index.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ng2_select__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-modal */ "./node_modules/ngx-modal/index.js");
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ngx_modal__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");
/* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-file-upload */ "./node_modules/ng2-file-upload/index.js");
/* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(ng2_file_upload__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _attendance_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./attendance.component */ "./src/app/attendance/attendance.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










/* components */

var AttendanceModule = /** @class */ (function () {
    function AttendanceModule() {
    }
    AttendanceModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__["Ng2SearchPipeModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_4__["NgxPaginationModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
                ng2_file_upload__WEBPACK_IMPORTED_MODULE_8__["FileUploadModule"],
                ng2_select__WEBPACK_IMPORTED_MODULE_5__["SelectModule"],
                ngx_modal__WEBPACK_IMPORTED_MODULE_6__["ModalModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_3__["HttpModule"],
                _attendance_routing__WEBPACK_IMPORTED_MODULE_2__["routing"]
            ],
            declarations: [_attendance_component__WEBPACK_IMPORTED_MODULE_10__["AttendanceComponent"]]
        })
    ], AttendanceModule);
    return AttendanceModule;
}());



/***/ }),

/***/ "./src/app/attendance/attendance.routing.ts":
/*!**************************************************!*\
  !*** ./src/app/attendance/attendance.routing.ts ***!
  \**************************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _attendance_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attendance.component */ "./src/app/attendance/attendance.component.ts");


var childRoutes = [
    {
        path: "",
        component: _attendance_component__WEBPACK_IMPORTED_MODULE_1__["AttendanceComponent"]
    }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(childRoutes);


/***/ })

}]);
//# sourceMappingURL=attendance-attendance-module.js.map