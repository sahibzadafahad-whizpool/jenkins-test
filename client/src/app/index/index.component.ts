import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { AnnouncementsService } from '../announcements/announcements.service';
import { Router } from '@angular/router';
import { IndexService } from './index.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [IndexService, AnnouncementsService],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {
  showloading = false;
  totalStudents = '';
  totalTeachers = '';
  totalParents = '';
  totalClasses = '';
  totalSections = '';
  totalUsers = '';
  announcemnts = '';

  // array
  activeAnnouncementDetails: Array<any> = [];

  public AnimationBarOption;
  public running_session = localStorage.getItem('running_session');

  constructor(
    private _indexService: IndexService,
    private _router: Router,
    private _announcementsService: AnnouncementsService
  ) {}

  ngOnInit() {
    this.get_counts();
    this.get_activeAnnouncements();
  }

  // *********************************************************************************************************************** */
  /**********************************************************Read Data from DB Methods************************************** */
  // *********************************************************************************************************************** */

  public get_counts() {
    this._indexService
      .get_totalCounts(this.running_session)
      .subscribe(result => {
        if (result.status === 1) {
          
          this.totalStudents = result.data[0][0].count_total;
          this.totalTeachers = result.data[1][0].count_total;
          this.totalParents = result.data[2][0].count_total;
          this.totalClasses = result.data[3][0].count_total;
          this.totalSections = result.data[4][0].count_total;
          this.totalUsers = result.data[5][0].count_total;
        } else {
          console.log(result);
        }
      });
  }

  // public get_totalTeachers() {
  //   const count_type = 'teachers';
  //   this._indexService
  //     .get_totalStudentsF(count_type, this.running_session)
  //     .subscribe(result => {
  //       if (result.status === 1) {
  //         this.totalTeachers = result.data[0].count_total;
  //       } else if (result.status === 0) {
  //         this.totalTeachers = 'No Teachers Added ';
  //       } else {
  //         console.log(result);
  //       }
  //     });
  // }

  // public get_totalParents() {
  //   const count_type = 'parents';
  //   this._indexService
  //     .get_totalStudentsF(count_type, this.running_session)
  //     .subscribe(result => {
  //       if (result.status === 1) {
  //         this.totalParents = result.data[0].count_total;
  //       } else if (result.status === 0) {
  //         this.totalParents = 'No Parent Added ';
  //       } else {
  //         console.log(result);
  //       }
  //     });
  // }

  // public get_totalUsers() {
  //   const count_type = 'users';
  //   this._indexService
  //     .get_totalStudentsF(count_type, this.running_session)
  //     .subscribe(result => {
  //       if (result.status === 1) {
  //         this.totalUsers = result.data[0].count_total;
  //       } else if (result.status === 0) {
  //         this.totalUsers = 'No User Added ';
  //       } else {
  //         console.log(result);
  //       }
  //     });
  // }

  // public get_totalClasses() {
  //   const count_type = 'classes';
  //   this._indexService
  //     .get_totalStudentsF(count_type, this.running_session)
  //     .subscribe(result => {
  //       if (result.status === 1) {
  //         this.totalClasses = result.data[0].count_total;
  //       } else if (result.status === 0) {
  //         this.totalClasses = 'No Class added ';
  //       } else {
  //         console.log(result);
  //       }
  //     });
  // }

  // public get_totalSections() {
  //   const count_type = 'sections';
  //   this._indexService
  //     .get_totalStudentsF(count_type, this.running_session)
  //     .subscribe(result => {
  //       if (result.status === 1) {
  //         this.totalSections = result.data[0].count_total;
  //       } else if (result.status === 0) {
  //         this.totalSections = 'No Section Added ';
  //       } else {
  //         console.log(result);
  //       }
  //     });
  // }

  public get_activeAnnouncements() {
    this.announcemnts = '';
    this._announcementsService.getActiveAnnouncements().subscribe(result => {
      if (result.status === 1) {
        this.activeAnnouncementDetails = result.data;
        // console.log(this.announcementDetails);
      }
      if (result.status === 0) {
        this.announcemnts = 'No Announcement available';
      }

      if (result.status === 403) {
        console.log(result.msg);
      }
    });
  }

  // ************************************************************************************************************* */
  /*********************************************General   Methods************************************************ */
  // ************************************************************************************************************* */

  public redirect(pagename) {
    const path = '/' + pagename;
    this._router.navigate([path]);
  }
}
