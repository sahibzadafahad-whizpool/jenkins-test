(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["exams-exams-module"],{

/***/ "./src/app/exams/exams.component.html":
/*!********************************************!*\
  !*** ./src/app/exams/exams.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n\r\n    <div class=\"col-lg-12 grid-margin stretch-card\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h4 class=\"card-title\">Exam Details</h4>\r\n\r\n                <div class=\"row\" style=\"margin-top: 1em; margin-bottom: 0em; padding-bottom: 1em; padding-top: 1em;\">\r\n                    <div class=\"col-lg-4  \">\r\n                        <input class=\"form-control fm-control\" [(ngModel)]=\"searchText\" placeholder=\"Exam Name / Exam Type\">\r\n                    </div>\r\n\r\n                    <div class=\"col-lg-6  \">\r\n\r\n                    </div>\r\n\r\n                    <div class=\"col-lg-2 pull-right \" style=\"padding-bottom: 1.5em;\">\r\n\r\n                        <button _ngcontent-c2=\"\" (click)=\" openNgModal(addExamModel, 'md')\" class=\"btn btn-success btn-block\">New\r\n              Exam\r\n              <i _ngcontent-c2=\"\" class=\"mdi mdi-plus\"></i></button>\r\n                    </div>\r\n                    <div class=\"col-lg-12 col-md-12\" style=\"text-align: center\">\r\n                        <h5 style=\"color: red;\"> {{dbRespMsg}}</h5>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"table-responsive\" *ngIf=\"showtable\">\r\n                    <table class=\"table table-bordered\">\r\n                        <thead class=\"thead-light\">\r\n                            <tr>\r\n                                <th>Exam Name</th>\r\n                                <th>Grading Method</th>\r\n                                <!-- <th>Exam Total Marks</th> -->\r\n                                <!-- <th>Exam Date</th> -->\r\n                                <!-- <th>Comment</th> -->\r\n                                <th *ngIf=\"(admin_level == 1)\">Actions</th>\r\n\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr *ngFor=\"let item of examsDataList | examfilter: searchText  | paginate: { id: 'pager', itemsPerPage: pageSize, currentPage: pageNumber};let index = index\">\r\n                                <td>{{item.exam_name}}</td>\r\n                                <td>{{item.grading_method == 1 ? 'Percent Gradding' : 'Letter Grading'}}</td>\r\n                                <!-- <td>{{item.exam_tmarks}}</td> -->\r\n                                <!-- <td>{{item.exam_date * 1000 | date}}</td> -->\r\n                                <!-- <td>{{item.exam_comment}}</td> -->\r\n\r\n                                <td *ngIf=\"(admin_level == 1)\">\r\n\r\n                                    <label class=\"badge badge-info\" (click)=openUpdateExamModal(updateExamModel,item.exam_id) style=\"cursor: pointer;\">Edit</label>\r\n                                    <label class=\"badge badge-danger\" (click)=onClickDelExam(item.exam_id) style=\"cursor: pointer; margin-left: 1em;\">Delete\r\n                  </label>\r\n\r\n                                </td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</div>\r\n\r\n<!-- *********************************** Modals **************************************** -->\r\n\r\n<!-- ******** Add exam ************ -->\r\n\r\n<ng-template #addExamModel let-modal>\r\n    <div class=\"modal-header\">\r\n        <div style=\"text-align: center\">\r\n            <h3>Add Exams</h3>\r\n        </div>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n    </div>\r\n    <!-- <form class=\"form-group\" #addexam=\"ngForm\" (ngSubmit)=\"onClickAddExam(addexam)\"> -->\r\n    <form class=\"form-group\" [formGroup]=\"profileForm\" (ngSubmit)=\"onSubmitAddExam()\">\r\n        <div class=\"modal-body\">\r\n\r\n            <label class=\"control-label\"> Select Number Of Exams *</label>\r\n\r\n            <select class=\"form-control fm-control\" style=\"margin-top:0em;\" required (change)=\"SetNumberOfExams(pickedNumberOfExams.value)\" #pickedNumberOfExams formControlName=\"examNumber\">\r\n\r\n        <option value='1'> 1 </option>\r\n        <option value='2'> 2</option>\r\n        <option value='3'> 3 </option>\r\n        <option value='4'> 4 </option>\r\n        <option value='5'> 5 </option>\r\n        <option value='6'> 6 </option>\r\n        <option value='7'> 7 </option>\r\n        <option value='8'> 8 </option>\r\n        <option value='9'> 9 </option>\r\n        <option value='10'> 10 </option>\r\n\r\n      </select>\r\n\r\n            <div formArrayName=\"exams\" style=\"margin-top:0.5em\" *ngIf=\"showLabel\">\r\n                <label class=\"control-label\"> Exam Name *</label>\r\n                <div *ngFor=\"let exam of exams.controls; let i=index\">\r\n\r\n                    <input type=\"text\" placeholder=\"Exam Name\" required class=\"form-control fm-control\" [formControlName]=\"i\" style=\"margin-top:0.5em; margin-bottom:0.5em;\">\r\n\r\n                </div>\r\n            </div>\r\n            <div *ngIf=\"showLabel\">\r\n                <label class=\"control-label\"> Grading Systems *</label>\r\n\r\n                <select class=\"form-control fm-control\" required style=\"margin-top:0em;\" formControlName=\"grading_system\">\r\n\r\n          <option value='1'> Percentage Grading </option>\r\n          <option value='2'> Letter Grading </option>\r\n        </select>\r\n            </div>\r\n        </div>\r\n        <div class=\"modal-footer\">\r\n            <button type=\"submit\" class=\"btn btn-info\" [disabled]=\"!profileForm.valid\">Submit</button>\r\n            <button type=\"button\" class=\"btn btn-light\" (click)=\"closeModal()\">Close</button>\r\n        </div>\r\n    </form>\r\n\r\n</ng-template>\r\n\r\n<!-- ******** Update exam ************ -->\r\n\r\n<ng-template #updateExamModel let-modal>\r\n    <div class=\"modal-header\">\r\n        <div style=\"text-align: center\">\r\n            <h3>Add Exam</h3>\r\n        </div>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n    </div>\r\n    <form class=\"form-group\" #updateExam=\"ngForm\" (ngSubmit)=\"onClickUpdateExam(updateExam)\">\r\n        <div class=\"modal-body\">\r\n\r\n            <label class=\"control-label\"> Exam Name</label>\r\n\r\n            <input type=\"text\" required class=\"form-control fm-control\" name=\"examName\" placeholder=\"Exam Name\" [(ngModel)]=\"examName\" #pickedEUName=\"ngModel\">\r\n            <p class=\"alert alert-danger\" *ngIf=\"!pickedEUName.valid && pickedEUName.touched\" style=\"margin-top:1em; margin-left:0em;\">\r\n                Exam name is required!\r\n            </p>\r\n\r\n            <label class=\"control-label\">Exam Date</label>\r\n            <input type=\"date\" class=\"form-control fm-control\" name=\"examDate\" [(ngModel)]=\"examDate\" #pickedEUDate=\"ngModel\">\r\n\r\n\r\n            <label class=\"control-label\"> Grading Systems *</label>\r\n            <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedGradingSystems.valid && pickedGradingSystems.touched\"><small>Grading Systems\r\n          Required</small></span>\r\n            <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedGradingSystems [(ngModel)]=\"ugrading_system\" name=\"ugrading_system\">\r\n\r\n        <option value='1' [selected]=\"ugrading_system == 1\"> Percentage Grading </option>\r\n        <option value='2' [selected]=\"ugrading_system == 2\"> Letter Grading </option>\r\n      </select>\r\n\r\n            <!-- <label class=\"control-label\"> Exam Total Marks</label>\r\n\r\n            <input type=\"text\" required class=\"form-control fm-control\" name=\"examTMarks\" placeholder=\"Exam Total Marks\" [(ngModel)]=\"examTMarks\" #pickedexamTMarks=\"ngModel\">\r\n            <p class=\"alert alert-danger\" *ngIf=\"!pickedexamTMarks.valid && pickedexamTMarks.touched\" style=\"margin-top:1em; margin-left:0em;\">\r\n                Exam Total Marks required!\r\n            </p> -->\r\n\r\n            <!-- <label class=\"control-label\" style=\"margin-bottom: .5em;\">Comment</label>\r\n            <input type=\"text\" class=\"form-control fm-control\" name=\"examComment\" placeholder=\"Comment\" [(ngModel)]=\"examComment\"> -->\r\n\r\n            <div class=\"modal_button\" style=\"text-align:right\">\r\n                <input type=\"hidden\" class=\"form-control fm-control\" name=\"examId\" placeholder=\"Comment\" [(ngModel)]=\"examId\">\r\n            </div>\r\n\r\n        </div>\r\n        <div class=\"modal-footer\">\r\n            <input type=\"submit\" class=\"btn btn-info\" [disabled]=\"!updateExam.form.valid\" value=\"Update Exam\">\r\n            <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n        </div>\r\n    </form>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./src/app/exams/exams.component.scss":
/*!********************************************!*\
  !*** ./src/app/exams/exams.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/exams/exams.component.ts":
/*!******************************************!*\
  !*** ./src/app/exams/exams.component.ts ***!
  \******************************************/
/*! exports provided: ExamsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExamsComponent", function() { return ExamsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _students_student_information_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../students/student-information.service */ "./src/app/students/student-information.service.ts");
/* harmony import */ var _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../sections/manageSection.service */ "./src/app/sections/manageSection.service.ts");
/* harmony import */ var _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../classes/manageClass.service */ "./src/app/classes/manageClass.service.ts");
/* harmony import */ var _add_exams_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./add-exams.service */ "./src/app/exams/add-exams.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _shared_services_common_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/services/common.service */ "./src/app/shared/services/common.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ExamsComponent = /** @class */ (function () {
    function ExamsComponent(_addExamsService, _StudentsInfoService, _classDataService, _sectionDataService, modalService, _commonService, fb) {
        this._addExamsService = _addExamsService;
        this._StudentsInfoService = _StudentsInfoService;
        this._classDataService = _classDataService;
        this._sectionDataService = _sectionDataService;
        this.modalService = modalService;
        this._commonService = _commonService;
        this.fb = fb;
        /* active session */
        this.running_session = localStorage.getItem('running_session');
        this.showLabel = false;
        this.disableBtn = true;
        this.type = '';
        this.showTotalMarksField = false;
        // notifications
        this.successNotifi = 0;
        this.updateNotifi = 0;
        this.alertType = '';
        this.addExamNoti = '';
        this.updateExamNoti = '';
        this.dbRespMsg = '';
        this.showtable = false;
        /* pagination Info */
        this.pageSize = 10;
        this.pageNumber = 1;
        this.profileForm = this.fb.group({
            examNumber: [''],
            grading_system: [''],
            exams: this.fb.array([])
        });
    }
    ExamsComponent.prototype.ngOnInit = function () {
        // get admin level
        this.admin_level = localStorage.getItem('admin_level');
        this.getExamsinfo();
    };
    // *********************************************************************************************************************** */
    /**********************************************************Read Data from DB Methods************************************** */
    // *********************************************************************************************************************** */
    // ********************************************************** **********/
    // *********************** Get all exams data ************************/
    // ******************************************************************* */
    ExamsComponent.prototype.getExamsinfo = function () {
        var _this = this;
        this.dbRespMsg = '';
        this._addExamsService
            .getExamInfoFun(this.running_session)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this.examsDataList = result.data;
                _this.showtable = true;
            }
            if (result.status === 0) {
                _this.showtable = false;
                _this.dbRespMsg = 'No exam is added.';
            }
            if (result.status === 403) {
                _this.dbRespMsg = result.msg;
            }
        });
    };
    // ********************************************************** **********/
    // *********************** Get single exams data ************************/
    // ******************************************************************* */
    ExamsComponent.prototype.get_singleExamData = function (exam_id) {
        var _this = this;
        var singleExam = null;
        this._addExamsService.get_singleExamDataFun(exam_id).subscribe(function (result) {
            if (result.status === 1) {
                _this.singleExamListA = result.data;
                singleExam = _this.singleExamListA[0];
                _this.examId = singleExam.exam_id;
                _this.examName = singleExam.exam_name;
                // this.examDate = singleExam.exam_date = ''
                //   ? ''
                //   : this._commonService.get_date_from_unix(singleExam.exam_date);
                _this.examComment = singleExam.exam_comment;
                _this.examTMarks = singleExam.exam_tmarks;
                _this.ugrading_system = singleExam.grading_method;
            }
            else {
                _this.alertType = 'danger';
                _this.updateNotifi = 1;
                _this.updateExamNoti = result.msg;
            }
        });
    };
    Object.defineProperty(ExamsComponent.prototype, "exams", {
        // *********************************************************************************************************************** */
        /**********************************************Add , Delete , Update Data  Methods************************************** */
        // *********************************************************************************************************************** */
        // dynamic form generation
        get: function () {
            return this.profileForm.get('exams');
        },
        enumerable: true,
        configurable: true
    });
    ExamsComponent.prototype.addtextFields = function () {
        this.exams.push(this.fb.control(''));
    };
    // add dynamic text fields for adding exams
    ExamsComponent.prototype.SetNumberOfExams = function (numberOfExams) {
        this.showLabel = true;
        this.disableBtn = false;
        // remove text fields on change number of exams
        this.profileForm = this.fb.group({
            examNumber: [numberOfExams],
            grading_system: [''],
            exams: this.fb.array([])
        });
        for (var i = 0; i < numberOfExams; i++) {
            this.addtextFields();
        }
    };
    // ********************************************************** **********/
    // ***************************** Add new exam ************************/
    // ******************************************************************* */
    ExamsComponent.prototype.onSubmitAddExam = function () {
        var _this = this;
        var exam_data = {
            exams: this.profileForm.value.exams,
            exam_date: 0,
            exam_comment: '',
            grading_method: this.profileForm.value.grading_system,
            //exam_tmarks: '',
            running_session: this.running_session,
            type: 'exam'
        };
        this._addExamsService.addNewExamFun(exam_data).subscribe(function (result) {
            if (result.status === 1) {
                _this._commonService.successToaster('Exam Added Successfully', 'Success!');
                _this.getExamsinfo();
                _this.closeModal();
            }
            else {
                _this._commonService.errorToaster(result.msg, 'Failed!');
            }
        });
    };
    // public onClickAddExam(addExamEvent) {
    //   let examMarks;
    //   if (addExamEvent.value.grading_system === '1') {
    //     examMarks = addExamEvent.value.exam_tmarks;
    //   } else {
    //     examMarks = '';
    //   }
    //   // ** convert selected time to Unix timestamp
    //   const examUnixTime =
    //     new Date(addExamEvent.value.exam_date).getTime() / 1000;
    //   const exam_data = {
    //     exam_name: addExamEvent.value.exam_name,
    //     exam_date: examUnixTime,
    //     exam_comment: addExamEvent.value.exam_comment,
    //     grading_method: addExamEvent.value.grading_system,
    //     exam_tmarks: examMarks,
    //     running_session: this.running_session,
    //     type: 'exam'
    //   };
    //   this._addExamsService.addNewExamFun(exam_data).subscribe(result => {
    //     if (result.status === 1) {
    //       this._commonService.successToaster(
    //         'Exam Added Successfully',
    //         'Success!'
    //       );
    //       addExamEvent.reset();
    //       this.getExamsinfo();
    //       this.closeModal();
    //     } else {
    //       this._commonService.errorToaster(result.msg, 'Failed!');
    //     }
    //   });
    // }
    // ********************************************************************** */
    // ********************************* Delete Exams  *********************** */
    // ********************************************************************* */
    ExamsComponent.prototype.onClickDelExam = function (exam_id) {
        var _this = this;
        sweetalert2__WEBPACK_IMPORTED_MODULE_2___default()({
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
                _this._addExamsService.deleteExamsFun(exam_id).subscribe(function (resultresp) {
                    if (resultresp.status === 1) {
                        _this._commonService.successToaster('Deleted Successfully', 'Success!');
                        _this.getExamsinfo();
                    }
                    else {
                        _this._commonService.errorToaster(resultresp.msg, 'Error!');
                    }
                });
            }
        });
    };
    // ********************************************************************** */
    // **************************** Update Exams Data *********************** */
    // ********************************************************************* */
    ExamsComponent.prototype.onClickUpdateExam = function (updateEventData) {
        var _this = this;
        var update_exam_data = updateEventData.value;
        var exam_id = update_exam_data.examId;
        var exam_UpdateData = {
            exam_name: update_exam_data.examName,
            exam_comment: '',
            exam_date: update_exam_data.examDate,
            exam_tmarks: ''
        };
        this._addExamsService
            .updateExamData(exam_UpdateData, exam_id)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this._commonService.successToaster('Updated Successfully', 'Success!');
                // load new data after update
                _this.get_singleExamData(exam_id);
                _this.getExamsinfo();
                _this.closeModal();
            }
            else {
                _this._commonService.errorToaster(result.msg, 'Error!');
            }
        });
    };
    // *********************************************************************************************************************** */
    /**********************************************************General Methods********************************************** */
    // *********************************************************************************************************************** */
    // get grading system
    ExamsComponent.prototype.selectedGradingSystemF = function (gradingSystem) {
        if (gradingSystem === '1') {
            this.showTotalMarksField = true;
        }
        else {
            this.showTotalMarksField = false;
        }
    };
    // new modal
    ExamsComponent.prototype.openNgModal = function (content, size) {
        this.modalService.open(content, { size: size });
    };
    // ********* Open exam update modal */
    ExamsComponent.prototype.openUpdateExamModal = function (modal, exam_id) {
        this.openNgModal(modal, 'md');
        this.get_singleExamData(exam_id);
    };
    // open modal
    ExamsComponent.prototype.openModal = function (modal) {
        this.openNgModal(modal, 'md');
    };
    // close modal
    ExamsComponent.prototype.closeModal = function () {
        this.modalService.dismissAll();
        this.profileForm.reset();
        this.showLabel = false;
    };
    ExamsComponent.prototype.pageChanged = function (pN) {
        this.pageNumber = pN;
    };
    ExamsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-exams',
            template: __webpack_require__(/*! ./exams.component.html */ "./src/app/exams/exams.component.html"),
            styles: [__webpack_require__(/*! ./exams.component.scss */ "./src/app/exams/exams.component.scss")],
            providers: [
                _add_exams_service__WEBPACK_IMPORTED_MODULE_6__["AddExamsService"],
                _students_student_information_service__WEBPACK_IMPORTED_MODULE_3__["StudentsInfoService"],
                _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_4__["SectionDataService"],
                _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_5__["ClassDataService"],
                _shared_services_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"]
            ]
        }),
        __metadata("design:paramtypes", [_add_exams_service__WEBPACK_IMPORTED_MODULE_6__["AddExamsService"],
            _students_student_information_service__WEBPACK_IMPORTED_MODULE_3__["StudentsInfoService"],
            _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_5__["ClassDataService"],
            _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_4__["SectionDataService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__["NgbModal"],
            _shared_services_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], ExamsComponent);
    return ExamsComponent;
}());



/***/ }),

/***/ "./src/app/exams/exams.module.ts":
/*!***************************************!*\
  !*** ./src/app/exams/exams.module.ts ***!
  \***************************************/
/*! exports provided: ExamsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExamsModule", function() { return ExamsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _exams_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./exams.routing */ "./src/app/exams/exams.routing.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng2-select */ "./node_modules/ng2-select/index.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ng2_select__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-modal */ "./node_modules/ngx-modal/index.js");
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ngx_modal__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _searchexam_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./searchexam.pipe */ "./src/app/exams/searchexam.pipe.ts");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _exams_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./exams.component */ "./src/app/exams/exams.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










/* components */

var ExamsModule = /** @class */ (function () {
    function ExamsModule() {
    }
    ExamsModule = __decorate([
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
                _exams_routing__WEBPACK_IMPORTED_MODULE_2__["routing"]
            ],
            declarations: [_exams_component__WEBPACK_IMPORTED_MODULE_10__["ExamsComponent"], _searchexam_pipe__WEBPACK_IMPORTED_MODULE_7__["SearchExamPipe"]]
        })
    ], ExamsModule);
    return ExamsModule;
}());



/***/ }),

/***/ "./src/app/exams/exams.routing.ts":
/*!****************************************!*\
  !*** ./src/app/exams/exams.routing.ts ***!
  \****************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _exams_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./exams.component */ "./src/app/exams/exams.component.ts");


var childRoutes = [
    {
        path: "",
        component: _exams_component__WEBPACK_IMPORTED_MODULE_1__["ExamsComponent"]
    }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(childRoutes);


/***/ }),

/***/ "./src/app/exams/searchexam.pipe.ts":
/*!******************************************!*\
  !*** ./src/app/exams/searchexam.pipe.ts ***!
  \******************************************/
/*! exports provided: SearchExamPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchExamPipe", function() { return SearchExamPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SearchExamPipe = /** @class */ (function () {
    function SearchExamPipe() {
    }
    SearchExamPipe.prototype.transform = function (items, filterdata) {
        if (!items)
            return [];
        if (!filterdata)
            return items;
        filterdata = filterdata.toString();
        return items.filter(function (searchValue) {
            var rVal = JSON.stringify(searchValue.exam_name).includes(filterdata) ||
                JSON.stringify(searchValue.exam_type).includes(filterdata);
            return rVal;
        });
    };
    SearchExamPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: "examfilter"
        })
    ], SearchExamPipe);
    return SearchExamPipe;
}());



/***/ })

}]);
//# sourceMappingURL=exams-exams-module.js.map