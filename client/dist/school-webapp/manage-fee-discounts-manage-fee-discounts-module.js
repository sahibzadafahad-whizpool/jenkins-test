(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["manage-fee-discounts-manage-fee-discounts-module"],{

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

/***/ "./src/app/manage-fee-discounts/discountSearch.pipe.ts":
/*!*************************************************************!*\
  !*** ./src/app/manage-fee-discounts/discountSearch.pipe.ts ***!
  \*************************************************************/
/*! exports provided: DiscountSearchPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiscountSearchPipe", function() { return DiscountSearchPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DiscountSearchPipe = /** @class */ (function () {
    function DiscountSearchPipe() {
    }
    DiscountSearchPipe.prototype.transform = function (items, filterdata) {
        if (!items)
            return [];
        if (!filterdata)
            return items;
        filterdata = filterdata.toString();
        return items.filter(function (searchValue) {
            var rVal = JSON.stringify(searchValue.roll_num).includes(filterdata) ||
                JSON.stringify(searchValue.std_name).includes(filterdata);
            return rVal;
        });
    };
    DiscountSearchPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: "filter"
        })
    ], DiscountSearchPipe);
    return DiscountSearchPipe;
}());



/***/ }),

/***/ "./src/app/manage-fee-discounts/manage-fee-discounts.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/manage-fee-discounts/manage-fee-discounts.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col-lg-12 grid-margin stretch-card\">\r\n    <div class=\"card\">\r\n      <div class=\"card-body\">\r\n        <div class=\"row\">\r\n          <div class=\"col-lg-4\">\r\n            <h4 class=\"card-title\">Manage Students Fee Discounts</h4>\r\n          </div>\r\n          <div class=\"col-lg-5 col-md-5\">\r\n\r\n          </div>\r\n          <div class=\"col-lg-3\">\r\n            <button _ngcontent-c2=\"\" (click)=\" openNgModal(addFeeDiscountModel, 'md')\" class=\"btn btn-success btn-block\">\r\n              Add Fee Discounts\r\n              <i _ngcontent-c2=\"\" class=\"mdi mdi-plus\"></i></button>\r\n          </div>\r\n        </div>\r\n\r\n        <div style=\"text-align: center\">\r\n          <h5 style=\"color: red;\"> {{dbRespMsg}}</h5>\r\n        </div>\r\n        <div class=\"col-lg-12 vol-md-12\">\r\n          <hr>\r\n          <form style=\"margin-top:2em;\" class=\"form-group\" #listFeeDiscounts=\"ngForm\"\r\n            (ngSubmit)=\"onSubmitListStdFeeDiscounts(listFeeDiscounts.value.classid)\">\r\n\r\n\r\n            <div class=\"col-md-4 form-group\">\r\n              <label class=\"control-label\"> Select Class To List Students Fee Discounts *</label>\r\n              <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedCLass.valid && pickedCLass.touched\"><small>Class\r\n                  Required</small></span>\r\n              <select class=\"form-control fm-control\" required style=\"margin-top:0em;\" #pickedCLass\r\n                [(ngModel)]=\"classid\" name=\"classid\">\r\n                <option [ngValue]=\"undefined\" disabled>Select Class</option>\r\n                <option *ngFor=\"let item of classdataList\" [value]=\"item.class_id\">{{item.class_name}}</option>\r\n              </select>\r\n\r\n            </div>\r\n\r\n\r\n            <div class=\"col-md-12 form-group\" style=\"text-align: center\">\r\n              <input type=\"submit\" class=\"btn btn-info\" style=\"margin-top:1em\"\r\n                [disabled]=\"!listFeeDiscounts.form.valid \" value=\"List Students\">\r\n\r\n            </div>\r\n            <div style=\"text-align: center\">\r\n\r\n            </div>\r\n          </form>\r\n\r\n        </div>\r\n\r\n        <div class=\"col-lg-12 col-md-12\" style=\"text-align:center;\">\r\n        <span style=\"color:red; margin-left: 1em;\">{{ dbrespStdFeeDisList }}</span>\r\n         </div>\r\n\r\n        <div class=\"col-lg-12 col-md-12\" *ngIf=\"showtable\">\r\n\r\n          <div style=\"text-align: center; margin-top: 2em;\" >\r\n            <h4> {{selectedClass}} Students Fee Discount List </h4>\r\n\r\n\r\n          </div>\r\n          <hr>\r\n          <div class=\"row\" style=\"margin-top: 1em; margin-bottom: 0em; padding-bottom: 1.5em; padding-top: 0em;\">\r\n            <div class=\"col-lg-4\">\r\n              <input class=\"form-control fm-control\" [(ngModel)]=\"searchText\" placeholder=\"Roll Num / Student Name\">\r\n            </div>\r\n\r\n\r\n          </div>\r\n          <div class=\"table-responsive\">\r\n            <table class=\"table table-bordered\">\r\n              <thead class=\"thead-light\">\r\n                <tr>\r\n                  <th>S.No</th>\r\n                  <th>Roll Num</th>\r\n                  <th>Name </th>\r\n                  <!-- <th>Parent Name</th> -->\r\n\r\n\r\n                  <th> Section </th>\r\n                  <th>Total Fee </th>\r\n                  <th>Discount</th>\r\n                  <th> Status</th>\r\n                  <th *ngIf=\"(admin_level == 1)\">Actions</th>\r\n\r\n                </tr>\r\n              </thead>\r\n              <tbody>\r\n                <tr *ngFor=\"let item of studentsFeeDiscountList | filter : searchText let index = index\">\r\n\r\n                  <td>{{index + 1}}</td>\r\n                  <td>{{item.roll_num}}</td>\r\n                  <td>{{item.std_name}}</td>\r\n                  <!-- <td>{{item.parent_name}}</td> -->\r\n                  <td>{{item.section_name}}</td>\r\n                  <td>{{item.fee_amount}}</td>\r\n                  <td>{{item.discount_amount}}</td>\r\n                  <th [style.color]=\"item.status == 0 ? 'red' : 'green'\"> {{item.status == '1' ? 'Active' :\r\n                      'pending'}}</th>\r\n\r\n                  <td *ngIf=\"(admin_level == 1)\">\r\n                    <label style=\"cursor: pointer;\"\r\n                      (click)=\"onClickUpdateFeeDiscount(updateFeeDiscountModel,item.discount_id)\"\r\n                      class=\"badge badge-info\">Update\r\n                    </label>\r\n\r\n                    <label *ngIf=\"( item.status == 0)\" style=\"cursor: pointer; padding-left: 1em; margin-left:1em;\"\r\n                      (click)=\"onClickChangeFeeDiscountStatus(item.discount_id,1)\" class=\"badge badge-primary\">Active\r\n                    </label>\r\n\r\n                    <label *ngIf=\"( item.status == 1)\" style=\"cursor: pointer; padding-left: 1em; margin-left:1em;\"\r\n                      (click)=\"onClickChangeFeeDiscountStatus(item.discount_id,0)\" class=\"badge badge-danger\">Disable\r\n                    </label>\r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n\r\n          </div>\r\n\r\n        </div>\r\n\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n<!-- *********************************** Modals **************************************** -->\r\n\r\n\r\n<!-- ******** add fee discount ************ -->\r\n\r\n\r\n<ng-template #addFeeDiscountModel let-modal>\r\n  <div class=\"modal-header\">\r\n    <div style=\"text-align: center\">\r\n      <h3>Add Discount fee details</h3>\r\n    </div>\r\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n  </div>\r\n   <form class=\"form-group\" #addfeeDiscount=\"ngForm\" (ngSubmit)=\"onClickAddFeeDiscount(addfeeDiscount)\">\r\n  <div class=\"modal-body\">\r\n\r\n      <label class=\"control-label\"> Class *</label>\r\n      <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedCLassE.valid && pickedCLassE.touched\"><small>Class\r\n          Required</small></span>\r\n      <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedCLassE [(ngModel)]=\"class_id\"\r\n          (change)=getSectionByClassID(pickedCLassE.value); name=\"class_id\">\r\n        <option [ngValue]=\"undefined\" disabled>Select Class</option>\r\n        <option *ngFor=\"let item of classdataList\" [value]=\"item.class_id\">{{item.class_name}}</option>\r\n      </select>\r\n\r\n\r\n      <label class=\"control-label\"> Section *</label>\r\n      <span style=\"color:red; margin-left: 1em;\"\r\n        *ngIf=\"!pickedStdSection.valid && pickedStdSection.touched\"><small>Section\r\n          Required</small></span>\r\n      <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedStdSection\r\n        [(ngModel)]=\"std_sectionId\" (change)=getStudentsData(pickedStdSection.value); name=\"std_sectionId\">\r\n        <option [ngValue]=\"undefined\" disabled>Select Section</option>\r\n        <option *ngFor=\"let item of sectionsDataList\" [value]=\"item.section_id\">{{item.section_name}}</option>\r\n      </select>\r\n\r\n\r\n\r\n\r\n      <label class=\"control-label\"> Select Student to set fee discount *</label>\r\n      <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedstd.valid && pickedstd.touched\"><small>Class\r\n          Required</small></span>\r\n      <select class=\"form-control fm-control\" required style=\"margin-top:0em;\" #pickedstd [(ngModel)]=\"student_id\"\r\n        name=\"student_id\">\r\n        <option [ngValue]=\"undefined\" disabled>Select Student</option>\r\n        <option *ngFor=\"let item of studentsData\" [value]=\"item.std_id\">{{item.std_name}}</option>\r\n      </select>\r\n\r\n\r\n      <label class=\"control-label\"> Total Class Fee </label>\r\n      <input type=\"text\" disabled class=\"form-control fm-control\" style=\"margin-top:0em;\" name=\"fee_amount\"\r\n        [(ngModel)]=\"fee_amount\">\r\n\r\n\r\n      <label class=\"control-label\">Discount Amount *</label>\r\n      <input type=\"number\" required class=\"form-control fm-control\" style=\"margin-top:0em;\" name=\"discount_amount\"\r\n        [(ngModel)]=\"discount_amount\" #pickeddisfeeA=\"ngModel\">\r\n      <p class=\"alert alert-danger\" *ngIf=\"!pickeddisfeeA.valid && pickeddisfeeA.touched\"\r\n        style=\"margin-top:1em; margin-left:0em;\">\r\n        Fee Discount Amount is required!\r\n      </p>\r\n\r\n      <label class=\"control-label\">Any comment related to fee discount</label>\r\n      <textarea rows=\"4\" cols=\"40\" class=\"form-control fm-control\" name=\"discount_comment\"\r\n        [(ngModel)]=\"discount_comment\"> </textarea>\r\n\r\n\r\n\r\n  </div>\r\n  <div class=\"modal-footer\">\r\n   <input type=\"submit\" class=\"btn btn-info\" [disabled]=\"!addfeeDiscount.form.valid\" value=\"Set Discount\">\r\n    <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n  </div>\r\n   </form>\r\n</ng-template>\r\n\r\n\r\n\r\n<!-- ******** Update Fee Struct ************ -->\r\n\r\n<ng-template #updateFeeDiscountModel let-modal>\r\n  <div class=\"modal-header\">\r\n    <div style=\"text-align: center\">\r\n      <h3>Update Discount fee details</h3>\r\n    </div>\r\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n  </div>\r\n   <form class=\"form-group\" #updatefeeDis=\"ngForm\" (ngSubmit)=\"onClickUpdateFeeDiscDetails(updatefeeDis)\">\r\n  <div class=\"modal-body\">\r\n\r\n      <label class=\"control-label\"> Student Name </label>\r\n\r\n      <input type=\"text\" disabled class=\"form-control fm-control\" name=\"student_name\" [(ngModel)]=\"student_name\">\r\n      <input type=\"hidden\" class=\"form-control fm-control\" name=\"discount_idu\" [(ngModel)]=\"discount_idu\">\r\n\r\n\r\n\r\n      <label class=\"control-label\">Discount Amount *</label> <span\r\n        style=\"color:red; margin-left: 2em;\">{{checkUpdateDAmount}}</span>\r\n      <input type=\"number\" required class=\"form-control fm-control\" name=\"discount_amountU\"\r\n        [(ngModel)]=\"discount_amountU\" #pickedfeeA=\"ngModel\">\r\n      <p class=\"alert alert-danger\" *ngIf=\"!pickedfeeA.valid && pickedfeeA.touched\"\r\n        style=\"margin-top:1em; margin-left:0em;\">\r\n        Fee Amount is required!\r\n      </p>\r\n\r\n      <label class=\"control-label\">Any comment related to fee discount</label>\r\n      <textarea rows=\"4\" cols=\"40\" class=\"form-control fm-control\" name=\"discount_commentU\"\r\n        [(ngModel)]=\"discount_commentU\"> </textarea>\r\n\r\n\r\n\r\n  </div>\r\n  <div class=\"modal-footer\">\r\n    <input type=\"submit\" class=\"btn btn-info\" [disabled]=\"!updatefeeDis.form.valid\" value=\"Update\">\r\n    <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n  </div>\r\n   </form>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./src/app/manage-fee-discounts/manage-fee-discounts.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/manage-fee-discounts/manage-fee-discounts.component.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/manage-fee-discounts/manage-fee-discounts.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/manage-fee-discounts/manage-fee-discounts.component.ts ***!
  \************************************************************************/
/*! exports provided: ManageFeeDiscountsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageFeeDiscountsComponent", function() { return ManageFeeDiscountsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _shared_services_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/services/common.service */ "./src/app/shared/services/common.service.ts");
/* harmony import */ var _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../classes/manageClass.service */ "./src/app/classes/manageClass.service.ts");
/* harmony import */ var _manage_fee_structure_manage_fee_structure_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../manage-fee-structure/manage-fee-structure.service */ "./src/app/manage-fee-structure/manage-fee-structure.service.ts");
/* harmony import */ var _manage_fee_discounts_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./manage-fee-discounts.service */ "./src/app/manage-fee-discounts/manage-fee-discounts.service.ts");
/* harmony import */ var _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../sections/manageSection.service */ "./src/app/sections/manageSection.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ManageFeeDiscountsComponent = /** @class */ (function () {
    function ManageFeeDiscountsComponent(_commonService, _classDataService, _manageFeeStructureService, _manageFeeDiscountsService, modalService, _sectionDataService) {
        this._commonService = _commonService;
        this._classDataService = _classDataService;
        this._manageFeeStructureService = _manageFeeStructureService;
        this._manageFeeDiscountsService = _manageFeeDiscountsService;
        this.modalService = modalService;
        this._sectionDataService = _sectionDataService;
        /* active session */
        this.running_session = localStorage.getItem('running_session');
        /* pagination Info */
        this.pageSize = 10;
        this.pageNumber = 1;
        this.discount_comment = '';
        // update fee discount
        this.student_name = '';
        this.discount_commentU = '';
        // notifications
        this.successNotifi = 0;
        this.updateNotifi = 0;
        this.alertType = '';
        this.addFeeSNoti = '';
        this.updateExamNoti = '';
        this.dbRespMsg = '';
        this.updateFeeStructNoti = '';
        this.addFeeDiscounts = '';
        this.selectedClass = '';
        this.dbrespStdFeeDisList = '';
        this.dbgetUpdateDataRespMsg = '';
        this.updateFeeDiscNoti = '';
        this.checkUpdateDAmount = '';
        this.showtable = false;
    }
    ManageFeeDiscountsComponent.prototype.ngOnInit = function () {
        // get admin level
        this.admin_level = localStorage.getItem('admin_level');
        this.getClassData(); // call function on page load
    };
    // *********************************************************************************************************************** */
    /**********************************************************Read Data from DB Methods************************************** */
    // *********************************************************************************************************************** */
    // ********************************************************** **********/
    // *********************** Get all Classes data ************************/
    // ******************************************************************* */
    ManageFeeDiscountsComponent.prototype.getClassData = function () {
        var _this = this;
        this._classDataService.getClassesF().subscribe(function (result) {
            _this.classdataList = result;
        });
    };
    ManageFeeDiscountsComponent.prototype.getSectionByClassID = function (class_id) {
        var _this = this;
        // * disbale btn untill section selcted and empty section array when selected class change
        this.sectionsDataList = [];
        this.std_sectionId = null;
        this._sectionDataService.getSectionF(class_id).subscribe(function (result) {
            _this.sectionsDataList = result;
            _this.selectedClassId = class_id;
        });
    };
    // ********************************************************** **********/
    // *********************** Get all Students against class*****************/
    // ******************************************************************* */
    ManageFeeDiscountsComponent.prototype.getStudentsData = function (section_id) {
        var _this = this;
        var class_id = this.selectedClassId;
        this.fee_amount = 0;
        this.dbRespMsg = '';
        this.studentsData = [];
        // get student details
        this._manageFeeDiscountsService
            .getClassStudentsF(class_id, section_id, this.running_session)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this.studentsData = result.data;
                // get class total fee details
                _this._manageFeeDiscountsService
                    .getClassFeeF(class_id, _this.running_session)
                    .subscribe(function (resultresp) {
                    if (resultresp.status === 1) {
                        _this.fee_amount = resultresp.data[0].fee_amount;
                    }
                    else if (resultresp.status === 0) {
                        _this.dbRespMsg = resultresp.msg;
                    }
                    else {
                        _this.dbRespMsg = resultresp.msg;
                    }
                });
            }
            else if (result.status === 0) {
                console.log('No student Data available');
            }
            else {
                _this.dbRespMsg = result.msg;
            }
        });
    };
    // ********************************************************** **********/
    // ****************** Get students fee discount Details *****************/
    // ******************************************************************* */
    ManageFeeDiscountsComponent.prototype.onSubmitListStdFeeDiscounts = function (class_id) {
        var _this = this;
        this.selectedClass = '';
        this.dbrespStdFeeDisList = '';
        this.studentsFeeDiscountList = [];
        // let class_id = Number(submitEvent.classid);
        this._manageFeeDiscountsService
            .get_studentsFeeDiscountList(class_id, this.running_session)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this.showtable = true;
                _this.studentsFeeDiscountList = result.data;
                _this.selectedClass = result.data[0].class_name;
                _this.total_fee = result.data[0].fee_amount;
                _this.selected_class_id = result.data[0].class_id;
            }
            else if (result.status === 0) {
                _this.dbrespStdFeeDisList = 'No Data available for selected class';
            }
            else {
                _this.dbrespStdFeeDisList = result.msg;
            }
        });
    };
    // ********************************************************** **********/
    // ****************** Get single students fee discount Details *****************/
    // ******************************************************************* */
    ManageFeeDiscountsComponent.prototype.get_singleStdFeeDis = function (discount_id) {
        var _this = this;
        this.dbgetUpdateDataRespMsg = '';
        var singleStdFeeDiscount = null;
        this._manageFeeDiscountsService
            .get_singleStdFeeDisF(discount_id)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this.singleStdFeeDiscList = result.data;
                singleStdFeeDiscount = _this.singleStdFeeDiscList[0];
                _this.student_name = singleStdFeeDiscount.std_name;
                _this.discount_idu = singleStdFeeDiscount.discount_id;
                _this.discount_amountU = singleStdFeeDiscount.discount_amount;
                _this.discount_commentU = singleStdFeeDiscount.comments;
            }
            else {
                _this.dbgetUpdateDataRespMsg = result.msg;
            }
        });
    };
    // *********************************************************************************************************************** */
    /************************************************Add , delete , update Methods********************************************** */
    // *********************************************************************************************************************** */
    // ********************************************************** **********/
    // *********************** Set student fee discount*****************/
    // ******************************************************************* */
    ManageFeeDiscountsComponent.prototype.onClickAddFeeDiscount = function (submitEvent) {
        var _this = this;
        this.selectedClassId = submitEvent.value.class_id;
        this.dbRespMsg = '';
        if (this.fee_amount < submitEvent.value.discount_amount) {
            this._commonService.warningToaster('Discount amount should be less than total fee amount', 'Failed!');
        }
        else {
            var status_1;
            // check admin level if admin isnt  super admin , its fee discount is pending
            if (this.admin_level === 1) {
                status_1 = 1;
            }
            else {
                status_1 = 0;
            }
            this.dbRespMsg = '';
            var fee_discount_data = {
                student_id: Number(submitEvent.value.student_id),
                class_id: Number(submitEvent.value.class_id),
                discount_amount: submitEvent.value.discount_amount,
                running_session: this.running_session,
                comment: submitEvent.value.discount_comment,
                status: status_1
            };
            this._manageFeeDiscountsService
                .setStudentFeeDiscount(fee_discount_data)
                .subscribe(function (result) {
                if (result.status === 1) {
                    _this._commonService.successToaster('Set Fee Discount For student successfully', 'Success!');
                    submitEvent.reset();
                    _this.onSubmitListStdFeeDiscounts(_this.selectedClassId);
                    _this.closeModal();
                }
                else {
                    _this._commonService.errorToaster(result.msg, 'Failed!');
                }
            });
        }
    };
    // ********************************************************** **********/
    // **************** Update Student fee discount details*****************/
    // ******************************************************************* */
    ManageFeeDiscountsComponent.prototype.onClickUpdateFeeDiscDetails = function (submitEvent) {
        var _this = this;
        this.checkUpdateDAmount = '';
        this.updateFeeDiscNoti = '';
        var update_data = submitEvent.value;
        if (this.total_fee < update_data.discount_amountU) {
            this.checkUpdateDAmount =
                'Error: Discount amount should be less than total fee amount';
        }
        else {
            var std_feeDisDetails = {
                discount_amount: update_data.discount_amountU,
                comments: update_data.discount_commentU
            };
            var discount_id = update_data.discount_idu;
            // calling service to call API
            this._manageFeeDiscountsService
                .update_stdFeeDiscount(discount_id, std_feeDisDetails)
                .subscribe(function (result) {
                if (result.status === 1) {
                    _this._commonService.successToaster('Successfully Updated', 'Success!');
                    _this.onSubmitListStdFeeDiscounts(_this.selected_class_id);
                    _this.closeModal();
                }
                else {
                    _this._commonService.successToaster('Server error try again', 'Failed!');
                }
            });
        }
    };
    // ********************************************************** **********/
    // **************** Change fee discount status for student*****************/
    // ******************************************************************* */
    ManageFeeDiscountsComponent.prototype.onClickChangeFeeDiscountStatus = function (discount_id, status) {
        var _this = this;
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default()({
            title: 'Are you sure?',
            text: 'Want to chnage fee discount status ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes !'
        }).then(function (result) {
            if (result.value) {
                // if user confirm then call delete API
                _this._manageFeeDiscountsService
                    .disableStdFeeDiscount(discount_id, status)
                    .subscribe(function (resultresp) {
                    if (resultresp.status === 1) {
                        _this._commonService.successToaster('Updated Successfully', 'Success!');
                        _this.onSubmitListStdFeeDiscounts(_this.selected_class_id);
                    }
                    else {
                        _this._commonService.errorToaster(resultresp.msg, 'Error!');
                    }
                });
            }
        });
    };
    // *********************************************************************************************************************** */
    /**********************************************************General Methods********************************************** */
    // *********************************************************************************************************************** */
    // new modal
    ManageFeeDiscountsComponent.prototype.openNgModal = function (content, size) {
        this.modalService.open(content, { size: size });
    };
    // ********* Open  update modal */
    ManageFeeDiscountsComponent.prototype.onClickUpdateFeeDiscount = function (modal, discount_id) {
        this.openNgModal(modal, 'md');
        this.get_singleStdFeeDis(discount_id);
    };
    // open modal
    ManageFeeDiscountsComponent.prototype.openModal = function (modal) {
        this.openNgModal(modal, 'md');
    };
    // close modal
    ManageFeeDiscountsComponent.prototype.closeModal = function () {
        this.modalService.dismissAll();
    };
    ManageFeeDiscountsComponent.prototype.pageChanged = function (pN) {
        this.pageNumber = pN;
    };
    ManageFeeDiscountsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-manage-fee-discounts',
            template: __webpack_require__(/*! ./manage-fee-discounts.component.html */ "./src/app/manage-fee-discounts/manage-fee-discounts.component.html"),
            styles: [__webpack_require__(/*! ./manage-fee-discounts.component.scss */ "./src/app/manage-fee-discounts/manage-fee-discounts.component.scss")],
            providers: [
                _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_4__["ClassDataService"],
                _manage_fee_structure_manage_fee_structure_service__WEBPACK_IMPORTED_MODULE_5__["ManageFeeStructureService"],
                _manage_fee_discounts_service__WEBPACK_IMPORTED_MODULE_6__["ManageFeeDiscountsService"],
                _shared_services_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
                _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_7__["SectionDataService"]
            ]
        }),
        __metadata("design:paramtypes", [_shared_services_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_4__["ClassDataService"],
            _manage_fee_structure_manage_fee_structure_service__WEBPACK_IMPORTED_MODULE_5__["ManageFeeStructureService"],
            _manage_fee_discounts_service__WEBPACK_IMPORTED_MODULE_6__["ManageFeeDiscountsService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModal"],
            _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_7__["SectionDataService"]])
    ], ManageFeeDiscountsComponent);
    return ManageFeeDiscountsComponent;
}());



/***/ }),

/***/ "./src/app/manage-fee-discounts/manage-fee-discounts.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/manage-fee-discounts/manage-fee-discounts.module.ts ***!
  \*********************************************************************/
/*! exports provided: ManageFeeDiscountsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageFeeDiscountsModule", function() { return ManageFeeDiscountsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _manage_fee_discounts_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./manage-fee-discounts.routing */ "./src/app/manage-fee-discounts/manage-fee-discounts.routing.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-modal */ "./node_modules/ngx-modal/index.js");
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ngx_modal__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");
/* harmony import */ var _discountSearch_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./discountSearch.pipe */ "./src/app/manage-fee-discounts/discountSearch.pipe.ts");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _manage_fee_discounts_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./manage-fee-discounts.component */ "./src/app/manage-fee-discounts/manage-fee-discounts.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









/* components */

var ManageFeeDiscountsModule = /** @class */ (function () {
    function ManageFeeDiscountsModule() {
    }
    ManageFeeDiscountsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                ng2_search_filter__WEBPACK_IMPORTED_MODULE_5__["Ng2SearchPipeModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ReactiveFormsModule"],
                ngx_modal__WEBPACK_IMPORTED_MODULE_4__["ModalModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_3__["HttpModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_7__["NgxPaginationModule"],
                _manage_fee_discounts_routing__WEBPACK_IMPORTED_MODULE_2__["routing"]
            ],
            declarations: [_manage_fee_discounts_component__WEBPACK_IMPORTED_MODULE_9__["ManageFeeDiscountsComponent"], _discountSearch_pipe__WEBPACK_IMPORTED_MODULE_6__["DiscountSearchPipe"]]
        })
    ], ManageFeeDiscountsModule);
    return ManageFeeDiscountsModule;
}());



/***/ }),

/***/ "./src/app/manage-fee-discounts/manage-fee-discounts.routing.ts":
/*!**********************************************************************!*\
  !*** ./src/app/manage-fee-discounts/manage-fee-discounts.routing.ts ***!
  \**********************************************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _manage_fee_discounts_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./manage-fee-discounts.component */ "./src/app/manage-fee-discounts/manage-fee-discounts.component.ts");


var childRoutes = [
    {
        path: '',
        component: _manage_fee_discounts_component__WEBPACK_IMPORTED_MODULE_1__["ManageFeeDiscountsComponent"]
    }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(childRoutes);


/***/ }),

/***/ "./src/app/manage-fee-discounts/manage-fee-discounts.service.ts":
/*!**********************************************************************!*\
  !*** ./src/app/manage-fee-discounts/manage-fee-discounts.service.ts ***!
  \**********************************************************************/
/*! exports provided: ManageFeeDiscountsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageFeeDiscountsService", function() { return ManageFeeDiscountsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../shared/services/global.service */ "./src/app/shared/services/global.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ManageFeeDiscountsService = /** @class */ (function () {
    function ManageFeeDiscountsService(http, _globalService) {
        this.http = http;
        this._globalService = _globalService;
        this.headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"](this._globalService.constants.headers);
        // get server link from global services
        this.serverLink = this._globalService.constants.serverLink;
    }
    // *********************************************************************************************************************** */
    /********************************************Calling APIs  ************************************************************** */
    // *********************************************************************************************************************** */
    // ************************** Call API to get student details  by class id *******************************
    ManageFeeDiscountsService.prototype.getClassStudentsF = function (class_id, section_id, running_session) {
        return this.http
            .get(this.serverLink +
            'get/class_students/' +
            class_id +
            '/' +
            section_id +
            '/' +
            running_session, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // ************************** Call API to get class fee details   *******************************
    ManageFeeDiscountsService.prototype.getClassFeeF = function (class_id, running_session) {
        return this.http
            .get(this.serverLink +
            'get/class_feeDetails/' +
            class_id +
            '/' +
            running_session, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // ************************** Call API to set fee discount   *******************************
    ManageFeeDiscountsService.prototype.setStudentFeeDiscount = function (fee_discount_data) {
        return this.http
            .post(this.serverLink + 'set/studentFeeDiscount', fee_discount_data, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // ************************** Call API to get students fee discount details   *******************************
    ManageFeeDiscountsService.prototype.get_studentsFeeDiscountList = function (class_id, runnig_session) {
        return this.http
            .get(this.serverLink +
            'get/studentsFeeDiscList/' +
            class_id +
            '/' +
            runnig_session, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // ************************** Call API to get single std fee discount details   *******************************
    ManageFeeDiscountsService.prototype.get_singleStdFeeDisF = function (discount_id) {
        return this.http
            .get(this.serverLink + 'get/singleStdFeeDiscDetails/' + discount_id, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // ************************** Call API to update std fee discount details   *******************************
    ManageFeeDiscountsService.prototype.update_stdFeeDiscount = function (discount_id, std_feeDisDetails) {
        return this.http
            .put(this.serverLink + 'update/stdFeeDiscountDetails/' + discount_id, std_feeDisDetails, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // ************************** Call API to disable student fee discount   *******************************
    ManageFeeDiscountsService.prototype.disableStdFeeDiscount = function (discount_id, status) {
        return this.http
            .put(this.serverLink +
            'change/stdFeeDiscount_status/' +
            discount_id +
            '/' +
            status, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    ManageFeeDiscountsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__["GlobalService"]])
    ], ManageFeeDiscountsService);
    return ManageFeeDiscountsService;
}());



/***/ })

}]);
//# sourceMappingURL=manage-fee-discounts-manage-fee-discounts-module.js.map