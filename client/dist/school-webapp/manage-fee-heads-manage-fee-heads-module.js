(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["manage-fee-heads-manage-fee-heads-module"],{

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

/***/ "./src/app/manage-fee-heads/manage-fee-heads.component.html":
/*!******************************************************************!*\
  !*** ./src/app/manage-fee-heads/manage-fee-heads.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-lg-12 grid-margin stretch-card\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-lg-7\">\r\n                        <h4 class=\"card-title\">Manage Fee Heads</h4>\r\n                    </div>\r\n                    <div class=\"col-lg-3\">\r\n                        <button _ngcontent-c2=\"\" (click)=\"openNgModal(addFeeHeadModel, 'md')\" class=\" btn btn-success btn-block \">Add Fee Heads <i  class=\"mdi mdi-plus \"></i></button>\r\n                    </div>\r\n                    <div class=\"col-lg-2 col-md-2 \">\r\n                        <p style=\"text-align:left !important;\">\r\n                            <button class=\"btn btn-primary\"><i class=\"fa fa-print\">&nbsp;&nbsp;Print</i></button>\r\n                        </p>\r\n                    </div>\r\n                </div>\r\n\r\n\r\n                <div class=\"col-lg-12 col-md-12 \" style=\"text-align:center; \">\r\n                    <span style=\"color:red; margin-left: 1em; \"></span>\r\n                </div>\r\n\r\n                <div class=\"col-lg-12 col-md-12 \">\r\n                    <h5>Fee Heads List</h5>\r\n                    <div class=\"table-responsive \">\r\n                        <table class=\"table table-bordered \">\r\n                            <thead class=\"thead-light \">\r\n                                <tr>\r\n                                    <th>Fee Head</th>\r\n                                    <th *ngIf=\"(admin_level == 1)\">Actions</th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <!--\r\n                                <tr *ngFor=\"let item of feedHeadsData | paginate: { id: 'pager', itemsPerPage: pageSize, currentPage: pageNumber}; let index = index\">\r\n                                    <td>{{item.head_name}}</td>\r\n                                    <td *ngIf=\"(admin_level == 1)\">\r\n                                        <label class=\"badge badge-info\" (click)=\"openEditFeeHeadsModal(updateFeeHeadModel,item.fee_heads_id , index)\" style=\"cursor: pointer;\">Edit</label>\r\n\r\n                                        <label class=\"badge badge-danger\" (click)=deleteFeeHead(item.fee_heads_id) style=\"cursor: pointer; margin-left: 1em;\">Delete </label>\r\n                                    </td>\r\n                                </tr>\r\n                                -->\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n<!-- *********************************** Modals **************************************** -->\r\n\r\n\r\n<!-- ******** add fee discount ************ -->\r\n\r\n<ng-template #addFeeHeadModel>\r\n    <div class=\"modal-header \">\r\n        <div style=\"text-align: center \">\r\n            <h3>Add Fee Heads</h3>\r\n        </div>\r\n        <button type=\"button\" (click)=\"closeModal()\" class=\"close \" aria-label=\"Close\">\r\n    <span aria-hidden=\"true \">&times;</span>\r\n  </button>\r\n    </div>\r\n    <form class=\"form-group \" #addFeeHead=\"ngForm\" (ngSubmit)=\"onClickAddFeeHead(addFeeHead)\">\r\n        <div class=\"modal-body \">\r\n\r\n            <p *ngIf=\"!feeHeadTitle.valid && feeHeadTitle.touched\" class=\"alert alert-danger \" style=\"margin-top:1em; margin-left:0em; \">\r\n                Fee Head Name is required!\r\n            </p>\r\n\r\n            <label class=\"control-label \"> Fee Head  *</label>\r\n            <input [(ngModel)]=\"feeHeadTitleText\" #feeHeadTitle=\"ngModel\" type=\"text \" required placeholder=\"Fee Head Name \" class=\"form-control fm-control \" style=\"margin-top:0em; \" name=\"feeHeadTitle\">\r\n\r\n        </div>\r\n        <div class=\"modal-footer \">\r\n            <input type=\"submit\" [disabled]=\"!addFeeHead.form.valid\" class=\"btn btn-info \" value=\"Set Fee Head \">\r\n            <button type=\"button\" class=\"btn btn-light \" (click)=\"closeModal() \">Close</button>\r\n        </div>\r\n    </form>\r\n</ng-template>\r\n\r\n<!-- ******** Update Fee Heads ************ -->\r\n\r\n<ng-template #updateFeeHeadModel let-modal>\r\n    <div class=\"modal-header \">\r\n        <div style=\"text-align: center \">\r\n            <h3>Update Fee Head Detail</h3>\r\n        </div>\r\n        <button type=\"button \" class=\"close \" aria-label=\"Close \">\r\n    <span aria-hidden=\"true \">&times;</span>\r\n  </button>\r\n    </div>\r\n    <form class=\"form-group\" #updateFeeHead=\"ngForm\" (ngSubmit)=\"onClickUpdateFeeHeadDetail(updateFeeHead) \">\r\n        <div class=\"modal-body \">\r\n\r\n            <p *ngIf=\"!updateFeeHeadTitle.valid && updateFeeHeadTitle.touched\" class=\"alert alert-danger \" style=\"margin-top:1em; margin-left:0em; \">\r\n                Fee Head Name is required!\r\n            </p>\r\n\r\n            <label class=\"control-label \"> Fee Head </label>\r\n\r\n            <input type=\"hidden\" class=\"form-control fm-control\" name=\"fee_heads_id\" [(ngModel)]=\"fee_heads_id\">\r\n\r\n            <input [(ngModel)]=\"head_name\" #updateFeeHeadTitle=\"ngModel\" type=\"text\" class=\"form-control fm-control\" name=\"head_name\">\r\n\r\n        </div>\r\n        <div class=\"modal-footer \">\r\n            <input type=\"submit\" [disabled]=\"!updateFeeHead.form.valid\" class=\"btn btn-info\" value=\"Update \">\r\n            <button type=\"button\" (click)=\"modal.close( 'Close click')\" class=\"btn btn-light \">Close</button>\r\n        </div>\r\n    </form>\r\n</ng-template>"

/***/ }),

/***/ "./src/app/manage-fee-heads/manage-fee-heads.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/manage-fee-heads/manage-fee-heads.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/manage-fee-heads/manage-fee-heads.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/manage-fee-heads/manage-fee-heads.component.ts ***!
  \****************************************************************/
/*! exports provided: ManageFeeHeadsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageFeeHeadsComponent", function() { return ManageFeeHeadsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _manage_fee_heads_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./manage-fee-heads.service */ "./src/app/manage-fee-heads/manage-fee-heads.service.ts");
/* harmony import */ var _shared_services_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/services/common.service */ "./src/app/shared/services/common.service.ts");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ManageFeeHeadsComponent = /** @class */ (function () {
    function ManageFeeHeadsComponent(_commonService, _manageFeeHeadsService, modalService) {
        this._commonService = _commonService;
        this._manageFeeHeadsService = _manageFeeHeadsService;
        this.modalService = modalService;
        // variable for update fee head
        this.updateFeeHeadTitleText = "Tuition Fee";
    }
    // new modal
    ManageFeeHeadsComponent.prototype.openNgModal = function (content, size) {
        this.modalService.open(content, { size: size });
    };
    // open modal
    ManageFeeHeadsComponent.prototype.openModal = function (modal) {
        this.openNgModal(modal, 'md');
    };
    // close modal
    ManageFeeHeadsComponent.prototype.closeModal = function () {
        this.modalService.dismissAll();
    };
    // this function auto called when component loads
    ManageFeeHeadsComponent.prototype.ngOnInit = function () {
        // get admin level
        this.admin_level = localStorage.getItem('admin_level');
        this.getAllFeeHeadsData();
        //this.getFeeStructInfo();
    };
    ManageFeeHeadsComponent.prototype.onClickAddFeeHead = function (submitEvent) {
        var _this = this;
        //alert(submitEvent.value.feeHeadTitle);
        var data = submitEvent.value;
        var formdata = {
            head_name: data.feeHeadTitle,
        };
        this._manageFeeHeadsService.addNewFeeHead(formdata).subscribe(function (result) {
            if (result.status === 1) {
                _this._commonService.successToaster('Added Successfully', 'Success!');
                submitEvent.reset(); // reset form after submission
                _this.getAllFeeHeadsData();
                _this.closeModal();
            }
            else {
                _this._commonService.successToaster(result.msg, 'Failed!');
            }
        });
    };
    // ********************************************************** **********/
    // *********************** Get all Sub Classes data ************************ */
    // ******************************************************************* */
    ManageFeeHeadsComponent.prototype.openEditFeeHeadsModal = function (modal, id, index) {
        // call method to get single class data for updating
        this.getSingleRowData(index);
        this.openNgModal(modal, 'md');
    };
    // ********************************************************** **********/
    // *********************** Get all Sub Classes data ************************ */
    // ******************************************************************* */
    ManageFeeHeadsComponent.prototype.getAllFeeHeadsData = function () {
        var _this = this;
        this._manageFeeHeadsService.getFeeHeads().subscribe(function (result) {
            _this.feedHeadsData = result;
        });
    };
    ManageFeeHeadsComponent.prototype.getSingleRowData = function (index) {
        var singleRow = null;
        singleRow = this.feedHeadsData[index];
        this.fee_heads_id = singleRow.fee_heads_id;
        this.head_name = singleRow.head_name;
    };
    ManageFeeHeadsComponent.prototype.onClickDeleteHeadTitle = function (headID) {
        var confrm = confirm("Are you sure want to delete?");
        if (confrm) {
            alert('Deleted ' + headID);
        }
    };
    // *************************************************************** */
    // ******************* Update Record  ******************/
    // *************************************************************** */
    ManageFeeHeadsComponent.prototype.onClickUpdateFeeHeadDetail = function (submitEvent) {
        var _this = this;
        var data = submitEvent.value;
        var id = data.fee_heads_id;
        var formData = {
            head_name: data.head_name
        };
        this._manageFeeHeadsService
            .updateFeeHeads(formData, id)
            .subscribe(function (result) {
            if (result.status === 1) {
                submitEvent.reset();
                _this._commonService.successToaster('Updated Successfully', 'Success!');
                // load data from db after update
                _this.getAllFeeHeadsData();
                _this.closeModal();
            }
            else {
                _this._commonService.errorToaster(result.msg, 'Failed!');
            }
        });
    };
    // **************************************************************** */
    // ******************* Delete Fee head  ******************/
    // ********************************************************** ******/
    ManageFeeHeadsComponent.prototype.deleteFeeHead = function (id) {
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
                _this._manageFeeHeadsService
                    .deletesingleFeeHead(deleteStatus, id) // delete class service calling
                    .subscribe(function (resdata) { });
                // show deleted notification
                _this.getAllFeeHeadsData();
                _this._commonService.successToaster('Deleted Successfully', 'Success!');
                _this.closeModal();
            }
        });
    };
    ManageFeeHeadsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-manage-fee-heads',
            template: __webpack_require__(/*! ./manage-fee-heads.component.html */ "./src/app/manage-fee-heads/manage-fee-heads.component.html"),
            styles: [__webpack_require__(/*! ./manage-fee-heads.component.scss */ "./src/app/manage-fee-heads/manage-fee-heads.component.scss")],
            providers: [_manage_fee_heads_service__WEBPACK_IMPORTED_MODULE_2__["ManageFeeHeadsService"], _shared_services_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"]]
        }),
        __metadata("design:paramtypes", [_shared_services_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            _manage_fee_heads_service__WEBPACK_IMPORTED_MODULE_2__["ManageFeeHeadsService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"]])
    ], ManageFeeHeadsComponent);
    return ManageFeeHeadsComponent;
}());



/***/ }),

/***/ "./src/app/manage-fee-heads/manage-fee-heads.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/manage-fee-heads/manage-fee-heads.module.ts ***!
  \*************************************************************/
/*! exports provided: ManageFeeHeadsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageFeeHeadsModule", function() { return ManageFeeHeadsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _manage_fee_heads_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./manage-fee-heads.routing */ "./src/app/manage-fee-heads/manage-fee-heads.routing.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng2-select */ "./node_modules/ng2-select/index.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ng2_select__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-modal */ "./node_modules/ngx-modal/index.js");
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ngx_modal__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");
/* harmony import */ var ngx_print__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-print */ "./node_modules/ngx-print/fesm5/ngx-print.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _manage_fee_heads_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./manage-fee-heads.component */ "./src/app/manage-fee-heads/manage-fee-heads.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









//import { SearchPipe } from "./search.pipe";


/* components */

var ManageFeeHeadsModule = /** @class */ (function () {
    function ManageFeeHeadsModule() {
    }
    ManageFeeHeadsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__["NgbModule"],
                ng2_search_filter__WEBPACK_IMPORTED_MODULE_8__["Ng2SearchPipeModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_4__["NgxPaginationModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ReactiveFormsModule"],
                ngx_print__WEBPACK_IMPORTED_MODULE_9__["NgxPrintModule"],
                ng2_select__WEBPACK_IMPORTED_MODULE_5__["SelectModule"],
                ngx_modal__WEBPACK_IMPORTED_MODULE_6__["ModalModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_3__["HttpModule"],
                _manage_fee_heads_routing__WEBPACK_IMPORTED_MODULE_2__["routing"]
            ],
            declarations: [_manage_fee_heads_component__WEBPACK_IMPORTED_MODULE_11__["ManageFeeHeadsComponent"]]
        })
    ], ManageFeeHeadsModule);
    return ManageFeeHeadsModule;
}());



/***/ }),

/***/ "./src/app/manage-fee-heads/manage-fee-heads.routing.ts":
/*!**************************************************************!*\
  !*** ./src/app/manage-fee-heads/manage-fee-heads.routing.ts ***!
  \**************************************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _manage_fee_heads_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./manage-fee-heads.component */ "./src/app/manage-fee-heads/manage-fee-heads.component.ts");


var childRoutes = [
    {
        path: '',
        component: _manage_fee_heads_component__WEBPACK_IMPORTED_MODULE_1__["ManageFeeHeadsComponent"]
    }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(childRoutes);


/***/ })

}]);
//# sourceMappingURL=manage-fee-heads-manage-fee-heads-module.js.map