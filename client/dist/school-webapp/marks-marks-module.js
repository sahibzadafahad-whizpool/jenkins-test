(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["marks-marks-module"],{

/***/ "./src/app/marks/manage-marks.service.ts":
/*!***********************************************!*\
  !*** ./src/app/marks/manage-marks.service.ts ***!
  \***********************************************/
/*! exports provided: ManageMarksService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageMarksService", function() { return ManageMarksService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/services/global.service */ "./src/app/shared/services/global.service.ts");
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




var ManageMarksService = /** @class */ (function () {
    function ManageMarksService(http, _globalService) {
        this.http = http;
        this._globalService = _globalService;
        this.headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"](this._globalService.constants.headers);
        // get server link from global services
        this.serverLink = this._globalService.constants.serverLink;
    }
    // *********************************************************************************************************************** */
    /********************************************Calling APIs  ************************************************************** */
    // *********************************************************************************************************************** */
    // ************************** Call API to get std , exam marks deatils to update . add marks   *******************************
    ManageMarksService.prototype.getStdForMngMarks = function (class_id, section_id, exam_id, subject_id, running_session, subject_type) {
        return this.http
            .get(this.serverLink +
            'get/stdForMngMarks/' +
            class_id +
            '/' +
            section_id +
            '/' +
            exam_id +
            '/' +
            subject_id +
            '/' +
            running_session +
            '/' +
            subject_type, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // ************************** Call API to add exam marks against subjects  *******************************
    ManageMarksService.prototype.addExamMarksF = function (stdMarksdata) {
        return this.http
            .post(this.serverLink + 'add/examMarks', stdMarksdata, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // ************************** Add quiz Images  *******************************
    ManageMarksService.prototype.add_quiz_images = function (images_data) {
        return this.http
            .post(this.serverLink + 'quiz/images', images_data, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    ManageMarksService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__["GlobalService"]])
    ], ManageMarksService);
    return ManageMarksService;
}());



/***/ }),

/***/ "./src/app/marks/marks.component.html":
/*!********************************************!*\
  !*** ./src/app/marks/marks.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-lg-12 \">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h4 class=\"card-title\">Exam Results</h4>\r\n                <form style=\"margin-top:2em;\" class=\"form-group\" #manageMarks=\"ngForm\" (ngSubmit)=\"onSubmitMngMarks(manageMarks)\">\r\n                    <div class=\"row\">\r\n\r\n                        <div class=\"col-md-2 form-group\">\r\n                            <label class=\"control-label\"> Exam *</label>\r\n                            <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedExam.valid && pickedExam.touched\"><small>Exam\r\n                  Required</small></span>\r\n                            <select class=\"form-control fm-control\" required style=\"margin-top:0em;\" #pickedExam [(ngModel)]=\"exam\" (change)=submitExamIdF(pickedExam.value) name=\"exam\">\r\n                <option [ngValue]=\"undefined\" disabled>Select Exam</option>\r\n                <option *ngFor=\"let item of examsDataList\" [value]=\"item.exam_id\">{{item.exam_name}}</option>\r\n              </select>\r\n\r\n                        </div>\r\n                        <div class=\"col-md-2 form-group\">\r\n                            <label class=\"control-label\"> Class *</label>\r\n                            <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedCLass.valid && pickedCLass.touched\"><small>Class\r\n                  Required</small></span>\r\n                            <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedCLass [(ngModel)]=\"classid\" (change)=classSelected(pickedCLass.value); name=\"classid\">\r\n                <option [ngValue]=\"undefined\" disabled>Select Class</option>\r\n                <option *ngFor=\"let item of classdataList\" [value]=\"item.class_id\">{{item.class_name}}</option>\r\n              </select>\r\n\r\n                        </div>\r\n\r\n                        <div class=\"col-md-2 form-group\">\r\n                            <label class=\"control-label\"> Section *</label>\r\n                            <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedSection.valid && pickedSection.touched\"><small>Section\r\n                  Required</small></span>\r\n                            <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedSection [(ngModel)]=\"section\" (change)=\"sectionSelectedF(pickedSection.value)\" name=\"section\">\r\n                <option [ngValue]=\"undefined\" disabled>Select Section</option>\r\n                <option *ngFor=\"let item of sectionsList\" [value]=\"item.section_id\">{{item.section_name}}</option>\r\n              </select>\r\n\r\n                        </div>\r\n\r\n                        <div class=\"col-md-2 form-group\">\r\n                            <label class=\"control-label\" style=\"margin-top:0em;\"> Subject * </label>\r\n                            <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedSubject.valid && pickedSubject.touched\"><small>Subject\r\n                  required</small></span>\r\n\r\n                            <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedSubject [(ngModel)]=\"subject\" (change)=funSelectedSub(pickedSubject.value) name=\"subject\">\r\n                <option [ngValue]=\"undefined\" disabled>Select Subject</option>\r\n                <option *ngFor=\"let item of cSubjectsList\" [value]=\"item.subject_id + '-' + item.subject_type\">\r\n                  {{item.subject_name}}</option>\r\n              </select>\r\n                        </div>\r\n                        <div class=\"col-md-2 form-group\" *ngIf=\"!showGrading\">\r\n                            <label class=\"control-label\" style=\"margin-top:0em;\"> Subject Total Marks * </label>\r\n                            <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedTMarks.valid && pickedTMarks.touched\"><small>Total Marks\r\n                  required</small></span>\r\n\r\n                            <input type=\"number\" required class=\"form-control fm-control\" name=\"subj_total_marks\" #pickedTMarks [(ngModel)]=\"subj_total_marks\">\r\n                        </div>\r\n\r\n                        <div class=\"col-md-2 form-group\" style=\"text-align: center ; \">\r\n                            <input type=\"submit\" class=\"btn btn-info\" style=\"margin-top:2em\" [disabled]=\"!manageMarks.form.valid || disableBtn\" value=\"Manage Marks\">\r\n\r\n                        </div>\r\n                        <div style=\"text-align: center\">\r\n                            <h5 style=\"color: red;\"> {{studentAvailabe}}</h5>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n                <div class=\"col-lg-12\" style=\"text-align:center;\">\r\n                    <span style=\"color:red;\">{{ dbRespMsg }}</span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</div>\r\n\r\n<div class=\"row\" *ngIf=\"showtable\">\r\n    <div class=\"col-lg-12 col-md-12\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <div style=\"margin-top: -3em; text-align: center; margin-bottom: 3em;\" class=\"mini-heading\">\r\n                    <h3> Manage Exam Results</h3>\r\n                    <h4>\r\n                        Class : {{selectedClassName}}\r\n                    </h4>\r\n                    <h4> Section : {{selectedClsSection}}\r\n                    </h4>\r\n                    <!-- <h4> Exam Date : {{examDate * 1000 | date}}\r\n                    </h4> -->\r\n                    <h4 *ngIf=\"!showGrading\"> Subject Total Marks : {{ subj_total_marks }}\r\n                    </h4>\r\n\r\n                </div>\r\n                <hr>\r\n\r\n                <div class=\"row\" style=\"margin-top: 1em; margin-bottom: 0em; padding-bottom: 1.5em; padding-top: 0em;\">\r\n                    <div class=\"col-lg-4\">\r\n                        <input class=\"form-control fm-control\" [(ngModel)]=\"searchText\" placeholder=\"Roll Num / Student Name\">\r\n                    </div>\r\n\r\n                </div>\r\n                <table class=\"table table-bordered table-hover\">\r\n                    <thead *ngIf=\"(grading_type == 1)\">\r\n                        <tr>\r\n                            <th>S.No</th>\r\n                            <th>Roll Num</th>\r\n                            <th>Name </th>\r\n                            <!-- <th>Total Marks</th> -->\r\n\r\n                            <th>Obtained Marks</th>\r\n\r\n                        </tr>\r\n                    </thead>\r\n\r\n                    <thead *ngIf=\"(grading_type == 2)\">\r\n                        <tr>\r\n                            <th>S.No</th>\r\n                            <th>Roll Num</th>\r\n                            <th>Name </th>\r\n\r\n                            <th> Update Grading</th>\r\n                            <!-- <th>Update</th> -->\r\n\r\n                        </tr>\r\n                    </thead>\r\n\r\n                    <tbody *ngIf=\"(grading_type == 1)\">\r\n                        <tr *ngFor=\"let item of stdExamMarksList | filter : searchText  | paginate: { id: 'pager', itemsPerPage: pageSize, currentPage: pageNumber};let index = index\">\r\n\r\n                            <td>{{index + 1}}</td>\r\n                            <td>{{item.roll_num}}</td>\r\n                            <td>{{item.std_name}}</td>\r\n\r\n                            <td>\r\n\r\n                                <input type=\"number\" name=\"obt_marks\" #oMarks [(ngModel)]=\"item.obtained_marks\" (change)=\"addExamMarks(item.class_id,item.section_id,item.std_id,oMarks.value, 1)\">\r\n\r\n                            </td>\r\n\r\n                        </tr>\r\n                    </tbody>\r\n\r\n                    <tbody *ngIf=\"(grading_type == 2)\">\r\n                        <tr *ngFor=\"let item of stdExamMarksList | filter : searchText  | paginate: { id: 'pager', itemsPerPage: pageSize, currentPage: pageNumber};let index = index\">\r\n\r\n                            <td>{{index + 1}}</td>\r\n                            <td>{{item.roll_num}}</td>\r\n                            <td>{{item.std_name}}</td>\r\n\r\n                            <!-- <td>{{ item.obtained_marks }}</td> -->\r\n\r\n                            <td>\r\n\r\n                                <select #gradingaction class=\"form-group\" name=\"userselectedgrade\" (change)=\"addExamMarks(item.class_id,item.section_id,item.std_id,gradingaction.value, 2)\" title=\"Actions\">\r\n                  <option hidden value=\"\" disabled selected>Select Grade </option>\r\n                  <option value='A1' [selected]=\"item.obtained_marks == 'A1'\"> A1 </option>\r\n                  <option value='A+' [selected]=\"item.obtained_marks == 'A+'\"> A+ </option>\r\n                  <option value='A' [selected]=\"item.obtained_marks == 'A'\"> A </option>\r\n                  <option value='B' [selected]=\"item.obtained_marks == 'B'\"> B </option>\r\n                  <option value='C' [selected]=\"item.obtained_marks == 'C'\"> C </option>\r\n                  <option value='D' [selected]=\"item.obtained_marks == 'D'\"> D</option>\r\n                </select>\r\n                            </td>\r\n\r\n                            <!--\r\n                            <td>\r\n                                <label class=\"badge badge-info\" style=\"cursor: pointer;\" (click)=\"addExamMarks(item.class_id,item.section_id,item.std_id,gradingaction.value, 2)\">Update\r\n                  Grade </label>\r\n                            </td> -->\r\n\r\n                        </tr>\r\n                    </tbody>\r\n\r\n                </table>\r\n\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n\r\n</div>\r\n\r\n<!-- *********************************** Modals **************************************** -->\r\n\r\n<!-- ******** Update Quiz Marks ************ -->\r\n\r\n<ng-template #updateQuizMarksModel let-modal>\r\n    <div class=\"modal-header\">\r\n        <div style=\"text-align: center\">\r\n            <h3>Update Quiz Marks</h3>\r\n        </div>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <form class=\"form-group\" #updateQMarks=\"ngForm\" (ngSubmit)=\"onClickUpdateQuizMarks(updateQMarks)\">\r\n\r\n            <label class=\"control-label\"> Exam Total Marks</label>\r\n\r\n            <input type=\"text\" required class=\"form-control fm-control\" name=\"examTMarks\" placeholder=\"Exam Total Marks\" [(ngModel)]=\"examTMarks\" #pickedexamTMarks=\"ngModel\">\r\n            <p style=\"color: red\" *ngIf=\"!pickedexamTMarks.valid && pickedexamTMarks.touched\" style=\"margin-top:1em; margin-left:0em;\">\r\n                Required!\r\n            </p>\r\n            <label class=\"control-label\">Obtained Marks</label>\r\n            <input type=\"number\" required class=\"form-control fm-control\" name=\"q_obtained_marks\" [(ngModel)]=\"q_obtained_marks\" #pickedqobtained_marks=\"ngModel\">\r\n            <!-- <p class=\"alert alert-danger\" *ngIf=\"!pickedqobtained_marks.valid && pickedqobtained_marks.touched\"\r\n              style=\"margin-top:1em; margin-left:0em;\">\r\n              Required!\r\n            </p> -->\r\n\r\n            <label class=\"control-label\" style=\"margin-top:0em;\"> Quiz Images <span style=\"color:red;\">\r\n        </span></label>\r\n            <input id=\"quiz_image\" #imageFile accept=\"image/*\" class=\"form-control fm-control\" name=\"quiz_image\" type=\"file\" (change)=\"fileChangeEvent($event)\" placeholder=\"Upload a file...\" multiple />\r\n            <div class=\"modal_button\" style=\"text-align:right\">\r\n\r\n                <input type=\"submit\" class=\"btn btn-info\" [disabled]=\"!updateQMarks.form.valid\" value=\"Update\" style=\"margin-top: 1em;\">\r\n            </div>\r\n        </form>\r\n\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n    </div>\r\n</ng-template>"

/***/ }),

/***/ "./src/app/marks/marks.component.scss":
/*!********************************************!*\
  !*** ./src/app/marks/marks.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/marks/marks.component.ts":
/*!******************************************!*\
  !*** ./src/app/marks/marks.component.ts ***!
  \******************************************/
/*! exports provided: MarksComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarksComponent", function() { return MarksComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _shared_services_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/services/common.service */ "./src/app/shared/services/common.service.ts");
/* harmony import */ var _students_student_information_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../students/student-information.service */ "./src/app/students/student-information.service.ts");
/* harmony import */ var _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../sections/manageSection.service */ "./src/app/sections/manageSection.service.ts");
/* harmony import */ var _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../classes/manageClass.service */ "./src/app/classes/manageClass.service.ts");
/* harmony import */ var _subjects_manage_subjects_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../subjects/manage-subjects.service */ "./src/app/subjects/manage-subjects.service.ts");
/* harmony import */ var _exams_add_exams_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../exams/add-exams.service */ "./src/app/exams/add-exams.service.ts");
/* harmony import */ var _manage_marks_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./manage-marks.service */ "./src/app/marks/manage-marks.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MarksComponent = /** @class */ (function () {
    // create instance of services to access method from services
    function MarksComponent(_classDataService, _sectionDataService, _addExamsService, _subjectsDataService, _manageMarksService, modalService, _commonService) {
        this._classDataService = _classDataService;
        this._sectionDataService = _sectionDataService;
        this._addExamsService = _addExamsService;
        this._subjectsDataService = _subjectsDataService;
        this._manageMarksService = _manageMarksService;
        this.modalService = modalService;
        this._commonService = _commonService;
        // default
        this.tabtitle = 'Manage Marks';
        this.pageSize = 10;
        this.pageNumber = 1;
        /* active session */
        this.running_session = localStorage.getItem('running_session');
        this.selectedClassName = '';
        this.selectedexamType = '';
        this.filesToUpload = [];
        // notification
        this.disableBtn = true;
        this.dbRespMsg = '';
        this.updatemarksMsg = '';
        this.manageMArksStatus = false;
        this.alertType = '';
        this.showtable = false;
        this.showGrading = true;
    }
    // this function auto called when component loads
    MarksComponent.prototype.ngOnInit = function () {
        this.getClassData(); // get class data
        this.getExamsinfo();
    };
    // *********************************************************************************************************************** */
    /**********************************************************Read Data from DB Methods************************************** */
    // *********************************************************************************************************************** */
    // ********************************************************** **********/
    // *********************** Get all Classes data ************************/
    // ******************************************************************* */
    MarksComponent.prototype.getClassData = function () {
        var _this = this;
        this._classDataService.getClassesF().subscribe(function (result) {
            _this.classdataList = result;
        });
    };
    // ********************************************************** **********/
    // *********************** Get all exams data ************************/
    // ******************************************************************* */
    MarksComponent.prototype.getExamsinfo = function () {
        var _this = this;
        this._addExamsService
            .getExamInfoFun(this.running_session)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this.examsDataList = result.data;
            }
            if (result.status === 0) {
                _this.dbRespMsg = 'No exam is added';
            }
            if (result.status === 403) {
                _this.dbRespMsg = result.msg;
            }
        });
    };
    // ********************************************************************** */
    // ************ Get Section Data Against Selected Class ***************** */
    // ********************************************************************* */
    MarksComponent.prototype.getSectionByClassID = function (class_id) {
        var _this = this;
        this.selectedClass = class_id;
        // * disbale btn untill section selcted and empty section array when selected class change
        this.sectionsList = [];
        this.cSubjectsList = [];
        this.selectedClsSection = ''; // unset the varibale on selected class  changed
        this.selectedClassName = ''; //
        this.disableBtn = true;
        this._sectionDataService.getSectionF(class_id).subscribe(function (result) {
            _this.sectionsList = result;
        });
    };
    // ********************************************************************** */
    // ******* Get Elective And Core Subject Data by Class ID section ID **************** */
    // ********************************************************************* */
    MarksComponent.prototype.getSubjectByClassSecId = function (class_id, section_id, subjects_type) {
        var _this = this;
        this.cSubjectsList = [];
        this.disableBtn = true;
        // *** get Core subjects
        this._subjectsDataService
            .getSubjectByClassSecIdF(class_id, section_id, this.running_session)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this.cSubjectsList = result.data;
                _this.selectedClassName = _this.cSubjectsList[0].class_name;
                _this.selectedClsSection = _this.cSubjectsList[0].section_name;
            }
            if (result.status === 0) {
                _this.dbRespMsg = 'No subject is added against class';
            }
            if (result.status === 403) {
                _this.dbRespMsg = result.msg;
            }
        });
    };
    // *********************************************************************************** */
    // ***** Get students details against class and section to mark numbers against exams **** */
    // ************************************************************************************ */
    MarksComponent.prototype.getStudentMarks = function (class_id, section_id, exam_id, subject_id, subject_type) {
        var _this = this;
        this.stdExamMarksList = [];
        this.getSelectedExam = '';
        this.examDate = '';
        this.examTMarks = '';
        this.showtable = true;
        this.dbRespMsg = '';
        this._manageMarksService
            // call function to get student marks details against selected subject to mark marks or update marks
            .getStdForMngMarks(class_id, section_id, exam_id, subject_id, this.running_session, subject_type)
            .subscribe(function (result) {
            if (result.status === 1) {
                // comp prev added total marks with new t marks
                if (result.data[0].total_marks !== null &&
                    Number(_this.grading_type) === 1) {
                    if (result.data[0].total_marks !== _this.subj_total_marks) {
                        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default()('Invalid Total Marks!', 'Total Marks doesnt match with previously added total marks ' +
                            result.data[0].total_marks, 'warning');
                        _this.showtable = false;
                        return false;
                    }
                    else {
                        _this.stdExamMarksList = result.data;
                        _this.getSelectedExam = _this.stdExamMarksList[0].exam_name;
                        _this.examDate = _this.stdExamMarksList[0].exam_date;
                        _this.examTMarks = _this.stdExamMarksList[0].exam_tmarks;
                    }
                }
                else {
                    _this.stdExamMarksList = result.data;
                    _this.getSelectedExam = _this.stdExamMarksList[0].exam_name;
                    _this.examDate = _this.stdExamMarksList[0].exam_date;
                    _this.examTMarks = _this.stdExamMarksList[0].exam_tmarks;
                }
            }
            if (result.status === 0) {
                _this.showtable = false;
                _this.dbRespMsg = 'No students  added against class';
            }
            if (result.status === 403) {
                _this.showtable = false;
                _this.dbRespMsg = result.msg;
            }
        });
    };
    // *********************************************************************************************************************** */
    /**********************************************************Add Update  Data  Methods************************************** */
    // *********************************************************************************************************************** */
    // ************************************************************************************************************* */
    /*********************************************Store Assignment Images in Array******************************** */
    // ************************************************************************************************************* */
    MarksComponent.prototype.fileChangeEvent = function (fileInput) {
        this.filesToUpload = fileInput.target.files;
        // this.product.photo = fileInput.target.files[0]['name'];
    };
    // ********************************************************** **********/
    // ********* Mark student marks against  subject *************************/
    // ******************************************************************* */
    MarksComponent.prototype.addExamMarks = function (class_id, section_id, std_id, obtained_marks_grade, grading_type) {
        var _this = this;
        this.updatemarksMsg = '';
        if (+grading_type === 1) {
            if (obtained_marks_grade === '') {
                sweetalert2__WEBPACK_IMPORTED_MODULE_1___default()('oops!', 'Kindly enter the obtained marks.', 'warning');
                return false;
            }
            if (obtained_marks_grade > this.subj_total_marks) {
                sweetalert2__WEBPACK_IMPORTED_MODULE_1___default()('Oops...', 'Obtained marks must be less than total marks ' +
                    this.subj_total_marks +
                    '.', 'warning');
                return false;
            }
        }
        if (+grading_type === 2) {
            if (obtained_marks_grade === '') {
                sweetalert2__WEBPACK_IMPORTED_MODULE_1___default()('oops!', 'Kindly enter Grade.', 'warning');
                return false;
            }
        }
        // if grading method is percent grading than obtained letter grades else numbers.
        var obtained_marks = obtained_marks_grade;
        var totalMarks = +grading_type === 1 ? Number(this.subj_total_marks) : '';
        // if grading method is Letter grading
        var stdMarksdata = {
            class_id: class_id,
            section_id: section_id,
            student_id: std_id,
            obtained_marks: obtained_marks,
            total_marks: totalMarks,
            subject_id: Number(this.selectedSubject),
            running_session: this.running_session,
            exam_id: Number(this.selectedExamId),
            exam_type: 'exam'
        };
        // call function to add exam marks against selected subject
        this._manageMarksService.addExamMarksF(stdMarksdata).subscribe(function (result) {
            if (result.status === 1) {
                _this._commonService.successToaster('Updated Successfully', 'Success!');
                var subject_type = _this.selected_subject_type; // need param to call function
                // call function to load data after update marks
                _this.getStudentMarks(class_id, section_id, _this.selectedExamId, _this.selectedSubject, subject_type);
            }
            else {
                _this._commonService.errorToaster(result.msg, 'Error!');
            }
        });
    };
    // ********************************************************** **********/
    // ********* Update Quiz  marks *************************/
    // ******************************************************************* */
    MarksComponent.prototype.onClickUpdateQuizMarks = function (submitEvent) {
        // get quiz images
        var _this = this;
        var imagesData = new FormData();
        var files = this.filesToUpload;
        // console.log(files);
        for (var i = 0; i < files.length; i++) {
            imagesData.append('uploads[]', files[i], files[i]['name']);
        }
        // quiz details
        var stdMarksdata = {
            class_id: this.q_class_id,
            section_id: this.q_section_id,
            student_id: this.q_std_id,
            obtained_marks: Number(submitEvent.value.q_obtained_marks),
            total_marks: Number(submitEvent.value.examTMarks),
            subject_id: Number(this.selectedSubject),
            running_session: this.running_session,
            exam_id: Number(this.selectedExamId),
            exam_type: this.selectedexamType
        };
        // call function to add exam marks against selected subject
        this._manageMarksService.addExamMarksF(stdMarksdata).subscribe(function (result) {
            if (result.status === 1) {
                // data store in tbl_images with quiz images
                var id = JSON.stringify(result.inserted_id);
                imagesData.append('source_id', id); // student quiz id
                imagesData.append('source_type', 'quiz');
                // this.myInputVariable.nativeElement.value = '';
                // calling add quiz images API
                _this._manageMarksService
                    .add_quiz_images(imagesData)
                    .subscribe(function (resultresp) {
                    _this.filesToUpload = [];
                });
                _this._commonService.successToaster('Updated Successfully', 'Success!');
                var subject_type = _this.selected_subject_type; // need param to call function
                // call function to load data after update marks
                _this.getStudentMarks(_this.q_class_id, _this.q_section_id, _this.selectedExamId, _this.selectedSubject, subject_type);
            }
            else {
                _this._commonService.errorToaster('Server error try again', 'Error!');
            }
        });
    };
    // ************************************************************************************************************* */
    /*********************************************General   Methods************************************************ */
    // ************************************************************************************************************* */
    // new modal
    MarksComponent.prototype.openNgModal = function (content, size) {
        this.modalService.open(content, { size: size });
    };
    // *** Selected section class id to get subjects */
    MarksComponent.prototype.sectionSelectedF = function (section_id) {
        var subject_type = 'c';
        this.getSubjectByClassSecId(this.selectedClass, section_id, subject_type);
    };
    // *** get sections against class for dropdown
    MarksComponent.prototype.classSelected = function (class_id) {
        this.getSectionByClassID(class_id);
    };
    // selected subject id
    MarksComponent.prototype.funSelectedSub = function (subject_id) {
        this.selectedSubject = '';
        var subject_id_type = subject_id.split('-');
        this.selectedSubject = subject_id_type[0];
        this.selected_subject_type = subject_id_type[1];
        this.enableBtn();
    };
    // selected exam id
    MarksComponent.prototype.submitExamIdF = function (exam_id) {
        this.showtable = false;
        this.selectedExamId = exam_id;
        this.grading_type = this.searchGradingType(exam_id);
        if (+this.grading_type === 1) {
            this.showGrading = false;
        }
        else {
            this.showGrading = true;
        }
    };
    MarksComponent.prototype.submitExamTypeF = function (exam_type) {
        this.selectedexamType = exam_type;
        this.examsDataList = [];
        this.getExamsinfo(); // get exam data against selected type
    };
    // **************** on submit manage core subject marks ********************
    MarksComponent.prototype.onSubmitMngMarks = function (submitEvent) {
        var eventData = submitEvent.value;
        var class_id = Number(eventData.classid);
        var section_id = Number(eventData.section);
        var exam_id = Number(eventData.exam);
        var subject_id_type = eventData.subject.split('-');
        var subject_id = subject_id_type[0];
        var subject_type = subject_id_type[1];
        this.getStudentMarks(class_id, section_id, exam_id, subject_id, subject_type);
    };
    // ****************** on submit manage elective subjects ******************
    MarksComponent.prototype.onSubmitMngESubjMarks = function (submitEvent) {
        var eventData = submitEvent.value;
        var class_id = Number(eventData.classid);
        var section_id = Number(eventData.section);
        var exam_id = Number(eventData.exam);
        var subject_id = Number(eventData.subject);
        var subject_type = 'elective';
        this.getStudentMarks(class_id, section_id, exam_id, subject_id, subject_type);
    };
    // ************** upload quiz marks , open modal , upload images  ***********
    MarksComponent.prototype.updateQuizModal = function (modal, class_id, section_id, std_id, index) {
        this.openNgModal(modal, 'md');
        this.q_obtained_marks = this.stdExamMarksList[index].obtained_marks;
        this.q_section_id = section_id;
        this.q_class_id = class_id;
        this.q_std_id = std_id;
    };
    /********************************* pagination Info ****************************/
    MarksComponent.prototype.pageChanged = function (pN) {
        this.pageNumber = pN;
    };
    // enable manage attendance btn when section isnt empty
    MarksComponent.prototype.enableBtn = function () {
        this.disableBtn = false;
    };
    // hide success toaster after 2 secs
    MarksComponent.prototype.FadeOutToaster = function () {
        setTimeout(function () {
            // this.attendanceNotifiction = 0;
        }, 1000);
    };
    MarksComponent.prototype.FadeOutUpdateErrorToaster = function () {
        var _this = this;
        setTimeout(function () {
            _this.manageMArksStatus = false;
        }, 3000);
    };
    // open modal
    MarksComponent.prototype.openModal = function (modal) {
        this.openNgModal(modal, 'md');
    };
    // close modal
    MarksComponent.prototype.closeModal = function (modal) {
        modal.close();
    };
    // return grading type against exam id
    MarksComponent.prototype.searchGradingType = function (examid) {
        for (var i = 0; i < this.examsDataList.length; i++) {
            if (+this.examsDataList[i].exam_id === +examid) {
                return this.examsDataList[i].grading_method;
            }
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('imageFile'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], MarksComponent.prototype, "myInputVariable", void 0);
    MarksComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-marks',
            template: __webpack_require__(/*! ./marks.component.html */ "./src/app/marks/marks.component.html"),
            styles: [__webpack_require__(/*! ./marks.component.scss */ "./src/app/marks/marks.component.scss")],
            providers: [
                _students_student_information_service__WEBPACK_IMPORTED_MODULE_4__["StudentsInfoService"],
                _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_6__["ClassDataService"],
                _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_5__["SectionDataService"],
                _exams_add_exams_service__WEBPACK_IMPORTED_MODULE_8__["AddExamsService"],
                _subjects_manage_subjects_service__WEBPACK_IMPORTED_MODULE_7__["SubjectsDataService"],
                _manage_marks_service__WEBPACK_IMPORTED_MODULE_9__["ManageMarksService"],
                _shared_services_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"]
            ]
        }),
        __metadata("design:paramtypes", [_classes_manageClass_service__WEBPACK_IMPORTED_MODULE_6__["ClassDataService"],
            _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_5__["SectionDataService"],
            _exams_add_exams_service__WEBPACK_IMPORTED_MODULE_8__["AddExamsService"],
            _subjects_manage_subjects_service__WEBPACK_IMPORTED_MODULE_7__["SubjectsDataService"],
            _manage_marks_service__WEBPACK_IMPORTED_MODULE_9__["ManageMarksService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModal"],
            _shared_services_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"]])
    ], MarksComponent);
    return MarksComponent;
}());



/***/ }),

/***/ "./src/app/marks/marks.module.ts":
/*!***************************************!*\
  !*** ./src/app/marks/marks.module.ts ***!
  \***************************************/
/*! exports provided: MarksModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarksModule", function() { return MarksModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _marks_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./marks.routing */ "./src/app/marks/marks.routing.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng2-select */ "./node_modules/ng2-select/index.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ng2_select__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-modal */ "./node_modules/ngx-modal/index.js");
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ngx_modal__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _search_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./search.pipe */ "./src/app/marks/search.pipe.ts");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _marks_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./marks.component */ "./src/app/marks/marks.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










/* components */

var MarksModule = /** @class */ (function () {
    function MarksModule() {
    }
    MarksModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                ng2_search_filter__WEBPACK_IMPORTED_MODULE_8__["Ng2SearchPipeModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_4__["NgxPaginationModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
                ng2_select__WEBPACK_IMPORTED_MODULE_5__["SelectModule"],
                ngx_modal__WEBPACK_IMPORTED_MODULE_6__["ModalModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_3__["HttpModule"],
                _marks_routing__WEBPACK_IMPORTED_MODULE_2__["routing"]
            ],
            declarations: [_marks_component__WEBPACK_IMPORTED_MODULE_10__["MarksComponent"], _search_pipe__WEBPACK_IMPORTED_MODULE_7__["SearchPipe"]]
        })
    ], MarksModule);
    return MarksModule;
}());



/***/ }),

/***/ "./src/app/marks/marks.routing.ts":
/*!****************************************!*\
  !*** ./src/app/marks/marks.routing.ts ***!
  \****************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _marks_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./marks.component */ "./src/app/marks/marks.component.ts");


var childRoutes = [
    {
        path: '',
        component: _marks_component__WEBPACK_IMPORTED_MODULE_1__["MarksComponent"]
    }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(childRoutes);


/***/ }),

/***/ "./src/app/marks/search.pipe.ts":
/*!**************************************!*\
  !*** ./src/app/marks/search.pipe.ts ***!
  \**************************************/
/*! exports provided: SearchPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchPipe", function() { return SearchPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SearchPipe = /** @class */ (function () {
    function SearchPipe() {
    }
    SearchPipe.prototype.transform = function (items, filterdata) {
        if (!items) {
            return [];
        }
        if (!filterdata) {
            return items;
        }
        filterdata = filterdata.toString();
        return items.filter(function (searchValue) {
            var rVal = JSON.stringify(searchValue.roll_num).includes(filterdata) ||
                JSON.stringify(searchValue.std_name).includes(filterdata);
            return rVal;
        });
    };
    SearchPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'filter'
        })
    ], SearchPipe);
    return SearchPipe;
}());



/***/ })

}]);
//# sourceMappingURL=marks-marks-module.js.map