(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~attendance-attendance-module~attendance-report-attendance-report-module"],{

/***/ "./src/app/attendance/daily-attendance.service.ts":
/*!********************************************************!*\
  !*** ./src/app/attendance/daily-attendance.service.ts ***!
  \********************************************************/
/*! exports provided: DailyAttendanceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DailyAttendanceService", function() { return DailyAttendanceService; });
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




var DailyAttendanceService = /** @class */ (function () {
    function DailyAttendanceService(http, _globalService) {
        this.http = http;
        this._globalService = _globalService;
        this.serverLink = this._globalService.constants.serverLink;
        this.headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"](this._globalService.constants.headers);
    }
    // *********************** Call  API for Marking Attendance *****************************
    DailyAttendanceService.prototype.markAttendanceF = function (dailyAttendance) {
        return this.http
            .post(this.serverLink + 'mark/attendance', dailyAttendance, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // ********************* Call  API to get students for mark attendace **********************
    DailyAttendanceService.prototype.getstdForMrkAttendance = function (class_id, section_id, running_session, timestamp) {
        return this.http
            .get(this.serverLink +
            'get/stdForMrkAttendance/' +
            class_id +
            '/' +
            section_id +
            '/' +
            running_session +
            '/' +
            timestamp, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // ********************* Call  API to mark attendance in bulk **********************
    DailyAttendanceService.prototype.mark_Bulk_attendance = function (bulk_attendance) {
        return this.http
            .post(this.serverLink + 'mark/bulk_attendance', bulk_attendance, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    // ********************* Call API to add absent reason **********************
    DailyAttendanceService.prototype.add_absent_reason = function (data) {
        return this.http
            .post(this.serverLink + 'update/absent_reason', data, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    DailyAttendanceService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__["GlobalService"]])
    ], DailyAttendanceService);
    return DailyAttendanceService;
}());



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
//# sourceMappingURL=default~attendance-attendance-module~attendance-report-attendance-report-module.js.map