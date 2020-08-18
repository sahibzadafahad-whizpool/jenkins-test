(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["quizes-quizes-module"],{

/***/ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js":
/*!*****************************************************************!*\
  !*** ./node_modules/ng2-search-filter/ng2-search-filter.es5.js ***!
  \*****************************************************************/
/*! exports provided: Ng2SearchPipeModule, Ng2SearchPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ng2SearchPipeModule", function() { return Ng2SearchPipeModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ng2SearchPipe", function() { return Ng2SearchPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

var Ng2SearchPipe = /** @class */ (function () {
    function Ng2SearchPipe() {
    }
    /**
     * @param {?} items object from array
     * @param {?} term term's search
     * @return {?}
     */
    Ng2SearchPipe.prototype.transform = function (items, term) {
        if (!term || !items)
            return items;
        return Ng2SearchPipe.filter(items, term);
    };
    /**
     *
     * @param {?} items List of items to filter
     * @param {?} term  a string term to compare with every property of the list
     *
     * @return {?}
     */
    Ng2SearchPipe.filter = function (items, term) {
        var /** @type {?} */ toCompare = term.toLowerCase();
        return items.filter(function (item) {
            for (var /** @type {?} */ property in item) {
                if (item[property] === null) {
                    continue;
                }
                if (item[property].toString().toLowerCase().includes(toCompare)) {
                    return true;
                }
            }
            return false;
        });
    };
    return Ng2SearchPipe;
}());
Ng2SearchPipe.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"], args: [{
                name: 'filter',
                pure: false
            },] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
];
/**
 * @nocollapse
 */
Ng2SearchPipe.ctorParameters = function () { return []; };
var Ng2SearchPipeModule = /** @class */ (function () {
    function Ng2SearchPipeModule() {
    }
    return Ng2SearchPipeModule;
}());
Ng2SearchPipeModule.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                declarations: [Ng2SearchPipe],
                exports: [Ng2SearchPipe]
            },] },
];
/**
 * @nocollapse
 */
Ng2SearchPipeModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */

//# sourceMappingURL=ng2-search-filter.es5.js.map


/***/ }),

/***/ "./src/app/quizes/quizes.component.html":
/*!**********************************************!*\
  !*** ./src/app/quizes/quizes.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-md-12 col-lg-12\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n\r\n                <h4 class=\"card-title\">Quizes Information</h4>\r\n\r\n\r\n                <div class=\"row\">\r\n                    <div class=\"pull-right col-lg-12\">\r\n                        <div class=\"col-lg-3 pull-right \" style=\"padding-bottom: 1.5em;\">\r\n\r\n                            <button _ngcontent-c2=\"\" (click)=\"openNgModal(addQuizModel ,'lg')\" class=\"btn btn-success btn-block\">New\r\n                Quiz\r\n                <i _ngcontent-c2=\"\" class=\"mdi mdi-plus\"></i></button>\r\n                        </div>\r\n                    </div>\r\n\r\n\r\n                    <div class=\"col-lg-12 col-md-12\">\r\n                        <hr>\r\n                        <form style=\"margin-top:2em;\" class=\"form-group\" #Quizes=\"ngForm\" (ngSubmit)=\"submitgetQuizes(Quizes)\">\r\n                            <div class=\"row\">\r\n\r\n                                <div class=\"col-md-4 form-group\">\r\n                                    <label class=\"control-label\"> Class *</label>\r\n                                    <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedgCLass.valid && pickedgCLass.touched\"><small>Class\r\n                      Required</small></span>\r\n                                    <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedgCLass [(ngModel)]=\"g_class_id\" (change)=\"getSectionByClassID(pickedgCLass.value)\" name=\"g_class_id\">\r\n                    <option [ngValue]=\"undefined\" disabled>Select Class</option>\r\n                    <option *ngFor=\"let item of classdataList\" [value]=\"item.class_id\">{{item.class_name}}</option>\r\n                  </select>\r\n\r\n                                </div>\r\n\r\n                                <div class=\"col-md-4 form-group\">\r\n                                    <label class=\"control-label\"> Section *</label>\r\n                                    <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedgSection.valid && pickedgSection.touched\"><small>Section\r\n                      Required</small></span>\r\n                                    <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedgSection [(ngModel)]=\"g_section_id\" (change)=\"sectionSelectedF(pickedgSection.value)\" name=\"g_section_id\">\r\n                    <option [ngValue]=\"undefined\" disabled>Select Section</option>\r\n                    <option *ngFor=\"let item of sectionsList\" [value]=\"item.section_id\">{{item.section_name}}</option>\r\n                  </select>\r\n\r\n                                </div>\r\n\r\n                                <div class=\"col-md-4 form-group\">\r\n                                    <label class=\"control-label\" style=\"margin-top:0em;\"> Subject * </label>\r\n                                    <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedUSubject.valid && pickedUSubject.touched\"><small>Subject\r\n                      required</small></span>\r\n\r\n                                    <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedUSubject [(ngModel)]=\"g_subject_id\" (change)=funSelectedSub(pickedUSubject.value) name=\"g_subject_id\">\r\n                    <option [ngValue]=\"undefined\" disabled>Select Subject</option>\r\n                    <option *ngFor=\"let item of cSubjectsList\" [value]=\"item.subject_id + '-' + item.subject_type\">\r\n                      {{item.subject_name}}</option>\r\n                  </select>\r\n                                </div>\r\n\r\n                                <div class=\"col-md-12 form-group\" style=\"text-align: center\">\r\n                                    <input type=\"submit\" class=\"btn btn-info\" style=\"margin-top:1em\" [disabled]=\"!Quizes.form.valid || disableBtn\" value=\"List Quizes\">\r\n\r\n                                </div>\r\n\r\n                            </div>\r\n                        </form>\r\n\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\" *ngIf=\"showtable\">\r\n\r\n                    <div class=\"col-lg-12 col-md-12\">\r\n\r\n                        <div style=\"text-align: center;\" class=\"mini-heading\">\r\n                            <h3> List Quiz Details</h3>\r\n                            <h4>\r\n                                Class : {{selectedClassName}}\r\n                            </h4>\r\n                            <h4> Section : {{selectedClsSection}}\r\n                            </h4>\r\n                        </div>\r\n                        <hr>\r\n                        <div style=\"height:50px;\">\r\n\r\n                        </div>\r\n\r\n                        <table class=\"table table-bordered table-hover\">\r\n                            <thead class=\"thead-light\">\r\n                                <tr>\r\n                                    <th>S.No</th>\r\n                                    <th>Quiz Title</th>\r\n                                    <th>Subject </th>\r\n                                    <th> Quiz Date</th>\r\n                                    <th> Total Marks</th>\r\n                                    <th> Actions</th>\r\n\r\n\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr *ngFor=\"let item of quiz_Data | paginate: { id: 'pager', itemsPerPage: pageSize, currentPage: pageNumber};let index = index\">\r\n\r\n                                    <td>{{index + 1}}</td>\r\n                                    <td>{{ item .quiz_title}}</td>\r\n                                    <td>{{item.subject_name}}</td>\r\n                                    <td>{{item.quiz_date * 1000 | date}}</td>\r\n                                    <td>{{item.quiz_t_marks}}</td>\r\n\r\n\r\n                                    <td> <label style=\"cursor: pointer;\" (click)=\"updateQuizModal(updateQuizModel,item.quiz_id)\" class=\"badge badge-info\">Update Marks </label></td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n<!-- *********************************** Modals **************************************** -->\r\n\r\n\r\n<!-- ******** Add Quiz ************ -->\r\n\r\n\r\n<ng-template #addQuizModel let-modal>\r\n    <div class=\"modal-header\">\r\n        <div style=\"text-align: center\">\r\n            <h3>Add Quiz</h3>\r\n        </div>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n    </div>\r\n\r\n    <form class=\"form-group\" #addQuiz=\"ngForm\" (ngSubmit)=\"onClickAddQuiz(addQuiz)\">'\r\n        <div class=\"modal-body\">\r\n\r\n            <div class=\"row\">\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\"> Class *</label>\r\n                    <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedCLass.valid && pickedCLass.touched\"><small>Class\r\n              Required</small></span>\r\n                    <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedCLass [(ngModel)]=\"classid\" (change)=classSelected(pickedCLass.value); name=\"classid\">\r\n            <option [ngValue]=\"undefined\" disabled>Select Class</option>\r\n            <option *ngFor=\"let item of classdataList\" [value]=\"item.class_id\">{{item.class_name}}</option>\r\n          </select>\r\n\r\n                </div>\r\n\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\"> Section *</label>\r\n                    <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedSection.valid && pickedSection.touched\"><small>Section\r\n              Required</small></span>\r\n                    <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedSection [(ngModel)]=\"sectionid\" (change)=\"sectionSelectedF(pickedSection.value)\" name=\"sectionid\">\r\n            <option [ngValue]=\"undefined\" disabled>Select Section</option>\r\n            <option *ngFor=\"let item of sectionsList\" [value]=\"item.section_id\">{{item.section_name}}</option>\r\n          </select>\r\n\r\n                </div>\r\n\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:0em;\"> Subject * </label>\r\n                    <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedSubject.valid && pickedSubject.touched\"><small>Subject\r\n              required</small></span>\r\n\r\n                    <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedSubject [(ngModel)]=\"subjectid\" (change)=funSelectedSub(pickedSubject.value) name=\"subjectid\">\r\n            <option [ngValue]=\"undefined\" disabled>Select Subject</option>\r\n            <option *ngFor=\"let item of cSubjectsList\" [value]=\"item.subject_id + '-' + item.subject_type\">{{item.subject_name}}\r\n\r\n            </option>\r\n          </select>\r\n                </div>\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:0em;\">Quiz Title * <span style=\"color:red;\"\r\n              *ngIf=\"!pickedassign.valid && pickedassign.touched\"><small>\r\n                Required</small> </span></label>\r\n                    <input type=\"text\" required style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"title\" placeholder=\"Quiz Title\" [(ngModel)]=\"title\" #pickedassign=\"ngModel\">\r\n                </div>\r\n\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:0em;\">Quiz Date * <span style=\"color:red;\"\r\n              *ngIf=\"!pickeddueDate.valid && pickeddueDate.touched\"><small>\r\n                Quiz Date Required</small> </span></label>\r\n                    <input type=\"date\" required style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"quizDate\" placeholder=\"Name\" [(ngModel)]=\"quizDate\" #pickeddueDate=\"ngModel\">\r\n                </div>\r\n\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:0em;\">Total Marks * <span style=\"color:red;\"\r\n              *ngIf=\"!pickedTM.valid && pickedTM.touched\"><small>\r\n                Marks Required</small> </span></label>\r\n                    <input type=\"number\" required style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"quiz_t_marks\" placeholder=\"Total Marks\" [(ngModel)]=\"quiz_t_marks\" #pickedTM=\"ngModel\">\r\n                </div>\r\n\r\n\r\n                <div class=\"col-md-12 form-group  modal_button\" style=\"text-align:right;\">\r\n\r\n\r\n                </div>\r\n            </div>\r\n\r\n\r\n        </div>\r\n        <div class=\"modal-footer\">\r\n            <input type=\"submit\" class=\"btn btn-info\" [disabled]=\"!addQuiz.form.valid || disableBtn\" value=\"Add Quiz\">\r\n            <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n        </div>\r\n    </form>\r\n</ng-template>\r\n\r\n\r\n\r\n<!-- ******** Update Student Quiz marks ************ -->\r\n\r\n\r\n<ng-template #updateQuizModel let-modal>\r\n    <div class=\"modal-header\">\r\n        <div style=\"text-align: center\">\r\n            <h3>Update Quiz Marks </h3>\r\n        </div>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <table class=\"table table-bordered table-hover\">\r\n            <thead class=\"thead-light\">\r\n                <tr>\r\n\r\n                    <th>Roll Num</th>\r\n                    <th>Name </th>\r\n                    <th>Total Marks</th>\r\n                    <th>Obtained Marks</th>\r\n                    <!-- <th> Quiz Pictures</th> -->\r\n                    <!-- <th>Upload Pictures</th> -->\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n\r\n                <tr *ngFor=\"let item of std_quizDetails | paginate: { id: 'pager', itemsPerPage: pageSize, currentPage: pageNumber};let index = index\">\r\n\r\n\r\n                    <td>{{item.roll_num}}</td>\r\n                    <td>{{item.std_name}}</td>\r\n                    <td>{{item.quiz_t_marks}}</td>\r\n                    <td><input type=\"number\" name=\"obt_marks\" #obtAssignMarks [(ngModel)]=\"item.obtained_marks\" (change)=\"updateStdQuizMarks(obtAssignMarks.value, item.quiz_id,item.std_id)\"></td>\r\n                    <!-- <td> -->\r\n                    <!-- <input type=\"file\" class=\"form-control fm-control\"> -->\r\n                    <!-- <label style=\"cursor: pointer;\" (click)=\"addStdAssignMarks(item.assign_id,item.std_id,obtAssignMarks.value , obtComment.value , submitDate.value)\" class=\"badge badge-info\">Update </label> -->\r\n                    <!-- </td> -->\r\n\r\n                </tr>\r\n\r\n            </tbody>\r\n        </table>\r\n\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n    </div>\r\n</ng-template>\r\n\r\n\r\n\r\n\r\n\r\n\r\n<!-- ******** Upload Quiz  ************ -->\r\n\r\n\r\n\r\n<ng-template #uploadQuizModal let-modal>\r\n    <div class=\"modal-header\">\r\n        <div style=\"text-align: center\">\r\n            <h3>Update Assignment Marks </h3>\r\n        </div>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <input id=\"cin\" name=\"cin\" type=\"file\" (change)=\"fileChangeEvent($event)\" placeholder=\"Upload a file...\" multiple />\r\n\r\n        <button type=\"button\" class=\"btn btn-success btn-s\" (click)=\"upload()\">\r\n      <i class=\"glyphicon glyphicon-open-file\"></i>&nbsp;Upload\r\n    </button>\r\n\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n    </div>\r\n</ng-template>"

/***/ }),

/***/ "./src/app/quizes/quizes.component.scss":
/*!**********************************************!*\
  !*** ./src/app/quizes/quizes.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/quizes/quizes.component.ts":
/*!********************************************!*\
  !*** ./src/app/quizes/quizes.component.ts ***!
  \********************************************/
/*! exports provided: QuizesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuizesComponent", function() { return QuizesComponent; });
/* harmony import */ var _quizes_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./quizes.service */ "./src/app/quizes/quizes.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sections/manageSection.service */ "./src/app/sections/manageSection.service.ts");
/* harmony import */ var _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../classes/manageClass.service */ "./src/app/classes/manageClass.service.ts");
/* harmony import */ var _subjects_manage_subjects_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../subjects/manage-subjects.service */ "./src/app/subjects/manage-subjects.service.ts");
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








var QuizesComponent = /** @class */ (function () {
    function QuizesComponent(_commonService, _classDataService, _sectionDataService, _subjectsDataService, _quizService, modalService) {
        this._commonService = _commonService;
        this._classDataService = _classDataService;
        this._sectionDataService = _sectionDataService;
        this._subjectsDataService = _subjectsDataService;
        this._quizService = _quizService;
        this.modalService = modalService;
        this.running_session = localStorage.getItem('running_session');
        this.showHeading = false;
        this.disableBtn = true;
        this.title = '';
        this.quizDate = '';
        this.showtable = false;
    }
    QuizesComponent.prototype.ngOnInit = function () {
        this.getClassData(); // get class data
    };
    // *********************************************************************************************************************** */
    /**********************************************************Read Data from DB Methods************************************** */
    // *********************************************************************************************************************** */
    // ********************************************************** **********/
    // *********************** Get all Classes data ************************/
    // ******************************************************************* */
    QuizesComponent.prototype.getClassData = function () {
        var _this = this;
        this._classDataService.getClassesF().subscribe(function (result) {
            _this.classdataList = result;
        });
    };
    // ********************************************************************** */
    // ************ Get Section Data Against Selected Class ***************** */
    // ********************************************************************* */
    QuizesComponent.prototype.getSectionByClassID = function (class_id) {
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
    QuizesComponent.prototype.getSubjectByClassSecId = function (class_id, section_id, subjects_type) {
        var _this = this;
        this.cSubjectsList = [];
        this.disableBtn = true;
        // *** get Core subjects
        var type = 'all';
        this._subjectsDataService
            .getSubjectByClassSecIdF(class_id, section_id, this.running_session)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this.disableBtn = false;
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
    // ************************* Get Quizes details ********************** */
    // ********************************************************************* */
    QuizesComponent.prototype.getQuizes = function (subject_id) {
        var _this = this;
        var data = {
            class_id: this.selected_class_id,
            section_id: this.selected_section_id,
            subject_id: subject_id,
            running_session: this.running_session
        };
        this._quizService.get_quizesData(data).subscribe(function (result) {
            if (result.status === 1) {
                _this.showtable = true;
                _this.quiz_Data = result.data;
            }
            if (result.status === 0) {
                _this._commonService.warningToaster('No Quiz is added against class', '!');
            }
            if (result.status === 403) {
                _this._commonService.warningToaster('Server error try again', 'Error!');
            }
        });
    };
    // ********************************************************************** */
    // ************* Get students for update quiz marks ************** */
    // ********************************************************************* */
    QuizesComponent.prototype.getStudentQuizDetails = function (quiz_id) {
        var _this = this;
        this.std_quizDetails = [];
        var data = {
            class_id: this.selected_class_id,
            section_id: this.selected_section_id,
            subject_id: this.selected_subject,
            subject_type: this.selected_subj_type,
            running_session: this.running_session,
            quiz_id: quiz_id
        };
        this._quizService.get_students_quiz_details(data).subscribe(function (result) {
            if (result.status === 1) {
                _this.std_quizDetails = result.data;
                _this.selected_quiz_id = _this.std_quizDetails[0].quiz_id;
                _this.selected_quiz_t_marks = _this.std_quizDetails[0].quiz_t_marks;
            }
            else {
                sweetalert2__WEBPACK_IMPORTED_MODULE_7___default()('!', 'No students added against class', 'warning');
                return false;
            }
        });
    };
    // ********************************************************** **********/
    // ***************************** Add Quiz *************************/
    // ******************************************************************* */
    QuizesComponent.prototype.onClickAddQuiz = function (submitEvent) {
        var _this = this;
        // quiz data
        var eventHandler = submitEvent.value;
        var subject_id_type = eventHandler.subjectid.split('-');
        var subj_id = subject_id_type[0];
        var subject_type = subject_id_type[1];
        this.selected_subject = subj_id;
        this.selected_subj_type = subject_type;
        this.selected_class_id = eventHandler.classid;
        this.selected_section_id = eventHandler.sectionid;
        // ** convert selected time to Unix timestamp
        var unix_quiz_date = new Date(eventHandler.quizDate).getTime() / 1000;
        var add_quiz_data = {
            class_id: this.selected_class_id,
            section_id: this.selected_section_id,
            subject_id: subj_id,
            title: eventHandler.title,
            quiz_date: unix_quiz_date,
            quiz_t_marks: eventHandler.quiz_t_marks,
            year: this.running_session
        };
        this._quizService.add_newQuiz(add_quiz_data).subscribe(function (result) {
            if (result.status === 1) {
                _this._commonService.successToaster('Added Successfully', 'Success!');
                submitEvent.reset();
                _this.closeModal();
                _this.getQuizes(subj_id);
            }
            else {
                _this._commonService.errorToaster('Server error try again', 'Error!');
            }
        });
    };
    // ********************************************************** **********/
    // ***************************** update Quiz *************************/
    // ******************************************************************* */
    QuizesComponent.prototype.updateStdQuizMarks = function (obtQuizMarks, quiz_id, std_id) {
        var _this = this;
        if (obtQuizMarks > this.selected_quiz_t_marks) {
            sweetalert2__WEBPACK_IMPORTED_MODULE_7___default()('Oops...', 'Obtained marks must be less than total marks ' +
                this.selected_quiz_t_marks +
                '.', 'warning');
            return false;
        }
        var quiz_dataObj = {
            'student_id': std_id,
            'obtained_marks': obtQuizMarks,
            'quiz_id': quiz_id,
            'marked_date': this._commonService.get_current_unix_timestamp()
        };
        this._quizService.upload_std_quiz_marks(quiz_dataObj).subscribe(function (result) {
            if (result.status === 1) {
                _this._commonService.successToaster('Updated Successfully', 'Success!');
            }
            else {
                sweetalert2__WEBPACK_IMPORTED_MODULE_7___default()('Error', 'Server Error, Try Again..!', 'error');
            }
        });
    };
    // ************************************************************************************************************* */
    /*********************************************General   Methods************************************************ */
    // ************************************************************************************************************* */
    QuizesComponent.prototype.submitgetQuizes = function (submitEvent) {
        var subject_id_type = submitEvent.value.g_subject_id.split('-');
        var subject_id = subject_id_type[0];
        var subject_type = subject_id_type[1];
        this.selected_class_id = submitEvent.value.g_class_id;
        this.selected_section_id = submitEvent.value.g_section_id;
        this.selected_subject = subject_id;
        this.selected_subj_type = subject_type;
        this.getQuizes(subject_id);
    };
    // ********************************************************************** */
    // ************************* Update Quiz Marks Modal ************** */
    // ********************************************************************* */
    QuizesComponent.prototype.updateQuizModal = function (modal, quiz_id) {
        this.getStudentQuizDetails(quiz_id);
        this.openModal(modal);
    };
    // open modal
    QuizesComponent.prototype.openModal = function (modal) {
        this.openNgModal(modal, 'md');
    };
    // *** get sections against class for dropdown
    QuizesComponent.prototype.classSelected = function (class_id) {
        this.getSectionByClassID(class_id);
    };
    // new modal
    QuizesComponent.prototype.openNgModal = function (content, size) {
        this.modalService.open(content, { size: size });
    };
    // *** Selected section class id to get subjects */
    QuizesComponent.prototype.sectionSelectedF = function (section_id) {
        var subject_type = 'c';
        this.getSubjectByClassSecId(this.selectedClass, section_id, subject_type);
    };
    // get selected subject id
    QuizesComponent.prototype.funSelectedSub = function (subject_id) {
        this.selectedSubject = '';
        this.selectedSubject = subject_id;
        this.enableBtn();
    };
    // enable manage assignment btn when section isnt empty
    QuizesComponent.prototype.enableBtn = function () {
        this.disableBtn = false;
    };
    // close modal
    QuizesComponent.prototype.closeModal = function () {
        this.modalService.dismissAll();
    };
    QuizesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-quizes',
            template: __webpack_require__(/*! ./quizes.component.html */ "./src/app/quizes/quizes.component.html"),
            styles: [__webpack_require__(/*! ./quizes.component.scss */ "./src/app/quizes/quizes.component.scss")],
            providers: [
                _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_3__["ClassDataService"],
                _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_2__["SectionDataService"],
                _subjects_manage_subjects_service__WEBPACK_IMPORTED_MODULE_4__["SubjectsDataService"],
                _quizes_service__WEBPACK_IMPORTED_MODULE_0__["QuizesService"],
                _shared_services_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"]
            ]
        }),
        __metadata("design:paramtypes", [_shared_services_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"],
            _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_3__["ClassDataService"],
            _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_2__["SectionDataService"],
            _subjects_manage_subjects_service__WEBPACK_IMPORTED_MODULE_4__["SubjectsDataService"],
            _quizes_service__WEBPACK_IMPORTED_MODULE_0__["QuizesService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModal"]])
    ], QuizesComponent);
    return QuizesComponent;
}());



/***/ }),

/***/ "./src/app/quizes/quizes.module.ts":
/*!*****************************************!*\
  !*** ./src/app/quizes/quizes.module.ts ***!
  \*****************************************/
/*! exports provided: QuizesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuizesModule", function() { return QuizesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _quizes_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./quizes.routing */ "./src/app/quizes/quizes.routing.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng2-select */ "./node_modules/ng2-select/index.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ng2_select__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-modal */ "./node_modules/ngx-modal/index.js");
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ngx_modal__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _quizes_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./quizes.component */ "./src/app/quizes/quizes.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









/* components */

var QuizesModule = /** @class */ (function () {
    function QuizesModule() {
    }
    QuizesModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__["Ng2SearchPipeModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_4__["NgxPaginationModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ReactiveFormsModule"],
                ng2_select__WEBPACK_IMPORTED_MODULE_5__["SelectModule"],
                ngx_modal__WEBPACK_IMPORTED_MODULE_6__["ModalModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_3__["HttpModule"],
                _quizes_routing__WEBPACK_IMPORTED_MODULE_2__["routing"]
            ],
            declarations: [_quizes_component__WEBPACK_IMPORTED_MODULE_9__["QuizesComponent"]]
        })
    ], QuizesModule);
    return QuizesModule;
}());



/***/ }),

/***/ "./src/app/quizes/quizes.routing.ts":
/*!******************************************!*\
  !*** ./src/app/quizes/quizes.routing.ts ***!
  \******************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _quizes_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./quizes.component */ "./src/app/quizes/quizes.component.ts");


var childRoutes = [
    {
        path: '',
        component: _quizes_component__WEBPACK_IMPORTED_MODULE_1__["QuizesComponent"]
    }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(childRoutes);


/***/ }),

/***/ "./src/app/quizes/quizes.service.ts":
/*!******************************************!*\
  !*** ./src/app/quizes/quizes.service.ts ***!
  \******************************************/
/*! exports provided: QuizesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuizesService", function() { return QuizesService; });
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




var QuizesService = /** @class */ (function () {
    function QuizesService(http, _globalService) {
        this.http = http;
        this._globalService = _globalService;
        this.serverLink = this._globalService.constants.serverLink;
        this.headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"](this._globalService.constants.headers);
    }
    // *********************** Call  API to get quiz *****************************
    QuizesService.prototype.get_quizesData = function (data) {
        return this.http
            .post(this.serverLink + 'get/quiz/details', data, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *********************** Call  API to add quiz *****************************
    QuizesService.prototype.add_newQuiz = function (data) {
        return this.http
            .post(this.serverLink + 'add/quiz/details', data, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *********************** Call  API to get students to update marks *****************************
    QuizesService.prototype.get_students_quiz_details = function (data) {
        return this.http
            .post(this.serverLink + 'get/students/quiz_details', data, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *********************** Call  API to get students to update marks *****************************
    QuizesService.prototype.upload_std_quiz_marks = function (data) {
        return this.http
            .post(this.serverLink + 'add/students/quiz_marks', data, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    QuizesService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__["GlobalService"]])
    ], QuizesService);
    return QuizesService;
}());



/***/ })

}]);
//# sourceMappingURL=quizes-quizes-module.js.map