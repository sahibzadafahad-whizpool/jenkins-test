(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["students-promotion-students-promotion-module"],{

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

/***/ "./src/app/students-promotion/student-promotion.service.ts":
/*!*****************************************************************!*\
  !*** ./src/app/students-promotion/student-promotion.service.ts ***!
  \*****************************************************************/
/*! exports provided: StudentPromotionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentPromotionService", function() { return StudentPromotionService; });
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




var StudentPromotionService = /** @class */ (function () {
    function StudentPromotionService(http, _globalService) {
        this.http = http;
        this._globalService = _globalService;
        this.serverLink = this._globalService.constants.serverLink;
        this.headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"](this._globalService.constants.headers);
    }
    // *************** Call API to get Students data for students promotions *****************
    StudentPromotionService.prototype.getStudentsPromotionInfo = function (class_id, current_session, next_session) {
        return this.http
            .get(this.serverLink +
            'get/std_promotionInfo/' +
            class_id +
            '/' +
            current_session +
            '/' +
            next_session, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *************** Call API to enroll student in next session *****************
    StudentPromotionService.prototype.studentPromoteFun = function (user_promote_data) {
        return this.http
            .post(this.serverLink + 'new/enrollment', user_promote_data, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *************** Call API to promote students in bulk *****************
    StudentPromotionService.prototype.studentBulKPromoteFun = function (bulk_promote_data) {
        return this.http
            .post(this.serverLink + 'new/bulk_enrollment', bulk_promote_data, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    StudentPromotionService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__["GlobalService"]])
    ], StudentPromotionService);
    return StudentPromotionService;
}());



/***/ }),

/***/ "./src/app/students-promotion/students-promotion.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/students-promotion/students-promotion.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-lg-12 col-md-12\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h4 class=\"card-title\">Students Promotion</h4>\r\n\r\n                <div style=\"font-size: .75rem;\">\r\n                    <span>\r\n            <b> Student Promotion Note : </b>\r\n            Promoting student from the present class to the next class will create an enrollment of\r\n            that student to the next session. Make sure to select correct class options from the select\r\n            menu before promoting.If you don't want to promote a student to the next class, please select\r\n            same class from option. That will not promote the student to the next class but it will create an enrollment\r\n            to the next session but in the same class.\r\n          </span>\r\n                </div>\r\n                <form class=\"form-group\" #studentPromote=\"ngForm\" (ngSubmit)=\"listStudentsForPromotion(studentPromote)\">\r\n                    <div class=\"row\" style=\"margin-top:1em;\">\r\n                        <div class=\"col-md-6 form-group\">\r\n                            <label class=\"control-label\" style=\"margin-top:1em;\">Current Session </label>\r\n                            <input type=\"text\" style=\"margin-top:0em;\" [(ngModel)]=\"current_session\" readonly class=\"form-control fm-control\" name=\"current_session\">\r\n                        </div>\r\n                        <div class=\"col-md-6 form-group\">\r\n                            <label class=\"control-label\" style=\"margin-top:1em;\">Next Session <small style=\"color: brown\">\r\n                  (If Next Session is empty than add next session from Settings )</small></label>\r\n\r\n                            <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickednextSession.valid && pickednextSession.touched\"><small>\r\n                  Required</small></span>\r\n                            <select class=\"form-control fm-control\" required style=\"margin-top:0em;\" #pickednextSession [(ngModel)]=\"next_session\" name=\"next_session\">\r\n                <option [ngValue]=\"undefined\" disabled>Select Next Session</option>\r\n                <option *ngFor=\"let item of sessionList\" [value]=\"item.session_name\">{{item.session_name}}</option>\r\n              </select>\r\n                        </div>\r\n                        <div class=\"col-md-4 form-group\">\r\n                            <label class=\"control-label\"> Promotion From Class *</label>\r\n                            <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedStdCLass.valid && pickedStdCLass.touched\"><small>Class\r\n                  Required</small></span>\r\n                            <select class=\"form-control fm-control\" required style=\"margin-top:0em;\" #pickedStdCLass [(ngModel)]=\"class_id\" name=\"class_id\">\r\n                <option [ngValue]=\"undefined\" disabled>Select Class</option>\r\n                <option *ngFor=\"let item of classList\" [value]=\"item.class_id\">{{item.class_name}}</option>\r\n              </select>\r\n\r\n                        </div>\r\n\r\n                        <div class=\"col-md-4 form-group\">\r\n                            <label class=\"control-label\"> Promotion To Class *</label>\r\n                            <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedStdPBCLass.valid && pickedStdPBCLass.touched\"><small>Class\r\n                  Required</small></span>\r\n                            <select class=\"form-control fm-control\" (change)=classSelected(pickedStdPBCLass.value); required style=\"margin-top:0em;\" #pickedStdPBCLass [(ngModel)]=\"promoted_class_id\" name=\"promotedB_class_id\">\r\n                <option [ngValue]=\"undefined\" disabled>Select Class</option>\r\n                <option *ngFor=\"let item of classList\" [value]=\"item.class_id\">{{item.class_name}}</option>\r\n              </select>\r\n\r\n                        </div>\r\n                        <div class=\"col-md-4 form-group\">\r\n                            <label class=\"control-label\"> Promotion To Section *</label>\r\n                            <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedStdBPSection.valid && pickedStdBPSection.touched\"><small>Section\r\n                  Required</small></span>\r\n                            <select class=\"form-control fm-control\" (change)=enableBtn() required style=\"margin-top:0em;\" #pickedStdBPSection [(ngModel)]=\"promoted_section_id\" name=\"promotedB_section_id\">\r\n                <option [ngValue]=\"undefined\" disabled>Select Section</option>\r\n                <option *ngFor=\"let item of sectionsDataList\" [value]=\"item.section_id\">{{item.section_name}}</option>\r\n              </select>\r\n\r\n                        </div>\r\n\r\n                        <div class=\"col-md-12 col-md-offset-12 form-group\" style=\"text-align:center; margin-top:2.5em;\">\r\n                            <input type=\"submit\" class=\"btn btn-info\" style=\"margin-top:1em\" [disabled]=\"!studentPromote.form.valid || disableBtn \" value=\"Manage Promotions\">\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</div>\r\n\r\n<div class=\"row\" *ngIf=\"showTable\">\r\n    <div class=\"col-lg-12 col-md-12\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n\r\n                <table class=\"table table-bordered table-hover\">\r\n                    <thead class=\"thead-light\">\r\n                        <tr>\r\n\r\n                            <th>S.no</th>\r\n                            <th>Roll Number</th>\r\n                            <th>Name</th>\r\n\r\n                            <th>Current Class</th>\r\n                            <th>Section</th>\r\n                            <!-- <th>Student Info</th> -->\r\n                            <th>\r\n                                <input type=\"checkbox\" [(ngModel)]=\"selectedAll\" (change)=\"selectAll();\" /> Select All</th>\r\n                            <!-- <th>Promote Individually </th> -->\r\n\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr *ngFor=\"let item of studentPromotionData | paginate: { id: 'pager', itemsPerPage: pageSize, currentPage: pageNumber};let index = index\">\r\n                            <td>{{index + 1}}</td>\r\n                            <td>{{item.roll_num}}</td>\r\n                            <td>{{item.std_name}}</td>\r\n\r\n                            <td>{{item.class_name}}</td>\r\n                            <td>{{item.section_name}}</td>\r\n                            <td>\r\n                                <input type=\"checkbox\" [(ngModel)]=\"item.promotion\" (change)=\"checkIfAllSelected();\">\r\n                            </td>\r\n                            <!-- <td> <span class=\"label label-darkblue\" style=\"cursor: pointer;\" (click)=viewStdResult(item.student_id)>View -->\r\n                            <!-- Result</span></td> -->\r\n\r\n                            <!-- <td>\r\n\r\n                                <label class=\"badge badge-info\" style=\"cursor: pointer;\" (click)=openStdPromotionModal(stdPromotionModal,item.student_id,index,item.roll_num)>Manage\r\n                  Promotion Individually</label>\r\n\r\n                            </td> -->\r\n                        </tr>\r\n\r\n                    </tbody>\r\n                </table>\r\n                <div class=\"row\" style=\"margin-top:1.5em;\">\r\n                    <div class=\"col-lg-12\" style=\"text-align: center\" *ngIf=\"promote_all_btn\">\r\n                        <span style=\"cursor: pointer; margin-left: 1em; font-size: 13px;\" class=\"btn btn-info\" (click)=\"promote_all()\">Promote All Selected Students</span>\r\n                    </div>\r\n\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n\r\n    <!-- *********************************** Modals **************************************** -->\r\n\r\n    <!-- modal for manage student promotion -->\r\n\r\n    <ng-template #stdPromotionModal let-modal>\r\n        <div class=\"modal-header\">\r\n            <div style=\"text-align: center\">\r\n                <h3>Student Promotion</h3>\r\n            </div>\r\n            <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n        <span aria-hidden=\"true\">&times;</span>\r\n      </button>\r\n        </div>\r\n        <div class=\"modal-body\">\r\n            <form class=\"form-group\" #managePromotion=\"ngForm\" (ngSubmit)=\"onSubmitPromoteStudent(managePromotion)\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-12 form-group\">\r\n                        <label class=\"control-label\" style=\"margin-top:.5em;\">Current Session</label>\r\n                        <input type=\"text\" readonly style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"current_session\" [(ngModel)]=\"current_session\">\r\n                    </div>\r\n                    <div class=\"col-md-12 form-group\">\r\n                        <label class=\"control-label\" style=\"margin-top:.5em;\"> Current Class </label>\r\n                        <input type=\"email\" readonly style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"currentClass\" [(ngModel)]=\"currentClass\">\r\n                    </div>\r\n                    <div class=\"col-md-12 form-group\">\r\n                        <label class=\"control-label\" style=\"margin-top:.5em;\"> Current Section </label>\r\n                        <input type=\"email\" readonly style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"currentSection\" [(ngModel)]=\"currentSection\">\r\n                    </div>\r\n\r\n                    <div class=\"col-md-12 form-group\">\r\n                        <label class=\"control-label\"> Promoted To Session </label>\r\n                        <input type=\"email\" readonly style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"nextSession\" [(ngModel)]=\"nextSession\">\r\n                    </div>\r\n\r\n                    <div class=\"col-md-12 form-group\">\r\n                        <label class=\"control-label\"> Promotion To Class *</label>\r\n                        <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedStdPCLass.valid && pickedStdPCLass.touched\"><small>Class\r\n                Required</small></span>\r\n                        <select class=\"form-control fm-control\" (change)=classSelected(pickedStdPCLass.value); required style=\"margin-top:0em;\" #pickedStdPCLass [(ngModel)]=\"promoted_class_id\" name=\"promoted_class_id\">\r\n              <option [ngValue]=\"undefined\" disabled>Select Class</option>\r\n              <option *ngFor=\"let item of classList\" [value]=\"item.class_id\">{{item.class_name}}</option>\r\n            </select>\r\n\r\n                    </div>\r\n                    <div class=\"col-md-12 form-group\">\r\n                        <label class=\"control-label\"> Promotion To Section *</label>\r\n                        <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedStdPSection.valid && pickedStdPSection.touched\"><small>Section\r\n                Required</small></span>\r\n                        <select class=\"form-control fm-control\" (change)=enableBtn() required style=\"margin-top:0em;\" #pickedStdPSection [(ngModel)]=\"promoted_section_id\" name=\"promoted_section_id\">\r\n              <option [ngValue]=\"undefined\" disabled>Select Section</option>\r\n              <option *ngFor=\"let item of sectionsDataList\" [value]=\"item.section_id\">{{item.section_name}}\r\n              </option>\r\n            </select>\r\n\r\n                    </div>\r\n                    <input type=\"hidden\" readonly style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"p_student_id\" [(ngModel)]=\"p_student_id\">\r\n\r\n\r\n\r\n                    <div class=\"col-md-12 form-group modal_button\" style=\"text-align: right;\">\r\n                        <input type=\"submit\" class=\"btn btn-info\" style=\"margin-top:1em\" [disabled]=\"!managePromotion.form.valid || disableBtn \" value=\"Promote Student\">\r\n\r\n                    </div>\r\n                </div>\r\n            </form>\r\n\r\n        </div>\r\n        <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n        </div>\r\n    </ng-template>"

/***/ }),

/***/ "./src/app/students-promotion/students-promotion.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/students-promotion/students-promotion.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/students-promotion/students-promotion.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/students-promotion/students-promotion.component.ts ***!
  \********************************************************************/
/*! exports provided: StudentsPromotionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentsPromotionComponent", function() { return StudentsPromotionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _settings_settings_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../settings/settings.service */ "./src/app/settings/settings.service.ts");
/* harmony import */ var _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../classes/manageClass.service */ "./src/app/classes/manageClass.service.ts");
/* harmony import */ var _student_promotion_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./student-promotion.service */ "./src/app/students-promotion/student-promotion.service.ts");
/* harmony import */ var _students_student_information_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../students/student-information.service */ "./src/app/students/student-information.service.ts");
/* harmony import */ var _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../sections/manageSection.service */ "./src/app/sections/manageSection.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_7__);
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









var StudentsPromotionComponent = /** @class */ (function () {
    function StudentsPromotionComponent(modalService, _settingsService, _classDataService, _studentPromotionService, _studentsInfoService, _sectionDataService, _commonService) {
        this.modalService = modalService;
        this._settingsService = _settingsService;
        this._classDataService = _classDataService;
        this._studentPromotionService = _studentPromotionService;
        this._studentsInfoService = _studentsInfoService;
        this._sectionDataService = _sectionDataService;
        this._commonService = _commonService;
        /* pagination Info */
        this.pageSize = 10;
        this.pageNumber = 1;
        this.showTable = false;
        this.tabtitle = 'Students Promotions';
        this.current_session = localStorage.getItem('running_session');
        this.admin_level = localStorage.getItem('admin_level');
        // promotion modal variables
        this.currentClass = '';
        this.currentSection = '';
        this.nextSession = '';
        this.disableBtn = false;
        this.promote_all_btn = false;
    }
    StudentsPromotionComponent.prototype.ngOnInit = function () {
        // get admin level
        this.admin_level = localStorage.getItem('admin_level');
        this.get_sessionsData();
        this.get_classesData();
    };
    // *********************************************************************************************************************** */
    /**********************************************************Read Data from DB Methods************************************** */
    // *********************************************************************************************************************** */
    // ********************************************************************* */
    // *********************** Get all sessions data************************ */
    // ******************************************************************* */
    // getting all sessions list
    StudentsPromotionComponent.prototype.get_sessionsData = function () {
        var _this = this;
        var data = 'not_active';
        this._settingsService.get_sessionDetailsF(data).subscribe(function (result) {
            if (result.status === 1) {
                _this.sessionList = result.data;
            }
            else if (result.status === 0) {
                _this._commonService.warningToaster('No next session is added', 'Failed!');
            }
            else {
                _this._commonService.errorToaster('Server error try again.', 'Error!');
                console.log(result.msg);
            }
        });
    };
    // ********************************************************************* */
    // *********************** Get all classes data************************ */
    // ******************************************************************* */
    // getting all claases data
    StudentsPromotionComponent.prototype.get_classesData = function () {
        var _this = this;
        this._classDataService.getClassesF().subscribe(function (result) {
            if (result.status === 403) {
                _this._commonService.errorToaster('Server error try again.', 'Error!');
                console.log(result.msg);
            }
            else {
                _this.classList = result;
            }
        });
    };
    // ********************************************************************** */
    // ************ Get Section Data Against Selected Class ***************** */
    // ********************************************************************* */
    StudentsPromotionComponent.prototype.getSectionByClassID = function (class_id) {
        var _this = this;
        // * disable btn untill section selcted and empty section array when selected class change
        this.sectionsDataList = [];
        this.disableBtn = true;
        this._sectionDataService.getSectionF(class_id).subscribe(function (result) {
            _this.sectionsDataList = result;
        });
    };
    // ********************************************************************* */
    // ********** Get all students against class  for promotion************** */
    // ******************************************************************* */
    StudentsPromotionComponent.prototype.listStudentsForPromotion = function (submitedEvent) {
        var _this = this;
        // active promote all btn
        this.promote_all_btn = true;
        this.showTable = true;
        this.next_session_class_id = submitedEvent.value.promotedB_class_id;
        this.next_session_section_id = submitedEvent.value.promotedB_section_id;
        this.studentPromotionData = [];
        this.nextSession = '';
        var class_id = submitedEvent.value.class_id;
        var next_session = submitedEvent.value.next_session;
        this.nextSession = next_session;
        this._studentPromotionService
            .getStudentsPromotionInfo(class_id, this.current_session, next_session)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this.studentPromotionData = result.data;
                _this.currentClass = result.data[0].class_name;
            }
            else if (result.status === 0) {
                _this._commonService.warningToaster('No student data available', 'Notice!');
            }
            else {
                _this._commonService.errorToaster('Server error try again', 'Error!');
                console.log(result.msg);
            }
        });
    };
    // *********************************************************************************************************************** */
    /**********************************************************Add , Update Delete Methods************************************** */
    // *********************************************************************************************************************** */
    // ********************************************************************* */
    // *********************** Promote Student************************ */
    // ******************************************************************* */
    StudentsPromotionComponent.prototype.onSubmitPromoteStudent = function (submittedEvent) {
        var _this = this;
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
        var user_promote_data = {
            year: submittedEvent.value.nextSession,
            student_id: submittedEvent.value.p_student_id,
            class_id: submittedEvent.value.promoted_class_id,
            section_id: submittedEvent.value.promoted_section_id,
            roll_num: this.std_roll_num,
            enroll_date: unix_today_date
        };
        sweetalert2__WEBPACK_IMPORTED_MODULE_7___default()({
            title: 'Are you sure? Youve checked the selected options ?',
            text: ' Make sure to select correct class , next session options from the select menu before promoting',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I did!'
        }).then(function (result) {
            _this._studentPromotionService
                .studentPromoteFun(user_promote_data)
                .subscribe(function (resultresp) {
                if (resultresp.status === 1) {
                    _this._commonService.successToaster('Added Successfully', 'Success!');
                }
                else if (resultresp.status === 3) {
                    _this._commonService.warningToaster(resultresp.msg, 'Failed!');
                }
                else {
                    _this._commonService.errorToaster('Server error try again', 'Error!');
                    console.log(resultresp.msg);
                }
            });
        });
    };
    // ********************************************************************* */
    // *********************** Promote Students In Bulk ************************ */
    // ******************************************************************* */
    StudentsPromotionComponent.prototype.promote_all = function () {
        var _this = this;
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
        var user_bulk_promote_data = {
            next_session: this.nextSession,
            enroll_date: unix_today_date,
            next_class_id: this.next_session_class_id,
            next_section_id: this.next_session_section_id,
            student_data_array: this.studentPromotionData
        };
        sweetalert2__WEBPACK_IMPORTED_MODULE_7___default()({
            title: 'Are you sure? Youve checked the selected options ?',
            text: ' Make sure to select correct class , section , next session options from the select menu before promoting',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Get Data!'
        }).then(function (result) {
            var array_count = _this.studentPromotionData.length;
            _this._studentPromotionService
                .studentBulKPromoteFun(user_bulk_promote_data)
                .subscribe(function (resultresp) {
                console.log(result);
                if (resultresp.status === 1) {
                    if (array_count === resultresp.count) {
                        // if user click button without selecting present / absent for student
                        _this._commonService.warningToaster('Kindly select any student', 'Failed!');
                    }
                    else if (array_count === resultresp.enroll_count) {
                        _this._commonService.errorToaster('Students are already enrolled in selected session', 'Failed!');
                    }
                    else {
                        _this._commonService.successToaster('Promoted Successfully', 'Success!');
                    }
                }
                else {
                    _this._commonService.errorToaster('Server error try again.', 'Error!');
                    console.log(resultresp.msg);
                }
            });
        });
    };
    // *********************************************************************************************************************** */
    /*********************************************General   Methods************************************** */
    // *********************************************************************************************************************** */
    // ****** Select / unSelect bilk attendance Mark  **************************/
    StudentsPromotionComponent.prototype.selectAll = function () {
        for (var i = 0; i < this.studentPromotionData.length; i++) {
            this.studentPromotionData[i].promotion = this.selectedAll;
        }
    };
    StudentsPromotionComponent.prototype.checkIfAllSelected = function () {
        this.selectedAll = this.studentPromotionData.every(function (item) {
            return item.selected === true;
        });
    };
    /****************************View student result info ********************** */
    StudentsPromotionComponent.prototype.viewStdResult = function (student_id) {
        var _this = this;
        this._studentsInfoService
            .get_stdAllexamResultF(student_id, this.current_session)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this.stdAllexamResultList = result.data;
            }
            else {
                console.log('fetching marks error' + result.msg);
            }
        });
    };
    /********************************** View student promotion modal *************** */
    StudentsPromotionComponent.prototype.openStdPromotionModal = function (modal, student_id, index, std_roll_num) {
        this.promoted_class_id = '';
        this.promoted_section_id = '';
        this.std_roll_num = std_roll_num;
        this.p_student_id = student_id;
        this.currentSection = this.studentPromotionData[index].section_name;
        var next_session = this.next_session;
        // check whether student  is already promoted , if yes get the student data against next session
        this.openNgModal(modal, 'md');
    };
    // *** get sections against class for dropdown
    StudentsPromotionComponent.prototype.classSelected = function (class_id) {
        this.getSectionByClassID(class_id);
    };
    /********************************* pagination Info ****************************/
    StudentsPromotionComponent.prototype.pageChanged = function (pN) {
        this.pageNumber = pN;
    };
    // enable manage attendance btn when section isnt empty
    StudentsPromotionComponent.prototype.enableBtn = function () {
        this.disableBtn = false;
    };
    StudentsPromotionComponent.prototype.closeModal = function (modal) {
        modal.close();
    };
    // new modal
    StudentsPromotionComponent.prototype.openNgModal = function (content, size) {
        this.modalService.open(content, { size: size });
    };
    StudentsPromotionComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-students-promotion',
            template: __webpack_require__(/*! ./students-promotion.component.html */ "./src/app/students-promotion/students-promotion.component.html"),
            styles: [__webpack_require__(/*! ./students-promotion.component.scss */ "./src/app/students-promotion/students-promotion.component.scss")],
            providers: [
                _settings_settings_service__WEBPACK_IMPORTED_MODULE_1__["SettingsService"],
                _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_2__["ClassDataService"],
                _student_promotion_service__WEBPACK_IMPORTED_MODULE_3__["StudentPromotionService"],
                _students_student_information_service__WEBPACK_IMPORTED_MODULE_4__["StudentsInfoService"],
                _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_5__["SectionDataService"],
                _shared_services_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"]
            ]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModal"],
            _settings_settings_service__WEBPACK_IMPORTED_MODULE_1__["SettingsService"],
            _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_2__["ClassDataService"],
            _student_promotion_service__WEBPACK_IMPORTED_MODULE_3__["StudentPromotionService"],
            _students_student_information_service__WEBPACK_IMPORTED_MODULE_4__["StudentsInfoService"],
            _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_5__["SectionDataService"],
            _shared_services_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"]])
    ], StudentsPromotionComponent);
    return StudentsPromotionComponent;
}());



/***/ }),

/***/ "./src/app/students-promotion/students-promotion.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/students-promotion/students-promotion.module.ts ***!
  \*****************************************************************/
/*! exports provided: StudentsPromotionModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentsPromotionModule", function() { return StudentsPromotionModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _students_promotion_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./students-promotion.routing */ "./src/app/students-promotion/students-promotion.routing.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng2-select */ "./node_modules/ng2-select/index.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ng2_select__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-modal */ "./node_modules/ngx-modal/index.js");
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ngx_modal__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _students_promotion_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./students-promotion.component */ "./src/app/students-promotion/students-promotion.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










/* components */

var StudentsPromotionModule = /** @class */ (function () {
    function StudentsPromotionModule() {
    }
    StudentsPromotionModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                ng2_search_filter__WEBPACK_IMPORTED_MODULE_8__["Ng2SearchPipeModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_4__["NgxPaginationModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__["NgbModule"],
                ng2_select__WEBPACK_IMPORTED_MODULE_5__["SelectModule"],
                ngx_modal__WEBPACK_IMPORTED_MODULE_6__["ModalModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_3__["HttpModule"],
                _students_promotion_routing__WEBPACK_IMPORTED_MODULE_2__["routing"]
            ],
            declarations: [_students_promotion_component__WEBPACK_IMPORTED_MODULE_10__["StudentsPromotionComponent"]]
        })
    ], StudentsPromotionModule);
    return StudentsPromotionModule;
}());



/***/ }),

/***/ "./src/app/students-promotion/students-promotion.routing.ts":
/*!******************************************************************!*\
  !*** ./src/app/students-promotion/students-promotion.routing.ts ***!
  \******************************************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _students_promotion_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./students-promotion.component */ "./src/app/students-promotion/students-promotion.component.ts");


var childRoutes = [
    {
        path: '',
        component: _students_promotion_component__WEBPACK_IMPORTED_MODULE_1__["StudentsPromotionComponent"]
    }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(childRoutes);


/***/ }),

/***/ "./src/app/students/student-information.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/students/student-information.service.ts ***!
  \*********************************************************/
/*! exports provided: StudentsInfoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentsInfoService", function() { return StudentsInfoService; });
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




var StudentsInfoService = /** @class */ (function () {
    function StudentsInfoService(http, _globalService) {
        this.http = http;
        this._globalService = _globalService;
        this.serverLink = this._globalService.constants.serverLink;
        this.imagesBaseServer = this._globalService.constants.imagesBaseServer;
        this.headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"](this._globalService.constants.headers);
    }
    // *************** Call API to get Students data against class *****************
    StudentsInfoService.prototype.getStudByClassId = function (class_id, running_session) {
        return this.http
            .get(this.serverLink + 'get/students/' + class_id + '/' + running_session, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *************** Call API to get Students Result info *****************
    StudentsInfoService.prototype.get_stdResultF = function (exam_id, student_id, running_session) {
        return this.http
            .get(this.serverLink +
            'get/std_result/' +
            exam_id +
            '/' +
            student_id +
            '/' +
            running_session, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *************** Call API to get Students All exam Result info *****************
    StudentsInfoService.prototype.get_stdAllexamResultF = function (student_id, running_session) {
        return this.http
            .get(this.serverLink +
            'get/std_result/' +
            student_id +
            '/' +
            running_session, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *************** Call API to get required Students data against class and section *****************
    StudentsInfoService.prototype.getStudDataByClassSecId = function (class_id, section_id, running_session) {
        return this.http
            .get(this.serverLink +
            'get/getStudDataByClassSecId/' +
            class_id +
            '/' +
            section_id +
            '/' +
            running_session, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *************** Call API to get Students  data against class and section *****************
    // ** @param data_required -> get student all data or only required data */
    StudentsInfoService.prototype.getStudByClassSecId = function (class_id, section_id, running_session, data_required) {
        return this.http
            .get(this.serverLink +
            'get/studentsByClassSecId/' +
            class_id +
            '/' +
            section_id +
            '/' +
            running_session +
            '/' +
            data_required, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *************** Call API to get Signle Students data for update *****************
    StudentsInfoService.prototype.getSingleStdInfo = function (class_id, running_session) {
        return this.http
            .get(this.serverLink +
            'get/singleStudent/' +
            class_id +
            '/' +
            running_session, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *************** Call API to update student personal info *****************
    StudentsInfoService.prototype.updateStdInfo = function (std_id, updateStdData) {
        return this.http
            .put(this.serverLink + 'update/studentInfo/' + std_id, updateStdData, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *************** Call API to update student educational info *****************
    StudentsInfoService.prototype.updateStdEnrollInfo = function (std_id, updateEnrollInfo) {
        return this.http
            .put(this.serverLink + 'update/studentEduInfo/' + std_id, updateEnrollInfo, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    // *************** Call API to Delete student  *****************
    StudentsInfoService.prototype.deleteStudent = function (std_id) {
        return this.http
            .put(this.serverLink + 'delete/student/' + std_id, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *********************** Call  API for verifing parent phone number *****************************
    StudentsInfoService.prototype.verifyParentF = function (parentNumber) {
        return this.http
            .post(this.serverLink + 'verify/parent', parentNumber, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *********************** Call  API for Adding New Student *****************************
    StudentsInfoService.prototype.addStudentF = function (newSubjectData) {
        return this.http
            .post(this.serverLink + 'add/student', newSubjectData, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // *********************** Call  API for Adding New Student *****************************
    StudentsInfoService.prototype.enrollStudentF = function (enrollStudentData) {
        return this.http
            .post(this.serverLink + 'enroll/student', enrollStudentData, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    StudentsInfoService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__["GlobalService"]])
    ], StudentsInfoService);
    return StudentsInfoService;
}());



/***/ })

}]);
//# sourceMappingURL=students-promotion-students-promotion-module.js.map