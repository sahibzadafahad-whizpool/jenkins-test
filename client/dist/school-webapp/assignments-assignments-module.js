(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["assignments-assignments-module"],{

/***/ "./src/app/assignments/assignments.component.html":
/*!********************************************************!*\
  !*** ./src/app/assignments/assignments.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-md-12 col-lg-12\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n\r\n                <h4 class=\"card-title\">Assignments Information</h4>\r\n\r\n\r\n                <div class=\"row\">\r\n                    <div class=\"pull-right col-lg-12\">\r\n                        <div class=\"col-lg-3 pull-right \" style=\"padding-bottom: 1.5em;\">\r\n\r\n                            <button _ngcontent-c2=\"\" (click)=\"openNgModal(addAssignMarksModel ,'lg')\" class=\"btn btn-success btn-block\">New\r\n                Assignment\r\n                <i _ngcontent-c2=\"\" class=\"mdi mdi-plus\"></i></button>\r\n                        </div>\r\n                    </div>\r\n\r\n\r\n                    <div class=\"col-lg-12 col-md-12\">\r\n                        <hr>\r\n                        <form style=\"margin-top:2em;\" class=\"form-group\" #getAssignment=\"ngForm\" (ngSubmit)=\"getAssignments(getAssignment)\">\r\n                            <div class=\"row\">\r\n\r\n\r\n                                <div class=\"col-md-4 form-group\">\r\n                                    <label class=\"control-label\"> Class *</label>\r\n                                    <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedgCLass.valid && pickedgCLass.touched\"><small>Class\r\n                      Required</small></span>\r\n                                    <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedgCLass [(ngModel)]=\"g_class_id\" (change)=classSelected(pickedgCLass.value); name=\"g_class_id\">\r\n                    <option [ngValue]=\"undefined\" disabled>Select Class</option>\r\n                    <option *ngFor=\"let item of classdataList\" [value]=\"item.class_id\">{{item.class_name}}</option>\r\n                  </select>\r\n\r\n                                </div>\r\n\r\n                                <div class=\"col-md-4 form-group\">\r\n                                    <label class=\"control-label\"> Section *</label>\r\n                                    <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedgSection.valid && pickedgSection.touched\"><small>Section\r\n                      Required</small></span>\r\n                                    <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedgSection [(ngModel)]=\"g_section_id\" (change)=\"sectionSelectedF(pickedgSection.value)\" name=\"g_section_id\">\r\n                    <option [ngValue]=\"undefined\" disabled>Select Section</option>\r\n                    <option *ngFor=\"let item of sectionsList\" [value]=\"item.section_id\">{{item.section_name}}</option>\r\n                  </select>\r\n\r\n                                </div>\r\n\r\n                                <div class=\"col-md-4 form-group\">\r\n                                    <label class=\"control-label\" style=\"margin-top:0em;\"> Subject * </label>\r\n                                    <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedUSubject.valid && pickedUSubject.touched\"><small>Subject\r\n                      required</small></span>\r\n\r\n                                    <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedUSubject [(ngModel)]=\"g_subject_id\" (change)=funSelectedSub(pickedUSubject.value) name=\"g_subject_id\">\r\n                    <option [ngValue]=\"undefined\" disabled>Select Subject</option>\r\n                    <option *ngFor=\"let item of cSubjectsList\" [value]=\"item.subject_id + '-' + item.subject_type\">\r\n                      {{item.subject_name}}</option>\r\n                  </select>\r\n                                </div>\r\n\r\n                                <div class=\"col-md-12 form-group\" style=\"text-align: center\">\r\n                                    <input type=\"submit\" class=\"btn btn-info\" style=\"margin-top:1em\" [disabled]=\"!getAssignment.form.valid || disableBtn\" value=\"List Assignments\">\r\n\r\n                                </div>\r\n                                <div style=\"text-align: center\">\r\n                                    <h5 style=\"color: red;\"> {{studentAvailabe}}</h5>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\" *ngIf=\"showHeading\">\r\n\r\n                    <div class=\"col-lg-12 col-md-12\">\r\n\r\n                        <div style=\"text-align: center;\" class=\"mini-heading\">\r\n                            <h3> List Assignment Details</h3>\r\n                            <h4>\r\n                                Class : {{selectedClassName}}\r\n                            </h4>\r\n                            <h4> Section : {{selectedClsSection}}\r\n                            </h4>\r\n                        </div>\r\n                        <hr>\r\n                        <div style=\"height:50px;\">\r\n\r\n                        </div>\r\n\r\n                        <table class=\"table table-bordered table-hover\">\r\n                            <thead class=\"thead-light\">\r\n                                <tr>\r\n                                    <th>S.No</th>\r\n                                    <th>Assignment Title</th>\r\n                                    <th>Subject </th>\r\n                                    <th> Created on</th>\r\n                                    <th> Due on </th>\r\n                                    <th> Total Marks</th>\r\n\r\n                                    <th> Actions</th>\r\n\r\n\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr *ngFor=\"let item of assignments_Data | paginate: { id: 'pager', itemsPerPage: pageSize, currentPage: pageNumber};let index = index\">\r\n\r\n                                    <td>{{index + 1}}</td>\r\n                                    <td>{{item.title}}</td>\r\n                                    <td>{{item.subject_name}}</td>\r\n                                    <td>{{item.assign_created_date * 1000 | date}}</td>\r\n                                    <td>{{item.assign_due_date * 1000 | date}}</td>\r\n\r\n                                    <td>{{item.assign_tMarks}}</td>\r\n\r\n                                    <td> <label style=\"cursor: pointer;\" (click)=\"updateAssignmentModal(updateAssignMarksModel,item.assign_id,item.assign_tMarks,index)\" class=\"badge badge-info\">Update Marks </label></td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n<!-- *********************************** Modals **************************************** -->\r\n\r\n\r\n<!-- ******** Add Assignment marks ************ -->\r\n\r\n\r\n<ng-template #addAssignMarksModel let-modal>\r\n    <div class=\"modal-header\">\r\n        <div style=\"text-align: center\">\r\n            <h3>Add Assignment Marks</h3>\r\n        </div>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n    </div>\r\n    <form class=\"form-group\" #addAssignment=\"ngForm\" (ngSubmit)=\"onClickAddAssignment(addAssignment)\">\r\n        <div class=\"modal-body\">\r\n\r\n\r\n            <div class=\"row\">\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\"> Class *</label>\r\n                    <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedCLass.valid && pickedCLass.touched\"><small>Class\r\n              Required</small></span>\r\n                    <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedCLass [(ngModel)]=\"classid\" (change)=classSelected(pickedCLass.value); name=\"classid\">\r\n            <option [ngValue]=\"undefined\" disabled>Select Class</option>\r\n            <option *ngFor=\"let item of classdataList\" [value]=\"item.class_id\">{{item.class_name}}</option>\r\n          </select>\r\n\r\n                </div>\r\n\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\"> Section *</label>\r\n                    <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedSection.valid && pickedSection.touched\"><small>Section\r\n              Required</small></span>\r\n                    <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedSection [(ngModel)]=\"sectionid\" (change)=\"sectionSelectedF(pickedSection.value)\" name=\"sectionid\">\r\n            <option [ngValue]=\"undefined\" disabled>Select Section</option>\r\n            <option *ngFor=\"let item of sectionsList\" [value]=\"item.section_id\">{{item.section_name}}</option>\r\n          </select>\r\n\r\n                </div>\r\n\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:0em;\"> Subject * </label>\r\n                    <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedSubject.valid && pickedSubject.touched\"><small>Subject\r\n              required</small></span>\r\n\r\n                    <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedSubject [(ngModel)]=\"subjectid\" (change)=funSelectedSub(pickedSubject.value) name=\"subjectid\">\r\n            <option [ngValue]=\"undefined\" disabled>Select Subject</option>\r\n            <option *ngFor=\"let item of cSubjectsList\" [value]=\"item.subject_id\">{{item.subject_name}}\r\n            </option>\r\n          </select>\r\n                </div>\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:0em;\">Assignment Title * <span style=\"color:red;\"\r\n              *ngIf=\"!pickedassign.valid && pickedassign.touched\"><small>\r\n                Required</small> </span></label>\r\n                    <input type=\"text\" required style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"title\" placeholder=\"Assignment Title\" [(ngModel)]=\"title\" #pickedassign=\"ngModel\">\r\n                </div>\r\n\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:0em;\">Due Date * <span style=\"color:red;\"\r\n              *ngIf=\"!pickeddueDate.valid && pickeddueDate.touched\"><small>\r\n                Due Date Required</small> </span></label>\r\n                    <input type=\"date\" required style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"dueDate\" placeholder=\"Name\" [(ngModel)]=\"dueDate\" #pickeddueDate=\"ngModel\">\r\n                </div>\r\n\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:0em;\">Total Marks * <span style=\"color:red;\"\r\n              *ngIf=\"!pickedTM.valid && pickedTM.touched\"><small>\r\n                Marks Required</small> </span></label>\r\n                    <input type=\"number\" required style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"tMarks\" placeholder=\"Total Marks\" [(ngModel)]=\"tMarks\" #pickedTM=\"ngModel\">\r\n                </div>\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:0em;\"> Assignment Images <span style=\"color:red;\">\r\n            </span></label>\r\n                    <input id=\"assignment_image\" #imageFile accept=\"image/*\" name=\"assignment_image\" type=\"file\" (change)=\"fileChangeEvent($event)\" class=\"form-control fm-control\" placeholder=\"Upload a file...\" multiple />\r\n                </div>\r\n\r\n\r\n            </div>\r\n\r\n\r\n        </div>\r\n        <div class=\"modal-footer\">\r\n            <input type=\"submit\" class=\"btn btn-info\" [disabled]=\"!addAssignment.form.valid || disableBtn\" value=\"Add Assignment\">\r\n            <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n        </div>\r\n    </form>\r\n</ng-template>\r\n\r\n\r\n\r\n<!-- ******** Update Assignment marks ************ -->\r\n\r\n\r\n<ng-template #updateAssignMarksModel let-modal>\r\n    <div class=\"modal-header\">\r\n        <div style=\"text-align: center\">\r\n            <h3>Update Assignment Marks </h3>\r\n        </div>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <table class=\"table table-bordered table-hover\">\r\n            <thead class=\"thead-light\">\r\n                <tr>\r\n\r\n                    <th>Roll Num</th>\r\n                    <th>Name </th>\r\n                    <th>Total Marks</th>\r\n                    <!-- <th>Obtained Marks</th> -->\r\n                    <th>Obtained Marks</th>\r\n                    <!-- <th>Comment</th> -->\r\n                    <!-- <th>Submitted Date</th> -->\r\n                    <!-- <th *ngIf=\"(selectedexamType == 'exam')\">Update Marks</th> -->\r\n                    <!-- <th>Update Marks</th> -->\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n\r\n                <tr *ngFor=\"let item of std_assignmentDetails | paginate: { id: 'pager', itemsPerPage: pageSize, currentPage: pageNumber};let index = index\">\r\n\r\n\r\n                    <td>{{item.roll_num}}</td>\r\n                    <td>{{item.std_name}}</td>\r\n                    <td>{{ item.assign_tMarks}}</td>\r\n\r\n                    <!-- <td>{{item.obtained_marks == \"\" ? 0 :item.obtained_marks }}</td> -->\r\n\r\n                    <td><input type=\"number\" name=\"obt_marks\" #obtAssignMarks [(ngModel)]=\"item.obtained_marks\" (change)=\"addStdAssignMarks(item.assign_id,item.std_id,obtAssignMarks.value , item.assign_tMarks)\"></td>\r\n                    <!-- <td><input type=\"text\" #obtComment [(ngModel)]=\"item.comments\"></td> -->\r\n                    <!-- <td><input type=\"date\" #submitDate [(ngModel)]=\"item.assign_submit_date\"></td> -->\r\n\r\n                    <!-- <td> <label style=\"cursor: pointer;\" (click)=\"addStdAssignMarks(item.assign_id,item.std_id,obtAssignMarks.value , item.assign_tMarks)\" class=\"badge badge-info\">Update </label></td> -->\r\n\r\n                </tr>\r\n\r\n            </tbody>\r\n        </table>\r\n\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n    </div>\r\n</ng-template>\r\n\r\n\r\n\r\n\r\n\r\n\r\n<!-- ******** Upload assignments  ************ -->\r\n\r\n\r\n\r\n<ng-template #uploadAssignModal let-modal>\r\n    <div class=\"modal-header\">\r\n        <div style=\"text-align: center\">\r\n            <h3>Update Assignment Marks </h3>\r\n        </div>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <input id=\"cin\" name=\"cin\" type=\"file\" (change)=\"fileChangeEvent($event)\" placeholder=\"Upload a file...\" multiple />\r\n\r\n        <button type=\"button\" class=\"btn btn-success btn-s\" (click)=\"upload()\">\r\n      <i class=\"glyphicon glyphicon-open-file\"></i>&nbsp;Upload\r\n    </button>\r\n\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n    </div>\r\n</ng-template>"

/***/ }),

/***/ "./src/app/assignments/assignments.component.scss":
/*!********************************************************!*\
  !*** ./src/app/assignments/assignments.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/assignments/assignments.component.ts":
/*!******************************************************!*\
  !*** ./src/app/assignments/assignments.component.ts ***!
  \******************************************************/
/*! exports provided: AssignmentsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssignmentsComponent", function() { return AssignmentsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sections/manageSection.service */ "./src/app/sections/manageSection.service.ts");
/* harmony import */ var _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../classes/manageClass.service */ "./src/app/classes/manageClass.service.ts");
/* harmony import */ var _subjects_manage_subjects_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../subjects/manage-subjects.service */ "./src/app/subjects/manage-subjects.service.ts");
/* harmony import */ var _assignments_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assignments.service */ "./src/app/assignments/assignments.service.ts");
/* harmony import */ var _shared_services_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/services/common.service */ "./src/app/shared/services/common.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_7__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var AssignmentsComponent = /** @class */ (function () {
    // create instance of services to access method from services
    function AssignmentsComponent(_commonService, _classDataService, _sectionDataService, _subjectsDataService, _assignmentsService, modalService) {
        this._commonService = _commonService;
        this._classDataService = _classDataService;
        this._sectionDataService = _sectionDataService;
        this._subjectsDataService = _subjectsDataService;
        this._assignmentsService = _assignmentsService;
        this.modalService = modalService;
        this.pageSize = 10;
        this.pageNumber = 1;
        /* active session */
        this.running_session = localStorage.getItem('running_session');
        this.filesToUpload = [];
        this.title = '';
        this.dueDate = '';
        // notifications
        this.showHeading = false;
        this.disableBtn = true;
        this.imgValidation = true;
        this.uploadImage = false;
    }
    AssignmentsComponent.prototype.ngOnInit = function () {
        this.getClassData(); // get class data
    };
    // *********************************************************************************************************************** */
    /**********************************************************Read Data from DB Methods************************************** */
    // *********************************************************************************************************************** */
    // ********************************************************** **********/
    // *********************** Get all Classes data ************************/
    // ******************************************************************* */
    AssignmentsComponent.prototype.getClassData = function () {
        var _this = this;
        this._classDataService.getClassesF().subscribe(function (result) {
            _this.classdataList = result;
        });
    };
    // ********************************************************************** */
    // ************ Get Section Data Against Selected Class ***************** */
    // ********************************************************************* */
    AssignmentsComponent.prototype.getSectionByClassID = function (class_id) {
        var _this = this;
        this.selectedClass = class_id;
        // * disbale btn untill section selcted and empty section array when selected class change
        this.sectionsList = [];
        this.cSubjectsList = [];
        this.disableBtn = true;
        this._sectionDataService.getSectionF(class_id).subscribe(function (result) {
            _this.sectionsList = result;
        });
    };
    // ********************************************************************** */
    // **** Get Elective And Core Subject Data by Class ID section ID ******* */
    // ********************************************************************* */
    AssignmentsComponent.prototype.getSubjectByClassSecId = function (class_id, section_id, subjects_type) {
        var _this = this;
        this.cSubjectsList = [];
        this.disableBtn = true;
        // *** get Core subjects
        var type = 'all';
        this._subjectsDataService
            .getSubjectByClassSecIdF(class_id, section_id, this.running_session)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this.cSubjectsList = result.data;
                _this.selectedClassName = result.data[0].class_name;
                _this.selectedClsSection = result.data[0].section_name;
            }
            if (result.status === 0) {
                _this._commonService.warningToaster('No subject is added against class', '!');
            }
            if (result.status === 403) {
                console.log(result.msg);
            }
        });
    };
    // ********************************************************************** */
    // ************************* Get Assignment details ********************** */
    // ********************************************************************* */
    AssignmentsComponent.prototype.getAssignments = function (submitEvent) {
        var _this = this;
        this.showHeading = true;
        var subject_id_type = submitEvent.value.g_subject_id.split('-');
        var subject_id = subject_id_type[0];
        var subject_type = subject_id_type[1];
        this.selected_subject = subject_id;
        this.selected_subj_type = subject_type;
        this.selected_class_id = submitEvent.value.g_class_id;
        this.selected_section_id = submitEvent.value.g_section_id;
        var assignemnt_data = {
            class_id: submitEvent.value.g_class_id,
            section_id: submitEvent.value.g_section_id,
            subject_id: subject_id,
            running_session: this.running_session
        };
        this._assignmentsService
            .get_assignmentsF(assignemnt_data)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this.assignments_Data = result.data;
            }
            if (result.status === 0) {
                _this._commonService.warningToaster('No assignment is added against class', '!');
            }
            if (result.status === 403) {
                _this._commonService.warningToaster('Server error try again', 'Error!');
            }
        });
    };
    // ********************************************************************** */
    // ************* Get students for update assignment marks ************** */
    // ********************************************************************* */
    AssignmentsComponent.prototype.getStudentAssignDetails = function (assign_id) {
        var _this = this;
        var data = {
            class_id: this.selected_class_id,
            section_id: this.selected_section_id,
            subject_id: this.selected_subject,
            subject_type: this.selected_subj_type,
            running_session: this.running_session,
            assign_id: assign_id
        };
        this._assignmentsService
            .get_students_assign_details(data)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this.std_assignmentDetails = result.data;
            }
            else {
                console.log(result);
            }
        });
    };
    // ********************************************************************** */
    // ************************* Update Assignment Marks Modal ************** */
    // ********************************************************************* */
    AssignmentsComponent.prototype.updateAssignmentModal = function (modal, assign_id, assign_tMarks, index) {
        this.getStudentAssignDetails(assign_id);
        this.openModal(modal);
    };
    // *********************************************************************************************************************** */
    /**********************************************************Add Update  Data  Methods************************************** */
    // *********************************************************************************************************************** */
    // ********************************************************** **********/
    // ***************************** Assignments *************************/
    // ******************************************************************* */
    AssignmentsComponent.prototype.onClickAddAssignment = function (submitEvent) {
        var _this = this;
        // get assignment image data
        var imagesData = new FormData();
        var files = this.filesToUpload;
        if (files.length >= 1) {
            this.uploadImage = true;
        }
        for (var i = 0; i < files.length; i++) {
            imagesData.append('uploads[]', files[i], files[i]['name']);
        }
        // assignment data
        var eventHandler = submitEvent.value;
        // get current date
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var current_date = d.getFullYear() +
            '-' +
            (('' + month).length < 2 ? '0' : '') +
            month +
            '-' +
            (('' + day).length < 2 ? '0' : '') +
            day;
        // ** convert selected time to Unix timestamp
        var unix_today_date = new Date(current_date).getTime() / 1000;
        var assign_duedate = new Date(eventHandler.dueDate).getTime() / 1000;
        var add_assignment_data = {
            class_id: eventHandler.classid,
            section_id: eventHandler.sectionid,
            subject_id: eventHandler.subjectid,
            title: eventHandler.title,
            type: 'assignment',
            assign_created_date: unix_today_date,
            assign_due_date: assign_duedate,
            assign_tMarks: eventHandler.tMarks,
            year: this.running_session
        };
        this._assignmentsService
            .add_newAssignmentF(add_assignment_data)
            .subscribe(function (result) {
            if (result.status === 1) {
                // data store in tbl_images with asignment images
                if (_this.uploadImage === true) {
                    var id = JSON.stringify(result.inserted_id);
                    imagesData.append('source_id', id); // assignment id
                    imagesData.append('source_type', 'assignment');
                    // this.myInputVariable.nativeElement.value = "";
                    // add assignment images
                    _this._assignmentsService
                        .add_assignment_images(imagesData)
                        .subscribe(function (resultresp) {
                        _this.filesToUpload = [];
                    });
                }
                _this._commonService.successToaster('Added Successfully', 'Success!');
                _this.closeModal();
                submitEvent.reset();
            }
            else {
                _this._commonService.errorToaster('Server error try again', 'Error!');
            }
        });
    };
    // ********************************************************** **********/
    // ******************* Add Student Assignments Marks********************/
    // ******************************************************************* */
    AssignmentsComponent.prototype.addStdAssignMarks = function (assign_id, std_id, obtained_marks, selected_assg_t_marks) {
        var _this = this;
        if (obtained_marks > selected_assg_t_marks) {
            sweetalert2__WEBPACK_IMPORTED_MODULE_7___default()('Failed', 'Obtained marks must be less than Total marks  : ' + selected_assg_t_marks, 'warning');
            return false;
        }
        else {
            // get current date
            var d = new Date();
            var month = d.getMonth() + 1;
            var day = d.getDate();
            var current_date = d.getFullYear() +
                '-' +
                (('' + month).length < 2 ? '0' : '') +
                month +
                '-' +
                (('' + day).length < 2 ? '0' : '') +
                day;
            // ** convert selected time to Unix timestamp
            var unix_today_date = this._commonService.get_current_unix_timestamp();
            if (obtained_marks === '') {
                this._commonService.warningToaster('Obtained marks required', 'Failed!');
            }
            else {
                var std_assign_data = {
                    student_id: std_id,
                    obtained_marks: obtained_marks,
                    marked: 1,
                    assign_submit_date: unix_today_date,
                    comments: '',
                    assign_id: assign_id
                };
                this._assignmentsService
                    .update_Assignment_marks(std_assign_data)
                    .subscribe(function (result) {
                    if (result.status === 1) {
                        _this._commonService.successToaster('Updated Successfully', 'Success!');
                        // this.closeModal();
                    }
                    else {
                        _this._commonService.errorToaster('Server error try again', 'Failed!');
                    }
                });
            }
        }
    };
    // ************************************************************************************************************* */
    /*********************************************Store Assignment Images in Array******************************** */
    // ************************************************************************************************************* */
    AssignmentsComponent.prototype.fileChangeEvent = function (fileInput) {
        this.filesToUpload = fileInput.target.files;
        // this.product.photo = fileInput.target.files[0]['name'];
        // //check file is valid
        // if (!this._commonService.validateFile(filedata[0].name)) {
        //     this.imgValidation = false ;
        //     this.uploadImage = false;
        // }else{
        //    this.filesToUpload = filedata;
        //    this.imgValidation = true;
        // }
    };
    // ************************************************************************************************************* */
    /*********************************************General   Methods************************************************ */
    // ************************************************************************************************************* */
    // new modal
    AssignmentsComponent.prototype.openNgModal = function (content, size) {
        this.modalService.open(content, { size: size });
    };
    // *** Selected section class id to get subjects */
    AssignmentsComponent.prototype.sectionSelectedF = function (section_id) {
        var subject_type = 'c';
        this.getSubjectByClassSecId(this.selectedClass, section_id, subject_type);
    };
    // *** get sections against class for dropdown
    AssignmentsComponent.prototype.classSelected = function (class_id) {
        this.getSectionByClassID(class_id);
    };
    // get selected subject id
    AssignmentsComponent.prototype.funSelectedSub = function (subject_id) {
        this.selectedSubject = '';
        this.selectedSubject = subject_id;
        this.enableBtn();
    };
    /********************************* pagination Info ****************************/
    AssignmentsComponent.prototype.pageChanged = function (pN) {
        this.pageNumber = pN;
    };
    // enable manage assignment btn when section isnt empty
    AssignmentsComponent.prototype.enableBtn = function () {
        this.disableBtn = false;
    };
    // open modal
    AssignmentsComponent.prototype.openModal = function (modal) {
        this.openNgModal(modal, 'md');
    };
    // close modal
    AssignmentsComponent.prototype.closeModal = function () {
        this.modalService.dismissAll();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('imageFile'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AssignmentsComponent.prototype, "myInputVariable", void 0);
    AssignmentsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-assignments',
            template: __webpack_require__(/*! ./assignments.component.html */ "./src/app/assignments/assignments.component.html"),
            styles: [__webpack_require__(/*! ./assignments.component.scss */ "./src/app/assignments/assignments.component.scss")],
            providers: [
                _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_2__["ClassDataService"],
                _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_1__["SectionDataService"],
                _subjects_manage_subjects_service__WEBPACK_IMPORTED_MODULE_3__["SubjectsDataService"],
                _assignments_service__WEBPACK_IMPORTED_MODULE_4__["AssignmentsService"],
                _shared_services_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"]
            ]
        }),
        __metadata("design:paramtypes", [_shared_services_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"],
            _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_2__["ClassDataService"],
            _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_1__["SectionDataService"],
            _subjects_manage_subjects_service__WEBPACK_IMPORTED_MODULE_3__["SubjectsDataService"],
            _assignments_service__WEBPACK_IMPORTED_MODULE_4__["AssignmentsService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModal"]])
    ], AssignmentsComponent);
    return AssignmentsComponent;
}());



/***/ }),

/***/ "./src/app/assignments/assignments.module.ts":
/*!***************************************************!*\
  !*** ./src/app/assignments/assignments.module.ts ***!
  \***************************************************/
/*! exports provided: AssignmentsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssignmentsModule", function() { return AssignmentsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _assignments_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assignments.routing */ "./src/app/assignments/assignments.routing.ts");
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
/* harmony import */ var _assignments_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./assignments.component */ "./src/app/assignments/assignments.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










/* components */

var AssignmentsModule = /** @class */ (function () {
    function AssignmentsModule() {
    }
    AssignmentsModule = __decorate([
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
                _assignments_routing__WEBPACK_IMPORTED_MODULE_2__["routing"]
            ],
            declarations: [_assignments_component__WEBPACK_IMPORTED_MODULE_10__["AssignmentsComponent"]]
        })
    ], AssignmentsModule);
    return AssignmentsModule;
}());



/***/ }),

/***/ "./src/app/assignments/assignments.routing.ts":
/*!****************************************************!*\
  !*** ./src/app/assignments/assignments.routing.ts ***!
  \****************************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _assignments_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assignments.component */ "./src/app/assignments/assignments.component.ts");


var childRoutes = [
    {
        path: "",
        component: _assignments_component__WEBPACK_IMPORTED_MODULE_1__["AssignmentsComponent"]
    }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(childRoutes);


/***/ }),

/***/ "./src/app/assignments/assignments.service.ts":
/*!****************************************************!*\
  !*** ./src/app/assignments/assignments.service.ts ***!
  \****************************************************/
/*! exports provided: AssignmentsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssignmentsService", function() { return AssignmentsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/services/global.service */ "./src/app/shared/services/global.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AssignmentsService = /** @class */ (function () {
    function AssignmentsService(http, _globalService) {
        this.http = http;
        this._globalService = _globalService;
        this.serverLink = this._globalService.constants.serverLink;
        this.headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"](this._globalService.constants.headers);
    }
    // *********************** Call  API to add new assignment *****************************
    AssignmentsService.prototype.add_newAssignmentF = function (new_assignment_data) {
        return this.http
            .post(this.serverLink + 'add/new_assignment', new_assignment_data, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *********************** Call  API to get assignmen details *****************************
    AssignmentsService.prototype.get_assignmentsF = function (assignemnt_data) {
        return this.http
            .post(this.serverLink + 'get_assignment_details', assignemnt_data, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    AssignmentsService.prototype.upload_images = function (formData) {
        return this.http
            .post(this.serverLink + 'photos/upload', formData, {
            headers: this.headers
        })
            .map(function (files) { return files.json(); });
    };
    // *********************** getting student and assignment mark details *****************************
    AssignmentsService.prototype.get_students_assign_details = function (data) {
        return this.http
            .post(this.serverLink + 'get/student/assign_details', data, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *********************** Update student assignment marks *****************************
    AssignmentsService.prototype.update_Assignment_marks = function (data) {
        return this.http
            .post(this.serverLink + 'update/std_assignment_marks', data, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *********************** upload assignment details *****************************
    AssignmentsService.prototype.add_assignment_images = function (image_data) {
        return this.http
            .post(this.serverLink + 'upload/assignment', image_data, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    AssignmentsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__["GlobalService"]])
    ], AssignmentsService);
    return AssignmentsService;
}());



/***/ })

}]);
//# sourceMappingURL=assignments-assignments-module.js.map