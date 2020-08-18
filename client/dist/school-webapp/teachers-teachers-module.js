(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["teachers-teachers-module"],{

/***/ "./src/app/teachers/search.pipe.ts":
/*!*****************************************!*\
  !*** ./src/app/teachers/search.pipe.ts ***!
  \*****************************************/
/*! exports provided: TeachersSearchPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeachersSearchPipe", function() { return TeachersSearchPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TeachersSearchPipe = /** @class */ (function () {
    // search by teacher phone num or cnic
    function TeachersSearchPipe() {
    }
    TeachersSearchPipe.prototype.transform = function (items, filterdata) {
        if (!items) {
            return [];
        }
        if (!filterdata) {
            return items;
        }
        filterdata = filterdata.toString();
        return items.filter(function (searchValue) {
            var rVal = JSON.stringify(searchValue.phone_num).includes(filterdata) ||
                JSON.stringify(searchValue.teacher_cnic).includes(filterdata);
            return rVal;
        });
    };
    TeachersSearchPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'filter'
        })
        // search by teacher phone num or cnic
    ], TeachersSearchPipe);
    return TeachersSearchPipe;
}());



/***/ }),

/***/ "./src/app/teachers/teachers.component.html":
/*!**************************************************!*\
  !*** ./src/app/teachers/teachers.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n\r\n  <div class=\"col-lg-12 grid-margin stretch-card\">\r\n    <div class=\"card\">\r\n      <div class=\"card-body\">\r\n        <h4 class=\"card-title\">Teachers Details</h4>\r\n\r\n\r\n        <div class=\"row\" style=\"margin-top: 1em; margin-bottom: 0em; padding-bottom: 1em; padding-top: 1em;\">\r\n          <div class=\"col-lg-4  \">\r\n            <input class=\"form-control fm-control\" [(ngModel)]=\"searchText\" (keyup)=searchFromDb(search.value) #search\r\n              placeholder=\"CNIC / Phone Number\">\r\n          </div>\r\n\r\n          <div class=\"col-lg-5  \">\r\n\r\n          </div>\r\n\r\n          <div class=\"col-lg-3 pull-right \" style=\"padding-bottom: 1.5em;\">\r\n\r\n            <button _ngcontent-c2=\"\" (click)=\"openNgModal(AddTeacherModal)\" class=\"btn btn-success btn-block\">New\r\n              Teacher\r\n              <i _ngcontent-c2=\"\" class=\"mdi mdi-plus\"></i></button>\r\n          </div>\r\n        </div>\r\n\r\n\r\n        <div class=\"table-responsive\">\r\n          <table class=\"table table-bordered\">\r\n            <thead class=\"thead-light\">\r\n              <tr>\r\n                <th># </th>\r\n                <th>Teacher</th>\r\n                <th>Name </th>\r\n                <th>Email </th>\r\n                <th>CNIC </th>\r\n                <!-- <th>Designation </th> -->\r\n                <th>Phone Number </th>\r\n\r\n                <!-- <th>Qualification</th> -->\r\n\r\n                <!-- <th>Experience</th> -->\r\n                <th *ngIf=\"(admin_level == 1)\">Actions</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr\r\n                *ngFor=\"let item of teachersDataList | filter : searchText  | paginate: { id: 'pager', itemsPerPage: pageSize,  totalItems: totalTeachers, currentPage: pageNumber};let index = index\">\r\n                <td>{{index + 1}} </td>\r\n                <td> <img [src]=\"item.thumb_path == null ?  placeholderPath : imageBaseUrl  + item.thumb_path\"\r\n                    class=\"rounded-circle dropdown-toggle\" width=\"30px\" data-toggle=\"dropdown\" alt=\"avatar\"\r\n                    style=\" border-radius: 50%;\">\r\n\r\n\r\n\r\n                </td>\r\n                <td>{{item.teacher_name}}</td>\r\n                <td>{{item.email}}</td>\r\n                <td> {{item.teacher_cnic}}</td>\r\n\r\n                <!-- <td>{{item.teacher_desig}}</td> -->\r\n                <td>{{item.phone_num}}</td>\r\n\r\n                <!-- <td>{{item.teacher_qual}}</td> -->\r\n\r\n                <!-- <td>{{item.experience}} </td> -->\r\n\r\n                <td *ngIf=\"(admin_level == 1)\">\r\n\r\n\r\n                  <label class=\"badge badge-info\" (click)=\"openEditTeachModal(updateTeacherModal,item.teacher_id, index)\"\r\n                    style=\"cursor: pointer;\">Edit</label>\r\n                  <label class=\"badge badge-danger\" (click)=deleteTeacher(item.teacher_id)\r\n                    style=\"cursor: pointer; margin-left: 1em;\">Delete\r\n                  </label>\r\n                  \r\n                  <label class=\"badge badge-primary\" style=\"cursor: pointer; margin-left: 1em;\" (click)=\"openProfileTeacherModal(teacherProfileModel,item.teacher_id, index)\">Profile</label>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n\r\n          <div style=\"text-align: center ; margin-top: 2em;\">\r\n            <form class=\"pagination-wrapper\">\r\n              <div class=\"form-group pages\">\r\n                <pagination-controls class=\"my-pagination\" id=\"pager\" (pageChange)=\"pageChanged($event)\" maxSize=\"10\"\r\n                  directionLinks=\"true\" autoHide=\"true\" previousLabel=\"Prev\" nextLabel=\"Next\"\r\n                  screenReaderPaginationLabel=\"Pagination\" screenReaderPageLabel=\"page\"\r\n                  screenReaderCurrentLabel=\"You're on page\">\r\n                </pagination-controls>\r\n              </div>\r\n\r\n            </form>\r\n          </div>\r\n\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n\r\n\r\n<!-- add teacher modal  -->\r\n\r\n\r\n<ng-template #AddTeacherModal let-modal>\r\n  <div class=\"modal-header\">\r\n    <div style=\"text-align: center\">\r\n      <h3>Add Teacher Information</h3>\r\n    </div>\r\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n  </div>\r\n    <form class=\"form-group\" #addteacher=\"ngForm\" (ngSubmit)=\"onSubmitAddTeacher(addteacher)\">\r\n  <div class=\"modal-body\">\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:.5em;\">Name * <span style=\"color:red;\"\r\n              *ngIf=\"!pickedTname.valid && pickedTname.touched\"><small>\r\n                Teacher Name Required</small> </span></label>\r\n          <input type=\"text\" required style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"t_name\"\r\n            placeholder=\"Teacher Name\" [(ngModel)]=\"t_name\" #pickedTname=\"ngModel\">\r\n\r\n        </div>\r\n\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:.5em;\"> Email\r\n                    <span style=\"color:red;\" *ngIf=\"checkEmail\"><small style=\"margin-left: 1em;\"> Email is\r\n                already in use</small></span>\r\n\r\n                </label>\r\n          <input type=\"text\"  style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"t_email\"\r\n            (keyup)=check_emailUniqueF(this.t_email) placeholder=\"Teacher Email\" [(ngModel)]=\"t_email\"\r\n            #pickedEmail=\"ngModel\">\r\n        </div>\r\n\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:.5em;\">Phone Number * <span style=\"color:red;\"\r\n              *ngIf=\"!pickedPhoneNum.valid && pickedPhoneNum.touched\"><small>\r\n                Email Required</small> </span></label>\r\n          <span style=\"color:red;\" *ngIf=\"phone_check\"><small style=\"margin-left: 1em;\"> Number is\r\n              already in use</small></span>\r\n          <input type=\"number\" style=\"margin-top:0em;\" required class=\"form-control fm-control\" name=\"t_phone_num\"\r\n            (keyup)=setUserName(this.t_phone_num) placeholder=\"Phone Number\" [(ngModel)]=\"t_phone_num\"\r\n            #pickedPhoneNum=\"ngModel\">\r\n        </div>\r\n\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:.5em;\">User Name\r\n            <span style=\"color:red;\" *ngIf=\"checkUserName\"><small style=\"margin-left: 1em;\"> UserName is\r\n                already in use</small></span>\r\n          </label>\r\n          <input type=\"text\" readonly style=\"margin-top:0em;\" required class=\"form-control fm-control\" name=\"t_username\"\r\n            (keyup)=isUserNameAdded(this.t_username) placeholder=\"User Name\" [(ngModel)]=\"t_username\"\r\n            #pickedUserName=\"ngModel\">\r\n        </div>\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:.5em;\">Password * <span style=\"color:red;\"\r\n              *ngIf=\"!pickedPassw.valid && pickedPassw.touched\"><small>\r\n                Password Required</small> </span></label>\r\n          <input type=\"text\" style=\"margin-top:0em;\" readonly class=\"form-control fm-control\" required name=\"t_password\"\r\n            placeholder=\"Password\" [(ngModel)]=\"t_password\" #pickedPassw=\"ngModel\">\r\n        </div>\r\n\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:.5em;\">NIC * <span style=\"color:red;\"\r\n              *ngIf=\"!pickedNIC.valid && pickedNIC.touched\"><small>\r\n                Required</small> </span></label>\r\n          <span style=\"color:red;\" *ngIf=\"cnic_check\"><small style=\"margin-left: 1em;\"> CNIC is\r\n              already in use</small></span>\r\n          <input type=\"number\" style=\"margin-top:0em;\" (keyup)=\"check_cnicUniqueF(this.teacher_nic)\"\r\n            class=\"form-control fm-control\" required name=\"teacher_nic\" placeholder=\"71502425XXXXXX\"\r\n            [(ngModel)]=\"teacher_nic\" #pickedNIC=\"ngModel\">\r\n        </div>\r\n\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:.5em;\">Qulification</label>\r\n          <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"t_qualification\"\r\n            placeholder=\"Qulification\" ngModel>\r\n        </div>\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:.5em;\">Designation</label>\r\n          <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"t_desig\"\r\n            placeholder=\"Designation\" ngModel>\r\n        </div>\r\n\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:.5em;\">Salary</label>\r\n          <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"t_salary\"\r\n            placeholder=\"Salary\" ngModel>\r\n        </div>\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:.5em;\">Experience <small style=\"color:blue;\"> ( Years\r\n              ) </small></label>\r\n          <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"t_experience\"\r\n            placeholder=\"Experience\" ngModel>\r\n        </div>\r\n\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:.5em;\">Gender </label>\r\n          <select class=\"form-control fm-control\" style=\"margin-top:0em;\" [(ngModel)]=\"t_gender\" name=\"t_gender\">\r\n            <option [ngValue]=\"undefined\" disabled>Select Gender</option>\r\n            <option value=\"male\">Male</option>\r\n            <option value=\"female\">Female</option>\r\n          </select>\r\n        </div>\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:.5em;\">Date Of Birth</label>\r\n          <input type=\"date\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"t_dob\" ngModel>\r\n        </div>\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:.5em;\">Image</label>\r\n          <input id=\"teacher_image\" style=\"margin-top:0em;\" #imageFile accept=\"image/*\" name=\"teacher_image\" type=\"file\"\r\n            (change)=\"fileChangeEvent($event)\" class=\"form-control fm-control\" placeholder=\"Upload a picture...\" />\r\n        </div>\r\n\r\n        <div class=\"col-md-8 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:.5em;\">Address</label>\r\n          <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"t_address\"\r\n            placeholder=\"Teacher Address\" ngModel>\r\n        </div>\r\n            <div class=\"col-md-12 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:.5em;\">Teacher Description</label>\r\n          <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"t_desc\"\r\n            placeholder=\"teacher Description\" ngModel>\r\n        </div>\r\n\r\n\r\n      </div>\r\n\r\n\r\n  </div>\r\n  <div class=\"modal-footer\">\r\n     <input type=\"submit\" class=\"btn btn-info\"\r\n            [disabled]=\"!addteacher.form.valid || checkUserName || checkCnic || checkPhone || checkEmail\"\r\n            value=\"Add Teacher\">\r\n    <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n  </div>\r\n      </form>\r\n</ng-template>\r\n\r\n\r\n<!-- View Teacher -->\r\n\r\n<ng-template #teacherProfileModel let-modal>\r\n  <div class=\"modal-header\">\r\n    <div style=\"text-align: center\">\r\n      <h3>Teacher Details</h3>\r\n    </div>\r\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n  </div>\r\n   <form class=\"form-group\" #updateTeacher=\"ngForm\" (ngSubmit)=\"onSubmitUpdateTeacher(updateTeacher)\">\r\n  <div class=\"modal-body\">\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Name: {{ teacher_name }}</label>\r\n                \r\n          \r\n        </div>\r\n\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\"> Email: {{ email }}\r\n          </label>\r\n        </div>\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Phone Number: {{ phone_num }}\r\n          </label>\r\n        </div>\r\n\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">CNIC: {{ t_cnic }}\r\n          </label>\r\n        </div>\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Qulification: {{ teacher_qual }}</label>\r\n        </div>\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Designation: {{ teacher_desig }}</label>\r\n        </div>\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Salary: {{ teacher_salary }}</label>\r\n        </div>\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Experience: {{ experience }}</label>\r\n        </div>\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Gender: {{ gender }} </label>\r\n        </div>\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Date Of Birth: {{ dob }}</label>\r\n        </div>\r\n\r\n        <!--<div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Image</label>  \r\n        </div>-->\r\n\r\n        <div class=\"col-md-6 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Address: {{ address }}</label>\r\n        </div>\r\n             <div class=\"col-md-6 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Teacher Description: {{ tDesc }}</label>\r\n        </div>\r\n\r\n      </div>\r\n\r\n\r\n  </div>\r\n  <div class=\"modal-footer\">\r\n    <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n  </div>\r\n   </form>\r\n</ng-template>\r\n\r\n<!-- Update Teacher  -->\r\n\r\n\r\n\r\n<ng-template #updateTeacherModal let-modal>\r\n  <div class=\"modal-header\">\r\n    <div style=\"text-align: center\">\r\n      <h3>Update Teacher</h3>\r\n    </div>\r\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n  </div>\r\n   <form class=\"form-group\" #updateTeacher=\"ngForm\" (ngSubmit)=\"onSubmitUpdateTeacher(updateTeacher)\">\r\n  <div class=\"modal-body\">\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Name * <span style=\"color:red;\"\r\n              *ngIf=\"!pickedTUname.valid && pickedTUname.touched\"><small>\r\n                Teacher Name Required</small> </span></label>\r\n          <input type=\"text\" required style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"teacher_name\"\r\n            placeholder=\"Teacher Name\" [(ngModel)]=\"teacher_name\" #pickedTUname=\"ngModel\">\r\n        </div>\r\n\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\"> Email\r\n\r\n            <span style=\"color:red;\"> <small>\r\n                {{emailNotUnique}}</small> </span>\r\n          </label>\r\n          <input type=\"text\" rquired style=\"margin-top:0em;\"\r\n            (keyup)=\"checkUniqueOnUpdate('t_email' , pickedUEmail.value )\" class=\"form-control fm-control\" name=\"email\"\r\n            placeholder=\"Teacher Email\" [(ngModel)]=\"email\" #pickedUEmail=\"ngModel\">\r\n        </div>\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Phone Number * <span style=\"color:red;\"\r\n              *ngIf=\"!pickedPhoneNum.valid && pickedPhoneNum.touched\"><small>\r\n                Email Required</small> </span>\r\n            <span style=\"color:red;\"> <small>\r\n                {{phoneNumNotUnique}}</small> </span>\r\n          </label>\r\n          <input type=\"text\" style=\"margin-top:0em;\" required\r\n            (keyup)=\"checkUniqueOnUpdate('t_phonenum' , pickedPhoneNum.value )\" class=\"form-control fm-control\"\r\n            name=\"phone_num\" placeholder=\"Phone Number\" [(ngModel)]=\"phone_num\" #pickedPhoneNum=\"ngModel\">\r\n        </div>\r\n\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">CNIC * <span style=\"color:red;\"\r\n              *ngIf=\"!pickedCNIC.valid && pickedCNIC.touched\"><small>\r\n                CNIC Required</small> </span>\r\n            <span style=\"color:red;\"> <small>\r\n                {{cnicNotUnique}}</small> </span>\r\n          </label>\r\n          <input type=\"text\" style=\"margin-top:0em;\" required\r\n            (keyup)=\"checkUniqueOnUpdate('t_cnic' , pickedCNIC.value )\" class=\"form-control fm-control\" name=\"t_cnic\"\r\n            placeholder=\"CNIC\" [(ngModel)]=\"t_cnic\" #pickedCNIC=\"ngModel\">\r\n        </div>\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Password <small> ( Left empty if you dont want to change. ) </small></label>\r\n          <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"teacher_password\"\r\n            placeholder=\"Password\" [(ngModel)]=\"teacher_password\">\r\n        </div>\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Qulification</label>\r\n          <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"teacher_qual\"\r\n            placeholder=\"Qulification\" [(ngModel)]=\"teacher_qual\">\r\n        </div>\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Designation</label>\r\n          <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"teacher_desig\"\r\n            placeholder=\"Designation\" [(ngModel)]=\"teacher_desig\">\r\n        </div>\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Salary</label>\r\n          <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"teacher_salary\"\r\n            [(ngModel)]=\"teacher_salary\">\r\n        </div>\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Experience <small style=\"color:blue;\"> ( Years )\r\n            </small></label>\r\n          <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"experience\"\r\n            [(ngModel)]=\"experience\">\r\n        </div>\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Gender </label>\r\n          <select class=\"form-control fm-control\" style=\"margin-top:0em;\" [(ngModel)]=\"gender\" name=\"gender\">\r\n\r\n            <option value=\"male\">Male</option>\r\n            <option value=\"female\">Female</option>\r\n          </select>\r\n        </div>\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Date Of Birth</label>\r\n          <input type=\"date\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"dob\" [(ngModel)]=\"dob\">\r\n        </div>\r\n\r\n        <div class=\"col-md-4 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Image</label>  <span *ngIf=\"!imgValidation\" style=\"color:red;margin-left: 1em;\"> <small> Invalid Image Type </small> </span>\r\n          <input id=\"uteacher_image\" style=\"margin-top:0em;\" #imageFile accept=\"image/*\" name=\"uteacher_image\"\r\n            type=\"file\" (change)=\"fileChangeEvent($event)\" class=\"form-control fm-control\" placeholder=\"Select\" />\r\n        </div>\r\n\r\n        <div class=\"col-md-6 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Address</label>\r\n          <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"address\"\r\n            placeholder=\"Teacher Address\" [(ngModel)]=\"address\">\r\n        </div>\r\n             <div class=\"col-md-6 form-group\">\r\n          <label class=\"control-label\" style=\"margin-top:0em;\">Teacher Description</label>\r\n          <input type=\"text\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"  tDesc\"\r\n            placeholder=\"Teacher Description\" [(ngModel)]=\"  tDesc\">\r\n        </div>\r\n\r\n\r\n        <input type=\"hidden\" style=\"margin-top:0em;\" class=\"form-control fm-control\" name=\"teacher_id\"\r\n          [(ngModel)]=\"teacher_id\">\r\n\r\n      </div>\r\n\r\n\r\n  </div>\r\n  <div class=\"modal-footer\">\r\n       <input type=\"submit\" class=\"btn btn-info\"  [disabled]=\"!updateTeacher.form.valid\"\r\n            value=\"Update\">\r\n    <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Close</button>\r\n  </div>\r\n   </form>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./src/app/teachers/teachers.component.scss":
/*!**************************************************!*\
  !*** ./src/app/teachers/teachers.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/teachers/teachers.component.ts":
/*!************************************************!*\
  !*** ./src/app/teachers/teachers.component.ts ***!
  \************************************************/
/*! exports provided: TeachersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeachersComponent", function() { return TeachersComponent; });
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../shared/services/global.service */ "./src/app/shared/services/global.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ts_md5_dist_md5__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ts-md5/dist/md5 */ "./node_modules/ts-md5/dist/md5.js");
/* harmony import */ var ts_md5_dist_md5__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ts_md5_dist_md5__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _teachers_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./teachers.service */ "./src/app/teachers/teachers.service.ts");
/* harmony import */ var _admin_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../admin.service */ "./src/app/admin.service.ts");
/* harmony import */ var _shared_services_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/services/common.service */ "./src/app/shared/services/common.service.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _index_index_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../index/index.service */ "./src/app/index/index.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




 // service for calling Node API's






var TeachersComponent = /** @class */ (function () {
    // creating object of TeachersDataService class to call methods  => 'this is called dependency injection'
    function TeachersComponent(_teachersDataService, _adminService, _commonService, http, el, _dashboardService, modalService, _globalService) {
        this._teachersDataService = _teachersDataService;
        this._adminService = _adminService;
        this._commonService = _commonService;
        this.http = http;
        this.el = el;
        this._dashboardService = _dashboardService;
        this.modalService = modalService;
        this._globalService = _globalService;
        this.filesToUpload = [];
        // default variables
        this.pageSize = 10;
        this.pageNumber = 1;
        this.offset = 0;
        this.imgValidation = true;
        this.jwt = null;
        this.uploadImage = false;
        this.running_session = localStorage.getItem('running_session');
        this.placeholderPath = 'assets/images/teacherplaceholder.png';
        // notifications
        this.successNotification = 0;
        this.updateSuccessNotifi = 0;
        this.checkUserName = false;
        this.checkCnic = false;
        this.checkPhone = false;
        this.checkEmail = false;
        this.cnic_check = false;
        this.phone_check = false;
        this.email_check = false;
        this.teacher_id = 0;
        this.teacher_name = '';
        this.teacher_qual = '';
        this.teacher_desig = '';
        this.gender = '';
        this.dob = '';
        this.phone_num = '';
        this.email = '';
        this.address = '';
        this.teacher_password = '';
        this.existing_email = '';
        this.emailNotUnique = '';
        this.cnicNotUnique = '';
        this.phoneNumNotUnique = '';
        this.updateBtnDisable = false;
    }
    // ********************* auto run the function on page load *******************//
    TeachersComponent.prototype.ngOnInit = function () {
        this.admin_level = localStorage.getItem('admin_level');
        this.imageBaseUrl =
            this._teachersDataService.imagesBaseServer + 'profile_images/thumbs/';
        // call API to get teachers data when user load the app
        // this.getTeachersData();
        this.getTeachersWithPagination(this.offset); // with pagination
        this.get_totalTeachers(); // count teachers
    };
    // ********************************************************************************************************************** */
    /**********************************************************Read Data from DB Methods************************************** */
    // *********************************************************************************************************************** */
    // ********************************************************************* */
    // *********************** Get all teachers data************************ */
    // ******************************************************************* */
    TeachersComponent.prototype.getTeachersData = function () {
        var _this = this;
        this._teachersDataService.getTeachersF().subscribe(function (result) {
            _this.teachersDataList = result;
        });
    };
    // ********************************************************************* */
    // ************** Get all teachers with pagination data******************* */
    // ******************************************************************* */
    TeachersComponent.prototype.getTeachersWithPagination = function (offset) {
        var _this = this;
        var pagination_data = {
            itemsPerPage: this.pageSize,
            offset: offset
        };
        this._teachersDataService
            .getTeachersWithPaginationF(pagination_data)
            .subscribe(function (result) {
            _this.teachersDataList = result.data;
        });
    };
    // ********************************************************************* */
    // *********************** Get Number of Teachers************************ */
    // ******************************************************************* */
    TeachersComponent.prototype.get_totalTeachers = function () {
        var _this = this;
        var count_type = 'teachers';
        this._dashboardService
            .get_totalStudentsF(count_type, this.running_session)
            .subscribe(function (result) {
            if (result.status === 1) {
                _this.totalTeachers = result.data[0].count_total;
            }
            else if (result.status === 0) {
                _this.totalTeachersN = 'No Teachers Added ';
            }
            else {
                console.log(result);
            }
        });
    };
    // *************************************************************************** */
    // ********************** Get single teacher data ****************************** */
    // **************************************************************************** */
    TeachersComponent.prototype.getSingleTeacherData = function (index) {
        this.imgValidation = true;
        var singleTeacher = null;
        // get the response data in array singleTeacherData
        singleTeacher = this.teachersDataList[index];
        this.teacher_id = singleTeacher.teacher_id;
        this.teacher_name = singleTeacher.teacher_name;
        this.teacher_qual = singleTeacher.teacher_qual;
        this.teacher_desig = singleTeacher.teacher_desig;
        this.password = singleTeacher.password;
        this.gender = singleTeacher.gender;
        this.dob = singleTeacher.dob;
        this.phone_num = singleTeacher.phone_num;
        this.email = singleTeacher.email;
        this.address = singleTeacher.address;
        this.teacher_salary = singleTeacher.teacher_salary;
        this.experience = singleTeacher.experience;
        this.username = singleTeacher.user_name;
        this.t_cnic = singleTeacher.teacher_cnic;
        this.tDesc = singleTeacher.t_desc;
    };
    // ***************************************************************************** **/
    // ******************* check userName already added event handler  ******************/
    // ********************************************************** *******************/
    TeachersComponent.prototype.isUserNameAdded = function (username) {
        var _this = this;
        this.checkUserName = false;
        var isUserPresent = 0;
        var userInfo = {
            user_name: username,
            table_name: 'tbl_teachers'
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
    // *********************************************************************************************************************** */
    /*********************************************Write , Update , Delete Data  Methods************************************** */
    // *********************************************************************************************************************** */
    // ************************************************************************* */
    // ******************* Add teacher event handler function ******************/
    // ********************************************************************** ***/
    TeachersComponent.prototype.onSubmitAddTeacher = function (submitEvent) {
        var _this = this;
        // get teacher image
        var imagesData = new FormData();
        var files = this.filesToUpload;
        // console.log(files);
        for (var i = 0; i < files.length; i++) {
            imagesData.append('uploads[]', files[i], files[i]['name']);
        }
        if (files.length >= 1) {
            this.uploadImage = true;
        }
        var data = submitEvent.value;
        var newTeacherData = {
            teacher_name: data.t_name,
            teacher_qual: data.t_qualification,
            teacher_desig: data.t_desig,
            password: ts_md5_dist_md5__WEBPACK_IMPORTED_MODULE_3__["Md5"].hashStr(data.t_password),
            gender: data.t_gender,
            dob: data.t_dob,
            teacher_nic: data.teacher_nic,
            phone_num: data.t_phone_num,
            email: data.t_email,
            address: data.t_address,
            teacher_salary: data.t_salary,
            experience: data.t_experience,
            user_name: data.t_username.replace(/\s/g, ''),
            t_desc: data.t_desc
        };
        this._teachersDataService.addTeachersF(newTeacherData).subscribe(function (result) {
            if (result.status === 1) {
                var id = JSON.stringify(result.inserted_id);
                imagesData.append('id', id); // teacher id
                imagesData.append('tbl_name', 'tbl_teachers');
                imagesData.append('source', 'teacher');
                // this.myInputVariable.nativeElement.value = "";
                // add teacher images
                if (_this.uploadImage === true) {
                    _this._commonService.add_images(imagesData).subscribe(function (respresult) {
                        _this.filesToUpload = [];
                        _this.getTeachersWithPagination(_this.offset);
                    });
                }
                _this._commonService.successToaster('Added Successfully', 'Success!');
                // reset for after submission
                submitEvent.reset();
                _this.getTeachersWithPagination(_this.offset);
                _this.closeModal();
            }
            else {
                _this._commonService.errorToaster(result.msg, 'Error!');
            }
        });
    };
    // ************************************************************************************************************* */
    /*********************************************Store Images in Array******************************** */
    // ************************************************************************************************************* */
    TeachersComponent.prototype.fileChangeEvent = function (fileInput) {
        var filedata = fileInput.target.files;
        // this.product.photo = fileInput.target.files[0]['name'];
        // check file is valid
        if (!this._commonService.validateFile(filedata[0].name)) {
            this.imgValidation = false;
            this.uploadImage = false;
        }
        else {
            this.filesToUpload = filedata;
            this.imgValidation = true;
        }
    };
    // **************************************************************************** */
    // ******************* Update teacher event handler function ******************/
    /************************************************************************* */
    TeachersComponent.prototype.onSubmitUpdateTeacher = function (submitEvent) {
        var _this = this;
        // empty noti string
        this.emailNotUnique = '';
        this.cnicNotUnique = '';
        this.phoneNumNotUnique = '';
        // get teacher image
        var imagesData = new FormData();
        var files = this.filesToUpload;
        if (files.length >= 1) {
            this.uploadImage = true;
        }
        for (var i = 0; i < files.length; i++) {
            imagesData.append('uploads[]', files[i], files[i]['name']);
        }
        var data = submitEvent.value;
        var id = data.teacher_id;
        var updateTeacherData = {
            teacher_name: data.teacher_name,
            teacher_qual: data.teacher_qual,
            teacher_desig: data.teacher_desig,
            teacher_password: data.teacher_password === ''
                ? data.teacher_password
                : ts_md5_dist_md5__WEBPACK_IMPORTED_MODULE_3__["Md5"].hashStr(data.teacher_password),
            gender: data.gender,
            dob: data.dob,
            phone_num: data.phone_num,
            email: data.email,
            address: data.address,
            experience: data.experience,
            teacher_salary: data.teacher_salary,
            teacher_cnic: data.t_cnic,
            t_desc: data.tDesc
        };
        this._teachersDataService
            .updateTeacherF(updateTeacherData, id)
            .subscribe(function (result) {
            var t_id = JSON.stringify(data.teacher_id);
            imagesData.append('id', t_id);
            imagesData.append('tbl_name', 'tbl_teachers');
            imagesData.append('source', 'teacher');
            // this.myInputVariable.nativeElement.value = "";
            // update teacher images if image selected
            if (_this.uploadImage === true) {
                _this._commonService.add_images(imagesData).subscribe(function (respresult) {
                    _this.filesToUpload = [];
                    if (respresult.status !== 1) {
                        _this._commonService.errorToaster('Image Upload Failed', 'Failed!');
                    }
                    else {
                        _this.getTeachersWithPagination(_this.offset);
                    }
                });
            }
            if (result.status === 1) {
                _this._commonService.successToaster('Updated Successfully', 'Success!');
                _this.getTeachersWithPagination(_this.offset); // with pagination
                _this.closeModal();
            }
            else {
                _this._commonService.errorToaster(result.msg, 'Error!');
            }
        });
    };
    // ********************************************************************************* */
    // ******************* OnClick delete teacher event handler function *****************/
    // ***********************************************************************************/
    TeachersComponent.prototype.deleteTeacher = function (id) {
        var _this = this;
        sweetalert2__WEBPACK_IMPORTED_MODULE_2___default()({
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
                _this._teachersDataService.deleteTeachersF(id).subscribe(function (data) {
                    _this.getTeachersData(); // load teachers data after deleting data
                });
                // show deleted notification
                _this._commonService.successToaster('Deleted Successfully', 'Success!');
            }
        });
    };
    // *********************************************************************************************************************** */
    /*********************************************General   Methods************************************** */
    // *********************************************************************************************************************** */
    // new modal
    TeachersComponent.prototype.openNgModal = function (content) {
        this.modalService.open(content, { size: 'lg' });
    };
    // ********************** */ get searching data from database  ************************
    TeachersComponent.prototype.searchFromDb = function (searchKeyWord) {
        var _this = this;
        if (!searchKeyWord) {
            this.getTeachersWithPagination(this.offset); // with pagination
        }
        else {
            var search_data = {
                type: 'tbl_teachers',
                keyword: searchKeyWord // NIC OR Phone number
            };
            this._commonService.searchByNicPhoneNum(search_data).subscribe(function (result) {
                if (result.status === 1) {
                    _this.teachersDataList = result.data;
                }
                else {
                    console.log(result.data);
                }
            });
        }
    };
    // ****************** */ hide success toaster after 2 secs *******************
    TeachersComponent.prototype.FadeOutToaster = function () {
        var _this = this;
        setTimeout(function () {
            _this.successNotification = 0;
        }, 2000);
    };
    TeachersComponent.prototype.FadeOutUpdateToaster = function () {
        var _this = this;
        setTimeout(function () {
            _this.updateSuccessNotifi = 0;
        }, 2000);
    };
    // open model for edit teacher data
    TeachersComponent.prototype.openEditTeachModal = function (modal, id, index) {
        this.emailNotUnique = '';
        this.cnicNotUnique = '';
        this.phoneNumNotUnique = '';
        // call method to get singal teacher data for updating
        this.getSingleTeacherData(index);
        this.openNgModal(modal);
    };
    TeachersComponent.prototype.openProfileTeacherModal = function (modal, id, index) {
        //console.log(modal);
        //console.log(id);
        //console.log(index);
        //this.printButton = false;
        // call method to get singal Student data for updating
        this.getSingleTeacherData(index);
        this.openNgModal(modal);
        // clear the previous data
        //this.studentExamResult = [];
        //this.resultSummary = false;
    };
    // close model
    TeachersComponent.prototype.closeModal = function () {
        this.modalService.dismissAll();
    };
    TeachersComponent.prototype.openModal = function (modal) {
        modal.open();
    };
    /********************************* pagination Info ****************************/
    TeachersComponent.prototype.pageChanged = function (pN) {
        this.pageNumber = pN;
        this.offset = (pN - 1) * this.pageSize;
        this.getTeachersWithPagination(this.offset);
    };
    /********************************* set parent user name by default phone number ****************************/
    TeachersComponent.prototype.setUserName = function (mobile_number) {
        var _this = this;
        // for unique notifi and btn disable
        this.checkPhone = false;
        this.phone_check = false;
        if (mobile_number) {
            this.t_username = mobile_number.toString();
            var string_phone_num = mobile_number.toString();
            // default password will be first four digits of phone number with test@ (eg test@first_four_digit_of_mobile)
            var mobile_first_four_digits = string_phone_num.substring(0, 4);
            this.default_password = 'test@' + mobile_first_four_digits;
        }
        this.t_password = this.default_password;
        // check phone num is unique or not
        var check_unique_data = {
            type: 'phone',
            check_value: mobile_number,
            tbl_name: 'tbl_teachers'
        };
        this._commonService.check_unique_f(check_unique_data).subscribe(function (result) {
            if (result.status === 1) {
                if (result.data[0].teacher_phone_count) {
                    _this.checkPhone = true;
                    _this.phone_check = true;
                }
                else {
                    _this.checkPhone = false;
                    _this.phone_check = false;
                }
            }
            else {
                console.log(result.msg);
            }
        });
    };
    /****************** check cnic uniqueness ******************/
    TeachersComponent.prototype.check_cnicUniqueF = function (value) {
        var _this = this;
        // for notification n btn disable
        this.cnic_check = false;
        this.checkCnic = false;
        // check whether value is unique or not
        var check_unique_data = {
            type: 'cnic',
            check_value: value,
            tbl_name: 'tbl_teachers'
        };
        this._commonService.check_unique_f(check_unique_data).subscribe(function (result) {
            if (result.status === 1) {
                if (result.data[0].teacher_cnic_count) {
                    _this.checkCnic = true;
                    _this.cnic_check = true;
                }
                else {
                    _this.checkCnic = false;
                    _this.cnic_check = false;
                }
            }
            else {
                console.log(result.msg);
            }
        });
    };
    /****************** check email uniqueness ******************/
    TeachersComponent.prototype.check_emailUniqueF = function (value) {
        var _this = this;
        if (value === '') {
            this.email_check = false;
            this.checkEmail = false;
        }
        else {
            // for notification n btn disable
            this.email_check = false;
            this.checkEmail = false;
            // check whether value is unique or not
            var check_unique_data = {
                type: 'email',
                check_value: value,
                tbl_name: 'tbl_teachers'
            };
            this._commonService
                .check_unique_f(check_unique_data)
                .subscribe(function (result) {
                if (result.status === 1) {
                    if (result.data[0].teacher_email_count) {
                        _this.email_check = true;
                        _this.checkEmail = true;
                    }
                    else {
                        _this.email_check = false;
                        _this.checkEmail = false;
                    }
                }
                else {
                    console.log(result.msg);
                }
            });
        }
    };
    /*********************check unique on Update ************* */
    TeachersComponent.prototype.checkUniqueOnUpdate = function (check_info, check_value) {
        var _this = this;
        if (check_value) {
            var existing = void 0;
            if (check_info === 't_email') {
                existing = this.existing_email;
            }
            else if (check_info === 't_cnic') {
                existing = this.existing_cnic;
            }
            else if (check_info === 't_phonenum') {
                existing = this.existing_phone;
            }
            var check_data = {
                check_info: check_info,
                table: 'tbl_teachers',
                check_value: check_value,
                existing: existing
            };
            this._commonService.checkUniqueOnUpdate(check_data).subscribe(function (result) {
                if (result.status === 1) {
                    _this.updateBtnDisable = true;
                    if (result.notificationVar === 'email') {
                        _this.emailNotUnique = 'Email already in use';
                    }
                    else if (result.notificationVar === 'cnic') {
                        _this.cnicNotUnique = 'CNIC already in use';
                    }
                    else if (result.notificationVar === 'phonenum') {
                        _this.phoneNumNotUnique = 'Phone Num already in use';
                    }
                }
                else {
                    if (check_info === 't_email') {
                        _this.emailNotUnique = '';
                    }
                    else if (check_info === 't_cnic') {
                        _this.cnicNotUnique = '';
                    }
                    else if (check_info === 't_phonenum') {
                        _this.phoneNumNotUnique = '';
                    }
                    console.log(result.msg);
                    _this.updateBtnDisable = false;
                }
            });
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('imageFile'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], TeachersComponent.prototype, "myInputVariable", void 0);
    TeachersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-teachers',
            template: __webpack_require__(/*! ./teachers.component.html */ "./src/app/teachers/teachers.component.html"),
            styles: [__webpack_require__(/*! ./teachers.component.scss */ "./src/app/teachers/teachers.component.scss")],
            providers: [
                _teachers_service__WEBPACK_IMPORTED_MODULE_4__["TeachersDataService"],
                ts_md5_dist_md5__WEBPACK_IMPORTED_MODULE_3__["Md5"],
                _admin_service__WEBPACK_IMPORTED_MODULE_5__["AdminService"],
                _index_index_service__WEBPACK_IMPORTED_MODULE_8__["IndexService"],
                _shared_services_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"],
                _shared_services_global_service__WEBPACK_IMPORTED_MODULE_0__["GlobalService"]
            ] // register service to use service data or call service functions
        }),
        __metadata("design:paramtypes", [_teachers_service__WEBPACK_IMPORTED_MODULE_4__["TeachersDataService"],
            _admin_service__WEBPACK_IMPORTED_MODULE_5__["AdminService"],
            _shared_services_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"],
            _angular_http__WEBPACK_IMPORTED_MODULE_7__["Http"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"],
            _index_index_service__WEBPACK_IMPORTED_MODULE_8__["IndexService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbModal"],
            _shared_services_global_service__WEBPACK_IMPORTED_MODULE_0__["GlobalService"]])
    ], TeachersComponent);
    return TeachersComponent;
}());



/***/ }),

/***/ "./src/app/teachers/teachers.module.ts":
/*!*********************************************!*\
  !*** ./src/app/teachers/teachers.module.ts ***!
  \*********************************************/
/*! exports provided: TeachersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeachersModule", function() { return TeachersModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _teachers_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./teachers.routing */ "./src/app/teachers/teachers.routing.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng2-select */ "./node_modules/ng2-select/index.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ng2_select__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-modal */ "./node_modules/ngx-modal/index.js");
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ngx_modal__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _search_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./search.pipe */ "./src/app/teachers/search.pipe.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _teachers_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./teachers.component */ "./src/app/teachers/teachers.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









/* components */

var TeachersModule = /** @class */ (function () {
    function TeachersModule() {
    }
    TeachersModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                ngx_pagination__WEBPACK_IMPORTED_MODULE_4__["NgxPaginationModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ReactiveFormsModule"],
                ng2_select__WEBPACK_IMPORTED_MODULE_5__["SelectModule"],
                ngx_modal__WEBPACK_IMPORTED_MODULE_6__["ModalModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_3__["HttpModule"],
                _teachers_routing__WEBPACK_IMPORTED_MODULE_2__["routing"]
            ],
            declarations: [_teachers_component__WEBPACK_IMPORTED_MODULE_9__["TeachersComponent"], _search_pipe__WEBPACK_IMPORTED_MODULE_7__["TeachersSearchPipe"]]
        })
    ], TeachersModule);
    return TeachersModule;
}());



/***/ }),

/***/ "./src/app/teachers/teachers.routing.ts":
/*!**********************************************!*\
  !*** ./src/app/teachers/teachers.routing.ts ***!
  \**********************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _teachers_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./teachers.component */ "./src/app/teachers/teachers.component.ts");


var childRoutes = [
    {
        path: '',
        component: _teachers_component__WEBPACK_IMPORTED_MODULE_1__["TeachersComponent"]
    }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(childRoutes);


/***/ })

}]);
//# sourceMappingURL=teachers-teachers-module.js.map