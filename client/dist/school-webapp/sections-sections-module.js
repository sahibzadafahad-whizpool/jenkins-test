(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["sections-sections-module"],{

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

/***/ "./src/app/sections/sections.component.html":
/*!**************************************************!*\
  !*** ./src/app/sections/sections.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n\r\n    <div class=\"col-lg-12 grid-margin stretch-card\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-lg-9 col-md-9\">\r\n                        <h4 class=\"card-title\">Section Details</h4>\r\n                    </div>\r\n                    <div class=\"col-lg-3  \" style=\"padding-bottom: 1.5em;\">\r\n                        <button _ngcontent-c2=\"\" (click)=\"openNgModal(addSectionModal , 'md')\" class=\"btn btn-success btn-block\">New Section<i _ngcontent-c2=\"\" class=\"mdi mdi-plus\"></i></button>\r\n                    </div>\r\n                </div>\r\n                <div class=\"table-responsive\" style=\"overflow-x: hidden;\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-lg-3\">\r\n                            <div class=\"list-group\" style=\"padding-top: 0px; width: -webkit-fill-available;\">\r\n                                <p class=\"list-group-item mini-sidebar\">\r\n                                    <i class=\"fa fa-university\"></i>\r\n                                    <span> Select Class</span>\r\n                                </p>\r\n                                <a *ngFor=\"let item of classData ; let i = index;\" style=\"cursor:pointer;\" class=\"list-group-item\" [style.background-color]=\"item.BackgroundColour\" [style.color]=\"item.color\" (click)=\"onClickSideBar(item.class_id , item)\">\r\n                                    <span>{{item.class_name}}</span>\r\n                                </a>\r\n                            </div>\r\n                        </div>\r\n                        <!-- <div class=\"col-lg-9 col-md-9\" *ngIf=\"!showtable\">\r\n                            <h3 style=\"text-align:center\"> Select Class</h3>\r\n                        </div> -->\r\n                        <div class=\"col-lg-9 col-md-9\">\r\n                            <div class=\"mini-heading\" style=\"text-align:center ; margin-bottom:1em;\">\r\n                                <h3 *ngIf=\"showtable\"> {{selectedClassName}} Section Details</h3>\r\n                                <h3 style=\"text-align:center\" *ngIf=\"!showtable\"> Select Class</h3>\r\n                            </div>\r\n                            <div style=\"margin-left: -0.8em;\">\r\n                                <div class=\"col-md-4 form-group\" *ngIf=\"showtable\">\r\n                                    <label class=\"control-label\"> Section Filter</label>\r\n                                    <select class=\"form-control fm-control\" (change)=getSelectedSectionDetails(pickedSection.value); required style=\"margin-top:0em;\" #pickedSection [(ngModel)]=\"section_id\" name=\"classid\">\r\n                                      <option value=\"all\" selected>All Sections </option>\r\n                                      <option *ngFor=\"let section of sectionOptions ; let index = index\" [value]=\"index\">\r\n                                        {{ section.section_name}}\r\n                                      </option>\r\n                                    </select>\r\n                                </div>\r\n                            </div>\r\n                            <table class=\"table table-bordered table-hover\">\r\n                                <thead class=\"thead-light\">\r\n                                    <tr>\r\n                                        <th>Section </th>\r\n                                        <!--<th>Class </th>-->\r\n                                        <th>Teacher </th>\r\n                                        <th *ngIf=\"(admin_level == 1)\">Actions</th>\r\n                                    </tr>\r\n                                </thead>\r\n                                <tbody>\r\n                                    <tr *ngFor=\"let item of arrayname | paginate: { id: 'pager', itemsPerPage: pageSize, currentPage: pageNumber};let index = index\">\r\n                                        <td>{{item.section_name}}</td>\r\n                                        <!--<td>{{item.class_name}}</td>-->\r\n                                        <td>{{item.teacher_name}}</td>\r\n                                        <td *ngIf=\"(admin_level == 1)\">\r\n                                            <label class=\"badge badge-info\" (click)=openEditSectionModal(updateSectionModal,item.section_id,item.class_id) style=\"cursor: pointer;\">Edit</label>\r\n                                            <label class=\"badge badge-danger\" (click)=deleteSection(item.section_id,item.class_id) style=\"cursor: pointer; margin-left: 1em;\">Delete </label>\r\n                                        </td>\r\n                                    </tr>\r\n                                </tbody>\r\n                            </table>\r\n                        </div>\r\n                    </div>\r\n                    <div style=\"text-align: center ; margin-top: 2em;\">\r\n                        <form class=\"pagination-wrapper\">\r\n                            <div class=\"form-group pages\">\r\n                                <pagination-controls class=\"my-pagination\" id=\"pager\" (pageChange)=\"pageChanged($event)\" maxSize=\"10\" directionLinks=\"true\" autoHide=\"true\" previousLabel=\"Prev\" nextLabel=\"Next\" screenReaderPaginationLabel=\"Pagination\" screenReaderPageLabel=\"page\" screenReaderCurrentLabel=\"You're on page\">\r\n                                </pagination-controls>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<!-- add class modal  -->\r\n<ng-template #addSectionModal let-modal>\r\n    <div class=\"modal-header\">\r\n        <div style=\"text-align: center\">\r\n            <h3>Add New</h3>\r\n        </div>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n    </div>\r\n    <form class=\"form-group\" #addsection=\"ngForm\" (ngSubmit)=\"onSubmitAddSection(addsection)\">\r\n        <div class=\"modal-body\">\r\n\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-12 col-md-12 \">\r\n                    <label class=\"control-label\"> Select Class * </label>\r\n                    <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #selectedClass [(ngModel)]=\"class_id\" (change)=classRequired(selectedClass.value); name=\"class_id\" id=\"class_id\">\r\n            <option [ngValue]=\"undefined\" disabled>Select Class</option>\r\n            <option *ngFor=\"let item of classData\" [value]=\"item.class_id\">{{item.class_name}}</option>\r\n          </select>\r\n                </div>\r\n                <div class=\"col-lg-12 col-md-12 \">\r\n\r\n                    <label class=\"control-label\" style=\"margin-top:.5em;\">Section Name </label>\r\n                    <span style=\"color:red;\" *ngIf=\"!pickedSecName.valid && pickedSecName.touched\"><small\r\n              style=\"margin-left:1em;\">\r\n              Section Name Required</small> </span>\r\n                    <span style=\"color:red;\" *ngIf=\"sectionCheckAlert\"><small style=\"margin-left: 1em;\"> Section already\r\n              registred against class.</small> </span>\r\n\r\n                    <input type=\"text\" style=\"margin-top:0em;\" required class=\"form-control fm-control\" [(ngModel)]=\"section_name\" name=\"section_name\" placeholder=\"Section Name\" #pickedSecName=\"ngModel\">\r\n                </div>\r\n                <div class=\"col-lg-12 col-md-12 \">\r\n                    <label class=\"control-label\">Teacher</label>\r\n                    <select class=\"form-control fm-control\" style=\"margin-top:0em;\" [(ngModel)]=\"teacher_id\" name=\"teacher_id\">\r\n\t\t\t\t\t\t<option [ngValue]=\"undefined\" disabled>Select Teacher</option>\r\n\t\t\t\t\t\t<option *ngFor=\"let item of teachersData\" [value]=\"item.teacher_id\">{{item.teacher_name}}</option>\r\n\t\t\t\t\t  </select>\r\n                </div>\r\n            </div>\r\n\t\t</div>\r\n        <div class=\"modal-footer\">\r\n            <input type=\"submit\" class=\"btn btn-info\" [disabled]=\"!addsection.form.valid ||!disableButton\" value=\"Add Section\">\r\n            <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n        </div>\r\n    </form>\r\n</ng-template>\r\n\r\n<!-- Update Parent  -->\r\n<ng-template #updateSectionModal let-modal>\r\n    <div class=\"modal-header\">\r\n        <div style=\"text-align: center\">\r\n            <h3>Update Class Details</h3>\r\n        </div>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n    </div>\r\n    <form class=\"form-group\" #updateSection=\"ngForm\" (ngSubmit)=\"onSubmitUpdateSection(updateSection)\">\r\n        <div class=\"modal-body\">\r\n\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-12 col-md-12 \">\r\n                    <label class=\"control-label\"> Class </label>\r\n                    <input type=\"text\" style=\"margin-top:0em;\" required class=\"form-control fm-control\" [(ngModel)]=\"c_name\" name=\"c_name\" [disabled]=\"true\">\r\n                </div>\r\n                <div class=\"col-lg-12 col-md-12 \">\r\n                    <label class=\"control-label\" style=\"margin-top:.5em;\">Section</label>\r\n                    <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" [(ngModel)]=\"sec_name\" name=\"sec_name\" [disabled]=\"true\" placeholder=\"Section Name\" #pickedSeName=\"ngModel\">\r\n                </div>\r\n                <input type=\"hidden\" name=\"c_id\" [(ngModel)]=\"c_id\">\r\n                <input type=\"hidden\" name=\"sec_id\" [(ngModel)]=\"sec_id\">\r\n                <div class=\"col-lg-12 col-md-12 \">\r\n                    <label class=\"control-label\">Teacher</label>\r\n                    <select class=\"form-control fm-control\" style=\"margin-top:0em;\" [(ngModel)]=\"tech_id\" (change)=\"activeUpdatebtn()\" name=\"tech_id\">\r\n            <option [ngValue]=\"undefined\" disabled>{{tech_name}}</option>\r\n            <option *ngFor=\"let item of teachersData\" [value]=\"item.teacher_id\">{{item.teacher_name}}</option>\r\n          </select>\r\n                </div>\r\n\r\n            </div>\r\n\r\n        </div>\r\n        <div class=\"modal-footer\">\r\n            <input type=\"submit\" class=\"btn btn-info\" [disabled]=\"updateButtonDisable\" value=\"Update Section\">\r\n            <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n        </div>\r\n    </form>\r\n</ng-template>"

/***/ }),

/***/ "./src/app/sections/sections.component.scss":
/*!**************************************************!*\
  !*** ./src/app/sections/sections.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/sections/sections.component.ts":
/*!************************************************!*\
  !*** ./src/app/sections/sections.component.ts ***!
  \************************************************/
/*! exports provided: SectionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SectionsComponent", function() { return SectionsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _teachers_teachers_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../teachers/teachers.service */ "./src/app/teachers/teachers.service.ts");
/* harmony import */ var _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../classes/manageClass.service */ "./src/app/classes/manageClass.service.ts");
/* harmony import */ var _manageSection_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./manageSection.service */ "./src/app/sections/manageSection.service.ts");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
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







var SectionsComponent = /** @class */ (function () {
    // creating object of Service's  to call methods  => 'this is called dependency injection'
    function SectionsComponent(_commonService, _classesDataService, _teachersDataService, _sectionDataService, modalService) {
        this._commonService = _commonService;
        this._classesDataService = _classesDataService;
        this._teachersDataService = _teachersDataService;
        this._sectionDataService = _sectionDataService;
        this.modalService = modalService;
        this.sectionData = [];
        this.sectionOptions = [];
        this.selectedSection = [];
        this.tabtitle = 'Add New Section';
        this.pageSize = 10;
        this.pageNumber = 1;
        this.whenClicked = [false, false];
        this.disableButton = 0;
        this.successNotification = 0;
        this.updateButtonDisable = 1;
        this.sectionAddMsg = '';
        this.sec_name = '';
        this.c_name = '';
        this.tech_name = '';
        this.updateSuccessNotifi = 0;
        this.showtable = false;
    }
    // ********************* auto run the function on page load *******************//
    SectionsComponent.prototype.ngOnInit = function () {
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
    /******************************************Read Data from DB Methods*********************************************/
    // ***************************************************************************************************************/
    // ********************************************************************** */
    // ************ Get Section Data Against Selected Class ***************** */
    // ********************************************************************* */
    SectionsComponent.prototype.onChildSelect = function (Child) {
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
    SectionsComponent.prototype.onClickSideBar = function (class_id, Child) {
        //console.log(class_id);
        this.getSectionByClassID(class_id);
        this.onChildSelect(Child);
    };
    SectionsComponent.prototype.getSectionByClassID = function (class_id) {
        var _this = this;
        this.showtable = true;
        this._sectionDataService.getSectionF(class_id).subscribe(function (result) {
            _this.sectionData = result;
            _this.sectionOptions = [];
            _this.section_id = null;
            _this.arrayname = _this.sectionData;
            if (_this.sectionData.length) {
                _this.selectedClassName = _this.sectionData[0].class_name;
                _this.sectionOptions = result;
            }
            else {
                _this.selectedClassName = ' ';
            }
        });
    };
    // ********************************************************************** */
    // ************ Get Single Section Data Against Selected Section  ******** */
    // ********************************************************************* */
    SectionsComponent.prototype.getSingleSectionData = function (section_id, class_id) {
        var _this = this;
        var singleSectionList = null;
        this._sectionDataService
            .getSingleSectionF(section_id, class_id)
            .subscribe(function (result) {
            _this.singleSectionData = result;
            singleSectionList = _this.singleSectionData[0];
            _this.sec_id = singleSectionList.section_id;
            _this.sec_name = singleSectionList.section_name;
            _this.c_id = singleSectionList.class_id;
            _this.c_name = singleSectionList.class_name;
            _this.tech_id = singleSectionList.teacher_id;
            _this.tech_name = singleSectionList.teacher_name;
        });
    };
    // ********************************************************************** */
    // *********************** Get Class Data ******************************* */
    // ********************************************************************* */
    SectionsComponent.prototype.getClassData = function () {
        var _this = this;
        this._classesDataService.getClassesF().subscribe(function (result) {
            _this.classData = result;
        });
    };
    // ********************************************************************** */
    // *********************** Get Teachers Data ************************ */
    // ********************************************************************* */
    SectionsComponent.prototype.getTeachersData = function () {
        var _this = this;
        this._teachersDataService.getTeachersF().subscribe(function (result) {
            _this.teachersData = result;
        });
    };
    // ***************************************************************************************************************/
    /**************************************Write , Update , Delate Data  Methods*************************************/
    // ***************************************************************************************************************/
    // **************************************************************** */
    // ******************* Add new section event handler  ******************/
    // ***************************************************************** */
    SectionsComponent.prototype.onSubmitAddSection = function (submitEvent) {
        var _this = this;
        var addSecdata = submitEvent.value;
        var class_id = addSecdata.class_id;
        var newSectionData = {
            class_id: addSecdata.class_id,
            teacher_id: addSecdata.teacher_id,
            section_name: addSecdata.section_name
        };
        this._sectionDataService.addSectionF(newSectionData).subscribe(function (result) {
            if (result.status === 1) {
                _this._commonService.successToaster('Added Successfully', 'Success!');
                // call function to reload sections details from DB
                _this.getSectionByClassID(class_id);
                submitEvent.reset();
                _this.closeModal();
            }
            else {
                _this._commonService.errorToaster(result.msg, 'Error!');
            }
        });
    };
    // ***************************************************************************** **/
    // ******************* check section already added event handler  ******************/
    // ********************************************************** *******************/
    SectionsComponent.prototype.checkSectionAdded = function (class_id, section_name) {
        var _this = this;
        this.sectionCheckAlert = 0;
        var isSectionPresent = 0;
        section_name = section_name.replace(/\s/g, ''); // replace spaces in name
        this._sectionDataService
            .sectionExistCheckF(class_id, section_name)
            .subscribe(function (result) {
            _this.isSectionPresentA = result;
            isSectionPresent = _this.isSectionPresentA[0].section_present;
            if (isSectionPresent) {
                isSectionPresent = 1;
                _this.sectionCheckAlert = 1;
                _this.disableButton = 0;
            }
            else {
                isSectionPresent = 0;
                _this.sectionCheckAlert = 0;
                _this.disableButton = 1;
            }
        });
    };
    // *************************************************************** */
    // ******************* Update Section Data event handler  ******************/
    // *************************************************************** */
    SectionsComponent.prototype.onSubmitUpdateSection = function (submitEvent) {
        var _this = this;
        var Updatedata = submitEvent.value;
        var clas_id = +Updatedata.c_id;
        var section_id = +Updatedata.sec_id;
        var techr_id = Updatedata.tech_id; // convert into int
        var updateSectionData = {
            teacher_id: techr_id
        };
        this._sectionDataService
            .updateSectionF(updateSectionData, clas_id, section_id)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this._commonService.successToaster('Updated Successfully', 'Success!');
                _this.closeModal();
                _this.getTeachersData();
                // load data from db after update
                _this.getSectionByClassID(clas_id);
            }
            else {
                _this._commonService.errorToaster(result.msg, 'Error!');
            }
        });
        this.updateRest = submitEvent;
    };
    // *************************************************************** */
    // *************** Delete Section event handler  *****************/
    // *************************************************************** */
    SectionsComponent.prototype.deleteSection = function (section_id, clas_id) {
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
                _this._sectionDataService
                    .delSectionF(clas_id, section_id, deleteStatus) // delete section service calling
                    .subscribe(function (data) {
                    _this.getSectionByClassID(clas_id); // load section data
                });
                // show deleted notification
                _this._commonService.successToaster('Deleted Successfully', 'Success!');
            }
        });
    };
    // ************************************************************************************************************* */
    /*********************************************General   Methods************************************************ */
    // ************************************************************************************************************* */
    // get selected class section details
    SectionsComponent.prototype.getSelectedSectionDetails = function (index) {
        if (index === 'all') {
            this.arrayname = this.sectionData;
        }
        else {
            this.selectedSection = [];
            this.selectedSection.push(this.sectionData[index]);
            this.arrayname = this.selectedSection;
        }
    };
    // new modal
    SectionsComponent.prototype.openNgModal = function (content, size) {
        this.modalService.open(content, { size: size });
    };
    SectionsComponent.prototype.pageChanged = function (pN) {
        this.pageNumber = pN;
    };
    SectionsComponent.prototype.classRequired = function (data) {
        this.disableButton = 1;
    };
    // hide success toaster after 2 secs
    SectionsComponent.prototype.FadeOutToaster = function (time) {
        var _this = this;
        setTimeout(function () {
            _this.successNotification = 0;
        }, time);
    };
    // open model
    SectionsComponent.prototype.openEditSectionModal = function (modal, section_id, class_id) {
        // call method to get single section data for updating
        this.getSingleSectionData(section_id, class_id);
        this.openNgModal(modal, 'md');
    };
    // close model
    SectionsComponent.prototype.closeModal = function () {
        this.modalService.dismissAll();
    };
    // open model
    SectionsComponent.prototype.openModal = function (modal) {
        modal.open();
    };
    // active update button for section update
    SectionsComponent.prototype.activeUpdatebtn = function () {
        this.updateButtonDisable = 0;
    };
    // hide update success alert after 2 secs
    SectionsComponent.prototype.FadeOutUpdateToaster = function () {
        var _this = this;
        setTimeout(function () {
            _this.updateSuccessNotifi = 0;
        }, 2000);
    };
    SectionsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sections',
            template: __webpack_require__(/*! ./sections.component.html */ "./src/app/sections/sections.component.html"),
            styles: [__webpack_require__(/*! ./sections.component.scss */ "./src/app/sections/sections.component.scss")],
            providers: [
                _manageSection_service__WEBPACK_IMPORTED_MODULE_3__["SectionDataService"],
                _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_2__["ClassDataService"],
                _teachers_teachers_service__WEBPACK_IMPORTED_MODULE_1__["TeachersDataService"],
                _shared_services_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"]
            ]
        }),
        __metadata("design:paramtypes", [_shared_services_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"],
            _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_2__["ClassDataService"],
            _teachers_teachers_service__WEBPACK_IMPORTED_MODULE_1__["TeachersDataService"],
            _manageSection_service__WEBPACK_IMPORTED_MODULE_3__["SectionDataService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModal"]])
    ], SectionsComponent);
    return SectionsComponent;
}());



/***/ }),

/***/ "./src/app/sections/sections.module.ts":
/*!*********************************************!*\
  !*** ./src/app/sections/sections.module.ts ***!
  \*********************************************/
/*! exports provided: SectionsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SectionsModule", function() { return SectionsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _sections_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sections.routing */ "./src/app/sections/sections.routing.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng2-select */ "./node_modules/ng2-select/index.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ng2_select__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-modal */ "./node_modules/ngx-modal/index.js");
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ngx_modal__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _sections_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./sections.component */ "./src/app/sections/sections.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









/* components */

var SectionsModule = /** @class */ (function () {
    function SectionsModule() {
    }
    SectionsModule = __decorate([
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
                _sections_routing__WEBPACK_IMPORTED_MODULE_2__["routing"]
            ],
            declarations: [_sections_component__WEBPACK_IMPORTED_MODULE_9__["SectionsComponent"]]
        })
    ], SectionsModule);
    return SectionsModule;
}());



/***/ }),

/***/ "./src/app/sections/sections.routing.ts":
/*!**********************************************!*\
  !*** ./src/app/sections/sections.routing.ts ***!
  \**********************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _sections_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sections.component */ "./src/app/sections/sections.component.ts");


var childRoutes = [
    {
        path: '',
        component: _sections_component__WEBPACK_IMPORTED_MODULE_1__["SectionsComponent"]
    }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(childRoutes);


/***/ })

}]);
//# sourceMappingURL=sections-sections-module.js.map