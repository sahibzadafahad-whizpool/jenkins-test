(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["manage-fee-invoice-manage-fee-invoice-module"],{

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



/***/ }),

/***/ "./src/app/manage-fee-invoice/manage-fee-invoice.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/manage-fee-invoice/manage-fee-invoice.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col-lg-12 grid-margin stretch-card\">\r\n    <div class=\"card\">\r\n      <div class=\"card-body\">\r\n\r\n        <div class=\"row\">\r\n          <div class=\"col-lg-4\">\r\n            <h4 class=\"card-title\">Manage Student Payments</h4>\r\n          </div>\r\n          <div class=\"col-lg-5 col-md-5\">\r\n\r\n          </div>\r\n          <div class=\"col-lg-3\">\r\n            <button _ngcontent-c2=\"\" (click)=\" openNgModal(generateInvoiceModal, 'md')\" class=\"btn btn-success btn-block\">\r\n              Generate Fee Invoice\r\n              <i _ngcontent-c2=\"\" class=\"mdi mdi-plus\"></i></button>\r\n          </div>\r\n        </div>\r\n\r\n\r\n        <div style=\"text-align: center\">\r\n          <h5 style=\"color: red;\"> {{dbRespMsg}}</h5>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-lg-12 vol-md-12\">\r\n            <hr>\r\n            <form style=\"margin-top:2em;\" class=\"form-group\" #listFeeDetails=\"ngForm\"\r\n              (ngSubmit)=onSubmitListStdFeeDetails(listFeeDetails)>\r\n\r\n\r\n              <div class=\"col-md-5 form-group\">\r\n                <label class=\"control-label\"> Select Class To List Students Fee Details *</label>\r\n                <span style=\"color:red; margin-left: 1em;\"\r\n                  *ngIf=\"!pickedCLass.valid && pickedCLass.touched\"><small>Class\r\n                    Required</small></span>\r\n                <select class=\"form-control fm-control\" required style=\"margin-top:0em;\" #pickedCLass\r\n                  [(ngModel)]=\"classid\" name=\"classid\">\r\n                  <option [ngValue]=\"undefined\" disabled>Select Class</option>\r\n                  <option *ngFor=\"let item of classdataList\" [value]=\"item.class_id\">{{item.class_name}}</option>\r\n                </select>\r\n\r\n              </div>\r\n\r\n              <div class=\"col-md-5 col-md-push-1 form-group\">\r\n                <label class=\"control-label\"> Fee Month *</label>\r\n                <span style=\"color:red; margin-left: 1em;\"\r\n                  *ngIf=\"!pickeddLFeeMonth.valid && pickeddLFeeMonth.touched\"><small>Fee\r\n                    month\r\n                    Required</small></span>\r\n                <input type=\"month\" required class=\"form-control fm-control\" style=\"margin-top:0em;\" name=\"feeMonth\"\r\n                  [(ngModel)]=\"feeMonth\" #pickeddLFeeMonth=\"ngModel\">\r\n\r\n\r\n              </div>\r\n              <div class=\"col-md-12 form-group\" style=\"text-align: center\">\r\n                <input type=\"submit\" class=\"btn btn-info\" style=\"margin-top:1em\"\r\n                  [disabled]=\"!listFeeDetails.form.valid \" value=\"List Student Fee Details\">\r\n\r\n              </div>\r\n              <div style=\"text-align: center\" class=\"col-lg-12 col-md-12\">\r\n                    {{ datanotfounfMsg }}\r\n              </div>\r\n            </form>\r\n\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"col-lg-12 col-md-12\"  *ngIf=\"showHeading\">\r\n\r\n          <div style=\"text-align: center;\">\r\n            <h3> {{selectedClass}} Students Fee Details </h3>\r\n            <div *ngIf=showFeeDetailsHeading>\r\n              <h3> Fee Month : {{ selectedMonth  | date: 'MMMM - '}} {{selectedMonthYear}} </h3>\r\n\r\n            </div>\r\n\r\n\r\n          </div>\r\n          <hr>\r\n          <div class=\"row\" style=\"margin-top: 1em; margin-bottom: 0em; padding-bottom: 1.5em; padding-top: 0em;\">\r\n            <div class=\"col-lg-4\">\r\n              <input class=\"form-control fm-control\" [(ngModel)]=\"searchText\" placeholder=\"Roll Num / Student Name\">\r\n            </div>\r\n\r\n\r\n          </div>\r\n          <div class=\"table-responsive\" style=\"overflow-x: unset;\">\r\n            <table class=\"table table-bordered\">\r\n              <thead class=\"thead-light\">\r\n                <tr>\r\n                  <th>S.No</th>\r\n                  <th>Roll Num</th>\r\n                  <th>Name </th>\r\n                  <th>Section </th>\r\n                  <th>Total </th>\r\n                  <th>Paid </th>\r\n                  <th>Due </th>\r\n                  <th>Due Date</th>\r\n                  <th>Fee Status</th>\r\n\r\n                  <th>Options</th>\r\n\r\n                </tr>\r\n              </thead>\r\n              <tbody>\r\n                <tr *ngFor=\"let item of StdFeeInvoiceData | filter:searchText let index = index\">\r\n\r\n                  <td>{{index + 1}}</td>\r\n                  <td>{{item.roll_num}}</td>\r\n                  <td>{{item.std_name}}</td>\r\n\r\n                  <td>{{item.section_name}}</td>\r\n                  <td style=\"color: brown\"><strong>{{item.total_fee}} </strong></td>\r\n                  <td> {{item.amount_paid}}</td>\r\n                  <td> {{item.amount_due}}</td>\r\n                  <td> {{item.duedate_timestamp * 1000 | date }}</td>\r\n                  <td><strong>\r\n                      <span\r\n                        [style.color]=\"item.fee_status == 'unpaid' ? 'red': (item.fee_status == 'paid' ? 'green' : 'brown')\">\r\n                        {{item.fee_status}}\r\n                      </span>\r\n\r\n\r\n                    </strong></td>\r\n\r\n\r\n                  <td>\r\n\r\n\r\n                    <div ngbDropdown class=\"d-inline-block\">\r\n                      <button class=\"btn btn-primary\" type=\"button\" id=\"dropdownMenuButton1\" ngbDropdownToggle>\r\n                        Actions\r\n                      </button>\r\n                      <div ngbDropdownMenu aria-labelledby=\"dropdownMenuButton1\">\r\n\r\n                        <a class=\"dropdown-item\" style=\"cursor: pointer;\"\r\n                          (click)=\"onClickviewInvoice(feeInvoiceModal,index)\">View\r\n                          Invoice <i class=\"fa fa-address-card\" style=\"padding-left: 1em;\"></i></a>\r\n                        <div *ngIf=\"(item.fee_status != 'paid' && admin_level == 1 )\">\r\n                          <div class=\"dropdown-divider\"></div>\r\n                          <a style=\"cursor: pointer;\" class=\"dropdown-item\"\r\n                            (click)=\"onClickUpdateInvoice(updateInvoiceModal,index)\">Update\r\n                            <i class=\"fa fa-edit\" style=\"padding-left: 1em;\"></i></a>\r\n                        </div>\r\n                        <div *ngIf=\"(item.fee_status != 'paid')\">\r\n                          <div class=\"dropdown-divider\"></div>\r\n                          <a style=\"cursor: pointer;\" class=\"dropdown-item\"\r\n                            (click)=\"onClickUpdateFeePayment(updateFeeStatusModal,index)\">Take\r\n                            Payement <i class=\"fa fa-money\" style=\"padding-left: .5em;\"></i></a>\r\n                        </div>\r\n\r\n                      </div>\r\n                    </div>\r\n\r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n          </div>\r\n\r\n\r\n        </div>\r\n\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n\r\n<!-- *********************************** Modals **************************************** -->\r\n\r\n<!-- ******** Generate Fee Invoice  Modal ************ -->\r\n\r\n\r\n\r\n<ng-template #generateInvoiceModal let-modal>\r\n  <div class=\"modal-header\">\r\n    <div style=\"text-align: center\">\r\n      <h3>Generate Fee Invoice</h3>\r\n    </div>\r\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n  </div>\r\n      <form class=\"form-group\" #addfeeInvoice=\"ngForm\" (ngSubmit)=\"onClickAddClassFeeInvoice(addfeeInvoice)\">\r\n  <div class=\"modal-body\">\r\n\r\n      <label class=\"control-label\"> Class *</label>\r\n      <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedCLassE.valid && pickedCLassE.touched\"><small>Class\r\n          Required</small></span>\r\n      <select class=\"form-control fm-control\" required style=\"margin-top:0em;\" #pickedCLassE [(ngModel)]=\"class_id\"\r\n        (change)=getFeeStructDataByClassId(pickedCLassE.value); name=\"class_id\">\r\n        <option [ngValue]=\"undefined\" disabled>Select Class</option>\r\n        <option *ngFor=\"let item of classdataList\" [value]=\"item.class_id\">{{item.class_name}}</option>\r\n      </select>\r\n\r\n      <label class=\"control-label\"> Fee Invoice Title\r\n      </label>\r\n\r\n      <input type=\"text\" disabled class=\"form-control fm-control\" style=\"margin-top:0em;\" name=\"fee_title\"\r\n        [(ngModel)]=\"fee_title\">\r\n\r\n      <label class=\"control-label\"> Total Class Fee\r\n      </label>\r\n\r\n\r\n      <input type=\"text\" disabled class=\"form-control fm-control\" style=\"margin-top:0em;\" name=\"fee_amount\"\r\n        [(ngModel)]=\"fee_amount\">\r\n\r\n      <label class=\"control-label\">Fee Month *</label>\r\n      <input type=\"month\" required class=\"form-control fm-control\" style=\"margin-top:0em;\" name=\"fee_month\"\r\n        [(ngModel)]=\"fee_month\" #pickeddFeeMonth=\"ngModel\">\r\n      <p class=\"alert alert-danger\" *ngIf=\"!pickeddFeeMonth.valid && pickeddFeeMonth.touched\"\r\n        style=\"margin-top:1em; margin-left:0em;\">\r\n        Fee month is required!\r\n      </p>\r\n\r\n      <label class=\"control-label\">Fee Due Date * </label>\r\n      <input type=\"date\" required class=\"form-control fm-control\" style=\"margin-top:0em;\" name=\"duedate_timestamp\"\r\n        [(ngModel)]=\"duedate_timestamp\" #pickedDueDate=\"ngModel\">\r\n      <p class=\"alert alert-danger\" *ngIf=\"!pickedDueDate.valid && pickedDueDate.touched\"\r\n        style=\"margin-top:1em; margin-left:0em;\">\r\n        Due Date is required!\r\n      </p>\r\n\r\n      <label class=\"control-label\">Invoice Description </label>\r\n      <textarea rows=\"3\" cols=\"30\" class=\"form-control fm-control\" name=\"fee_desc\" [(ngModel)]=\"fee_desc\"> </textarea>\r\n\r\n\r\n\r\n\r\n\r\n  </div>\r\n  <div class=\"modal-footer\">\r\n      <input type=\"submit\" class=\"btn btn-info\" [disabled]=\"!addfeeInvoice.form.valid\" value=\"Create fee Invoice\">\r\n    <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n  </div>\r\n    </form>\r\n</ng-template>\r\n\r\n\r\n\r\n\r\n\r\n<!-- ******** Student Fee invoice Details  Modal ************ -->\r\n\r\n\r\n<ng-template #feeInvoiceModal let-modal>\r\n  <div class=\"modal-header\">\r\n    <div style=\"text-align: center\">\r\n      <h3>Fee Invoice Details</h3>\r\n    </div>\r\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n  </div>\r\n  <div class=\"modal-body\">\r\n    <div class=\"row\" id=\"print-section\">\r\n\r\n      <div class=\"col-lg-12 col-md-12\" style=\"text-align: center\">\r\n        <h3> Invoice For : {{name}}</h3>\r\n        <hr>\r\n      </div>\r\n\r\n      <div class=\"col-lg-4 col-md-4\" style=\"margin-left: 1em; font-size:1rem;\">\r\n\r\n        <p><strong> Roll Num: </strong> {{rollnum}} </p>\r\n        <p><strong> Class :</strong> {{className}}</p>\r\n        <p><strong> Section :</strong> {{section}}</p>\r\n\r\n      </div>\r\n<div class=\"col-lg-3 col-md-3\"> </div>\r\n      <div class=\"col-lg-4 col-md-4\">\r\n        <p><strong> Creation Date : </strong> {{feeCreationDate * 1000 | date}} </p>\r\n        <p> <strong> Due Date : </strong> {{dueDate * 1000 | date}}</p>\r\n        <p> <strong> Fee Month : </strong> {{selectedMonth | date: 'MMMM - '}} {{selectedMonthYear}} </p>\r\n        <p> <strong> Description : </strong> {{feeDesc}} </p>\r\n        <p> <strong> Fee Status : </strong> {{feeStatus}}</p>\r\n\r\n      </div>\r\n\r\n      <div class=\"col-lg-12 col-md-12 \" style=\"margin-top:1em;\">\r\n\r\n        <table class=\"table table-hover\">\r\n\r\n          <thead class=\"thead-light\">\r\n            <tr>\r\n              <th>Title</th>\r\n              <th>Amount</th>\r\n              <th>Description</th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr>\r\n\r\n              <td>{{feeTitle}}</td>\r\n              <td>{{feeAmount}}</td>\r\n               <td> {{ feeDesc == '' ? '-' : feeDesc}}</td>\r\n            </tr>\r\n            <tr>\r\n\r\n              <td>Extra Charges</td>\r\n              <td>{{extraChargesDesc}}</td>\r\n              <td>{{extraChargesAmount}}</td>\r\n            </tr>\r\n            <tr>\r\n\r\n              <td>Discounts</td>\r\n              <td> - </td>\r\n              <td>{{discountAmount}}</td>\r\n            </tr>\r\n\r\n            <tr>\r\n              <td>\r\n\r\n              </td>\r\n              <td>\r\n\r\n              </td>\r\n              <td>\r\n                <h4>Total Amount = {{totalAmount}}</h4>\r\n                <h3>Paid Amount = {{amountPaid}}</h3>\r\n                <h3>Due Amount = {{dueAmount}}</h3>\r\n\r\n              </td>\r\n            </tr>\r\n\r\n          </tbody>\r\n        </table>\r\n\r\n      </div>\r\n\r\n    </div>\r\n\r\n  </div>\r\n  <div class=\"modal-footer\">\r\n    <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n  </div>\r\n</ng-template>\r\n\r\n\r\n<!-- ******** Update invoice Modal ************ -->\r\n\r\n<ng-template #updateInvoiceModal let-modal>\r\n  <div class=\"modal-header\">\r\n    <div style=\"text-align: center\">\r\n      <h3>Update Invoice Details</h3>\r\n    </div>\r\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n  </div>\r\n      <form class=\"form-group\" #updatefeeInvoice=\"ngForm\" (ngSubmit)=\"updateStdFeeInvoice(updatefeeInvoice)\">\r\n  <div class=\"modal-body\">\r\n\r\n\r\n      <input type=\"hidden\" class=\"form-control fm-control\" style=\"margin-top:0em;\" name=\"invoice_id\"\r\n        [(ngModel)]=\"invoice_id\">\r\n      <label class=\"control-label\"> Student Name\r\n      </label>\r\n\r\n      <input type=\"text\" disabled class=\"form-control fm-control\" style=\"margin-top:0em;\" name=\"uStudent_name\"\r\n        [(ngModel)]=\"uStudent_name\">\r\n\r\n      <label class=\"control-label\"> Fee Invoice Title *\r\n      </label>\r\n\r\n      <input type=\"text\" required class=\"form-control fm-control\" style=\"margin-top:0em;\" name=\"ufee_title\"\r\n        [(ngModel)]=\"ufee_title\" #pickedInvoiceTitle=\"ngModel\">\r\n      <p class=\"alert alert-danger\" *ngIf=\"!pickedInvoiceTitle.valid && pickedInvoiceTitle.touched\"\r\n        style=\"margin-top:1em; margin-left:0em;\">\r\n        Invoice title is required\r\n      </p>\r\n\r\n\r\n      <label class=\"control-label\"> Fee Amount *\r\n      </label>\r\n\r\n      <input type=\"number\" required class=\"form-control fm-control\" #pickedStdFeeAmount=\"ngModel\"\r\n        style=\"margin-top:0em;\" name=\"ufee_amount\" [(ngModel)]=\"ufee_amount\">\r\n\r\n      <p class=\"alert alert-danger\" *ngIf=\"!pickedStdFeeAmount.valid && pickedStdFeeAmount.touched\"\r\n        style=\"margin-top:1em; margin-left:0em;\">\r\n        Fee amount is required\r\n      </p>\r\n\r\n      <label class=\"control-label\">Extra Charges</label>\r\n      <input type=\"number\" required class=\"form-control fm-control\" style=\"margin-top:0em;\" name=\"ufee_extra_charges\"\r\n        [(ngModel)]=\"ufee_extra_charges\" #pickedStdextraCharges=\"ngModel\">\r\n      <p class=\"alert alert-danger\" *ngIf=\"!pickedStdextraCharges.valid && pickedStdextraCharges.touched\"\r\n        style=\"margin-top:1em; margin-left:0em;\">\r\n        Extra Charges amount is required\r\n      </p>\r\n\r\n      <label class=\"control-label\">Extra Charges Description</label>\r\n\r\n      <textarea rows=\"1\" cols=\"10\" class=\"form-control fm-control\" name=\"uextra_charges_desc\"\r\n        [(ngModel)]=\"uextra_charges_desc\"> </textarea>\r\n\r\n      <label class=\"control-label\">Fee discount</label>\r\n      <input type=\"number\" required class=\"form-control fm-control\" style=\"margin-top:0em;\" name=\"ufee_discount\"\r\n        [(ngModel)]=\"ufee_discount\" #pickedFeediscount=\"ngModel\">\r\n      <p class=\"alert alert-danger\" *ngIf=\"!pickedFeediscount.valid && pickedFeediscount.touched\"\r\n        style=\"margin-top:1em; margin-left:0em;\">\r\n        Fee discount is required!\r\n      </p>\r\n\r\n      <label class=\"control-label\">Fee Due Date * </label>\r\n      <input type=\"date\" required class=\"form-control fm-control\" style=\"margin-top:0em;\" name=\"uduedate_timestamp\"\r\n        [(ngModel)]=\"uduedate_timestamp\" #upickedDueDate=\"ngModel\">\r\n      <p class=\"alert alert-danger\" *ngIf=\"!upickedDueDate.valid && pickedDueDate.touched\"\r\n        style=\"margin-top:1em; margin-left:0em;\">\r\n        Due Date is required!\r\n      </p>\r\n\r\n\r\n\r\n\r\n\r\n  </div>\r\n  <div class=\"modal-footer\">\r\n      <input type=\"submit\" class=\"btn btn-info\" [disabled]=\"!updatefeeInvoice.form.valid\" value=\"Update fee Invoice\">\r\n    <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n  </div>\r\n    </form>\r\n</ng-template>\r\n\r\n\r\n<!-- ******** Update Fee Payment Status Modal ************ -->\r\n\r\n<ng-template #updateFeeStatusModal let-modal>\r\n  <div class=\"modal-header\">\r\n    <div style=\"text-align: center\">\r\n      <h3>Update Fee Payment Status</h3>\r\n    </div>\r\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n  </div>\r\n     <form class=\"form-group\" #updatefeestatus=\"ngForm\" (ngSubmit)=\"updateStdFeeStatus(updatefeestatus)\">\r\n  <div class=\"modal-body\">\r\n\r\n\r\n      <input type=\"hidden\" class=\"form-control fm-control\" style=\"margin-top:0em;\" name=\"invoice_idU\"\r\n        [(ngModel)]=\"invoice_idU\">\r\n      <label class=\"control-label\"> Student Name\r\n      </label>\r\n\r\n      <input type=\"text\" disabled class=\"form-control fm-control\" style=\"margin-top:0em;\" name=\"Student_nameU\"\r\n        [(ngModel)]=\"Student_nameU\">\r\n\r\n      <label class=\"control-label\"> Total Fee\r\n      </label>\r\n\r\n      <input type=\"text\" disabled class=\"form-control fm-control\" style=\"margin-top:0em;\" name=\"total_feeU\"\r\n        [(ngModel)]=\"total_feeU\">\r\n      <label class=\"control-label\"> Paid Amount\r\n      </label>\r\n\r\n      <input type=\"number\" class=\"form-control fm-control\" #pickedamount style=\"margin-top:0em;\" name=\"amount_paidU\"\r\n        [(ngModel)]=\"amount_paidU\">\r\n\r\n      <p class=\"alert alert-danger\" *ngIf=\"!pickedamount.valid && pickedamount.touched\"\r\n        style=\"margin-top:0em; margin-left:0em;\">\r\n        Paid amount required\r\n      </p>\r\n\r\n      <label class=\"control-label\">Payment Status * </label>\r\n      <select class=\"form-control fm-control\" required style=\"margin-top:0em;\" #pickedpamentstatus\r\n        [(ngModel)]=\"payment_status\" name=\"payment_status\">\r\n        <option [ngValue]=\"undefined\" disabled>Select Payment Status</option>\r\n        <option *ngFor=\"let item of paymentStatusList\" [value]=\"item.paymentStatus_id\">{{item.paymentStatus}}\r\n        </option>\r\n      </select>\r\n      <p class=\"alert alert-danger\" *ngIf=\"!pickedpamentstatus.valid && pickedpamentstatus.touched\"\r\n        style=\"margin-top:1em; margin-left:0em;\">\r\n        Payment Status required!\r\n      </p>\r\n\r\n\r\n\r\n      <label class=\"control-label\">Fee Paid Date * </label>\r\n      <input type=\"date\" required class=\"form-control fm-control\" style=\"margin-top:0em;\" name=\"fPaid_date\"\r\n        [(ngModel)]=\"fPaid_date\" #upickedfPaid_date=\"ngModel\">\r\n      <p class=\"alert alert-danger\" *ngIf=\"!upickedfPaid_date.valid && upickedfPaid_date.touched\"\r\n        style=\"margin-top:1em; margin-left:0em;\">\r\n        Fee Paid Date is required!\r\n      </p>\r\n\r\n\r\n\r\n\r\n\r\n  </div>\r\n  <div class=\"modal-footer\">\r\n\r\n      <input type=\"submit\" class=\"btn btn-info\" [disabled]=\"!updatefeestatus.form.valid\" value=\"Update fee Payment\">\r\n    <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n  </div>\r\n   </form>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./src/app/manage-fee-invoice/manage-fee-invoice.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/manage-fee-invoice/manage-fee-invoice.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/manage-fee-invoice/manage-fee-invoice.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/manage-fee-invoice/manage-fee-invoice.component.ts ***!
  \********************************************************************/
/*! exports provided: ManageFeeInvoiceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageFeeInvoiceComponent", function() { return ManageFeeInvoiceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../classes/manageClass.service */ "./src/app/classes/manageClass.service.ts");
/* harmony import */ var _manage_fee_structure_manage_fee_structure_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../manage-fee-structure/manage-fee-structure.service */ "./src/app/manage-fee-structure/manage-fee-structure.service.ts");
/* harmony import */ var _manage_fee_invoice_manage_fee_invoice_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../manage-fee-invoice/manage-fee-invoice.service */ "./src/app/manage-fee-invoice/manage-fee-invoice.service.ts");
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








var ManageFeeInvoiceComponent = /** @class */ (function () {
    function ManageFeeInvoiceComponent(_router, _classDataService, _manageFeeStructureService, _manageFeeInvoiceService, modalService, _commonService) {
        this._router = _router;
        this._classDataService = _classDataService;
        this._manageFeeStructureService = _manageFeeStructureService;
        this._manageFeeInvoiceService = _manageFeeInvoiceService;
        this.modalService = modalService;
        this._commonService = _commonService;
        /* active session */
        this.running_session = localStorage.getItem('running_session');
        /* pagination Info */
        this.pageSize = 10;
        this.pageNumber = 1;
        this.fee_title = '';
        this.fee_desc = '';
        this.fee_extra_charges = 0;
        this.extra_charges_desc = '';
        this.className = '';
        this.section = '';
        this.name = '';
        this.totalAmount = '';
        this.feeStatus = '';
        this.feeDesc = '';
        this.feeTitle = '';
        this.extraChargesDesc = '';
        this.feeAmount = '';
        // update student invoice params
        this.uStudent_name = '';
        this.ufee_title = '';
        this.uextra_charges_desc = '';
        this.Student_nameU = '';
        this.payment_status = '';
        this.paymentStatusList = [
            {
                paymentStatus_id: 'paid',
                paymentStatus: 'Paid'
            },
            {
                paymentStatus_id: 'pending',
                paymentStatus: 'Pending'
            }
        ];
        this.selectedClass = '';
        this.selectedMonth = '';
        this.selectedMonthYear = '';
        this.datanotfounfMsg = '';
        // notifications
        this.dbRespMsg = '';
        this.feeduedate = '';
        this.showFeeDetailsHeading = false;
        this.showHeading = false;
    }
    ManageFeeInvoiceComponent.prototype.ngOnInit = function () {
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
    ManageFeeInvoiceComponent.prototype.getClassData = function () {
        var _this = this;
        this._classDataService.getClassesF().subscribe(function (result) {
            _this.classdataList = result;
        });
    };
    // ********************************************************** **********/
    // *********************** Get Fee Structureby class id *********************/
    // ******************************************************************* */
    ManageFeeInvoiceComponent.prototype.getFeeStructDataByClassId = function (class_id) {
        var _this = this;
        var feeStructData = null;
        this._manageFeeStructureService
            .getFeeStructByClassIdF(class_id, this.running_session)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this.feeStructData = result.data;
                feeStructData = _this.feeStructData[0];
                _this.fee_title = feeStructData.fee_title;
                _this.fee_amount = feeStructData.fee_amount;
            }
            if (result.status === 0) {
                _this.dbRespMsg = 'No fee structure is defined';
            }
            if (result.status === 403) {
                _this.dbRespMsg = result.msg;
            }
        });
    };
    // ********************************************************** **********/
    // *************** Get Students Fee Invoice details *********************/
    // ******************************************************************* */
    ManageFeeInvoiceComponent.prototype.getStdFeeInvoiceDetails = function (class_id, fee_month) {
        var _this = this;
        this.selectedClassId = class_id;
        this.showFeeDetailsHeading = true;
        this.selectedClass = '';
        this.feeduedate = '';
        this.StdFeeInvoiceData = [];
        var unix_fee_month = new Date(fee_month + '-' + '05').getTime() / 1000;
        this.selectedFeeMonth = fee_month;
        this._manageFeeInvoiceService
            .getStdFeeInvoiceDetailsFun(class_id, unix_fee_month, this.running_session)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this.showHeading = true;
                _this.datanotfounfMsg = '';
                _this.StdFeeInvoiceData = result.data;
                console.log(_this.StdFeeInvoiceData);
                _this.selectedClass = _this.StdFeeInvoiceData[0].class_name;
                _this.feeduedate = _this.StdFeeInvoiceData[0].duedate_timestamp;
            }
            else if (result.status === 0) {
                _this.datanotfounfMsg = 'No data available';
            }
            else {
                _this._commonService.errorToaster(result.msg, 'No Data!');
            }
        });
    };
    // *********************************************************************************************************************** */
    /**********************************************************Add Update Delete Data  Methods************************************** */
    // *********************************************************************************************************************** */
    // ********************************************************** **********/
    // ************** Add new fee invoice for class  ************************/
    // ******************************************************************* */
    ManageFeeInvoiceComponent.prototype.onClickAddClassFeeInvoice = function (submitEvent) {
        var _this = this;
        this.selectedclass_id = Number(submitEvent.value.class_id);
        sweetalert2__WEBPACK_IMPORTED_MODULE_2___default()({
            title: 'Are you sure, want to create bulk invoice ? have you checked invoice details',
            text: 'You wont be able to revert this!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Create Invoice!'
        }).then(function (result) {
            if (result.value) {
                // to store fee month in number
                var feesplit_month_year_1 = submitEvent.value.fee_month.split('-');
                var fee_year = feesplit_month_year_1[0];
                var fee_month_num = feesplit_month_year_1[1];
                var fee_month = submitEvent.value.fee_month + '-' + '05';
                var duedate_timestamp = submitEvent.value.duedate_timestamp;
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
                var unix_fee_month = new Date(fee_month).getTime() / 1000;
                var unix_today_date = new Date(current_date).getTime() / 1000;
                var unix_duedate_timestamp = new Date(duedate_timestamp).getTime() / 1000;
                var invoice_details = {
                    class_id: Number(submitEvent.value.class_id),
                    fee_month: unix_fee_month,
                    creation_timestamp: unix_today_date,
                    duedate_timestamp: unix_duedate_timestamp,
                    fee_desc: submitEvent.value.fee_desc,
                    month: fee_month_num,
                    fee_year: fee_year,
                    fee_amount: _this.fee_amount,
                    fee_title: _this.fee_title,
                    total_fee: _this.fee_amount,
                    running_session: _this.running_session
                };
                // send data to service to call API
                _this._manageFeeInvoiceService
                    .createClassFeeInvoiceF(invoice_details)
                    .subscribe(function (resultresp) {
                    if (resultresp.status === 1) {
                        _this._commonService.successToaster('Invoice has been created', 'Success');
                        _this.closeModal();
                        submitEvent.reset();
                    }
                    else {
                        _this._commonService.errorToaster(resultresp.msg, 'Failed');
                    }
                    _this.getStdFeeInvoiceDetails(_this.selectedclass_id, feesplit_month_year_1[0] + '-' + feesplit_month_year_1[1]);
                    _this.selectedMonth =
                        feesplit_month_year_1[0] + '-' + feesplit_month_year_1[1];
                    _this.selectedMonthYear = feesplit_month_year_1[0];
                });
            }
        });
    };
    // ********************************************************** **********/
    // ************** Update student fee Invoice  ************************/
    // ******************************************************************* */
    ManageFeeInvoiceComponent.prototype.updateStdFeeInvoice = function (updateEvent) {
        var _this = this;
        var eventHandler = updateEvent.value;
        var invoice_id = eventHandler.invoice_id;
        var total_fee = eventHandler.ufee_extra_charges + eventHandler.ufee_amount;
        total_fee = total_fee - eventHandler.ufee_discount;
        var duedate_timestamp = new Date(eventHandler.uduedate_timestamp).getTime() / 1000;
        var update_data = {
            duedate_timestamp: duedate_timestamp,
            extra_charges_desc: eventHandler.uextra_charges_desc,
            fee_amount: eventHandler.ufee_amount,
            fee_discount: eventHandler.ufee_discount,
            fee_extra_charges: eventHandler.ufee_extra_charges,
            fee_title: eventHandler.ufee_title,
            total_fee: total_fee
        };
        if (eventHandler.ufee_discount > eventHandler.ufee_amount) {
            this._commonService.warningToaster('Discount amount must be less than fee amount', 'Failed');
        }
        else {
            this._manageFeeInvoiceService
                .updateFeeInvoiceF(invoice_id, update_data)
                .subscribe(function (result) {
                if (result.status === 1) {
                    _this._commonService.warningToaster('Updated Successfully', 'Success');
                    // call function to load data
                    _this.getStdFeeInvoiceDetails(_this.selectedClassId, _this.selectedFeeMonth);
                    _this.closeModal();
                }
                else {
                    _this._commonService.warningToaster(result.msg, 'Error');
                }
            });
        }
    };
    // ********************************************************** **********/
    // ************** Update student fee Payment status  ********************/
    // ******************************************************************* */
    ManageFeeInvoiceComponent.prototype.updateStdFeeStatus = function (submitEvent) {
        var _this = this;
        var paymentData = submitEvent.value;
        if (this.total_feeU < paymentData.amount_paidU) {
            this._commonService.warningToaster('Paid Amount must be equal to or less than Total fee', 'Failed');
        }
        else if (paymentData.payment_status === 'paid' &&
            this.total_feeU !== paymentData.amount_paidU) {
            this._commonService.warningToaster('If status is Paid, then total amount must be equal to paid amount', 'Failed');
        }
        else {
            var invoice_id = paymentData.invoice_idU;
            var UpdateData = {
                amount_paid: paymentData.amount_paidU,
                fee_status: paymentData.payment_status,
                amount_due: this.total_feeU - paymentData.amount_paidU,
                feepaid_date: new Date(paymentData.fPaid_date).getTime() / 1000
            };
            this._manageFeeInvoiceService
                .updateFeePaymentStatus(invoice_id, UpdateData)
                .subscribe(function (result) {
                if (result.status === 1) {
                    _this._commonService.successToaster('Updated Successfully', 'Success');
                    // call function to load data
                    _this.getStdFeeInvoiceDetails(_this.selectedClassId, _this.selectedFeeMonth);
                    _this.closeModal();
                }
                else {
                    _this._commonService.errorToaster(result.msg, 'Failed');
                }
            });
        }
    };
    // ************************************************************************************************************* */
    /*********************************************General   Methods************************************************ */
    // ************************************************************************************************************* */
    // new modal
    ManageFeeInvoiceComponent.prototype.openNgModal = function (content, size) {
        this.modalService.open(content, { size: size });
    };
    // *************** view invoice details***********************************
    ManageFeeInvoiceComponent.prototype.onClickviewInvoice = function (modal, arrayIndex) {
        var invoiceDetails = null;
        invoiceDetails = this.StdFeeInvoiceData[arrayIndex];
        this.rollnum = invoiceDetails.roll_num;
        this.className = invoiceDetails.class_name;
        this.section = invoiceDetails.section_name;
        this.name = invoiceDetails.std_name;
        this.totalAmount = invoiceDetails.total_fee;
        this.feeStatus = invoiceDetails.fee_status;
        this.feeCreationDate = invoiceDetails.creation_timestamp;
        this.feeDesc = invoiceDetails.fee_desc;
        this.feeTitle = invoiceDetails.fee_title;
        this.extraChargesDesc = invoiceDetails.extra_charges_desc;
        this.feeAmount = invoiceDetails.fee_amount;
        this.discountAmount = invoiceDetails.fee_discount;
        this.extraChargesAmount = invoiceDetails.fee_extra_charges;
        this.amountPaid = invoiceDetails.amount_paid;
        this.dueDate = invoiceDetails.duedate_timestamp;
        this.dueAmount = invoiceDetails.amount_due;
        this.invoicefeeMonth = invoiceDetails.fee_month;
        this.openNgModal(modal, 'lg');
    };
    // ********************** view modal to update fee invoice******************
    ManageFeeInvoiceComponent.prototype.onClickUpdateInvoice = function (modal, arrayIndex) {
        var updateDetails = null;
        updateDetails = this.StdFeeInvoiceData[arrayIndex];
        this.uStudent_name = updateDetails.std_name;
        this.ufee_amount = updateDetails.fee_amount;
        this.ufee_extra_charges = updateDetails.fee_extra_charges;
        this.ufee_title = updateDetails.fee_title;
        this.uextra_charges_desc = updateDetails.extra_charges_desc;
        this.ufee_discount = updateDetails.fee_discount;
        this.invoice_id = updateDetails.invoice_id;
        this.utotal_fee = updateDetails.total_fee;
        // add 0 if date , month less than 10
        var dueDateTimestamp = updateDetails.duedate_timestamp;
        var convertedDueDateTimestamp = new Date(dueDateTimestamp * 1000);
        var month = convertedDueDateTimestamp.getMonth() + 1;
        var day = convertedDueDateTimestamp.getDate();
        var convertedMonth = ('0' + month).substr(-2);
        var convertedDay = ('0' + day).substr(-2);
        this.uduedate_timestamp =
            convertedDueDateTimestamp.getFullYear() +
                '-' +
                convertedMonth +
                '-' +
                convertedDay;
        this.openNgModal(modal, 'md');
    };
    // ********************** view modal to update fee payment status ******************
    ManageFeeInvoiceComponent.prototype.onClickUpdateFeePayment = function (modal, arrayIndex) {
        this.payment_status = '';
        this.fPaid_date = '';
        var updateFeePayment = null;
        updateFeePayment = this.StdFeeInvoiceData[arrayIndex];
        this.invoice_idU = updateFeePayment.invoice_id;
        this.Student_nameU = updateFeePayment.std_name;
        this.total_feeU = updateFeePayment.total_fee;
        this.amount_paidU = updateFeePayment.amount_paid;
        this.openNgModal(modal, 'md');
    };
    // * pagination
    ManageFeeInvoiceComponent.prototype.pageChanged = function (pN) {
        this.pageNumber = pN;
    };
    // redirect to manage fee structure section
    ManageFeeInvoiceComponent.prototype.goToFeeStructureSetting = function () {
        this._router.navigate(['/pages/accounts/manage-fee-structure']);
    };
    // get class id and month to list fee invoice details
    ManageFeeInvoiceComponent.prototype.onSubmitListStdFeeDetails = function (submitEvent) {
        var eventHandler = submitEvent.value;
        var month = eventHandler.feeMonth;
        var YearMonthArray = month.split('-');
        this.selectedMonthYear = YearMonthArray[0];
        this.selectedMonth = month;
        this.getStdFeeInvoiceDetails(eventHandler.classid, eventHandler.feeMonth);
    };
    // open modal
    ManageFeeInvoiceComponent.prototype.openModal = function (modal) {
        this.openNgModal(modal, 'md');
    };
    // close modal
    ManageFeeInvoiceComponent.prototype.closeModal = function () {
        this.modalService.dismissAll();
    };
    ManageFeeInvoiceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-manage-fee-invoice',
            template: __webpack_require__(/*! ./manage-fee-invoice.component.html */ "./src/app/manage-fee-invoice/manage-fee-invoice.component.html"),
            styles: [__webpack_require__(/*! ./manage-fee-invoice.component.scss */ "./src/app/manage-fee-invoice/manage-fee-invoice.component.scss")],
            providers: [
                _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_4__["ClassDataService"],
                _manage_fee_structure_manage_fee_structure_service__WEBPACK_IMPORTED_MODULE_5__["ManageFeeStructureService"],
                _manage_fee_invoice_manage_fee_invoice_service__WEBPACK_IMPORTED_MODULE_6__["ManageFeeInvoiceService"],
                _shared_services_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"]
            ]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_4__["ClassDataService"],
            _manage_fee_structure_manage_fee_structure_service__WEBPACK_IMPORTED_MODULE_5__["ManageFeeStructureService"],
            _manage_fee_invoice_manage_fee_invoice_service__WEBPACK_IMPORTED_MODULE_6__["ManageFeeInvoiceService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"],
            _shared_services_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"]])
    ], ManageFeeInvoiceComponent);
    return ManageFeeInvoiceComponent;
}());



/***/ }),

/***/ "./src/app/manage-fee-invoice/manage-fee-invoice.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/manage-fee-invoice/manage-fee-invoice.module.ts ***!
  \*****************************************************************/
/*! exports provided: ManageFeeInvoiceModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageFeeInvoiceModule", function() { return ManageFeeInvoiceModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _manage_fee_invoice_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./manage-fee-invoice.routing */ "./src/app/manage-fee-invoice/manage-fee-invoice.routing.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-modal */ "./node_modules/ngx-modal/index.js");
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ngx_modal__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");
/* harmony import */ var _search_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./search.pipe */ "./src/app/manage-fee-invoice/search.pipe.ts");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _manage_fee_invoice_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./manage-fee-invoice.component */ "./src/app/manage-fee-invoice/manage-fee-invoice.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










/* components */

var ManageFeeInvoiceModule = /** @class */ (function () {
    function ManageFeeInvoiceModule() {
    }
    ManageFeeInvoiceModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                ng2_search_filter__WEBPACK_IMPORTED_MODULE_5__["Ng2SearchPipeModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
                ngx_modal__WEBPACK_IMPORTED_MODULE_4__["ModalModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_3__["HttpModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_7__["NgxPaginationModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__["NgbModule"],
                _manage_fee_invoice_routing__WEBPACK_IMPORTED_MODULE_2__["routing"]
            ],
            declarations: [_manage_fee_invoice_component__WEBPACK_IMPORTED_MODULE_10__["ManageFeeInvoiceComponent"], _search_pipe__WEBPACK_IMPORTED_MODULE_6__["SearchPipe"]]
        })
    ], ManageFeeInvoiceModule);
    return ManageFeeInvoiceModule;
}());



/***/ }),

/***/ "./src/app/manage-fee-invoice/manage-fee-invoice.routing.ts":
/*!******************************************************************!*\
  !*** ./src/app/manage-fee-invoice/manage-fee-invoice.routing.ts ***!
  \******************************************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _manage_fee_invoice_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./manage-fee-invoice.component */ "./src/app/manage-fee-invoice/manage-fee-invoice.component.ts");


var childRoutes = [
    {
        path: "",
        component: _manage_fee_invoice_component__WEBPACK_IMPORTED_MODULE_1__["ManageFeeInvoiceComponent"]
    }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(childRoutes);


/***/ }),

/***/ "./src/app/manage-fee-invoice/search.pipe.ts":
/*!***************************************************!*\
  !*** ./src/app/manage-fee-invoice/search.pipe.ts ***!
  \***************************************************/
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
        if (!items)
            return [];
        if (!filterdata)
            return items;
        filterdata = filterdata.toString();
        return items.filter(function (searchValue) {
            var rVal = JSON.stringify(searchValue.roll_num).includes(filterdata) ||
                JSON.stringify(searchValue.std_name).includes(filterdata) ||
                JSON.stringify(searchValue.fee_status).includes(filterdata);
            return rVal;
        });
    };
    SearchPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: "filter"
        })
    ], SearchPipe);
    return SearchPipe;
}());



/***/ })

}]);
//# sourceMappingURL=manage-fee-invoice-manage-fee-invoice-module.js.map