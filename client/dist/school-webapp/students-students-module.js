(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["students-students-module"],{

/***/ "./src/app/students/search.pipe.ts":
/*!*****************************************!*\
  !*** ./src/app/students/search.pipe.ts ***!
  \*****************************************/
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
    // search by student roll num or cnic
    function SearchPipe() {
    }
    SearchPipe.prototype.transform = function (items, filterdata) {
        if (!items) {
            return [];
        }
        if (!filterdata) {
            return items;
        }
        filterdata = filterdata.toString();
        return items.filter(function (searchValue) {
            var rVal = JSON.stringify(searchValue.roll_num).includes(filterdata) ||
                JSON.stringify(searchValue.std_name).includes(filterdata);
            return rVal;
        });
    };
    SearchPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'filter'
        })
        // search by student roll num or cnic
    ], SearchPipe);
    return SearchPipe;
}());



/***/ }),

/***/ "./src/app/students/students.component.html":
/*!**************************************************!*\
  !*** ./src/app/students/students.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n\r\n    <div class=\"col-lg-12 grid-margin stretch-card\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n\r\n\r\n\r\n                <div class=\"row\">\r\n\r\n                    <div class=\"col-lg-9 col-md-9\">\r\n                        <h4 class=\"card-title\">Student Details</h4>\r\n                    </div>\r\n\r\n                    <div class=\"col-lg-3  \" style=\"padding-bottom: 1.5em;\">\r\n\r\n                        <button _ngcontent-c2=\"\" (click)=\"openNgModal(addStudentModal)\" class=\"btn btn-success btn-block\">New\r\n              Student\r\n              <i _ngcontent-c2=\"\" class=\"mdi mdi-plus\"></i></button>\r\n                    </div>\r\n                </div>\r\n\r\n\r\n\r\n\r\n                <div class=\"table-responsive\" style=\"overflow-x: hidden;\">\r\n\r\n                    <div class=\"row\">\r\n                        <!-- ******** side bar **** -->\r\n                        <div class=\"col-lg-3 col-md-3\">\r\n                            <div class=\"list-group\" style=\"padding-top: 0px; width: -webkit-fill-available;\">\r\n\r\n                                <p class=\"list-group-item mini-sidebar\">\r\n                                    <i class=\"fa fa-university\"></i>\r\n                                    <span> Select Class</span>\r\n                                </p>\r\n                                <a *ngFor=\"let item of classDataList \" class=\"list-group-item\" style=\"cursor: pointer;\" class=\"list-group-item\" [style.background-color]=\"item.BackgroundColour\" [style.color]=\"item.color\" (click)=\"onClickSideBar(item.class_id , item)\">\r\n                                    <span>{{item.class_name}}</span>\r\n                                </a>\r\n\r\n\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-lg-9 col-md-9\">\r\n                            <div class=\"col-lg-12 col-md-12 col-sm-12\">\r\n                                <div style=\"text-align: center\">\r\n                                    <div class=\"mini-heading \">\r\n                                        <h3> {{selectedClassName}} {{studentdetailNoti}} {{ available}}</h3>\r\n                                    </div>\r\n                                </div>\r\n\r\n                                <div class=\"row\" style=\"margin-top: 2em; margin-bottom: 0em; padding-bottom: 1.5em; padding-top: 0em;\">\r\n                                    <div class=\"col-lg-4\" *ngIf=\"showfilter\">\r\n                                        <!-- Search Student -->\r\n                                        <!-- <input class=\"form-control fm-control\" [(ngModel)]=\"searchText\" placeholder=\"Roll Num / Student Name\"> -->\r\n\r\n\r\n                                        <label class=\"control-label\">Filter By Section</label>\r\n\r\n                                        <select class=\"form-control fm-control\" (change)=filterStudentBySection(pickedSection.value); required style=\"margin-top:0em;\" #pickedSection [(ngModel)]=\"section_id\" name=\"section_id\">\r\n\r\n                                        <option value=\"all\" selected>All Sections </option>\r\n                                        <option *ngFor=\"let section of sectionsData ; let index = index\" [value]=\"section.section_name\">\r\n                                          {{ section.section_name}}\r\n                                        </option>\r\n                                      </select>\r\n\r\n\r\n                                    </div>\r\n                                    <div class=\"col-lg-3\">\r\n\r\n                                    </div>\r\n                                    <!-- <div class=\"col-lg-4\">\r\n\r\n                                        Filter By Section\r\n                                        <select class=\"form-control fm-control\" (change)=getSelectedSectionDetails(pickedSection.value); required style=\"margin-top:0em;\" #pickedSection [(ngModel)]=\"section_id\" name=\"classid\">\r\n\r\n                                        <option value=\"all\" selected>All Sections </option>\r\n                                        <option *ngFor=\"let section of sectionOptions ; let index = index\" [value]=\"index\">\r\n                                          {{ section.section_name}}\r\n                                        </option>\r\n                                      </select>\r\n\r\n                                    </div> -->\r\n\r\n\r\n                                </div>\r\n                                <table class=\"table table-bordered table-hover\">\r\n                                    <thead class=\"thead-light\">\r\n                                        <tr>\r\n                                            <th> S.No</th>\r\n                                            <th> Student </th>\r\n                                            <th>Roll Number</th>\r\n                                            <th>Student Name </th>\r\n                                            <th>Section Name</th>\r\n                                            <th>Actions</th>\r\n\r\n                                        </tr>\r\n                                    </thead>\r\n                                    <tbody>\r\n                                        <tr *ngFor=\"let item of studentsDataList let index = index\">\r\n\r\n                                            <td>{{index + 1}}</td>\r\n                                            <td> <img [src]=\"item.thumb_path == '' || null ?  placeholder : imageThumbBaseUrl  + item.thumb_path\" class=\"rounded-circle dropdown-toggle\" width=\"30px\" data-toggle=\"dropdown\" alt=\"avatar\" onError=\"this.src='assets/images/teacherplaceholder.png'\"\r\n                                                    style=\" border-radius: 50%; cursor:pointer;\" (click)=\"openProfileStudModal(studentProfileModel,item.student_id,item.class_id)\">\r\n\r\n\r\n\r\n                                            </td>\r\n                                            <td>{{item.roll_num}}</td>\r\n                                            <td>{{item.std_name}}</td>\r\n\r\n                                            <td>{{item.section_name}}</td>\r\n\r\n\r\n                                            <td>\r\n\r\n\r\n                                                <label class=\"badge badge-info\" *ngIf=\"(admin_level == 1)\" style=\"cursor: pointer;\" (click)=openEditStudModal(updateStudentModal,item.student_id,item.class_id)>Edit</label>\r\n                                                <label class=\"badge badge-danger\" *ngIf=\"(admin_level == 1)\" style=\"cursor: pointer; margin-left: 1em;\" (click)=onClickdeleteStudent(item.student_id,item.class_id)>Delete</label>\r\n\r\n                                                <label class=\"badge badge-primary\" style=\"cursor: pointer; margin-left: 1em;\" (click)=\"openProfileStudModal(studentProfileModel,item.student_id,item.class_id)\">Profile</label>\r\n                                            </td>\r\n                                        </tr>\r\n                                    </tbody>\r\n                                </table>\r\n\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n</div>\r\n\r\n<!-- *********************************** Modals **************************************** -->\r\n\r\n\r\n<!-- ********student Profile Model ************ -->\r\n\r\n<ng-template #studentProfileModel let-modal>\r\n\r\n    <div class=\"modal-header\">\r\n        <div style=\"text-align: center\">\r\n            <h3>Student Profile</h3>\r\n\r\n        </div>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-3 col-md-3 col-sm-3\">\r\n                <div class=\"card\">\r\n                    <div class=\"profile-wrap animated fadeIn\">\r\n                        <div class=\"info-wrap\">\r\n                            <div class=\"avatar-wrap\">\r\n                                <img [src]=\"avatarImgSrc === '' || null ?  'assets/images/placeholder.png' : imageBaseUrl  + avatarImgSrc\" alt=\"Profile Picture Not Found!\" style=\"margin: 1.1em; width: 14.5em;\" onError=\"this.src='assets/images/placeholder.png';\">\r\n                            </div>\r\n                            <div style=\"margin: 1.1em;\">\r\n                                <span class=\"user-name\">{{userPost}}</span>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"profile-foot\" style=\"margin: 1.1em;\">\r\n                            <h4>{{std_name}} </h4>\r\n\r\n                            <h4>{{class_name}} | Section : {{section_name}}</h4>\r\n\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n            </div>\r\n            <div class=\"col-lg-9 col-md-9 col-sm-10\">\r\n                <ngb-tabset class=\"tab-solid tab-solid-primary\">\r\n                    <ngb-tab>\r\n                        <ng-template ngbTabTitle>\r\n                            Basic Info\r\n                        </ng-template>\r\n                        <ng-template ngbTabContent>\r\n\r\n                            <div class=\"card\">\r\n\r\n                                <table class=\"table table-hover\">\r\n\r\n\r\n                                    <tbody>\r\n                                        <tr>\r\n                                            <td> <strong>Roll Number : </strong> {{ std_rollNum }} </td>\r\n                                        </tr>\r\n                                        <tr>\r\n                                            <td> <strong> Student Name : </strong> {{std_name}} </td>\r\n                                        </tr>\r\n                                        <tr>\r\n                                            <td> <strong> Date Of Birth :  </strong> {{std_dob}}</td>\r\n                                        </tr>\r\n                                        <tr>\r\n                                            <td><strong> Email : </strong>{{std_email}}</td>\r\n                                        </tr>\r\n\r\n                                        <tr>\r\n                                            <td><strong> Class : </strong> {{class_name}}</td>\r\n                                        </tr>\r\n                                        <tr>\r\n                                            <td> <strong> Section : </strong> {{section_name}}</td>\r\n                                        </tr>\r\n                                        <tr>\r\n                                            <td> <strong> Address : </strong> {{std_address}}</td>\r\n                                        </tr>\r\n\r\n                                    </tbody>\r\n\r\n                                </table>\r\n                            </div>\r\n\r\n                        </ng-template>\r\n                    </ngb-tab>\r\n\r\n\r\n                    <ngb-tab>\r\n                        <ng-template ngbTabTitle>\r\n                            Parent Info\r\n                        </ng-template>\r\n                        <ng-template ngbTabContent>\r\n\r\n                            <div class=\"card\">\r\n\r\n                                <table class=\"table table-hover\">\r\n\r\n\r\n                                    <tbody>\r\n                                        <tr>\r\n                                            <td> <strong>Parent Name : </strong> {{parent_name}} </td>\r\n                                        </tr>\r\n                                        <tr>\r\n                                            <td> <strong> Parent Email : </strong> {{parent_email}} </td>\r\n                                        </tr>\r\n                                        <tr>\r\n                                            <td> <strong>Phone Number : </strong> {{parent_number}}</td>\r\n                                        </tr>\r\n                                        <tr>\r\n                                            <td> <strong> Profession : </strong>{{parent_profession}}</td>\r\n                                        </tr>\r\n                                        <tr>\r\n                                            <td> <strong> Address : </strong> {{parent_address}}</td>\r\n                                        </tr>\r\n                                        <tr>\r\n                                            <td> <strong> Relation with student : </strong>{{ relationship }}</td>\r\n                                        </tr>\r\n                                    </tbody>\r\n\r\n                                </table>\r\n                            </div>\r\n\r\n                        </ng-template>\r\n                    </ngb-tab>\r\n\r\n\r\n                    <ngb-tab>\r\n                        <ng-template ngbTabTitle>\r\n                            Exam Marks\r\n                        </ng-template>\r\n                        <ng-template ngbTabContent>\r\n\r\n\r\n                            <div class=\"card\">\r\n                                <form style=\"margin-top:2em;\" class=\"form-group\" #manageMarks=\"ngForm\" (ngSubmit)=\"submitExamIdF(manageMarks)\">\r\n\r\n                                    <div class=\"col-md-12 form-group\">\r\n                                        <label class=\"control-label\"> Select Exam *</label>\r\n                                        <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedExam.valid && pickedExam.touched\"><small>Exam\r\n                      Required</small></span>\r\n                                        <select class=\"form-control fm-control\" required style=\"margin-top:0em;\" #pickedExam [(ngModel)]=\"exam\" name=\"exam\">\r\n                    <option [ngValue]=\"undefined\" disabled>Select Exam</option>\r\n                    <option *ngFor=\"let item of examsDataList\" [value]=\"item.exam_id\">{{item.exam_name}}</option>\r\n                  </select>\r\n                                    </div>\r\n                                    <div class=\"col-md-12 form-group\" style=\"text-align: center\">\r\n                                        <input type=\"submit\" class=\"btn btn-info\" style=\"margin-top:1em\" [disabled]=\"!manageMarks.form.valid\" value=\"Show Exam result \">\r\n\r\n                                    </div>\r\n\r\n                                </form>\r\n                                <div *ngIf=\"resultSummary\" id=\"marksheet\">\r\n\r\n                                    <div style=\"text-align: center;\">\r\n                                        <h3 style=\"margin:1em\">{{selected_exam | titlecase}} Result </h3>\r\n                                    </div>\r\n                                    <div class=\"table-responsive\">\r\n                                        <table class=\"table table-hover\">\r\n                                            <thead class=\"thead-light\">\r\n                                                <tr>\r\n                                                    <th>Subject</th>\r\n                                                    <th>Total Marks</th>\r\n                                                    <th>Obtained Marks</th>\r\n                                                    <th>Percentage</th>\r\n\r\n                                                    <th>Exam Date</th>\r\n\r\n                                                </tr>\r\n                                            </thead>\r\n                                            <tbody>\r\n                                                <tr *ngFor=\"let item of studentExamResult; let index = index\">\r\n\r\n\r\n                                                    <td>{{item.subject_name}}</td>\r\n                                                    <td>{{item.total_marks}}</td>\r\n                                                    <td>{{item.obtained_marks}}</td>\r\n\r\n\r\n                                                    <td> {{ item.obtained_marks/item.total_marks | percent:'2.0-1' }}</td>\r\n                                                    <td>{{item.exam_date * 1000 | date}}</td>\r\n\r\n                                                </tr>\r\n                                            </tbody>\r\n                                        </table>\r\n                                    </div>\r\n                                    <div *ngIf=\"resultSummary\" style=\"margin : 2em 1em;\">\r\n                                        <h5> Total Marks: {{result_totalMarks}}</h5>\r\n                                        <h5>Obtained Marks :{{ result_obtainedMarks }}</h5>\r\n                                        <h5> Percentage {{ result_obtainedMarks/result_totalMarks | percent:'2.0-1' }}</h5>\r\n                                    </div>\r\n\r\n\r\n                                </div>\r\n\r\n                                <div *ngIf=\"printButton\" style=\"margin-left: 1em;\">\r\n                                    <button printTitle=\"Student Result\" class=\"btn btn-info\" [useExistingCss]=\"true\" printSectionId=\"marksheet\" ngxPrint>print</button>\r\n                                </div>\r\n\r\n                            </div>\r\n\r\n                        </ng-template>\r\n                    </ngb-tab>\r\n\r\n                    <ngb-tab>\r\n                        <ng-template ngbTabTitle>\r\n                            Fee Details\r\n                        </ng-template>\r\n                        <ng-template ngbTabContent>\r\n\r\n\r\n                            <div class=\"card\">\r\n                                <div style=\"text-align: center\" *ngIf=\"feedetailsPresent\">\r\n                                    <span style=\"color: red ; margin-left:2em;\"> No\r\n                  Fee Details Availabale\r\n                </span>\r\n                                </div>\r\n\r\n                                <table class=\"table table-hover\">\r\n                                    <thead class=\"thead-light\">\r\n                                        <tr>\r\n\r\n\r\n                                            <th>Fee Month</th>\r\n\r\n                                            <th>Last Date</th>\r\n                                            <th>Paid Date</th>\r\n                                            <th>Total </th>\r\n                                            <th>Paid Amount</th>\r\n                                            <th>Status</th>\r\n\r\n\r\n                                        </tr>\r\n                                    </thead>\r\n                                    <tbody>\r\n                                        <tr *ngFor=\"let item of studentFeeHistroyList; let index = index\">\r\n\r\n\r\n                                            <td>{{item.fee_month * 1000 | date: 'MM/yyyy'}}</td>\r\n\r\n                                            <td>{{item.duedate_timestamp * 1000 | date}}</td>\r\n                                            <td>{{ !item.feepaid_date ? '-' : item.feepaid_date * 1000 | date}}</td>\r\n                                            <td>{{item.total_fee}}</td>\r\n                                            <td>{{item.amount_paid}}</td>\r\n\r\n                                            <td>{{ item.fee_status}}</td>\r\n\r\n                                        </tr>\r\n                                    </tbody>\r\n                                </table>\r\n                            </div>\r\n\r\n                        </ng-template>\r\n                    </ngb-tab>\r\n                </ngb-tabset>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n    </div>\r\n</ng-template>\r\n\r\n\r\n\r\n<!--************** add student information  *************-->\r\n\r\n\r\n\r\n\r\n<ng-template #addStudentModal let-modal>\r\n    <div class=\"modal-header\">\r\n        <div style=\"text-align: center\">\r\n            <h3>Add Student Information</h3>\r\n        </div>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n        <span aria-hidden=\"true\">&times;</span>\r\n      </button>\r\n    </div>\r\n    <form class=\"form-group\" #addstudent=\"ngForm\" (ngSubmit)=\"onSubmitAddStd(addstudent)\">\r\n        <div class=\"modal-body\">\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-12 col-md-12 note_background \">\r\n                    <span class=\"warning\"><b> Admission New Students Note:</b> <br>\r\n            Admitting new students will automatically create an enrollment to the selected class / section in the\r\n            running\r\n            session. Please check the informations you have inserted because once you admit new student,\r\n            you won't be able to edit his/her class,roll number,section .\r\n          </span>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <div class=\"col-md-6 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:1.5em;\">Student Name *</label>\r\n                    <span style=\"color:red;  margin-left: 1em;\" *ngIf=\"!pickedStdNameI.valid && pickedStdNameI.touched\"><small>\r\n                Student Name Required</small> </span>\r\n                    <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"stud_name\" placeholder=\"Student Name\" required [(ngModel)]=\"stud_name\" #pickedStdNameI=\"ngModel\">\r\n                </div>\r\n\r\n                <div class=\"col-md-6 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:1.5em;\">Student Email </label>\r\n\r\n                    <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"stud_email\" placeholder=\"Student Email\" [(ngModel)]=\"stud_email\">\r\n                </div>\r\n\r\n\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:.5em;\">Date Of Birth *</label>\r\n                    <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedStdDOBI.valid && pickedStdDOBI.touched\"><small>DOB\r\n                Required</small></span>\r\n                    <input type=\"date\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"stud_dob\" required [(ngModel)]=\"stud_dob\" #pickedStdDOBI=\"ngModel\">\r\n                </div>\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:.5em;\">Gender *</label>\r\n                    <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedStdGenderI.valid && pickedStdGenderI.touched\"><small>Gender\r\n                Required</small></span>\r\n                    <select class=\"form-control fm-control\" required style=\"margin-top:0em;\" [(ngModel)]=\"stud_gender\" name=\"stud_gender\" #pickedStdGenderI=\"ngModel\">\r\n              <option [ngValue]=\"undefined\" disabled>Select Gender</option>\r\n              <option value=\"male\">Male</option>\r\n              <option value=\"female\">Female</option>\r\n            </select>\r\n                </div>\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:.5em;\">Phone Number</label>\r\n                    <input type=\"number\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"stud_phone_number\" placeholder=\"Phone Number\" ngModel>\r\n                </div>\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:.5em;\">Image</label> <span *ngIf=\"!imgValidation\" style=\"color:red;margin-left: 1em;\"> <small> Invalid Image Type </small> </span>\r\n                    <input id=\"student_image\" style=\"margin-top:0em;\" #imageFile accept=\"image/*\" name=\"stud_image\" type=\"file\" (change)=\"fileChangeEvent($event)\" class=\"form-control fm-control\" placeholder=\"Upload a picture...\" />\r\n                </div>\r\n\r\n                <div class=\"col-md-3 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:.5em;\">Parent Phone Number *\r\n\r\n            </label>\r\n                    <span [style.color]=\"alert_color\"><small style=\"margin-left: 1em;\">{{ verify_parent_msg }} </small> <small *ngIf=\"showAddParentOption\">  <a class=\"nav-link\" routerLink=\"/parents\" routerLinkActive=\"active\" (click)=\"closeModal()\"> Add parent </a> </small> </span>\r\n\r\n                    <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"stud_parentNumber\" placeholder=\"Parent Phone Number \" required [(ngModel)]=\"stud_parentNumber\" #pickedpID=\"ngModel\">\r\n\r\n                </div>\r\n\r\n                <div class=\"col-md-1 form-group\" style=\"margin-top: 2.5em;\">\r\n                    <span style=\"cursor: pointer;\" class=\"btn btn-warning\" (click)=verifyParentPhoneNum(pickedpID.value)>Verify</span>\r\n                    <!-- <button class=\"btn btn-warning\" style=\"margin-top:2.5em\"\r\n                (click)=verifyParentPhoneNum(pickedpID.value)>Verify Number </button> -->\r\n\r\n                </div>\r\n\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:.5em;\">Parent relationship with student *</label>\r\n                    <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedRealtionShip.valid && pickedRealtionShip.touched\"><small>Relationship\r\n                Required</small></span>\r\n                    <input type=\"text\" style=\"margin-top:0em;\" required class=\"form-control fm-control\" #pickedRealtionShip=\"ngModel\" name=\"parent_relationship\" placeholder=\"Relationship with parent\" [(ngModel)]=\"parent_relationship\">\r\n                </div>\r\n\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:.5em;\">Previous School Name</label>\r\n                    <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"stud_prevSchool\" placeholder=\"Previous Scool Name\" [(ngModel)]=\"stud_prevSchool\">\r\n                </div>\r\n\r\n\r\n\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:.5em;\">Previous School Leaving Reason</label>\r\n                    <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"stud_leavingReason\" placeholder=\"Previous School Leaving Reason\" [(ngModel)]=\"stud_leavingReason\">\r\n                </div>\r\n                <!-- <div class=\"col-md-10 form-group\">\r\n              <label class=\"control-label\" style=\"margin-top:.5em;\">Parent Phone Number\r\n\r\n              </label>\r\n\r\n\r\n              <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"std_parentId\"\r\n                placeholder=\"Parent Phone Number \" required [(ngModel)]=\"std_name\" #pickedpID=\"ngModel\">\r\n\r\n            </div>\r\n\r\n            <div class=\"col-md-2 form-group\">\r\n             <span style=\"cursor: pointer;\" class=\"label label-info\"\r\n                (click)=verifyParentPhoneNum(pickedpID.value)>Verify</span> -->\r\n                <!-- <button class=\"btn btn-warning\" style=\"margin-top:2.5em\">Verify Number </button> -->\r\n\r\n                <!-- </div>  -->\r\n\r\n\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:.5em;\">Address</label>\r\n                    <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"stud_address\" placeholder=\"Student Address\" ngModel>\r\n                </div>\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\"> Admission Class *</label>\r\n                    <span style=\"color:red; margin-left: 1.5em;\" *ngIf=\"!pickedStdCLassI.valid && pickedStdCLassI.touched\"><small>Class\r\n                Required</small></span>\r\n                    <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedStdCLassI [(ngModel)]=\"stud_classId\" (change)=classSelected(pickedStdCLassI.value); name=\"stud_classId\">\r\n              <option [ngValue]=\"undefined\" disabled>Select Class</option>\r\n              <option *ngFor=\"let item of classDataList\" [value]=\"item.class_id\">{{item.class_name}}</option>\r\n            </select>\r\n\r\n                </div>\r\n\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\"> Admission Section *</label>\r\n                    <span style=\"color:red; margin-left: .5em;\" *ngIf=\"!pickedStdSectionI.valid && pickedStdSectionI.touched\"><small>Section\r\n                Required</small></span>\r\n                    <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedStdSectionI [(ngModel)]=\"stud_sectionId\" (change)=enableBtn() name=\"stud_sectionId\">\r\n              <option [ngValue]=\"undefined\" disabled>Select Section</option>\r\n              <option *ngFor=\"let item of sectionsDataList\" [value]=\"item.section_id\">{{item.section_name}}</option>\r\n            </select>\r\n\r\n                </div>\r\n\r\n                <!-- <div class=\"col-md-6 form-group\">\r\n              <label class=\"control-label\" style=\"margin-top:1em;\">Roll Number *</label>\r\n              <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedStdRollnum.valid && pickedStdRollnum.touched\"><small>Roll\r\n                  Num Required</small></span>\r\n              <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" placeholder=\"Student Roll Number\"\r\n                [(ngModel)]=\"std_rollNum\" required name=\"std_rollNum\" #pickedStdRollnum=\"ngModel\">\r\n\r\n            </div> -->\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:0em;\">Enroll Date * </label>\r\n                    <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedStdEnrollI.valid && pickedStdEnrollI.touched\"><small>Enroll\r\n                Date Required</small></span>\r\n\r\n                    <input type=\"date\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"stud_enrollDate\" required [(ngModel)]=\"stud_enrollDate\" #pickedStdEnrollI=\"ngModel\">\r\n                </div>\r\n                <div class=\"col-md-12 form-group\">\r\n\r\n\r\n                    <span>\r\n              <h3>*Note </h3>\r\n            </span>\r\n                    <span>\r\n              <h4> Student will be Registered in Current Session : {{defaultsession}} </h4> <small style=\"color: brown\">\r\n                ( You can change enroll session year from Settings )</small>\r\n            </span>\r\n\r\n                </div>\r\n\r\n            </div>\r\n\r\n        </div>\r\n\r\n        <div class=\"modal-footer\">\r\n            <input type=\"submit\" class=\"btn btn-info\" [disabled]=\"!addstudent.form.valid || disableBtn || checkUserName\" value=\"Add Student\">\r\n            <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n        </div>\r\n    </form>\r\n</ng-template>\r\n\r\n\r\n\r\n\r\n<!-- ********student Data Update  Model ************ -->\r\n\r\n\r\n<ng-template #updateStudentModal let-modal>\r\n    <div class=\"modal-header\">\r\n        <div style=\"text-align: center\">\r\n            <h3>Update Student Information</h3>\r\n        </div>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n        <span aria-hidden=\"true\">&times;</span>\r\n      </button>\r\n    </div>\r\n    <form class=\"form-group\" #updateStudent=\"ngForm\" (ngSubmit)=\"onSubmitupdateStd(updateStudent)\">\r\n        <div class=\"modal-body\">\r\n\r\n            <div class=\"row\">\r\n                <div class=\"col-md-6 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:.5em;\">Student Name *</label>\r\n                    <span style=\"color:red;  margin-left: 1em;\" *ngIf=\"!pickedStdName.valid && pickedStdName.touched\"><small>\r\n                Student Name Required</small> </span>\r\n                    <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"std_name\" placeholder=\"Student Name\" required [(ngModel)]=\"std_name\" #pickedStdName=\"ngModel\">\r\n                </div>\r\n\r\n                <div class=\"col-md-6 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:.5em;\">Student Email </label>\r\n\r\n                    <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"std_email\" placeholder=\"Student Email\" [(ngModel)]=\"std_email\">\r\n                </div>\r\n\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:1em;\">Date Of Birth *</label>\r\n                    <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedStdDOB.valid && pickedStdDOB.touched\"><small>DOB\r\n                Required</small></span>\r\n                    <input type=\"date\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"std_dob\" required [(ngModel)]=\"std_dob\" #pickedStdDOB=\"ngModel\">\r\n                </div>\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:1em;\">Gender *</label>\r\n                    <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedStdGender.valid && pickedStdGender.touched\"><small>Gender\r\n                Required</small></span>\r\n                    <select class=\"form-control fm-control\" required style=\"margin-top:0em;\" [(ngModel)]=\"std_gender\" name=\"std_gender\" #pickedStdGender=\"ngModel\">\r\n              <option [ngValue]=\"undefined\" disabled>Select Gender</option>\r\n              <option value=\"male\">Male</option>\r\n              <option value=\"female\">Female</option>\r\n            </select>\r\n                </div>\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:1em;\">Phone Number</label>\r\n                    <input type=\"number\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"std_phonenum\" placeholder=\"Phone Number\" [(ngModel)]=\"std_phonenum\">\r\n                </div>\r\n                <div class=\"col-md-5 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:.5em;\">Previous Scool Name</label>\r\n                    <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"std_prevSchool\" placeholder=\"Previous Scool Name\" [(ngModel)]=\"std_prevSchool\">\r\n                </div>\r\n\r\n                <div class=\"col-md-7 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:.5em;\">Previous School Leaving Reason</label>\r\n                    <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"std_leavingReason\" placeholder=\"Previous School Leaving Reason\" [(ngModel)]=\"std_leavingReason\">\r\n                </div>\r\n                <div class=\"col-md-8 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:1em;\">Parent Details <small style=\"color: brown\"> ( If\r\n                Parent details not found than add parent details from Parent section ) </small></label>\r\n                    <!-- <span class=\"label label-info\" style=\"cursor: pointer; margin-left: 1em;\" (click)=goToParentRoute()> Go\r\n              To Parent Section</span> -->\r\n                    <select class=\"form-control fm-control\" style=\"margin-top:0em;\" [(ngModel)]=\"std_parentId\" name=\"std_parentId\">\r\n              <option [ngValue]=\"undefined\" disabled>{{parent_name}} || Parent Email : {{parent_email}} || Parent\r\n                Number: {{parent_phoneNum}} || Parent Profession: {{parent_profession}}</option>\r\n\r\n              <option *ngFor=\"let item of parentDetails\" [value]=\"item.parent_id\">{{item.parent_name}} || Parent\r\n                Email : {{item.parent_email}} || Parent Number: {{item.parent_phoneNum}} || Parent Profession:\r\n                {{item.parent_profession}}</option>\r\n            </select>\r\n\r\n                </div>\r\n                <div class=\"col-md-4 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:1em;\">Parent relationship with student *</label>\r\n                    <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedRealtionShipu.valid && pickedRealtionShipu.touched\"><small>Gender\r\n                Required</small></span>\r\n                    <input type=\"text\" style=\"margin-top:0em;\" required class=\"form-control fm-control\" #pickedRealtionShipu=\"ngModel\" name=\"u_parent_relationship\" placeholder=\"Relationship with parent\" [(ngModel)]=\"u_parent_relationship\">\r\n                </div>\r\n                <div class=\"col-md-12 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:1em;\">Address</label>\r\n                    <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"std_address\" placeholder=\"Student Address\" [(ngModel)]=\"std_address\">\r\n                </div>\r\n\r\n\r\n                <div class=\"col-md-6 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:0em;\">Class</label>\r\n                    <input type=\"text\" style=\"margin-top:0em;\" [disabled]=true class=\"form-control fm-control\" name=\"class_name\" placeholder=\"Student Address\" [(ngModel)]=\"class_name\">\r\n                </div>\r\n                <div class=\"col-md-6 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:0em;\">Image</label> <span *ngIf=\"!imgValidation\" style=\"color:red;margin-left: 1em;\"> <small> Invalid Image Type </small> </span>\r\n                    <input id=\"student_image\" style=\"margin-top:0em;\" #imageFile accept=\"image/*\" name=\"student_image\" type=\"file\" (change)=\"fileChangeEvent($event)\" class=\"form-control fm-control\" placeholder=\"Upload a picture...\" />\r\n                </div>\r\n\r\n\r\n                <div class=\"col-md-6 form-group\">\r\n                    <label class=\"control-label\"> Section *</label>\r\n\r\n                    <input type=\"text\" style=\"margin-top:0em;\" [disabled]=true class=\"form-control fm-control\" name=\"section_name\" [(ngModel)]=\"section_name\">\r\n\r\n                </div>\r\n\r\n                <div class=\"col-md-6 form-group\">\r\n                    <label class=\"control-label\" style=\"margin-top:0em;\">Roll Number *</label>\r\n                    <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedStdRollnum.valid && pickedStdRollnum.touched\"><small>Roll\r\n                Num Required</small></span>\r\n                    <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" placeholder=\"Student Roll Number\" [(ngModel)]=\"std_rollNum\" [disabled]=\"true\" required name=\"std_rollNum\" #pickedStdRollnum=\"ngModel\">\r\n\r\n                    <input type=\"hidden\" [(ngModel)]=\"std_id\" name=\"std_id\">\r\n                    <input type=\"hidden\" [(ngModel)]=\"enroll_id\" name=\"enroll_id\">\r\n                    <input type=\"hidden\" [(ngModel)]=\"class_id\" name=\"class_id\">\r\n                </div>\r\n\r\n\r\n            </div>\r\n\r\n        </div>\r\n        <div class=\"modal-footer\">\r\n            <input type=\"submit\" class=\"btn btn-info\" [disabled]=\"!updateStudent.form.valid\" value=\"Update Student\">\r\n            <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n        </div>\r\n    </form>\r\n</ng-template>"

/***/ }),

/***/ "./src/app/students/students.component.scss":
/*!**************************************************!*\
  !*** ./src/app/students/students.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/students/students.component.ts":
/*!************************************************!*\
  !*** ./src/app/students/students.component.ts ***!
  \************************************************/
/*! exports provided: StudentsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentsComponent", function() { return StudentsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _student_information_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./student-information.service */ "./src/app/students/student-information.service.ts");
/* harmony import */ var _parents_parents_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../parents/parents.service */ "./src/app/parents/parents.service.ts");
/* harmony import */ var _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sections/manageSection.service */ "./src/app/sections/manageSection.service.ts");
/* harmony import */ var _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../classes/manageClass.service */ "./src/app/classes/manageClass.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _admin_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../admin.service */ "./src/app/admin.service.ts");
/* harmony import */ var _manage_fee_invoice_manage_fee_invoice_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../manage-fee-invoice/manage-fee-invoice.service */ "./src/app/manage-fee-invoice/manage-fee-invoice.service.ts");
/* harmony import */ var _exams_add_exams_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../exams/add-exams.service */ "./src/app/exams/add-exams.service.ts");
/* harmony import */ var _shared_services_common_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../shared/services/common.service */ "./src/app/shared/services/common.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var StudentsComponent = /** @class */ (function () {
    // create instance of services to access method from services
    function StudentsComponent(_router, _StudentsInfoService, _classDataService, _sectionDataService, _parentDataService, modalService, _adminService, 
    // private _authClass: AuthClass,
    _addExamsService, _manageFeeInvoiceService, el, _commonService) {
        this._router = _router;
        this._StudentsInfoService = _StudentsInfoService;
        this._classDataService = _classDataService;
        this._sectionDataService = _sectionDataService;
        this._parentDataService = _parentDataService;
        this.modalService = modalService;
        this._adminService = _adminService;
        this._addExamsService = _addExamsService;
        this._manageFeeInvoiceService = _manageFeeInvoiceService;
        this.el = el;
        this._commonService = _commonService;
        this.printButton = false;
        this.showAddParentOption = false;
        /* active session */
        this.running_session = localStorage.getItem('running_session');
        this.defaultsession = localStorage.getItem('running_session');
        this.placeholder = 'assets/images/placeholder.png';
        this.userName = 'Ali';
        this.userPost = 'Student';
        this.sectionsData = [];
        this.studentFeeHistroyList = [];
        this.allStudensDataList = [];
        this.filesToUpload = [];
        this.result_totalMarks = 0;
        this.result_obtainedMarks = 0;
        /* pagination Info */
        this.pageSize = 10;
        this.pageNumber = 1;
        this.studentdetailNoti = 'Select Any Class';
        this.updateSuccessNotifi = 0;
        this.examResultStatus = false;
        this.resultSummary = false;
        this.feedetailsPresent = false;
        this.uploadImage = false;
        this.imgValidation = true;
        // verify parent
        this.verify_parent = false;
        this.verified_parent_name = '';
        this.verify_parent_msg = '';
        this.alert_color = '';
        this.teachersArray = [];
        this.submitNotification = 0;
        this.disableBtn = false;
        this.checkUserName = false;
        this.checkRollNumber = false;
        this.showfilter = false;
    }
    // this function auto called when component loads
    StudentsComponent.prototype.ngOnInit = function () {
        this.imageBaseUrl =
            this._StudentsInfoService.imagesBaseServer + 'profile_images/';
        this.imageThumbBaseUrl =
            this._StudentsInfoService.imagesBaseServer + 'profile_images/thumbs/';
        // get admin level
        this.admin_level = localStorage.getItem('admin_level');
        $('.list-group-item').click(function (e) {
            e.preventDefault();
            $('.list-group-item').removeClass('active');
            $(this).addClass('active');
        });
        this.getClassData();
        this.getParentsData();
        this.getExamsinfo();
    };
    // *********************************************************************************************************************** */
    /**********************************************************Read Data from DB Methods************************************** */
    // *********************************************************************************************************************** */
    // ********************************************************** **********/
    // *********************** Get all Classes data ************************/
    // ******************************************************************* */
    StudentsComponent.prototype.getClassData = function () {
        var _this = this;
        this._classDataService.getClassesF().subscribe(function (result) {
            _this.classDataList = result;
        });
    };
    // ********************************************************** **********/
    // *********************** Get all exams data ************************/
    // ******************************************************************* */
    StudentsComponent.prototype.getExamsinfo = function () {
        var _this = this;
        var type = 'all';
        this._addExamsService
            .getExamInfoFun(this.running_session)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this.examsDataList = result.data;
            }
            if (result.status === 0) {
                _this.dbRespMsg = 'No exam is added';
            }
            if (result.status === 403) {
                _this.dbRespMsg = result.msg;
            }
        });
    };
    // ********************************************************** **********/
    // *********************** Get all Parents data ************************/
    // ******************************************************************* */
    StudentsComponent.prototype.getParentsData = function () {
        var _this = this;
        this._parentDataService.getParentsF().subscribe(function (result) {
            _this.parentDetails = result;
        });
    };
    // change bg color on click
    StudentsComponent.prototype.onChildSelect = function (Child) {
        // This would work but if you have the previously selected child stored
        // it would be better to just turn that one white
        for (var _i = 0, _a = this.classDataList; _i < _a.length; _i++) {
            var myChild = _a[_i];
            myChild.BackgroundColour = 'white';
            myChild.color = 'black';
        }
        Child.BackgroundColour = 'rgba(233, 233, 234, 0.48)';
        Child.color = 'cornflowerblue';
    };
    StudentsComponent.prototype.onClickSideBar = function (class_id, Child) {
        this.getStudentsByClassID(class_id);
        this.onChildSelect(Child);
    };
    // ********************************************************** **********/
    // ****************** Get all Students details by class ID ************/
    // ******************************************************************* */
    StudentsComponent.prototype.getStudentsByClassID = function (class_id) {
        var _this = this;
        this.studentsDataList = [];
        this.allStudensDataList = [];
        /* get all students against selected class */
        this._StudentsInfoService
            .getStudByClassId(class_id, this.running_session)
            .subscribe(function (result) {
            _this.studentsDataList = result.data;
            _this.allStudensDataList = result.data;
            if (result.status === 1) {
                _this.showfilter = true;
                _this.selectedClassName = _this.allStudensDataList[0].class_name;
                _this.studentdetailNoti = 'Student Details';
                _this.available = ' ';
            }
            else {
                _this.selectedClassName = 'No ';
                _this.studentdetailNoti = 'Student Details';
                _this.available = 'Available';
            }
        });
        /* get all section against selected class */
        this._sectionDataService.getSectionF(class_id).subscribe(function (result) {
            _this.sectionsData = []; // empty the arrayy onselect class change
            _this.sectionsData = result;
        });
    };
    // ********************************************************** **********/
    // *************** Get single Student details by student ID ************/
    // ******************************************************************* */
    StudentsComponent.prototype.getSingleStudentData = function (student_id, class_id) {
        var _this = this;
        this.avatarImgSrc = '';
        this.selectedStd_id = student_id;
        this._StudentsInfoService
            .getSingleStdInfo(student_id, this.running_session)
            .subscribe(function (result) {
            if (result.status) {
                var singleStudentData = null;
                _this.singleStudentList = result.data;
                singleStudentData = _this.singleStudentList[0];
                _this.class_id = singleStudentData.class_id;
                _this.class_name = singleStudentData.class_name;
                _this.enroll_id = singleStudentData.enroll_id;
                _this.std_rollNum = singleStudentData.roll_num;
                _this.std_sectionId = singleStudentData.section_id;
                _this.section_name = singleStudentData.section_name;
                _this.std_address = singleStudentData.std_address;
                _this.std_dob = singleStudentData.std_dob;
                _this.std_email = singleStudentData.std_email;
                _this.std_gender = singleStudentData.std_gender;
                _this.std_id = singleStudentData.std_id;
                _this.std_name = singleStudentData.std_name;
                _this.std_parentId = singleStudentData.std_parentId;
                _this.std_phonenum = singleStudentData.std_phonenum;
                _this.std_prevSchool = singleStudentData.std_prevSchool;
                _this.std_username = singleStudentData.std_username;
                _this.year = singleStudentData.year;
                _this.parent_name = singleStudentData.parent_name;
                _this.parent_email = singleStudentData.parent_email;
                _this.parent_address = singleStudentData.parent_address;
                _this.parent_number = singleStudentData.parent_phoneNum;
                _this.relationship = singleStudentData.parent_relationship;
                if (singleStudentData.image_path !== '') {
                    _this.avatarImgSrc = singleStudentData.image_path;
                }
                _this.parent_profession = singleStudentData.parent_profession;
                _this.std_leavingReason = singleStudentData.leaving_reason;
            }
            else {
                console.log(result.msg);
            }
        });
    };
    // ********************************************************** **********/
    // ****************** Get student result against exam id ***************/
    // ******************************************************************* */
    StudentsComponent.prototype.get_stdResult = function (exam_id) {
        var _this = this;
        this.printButton = false;
        this.resultSummary = false;
        this.result_obtainedMarks = 0;
        this.result_totalMarks = 0;
        this.dbRespMsg = '';
        this.studentExamResult = [];
        this._StudentsInfoService
            .get_stdResultF(exam_id, this.selectedStd_id, this.running_session)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this.studentExamResult = result.data;
                if (_this.studentExamResult.length > 0) {
                    _this.printButton = true;
                }
                _this.resultSummary = true;
                _this.selected_exam = _this.studentExamResult[0].exam_name;
                // sum total marks of student
                _this.result_totalMarks = _this.studentExamResult.reduce(function (sum, item) { return sum + item.total_marks; }, 0);
                // sum obtained marks of student
                _this.result_obtainedMarks = _this.studentExamResult.reduce(function (sum, item) { return sum + item.obtained_marks; }, 0);
            }
            else if (result.status === 0) {
                _this.examResultStatus = true;
                _this._commonService.warningToaster('No data found', 'Failed!');
            }
            else {
                _this.examResultStatus = true;
                _this._commonService.errorToaster('Server error try again', 'Error!');
            }
        });
    };
    // ********************************************************** **********/
    // ****************** Get student fee histroy  ***************/
    // ******************************************************************* */
    StudentsComponent.prototype.getStudentFeeHistroy = function (student_id) {
        var _this = this;
        this.feedetailsPresent = false;
        this.studentFeeHistroyList = [];
        this._manageFeeInvoiceService
            .getStudentFeeHistroy(student_id, this.running_session)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this.studentFeeHistroyList = result.data;
            }
            else if (result.status === 0) {
                _this.feedetailsPresent = true;
            }
            else {
                _this._commonService.errorToaster(result.msg, 'Error!');
            }
        });
    };
    // add student
    // ********************************************************************** */
    // ************ Get Section Data Against Selected Class ***************** */
    // ********************************************************************* */
    StudentsComponent.prototype.getSectionByClassID = function (class_id) {
        var _this = this;
        // * disbale btn untill section selcted and empty section array when selected class change
        this.sectionsDataList = [];
        this.std_sectionId = null;
        this.disableBtn = true;
        this._sectionDataService.getSectionF(class_id).subscribe(function (result) {
            _this.sectionsDataList = result;
        });
    };
    // ********************************************************************* */
    // *********************** Get all parents data************************ */
    // ******************************************************************* */
    StudentsComponent.prototype.getParentData = function () {
        var _this = this;
        this._parentDataService.getParentsF().subscribe(function (result) {
            _this.parentsDataList = result;
            for (var x = 0; x < _this.parentsDataList.length; x++) {
                var objects = {};
                objects = {
                    id: _this.parentsDataList[x].parent_id,
                    text: _this.parentsDataList[x].parent_phoneNum
                };
                _this.teachersArray.push(objects);
            }
        });
    };
    // ***************************************************************************** **/
    // ******************* check userName already added event handler  ******************/
    // ********************************************************** *******************/
    StudentsComponent.prototype.isUserNameAdded = function (username) {
        var _this = this;
        this.checkUserName = false;
        var isUserPresent = 0;
        var userInfo = {
            user_name: username,
            table_name: 'tbl_students'
        };
        this._adminService.userNameExistCheckF(userInfo).subscribe(function (result) {
            _this.isUserPresentA = result;
            isUserPresent = _this.isUserPresentA[0].userName_present;
            if (isUserPresent) {
                _this.checkUserName = true;
            }
            else {
                _this.checkUserName = false;
            }
        });
    };
    // ***************************************************************************** **/
    // ******************* Filter Student By section  ******************/
    // ********************************************************** *******************/
    StudentsComponent.prototype.filterStudentBySection = function (section_name) {
        if (section_name !== 'all') {
            var filterBySection = this.allStudensDataList.filter(function (student) { return student.section_name === section_name; });
            this.studentsDataList = filterBySection;
        }
        else {
            this.studentsDataList = this.allStudensDataList;
        }
    };
    // *********************************************************************************************************************** */
    /*********************************************Write , Update , Delate Data  Methods************************************** */
    // *********************************************************************************************************************** */
    // ************************************************************************* */
    // ******************* update students event handler function ****************/
    // ********************************************************************** ***/
    StudentsComponent.prototype.onSubmitupdateStd = function (updateEvent) {
        var _this = this;
        // get student image
        var imagesData = new FormData();
        var files = this.filesToUpload;
        if (files.length >= 1) {
            this.uploadImage = true;
        }
        for (var i = 0; i < files.length; i++) {
            imagesData.append('uploads[]', files[i], files[i]['name']);
        }
        var updateData = updateEvent.value;
        var std_parentId = updateData.std_parentId;
        var std_sectionId = updateData.std_sectionId;
        var std_id = updateData.std_id;
        var class_id = Number(updateData.class_id);
        if (std_parentId === 'undefined') {
            std_parentId = this.std_parentId;
        }
        if (std_sectionId === 'undefined') {
            std_sectionId = this.std_sectionId;
        }
        // update info against tbl_students
        var updateStdData = {
            std_address: updateData.std_address,
            std_dob: updateData.std_dob,
            std_email: updateData.std_email,
            std_gender: updateData.std_gender,
            std_name: updateData.std_name,
            std_parentId: Number(std_parentId),
            std_phonenum: Number(updateData.std_phonenum),
            std_prevSchool: updateData.std_prevSchool,
            parent_relationship: updateData.u_parent_relationship,
            std_leavingReason: updateData.std_leavingReason
        };
        // update info against tbl_enroll
        // let updateEnrollInfo = {
        //   std_sectionId: Number(std_sectionId),
        //   enroll_id: updateData.enroll_id
        // };
        this._StudentsInfoService
            .updateStdInfo(std_id, updateStdData)
            .subscribe(function (result) {
            if (result.status) {
                var id = JSON.stringify(updateData.std_id);
                imagesData.append('id', id); // std id
                imagesData.append('tbl_name', 'tbl_students'); //
                imagesData.append('source', 'student');
                // this.myInputVariable.nativeElement.value = "";
                // add student images
                if (_this.uploadImage === true) {
                    _this._commonService.add_images(imagesData).subscribe(function (respresult) {
                        _this.filesToUpload = [];
                        _this.getStudentsByClassID(class_id);
                    });
                }
                _this._commonService.successToaster('Updated Successfully', 'Success!');
                _this.getStudentsByClassID(class_id);
                _this.closeModal();
                // update info in enroll tbl  is section update on then uncomment
                // this._StudentsInfoService
                //   .updateStdEnrollInfo(std_id, updateEnrollInfo)
                //   .subscribe(result => {
                //     if (result.status == 1) {
                //       swal({
                //         type: "success",
                //         title: "Updated successfully",
                //         showConfirmButton: false,
                //         timer: 2000
                //       });
                //       // call function to reload students data
                //       this.getStudentsByClassID(class_id);
                //     } else {
                //       swal("Failed!", result.msg, "error");
                //     }
                //   });
            }
            else {
                _this._commonService.errorToaster(result.msg, 'Error!');
            }
        });
    };
    // ************************************************************************************************************* */
    /********************************************* Validate and Store Images in Array******************************** */
    // ************************************************************************************************************* */
    StudentsComponent.prototype.fileChangeEvent = function (fileInput) {
        var filedata = fileInput.target.files;
        // this.product.photo = fileInput.target.files[0]['name'];
        if (!this._commonService.validateFile(filedata[0].name)) {
            this.imgValidation = false;
            this.uploadImage = false;
        }
        else {
            this.filesToUpload = filedata;
            this.imgValidation = true;
        }
    };
    // ********************************************************************************* */
    // ******************* OnClick delete student event handler function *****************/
    // ***********************************************************************************/
    StudentsComponent.prototype.onClickdeleteStudent = function (std_id, class_id) {
        var _this = this;
        sweetalert2__WEBPACK_IMPORTED_MODULE_7___default()({
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
                _this._StudentsInfoService.deleteStudent(std_id).subscribe(function (data) {
                    if (data.status) {
                        _this.getStudentsByClassID(class_id); // load students data after deleting data
                        // show deleted notification
                        _this._commonService.successToaster('Deleted Successfully', 'Success!');
                    }
                    else {
                        _this._commonService.errorToaster(data.msg, 'Error!');
                    }
                });
            }
        });
    };
    // add student
    // **************************************************************** */
    // ******************* Add new students event handler  ******************/
    // ***************************************************************** */
    StudentsComponent.prototype.onSubmitAddStd = function (submitEvent) {
        var _this = this;
        // get student image
        var imagesData = new FormData();
        var files = this.filesToUpload;
        if (files.length >= 1) {
            this.uploadImage = true;
        }
        for (var i = 0; i < files.length; i++) {
            imagesData.append('uploads[]', files[i], files[i]['name']);
        }
        var submitedAddStd = submitEvent.value;
        var newStudData = {
            phone_number: submitedAddStd.stud_phone_number,
            std_address: submitedAddStd.stud_address,
            std_dob: submitedAddStd.stud_dob,
            std_email: submitedAddStd.stud_email,
            std_enrollDate: submitedAddStd.stud_enrollDate,
            std_gender: submitedAddStd.stud_gender,
            std_leavingReason: submitedAddStd.stud_leavingReason,
            std_name: submitedAddStd.stud_name,
            std_parentId: this.stud_parentId,
            std_prevSchool: submitedAddStd.stud_prevSchool,
            parent_relationship: submitedAddStd.parent_relationship
        };
        this._StudentsInfoService.addStudentF(newStudData).subscribe(function (result) {
            if (result.status) {
                _this.verify_parent_msg = '';
                if (_this.uploadImage === true) {
                    var id = JSON.stringify(result.student_id);
                    imagesData.append('id', id); // std id
                    imagesData.append('tbl_name', 'tbl_students'); //
                    imagesData.append('source', 'student');
                    // this.myInputVariable.nativeElement.value = "";
                    // add student images
                    _this._commonService.add_images(imagesData).subscribe(function (res_result) {
                        _this.filesToUpload = [];
                        _this.getStudentsByClassID(submitedAddStd.stud_classId);
                    });
                }
                // if student info added then enroll student against class and section year
                var newEnrollData = {
                    student_id: result.student_id,
                    enroll_session: _this.defaultsession,
                    std_classId: submitedAddStd.stud_classId,
                    std_sectionId: submitedAddStd.stud_sectionId,
                    std_rollNum: Math.floor(Math.random() * 90000) + 10000,
                    std_enrollDate: submitedAddStd.stud_enrollDate
                };
                _this._StudentsInfoService
                    .enrollStudentF(newEnrollData) // enroll student
                    .subscribe(function (resp_result) {
                    if (resp_result.status === 1) {
                        _this._commonService.successToaster('Added Successfully', 'Success!');
                        submitEvent.reset(); // reset form after submission
                        _this.getStudentsByClassID(submitedAddStd.stud_classId);
                        _this.closeModal();
                    }
                    else {
                        _this._commonService.errorToaster(resp_result.msg, 'Failed!');
                    }
                });
            }
            else {
                _this._commonService.errorToaster(result.msg, 'Error!');
            }
        });
    };
    // *********************************************************************************************************************** */
    /*********************************************General   Methods************************************** */
    // *********************************************************************************************************************** */
    StudentsComponent.prototype.verifyParentPhoneNum = function (parentNumber) {
        var _this = this;
        if (typeof parentNumber === 'undefined') {
            this.verify_parent_msg = 'Number Required';
            this.alert_color = 'red';
        }
        else {
            var verify_number = {
                parent_number: parentNumber
            };
            this.verify_parent = false;
            this.stud_parentId = 0;
            this.verified_parent_name = '';
            this.verify_parent_msg = '';
            this.alert_color = 'red';
            // verify parent phone number while adding new student
            this._StudentsInfoService
                .verifyParentF(verify_number) // enroll student
                .subscribe(function (result) {
                if (result.status === 1) {
                    _this.verify_parent = true;
                    _this.stud_parentId = result.data[0].parent_id;
                    _this.verified_parent_name = result.data[0].parent_name;
                    _this.verify_parent_msg =
                        'Parent Verified as ' + _this.verified_parent_name;
                    _this.alert_color = 'green';
                }
                else {
                    _this.verify_parent = false;
                    _this.stud_parentId = 0;
                    _this.verified_parent_name = '';
                    _this.verify_parent_msg = 'Invalid Phone Number';
                    _this.alert_color = 'red';
                    _this.showAddParentOption = true;
                }
            });
        }
    };
    // *** get sections against class for dropdown
    StudentsComponent.prototype.classSelected = function (class_id) {
        this.getSectionByClassID(class_id);
    };
    // enable manage attendance btn when section isnt empty
    StudentsComponent.prototype.enableBtn = function () {
        this.disableBtn = false;
    };
    // new modal
    StudentsComponent.prototype.openNgModal = function (content) {
        this.modalService.open(content, { size: 'lg' });
    };
    // get exam id
    StudentsComponent.prototype.submitExamIdF = function (submitEvent) {
        var exam_id = submitEvent.value.exam;
        this.get_stdResult(exam_id);
    };
    // open model for edit student data
    StudentsComponent.prototype.openEditStudModal = function (modal, student_id, class_id) {
        // call method to get singal Student data for updating
        this.getSingleStudentData(student_id, class_id);
        this.openNgModal(modal);
    };
    // open model for  student Profile data
    StudentsComponent.prototype.openProfileStudModal = function (modal, student_id, class_id) {
        this.printButton = false;
        // call method to get singal Student data for updating
        this.getSingleStudentData(student_id, class_id);
        this.getStudentFeeHistroy(student_id);
        this.openModal(modal);
        // clear the previous data
        this.studentExamResult = [];
        this.resultSummary = false;
    };
    // close model
    StudentsComponent.prototype.closeModal = function () {
        this.modalService.dismissAll();
    };
    StudentsComponent.prototype.goToParentRoute = function () {
        this._router.navigate(['/pages/parents']);
    };
    /********************************* pagination Info ****************************/
    StudentsComponent.prototype.pageChanged = function (pN) {
        this.pageNumber = pN;
    };
    StudentsComponent.prototype.openModal = function (modal) {
        // modal.open();
        this.openNgModal(modal);
    };
    StudentsComponent.prototype.filterByValue = function (array, string) {
        return array.filter(function (o) {
            return Object.keys(o).some(function (k) { return o[k].toLowerCase().includes(string.toLowerCase()); });
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('imageFile'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], StudentsComponent.prototype, "myInputVariable", void 0);
    StudentsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-students',
            template: __webpack_require__(/*! ./students.component.html */ "./src/app/students/students.component.html"),
            styles: [__webpack_require__(/*! ./students.component.scss */ "./src/app/students/students.component.scss")],
            providers: [
                _student_information_service__WEBPACK_IMPORTED_MODULE_1__["StudentsInfoService"],
                _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_4__["ClassDataService"],
                _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_3__["SectionDataService"],
                _parents_parents_service__WEBPACK_IMPORTED_MODULE_2__["ParentsDataService"],
                _shared_services_common_service__WEBPACK_IMPORTED_MODULE_11__["CommonService"],
                _admin_service__WEBPACK_IMPORTED_MODULE_8__["AdminService"],
                _manage_fee_invoice_manage_fee_invoice_service__WEBPACK_IMPORTED_MODULE_9__["ManageFeeInvoiceService"],
                _exams_add_exams_service__WEBPACK_IMPORTED_MODULE_10__["AddExamsService"]
            ]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            _student_information_service__WEBPACK_IMPORTED_MODULE_1__["StudentsInfoService"],
            _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_4__["ClassDataService"],
            _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_3__["SectionDataService"],
            _parents_parents_service__WEBPACK_IMPORTED_MODULE_2__["ParentsDataService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModal"],
            _admin_service__WEBPACK_IMPORTED_MODULE_8__["AdminService"],
            _exams_add_exams_service__WEBPACK_IMPORTED_MODULE_10__["AddExamsService"],
            _manage_fee_invoice_manage_fee_invoice_service__WEBPACK_IMPORTED_MODULE_9__["ManageFeeInvoiceService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
            _shared_services_common_service__WEBPACK_IMPORTED_MODULE_11__["CommonService"]])
    ], StudentsComponent);
    return StudentsComponent;
}());



/***/ }),

/***/ "./src/app/students/students.module.ts":
/*!*********************************************!*\
  !*** ./src/app/students/students.module.ts ***!
  \*********************************************/
/*! exports provided: StudentsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentsModule", function() { return StudentsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _students_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./students.routing */ "./src/app/students/students.routing.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng2-select */ "./node_modules/ng2-select/index.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ng2_select__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-modal */ "./node_modules/ngx-modal/index.js");
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ngx_modal__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _search_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./search.pipe */ "./src/app/students/search.pipe.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _students_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./students.component */ "./src/app/students/students.component.ts");
/* harmony import */ var ngx_print__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-print */ "./node_modules/ngx-print/fesm5/ngx-print.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











/* components */


var StudentsModule = /** @class */ (function () {
    function StudentsModule() {
    }
    StudentsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                ng2_search_filter__WEBPACK_IMPORTED_MODULE_9__["Ng2SearchPipeModule"],
                ngx_print__WEBPACK_IMPORTED_MODULE_12__["NgxPrintModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_4__["NgxPaginationModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ReactiveFormsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__["NgbModule"],
                ng2_select__WEBPACK_IMPORTED_MODULE_5__["SelectModule"],
                ngx_modal__WEBPACK_IMPORTED_MODULE_6__["ModalModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_3__["HttpModule"],
                _students_routing__WEBPACK_IMPORTED_MODULE_2__["routing"]
            ],
            declarations: [_students_component__WEBPACK_IMPORTED_MODULE_11__["StudentsComponent"], _search_pipe__WEBPACK_IMPORTED_MODULE_7__["SearchPipe"]]
        })
    ], StudentsModule);
    return StudentsModule;
}());



/***/ }),

/***/ "./src/app/students/students.routing.ts":
/*!**********************************************!*\
  !*** ./src/app/students/students.routing.ts ***!
  \**********************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _students_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./students.component */ "./src/app/students/students.component.ts");


var childRoutes = [
    {
        path: "",
        component: _students_component__WEBPACK_IMPORTED_MODULE_1__["StudentsComponent"]
    }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(childRoutes);


/***/ })

}]);
//# sourceMappingURL=students-students-module.js.map