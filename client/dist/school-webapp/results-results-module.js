(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["results-results-module"],{

/***/ "./src/app/results/results.component.html":
/*!************************************************!*\
  !*** ./src/app/results/results.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-md-12 grid-margin stretch-card\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h4 class=\"card-title\">Result Card</h4>\r\n\r\n                <ngb-tabset class=\"tab-solid tab-solid-primary\">\r\n                    <ngb-tab>\r\n                        <ng-template ngbTabTitle>\r\n\r\n                            <div (click)=\"changetab()\"><i class=\"mdi mdi-account-outline\"> </i>Exam Results</div>\r\n                        </ng-template>\r\n                        <ng-template ngbTabContent>\r\n                            <div class=\"row\">\r\n                                <div class=\"col-lg-12 \">\r\n                                    <div class=\"card\">\r\n                                        <div class=\"card-body\">\r\n                                            <h4 class=\"card-title\">Exam Result Card</h4>\r\n                                            <form style=\"margin-top:2em;\" class=\"form-group\" #showResultSummary=\"ngForm\" (ngSubmit)=\"onSubmitShowResultSummary(showResultSummary,'exam')\">\r\n                                                <div class=\"row\">\r\n\r\n                                                    <div class=\"col-md-3 form-group\">\r\n                                                        <label class=\"control-label\"> Session *</label>\r\n                                                        <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedSession.valid && pickedSession.touched\"><small>Exam\r\n                                                          Required</small></span>\r\n                                                        <select class=\"form-control fm-control\" required style=\"margin-top:0em;\" #pickedSession [(ngModel)]=\"session\" (change)=submitSession(pickedSession.value) name=\"session\">\r\n                                                          <option [ngValue]=\"undefined\" disabled>Select Session</option>\r\n                                                          <option *ngFor=\"let item of sessionData\" [value]=\"item.session_name\">{{item.session_name}}\r\n                                                          </option>\r\n                                                      </select>\r\n\r\n                                                    </div>\r\n\r\n                                                    <!-- <div class=\"col-md-3 form-group\">\r\n                                                        <label class=\"control-label\"> Exam *</label>\r\n                                                        <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedExam.valid && pickedExam.touched\"><small>Exam\r\n                                                          Required</small></span>\r\n                                                        <select class=\"form-control fm-control\" required style=\"margin-top:0em;\" #pickedExam [(ngModel)]=\"exam\" (change)=submitExamIdF(pickedExam.value) name=\"exam\">\r\n                                                          <option [ngValue]=\"undefined\" disabled>Select Exam</option>\r\n                                                          <option *ngFor=\"let item of examsDataList\" [value]=\"item.exam_id\">{{item.exam_name}}\r\n                                                          </option>\r\n                                                      </select>\r\n\r\n                                                    </div> -->\r\n                                                    <div class=\"col-md-3 form-group\">\r\n                                                        <label class=\"control-label\"> Class *</label>\r\n                                                        <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedCLass.valid && pickedCLass.touched\"><small>Class\r\n                                                            Required</small></span>\r\n                                                        <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedCLass [(ngModel)]=\"classid\" (change)=classSelected(pickedCLass.value); name=\"classid\">\r\n                                                          <option [ngValue]=\"undefined\" disabled>Select Class</option>\r\n                                                          <option *ngFor=\"let item of classdataList\" [value]=\"item.class_id  + '-' + item.class_name\">{{  item.class_name}}\r\n                                                          </option>\r\n                                                      </select>\r\n\r\n                                                    </div>\r\n\r\n                                                    <div class=\"col-md-3 form-group\">\r\n                                                        <label class=\"control-label\"> Section *</label>\r\n                                                        <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedSection.valid && pickedSection.touched\"><small>Section\r\n                                                              Required</small></span>\r\n                                                        <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedSection [(ngModel)]=\"section\" (change)=\"enableBtn()\" name=\"section\">\r\n                                                          <option [ngValue]=\"undefined\" disabled>Select Section</option>\r\n                                                          <option *ngFor=\"let item of sectionsList\" [value]=\"item.section_id + '-' + item.section_name\">{{item.section_name}}\r\n                                                          </option>\r\n                                                      </select>\r\n\r\n                                                    </div>\r\n\r\n                                                    <div class=\"col-md-2 form-group\" style=\"text-align: center ; \">\r\n                                                        <input type=\"submit\" class=\"btn btn-info\" style=\"margin-top:2.2em\" [disabled]=\"!showResultSummary.form.valid || disableBtn\" value=\"Show\">\r\n\r\n                                                    </div>\r\n\r\n                                                </div>\r\n                                            </form>\r\n\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n\r\n                            </div>\r\n\r\n                            <div class=\"row\" *ngIf=\"showtable\">\r\n                                <div class=\"col-lg-12 col-md-12\">\r\n                                    <div class=\"card\">\r\n                                        <div class=\"card-body\" id=\"result_summary\">\r\n                                            <div style=\"margin-top: -3em; text-align: center; margin-bottom: 3em;\" class=\"mini-heading\">\r\n                                                <h3>Exams Result Summary</h3>\r\n                                                <h4>\r\n                                                    Class : {{ selectedClassName }}\r\n                                                </h4>\r\n                                                <h4> Section : {{selectedClsSection}}\r\n                                                </h4>\r\n\r\n                                            </div>\r\n                                            <hr>\r\n\r\n                                            <div class=\"hide_on_print\" class=\"row\" style=\"margin-top: 1em; margin-bottom: 0em; padding-bottom: 1.5em; padding-top: 0em;\">\r\n                                                <div class=\"col-lg-4\">\r\n                                                    <input class=\"form-control fm-control hide_on_print\" [(ngModel)]=\"searchText\" placeholder=\"Roll Num / Student Name\">\r\n                                                </div>\r\n\r\n                                            </div>\r\n\r\n                                            <table class=\"table table-bordered table-hover\">\r\n                                                <thead class=\"thead-light\">\r\n                                                    <tr>\r\n                                                        <!-- <th>S.No</th> -->\r\n                                                        <th>Roll Num</th>\r\n                                                        <th>Name </th>\r\n                                                        <!--<th>Parent Name</th>-->\r\n                                                        <!-- <th>Total Subjects</th> -->\r\n                                                        <th *ngFor=\"let exam of resultSummary[0].exams\">{{ exam.exam_name }}</th>\r\n\r\n                                                        <th>Obtain Marks</th>\r\n                                                        <th>Total Marks</th>\r\n                                                        <th>Percent</th>\r\n                                                        <th class=\"hide_on_print\">Result</th>\r\n\r\n                                                    </tr>\r\n\r\n                                                </thead>\r\n\r\n                                                <tbody>\r\n                                                    <tr *ngFor=\"let item of resultSummary | filter : searchText let index = index\">\r\n\r\n                                                        <!-- <td>{{index + 1}}</td> -->\r\n                                                        <td>{{item.roll_num}}</td>\r\n                                                        <td>{{item.std_name}}</td>\r\n                                                        <!--<td>{{item.parent_name}}</td>-->\r\n\r\n                                                        <td *ngFor=\"let exam of resultSummary[index].exams\">\r\n\r\n                                                            {{ exam.obtained_marks }} / {{ exam.total_marks }}\r\n\r\n                                                        </td>\r\n                                                        <td> {{ item.result_obtain_marks }}</td>\r\n                                                        <td> {{ item.result_total_marks }}</td>\r\n\r\n                                                        <td>{{ item.result_obtain_marks / item.result_total_marks | percent: '2.0-2' }}</td>\r\n\r\n                                                        <td class=\"hide_on_print\">\r\n                                                            <label class=\"badge badge-info\" (click)=\"selectedStudentResult(index , showResultDetails , item.result_obtain_marks , item.result_total_marks )\" style=\"cursor: pointer;\">Result Details</label>\r\n                                                        </td>\r\n                                                    </tr>\r\n                                                </tbody>\r\n\r\n                                            </table>\r\n\r\n                                        </div>\r\n                                        <div *ngIf=\"printButton\" style=\"margin-left: 2.3em;\">\r\n                                            <button class=\"btn btn-info\" styleSheetFile=\"assets/print.css\" [useExistingCss]=\"true\" printSectionId=\"result_summary\" ngxPrint>print</button>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n\r\n                        </ng-template>\r\n                    </ngb-tab>\r\n                    <ngb-tab>\r\n                        <ng-template ngbTabTitle>\r\n\r\n                            <div (click)=\"changetab()\"><i class=\"mdi mdi-account-outline\"> </i>Quiz Results</div>\r\n\r\n                        </ng-template>\r\n                        <ng-template ngbTabContent>\r\n                            <div class=\"row\">\r\n\r\n                                <div class=\"col-lg-12 \">\r\n                                    <div class=\"card\">\r\n                                        <div class=\"card-body\">\r\n                                            <h4 class=\"card-title\">Quiz Result Card</h4>\r\n                                            <form style=\"margin-top:2em;\" class=\"form-group\" #showResultSummary=\"ngForm\" (ngSubmit)=\"onSubmitShowResultSummary(showResultSummary, 'quiz')\">\r\n                                                <div class=\"row\">\r\n\r\n                                                    <div class=\"col-md-3 form-group\">\r\n                                                        <label class=\"control-label\"> Session *</label>\r\n                                                        <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedSession.valid && pickedSession.touched\"><small>Exam\r\n                                                          Required</small></span>\r\n                                                        <select class=\"form-control fm-control\" required style=\"margin-top:0em;\" #pickedSession [(ngModel)]=\"session\" (change)=submitSession(pickedSession.value) name=\"session\">\r\n                                                          <option [ngValue]=\"undefined\" disabled>Select Session</option>\r\n                                                          <option *ngFor=\"let item of sessionData\" [value]=\"item.session_name\">{{item.session_name}}\r\n                                                          </option>\r\n                                                      </select>\r\n\r\n                                                    </div>\r\n\r\n                                                    <!-- <div class=\"col-md-3 form-group\">\r\n                                                        <label class=\"control-label\"> Exam *</label>\r\n                                                        <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedExam.valid && pickedExam.touched\"><small>Exam\r\n                                                          Required</small></span>\r\n                                                        <select class=\"form-control fm-control\" required style=\"margin-top:0em;\" #pickedExam [(ngModel)]=\"exam\" (change)=submitExamIdF(pickedExam.value) name=\"exam\">\r\n                                                          <option [ngValue]=\"undefined\" disabled>Select Exam</option>\r\n                                                          <option *ngFor=\"let item of examsDataList\" [value]=\"item.exam_id\">{{item.exam_name}}\r\n                                                          </option>\r\n                                                      </select>\r\n\r\n                                                    </div> -->\r\n                                                    <div class=\"col-md-3 form-group\">\r\n                                                        <label class=\"control-label\"> Class *</label>\r\n                                                        <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedCLass.valid && pickedCLass.touched\"><small>Class\r\n                                                            Required</small></span>\r\n                                                        <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedCLass [(ngModel)]=\"classid\" (change)=classSelected(pickedCLass.value); name=\"classid\">\r\n                                                          <option [ngValue]=\"undefined\" disabled>Select Class</option>\r\n                                                          <option *ngFor=\"let item of classdataList\" [value]=\"item.class_id  + '-' + item.class_name\">{{  item.class_name}}\r\n                                                          </option>\r\n                                                      </select>\r\n\r\n                                                    </div>\r\n\r\n                                                    <div class=\"col-md-3 form-group\">\r\n                                                        <label class=\"control-label\"> Section *</label>\r\n                                                        <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedSection.valid && pickedSection.touched\"><small>Section\r\n                                                              Required</small></span>\r\n                                                        <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedSection [(ngModel)]=\"section\" (change)=\"enableBtn()\" name=\"section\">\r\n                                                          <option [ngValue]=\"undefined\" disabled>Select Section</option>\r\n                                                          <option *ngFor=\"let item of sectionsList\" [value]=\"item.section_id + '-' + item.section_name\">{{item.section_name}}\r\n                                                          </option>\r\n                                                      </select>\r\n\r\n                                                    </div>\r\n\r\n                                                    <div class=\"col-md-2 form-group\" style=\"text-align: center ; \">\r\n                                                        <input type=\"submit\" class=\"btn btn-info\" style=\"margin-top:2.2em\" [disabled]=\"!showResultSummary.form.valid || disableBtn\" value=\"Show\">\r\n\r\n                                                    </div>\r\n\r\n                                                </div>\r\n                                            </form>\r\n\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n\r\n                            </div>\r\n\r\n                            <div class=\"row\" *ngIf=\"showtable\">\r\n                                <div class=\"col-lg-12 col-md-12\">\r\n                                    <div class=\"card\">\r\n                                        <div class=\"card-body\" id=\"result_summary\">\r\n                                            <div style=\"margin-top: -3em; text-align: center; margin-bottom: 3em;\" class=\"mini-heading\">\r\n                                                <h3>Quiz Result Summary</h3>\r\n                                                <h4>\r\n                                                    Class : {{ selectedClassName }}\r\n                                                </h4>\r\n                                                <h4> Section : {{selectedClsSection}}\r\n                                                </h4>\r\n\r\n                                            </div>\r\n                                            <hr>\r\n\r\n                                            <div class=\"hide_on_print\" class=\"row\" style=\"margin-top: 1em; margin-bottom: 0em; padding-bottom: 1.5em; padding-top: 0em;\">\r\n                                                <div class=\"col-lg-4\">\r\n                                                    <input class=\"form-control fm-control hide_on_print\" [(ngModel)]=\"searchText\" placeholder=\"Roll Num / Student Name\">\r\n                                                </div>\r\n\r\n                                            </div>\r\n\r\n                                            <table class=\"table table-bordered table-hover\">\r\n                                                <thead class=\"thead-light\">\r\n                                                    <tr>\r\n                                                        <th>S.No</th>\r\n                                                        <th>Roll Num</th>\r\n                                                        <th>Student Name </th>\r\n                                                        <th>Parent Name</th>\r\n                                                        <th>Total Quizes</th>\r\n                                                        <th>Total Marks</th>\r\n                                                        <th>Obtained Marks</th>\r\n\r\n                                                        <th class=\"hide_on_print\">Result</th>\r\n\r\n                                                    </tr>\r\n\r\n                                                </thead>\r\n\r\n                                                <tbody>\r\n                                                    <tr *ngFor=\"let item of quiz_results | filter : searchText let index = index\">\r\n\r\n                                                        <td>{{index + 1}}</td>\r\n                                                        <td>{{item.roll_num}}</td>\r\n                                                        <td>{{item.std_name}}</td>\r\n                                                        <td>{{ item.parent_name }}</td>\r\n                                                        <td>{{ item.quiz_results_info.length }}</td>\r\n                                                        <td>{{ item.total_marks }}</td>\r\n                                                        <td>{{ item.obtained_marks }}</td>\r\n\r\n\r\n                                                        <td class=\"hide_on_print\">\r\n                                                            <button [disabled]=\"item.quiz_results_info.length < 1\" class=\"badge badge-info\" (click)=\"selectedStudentQuizResult(item , showQuizResultDetails)\" style=\"cursor: pointer;\">Quiz Details</button>\r\n                                                        </td>\r\n                                                    </tr>\r\n                                                </tbody>\r\n\r\n                                            </table>\r\n\r\n                                        </div>\r\n                                        <div *ngIf=\"printButton\" style=\"margin-left: 2.3em;\">\r\n                                            <button class=\"btn btn-info\" styleSheetFile=\"assets/print.css\" [useExistingCss]=\"true\" printSectionId=\"result_summary\" ngxPrint>print</button>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n\r\n                            </div>\r\n\r\n                        </ng-template>\r\n                    </ngb-tab>\r\n\r\n\r\n\r\n                    <ngb-tab>\r\n                        <ng-template ngbTabTitle>\r\n\r\n                            <div (click)=\"changetab()\"><i class=\"mdi mdi-account-outline\"> </i>Assignment Results</div>\r\n\r\n                        </ng-template>\r\n                        <ng-template ngbTabContent>\r\n                            <div class=\"row\">\r\n\r\n                                <div class=\"col-lg-12 \">\r\n                                    <div class=\"card\">\r\n                                        <div class=\"card-body\">\r\n                                            <h4 class=\"card-title\">Assignment Result Card</h4>\r\n                                            <form style=\"margin-top:2em;\" class=\"form-group\" #showResultSummary=\"ngForm\" (ngSubmit)=\"onSubmitShowResultSummary(showResultSummary, 'assignment')\">\r\n                                                <div class=\"row\">\r\n\r\n                                                    <div class=\"col-md-3 form-group\">\r\n                                                        <label class=\"control-label\"> Session *</label>\r\n                                                        <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedSession.valid && pickedSession.touched\"><small>Exam\r\n                                                          Required</small></span>\r\n                                                        <select class=\"form-control fm-control\" required style=\"margin-top:0em;\" #pickedSession [(ngModel)]=\"session\" (change)=submitSession(pickedSession.value) name=\"session\">\r\n                                                          <option [ngValue]=\"undefined\" disabled>Select Session</option>\r\n                                                          <option *ngFor=\"let item of sessionData\" [value]=\"item.session_name\">{{item.session_name}}\r\n                                                          </option>\r\n                                                      </select>\r\n\r\n                                                    </div>\r\n\r\n                                                    <!-- <div class=\"col-md-3 form-group\">\r\n                                                        <label class=\"control-label\"> Exam *</label>\r\n                                                        <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedExam.valid && pickedExam.touched\"><small>Exam\r\n                                                          Required</small></span>\r\n                                                        <select class=\"form-control fm-control\" required style=\"margin-top:0em;\" #pickedExam [(ngModel)]=\"exam\" (change)=submitExamIdF(pickedExam.value) name=\"exam\">\r\n                                                          <option [ngValue]=\"undefined\" disabled>Select Exam</option>\r\n                                                          <option *ngFor=\"let item of examsDataList\" [value]=\"item.exam_id\">{{item.exam_name}}\r\n                                                          </option>\r\n                                                      </select>\r\n\r\n                                                    </div> -->\r\n                                                    <div class=\"col-md-3 form-group\">\r\n                                                        <label class=\"control-label\"> Class *</label>\r\n                                                        <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedCLass.valid && pickedCLass.touched\"><small>Class\r\n                                                            Required</small></span>\r\n                                                        <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedCLass [(ngModel)]=\"classid\" (change)=classSelected(pickedCLass.value); name=\"classid\">\r\n                                                          <option [ngValue]=\"undefined\" disabled>Select Class</option>\r\n                                                          <option *ngFor=\"let item of classdataList\" [value]=\"item.class_id  + '-' + item.class_name\">{{  item.class_name}}\r\n                                                          </option>\r\n                                                      </select>\r\n\r\n                                                    </div>\r\n\r\n                                                    <div class=\"col-md-3 form-group\">\r\n                                                        <label class=\"control-label\"> Section *</label>\r\n                                                        <span style=\"color:red; margin-left: 1em;\" *ngIf=\"!pickedSection.valid && pickedSection.touched\"><small>Section\r\n                                                              Required</small></span>\r\n                                                        <select class=\"form-control fm-control\" style=\"margin-top:0em;\" #pickedSection [(ngModel)]=\"section\" (change)=\"enableBtn()\" name=\"section\">\r\n                                                          <option [ngValue]=\"undefined\" disabled>Select Section</option>\r\n                                                          <option *ngFor=\"let item of sectionsList\" [value]=\"item.section_id + '-' + item.section_name\">{{item.section_name}}\r\n                                                          </option>\r\n                                                      </select>\r\n\r\n                                                    </div>\r\n\r\n                                                    <div class=\"col-md-2 form-group\" style=\"text-align: center ; \">\r\n                                                        <input type=\"submit\" class=\"btn btn-info\" style=\"margin-top:2.2em\" [disabled]=\"!showResultSummary.form.valid || disableBtn\" value=\"Show\">\r\n\r\n                                                    </div>\r\n\r\n                                                </div>\r\n                                            </form>\r\n\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n\r\n                            </div>\r\n\r\n                            <div class=\"row\" *ngIf=\"showtable\">\r\n                                <div class=\"col-lg-12 col-md-12\">\r\n                                    <div class=\"card\">\r\n                                        <div class=\"card-body\" id=\"result_summary\">\r\n                                            <div style=\"margin-top: -3em; text-align: center; margin-bottom: 3em;\" class=\"mini-heading\">\r\n                                                <h3>Assignment Result Summary</h3>\r\n                                                <h4>\r\n                                                    Class : {{ selectedClassName }}\r\n                                                </h4>\r\n                                                <h4> Section : {{selectedClsSection}}\r\n                                                </h4>\r\n\r\n                                            </div>\r\n                                            <hr>\r\n\r\n                                            <div class=\"hide_on_print\" class=\"row\" style=\"margin-top: 1em; margin-bottom: 0em; padding-bottom: 1.5em; padding-top: 0em;\">\r\n                                                <div class=\"col-lg-4\">\r\n                                                    <input class=\"form-control fm-control hide_on_print\" [(ngModel)]=\"searchText\" placeholder=\"Roll Num / Student Name\">\r\n                                                </div>\r\n\r\n                                            </div>\r\n\r\n                                            <table class=\"table table-bordered table-hover\">\r\n                                                <thead class=\"thead-light\">\r\n                                                    <tr>\r\n                                                        <th>S.No</th>\r\n                                                        <th>Roll Num</th>\r\n                                                        <th>Student Name </th>\r\n                                                        <th>Parent Name</th>\r\n                                                        <th>Total Assignments</th>\r\n                                                        <th>Total Marks</th>\r\n                                                        <th>Obtained Marks</th>\r\n\r\n                                                        <th class=\"hide_on_print\">Result</th>\r\n\r\n                                                    </tr>\r\n\r\n                                                </thead>\r\n\r\n                                                <tbody>\r\n                                                    <tr *ngFor=\"let item of assignment_results | filter : searchText let index = index\">\r\n\r\n                                                        <td>{{index + 1}}</td>\r\n                                                        <td>{{item.roll_num}}</td>\r\n                                                        <td>{{item.std_name}}</td>\r\n                                                        <td>{{ item.parent_name }}</td>\r\n                                                        <td>{{ item.assignment_results_info.length }}</td>\r\n                                                        <td>{{ item.total_marks }}</td>\r\n                                                        <td>{{ item.obtained_marks }}</td>\r\n\r\n\r\n                                                        <td class=\"hide_on_print\">\r\n                                                            <button [disabled]=\"item.assignment_results_info.length < 1\" class=\"badge badge-info\" (click)=\"selectedStudentAssignResult(item , showAssignResultDetails)\" style=\"cursor: pointer;\">Assignment Details</button>\r\n                                                        </td>\r\n                                                    </tr>\r\n                                                </tbody>\r\n\r\n                                            </table>\r\n\r\n                                        </div>\r\n                                        <div *ngIf=\"printButton\" style=\"margin-left: 2.3em;\">\r\n                                            <button class=\"btn btn-info\" styleSheetFile=\"assets/print.css\" [useExistingCss]=\"true\" printSectionId=\"result_summary\" ngxPrint>print</button>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n\r\n                            </div>\r\n\r\n                        </ng-template>\r\n                    </ngb-tab>\r\n\r\n\r\n                </ngb-tabset>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</div>\r\n\r\n\r\n\r\n\r\n<!-- exam result details modal -->\r\n\r\n\r\n<ng-template #showResultDetails let-modal>\r\n    <div class=\"modal-header\">\r\n        <div style=\"text-align: center\" class=\"col-lg-12\">\r\n            <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n                <span aria-hidden=\"true\">&times;</span>\r\n              </button>\r\n            <h3>Student Result Details</h3>\r\n\r\n        </div>\r\n\r\n    </div>\r\n    <div id=\"check_test\">\r\n        <div class=\"modal-body\">\r\n\r\n            <div class=\"row\" id=\"resultcard\">\r\n                <div class=\"col-lg-12\" style=\"text-align:center\">\r\n                    <h4><u> Academic Result Card</u> </h4>\r\n                    <h4>Session : {{ selectedSession }}</h4>\r\n\r\n                </div>\r\n                <div class=\"col-lg-4\" style=\"margin-top: 1em;;\">\r\n                    <h5> Student Roll No : <small style=\"font-size: medium;\"> {{ SingleStudentresult.roll_num }} </small> </h5>\r\n                    <h5> Student Name : <small style=\"font-size: medium;\">  {{ SingleStudentresult.std_name }} </small></h5>\r\n                    <h5> Student Father Name : <small style=\"font-size: medium;\">  {{ SingleStudentresult.parent_name }} </small> </h5>\r\n                    <h5>\r\n                        Class : <small style=\"font-size: medium;\">  {{ selectedClassName }} </small>\r\n                    </h5>\r\n                    <h5> Section : <small style=\"font-size: medium;\">  {{selectedClsSection}} </small>\r\n                    </h5>\r\n\r\n                </div>\r\n                <div class=\"col-lg-8\">\r\n\r\n                </div>\r\n\r\n                <div class=\"col-lg-12 col-md-12 form-group\" style=\"margin-top:2em;\">\r\n                    <table class=\"table table-bordered table-hover\">\r\n                        <thead class=\"thead-light\">\r\n                            <th> Subject</th>\r\n                            <th *ngFor=\"let exam of SingleStudentresult.exams\">{{ exam.exam_name }}</th>\r\n\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr *ngFor=\"let a of counter(total_subjects_count); let i = index\">\r\n                                <td> <strong> {{ SingleStudentresult.exams[0].student_info[i].subject_name }} </strong> </td>\r\n                                <td *ngFor=\"let c of counter(total_exams_count); let j= index;\">\r\n\r\n                                    {{ SingleStudentresult.exams[j].student_info[i].obtained_marks == null ? 0 : SingleStudentresult.exams[j].student_info[i].obtained_marks }} / {{ SingleStudentresult.exams[j].student_info[i].total_marks == null ? 0 : SingleStudentresult.exams[j].student_info[i].total_marks\r\n                                    }}\r\n\r\n                                </td>\r\n                            </tr>\r\n                            <tr style=\"background-color: #e9ecef;\">\r\n                                <td>\r\n                                    <strong>Total Marks </strong>\r\n                                </td>\r\n                                <td *ngFor=\"let c of counter(total_exams_count); let j= index;\">\r\n\r\n                                    <strong> {{ SingleStudentresult.exams[j].obtained_marks == null ? 0 : SingleStudentresult.exams[j].obtained_marks }} / {{ SingleStudentresult.exams[j].total_marks == null ? 0 : SingleStudentresult.exams[j].total_marks }} </strong>\r\n\r\n                                </td>\r\n                            </tr>\r\n\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n\r\n\r\n                <div class=\"col-lg-9 total_summary\" style=\"margin-top:3em;\">\r\n\r\n                    <h5> Total Marks : <small style=\"font-size: medium;\"> {{ selected_std_total_marks }} </small> </h5>\r\n                    <h5> Obtained Marks : <small style=\"font-size: medium;\">  {{  selected_std_obtained_marks }} </small></h5>\r\n                    <h5> Percent : <small style=\"font-size: medium;\">  {{ selected_std_obtained_marks / selected_std_total_marks | percent: '2.0-2' }} </small> </h5>\r\n                    <br>\r\n\r\n\r\n                </div>\r\n                <div class=\"col-lg-3\" style=\"margin-top:4em;\">\r\n\r\n                    <p>___________________________</p>\r\n                    <p>Examiner</p>\r\n\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n    <div class=\" modal-footer\">\r\n\r\n        <button class=\"btn btn-info\" styleSheetFile=\"assets/print.css\" [useExistingCss]=\"true\" printSectionId=\"check_test\" ngxPrint>print</button>\r\n\r\n        <button type=\"button \" class=\"btn btn-light \" (click)=\"modal.close( 'Close click') \">Close</button>\r\n    </div>\r\n\r\n\r\n</ng-template>\r\n\r\n\r\n\r\n<!-- Quiz result details modal -->\r\n\r\n\r\n\r\n\r\n<ng-template #showQuizResultDetails let-modal>\r\n    <div class=\"modal-header\">\r\n        <div style=\"text-align: center\" class=\"col-lg-12\">\r\n            <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n                <span aria-hidden=\"true\">&times;</span>\r\n              </button>\r\n            <h3>Quiz Result Details</h3>\r\n\r\n        </div>\r\n\r\n    </div>\r\n    <div id=\"check_test\">\r\n        <div class=\"modal-body\">\r\n\r\n            <div class=\"row\" id=\"resultcard\">\r\n                <div class=\"col-lg-12\" style=\"text-align:center\">\r\n                    <h4><u> Quizs Result Card</u> </h4>\r\n                    <h4>Session : {{ selectedSession }}</h4>\r\n\r\n                </div>\r\n                <div class=\"col-lg-4\" style=\"margin-top: 1em;;\">\r\n                    <h5> Student Roll No : <small style=\"font-size: medium;\"> {{ singleStudentQuizResult.roll_num }} </small> </h5>\r\n                    <h5> Student Name : <small style=\"font-size: medium;\">  {{ singleStudentQuizResult.std_name }} </small></h5>\r\n                    <h5> Student Father Name : <small style=\"font-size: medium;\">  {{ singleStudentQuizResult.parent_name }} </small> </h5>\r\n                    <h5>\r\n                        Class : <small style=\"font-size: medium;\">  {{ selectedClassName }} </small>\r\n                    </h5>\r\n                    <h5> Section : <small style=\"font-size: medium;\">  {{selectedClsSection}} </small>\r\n                    </h5>\r\n\r\n                </div>\r\n                <div class=\"col-lg-8\">\r\n\r\n                </div>\r\n\r\n                <div class=\"col-lg-12 col-md-12 form-group\" style=\"margin-top:2em;\">\r\n                    <table class=\"table table-bordered table-hover\">\r\n                        <thead class=\"thead-light\">\r\n                            <th> Subject</th>\r\n                            <th> Quiz Title</th>\r\n                            <th> Total Marks</th>\r\n                            <th> Obtained Marks</th>\r\n                            <th> Quiz Date</th>\r\n\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr *ngFor=\"let item of singleStudentQuizResult.quiz_results_info let i = index\">\r\n\r\n                                <td>{{ item.subject_name }}</td>\r\n                                <td>{{ item.quiz_title }}</td>\r\n                                <td>{{ item.quiz_t_marks }}</td>\r\n                                <td>{{ item.obtained_marks }}</td>\r\n                                <td>{{ item.quiz_date * 1000 | date }}</td>\r\n\r\n                            </tr>\r\n\r\n\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n    <div class=\" modal-footer\">\r\n\r\n        <button class=\"btn btn-info\" styleSheetFile=\"assets/print.css\" [useExistingCss]=\"true\" printSectionId=\"check_test\" ngxPrint>print</button>\r\n\r\n        <button type=\"button \" class=\"btn btn-light \" (click)=\"modal.close( 'Close click') \">Close</button>\r\n    </div>\r\n\r\n\r\n</ng-template>\r\n\r\n\r\n\r\n\r\n<!-- assignment details modal  -->\r\n\r\n\r\n\r\n<ng-template #showAssignResultDetails let-modal>\r\n    <div class=\"modal-header\">\r\n        <div style=\"text-align: center\" class=\"col-lg-12\">\r\n            <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n            <h3>Assignment Result Details</h3>\r\n\r\n        </div>\r\n\r\n    </div>\r\n    <div id=\"check_test\">\r\n        <div class=\"modal-body\">\r\n\r\n            <div class=\"row\" id=\"resultcard\">\r\n                <div class=\"col-lg-12\" style=\"text-align:center\">\r\n                    <h4><u> Assignment Result Card</u> </h4>\r\n                    <h4>Session : {{ selectedSession }}</h4>\r\n\r\n                </div>\r\n                <div class=\"col-lg-4\" style=\"margin-top: 1em;;\">\r\n                    <h5> Student Roll No : <small style=\"font-size: medium;\"> {{ singleStudentAssignmentResult.roll_num }} </small> </h5>\r\n                    <h5> Student Name : <small style=\"font-size: medium;\">  {{ singleStudentAssignmentResult.std_name }} </small></h5>\r\n                    <h5> Student Father Name : <small style=\"font-size: medium;\">  {{ singleStudentAssignmentResult.parent_name }} </small> </h5>\r\n                    <h5>\r\n                        Class : <small style=\"font-size: medium;\">  {{ selectedClassName }} </small>\r\n                    </h5>\r\n                    <h5> Section : <small style=\"font-size: medium;\">  {{selectedClsSection}} </small>\r\n                    </h5>\r\n\r\n                </div>\r\n                <div class=\"col-lg-8\">\r\n\r\n                </div>\r\n\r\n                <div class=\"col-lg-12 col-md-12 form-group\" style=\"margin-top:2em;\">\r\n                    <table class=\"table table-bordered table-hover\">\r\n                        <thead class=\"thead-light\">\r\n                            <th> Subject</th>\r\n                            <th> Assignment Title</th>\r\n                            <th> Total Marks</th>\r\n                            <th> Obtained Marks</th>\r\n                            <th> Assignment Date</th>\r\n                            <th> Due Date</th>\r\n\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr *ngFor=\"let item of singleStudentAssignmentResult.assignment_results_info let i = index\">\r\n\r\n                                <td>{{ item.subject_name }}</td>\r\n                                <td>{{ item.title }}</td>\r\n                                <td>{{ item.assign_tMarks }}</td>\r\n                                <td>{{ item.obtained_marks }}</td>\r\n                                <td>{{ item.assign_created_date * 1000 | date }}</td>\r\n                                <td>{{ item.assign_due_date * 1000 | date }}</td>\r\n\r\n                            </tr>\r\n\r\n\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n    <div class=\" modal-footer\">\r\n\r\n        <button class=\"btn btn-info\" styleSheetFile=\"assets/print.css\" [useExistingCss]=\"true\" printSectionId=\"check_test\" ngxPrint>print</button>\r\n\r\n        <button type=\"button \" class=\"btn btn-light \" (click)=\"modal.close( 'Close click') \">Close</button>\r\n    </div>\r\n\r\n\r\n</ng-template>"

/***/ }),

/***/ "./src/app/results/results.component.scss":
/*!************************************************!*\
  !*** ./src/app/results/results.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@media print{.hide_on_print{display:none}.mini-heading{margin-top:6px !important}.total_summary{padding-left:0em}}\n"

/***/ }),

/***/ "./src/app/results/results.component.ts":
/*!**********************************************!*\
  !*** ./src/app/results/results.component.ts ***!
  \**********************************************/
/*! exports provided: ResultsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResultsComponent", function() { return ResultsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _shared_services_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/services/common.service */ "./src/app/shared/services/common.service.ts");
/* harmony import */ var _students_student_information_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../students/student-information.service */ "./src/app/students/student-information.service.ts");
/* harmony import */ var _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../sections/manageSection.service */ "./src/app/sections/manageSection.service.ts");
/* harmony import */ var _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../classes/manageClass.service */ "./src/app/classes/manageClass.service.ts");
/* harmony import */ var _subjects_manage_subjects_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../subjects/manage-subjects.service */ "./src/app/subjects/manage-subjects.service.ts");
/* harmony import */ var _exams_add_exams_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../exams/add-exams.service */ "./src/app/exams/add-exams.service.ts");
/* harmony import */ var _settings_settings_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../settings/settings.service */ "./src/app/settings/settings.service.ts");
/* harmony import */ var _results_results_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../results/results.service */ "./src/app/results/results.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var ResultsComponent = /** @class */ (function () {
    function ResultsComponent(_classDataService, _sectionDataService, _addExamsService, _subjectsDataService, _settingsService, modalService, _commonService, _resultsService) {
        this._classDataService = _classDataService;
        this._sectionDataService = _sectionDataService;
        this._addExamsService = _addExamsService;
        this._subjectsDataService = _subjectsDataService;
        this._settingsService = _settingsService;
        this.modalService = modalService;
        this._commonService = _commonService;
        this._resultsService = _resultsService;
        /* active session */
        this.running_session = localStorage.getItem('running_session');
        this.sessionData = [];
        this.resultSummary = [];
        this.quiz_results = [];
        this.assignment_results = [];
        this.fakeArray = new Array(7);
        // notification
        this.disableBtn = true;
        this.dbRespMsg = '';
        this.printButton = false;
        this.selectedClassName = '';
        this.showtable = false;
        this.showGrading = true;
    }
    ResultsComponent.prototype.ngOnInit = function () {
        this.getClassData(); // get class data
        this.get_sessionDetails();
    };
    // *********************************************************************************************************************** */
    /**********************************************************Read Data from DB Methods************************************** */
    // *********************************************************************************************************************** */
    // ********************************************************** **********/
    // ************************* get Session details ***************************/
    // ******************************************************************* */
    ResultsComponent.prototype.get_sessionDetails = function () {
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
    // *********************** Get all Classes data ************************/
    // ******************************************************************* */
    ResultsComponent.prototype.getClassData = function () {
        var _this = this;
        this._classDataService.getClassesF().subscribe(function (result) {
            _this.classdataList = result;
        });
    };
    // ********************************************************** **********/
    // *********************** Get all exams data ************************/
    // ******************************************************************* */
    ResultsComponent.prototype.getExamsinfoBySession = function (session_name) {
        var _this = this;
        this.examsDataList = [];
        this.disableBtn = true;
        this._addExamsService.getExamInfoFun(session_name).subscribe(function (result) {
            if (result.status === 1) {
                _this.examsDataList = result.data;
            }
            if (result.status === 0) {
                sweetalert2__WEBPACK_IMPORTED_MODULE_2___default()('Opps!', 'No exam data is added against selected session');
            }
            if (result.status === 403) {
                _this.dbRespMsg = result.msg;
            }
        });
    };
    // ********************************************************************** */
    // ************ Get Section Data Against Selected Class ***************** */
    // ********************************************************************* */
    ResultsComponent.prototype.getSectionByClassID = function (class_id) {
        var _this = this;
        this.selectedClass = class_id;
        // * disbale btn untill section selcted and empty section array when selected class change
        this.sectionsList = [];
        this.cSubjectsList = [];
        this.selectedClsSection = ''; // unset the varibale on selected class  changed
        // this.selectedClassName = ''; //
        this.disableBtn = true;
        this._sectionDataService.getSectionF(class_id).subscribe(function (result) {
            _this.sectionsList = result;
        });
    };
    // ********************************************************************************************** */
    // ************ Get Student Result Summary against session , exam class , section ***************** */
    // ********************************************************************************************** */
    ResultsComponent.prototype.onSubmitShowResultSummary = function (submittedData, result_type) {
        var _this = this;
        this.showtable = false;
        this.printButton = true;
        this.resultSummary = [];
        this.selectedSession = submittedData.value.session;
        var section_details = submittedData.value.section.split('-');
        this.selectedClsSection = section_details[1];
        var data = {
            class_id: submittedData.value.classid,
            section_id: section_details[0],
            session: submittedData.value.session,
            result_type: result_type
        };
        this._resultsService.getStudentsResultSummary(data).subscribe(function (result) {
            if (result.status === 1) {
                _this.showtable = true;
                if (result_type === 'exam') {
                    _this.resultSummary = result.data;
                    _this.total_exams_count = _this.resultSummary[0].exams.length;
                    _this.total_subjects_count = _this.resultSummary[0].exams[0].student_info.length;
                    // loop over students
                    for (var i = 0; i < _this.resultSummary.length; i++) {
                        // loop over each exam against students to get total obtaide marks
                        for (var j = 0; j < _this.resultSummary[i].exams.length; j++) {
                            // sum total marks of student
                            var exam_totalMarks = _this.resultSummary[i].exams[j]['student_info']
                                .reduce(function (sum, item) { return sum + Number(item.total_marks); }, 0);
                            _this.resultSummary[i].exams[j].total_marks = exam_totalMarks;
                            // sum obtained marks of student
                            var exam_obtainedMarks = _this.resultSummary[i].exams[j]['student_info']
                                .reduce(function (sum, item) { return sum + Number(item.obtained_marks); }, 0);
                            _this.resultSummary[i].exams[j].obtained_marks = exam_obtainedMarks;
                            _this.resultSummary[i].exams[j].percent = (Number(exam_obtainedMarks) / Number(exam_totalMarks)) * 100;
                        }
                        // sum total marks of student
                        var result_totalMarks = _this.resultSummary[i].exams
                            .reduce(function (sum, item) { return sum + Number(item.total_marks); }, 0);
                        _this.resultSummary[i].result_total_marks = result_totalMarks;
                        var result_obtainedMarks = _this.resultSummary[i].exams
                            .reduce(function (sum, item) { return sum + Number(item.obtained_marks); }, 0);
                        _this.resultSummary[i].result_obtain_marks = result_obtainedMarks;
                    }
                }
                else if (result_type === 'quiz') {
                    // if admin has selected quiztab than we show the quiz result summary
                    _this.quiz_results = result.data;
                    for (var i = 0; i < _this.quiz_results.length; i++) {
                        // sum total marks of student
                        var quiz_totalMarks = _this.quiz_results[i].quiz_results_info
                            .reduce(function (sum, item) { return sum + Number(item.quiz_t_marks); }, 0);
                        var quiz_obtainedMarks = _this.quiz_results[i].quiz_results_info
                            .reduce(function (sum, item) { return sum + Number(item.obtained_marks); }, 0);
                        _this.quiz_results[i].total_marks = quiz_totalMarks;
                        _this.quiz_results[i].obtained_marks = quiz_obtainedMarks;
                    }
                }
                else {
                    // if admin has selected assign than we show the assign result summary
                    _this.assignment_results = result.data;
                    for (var i = 0; i < _this.assignment_results.length; i++) {
                        // sum total marks of student
                        var assign_totalMarks = _this.assignment_results[i].assignment_results_info
                            .reduce(function (sum, item) { return sum + Number(item.assign_tMarks); }, 0);
                        var assign_obtainedMarks = _this.assignment_results[i].assignment_results_info
                            .reduce(function (sum, item) { return sum + Number(item.obtained_marks); }, 0);
                        _this.assignment_results[i].total_marks = assign_totalMarks;
                        _this.assignment_results[i].obtained_marks = assign_obtainedMarks;
                    }
                }
            }
            else if (result.status === 2) {
                sweetalert2__WEBPACK_IMPORTED_MODULE_2___default()('!', 'No students added against selected class and section', 'warning');
                return false;
            }
            else {
                sweetalert2__WEBPACK_IMPORTED_MODULE_2___default()('Error !', 'Some error try again!', 'error');
                return false;
            }
        });
    };
    // *************************************************************************************/
    /*********** Selected Student Exams Result Details ***************************************** */
    /************************************************************************************* */
    ResultsComponent.prototype.selectedStudentResult = function (index, modal, obt_marks, t_marks) {
        this.SingleStudentresult = this.resultSummary[index];
        this.selected_std_obtained_marks = obt_marks;
        this.selected_std_total_marks = t_marks;
        this.openNgModal(modal, 'lg');
    };
    // *************************************************************************************/
    /********************* Selected Student Quizs Result Details ***************************/
    /************************************************************************************* */
    ResultsComponent.prototype.selectedStudentQuizResult = function (data, modal) {
        this.singleStudentQuizResult = data;
        this.openNgModal(modal, 'lg');
    };
    // *************************************************************************************/
    /********************* Selected Student Assignment Result Details ***************************/
    /************************************************************************************* */
    ResultsComponent.prototype.selectedStudentAssignResult = function (data, modal) {
        this.singleStudentAssignmentResult = data;
        this.openNgModal(modal, 'lg');
    };
    // ************************************************************************************************************* */
    /*********************************************General   Methods************************************************ */
    // ************************************************************************************************************* */
    ResultsComponent.prototype.submitSession = function (session_name) {
        this.getExamsinfoBySession(session_name);
    };
    // new modal
    ResultsComponent.prototype.openNgModal = function (content, size) {
        this.modalService.open(content, { size: size });
    };
    // *** get sections against class for dropdown
    ResultsComponent.prototype.classSelected = function (class_d) {
        var class_details = class_d.split('-');
        this.selectedClassName = class_details[1];
        this.getSectionByClassID(class_details[0]);
    };
    // enable manage attendance btn when section isnt empty
    ResultsComponent.prototype.enableBtn = function () {
        this.disableBtn = false;
    };
    // selected exam id
    ResultsComponent.prototype.submitExamIdF = function (exam_id) {
        this.showtable = false;
        this.selectedExamId = exam_id;
        this.grading_type = this.searchGradingType(exam_id);
        if (+this.grading_type === 1) {
            this.showGrading = false;
        }
        else {
            this.showGrading = true;
        }
    };
    // return grading type against exam id
    ResultsComponent.prototype.searchGradingType = function (examid) {
        for (var i = 0; i < this.examsDataList.length; i++) {
            if (+this.examsDataList[i].exam_id === +examid) {
                return this.examsDataList[i].grading_method;
            }
        }
    };
    // return an array with given number length
    ResultsComponent.prototype.counter = function (i) {
        return new Array(i);
    };
    ResultsComponent.prototype.changetab = function () {
        this.showtable = false;
    };
    ResultsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-results',
            template: __webpack_require__(/*! ./results.component.html */ "./src/app/results/results.component.html"),
            styles: [__webpack_require__(/*! ./results.component.scss */ "./src/app/results/results.component.scss")],
            providers: [
                _students_student_information_service__WEBPACK_IMPORTED_MODULE_4__["StudentsInfoService"],
                _classes_manageClass_service__WEBPACK_IMPORTED_MODULE_6__["ClassDataService"],
                _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_5__["SectionDataService"],
                _exams_add_exams_service__WEBPACK_IMPORTED_MODULE_8__["AddExamsService"],
                _subjects_manage_subjects_service__WEBPACK_IMPORTED_MODULE_7__["SubjectsDataService"],
                _shared_services_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
                _settings_settings_service__WEBPACK_IMPORTED_MODULE_9__["SettingsService"],
                _results_results_service__WEBPACK_IMPORTED_MODULE_10__["ResultsService"]
            ]
        }),
        __metadata("design:paramtypes", [_classes_manageClass_service__WEBPACK_IMPORTED_MODULE_6__["ClassDataService"],
            _sections_manageSection_service__WEBPACK_IMPORTED_MODULE_5__["SectionDataService"],
            _exams_add_exams_service__WEBPACK_IMPORTED_MODULE_8__["AddExamsService"],
            _subjects_manage_subjects_service__WEBPACK_IMPORTED_MODULE_7__["SubjectsDataService"],
            _settings_settings_service__WEBPACK_IMPORTED_MODULE_9__["SettingsService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"],
            _shared_services_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            _results_results_service__WEBPACK_IMPORTED_MODULE_10__["ResultsService"]])
    ], ResultsComponent);
    return ResultsComponent;
}());



/***/ }),

/***/ "./src/app/results/results.module.ts":
/*!*******************************************!*\
  !*** ./src/app/results/results.module.ts ***!
  \*******************************************/
/*! exports provided: ResultsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResultsModule", function() { return ResultsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _results_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./results.routing */ "./src/app/results/results.routing.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng2-select */ "./node_modules/ng2-select/index.js");
/* harmony import */ var ng2_select__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ng2_select__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-modal */ "./node_modules/ngx-modal/index.js");
/* harmony import */ var ngx_modal__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ngx_modal__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");
/* harmony import */ var _search_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./search.pipe */ "./src/app/results/search.pipe.ts");
/* harmony import */ var ngx_print__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-print */ "./node_modules/ngx-print/fesm5/ngx-print.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _results_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./results.component */ "./src/app/results/results.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












/* components */

var ResultsModule = /** @class */ (function () {
    function ResultsModule() {
    }
    ResultsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__["NgbModule"],
                ng2_search_filter__WEBPACK_IMPORTED_MODULE_8__["Ng2SearchPipeModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_4__["NgxPaginationModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ReactiveFormsModule"],
                ngx_print__WEBPACK_IMPORTED_MODULE_10__["NgxPrintModule"],
                ng2_select__WEBPACK_IMPORTED_MODULE_5__["SelectModule"],
                ngx_modal__WEBPACK_IMPORTED_MODULE_6__["ModalModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_3__["HttpModule"],
                _results_routing__WEBPACK_IMPORTED_MODULE_2__["routing"]
            ],
            declarations: [_results_component__WEBPACK_IMPORTED_MODULE_12__["ResultsComponent"], _search_pipe__WEBPACK_IMPORTED_MODULE_9__["SearchPipe"]]
        })
    ], ResultsModule);
    return ResultsModule;
}());



/***/ }),

/***/ "./src/app/results/results.routing.ts":
/*!********************************************!*\
  !*** ./src/app/results/results.routing.ts ***!
  \********************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _results_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./results.component */ "./src/app/results/results.component.ts");


var childRoutes = [
    {
        path: '',
        component: _results_component__WEBPACK_IMPORTED_MODULE_1__["ResultsComponent"]
    }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(childRoutes);


/***/ }),

/***/ "./src/app/results/results.service.ts":
/*!********************************************!*\
  !*** ./src/app/results/results.service.ts ***!
  \********************************************/
/*! exports provided: ResultsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResultsService", function() { return ResultsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../shared/services/global.service */ "./src/app/shared/services/global.service.ts");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ResultsService = /** @class */ (function () {
    function ResultsService(http, _globalService) {
        this.http = http;
        this._globalService = _globalService;
        this.headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"](this._globalService.constants.headers);
        this.serverLink = this._globalService.constants.serverLink;
    }
    // *********************** Set session active *****************************
    ResultsService.prototype.getStudentsResultSummary = function (result_data) {
        return this.http
            .post(this.serverLink + 'get/result/summary', result_data, {
            headers: this.headers
        })
            .map(function (response) { return response.json(); });
    };
    ResultsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__["GlobalService"]])
    ], ResultsService);
    return ResultsService;
}());



/***/ }),

/***/ "./src/app/results/search.pipe.ts":
/*!****************************************!*\
  !*** ./src/app/results/search.pipe.ts ***!
  \****************************************/
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
            name: "filter"
        })
    ], SearchPipe);
    return SearchPipe;
}());



/***/ })

}]);
//# sourceMappingURL=results-results-module.js.map