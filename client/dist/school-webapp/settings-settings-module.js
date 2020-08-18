(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["settings-settings-module"],{

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

/***/ "./src/app/settings/settings.component.html":
/*!**************************************************!*\
  !*** ./src/app/settings/settings.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-md-12 grid-margin stretch-card\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-lg-9 col-md-9\">\r\n                        <h4 class=\"card-title\">Settings</h4>\r\n                    </div>\r\n                    <div class=\"col-lg-3\" style=\"padding-bottom: 1.5em;\">\r\n                        <button _ngcontent-c2=\"\" (click)=\"openNgModal(addNewSession , 'md')\" class=\"btn btn-success btn-block\">Add New Session<i _ngcontent-c2=\"\" class=\"mdi mdi-plus\"></i></button>\r\n                    </div>\r\n                </div>\r\n\r\n                <ngb-tabset class=\"tab-solid tab-solid-primary\">\r\n                    <ngb-tab>\r\n                        <ng-template ngbTabTitle>\r\n                            List Session Details\r\n                        </ng-template>\r\n                        <ng-template ngbTabContent>\r\n                            <div class=\"table-responsive\">\r\n                                <div class=\"col-md-12 form-group\" style=\"text-align: center\">\r\n\t\t\t\t\t\t\t\t\t<span><h3>*Note </h3> </span>\r\n                                    <span>\r\n\t\t\t\t\t\t\t\t\t\t<h4> \r\n\t\t\t\t\t\t\t\t\t\t\tAll new Student will be Registered in Active Session : <strong style=\"color: green;\">{{activeSession}} </strong> \r\n\t\t\t\t\t\t\t\t\t\t</h4>\r\n\t\t\t\t\t\t\t\t\t\t<small style=\"color: brown\"></small>\r\n\t\t\t\t\t\t\t\t\t</span>\r\n                                </div>\r\n                                <table class=\"table table-bordered table-hover\">\r\n                                    <thead class=\"thead-light\">\r\n                                        <tr>\r\n                                            <th># </th>\r\n                                            <th> Session </th>\r\n                                            <th> Start Date </th>\r\n                                            <th> End Date </th>\r\n                                            <th>Status </th>\r\n                                            <th *ngIf=\"(admin_level == 1)\">Actions</th>\r\n                                            <th> Edit </th>\r\n                                        </tr>\r\n                                    </thead>\r\n                                    <tbody>\r\n                                        <tr *ngFor=\"let item of sessionData | paginate: { id: 'pager', itemsPerPage: pageSize, currentPage: pageNumber};let index = index\">\r\n                                            <td>{{index + 1}}</td>\r\n                                            <td [style.color]=\"item.status == 0 ? 'black' : 'green'\">{{item.session_name}}</td>\r\n                                            <td> {{ item.start_date * 1000 | date}} </td>\r\n                                            <td> {{ item.end_date * 1000 | date }}</td>\r\n\r\n                                            <td [style.color]=\"item.status == 0 ? 'brown' : 'green'\">\r\n                                                {{ item.status == '1' ? 'Active' : 'Inactive'}}\r\n                                            </td>\r\n\r\n                                            <td *ngIf=\"(admin_level == 1)\">\r\n                                                <span *ngIf=\"(item.status == 0)\" class=\"badge badge-primary\" (click)=setSessionActive(item.session_id) style=\"cursor: pointer;\">Set Active</span>\r\n                                                <span *ngIf=\"(item.status == 1)\" style=\"color: green\"><strong>Currently Running Session</strong></span>\r\n                                            </td>\r\n                                            <td>\r\n                                                <label class=\"badge badge-info\" (click)=\"openUpdateSessionModal(upd_SessionModal,index)\" style=\"cursor: pointer;\">Edit</label>\r\n                                            </td>\r\n                                        </tr>\r\n                                    </tbody>\r\n                                </table>\r\n                            </div>\r\n                        </ng-template>\r\n                    </ngb-tab>\r\n\r\n                    <ngb-tab>\r\n                        <ng-template ngbTabTitle>\r\n                            School Info\r\n                        </ng-template>\r\n                        <ng-template ngbTabContent>\r\n                            <div class=\"row\">\r\n                                <div class=\"col-lg-12 col-md-12 \" style=\"margin-bottom: -2em;\">\r\n                                    <form class=\"form-group\" #schoolInfo=\"ngForm\" (ngSubmit)=\"schoolInfoUpdate(schoolInfo)\">\r\n                                        <label class=\"control-label\" style=\"margin-top:.5em;\">\r\n\t\t\t\t\t\t\t\t\t\t\tSchool Name * <span style=\"color:red;\" *ngIf=\"!pickedSchhol.valid && pickedSchhol.touched\"><small> School Name Required</small> </span>\r\n\t\t\t\t\t\t\t\t\t\t</label>\r\n                                        <input type=\"text\" required style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"school_name\" placeholder=\"name\" [(ngModel)]=\"school_name\" #pickedSchhol=\"ngModel\">\r\n                                        <label class=\"control-label\" style=\"margin-top:.5em;\">\r\n\t\t\t\t\t\t\t\t\t\t\tSchool Phone Number * <span style=\"color:red;\" *ngIf=\"!pickedphon.valid && pickedphon.touched\"><small>Phone Number Required</small> </span></label>\r\n                                        <input type=\"number\" required style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"school_phone\" placeholder=\"phone number\" [(ngModel)]=\"school_phone\" #pickedphon=\"ngModel\">\r\n                                        <label class=\"control-label\" style=\"margin-top:.5em;\">\r\n\t\t\t\t\t\t\t\t\t\t\tSchool Address * <span style=\"color:red;\" *ngIf=\"!pickedaddress.valid && pickedaddress.touched\"><small>School Name Required</small> </span>\r\n\t\t\t\t\t\t\t\t\t\t</label>\r\n                                        <input type=\"text\" required style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"school_address\" placeholder=\"Address\" [(ngModel)]=\"school_address\" #pickedaddress=\"ngModel\">\r\n                                        <div style=\"margin-top:1em ; text-align:right\">\r\n                                            <input type=\"submit\" class=\"btn btn-info\" style=\"margin-top:0 em\" [disabled]=\"!schoolInfo.form.valid \" value=\"Update\">\r\n                                        </div>\r\n                                    </form>\r\n                                </div>\r\n                            </div>\r\n                        </ng-template>\r\n                    </ngb-tab>\r\n\t\t\t\t\t<ngb-tab>\r\n                        <ng-template ngbTabTitle>\r\n                            Promotional Message\r\n                        </ng-template>\r\n                        <ng-template ngbTabContent>\r\n\t\t\t\t\t\t\t   <div class=\"table-responsive\">\r\n                                <div class=\"col-md-12 form-group\" style=\"text-align: center\">  <span>\r\n\t\t\t\t\t\t\t\t\t\t<h4> \r\n\t\t\t\t\t\t\t\t\t\t\tPromotional Messages\r\n\t\t\t\t\t\t\t\t\t\t</h4>\r\n\t\t\t\t\t\t\t\t\t\t<small style=\"color: brown\"></small></span>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<!--\r\n                                <table class=\"table table-bordered table-hover\">\r\n                                    <thead class=\"thead-light\">\r\n                                        <tr>\r\n                                            <th># </th>\r\n                                            <th> Department </th>\r\n                                            <th> message </th>\r\n                                            <th> Start Date </th>\r\n                                            <th> End Date </th>\r\n                                            <th>Status </th>\r\n                                            <th> Edit </th>\r\n                                        </tr>\r\n                                    </thead>\r\n                                    <tbody>\r\n                                        <tr *ngFor=\"let item of promotionalData | paginate: { id: 'pager', itemsPerPage: pageSize, currentPage: pageNumber};let index = index\">\r\n                                            <td>{{index + 1}}</td>\r\n                                            <td [style.color]=\"item.status == 0 ? 'black' : 'green'\">{{item.department}}</td>\r\n                                            <td [style.color]=\"item.status == 0 ? 'black' : 'green'\">{{item.message}}</td>\r\n                                            <td> {{ item.start_date * 1000 | date}} </td>\r\n                                            <td> {{ item.end_date * 1000 | date }}</td>\r\n                                            <td [style.color]=\"item.status == 0 ? 'brown' : 'green'\">\r\n                                                {{ item.status == '1' ? 'Active' : 'Inactive'}}\r\n                                            </td>\r\n                                            <td>\r\n                                                <label class=\"badge badge-info\" (click)=\"openUpdateSessionModal(upd_SessionModal,index)\" style=\"cursor: pointer;\">Edit</label>\r\n                                            </td>\r\n                                        </tr>\r\n                                    </tbody>\r\n                                </table>-->\r\n                            </div>\t\r\n\t\t\t\t\t\t\t  <div class=\"row\">\r\n\t\t\t\t\t\t\t\t<div class=\"col-lg-12 col-md-12 \">\r\n\t\t\t\t\t\t\t\t\t<form class=\"form-group\" #updatePromotionalMessag=\"ngForm\" (ngSubmit)=\"onSubmitUpdatePromotionalMessage(updatePromotionalMessag)\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12 form-group\">\r\n\t\t\t\t\t\t\t\t\t\t\t<label class=\"control-label\" style=\"margin-top:0em;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\tMessage * <span style=\"color:red;\" *ngIf=\"!pickedUname.valid && pickedUname.touched\"><small> Required</small> </span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\t\t <textarea rows=\"4\" cols=\"50\" required class=\"form-control fm-control\" name=\"u_promotional_message\" [(ngModel)]=\"u_promotional_message\" #pickedUname=\"ngModel\"> </textarea>\r\n  \r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12 form-group modal_button\" style=\"text-align:right;\">\r\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"submit\" class=\"btn btn-info\" style=\"margin-top:0 em\" [disabled]=\"!updatePromotionalMessag.form.valid \" value=\"Update Promotional Message\">\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</form>\r\n\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t</ng-template>\r\n                    </ngb-tab>\r\n                </ngb-tabset>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<!-- *********************************** Modals **************************************** -->\r\n\r\n<!-- ******** Add Session ************ -->\r\n\r\n<ng-template #addNewSession let-modal>\r\n    <div class=\"modal-header\">\r\n        <div style=\"text-align: center; \">\r\n            <h3>Add New Session</h3>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-12 col-md-12 \">\r\n\r\n\r\n                <form class=\"form-group\" #addsession=\"ngForm\" (ngSubmit)=\"onSubmitAddSession(addsession)\">\r\n                    <div class=\"col-md-12 form-group\">\r\n                        <label class=\"control-label\" style=\"margin-top:0em;\">\r\n\t\t\t\t\t\t\tSession Name * <span style=\"color:red;\" *ngIf=\"!pickedUname.valid && pickedUname.touched\"><small> Session Name Required</small> </span>\r\n\t\t\t\t\t\t\t</label>\r\n                        <input type=\"text\" required style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"session_name\" placeholder=\"2018-2019\" [(ngModel)]=\"session_name\" #pickedUname=\"ngModel\">\r\n                    </div>\r\n                    <div class=\"col-md-12 form-group\">\r\n                        <label class=\"control-label\" style=\"margin-top:0em;\">\r\n\t\t\t\t\t\t\tStart Date * <span style=\"color:red;\" *ngIf=\"!pickedSDate.valid && pickedSDate.touched\"><small> Required</small> </span>\r\n\t\t\t\t\t\t</label>\r\n                        <input type=\"date\" required style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"s_date\" [(ngModel)]=\"s_date\" #pickedSDate=\"ngModel\">\r\n                    </div>\r\n                    <div class=\"col-md-12 form-group\">\r\n                        <label class=\"control-label\" style=\"margin-top:0em;\">\r\n\t\t\t\t\t\t\tEnd Date * <span style=\"color:red;\"  *ngIf=\"!pickedEDate.valid && pickedEDate.touched\"><small>Required</small> </span>\r\n\t\t\t\t\t\t</label>\r\n                        <input type=\"date\" required style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"e_date\" [(ngModel)]=\"e_date\" #pickedEDate=\"ngModel\">\r\n                    </div>\r\n                    <div class=\"col-md-12 form-group modal_button\" style=\"text-align:right;\">\r\n                        <input type=\"submit\" class=\"btn btn-info\" style=\"margin-top:0 em\" [disabled]=\"!addsession.form.valid \" value=\"Add New Session\">\r\n                    </div>\r\n                </form>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button class=\"btn btn-light\" (click)=\"modal.close()\">close</button>\r\n    </div>\r\n</ng-template>\r\n\r\n\r\n<!-- ******** Update Session ************ -->\r\n<ng-template #upd_SessionModal let-modal>\r\n    <div class=\"modal-header\">\r\n        <div style=\"text-align: center; \">\r\n            <h3>Update Session</h3>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-12 col-md-12 \">\r\n\r\n\r\n                <form class=\"form-group\" #upsession=\"ngForm\" (ngSubmit)=\"onSubmitUpdateSession(upsession)\">\r\n                    <div class=\"col-md-12 form-group\">\r\n                        <label class=\"control-label\" style=\"margin-top:0em;\">Session Name </label>\r\n                        <input type=\"text\"  style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"session_name\" [(ngModel)]=\"u_session_name\">\r\n                    </div>\r\n                    <div class=\"col-md-12 form-group\">\r\n                        <label class=\"control-label\" style=\"margin-top:0em;\">\r\n\t\t\t\t\t\t\tStart Date * <span style=\"color:red;\" *ngIf=\"!pickedUSDate.valid && pickedUSDate.touched\"><small>Required</small> </span>\r\n\t\t\t\t\t\t</label>\r\n                        <input type=\"date\" required style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"u_s_date\" [(ngModel)]=\"u_s_date\" #pickedUSDate=\"ngModel\">\r\n                    </div>\r\n                    <div class=\"col-md-12 form-group\">\r\n                        <label class=\"control-label\" style=\"margin-top:0em;\">\r\n\t\t\t\t\t\t\tEnd Date * <span style=\"color:red;\" *ngIf=\"!pickedUEDate.valid && pickedUEDate.touched\"><small>Required</small> </span>\r\n\t\t\t\t\t\t</label>\r\n                        <input type=\"date\" required style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"u_e_date\" [(ngModel)]=\"u_e_date\" #pickedUEDate=\"ngModel\">\r\n                        <input type=\"hidden\" name=\"sess_id\" [(ngModel)]=\"sess_id\">\r\n                    </div>\r\n                    <div class=\"col-md-12 form-group modal_button\" style=\"text-align:right;\">\r\n                        <input type=\"submit\" class=\"btn btn-info\" style=\"margin-top:0 em\" [disabled]=\"!upsession.form.valid \" value=\"Update Session\">\r\n                    </div>\r\n                </form>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button class=\"btn btn-light\" (click)=\"modal.close()\">close</button>\r\n    </div>\r\n</ng-template>"

/***/ }),

/***/ "./src/app/settings/settings.component.scss":
/*!**************************************************!*\
  !*** ./src/app/settings/settings.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/settings/settings.component.ts":
/*!************************************************!*\
  !*** ./src/app/settings/settings.component.ts ***!
  \************************************************/
/*! exports provided: SettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsComponent", function() { return SettingsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _settings_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settings.service */ "./src/app/settings/settings.service.ts");
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../shared/services/global.service */ "./src/app/shared/services/global.service.ts");
/* harmony import */ var _shared_services_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/services/common.service */ "./src/app/shared/services/common.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(modalService, _globalService, _settingsService, _commonService) {
        this.modalService = modalService;
        this._globalService = _globalService;
        this._settingsService = _settingsService;
        this._commonService = _commonService;
        this.pageSize = 10;
        this.pageNumber = 1;
        // school info update
        this.school_name = '';
        this.school_address = '';
        this.s_date = '';
        this.e_date = '';
        // array
        this.sessionData = [];
        this.promotionalData = [];
        this.activeSession = '';
        this.session_name = '';
    }
    SettingsComponent.prototype.ngOnInit = function () {
        // get admin level to set roles
        this.admin_level = localStorage.getItem('admin_level');
        this.get_sessionDetails();
        this.get_activeSession();
        this.get_schoolInfo();
        this.get_promotionalData();
    };
    // *********************************************************************************************************************** */
    /**********************************************************Read Data from DB Methods************************************** */
    // *********************************************************************************************************************** */
    // ********************************************************** **********/
    // ************************* get promotional message ***************************/
    // ******************************************************************* */
    SettingsComponent.prototype.get_promotionalData = function () {
        var _this = this;
        var data = '';
        this._settingsService.get_promotionalMessages(data).subscribe(function (result) {
            if (result.status === 1) {
                _this.promotionalData = result.data;
                _this.u_promotional_message = _this.promotionalData[0].message;
                //console.log(this.u_promotional_message);
            }
            else if (result.status === 0) {
                _this._commonService.warningToaster(result.msg, 'Failed!');
            }
            else {
                _this._commonService.errorToaster(result.msg, 'Error!');
            }
        });
    };
    // ********************************************************** **********/
    // *************************Update Promotional Message ***************************/
    // ******************************************************************* */
    SettingsComponent.prototype.onSubmitUpdatePromotionalMessage = function (submittedEvent) {
        var _this = this;
        var updatedData = {
            promotional_message_id: 1,
            message: submittedEvent.value.u_promotional_message
        };
        this._settingsService.update_promotionalMessages(updatedData).subscribe(function (result) {
            if (result.status === 1) {
                _this._commonService.successToaster('Updated Successfully', 'Success!');
                //this.get_sessionDetails();
            }
            else {
                _this._commonService.errorToaster('Some error try again', 'Failed!');
            }
        });
    };
    // ********************************************************** **********/
    // ************************* get Session details ***************************/
    // ******************************************************************* */
    SettingsComponent.prototype.get_sessionDetails = function () {
        var _this = this;
        var data = 'all';
        this._settingsService.get_sessionDetailsF(data).subscribe(function (result) {
            if (result.status === 1) {
                _this.sessionData = result.data;
            }
            else if (result.status === 0) {
                _this._commonService.warningToaster(result.msg, 'Failed!');
            }
            else {
                _this._commonService.errorToaster(result.msg, 'Error!');
            }
        });
    };
    // ********************************************************** **********/
    // ************************* get active session ***************************/
    // ******************************************************************* */
    SettingsComponent.prototype.get_activeSession = function () {
        var _this = this;
        this._settingsService.get_activeSessionF().subscribe(function (result) {
            if (result.status === 1) {
                _this.activeSession = result.data[0].session_name;
            }
            else if (result.status === 0) {
                _this._commonService.warningToaster(result.msg, 'Failed!');
            }
            else {
                _this._commonService.errorToaster(result.msg, 'Error!');
            }
        });
    };
    // ********************************************************** **********/
    // ************************* get School info  ***************************/
    // ******************************************************************* */
    SettingsComponent.prototype.get_schoolInfo = function () {
        var _this = this;
        this._settingsService.get_schoolInfoF().subscribe(function (result) {
            if (result.status === 1) {
                var schoolInfo = null;
                schoolInfo = result.data[0];
                _this.school_name = schoolInfo.school_name;
                _this.school_phone = schoolInfo.school_num;
                _this.school_address = schoolInfo.school_address;
                _this.school_id = schoolInfo.school_id;
            }
            else {
                _this._commonService.errorToaster(result.msg, 'Error!');
            }
        });
    };
    // *********************************************************************************************************************** */
    /********************************************Add , Update , Delete  from DB Methods************************************** */
    // *********************************************************************************************************************** */
    // ********************************************************** **********/
    // *************************Add session ***************************/
    // ******************************************************************* */
    SettingsComponent.prototype.onSubmitAddSession = function (submittedEvent) {
        var _this = this;
        var data = {
            session_name: submittedEvent.value.session_name.replace(/\s+/g, ''),
            start_date: new Date(submittedEvent.value.s_date).getTime() / 1000,
            end_date: new Date(submittedEvent.value.e_date).getTime() / 1000
        };
        this._settingsService.add_newSession(data).subscribe(function (result) {
            if (result.status === 1) {
                _this._commonService.successToaster('Added Successfully', 'Success!');
                _this.get_sessionDetails();
                _this.get_activeSession();
            }
            else if (result.status === 3) {
                _this._commonService.warningToaster(result.msg, 'Failed!');
            }
            else {
                _this._commonService.errorToaster(result.msg, 'Error!');
            }
        });
    };
    // ********************************************************** **********/
    // *************************Set active session ***************************/
    // ******************************************************************* */
    SettingsComponent.prototype.setSessionActive = function (session_id) {
        var _this = this;
        var update_data = {
            session_id: session_id,
            status: 1
        };
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default()({
            title: 'Are you sure to update active session?',
            text: 'All new students will be registered against selected session ..! ',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Set New Session!'
        }).then(function (result) {
            if (result.value) {
                _this._settingsService
                    .set_sessionActiveF(update_data)
                    .subscribe(function (respResult) {
                    if (respResult.status === 1) {
                        _this._commonService.successToaster('Updated Successfully', 'Success!');
                        _this.get_sessionDetails();
                        _this.get_activeSession();
                        location.reload();
                    }
                    else {
                        _this._commonService.errorToaster(respResult.msg, 'Failed!');
                    }
                });
            }
        });
    };
    // ********************************************************** **********/
    // *************************Update session info ***************************/
    // ******************************************************************* */
    SettingsComponent.prototype.onSubmitUpdateSession = function (submittedEvent) {
        var _this = this;
        var updatedData = {
            session_id: submittedEvent.value.sess_id,
            session_name: submittedEvent.value.session_name,
            start_date: new Date(submittedEvent.value.u_s_date).getTime() / 1000,
            end_date: new Date(submittedEvent.value.u_e_date).getTime() / 1000
        };
        this._settingsService.update_SessionInfo(updatedData).subscribe(function (result) {
            if (result.status === 1) {
                _this._commonService.successToaster('Updated Successfully', 'Success!');
                _this.get_sessionDetails();
            }
            else {
                _this._commonService.errorToaster('Some error try again', 'Failed!');
            }
        });
    };
    // ********************************************************** **********/
    // *************************Update school Info ***************************/
    // ******************************************************************* */
    SettingsComponent.prototype.schoolInfoUpdate = function (submittedEvent) {
        var _this = this;
        var school_id = submittedEvent.value.school_id;
        var update_data = {
            school_name: submittedEvent.value.school_name,
            school_num: submittedEvent.value.school_phone,
            school_address: submittedEvent.value.school_address
        };
        this._settingsService
            .update_schoolInfo(this.school_id, update_data)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this._commonService.successToaster('Updated Successfully', 'Success!');
                _this.get_schoolInfo();
            }
            else {
                _this._commonService.errorToaster(result.msg, 'Error!');
            }
        });
    };
    // * open modal for update session info
    SettingsComponent.prototype.openUpdateSessionModal = function (modalName, index) {
        this.selected_session = this.sessionData[index];
        this.u_session_name = this.selected_session['session_name'];
        this.u_s_date = this._commonService.get_date_from_unix(this.selected_session['start_date']);
        this.u_e_date = this._commonService.get_date_from_unix(this.selected_session['end_date']);
        this.sess_id = this.selected_session['session_id'];
        this.openNgModal(modalName, 'md');
    };
    // * pagination
    SettingsComponent.prototype.pageChanged = function (pN) {
        this.pageNumber = pN;
    };
    // new modal
    SettingsComponent.prototype.openNgModal = function (content, size) {
        this.modalService.open(content, { size: size });
    };
    // close modal
    SettingsComponent.prototype.closeModal = function (modal) {
        modal.close();
    };
    SettingsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-settings',
            template: __webpack_require__(/*! ./settings.component.html */ "./src/app/settings/settings.component.html"),
            styles: [__webpack_require__(/*! ./settings.component.scss */ "./src/app/settings/settings.component.scss")],
            providers: [_settings_service__WEBPACK_IMPORTED_MODULE_3__["SettingsService"], _shared_services_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"]]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModal"],
            _shared_services_global_service__WEBPACK_IMPORTED_MODULE_4__["GlobalService"],
            _settings_service__WEBPACK_IMPORTED_MODULE_3__["SettingsService"],
            _shared_services_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"]])
    ], SettingsComponent);
    return SettingsComponent;
}());



/***/ }),

/***/ "./src/app/settings/settings.module.ts":
/*!*********************************************!*\
  !*** ./src/app/settings/settings.module.ts ***!
  \*********************************************/
/*! exports provided: SettingsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsModule", function() { return SettingsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _settings_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings.routing */ "./src/app/settings/settings.routing.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng2-select */ "./node_modules/ng2-select/index.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ng2_select__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-modal */ "./node_modules/ngx-modal/index.js");
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ngx_modal__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _settings_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./settings.component */ "./src/app/settings/settings.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










/* components */

var SettingsModule = /** @class */ (function () {
    function SettingsModule() {
    }
    SettingsModule = __decorate([
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
                _settings_routing__WEBPACK_IMPORTED_MODULE_2__["routing"]
            ],
            declarations: [_settings_component__WEBPACK_IMPORTED_MODULE_10__["SettingsComponent"]]
        })
    ], SettingsModule);
    return SettingsModule;
}());



/***/ }),

/***/ "./src/app/settings/settings.routing.ts":
/*!**********************************************!*\
  !*** ./src/app/settings/settings.routing.ts ***!
  \**********************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _settings_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings.component */ "./src/app/settings/settings.component.ts");


var childRoutes = [
    {
        path: '',
        component: _settings_component__WEBPACK_IMPORTED_MODULE_1__["SettingsComponent"]
    }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(childRoutes);


/***/ })

}]);
//# sourceMappingURL=settings-settings-module.js.map