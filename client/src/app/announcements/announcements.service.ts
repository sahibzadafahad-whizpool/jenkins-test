import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from '../shared/services/global.service';

@Injectable()
export class AnnouncementsService {
  constructor(private http: Http, private _globalService: GlobalService) {}
  public serverLink = this._globalService.constants.serverLink;
  public headers = new Headers(this._globalService.constants.headers);

  // *********************** Call  API to add new announcements *****************************

  add_newAnnouncementF(new_announcement_data) {
    return this.http
      .post(this.serverLink + 'add/new_announcement', new_announcement_data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API to get active announcements *****************************
  getActiveAnnouncements() {
    return this.http
      .get(this.serverLink + 'get/active/announcements', {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API to get expired announcements *****************************
  getExpiredAnnouncements() {
    return this.http
      .get(this.serverLink + 'get/expired/announcements', {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API to get single announcements *****************************
  get_singleAnnouncementDataF(announcement_id) {
    return this.http
      .get(
        this.serverLink + 'get/single_announcement' + '/' + announcement_id,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }

  // *********************** Call  API to update announcements *****************************
  update_announcement(announcement_id, update_type, update_data) {
    return this.http
      .put(
        this.serverLink +
          'update/announcement' +
          '/' +
          announcement_id +
          '/' +
          update_type,
        update_data,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }

  // *********************** Call  API to Delete announcements *****************************
  deleteAnnouncement(announcement_id) {
    return this.http
      .delete(this.serverLink + 'delete/announcement/' + announcement_id, {
        headers: this.headers
      })
      .map(response => response.json());
  }
}
