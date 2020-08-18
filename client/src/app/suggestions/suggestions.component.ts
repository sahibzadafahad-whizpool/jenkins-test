import { SuggestionsService } from './suggestions.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

import { NgbModal,NgbModalRef,NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-expense',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css'],
  providers: [SuggestionsService, CommonService]
})
export class SuggestionsComponent implements OnInit {
  public admin_level;
  public loadData;
  /* active session */
  public running_session = localStorage.getItem('running_session');

  public processing_request = false;
  public suggestions_list = [];
  public school_info: {};

  constructor(
    private modalService: NgbModal,
    private _commonService: CommonService,
    private _suggetionsService: SuggestionsService,
  ) {}

  ngOnInit() {
    
    this.admin_level = localStorage.getItem('admin_level');

    this.get_suggestions();

  }

  public get_suggestions(){

    this.processing_request = true;
    this._suggetionsService.get_suggestions().subscribe(result => {
      this.processing_request = false;
      if (result.status === 1) {
          
          this.suggestions_list = result.data

      } else {
        this._commonService.errorToaster('Server Error, Try Again', 'Failed!');
        console.log(result.msg);
      }
    });

}

show_parent_detail(primary_parent_type,parent_detail,mother_detail,guardian_detail){
  if(primary_parent_type=='father'){
      return parent_detail
  }
  else if(primary_parent_type=='mother'){
      return mother_detail
  }
  else{
      return guardian_detail
  }
}

show_pretty_date(datetime){
    let datetime_object = new Date(datetime)
    let timestamp = Math.floor(datetime_object.getTime()/1000)
    return this._commonService.get_pretty_date(timestamp);
}

show_suggestion_text(str){
    str = str.replace(/(?:\r\n|\r|\n)/g, '<br>');
    return str
}

}
