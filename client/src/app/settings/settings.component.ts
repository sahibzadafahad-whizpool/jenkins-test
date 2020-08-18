import { Component, OnInit } from '@angular/core';

import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsService } from './settings.service';
import { GlobalService } from './../shared/services/global.service';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [SettingsService, CommonService]
})
export class SettingsComponent implements OnInit {
  // default
  public loadData;
  public pageSize = 10;
  public pageNumber = 1;

  // school info update
  public school_name = '';
  public school_phone: number;
  public school_address = '';
  public school_logo = '';
  //public updated_school_logo = 'assets/images/avatar.png';
  public updated_school_logo = '';
  public fee_print_columns = '';
  public school_id: number;
  public fee_due_date: number;
  public late_fee: number;
  

  public s_date = '';
  public e_date = '';

  public u_session_name;
  public u_s_date;
  public u_e_date;
  public session_id;
  public sess_id;

  public selected_session;
  // array
  public sessionData: Array<any> = [];
  public promotionalData: Array<any> = [];
  public u_promotional_message;
  public activeSession = '';

  public session_name = '';

  public admin_level: any;
  public template_id = ''
  public fee_templates = []
  private feemonth = 0;
  private feeyear = 0;
  public filesToUpload: Array<File> = [];
  uploadImage = false;
  imgValidation = true;
  
  public baseURL = ''

  constructor(
    private modalService: NgbModal,
    private _globalService: GlobalService,
    private _settingsService: SettingsService,
    private _commonService: CommonService,
  ) {}

  ngOnInit() {

    this.baseURL = this._settingsService.imagesBaseServer

	var date = new Date();	  
    // get admin level to set roles
    this.admin_level = localStorage.getItem('admin_level');
    this.get_sessionDetails();
    this.get_activeSession();
    this.get_schoolInfo();
    this.get_promotionalData();
	this.feemonth = date.getMonth()+1;
	this.feeyear = date.getFullYear();
  
    this.getFeeTemplatesList();

  }

  public getFeeTemplatesList(){
      this._settingsService.get_fee_templates_list().subscribe(result => {
          this.fee_templates = result
      });
  }

  // ********************************************************** **********/
  // ************************* get promotional message ***************************/
  // ******************************************************************* */
	 public get_promotionalData() {
		const data = '';
		this._settingsService.get_promotionalMessages(data).subscribe(result => {
		  if (result.status === 1) {
			this.promotionalData = result.data;
			this.u_promotional_message = this.promotionalData[0].message;
			//console.log(this.u_promotional_message);
		  } else if (result.status === 0) {
			this._commonService.warningToaster(result.msg, 'Failed!');
		  } else {
			this._commonService.errorToaster(result.msg, 'Error!');
		  }
		});
	  }
   // ********************************************************** **********/
  // *************************Update Promotional Message ***************************/
  // ******************************************************************* */
	public onSubmitUpdatePromotionalMessage(submittedEvent) {
		const updatedData = {
		  promotional_message_id: 1,
		  message: submittedEvent.value.u_promotional_message
		};
		this._settingsService.update_promotionalMessages(updatedData).subscribe(result => {
		  if (result.status === 1) {
			this._commonService.successToaster('Updated Successfully', 'Success!');
			//this.get_sessionDetails();
		  } else {
			this._commonService.errorToaster('Some error try again', 'Failed!');
		  }
		});
  }
  

  // ********************************************************** **********/
  // ************************* get Session details ***************************/
  // ******************************************************************* */
  public get_sessionDetails() {
    const data = 'all';
    this._settingsService.get_sessionDetailsF(data).subscribe(result => {
      if (result.status === 1) {
        this.sessionData = result.data;
      } else if (result.status === 0) {
        this._commonService.warningToaster(result.msg, 'Failed!');
      } else {
        this._commonService.errorToaster(result.msg, 'Error!');
      }
    });
  }

  // ********************************************************** **********/
  // ************************* get active session ***************************/
  // ******************************************************************* */
  public get_activeSession() {
    this._settingsService.get_activeSessionF().subscribe(result => {
      if (result.status === 1) {
        this.activeSession = result.data[0].session_name;
      } else if (result.status === 0) {
        this._commonService.warningToaster(result.msg, 'Failed!');
      } else {
        this._commonService.errorToaster(result.msg, 'Error!');
      }
    });
  }

  // ********************************************************** **********/
  // ************************* get School info  ***************************/
  // ******************************************************************* */
  public get_schoolInfo() {
    this._settingsService.get_schoolInfoF().subscribe(result => {
      if (result.status === 1) {
        let schoolInfo = null;
        schoolInfo = result.data[0];
        this.template_id = schoolInfo.template_id
        this.school_name = schoolInfo.school_name;
        this.school_phone = schoolInfo.school_num;
        this.school_address = schoolInfo.school_address;
        this.school_logo = schoolInfo.logo;
        if(this.school_logo){
          this.updated_school_logo = schoolInfo.logo;
        }
        else{
          this.updated_school_logo = '';
        }
        
        this.school_id = schoolInfo.school_id;
		this.fee_due_date = schoolInfo.fee_due_date;
		this.fee_print_columns = schoolInfo.fee_print_columns;		
        this.late_fee = schoolInfo.late_fee;
		localStorage.setItem('school_name',schoolInfo.school_name);
		//console.log(localStorage.getItem("school_name"));
      } else {
        this._commonService.errorToaster(result.msg, 'Error!');
      }
    });
  }

  // *********************************************************************************************************************** */
  /********************************************Add , Update , Delete  from DB Methods************************************** */
  // *********************************************************************************************************************** */

  // ********************************************************** **********/
  // *************************Add session ***************************/
  // ******************************************************************* */

  public onSubmitAddSession(submittedEvent) {
    const data = {
      session_name: submittedEvent.value.session_name.replace(/\s+/g, ''),
      start_date: new Date(submittedEvent.value.s_date).getTime() / 1000,
      end_date: new Date(submittedEvent.value.e_date).getTime() / 1000
    };
    this._settingsService.add_newSession(data).subscribe(result => {
      if (result.status === 1) {
        this._commonService.successToaster('Added Successfully', 'Success!');
        this.get_sessionDetails();
        this.get_activeSession();
      } else if (result.status === 3) {
        this._commonService.warningToaster(result.msg, 'Failed!');
      } else {
        this._commonService.errorToaster(result.msg, 'Error!');
      }
    });
  }

  // ********************************************************** **********/
  // *************************Set active session ***************************/
  // ******************************************************************* */
  public setSessionActive(session_id) {
    const update_data = {
      session_id: session_id,
      status: 1
    };

    swal({
      title: 'Are you sure to update active session?',
      text: 'All new students will be registered against selected session ..! ',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Set New Session!'
    }).then(result => {
      if (result.value) {
        this._settingsService
          .set_sessionActiveF(update_data)
          .subscribe(respResult => {
            if (respResult.status === 1) {
              this._commonService.successToaster(
                'Updated Successfully',
                'Success!'
              );
              this.get_sessionDetails();
              this.get_activeSession();
              location.reload();
            } else {
              this._commonService.errorToaster(respResult.msg, 'Failed!');
            }
          });
      }
    });
  }

  // ********************************************************** **********/
  // *************************Update session info ***************************/
  // ******************************************************************* */
  public onSubmitUpdateSession(submittedEvent) {
    const updatedData = {
      session_id: submittedEvent.value.sess_id,
      session_name: submittedEvent.value.session_name,
      start_date: new Date(submittedEvent.value.u_s_date).getTime() / 1000,
      end_date: new Date(submittedEvent.value.u_e_date).getTime() / 1000
    };
	
    this._settingsService.update_SessionInfo(updatedData).subscribe(result => {
      if (result.status === 1) {
        this._commonService.successToaster('Updated Successfully', 'Success!');
        this.get_sessionDetails();
      } else {
        this._commonService.errorToaster('Some error try again', 'Failed!');
      }
    });
  }

  // ********************************************************** **********/
  // *************************Update school Info ***************************/
  // ******************************************************************* */

  public schoolInfoUpdate(submittedEvent) {
	  
	const imagesData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    if (files.length >= 1) {
      this.uploadImage = true;
    }

    for (let i = 0; i < files.length; i++) {
      imagesData.append('uploads[]', files[i], files[i]['name']);
    }
	
    const school_id = submittedEvent.value.school_id;
    const update_data = {
      school_name: submittedEvent.value.school_name,
      school_num: submittedEvent.value.school_phone,
      school_address: submittedEvent.value.school_address,
      fee_due_date: this.fee_due_date,
      fee_print_columns: this.fee_print_columns,
      late_fee: this.late_fee
    };

    this._settingsService
      .update_schoolInfo(this.school_id, update_data)
      .subscribe(result => {
        if (result.status === 1) {
			if (this.uploadImage === true) {
			  imagesData.append('id', this.school_id); 
			  // this.myInputVariable.nativeElement.value = "";

              let toaster_instance = this._commonService.progressToaster(
                'Please wait, processing your request',
                'Saving!'
              );
              console.log(toaster_instance)
              // add school logo image
			  this._settingsService.uploadLogo(imagesData).subscribe(res_result => {
				this.filesToUpload = [];
				this.uploadImage = false;
				//this.getStudentsByClassID(submitedAddStd.stud_classId);
                  //location.reload()
                  this.get_schoolInfo();
                  toaster_instance.message = "Updated successfully"
                  toaster_instance.disableTimeOut = false
                  toaster_instance.timeOut = 3000
			  });
			}
            else{
                //location.reload()
                this.get_schoolInfo();
                let toaster_response = this._commonService.successToaster(
            'Updated Successfully',
            'Success!'
          );
                console.log(toaster_response)
            }
            
        } else {
          this._commonService.errorToaster(result.msg, 'Error!');
        }
      });
  }
  
  fee_template_changed(event){
      this.template_id = event.target.value
  }

	public UpdatefeeSettings(submittedEvent){
    let template_id = this.template_id;
    if(template_id!=""){
      
	  const update_data = {
        template_id:template_id,
		  school_name: this.school_name,
		  school_num: this.school_phone,
		  school_address: this.school_address,
		  fee_due_date: submittedEvent.value.fee_due_date,
		  fee_print_columns: submittedEvent.value.fee_print_columns,
		  late_fee: submittedEvent.value.late_fee
		};
		this._settingsService
		  .update_schoolInfo(this.school_id, update_data)
		  .subscribe(result => {
			if (result.status === 1) {			
			  this._commonService.successToaster(
				'Updated Successfully',
				'Success!'
			  );
			} else {
			  this._commonService.errorToaster(result.msg, 'Error!');
			}
		  });
	}
    else{
        this._commonService.errorToaster(
          'Please select a template',
          ''
        );
    }
    
	}
  // * open modal for update session info

  public openUpdateSessionModal(modalName, index) {
    this.selected_session = this.sessionData[index];

    this.u_session_name = this.selected_session['session_name'];
    this.u_s_date = this._commonService.get_date_from_unix(
      this.selected_session['start_date']
    );

    this.u_e_date = this._commonService.get_date_from_unix(
      this.selected_session['end_date']
    );

    this.sess_id = this.selected_session['session_id'];
    this.openNgModal(modalName, 'md');
  }

  // * pagination
  public pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

  // new modal
  public openNgModal(content, size) {
    this.modalService.open(content, { size: size });
  }

  // close modal
  public closeModal(modal) {
    modal.close();
  }
  
  public fileChangeEvent(fileInput: any) {
    const filedata = <Array<File>>fileInput.target.files;

    if(filedata.length){
    const reader = new FileReader();
    reader.readAsDataURL(filedata[0]);

    reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
            const width = img.naturalWidth;
    if (!this._commonService.validateFile(filedata[0].name)) {
      this.imgValidation = false;
      this.uploadImage = false;
              this._commonService.errorToaster(
                'Invalid file type',
                ''
              );
    } else {
              //check image is <= 1000px
              if(width<=1000){
      this.filesToUpload = filedata;
      this.imgValidation = true;
    }
              else{
                  this.imgValidation = false;
                  this.uploadImage = false;
                  this._commonService.errorToaster(
                    'Please select image less than 1000px',
                    ''
                  );
              }
              
            }
        };

    };
    }    
  }

}
