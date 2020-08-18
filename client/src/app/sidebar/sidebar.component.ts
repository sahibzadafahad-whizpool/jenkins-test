import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [
    CommonService,
  ]
})
export class SidebarComponent implements OnInit {
  public samplePagesCollapsed = true;
  constructor(private _commonService: CommonService) {
  }
  user_name = 'Admin';

  admin_level;
  role_xref_id;
  role_xref_details = [];
  user_type;

  allowed_panels = [];

  ngOnInit() {
    this.user_name = localStorage.getItem('user_name');
    this.admin_level = localStorage.getItem('admin_level');
    this.role_xref_id = localStorage.getItem('role_xref_id');
    
    this.allowed_panels = ["Students","Exams","Attendance","Results","Assignments","Quizes","StudentAttendance","StudentAttendanceReport","Diary"];

    this._commonService.get_role_xref().subscribe(respresult => {
        
        this.role_xref_details = respresult.data;
        
        this.set_user_type();

    });

  }

  is_user_allowed(panel_name){

      //we will here check if this user is allowed on panels or not
      //first check if the user is super admin and admin then allow on all
      if(this.admin_level==1 || this.admin_level==2){
          return true;
      }
      
      //here means user is not an admin nor super admin
      if(this.allowed_panels.indexOf(panel_name)>-1){
          return true;
      }
      else{
          return false;
      }
  }

  get_role_name_from_role_xref_id(role_xref_id,role_xref_details){
      for(let i=0;i<role_xref_details.length;i++){
          if(role_xref_id == role_xref_details[i].role_xref_id){
              return role_xref_details[i].role_xref_name;
          }
      }
  }

  set_user_type(){
      if(this.admin_level==1){
          this.user_type = 'Super Admin';
      }
      else if(this.admin_level==2){
          this.user_type = 'Admin';
      }
      else{
          //this is not an admin, this is teacher or some thing else
          //lets find it
          this.user_type = this.get_role_name_from_role_xref_id(this.role_xref_id,this.role_xref_details);
      }
  }

}
