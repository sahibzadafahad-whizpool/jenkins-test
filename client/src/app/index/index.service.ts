import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from '../shared/services/global.service';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
  public headers = new Headers(this._globalService.constants.headers);

  constructor(private http: Http, private _globalService: GlobalService) {}

  // get server link from global services
  public serverLink = this._globalService.constants.serverLink;

  // *********************************************************************************************************************** */
  /********************************************Calling APIs  ************************************************************** */
  // *********************************************************************************************************************** */

  // ************************** get total students *******************************

  get_totalCounts(running_session) {
    return this.http
      .get(this.serverLink + 'get_count' + '/' + running_session, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  get_totalStudentsF(count_type, running_session) {
    return this.http
      .get(
        this.serverLink +
          'get_count' +
          '/' +
          count_type +
          '/' +
          running_session,
        {
          headers: this.headers
        }
      )
      .map(response => response.json());
  }
}
