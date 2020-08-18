(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["manage-fee-voucher-manage-fee-voucher-module"],{

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

/***/ "./src/app/manage-fee-voucher/manage-fee-voucher.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/manage-fee-voucher/manage-fee-voucher.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<style>\n    .nav-tabs .nav-item .nav-link {\n        padding: 13px 16px;\n    }\n</style>\n\n<div class=\"row\">\n    <div class=\"col-lg-12 grid-margin stretch-card\">\n        <div class=\"card\">\n            <div class=\"card-body\">\n                <div class=\"row\">\n\n                    <div class=\"col-lg-2 col-md-2\">\n                        <form #feeHeads=\"ngForm\">\n                            <div class=\"dropdown\">\n                                <button [disabled]=\"!actionHeads\" (click)=\"myFunction()\" class=\"dropbtn btn btn-primary\">Action</button>\n                                <div id=\"myDropdown\" class=\"dropdown-content\">\n                                    <a *ngFor=\"let feeHead of feeHeadsList\" (click)=\"activateForm()\">{{ feeHead.name }}</a>\n                                </div>\n                            </div>\n                        </form>\n                    </div>\n\n                    <div class=\"col-lg-1 col-md-1\"></div>\n\n\n                    <div class=\"col-lg-2 col-md-2\">\n                        <p style=\"text-align: right; margin-top:5px;\"> Due Date</p>\n                    </div>\n                    <div class=\"col-lg-3 col-md-3\">\n                        <input class=\"form-control fm-control\" type=\"date\" value=\"2020-02-27\" />\n\n                    </div>\n                    <div class=\"col-lg-2 col-md-2\">\n                        <button (click)=\"onClickUpdateDueDate()\" class=\"btn btn-success btn-block\">Update</button>\n                    </div>\n\n                    <div class=\"col-lg-2 col-md-2\">\n                        <p style=\"text-align:left !important;\">\n                            <button class=\"btn btn-primary\"><i class=\"fa fa-print\">&nbsp;&nbsp;Print</i></button>\n                        </p>\n                    </div>\n\n\n                </div>\n                <hr>\n\n                <!-- Month Tabs Row-->\n                <div class=\"row\">\n                    <ul class=\"nav nav-tabs\">\n                        <li *ngFor=\"let month of monthsList\" class=\"nav-item custom_padding\">\n                            <a class=\"nav-link {{ month.status }}\" (click)=\"onClickChangeStudentListView(month.name)\">{{ month.name }}</a>\n                        </li>\n                    </ul>\n                </div>\n\n                <div class=\"row\">\n                    <div class=\"col-lg-2 col-md-2\">\n                        <p><input type=\"text\" placeholder=\"Family No\" required class=\"form-control fm-control\" style=\"margin-top:0em;\"></p>\n                    </div>\n                    <div class=\"col-lg-2 col-md-2\">\n                        <p><input type=\"text\" placeholder=\"Father Name\" required class=\"form-control fm-control\" style=\"margin-top:0em;\"></p>\n                    </div>\n                    <div class=\"col-lg-2 col-md-2\">\n                        <p><input type=\"text\" placeholder=\"Student Name\" required class=\"form-control fm-control\" style=\"margin-top:0em;\"></p>\n                    </div>\n                    <div class=\"col-lg-2 col-md-2\">\n                        <p><input type=\"text\" placeholder=\"Admission Number\" required class=\"form-control fm-control\" style=\"margin-top:0em;\"></p>\n                    </div>\n                    <div class=\"col-lg-2 col-md-2\">\n                        <p><input type=\"year\" placeholder=\"Select Year\" required class=\"form-control fm-control\" style=\"margin-top:0em;\"></p>\n                    </div>\n                    <div class=\"col-lg-2 col-md-2\">\n                        <p>\n                            <select class=\"form-control fm-control\" required style=\"margin-top:0em;\" name=\"fee_status\">\n                              <option>Paid</option>\n                              <option>Unpaid</option>\n                        </select>\n                        </p>\n                    </div>\n                </div>\n\n                <div class=\"col-lg-12 col-md-12 \">\n                    <div class=\"table-responsive \">\n                        <table class=\"table table-bordered \">\n                            <thead class=\"thead-light \">\n                                <tr>\n                                    <th>\n                                        <form class=\"form-group\" #updateFee=\"ngForm\">\n                                            <input name=\"allClasses\" [value]=\"classList\" (change)=\"allClassList($event)\" type=\"checkbox\" />\n\n                                        </form>\n\n                                    </th>\n                                    <th>Admission No.</th>\n                                    <th>Student Name</th>\n                                    <th>Class</th>\n                                    <th>Section</th>\n                                    <th>Tuition Fee</th>\n                                    <th>Printing Fund</th>\n                                    <th>Admission Fee</th>\n                                    <th>Registration Fee</th>\n                                    <th>Late Fine</th>\n                                    <th>Payable Before Due Date</th>\n                                    <th>Payable After Due Date</th>\n                                </tr>\n                            </thead>\n                            <tbody>\n                                <tr *ngFor=\"let item of classList\">\n                                    <td>\n                                        <form class=\"form-group\" #updateFee=\"ngForm\">\n                                            <input name=\"classes\" [checked]=\"item.selected\" (change)=\"changeClassListByCategory($event)\" type=\"checkbox\" />\n                                        </form>\n                                    </td>\n                                    <td>{{ item.admissionno }}</td>\n                                    <td>{{ item.studentname }}</td>\n                                    <td>{{ item.class }}</td>\n                                    <td>{{ item.section }}</td>\n                                    <td>{{ item.tuitionfee }}</td>\n                                    <td>{{ item.printingfund }}</td>\n                                    <td>{{ item.admissionfee }}</td>\n                                    <td>{{ item.registrationfee }}</td>\n                                    <td>{{ item.latefine }}</td>\n                                    <td>{{ item.payablebeforeduedate }}</td>\n                                    <td>{{ item.payableafterduedate }}</td>\n                                </tr>\n                            </tbody>\n                        </table>\n\n                    </div>\n\n                </div>\n                <hr>\n                <div class=\"row\">\n                    <div class=\"col-lg-12 col-md-12 \">\n\n                        <form [hidden]=\"!this.showForm\" class=\"form-group \" #addStudentFeeRecord=\"ngForm\">\n\n                            <label class=\"control-label \"> Tuition Fee </label>\n                            <input type=\"text\" required class=\"form-control fm-control \" style=\"margin-top:0em; \" name=\"tuitionFee \">\n                            <br>\n                            <input type=\"submit\" [disabled]=\"!addStudentFeeRecord.form.valid \" class=\"btn btn-success btn-md \" value=\"Update \">\n\n                        </form>\n\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<!-- Load Modal on Page Load -->\n<ng-template #searchStudentFee>\n    <div class=\"modal-header \">\n        <div style=\"text-align: center \">\n            <h3>Search Fee List</h3>\n        </div>\n        <!--\n        <button type=\"button \" class=\"close \" aria-label=\"Close \"> \n        <span aria-hidden=\"true \">&times;</span>\n        </button>\n        -->\n    </div>\n    <form #searchClassFee=\"ngForm\" (ngSubmit)=\"onClickSearchClassFee(searchClassFee)\" class=\"form-group \">\n        <div class=\"modal-body \">\n\n            <p *ngIf=\"!selectClass.valid && selectClass.touched \" class=\"alert alert-danger \" style=\"margin-top:1em; margin-left:0em; \">\n                Class is required!\n            </p>\n\n            <label class=\"control-label \"> Class * </label>\n            <select required [(ngModel)]=\"selectClassText\" #selectClass=\"ngModel\" class=\"form-control fm-control \" style=\"margin-top:0em; \" name=\"selectClass \">\n                <option [ngValue]=\"undefined \" disabled>Select Class</option>\n                <option [ngValue]=\"1\">PREP</option>\n                <option [ngValue]=\"2\">NURSERY</option>\n                <option [ngValue]=\"3\">ONE</option>\n                <option [ngValue]=\"4\">TWO</option>\n                <option [ngValue]=\"5\">THREE</option>\n                <option [ngValue]=\"6\">FOUR</option>\n                <option [ngValue]=\"7\">FIVE</option>\n                <option [ngValue]=\"8\">SIX</option>\n            </select>\n\n            <p *ngIf=\"!selectSection.valid && selectSection.touched \" class=\"alert alert-danger \" style=\"margin-top:1em; margin-left:0em; \">\n                Section is required!\n            </p>\n\n            <label class=\"control-label \"> Section * </label>\n            <select required [(ngModel)]=\"selectSectionText\" #selectSection=\"ngModel\" class=\"form-control fm-control \" style=\"margin-top:0em; \" name=\"selectSection \">\n                <option [ngValue]=\"undefined \" disabled>Select Section</option>\n                <option [ngValue]=\"1 \">SECTION A</option>\n                <option [ngValue]=\"2 \">SECTION B</option>\n                <option [ngValue]=\"3 \">SECTION C</option>\n                <option [ngValue]=\"4 \">SECTION D</option>\n                <option [ngValue]=\"5 \">SECTION E</option>\n                <option [ngValue]=\"6 \">SECTION F</option>\n     </select>\n        </div>\n        <div class=\"modal-footer \">\n            <input type=\"submit\" [disabled]=\"!searchClassFee.form.valid\" class=\"btn btn-info \" value=\"Search \">\n        </div>\n    </form>\n</ng-template>"

/***/ }),

/***/ "./src/app/manage-fee-voucher/manage-fee-voucher.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/manage-fee-voucher/manage-fee-voucher.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/manage-fee-voucher/manage-fee-voucher.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/manage-fee-voucher/manage-fee-voucher.component.ts ***!
  \********************************************************************/
/*! exports provided: ManageFeeVoucherComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageFeeVoucherComponent", function() { return ManageFeeVoucherComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _shared_services_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/services/common.service */ "./src/app/shared/services/common.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ManageFeeVoucherComponent = /** @class */ (function () {
    function ManageFeeVoucherComponent(modalService) {
        this.modalService = modalService;
        this.myDate = new Date();
        this.isClassList = false;
        this.checkAllClassList = false;
        this.classList = [
            {
                selected: false,
                admissionno: '1405',
                studentname: 'Mubeena Fazal',
                class: '7th',
                section: 'B',
                tuitionfee: '900',
                printingfund: '0',
                admissionfee: '0',
                registrationfee: '0',
                latefine: '50',
                payablebeforeduedate: '900',
                payableafterduedate: '950'
            },
            {
                selected: false,
                admissionno: '1406',
                studentname: 'Ahmad Tariq',
                class: '7th',
                section: 'B',
                tuitionfee: '900',
                printingfund: '0',
                admissionfee: '0',
                registrationfee: '0',
                latefine: '50',
                payablebeforeduedate: '900',
                payableafterduedate: '950'
            }
        ];
        //variables
        this.checkFeeText = false;
        this.showForm = false;
        this.showVoucher = false;
        this.showSearch = true;
        this.updateFeeCheckbox = false;
        this.actionHeads = false;
        this.feeHeadsList = [
            {
                id: 1,
                name: 'Tuition Fee',
            },
            {
                id: 2,
                name: 'Transport Fee'
            },
            {
                id: 3,
                name: 'Hostel Fee'
            }
        ];
        this.monthsList = [
            {
                id: 1,
                name: 'March',
                status: '',
            },
            {
                id: 2,
                name: 'April',
                status: '',
            },
            {
                id: 3,
                name: 'May',
                status: '',
            },
            {
                id: 4,
                name: 'June',
                status: '',
            },
            {
                id: 5,
                name: 'July',
                status: '',
            },
            {
                id: 6,
                name: 'August',
                status: '',
            },
            {
                id: 7,
                name: 'September',
                status: '',
            },
            {
                id: 8,
                name: 'October',
                status: '',
            },
            {
                id: 9,
                name: 'November',
                status: '',
            },
            {
                id: 10,
                name: 'December',
                status: '',
            },
            {
                id: 11,
                name: 'January',
                status: '',
            },
            {
                id: 12,
                name: 'February',
                status: 'active',
            }
        ];
    }
    ManageFeeVoucherComponent.prototype.changeClassListByCategory = function (event) {
        if (event.target.name == 'classes') {
            this.isClassList = true;
            this.actionHeads = true;
        }
        if (event.target.checked == false) {
            this.actionHeads = false;
        }
        if (this.isClassList && this.checkAllClassList) {
            event.target.checked = true;
        }
    };
    ManageFeeVoucherComponent.prototype.allClassList = function (event) {
        var checked = event.target.checked;
        this.classList.forEach(function (item) { return item.selected = checked; });
        this.actionHeads = true;
        if (event.target.checked == false) {
            this.actionHeads = false;
        }
    };
    ManageFeeVoucherComponent.prototype.ngOnInit = function () {
        this.openModal2();
    };
    // new modal
    ManageFeeVoucherComponent.prototype.openNgModal = function (content, size) {
        this.modalService.open(content, { size: size, backdrop: 'static' });
    };
    // open modal
    ManageFeeVoucherComponent.prototype.openModal = function (modal) {
        this.openNgModal(modal, 'md');
    };
    ManageFeeVoucherComponent.prototype.openModal2 = function () {
        this.openNgModal(this.searchStudentFee, 'md');
    };
    // close modal
    ManageFeeVoucherComponent.prototype.closeModal = function () {
        this.modalService.dismissAll();
    };
    ManageFeeVoucherComponent.prototype.onClickSearchFee = function () {
        this.showVoucher = true;
        this.showSearch = false;
    };
    ManageFeeVoucherComponent.prototype.activateForm = function () {
        this.showForm = true;
    };
    ManageFeeVoucherComponent.prototype.onClickSearchClassFee = function (submitEvent) {
        this.closeModal();
    };
    ManageFeeVoucherComponent.prototype.onClickUpdateDueDate = function () {
        alert("i will update due date");
    };
    ManageFeeVoucherComponent.prototype.myFunction = function () {
        document.getElementById("myDropdown").classList.toggle("show");
    };
    /*
     
    public selectNav(monthList) {
      this.monthsList.forEach((monthList) => {
        monthList.status = '';
      });
      monthList.status = 'active';
    }
    
    */
    ManageFeeVoucherComponent.prototype.onClickChangeStudentListView = function (monthName) {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('searchStudentFee'),
        __metadata("design:type", Object)
    ], ManageFeeVoucherComponent.prototype, "searchStudentFee", void 0);
    ManageFeeVoucherComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-manage-fee-voucher',
            template: __webpack_require__(/*! ./manage-fee-voucher.component.html */ "./src/app/manage-fee-voucher/manage-fee-voucher.component.html"),
            styles: [__webpack_require__(/*! ./manage-fee-voucher.component.scss */ "./src/app/manage-fee-voucher/manage-fee-voucher.component.scss")],
            providers: [_shared_services_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"]]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"]])
    ], ManageFeeVoucherComponent);
    return ManageFeeVoucherComponent;
}());



/***/ }),

/***/ "./src/app/manage-fee-voucher/manage-fee-voucher.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/manage-fee-voucher/manage-fee-voucher.module.ts ***!
  \*****************************************************************/
/*! exports provided: ManageFeeVoucherModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageFeeVoucherModule", function() { return ManageFeeVoucherModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _manage_fee_voucher_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./manage-fee-voucher.routing */ "./src/app/manage-fee-voucher/manage-fee-voucher.routing.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-modal */ "./node_modules/ngx-modal/index.js");
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ngx_modal__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _manage_fee_voucher_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./manage-fee-voucher.component */ "./src/app/manage-fee-voucher/manage-fee-voucher.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







/* components */

var ManageFeeVoucherModule = /** @class */ (function () {
    function ManageFeeVoucherModule() {
    }
    ManageFeeVoucherModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                ng2_search_filter__WEBPACK_IMPORTED_MODULE_5__["Ng2SearchPipeModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                ngx_modal__WEBPACK_IMPORTED_MODULE_4__["ModalModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_3__["HttpModule"],
                _manage_fee_voucher_routing__WEBPACK_IMPORTED_MODULE_2__["routing"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]
            ],
            declarations: [_manage_fee_voucher_component__WEBPACK_IMPORTED_MODULE_7__["ManageFeeVoucherComponent"]]
        })
    ], ManageFeeVoucherModule);
    return ManageFeeVoucherModule;
}());



/***/ }),

/***/ "./src/app/manage-fee-voucher/manage-fee-voucher.routing.ts":
/*!******************************************************************!*\
  !*** ./src/app/manage-fee-voucher/manage-fee-voucher.routing.ts ***!
  \******************************************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _manage_fee_voucher_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./manage-fee-voucher.component */ "./src/app/manage-fee-voucher/manage-fee-voucher.component.ts");


var childRoutes = [
    {
        path: '',
        component: _manage_fee_voucher_component__WEBPACK_IMPORTED_MODULE_1__["ManageFeeVoucherComponent"]
    }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(childRoutes);


/***/ })

}]);
//# sourceMappingURL=manage-fee-voucher-manage-fee-voucher-module.js.map