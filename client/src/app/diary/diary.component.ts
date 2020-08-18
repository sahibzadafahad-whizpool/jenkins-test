import { Component, OnInit } from '@angular/core';
import { StudentsInfoService } from '../students/student-information.service';
import { DiaryService } from './diary.service';
import { SectionDataService } from '../sections/manageSection.service';
import { ClassDataService } from '../classes/manageClass.service';
import { SubjectsDataService } from '../subjects/manage-subjects.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'diary',
  templateUrl: './diary.component.html',
  styleUrls: [],
  providers: [
    StudentsInfoService,
    ClassDataService,
    SectionDataService,
    DiaryService,
    CommonService,
    SubjectsDataService
  ]
})
export class DiaryComponent implements OnInit {
  tabtitle = 'Work Diary';
  /* active session */
  public running_session = localStorage.getItem('running_session');

  /* pagination Info */
  pageSize = 10;
  pageNumber = 1;

  // Arrays
  classDataList: Array<any>= [];
  sectionsDataList: Array<any>= [];
  sectionsDataListDiary: Array<any>= [];
  public diaryDataList: Array<any> = [];
  public subjectsDataListDiary: Array<any> = [];
  public no_diaries_found = false;

  diary_date:string = this._commonService.get_today_date();
  /* List student data variables */
  diary_class_id:number
  diary_section_id:number
  diary_subject_id:number
  diary_id: number;
  class_id: number;
  diary_text: string;
  diary_topic: string;
  std_sectionId: string;
  year: string;
  std_classId: number;
  attendance_date: string = this._commonService.get_today_date();
  sectionId: number;
  selectedDate: string = null;

  attendanceUnixTime: any;
  add_edit_diary_mode: string = 'add'
  disableBtn = true;
  attendanceNotifiction = 0;
  disableSelectSection = true;
  disableSelectSectionDiary = true;
  admin_level: any;
  loadData;

  selected_unix_date: any;

  // create instance of services to access method from services
  constructor(
    private _StudentsInfoService: StudentsInfoService,
    private _classDataService: ClassDataService,
    private _sectionDataService: SectionDataService,
    private _diaryService: DiaryService,
    private modalService: NgbModal,
    private _commonService: CommonService,
    private _subjectsDataService: SubjectsDataService,
  ) {}

  // this function auto called when component loads
  ngOnInit() {
    // get admin level
    this.admin_level = localStorage.getItem('admin_level');

    this.getClassData();
  }

  add_diary(){
      let data = {};
      data['class_id'] = this.diary_class_id
      data['section_id'] = this.diary_section_id
      data['subject_id'] = this.diary_subject_id
      data['diary_text'] = this.diary_text.trim()
      data['diary_topic'] = this.diary_topic.trim()
      data['diary_date'] = this.diary_date

      this._diaryService.add_diary(data).subscribe(result => {
          if(result.status==1){
            this._commonService.successToaster(
              result.msg,
              'Success!'
            );
            this.modalService.dismissAll();
          }
          else{
              this._commonService.errorToaster(
                result.msg,
                'Error!'
              );
          }
      });
  }

  edit_diary(){
      let data = {};
      data['diary_id'] = this.diary_id
      data['class_id'] = this.diary_class_id
      data['section_id'] = this.diary_section_id
      data['subject_id'] = this.diary_subject_id
      data['diary_text'] = this.diary_text.trim()
      data['diary_topic'] = this.diary_topic.trim()
      data['diary_date'] = this.diary_date

      this._diaryService.edit_diary(data).subscribe(result => {

        if(result.status==1){
          this._commonService.successToaster(
            result.msg,
            'Success!'
          );
          this.modalService.dismissAll();
          
          //refresh current loaded results
          this.load_diary();

        }
        else{
            this._commonService.errorToaster(
              result.msg,
              'Error!'
            );
        }
    });

  }

  prepareEditDiary(content,index){
      let diary_data = this.diaryDataList[0].diary[index]

      this.diary_id = diary_data.diary_id
      this.diary_topic = diary_data.diary_topic
      this.diary_text = diary_data.diary
      
      this.diary_class_id = diary_data.class_id
      this.getSectionByDiaryClassID(this.diary_class_id);

      this.diary_section_id = diary_data.section_id
      this.getSubjectByClassSecId(this.diary_class_id,this.diary_section_id)

      this.diary_subject_id = diary_data.subject_id

      this.diary_date = this.diaryDataList[0].date
      

      this.add_edit_diary_mode = 'edit'

      this.openNgModal(content, 'md');

  }

  deleteDiary(diary_id){
    swal({
      title: 'Are you sure?',
      text: 'You wont be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        
        let data = {diary_id:diary_id};

        // if user confirm then call delete API
        this._diaryService
          .delete_diary(data)
          .subscribe(result => {
              if(result.status==1){
                this._commonService.successToaster(result.msg, 'Success!');
                this.load_diary();
              }
              else{
                this._commonService.errorToaster(result.msg, 'Error!');
              }
          });
      }
    });
  }

  public getClassData() {
    this._classDataService.getClassesF().subscribe(result => {
        this.classDataList = [];
        if(result.status==1){
            this.classDataList = result.data;
        }          
    });
  }

  public getSectionByClassID(class_id) {
    // * disbale btn untill section selcted and empty section array when selected class change
    this.sectionsDataList = [];
    this.std_sectionId = null;
    this.disableBtn = true;
    this.sectionsDataList.unshift('Select Section')

    this._sectionDataService.getSectionF(class_id).subscribe(result => {
      this.sectionsDataList = [];
      if(result.status==1){
        this.sectionsDataList = result.data;
      }
    });
  }

  public load_diary() {

    this.selectedDate = this.attendance_date;

    // ** convert selected time to Unix timestamp
    this.attendanceUnixTime = new Date(this.selectedDate).getTime() / 1000;
    this.selected_unix_date = this.attendanceUnixTime;

    let data = {};
    data['date'] = this.selected_unix_date
    data['class_id'] = this.std_classId;
    data['section_id'] = this.std_sectionId;
	data['multiple_days'] = false

    this._diaryService.viewDiary(data).subscribe(result => {
      this.diaryDataList = [];
      if(result.status==1){
        this.no_diaries_found = false;
        this.diaryDataList = result.data;
      }
      else{
        this.no_diaries_found = true;
      }

    });
    
  }

  public classSelected(class_id) {
    this.disableSelectSection = false;
    this.getSectionByClassID(class_id);
  }
  
  public classSelectedDiary(class_id) {
    this.disableSelectSectionDiary = false;
    this.sectionsDataListDiary = [];
    this.subjectsDataListDiary = [];
    delete this.diary_subject_id
    this.getSectionByDiaryClassID(class_id);
  }

  public getSectionByDiaryClassID(class_id) {
    // * disbale btn untill section selcted and empty section array when selected class change
    this.sectionsDataListDiary = [];
    delete this.diary_section_id
    this.sectionsDataListDiary.unshift('Select Section')
    this._sectionDataService.getSectionF(class_id).subscribe(result => {
      this.sectionsDataListDiary = [];
      if(result.status==1){
        this.sectionsDataListDiary = result.data;
      }
    });
  }

  get_section_subjects(section_id){
      delete this.diary_subject_id
      this.getSubjectByClassSecId(this.diary_class_id,section_id)
  }

  public getSubjectByClassSecId(class_id, section_id) {
    this.subjectsDataListDiary = [];
    
    const type = 'all';
    this._subjectsDataService
      .getSubjectByClassSecIdF(class_id, section_id, this.running_session)
      .subscribe(result => {
        if (result.status === 1) {
          this.subjectsDataListDiary = result.data;
        }
        if (result.status === 0) {
          this._commonService.warningToaster(
            'No subject are added against class',
            '!'
          );
        }
      });
  }

  // enable manage attendance btn when section isnt empty
  public enableBtn() {
    this.disableBtn = false;
    this.disableSelectSection = true;
  }

  // hide success toaster after 2 secs
  public FadeOutToaster() {
    setTimeout(() => {
      this.attendanceNotifiction = 0;
    }, 1000);
  }

  nl2br_custom(str){
    str = str.replace(/(?:\r\n|\r|\n)/g, '<br>');
    return str
  }

  openNgModal(content, size) {
    this.modalService.open(content, { size: size });
  }

  openAddDiaryModal(content){
      this.add_edit_diary_mode = 'add'
      delete this.diary_id
      delete this.diary_class_id
      delete this.diary_section_id
      delete this.diary_subject_id
      delete this.diary_text
      delete this.diary_topic
      this.diary_date = this._commonService.get_today_date();
      this.openNgModal(content, 'md');
  }

}
