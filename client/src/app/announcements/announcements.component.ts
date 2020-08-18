import { Component, OnInit } from '@angular/core';
import { ClassDataService } from '../classes/manageClass.service';
import { AnnouncementsService } from './announcements.service';

import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../shared/services/common.service';
@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
  providers: [ClassDataService, AnnouncementsService, CommonService]
})
export class AnnouncementsComponent implements OnInit {
  // default

  public loadData;
  public pageSize = 10;
  public pageNumber = 1;
  /* active session */
  public running_session = localStorage.getItem('running_session');

  // add announcements variables

  public announc_for: Array<any>;
  public announc_title: string;
  public announc_desc: string;
  public announc_date: string;
  public announcE_date: string;

  // update announcement variables
  public u_announc_for: Array<any> = [];
  public u_announc_title: string;
  public u_announc_desc: string;

  public selected_announcement_id: number;

  // arrays

  public classdataList: Array<any> = [];
  public activeAnnouncementDetails: Array<any> = [];
  public expiredAnnouncementDetails: Array<any> = [];
  public announcementDetails: Array<any> = [];

  // notification

  public addAnnouncNoti = '';
  public successNotifi = false;
  public alertType = '';
  public dbRespMsg = '';
  public dbERespMsg = '';
  public dbUpRespMsg = '';
  public updateAnnouncMsg = '';
  public updateNotifi = false;

  admin_level: any;

  constructor(
    private _commonService: CommonService,
    private _classDataService: ClassDataService,
    private _announcementsService: AnnouncementsService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    // get admin level
    this.admin_level = localStorage.getItem('admin_level');
    this.getClassData();
    this.getAnnouncements();
  }

  // *********************************************************************************************************************** */
  /**********************************************************Read Data from DB Methods************************************** */
  // *********************************************************************************************************************** */

  // ********************************************************** **********/
  // *********************** Get all Classes data ************************/
  // ******************************************************************* */

  public getClassData() {
    this._classDataService.getClassesF().subscribe(result => {
      this.classdataList = result;
    });
  }

  // ********************************************************** **********/
  // *********************** Get all Announcements ************************/
  // ******************************************************************* */

  public getAnnouncements() {
    this._announcementsService.getActiveAnnouncements().subscribe(result => {
      if (result.status === 1) {
        this.activeAnnouncementDetails = result.data;
        // console.log(this.announcementDetails);
      }
      if (result.status === 0) {
        this.dbRespMsg = 'No Announcement available';
      }

      if (result.status === 403) {
        this.dbRespMsg = result.msg;
      }
    });

    // expired announcements
    this._announcementsService.getExpiredAnnouncements().subscribe(result => {
      if (result.status === 1) {
        this.expiredAnnouncementDetails = result.data;
        // console.log(this.announcementDetails);
      }
      if (result.status === 0) {
        this.dbERespMsg = 'No Announcement available';
      }

      if (result.status === 403) {
        this.dbERespMsg = result.msg;
      }
    });
  }

  // ********************************************************** **********/
  // ********* Get Single Announcements Data for update ********************/
  // ******************************************************************* */

  get_singleAnnouncementData(announcement_id) {
    let announcementString = null;
    this._announcementsService
      .get_singleAnnouncementDataF(announcement_id)
      .subscribe(result => {
        if (result.status === 1) {
          this.announcementDetails = result.data;
          announcementString = this.announcementDetails[0];
          this.u_announc_title = announcementString.announc_title;
          this.u_announc_desc = announcementString.announc_details;
          // this.u_announc_for = announcementString.announc_for;
        } else {
          this.dbUpRespMsg = result.msg;
        }
      });
  }

  // *********************************************************************************************************************** */
  /**********************************************************Add Update  Data  Methods************************************** */
  // *********************************************************************************************************************** */

  // ********************************************************** **********/
  // *********************** Add new announcements ************************/
  // ******************************************************************* */

  public add_newAnnouncement(submitEvent) {
    const announcement_data = submitEvent.value;

    // ** convert date to Unix timestamp
    const announc_date =
      new Date(announcement_data.announc_date).getTime() / 1000;
    const announc_Expiredate =
      new Date(announcement_data.announcE_date).getTime() / 1000;

    const announcement_for = announcement_data.announc_for;

    const new_announcement_data = {
      announc_title: announcement_data.announc_title,
      announc_details: announcement_data.announc_desc,
      announcement_date: announc_date,
      announcement_expire: announc_Expiredate,
      announc_for: announcement_for.toString()
    };
    // calling function
    this._announcementsService
      .add_newAnnouncementF(new_announcement_data)
      .subscribe(result => {
        if (result.status === 1) {
          this._commonService.successToaster('Added Successfully', 'Success!');
          this.getAnnouncements(); // call function to reload the data after inserting new data
          submitEvent.reset();
          this.closeModal();
        } else {
          this._commonService.errorToaster(result.msg, 'Failed!');
        }
      });
  }

  // ********************************************************** **********/
  // *********************** Update announcements ************************/
  // ******************************************************************* */

  public onSubmitupdateAnnouncement(submitEvent) {
    const announcement_id = this.selected_announcement_id;
    const update_announc_data = submitEvent.value;
    let update_type; // update all if user selected new announcement receving details
    let update_data;
    // check user wants to update announcement receving details
    if (update_announc_data.u_announc_for.length <= 0) {
      update_type = 'not_all';
      update_data = {
        u_announc_title: update_announc_data.u_announc_title,
        u_announc_desc: update_announc_data.u_announc_desc
      };
    } else {
      update_type = '999';
      update_data = {
        u_announc_for: update_announc_data.u_announc_for.toString(),
        u_announc_title: update_announc_data.u_announc_title,
        u_announc_desc: update_announc_data.u_announc_desc
      };
    }

    this._announcementsService
      .update_announcement(announcement_id, update_type, update_data)
      .subscribe(result => {
        if (result.status === 1) {
          this._commonService.successToaster(
            'Updated Successfully',
            'Success!'
          );
          this.closeModal();
        } else {
          this._commonService.errorToaster(result.msg, 'Failed!');
        }

        this.getAnnouncements();
      });
  }

  // ********************************************************** **********/
  // *********************** Delete announcements ************************/
  // ******************************************************************* */

  onClickDelAnnouncment(announcement_id: number) {
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
        // if user confirm then call delete API
        this._announcementsService
          .deleteAnnouncement(announcement_id)
          .subscribe(respresult => {
            if (respresult.status === 1) {
              // show deleted notification
              this._commonService.successToaster(
                'Announcement has been deleted.',
                'Deleted!'
              );
              this.getAnnouncements();
            } else {
              this._commonService.errorToaster(respresult.msg, 'Error!');
            }
          });
      }
    });
  }
  // ************************************************************************************************************* */
  /*********************************************General   Methods************************************************ */
  // ************************************************************************************************************* */

  /********************************* pagination Info ****************************/

  // ********* Open exam update modal */
  public openUpdateAnnouncModal(modal, announcement_id: number) {
    this.u_announc_for = [];

    this.openNgModal(modal, 'md');
    this.selected_announcement_id = announcement_id;
    this.get_singleAnnouncementData(announcement_id);
  }

  public pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

  // hide success toaster after 2 secs
  public FadeOutToaster() {
    setTimeout(() => {
      this.successNotifi = false;
    }, 2000);
  }

  public FadeOutUpdateToaster() {
    setTimeout(() => {
      this.updateNotifi = false;
    }, 2000);
  }

  // open modal
  public openModal(modal) {
    modal.open();
  }

  // close modal
  public closeModal() {
    this.modalService.dismissAll();
  }

  // new modal
  public openNgModal(content, size) {
    this.modalService.open(content, { size: size });
  }
}
