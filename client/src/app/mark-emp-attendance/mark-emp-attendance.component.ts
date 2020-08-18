import { Component, OnInit } from '@angular/core';
import { MarkEmpAttendanceService } from './mark-emp-attendance.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../shared/services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './mark-emp-attendance.component.html',
  styleUrls: ['./mark-emp-attendance.component.scss'],
  providers: [
    MarkEmpAttendanceService,
    CommonService
  ]
})
export class MarkEmpAttendanceComponent implements OnInit {
  /* active session */
  public running_session = localStorage.getItem('running_session');

  role_xref_id = ''
  role_xref_name = ''
  attendance_date: string = this._commonService.get_today_date();
  attendance_max_date: string = this._commonService.get_today_date();
  attend_status = {};
  showTable = false;
  employees_data: Array<any>;
  role_xref_data:Array<any>;

  // create instance of services to access method from services
  constructor(
    private modalService: NgbModal,
    private _markEmpAttendanceService: MarkEmpAttendanceService,
    private _commonService: CommonService,
    private route: ActivatedRoute
  ) {}

  // this function auto called when component loads
  ngOnInit() {
      this.get_role_xref();

      this.route.params.subscribe( params => {
          let role = params.role;
          if(role=='teacher'){
              this.role_xref_id = '1';
          }
          else{
              this.role_xref_id = '2';
          }
      });

  }

  get_role_xref(){
    this._markEmpAttendanceService.get_role_xref().subscribe(result => {
      
      this.role_xref_data = result.data;

    });
  }

  changeEmployeeAttendanceStatus(value,checkbox){
      if(value=="P"){
          this.attend_status[checkbox] = "A";
      }
      else{
        this.attend_status[checkbox] = "P";
      }
  }

  markEmployeeAttendance(){
      let data = {};
      data['running_session'] = this.running_session;
      data['timestamp'] = this._commonService.convert_date_to_timestamp(this.attendance_date);

      const date = this.attendance_date.split('-');
      data['day'] = Number(date[2]);
      data['month'] = Number(date[1]);

      let attendance = [];

      for(let key in this.attend_status){

          let key_splitted = key.split("_")
          let employee_id = key_splitted[1];

          let inner_array = {};
          inner_array['employee_id'] = employee_id;
          inner_array['attend_status'] = this.attend_status[key];

          attendance.push(inner_array);

      }

      data['attendance'] = attendance;

      this._markEmpAttendanceService
      .markEmployeeAttendance(data)
      .subscribe(result => {
          if(result.hasOwnProperty('status') && result.status==1){
              this._commonService.successToaster('Attendance marked Successfully', 'Success!');
          }
          else{
              this._commonService.errorToaster('Error, please contact support', 'Ooops!');
          }
      });

  }

  onSubmitLoadEmployees(event){
      //we have to load our employees here on the basis of role xref id

      this.role_xref_name = this.get_role_xref_name(this.role_xref_id);

      let data={};
      data['role_xref_id'] = this.role_xref_id;
      let date = this._commonService.convert_date_to_timestamp(this.attendance_date);
      data['attendance_date'] = date;

      this._markEmpAttendanceService.get_employees_for_attendance(data).subscribe(result => {
          if(result.status){
              this.employees_data = result.data;
              for(let i=0;i<result.data.length;i++){
                  this.attend_status['employee_'+result.data[i].employee_id] = result.data[i].attend_status;
              }
              this.showTable = true;
          }
      });
  }

  get_role_xref_name(role_xref_id){

      for(let i=0;i<this.role_xref_data.length;i++){
          if(this.role_xref_data[i].role_xref_id==role_xref_id){
              return this.role_xref_data[i].role_xref_name;
          }
      }

      return '';
  }

  // open modal
  public openModal(modal) {
    modal.open();
  }

  // close modal
  public closeModal(modal) {
    modal.close();
  }
}
