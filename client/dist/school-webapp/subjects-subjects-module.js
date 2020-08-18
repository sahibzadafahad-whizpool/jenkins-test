(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["subjects-subjects-module"],{

/***/ "./src/app/subjects/subjects.component.html":
/*!**************************************************!*\
  !*** ./src/app/subjects/subjects.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n\r\n  <div class=\"col-lg-12 grid-margin stretch-card\">\r\n    <div class=\"card\">\r\n      <div class=\"card-body\">\r\n\r\n\r\n\r\n        <div class=\"row\">\r\n\r\n          <div class=\"col-lg-9 col-md-9\">\r\n\t\t\t<h4 class=\"card-title text-center\">\r\n\t\t\t\tSubject Details\r\n\t\t\t</h4>\r\n          </div>\r\n\r\n          <div class=\"col-lg-3  \" style=\"padding-bottom: 1.5em;\">\r\n\r\n            <button _ngcontent-c2=\"\" (click)=\"openNgModal(addSubjectModal , 'md')\" class=\"btn btn-success btn-block\">New\r\n              Subject\r\n              <i _ngcontent-c2=\"\" class=\"mdi mdi-plus\"></i></button>\r\n          </div>\r\n        </div>\r\n\r\n\r\n        <div class=\"table-responsive\">\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-lg-3\">\r\n              <div class=\"list-group\" style=\"padding-top: 0px; width: -webkit-fill-available;\">\r\n\r\n                <p class=\"list-group-item mini-sidebar\">\r\n                  <i class=\"fa fa-university\"></i>\r\n                  <span> Select Class</span>\r\n                </p>\r\n                <a *ngFor=\"let item of classData \" class=\"list-group-item\" style=\"cursor: pointer;\" class=\"list-group-item\" [style.background-color]=\"item.BackgroundColour\" [style.color]=\"item.color\"  (click)=\"onClickSideBar(item.class_id , item)\">\r\n                  <span>{{item.class_name}}</span>\r\n                </a>\r\n              </div>\r\n\r\n            </div>\r\n            <div class=\"col-lg-9 grid-margin \">\r\n\r\n              <div class=\"card\">\r\n                <div class=\"card-body\">\r\n                  <h4 class=\"card-title text-center\">\r\n\t\t\t\t\t{{selectedClassName}} {{notAvailable}}\r\n\t\t\t\t   </h4>\r\n\r\n                  <ngb-tabset class=\"tab-solid tab-solid-primary\">\r\n                    <ngb-tab>\r\n                      <ng-template ngbTabTitle>\r\n                        Core Subjects\r\n                      </ng-template>\r\n                      <ng-template ngbTabContent>\r\n                        <table class=\"table table-bordered table-hover\">\r\n                          <thead class=\"thead-light\">\r\n                            <tr>\r\n\r\n                              <th>Section </th>\r\n                              <th>Subject </th>\r\n                              <th>Teacher </th>\r\n                              <th *ngIf=\"(admin_level == 1)\">Actions</th>\r\n\r\n                            </tr>\r\n                          </thead>\r\n                          <tbody>\r\n                            <tr\r\n                              *ngFor=\"let item of coreSubjectsData | paginate: { id: 'pager', itemsPerPage: pageSize, currentPage: pageNumber};let index = index\">\r\n\r\n                              <td>{{item.section_name}}</td>\r\n                              <td>{{item.subject_name}}</td>\r\n\r\n                              <td>{{item.teacher_name}}</td>\r\n                              <td *ngIf=\"(admin_level == 1)\">\r\n\r\n                                <label class=\"badge badge-info\"\r\n                                  (click)=openEditSubjectModal(updateSubjectModal,item.subject_id,item.section_id,item.class_id)\r\n                                  style=\"cursor: pointer;\">Edit</label>\r\n                                <label class=\"badge badge-danger\"\r\n                                  (click)=deleteSubject(item.class_id,item.section_id,item.subject_id)\r\n                                  style=\"cursor: pointer; margin-left: 1em;\">Delete\r\n                                </label>\r\n                              </td>\r\n                            </tr>\r\n                          </tbody>\r\n                        </table>\r\n                      </ng-template>\r\n                    </ngb-tab>\r\n                    <ngb-tab>\r\n                      <ng-template ngbTabTitle>\r\n                        Elective Subjects\r\n                      </ng-template>\r\n                      <ng-template ngbTabContent>\r\n                        <table class=\"table table-bordered table-hover\">\r\n                          <thead class=\"thead-light\">\r\n                            <tr>\r\n                              <th>Section</th>\r\n                              <th>Subject</th>\r\n                              <th>Teacher</th>\r\n                              <th>Actions</th>\r\n\r\n                            </tr>\r\n                          </thead>\r\n                          <tbody>\r\n                            <tr\r\n                              *ngFor=\"let item of electiveSubjectsData | paginate: { id: 'pager', itemsPerPage: pageSize, currentPage: pageNumber};let index = index\">\r\n                              <td>{{item.class_name}}</td>\r\n                              <td>{{item.section_name}}</td>\r\n                              <td>{{item.subject_name}}</td>\r\n\r\n                              <td>{{item.teacher_name}}</td>\r\n                              <td>\r\n\r\n\r\n                                <label class=\"badge badge-info\"\r\n                                  (click)=openEditSubjectModal(updateSubjectModal,item.subject_id,item.section_id,item.class_id)\r\n                                  style=\"cursor: pointer;\">Edit</label>\r\n                                <label class=\"badge badge-danger\"\r\n                                  (click)=deleteSubject(item.class_id,item.section_id,item.subject_id)\r\n                                  style=\"cursor: pointer; margin-left: 1em;\">Delete\r\n                                </label>\r\n                              </td>\r\n                            </tr>\r\n                          </tbody>\r\n                        </table>\r\n                      </ng-template>\r\n                    </ngb-tab>\r\n\r\n                  </ngb-tabset>\r\n                </div>\r\n              </div>\r\n\r\n            </div>\r\n          </div>\r\n\r\n\r\n          <div style=\"text-align: center ; margin-top: 2em;\">\r\n            <form class=\"pagination-wrapper\">\r\n              <div class=\"form-group pages\">\r\n                <pagination-controls class=\"my-pagination\" id=\"pager\" (pageChange)=\"pageChanged($event)\" maxSize=\"10\"\r\n                  directionLinks=\"true\" autoHide=\"true\" previousLabel=\"Prev\" nextLabel=\"Next\"\r\n                  screenReaderPaginationLabel=\"Pagination\" screenReaderPageLabel=\"page\"\r\n                  screenReaderCurrentLabel=\"You're on page\">\r\n                </pagination-controls>\r\n              </div>\r\n\r\n            </form>\r\n          </div>\r\n\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n\r\n\r\n<!-- add Subject modal  -->\r\n\r\n\r\n<ng-template #addSubjectModal let-modal>\r\n  <div class=\"modal-header\">\r\n    <div style=\"text-align: center\">\r\n      <h3>Add New</h3>\r\n    </div>\r\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n  </div>\r\n   <form class=\"form-group\" #addSubject=\"ngForm\" (ngSubmit)=\"onSubmitAddSubj(addSubject)\">\r\n  <div class=\"modal-body\">\r\n\r\n      <div class=\"row\">\r\n\r\n        <div class=\"col-lg-6 form-group\">\r\n          <label class=\"control-label\"> Select Class *</label>\r\n          <select class=\"form-control fm-control\" required style=\"margin-top:0em;\" #selectedClass [(ngModel)]=\"class_id\"\r\n            (change)=classSelected(selectedClass.value); name=\"class_id\">\r\n            <option [ngValue]=\"undefined\" disabled>Select Class </option>\r\n            <option *ngFor=\"let item of classData\" [value]=\"item.class_id\">{{item.class_name}}</option>\r\n          </select>\r\n\r\n        </div>\r\n        <div class=\"col-lg-6 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:.5em;\">Section *</label>\r\n          <select class=\"form-control fm-control\" required style=\"margin-top:0em;\" [(ngModel)]=\"section_id\"\r\n            #selectedSection (change)=sectionSelected(selectedSection.value); name=\"section_id\">\r\n            <option [ngValue]=\"undefined\" disabled>Select Section</option>\r\n            <option *ngFor=\"let item of sectionData\" [value]=\"item.section_id\">{{item.section_name}}</option>\r\n          </select>\r\n        </div>\r\n        <div class=\"col-lg-6 form-group\">\r\n          <label class=\"control-label\">Teacher</label>\r\n          <select class=\"form-control fm-control\" style=\"margin-top:0em;\" [(ngModel)]=\"teacher_id\" name=\"teacher_id\">\r\n            <option [ngValue]=\"undefined\" disabled>Select Teacher </option>\r\n            <option *ngFor=\"let item of teachersData\" [value]=\"item.teacher_id\">{{item.teacher_name}}</option>\r\n          </select>\r\n\r\n        </div>\r\n        <div class=\"col-lg-6 form-group\">\r\n\r\n          <label class=\"control-label\" style=\"margin-top:.5em;\">Subject Name *</label>\r\n          <span style=\"color:red;\" *ngIf=\"subjectCheckAlert\"><small style=\"margin-left: 1em;\"> Subject already\r\n              registred against class.</small> </span>\r\n          <input type=\"text\" style=\"margin-top:0em;\" required class=\"form-control fm-control\" name=\"subject_name\"\r\n            #subjName (change)=\"checkSubject(subjName.value)\" placeholder=\"Subject Name\" ngModel>\r\n        </div>\r\n        <div class=\"col-lg-6 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:.5em;\">Subject Type *</label>\r\n          <select class=\"form-control fm-control\" required style=\"margin-top:0em;\" [(ngModel)]=\"subject_type\"\r\n            name=\"subject_type\">\r\n            <option [ngValue]=\"undefined\" disabled>Select Type </option>\r\n            <option [value]=\"1\">Core</option>\r\n            <option [value]=\"2\">Elective</option>\r\n          </select>\r\n        </div>\r\n\r\n\r\n      </div>\r\n\r\n\r\n  </div>\r\n  <div class=\"modal-footer\">\r\n   <input type=\"submit\" class=\"btn btn-info\"\r\n            [disabled]=\"!addSubject.form.valid || disableBtn\" value=\"Add Subject\">\r\n    <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n  </div>\r\n     </form>\r\n</ng-template>\r\n\r\n\r\n\r\n\r\n\r\n<!-- Update Subject  -->\r\n\r\n<ng-template #updateSubjectModal let-modal>\r\n  <div class=\"modal-header\">\r\n    <div style=\"text-align: center\">\r\n      <h3>Update Subject Details</h3>\r\n    </div>\r\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n  </div>\r\n  <form class=\"form-group\" #updateSubject=\"ngForm\" (ngSubmit)=\"onSubmitUpdateSubj(updateSubject)\">\r\n  <div class=\"modal-body\">\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-12 form-group\">\r\n          <label class=\"control-label\"> Class </label>\r\n          <input type=\"text\" [disabled]=\"true\" class=\"form-control fm-control\" name=\"className\" [(ngModel)]=\"className\">\r\n        </div>\r\n        <div class=\"col-lg-12 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Section </label>\r\n          <input type=\"text\" [disabled]=\"true\" class=\"form-control fm-control\" name=\"sectionName\"\r\n            [(ngModel)]=\"sectionName\">\r\n        </div>\r\n        <div class=\"col-lg-12 form-group\">\r\n          <label class=\"control-label\">Teacher</label>\r\n          <select class=\"form-control fm-control\" style=\"margin-top:0em;\" [(ngModel)]=\"teacherId\" name=\"teacherId\">\r\n            <option [ngValue]=\"undefined\" disabled>{{teacherName}}</option>\r\n            <option *ngFor=\"let item of teachersData\" [value]=\"item.teacher_id\">{{item.teacher_name}}</option>\r\n          </select>\r\n        </div>\r\n        <div class=\"col-lg-12 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Subject Name *</label>\r\n          <input type=\"text\" class=\"form-control fm-control\" required name=\"subjectName\" [(ngModel)]=\"subjectName\">\r\n        </div>\r\n        <div class=\"col-lg-12 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Subject Type *</label>\r\n          <select class=\"form-control fm-control\" required style=\"margin-top:0em;\" [(ngModel)]=\"subjectType\"\r\n            name=\"subjectType\">\r\n\r\n            <option [value]=\"1\">Core</option>\r\n            <option [value]=\"2\">Elective</option>\r\n          </select>\r\n        </div>\r\n        <input type=\"hidden\" name=\"classId\" [(ngModel)]=\"classId\">\r\n        <input type=\"hidden\" name=\"sectionId\" [(ngModel)]=\"sectionId\">\r\n        <input type=\"hidden\" name=\"subjectId\" [(ngModel)]=\"subjectId\">\r\n\r\n      </div>\r\n\r\n\r\n  </div>\r\n  <div class=\"modal-footer\">\r\n  <input type=\"submit\" class=\"btn btn-info\" [disabled]=\"!updateSubject.form.valid  \" value=\"Update Subject\">\r\n    <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n  </div>\r\n    </form>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./src/app/subjects/subjects.component.scss":
/*!**************************************************!*\
  !*** ./src/app/subjects/subjects.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/subjects/subjects.component.ts":
/*!************************************************!*\
  !*** ./src/app/subjects/subjects.component.ts ***!
  \************************************************/
/*! exports provided: SubjectsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubjectsComponent", function() { return SubjectsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _teachers_teachers_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../teachers/teachers.service */ "./src/app/teachers/teachers.service.ts");
/* harmony import */ var _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../classes/manageClass.service */ "./src/app/classes/manageClass.service.ts");
/* harmony import */ var _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sections/manageSection.service */ "./src/app/sections/manageSection.service.ts");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _manage_subjects_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./manage-subjects.service */ "./src/app/subjects/manage-subjects.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _shared_services_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/services/common.service */ "./src/app/shared/services/common.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SubjectsComponent = /** @class */ (function () {
    // creating object of Service's  to call methods  => 'this is called dependency injection'
    function SubjectsComponent(_SubjectsDataService, _classesDataService, _teachersDataService, _sectionDataService, modalService, _commonService) {
        this._SubjectsDataService = _SubjectsDataService;
        this._classesDataService = _classesDataService;
        this._teachersDataService = _teachersDataService;
        this._sectionDataService = _sectionDataService;
        this.modalService = modalService;
        this._commonService = _commonService;
        this.running_session = localStorage.getItem('running_session');
        this.selectedSection_id = 0;
        this.selectedClass_id = 0;
        // Notifications
        this.successNotification = 0;
        this.showNotiRequiredAll = 1;
        this.updateSuccessNotifi = 0;
        this.selectedClassName = '* No Class Selected To Show ';
        this.disableBtn = false;
        this.tabtitle = 'Add Subjects';
        /* pagination Info */
        this.pageSize = 10;
        this.pageNumber = 1;
    }
    // ********************* auto run the function on page load *******************//
    SubjectsComponent.prototype.ngOnInit = function () {
        // get admin level
        this.admin_level = localStorage.getItem('admin_level');
        // sidebar settings for select class
        $('.list-group-item').click(function (e) {
            e.preventDefault();
            $('.list-group-item').removeClass('active');
            $(this).addClass('active');
        });
        this.getClassData(); // call function to get class details for dropdown
        this.getTeachersData(); // call function to get teachers details for dropdown
    };
    // ***************************************************************************************************************/
    /******************************************Read Data from DB *********************************************/
    // ***************************************************************************************************************/
    // ********************************************************************** */
    // *********************** Get Class Data ******************************* */
    // ********************************************************************* */
    SubjectsComponent.prototype.getClassData = function () {
        var _this = this;
        this._classesDataService.getClassesF().subscribe(function (result) {
            _this.classData = result;
        });
    };
    // ********************************************************************** */
    // ************ Get Section Data Against Selected Class ***************** */
    // ********************************************************************* */
    SubjectsComponent.prototype.getSectionByClassID = function (class_id) {
        var _this = this;
        // * disbale btn untill section selcted and empty section array when selected class change
        this.sectionData = [];
        this.section_id = null;
        this.disableBtn = true;
        this._sectionDataService.getSectionF(class_id).subscribe(function (result) {
            _this.sectionData = result;
        });
    };
    // ********************************************************************** */
    // *********************** Get Teachers Data ************************ */
    // ********************************************************************* */
    SubjectsComponent.prototype.getTeachersData = function () {
        var _this = this;
        this._teachersDataService.getTeachersF().subscribe(function (result) {
            _this.teachersData = result;
        });
    };
    // sidebar color change on click
    SubjectsComponent.prototype.onChildSelect = function (Child) {
        // This would work but if you have the previously selected child stored
        // it would be better to just turn that one white
        for (var _i = 0, _a = this.classData; _i < _a.length; _i++) {
            var myChild = _a[_i];
            myChild.BackgroundColour = 'white';
            myChild.color = 'black';
        }
        Child.BackgroundColour = 'rgba(233, 233, 234, 0.48)';
        Child.color = 'cornflowerblue';
    };
    SubjectsComponent.prototype.onClickSideBar = function (class_id, Child) {
        this.getSubjectByClassId(class_id);
        this.onChildSelect(Child);
    };
    // ********************************************************************** */
    // ******* Get Elective And Core Subject Data by Class ID **************** */
    // ********************************************************************* */
    SubjectsComponent.prototype.getSubjectByClassId = function (class_id) {
        var _this = this;
        // *** get elective subjects
        this._SubjectsDataService
            .getElectiveSubjectF(class_id, this.running_session)
            .subscribe(function (result) {
            _this.electiveSubjectsData = result;
            if (_this.electiveSubjectsData.length) {
                // if there is elective subject then store class name in variable to show in view heading
                _this.selectedClassName = _this.electiveSubjectsData[0].class_name;
                _this.notAvailable = '';
            }
            else {
                _this.selectedClassName = ' ';
                _this.notAvailable = 'Not Available';
            }
        });
        // *** get Core subjects
        this._SubjectsDataService
            .getCoreSubjectF(class_id, this.running_session)
            .subscribe(function (result) {
            _this.coreSubjectsData = result;
            if (_this.coreSubjectsData.length) {
                _this.selectedClassName = _this.coreSubjectsData[0].class_name + " Subject Details ";
                _this.notAvailable = '';
            }
            else {
                _this.selectedClassName = ' ';
                _this.notAvailable = 'No Subject added';
            }
        });
    };
    // ********************************************************************** */
    // ******* Get Single subject data against Class and Subject  *********** */
    // ********************************************************************* */
    SubjectsComponent.prototype.getSingleSubjectData = function (subject_id, section_id, class_id) {
        var _this = this;
        var singleSubjectList = null;
        this._SubjectsDataService
            .getSingleSubjectF(subject_id, section_id, class_id, this.running_session)
            .subscribe(function (result) {
            _this.singleSubjectData = result;
            singleSubjectList = _this.singleSubjectData[0];
            _this.subjectId = singleSubjectList.subject_id;
            _this.subjectName = singleSubjectList.subject_name;
            _this.classId = singleSubjectList.class_id;
            _this.teacherName = singleSubjectList.teacher_name;
            _this.teacherId = singleSubjectList.teacher_id;
            _this.sectionName = singleSubjectList.section_name;
            _this.className = singleSubjectList.class_name;
            _this.sectionId = singleSubjectList.section_id;
            _this.subjectType = singleSubjectList.subject_type;
        });
    };
    // ***************************************************************************************************************/
    /**************************************Write , Update , Delate Data  Methods*************************************/
    // ***************************************************************************************************************/
    // **************************************************************** */
    // ******************* Add new subject event handler  ******************/
    // ***************************************************************** */
    SubjectsComponent.prototype.onSubmitAddSubj = function (submitEvent) {
        var _this = this;
        var addSubjdata = submitEvent.value;
        var class_id = addSubjdata.class_id;
        var subject_type = Number(addSubjdata.subject_type);
        var newSubjectData = {
            class_id: Number(addSubjdata.class_id),
            teacher_id: Number(addSubjdata.teacher_id),
            section_id: Number(addSubjdata.section_id),
            subject_name: addSubjdata.subject_name,
            subject_type: subject_type,
            year: this.running_session
        };
        this._SubjectsDataService.addSubjectF(newSubjectData).subscribe(function (result) {
            _this.getSubjectByClassId(class_id);
            _this.disableBtn = true;
            if (result.status === 1) {
                _this._commonService.successToaster('Added Successfully', 'Success!');
                _this.closeModal();
                submitEvent.reset(); // reset form after submission
            }
            else {
                _this._commonService.errorToaster(result.msg, 'Error!');
            }
        });
    };
    // **************************************************************** */
    // ******************* update subject event handler  ******************/
    // ***************************************************************** */
    SubjectsComponent.prototype.onSubmitUpdateSubj = function (submitEvent) {
        var _this = this;
        var data = submitEvent.value;
        var class_id = Number(data.classId);
        var section_id = Number(data.sectionId);
        var subject_id = Number(data.subjectId);
        var updateSubjData = {
            subject_name: data.subjectName,
            subject_type: Number(data.subjectType),
            teacher_id: Number(data.teacherId)
        };
        this._SubjectsDataService
            .updateSubjectF(class_id, section_id, subject_id, updateSubjData)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this.getSubjectByClassId(class_id); // load data after update
                _this._commonService.successToaster('Updated Successfully', 'Success!');
                _this.closeModal();
            }
            else {
                _this._commonService.errorToaster(result.msg, 'Error!');
            }
        });
    };
    // *************************************************************** */
    // *************** Delete Subject event handler  *****************/
    // *************************************************************** */
    SubjectsComponent.prototype.deleteSubject = function (class_id, section_id, subject_id) {
        var _this = this;
        sweetalert2__WEBPACK_IMPORTED_MODULE_4___default()({
            title: 'Are you sure?',
            text: 'You wont be able to revert this!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function (result) {
            if (result.value) {
                var deleteStatus = {
                    status: 0
                };
                // if user confirm then call delete API
                _this._SubjectsDataService
                    .delSubjectF(class_id, section_id, subject_id, deleteStatus) // delete subject service calling
                    .subscribe(function (data) {
                    _this.getSubjectByClassId(class_id); // load data after delete
                });
                _this._commonService.successToaster('Deleted Successfully', 'Success!');
            }
        });
    };
    // ************************************************************************************************************* */
    /*********************************************General   Methods************************************************ */
    // ************************************************************************************************************* */
    // new modal
    SubjectsComponent.prototype.openNgModal = function (content, size) {
        this.modalService.open(content, { size: size });
    };
    SubjectsComponent.prototype.pageChanged = function (pN) {
        this.pageNumber = pN;
    };
    // show msg required all field newar submit button
    SubjectsComponent.prototype.mouseOverButton = function (status) {
        if (status === false) {
            this.showNotiRequiredAll = 0;
        }
        else {
            this.showNotiRequiredAll = 1;
        }
    };
    SubjectsComponent.prototype.mouseOutButton = function (status) {
        this.showNotiRequiredAll = 1;
    };
    // *** get sections against class for dropdown
    SubjectsComponent.prototype.classSelected = function (class_id) {
        this.getSectionByClassID(class_id);
        this.selectedClass_id = class_id;
    };
    // ***  get selected section id
    SubjectsComponent.prototype.sectionSelected = function (section_id) {
        // enable manage attendance btn when section isnt empty
        this.disableBtn = false;
        this.selectedSection_id = section_id;
    };
    // *** function to get subject name and check whether already added against selected class
    SubjectsComponent.prototype.checkSubject = function (subject_name) {
        var _this = this;
        var isSubjectPresent = 0;
        var subjectDetails = {
            subject_name: subject_name,
            class_id: Number(this.selectedClass_id),
            section_id: Number(this.selectedSection_id),
            running_session: this.running_session
        };
        this._SubjectsDataService
            .checkSubjectPresent(subjectDetails)
            .subscribe(function (result) {
            _this.isSubjectPresentA = result;
            isSubjectPresent = _this.isSubjectPresentA[0].subject_present;
            if (isSubjectPresent) {
                _this.subjectCheckAlert = 1;
                isSubjectPresent = 1;
                _this.disableBtn = true;
            }
            else {
                _this.subjectCheckAlert = 0;
                isSubjectPresent = 0;
                _this.disableBtn = false;
            }
        });
    };
    // * open model for edit subject details
    SubjectsComponent.prototype.openEditSubjectModal = function (modal, subject_id, section_id, class_id) {
        // call method to get single section data for updating
        this.getSingleSubjectData(subject_id, section_id, class_id);
        this.openNgModal(modal, 'md');
    };
    // close model
    // close model
    SubjectsComponent.prototype.closeModal = function () {
        this.modalService.dismissAll();
    };
    // open model
    SubjectsComponent.prototype.openModal = function (modal) {
        modal.open();
    };
    // hide update success alert after 2 secs
    SubjectsComponent.prototype.FadeOutToaster = function () {
        var _this = this;
        setTimeout(function () {
            _this.successNotification = 0;
        }, 2000);
    };
    SubjectsComponent.prototype.FadeOutUpdateToaster = function () {
        var _this = this;
        setTimeout(function () {
            _this.updateSuccessNotifi = 0;
        }, 2000);
    };
    SubjectsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-subjects',
            template: __webpack_require__(/*! ./subjects.component.html */ "./src/app/subjects/subjects.component.html"),
            styles: [__webpack_require__(/*! ./subjects.component.scss */ "./src/app/subjects/subjects.component.scss")],
            providers: [
                _manage_subjects_service__WEBPACK_IMPORTED_MODULE_5__["SubjectsDataService"],
                _teachers_teachers_service__WEBPACK_IMPORTED_MODULE_1__["TeachersDataService"],
                _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_2__["ClassDataService"],
                _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_3__["SectionDataService"],
                _shared_services_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"]
            ]
        }),
        __metadata("design:paramtypes", [_manage_subjects_service__WEBPACK_IMPORTED_MODULE_5__["SubjectsDataService"],
            _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_2__["ClassDataService"],
            _teachers_teachers_service__WEBPACK_IMPORTED_MODULE_1__["TeachersDataService"],
            _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_3__["SectionDataService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModal"],
            _shared_services_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"]])
    ], SubjectsComponent);
    return SubjectsComponent;
}());



/***/ }),

/***/ "./src/app/subjects/subjects.module.ts":
/*!*********************************************!*\
  !*** ./src/app/subjects/subjects.module.ts ***!
  \*********************************************/
/*! exports provided: SubjectsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubjectsModule", function() { return SubjectsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _subjects_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./subjects.routing */ "./src/app/subjects/subjects.routing.ts");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng2-select */ "./node_modules/ng2-select/index.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ng2_select__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-modal */ "./node_modules/ngx-modal/index.js");
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ngx_modal__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _subjects_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./subjects.component */ "./src/app/subjects/subjects.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








/* components */

var SubjectsModule = /** @class */ (function () {
    function SubjectsModule() {
    }
    SubjectsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                ngx_pagination__WEBPACK_IMPORTED_MODULE_3__["NgxPaginationModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"],
                ng2_select__WEBPACK_IMPORTED_MODULE_4__["SelectModule"],
                ngx_modal__WEBPACK_IMPORTED_MODULE_5__["ModalModule"],
                _subjects_routing__WEBPACK_IMPORTED_MODULE_2__["routing"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"].forRoot()
            ],
            declarations: [_subjects_component__WEBPACK_IMPORTED_MODULE_8__["SubjectsComponent"]]
        })
    ], SubjectsModule);
    return SubjectsModule;
}());



/***/ }),

/***/ "./src/app/subjects/subjects.routing.ts":
/*!**********************************************!*\
  !*** ./src/app/subjects/subjects.routing.ts ***!
  \**********************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _subjects_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./subjects.component */ "./src/app/subjects/subjects.component.ts");


var childRoutes = [
    {
        path: '',
        component: _subjects_component__WEBPACK_IMPORTED_MODULE_1__["SubjectsComponent"]
    }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(childRoutes);


/***/ })

}]);
//# sourceMappingURL=subjects-subjects-module.js.map